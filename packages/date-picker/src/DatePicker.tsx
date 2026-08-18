import { type ForwardedRef, forwardRef, type HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './DatePicker.css';
import { getMonthGrid, isSameDay } from './dateGrid';

const WHEEL_ITEM_HEIGHT = 44;
const WHEEL_VISIBLE_COUNT = 5;
const WHEEL_SCROLL_SETTLE_MS = 120;

interface WheelColumnProps<T> {
  values: T[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  ariaLabel: string;
  formatValue: (value: T) => string;
}

function WheelColumn<T>({ values, selectedIndex, onSelect, ariaLabel, formatValue }: WheelColumnProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    containerRef.current?.scrollTo?.({ top: selectedIndex * WHEEL_ITEM_HEIGHT, behavior: 'auto' });
  }, [selectedIndex]);

  useEffect(() => () => clearTimeout(settleTimeoutRef.current), []);

  const handleScroll = () => {
    clearTimeout(settleTimeoutRef.current);
    settleTimeoutRef.current = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const index = Math.min(Math.max(Math.round(el.scrollTop / WHEEL_ITEM_HEIGHT), 0), values.length - 1);
      if (index !== selectedIndex) onSelect(index);
    }, WHEEL_SCROLL_SETTLE_MS);
  };

  return (
    <div
      ref={containerRef}
      className={styles.wheelColumn}
      style={{
        height: WHEEL_ITEM_HEIGHT * WHEEL_VISIBLE_COUNT,
        paddingTop: WHEEL_ITEM_HEIGHT * Math.floor(WHEEL_VISIBLE_COUNT / 2),
        paddingBottom: WHEEL_ITEM_HEIGHT * Math.floor(WHEEL_VISIBLE_COUNT / 2),
      }}
      onScroll={handleScroll}
      role="listbox"
      aria-label={ariaLabel}
    >
      {values.map((value, index) => (
        <button
          key={formatValue(value)}
          type="button"
          role="option"
          aria-selected={index === selectedIndex}
          className={styles.wheelItem({ selected: index === selectedIndex })}
          style={{ height: WHEEL_ITEM_HEIGHT }}
          onClick={() => {
            onSelect(index);
            containerRef.current?.scrollTo?.({ top: index * WHEEL_ITEM_HEIGHT, behavior: 'smooth' });
          }}
        >
          {formatValue(value)}
        </button>
      ))}
    </div>
  );
}

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
    const months = Array.from({ length: 12 }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleWheelChange = (nextYear: number, nextMonthIndex: number, nextDay: number) => {
      const clampedDay = Math.min(nextDay, new Date(nextYear, nextMonthIndex + 1, 0).getDate());
      selectDate(new Date(nextYear, nextMonthIndex, clampedDay));
    };

    return (
      <div ref={ref} className={cx(styles.datePicker, _className)} {...props}>
        <div className={styles.wheelRow}>
          <div className={styles.wheelHighlight} />
          <div className={styles.wheelFadeTop} />
          <div className={styles.wheelFadeBottom} />
          <WheelColumn
            values={years}
            selectedIndex={Math.max(years.indexOf(year), 0)}
            onSelect={(index) => handleWheelChange(years[index] ?? year, monthIndex, day)}
            ariaLabel="연도"
            formatValue={(y) => `${y}년`}
          />
          <WheelColumn
            values={months}
            selectedIndex={monthIndex}
            onSelect={(index) => handleWheelChange(year, months[index] ?? monthIndex, day)}
            ariaLabel="월"
            formatValue={(m) => `${m + 1}월`}
          />
          <WheelColumn
            values={days}
            selectedIndex={day - 1}
            onSelect={(index) => handleWheelChange(year, monthIndex, days[index] ?? day)}
            ariaLabel="일"
            formatValue={(d) => `${d}일`}
          />
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
