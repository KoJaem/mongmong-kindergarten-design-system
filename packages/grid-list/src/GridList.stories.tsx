import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { GridList, GridListColumns } from './GridList';
import { GridListItem } from './GridListItem';

const banks = ['하나', '국민', 'IBK', '신한', '우리', '농협', 'KB', '카카오'];

const meta = {
  title: 'Components/GridList',
  component: GridList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    columns: { control: 'select', options: Object.values(GridListColumns) },
  },
} satisfies Meta<typeof GridList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    columns: GridListColumns[3],
  },
  render: (args) => (
    <div style={{ width: 400 }}>
      <GridList {...args}>
        {banks.slice(0, 6).map((bank) => (
          <GridListItem
            key={bank}
            label={bank}
            image={<div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ddd' }} />}
          />
        ))}
      </GridList>
    </div>
  ),
};

export const SelectableSingleChoice: Story = {
  render: () => {
    const [selected, setSelected] = useState(banks[0]);
    return (
      <div style={{ width: 400 }}>
        <GridList columns={GridListColumns[3]}>
          {banks.slice(0, 6).map((bank) => (
            <GridListItem
              key={bank}
              label={bank}
              selected={bank === selected}
              onClick={() => setSelected(bank)}
              image={<div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ddd' }} />}
            />
          ))}
        </GridList>
      </div>
    );
  },
};

export const Columns: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(GridListColumns).map((columns) => (
        <div key={columns} style={{ width: 400 }}>
          <GridList columns={columns}>
            {banks.slice(0, 3).map((bank) => (
              <GridListItem key={bank} label={bank} />
            ))}
          </GridList>
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <GridList columns={GridListColumns[1]}>
        <GridListItem label="사용 불가" disabled />
      </GridList>
    </div>
  ),
};
