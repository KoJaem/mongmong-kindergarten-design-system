# 장애 기록: `@kojaem/text-field@0.1.0` 유령 버전

## 증상

소비 프로젝트에서 `pnpm add @kojaem/mongmong@latest` 시 아래 에러로 설치 실패:

```
[ERR_PNPM_NO_MATCHING_VERSION] No matching version found for @kojaem/text-field@0.1.0 while fetching it from https://npm.pkg.github.com/

This error happened while installing the dependencies of @kojaem/mongmong@0.0.2

The latest release of @kojaem/text-field is "0.1.1".
```

`@kojaem/mongmong@0.0.2`가 registry에 존재하지 않는 `@kojaem/text-field@0.1.0`을 의존성으로 갖고 있어서 발생.

## 원인

`packages/text-field/package.json`에 `private: true`가 박혀 있는 상태로 changeset이 진행됨.

- `changeset publish`는 `private: true` 패키지를 **에러 없이 조용히 스킵**한다 (exit 0, 로그도 안 남음).
- 그런데 changeset은 버전 번호(`0.1.0`)와 CHANGELOG는 정상적으로 기록하고, 같은 배치에서 이를 참조하는 `@kojaem/mongmong@0.0.2`는 정상 publish됨.
- 결과: registry엔 없는 `text-field@0.1.0`을 `mongmong@0.0.2`가 의존성으로 가리키는 상태로 배포됨.

당시 CI(`release.yaml`)의 "Check publishability" 단계(`pnpm lint:publish` → `scripts/checkPublishability.sh`)는 `pnpm pack` 결과물의 export map/타입만 검증했고, `private: true` 여부는 검사하지 않아서 못 걸러냄. (`pnpm pack`은 private 패키지도 정상적으로 팩을 만들기 때문에 이 검사로는 안 잡힘.)

## 조치

1. `text-field`의 `private: true` 제거 후 재발행 → `text-field@0.1.1`
2. `mongmong`도 patch로 재발행 → `mongmong@0.0.3`, `text-field@0.1.1` 참조하도록 수정
   (`ab87c85`: "Publish @kojaem/text-field (was skipped due to private: true) so @kojaem/mongmong installs successfully.")
3. `scripts/checkPublishability.sh`에 가드 추가 — `packages/*/package.json`에 `"private": true`가 하나라도 있으면 CI를 즉시 실패시킴. 이제 이 클래스의 버그는 publish 단계까지 못 감.

## 소비 프로젝트에서 다시 이 에러를 만났을 때 대응

**1) registry에 실제로 올바른 버전이 있는지 먼저 확인**

```sh
npm view @kojaem/mongmong versions --registry=https://npm.pkg.github.com
npm view @kojaem/mongmong dist-tags --registry=https://npm.pkg.github.com
```

- 필요한 버전이 `versions` 목록에 없다 → 이 저장소의 release 워크플로우가 실제로 publish까지 안 간 것. GitHub Actions에서 **merge 커밋이 트리거한 그 run**(단순히 "Version Packages" PR을 생성/갱신만 한 run 말고)의 "Create Release Pull Request or Publish..." 스텝 로그를 확인.
- `versions`엔 있는데 `dist-tags`의 `latest`만 예전 버전이다 → publish는 됐는데 `latest` 태그만 안 옮겨진 것. registry 쪽 이슈이므로 태그 갱신 확인 필요.

**2) registry는 정상인데 로컬에서 계속 옛날 버전을 준다**

pnpm이 이전 실패 시도의 메타데이터를 캐싱하고 있을 수 있음:

```sh
pnpm store prune
pnpm add @kojaem/mongmong@latest
```

그래도 안 되면 `latest` 태그 대신 버전을 직접 박아서 캐시 자체를 우회:

```sh
pnpm add @kojaem/mongmong@0.0.3   # 필요한 정확한 버전
```

**3) 이거 버전업할 때마다 매번 해야 하나?**

아니다. 위 두 원인(캐시 오염, `private: true` 스킵)은 이번 사고 한정 일회성. `checkPublishability.sh` 가드가 있는 한 `private: true`로 인한 유령 버전은 재발 안 함. 평소엔 그냥:

```sh
pnpm add @kojaem/mongmong@latest
```
