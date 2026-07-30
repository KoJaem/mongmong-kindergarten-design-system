import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { ListRow, ListRowPadding } from './ListRow';

test('renders the title', () => {
  render(<ListRow title="Title" />);

  expect(screen.getByText('Title')).toBeInTheDocument();
});

test('renders description when provided', () => {
  render(<ListRow title="Title" description="Description" />);

  expect(screen.getByText('Description')).toBeInTheDocument();
});

test('does not render description when omitted', () => {
  render(<ListRow title="Title" />);

  expect(screen.queryByText('Description')).not.toBeInTheDocument();
});

test('renders leadingAsset when provided', () => {
  render(<ListRow title="Title" leadingAsset={<span data-testid="asset" />} />);

  expect(screen.getByTestId('asset')).toBeInTheDocument();
});

test('renders trailingAccessory when provided', () => {
  render(<ListRow title="Title" trailingAccessory={<span data-testid="accessory" />} />);

  expect(screen.getByTestId('accessory')).toBeInTheDocument();
});

test.each(Object.values(ListRowPadding))('renders with padding=%s', (padding) => {
  render(<ListRow title="Title" padding={padding} />);

  expect(screen.getByText('Title')).toBeInTheDocument();
});

test('forwards ref to the underlying div', () => {
  let node: HTMLDivElement | null = null;
  render(
    <ListRow
      ref={(el) => {
        node = el;
      }}
      title="Title"
    />,
  );

  expect(node).toBeInstanceOf(HTMLDivElement);
});
