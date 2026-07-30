import type { Meta, StoryObj } from '@storybook/react';

import { Result } from './Result';

const meta = {
  title: 'Components/Result',
  component: Result,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Result>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    image: <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ddd' }} />,
    title: '다시 시도해주세요',
    description: (
      <>
        시스템에 잠깐 문제가 생겨
        <br />
        화면을 불러오지 못했어요.
      </>
    ),
    action: <button type="button">다시 시도하기</button>,
  },
};

export const WithoutAction: Story = {
  args: {
    image: <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ddd' }} />,
    title: '결과가 없어요',
  },
};

export const TitleOnly: Story = {
  args: {
    title: '완료되었습니다',
  },
};
