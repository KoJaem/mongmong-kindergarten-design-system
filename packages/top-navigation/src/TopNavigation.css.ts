import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';

export const topNavigation = style({
  display: 'flex',
  alignItems: 'center',
  height: '54px',
  width: '100%',
  fontFamily: vars.typography.fontFamily,
});

export const side = style({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
});

export const rightSide = style({
  justifyContent: 'flex-end',
  gap: vars.spacing.gap.xs,
  paddingRight: vars.spacing.padding.m,
});

export const titleArea = style({
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  flexShrink: 0,
  paddingLeft: vars.spacing.padding.l,
  paddingRight: vars.spacing.padding.m,
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

export const iconButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '44px',
  border: 'none',
  background: 'transparent',
  padding: 0,
  color: vars.color.text.primary,
  cursor: 'pointer',
  flexShrink: 0,
});

export const textButton = style({
  border: 'none',
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
  color: vars.color.text.primary,
  fontWeight: vars.typography.fontWeight.bold,
  fontSize: vars.typography.fontSize.subtitleSmall,
  lineHeight: vars.typography.lineHeight.subtitleSmall,
  whiteSpace: 'nowrap',
});
