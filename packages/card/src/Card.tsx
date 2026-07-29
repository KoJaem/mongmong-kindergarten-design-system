import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Card = forwardRef(function Card(
  { asChild, className: _className, ...props }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.card(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
