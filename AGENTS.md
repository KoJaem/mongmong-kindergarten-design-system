# 저장소 가이드라인

> AI 코딩 에이전트(Claude Code, Codex, Jules, Cursor 등)가 이 저장소에서 작업할 때 참고하는 가이드입니다.
>
> **References:** [AGENTS.md 공식 스펙](https://agents.md/) · [AGENTS.md 한국어 설명](https://daleseo.com/agents-md/)

## 이 저장소가 뭔지

몽몽유치원(mongmong kindergarten) 모바일 앱을 위한 UI 컴포넌트 라이브러리입니다. 1인 프로젝트이고, Figma에 그려진 실제 디자인시스템("몽몽유치원" 파일의 "Components" 문서 페이지)을 코드로 옮기는 게 목적입니다 — 컴포넌트 목록/prop 이름을 정할 때 이미 있는 다른 디자인시스템의 관례를 베끼지 말고 **Figma의 Properties/Specs 프레임을 우선 근거로 삼으세요**. 예: `Button`은 `variant(fill/outline/ghost)` 같은 일반적인 이름이 아니라 Figma가 실제로 쓰는 `color(brand/neutral/inverse) + variant(fill/weak) + size(s/m/l/xl)` 축을 따릅니다.

## 프로젝트 구조 및 모듈 구성

`packages/*`에 배포 가능한 컴포넌트와 유틸리티가 위치합니다. 각 패키지는 `src/`에 구현체를, `tsup.config.ts`에 빌드 설정을, 컴포넌트 파일 옆에 테스트/스토리를 둡니다. `packages/mongmong`은 전체 컴포넌트 + 토큰을 한 번에 export하는 aggregator 패키지입니다. `docs/`에 Storybook용 MDX 콘텐츠가 있습니다(별도 문서 사이트는 없음 — `pnpm-workspace.yaml`에 Docusaurus는 의도적으로 보류됨). 새 컴포넌트는 폴더를 복사하지 말고 `.templates/component`와 `scripts/createComponent.ts`(`pnpm create:component`)로 스캐폴딩하세요. 배포 패키지가 변경되면 `.changeset/`에 릴리스 노트를 추가하세요.

## 디자인 토큰

`tokens/tokens.json`이 Figma Tokens Studio에서 export된 W3C Design Tokens 포맷의 **유일한 소스**입니다. `packages/tokens/config.js`가 Style Dictionary + `@tokens-studio/sd-transforms`로 세 파일을 각각 빌드합니다:

- 테마 무관 값(Typography/Radius/Spacing) → `shared.css`
- 라이트 컬러 → `color-light.css` (`:root`)
- 다크 컬러 → `color-dark.css` (`[data-theme="dark"]`)

`packages/tokens/src/theme/contract.css.ts`가 vanilla-extract `createGlobalThemeContract`로 이 CSS 변수들을 `vars` 객체로 노출하고, 모든 CSS 변수 이름 앞에는 **`mkds-`** 프리픽스가 붙습니다(예: `vars.color.fill.brand` → `var(--mkds-fill-brand)`). **side 저장소처럼 값을 손으로 다시 적은 병행 TS 모듈은 만들지 않습니다** — `tokens/tokens.json` 하나만 고치면 CSS와 타입이 같이 갱신되는 구조를 유지하세요.

토큰 갱신 흐름: Figma Tokens Studio → `design/figma-token` 브랜치 push → `.github/workflows/tokens.yaml`이 빌드/타입체크/CSS diff 검증 → `main`으로 sync PR 자동 생성.

## 컴포넌트 패턴

모든 컴포넌트는 다음 구조를 따릅니다:

1. **`Component.tsx`** — `forwardRef` 래퍼, `ComponentProps<'element'>` 확장, variant enum을 `const` 객체로 정의하고 매칭 타입 생성, Radix `Slot`을 통한 `asChild` 지원(단, `TextField`처럼 네이티브 폼 엘리먼트를 감싸는 컴포넌트는 `asChild` 없이 그대로 native element를 반환)
2. **`Component.css.ts`** — Vanilla Extract `recipe()`에 enum 값을 키로 하는 variant 맵, `@kojaem/tokens`의 `vars` 사용
3. **`Component.stories.tsx`** — `Meta`/`StoryObj` 타입을 사용하는 Storybook
4. **`Component.test.tsx`** — Vitest + `@testing-library/react` (happy-dom 환경)
5. **`index.ts`** — Re-exports

Variant enum 패턴 (값 객체 + 타입 유니온):
```ts
export const ButtonSize = { s: 's', m: 'm', l: 'l', xl: 'xl' } as const;
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];
```

클래스 조합: `clsx(styles.recipe({ variant, size }), conditionalStyles, className)`

이름이 겹치는 컴포넌트가 있습니다 — 별도 패키지를 새로 만들기 전에 확인하세요:
- **Tooltip**은 별도 패키지가 아니라 `@kojaem/popover`의 `kind="tooltip"`입니다.
- **Bottom Navigation**은 별도 패키지가 아니라 `@kojaem/tab-bar`입니다(Figma에서도 같은 컴포넌트를 가리키는 두 이름).

## 스타일링 규칙

- 모든 스타일은 **vanilla-extract**의 `recipe()`를 사용하여 variant 처리
- 디자인 토큰은 반드시 `import { vars } from '@kojaem/tokens'`로 import — 색상, 간격, 타이포그래피 값을 하드코딩하지 말 것
- 컴포넌트는 라이트(`:root`)와 다크(`[data-theme="dark"]`) 테마 모두에서 정상 동작해야 합니다. `vars.color.*`만 사용하면 자동으로 보장됩니다.
- 각 패키지는 소비자를 위해 `./styles.css`를 export

## 컴포넌트 구현 금지사항

Figma 구현 시 다음을 임의로 하지 마세요:

- Figma Properties 패널에 없는 variant/state를 추가로 만들지 않습니다(예: Figma에 `size(s/m/l/xl)`만 있는데 `xs`를 임의로 추가 금지).
- 원본 텍스트·라벨·플레이스홀더를 임의로 바꾸지 않습니다. Figma에 적힌 문구를 그대로 코드/스토리에 옮기세요.
- Figma Specs(간격, 반경, 색상)에 없는 값으로 확장하지 않습니다. 애매하면 만들지 말고 질문하세요.

## 컴포넌트 너비 규칙

컴포넌트 루트에 고정 `width` px 값을 하드코딩하지 않습니다. 기본값은 `width: '100%'`로 두고, 실제 크기는 부모(컨슈머)의 컨테이너/padding이 결정하게 합니다. 단, `BottomSheet`처럼 모달류가 자체 최대 너비 제약을 갖는 경우는 예외로 허용됩니다(그 경우도 Figma Specs에 명시된 값만 사용).

## 에이전트 위임 규칙

- Figma URL을 받아 컴포넌트를 새로 만들거나 갱신할 때 → `figma-implementer` 서브에이전트.
- 코드를 저장하지 않고 빌드/타입/린트/테스트/토큰/스토리 상태를 빠르게 점검할 때 → `design-qa` 서브에이전트(읽기 전용, 수정 안 함).
- 코드의 토큰 하드코딩을 감사하거나, Figma 변수와 `tokens/tokens.json`이 일치하는지 비교할 때 → `design-reviewer` 서브에이전트.

## 코딩 스타일 및 네이밍 컨벤션

strict TypeScript를 사용하고, 각 패키지의 `src/index.ts`에서 공개 API를 명시하세요. 기존 네이밍 패턴을 따르세요: 패키지 폴더는 kebab-case(Figma 컴포넌트명을 그대로 옮김 — `date-picker`, `bottom-sheet`, `text-field` 등), React 컴포넌트는 PascalCase, 테스트는 `*.test.tsx`, 스토리는 `*.stories.tsx`, vanilla-extract 스타일은 `*.css.ts`.

## 테스트 가이드라인

모든 동작 변경에 대해 Vitest 커버리지를 추가하거나 업데이트하세요. 테스트는 `happy-dom` 환경에서 실행되며, 검증 대상 컴포넌트 옆에 위치해야 합니다. 접근성 상태, variant 렌더링, controlled/uncontrolled 동작을 커버하세요. Storybook 스토리는 수동 리뷰에 도움이 되지만 테스트를 대체하지 않습니다.

## 커밋 및 PR 가이드라인

[Conventional Commits](https://www.conventionalcommits.org/) 사용. 브랜치 흐름은 `feature/<subject>-kojaem` → `dev` → `main`. 배포 패키지 변경 시 `.changeset` 항목 포함(형식은 `.changeset/add-button-component.md` 참고 — Claude에게 시킬 때는 `pnpm changeset`을 직접 실행하는 대신 이 형식으로 `.changeset/<이름>.md` 파일을 바로 작성하면 됩니다).

## 배포

Changesets 기반으로 GitHub Package Registry(`https://npm.pkg.github.com`, 스코프 `@kojaem`)에 릴리스. `main` merge 시 `.github/workflows/release.yaml`이 "Version Packages" PR을 자동 생성하고, 그 PR을 merge하면 실제 publish까지 자동으로 됩니다. 자세한 절차/트러블슈팅은 [DEPLOY.md](./DEPLOY.md) 참고.
