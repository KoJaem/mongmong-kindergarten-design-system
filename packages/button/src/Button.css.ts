import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { ButtonColor, ButtonSize, ButtonVariant } from './Button';

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});
export const iconLayout = style({ gap: vars.spacing.padding.xs });
export const fullWidth = style({
  boxSizing: 'border-box',
  width: `calc(100% - ${vars.spacing.padding['2xl']} * 2)`,
  maxWidth: '100%',
  marginInline: vars.spacing.padding['2xl'],
  alignSelf: 'stretch',
});

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
        opacity: 0.3,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  variants: {
    color: {
      [ButtonColor.brand]: {},
      [ButtonColor.neutral]: {},
      [ButtonColor.inverse]: {},
    },
    variant: {
      [ButtonVariant.fill]: {},
      [ButtonVariant.weak]: {},
    },
    size: {
      [ButtonSize.s]: {
        height: '32px',
        padding: `0 ${vars.spacing.padding.s}`,
        borderRadius: vars.radius.button.s,
        fontSize: vars.typography.fontSize.captionLarge,
      },
      [ButtonSize.m]: {
        height: '40px',
        padding: `0 ${vars.spacing.padding.l}`,
        borderRadius: vars.radius.button.m,
        fontSize: vars.typography.fontSize.bodyMedium,
      },
      [ButtonSize.l]: {
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
  compoundVariants: [
    {
      variants: { color: ButtonColor.brand, variant: ButtonVariant.fill },
      style: {
        backgroundColor: vars.color.fill.brand,
        color: vars.color.text.strong,
        selectors: {
          '&:hover, &:active': {
            backgroundColor: vars.color.fill.brandPressed,
          },
        },
      },
    },
    {
      variants: { color: ButtonColor.brand, variant: ButtonVariant.weak },
      style: {
        backgroundColor: vars.color.fill.brandWeak,
        color: vars.color.text.brand,
        selectors: {
          '&:hover, &:active': {
            backgroundColor: vars.color.fill.brandPressed,
          },
        },
      },
    },
    {
      variants: { color: ButtonColor.neutral, variant: ButtonVariant.fill },
      style: {
        backgroundColor: vars.color.fill.neutral,
        color: vars.color.text.inversePrimary,
        selectors: {
          '&:hover, &:active': { backgroundColor: vars.color.fill.pressed },
        },
      },
    },
    {
      variants: { color: ButtonColor.neutral, variant: ButtonVariant.weak },
      style: {
        backgroundColor: vars.color.fill.neutralWeak,
        color: vars.color.text.primary,
        selectors: {
          '&:hover, &:active': { backgroundColor: vars.color.fill.pressed },
        },
      },
    },
    {
      variants: { color: ButtonColor.inverse, variant: ButtonVariant.fill },
      style: {
        backgroundColor: vars.color.fill.inverse,
        color: vars.color.text.primary,
        selectors: {
          '&:hover, &:active': {
            backgroundColor: vars.color.fill.inversePressed,
          },
        },
      },
    },
    {
      variants: { color: ButtonColor.inverse, variant: ButtonVariant.weak },
      style: {
        backgroundColor: vars.color.fill.inverseWeak,
        color: vars.color.text.primary,
        selectors: {
          '&:hover, &:active': {
            backgroundColor: vars.color.fill.inversePressed,
          },
        },
      },
    },
  ],
  defaultVariants: {
    color: ButtonColor.brand,
    variant: ButtonVariant.fill,
    size: ButtonSize.l,
  },
});
