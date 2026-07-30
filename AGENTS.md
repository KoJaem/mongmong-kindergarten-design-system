# 저장소 가이드라인

> AI 코딩 에이전트(Claude Code, Codex, Jules, Cursor 등)가 이 저장소에서 작업할 때 참고하는 가이드입니다.
>
> **References:** [AGENTS.md 공식 스펙](https://agents.md/) · [AGENTS.md 한국어 설명](https://daleseo.com/agents-md/)

## 프로젝트 구조 및 모듈 구성

`packages/*`에 배포 가능한 컴포넌트와 유틸리티가 위치합니다. 각 패키지는 `src/`에 구현체를, `tsup.config.ts`에 빌드 설정을, 컴포넌트 파일 옆에 테스트/스토리를 둡니다. `packages/tokens`는 공유 디자인 토큰(`tokens/tokens.json`, Figma Tokens Studio export)을 Style Dictionary로 변환해 라이트/다크 CSS 변수와 타입을 생성합니다. `packages/mongmong`은 전체 export를 집계하는 aggregator 패키지입니다. `docs/`에 Storybook용 MDX 콘텐츠가 있습니다. 공유 정적 자산은 `public/`에 둡니다. 새 컴포넌트는 폴더를 복사하지 말고 `.templates/component`와 `scripts/createComponent.ts`로 스캐폴딩하세요. 배포 패키지가 변경되면 `.changeset/`에 릴리스 노트를 추가하세요.

## 컴포넌트 패턴

모든 컴포넌트는 다음 구조를 따릅니다:

1. **`Component.tsx`** — `forwardRef` 래퍼, `ComponentProps<'element'>` 확장, variant enum을 `const` 객체로 정의하고 매칭 타입 생성, Radix `Slot`을 통한 `asChild` 지원
2. **`Component.css.ts`** — Vanilla Extract `recipe()`에 enum 값을 키로 하는 variant 맵, `@kojaem/tokens`의 `vars` 사용
3. **`Component.stories.tsx`** — `Meta`/`StoryObj` 타입을 사용하는 Storybook
4. **`Component.test.tsx`** — Vitest + `@testing-library/react` (happy-dom 환경)
5. **`index.ts`** — Re-exports

Variant enum 패턴 (값 객체 + 타입 유니온):
```ts
export const ButtonSize = { sm: 'sm', lg: 'lg' } as const;
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];
```

클래스 조합: `clsx(styles.recipe({ variant, size }), conditionalStyles, className)`

## 스타일링 규칙

- 모든 스타일은 **vanilla-extract**의 `recipe()`를 사용하여 variant 처리
- 디자인 토큰은 반드시 `import { vars } from '@kojaem/tokens'`로 import — 색상, 간격, 타이포그래피 값을 하드코딩하지 말 것
- 컴포넌트는 라이트(`:root`)와 다크(`[data-theme="dark"]`) 테마 모두에서 정상 동작해야 합니다. `vars.color.*`만 사용하면 자동으로 보장됩니다.
- 각 패키지는 소비자를 위해 `./styles.css`를 export

## 코딩 스타일 및 네이밍 컨벤션

strict TypeScript를 사용하고, 각 패키지의 `src/index.ts`에서 공개 API를 명시하세요. 기존 네이밍 패턴을 따르세요: 패키지 폴더는 kebab-case, React 컴포넌트는 PascalCase, 테스트는 `*.test.tsx`, 스토리는 `*.stories.tsx`, vanilla-extract 스타일은 `*.css.ts`.

## 테스트 가이드라인

모든 동작 변경에 대해 Vitest 커버리지를 추가하거나 업데이트하세요. 테스트는 `happy-dom` 환경에서 실행되며, 검증 대상 컴포넌트 옆에 위치해야 합니다. 접근성 상태, variant 렌더링, controlled/uncontrolled 동작을 커버하세요. Storybook 스토리는 수동 리뷰에 도움이 되지만 테스트를 대체하지 않습니다.

## 커밋 및 PR 가이드라인

[Conventional Commits](https://www.conventionalcommits.org/) 사용. PR은 `.github/PULL_REQUEST_TEMPLATE.md` 준수. 배포 패키지 변경 시 `.changeset` 항목 포함.

## 배포

Changesets 기반으로 GitHub Package Registry(`https://npm.pkg.github.com`, 스코프 `@kojaem`)에 릴리스. 패키지는 타입과 함께 ESM + CJS를 export. 공개 API 변경 시 `.changeset` 파일을 포함하세요.
