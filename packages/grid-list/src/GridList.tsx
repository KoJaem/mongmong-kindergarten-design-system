import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './GridList.css';

export interface GridListProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const GridList = forwardRef(function GridList(
  { asChild, className: _className, ...props }: GridListProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.gridList(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
