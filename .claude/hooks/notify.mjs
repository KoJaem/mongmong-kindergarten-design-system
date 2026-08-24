#!/usr/bin/env node
// Stop — 세션 응답이 끝나면 OS 데스크탑 알림. 알림에 실패해도 세션엔 영향 없어야 하므로 항상 exit 0.
import { execFile } from 'node:child_process';
import { platform } from 'node:os';

const MESSAGE = 'Claude Code 응답이 끝났습니다.';

function notify() {
  const os = platform();
  if (os === 'darwin') {
    execFile('osascript', ['-e', `display notification "${MESSAGE}" with title "Claude Code"`], () => {});
  } else if (os === 'linux') {
    execFile('notify-send', ['Claude Code', MESSAGE], () => {});
  } else if (os === 'win32') {
    execFile('powershell', ['-Command', `New-BurntToastNotification -Text 'Claude Code','${MESSAGE}'`], () => {});
  }
}

notify();
process.exit(0);
