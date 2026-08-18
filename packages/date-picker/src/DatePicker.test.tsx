import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { DatePicker, DatePickerType } from './DatePicker';

test('renders the current month by default', () => {
  const now = new Date();
  render(<DatePicker />);

  expect(screen.getByText(`${now.getFullYear()}년 ${now.getMonth() + 1}월`)).toBeInTheDocument();
});

test('renders the given defaultMonth', () => {
  render(<DatePicker defaultMonth={new Date(2026, 4, 1)} />);

  expect(screen.getByText('2026년 5월')).toBeInTheDocument();
});

test('selects a date on click (uncontrolled)', () => {
  const onChange = vi.fn();
  render(<DatePicker defaultMonth={new Date(2026, 4, 1)} onChange={onChange} />);

  fireEvent.click(screen.getByLabelText('2026년 5월 15일'));

  expect(onChange).toHaveBeenCalledTimes(1);
  const calledWith: Date = onChange.mock.calls[0]?.[0];
  expect(calledWith.getDate()).toBe(15);
  expect(calledWith.getMonth()).toBe(4);
});

test('respects a controlled value', () => {
  render(<DatePicker defaultMonth={new Date(2026, 4, 1)} value={new Date(2026, 4, 3)} />);

  expect(screen.getByLabelText('2026년 5월 3일')).toHaveAttribute('aria-pressed', 'true');
});

test('navigates to the next and previous month', () => {
  render(<DatePicker defaultMonth={new Date(2026, 4, 1)} />);

  fireEvent.click(screen.getByRole('button', { name: '다음 달' }));
  expect(screen.getByText('2026년 6월')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: '이전 달' }));
  fireEvent.click(screen.getByRole('button', { name: '이전 달' }));
  expect(screen.getByText('2026년 4월')).toBeInTheDocument();
});

test('disables dates outside minDate/maxDate range', () => {
  render(
    <DatePicker defaultMonth={new Date(2026, 4, 1)} minDate={new Date(2026, 4, 3)} maxDate={new Date(2026, 4, 20)} />,
  );

  expect(screen.getByLabelText('2026년 5월 1일')).toBeDisabled();
  expect(screen.getByLabelText('2026년 5월 15일')).not.toBeDisabled();
  expect(screen.getByLabelText('2026년 5월 25일')).toBeDisabled();
});

test('renders three scrollable columns for wheel type with the current value selected', () => {
  render(<DatePicker type={DatePickerType.wheel} defaultValue={new Date(2026, 4, 3)} />);

  expect(screen.getByRole('listbox', { name: '연도' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: '2026년' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('option', { name: '5월' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('option', { name: '3일' })).toHaveAttribute('aria-selected', 'true');
});

test('clicking a wheel year option calls onChange', () => {
  const onChange = vi.fn();
  render(<DatePicker type={DatePickerType.wheel} defaultValue={new Date(2026, 4, 3)} onChange={onChange} />);

  fireEvent.click(screen.getByRole('option', { name: '2020년' }));

  expect(onChange).toHaveBeenCalledTimes(1);
  const calledWith: Date = onChange.mock.calls[0]?.[0];
  expect(calledWith.getFullYear()).toBe(2020);
});

test('forwards ref to the underlying div', () => {
  let node: HTMLDivElement | null = null;
  render(
    <DatePicker
      ref={(el) => {
        node = el;
      }}
    />,
  );

  expect(node).toBeInstanceOf(HTMLDivElement);
});
