import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { expect, test } from 'vitest';

import { TextField } from './TextField';

test('renders label and connects it to the input', () => {
  render(<TextField label="이름" />);

  expect(screen.getByLabelText('이름')).toBeInTheDocument();
});

test('renders helper text', () => {
  render(<TextField label="이메일" helperText="알림을 받을 이메일을 입력해주세요" />);

  expect(screen.getByText('알림을 받을 이메일을 입력해주세요')).toBeInTheDocument();
});

test('marks the input as invalid when error is set', () => {
  render(<TextField label="이메일" error helperText="올바른 이메일 형식이 아니에요" />);

  expect(screen.getByLabelText('이메일')).toHaveAttribute('aria-invalid', 'true');
});

test('disabled input is not editable', async () => {
  const user = userEvent.setup();
  render(<TextField label="이름" disabled />);

  const input = screen.getByLabelText('이름');
  expect(input).toBeDisabled();
  await user.type(input, '몽몽이');
  expect(input).toHaveValue('');
});
