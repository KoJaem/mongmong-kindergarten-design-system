import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const iconWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
});

export const dot = style({
  position: 'absolute',
  top: '-2px',
  right: '-4px',
  width: '5px',
  height: '5px',
  borderRadius: '1px',
  backgroundColor: vars.color.icon.danger,
});

export const label = style({
  fontSize: vars.typography.fontSize.captionMedium,
  lineHeight: vars.typography.lineHeight.captionMedium,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
});

export const item = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    gap: vars.spacing.gap['2xs'],
    minWidth: '46px',
    paddingLeft: vars.spacing.padding.xs,
    paddingRight: vars.spacing.padding.xs,
    paddingTop: vars.spacing.padding['2xs'],
    paddingBottom: vars.spacing.padding['2xs'],
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontFamily: vars.typography.fontFamily,
  },
  variants: {
    selected: {
      true: { color: vars.color.text.primary },
      false: { color: vars.color.text.tertiary },
    },
  },
  defaultVariants: { selected: false },
});
