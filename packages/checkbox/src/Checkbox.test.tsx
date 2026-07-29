import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Checkbox } from './Checkbox';

test('renders Checkbox', () => {
  render(<Checkbox>Test</Checkbox>);

  expect(screen.getByText('Test')).toBeInTheDocument();
});
