import type { Meta, StoryObj } from '@storybook/react';

import { Popover, PopoverKind, PopoverSize, PopoverTail } from './Popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    kind: { control: 'select', options: Object.values(PopoverKind) },
    size: { control: 'select', options: Object.values(PopoverSize) },
    tail: { control: 'select', options: Object.values(PopoverTail) },
  },
} satisfies Meta<typeof Popover>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Tooltip: Story = {
  args: {
    kind: PopoverKind.tooltip,
    children: '툴팁이에요.',
  },
};

export const PopoverWithTitleAndDescription: Story = {
  args: {
    kind: PopoverKind.popover,
    size: PopoverSize.m,
    title: '3초 만에 이해되게 만들기',
    description: 'Less policy',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 40 }}>
      {Object.values(PopoverSize).map((size) => (
        <Popover key={size} kind={PopoverKind.popover} size={size} title="타이틀" description="설명 텍스트" />
      ))}
    </div>
  ),
};

export const TailPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 40, padding: 24 }}>
      {Object.values(PopoverTail).map((tail) => (
        <Popover key={tail} tail={tail}>
          {tail}
        </Popover>
      ))}
    </div>
  ),
};
