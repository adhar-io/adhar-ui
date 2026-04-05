import { cva } from 'npm:class-variance-authority@0.7.1';

export const separatorVariants = cva('shrink-0 bg-border', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export type SeparatorVariants = Parameters<typeof separatorVariants>[0];
