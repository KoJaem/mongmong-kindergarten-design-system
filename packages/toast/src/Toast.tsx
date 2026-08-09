import { type ComponentProps, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import { Slot, Slottable } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Toast.css';

export const ToastLayout = { fit: 'fit', fixed: 'fixed' } as const;
export type ToastLayout = (typeof ToastLayout)[keyof typeof ToastLayout];

export interface ToastProps extends ComponentProps<'div'> {
  layout?: ToastLayout;
  icon?: ReactNode;
  action?: ReactNode;
  asChild?: boolean;
}

export const Toast = forwardRef(function Toast(
  { layout = ToastLayout.fit, icon, action, asChild, className: _className, children, ...props }: ToastProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const hasIcon = !!icon;
  const hasAction = !!action;
  const className = cx(styles.toast({ layout, hasIcon, hasAction }), _className);

  return (
    <Comp ref={ref} role="status" className={className} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <Slottable>{children}</Slottable>
      {action && <span className={styles.action({ withIcon: hasIcon })}>{action}</span>}
    </Comp>
  );
});
