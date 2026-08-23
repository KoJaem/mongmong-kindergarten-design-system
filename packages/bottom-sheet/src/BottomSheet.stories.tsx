import { type ReactNode, useState } from 'react';

import { Button } from '@kojaem/button';

import type { Meta, StoryObj } from '@storybook/react';

import { BottomSheet, BottomSheetButtonLayout, type BottomSheetProps } from './BottomSheet';

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    buttonLayout: { control: 'select', options: Object.values(BottomSheetButtonLayout) },
  },
  args: {
    open: false,
  },
} satisfies Meta<typeof BottomSheet>;
export default meta;

type Story = StoryObj<typeof meta>;

type InteractiveBottomSheetProps = Omit<BottomSheetProps, 'open' | 'onOpenChange' | 'buttons'> & {
  renderButtons: (close: () => void) => ReactNode;
};

function InteractiveBottomSheet({ renderButtons, ...props }: InteractiveBottomSheetProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button color="brand" variant="fill" size="l" onClick={() => setOpen(true)}>
        열기
      </Button>
      <BottomSheet {...props} open={open} onOpenChange={setOpen} buttons={renderButtons(() => setOpen(false))} />
    </>
  );
}

export const Basic: Story = {
  render: (args) => (
    <InteractiveBottomSheet
      {...args}
      renderButtons={(close) => (
        <Button color="brand" variant="fill" size="xl" onClick={close}>
          버튼
        </Button>
      )}
    />
  ),
  args: {
    title: '타이틀 내용',
    description: '보조 설명을 작성해주세요.',
  },
};

export const TwoButtonsHorizontal: Story = {
  render: (args) => (
    <InteractiveBottomSheet
      {...args}
      renderButtons={(close) => (
        <>
          <Button color="neutral" variant="weak" size="xl" onClick={close}>
            아니요
          </Button>
          <Button color="brand" variant="fill" size="xl" onClick={close}>
            예
          </Button>
        </>
      )}
    />
  ),
  args: {
    title: '타이틀 내용',
    description: '보조 설명을 작성해주세요.',
    buttonLayout: BottomSheetButtonLayout.horizontal,
  },
};

export const TwoButtonsVertical: Story = {
  render: (args) => (
    <InteractiveBottomSheet
      {...args}
      renderButtons={(close) => (
        <>
          <Button color="brand" variant="fill" size="xl" onClick={close}>
            예
          </Button>
          <Button color="neutral" variant="weak" size="xl" onClick={close}>
            아니요
          </Button>
        </>
      )}
    />
  ),
  args: {
    title: '타이틀 내용',
    description: '보조 설명을 작성해주세요.',
    buttonLayout: BottomSheetButtonLayout.vertical,
  },
};

export const WithContentSlot: Story = {
  render: (args) => (
    <InteractiveBottomSheet
      {...args}
      renderButtons={(close) => (
        <Button color="brand" variant="fill" size="xl" onClick={close}>
          확인
        </Button>
      )}
    />
  ),
  args: {
    title: '타이틀 내용',
    children: <div style={{ padding: 24, textAlign: 'center' }}>커스텀 콘텐츠</div>,
  },
};
