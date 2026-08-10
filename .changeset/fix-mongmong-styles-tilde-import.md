---
"@kojaem/mongmong": patch
---

styles.css 안 하위 패키지 import 경로에서 `~` prefix 제거. Tailwind v4 / Turbopack 등 최신 postcss 파서가 webpack tilde-alias 문법을 인식 못 해 `CssSyntaxError`로 빌드가 깨지던 문제 수정.
