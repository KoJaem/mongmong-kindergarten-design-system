import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Asset } from './Asset';

test('renders Asset', () => {
  render(<Asset>Test</Asset>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
