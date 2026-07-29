import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Result.css';

export interface ResultProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Result = forwardRef(function Result(
  { asChild, className: _className, ...props }: ResultProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.result(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
