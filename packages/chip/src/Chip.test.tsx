import { vars } from '@kojaem/tokens';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { Chip, ChipKind, ChipSize, ChipVariant } from './Chip';

test('renders Chip', () => {
  render(<Chip>Test</Chip>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('reflects selected state via aria-pressed', () => {
  render(<Chip selected>Test</Chip>);

  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
});

test('does not set aria-pressed for action kind', () => {
  render(<Chip kind={ChipKind.action}>Test</Chip>);

  expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed');
});

test('calls onClick when clicked', () => {
  const onClick = vi.fn();
  render(<Chip onClick={onClick}>Test</Chip>);

  fireEvent.click(screen.getByRole('button'));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('is disabled when disabled prop is set', () => {
  render(<Chip disabled>Test</Chip>);

  expect(screen.getByRole('button')).toBeDisabled();
});

test('renders leading and tailing icons', () => {
  render(
    <Chip leadingIcon={<span data-testid="leading" />} tailingIcon={<span data-testid="tailing" />}>
      Test
    </Chip>,
  );

  expect(screen.getByTestId('leading')).toBeInTheDocument();
  expect(screen.getByTestId('tailing')).toBeInTheDocument();
});

test.each(Object.values(ChipVariant))('renders with variant=%s', (variant) => {
  render(<Chip variant={variant}>Test</Chip>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test.each(Object.values(ChipSize))('renders with size=%s', (size) => {
  render(<Chip size={size}>Test</Chip>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('renders as a different element via asChild', () => {
  render(
    <Chip asChild>
      <a href="#test">Test</a>
    </Chip>,
  );

  expect(screen.getByText('Test').tagName).toBe('A');
});

test('applies a different className when wrap is enabled', () => {
  const { container: wrapped } = render(<Chip wrap>Test</Chip>);
  const { container: nowrap } = render(<Chip>Test</Chip>);

  expect(wrapped.querySelector('button')?.className).not.toBe(nowrap.querySelector('button')?.className);
});

test('forwards ref to the underlying button', () => {
  let node: HTMLButtonElement | null = null;
  render(
    <Chip
      ref={(el) => {
        node = el;
      }}
    >
      Test
    </Chip>,
  );

  expect(node).toBeInstanceOf(HTMLButtonElement);
});

// Figma (Dark mode) binds the selected Fill label to `Background/Default` and the selected Weak label to `Text/Brand`.
test.each([
  [ChipVariant.fill, vars.color.background.default],
  [ChipVariant.weak, vars.color.text.brand],
])('selected %s chip uses the Figma label color token', (variant, color) => {
  render(
    <Chip selected variant={variant}>
      Test
    </Chip>,
  );

  // happy-dom drops unresolved var() colors from getComputedStyle, so read the matching CSS rules instead.
  const button = screen.getByRole('button');
  const colors = Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .filter((rule): rule is CSSStyleRule => rule instanceof CSSStyleRule && button.matches(rule.selectorText))
    .map((rule) => rule.style.color)
    .filter(Boolean);
  expect(colors.at(-1)).toBe(color);
});
