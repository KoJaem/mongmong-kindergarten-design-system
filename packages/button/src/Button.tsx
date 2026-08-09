import { type ComponentProps, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import { Slot, Slottable } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Button.css';

export const ButtonColor = { brand: 'brand', neutral: 'neutral', inverse: 'inverse' } as const;
export type ButtonColor = (typeof ButtonColor)[keyof typeof ButtonColor];

export const ButtonVariant = { fill: 'fill', weak: 'weak' } as const;
export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = { s: 's', m: 'm', l: 'l', xl: 'xl' } as const;
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

export interface ButtonProps extends ComponentProps<'button'> {
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

export const Button = forwardRef(function Button(
  {
    color = ButtonColor.brand,
    variant = ButtonVariant.fill,
    size = ButtonSize.l,
    type = 'button',
    leftIcon,
    rightIcon,
    asChild,
    disabled,
    className: _className,
    children,
    ...props
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const Comp = asChild ? Slot : 'button';
  const hasIcon = !!(leftIcon || rightIcon);
  const className = cx(styles.button({ color, variant, size }), hasIcon && styles.iconLayout, _className);

  return (
    <Comp ref={ref} type={type} className={className} disabled={disabled} {...props}>
      {leftIcon && <span className={styles.iconWrapper}>{leftIcon}</span>}
      <Slottable>{children}</Slottable>
      {rightIcon && <span className={styles.iconWrapper}>{rightIcon}</span>}
    </Comp>
  );
});
