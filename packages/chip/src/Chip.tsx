import { type ComponentProps, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import { Slot, Slottable } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Chip.css';

export const ChipKind = { select: 'select', action: 'action' } as const;
export type ChipKind = (typeof ChipKind)[keyof typeof ChipKind];

export const ChipVariant = { fill: 'fill', weak: 'weak' } as const;
export type ChipVariant = (typeof ChipVariant)[keyof typeof ChipVariant];

export const ChipSize = { s: 's', m: 'm' } as const;
export type ChipSize = (typeof ChipSize)[keyof typeof ChipSize];

export interface ChipProps extends ComponentProps<'button'> {
  kind?: ChipKind;
  variant?: ChipVariant;
  size?: ChipSize;
  selected?: boolean;
  leadingIcon?: ReactNode;
  tailingIcon?: ReactNode;
  dot?: boolean;
  asChild?: boolean;
}

export const Chip = forwardRef(function Chip(
  {
    kind = ChipKind.select,
    variant = ChipVariant.fill,
    size = ChipSize.m,
    selected = false,
    leadingIcon,
    tailingIcon,
    dot,
    type = 'button',
    asChild,
    disabled,
    className: _className,
    children,
    ...props
  }: ChipProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const Comp = asChild ? Slot : 'button';
  const isSelectable = kind === ChipKind.select;
  const className = cx(
    styles.chip({
      kind,
      size,
      selected: isSelectable && selected,
      variant: isSelectable ? variant : undefined,
      hasLeading: !!leadingIcon,
      hasTailing: !!tailingIcon,
    }),
    _className,
  );

  return (
    <Comp
      ref={ref}
      type={type}
      className={className}
      disabled={disabled}
      aria-pressed={isSelectable ? selected : undefined}
      {...props}
    >
      {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
      <Slottable>{children}</Slottable>
      {tailingIcon && <span className={styles.icon}>{tailingIcon}</span>}
      {dot && <span className={styles.dot} aria-hidden />}
    </Comp>
  );
});
