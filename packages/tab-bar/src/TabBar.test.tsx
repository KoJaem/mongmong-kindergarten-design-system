import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { TabBar } from './TabBar';

test('renders TabBar', () => {
  render(<TabBar>Test</TabBar>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
