import { cva } from 'class-variance-authority';

export const toggleVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium',
    'cursor-pointer select-none whitespace-nowrap',
    'transition-colors duration-150 motion-reduce:transition-none',
    'hover:bg-muted hover:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-[pressed=true]:bg-accent aria-[pressed=true]:text-accent-foreground',
    'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 min-w-8 px-2',
        default: 'h-9 min-w-9 px-2.5',
        lg: 'h-10 min-w-10 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ToggleVariants = Parameters<typeof toggleVariants>[0];
