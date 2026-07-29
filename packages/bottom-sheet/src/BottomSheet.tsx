import { type ForwardedRef, forwardRef, type HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './BottomSheet.css';

export interface BottomSheetProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const BottomSheet = forwardRef(function BottomSheet(
  { asChild, className: _className, ...props }: BottomSheetProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const className = cx(styles.bottomSheet(), _className);

  return <Comp ref={ref} className={className} {...props} />;
});
