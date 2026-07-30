import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { ListRowPadding } from './ListRow';

export const listRow = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: vars.spacing.gap.s,
    minHeight: '44px',
    width: '100%',
    paddingLeft: vars.spacing.padding['2xl'],
    paddingRight: vars.spacing.padding['2xl'],
    fontFamily: vars.typography.fontFamily,
  },
  variants: {
    padding: {
      [ListRowPadding.s]: { paddingTop: '8px', paddingBottom: '8px' },
      [ListRowPadding.m]: { paddingTop: '12px', paddingBottom: '12px' },
      [ListRowPadding.l]: { paddingTop: '16px', paddingBottom: '16px' },
    },
  },
  defaultVariants: { padding: ListRowPadding.m },
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
  gap: vars.spacing.gap.l,
});

export const leadingAsset = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const textSection = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
});

export const title = style({
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: vars.color.text.primary,
  fontWeight: vars.typography.fontWeight.bold,
  fontSize: vars.typography.fontSize.subtitleLarge,
  lineHeight: vars.typography.lineHeight.subtitleLarge,
});

export const description = style({
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: vars.color.text.secondary,
  fontWeight: vars.typography.fontWeight.regular,
  fontSize: vars.typography.fontSize.bodyMedium,
  lineHeight: vars.typography.lineHeight.bodyMedium,
});

export const trailingAccessory = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.gap.s,
  flexShrink: 0,
});
