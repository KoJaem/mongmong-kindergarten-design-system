import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.gap.xs,
  fontFamily: vars.typography.fontFamily,
});

export const label = style({
  fontSize: vars.typography.fontSize.captionLarge,
  color: vars.color.text.secondary,
});

export const field = recipe({
  base: {
    height: '48px',
    padding: `0 ${vars.spacing.padding.l}`,
    borderRadius: vars.radius.textField,
    border: `1px solid ${vars.color.border.default}`,
    backgroundColor: vars.color.background.default,
    color: vars.color.text.primary,
    fontFamily: vars.typography.fontFamily,
    fontSize: vars.typography.fontSize.bodyLarge,
    outline: 'none',
    transition: 'border-color 0.15s ease-in-out',
    selectors: {
      '&::placeholder': { color: vars.color.text.quaternary },
      '&:focus': { borderColor: vars.color.fill.brand },
      '&:disabled': {
        backgroundColor: vars.color.fill.neutralWeak,
        color: vars.color.text.tertiary,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    error: {
      true: {
        borderColor: vars.color.fill.danger,
        selectors: { '&:focus': { borderColor: vars.color.fill.danger } },
      },
      false: {},
    },
  },
  defaultVariants: { error: false },
});

export const helperText = recipe({
  base: {
    fontSize: vars.typography.fontSize.captionMedium,
  },
  variants: {
    error: {
      true: { color: vars.color.text.danger },
      false: { color: vars.color.text.tertiary },
    },
  },
  defaultVariants: { error: false },
});
