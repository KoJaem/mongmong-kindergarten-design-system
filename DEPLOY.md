# 배포 매뉴얼

이 저장소는 [Changesets](https://github.com/changesets/changesets) + GitHub Actions로 배포가 **거의 자동화**되어 있습니다. 사람이 할 일은 "changeset 작성"과 "PR merge" 두 번뿐입니다.

## 0. (최초 1회만) 저장소 설정 확인

GitHub 저장소 → **Settings → Actions → General → Workflow permissions**이 **"Read and write permissions"**로 되어 있어야 합니다. 이게 꺼져 있으면 `GITHUB_TOKEN`에 패키지 publish 권한이 없어서 release 워크플로우가 실패합니다. (이 설정은 저장소 웹 UI에서만 바꿀 수 있어서 Claude가 대신 확인/변경할 수 없습니다 — 배포가 처음부터 실패하면 제일 먼저 이걸 보세요.)

## 1. 배포할 때마다 하는 일

### 1) 변경한 패키지에 changeset 추가

패키지 코드를 바꿨으면(새 컴포넌트 추가, prop 변경, 버그 수정 등) changeset을 만듭니다. 이게 없으면 버전이 안 올라가고 배포도 안 됩니다.

```sh
pnpm changeset
```

대화형으로 "어떤 패키지가 바뀌었는지" → "major/minor/patch 중 뭔지" → "변경 내용 요약"을 물어봅니다. 완료하면 `.changeset/`에 `.md` 파일이 하나 생깁니다.

**Claude에게 시킬 때**: "방금 만든/고친 컴포넌트들 changeset 만들어줘" 라고 하면 됩니다. Claude는 `pnpm changeset`을 직접 실행하는 대신 `.changeset/<이름>.md` 파일을 아래 형식으로 바로 작성합니다 (기존 `.changeset/add-button-component.md` 참고):

```md
---
"@kojaem/button": minor
"@kojaem/mongmong": patch
---

Button 컴포넌트와 토큰 빌드 파이프라인 추가.
```

- 새 컴포넌트 추가 = `minor`, 버그 수정 = `patch`, 기존 prop을 없애거나 의미를 바꾸는 breaking change = `major`
- 여러 패키지를 한 번에 바꿨으면 frontmatter에 전부 나열
- `@kojaem/mongmong`(전체 묶음 패키지)도 하위 패키지가 바뀌면 같이 patch 올려주는 게 안전합니다

### 2) main으로 merge

지금 브랜치 흐름(`feature/* → dev → main`)대로 최종적으로 **`main`에 merge**되면 `.github/workflows/release.yaml`이 자동으로 돕니다.

### 3) "Version Packages" PR이 자동으로 생김

CI가 pending changeset들을 모아서 각 패키지 버전을 올리고 CHANGELOG를 갱신한 **"chore(release): version packages"** PR을 자동으로 엽니다. 이 PR의 diff를 한 번 훑어보고 버전/변경 내역이 의도한 대로인지 확인하세요.

### 4) 그 PR을 merge → 실제 배포

"Version Packages" PR을 merge하는 순간 같은 워크플로우가 `pnpm changeset publish`를 실행해서 **GitHub Package Registry**(`npm.pkg.github.com`, scope `@kojaem`)에 실제로 publish합니다. 별도로 `npm publish`를 손으로 칠 필요 없습니다.

배포됐는지는 `https://github.com/KoJaem?tab=packages` (또는 각 패키지 저장소의 "Packages" 사이드바)에서 확인할 수 있습니다.

## 2. 다른 프로젝트에서 설치해서 쓰기

`access: "restricted"`라 **비공개 레지스트리**입니다. 설치하는 쪽 프로젝트에 아래가 필요합니다.

`.npmrc` (설치하는 프로젝트 루트):
```
@kojaem:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

`read:packages` 권한이 있는 GitHub Personal Access Token을 `GITHUB_TOKEN` 환경변수로 넣어야 합니다.

```sh
npm install @kojaem/mongmong   # 전체 묶음, 또는 @kojaem/button 처럼 개별 설치
```

```ts
import '@kojaem/tokens/styles.css';   // 디자인 토큰 (라이트/다크 CSS 변수) — 반드시 필요
import '@kojaem/button/styles.css';   // 각 컴포넌트 스타일
```

다크모드는 루트 엘리먼트에 `data-theme="dark"`만 붙이면 자동 적용됩니다.

## 3. 나중에 패키지 스코프를 바꾸고 싶을 때 (예: `@kojaem` → `@rookeys`)

GitHub Package Registry는 스코프가 **실제 GitHub 계정/조직명과 일치**해야 동작합니다. 즉 `@rookeys`로 바꾸려면 먼저 `github.com/rookeys` 계정이나 조직이 실제로 있어야 하고(없으면 새로 만들거나, 저장소를 그 계정/조직으로 이전해야 함), 그다음에 아래 파일들을 전부 고쳐야 합니다. 하나라도 빠지면 `pnpm lint`(패키지 정합성 체크)나 배포 자체가 깨집니다.

| 위치 | 무엇을 고치나 |
|---|---|
| `packages/*/package.json` (17개) | `"name"` 필드: `@kojaem/xxx` → `@rookeys/xxx` |
| `packages/*/package.json`의 `dependencies` | 다른 패키지를 참조하는 부분도 전부 (예: `"@kojaem/tokens": "workspace:*"` → `"@rookeys/tokens": "workspace:*"`) |
| `packages/*/src/*.css.ts`, `*.tsx` | `import { vars } from '@kojaem/tokens'` 같은 import 구문 전체 |
| `biome.json` | `assist.actions.source.organizeImports`의 import 그룹에 있는 `@kojaem/**` 패턴 |
| `scripts/checkPackageConsistency.ts` | `.startsWith('@kojaem/')` 하드코딩된 부분 (패키지 이름 검증 로직) |
| `.github/workflows/release.yaml`, `.github/workflows/tokens.yaml` | `setup-node`의 `scope: "@kojaem"` |
| `.templates/component/package.json`, `.templates/component/src/Template.css.ts` | 앞으로 `pnpm create:component`로 새로 만드는 컴포넌트가 새 스코프를 쓰도록 |
| `README.md`, `AGENTS.md`, `.github/CONTRIBUTING.md`, `.coderabbit.yaml` | 문서에 적힌 스코프 언급 (동작에는 영향 없지만 안 맞으면 혼란스러움) |
| 아직 publish 안 된 `.changeset/*.md` | 이미 발행된 버전을 참조하는 게 아니라면 새 이름으로 |
| `pnpm-lock.yaml` | 위 전부 고친 뒤 `pnpm install` 한 번 돌리면 자동 갱신됨 (손으로 건드리지 말 것) |

**나중에 Claude에게 시킬 때 이렇게 말하면 됩니다**:

> "저장소 패키지 스코프를 `@kojaem`에서 `@rookeys`로 전부 바꿔줘. `github.com/rookeys`는 실제로 존재하는 계정/조직이야."

이렇게 말하면 Claude는:
1. `grep -rl "@kojaem"`으로 영향받는 파일을 전부 찾고
2. 위 표의 항목들을 하나씩 실제 내용 보면서 고치고 (기계적 일괄 치환이 아니라, `dependencies` 안의 참조와 `import` 구문까지 챙겨서)
3. `pnpm install`로 lockfile을 갱신하고
4. `pnpm lint && pnpm -r exec tsc --noEmit && pnpm test`로 아무것도 안 깨졌는지 검증합니다

GitHub 계정/조직명이 실제로 존재하는지는 Claude가 확인할 수 없는 부분이니, 먼저 확실히 해두고 요청하세요.
