// @ts-nocheck
import { cva } from 'class-variance-authority';

/**
 * Smooth open/close without JS height measurement, using the grid-rows
 * 0fr → 1fr technique (animates height in every modern browser).
 * Wrap the actual content in an `overflow-hidden` inner element.
 */
export const collapsibleContentVariants = cva('grid transition-all duration-200 ease-out motion-reduce:transition-none', {
  variants: {
    open: {
      true: 'visible grid-rows-[1fr] opacity-100',
      // `invisible` keeps collapsed content out of the tab order and the
      // accessibility tree; visibility flips after the height transition.
      false: 'invisible grid-rows-[0fr] opacity-0'
    }
  },
  defaultVariants: {
    open: false
  }
});
export const collapsibleContentInnerVariants = cva('overflow-hidden');
export type CollapsibleContentVariants = Parameters<typeof collapsibleContentVariants>[0]