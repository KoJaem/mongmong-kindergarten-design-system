# 토큰 파이프라인

`tokens/tokens.json`은 Figma Tokens Studio에서 export된 W3C Design Tokens 포맷의 단일 소스입니다. `packages/tokens/config.js`가 Style Dictionary + `@tokens-studio/sd-transforms`로 이를 변환합니다:
- 테마 무관 값(Typography/Default, Radius/Default, Spacing/Mobile) → `shared.css` (`:root`)
- 라이트 컬러(Primitive Colors/Light, Semantic Colors/Light) → `color-light.css` (`:root`)
- 다크 컬러(Primitive Colors/Dark, Semantic Colors/Dark) → `color-dark.css` (`[data-theme="dark"]`)

`packages/tokens/src/theme/contract.css.ts`가 vanilla-extract `createGlobalThemeContract`로 이 CSS 변수들을 `vars` 객체로 노출합니다. 값의 유일한 출처는 `tokens/tokens.json`이며, 하드코딩된 별도 토큰 모듈(과거 side 저장소에 있던 것과 같은 병행 구현)은 만들지 않습니다.

Figma에서 토큰이 갱신되면 `design/figma-token` 브랜치로 push → `.github/workflows/tokens.yaml`이 빌드/타입체크/CSS diff를 검증 → `main`으로 PR이 자동 생성됩니다.
