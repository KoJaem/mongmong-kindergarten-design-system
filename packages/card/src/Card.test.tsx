import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Card, CardRadius, CardVariant } from './Card';

test('renders Card', () => {
  render(<Card>Test</Card>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test.each(Object.values(CardVariant))('renders with variant=%s', (variant) => {
  render(<Card variant={variant}>content</Card>);

  expect(screen.getByText('content')).toBeInTheDocument();
});

test.each(Object.values(CardRadius))('renders with radius=%s', (radius) => {
  render(<Card radius={radius}>content</Card>);

  expect(screen.getByText('content')).toBeInTheDocument();
});

test('renders as a different element via asChild', () => {
  render(
    <Card asChild>
      <section>content</section>
    </Card>,
  );

  expect(screen.getByText('content').tagName).toBe('SECTION');
});

test('forwards ref to the underlying div', () => {
  let node: HTMLDivElement | null = null;
  render(
    <Card
      ref={(el) => {
        node = el;
      }}
    >
      content
    </Card>,
  );

  expect(node).toBeInstanceOf(HTMLDivElement);
});
