# 디자인 시스템 QA 하네스

Figma → 코드 변환 과정에 붙인 자동화 레이어 요약. 도입 배경과 실제로 뭐가 달라졌는지 기록해둔다. 하네스 자체의 구성/사용법은 `.claude/CLAUDE.md`, `.claude/agents/*.md`, `AGENTS.md`를 참고.

## 도입 배경

"Figma MCP 확인해봐" 같은 즉흥 요청은 매번 검사 순서/항목이 달라지고, 세션이 길어지면 초반에 세운 규칙을 잊어버리기 쉽다. 코드 작성 전 승인 없이 바로 여러 파일을 고치는 경우도 있었다. 이를 고정된 절차(서브에이전트)와 결정론적 검사(훅)로 대체했다.

## 전 / 후

| | 전 | 후 |
|---|---|---|
| Figma 구현 절차 | 그때그때 다름, 단계 생략 가능 | `figma-implementer`가 Clarify→Context→Plan→Generate→Evaluate 5단계 고정 |
| 색상 하드코딩 발견 시점 | 사람이 코드 리뷰할 때 | 파일 저장 즉시(`check-design-tokens.mjs`) |
| 스토리 누락 발견 시점 | PR 리뷰나 나중에 | 컴포넌트 저장 즉시(`check-story-exists.mjs`) |
| 토큰 단일 소스 파일 보호 | 사람이 기억해서 조심 | `protect-files.mjs`가 `tokens/tokens.json`/`contract.css.ts` 직접 편집을 도구 차원에서 차단 |
| 커밋 전 점검 | 매번 명령어를 말로 지시 | `design-qa` 한 번 호출로 8항목 표로 확인 |
| 코드 하드코딩 감사 | 코드 리뷰 때 사람이 grep | `design-reviewer`가 코드 전용/Figma 비교 두 모드로 감사(수정은 안 함) |
| Figma에 없는 variant 생성 방지 | 암묵적 관행 | `AGENTS.md`에 명문화 + `figma-implementer`가 그 규칙을 로드하고 시작 |

## 새로 가능해진 것

- **재현 가능한 Figma 구현**: 어느 세션에서 `figma-implementer`를 불러도 같은 5단계를 거친다. 실패하면 원인을 바꿔 2회까지 재시도하고, 그래도 안 되면 코드를 억지로 완성하지 않고 막힌 지점을 보고한다.
- **저장 시점 즉시 피드백**: 색상 하드코딩, 스토리 누락을 커밋/PR 단계가 아니라 파일을 쓰는 순간 알 수 있다.
- **되돌릴 수 없는 실수의 원천 차단**: 토큰 단일 소스 파일(`tokens/tokens.json`, `contract.css.ts`)을 손으로 고치려는 시도 자체가 도구 단에서 막힌다(exit 2, 사람 기억에 의존하지 않음).
- **원클릭 커밋 전 점검**: `design-qa` 하나로 build/typecheck/lint/test/토큰/스토리/changeset/패키지일관성 8개를 한 번에 확인한다.
- **읽기 전용 감사**: `design-reviewer`는 코드만 보거나(기본) Figma 변수와 비교(Figma URL 제공 시)해서 불일치를 보고만 하고 수정하지 않는다 — 감사와 수정이 분리돼 있어 실수로 덮어쓸 위험이 없다.
- **코드 작성 전 승인 게이트**: `.claude/CLAUDE.md`의 7단계 프로세스가 "계획 → 승인 → 실행" 순서를 강제해서, 여러 파일을 건드리는 작업이 사용자 모르게 먼저 진행되는 일을 막는다.

## 구성 파일

- `AGENTS.md` — 컴포넌트 구현 금지사항, 너비 규칙, 에이전트 위임 규칙 추가
- `.claude/CLAUDE.md` — 7단계 프로세스, 승인 게이트, 금지사항 테이블
- `.claude/agents/figma-implementer.md` — Figma → 코드 구현
- `.claude/agents/design-reviewer.md` — 하드코딩/토큰 감사(읽기 전용)
- `.claude/agents/design-qa.md` — 빌드/테스트/토큰/스토리 8항목 점검(읽기 전용)
- `.claude/hooks/{check-design-tokens,check-story-exists,protect-files,notify}.mjs` — 저장 시점 자동 검사
- `.claude/settings.json` — 위 훅 연결
- `docs/DESIGN.md` — 브랜드 톤, 색상/스페이싱 사용 맥락, 컴포넌트 조합 규칙, Figma 레이어 네이밍

## 아직 검증 안 된 것

이번에 처음 만든 것들이라 실제 Figma 컴포넌트로 굴려본 적은 없다. 다음에 실제 Figma URL로 `figma-implementer`를 한 번 돌려서 5단계가 실제로 잘 작동하는지, 훅이 실전에서 오탐/누락 없이 도는지 확인해야 한다.
