import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

const meta: Meta = { title: 'Components/Display' };
export default meta;

/* -------------------------------------------------------------------------- */
/*  Badge                                                                     */
/* -------------------------------------------------------------------------- */

const badgeVariantClasses: Record<string, string> = {
  default: 'border-transparent bg-primary text-primary-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  destructive: 'border-transparent bg-destructive text-destructive-foreground',
  outline: 'text-foreground',
};

function Badge({
  variant = 'default',
  children = 'Badge',
}: {
  variant?: string;
  children?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        badgeVariantClasses[variant] ?? badgeVariantClasses.default,
      )}
    >
      {children}
    </span>
  );
}

export const BadgeStory: StoryObj<typeof Badge> = {
  name: 'Badge',
  render: (args) => <Badge {...args} />,
  args: { variant: 'default', children: 'Badge' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    children: { control: 'text' },
  },
};

/* -------------------------------------------------------------------------- */
/*  Avatar                                                                    */
/* -------------------------------------------------------------------------- */

const avatarSizeClasses: Record<string, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

function Avatar({
  size = 'md',
  fallback = 'AB',
  src,
}: {
  size?: string;
  fallback?: string;
  src?: string;
}) {
  return (
    <span
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        avatarSizeClasses[size] ?? avatarSizeClasses.md,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={fallback}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted font-medium">
          {fallback}
        </span>
      )}
    </span>
  );
}

export const AvatarStory: StoryObj<typeof Avatar> = {
  name: 'Avatar',
  render: (args) => <Avatar {...args} />,
  args: { size: 'md', fallback: 'AB', src: '' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    fallback: { control: 'text' },
    src: { control: 'text' },
  },
};

/* -------------------------------------------------------------------------- */
/*  Separator                                                                 */
/* -------------------------------------------------------------------------- */

function Separator({
  orientation = 'horizontal',
  label,
}: {
  orientation?: string;
  label?: string;
}) {
  if (orientation === 'vertical') {
    return (
      <div className="flex h-8 items-center space-x-4 text-sm">
        <span>Left</span>
        <div className="h-full w-[1px] bg-border" />
        <span>Right</span>
      </div>
    );
  }

  if (label) {
    return (
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {label}
          </span>
        </div>
      </div>
    );
  }

  return <div className="my-4 h-[1px] w-full bg-border" />;
}

export const SeparatorStory: StoryObj<typeof Separator> = {
  name: 'Separator',
  render: (args) => <Separator {...args} />,
  args: { orientation: 'horizontal', label: '' },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    label: { control: 'text' },
  },
};

/* -------------------------------------------------------------------------- */
/*  Skeleton                                                                  */
/* -------------------------------------------------------------------------- */

function Skeleton({
  variant = 'card',
  animated = true,
}: {
  variant?: string;
  animated?: boolean;
}) {
  const pulse = animated ? 'animate-pulse' : '';

  if (variant === 'avatar') {
    return <div className={cn('h-12 w-12 rounded-full bg-muted', pulse)} />;
  }

  if (variant === 'text') {
    return (
      <div className="space-y-2">
        <div className={cn('h-4 w-[250px] rounded bg-muted', pulse)} />
        <div className={cn('h-4 w-[200px] rounded bg-muted', pulse)} />
        <div className={cn('h-4 w-[160px] rounded bg-muted', pulse)} />
      </div>
    );
  }

  if (variant === 'button') {
    return <div className={cn('h-10 w-24 rounded-md bg-muted', pulse)} />;
  }

  // card (default)
  return (
    <div className="flex items-center space-x-4">
      <div className={cn('h-12 w-12 rounded-full bg-muted', pulse)} />
      <div className="space-y-2">
        <div className={cn('h-4 w-[250px] rounded bg-muted', pulse)} />
        <div className={cn('h-4 w-[200px] rounded bg-muted', pulse)} />
      </div>
    </div>
  );
}

export const SkeletonStory: StoryObj<typeof Skeleton> = {
  name: 'Skeleton',
  render: (args) => <Skeleton {...args} />,
  args: { variant: 'card', animated: true },
  argTypes: {
    variant: {
      control: 'select',
      options: ['card', 'text', 'avatar', 'button'],
    },
    animated: { control: 'boolean' },
  },
};

/* -------------------------------------------------------------------------- */
/*  Progress                                                                  */
/* -------------------------------------------------------------------------- */

const progressColorClasses: Record<string, string> = {
  default: 'bg-primary',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  destructive: 'bg-destructive',
};

function Progress({
  value = 60,
  showLabel = false,
  color = 'default',
}: {
  value?: number;
  showLabel?: boolean;
  color?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="max-w-sm space-y-1">
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            progressColorClasses[color] ?? progressColorClasses.default,
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export const ProgressStory: StoryObj<typeof Progress> = {
  name: 'Progress',
  render: (args) => <Progress {...args} />,
  args: { value: 60, showLabel: false, color: 'default' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    showLabel: { control: 'boolean' },
    color: {
      control: 'select',
      options: ['default', 'success', 'warning', 'destructive'],
    },
  },
};

/* -------------------------------------------------------------------------- */
/*  Spinner                                                                   */
/* -------------------------------------------------------------------------- */

const spinnerSizeClasses: Record<string, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

function Spinner({
  size = 'md',
  label,
}: {
  size?: string;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'animate-spin',
          spinnerSizeClasses[size] ?? spinnerSizeClasses.md,
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      {label && (
        <span className="text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  );
}

export const SpinnerStory: StoryObj<typeof Spinner> = {
  name: 'Spinner',
  render: (args) => <Spinner {...args} />,
  args: { size: 'md', label: 'Loading...' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
  },
};

/* -------------------------------------------------------------------------- */
/*  Aspect Ratio                                                              */
/* -------------------------------------------------------------------------- */

const aspectRatioValues: Record<string, number> = {
  '16:9': 16 / 9,
  '4:3': 4 / 3,
  '1:1': 1,
  '21:9': 21 / 9,
};

function AspectRatio({ ratio = '16:9' }: { ratio?: string }) {
  const r = aspectRatioValues[ratio] ?? 16 / 9;
  return (
    <div className="max-w-xs">
      <p className="mb-1 text-xs text-muted-foreground">{ratio}</p>
      <div
        style={{ paddingBottom: `${100 / r}%`, position: 'relative' }}
        className="w-full rounded-md bg-muted"
      >
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          {ratio}
        </div>
      </div>
    </div>
  );
}

export const AspectRatioStory: StoryObj<typeof AspectRatio> = {
  name: 'Aspect Ratio',
  render: (args) => <AspectRatio {...args} />,
  args: { ratio: '16:9' },
  argTypes: {
    ratio: {
      control: 'select',
      options: ['16:9', '4:3', '1:1', '21:9'],
    },
  },
};
