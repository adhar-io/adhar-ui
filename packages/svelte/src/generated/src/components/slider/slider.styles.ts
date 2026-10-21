// @ts-nocheck
import { cva } from 'class-variance-authority';

/**
 * Styles a native `<input type="range">` so it gets full pointer-drag,
 * touch, and keyboard support for free while matching the design system.
 *
 * Uses the modern `accent-color` (Tailwind `accent-primary`) approach, which
 * renders a themed, filled track + thumb natively and consistently across
 * Chromium, Firefox, and Safari — and identically across every framework
 * target, since it is pure CSS with no per-engine pseudo-element hacks.
 */
export const sliderVariants = cva(['w-full cursor-pointer accent-primary align-middle rounded-lg', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background', 'disabled:cursor-not-allowed disabled:opacity-50', 'motion-reduce:transition-none'].join(' '), {
  variants: {
    size: {
      sm: 'h-4',
      default: 'h-5',
      lg: 'h-6'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});
export type SliderVariants = Parameters<typeof sliderVariants>[0]