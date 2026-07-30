import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './TabBar.css';

export type TabBarProps = HTMLAttributes<HTMLElement>;

export const TabBar = forwardRef(function TabBar(
  { className: _className, ...props }: TabBarProps,
  ref: ForwardedRef<HTMLElement>,
) {
  return <nav ref={ref} className={cx(styles.tabBar, _className)} {...props} />;
});
