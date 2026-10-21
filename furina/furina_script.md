# 푸리나 웹 미연시 테스트 대본
## Episode 01 — 「기다린 건 아니거든!」

> 용도: 가벼운 웹 미연시 프로토타입 테스트  
> 예상 플레이타임: 약 8~12분  
> 등장인물: 플레이어, 푸리나  
> 장소: 살롱 1곳 / 시간대 변화  
> 선택지: 3회  
> 엔딩: 2종  
> 이 문서를 스토리/연출의 source of truth로 사용한다.

---

# 0. 에셋 매핑

## 배경

- `bg_salon_day` → `furina_bg/bg_salon_day.png`
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

## 기본 오디오 믹스

```txt
master = 1.00
bgm = 0.42
ambience = 0.16
sfx = 0.50
dialogueAdvance = 0.18
```

- 첫 사용자 입력 전에는 오디오를 재생하지 않는다.
- BGM 기본 전환은 1.5초 crossfade.
- ambience는 BGM보다 훨씬 작게 유지한다.
- 오디오 로딩 실패는 게임 진행을 막지 않는다.

---

# 1. 상태값

```txt
affection = 0
tease = 0
choice1 = null
choice2 = null
choice3 = null
```

## 엔딩 조건

```txt
if affection >= 2:
    goto ENDING_A
else:
    goto ENDING_B
```

둘 다 배드엔딩은 아니다. 테스트 목적상 감정선만 다르게 마무리한다.

---

# SCENE 01 — 기다린 건 아니거든

**BG:** `bg_salon_evening`  
**BGM:** `salon_evening` / fade in 1.5s  
**AMBIENCE:** 없음  
**FURINA:** 없음

**NARRATION**  
해가 완전히 지기 전, 살롱의 긴 창문 너머로 푸른빛이 번지고 있었다.

**NARRATION**  
약속 시간보다 조금 늦었다.

**SFX:** `door_open` / volume 0.55

**FURINA IN:** `furina_pout`

**푸리나**  
…늦었군.

**PLAYER**  
미안. 많이 기다렸어?

**푸리나**  
기다려?

**FURINA:** `furina_default`

**푸리나**  
하! 아주 재미있는 착각을 하는군.  
이 몸이 고작 네가 오기만을 기다리며 시간을 보냈을 거라고 생각한 건가?

**NARRATION**  
푸리나는 그렇게 말하면서도 테이블 위의 찻잔을 슬쩍 가렸다.

**SFX:** `cup_place` / volume 0.30

**PLAYER**  
그 찻잔, 두 개네.

**FURINA:** `furina_surprised`  
**SFX:** `surprise` / volume 0.34

**푸리나**  
…….

**FURINA:** `furina_flustered`

**푸리나**  
이, 이건 당연히 예비용이다!  
귀한 손님이 갑자기 찾아올 가능성을 고려한 완벽한 준비지.

**PLAYER**  
귀한 손님?

**푸리나**  
그래. 아주 귀하고, 중요하고—

**FURINA:** `furina_pout`

**푸리나**  
왜 그렇게 웃는 거지?

---

## CHOICE 1

### 1A. 「그래도 기다려준 건 고맙네.」

```txt
affection += 1
choice1 = "soft"
```

**FURINA:** `furina_flustered`

**푸리나**  
누, 누가 기다렸다고 했나!

**PLAYER**  
응. 알겠어.

**푸리나**  
그렇게 순순히 넘어가면 더 이상하잖아…

---

### 1B. 「예비용 찻잔에 내 이름이라도 써둘까?」

```txt
tease += 1
choice1 = "tease"
```

**FURINA:** `furina_surprised`

**푸리나**  
뭐?!

**FURINA:** `furina_pout`

**푸리나**  
건방지군.  
그 정도 특권을 원한다면 적어도 오늘의 손님으로서 품위를 보여야 할 거야.

---

# SCENE 02 — 디저트 재판

**FURINA:** `furina_default`

**푸리나**  
마침 잘 왔어.  
오늘은 아주 중요한 판결을 내려야 하거든.

**PLAYER**  
판결?

**푸리나**  
그렇다.

**NARRATION**  
푸리나는 테이블 위에 놓인 작은 디저트 상자를 엄숙하게 열었다.

**SFX:** `cup_place` / volume 0.18

**푸리나**  
신작 케이크 세 종류.  
딸기, 초콜릿, 그리고 크림과 과일을 얹은 타르트.

**PLAYER**  
중요하긴 하네.

**FURINA:** `furina_happy`

**푸리나**  
그렇지?!  
역시 넌 사안의 중대함을 이해하는군!

**NARRATION**  
방금 전까지의 위엄은 어디로 갔는지, 푸리나의 눈이 눈에 띄게 반짝였다.

**PLAYER**  
그래서 내가 뭘 하면 되는데?

**푸리나**  
시식. 평가. 그리고 최종 판결.

**PLAYER**  
혼자 먹기엔 많아서 부른 거 아니고?

**FURINA:** `furina_surprised`

**푸리나**  
……!

**FURINA:** `furina_pout`

**푸리나**  
재판장에서 불필요한 추측은 금지다.

---

## CHOICE 2

### 2A. 「그럼 푸리나가 제일 좋아하는 것부터 먹자.」

```txt
affection += 1
choice2 = "considerate"
```

**FURINA:** `furina_flustered`

**푸리나**  
내가 좋아하는 것부터?

**PLAYER**  
응. 오늘의 재판장은 푸리나잖아.

**푸리나**  
흠… 제법 합리적인 주장이다.

**FURINA:** `furina_happy`

**푸리나**  
좋아. 그럼 타르트부터다!

---

### 2B. 「내가 먼저 고를래. 초콜릿.」

```txt
choice2 = "self"
```

**FURINA:** `furina_pout`

**푸리나**  
잠깐! 아직 재판장이 허가하지 않았는데!

**PLAYER**  
이미 한입 먹었는데?

**푸리나**  
……정말이지 너는!

**FURINA:** `furina_happy`

**푸리나**  
그래서, 맛은?

---

# SCENE 03 — 조금 조용해진 시간

**BG:** `bg_salon_night` / crossfade 1.2s  
**BGM:** `salon_evening` → `quiet_night` / crossfade 1.5s  
**AMBIENCE:** `salon_night_water` / fade in 2.0s / loop

**NARRATION**  
디저트를 다 먹고 나니 창밖은 어느새 완전히 어두워져 있었다.

**FURINA:** `furina_default`

**푸리나**  
결론적으로 오늘의 우승자는 타르트다.

**PLAYER**  
아까부터 세 번째로 말하는 중이야.

**푸리나**  
중요한 판결은 여러 번 확인해야 하는 법이지.

**PLAYER**  
그럼 다음에도 같이 먹자.

**FURINA:** `furina_flustered`

**푸리나**  
다, 다음?

**PLAYER**  
싫어?

**푸리나**  
싫다고는 안 했어.

**NARRATION**  
푸리나가 창밖으로 시선을 돌렸다.

**FURINA:** `furina_default`

**푸리나**  
요즘은 이런 시간이… 나쁘지 않군.

**PLAYER**  
디저트 먹는 시간?

**푸리나**  
그것도 그렇지만.

**NARRATION**  
잠시 침묵이 흘렀다.

**FURINA:** `furina_sad`  
**AUDIO:** BGM gain → 0.78 over 0.8s

**푸리나**  
아무것도 증명하지 않아도 되는 시간 말이야.

**PLAYER**  
…….

**푸리나**  
사람들 앞에 서면 말이지.  
내가 먼저 분위기를 만들고, 웃어야 하고, 뭔가 멋진 말을 해야 할 것 같은 기분이 들 때가 있어.

**푸리나**  
물론 난 잘하지. 아주 훌륭하게.

**PLAYER**  
응.

**푸리나**  
그렇게 바로 인정하면 또 재미없잖아.

**FURINA:** `furina_default`

**푸리나**  
하지만 가끔은… 그냥 조용히 있어도 괜찮은 상대가 있다는 게 편하긴 해.

---

## CHOICE 3

### 3A. 「그럼 지금은 아무 말 안 해도 돼.」

```txt
affection += 1
choice3 = "stay"
```

**FURINA:** `furina_surprised`  
**SFX:** `surprise` / volume 0.22

**푸리나**  
…….

**FURINA:** `furina_flustered`

**푸리나**  
정말 아무 말도 안 할 건가?

**PLAYER**  
푸리나가 말하고 싶을 때까지.

**NARRATION**  
푸리나는 잠시 말이 없었다.

**FURINA:** `furina_happy`

**푸리나**  
…그건 꽤 마음에 드는 대답이네.

---

### 3B. 「그래도 푸리나가 떠드는 건 재밌는데.」

```txt
tease += 1
choice3 = "banter"
```

**FURINA:** `furina_surprised`

**푸리나**  
떠, 떠들어?!

**FURINA:** `furina_pout`

**푸리나**  
이 몸의 화려한 화술을 ‘떠든다’고 표현하다니!

**PLAYER**  
봐. 바로 평소대로 돌아왔네.

**FURINA:** `furina_flustered`

**푸리나**  
……일부러 그런 거였나?

**PLAYER**  
글쎄?

**FURINA:** `furina_happy`

**푸리나**  
정말 얄미운 녀석이군.

---

# ENDING A — 다음에도 와도 좋아

**조건:** `affection >= 2`  
**BG:** `bg_salon_night`  
**BGM:** `quiet_night` → `ending_warm` / crossfade 1.5s  
**AMBIENCE:** `salon_night_water` / keep looping  
**FURINA:** `furina_default`

**푸리나**  
벌써 갈 건가?

**PLAYER**  
시간이 늦었잖아.

**푸리나**  
그건 그렇지만…

**FURINA:** `furina_flustered`

**푸리나**  
다음에는 조금 일찍 와.

**PLAYER**  
다음이 있네?

**푸리나**  
당연하지!

**푸리나**  
오늘의 디저트 재판은 어디까지나 1차 심리였으니까.  
아직 검토해야 할 디저트가 산더미처럼 남아 있다.

**PLAYER**  
알겠어. 그럼 또 올게.

**NARRATION**  
문을 열려는 순간, 뒤에서 작은 목소리가 들렸다.

**FURINA:** `furina_happy`

**푸리나**  
…그리고.

**푸리나**  
꼭 디저트가 없어도 와도 좋아.

**PLAYER**  
뭐라고?

**FURINA:** `furina_surprised`

**푸리나**  
못 들었으면 됐다!

**FURINA:** `furina_pout`

**푸리나**  
어서 가! 오늘 재판은 폐정이다!

**NARRATION**  
문이 닫히기 직전, 푸리나가 웃고 있는 게 보였다.

**TITLE CARD:**  
`ENDING A — 다음에도 와도 좋아`

---

# ENDING B — 다음엔 늦지 마

**조건:** `affection < 2`  
**BG:** `bg_salon_night`  
**BGM:** `quiet_night` → `ending_warm` / crossfade 1.5s  
**AMBIENCE:** `salon_night_water` / keep looping  
**FURINA:** `furina_pout`

**푸리나**  
오늘은 이 정도로 해두지.

**PLAYER**  
재밌었어.

**푸리나**  
당연하지. 내가 함께했으니까.

**PLAYER**  
다음에도 불러줘.

**FURINA:** `furina_default`

**푸리나**  
흠. 네 태도를 봐서 생각해보도록 하지.

**PLAYER**  
그럼 기다릴게.

**FURINA:** `furina_flustered`

**푸리나**  
그 표현은 왜 또 그렇게 하는 건데!

**PLAYER**  
왜?

**푸리나**  
아무것도 아니다.

**FURINA:** `furina_pout`

**푸리나**  
대신 다음엔 늦지 마.

**PLAYER**  
알겠어.

**푸리나**  
…정말로.

**FURINA:** `furina_happy`

**푸리나**  
이번엔 내가 기다린 게 아니었지만, 다음엔 아닐 수도 있으니까.

**TITLE CARD:**  
`ENDING B — 다음엔 늦지 마`

---

# 2. 구현/연출 규칙

- PC 기준 16:9 우선.
- 푸리나 기본 위치는 화면 중앙보다 살짝 오른쪽.
- 스프라이트 교체는 150~250ms crossfade.
- `furina_surprised`는 2~4px 정도의 짧은 shake 가능.
- `furina_flustered`는 아주 약한 zoom-in 가능.
- `furina_sad`에서는 BGM을 15~20% 낮추고 텍스트 속도를 조금 느리게 한다.
- 선택지는 한 화면에 2개.
- 선택지 hover 진입 시 `ui_click` 1회.
- 선택 확정 시 `ui_select`.
- 일반 진행음 `dialogue_advance`는 매우 작게 사용하고 70ms 이내 중복 재생을 막는다.
- BGM은 loop하며 장면 전환 시 갑자기 끊지 않는다.
- `salon_night_water`는 밤 장면에만 loop한다.
- 첫 클릭/스페이스 입력 이후에만 오디오 재생을 unlock한다.
- 음소거 버튼과 BGM/SFX 볼륨 조절을 제공한다.
- 세이브/로드는 이번 프로토타입에서 제외한다.
- 파일 하나가 누락되어도 전체 진행이 멈추지 않게 한다.
- 대사를 임의로 추가하거나 다시 쓰지 않는다.

---

# 3. 구현 데이터 권장 형태

Claude Code는 이 MD를 읽고 `scenario.ts` 또는 `scenario.json`으로 변환해도 된다.

권장 필드 예시:

```ts
{
  id: "scene01_line01",
  speaker: "furina",
  text: "…늦었군.",
  expression: "furina_pout",
  bg: "bg_salon_evening",
  audio: {
    bgm: "salon_evening"
  },
  next: "scene01_line02"
}
```

선택지:

```ts
{
  choices: [
    {
      text: "그래도 기다려준 건 고맙네.",
      effects: { affection: 1 },
      next: "choice1_soft"
    },
    {
      text: "예비용 찻잔에 내 이름이라도 써둘까?",
      effects: { tease: 1 },
      next: "choice1_tease"
    }
  ]
}
```
