import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Popover, PopoverKind, PopoverSize, PopoverTail } from './Popover';

test('renders tooltip content', () => {
  render(<Popover>Test</Popover>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('renders title and description for popover kind', () => {
  render(<Popover kind={PopoverKind.popover} title="Title" description="Description" />);

  expect(screen.getByText('Title')).toBeInTheDocument();
  expect(screen.getByText('Description')).toBeInTheDocument();
});

test.each(Object.values(PopoverSize))('renders with size=%s', (size) => {
  render(
    <Popover kind={PopoverKind.popover} size={size} title="Title">
      content
    </Popover>,
  );

  expect(screen.getByText('Title')).toBeInTheDocument();
});

test.each(Object.values(PopoverTail))('renders with tail=%s', (tail) => {
  render(<Popover tail={tail}>Test</Popover>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('renders as a different element via asChild', () => {
  render(
    <Popover asChild>
      <section>Test</section>
    </Popover>,
  );

  expect(screen.getByText('Test').tagName).toBe('SECTION');
});

test('forwards ref to the underlying element', () => {
  let node: HTMLDivElement | null = null;
  render(
    <Popover
      ref={(el) => {
        node = el;
      }}
    >
      Test
    </Popover>,
  );

  expect(node).toBeInstanceOf(HTMLDivElement);
});
