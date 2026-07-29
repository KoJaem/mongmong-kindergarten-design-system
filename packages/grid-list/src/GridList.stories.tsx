import type { Meta, StoryObj } from '@storybook/react';

import { GridList } from './GridList';

const meta = {
  title: 'Components/GridList',
  component: GridList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof GridList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'GridList',
  },
};
