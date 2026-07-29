import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Popover.css';

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Popover = forwardRef(function Popover(
  { asChild, className: _className, ...props }: PopoverProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.popover(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
