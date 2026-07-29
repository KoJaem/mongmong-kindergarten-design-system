import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './TabBar.css';

export interface TabBarProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const TabBar = forwardRef(function TabBar(
  { asChild, className: _className, ...props }: TabBarProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.tabBar(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
