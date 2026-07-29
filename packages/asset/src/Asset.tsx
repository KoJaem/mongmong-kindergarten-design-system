import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Asset.css';

export interface AssetProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Asset = forwardRef(function Asset(
  { asChild, className: _className, ...props }: AssetProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.asset(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
