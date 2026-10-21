// furina_script.md §0 에셋 매핑 그대로. 파일은 public/ 아래 원본 경로·파일명 유지.

export const BG = {
  bg_salon_day: 'furina_bg/bg_salon_day.webp',
  bg_salon_evening: 'furina_bg/bg_salon_evening.webp',
  bg_salon_night: 'furina_bg/bg_salon_night.webp',
} as const;

export const SPRITE = {
  furina_default: 'furina_sprite/furina_default.webp',
  furina_happy: 'furina_sprite/furina_happy.webp',
  furina_pout: 'furina_sprite/furina_pout.webp',
  furina_flustered: 'furina_sprite/furina_flustered.webp',
  furina_sad: 'furina_sprite/furina_sad.webp',
  furina_surprised: 'furina_sprite/furina_surprised.webp',
} as const;

export const BGM = {
  salon_evening: 'furina_audio/bgm/salon_evening.mp3',
  quiet_night: 'furina_audio/bgm/quiet_night.mp3',
  ending_warm: 'furina_audio/bgm/ending_warm.mp3',
} as const;

export const AMBIENCE = {
  salon_night_water: 'furina_audio/ambience/salon_night_water.mp3',
} as const;

export const SFX = {
  door_open: 'furina_audio/sfx/door_open.wav',
  cup_place: 'furina_audio/sfx/cup_place.wav',
  ui_click: 'furina_audio/sfx/ui_click.wav',
  ui_select: 'furina_audio/sfx/ui_select.wav',
  dialogue_advance: 'furina_audio/sfx/dialogue_advance.wav',
  surprise: 'furina_audio/sfx/surprise.wav',
} as const;

export type BgId = keyof typeof BG;
export type SpriteId = keyof typeof SPRITE;
export type BgmId = keyof typeof BGM;
export type AmbienceId = keyof typeof AMBIENCE;
export type SfxId = keyof typeof SFX;
export type AudioId = BgmId | AmbienceId | SfxId;

/** 기본 오디오 믹스 (script §0). SFX 큐에 볼륨이 지정되면 그 값이 sfx 기본값을 대체한다. */
export const MIX = {
  master: 1.0,
  bgm: 0.42,
  ambience: 0.16,
  sfx: 0.5,
  dialogueAdvance: 0.18,
} as const;

export const AUDIO_FILES: Record<AudioId, string> = { ...BGM, ...AMBIENCE, ...SFX };

export const url = (path: string) => import.meta.env.BASE_URL + path;
