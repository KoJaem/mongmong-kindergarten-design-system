import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { TopNavigation } from './TopNavigation';

test('renders TopNavigation', () => {
  render(<TopNavigation>Test</TopNavigation>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
