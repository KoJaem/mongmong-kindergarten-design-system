#!/usr/bin/env node
// PreToolUse(Write|Edit) — 단일 소스여야 하는 파일의 직접 편집을 차단.
// 이 저장소엔 .env가 없다 — 대신 Figma 싱크로만 갱신되어야 하는 파일들을 보호한다.
import { readHookInput, toRelative } from './lib.mjs';

// AGENTS.md는 여기 넣지 않는다 — 사용자가 명시적으로 요청하는 정상적인 편집까지 막아버리면
// 우회 수단이 없어 하드 블록의 실익보다 마찰이 커진다. tokens.json/contract.css.ts는
// Figma 싱크 외 경로로 값이 바뀌면 안 되는 진짜 단일 소스 파일이라 하드 블록 대상이다.
const PROTECTED = new Set(['tokens/tokens.json', 'packages/tokens/src/theme/contract.css.ts']);

const { tool_input: toolInput = {} } = await readHookInput();
const relPath = toRelative(toolInput.file_path ?? '');

if (PROTECTED.has(relPath)) {
  console.error(
    `[protect-files] ${relPath}는 직접 편집이 차단된 파일입니다. ` +
      `Figma Tokens Studio → design/figma-token 브랜치 → tokens.yaml 워크플로로만 갱신하세요.`,
  );
  process.exit(2);
}

process.exit(0);
