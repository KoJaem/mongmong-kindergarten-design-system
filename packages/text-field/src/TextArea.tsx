import { type ComponentProps, type ForwardedRef, forwardRef, useId } from 'react';

import { clsx as cx } from 'clsx';

import * as styles from './TextField.css';

export interface TextAreaProps extends ComponentProps<'textarea'> {
  label?: string;
  helperText?: string;
  error?: boolean;
}

export const TextArea = forwardRef(function TextArea(
  { label, helperText, error, id, className: _className, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
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
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={error}
        className={cx(styles.areaField({ error }), _className)}
        {...props}
      />
      {helperText && <span className={styles.helperText({ error })}>{helperText}</span>}
    </div>
  );
});
