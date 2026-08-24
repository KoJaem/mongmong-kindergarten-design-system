#!/usr/bin/env node
// PostToolUse(Write|Edit) — packages/*/src/Component.tsx 저장 시 짝이 되는 *.stories.tsx가 없으면 경고(비차단).
import fs from 'node:fs';

import { readHookInput, toRelative } from './lib.mjs';

const { tool_input: toolInput = {} } = await readHookInput();
const filePath = toolInput.file_path ?? '';
const relPath = toRelative(filePath);

const isComponentSource = /^packages\/[^/]+\/src\/[^/]+\.tsx$/.test(relPath) && !/\.(stories|test)\.tsx$/.test(relPath);

if (!isComponentSource) process.exit(0);

const storyPath = filePath.replace(/\.tsx$/, '.stories.tsx');

if (!fs.existsSync(storyPath)) {
  const relStory = toRelative(storyPath);
  console.error(
    `[check-story-exists] ${relPath}에 대응하는 ${relStory}가 없습니다. Storybook 스토리 추가를 검토하세요.`,
  );
}

process.exit(0);
