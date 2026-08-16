import { cva } from 'npm:class-variance-authority@0.7.1';

export const breadcrumbListVariants = cva(
  'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
);

export const breadcrumbItemVariants = cva('inline-flex items-center gap-1.5');

export const breadcrumbLinkVariants = cva(
  [
    'rounded-sm transition-colors duration-150 motion-reduce:transition-none',
    'hover:text-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
  ].join(' '),
);

export const breadcrumbPageVariants = cva('font-normal text-foreground');

export const breadcrumbSeparatorVariants = cva(
  'text-muted-foreground/60 [&>svg]:size-3.5',
);

export const breadcrumbEllipsisVariants = cva(
  'flex h-9 w-9 items-center justify-center [&>svg]:size-4',
);
