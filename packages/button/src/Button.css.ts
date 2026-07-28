import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { ButtonSize, ButtonVariant } from './Button';

export const iconWrapper = style({ display: 'flex', alignItems: 'center', flexShrink: 0 });
export const iconLayout = style({ gap: vars.spacing.padding.xs });

export const button = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: vars.typography.fontFamily,
    fontWeight: vars.typography.fontWeight.bold,
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.15s ease-in-out',
    selectors: {
      '&:disabled, &[aria-disabled="true"]': {
        backgroundColor: vars.color.fill.neutralWeak,
        color: vars.color.text.tertiary,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  variants: {
    variant: {
      [ButtonVariant.fill]: {
        backgroundColor: vars.color.fill.brand,
        color: vars.color.text.inversePrimary,
      },
      [ButtonVariant.outline]: {
        backgroundColor: 'transparent',
        border: `1px solid ${vars.color.fill.brand}`,
        color: vars.color.fill.brand,
      },
      [ButtonVariant.ghost]: {
        backgroundColor: 'transparent',
        border: 'none',
        color: vars.color.fill.brand,
      },
    },
    size: {
      [ButtonSize.sm]: {
        height: '32px',
        padding: `0 ${vars.spacing.padding.s}`,
        borderRadius: vars.radius.button.s,
        fontSize: vars.typography.fontSize.captionLarge,
      },
      [ButtonSize.md]: {
        height: '40px',
        padding: `0 ${vars.spacing.padding.l}`,
        borderRadius: vars.radius.button.m,
        fontSize: vars.typography.fontSize.bodyMedium,
      },
      [ButtonSize.lg]: {
        height: '48px',
        padding: `0 ${vars.spacing.padding.xl}`,
        borderRadius: vars.radius.button.l,
        fontSize: vars.typography.fontSize.bodyLarge,
      },
      [ButtonSize.xl]: {
        height: '56px',
        padding: `0 ${vars.spacing.padding.xl}`,
        borderRadius: vars.radius.button.xl,
        fontSize: vars.typography.fontSize.subtitleLarge,
      },
    },
  },
  defaultVariants: { variant: ButtonVariant.fill, size: ButtonSize.lg },
});
