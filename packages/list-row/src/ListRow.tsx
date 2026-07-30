import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './ListRow.css';

export const ListRowPadding = { s: 's', m: 'm', l: 'l' } as const;
export type ListRowPadding = (typeof ListRowPadding)[keyof typeof ListRowPadding];

export interface ListRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  leadingAsset?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  trailingAccessory?: ReactNode;
  padding?: ListRowPadding;
}

export const ListRow = forwardRef(function ListRow(
  {
    leadingAsset,
    title,
    description,
    trailingAccessory,
    padding = ListRowPadding.m,
    className: _className,
    ...props
  }: ListRowProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const className = cx(styles.listRow({ padding }), _className);

  return (
    <div ref={ref} className={className} {...props}>
      <div className={styles.leftSection}>
        {leadingAsset && <span className={styles.leadingAsset}>{leadingAsset}</span>}
        <div className={styles.textSection}>
          <p className={styles.title}>{title}</p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
      {trailingAccessory && <div className={styles.trailingAccessory}>{trailingAccessory}</div>}
    </div>
  );
});
