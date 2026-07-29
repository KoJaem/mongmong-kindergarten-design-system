import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { ListRow } from './ListRow';

test('renders ListRow', () => {
  render(<ListRow>Test</ListRow>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
