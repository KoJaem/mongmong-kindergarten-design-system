import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Chip, ChipKind, ChipSize, ChipVariant } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    kind: { control: 'select', options: Object.values(ChipKind) },
    variant: { control: 'select', options: Object.values(ChipVariant) },
    size: { control: 'select', options: Object.values(ChipSize) },
  },
} satisfies Meta<typeof Chip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: '레이블',
  },
};

export const SelectToggle: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <Chip {...args} selected={selected} onClick={() => setSelected((prev) => !prev)}>
        레이블
      </Chip>
    );
  },
  args: {
    variant: ChipVariant.fill,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Chip variant={ChipVariant.fill}>Fill Unselected</Chip>
      <Chip variant={ChipVariant.fill} selected>
        Fill Selected
      </Chip>
      <Chip variant={ChipVariant.weak}>Weak Unselected</Chip>
      <Chip variant={ChipVariant.weak} selected>
        Weak Selected
      </Chip>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {Object.values(ChipSize).map((size) => (
        <Chip key={size} size={size} selected>
          {size}
        </Chip>
      ))}
    </div>
  ),
};

export const ActionKind: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, background: '#333', padding: 16 }}>
      <Chip kind={ChipKind.action} size={ChipSize.s}>
        인기 검색어
      </Chip>
      <Chip kind={ChipKind.action} size={ChipSize.s}>
        추천
      </Chip>
    </div>
  ),
};

export const WithIconsAndDot: Story = {
  args: {
    leadingIcon: <span aria-hidden>👤</span>,
    tailingIcon: <span aria-hidden>✕</span>,
    dot: true,
    children: '레이블',
  },
};
