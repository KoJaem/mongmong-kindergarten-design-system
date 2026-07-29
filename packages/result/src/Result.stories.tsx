import type { Meta, StoryObj } from '@storybook/react';

import { Result } from './Result';

const meta = {
  title: 'Components/Result',
  component: Result,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Result>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Result',
  },
};
