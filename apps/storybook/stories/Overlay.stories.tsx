import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

const meta: Meta = { title: 'Components/Overlay' };
export default meta;

// ---------------------------------------------------------------------------
// Dialog
// ---------------------------------------------------------------------------

interface DialogArgs {
  title: string;
  description: string;
  showFooter: boolean;
  open: boolean;
}

const DialogComponent = (args: DialogArgs) => {
  const [o, so] = useState(false);
  return (
    <div>
      <button
        onClick={() => so(true)}
        className="h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground"
      >
        Open Dialog
      </button>
      {o && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/80" onClick={() => so(false)} />
          <div className="relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg">
            <h2 className="text-lg font-semibold">{args.title}</h2>
            {args.description && (
              <p className="mt-1 text-sm text-muted-foreground">{args.description}</p>
            )}
            <div className="mt-4 space-y-3">
              <label className="text-sm font-medium">Name</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                defaultValue="John Doe"
              />
            </div>
            {args.showFooter && (
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="h-10 rounded-md border px-4 text-sm hover:bg-accent"
                  onClick={() => so(false)}
                >
                  Cancel
                </button>
                <button
                  className="h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground"
                  onClick={() => so(false)}
                >
                  Save
                </button>
              </div>
            )}
            <button
              className="absolute right-4 top-4 opacity-70 hover:opacity-100"
              onClick={() => so(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const DialogStory: StoryObj<DialogArgs> = {
  name: 'Dialog',
  args: {
    title: 'Edit Profile',
    description: 'Make changes to your profile here.',
    showFooter: true,
    open: false,
  },
  argTypes: {
    title: { control: 'text', description: 'Dialog title' },
    description: { control: 'text', description: 'Dialog description text' },
    showFooter: { control: 'boolean', description: 'Show the footer with Cancel/Save buttons' },
    open: { control: 'boolean', description: 'Initial open state (use the button to open/close)' },
  },
  render: (args) => <DialogComponent {...args} />,
};

// ---------------------------------------------------------------------------
// Sheet
// ---------------------------------------------------------------------------

interface SheetArgs {
  side: 'left' | 'right' | 'top' | 'bottom';
  title: string;
}

const sheetPositionClasses: Record<string, string> = {
  right: 'inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l',
  left: 'inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r',
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t',
};

const SheetComponent = (args: SheetArgs) => {
  const [o, so] = useState(false);
  return (
    <div>
      <button
        onClick={() => so(true)}
        className="h-10 rounded-md border px-4 text-sm hover:bg-accent"
      >
        Open Sheet
      </button>
      {o && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/80" onClick={() => so(false)} />
          <div
            className={cn(
              'fixed z-50 bg-background p-6 shadow-lg',
              sheetPositionClasses[args.side],
            )}
          >
            <h2 className="text-lg font-semibold">{args.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Slides in from the {args.side}.
            </p>
            <button
              className="mt-4 h-9 rounded-md border px-3 text-sm hover:bg-accent"
              onClick={() => so(false)}
            >
              Close
            </button>
            <button
              className="absolute right-4 top-4 opacity-70 hover:opacity-100"
              onClick={() => so(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const SheetStory: StoryObj<SheetArgs> = {
  name: 'Sheet',
  args: {
    side: 'right',
    title: 'Sheet Title',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Side from which the sheet slides in',
    },
    title: { control: 'text', description: 'Sheet title' },
  },
  render: (args) => <SheetComponent {...args} />,
};

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

interface TooltipArgs {
  content: string;
  position: 'top' | 'right' | 'bottom' | 'left';
}

const tooltipPositionClasses: Record<string, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
};

const TooltipComponent = (args: TooltipArgs) => (
  <div className="flex justify-center py-12">
    <div className="group relative inline-flex">
      <button className="h-9 rounded-md border px-3 text-sm hover:bg-accent">
        Hover me
      </button>
      <div
        className={cn(
          'absolute z-50 hidden rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md group-hover:block whitespace-nowrap',
          tooltipPositionClasses[args.position],
        )}
      >
        {args.content}
      </div>
    </div>
  </div>
);

export const TooltipStory: StoryObj<TooltipArgs> = {
  name: 'Tooltip',
  args: {
    content: 'Tooltip text',
    position: 'top',
  },
  argTypes: {
    content: { control: 'text', description: 'Text displayed inside the tooltip' },
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the tooltip relative to the trigger',
    },
  },
  render: (args) => <TooltipComponent {...args} />,
};

// ---------------------------------------------------------------------------
// Popover
// ---------------------------------------------------------------------------

interface PopoverArgs {
  title: string;
  showArrow: boolean;
}

const PopoverComponent = (args: PopoverArgs) => {
  const [o, so] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onClick={() => so(!o)}
        className="h-10 rounded-md border px-4 text-sm hover:bg-accent"
      >
        Popover
      </button>
      {o && (
        <div className="absolute left-0 z-50 mt-2 w-72 rounded-md border bg-popover p-4 shadow-md">
          {args.showArrow && (
            <div className="absolute -top-2 left-6 h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-popover" />
          )}
          <h4 className="text-sm font-medium mb-2">{args.title}</h4>
          <div className="grid grid-cols-3 items-center gap-2">
            <label className="text-sm">Width</label>
            <input
              className="col-span-2 h-8 rounded border px-2 text-sm"
              defaultValue="100%"
            />
          </div>
          <button
            onClick={() => so(false)}
            className="mt-3 h-8 rounded-md bg-primary px-3 text-sm text-primary-foreground"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export const PopoverStory: StoryObj<PopoverArgs> = {
  name: 'Popover',
  args: {
    title: 'Settings',
    showArrow: true,
  },
  argTypes: {
    title: { control: 'text', description: 'Popover heading text' },
    showArrow: { control: 'boolean', description: 'Show a directional arrow on the popover' },
  },
  render: (args) => <PopoverComponent {...args} />,
};

// ---------------------------------------------------------------------------
// Hover Card
// ---------------------------------------------------------------------------

interface HoverCardArgs {
  triggerText: string;
  width: 'sm' | 'md' | 'lg';
}

const hoverCardWidthClasses: Record<string, string> = {
  sm: 'w-48',
  md: 'w-64',
  lg: 'w-80',
};

const HoverCardComponent = (args: HoverCardArgs) => (
  <div className="py-8">
    <div className="group relative inline-block">
      <a href="#" className="text-sm font-medium text-primary underline underline-offset-4">
        {args.triggerText}
      </a>
      <div
        className={cn(
          'absolute z-50 mt-2 rounded-md border bg-popover p-4 shadow-md hidden group-hover:block',
          hoverCardWidthClasses[args.width],
        )}
      >
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
            A
          </span>
          <div>
            <h4 className="text-sm font-semibold">Adhar UI</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Framework-agnostic design system.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const HoverCardStory: StoryObj<HoverCardArgs> = {
  name: 'Hover Card',
  args: {
    triggerText: 'Hover me',
    width: 'md',
  },
  argTypes: {
    triggerText: { control: 'text', description: 'Text of the hover trigger link' },
    width: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Width of the hover card',
    },
  },
  render: (args) => <HoverCardComponent {...args} />,
};

// ---------------------------------------------------------------------------
// Drawer
// ---------------------------------------------------------------------------

interface DrawerArgs {
  title: string;
  description: string;
}

const DrawerComponent = (args: DrawerArgs) => {
  const [o, so] = useState(false);
  return (
    <div>
      <button
        onClick={() => so(true)}
        className="h-10 rounded-md border px-4 text-sm hover:bg-accent"
      >
        Open Drawer
      </button>
      {o && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/80" onClick={() => so(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-xl border bg-background">
            <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
            <div className="p-6">
              <h2 className="text-lg font-semibold">{args.title}</h2>
              {args.description && (
                <p className="mt-2 text-sm text-muted-foreground">{args.description}</p>
              )}
              <button
                onClick={() => so(false)}
                className="mt-4 h-10 w-full rounded-md border text-sm hover:bg-accent"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const DrawerStory: StoryObj<DrawerArgs> = {
  name: 'Drawer',
  args: {
    title: 'Drawer Title',
    description: 'Mobile-friendly bottom drawer.',
  },
  argTypes: {
    title: { control: 'text', description: 'Drawer title' },
    description: { control: 'text', description: 'Drawer description text' },
  },
  render: (args) => <DrawerComponent {...args} />,
};
