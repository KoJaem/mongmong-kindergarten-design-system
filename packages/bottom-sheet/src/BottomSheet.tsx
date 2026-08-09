import { type ComponentProps, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { clsx as cx } from 'clsx';

import * as styles from './BottomSheet.css';

export const BottomSheetButtonLayout = { horizontal: 'horizontal', vertical: 'vertical' } as const;
export type BottomSheetButtonLayout = (typeof BottomSheetButtonLayout)[keyof typeof BottomSheetButtonLayout];

export interface BottomSheetProps extends ComponentProps<typeof Dialog.Root> {
  title?: ReactNode;
  description?: ReactNode;
  buttonLayout?: BottomSheetButtonLayout;
  dim?: boolean;
  buttons?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentProps?: ComponentProps<typeof Dialog.Content>;
}

export const BottomSheet = forwardRef(function BottomSheet(
  {
    title,
    description,
    buttonLayout = BottomSheetButtonLayout.horizontal,
    dim = true,
    buttons,
    children,
    className,
    contentProps,
    ...rootProps
  }: BottomSheetProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Dialog.Root {...rootProps}>
      <Dialog.Portal>
        {dim && <Dialog.Overlay className={styles.overlay} />}
        <Dialog.Content ref={ref} className={cx(styles.content, className)} {...contentProps}>
          <div className={styles.handleArea}>
            <div className={styles.handle} />
          </div>
          {(title || description) && (
            <div className={styles.textContainer}>
              {title && <Dialog.Title className={styles.title}>{title}</Dialog.Title>}
              {description && <Dialog.Description className={styles.description}>{description}</Dialog.Description>}
            </div>
          )}
          {children && <div className={styles.slot}>{children}</div>}
          {buttons && <div className={styles.buttonArea({ layout: buttonLayout })}>{buttons}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
