import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './GridList.css';

export const GridListColumns = { 1: '1', 2: '2', 3: '3' } as const;
export type GridListColumns = (typeof GridListColumns)[keyof typeof GridListColumns];

export interface GridListProps extends HTMLAttributes<HTMLDivElement> {
  columns?: GridListColumns;
  asChild?: boolean;
}

export const GridList = forwardRef(function GridList(
  { columns = GridListColumns[3], asChild, className: _className, ...props }: GridListProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.gridList({ columns }), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
