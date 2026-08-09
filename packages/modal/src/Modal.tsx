import { type ComponentProps, type ForwardedRef, forwardRef, type ReactNode } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { clsx as cx } from 'clsx';

import * as styles from './Modal.css';

export const ModalButtonLayout = { horizontal: 'horizontal', vertical: 'vertical' } as const;
export type ModalButtonLayout = (typeof ModalButtonLayout)[keyof typeof ModalButtonLayout];

export interface ModalProps extends ComponentProps<typeof Dialog.Root> {
  title: ReactNode;
  description?: ReactNode;
  buttonLayout?: ModalButtonLayout;
  dim?: boolean;
  buttons?: ReactNode;
  className?: string;
  contentProps?: ComponentProps<typeof Dialog.Content>;
}

export const Modal = forwardRef(function Modal(
  {
    title,
    description,
    buttonLayout = ModalButtonLayout.horizontal,
    dim = true,
    buttons,
    className,
    contentProps,
    ...rootProps
  }: ModalProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Dialog.Root {...rootProps}>
      <Dialog.Portal>
        {dim && <Dialog.Overlay className={styles.overlay} />}
        <Dialog.Content ref={ref} className={cx(styles.content, className)} {...contentProps}>
          <div className={styles.textContainer}>
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
            {description && <Dialog.Description className={styles.description}>{description}</Dialog.Description>}
          </div>
          {buttons && <div className={styles.buttonArea({ layout: buttonLayout })}>{buttons}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
