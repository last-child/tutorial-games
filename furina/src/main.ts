import './style.css';
import { AudioManager } from './audio';
import { Backlog } from './backlog';
import { initialState, SCENARIO, START, type GameState, type LabelId, type Step } from './scenario';
import { preloadImages, Stage } from './stage';

const TEXT_MS = 34; // 기본 글자당 ms
const TEXT_MS_SAD = 58; // furina_sad: 조금 느리게
const SAD_DUCK = 0.78; // furina_sad: BGM -22% → script의 0.78 gain과 동일
const DUCK_SECONDS = 0.8;

const audio = new AudioManager();
const stage = new Stage();
const backlog = new Backlog();
preloadImages();
void stage.setBg('bg_salon_day', 0); // 타이틀 화면 배경

// ── 진행 엔진 ─────────────────────────────────────────────────────
type Mode = 'title' | 'notice' | 'busy' | 'say' | 'choice' | 'end';
let mode: Mode = 'title';
let state: GameState = initialState();
let advanceResolver: (() => void) | null = null;
let runId = 0;

const waitAdvance = () => new Promise<void>((r) => (advanceResolver = r));

async function run(label: LabelId) {
  const id = ++runId;
  let current: LabelId | null = label;
  while (current && id === runId) {
    const steps: Step[] = SCENARIO[current];
    current = null;
    for (const step of steps) {
      if (id !== runId) return;
      const jump = await exec(step);
      if (jump) {
        current = jump;
        break;
      }
    }
  }
}

async function exec(step: Step): Promise<LabelId | void> {
  switch (step.type) {
    case 'say': {
      mode = 'say';
      const slow = stage.expression === 'furina_sad';
      backlog.addLine(step.speaker, step.text);
      void stage.type(step.speaker, step.text, slow ? TEXT_MS_SAD : TEXT_MS);
      await waitAdvance();
      mode = 'busy';
      return;
    }
    case 'bg':
      stage.clearText();
      stage.showTextbox(false);
      await stage.setBg(step.id, step.fade);
      return;
    case 'sprite': {
      const wasSad = stage.expression === 'furina_sad';
      const isSad = step.id === 'furina_sad';
      if (isSad && !wasSad) audio.setBgmDuck(SAD_DUCK, DUCK_SECONDS);
      if (!isSad && wasSad) audio.setBgmDuck(1, DUCK_SECONDS);
      await stage.setSprite(step.id);
      return;
    }
    case 'bgm':
      audio.playBgm(step.id, step.fade);
      return;
    case 'ambience':
      audio.playAmbience(step.id, step.fade);
      return;
    case 'sfx':
      audio.sfx(step.id, step.volume);
      return;
    case 'bgmGain':
      audio.setBgmDuck(step.gain, step.duration);
      return;
    case 'choice': {
      mode = 'choice';
      const i = await stage.showChoices(
        step.options.map((o) => o.text),
        () => audio.sfx('ui_click'),
      );
      audio.sfx('ui_select');
      const opt = step.options[i];
      backlog.addChoice(opt.text);
      Object.assign(state, opt.set);
      console.info('[state]', { ...state });
      mode = 'busy';
      return opt.next;
    }
    case 'goto':
      return step.label;
    case 'titleCard':
      mode = 'end';
      stage.clearText();
      stage.showTextbox(false);
      await stage.showTitleCard(step.text);
      // 처음부터 다시: 상태만 초기화하고 SCENE 01 헤더가 BG/BGM/스프라이트를 정리한다
      audio.sfx('ui_select');
      stage.hideTitleCard();
      stage.clearText();
      audio.setBgmDuck(1, 0.3);
      state = initialState();
      backlog.clear();
      mode = 'busy';
      return START;
  }
}

// ── 입력 ──────────────────────────────────────────────────────────
const titleScreen = document.querySelector<HTMLElement>('#title-screen')!;

const notice = document.querySelector<HTMLElement>('#notice')!;
const NOTICE_MS = 2600; // 2차 창작 안내를 띄워 두는 시간 (클릭하면 바로 넘어감)
const NOTICE_FADE_MS = 600;
let skipNotice: (() => void) | null = null;

async function start() {
  audio.unlock(); // 첫 사용자 입력 → 오디오 unlock
  audio.sfx('ui_select');
  titleScreen.classList.add('off');
  titleScreen.inert = true;
  mode = 'notice';
  notice.classList.add('on');
  await new Promise<void>((r) => {
    const t = setTimeout(r, NOTICE_FADE_MS + NOTICE_MS);
    skipNotice = () => {
      clearTimeout(t);
      r();
    };
  });
  skipNotice = null;
  notice.classList.remove('on');
  await new Promise((r) => setTimeout(r, NOTICE_FADE_MS));
  mode = 'busy';
  void run(START);
}

function onAdvance() {
  if (mode === 'title') return void start();
  if (mode === 'notice') return skipNotice?.();
  if (mode !== 'say') return;
  if (stage.isTyping) {
    stage.finishTyping();
    return;
  }
  audio.advance();
  const r = advanceResolver;
  advanceResolver = null;
  r?.();
}

stage.frame.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('#controls, #choices, #titlecard, #backlog')) return;
  onAdvance();
});

window.addEventListener('keydown', (e) => {
  if (backlog.isOpen) {
    // 로그가 열려 있는 동안 진행 키는 막고, Esc로 닫는다
    if (e.key === 'Escape') toggleLog();
    if (e.key === ' ' || e.key === 'Enter') e.preventDefault();
    return;
  }
  if (e.key !== ' ' && e.key !== 'Enter') return;
  if (mode === 'title') return; // 시작은 클릭으로만 (사용자 요청)
  // 포커스된 버튼/슬라이더는 브라우저 기본 동작에 맡긴다
  if ((e.target as HTMLElement).closest?.('input, button')) return;
  e.preventDefault();
  if (e.repeat) return;
  onAdvance();
});

// ── 로그 (LOG 버튼으로만 연다. 사용자 요청: 휠·L 키로 열지 않음) ──────────────────────────────────────────────────────────
const logBtn = document.querySelector<HTMLButtonElement>('#log')!;

function toggleLog() {
  backlog.toggle();
  stage.frame.classList.toggle('log-open', backlog.isOpen);
  logBtn.setAttribute('aria-expanded', String(backlog.isOpen));
  audio.sfx('ui_click');
}
logBtn.addEventListener('click', () => {
  if (mode !== 'title') toggleLog();
  logBtn.blur();
});
document.querySelector<HTMLButtonElement>('#log-close')!.addEventListener('click', toggleLog);

// ── 오디오 컨트롤 ─────────────────────────────────────────────────
const muteBtn = document.querySelector<HTMLButtonElement>('#mute')!;
muteBtn.addEventListener('click', () => {
  audio.setMuted(!audio.muted);
  muteBtn.classList.toggle('muted', audio.muted);
  muteBtn.setAttribute('aria-pressed', String(audio.muted));
  muteBtn.blur();
});

// ── 전체 화면 (볼륨 조절 버튼 자리. 지원 안 하는 브라우저(iOS Safari 등)에선 숨김) ──
const fsBtn = document.querySelector<HTMLButtonElement>('#fullscreen')!;
if (document.fullscreenEnabled) {
  fsBtn.hidden = false;
  fsBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          // 폰에서는 가로로 돌려야 16:9 화면이 꽉 찬다 (지원하는 브라우저만)
          const o = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
          o?.lock?.('landscape').catch(() => {});
        })
        .catch(() => {});
    }
    fsBtn.blur();
  });
  document.addEventListener('fullscreenchange', () => {
    const on = !!document.fullscreenElement;
    fsBtn.classList.toggle('active', on);
    fsBtn.setAttribute('aria-label', on ? '전체 화면 끝내기' : '전체 화면');
    fsBtn.title = on ? '전체 화면 끝내기' : '전체 화면';
  });
}
