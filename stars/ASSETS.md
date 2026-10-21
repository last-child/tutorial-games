# 별 잡는 밤 — GPT 에셋 요청서

그린 PNG를 `stars/img/`에 **아래 파일 이름 그대로** 넣으면 게임이 임시 그림 대신 그 그림을 자동으로 씁니다. 없는 파일은 임시 그림으로 남습니다.

## 공통 규칙

- 형식: **투명 배경 PNG**. 투명이 안 되면 그림에 안 쓰인 단색 배경(예: 형광 초록 `#00ff00`)으로 받으세요. 배경은 제가 지웁니다.
- 주인공 캔버스: **1024×1536 세로**. 머리 위와 발밑에 여백을 조금 두고, 몸이 가운데 오게 합니다.
- 정령 캔버스: **1024×1024 정사각**.
- 같은 묶음(예: 주인공 대기 레이어)은 **캔버스 크기와 캐릭터 위치가 똑같아야** 겹쳐 쓸 수 있습니다. 조금 어긋나는 건 제가 맞춥니다.
- 매번 **주인공 기준 그림(1번)을 첨부**하고 "same character, same art style"을 붙이면 그림체가 덜 흔들립니다.

### 공통 스타일 문장 (모든 프롬프트 끝에 붙이기)

```
subculture mobile gacha game illustration, clean cel shading, soft lineart,
mobile-game boy proportions (about 1:6 head-to-body, not chibi, not a tall teen),
soft rounded face, large clear eyes, gentle eye shape (not sharp),
minimal ornaments (no excessive frills, ribbons or lace),
night-sky palette: deep navy, starlight gold, silver, pale lavender,
transparent background, full body, centered
```

## 1. 주인공 (시엘, 중성적인 소년)

### 1-0. 기준 그림 먼저

```
A slender boy, about 13 years old.
Pretty androgynous face that could be mistaken for a girl, soft jawline,
large clear lavender-blue eyes, calm gentle smile.
Silver hair to the nape with pale lavender tips, soft side locks.
Outfit: short deep-navy cape with a high collar lined in pale lavender,
white shirt, navy vest with three small gold star buttons, navy shorts,
white knee socks, navy short boots with thin gold trim.
Holds a slim silver wand with a small gold star on the tip.
Standing pose, facing slightly to the right (three-quarter view).
```

이 그림이 마음에 들 때까지 다시 뽑고, 정해지면 아래부터는 이 그림을 계속 첨부합니다.

> **받음 (2026-10-13):** `hero-reference.png`(초록 배경). 배경을 지워 `hero-body.png`로 임시로 쓰고 있습니다. 지팡이는 없는 버전입니다.

### 1-1. 레이어 (망토 펄럭임과 눈 깜빡임용)

시엘은 대결 화면에 나오지 않으므로 포즈 그림은 필요 없고, 이 세 장만 있으면 됩니다. 이야기 장면의 표정 그림은 이야기가 정해진 뒤에 따로 요청합니다.

| 파일 | 내용 | 프롬프트에 덧붙일 말 |
|---|---|---|
| `hero-body.png` | 늘어진 망토 천을 **뺀** 몸 전체 | `same image, but remove the hanging cape fabric behind the arms. keep the standing collar, the shoulder part and everything else identical` |
| `hero-cape.png` | 어깨 아래로 늘어진 **망토 천만** | `same image, only the cape alone, as if the boy were invisible. same size and position` |
| `hero-blink.png` | 눈 감은 버전 | `same image, identical in every way, but eyes gently closed` |

- 세 장 모두 레퍼런스처럼 **초록 배경, 1024×1536, 같은 자세와 위치**면 됩니다. 배경은 제가 지웁니다.
- 망토 천은 몸 **뒤에** 깔려서 펄럭입니다. 목 칼라와 어깨를 덮는 부분은 움직이지 않으니 `hero-body.png` 쪽에 남겨 주세요.
- `hero-blink.png`는 몸 전체가 그려져 있어도 괜찮습니다. 눈 깜빡일 때 통째로 겹칩니다.

## 2. 12궁 정령 (작은 마스코트형)

정령마다 `spirit-<id>.png`(기본), `spirit-<id>-lose.png`(졌을 때, 눈이 >< 이거나 놀란 표정)를 만듭니다. 모두 24장입니다.

정령의 생김새와 성격은 별자리 이름 그대로의 특징에서 따왔습니다.

### 공통 프롬프트

```
A small round mascot spirit of the zodiac sign {별자리}, {모티프}.
Body made of soft glowing starlight, {색}, tiny gold star accents,
big sparkly eyes, cute but not babyish, no human body.
Same art style as the attached protagonist. 1024x1024, transparent background.
```

| id | 별자리 | 모티프 | 색 |
|---|---|---|---|
| `aries` | 양자리 | 복슬복슬한 아기 양, 입가에 풀 한 가닥 | 코랄, 크림 |
| `taurus` | 황소자리 | 졸린 눈의 통통한 송아지, 느긋한 표정 | 민트, 올리브 |
| `gemini` | 쌍둥이자리 | 똑같이 생긴 별 모양 아기 정령 둘, 서로 밀치는 중 | 레몬, 하늘 |
| `cancer` | 게자리 | 동그란 아기 게, 옆으로 걷는 자세, 집게를 번쩍 듦 | 청록, 연보라 |
| `leo` | 사자자리 | 갈기가 작아서 고양이처럼 보이는 아기 사자, 거만한 표정 | 주황, 금색 |
| `virgo` | 처녀자리 | 밀 이삭을 안은 작은 요정, 수줍은 표정 (사람 몸이 아닌 작은 정령 몸) | 올리브, 민트 |
| `libra` | 천칭자리 | 작은 저울을 머리에 인 둥근 정령, 진지한 표정 | 하늘, 레몬 |
| `scorpio` | 전갈자리 | 꼬리 끝이 별인 아기 전갈, 친해지고 싶은 표정 | 보라, 청록 |
| `sagittarius` | 사수자리 | 작은 활을 멘 아기 켄타우로스(망아지 몸) | 코랄, 주황 |
| `capricorn` | 염소자리 | 높은 바위 위에 선 아기 염소 | 올리브, 민트 |
| `aquarius` | 물병자리 | 물병 속에서 고개를 내민 물방울 정령 | 하늘, 청록 |
| `pisces` | 물고기자리 | 꼬리가 끈으로 묶인 아기 물고기 두 마리, 서로 반대쪽을 봄 | 연보라, 청록 |

> **받음 (2026-10-13):** `spirit-aries.png` (황금 뿔과 금색 발굽의 흰 양). 파일 이름은 `sprite-`가 아니라 `spirit-`으로 시작해야 게임이 찾습니다. 졌을 때 그림(`-lose`)이 아직 없으면 기본 그림을 그대로 씁니다.

## 3. 손 (가위·바위·보 버튼과 공개 카드에 씀)

| 파일 | 내용 |
|---|---|
| `hand-scissors.png` | 가위 |
| `hand-rock.png` | 바위(주먹) |
| `hand-paper.png` | 보(편 손) |

```
A single hand showing {rock / scissors / paper} in rock-paper-scissors,
wearing a white glove with a navy cuff and one small gold star,
game UI icon style, bold clean outline, 1024x1024, transparent background
```

## 4. 배경

이야기를 새로 짜고 있어서, 배경 목록은 이야기가 정해진 뒤에 다시 적습니다. 그 전에는 요청하지 않습니다.

## 5. 소품 (선택)

| 파일 | 내용 |
|---|---|
| `card-back.png` | 카드 뒷면 무늬. 남색 바탕에 금색 원형 천구도. 세로 1024×1536 |

## 제가 직접 만드는 것 (요청하지 않아도 됨)

- 별지도: 실제 12궁 별 배치를 선으로 그립니다.
- 카드 틀: 정령 그림에 금테, 이름판, 별자리 선을 입혀 카드로 만듭니다.
- 대화창, 버튼 틀, 점수 별, 마법진, 반짝이·불꽃·물방울 이펙트, 효과음.
- 제목 글씨 "별 잡는 밤". 글꼴은 UI를 새로 설계할 때 정합니다.

## 우선순위

1. 정령 기본 12장 (대결 화면 가운데에 크게 나오는 주인공입니다)
2. 손 3장
3. `hero-body`, `hero-cape`, `hero-blink` (타이틀의 망토 펄럭임과 깜빡임)
4. 정령 졌을 때 12장
5. 소품
