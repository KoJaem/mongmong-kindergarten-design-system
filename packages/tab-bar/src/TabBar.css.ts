import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';

export const tabBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.gap.s,
  width: '100%',
  paddingTop: vars.spacing.padding.s,
  paddingBottom: `max(${vars.spacing.padding.l}, env(safe-area-inset-bottom))`,
  paddingLeft: vars.spacing.padding['2xl'],
  paddingRight: vars.spacing.padding['2xl'],
  backgroundColor: vars.color.background.primary,
  backdropFilter: 'blur(15px)',
  fontFamily: vars.typography.fontFamily,
});
