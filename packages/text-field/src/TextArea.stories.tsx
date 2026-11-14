import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextArea>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: '최대 1000자까지 입력할 수 있어요',
    rows: 3,
    style: { width: 320 },
  },
};

export const WithCounter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 320 }}>
        <TextArea
          value={value}
          maxLength={1000}
          rows={3}
          placeholder="최대 1000자까지 입력할 수 있어요"
          helperText={`${value.length}/1000`}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  args: {
    defaultValue: '답장 내용',
    error: true,
    helperText: '답장을 보내지 못했어요',
    style: { width: 320 },
  },
};
