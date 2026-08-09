import { type ComponentProps, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './TabBarItem.css';

export interface TabBarItemProps extends Omit<ComponentProps<'button'>, 'type'> {
  icon: ReactNode;
  label: ReactNode;
  selected?: boolean;
  dot?: boolean;
}

export const TabBarItem = forwardRef(function TabBarItem(
  { icon, label, selected = false, dot = false, className: _className, ...props }: TabBarItemProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cx(styles.item({ selected }), _className)}
      aria-pressed={selected}
      {...props}
    >
      <span className={styles.iconWrapper}>
        {icon}
        {dot && <span className={styles.dot} />}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  );
});
