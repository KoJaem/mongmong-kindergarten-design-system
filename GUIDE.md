# mongmong Design System 사용 가이드

이 저장소를 앞으로 (1) 소비자로서 설치해서 쓰는 법, (2) 라이브러리 자체를 유지보수/확장하는 법,
(3) 배포하는 법 — 세 관점으로 정리한 문서입니다. 각 항목의 자세한 내용은 링크된 문서를 참고하세요.

## 1. 앱에서 라이브러리로 설치해서 쓰기

비공개 레지스트리(GitHub Package Registry, scope `@kojaem`)라 설치하는 프로젝트에 `.npmrc` 설정이 필요합니다.

```
# 설치하는 프로젝트 루트의 .npmrc
@kojaem:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

`read:packages` 권한이 있는 GitHub Personal Access Token을 `GITHUB_TOKEN` 환경변수로 넣습니다.

```sh
npm install @kojaem/mongmong   # 전체 묶음
# 또는
npm install @kojaem/button @kojaem/text-field   # 필요한 컴포넌트만 개별 설치
```

```ts
import '@kojaem/tokens/styles.css'; // 디자인 토큰(라이트/다크 CSS 변수) — 반드시 먼저 import
import '@kojaem/button/styles.css'; // 각 컴포넌트 스타일도 개별로 import

import { Button, TextField } from '@kojaem/mongmong';
```

다크모드는 루트 엘리먼트에 `data-theme="dark"`만 붙이면 자동 적용됩니다(별도 분기 코드 불필요).

```html
<html data-theme="dark">
```

토큰 값을 코드에서 직접 참조하려면(예: 커스텀 컴포넌트를 만들 때):

```ts
import { vars } from '@kojaem/tokens';

style({ backgroundColor: vars.color.fill.brand, borderRadius: vars.radius.button.l });
```

색상/간격/타이포 값을 하드코딩하지 말고 항상 `vars.*`를 거치세요. 토큰 계층(Primitive/Semantic)과
`mkds-` 프리픽스에 대한 자세한 설명은 → [`docs/tokens.mdx`](./docs/tokens.mdx)

패키지별로 뭐가 있는지는 → [README의 패키지 표](./README.md#패키지)

## 2. 라이브러리 자체를 로컬에서 개발하기

```sh
mise install     # Node/pnpm 버전 고정
pnpm install
pnpm dev:storybook   # :6006, 컴포넌트 확인
pnpm build           # 전체 패키지 빌드
pnpm test            # Vitest
pnpm lint            # Biome + 패키지 정합성(package-policy.json) 검증
```

### 새 컴포넌트 추가하기

```sh
pnpm create:component   # .templates/component 기반 스캐폴딩
```

- 패키지 이름은 Figma 컴포넌트명을 kebab-case로 그대로 옮기세요(`date-picker`, `text-field`처럼)
- prop/variant 이름도 다른 디자인시스템의 관례가 아니라 **Figma의 Properties/Specs 프레임에 적힌 실제 축**을 따르세요
  (예: Button은 `color(brand/neutral/inverse) + variant(fill/weak) + size(s/m/l/xl)`)
- 새 패키지는 `packages/mongmong/src/index.ts`와 `packages/mongmong/package.json`의 `dependencies`에도 등록
- 컴포넌트를 새로 만들기 전에 이미 있는 컴포넌트에 흡수되는 케이스가 아닌지 확인:
  - **Tooltip** → `@kojaem/popover`의 `kind="tooltip"`
  - **Bottom Navigation** → `@kojaem/tab-bar`

상세 패턴(5파일 구조, 스타일링 규칙, 커밋 컨벤션)은 → [`AGENTS.md`](./AGENTS.md), 단계별 흐름은 → [`docs/contributing.mdx`](./docs/contributing.mdx)

### 토큰 갱신하기

토큰 값 자체를 바꾸는 건 코드가 아니라 **Figma Tokens Studio**에서 합니다:

1. Figma Tokens Studio에서 토큰 편집 → `design/figma-token` 브랜치로 push
2. `.github/workflows/tokens.yaml`이 빌드 · 타입체크 · CSS diff 검증
3. `main`으로 sync PR 자동 생성 → 리뷰 후 merge

`tokens/tokens.json`을 손으로 고치거나, side 저장소처럼 값을 하드코딩한 병행 TS 모듈을 만들지 마세요 —
이 저장소는 `tokens.json` 하나가 유일한 소스입니다.

## 3. 배포하기

사람이 할 일은 두 가지뿐입니다: **changeset 작성**, **PR merge**. 나머지는 GitHub Actions가 합니다.

```sh
pnpm changeset   # 어떤 패키지가 바뀌었는지 → major/minor/patch → 변경 요약
```

- 새 컴포넌트 = `minor`, 버그 수정 = `patch`, 기존 prop 제거/의미 변경 = `major`
- `@kojaem/mongmong`(전체 묶음)도 하위 패키지가 바뀌면 같이 `patch` 올리기

흐름: `feature/<subject>-kojaem` → `dev` → **`main`에 merge**되면 `.github/workflows/release.yaml`이
pending changeset들을 모아 "Version Packages" PR을 자동 생성 → 그 PR을 merge하면
`pnpm changeset publish`가 실행돼 GitHub Package Registry에 실제로 publish됩니다.

Storybook 배포(Chromatic)는 패키지 publish와 별개 흐름이며 `main` push 시 자동 실행됩니다.

최초 설정 확인, 스코프 변경(`@kojaem` → 다른 이름) 등 상세 절차와 트러블슈팅은 → [`DEPLOY.md`](./DEPLOY.md)

## 4. 문서 지도

| 문서 | 용도 |
|---|---|
| [`README.md`](./README.md) | 설치, 빠른 시작, 패키지 목록 |
| **`GUIDE.md`(이 문서)** | 배포 · 라이브러리화 · 사용법을 한 곳에서 훑어보는 진입점 |
| [`USAGE.md`](./USAGE.md) | Next.js 등 소비 프로젝트에서 설치·CSS 로드·트러블슈팅 |
| [`DEPLOY.md`](./DEPLOY.md) | 배포 절차 상세, 최초 설정, 스코프 변경 시나리오 |
| [`AGENTS.md`](./AGENTS.md) | 컴포넌트 패턴 · 스타일링 규칙 · 커밋 컨벤션 (AI 에이전트/기여자용) |
| [`docs/introduction.mdx`](./docs/introduction.mdx) | Storybook 인트로 (`pnpm dev:storybook`으로 열람) |
| [`docs/tokens.mdx`](./docs/tokens.mdx) | 토큰 계층 · 라이트/다크 · 사용법 |
| [`docs/contributing.mdx`](./docs/contributing.mdx) | 새 컴포넌트 추가 단계별 가이드 |
