// Web Audio 기반 오디오 매니저.
// - 첫 사용자 입력(unlock) 전에는 AudioContext 자체를 만들지 않는다.
// - 모든 로드/디코드 실패는 경고만 남기고 무시한다 (non-fatal).
import { AUDIO_FILES, MIX, url, type AmbienceId, type AudioId, type BgmId, type SfxId } from './assets';

interface LoopTrack {
  id: string;
  src: AudioBufferSourceNode | null;
  gain: GainNode;
}

const ADVANCE_DEDUPE_MS = 70;

export class AudioManager {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private bgmBus!: GainNode;
  private bgmDuck!: GainNode;
  private ambBus!: GainNode;
  private sfxBus!: GainNode;

  private raw = new Map<AudioId, Promise<ArrayBuffer | null>>();
  private decoded = new Map<AudioId, Promise<AudioBuffer | null>>();

  private bgm: LoopTrack | null = null;
  private amb: LoopTrack | null = null;
  private wantedBgm: BgmId | null = null;
  private wantedAmb: AmbienceId | null = null;
  private duck = 1;
  private lastAdvanceAt = 0;

  muted = false;
  bgmVolume = 1; // 0..1, MIX 위에 곱해지는 사용자 배율
  sfxVolume = 1;

  constructor() {
    // 재생은 안 하고 파일만 미리 받아둔다.
    for (const id of Object.keys(AUDIO_FILES) as AudioId[]) {
      this.raw.set(
        id,
        fetch(url(AUDIO_FILES[id]))
          .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(`HTTP ${r.status}`))))
          .catch((e) => {
            console.warn(`[audio] load failed: ${id}`, e);
            return null;
          }),
      );
    }
  }

  get unlocked() {
    return this.ctx !== null;
  }

  /** 반드시 사용자 입력 핸들러 안에서 호출. */
  unlock() {
    if (this.ctx) return;
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      this.ctx = ctx;
      this.master = ctx.createGain();
      this.bgmBus = ctx.createGain();
      this.bgmDuck = ctx.createGain();
      this.ambBus = ctx.createGain();
      this.sfxBus = ctx.createGain();
      this.bgmBus.connect(this.bgmDuck).connect(this.master);
      this.ambBus.connect(this.master);
      this.sfxBus.connect(this.master);
      this.master.connect(ctx.destination);
      this.applyVolumes(true);
      void ctx.resume().catch(() => {});

      document.addEventListener('visibilitychange', () => {
        if (!this.ctx) return;
        if (document.hidden) void this.ctx.suspend().catch(() => {});
        else void this.ctx.resume().catch(() => {});
      });

      // unlock 전에 요청된 루프가 있으면 지금 시작
      const b = this.wantedBgm;
      const a = this.wantedAmb;
      this.wantedBgm = this.wantedAmb = null;
      if (b) this.playBgm(b, 1.5);
      if (a) this.playAmbience(a, 2.0);
    } catch (e) {
      console.warn('[audio] unlock failed — continuing without sound', e);
      this.ctx = null;
    }
  }

  private buffer(id: AudioId): Promise<AudioBuffer | null> {
    const ctx = this.ctx;
    if (!ctx) return Promise.resolve(null);
    let p = this.decoded.get(id);
    if (!p) {
      p = (this.raw.get(id) ?? Promise.resolve(null))
        .then((ab) => (ab ? ctx.decodeAudioData(ab) : null))
        .catch((e) => {
          console.warn(`[audio] decode failed: ${id}`, e);
          return null;
        });
      this.decoded.set(id, p);
    }
    return p;
  }

  // ── 볼륨 ────────────────────────────────────────────────────────
  private applyVolumes(immediate = false) {
    const ctx = this.ctx;
    if (!ctx) return;
    const set = (g: GainNode, v: number) => {
      g.gain.cancelScheduledValues(ctx.currentTime);
      if (immediate) g.gain.setValueAtTime(v, ctx.currentTime);
      else g.gain.setTargetAtTime(v, ctx.currentTime, 0.05);
    };
    set(this.master, this.muted ? 0 : MIX.master);
    set(this.bgmBus, MIX.bgm * this.bgmVolume);
    set(this.ambBus, MIX.ambience * this.bgmVolume);
    set(this.sfxBus, this.sfxVolume);
  }

  setMuted(m: boolean) {
    this.muted = m;
    this.applyVolumes();
  }
  setBgmVolume(v: number) {
    this.bgmVolume = v;
    this.applyVolumes();
  }
  setSfxVolume(v: number) {
    this.sfxVolume = v;
    this.applyVolumes();
  }

  /** BGM 일시 감쇠 (furina_sad 연출). 1 = 원래 볼륨. */
  setBgmDuck(target: number, seconds: number) {
    this.duck = target;
    const ctx = this.ctx;
    if (!ctx) return;
    const g = this.bgmDuck.gain;
    const now = ctx.currentTime;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(target, now + seconds);
  }

  get bgmDuckLevel() {
    return this.duck;
  }

  // ── 루프 트랙 (BGM / ambience) ──────────────────────────────────
  private fadeOutAndStop(track: LoopTrack, seconds: number) {
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const g = track.gain.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(0, now + seconds);
    try {
      track.src?.stop(now + seconds + 0.05);
    } catch {
      /* already stopped */
    }
    if (track.src) track.src.onended = () => track.gain.disconnect();
    else track.gain.disconnect(); // 아직 디코드 중이던 트랙
  }

  private startLoop(id: AudioId, bus: GainNode, seconds: number, isCurrent: (t: LoopTrack) => boolean): LoopTrack {
    const ctx = this.ctx!;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(bus);
    const track: LoopTrack = { id, src: null, gain };
    void this.buffer(id).then((buf) => {
      // 디코드 중에 다른 곡으로 바뀌었으면 시작하지 않음
      if (!buf || !this.ctx || !isCurrent(track)) return;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      src.connect(gain);
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(1, now + seconds);
      src.start(now);
      track.src = src;
    });
    return track;
  }

  /** BGM 교체. 이전 곡과 새 곡을 `seconds` 동안 crossfade. null이면 fade out. */
  playBgm(id: BgmId | null, seconds = 1.5) {
    if (!this.ctx) {
      this.wantedBgm = id;
      return;
    }
    if (this.bgm?.id === (id ?? undefined)) return;
    if (this.bgm) this.fadeOutAndStop(this.bgm, seconds);
    this.bgm = id ? this.startLoop(id, this.bgmBus, seconds, (t) => this.bgm === t) : null;
  }

  playAmbience(id: AmbienceId | null, seconds = 2.0) {
    if (!this.ctx) {
      this.wantedAmb = id;
      return;
    }
    if (this.amb?.id === (id ?? undefined)) return;
    if (this.amb) this.fadeOutAndStop(this.amb, seconds);
    this.amb = id ? this.startLoop(id, this.ambBus, seconds, (t) => this.amb === t) : null;
  }

  // ── SFX ─────────────────────────────────────────────────────────
  /** volume: 큐별 절대 레벨(미지정 시 MIX.sfx). 최종 = volume × SFX 슬라이더 × master. */
  sfx(id: SfxId, volume: number = MIX.sfx) {
    const ctx = this.ctx;
    if (!ctx) return;
    void this.buffer(id).then((buf) => {
      if (!buf) return;
      try {
        const src = ctx.createBufferSource();
        const g = ctx.createGain();
        g.gain.value = volume;
        src.buffer = buf;
        src.connect(g).connect(this.sfxBus);
        src.onended = () => g.disconnect();
        src.start();
      } catch (e) {
        console.warn(`[audio] sfx failed: ${id}`, e);
      }
    });
  }

  /** 일반 대사 진행음 — 매우 작게, 70ms 이내 중복 재생 방지. */
  advance() {
    const now = performance.now();
    if (now - this.lastAdvanceAt < ADVANCE_DEDUPE_MS) return;
    this.lastAdvanceAt = now;
    this.sfx('dialogue_advance', MIX.dialogueAdvance);
  }
}
