import { cva } from 'class-variance-authority';
export const timelineVariants = cva('flex flex-col');
export const timelineItemVariants = cva('relative flex gap-4 pb-6 last:pb-0');

/** The dot/marker + the vertical connector line beneath it. */
export const timelineMarkerVariants = cva('relative flex flex-col items-center');
export const timelineDotVariants = cva(['z-10 flex items-center justify-center rounded-full shrink-0', 'ring-4 ring-background transition-colors duration-200 motion-reduce:transition-none [&_svg]:size-3'].join(' '), {
  variants: {
    variant: {
      default: 'bg-border',
      primary: 'bg-primary text-primary-foreground',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white',
      destructive: 'bg-destructive text-destructive-foreground',
      outline: 'border-2 border-border bg-background'
    },
    size: {
      sm: 'h-2.5 w-2.5',
      default: 'h-3.5 w-3.5',
      lg: 'h-8 w-8'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});
export const timelineConnectorVariants = cva('w-0.5 flex-1 bg-border mt-1');
export const timelineContentVariants = cva('flex-1 -mt-0.5 pb-1');
export const timelineTitleVariants = cva('text-sm font-medium text-foreground leading-tight');
export const timelineTimeVariants = cva('text-xs text-muted-foreground');
export type TimelineDotVariants = Parameters<typeof timelineDotVariants>[0]