import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Toast } from './Toast';

test('renders message', () => {
  render(<Toast>계좌번호가 복사되었습니다</Toast>);

  expect(screen.getByText('계좌번호가 복사되었습니다')).toBeInTheDocument();
  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('renders icon when provided', () => {
  render(<Toast icon={<span data-testid="icon" />}>Test</Toast>);

  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('renders action when provided', () => {
  render(<Toast action="공유">Test</Toast>);

  expect(screen.getByText('공유')).toBeInTheDocument();
});

test('asChild renders as the child element', () => {
  render(
    <Toast asChild>
      <output>Test</output>
    </Toast>,
  );

  expect(screen.getByRole('status')).toBeInTheDocument();
});
