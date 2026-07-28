# mongmong Design System

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KoJaem/mongmong-kindergarten-design-system/blob/main/LICENSE) ![Package Manager](https://img.shields.io/badge/pnpm-10.33.0-orange?logo=pnpm) ![Storybook](https://img.shields.io/badge/Storybook-10-ff4785?logo=storybook) ![Tests](https://img.shields.io/badge/Vitest-2.1-green?logo=vitest)

몽몽 유치원(mongmong kindergarten) 모바일 앱을 위한 모노레포 기반 디자인 시스템입니다. Figma에서 export한 디자인 토큰을 단일 소스로 삼아, 라이트/다크 테마를 모두 지원하는 타입 세이프하고 접근성을 갖춘 컴포넌트를 제공합니다.

- 📦 pnpm 워크스페이스 기반 모노레포 구조
- 🎨 Figma Tokens Studio → Style Dictionary 파이프라인으로 생성되는 디자인 토큰 (라이트/다크 완비)
- 💪 TypeScript strict 모드
- 📚 Storybook으로 컴포넌트 문서화
- 🧪 Vitest로 테스트
- 🛠️ vanilla-extract + Radix UI 기반 컴포넌트 스타일링

## Quick Start

로컬 개발 환경은 **mise**로 Node.js/pnpm 버전을 통일합니다.

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
| `@kojaem/button` | 레퍼런스 컴포넌트 (variant/size, asChild 지원) |
| `@kojaem/mongmong` | 전체 컴포넌트 + 토큰을 한 번에 설치하는 aggregator 패키지 |

새 컴포넌트는 `pnpm create:component`로 스캐폴딩합니다. 자세한 내용은 [AGENTS.md](./AGENTS.md)를 참고하세요.

## Contributing

기여 가이드는 [.github/CONTRIBUTING.md](./.github/CONTRIBUTING.md)를 참고하세요.

## License

Copyright (c) 2026 KoJaem. See [LICENSE](./LICENSE) for details.
