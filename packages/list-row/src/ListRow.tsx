import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './ListRow.css';

export interface ListRowProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const ListRow = forwardRef(function ListRow(
  { asChild, className: _className, ...props }: ListRowProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.listRow(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
