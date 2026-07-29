import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './TopNavigation.css';

export interface TopNavigationProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const TopNavigation = forwardRef(function TopNavigation(
  { asChild, className: _className, ...props }: TopNavigationProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.topNavigation(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
