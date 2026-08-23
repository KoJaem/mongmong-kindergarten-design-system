import { type ReactNode, useState } from 'react';

import { Button } from '@kojaem/button';

import type { Meta, StoryObj } from '@storybook/react';

import { Modal, ModalButtonLayout, type ModalProps } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    buttonLayout: { control: 'select', options: Object.values(ModalButtonLayout) },
  },
  args: {
    open: false,
  },
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof meta>;

type InteractiveModalProps = Omit<ModalProps, 'open' | 'onOpenChange' | 'buttons'> & {
  renderButtons: (close: () => void) => ReactNode;
};

function InteractiveModal({ renderButtons, ...props }: InteractiveModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button color="brand" variant="fill" size="l" onClick={() => setOpen(true)}>
        열기
      </Button>
      <Modal {...props} open={open} onOpenChange={setOpen} buttons={renderButtons(() => setOpen(false))} />
    </>
  );
}

export const Basic: Story = {
  render: (args) => (
    <InteractiveModal
      {...args}
      renderButtons={(close) => (
        <>
          <Button color="neutral" variant="weak" size="l" onClick={close}>
            아니요
          </Button>
          <Button color="brand" variant="fill" size="l" onClick={close}>
            예
          </Button>
        </>
      )}
    />
  ),
  args: {
    title: '다시 촬영해주세요',
    description: '정보가 인식됐는지 다시 확인해주세요.',
  },
};

export const VerticalButtons: Story = {
  render: (args) => (
    <InteractiveModal
      {...args}
      renderButtons={(close) => (
        <>
          <Button color="brand" variant="fill" size="l" onClick={close}>
            예
          </Button>
          <Button color="neutral" variant="weak" size="l" onClick={close}>
            아니요
          </Button>
        </>
      )}
    />
  ),
  args: {
    title: '다시 촬영해주세요',
    description: '정보가 인식됐는지 다시 확인해주세요.',
    buttonLayout: ModalButtonLayout.vertical,
  },
};

export const WithoutDescription: Story = {
  render: (args) => (
    <InteractiveModal
      {...args}
      renderButtons={(close) => (
        <Button color="brand" variant="fill" size="l" onClick={close}>
          확인
        </Button>
      )}
    />
  ),
  args: {
    title: '저장되었습니다',
  },
};
