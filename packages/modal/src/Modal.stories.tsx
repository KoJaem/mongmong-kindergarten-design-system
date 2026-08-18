import { Button } from '@kojaem/button';

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
        <Button color="neutral" variant="weak" size="l">
          아니요
        </Button>
        <Button color="brand" variant="fill" size="l">
          예
        </Button>
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
        <Button color="brand" variant="fill" size="l">
          예
        </Button>
        <Button color="neutral" variant="weak" size="l">
          아니요
        </Button>
      </>
    ),
  },
};

export const WithoutDescription: Story = {
  args: {
    open: true,
    title: '저장되었습니다',
    buttons: (
      <Button color="brand" variant="fill" size="l">
        확인
      </Button>
    ),
  },
};
