// 화면 표현 담당: 배경 crossfade, 스프라이트 교체/연출, 텍스트 박스 타이핑, 선택지, 타이틀 카드.
import { BG, SPRITE, url, type BgId, type SpriteId } from './assets';
import type { Speaker } from './scenario';

const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector(sel) as T;
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export const SPEAKER_NAME: Record<Speaker, string> = {
  furina: '푸리나',
  player: '나',
  narration: '',
};

const SPRITE_FADE_MS = 200; // script: 150~250ms
const SPRITE_ENTER_MS = 420;
const DECODE_WAIT_MS = 1500;

/** 이미지 미리 로드. 실패는 기록만 하고 진행. */
const failed = new Set<string>();
export function preloadImages() {
  for (const path of [...Object.values(BG), ...Object.values(SPRITE)]) {
    const img = new Image();
    img.onerror = () => {
      failed.add(path);
      console.warn(`[image] load failed: ${path}`);
    };
    img.src = url(path);
  }
}

/** 두 장의 <img>를 번갈아 쓰는 crossfade 레이어. */
class FadePair {
  private front: HTMLImageElement;
  private back: HTMLImageElement;
  private token = 0;
  current: string | null = null;

  constructor(a: HTMLImageElement, b: HTMLImageElement) {
    this.front = a;
    this.back = b;
    for (const img of [a, b]) {
      img.onerror = () => img.classList.add('missing');
      img.onload = () => img.classList.remove('missing');
    }
  }

  async show(path: string | null, ms: number) {
    if (path === this.current) return;
    this.current = path;
    const token = ++this.token;
    const incoming = this.back;
    const outgoing = this.front;

    if (path) {
      incoming.classList.remove('missing');
      incoming.src = url(path);
      // 실패해도 진행: decode 거부는 무시. 느린 로드는 최대 DECODE_WAIT_MS만 기다리고 진행
      // (그 뒤에 로드가 끝나면 이미 'on'인 레이어에 그대로 나타난다).
      // 덜 받아진 이미지가 반쯤 그려지지 않도록 디코드 완료 전까지 'loading'으로 숨긴다.
      incoming.classList.add('loading');
      const decoded = incoming
        .decode()
        .catch(() => incoming.classList.add('missing'))
        .finally(() => incoming.classList.remove('loading'));
      await Promise.race([decoded, sleep(DECODE_WAIT_MS)]);
      if (token !== this.token) return;
    }

    for (const img of [incoming, outgoing]) img.style.transitionDuration = `${ms}ms`;
    if (path) incoming.classList.add('on');
    outgoing.classList.remove('on');
    this.front = path ? incoming : outgoing;
    this.back = path ? outgoing : incoming;
    await sleep(ms);
  }

  clear() {
    this.token++;
    this.current = null;
    this.front.classList.remove('on');
    this.back.classList.remove('on');
  }
}

export class Stage {
  readonly frame = $('#frame');
  private bg = new FadePair($<HTMLImageElement>('#bg-a'), $<HTMLImageElement>('#bg-b'));
  private sprite = new FadePair($<HTMLImageElement>('#sp-a'), $<HTMLImageElement>('#sp-b'));
  private spritePos = $('#sprite-pos');
  private spriteZoom = $('#sprite-zoom');
  private spriteShake = $('#sprite-shake');
  private textbox = $('#textbox');
  private nametag = $('#nametag');
  private text = $('#text');
  private choices = $('#choices');
  private titlecard = $('#titlecard');

  expression: SpriteId | null = null;

  // ── 배경 ──
  setBg(id: BgId, seconds: number) {
    return this.bg.show(BG[id], seconds * 1000);
  }

  // ── 스프라이트 ──
  async setSprite(id: SpriteId | null) {
    if (id === this.expression) return;
    const entering = this.expression === null && id !== null;
    this.expression = id;

    this.spriteZoom.classList.toggle('zoom', id === 'furina_flustered');
    if (id === 'furina_surprised') {
      this.spriteShake.classList.remove('shake');
      void this.spriteShake.offsetWidth; // 애니메이션 재시작
      this.spriteShake.classList.add('shake');
    }

    if (entering) {
      this.spritePos.classList.remove('present');
      await this.sprite.show(SPRITE[id], 0);
      void this.spritePos.offsetWidth;
      this.spritePos.classList.add('present');
      await sleep(SPRITE_ENTER_MS);
    } else if (id === null) {
      this.spritePos.classList.remove('present');
      await sleep(SPRITE_ENTER_MS);
      if (this.expression === null) this.sprite.clear();
    } else {
      void this.sprite.show(SPRITE[id], SPRITE_FADE_MS);
    }
  }

  // ── 텍스트 ──
  private typing: { full: string; done: () => void; raf: number } | null = null;

  get isTyping() {
    return this.typing !== null;
  }

  showTextbox(on: boolean) {
    this.textbox.classList.toggle('hidden', !on);
  }

  /** 한 글자씩 출력. msPerChar가 클수록 느리다. 완료 시 resolve. */
  type(speaker: Speaker, full: string, msPerChar: number): Promise<void> {
    this.finishTyping();
    this.showTextbox(true);
    this.textbox.dataset.speaker = speaker;
    this.nametag.textContent = SPEAKER_NAME[speaker];
    this.textbox.classList.remove('ready');

    const chars = Array.from(full);
    // 문장부호 뒤에 약간 머무름
    const pauseAfter = (c: string) => ('.!?…—'.includes(c) ? 5 : ','.includes(c) ? 2.5 : c === '\n' ? 4 : 1);

    return new Promise<void>((resolve) => {
      let shown = 0;
      let budget = 0;
      let last = performance.now();
      const done = () => {
        if (this.typing?.done !== done) return;
        cancelAnimationFrame(this.typing.raf);
        this.typing = null;
        this.text.textContent = full;
        this.textbox.classList.add('ready');
        resolve();
      };
      const tick = (now: number) => {
        budget += now - last;
        last = now;
        while (shown < chars.length) {
          const cost = msPerChar * (shown > 0 ? pauseAfter(chars[shown - 1]) : 1);
          if (budget < cost) break;
          budget -= cost;
          shown++;
        }
        this.text.textContent = chars.slice(0, shown).join('');
        if (shown >= chars.length) done();
        else if (this.typing) this.typing.raf = requestAnimationFrame(tick);
      };
      this.typing = { full, done, raf: requestAnimationFrame(tick) };
      this.text.textContent = '';
    });
  }

  finishTyping() {
    this.typing?.done();
  }

  clearText() {
    this.finishTyping();
    this.text.textContent = '';
    this.nametag.textContent = '';
    this.textbox.classList.remove('ready');
    this.textbox.dataset.speaker = 'narration';
  }

  // ── 선택지 ──
  showChoices(labels: string[], onHover: () => void): Promise<number> {
    this.textbox.classList.remove('ready');
    this.choices.replaceChildren();
    return new Promise((resolve) => {
      const pick = (i: number) => {
        window.removeEventListener('keydown', onKey);
        this.choices.classList.remove('on');
        this.choices.inert = true;
        resolve(i);
      };
      const onKey = (e: KeyboardEvent) => {
        if (this.frame.classList.contains('log-open')) return;
        const n = Number(e.key);
        if (n >= 1 && n <= labels.length) {
          e.preventDefault();
          pick(n - 1);
        }
      };
      labels.forEach((label, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'choice';
        b.innerHTML = `<span class="num">${i + 1}</span><span class="label"></span>`;
        b.querySelector('.label')!.textContent = label;
        // 마우스 hover 진입 시 1회 (터치의 가짜 hover는 제외)
        b.addEventListener('pointerenter', (e) => {
          if (e.pointerType === 'mouse') onHover();
        });
        b.addEventListener('click', (e) => {
          e.stopPropagation();
          pick(i);
        });
        this.choices.append(b);
      });
      this.choices.inert = false;
      void this.choices.offsetWidth;
      this.choices.classList.add('on');
      window.addEventListener('keydown', onKey);
    });
  }

  // ── 엔딩 타이틀 카드 ──
  showTitleCard(text: string): Promise<void> {
    const [head, sub] = text.split(' — ');
    this.titlecard.querySelector('.head')!.textContent = head;
    this.titlecard.querySelector('.sub')!.textContent = sub ?? '';
    this.titlecard.inert = false;
    this.titlecard.classList.add('on');
    const btn = this.titlecard.querySelector<HTMLButtonElement>('button')!;
    return new Promise((resolve) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        resolve();
      };
    });
  }

  hideTitleCard() {
    this.titlecard.classList.remove('on');
    this.titlecard.inert = true;
  }
}
