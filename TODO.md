# 할 일 (디자인 QA 하네스 후속)

`feature/design-qa-harness-kojaem` 브랜치 작업 이후 사용자가 직접 처리해야 하는 것들.

## 1. PR 생성 마무리

슬랙으로 받은 사전 채움 링크를 열어 **Create pull request** 버튼을 직접 눌러야 실제 PR이 생성됩니다(`gh` 미인증 상태라 자동 생성은 못 했음).

- base: `dev`, head: `feature/design-qa-harness-kojaem`
- 생성된 실제 PR URL은 다시 알려주면 기록해둘 수 있음

## 2. PR 리뷰 후 병합

리뷰 후 `dev`로 merge. 저장소 흐름상 이후 `dev → main` 반영은 별도 PR/타이밍에 진행.

## 3. 하네스 실전 검증

이번에 만든 `.claude/` 하네스는 아직 실제 Figma 컴포넌트로 돌려본 적 없음. 검증 순서(플랜 문서 참고):

- [ ] 새 Claude Code 세션에서 `.claude/settings.json` 훅이 인식되는지 확인
- [ ] 실제 Figma "몽몽유치원 > Components"에서 미구현 컴포넌트 1개 골라 `figma-implementer`로 구현 요청
- [ ] 구현 중 훅이 실제로 경고/차단하는지(`check-design-tokens`, `check-story-exists`, `protect-files`) 확인
- [ ] `design-qa`, `design-reviewer` 서브에이전트를 한 번씩 호출해 결과가 유의미한지 확인

## 4. (선택) `gh` 인증

다음부터 PR을 Claude가 바로 생성하게 하려면:

```
gh auth login
```

인증해두면 이후엔 사전 채움 링크 대신 실제 PR을 바로 만들어 URL을 전달할 수 있음.

## 5. `docs/DESIGN.md` 내용 검수

브랜드 톤/색상 사용 맥락/Figma 레이어 네이밍 섹션은 Figma를 직접 보지 않고 기존 코드·토큰 네이밍에서 역추출한 초안임. 실제 Figma 파일과 다르면 그 부분만 고쳐서 정확도를 높여야 함.
