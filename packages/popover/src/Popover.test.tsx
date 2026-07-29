import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Popover } from './Popover';

test('renders Popover', () => {
  render(<Popover>Test</Popover>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
