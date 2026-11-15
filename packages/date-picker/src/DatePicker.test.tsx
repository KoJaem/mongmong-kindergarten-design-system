import { vars } from '@kojaem/tokens';

import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { DatePicker, DatePickerType, DatePickerUnit } from './DatePicker';

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

test('unit=month hides the day column and onChange gives the 1st of the month', () => {
  const onChange = vi.fn();
  render(
    <DatePicker
      type={DatePickerType.wheel}
      unit={DatePickerUnit.month}
      defaultValue={new Date(2026, 4, 15)}
      onChange={onChange}
    />,
  );

  expect(screen.getAllByRole('listbox')).toHaveLength(2);
  expect(screen.queryByRole('listbox', { name: '일' })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('option', { name: '8월' }));

  const calledWith: Date = onChange.mock.calls[0]?.[0];
  expect([calledWith.getFullYear(), calledWith.getMonth(), calledWith.getDate()]).toEqual([2026, 7, 1]);
});

test('dragging a wheel column with the mouse updates its scrollTop', () => {
  render(<DatePicker type={DatePickerType.wheel} defaultValue={new Date(2026, 4, 3)} />);

  const yearColumn = screen.getByRole('listbox', { name: '연도' });
  const initialScrollTop = yearColumn.scrollTop;

  fireEvent.mouseDown(yearColumn, { clientY: 200 });
  fireEvent.mouseMove(window, { clientY: 156 });

  expect(yearColumn.scrollTop).toBe(initialScrollTop + 44);

  fireEvent.mouseUp(window);
  fireEvent.mouseMove(window, { clientY: 100 });

  expect(yearColumn.scrollTop).toBe(initialScrollTop + 44);
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

// happy-dom drops unresolved var() colors from getComputedStyle, so read the last matching CSS rule instead.
const ruleColor = (el: Element) =>
  Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .filter((rule): rule is CSSStyleRule => rule instanceof CSSStyleRule && el.matches(rule.selectorText))
    .map((rule) => rule.style.color)
    .filter(Boolean)
    .at(-1);

test('wheel items use Figma inverse text tokens (they sit on a light sheet)', () => {
  render(<DatePicker type={DatePickerType.wheel} defaultValue={new Date(2026, 4, 3)} />);

  expect(ruleColor(screen.getByRole('option', { name: '2026년' }))).toBe(vars.color.text.inverseSecondary);
  expect(ruleColor(screen.getByRole('option', { name: '2025년' }))).toBe(vars.color.text.inverseTertiary);
});

test('calendar selected day uses text.strong like Figma', () => {
  render(<DatePicker defaultValue={new Date(2026, 4, 3)} />);

  expect(ruleColor(screen.getByLabelText('2026년 5월 3일'))).toBe(vars.color.text.strong);
});
