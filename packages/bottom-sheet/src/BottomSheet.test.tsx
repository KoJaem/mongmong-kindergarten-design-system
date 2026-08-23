import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { BottomSheet, BottomSheetButtonLayout } from './BottomSheet';

test('renders title and description when open', () => {
  render(<BottomSheet open title="타이틀 내용" description="보조 설명을 작성해주세요." />);

  expect(screen.getByText('타이틀 내용')).toBeInTheDocument();
  expect(screen.getByText('보조 설명을 작성해주세요.')).toBeInTheDocument();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('does not render when closed', () => {
  render(<BottomSheet open={false} title="Test" />);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('renders buttons', () => {
  render(
    <BottomSheet open title="Test" buttons={<button type="button">확인</button>}>
      test
    </BottomSheet>,
  );

  expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
});

test('renders children content slot', () => {
  render(
    <BottomSheet open title="Test">
      <p>커스텀 콘텐츠</p>
    </BottomSheet>,
  );

  expect(screen.getByText('커스텀 콘텐츠')).toBeInTheDocument();
});

test('applies a different button area className for horizontal vs vertical layout', () => {
  const { container: horizontal } = render(
    <BottomSheet
      open
      title="Test"
      buttonLayout={BottomSheetButtonLayout.horizontal}
      buttons={<button type="button">확인</button>}
    >
      test
    </BottomSheet>,
  );
  const { container: vertical } = render(
    <BottomSheet
      open
      title="Test"
      buttonLayout={BottomSheetButtonLayout.vertical}
      buttons={<button type="button">확인</button>}
    >
      test
    </BottomSheet>,
  );

  const horizontalButtonArea = screen.getAllByRole('button', { name: '확인' })[0]?.parentElement;
  const verticalButtonArea = screen.getAllByRole('button', { name: '확인' })[1]?.parentElement;
  expect(horizontal).toBeTruthy();
  expect(vertical).toBeTruthy();
  expect(horizontalButtonArea?.className).not.toBe(verticalButtonArea?.className);
});

test('omits title when not provided', () => {
  render(<BottomSheet open>content</BottomSheet>);

  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
