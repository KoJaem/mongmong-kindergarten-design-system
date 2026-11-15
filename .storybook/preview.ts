import 'sanitize.css';
import 'sanitize.css/typography.css';

// Defines the `--mkds-*` custom properties that components reference. Without this the
// vanilla-extract bridge resolves to undefined vars and spacing/radius/typography collapse.
import '@kojaem/tokens/styles.css';

import type { Preview } from '@storybook/react';

// Figma 화면은 다크 변수 모드 값을 쓴다. 기본을 다크로 두고 툴바에서 라이트로 바꿀 수 있다.
export default {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: '테마',
      toolbar: { icon: 'mirror', items: ['dark', 'light'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'dark' },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'dark';
      document.documentElement.dataset.theme = theme;
      document.body.style.background = theme === 'dark' ? 'var(--mkds-background-lower)' : '';
      return Story();
    },
  ],
  parameters: {
    options: {
      storySort: {
        order: ['INTRO', 'Components'],
      },
    },
  },
} satisfies Preview;
