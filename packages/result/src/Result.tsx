import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './Result.css';

export interface ResultProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  image?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export const Result = forwardRef(function Result(
  { image, title, description, action, className: _className, ...props }: ResultProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref} className={cx(styles.result, _className)} {...props}>
      {image && <div className={styles.image}>{image}</div>}
      {(title || description || action) && (
        <div className={styles.textAndAction}>
          {(title || description) && (
            <div className={styles.textContainer}>
              {title && <p className={styles.title}>{title}</p>}
              {description && <p className={styles.description}>{description}</p>}
            </div>
          )}
          {action && <div className={styles.action}>{action}</div>}
        </div>
      )}
    </div>
  );
});
