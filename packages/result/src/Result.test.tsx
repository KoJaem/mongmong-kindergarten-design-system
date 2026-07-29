import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Result } from './Result';

test('renders Result', () => {
  render(<Result>Test</Result>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
