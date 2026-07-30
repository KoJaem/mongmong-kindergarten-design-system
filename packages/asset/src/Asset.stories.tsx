import type { Meta, StoryObj } from '@storybook/react';

import { Asset, AssetShape, AssetSize, AssetType } from './Asset';

const demoImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%234F7CFF'/%3E%3Cstop offset='1' stop-color='%231C05FF'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='60' height='60' fill='url(%23g)'/%3E%3C/svg%3E";

const demoIcon = (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.5 9H21.5L15.8 13.2L18 20L12 15.8L6 20L8.2 13.2L2.5 9H9.5L12 2Z" fill="currentColor" />
  </svg>
);

const meta = {
  title: 'Components/Asset',
  component: Asset,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    shape: { control: 'select', options: Object.values(AssetShape) },
    assetType: { control: 'select', options: Object.values(AssetType) },
    size: { control: 'select', options: Object.values(AssetSize) },
  },
} satisfies Meta<typeof Asset>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    shape: AssetShape.circle,
    assetType: AssetType.icon,
    size: AssetSize['2xl'],
    icon: demoIcon,
  },
};

export const FilledImage: Story = {
  args: {
    shape: AssetShape.circle,
    assetType: AssetType.filledImage,
    size: AssetSize['2xl'],
    src: demoImage,
  },
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {Object.values(AssetShape).map((shape) => (
        <Asset key={shape} shape={shape} assetType={AssetType.icon} size={AssetSize['2xl']} icon={demoIcon} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {Object.values(AssetSize).map((size) => (
        <Asset key={size} shape={AssetShape.squircle} assetType={AssetType.icon} size={size} icon={demoIcon} />
      ))}
    </div>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(AssetType).map((assetType) => (
        <div key={assetType} style={{ display: 'flex', gap: 16 }}>
          {Object.values(AssetShape).map((shape) => (
            <Asset
              key={shape}
              shape={shape}
              assetType={assetType}
              size={AssetSize['2xl']}
              icon={demoIcon}
              src={demoImage}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};
