import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Result } from './Result';

test('renders title and description', () => {
  render(<Result title="다시 시도해주세요" description="문제가 생겼어요." />);

  expect(screen.getByText('다시 시도해주세요')).toBeInTheDocument();
  expect(screen.getByText('문제가 생겼어요.')).toBeInTheDocument();
});

test('renders image when provided', () => {
  render(<Result title="Title" image={<span data-testid="image" />} />);

  expect(screen.getByTestId('image')).toBeInTheDocument();
});

test('renders action when provided', () => {
  render(<Result title="Title" action={<button type="button">다시 시도하기</button>} />);

  expect(screen.getByRole('button', { name: '다시 시도하기' })).toBeInTheDocument();
});

test('does not render action when omitted', () => {
  render(<Result title="Title" />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('forwards ref to the underlying div', () => {
  let node: HTMLDivElement | null = null;
  render(
    <Result
      title="Title"
      ref={(el) => {
        node = el;
      }}
    />,
  );

  expect(node).toBeInstanceOf(HTMLDivElement);
});
