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
    buttons: <button type="button">버튼</button>,
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
        <button type="button">아니요</button>
        <button type="button">예</button>
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
        <button type="button">예</button>
        <button type="button">아니요</button>
      </>
    ),
  },
};

export const WithContentSlot: Story = {
  args: {
    open: true,
    title: '타이틀 내용',
    children: <div style={{ padding: 24, textAlign: 'center' }}>커스텀 콘텐츠</div>,
    buttons: <button type="button">확인</button>,
  },
};
