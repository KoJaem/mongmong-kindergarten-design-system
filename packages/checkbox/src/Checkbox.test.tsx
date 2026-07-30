import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { Checkbox, CheckboxSize, CheckboxVariant } from './Checkbox';

test('renders an unchecked checkbox by default', () => {
  render(<Checkbox aria-label="agree" />);

  expect(screen.getByRole('checkbox', { name: 'agree' })).not.toBeChecked();
});

test('renders checked when defaultChecked is true', () => {
  render(<Checkbox aria-label="agree" defaultChecked />);

  expect(screen.getByRole('checkbox', { name: 'agree' })).toBeChecked();
});

test('toggles on click (uncontrolled)', () => {
  render(<Checkbox aria-label="agree" />);
  const checkbox = screen.getByRole('checkbox', { name: 'agree' });

  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

test('calls onChange with the new checked value', () => {
  const onChange = vi.fn();
  render(<Checkbox aria-label="agree" onChange={onChange} />);

  fireEvent.click(screen.getByRole('checkbox', { name: 'agree' }));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange.mock.calls[0]?.[0].target.checked).toBe(true);
});

test('respects controlled checked prop', () => {
  render(<Checkbox aria-label="agree" checked readOnly />);

  expect(screen.getByRole('checkbox', { name: 'agree' })).toBeChecked();
});

test('is disabled when disabled prop is set', () => {
  render(<Checkbox aria-label="agree" disabled />);

  expect(screen.getByRole('checkbox', { name: 'agree' })).toBeDisabled();
});

test.each(Object.values(CheckboxVariant))('renders with variant=%s', (variant) => {
  render(<Checkbox aria-label="agree" variant={variant} />);

  expect(screen.getByRole('checkbox', { name: 'agree' })).toBeInTheDocument();
});

test.each(Object.values(CheckboxSize))('renders with size=%s', (size) => {
  render(<Checkbox aria-label="agree" size={size} />);

  expect(screen.getByRole('checkbox', { name: 'agree' })).toBeInTheDocument();
});

test('forwards ref to the underlying input', () => {
  let node: HTMLInputElement | null = null;
  render(
    <Checkbox
      aria-label="agree"
      ref={(el) => {
        node = el;
      }}
    />,
  );

  expect(node).toBeInstanceOf(HTMLInputElement);
});
