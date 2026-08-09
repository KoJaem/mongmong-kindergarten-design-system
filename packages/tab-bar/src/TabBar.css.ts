import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';

export const tabBar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  paddingTop: vars.spacing.padding.xs,
  paddingBottom: `max(${vars.spacing.padding.xs}, env(safe-area-inset-bottom))`,
  backgroundColor: vars.color.background.default,
  fontFamily: vars.typography.fontFamily,
});
