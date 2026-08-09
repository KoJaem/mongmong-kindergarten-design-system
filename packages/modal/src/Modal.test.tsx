import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { Modal } from './Modal';

test('renders title and description when open', () => {
  render(<Modal open title="다시 촬영해주세요" description="정보가 인식됐는지 다시 확인해주세요." />);

  expect(screen.getByText('다시 촬영해주세요')).toBeInTheDocument();
  expect(screen.getByText('정보가 인식됐는지 다시 확인해주세요.')).toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('does not render when closed', () => {
  render(<Modal open={false} title="Test" />);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('renders buttons', () => {
  render(
    <Modal open title="Test" buttons={<button type="button">확인</button>}>
      test
    </Modal>,
  );

  expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
});
