import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Chip } from './Chip';

test('renders Chip', () => {
  render(<Chip>Test</Chip>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
