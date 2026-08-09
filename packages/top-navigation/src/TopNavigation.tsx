import { forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './TopNavigation.css';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface TopNavigationProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  onBack?: MouseEventHandler<HTMLButtonElement>;
  title?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: MouseEventHandler<HTMLButtonElement>;
  rightLabel?: ReactNode;
  onRightLabelClick?: MouseEventHandler<HTMLButtonElement>;
}

export const TopNavigation = forwardRef<HTMLElement, TopNavigationProps>(function TopNavigation(
  { onBack, title, rightIcon, onRightIconClick, rightLabel, onRightLabelClick, className: _className, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cx(styles.topNavigation, _className)} {...props}>
      <div className={styles.side}>
        {onBack && (
          <button type="button" className={styles.iconButton} onClick={onBack} aria-label="뒤로가기">
            <BackIcon />
          </button>
        )}
      </div>
      {title && (
        <div className={styles.titleArea}>
          <p className={styles.title}>{title}</p>
        </div>
      )}
      <div className={cx(styles.side, styles.rightSide)}>
        {rightLabel && (
          <button type="button" className={styles.textButton} onClick={onRightLabelClick}>
            {rightLabel}
          </button>
        )}
        {rightIcon && (
          <button type="button" className={styles.iconButton} onClick={onRightIconClick}>
            {rightIcon}
          </button>
        )}
      </div>
    </header>
  );
});
