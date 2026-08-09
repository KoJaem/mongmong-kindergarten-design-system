import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextField>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력해주세요',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@mongmong.com',
    helperText: '알림을 받을 이메일을 입력해주세요',
  },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@mongmong.com',
    defaultValue: 'invalid-email',
    error: true,
    helperText: '올바른 이메일 형식이 아니에요',
  },
};

export const Disabled: Story = {
  args: {
    label: '이름',
    defaultValue: '몽몽이',
    disabled: true,
  },
};
