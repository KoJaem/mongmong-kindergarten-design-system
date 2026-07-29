import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { BottomSheet } from './BottomSheet';

test('renders BottomSheet', () => {
  render(<BottomSheet>Test</BottomSheet>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
