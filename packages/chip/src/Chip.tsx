import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Chip.css';

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Chip = forwardRef(function Chip(
  { asChild, className: _className, ...props }: ChipProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.chip(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
