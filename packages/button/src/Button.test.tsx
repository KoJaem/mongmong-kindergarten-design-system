import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Button } from './Button';

test('renders children', () => {
  render(<Button>Click me</Button>);

  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
});

test('disabled button is not clickable', () => {
  render(<Button disabled>Click me</Button>);

  expect(screen.getByRole('button')).toBeDisabled();
});

test('isFullWidth applies the full-width class', () => {
  render(<Button isFullWidth>Click me</Button>);

  expect(screen.getByRole('button').className).toContain('fullWidth');
});

test('asChild renders as the child element', () => {
  render(
    <Button asChild>
      <a href="/">Link button</a>
    </Button>,
  );

  expect(screen.getByRole('link')).toBeInTheDocument();
});
