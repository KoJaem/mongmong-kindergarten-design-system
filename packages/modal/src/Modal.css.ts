import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { ModalButtonLayout } from './Modal';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: vars.color.background.dim,
});

export const content = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  width: 296,
  maxWidth: 296,
  maxHeight: 640,
  overflow: 'clip',
  borderRadius: vars.radius.modal,
  backgroundColor: vars.color.background.upper,
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.gap.m,
  paddingTop: vars.spacing.padding['2xl'],
  paddingLeft: 22,
  paddingRight: 22,
});

export const title = style({
  fontFamily: vars.typography.fontFamily,
  fontWeight: vars.typography.fontWeight.bold,
  fontSize: vars.typography.fontSize.subtitleLarge,
  lineHeight: vars.typography.lineHeight.subtitleLarge,
  letterSpacing: vars.typography.letterSpacing.subtitleLarge,
  color: vars.color.text.primary,
  margin: 0,
});

export const description = style({
  fontFamily: vars.typography.fontFamily,
  fontWeight: vars.typography.fontWeight.regular,
  fontSize: vars.typography.fontSize.bodyMedium,
  lineHeight: vars.typography.lineHeight.bodyMedium,
  letterSpacing: vars.typography.letterSpacing.bodyMedium,
  color: vars.color.text.secondary,
  margin: 0,
});

export const buttonArea = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    gap: vars.spacing.gap.m,
    paddingTop: vars.spacing.padding['2xl'],
    paddingBottom: vars.spacing.padding.xl,
    paddingLeft: vars.spacing.padding.xl,
    paddingRight: vars.spacing.padding.xl,
  },
  variants: {
    layout: {
      // grid + 1fr columns instead of flex:row so every button (1 or more) fills equal width without touching children directly
      [ModalButtonLayout.horizontal]: { display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '1fr' },
      // flex:column already stretches children to full width via the default align-items:stretch
      [ModalButtonLayout.vertical]: { flexDirection: 'column' },
    },
  },
  defaultVariants: { layout: ModalButtonLayout.horizontal },
});
