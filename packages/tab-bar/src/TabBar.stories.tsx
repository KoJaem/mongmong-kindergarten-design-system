import type { Meta, StoryObj } from '@storybook/react';

import { TabBar } from './TabBar';

const meta = {
  title: 'Components/TabBar',
  component: TabBar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TabBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'TabBar',
  },
};
