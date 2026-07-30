import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { GridList, GridListColumns } from './GridList';

test('renders GridList', () => {
  render(<GridList>Test</GridList>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test.each(Object.values(GridListColumns))('renders with columns=%s', (columns) => {
  render(<GridList columns={columns}>Test</GridList>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('renders as a different element via asChild', () => {
  render(
    <GridList asChild>
      <section>Test</section>
    </GridList>,
  );

  expect(screen.getByText('Test').tagName).toBe('SECTION');
});

test('forwards ref to the underlying div', () => {
  let node: HTMLDivElement | null = null;
  render(
    <GridList
      ref={(el) => {
        node = el;
      }}
    >
      Test
    </GridList>,
  );

  expect(node).toBeInstanceOf(HTMLDivElement);
});
