import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { ToastLayout } from './Toast';

export const icon = style({ display: 'flex', alignItems: 'center', flexShrink: 0, width: 24, height: 24 });

export const action = recipe({
  base: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 31,
    padding: `2px ${vars.spacing.padding.l}`,
    borderRadius: vars.radius.button.m,
    backgroundColor: vars.color.fill.glass,
    fontFamily: vars.typography.fontFamily,
    fontWeight: vars.typography.fontWeight.bold,
    fontSize: vars.typography.fontSize.subtitleSmall,
    lineHeight: vars.typography.lineHeight.subtitleSmall,
    letterSpacing: vars.typography.letterSpacing.subtitleSmall,
    color: vars.color.text.inversePrimary,
    whiteSpace: 'nowrap',
    // ponytail: message<->action gap is 20px in Figma, but the container gap (12px)
    // used for icon<->message already fills part of it when both are present.
    // marginLeft compensates instead of a second wrapper element.
    marginLeft: vars.spacing.gap['2xl'],
  },
  variants: {
    withIcon: {
      true: { marginLeft: `calc(${vars.spacing.gap['2xl']} - ${vars.spacing.gap.xl})` },
      false: {},
    },
  },
  defaultVariants: { withIcon: false },
});

export const toast = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: vars.radius.toast.default,
    backgroundColor: vars.color.fill.glassWeak,
    backdropFilter: 'blur(15px)',
    padding: `${vars.spacing.padding.s} ${vars.spacing.padding['2xl']}`,
    fontFamily: vars.typography.fontFamily,
    fontWeight: vars.typography.fontWeight.bold,
    fontSize: vars.typography.fontSize.subtitleMedium,
    lineHeight: vars.typography.lineHeight.subtitleMedium,
    letterSpacing: vars.typography.letterSpacing.subtitleMedium,
    color: vars.color.text.inversePrimary,
  },
  variants: {
    layout: {
      [ToastLayout.fit]: {},
      [ToastLayout.fixed]: { width: 360 },
    },
    hasIcon: {
      true: { gap: vars.spacing.gap.xl },
      false: {},
    },
    hasAction: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { hasIcon: false, hasAction: true },
      style: { paddingLeft: vars.spacing.padding['2xl'], paddingRight: vars.spacing.padding.xl },
    },
    {
      variants: { hasIcon: true, hasAction: false },
      style: { paddingLeft: vars.spacing.padding.xl, paddingRight: vars.spacing.padding['3xl'] },
    },
    {
      variants: { hasIcon: true, hasAction: true },
      style: { paddingLeft: vars.spacing.padding.xl, paddingRight: vars.spacing.padding.xl },
    },
  ],
  defaultVariants: { layout: ToastLayout.fit, hasIcon: false, hasAction: false },
});
