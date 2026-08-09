import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Card.css';

export const CardVariant = { default: 'default', lower: 'lower' } as const;
export type CardVariant = (typeof CardVariant)[keyof typeof CardVariant];

export const CardRadius = { s: 's', m: 'm', l: 'l' } as const;
export type CardRadius = (typeof CardRadius)[keyof typeof CardRadius];

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  radius?: CardRadius;
  asChild?: boolean;
}

export const Card = forwardRef(function Card(
  { variant = CardVariant.default, radius = CardRadius.l, asChild, className: _className, ...props }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.card({ variant, radius }), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
