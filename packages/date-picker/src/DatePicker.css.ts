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
  position: 'relative',
  display: 'flex',
  gap: vars.spacing.gap.m,
  justifyContent: 'center',
  paddingLeft: vars.spacing.padding['3xl'],
  paddingRight: vars.spacing.padding['3xl'],
  overflow: 'hidden',
});

export const wheelColumn = style({
  flex: 1,
  overflowY: 'scroll',
  scrollSnapType: 'y mandatory',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});

export const wheelItem = recipe({
  base: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    scrollSnapAlign: 'center',
    fontFamily: vars.typography.fontFamily,
    fontWeight: vars.typography.fontWeight.bold,
    fontSize: vars.typography.fontSize.titleLarge,
    color: vars.color.text.tertiary,
  },
  variants: {
    selected: {
      true: { color: vars.color.text.strong },
      false: {},
    },
  },
  defaultVariants: { selected: false },
});

export const wheelHighlight = style({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  height: '44px',
  transform: 'translateY(-50%)',
  borderRadius: vars.radius.datePicker.wheel,
  backgroundColor: vars.color.fill.neutralWeak,
  pointerEvents: 'none',
});

export const wheelFadeTop = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '88px',
  background: `linear-gradient(to bottom, ${vars.color.background.default}, transparent)`,
  pointerEvents: 'none',
});

export const wheelFadeBottom = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '88px',
  background: `linear-gradient(to top, ${vars.color.background.default}, transparent)`,
  pointerEvents: 'none',
});
