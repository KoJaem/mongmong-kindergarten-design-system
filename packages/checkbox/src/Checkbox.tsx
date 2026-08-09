import { type ComponentProps, type ForwardedRef, forwardRef } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './Checkbox.css';
import { CircleCheckedIcon, CircleUncheckedIcon, LineCheckedIcon, LineUncheckedIcon } from './CheckboxIcons';

export const CheckboxVariant = { circle: 'circle', line: 'line' } as const;
export type CheckboxVariant = (typeof CheckboxVariant)[keyof typeof CheckboxVariant];

export const CheckboxSize = { xs: 'xs', s: 's', m: 'm', l: 'l' } as const;
export type CheckboxSize = (typeof CheckboxSize)[keyof typeof CheckboxSize];

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'size' | 'type'> {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
}

export const Checkbox = forwardRef(function Checkbox(
  { variant = CheckboxVariant.circle, size = CheckboxSize.m, disabled, className: _className, ...props }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const UncheckedIcon = variant === CheckboxVariant.circle ? CircleUncheckedIcon : LineUncheckedIcon;
  const CheckedIcon = variant === CheckboxVariant.circle ? CircleCheckedIcon : LineCheckedIcon;

  return (
    <label className={cx(styles.container({ size, disabled }), _className)}>
      <input ref={ref} type="checkbox" className={styles.input} disabled={disabled} {...props} />
      <span className={styles.icon}>
        <span className={styles.unchecked}>
          <UncheckedIcon />
        </span>
        <span className={styles.checked}>
          <CheckedIcon />
        </span>
      </span>
    </label>
  );
});
