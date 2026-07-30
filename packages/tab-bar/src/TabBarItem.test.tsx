import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { TabBarItem } from './TabBarItem';

test('renders icon and label', () => {
  render(<TabBarItem icon={<span data-testid="icon" />} label="홈" />);

  expect(screen.getByTestId('icon')).toBeInTheDocument();
  expect(screen.getByText('홈')).toBeInTheDocument();
});

test('reflects selected state via aria-pressed', () => {
  render(<TabBarItem icon={<span />} label="홈" selected />);

  expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
});

test('renders a dot indicator when dot is true', () => {
  const { container } = render(<TabBarItem icon={<span />} label="홈" dot />);

  expect(container.querySelectorAll('span').length).toBeGreaterThan(2);
});

test('calls onClick when clicked', () => {
  const onClick = vi.fn();
  render(<TabBarItem icon={<span />} label="홈" onClick={onClick} />);

  fireEvent.click(screen.getByRole('button'));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('forwards ref to the underlying button', () => {
  let node: HTMLButtonElement | null = null;
  render(
    <TabBarItem
      icon={<span />}
      label="홈"
      ref={(el) => {
        node = el;
      }}
    />,
  );

  expect(node).toBeInstanceOf(HTMLButtonElement);
});
