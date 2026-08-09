import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    open: true,
    title: '다시 촬영해주세요',
    description: '정보가 인식됐는지 다시 확인해주세요.',
    buttons: (
      <>
        <button type="button">아니요</button>
        <button type="button">예</button>
      </>
    ),
  },
};

export const VerticalButtons: Story = {
  args: {
    open: true,
    title: '다시 촬영해주세요',
    description: '정보가 인식됐는지 다시 확인해주세요.',
    buttonLayout: 'vertical',
    buttons: (
      <>
        <button type="button">예</button>
        <button type="button">아니요</button>
      </>
    ),
  },
};

export const WithoutDescription: Story = {
  args: {
    open: true,
    title: '저장되었습니다',
    buttons: <button type="button">확인</button>,
  },
};
