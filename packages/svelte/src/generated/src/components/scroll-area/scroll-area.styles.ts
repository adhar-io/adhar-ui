// @ts-nocheck
import { cva } from 'class-variance-authority';

/**
 * A themed, overflow-scroll container. Uses thin, auto-hiding scrollbars that
 * match the design tokens (works cross-browser via scrollbar-width / -webkit).
 */
export const scrollAreaVariants = cva(['relative overflow-auto', '[scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent]', '[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2', '[&::-webkit-scrollbar-track]:bg-transparent', '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border', 'hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40', 'transition-colors motion-reduce:transition-none'].join(' '), {
  variants: {
    orientation: {
      vertical: 'overflow-x-hidden',
      horizontal: 'overflow-y-hidden',
      both: ''
    }
  },
  defaultVariants: {
    orientation: 'vertical'
  }
});
export type ScrollAreaVariants = Parameters<typeof scrollAreaVariants>[0]