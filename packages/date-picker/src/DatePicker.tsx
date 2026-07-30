import { type ForwardedRef, forwardRef, type HTMLAttributes, useMemo, useState } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './DatePicker.css';
import { getMonthGrid, isSameDay } from './dateGrid';

export const DatePickerType = { calendar: 'calendar', wheel: 'wheel' } as const;
export type DatePickerType = (typeof DatePickerType)[keyof typeof DatePickerType];

const DEFAULT_WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  type?: DatePickerType;
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  weekdayLabels?: string[];
  minYear?: number;
  maxYear?: number;
}

export const DatePicker = forwardRef(function DatePicker(
  {
    type = DatePickerType.calendar,
    value,
    defaultValue,
    onChange,
    month,
    defaultMonth,
    onMonthChange,
    minDate,
    maxDate,
    weekdayLabels = DEFAULT_WEEKDAY_LABELS,
    minYear = new Date().getFullYear() - 100,
    maxYear = new Date().getFullYear() + 10,
    className: _className,
    ...props
  }: DatePickerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState<Date | undefined>(defaultValue);
  const [uncontrolledMonth, setUncontrolledMonth] = useState<Date>(defaultMonth ?? defaultValue ?? new Date());

  const selectedDate = value ?? uncontrolledValue;
  const viewedMonth = month ?? uncontrolledMonth;

  const cells = useMemo(() => getMonthGrid(viewedMonth.getFullYear(), viewedMonth.getMonth()), [viewedMonth]);
  const years = useMemo(() => {
    const options: number[] = [];
    for (let y = minYear; y <= maxYear; y++) options.push(y);
    return options;
  }, [minYear, maxYear]);

  const selectDate = (date: Date) => {
    setUncontrolledValue(date);
    onChange?.(date);
  };

  const changeMonth = (next: Date) => {
    setUncontrolledMonth(next);
    onMonthChange?.(next);
  };

  const isDisabled = (date: Date) => (minDate && date < minDate) || (maxDate && date > maxDate) || false;

  if (type === DatePickerType.wheel) {
    const year = selectedDate?.getFullYear() ?? viewedMonth.getFullYear();
    const monthIndex = selectedDate?.getMonth() ?? viewedMonth.getMonth();
    const day = selectedDate?.getDate() ?? 1;
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const handleWheelChange = (nextYear: number, nextMonthIndex: number, nextDay: number) => {
      const clampedDay = Math.min(nextDay, new Date(nextYear, nextMonthIndex + 1, 0).getDate());
      selectDate(new Date(nextYear, nextMonthIndex, clampedDay));
    };

    return (
      <div ref={ref} className={cx(styles.datePicker, _className)} {...props}>
        <div className={styles.wheelRow}>
          <select
            className={styles.wheelSelect}
            aria-label="연도"
            value={year}
            onChange={(e) => handleWheelChange(Number(e.target.value), monthIndex, day)}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            className={styles.wheelSelect}
            aria-label="월"
            value={monthIndex}
            onChange={(e) => handleWheelChange(year, Number(e.target.value), day)}
          >
            {Array.from({ length: 12 }, (_, i) => i).map((m) => (
              <option key={m} value={m}>
                {m + 1}
              </option>
            ))}
          </select>
          <select
            className={styles.wheelSelect}
            aria-label="일"
            value={day}
            onChange={(e) => handleWheelChange(year, monthIndex, Number(e.target.value))}
          >
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cx(styles.datePicker, _className)} {...props}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navButton}
          aria-label="이전 달"
          onClick={() => changeMonth(new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() - 1, 1))}
        >
          ‹
        </button>
        <p className={styles.headerLabel}>
          {viewedMonth.getFullYear()}년 {viewedMonth.getMonth() + 1}월
        </p>
        <button
          type="button"
          className={styles.navButton}
          aria-label="다음 달"
          onClick={() => changeMonth(new Date(viewedMonth.getFullYear(), viewedMonth.getMonth() + 1, 1))}
        >
          ›
        </button>
      </div>
      <div className={styles.weekdayRow}>
        {weekdayLabels.map((label) => (
          <span key={label} className={styles.weekdayLabel}>
            {label}
          </span>
        ))}
      </div>
      <div className={styles.grid}>
        {cells.map(({ date, inCurrentMonth }) => {
          const disabled = !inCurrentMonth || isDisabled(date);
          const selected = !!selectedDate && isSameDay(date, selectedDate);

          return (
            <button
              key={date.toISOString()}
              type="button"
              className={styles.dateCell({ selected, disabled })}
              disabled={disabled}
              onClick={() => selectDate(date)}
              aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
              aria-pressed={selected}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
});
