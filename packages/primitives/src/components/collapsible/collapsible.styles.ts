import { cva } from 'npm:class-variance-authority@0.7.1';

/**
 * Smooth open/close without JS height measurement, using the grid-rows
 * 0fr → 1fr technique (animates height in every modern browser).
 * Wrap the actual content in an `overflow-hidden` inner element.
 */
export const collapsibleContentVariants = cva(
  'grid transition-all duration-200 ease-out motion-reduce:transition-none',
  {
    variants: {
      open: {
        true: 'grid-rows-[1fr] opacity-100',
        false: 'grid-rows-[0fr] opacity-0',
      },
    },
    defaultVariants: {
      open: false,
    },
  },
);

export const collapsibleContentInnerVariants = cva('overflow-hidden');

export type CollapsibleContentVariants = Parameters<typeof collapsibleContentVariants>[0];
