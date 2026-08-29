import { cva } from 'npm:class-variance-authority@0.7.1';

export const stepperVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-start',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const stepVariants = cva('group flex gap-3', {
  variants: {
    orientation: {
      horizontal: 'flex-1 flex-col items-center text-center last:flex-none',
      vertical: 'flex-row items-start pb-6 last:pb-0',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const stepIndicatorVariants = cva(
  [
    'flex items-center justify-center rounded-full border-2 shrink-0 font-semibold',
    'transition-colors duration-200 motion-reduce:transition-none [&_svg]:size-4',
  ].join(' '),
  {
    variants: {
      state: {
        complete: 'bg-primary border-primary text-primary-foreground',
        current: 'border-primary text-primary ring-4 ring-primary/15',
        upcoming: 'border-border bg-background text-muted-foreground',
        error: 'border-destructive bg-destructive text-destructive-foreground',
      },
      size: {
        sm: 'h-7 w-7 text-xs',
        default: 'h-9 w-9 text-sm',
        lg: 'h-11 w-11 text-base',
      },
    },
    defaultVariants: {
      state: 'upcoming',
      size: 'default',
    },
  },
);

export const stepConnectorVariants = cva('transition-colors duration-200 motion-reduce:transition-none', {
  variants: {
    state: {
      complete: 'bg-primary',
      current: 'bg-border',
      upcoming: 'bg-border',
      error: 'bg-border',
    },
    orientation: {
      horizontal: 'h-0.5 flex-1 mt-4',
      vertical: 'w-0.5 flex-1 ml-4 my-1 min-h-6',
    },
  },
  defaultVariants: {
    state: 'upcoming',
    orientation: 'horizontal',
  },
});

export const stepLabelVariants = cva('text-sm font-medium leading-tight', {
  variants: {
    state: {
      complete: 'text-foreground',
      current: 'text-foreground',
      upcoming: 'text-muted-foreground',
      error: 'text-destructive',
    },
  },
  defaultVariants: {
    state: 'upcoming',
  },
});

export const stepDescriptionVariants = cva('text-xs text-muted-foreground mt-0.5');

export type StepperVariants = Parameters<typeof stepperVariants>[0];
export type StepIndicatorVariants = Parameters<typeof stepIndicatorVariants>[0];
