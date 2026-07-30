import type { Meta, StoryObj } from '@storybook/react';

import { TopNavigation } from './TopNavigation';

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

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
    title: '2026년 5월 5일',
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <TopNavigation {...args} />
    </div>
  ),
};

export const WithBackAndActions: Story = {
  args: {
    title: '2026년 5월 5일',
    onBack: () => {},
    rightLabel: '레이블',
    rightIcon: <MenuIcon />,
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <TopNavigation {...args} />
    </div>
  ),
};

export const IconOnly: Story = {
  args: {
    title: '2026년 5월 5일',
    onBack: () => {},
    rightIcon: <MenuIcon />,
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <TopNavigation {...args} />
    </div>
  ),
};
