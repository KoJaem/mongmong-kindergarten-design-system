import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { GridList } from './GridList';

test('renders GridList', () => {
  render(<GridList>Test</GridList>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
