import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Button',
    color: 'brand',
    variant: 'fill',
    size: 'l',
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button color="brand">Brand</Button>
      <Button color="neutral">Neutral</Button>
      <div style={{ background: '#333', padding: 8 }}>
        <Button color="inverse">Inverse</Button>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant="fill">Fill</Button>
      <Button variant="weak">Weak</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Button size="s">Small</Button>
      <Button size="m">Medium</Button>
      <Button size="l">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};
