import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { DatePicker } from './DatePicker';

test('renders DatePicker', () => {
  render(<DatePicker>Test</DatePicker>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
