// furina_script_v2.md 를 그대로 옮긴 시나리오 데이터. 대사·선택지·엔딩 조건은 원문을 수정하지 않는다.
import type { AmbienceId, BgId, BgmId, SfxId, SpriteId } from './assets';

export type Speaker = 'furina' | 'player' | 'narration';

export interface GameState {
  choice2: string | null;
  choice4: string | null;
}

type ChoiceKey = 'choice2' | 'choice4';

export const initialState = (): GameState => ({
  choice2: null,
  choice4: null,
});

export interface ChoiceOption {
  text: string;
  set: Partial<Pick<GameState, ChoiceKey>>;
  next: LabelId;
}

export type Step =
  | { type: 'say'; speaker: Speaker; text: string }
  | { type: 'bg'; id: BgId; fade: number }
  | { type: 'sprite'; id: SpriteId | null }
  | { type: 'bgm'; id: BgmId | null; fade: number }
  | { type: 'ambience'; id: AmbienceId | null; fade: number }
  | { type: 'sfx'; id: SfxId; volume?: number }
  | { type: 'bgmGain'; gain: number; duration: number }
  | { type: 'choice'; options: ChoiceOption[] }
  | { type: 'goto'; label: LabelId }
  | { type: 'titleCard'; text: string };

const F = (...lines: string[]): Step => ({ type: 'say', speaker: 'furina', text: lines.join('\n') });
const P = (...lines: string[]): Step => ({ type: 'say', speaker: 'player', text: lines.join('\n') });
const N = (...lines: string[]): Step => ({ type: 'say', speaker: 'narration', text: lines.join('\n') });
const ex = (id: SpriteId | null): Step => ({ type: 'sprite', id });
const sfx = (id: SfxId, volume?: number): Step => ({ type: 'sfx', id, volume });
const goto = (label: LabelId): Step => ({ type: 'goto', label });

export type LabelId =
  | 'scene01'
  | 'scene02'
  | 'choice2_strawberry'
  | 'choice2_chocolate'
  | 'choice2_half'
  | 'scene03'
  | 'scene04'
  | 'choice4_tell'
  | 'choice4_tease'
  | 'choice4_wipe'
  | 'end';

export const START: LabelId = 'scene01';

export const SCENARIO: Record<LabelId, Step[]> = {
  // ── SCENE 01 — 늦었어 ──────────────────────────────────────────
  scene01: [
    ex(null),
    { type: 'bgm', id: 'salon_evening', fade: 1.5 },
    { type: 'ambience', id: null, fade: 1.5 },
    { type: 'bg', id: 'bg_salon_evening', fade: 1.2 },

    N('해가 완전히 지기 전, 살롱의 긴 창문 너머로 푸른빛이 번지고 있었다.'),
    N('약속 시간보다 조금 늦었다. 케이크 상자는 등 뒤에 감춰 두었다.'),
    sfx('door_open', 0.55),
    ex('furina_pout'),
    F('…늦었어.'),
    P('미안. 많이 기다렸어?'),
    ex('furina_default'),
    F('기다리긴. 차 한 잔 마시고 있었을 뿐이야.'),
    N('그런 것치고는 찻주전자가 거의 비어 있었다.'),
    P('한 잔치고는 꽤 많이 마셨네.'),
    ex('furina_surprised'),
    sfx('surprise', 0.3),
    F('……!'),
    ex('furina_flustered'),
    F('차, 차가 맛있어서 그래!'),
    ex('furina_default'),
    F('…그보다, 계속 거기 서 있을 거야?', '네 잔도 있으니까 앉아.'),
    N('푸리나가 건너편 찻잔을 슬쩍 밀었다.', '주전자에 남은 차를 탈탈 털어 따른 잔이었다.'),
    sfx('cup_place', 0.3),

    goto('scene02'),
  ],

  // ── SCENE 02 — 어느 게 내 거야 ─────────────────────────────────────
  scene02: [
    N('등 뒤에 감춰 둔 상자를 꺼내 테이블에 올려놓고 뚜껑을 열었다.'),
    ex('furina_surprised'),
    F('이거… 요즘 폰타인에서 줄이 제일 긴 가게잖아!'),
    P('늦은 이유. 줄이 꽤 길더라.'),
    ex('furina_flustered'),
    F('그, 그런 거면 진작 말하지…'),
    ex('furina_happy'),
    N('푸리나는 상자 안을 들여다봤다.'),
    F('딸기랑… 초콜릿?'),
    ex('furina_default'),
    F('그래서, 어느 게 내 거야?'),

    // CHOICE 2 — 케이크 건네기 (분위기용, 점수·엔딩에 영향 없음),
    {
      type: 'choice',
      options: [
        { text: '딸기 케이크.', set: { choice2: 'strawberry' }, next: 'choice2_strawberry' },
        { text: '초콜릿 케이크.', set: { choice2: 'chocolate' }, next: 'choice2_chocolate' },
        { text: '네가 먼저 골라.', set: { choice2: 'half' }, next: 'choice2_half' },
      ],
    },
  ],

  choice2_strawberry: [
    ex('furina_happy'),
    F('딸기! 마침 상큼한 게 당겼는데.', '좋아, 이걸로 할게.'),
    goto('scene03'),
  ],

  choice2_chocolate: [
    ex('furina_happy'),
    F('초콜릿! 역시 오래 기다린 날엔 진한 게 최고—'),
    ex('furina_surprised'),
    F('……!'),
    ex('furina_flustered'),
    F('…아, 아니! 기다린 게 아니라 차를 마시고 있었다니까!'),
    goto('scene03'),
  ],

  choice2_half: [
    ex('furina_surprised'),
    F('정말? 그럼… 딸기? 아니, 초콜릿도…'),
    N('푸리나는 두 케이크 사이에서 한참을 망설였다.'),
    ex('furina_default'),
    F('…반씩 나눠 먹자. 그게 제일 공평해.'),
    goto('scene03'),
  ],

  // ── SCENE 03 — 첫입 ─────────────────────────────────────────
  scene03: [
    N('접시에 케이크를 옮기고, 푸리나는 첫입을 먹었다.', '눈을 감고 한동안 아무 말도 하지 않았다.'),
    ex('furina_happy'),
    F('…네가 줄 선 보람이 있네.'),
    goto('scene04'),
  ],

  // ── SCENE 04 — 입가의 크림 ──────────────────────────────────────
  scene04: [
    N('이번엔 푸리나가 케이크를 크게 한입 베어 물었다.'),
    ex('furina_happy'),
    F('음~! 이 가게를 고른 안목만큼은 인정해 줄게. 역시 이 몸의 입맛을—'),
    P('잠깐.'),
    ex('furina_surprised'),
    F('응? 왜?'),
    N('입가에 크림이 묻어 있었다.', '본인만 모르는 채로, 푸리나는 여전히 의기양양한 표정이었다.'),

    // CHOICE 4,
    {
      type: 'choice',
      options: [
        { text: '거기 크림 묻었어.', set: { choice4: 'tell' }, next: 'choice4_tell' },
        { text: '푸리나, 지금 굉장히 위엄 있어 보여.', set: { choice4: 'tease' }, next: 'choice4_tease' },
        { text: '잠깐, 내가 닦아줄게.', set: { choice4: 'wipe' }, next: 'choice4_wipe' },
      ],
    },
  ],

  choice4_tell: [
    ex('furina_surprised'),
    F('어? 어디?'),
    P('반대쪽.'),
    F('여기?'),
    P('조금 더 옆.'),
    ex('furina_flustered'),
    F('아, 진짜! 말로만 하지 말고 거울이라도 가져와!'),
    P('가만있어 봐. 내가 알려줄게.'),
    F('…웃으면 안 돼.'),
    P('안 웃어.'),
    ex('furina_pout'),
    F('입꼬리 이미 올라가 있거든?'),
    N('몇 번의 실랑이 끝에 크림은 무사히 사라졌다.', '푸리나의 귀 끝만 조금 붉게 남았다.'),
    goto('end'),
  ],

  choice4_tease: [
    ex('furina_happy'),
    F('갑자기? 후후, 물론 그렇긴 하지.', '이제야 알아보다니, 너도 안목이—'),
    P('입가의 크림까지 포함해서.'),
    ex('furina_surprised'),
    sfx('surprise', 0.24),
    F('뭐?!'),
    ex('furina_pout'),
    F('왜 바로 안 말해줬어!'),
    P('슈퍼스타다운 장식인 줄 알았지.'),
    F('그런 장식이 어딨어!'),
    N('푸리나는 냅킨으로 입가를 문지르며 이쪽을 노려봤다.', '하지만 그 눈빛엔 별로 무게가 실려 있지 않았다.'),
    ex('furina_happy'),
    F('두고 봐. 이 빚은 꼭 갚을 거야.'),
    goto('end'),
  ],

  choice4_wipe: [
    ex('furina_surprised'),
    sfx('surprise', 0.24),
    F('자, 잠깐!'),
    P('가만있어.'),
    ex('furina_flustered'),
    F('손부터 뻗지 말고 말을 먼저 하라고!'),
    P('말했으면 가만히 있었을 거야?'),
    F('…그건 또 별개의 문제지!'),
    N('그렇게 말하면서도 푸리나는 뒤로 물러나지 않았다.', '냅킨이 입가를 스치는 동안, 푸리나는 눈을 질끈 감고 있었다.'),
    F('…다 됐어?'),
    P('응. 깨끗해.'),
    F('…고마워.'),
    ex('furina_pout'),
    F('그러니까 이건 놀리면 안 되는 거야.'),
    goto('end'),
  ],

  // ── END — 크림 장면 뒤에서 이야기를 마친다 ─────────────────────────
  end: [
    { type: 'bgm', id: 'ending_warm', fade: 1.5 },
    { type: 'titleCard', text: '이후 이야기는 아직 미완성입니다.' },
  ],
};
