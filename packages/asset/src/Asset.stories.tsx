import type { Meta, StoryObj } from '@storybook/react';

import { Asset } from './Asset';

const meta = {
  title: 'Components/Asset',
  component: Asset,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Asset>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Asset',
  },
};
