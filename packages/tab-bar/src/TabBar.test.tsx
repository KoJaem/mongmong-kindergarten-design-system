import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { TabBar } from './TabBar';

test('renders TabBar', () => {
  render(<TabBar>Test</TabBar>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('renders as a nav landmark', () => {
  render(<TabBar>Test</TabBar>);

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('forwards ref to the underlying nav', () => {
  let node: HTMLElement | null = null;
  render(
    <TabBar
      ref={(el) => {
        node = el;
      }}
    >
      Test
    </TabBar>,
  );

  expect(node).toBeInstanceOf(HTMLElement);
});
