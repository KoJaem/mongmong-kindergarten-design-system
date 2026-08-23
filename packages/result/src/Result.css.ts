import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';

export const result = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.padding.l,
  width: '360px',
  paddingTop: '32px',
  paddingBottom: '40px',
  paddingLeft: '40px',
  paddingRight: '40px',
  fontFamily: vars.typography.fontFamily,
});

export const image = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  flexShrink: 0,
});

export const textAndAction = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.padding.xl,
  width: '100%',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.padding['2xs'],
  width: '100%',
});

export const title = style({
  margin: 0,
  textAlign: 'center',
  color: vars.color.text.secondary,
  fontWeight: vars.typography.fontWeight.bold,
  fontSize: vars.typography.fontSize.subtitleMedium,
  lineHeight: vars.typography.lineHeight.subtitleMedium,
});

export const description = style({
  margin: 0,
  textAlign: 'center',
  color: vars.color.text.secondary,
  fontWeight: vars.typography.fontWeight.regular,
  fontSize: vars.typography.fontSize.captionLarge,
  lineHeight: vars.typography.lineHeight.captionLarge,
});

export const action = style({
  display: 'flex',
  flexShrink: 0,
});
