# 설명

TODO.md에서 "궁금함"/"확인필요"로 표시된 항목에 대한 답변. 실제 버그로 확인된 것은 plan.md 기준으로 코드도 함께 수정함.

## BottomSheet

- **`buttonLayout`**: 버튼 영역(`buttonArea`)의 배치 방향을 결정하는 prop. `horizontal`(기본값)이면 버튼들이 가로로, `vertical`이면 세로로 쌓임.
- **`contentProps`**: Radix `Dialog.Content`에 그대로 spread되는 prop. `aria-*` 속성이나 `onOpenAutoFocus` 같은 Radix 네이티브 옵션을 소비자가 커스터마이징하고 싶을 때 쓰는 탈출구.
- 버튼 영역 width 버그(Basic/TwoButtonsHorizontal/WithContentSlot에서 버튼이 콘텐츠 크기만큼만 표시되던 것)는 실제 버그였음. `BottomSheet.css.ts`의 `buttonArea` recipe를 horizontal일 때 `display:'grid' + gridAutoFlow:'column' + gridAutoColumns:'1fr'`로 바꿔서, 버튼이 1개든 여러 개든 항상 균등하게 폭을 채우도록 고침. (vertical은 flex-column의 기본 `align-items:stretch`로 이미 폭이 꽉 차 있어서 손대지 않음.) Storybook도 `open` 기본값을 `false`로 바꾸고 "열기" 버튼 → 확인/예/아니요 버튼 클릭 시 닫히는 인터랙션으로 전환함.

## Button

- **inverse 배경이 검은색으로 보이는 문제**: 버그 아님. Figma의 Master Component 자체가 남색/어두운 배경 위에 inverse 버튼을 올려놓고 시연하는 것뿐이고, 실제 컴포넌트는 `vars.color.fill.inverse`(밝은 톤, Static.White) 배경 + `vars.color.text.primary`(어두운 글자) 조합. Storybook의 `AllColors` 스토리에서도 같은 이유로 `#333` 배경 래퍼를 준 것 — 프리뷰 편의용이지 실제 배경색이 검은색이라는 뜻은 아님.
- **color/variant/size가 select가 아니라 text로 뜨던 문제**: 실제 버그. `Button.stories.tsx`에 `argTypes` 자체가 없어서 생긴 것 — Card/Checkbox 패턴대로 `argTypes`(select + `Object.values(Enum)`) 추가해서 고침.

## Card

- **`Radii` 오타**: 확인됨, 진짜 오타. Figma 실제 섹션명은 "Radius"인데 코드 쪽 story export가 `Radii`로 되어 있었음 → `Radius`로 rename.
- **한 줄 배치 카드 개수 ↔ radius 보정 가이드 반영 여부**: 토큰 값(`radius.card.s/m/l` = 4/6/8)은 Figma의 3열+/2열/1열 매핑과 이미 정확히 일치함. 컴포넌트가 자동으로 열 수를 세어 radius를 계산해주진 않고 소비자가 `radius` prop을 직접 골라야 하는데, 이건 Figma 쪽에서도 "인접 요소의 둥글기를 따르는 게 자연스러우면 권장값보다 큰 값도 허용"이라고 명시한 것과 같은 방식이라 로직 결함은 아님. 다만 이 매핑 기준이 코드 어디에도 문서화돼 있지 않아서, `Card.tsx`의 `radius` prop에 JSDoc으로 한 줄 요약을 추가함(Storybook autodocs 표에 노출됨).
- **Basic/Variants/Radii 섹션에서 variant·radius가 적용 안 되는 것처럼 보이던 문제**: 실제 버그였음(사용자가 `?args=variant:lower`로 재현). `Card.stories.tsx`의 `Variants`/`Radii`(현재 `Radius`) 스토리가 `render: () => (...)`처럼 인자 없이 고정돼 있어서, Storybook 컨트롤 패널에서 값을 바꿔도 그 값이 render 함수 안으로 전달되지 않았던 것. `Card` 컴포넌트 자체(`Card.tsx`/`Card.css.ts`)의 recipe 로직은 원래도 정상이었음 — 문제는 스토리 코드에 한정됨. `render: (args) => (...{...args}...)`로 고쳐서 컨트롤 값이 반영되게 함.

## Checkbox

- **variant/size/checked/disabled 전부 미적용 의심**: variant/size/checked는 재현 안 됨 — `Checkbox.css.ts`에 4축 모두 정상 구현돼 있음. 다만 **disabled 컨트롤이 Storybook 패널에 아예 안 보이는 것은 실제 버그**였음(사용자가 재확인 요청). `Checkbox.stories.tsx`의 `argTypes`에 `variant`/`size`만 있고 `disabled`가 없었던 게 원인 — `CheckboxProps`가 `Omit<ComponentProps<'input'>, ...>`로 네이티브 prop을 확장하는 구조라 react-docgen-typescript가 `disabled`를 자동으로 못 뽑아내는 것(forwardRef + 제네릭 HTML prop 확장 조합에서 흔한 docgen 한계). `argTypes`에 `disabled: { control: 'boolean' }`을 명시적으로 추가해서 고침.

## DatePicker

- **선택 날짜 텍스트 색상이 F9F9FB(밝은색)여야 하는데 안 바뀌는 것처럼 보이는 문제**: 실제 버그였음. `DatePicker.css.ts`의 `dateCell` recipe `selected: true` 브랜치가 `vars.color.text.strong`을 쓰고 있었는데, `text.strong`의 라이트 테마 실값은 `tokens.json` 기준 `{Gray.800}` = `#3c3c46`(어두운 회색)이라 배경(`vars.color.fill.brand`, 채도 있는 브랜드색) 위에서 대비가 거의 없었음. TODO에서 말한 `F9F9FB`는 실존하는 값이 맞지만, 그건 `text.strong`이 아니라 `vars.color.text.inversePrimary`(`{Gray.50}` = `#f9f9fb`) 토큰의 값 — 토큰 이름을 잘못 짚었던 것. `Button.css.ts`에서 `fill.brand` 배경 위 텍스트에 이미 이 토큰을 쓰고 있어서 같은 패턴을 그대로 가져와 `color: vars.color.text.inversePrimary`로 수정함.
- **Wheel 드래그**: 실제로 없었음(터치/트랙패드 네이티브 스크롤만 지원). `WheelColumn`에 `onMouseDown`/`window` 레벨 `mousemove`/`mouseup`으로 마우스 클릭-드래그 스크롤을 추가함.

## Chip (TODO에는 없었지만 감사 중 신규 발견)

- Figma Properties 축(`Size | Kind | Shape | Variant | Wrap`) 중 `wrap`이 코드에 없어서 항상 `whiteSpace: 'nowrap'`으로 고정돼 있었음. `ChipProps`에 `wrap?: boolean` prop과 recipe variant를 추가해서 줄바꿈 가능한 칩을 표현할 수 있게 함.

## Modal (TODO에는 없었지만 감사 중 신규 발견)

- BottomSheet와 동일한 버튼 영역 width 버그가 있었음(`Modal.css.ts`의 `buttonArea`에 폭 규칙이 없어서 2버튼 가로 배치 시 반반이 안 되고 단일 버튼도 콘텐츠 크기만큼만 보임). BottomSheet에서 쓴 것과 동일한 grid 패턴으로 고침.
