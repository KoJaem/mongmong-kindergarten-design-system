#!/usr/bin/env node
// PostToolUse(Write|Edit) — *.css.ts / *.tsx 저장 시 색상 리터럴 하드코딩을 경고(비차단).
// px 사이즈, transition, opacity는 이 저장소의 의도된 관행이라 검사 대상에서 제외한다.
import { readHookInput, toRelative, writtenContent } from './lib.mjs';

const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g;

const { tool_input: toolInput = {} } = await readHookInput();
const filePath = toolInput.file_path ?? '';
const relPath = toRelative(filePath);

if (!/\.(css\.ts|tsx)$/.test(relPath) || !relPath.startsWith('packages/')) {
  process.exit(0);
}

const content = writtenContent(toolInput);
if (!content) process.exit(0);

const warnings = [];
content.split('\n').forEach((line, idx) => {
  const matches = line.match(COLOR_RE);
  if (matches) {
    warnings.push(`${relPath}:${idx + 1} — ${matches.join(', ')} (vars.color.* 사용 검토)`);
  }
});

if (warnings.length > 0) {
  console.error(`[check-design-tokens] 색상 리터럴 발견 (경고, 저장은 막지 않음):\n${warnings.join('\n')}`);
}

process.exit(0);
