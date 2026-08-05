import { type ComponentProps, type ForwardedRef, forwardRef, useId } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './TextField.css';

export interface TextFieldProps extends Omit<ComponentProps<'input'>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
}

export const TextField = forwardRef(function TextField(
  { label, helperText, error, disabled, id, className: _className, ...props }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={error}
        className={cx(styles.field({ error }), _className)}
        {...props}
      />
      {helperText && <span className={styles.helperText({ error })}>{helperText}</span>}
    </div>
  );
});
