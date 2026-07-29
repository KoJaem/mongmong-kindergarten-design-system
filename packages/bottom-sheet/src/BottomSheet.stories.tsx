import type { Meta, StoryObj } from '@storybook/react';

import { BottomSheet } from './BottomSheet';

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
    children: 'BottomSheet',
  },
};
