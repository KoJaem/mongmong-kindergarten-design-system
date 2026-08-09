import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { GridListItem } from './GridListItem';

test('renders the label', () => {
  render(<GridListItem label="하나은행" />);

  expect(screen.getByText('하나은행')).toBeInTheDocument();
});

test('renders image and leadingIcon when provided', () => {
  render(
    <GridListItem
      label="하나은행"
      image={<span data-testid="image" />}
      leadingIcon={<span data-testid="leading-icon" />}
    />,
  );

  expect(screen.getByTestId('image')).toBeInTheDocument();
  expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
});

test('reflects selected state via aria-pressed', () => {
  render(<GridListItem label="하나은행" selected />);

  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
});

test('calls onClick when clicked', () => {
  const onClick = vi.fn();
  render(<GridListItem label="하나은행" onClick={onClick} />);

  fireEvent.click(screen.getByRole('button'));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('is disabled when disabled prop is set', () => {
  render(<GridListItem label="하나은행" disabled />);

  expect(screen.getByRole('button')).toBeDisabled();
});

test('forwards ref to the underlying button', () => {
  let node: HTMLButtonElement | null = null;
  render(
    <GridListItem
      label="하나은행"
      ref={(el) => {
        node = el;
      }}
    />,
  );

  expect(node).toBeInstanceOf(HTMLButtonElement);
});
