import type { Meta, StoryObj } from '@storybook/react';

import { Toast, ToastLayout } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    layout: { control: 'select', options: Object.values(ToastLayout) },
  },
} satisfies Meta<typeof Toast>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: '계좌번호가 복사되었습니다',
  },
};

export const WithIcon: Story = {
  args: {
    icon: '✅',
    children: '계좌번호가 복사되었습니다',
  },
};

export const WithAction: Story = {
  args: {
    children: '계좌번호가 복사되었습니다',
    action: '공유',
  },
};

export const WithIconAndAction: Story = {
  args: {
    icon: '✅',
    children: '계좌번호가 복사되었습니다',
    action: '공유',
  },
};

export const Fixed: Story = {
  args: {
    layout: 'fixed',
    icon: '✅',
    children: '계좌번호가 복사되었습니다',
    action: '공유',
  },
};
