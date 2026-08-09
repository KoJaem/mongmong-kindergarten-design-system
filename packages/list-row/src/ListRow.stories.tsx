import type { Meta, StoryObj } from '@storybook/react';

import { ListRow, ListRowPadding } from './ListRow';

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: 'Components/ListRow',
  component: ListRow,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    padding: { control: 'select', options: Object.values(ListRowPadding) },
  },
} satisfies Meta<typeof ListRow>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Title',
  },
  render: (args) => (
    <div style={{ width: 360, border: '1px solid #eee' }}>
      <ListRow {...args} />
    </div>
  ),
};

export const WithArrow: Story = {
  args: {
    title: 'Title',
    trailingAccessory: <ArrowIcon />,
  },
  render: (args) => (
    <div style={{ width: 360, border: '1px solid #eee' }}>
      <ListRow {...args} />
    </div>
  ),
};

export const WithDescriptionAndAsset: Story = {
  args: {
    leadingAsset: <div style={{ width: 30, height: 30, borderRadius: 8, background: '#ddd' }} />,
    title: 'Title',
    description: 'Description text',
    trailingAccessory: <ArrowIcon />,
  },
  render: (args) => (
    <div style={{ width: 360, border: '1px solid #eee' }}>
      <ListRow {...args} />
    </div>
  ),
};

export const Paddings: Story = {
  args: {
    title: 'Title',
  },
  render: () => (
    <div style={{ width: 360, border: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
      {Object.values(ListRowPadding).map((padding) => (
        <ListRow key={padding} padding={padding} title={`Padding ${padding}`} trailingAccessory={<ArrowIcon />} />
      ))}
    </div>
  ),
};
