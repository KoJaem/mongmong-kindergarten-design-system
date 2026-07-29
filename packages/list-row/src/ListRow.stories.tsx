import type { Meta, StoryObj } from '@storybook/react';

import { ListRow } from './ListRow';

const meta = {
  title: 'Components/ListRow',
  component: ListRow,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ListRow>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'ListRow',
  },
};
