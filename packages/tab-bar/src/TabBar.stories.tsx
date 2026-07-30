import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TabBar } from './TabBar';
import { TabBarItem } from './TabBarItem';

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 11L12 4L20 11V20H14V14H10V20H4V11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const DiaryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const MyPageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M5 20C5 16 8 14 12 14C16 14 19 16 19 20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const meta = {
  title: 'Components/TabBar',
  component: TabBar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TabBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <TabBar>
        <TabBarItem icon={<HomeIcon />} label="홈" selected />
        <TabBarItem icon={<DiaryIcon />} label="일기" />
        <TabBarItem icon={<MyPageIcon />} label="마이페이지" dot />
      </TabBar>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const tabs = [
      { key: 'home', icon: <HomeIcon />, label: '홈' },
      { key: 'diary', icon: <DiaryIcon />, label: '일기' },
      { key: 'my', icon: <MyPageIcon />, label: '마이페이지' },
    ];
    const [selected, setSelected] = useState('home');
    return (
      <div style={{ width: 360 }}>
        <TabBar>
          {tabs.map((tab) => (
            <TabBarItem
              key={tab.key}
              icon={tab.icon}
              label={tab.label}
              selected={selected === tab.key}
              onClick={() => setSelected(tab.key)}
            />
          ))}
        </TabBar>
      </div>
    );
  },
};
