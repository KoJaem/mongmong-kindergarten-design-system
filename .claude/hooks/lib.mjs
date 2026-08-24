import path from 'node:path';

export async function readHookInput() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf-8').trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function toRelative(filePath, cwd = process.cwd()) {
  if (!filePath) return '';
  return path.relative(cwd, filePath).split(path.sep).join('/');
}

export function writtenContent(toolInput = {}) {
  if (typeof toolInput.content === 'string') return toolInput.content;
  if (typeof toolInput.new_string === 'string') return toolInput.new_string;
  return '';
}
