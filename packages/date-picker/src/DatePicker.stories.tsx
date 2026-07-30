import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker, DatePickerType } from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: { control: 'select', options: Object.values(DatePickerType) },
  },
} satisfies Meta<typeof DatePicker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Calendar: Story = {
  args: {
    type: DatePickerType.calendar,
    defaultValue: new Date(2026, 4, 3),
    defaultMonth: new Date(2026, 4, 1),
  },
};

export const CalendarControlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(new Date(2026, 4, 3));
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    defaultMonth: new Date(2026, 4, 1),
  },
};

export const Wheel: Story = {
  args: {
    type: DatePickerType.wheel,
    defaultValue: new Date(2026, 4, 3),
  },
};

export const WithDisabledRange: Story = {
  args: {
    type: DatePickerType.calendar,
    defaultMonth: new Date(2026, 4, 1),
    minDate: new Date(2026, 4, 3),
    maxDate: new Date(2026, 4, 20),
  },
};
