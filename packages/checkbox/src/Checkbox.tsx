import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Checkbox.css';

export interface CheckboxProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Checkbox = forwardRef(function Checkbox(
  { asChild, className: _className, ...props }: CheckboxProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.checkbox(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
