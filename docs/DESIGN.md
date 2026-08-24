# 디자인 가이드

`docs/tokens.mdx`가 토큰 *사용법*을 다룬다면, 이 문서는 토큰/컴포넌트를 *언제 어떻게* 조합해야 하는지를 다룹니다. Figma "몽몽유치원" 파일의 Components 문서 페이지가 항상 최종 근거이고, 이 문서는 그걸 코드 작업자가 빠르게 참고할 수 있게 요약한 것입니다. Figma가 바뀌면 이 문서도 같이 갱신하세요.

## 브랜드 성격

몽몽유치원은 유치원생 대상 모바일 앱입니다. 톤은 부드럽고 친근해야 하며, 성인 대상 서비스 디자인시스템의 관례(예리한 대비, 밀도 높은 정보 배치)를 그대로 들여오지 않습니다:

- 카피는 짧고 다정한 문장. Figma에 적힌 문구를 그대로 옮기고 임의로 격식을 높이거나 줄이지 않습니다(`AGENTS.md` 컴포넌트 구현 금지사항).
- 색상은 원색 대비보다 `*Weak` 계열(`vars.color.fill.brandWeak` 등) 사용 빈도가 높은 편 — 자극적인 대비를 피하는 방향.
- 라운드 처리가 기본값에 가깝습니다. `vars.radius.*`가 각지지 않은 값 위주인 이유이기도 합니다.

## 색상 사용 맥락

- `fill.brand` / `fill.brandWeak` / `fill.brandPressed` — 주요 액션(버튼 등)의 기본/보조/눌림 상태. 셋을 섞어 쓰지 않고 컴포넌트당 한 세트만 사용.
- `fill.danger` 계열은 삭제/경고 등 되돌리기 어려운 액션에만. 단순 에러 텍스트는 `text` 쪽 시맨틱 토큰을 우선 검토.
- `fill.neutral` / `fill.inverse` 계열은 배경 대비용이지 브랜드 강조용이 아님 — CTA에 쓰지 않습니다.
- 라이트/다크 분기 코드를 직접 작성하지 않습니다. `vars.color.*`만 쓰면 `data-theme="dark"`로 자동 전환됩니다(`docs/tokens.mdx` 참고).

## 스페이싱 사용 맥락

- 컴포넌트 내부 패딩은 `vars.spacing.padding.*`, 컴포넌트 사이 간격(레이아웃 레벨)은 `vars.spacing.gap.*` 계열을 쓰는 식으로 "내부 vs 외부"를 구분해서 고릅니다. 하나의 컴포넌트가 두 역할을 섞어 쓰지 않게 주의.
- 사이즈 토큰이 없는 값(버튼 height 등)은 `AGENTS.md` 컴포넌트 구현 금지사항에 따라 Figma Specs에 적힌 값 그대로만 하드코딩 허용 — 임의로 반올림하거나 다른 컴포넌트 값을 복사하지 않습니다.

## 컴포넌트 조합 규칙

- `Popover`(`kind="tooltip"`)와 `Popover`(기본)는 같은 패키지 — 툴팁이 필요하다고 새 컴포넌트를 만들지 않습니다.
- `TabBar`가 Bottom Navigation 역할을 겸합니다 — 화면 하단 내비게이션에 별도 컴포넌트를 만들지 않습니다.
- `Modal`과 `BottomSheet`는 용도가 다릅니다: 확인/취소 같은 짧은 의사결정은 `Modal`, 목록/폼처럼 스크롤 가능한 콘텐츠는 `BottomSheet`. 이 기준 없이 임의로 선택하지 않습니다.
- `TextField` 계열은 `asChild`를 지원하지 않습니다(`AGENTS.md` 컴포넌트 패턴) — 네이티브 폼 엘리먼트를 감싸는 컴포넌트에 `asChild`를 추가하지 않습니다.

## 쓰지 말 것

- Figma Properties에 없는 색상/사이즈 조합을 코드에서 새로 만들지 않습니다.
- `vars.*`를 거치지 않은 인라인 hex/rgb 색상 (`design-reviewer` 서브에이전트가 감사 대상으로 봄).
- 컴포넌트 루트에 고정 `width` px (`AGENTS.md` 컴포넌트 너비 규칙 — `width: '100%'` + 부모 제어가 기본).
- 이미 있는 컴포넌트와 겹치는 새 패키지 생성 — 먼저 `AGENTS.md` "이름이 겹치는 컴포넌트" 목록과 `packages/` 디렉토리를 확인.

## Figma 레이어 네이밍 컨벤션

현재까지 확인된 패턴(코드/토큰 네이밍에서 역추출한 것 — Figma 파일을 직접 열어 특정 컴포넌트를 새로 구현할 때 실제 레이어명과 다르면 이 섹션을 갱신하세요):

- **토큰 레이어**: Primitive(`Purple.600`, `Gray.200`처럼 팔레트 원시값) → Semantic(`Fill/Brand`, `Text/Secondary`처럼 슬래시 구분 용도명). 컴포넌트는 Semantic만 참조(`docs/tokens.mdx`).
- **컴포넌트 페이지 네이밍**: Figma 컴포넌트명이 패키지 kebab-case로 그대로 옮겨짐(`date-picker`, `bottom-sheet`, `text-field`) — Figma 쪽 이름이 코드 패키지명의 근거입니다. 새 컴포넌트를 만들 때 Figma 컴포넌트명을 임의로 재해석하지 말고 그대로 kebab-case 변환.
- **Properties 축 네이밍**: `color`, `variant`, `size`처럼 축 이름 자체가 코드의 prop 이름이 됩니다(`AGENTS.md` "이 저장소가 뭔지" 섹션 예시 참고) — 축 이름을 일반적인 디자인시스템 관례(`variant`만 쓰는 식)로 바꾸지 않습니다.

이 섹션은 살아있는 문서입니다. `figma-implementer`로 컴포넌트를 구현하면서 실제 레이어 구조가 위와 다르면 이 파일에 반영하세요.
