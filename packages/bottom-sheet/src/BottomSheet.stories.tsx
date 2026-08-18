import { Button } from '@kojaem/button';

import type { Meta, StoryObj } from '@storybook/react';

import { BottomSheet, BottomSheetButtonLayout } from './BottomSheet';

const meta = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BottomSheet>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    open: true,
    title: '타이틀 내용',
    description: '보조 설명을 작성해주세요.',
    buttons: (
      <Button color="brand" variant="fill" size="xl">
        버튼
      </Button>
    ),
  },
};

export const TwoButtonsHorizontal: Story = {
  args: {
    open: true,
    title: '타이틀 내용',
    description: '보조 설명을 작성해주세요.',
    buttonLayout: BottomSheetButtonLayout.horizontal,
    buttons: (
      <>
        <Button color="neutral" variant="weak" size="xl">
          아니요
        </Button>
        <Button color="brand" variant="fill" size="xl">
          예
        </Button>
      </>
    ),
  },
};

export const TwoButtonsVertical: Story = {
  args: {
    open: true,
    title: '타이틀 내용',
    description: '보조 설명을 작성해주세요.',
    buttonLayout: BottomSheetButtonLayout.vertical,
    buttons: (
      <>
        <Button color="brand" variant="fill" size="xl">
          예
        </Button>
        <Button color="neutral" variant="weak" size="xl">
          아니요
        </Button>
      </>
    ),
  },
};

export const WithContentSlot: Story = {
  args: {
    open: true,
    title: '타이틀 내용',
    children: <div style={{ padding: 24, textAlign: 'center' }}>커스텀 콘텐츠</div>,
    buttons: (
      <Button color="brand" variant="fill" size="xl">
        확인
      </Button>
    ),
  },
};
