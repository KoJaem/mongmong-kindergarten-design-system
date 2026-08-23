import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox, CheckboxSize, CheckboxVariant } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'select', options: Object.values(CheckboxVariant) },
    size: { control: 'select', options: Object.values(CheckboxSize) },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    variant: CheckboxVariant.circle,
    size: CheckboxSize.m,
    defaultChecked: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
  args: {
    variant: CheckboxVariant.circle,
    size: CheckboxSize.m,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {Object.values(CheckboxVariant).map((variant) => (
        <Checkbox key={variant} variant={variant} defaultChecked />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {Object.values(CheckboxSize).map((size) => (
        <Checkbox key={size} size={size} defaultChecked />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Checkbox defaultChecked={false} />
      <Checkbox defaultChecked={true} />
      <Checkbox disabled defaultChecked={false} />
      <Checkbox disabled defaultChecked={true} />
    </div>
  ),
};
