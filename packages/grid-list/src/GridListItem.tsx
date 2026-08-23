import { type ComponentProps, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './GridListItem.css';

export interface GridListItemProps extends Omit<ComponentProps<'button'>, 'type'> {
  image?: ReactNode;
  leadingIcon?: ReactNode;
  label: ReactNode;
  selected?: boolean;
}

export const GridListItem = forwardRef(function GridListItem(
  { image, leadingIcon, label, selected = false, disabled, className: _className, ...props }: GridListItemProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cx(styles.item({ selected }), _className)}
      disabled={disabled}
      aria-pressed={selected}
      {...props}
    >
      {image && <span className={styles.image}>{image}</span>}
      <span className={styles.labelRow}>
        {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
        <span className={styles.label}>{label}</span>
      </span>
    </button>
  );
});
