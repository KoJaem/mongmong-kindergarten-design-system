# Next.js에서 사용하기

`@kojaem/mongmong` 설치 후 컴포넌트에 스타일이 안 먹는 문제를 겪었다면 대부분 아래 두 가지 중 하나입니다.

## 1. 설치 & CSS 로드

```sh
pnpm add @kojaem/mongmong@latest
```

`import { Button } from '@kojaem/mongmong'`만으로는 스타일이 안 붙습니다. **CSS를 별도로 import**해야 합니다 — App Router면 root layout(`app/layout.tsx`) 최상단, Pages Router면 `_app.tsx`에 한 번:

```tsx
import "@kojaem/mongmong/styles.css";
```

```tsx
import { Button } from "@kojaem/mongmong";

export default function Home() {
  return (
    <Button color="brand" variant="fill" size="l">
      버튼
    </Button>
  );
}
```

다크모드는 상위 엘리먼트에 `data-theme="dark"`만 붙이면 `@kojaem/tokens`의 CSS 변수가 자동 전환됩니다. 별도 분기 코드 불필요.

```html
<html data-theme="dark">
```

## 2. 그래도 스타일이 안 붙거나 빌드가 깨질 때

**`0.0.3` 이하 버전 + Turbopack/Tailwind v4 조합이면 CSS 파싱 자체가 실패합니다:**

```
CssSyntaxError: tailwindcss: Can't resolve '~@kojaem/tokens/styles.css'
```

`@kojaem/mongmong/styles.css` 내부에서 하위 패키지를 묶을 때 `~pkg/path` 형태의 webpack tilde-alias 문법을 썼는데, Turbopack/Tailwind v4의 postcss 파서는 이 문법을 못 읽습니다. `mongmong` 쪽 패치(tilde 제거)로 수정됐으니 **최신 버전으로 올리면 해결됩니다**:

```sh
pnpm add @kojaem/mongmong@latest
```

옛 버전 메타데이터가 캐싱돼서 최신을 안 받아올 때는 캐시부터 지우세요:

```sh
pnpm store prune
rm -rf .next
pnpm add @kojaem/mongmong@latest
```

버전이 잘 올라갔는지 직접 확인하려면:

```sh
npm view @kojaem/mongmong versions --registry=https://npm.pkg.github.com
```

## 참고

- 라이브러리 쪽 원인/조치 상세는 → [`ISSUE.md`](./ISSUE.md) (다른 장애 사례 포함)
- 설치·토큰·컴포넌트 전체 안내는 → [`GUIDE.md`](./GUIDE.md), [`README.md`](./README.md)

