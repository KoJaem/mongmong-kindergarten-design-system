import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Asset, AssetShape, AssetSize, AssetType } from './Asset';

test('renders icon content by default', () => {
  render(<Asset icon={<span data-testid="icon">★</span>} />);

  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('renders an image when assetType is filledImage and src is provided', () => {
  render(<Asset assetType={AssetType.filledImage} src="https://example.com/image.png" alt="avatar" />);

  const img = screen.getByRole('img', { name: 'avatar' });
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'https://example.com/image.png');
});

test('does not render an image when assetType is icon', () => {
  render(<Asset assetType={AssetType.icon} src="https://example.com/image.png" icon={<span>icon</span>} />);

  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});

test.each(Object.values(AssetShape))('renders with shape=%s', (shape) => {
  render(<Asset shape={shape} icon={<span data-testid="icon">★</span>} />);

  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test.each(Object.values(AssetSize))('renders with size=%s', (size) => {
  render(<Asset size={size} icon={<span data-testid="icon">★</span>} />);

  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('forwards ref to the underlying div', () => {
  let node: HTMLDivElement | null = null;
  render(
    <Asset
      ref={(el) => {
        node = el;
      }}
      icon={<span>icon</span>}
    />,
  );

  expect(node).toBeInstanceOf(HTMLDivElement);
});
