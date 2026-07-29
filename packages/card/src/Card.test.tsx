import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Card } from './Card';

test('renders Card', () => {
  render(<Card>Test</Card>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
