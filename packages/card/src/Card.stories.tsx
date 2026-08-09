import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardRadius, CardVariant } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'select', options: Object.values(CardVariant) },
    radius: { control: 'select', options: Object.values(CardRadius) },
  },
} satisfies Meta<typeof Card>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: '컨텐츠',
    variant: CardVariant.default,
    radius: CardRadius.l,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {Object.values(CardVariant).map((variant) => (
        <Card key={variant} variant={variant} style={{ width: 200 }}>
          {variant}
        </Card>
      ))}
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {Object.values(CardRadius).map((radius) => (
        <Card key={radius} radius={radius} style={{ width: 160 }}>
          radius={radius}
        </Card>
      ))}
    </div>
  ),
};
