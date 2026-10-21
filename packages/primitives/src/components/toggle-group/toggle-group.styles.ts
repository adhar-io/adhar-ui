import { cva } from 'class-variance-authority';

export const toggleGroupVariants = cva('flex items-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    /** Segmented-control look: items join with shared borders and no gaps */
    attached: {
      true:
        'gap-0 [&>*]:rounded-none [&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md [&>*:not(:first-child)]:-ml-px',
      false: 'gap-1',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    attached: false,
  },
});

export type ToggleGroupVariants = Parameters<typeof toggleGroupVariants>[0];
