---
version: 1
slug: "brick-index-html"
primary_target: "brick/index.html"
related_targets: []
---

## Scope
벽돌깨기 게임 화면(Experience). 친구가 휴대폰·PC로 열어 바로 한 판 하는 화면. 지금은 정지 화면만 있다.
Constraints: file://로 열림, 단일 HTML. 벽돌에는 숫자만 넣는다(사용자 규칙). 군더더기 문구 없음.

## History
- 2026-10-16 v1: 레트로 오락실 도트(사용자 선택). 사용자가 "너무 안 예뻐"라며 세련되고 테크닉한 톤을 요청.
- 2026-10-16 v2: impeccable 방향 고르기에서 사용자가 "정밀 계기판 HUD"(IMPECCABLE'S PICK)를 골랐다. 키보드, 세그먼트 표시판, 흔한 벽돌깨기는 고르지 않았다. 막대와 공도 세련되게(사용자 요청).

## Direction contract
THESIS: 벽돌판이 정밀 계측 화면이다. 흔한 둥근 단색 벽돌과 그라데이션 배경을 버리고, 가는 선과 빛나는 숫자로만 말한다.
OWN-WORLD: 푸른빛 도는 검은 바탕 #060a12, 10칸 모눈과 양옆 눈금, 모서리 꺾쇠. 벽돌은 어두운 유리에 1px 색 테두리와 은은한 빛, 숫자색 법칙 1 #4fd8ff · 2 #6c8bff · 3 #b86bff · 4 #ff5c9a. 숫자는 Chakra Petch, 라벨은 Noto Sans KR. 강조색 시안.
STORY: 들어오자마자 숫자 벽돌과 막대·공이 보이고, 숫자가 클수록 차가운 색에서 뜨거운 색으로 세진다는 걸 색으로 안다.
FIRST VIEWPORT: 화면 높이에 맞춘 필드 하나. 맨 위 "점수"와 여섯 자리 숫자(앞자리 0은 흐리게), 시안 짧은 선이 깔린 가는 줄. 위쪽 4×8 벽돌, 바닥 근처 유리 막대(윗변 빛줄, 바닥 반사광)와 추적 고리를 두른 공.
FORM: 사용자가 IMPECCABLE'S PICK 카드를 골랐다(내 목록 1순위, code-led). seed key 1b12b9c3.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
