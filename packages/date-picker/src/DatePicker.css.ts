import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const datePicker = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.gap.m,
  width: '360px',
  paddingTop: vars.spacing.padding['2xl'],
  paddingBottom: vars.spacing.padding['2xl'],
  fontFamily: vars.typography.fontFamily,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: vars.spacing.padding['3xl'],
  paddingRight: vars.spacing.padding['3xl'],
});

export const headerLabel = style({
  margin: 0,
  color: vars.color.text.strong,
  fontWeight: vars.typography.fontWeight.bold,
  fontSize: vars.typography.fontSize.subtitleLarge,
  lineHeight: vars.typography.lineHeight.subtitleLarge,
});

export const navButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: vars.color.text.secondary,
  fontSize: '18px',
});

export const weekdayRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  paddingLeft: vars.spacing.padding['3xl'],
  paddingRight: vars.spacing.padding['3xl'],
});

export const weekdayLabel = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.text.tertiary,
  fontSize: vars.typography.fontSize.captionLarge,
  lineHeight: vars.typography.lineHeight.captionLarge,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  rowGap: vars.spacing.gap.s,
  paddingLeft: vars.spacing.padding['3xl'],
  paddingRight: vars.spacing.padding['3xl'],
});

export const dateCell = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '42px',
    width: '36px',
    margin: '0 auto',
    border: 'none',
    borderRadius: vars.radius.button.full,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: vars.color.text.tertiary,
    fontWeight: vars.typography.fontWeight.bold,
    fontSize: vars.typography.fontSize.titleSmall,
  },
  variants: {
    selected: {
      true: { backgroundColor: vars.color.fill.brand, color: vars.color.text.strong },
      false: {},
    },
    disabled: {
      true: { opacity: 0.5, color: vars.color.text.quaternary, cursor: 'not-allowed', pointerEvents: 'none' },
      false: {},
    },
  },
  defaultVariants: { selected: false, disabled: false },
});

export const wheelRow = style({
  display: 'flex',
  gap: vars.spacing.gap.m,
  justifyContent: 'center',
  paddingLeft: vars.spacing.padding['3xl'],
  paddingRight: vars.spacing.padding['3xl'],
});

export const wheelSelect = style({
  flex: 1,
  height: '42px',
  borderRadius: vars.radius.button.m,
  border: `1px solid ${vars.color.border.default}`,
  backgroundColor: vars.color.background.default,
  color: vars.color.text.primary,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.bodyMedium,
  textAlign: 'center',
});
