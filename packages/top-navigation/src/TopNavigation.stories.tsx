import type { Meta, StoryObj } from '@storybook/react';

import { TopNavigation } from './TopNavigation';

const meta = {
  title: 'Components/TopNavigation',
  component: TopNavigation,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TopNavigation>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'TopNavigation',
  },
};
