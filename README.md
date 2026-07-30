# mongmong Design System

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KoJaem/mongmong-kindergarten-design-system/blob/main/LICENSE) ![Package Manager](https://img.shields.io/badge/pnpm-10.33.0-orange?logo=pnpm) ![Storybook](https://img.shields.io/badge/Storybook-10-ff4785?logo=storybook) ![Tests](https://img.shields.io/badge/Vitest-2.1-green?logo=vitest)

몽몽 유치원(mongmong kindergarten) 모바일 앱을 위한 모노레포 기반 디자인 시스템입니다. Figma에서 export한 디자인 토큰을 단일 소스로 삼아, 라이트/다크 테마를 모두 지원하는 타입 세이프하고 접근성을 갖춘 컴포넌트를 제공합니다.

- 📦 pnpm 워크스페이스 기반 모노레포 구조
- 🎨 Figma Tokens Studio → Style Dictionary 파이프라인으로 생성되는 디자인 토큰 (라이트/다크 완비)
- 💪 TypeScript strict 모드
- 📚 Storybook으로 컴포넌트 문서화
- 🧪 Vitest로 테스트
- 🛠️ vanilla-extract + Radix UI 기반 컴포넌트 스타일링

## 설치 (다른 프로젝트에서 사용하기)

이 디자인 시스템은 **GitHub Package Registry**(비공개)에 배포됩니다. 일반 공개 npm 패키지와 달리, 설치 전에 "어디서 받을지 + 인증"을 한 번 설정해야 합니다 — 아래 1~3번은 **프로젝트/컴퓨터당 한 번만** 하면 되고, 그 이후로는 평소처럼 `npm install`을 쓰시면 됩니다.

### 1. GitHub Personal Access Token 발급

GitHub → 프로필 → **Settings → Developer settings → Personal access tokens → Tokens (classic)** → `read:packages` 권한으로 발급.

### 2. 설치할 프로젝트 루트에 `.npmrc` 추가

```
@kojaem:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 3. 토큰을 환경변수로 등록

```sh
# ~/.zshrc 또는 ~/.bashrc
export GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

### 4. 설치

```sh
npm install @kojaem/mongmong   # 전체 컴포넌트 + 토큰을 한 번에
# 또는 필요한 컴포넌트만
npm install @kojaem/button
```

### 5. 사용

```ts
import { Button } from '@kojaem/mongmong';
import '@kojaem/mongmong/styles.css';
```

다크 모드는 루트 엘리먼트에 `data-theme="dark"`만 붙이면 `@kojaem/tokens`의 CSS 변수가 자동으로 전환됩니다.

## Quick Start

이 저장소 자체를 개발/기여하려면 아래 순서를 따르세요. 로컬 개발 환경은 **mise**로 Node.js/pnpm 버전을 통일합니다.

```sh
mise install
```

신뢰 경고가 뜨면 한 번만 실행하세요 (신뢰하는 저장소에서만):

```sh
mise trust
```

셸에 activation 커맨드를 추가하세요.

zsh:
```zsh
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc
```

bash:
```bash
echo 'eval "$(mise activate bash)"' >> ~/.bashrc
source ~/.bashrc
```

의존성 설치:

```sh
pnpm install
```

Storybook 실행 (`http://localhost:6006`):

```sh
pnpm dev:storybook
```

## 패키지

| 패키지 | 설명 |
|---|---|
| `@kojaem/tokens` | Figma 디자인 토큰(`tokens/tokens.json`) → CSS 변수 + 타입 빌드 파이프라인 |
| `@kojaem/asset` | 아이콘/이미지 컨테이너 (shape·size·assetType) |
| `@kojaem/bottom-sheet` | 하단 시트 |
| `@kojaem/button` | 버튼 (variant/size, asChild 지원) |
| `@kojaem/card` | 콘텐츠 카드 컨테이너 |
| `@kojaem/checkbox` | 체크박스 (circle/line variant) |
| `@kojaem/chip` | 선택·필터용 칩 |
| `@kojaem/date-picker` | 날짜 선택 (캘린더/휠 타입) |
| `@kojaem/grid-list` | 그리드 형태 리스트 (`GridListItem` 포함) |
| `@kojaem/list-row` | 리스트 행 아이템 |
| `@kojaem/modal` | 모달 다이얼로그 |
| `@kojaem/popover` | 툴팁/팝오버 |
| `@kojaem/result` | 결과·빈 상태 화면 |
| `@kojaem/tab-bar` | 하단 탭 내비게이션 (`TabBarItem` 포함) |
| `@kojaem/toast` | 토스트 알림 |
| `@kojaem/top-navigation` | 상단 내비게이션 바 |
| `@kojaem/mongmong` | 위 전체 컴포넌트 + 토큰을 한 번에 설치하는 aggregator 패키지 |

새 컴포넌트는 `pnpm create:component`로 스캐폴딩합니다. 자세한 내용은 [AGENTS.md](./AGENTS.md)를 참고하세요.

## Storybook 배포

패키지 배포(npm/GitHub Package Registry)와 Storybook 배포는 **완전히 별개**입니다. 패키지에는 컴포넌트 코드만 들어가고, Storybook은 컴포넌트를 눈으로 보고 문서를 확인하는 별도의 정적 웹사이트라서 따로 어딘가에 올려야 합니다.

이 저장소는 저장소가 비공개라 [Chromatic](https://www.chromatic.com/)으로 배포합니다 (Storybook 공식 호스팅 서비스, 비공개 저장소도 무료 티어로 지원).

### 최초 1회 설정

1. [chromatic.com](https://www.chromatic.com/)에 GitHub 계정으로 가입 후 이 저장소를 연결하면 **프로젝트 토큰**이 발급됩니다.
2. GitHub 저장소 → **Settings → Secrets and variables → Actions**에 `CHROMATIC_PROJECT_TOKEN`이라는 이름으로 그 토큰을 등록합니다.

### 로컬에서 빌드만 (배포 없이 미리보기)

Chromatic에 올리지 않고 정적 파일만 만들어서 로컬에서 확인하고 싶으면:

```sh
pnpm build:storybook   # storybook-static/ 에 정적 사이트 생성
```

### 이후 배포

`main`에 push될 때마다 `.github/workflows/chromatic.yaml`이 자동으로 최신 Storybook을 빌드해서 Chromatic에 올립니다. 별도로 할 일은 없습니다.

로컬에서 수동으로 올리고 싶으면 (빌드까지 알아서 됨):

```sh
pnpm deploy:storybook --project-token=<발급받은 토큰>
```

> 배포된 Chromatic 링크는 **기본적으로 로그인 + 프로젝트 접근 권한이 있어야 볼 수 있습니다.** 팀원에게 보여주려면 Chromatic 프로젝트 → **Manage → Collaborators**에서 초대하세요. (아무나 링크만 있으면 볼 수 있는 게 아니라서, 코드 공개 걱정 없이 안전하게 팀 공유용으로 쓸 수 있습니다.)
>
> 로그인 없이 링크만으로 누구나 보게 하고 싶다면 Chromatic 프로젝트 → **Manage → Visibility**에서 Public으로 바꾸면 됩니다. 이 경우에도 테스트 결과·설정·Git 연동 정보 같은 나머지 정보는 계속 비공개로 유지되고, Storybook 화면(컴포넌트 UI)만 공개됩니다.

## Contributing

기여 가이드는 [.github/CONTRIBUTING.md](./.github/CONTRIBUTING.md)를 참고하세요.

## License

Copyright (c) 2026 KoJaem. See [LICENSE](./LICENSE) for details.
