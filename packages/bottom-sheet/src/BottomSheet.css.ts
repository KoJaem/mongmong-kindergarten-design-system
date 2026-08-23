import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { BottomSheetButtonLayout } from './BottomSheet';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: vars.color.background.dim,
});

export const content = style({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  width: '360px',
  maxWidth: '100vw',
  maxHeight: '90vh',
  overflow: 'auto',
  borderTopLeftRadius: vars.radius.bottomSheet,
  borderTopRightRadius: vars.radius.bottomSheet,
  backdropFilter: 'blur(15px)',
  backgroundColor: vars.color.background.upper,
  border: `1px solid ${vars.color.border.brandWeak}`,
  borderBottom: 'none',
  paddingBottom: vars.spacing.padding['2xl'],
});

export const handleArea = style({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: vars.spacing.padding.s,
  paddingBottom: vars.spacing.padding.s,
});

export const handle = style({
  width: '36px',
  height: '4px',
  borderRadius: vars.radius.button.full,
  backgroundColor: vars.color.fill.inverseWeak,
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: vars.spacing.padding.l,
});

export const title = style({
  fontFamily: vars.typography.fontFamily,
  fontWeight: vars.typography.fontWeight.bold,
  fontSize: vars.typography.fontSize.titleMedium,
  lineHeight: vars.typography.lineHeight.titleMedium,
  color: vars.color.text.primary,
  paddingTop: vars.spacing.padding['2xl'],
  paddingLeft: vars.spacing.padding['3xl'],
  paddingRight: vars.spacing.padding['3xl'],
  margin: 0,
});

export const description = style({
  fontFamily: vars.typography.fontFamily,
  fontWeight: vars.typography.fontWeight.regular,
  fontSize: vars.typography.fontSize.bodyMedium,
  lineHeight: vars.typography.lineHeight.bodyMedium,
  color: vars.color.text.secondary,
  paddingTop: vars.spacing.padding.s,
  paddingLeft: vars.spacing.padding['3xl'],
  paddingRight: vars.spacing.padding['3xl'],
  margin: 0,
});

export const slot = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const buttonArea = recipe({
  base: {
    display: 'flex',
    gap: vars.spacing.gap.s,
    paddingTop: vars.spacing.padding.xl,
    paddingLeft: vars.spacing.padding['2xl'],
    paddingRight: vars.spacing.padding['2xl'],
  },
  variants: {
    layout: {
      // grid + 1fr columns instead of flex:row so every button (1 or more) fills equal width without touching children directly
      [BottomSheetButtonLayout.horizontal]: { display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '1fr' },
      // flex:column already stretches children to full width via the default align-items:stretch
      [BottomSheetButtonLayout.vertical]: { flexDirection: 'column' },
    },
  },
  defaultVariants: { layout: BottomSheetButtonLayout.horizontal },
});
