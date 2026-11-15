import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const item = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.spacing.gap.s,
    width: '100%',
    minHeight: '82px',
    paddingLeft: vars.spacing.padding.s,
    paddingRight: vars.spacing.padding.s,
    paddingTop: vars.spacing.padding.l,
    paddingBottom: vars.spacing.padding.l,
    borderRadius: vars.radius.button.xl,
    border: '2px solid transparent',
    backgroundColor: vars.color.fill.inverseFloated,
    cursor: 'pointer',
    fontFamily: vars.typography.fontFamily,
    selectors: {
      '&:disabled': { cursor: 'not-allowed', opacity: 0.5 },
    },
  },
  variants: {
    selected: {
      true: { borderColor: vars.color.border.brandWeak },
      false: {},
    },
  },
  defaultVariants: { selected: false },
});

export const image = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const labelRow = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.gap['2xs'],
  width: '100%',
});

export const leadingIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '16px',
  height: '16px',
});

export const label = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: vars.color.text.inverseSecondary,
  fontWeight: vars.typography.fontWeight.regular,
  fontSize: vars.typography.fontSize.bodyMedium,
  lineHeight: vars.typography.lineHeight.bodyMedium,
});
