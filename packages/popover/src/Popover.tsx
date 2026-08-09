import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Popover.css';

export const PopoverKind = { tooltip: 'tooltip', popover: 'popover' } as const;
export type PopoverKind = (typeof PopoverKind)[keyof typeof PopoverKind];

export const PopoverSize = { s: 's', m: 'm' } as const;
export type PopoverSize = (typeof PopoverSize)[keyof typeof PopoverSize];

export const PopoverTail = { top: 'top', bottom: 'bottom', left: 'left', right: 'right', none: 'none' } as const;
export type PopoverTail = (typeof PopoverTail)[keyof typeof PopoverTail];

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  kind?: PopoverKind;
  size?: PopoverSize;
  title?: ReactNode;
  description?: ReactNode;
  tail?: PopoverTail;
  asChild?: boolean;
}

export const Popover = forwardRef(function Popover(
  {
    kind = PopoverKind.tooltip,
    size = PopoverSize.s,
    title,
    description,
    tail = PopoverTail.bottom,
    asChild,
    className: _className,
    children,
    ...props
  }: PopoverProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const isPopover = kind === PopoverKind.popover;

  return (
    <div className={styles.wrapper}>
      <Comp ref={ref} className={cx(styles.surface({ kind, size }), _className)} {...props}>
        {isPopover ? (
          <div className={styles.content}>
            {title && <p className={styles.title({ size })}>{title}</p>}
            {description && <p className={styles.description({ size })}>{description}</p>}
            {children}
          </div>
        ) : (
          children
        )}
      </Comp>
      {tail !== PopoverTail.none && <span className={styles.tail({ tail })} />}
    </div>
  );
});
