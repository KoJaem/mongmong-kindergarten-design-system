import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './DatePicker.css';

export interface DatePickerProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const DatePicker = forwardRef(function DatePicker(
  { asChild, className: _className, ...props }: DatePickerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.datePicker(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
