import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { TopNavigation } from './TopNavigation';

test('renders the title', () => {
  render(<TopNavigation title="Title" />);

  expect(screen.getByText('Title')).toBeInTheDocument();
});

test('does not render a back button when onBack is not provided', () => {
  render(<TopNavigation title="Title" />);

  expect(screen.queryByRole('button', { name: '뒤로가기' })).not.toBeInTheDocument();
});

test('renders and triggers the back button', () => {
  const onBack = vi.fn();
  render(<TopNavigation title="Title" onBack={onBack} />);

  fireEvent.click(screen.getByRole('button', { name: '뒤로가기' }));

  expect(onBack).toHaveBeenCalledTimes(1);
});

test('renders and triggers the right label button', () => {
  const onRightLabelClick = vi.fn();
  render(<TopNavigation rightLabel="레이블" onRightLabelClick={onRightLabelClick} />);

  fireEvent.click(screen.getByText('레이블'));

  expect(onRightLabelClick).toHaveBeenCalledTimes(1);
});

test('renders and triggers the right icon button', () => {
  const onRightIconClick = vi.fn();
  render(<TopNavigation rightIcon={<span data-testid="icon" />} onRightIconClick={onRightIconClick} />);

  fireEvent.click(screen.getByTestId('icon'));

  expect(onRightIconClick).toHaveBeenCalledTimes(1);
});

test('forwards ref to the underlying header', () => {
  let node: HTMLElement | null = null;
  render(
    <TopNavigation
      ref={(el) => {
        node = el;
      }}
      title="Title"
    />,
  );

  expect(node).toBeInstanceOf(HTMLElement);
});
