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
    border: `1px solid ${vars.color.border.brandWeak}`,
    backgroundColor: '#F4F4F9',
    backgroundImage: 'linear-gradient(rgba(41, 5, 255, 0.1), rgba(41, 5, 255, 0.1))',
    color: vars.color.text.primary,
    fontFamily: vars.typography.fontFamily,
    fontSize: vars.typography.fontSize.bodyLarge,
    outline: 'none',
    transition: 'background-color 0.15s ease-in-out',
    selectors: {
      '&::placeholder': { color: vars.color.text.quaternary },
      '&:disabled': {
        backgroundColor: vars.color.fill.inverseWeak,
        backgroundImage: 'none',
        borderColor: vars.color.border.opacityWeak,
        color: vars.color.text.quaternary,
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

// Figma "Text Field / Box" Field Type=Text Area
export const areaField = recipe({
  base: {
    minHeight: '54px',
    padding: vars.spacing.padding.xl,
    borderRadius: vars.radius.textField,
    border: `1px solid ${vars.color.border.brandWeak}`,
    backgroundColor: vars.color.background.upper,
    color: vars.color.text.inversePrimary,
    fontFamily: vars.typography.fontFamily,
    fontSize: vars.typography.fontSize.bodyMedium,
    lineHeight: vars.typography.lineHeight.bodyMedium,
    outline: 'none',
    resize: 'none',
    selectors: {
      '&::placeholder': { color: vars.color.text.inverseTertiary },
      '&:disabled': {
        backgroundColor: vars.color.fill.inverseWeak,
        borderColor: vars.color.border.opacityWeak,
        color: vars.color.text.quaternary,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    error: {
      true: { borderColor: vars.color.fill.danger },
      false: {},
    },
  },
  defaultVariants: { error: false },
});
