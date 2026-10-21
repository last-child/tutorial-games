# 푸리나 웹 미연시 테스트 대본
## 「원신 비주얼노벨」

> 용도: 웹 미연시 프로토타입 2차 테스트  
> 예상 플레이타임: 약 5~8분  
> 등장인물: 플레이어, 푸리나  
> 장소: 살롱 1곳 / 저녁  
> 선택지: 2회 (케이크 고르기·입가의 크림, 둘 다 분위기용 — 점수 없음)  
> 엔딩: 1종 (크림 장면 뒤에서 끝)  
> 이 문서를 스토리/연출의 source of truth로 사용한다.

---

# 0. 캐릭터 톤

원신의 푸리나를 기준으로 한다.  
시점은 폰타인 마신 임무 이후. 신의 역할을 내려놓고 인간으로 지내는 푸리나다.

푸리나는 자신을 무대의 주연이라 여기는 사람이다.  
허세와 과장된 리액션은 억지로 쓰는 가면이 아니라, 오래된 습관이자 타고난 쇼맨십이다.  
디저트를 진심으로 좋아하고, 칭찬에는 금방 우쭐해지며, 지는 건 싫어한다.  
그런데 누가 진심으로 다가오면 준비된 대사가 사라져서 허둥댄다.

- 평소: `~잖아`, `~거든`, `~지`, `~네`, `~할 거야`, `~어때?`
- 버릇: `흥`, `에헴`, `후후`.
- 연극 비유(무대·막·객석 등)는 장면당 최대 한 번. 푸리나다움은 말보다 행동으로 보여준다.
- 당황: 즉시 부정 → 그럴듯하지만 엉성한 변명 → 화제 돌리기
- 삐짐: 공격적이지 않고 유치하게 발끈한다. 금방 풀린다.
- 장난: 지기 싫어서 바로 받아치고, 반격 예고를 남긴다.
- 호감 표현: 처음엔 돌려 말한다. 정말 솔직해질 때는 오히려 말수가 줄어든다.
- 전형적인 츤데레가 아니다. "오해하지 마", "너 때문이 아니야" 같은 상투적인 부정을 반복하지 않는다.
- 진지한 장면에서 자기 감정을 길게 설명하지 않는다.
- 과거(신 역할, 예언, 오랜 고통)를 직접 고백하지 않는다. 비치더라도 한 줄을 넘기지 않는다.
- `재판`, `판결`, `심리`, `폐정`, `재판장` 등 법정 콘셉트는 사용하지 않는다.

## 이야기 장치

- **빈 찻주전자** — 푸리나가 기다린 시간의 흔적. SCENE 01에서 들킨다.
- **케이크 건네기** — 가볍게 시작하는 부분. 플레이어가 줄 서서 사 온 케이크 2개(딸기·초콜릿, 늦은 이유). "어느 게 내 거야?" → 건네줄 걸 고르거나 "네가 먼저 골라"(푸리나가 못 골라 반씩 나눔). 초콜릿을 고르면 "오래 기다린 날엔—" 말실수로 앞의 "기다리긴" 거짓말이 들통난다. 어느 걸 골라도 이야기·점수는 같다. 페이몬은 나오지 않는다. (2026-10-08 사용자 확정)
- **늦었어** — 첫 대사.

---

# 1. 에셋 매핑

## 배경
- `bg_salon_evening` → `furina_bg/bg_salon_evening.png`
- `bg_salon_night` → `furina_bg/bg_salon_night.png`

## 푸리나 스프라이트
- `furina_default` → `furina_sprite/furina_default.png`
- `furina_happy` → `furina_sprite/furina_happy.png`
- `furina_pout` → `furina_sprite/furina_pout.png`
- `furina_flustered` → `furina_sprite/furina_flustered.png`
- `furina_sad` → `furina_sprite/furina_sad.png`
- `furina_surprised` → `furina_sprite/furina_surprised.png`

## BGM
- `salon_evening` → `furina_audio/bgm/salon_evening.mp3`
- `quiet_night` → `furina_audio/bgm/quiet_night.mp3`
- `ending_warm` → `furina_audio/bgm/ending_warm.mp3`

## Ambience
- `salon_night_water` → `furina_audio/ambience/salon_night_water.mp3`

## SFX
- `door_open` → `furina_audio/sfx/door_open.wav`
- `cup_place` → `furina_audio/sfx/cup_place.wav`
- `ui_click` → `furina_audio/sfx/ui_click.wav`
- `ui_select` → `furina_audio/sfx/ui_select.wav`
- `dialogue_advance` → `furina_audio/sfx/dialogue_advance.wav`
- `surprise` → `furina_audio/sfx/surprise.wav`

---

# 2. 상태값

```txt
choice2 = null
choice4 = null
```

점수·엔딩 분기는 없다. 선택지는 분위기용이고, 어느 걸 골라도 크림 장면 뒤에서 같은 끝으로 간다.

---

# SCENE 01 — 늦었어

**FURINA:** 없음

**BGM:** `salon_evening` / fade 1.5s

**AMBIENCE:** `null` / fade 1.5s

**BG:** `bg_salon_evening` / fade 1.2s

**NARRATION**  
해가 완전히 지기 전, 살롱의 긴 창문 너머로 푸른빛이 번지고 있었다.

**NARRATION**  
약속 시간보다 조금 늦었다. 케이크 상자는 등 뒤에 감춰 두었다.

**SFX:** `door_open` / volume 0.55

**FURINA:** `furina_pout`

**푸리나**  
…늦었어.

**PLAYER**  
미안. 많이 기다렸어?

**FURINA:** `furina_default`

**푸리나**  
기다리긴. 차 한 잔 마시고 있었을 뿐이야.

**NARRATION**  
그런 것치고는 찻주전자가 거의 비어 있었다.

**PLAYER**  
한 잔치고는 꽤 많이 마셨네.

**FURINA:** `furina_surprised`

**SFX:** `surprise` / volume 0.3

**푸리나**  
……!

**FURINA:** `furina_flustered`

**푸리나**  
차, 차가 맛있어서 그래!

**FURINA:** `furina_default`

**푸리나**  
…그보다, 계속 거기 서 있을 거야?  
네 잔도 있으니까 앉아.

**NARRATION**  
푸리나가 건너편 찻잔을 슬쩍 밀었다.  
주전자에 남은 차를 탈탈 털어 따른 잔이었다.

**SFX:** `cup_place` / volume 0.3

→ `scene02`

---

# SCENE 02 — 어느 게 내 거야

**NARRATION**  
등 뒤에 감춰 둔 상자를 꺼내 테이블에 올려놓고 뚜껑을 열었다.

**FURINA:** `furina_surprised`

**푸리나**  
이거… 요즘 폰타인에서 줄이 제일 긴 가게잖아!

**PLAYER**  
늦은 이유. 줄이 꽤 길더라.

**FURINA:** `furina_flustered`

**푸리나**  
그, 그런 거면 진작 말하지…

**FURINA:** `furina_happy`

**NARRATION**  
푸리나는 상자 안을 들여다봤다.

**푸리나**  
딸기랑… 초콜릿?

**FURINA:** `furina_default`

**푸리나**  
그래서, 어느 게 내 거야?

## CHOICE 2 — 케이크 건네기 (분위기용, 점수·엔딩에 영향 없음)

- 「딸기 케이크.」 → `choice2_strawberry`
  ```txt
  점수 변화 없음
  choice2 = "strawberry"
  ```

- 「초콜릿 케이크.」 → `choice2_chocolate`
  ```txt
  점수 변화 없음
  choice2 = "chocolate"
  ```

- 「네가 먼저 골라.」 → `choice2_half`
  ```txt
  점수 변화 없음
  choice2 = "half"
  ```

---

### `choice2_strawberry`

**FURINA:** `furina_happy`

**푸리나**  
딸기! 마침 상큼한 게 당겼는데.  
좋아, 이걸로 할게.

→ `scene03`

---

### `choice2_chocolate`

**FURINA:** `furina_happy`

**푸리나**  
초콜릿! 역시 오래 기다린 날엔 진한 게 최고—

**FURINA:** `furina_surprised`

**푸리나**  
……!

**FURINA:** `furina_flustered`

**푸리나**  
…아, 아니! 기다린 게 아니라 차를 마시고 있었다니까!

→ `scene03`

---

### `choice2_half`

**FURINA:** `furina_surprised`

**푸리나**  
정말? 그럼… 딸기? 아니, 초콜릿도…

**NARRATION**  
푸리나는 두 케이크 사이에서 한참을 망설였다.

**FURINA:** `furina_default`

**푸리나**  
…반씩 나눠 먹자. 그게 제일 공평해.

→ `scene03`

---

# SCENE 03 — 첫입

**NARRATION**  
접시에 케이크를 옮기고, 푸리나는 첫입을 먹었다.  
눈을 감고 한동안 아무 말도 하지 않았다.

**FURINA:** `furina_happy`

**푸리나**  
…네가 줄 선 보람이 있네.

→ `scene04`

---

# SCENE 04 — 입가의 크림

**NARRATION**  
이번엔 푸리나가 케이크를 크게 한입 베어 물었다.

**FURINA:** `furina_happy`

**푸리나**  
음~! 이 가게를 고른 안목만큼은 인정해 줄게. 역시 이 몸의 입맛을—

**PLAYER**  
잠깐.

**FURINA:** `furina_surprised`

**푸리나**  
응? 왜?

**NARRATION**  
입가에 크림이 묻어 있었다.  
본인만 모르는 채로, 푸리나는 여전히 의기양양한 표정이었다.

## CHOICE 4

- 「거기 크림 묻었어.」 → `choice4_tell`
  ```txt
  choice4 = "tell"
  ```

- 「푸리나, 지금 굉장히 위엄 있어 보여.」 → `choice4_tease`
  ```txt
  choice4 = "tease"
  ```

- 「잠깐, 내가 닦아줄게.」 → `choice4_wipe`
  ```txt
  choice4 = "wipe"
  ```

---

### `choice4_tell`

**FURINA:** `furina_surprised`

**푸리나**  
어? 어디?

**PLAYER**  
반대쪽.

**푸리나**  
여기?

**PLAYER**  
조금 더 옆.

**FURINA:** `furina_flustered`

**푸리나**  
아, 진짜! 말로만 하지 말고 거울이라도 가져와!

**PLAYER**  
가만있어 봐. 내가 알려줄게.

**푸리나**  
…웃으면 안 돼.

**PLAYER**  
안 웃어.

**FURINA:** `furina_pout`

**푸리나**  
입꼬리 이미 올라가 있거든?

**NARRATION**  
몇 번의 실랑이 끝에 크림은 무사히 사라졌다.  
푸리나의 귀 끝만 조금 붉게 남았다.

→ `end`

---

### `choice4_tease`

**FURINA:** `furina_happy`

**푸리나**  
갑자기? 후후, 물론 그렇긴 하지.  
이제야 알아보다니, 너도 안목이—

**PLAYER**  
입가의 크림까지 포함해서.

**FURINA:** `furina_surprised`

**SFX:** `surprise` / volume 0.24

**푸리나**  
뭐?!

**FURINA:** `furina_pout`

**푸리나**  
왜 바로 안 말해줬어!

**PLAYER**  
슈퍼스타다운 장식인 줄 알았지.

**푸리나**  
그런 장식이 어딨어!

**NARRATION**  
푸리나는 냅킨으로 입가를 문지르며 이쪽을 노려봤다.  
하지만 그 눈빛엔 별로 무게가 실려 있지 않았다.

**FURINA:** `furina_happy`

**푸리나**  
두고 봐. 이 빚은 꼭 갚을 거야.

→ `end`

---

### `choice4_wipe`

**FURINA:** `furina_surprised`

**SFX:** `surprise` / volume 0.24

**푸리나**  
자, 잠깐!

**PLAYER**  
가만있어.

**FURINA:** `furina_flustered`

**푸리나**  
손부터 뻗지 말고 말을 먼저 하라고!

**PLAYER**  
말했으면 가만히 있었을 거야?

**푸리나**  
…그건 또 별개의 문제지!

**NARRATION**  
그렇게 말하면서도 푸리나는 뒤로 물러나지 않았다.  
냅킨이 입가를 스치는 동안, 푸리나는 눈을 질끈 감고 있었다.

**푸리나**  
…다 됐어?

**PLAYER**  
응. 깨끗해.

**푸리나**  
…고마워.

**FURINA:** `furina_pout`

**푸리나**  
그러니까 이건 놀리면 안 되는 거야.

→ `end`

---

# END

**BGM:** `ending_warm` / fade 1.5s

**TITLE CARD:**  
`이후 이야기는 아직 미완성입니다.`

(크림 장면 뒤에서 이야기를 마친다 — 2026-10-08 사용자 확정. 예전 SCENE 05·Choice 5·엔딩 3종은 삭제)

---

# 3. 구현/연출 규칙

- 기존 웹 미연시 엔진 구조는 유지한다.
- 기존 에셋 파일은 그대로 사용한다.
- 선택지는 총 2회(점수 없음).
- Choice 2, Choice 4는 3개 선택지이므로 UI가 3개 버튼도 안정적으로 표시해야 한다.
- PC 16:9 우선, 모바일 세로 화면도 깨지지 않게 한다.
- 스프라이트 교체는 150~250ms crossfade.
- `furina_surprised`는 짧은 shake 가능.
- `furina_flustered`는 아주 약한 zoom-in 가능.
- BGM은 loop, 전환은 1.5초 crossfade.
- 첫 사용자 입력 이후에만 오디오 재생.
- 기존 음소거/볼륨 UI 유지.
- 세이브/로드는 추가하지 않는다.
- 대사를 임의로 다시 쓰지 않는다.
- 기존 코드에서 구현 가능한 범위에 집중하고 새 시스템을 과도하게 추가하지 않는다.

---

# 4. Claude Code 수정 지시

```txt
기존 구현은 유지하고 scenario.ts를 이 대본과 정확히 동기화해.

중요:
- UI/오디오 엔진/이미지 로딩 코드는 불필요하게 다시 만들지 마.
- 선택지는 총 2회(Choice 2, 4)이며 둘 다 3지선다야. 점수 없음.
- 크림 장면(SCENE 04) 뒤에서 끝난다. 엔딩 분기 없음.
- 기존 에셋 파일명은 그대로 사용해.
- 구현 후 끝까지 도달 가능한지만 확인해.
- 전체 자동 플레이를 반복해서 과도하게 돌릴 필요는 없어.
```
