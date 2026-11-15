import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { expect, test } from 'vitest';

import { TextArea } from './TextArea';

test('renders label and connects it to the textarea', () => {
  render(<TextArea label="답장" />);

  expect(screen.getByLabelText('답장').tagName).toBe('TEXTAREA');
});

test('accepts multi-line input', async () => {
  const user = userEvent.setup();
  render(<TextArea label="답장" />);

  await user.type(screen.getByLabelText('답장'), '첫 줄{enter}둘째 줄');
  expect(screen.getByLabelText('답장')).toHaveValue('첫 줄\n둘째 줄');
});

test('marks the textarea as invalid when error is set', () => {
  render(<TextArea label="답장" error helperText="1000자까지 쓸 수 있어요" />);

  expect(screen.getByLabelText('답장')).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByText('1000자까지 쓸 수 있어요')).toBeInTheDocument();
});
