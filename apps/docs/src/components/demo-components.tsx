import React, { useState } from 'react';

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// ─── Button ───────────────────────────────────────────────────────────────────
const buttonVariantStyles: Record<string, string> = {
  default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80 active:scale-[0.98]',
  destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/80',
  outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
  secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:bg-secondary/70',
  ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
  link: 'text-primary underline-offset-4 hover:underline',
};

const buttonSizeStyles: Record<string, string> = {
  xs: 'h-7 rounded px-2 text-xs gap-1',
  sm: 'h-9 rounded-md px-3 text-xs',
  default: 'h-10 px-4 py-2',
  lg: 'h-11 rounded-md px-8 text-base',
  xl: 'h-12 rounded-lg px-10 text-base',
  icon: 'h-10 w-10 p-0',
};

function SingleButton({
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  className = '',
  children,
  onClick,
}: {
  variant?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium select-none',
        'ring-offset-background transition-all duration-150 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
        buttonVariantStyles[variant] || buttonVariantStyles.default,
        buttonSizeStyles[size] || buttonSizeStyles.default,
        className,
      )}
    >
      {loading && (
        <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
          <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
        </svg>
      )}
      {children}
    </button>
  );
}

// SVG icons used across demos
const Icons = {
  plus: <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M12 5v14m-7-7h14' /></svg>,
  upload: <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' /></svg>,
  mail: <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /></svg>,
  heart: <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' /></svg>,
  download: <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' /></svg>,
  trash: <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' /></svg>,
  settings: <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' /><path strokeLinecap='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' /></svg>,
  chevronRight: <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M9 5l7 7-7 7' /></svg>,
  star: <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' /></svg>,
};

export function DemoButton({
  variant,
  size,
  disabled,
  loading,
  className,
  children,
  onClick,
}: {
  variant?: string;
  size?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  if (children) {
    return <SingleButton variant={variant} size={size} disabled={disabled} loading={loading} className={className} onClick={onClick}>{children}</SingleButton>;
  }
  return (
    <div className='w-full max-w-md space-y-5'>
      {/* Variants */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Variants</h4>
        <div className='flex flex-wrap items-center gap-1.5'>
          <SingleButton variant='default'>Primary</SingleButton>
          <SingleButton variant='secondary'>Secondary</SingleButton>
          <SingleButton variant='outline'>Outline</SingleButton>
          <SingleButton variant='destructive'>Destructive</SingleButton>
          <SingleButton variant='ghost'>Ghost</SingleButton>
          <SingleButton variant='link'>Link</SingleButton>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Sizes</h4>
        <div className='flex flex-wrap items-center gap-1.5'>
          <SingleButton size='xs'>Extra Small</SingleButton>
          <SingleButton size='sm'>Small</SingleButton>
          <SingleButton>Default</SingleButton>
          <SingleButton size='lg'>Large</SingleButton>
          <SingleButton size='xl'>Extra Large</SingleButton>
        </div>
      </div>

      {/* With Icons */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>With Icons</h4>
        <div className='flex flex-wrap items-center gap-1.5'>
          <SingleButton>{Icons.mail} Login with Email</SingleButton>
          <SingleButton variant='outline'>{Icons.download} Download</SingleButton>
          <SingleButton variant='secondary'>Next {Icons.chevronRight}</SingleButton>
          <SingleButton variant='destructive' size='sm'>{Icons.trash} Delete</SingleButton>
        </div>
      </div>

      {/* Icon Only */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Icon Only</h4>
        <div className='flex flex-wrap items-center gap-1.5'>
          <SingleButton size='icon' variant='default'>{Icons.plus}</SingleButton>
          <SingleButton size='icon' variant='outline'>{Icons.heart}</SingleButton>
          <SingleButton size='icon' variant='secondary'>{Icons.settings}</SingleButton>
          <SingleButton size='icon' variant='ghost'>{Icons.star}</SingleButton>
          <SingleButton size='icon' variant='destructive'>{Icons.trash}</SingleButton>
        </div>
      </div>

      {/* States */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>States</h4>
        <div className='flex flex-wrap items-center gap-1.5'>
          <SingleButton disabled>Disabled</SingleButton>
          <SingleButton loading>Loading</SingleButton>
          <SingleButton loading variant='outline'>Saving</SingleButton>
          <SingleButton disabled variant='secondary'>Unavailable</SingleButton>
        </div>
      </div>

      {/* Button Group */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Button Group</h4>
        <div className='inline-flex rounded-md shadow-sm'>
          <SingleButton variant='outline' className='rounded-r-none border-r-0'>Left</SingleButton>
          <SingleButton variant='outline' className='rounded-none border-r-0'>Center</SingleButton>
          <SingleButton variant='outline' className='rounded-l-none'>Right</SingleButton>
        </div>
      </div>

      {/* Full Width & Compositions */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Full Width & Compositions</h4>
        <div className='space-y-2 max-w-xs'>
          <SingleButton className='w-full'>{Icons.mail} Continue with Email</SingleButton>
          <SingleButton variant='outline' className='w-full'>
            <svg className='w-4 h-4' viewBox='0 0 24 24'><path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z' fill='#4285F4'/><path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' fill='#34A853'/><path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' fill='#FBBC05'/><path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' fill='#EA4335'/></svg>
            Continue with Google
          </SingleButton>
          <div className='flex gap-2'>
            <SingleButton variant='outline' className='flex-1'>Cancel</SingleButton>
            <SingleButton className='flex-1'>Confirm</SingleButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
export function DemoInput({
  type = 'text',
  placeholder = 'Type something...',
  disabled = false,
  className = '',
  value,
  onChange,
}: {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (value !== undefined || onChange) {
    return (
      <input type={type} placeholder={placeholder} disabled={disabled} value={value} onChange={onChange}
        className={cn('flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)} />
    );
  }
  return (
    <div className='space-y-2 w-full max-w-xs'>
      <div>
        <label className='text-xs font-medium mb-1 block'>Default</label>
        <input type='text' placeholder='Enter your name...' className='flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2' />
      </div>
      <div>
        <label className='text-xs font-medium mb-1 block'>With icon</label>
        <div className='relative'>
          <svg className='absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /></svg>
          <input type='email' placeholder='you@example.com' className='flex h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2' />
        </div>
      </div>
      <div>
        <label className='text-xs font-medium mb-1 block text-destructive'>Error state</label>
        <input type='text' defaultValue='invalid@' aria-invalid='true' className='flex h-9 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2' />
        <p className='text-[11px] text-destructive mt-1'>Please enter a valid email</p>
      </div>
      <div>
        <label className='text-xs font-medium mb-1 block text-muted-foreground'>Disabled</label>
        <input type='text' disabled placeholder='Cannot edit...' className='flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50' />
      </div>
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
export function DemoTextarea({
  placeholder,
  disabled,
  className = '',
}: {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [charCount, setCharCount] = useState(0);
  const baseClass = 'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y';

  // Controlled from storybook
  if (placeholder || disabled) {
    return <textarea placeholder={placeholder || 'Write your message...'} disabled={disabled} className={cn(baseClass, 'max-w-xs', className)} />;
  }

  return (
    <div className='w-full max-w-sm space-y-4'>
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Default</h4>
        <textarea placeholder='Write your message...' className={cn(baseClass)} />
      </div>
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>With Character Count</h4>
        <div className='relative'>
          <textarea placeholder='Describe the issue...' maxLength={200} onChange={(e) => setCharCount(e.target.value.length)} className={cn(baseClass)} />
          <span className='absolute bottom-2 right-2 text-[10px] text-muted-foreground'>{charCount}/200</span>
        </div>
      </div>
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>With Label & Error</h4>
        <label className='text-xs font-medium text-destructive block mb-1'>Feedback</label>
        <textarea defaultValue='Too short' aria-invalid='true' className={cn(baseClass, 'border-destructive focus-visible:ring-destructive')} />
        <p className='text-[11px] text-destructive mt-1'>Minimum 20 characters required</p>
      </div>
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Disabled</h4>
        <textarea disabled placeholder='Cannot edit...' className={cn(baseClass)} />
      </div>
    </div>
  );
}

// ─── Label ────────────────────────────────────────────────────────────────────
export function DemoLabel({
  htmlFor,
  children = 'Email address',
  className = '',
}: {
  htmlFor?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className='space-y-2 max-w-xs'>
      <label
        htmlFor={htmlFor || 'demo-label'}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className,
        )}
      >
        {children}
      </label>
      <input
        id={htmlFor || 'demo-label'}
        type='email'
        placeholder='you@example.com'
        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      />
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
const badgeVariantStyles: Record<string, string> = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
  outline: 'border border-border text-foreground',
};

function SingleBadge({
  variant = 'default',
  className = '',
  children,
}: {
  variant?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        badgeVariantStyles[variant] || badgeVariantStyles.default,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DemoBadge({
  variant,
  className,
  children,
}: {
  variant?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  if (children) {
    return <SingleBadge variant={variant} className={className}>{children}</SingleBadge>;
  }
  return (
    <div className='space-y-2 w-full max-w-xs'>
      <div className='flex flex-wrap items-center gap-1.5'>
        <SingleBadge variant='default'>Default</SingleBadge>
        <SingleBadge variant='secondary'>Secondary</SingleBadge>
        <SingleBadge variant='outline'>Outline</SingleBadge>
        <SingleBadge variant='destructive'>Error</SingleBadge>
      </div>
      <div className='flex flex-wrap items-center gap-1.5'>
        <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'>Success</span>
        <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20'>Warning</span>
        <span className='inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/20'>Info</span>
      </div>
      <div className='flex flex-wrap items-center gap-1.5'>
        <span className='inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground'><span className='w-1.5 h-1.5 rounded-full bg-primary-foreground/60' />Active</span>
        <span className='inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground'><span className='w-1.5 h-1.5 rounded-full bg-muted-foreground/40' />Inactive</span>
      </div>
    </div>
  );
}

// ─── Switch ───────────────────────────────────────────────────────────────────
function SwitchControl({ checked: c, onChange: oc, disabled = false }: { checked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  const [i, setI] = useState(false);
  const v = c !== undefined ? c : i;
  return (
    <button role='switch' aria-checked={v} disabled={disabled} onClick={() => { setI(!v); oc?.(!v); }}
      className={cn('peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', v ? 'bg-primary' : 'bg-input')}>
      <span className={cn('pointer-events-none block h-4 w-4 rounded-full bg-background shadow-sm ring-0 transition-transform', v ? 'translate-x-4' : 'translate-x-0')} />
    </button>
  );
}

export function DemoSwitch({ checked, onChange, disabled }: { checked?: boolean; onChange?: (val: boolean) => void; disabled?: boolean }) {
  if (checked !== undefined || onChange) {
    return <SwitchControl checked={checked} onChange={onChange} disabled={disabled} />;
  }
  return (
    <div className='space-y-3 w-full max-w-xs'>
      {[
        { label: 'Airplane Mode', desc: 'Disable all wireless', default: false },
        { label: 'Dark Mode', desc: 'Use dark theme', default: true },
        { label: 'Notifications', desc: 'Push notifications', default: true },
      ].map((item) => (
        <label key={item.label} className='flex items-center justify-between gap-3 cursor-pointer'>
          <div><p className='text-sm font-medium'>{item.label}</p><p className='text-[11px] text-muted-foreground'>{item.desc}</p></div>
          <SwitchControl checked={undefined} />
        </label>
      ))}
    </div>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
function CheckboxControl({ checked: c, onChange: oc, disabled = false }: { checked?: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  const [i, setI] = useState(false);
  const v = c !== undefined ? c : i;
  return (
    <button role='checkbox' aria-checked={v} disabled={disabled} onClick={() => { setI(!v); oc?.(!v); }}
      className={cn('h-4 w-4 shrink-0 rounded-[3px] border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-colors', v ? 'bg-primary text-primary-foreground' : 'bg-background')}>
      {v && <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}><path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' /></svg>}
    </button>
  );
}

export function DemoCheckbox({ checked, onChange, disabled, label }: { checked?: boolean; onChange?: (val: boolean) => void; disabled?: boolean; label?: string }) {
  if (label || checked !== undefined || onChange) {
    return (
      <label className='flex items-center gap-2 cursor-pointer'>
        <CheckboxControl checked={checked} onChange={onChange} disabled={disabled} />
        {label && <span className='text-sm'>{label}</span>}
      </label>
    );
  }
  return (
    <div className='space-y-2.5 w-full max-w-xs'>
      {['Accept terms and conditions', 'Send me marketing emails', 'Enable two-factor authentication'].map((text, idx) => (
        <label key={text} className='flex items-start gap-2.5 cursor-pointer'>
          <CheckboxControl checked={idx === 2 ? undefined : undefined} />
          <span className='text-sm leading-tight'>{text}</span>
        </label>
      ))}
      <label className='flex items-start gap-2.5 cursor-pointer opacity-50'>
        <CheckboxControl disabled />
        <span className='text-sm leading-tight text-muted-foreground'>Disabled option</span>
      </label>
    </div>
  );
}

// ─── Progress ─────────────────────────────────────────────────────────────────
export function DemoProgress(
  { value, className = '' }: { value?: number; className?: string },
) {
  if (value !== undefined) {
    return (
      <div className={cn('relative h-2 w-full max-w-xs overflow-hidden rounded-full bg-secondary', className)}>
        <div className='h-full bg-primary rounded-full transition-all duration-500' style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    );
  }
  return (
    <div className='space-y-3 w-full max-w-xs'>
      {[{ label: 'Upload', value: 75, color: 'bg-primary' }, { label: 'Processing', value: 45, color: 'bg-amber-500' }, { label: 'Complete', value: 100, color: 'bg-emerald-500' }].map((p) => (
        <div key={p.label}>
          <div className='flex items-center justify-between mb-1'>
            <span className='text-xs font-medium'>{p.label}</span>
            <span className='text-[11px] text-muted-foreground'>{p.value}%</span>
          </div>
          <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
            <div className={cn('h-full rounded-full transition-all duration-500', p.color)} style={{ width: `${p.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export function DemoSkeleton({ className }: { className?: string }) {
  if (className) {
    return <div className={cn('animate-pulse rounded-md bg-muted', className)} />;
  }

  const Bone = ({ className: c = '' }: { className?: string }) => (
    <div className={cn('animate-pulse rounded-md bg-muted', c)} />
  );

  return (
    <div className='w-full max-w-md space-y-6'>
      {/* Profile / User */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Profile</h4>
        <div className='flex items-center gap-3'>
          <Bone className='h-11 w-11 rounded-full shrink-0' />
          <div className='space-y-2 flex-1'>
            <Bone className='h-4 w-32' />
            <Bone className='h-3 w-48' />
          </div>
        </div>
      </div>

      {/* Card */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Card</h4>
        <div className='rounded-xl border border-border bg-card overflow-hidden'>
          <Bone className='h-32 w-full rounded-none' />
          <div className='p-4 space-y-3'>
            <Bone className='h-5 w-2/3' />
            <Bone className='h-3 w-full' />
            <Bone className='h-3 w-4/5' />
            <div className='flex gap-2 pt-1'>
              <Bone className='h-8 w-20 rounded-md' />
              <Bone className='h-8 w-20 rounded-md' />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Table</h4>
        <div className='rounded-lg border border-border overflow-hidden'>
          <div className='flex items-center gap-3 px-3 py-2.5 border-b border-border bg-muted/20'>
            <Bone className='h-3 w-16' />
            <Bone className='h-3 w-24' />
            <Bone className='h-3 w-16 ml-auto' />
          </div>
          {[1, 2, 3].map((r) => (
            <div key={r} className='flex items-center gap-3 px-3 py-2.5 border-b border-border last:border-0'>
              <Bone className='h-3 w-20' />
              <Bone className='h-3 w-32' />
              <Bone className='h-5 w-14 rounded-full ml-auto' />
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>List Items</h4>
        <div className='space-y-3'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex items-center gap-3'>
              <Bone className='h-9 w-9 rounded-lg shrink-0' />
              <div className='flex-1 space-y-1.5'>
                <Bone className='h-3.5 w-2/3' />
                <Bone className='h-2.5 w-full' />
              </div>
              <Bone className='h-7 w-7 rounded-md shrink-0' />
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Form</h4>
        <div className='space-y-3'>
          <div className='space-y-1.5'>
            <Bone className='h-3 w-16' />
            <Bone className='h-9 w-full rounded-md' />
          </div>
          <div className='space-y-1.5'>
            <Bone className='h-3 w-12' />
            <Bone className='h-9 w-full rounded-md' />
          </div>
          <div className='flex gap-2'>
            <div className='flex-1 space-y-1.5'>
              <Bone className='h-3 w-10' />
              <Bone className='h-9 w-full rounded-md' />
            </div>
            <div className='flex-1 space-y-1.5'>
              <Bone className='h-3 w-14' />
              <Bone className='h-9 w-full rounded-md' />
            </div>
          </div>
          <Bone className='h-9 w-full rounded-md' />
        </div>
      </div>

      {/* Dashboard Stats */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Dashboard</h4>
        <div className='grid grid-cols-3 gap-2'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='p-3 rounded-lg border border-border bg-card space-y-2'>
              <Bone className='h-2.5 w-16' />
              <Bone className='h-6 w-20' />
              <Bone className='h-2 w-12' />
            </div>
          ))}
        </div>
      </div>

      {/* Chat / Messages */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Chat</h4>
        <div className='space-y-3'>
          <div className='flex items-start gap-2'>
            <Bone className='h-7 w-7 rounded-full shrink-0' />
            <div className='space-y-1.5'>
              <Bone className='h-12 w-44 rounded-lg rounded-tl-sm' />
              <Bone className='h-2 w-12' />
            </div>
          </div>
          <div className='flex items-start gap-2 flex-row-reverse'>
            <div className='space-y-1.5'>
              <Bone className='h-8 w-36 rounded-lg rounded-tr-sm' />
              <Bone className='h-2 w-10 ml-auto' />
            </div>
          </div>
          <div className='flex items-start gap-2'>
            <Bone className='h-7 w-7 rounded-full shrink-0' />
            <Bone className='h-16 w-52 rounded-lg rounded-tl-sm' />
          </div>
        </div>
      </div>

      {/* Navigation / Sidebar */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Sidebar</h4>
        <div className='w-44 rounded-lg border border-border bg-card p-2 space-y-1'>
          <div className='flex items-center gap-2 px-2 py-1.5'>
            <Bone className='h-5 w-5 rounded-md shrink-0' />
            <Bone className='h-3 w-20' />
          </div>
          <Bone className='h-px w-full my-1' />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='flex items-center gap-2 px-2 py-1.5'>
              <Bone className='h-3.5 w-3.5 rounded shrink-0' />
              <Bone className={cn('h-3', i === 1 ? 'w-3/4' : i === 2 ? 'w-2/3' : i === 3 ? 'w-4/5' : 'w-full')} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
export function DemoSpinner({ size }: { size?: 'sm' | 'default' | 'lg' }) {
  if (size) {
    const sizes = { sm: 'w-4 h-4', default: 'w-6 h-6', lg: 'w-8 h-8' };
    return (
      <svg className={cn('animate-spin text-primary', sizes[size])} fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
      </svg>
    );
  }

  return (
    <div className='w-full max-w-md space-y-6'>
      {/* Sizes */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Sizes</h4>
        <div className='flex items-center gap-6'>
          {[{ s: 'w-3 h-3', label: 'XS' }, { s: 'w-4 h-4', label: 'SM' }, { s: 'w-6 h-6', label: 'MD' }, { s: 'w-8 h-8', label: 'LG' }, { s: 'w-12 h-12', label: 'XL' }].map((item) => (
            <div key={item.label} className='flex flex-col items-center gap-2'>
              <svg className={cn('animate-spin text-primary', item.s)} fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
              </svg>
              <span className='text-[9px] text-muted-foreground'>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Styles</h4>
        <div className='flex items-center gap-6'>
          {/* Classic */}
          <div className='flex flex-col items-center gap-2'>
            <svg className='animate-spin w-7 h-7 text-primary' fill='none' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='3' />
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
            </svg>
            <span className='text-[9px] text-muted-foreground'>Classic</span>
          </div>
          {/* Ring */}
          <div className='flex flex-col items-center gap-2'>
            <div className='w-7 h-7 rounded-full border-[2.5px] border-muted border-t-primary animate-spin' />
            <span className='text-[9px] text-muted-foreground'>Ring</span>
          </div>
          {/* Dots */}
          <div className='flex flex-col items-center gap-2'>
            <div className='flex gap-1'>
              <span className='w-2 h-2 rounded-full bg-primary animate-bounce' />
              <span className='w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.15s]' />
              <span className='w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.3s]' />
            </div>
            <span className='text-[9px] text-muted-foreground'>Dots</span>
          </div>
          {/* Pulse */}
          <div className='flex flex-col items-center gap-2'>
            <div className='w-7 h-7 rounded-full bg-primary/20 animate-pulse flex items-center justify-center'>
              <div className='w-3 h-3 rounded-full bg-primary' />
            </div>
            <span className='text-[9px] text-muted-foreground'>Pulse</span>
          </div>
          {/* Bars */}
          <div className='flex flex-col items-center gap-2'>
            <div className='flex items-end gap-0.5 h-7'>
              {[0, 0.15, 0.3, 0.45].map((d) => (
                <div key={d} className='w-1.5 bg-primary rounded-full animate-pulse' style={{ animationDelay: `${d}s`, height: '60%', animationDuration: '0.8s' }} />
              ))}
            </div>
            <span className='text-[9px] text-muted-foreground'>Bars</span>
          </div>
          {/* Dual Ring */}
          <div className='flex flex-col items-center gap-2'>
            <div className='relative w-7 h-7'>
              <div className='absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin' />
              <div className='absolute inset-1 rounded-full border-2 border-primary/10 border-b-primary/60 animate-spin [animation-direction:reverse] [animation-duration:0.6s]' />
            </div>
            <span className='text-[9px] text-muted-foreground'>Dual</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Colors</h4>
        <div className='flex items-center gap-5'>
          {[
            { color: 'text-primary border-primary', label: 'Primary' },
            { color: 'text-emerald-500 border-emerald-500', label: 'Success' },
            { color: 'text-amber-500 border-amber-500', label: 'Warning' },
            { color: 'text-red-500 border-red-500', label: 'Error' },
            { color: 'text-muted-foreground border-muted-foreground', label: 'Muted' },
          ].map((item) => (
            <div key={item.label} className='flex flex-col items-center gap-2'>
              <div className={cn('w-6 h-6 rounded-full border-[2.5px] border-muted animate-spin', item.color.split(' ').filter((c) => c.startsWith('border-'))[0])} style={{ borderTopColor: 'currentColor', borderRightColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}>
                <div className='w-full h-full rounded-full' style={{ borderWidth: '2.5px', borderStyle: 'solid', borderColor: 'hsl(var(--muted))', borderTopColor: 'transparent' }} />
              </div>
              <span className='text-[9px] text-muted-foreground'>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* With text */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>With Text</h4>
        <div className='flex flex-wrap gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 rounded-full border-2 border-muted border-t-primary animate-spin' />
            <span className='text-xs text-muted-foreground'>Loading...</span>
          </div>
          <SingleButton disabled size='sm' className='gap-2'>
            <svg className='animate-spin w-3.5 h-3.5' fill='none' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
            </svg>
            Processing
          </SingleButton>
          <div className='flex flex-col items-center gap-1.5 p-3 rounded-lg border border-border bg-card'>
            <div className='w-5 h-5 rounded-full border-2 border-muted border-t-primary animate-spin' />
            <span className='text-[10px] text-muted-foreground'>Saving changes</span>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Overlay</h4>
        <div className='relative rounded-lg border border-border bg-card p-4 h-24 flex items-center justify-center overflow-hidden'>
          <p className='text-xs text-muted-foreground/30'>Content behind overlay</p>
          <div className='absolute inset-0 bg-background/60 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2'>
            <div className='w-6 h-6 rounded-full border-[2.5px] border-muted border-t-primary animate-spin' />
            <span className='text-[10px] text-muted-foreground font-medium'>Loading content...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function AvatarCircle({ fallback = 'AU', size = 'default', className = '' }: { fallback?: string; size?: string; className?: string }) {
  const sizes: Record<string, string> = { xs: 'w-6 h-6 text-[9px]', sm: 'w-8 h-8 text-xs', default: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg', xl: 'w-20 h-20 text-xl' };
  return (
    <div className={cn('relative inline-flex items-center justify-center rounded-full bg-muted overflow-hidden', sizes[size] || sizes.default, className)}>
      <span className='font-medium text-muted-foreground'>{fallback}</span>
    </div>
  );
}

export function DemoAvatar({
  src,
  alt = '',
  fallback,
  size,
}: {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'default' | 'lg';
}) {
  // Controlled mode from storybook
  if (fallback || size) {
    return <AvatarCircle fallback={fallback || 'AU'} size={size || 'default'} />;
  }
  // Full showcase
  return (
    <div className='w-full max-w-sm space-y-4'>
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Sizes</h4>
        <div className='flex items-end gap-3'>
          {[{ s: 'xs', i: 'XS' }, { s: 'sm', i: 'SM' }, { s: 'default', i: 'MD' }, { s: 'lg', i: 'LG' }, { s: 'xl', i: 'XL' }].map((a) => (
            <div key={a.s} className='flex flex-col items-center gap-1'>
              <AvatarCircle fallback={a.i} size={a.s} />
              <span className='text-[9px] text-muted-foreground'>{a.s}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>With Status</h4>
        <div className='flex items-center gap-3'>
          {[{ fallback: 'AC', status: 'bg-emerald-500', label: 'Online' }, { fallback: 'BS', status: 'bg-amber-500', label: 'Away' }, { fallback: 'CD', status: 'bg-zinc-400', label: 'Offline' }].map((a) => (
            <div key={a.fallback} className='flex flex-col items-center gap-1'>
              <div className='relative'>
                <AvatarCircle fallback={a.fallback} />
                <span className={cn('absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background', a.status)} />
              </div>
              <span className='text-[9px] text-muted-foreground'>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Avatar Group</h4>
        <div className='flex -space-x-2'>
          {['AC', 'BS', 'CD', 'DW', 'EF'].slice(0, 3).map((i) => <AvatarCircle key={i} fallback={i} className='border-2 border-background' />)}
          <div className='w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-medium text-muted-foreground'>+2</div>
        </div>
      </div>
    </div>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────
export function DemoSeparator({
  orientation = 'horizontal',
  className = '',
}: {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}) {
  if (className) {
    return (
      <div
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className,
        )}
      />
    );
  }
  return (
    <div className='max-w-xs'>
      <div className='space-y-1'>
        <h4 className='text-sm font-medium'>Adhar UI</h4>
        <p className='text-xs text-muted-foreground'>An open-source design system.</p>
      </div>
      <div className='shrink-0 bg-border h-[1px] w-full my-3' />
      <div className='flex items-center gap-3 text-xs text-muted-foreground'>
        <span>Docs</span>
        <div className='shrink-0 bg-border h-4 w-[1px]' />
        <span>Source</span>
        <div className='shrink-0 bg-border h-4 w-[1px]' />
        <span>Blog</span>
      </div>
    </div>
  );
}

// ─── Alert ────────────────────────────────────────────────────────────────────
export function DemoAlert({
  variant,
  title,
  children,
}: {
  variant?: 'default' | 'destructive';
  title?: string;
  children?: React.ReactNode;
}) {
  if (children || variant) {
    return (
      <div className={cn('relative w-full max-w-sm rounded-lg border p-3', variant === 'destructive' ? 'border-destructive/50 bg-destructive/5 text-destructive' : 'border-border text-foreground')}>
        {title && <h5 className='mb-1 text-sm font-medium'>{title}</h5>}
        <div className='text-xs text-muted-foreground'>{children}</div>
      </div>
    );
  }
  const alerts = [
    { title: 'Info', desc: 'Your trial expires in 3 days.', border: 'border-blue-500/30', bg: 'bg-blue-500/5', text: 'text-blue-600', icon: 'ℹ' },
    { title: 'Success', desc: 'Your changes have been saved.', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', text: 'text-emerald-600', icon: '✓' },
    { title: 'Warning', desc: 'Storage is almost full (92%).', border: 'border-amber-500/30', bg: 'bg-amber-500/5', text: 'text-amber-600', icon: '⚠' },
    { title: 'Error', desc: 'Failed to deploy. Check logs.', border: 'border-red-500/30', bg: 'bg-red-500/5', text: 'text-red-600', icon: '✕' },
  ];
  return (
    <div className='space-y-2 w-full max-w-sm'>
      {alerts.map((a) => (
        <div key={a.title} className={cn('rounded-lg border p-3 flex items-start gap-2.5', a.border, a.bg)}>
          <span className={cn('text-xs font-bold mt-0.5', a.text)}>{a.icon}</span>
          <div><h5 className={cn('text-xs font-semibold', a.text)}>{a.title}</h5><p className='text-[11px] text-muted-foreground'>{a.desc}</p></div>
        </div>
      ))}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function DemoCard({
  title,
  description,
  children,
  footer,
  className = '',
}: {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  if (children || footer || title) {
    return (
      <div className={cn('rounded-xl border border-border bg-card text-card-foreground shadow-sm max-w-xs', className)}>
        {title && <div className='p-5 pb-3'><h3 className='text-base font-semibold'>{title}</h3>{description && <p className='text-sm text-muted-foreground mt-1'>{description}</p>}</div>}
        {children && <div className='px-5 pb-5'>{children}</div>}
        {footer && <div className='px-5 pb-5 flex items-center gap-2'>{footer}</div>}
      </div>
    );
  }
  return (
    <div className='rounded-xl border border-border bg-card text-card-foreground shadow-sm max-w-[260px] overflow-hidden'>
      <div className='h-24 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center'>
        <svg className='w-10 h-10 text-primary/30' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1}><rect x='3' y='3' width='18' height='18' rx='2' /><circle cx='8.5' cy='8.5' r='1.5' /><path d='m21 15-5-5L5 21' /></svg>
      </div>
      <div className='p-4'>
        <h3 className='text-sm font-semibold mb-1'>Project Alpha</h3>
        <p className='text-xs text-muted-foreground mb-3 leading-relaxed'>A modern dashboard with real-time analytics and team collaboration.</p>
        <div className='flex items-center justify-between'>
          <div className='flex -space-x-1.5'>
            {['AC', 'BS', 'CD'].map((i) => <div key={i} className='w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[8px] font-semibold text-muted-foreground'>{i}</div>)}
          </div>
          <SingleButton variant='outline' size='sm' className='h-7 text-xs'>View</SingleButton>
        </div>
      </div>
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
export function DemoTabs({
  tabs = [
    { label: 'Account', content: <p className='text-sm text-muted-foreground'>Manage your account settings.</p> },
    { label: 'Password', content: <p className='text-sm text-muted-foreground'>Change your password here.</p> },
  ],
  defaultTab = 0,
}: {
  tabs?: { label: string; content: React.ReactNode }[];
  defaultTab?: number;
}) {
  const [active, setActive] = useState(defaultTab);
  return (
    <div>
      <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              i === active ? 'bg-background text-foreground shadow-sm' : 'hover:text-foreground',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className='mt-3'>{tabs[active]?.content}</div>
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
export function DemoSelect({
  options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Solid', value: 'solid' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
  ],
  value: controlledValue,
  onChange,
  placeholder = 'Select framework...',
  className = '',
}: {
  options?: { label: string; value: string }[];
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState('');
  const selected = controlledValue !== undefined ? controlledValue : internal;
  const selectedLabel = options.find((o) => o.value === selected)?.label;

  const handleSelect = (val: string) => {
    setInternal(val);
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div className={cn('relative w-full max-w-xs', className)}>
      <button
        onClick={() => setOpen(!open)}
        className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-accent/30 transition-colors'
      >
        <span className={selectedLabel ? 'text-foreground' : 'text-muted-foreground'}>
          {selectedLabel || placeholder}
        </span>
        <svg className={cn('w-4 h-4 text-muted-foreground transition-transform', open && 'rotate-180')} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' d='M19 9l-7 7-7-7' />
        </svg>
      </button>
      {open && (
        <>
          <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />
          <div className='absolute top-full left-0 w-full mt-1 rounded-md border border-border bg-popover p-1 shadow-lg z-50 animate-fade-in'>
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  'w-full text-left px-2.5 py-1.5 rounded-sm text-sm transition-colors flex items-center justify-between',
                  selected === opt.value ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50',
                )}
              >
                {opt.label}
                {selected === opt.value && (
                  <svg className='w-3.5 h-3.5 text-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Slider ───────────────────────────────────────────────────────────────────
export function DemoSlider({
  value: controlledValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
}: {
  value?: number;
  onChange?: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) {
  const [internal, setInternal] = useState(controlledValue ?? 50);
  const value = controlledValue ?? internal;
  const handleChange = (v: number) => { setInternal(v); onChange?.(v); };

  if (controlledValue !== undefined || onChange) {
    return (
      <div className='w-full max-w-xs space-y-1'>
        <div className='flex justify-between text-xs text-muted-foreground'><span>{min}</span><span className='font-medium text-foreground'>{value}</span><span>{max}</span></div>
        <input type='range' min={min} max={max} step={step} value={value} onChange={(e) => handleChange(Number(e.target.value))} className='w-full h-2 rounded-full accent-primary cursor-pointer' />
      </div>
    );
  }

  return (
    <div className='w-full max-w-xs space-y-4'>
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Default</h4>
        <div className='flex justify-between text-xs text-muted-foreground mb-1'><span>0</span><span className='font-medium text-foreground'>{internal}</span><span>100</span></div>
        <input type='range' min={0} max={100} value={internal} onChange={(e) => setInternal(Number(e.target.value))} className='w-full h-2 rounded-full accent-primary cursor-pointer' />
      </div>
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>With Steps</h4>
        <input type='range' min={0} max={100} step={25} defaultValue={50} className='w-full h-2 rounded-full accent-primary cursor-pointer' />
        <div className='flex justify-between text-[9px] text-muted-foreground mt-1'><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div>
      </div>
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Disabled</h4>
        <input type='range' disabled value={30} className='w-full h-2 rounded-full accent-primary cursor-pointer opacity-50' />
      </div>
    </div>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
export function DemoTooltip({
  content = 'Add to library',
  children,
}: {
  content?: string;
  children?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  return (
    <div
      className='relative inline-block'
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children || <SingleButton variant='outline' size='sm'>Hover me</SingleButton>}
      {show && (
        <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-md shadow-md whitespace-nowrap z-50'>
          {content}
          <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary' />
        </div>
      )}
    </div>
  );
}

// ─── Dialog ───────────────────────────────────────────────────────────────────
export function DemoDialog({
  open: externalOpen,
  onClose: externalOnClose,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  children,
  footer,
}: {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const handleClose = () => {
    setInternalOpen(false);
    externalOnClose?.();
  };

  return (
    <>
      {externalOpen === undefined && (
        <SingleButton variant='outline' onClick={() => setInternalOpen(true)}>Open Dialog</SingleButton>
      )}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm' onClick={handleClose} />
          <div className='relative z-50 w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-lg'>
            <h2 className='text-lg font-semibold mb-1'>{title}</h2>
            <p className='text-sm text-muted-foreground mb-4'>{description}</p>
            {children}
            <div className='mt-6 flex justify-end gap-2'>
              {footer || (
                <>
                  <SingleButton variant='outline' size='sm' onClick={handleClose}>Cancel</SingleButton>
                  <SingleButton variant='destructive' size='sm' onClick={handleClose}>Confirm</SingleButton>
                </>
              )}
            </div>
            <button
              onClick={handleClose}
              className='absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity'
            >
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────
export function DemoAccordion({ items = [
  { title: 'Is it accessible?', content: 'Yes. It follows WAI-ARIA design patterns.' },
  { title: 'Is it styled?', content: 'Yes. It ships with default styles using Tailwind CSS.' },
  { title: 'Is it animated?', content: 'Yes. It uses CSS transitions for smooth animations.' },
] }: { items?: { title: string; content: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className='w-full max-w-xs divide-y divide-border border-b border-border'>
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className='flex w-full items-center justify-between py-4 text-sm font-medium hover:underline transition-all'
          >
            {item.title}
            <svg
              className={cn(
                'w-4 h-4 shrink-0 transition-transform',
                openIndex === i && 'rotate-180',
              )}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
            </svg>
          </button>
          {openIndex === i && (
            <div className='pb-4 text-sm text-muted-foreground animate-in slide-in-from-top-1'>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────────────
interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: 'default' | 'success' | 'warning' | 'error' | 'info' | 'loading';
  duration: number;
  progress: number;
  action?: string;
  createdAt: number;
}

const _toastIcons: Record<string, React.ReactNode> = {
  default: <svg className='w-4 h-4 text-foreground shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' /></svg>,
  success: <svg className='w-4 h-4 text-emerald-500 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>,
  warning: <svg className='w-4 h-4 text-amber-500 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>,
  error: <svg className='w-4 h-4 text-red-500 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>,
  info: <svg className='w-4 h-4 text-blue-500 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>,
};

const toastVariantStyles: Record<string, string> = {
  default: 'border-border bg-background',
  success: 'border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20',
  warning: 'border-amber-500/30 bg-amber-50 dark:bg-amber-950/20',
  error: 'border-red-500/30 bg-red-50 dark:bg-red-950/20',
  info: 'border-blue-500/30 bg-blue-50 dark:bg-blue-950/20',
};

const toastProgressColors: Record<string, string> = {
  default: 'bg-foreground/20',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

export function DemoToast({
  title,
  description,
  variant,
  onClose,
}: {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
  onClose?: () => void;
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [nextId, setNextId] = useState(1);
  const [position, setPosition] = useState('bottom-right');
  const [selectedVariant, setSelectedVariant] = useState<ToastItem['variant']>('success');
  const [duration, setDuration] = useState(4);
  const [showAction, setShowAction] = useState(false);

  // Simple mode — from storybook controls
  if (onClose || (title && variant)) {
    return (
      <div className={cn('rounded-lg border p-3 shadow-lg flex items-start gap-2.5 max-w-xs', toastVariantStyles[variant || 'default'])}>
        {_toastIcons[variant || 'default']}
        <div className='flex-1'>
          <p className='text-xs font-semibold'>{title}</p>
          {description && <p className='text-[11px] text-muted-foreground mt-0.5'>{description}</p>}
        </div>
        {onClose && <button onClick={onClose} className='text-muted-foreground hover:text-foreground text-xs'>✕</button>}
      </div>
    );
  }

  const messages: Record<string, { title: string; desc: string }> = {
    default: { title: 'Notification', desc: 'You have a new message.' },
    success: { title: 'Changes saved', desc: 'Your profile has been updated.' },
    warning: { title: 'Storage almost full', desc: '92% of storage used.' },
    error: { title: 'Upload failed', desc: 'Please try again.' },
    info: { title: 'Update available', desc: 'v0.2.0 is ready to install.' },
    loading: { title: 'Saving changes...', desc: '' },
  };

  const addToast = (type?: string) => {
    const v = (type || selectedVariant) as ToastItem['variant'];
    const msg = messages[v];
    const id = nextId;
    setNextId((n) => n + 1);
    const t: ToastItem = { id, title: msg.title, description: msg.desc || undefined, variant: v, duration, progress: 100, action: showAction ? 'Undo' : undefined, createdAt: Date.now() };
    setToasts((prev) => [...prev, t]);

    if (v === 'loading') {
      // Promise pattern — resolve after 2s
      setTimeout(() => {
        setToasts((prev) => prev.map((x) => x.id === id ? { ...x, variant: 'success' as const, title: 'Saved!', description: 'Changes applied.', progress: 100 } : x));
        setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3000);
      }, 2000);
    } else if (duration > 0) {
      const interval = setInterval(() => {
        setToasts((prev) => prev.map((x) => x.id === id ? { ...x, progress: Math.max(0, x.progress - (100 / (duration * 10))) } : x));
      }, 100);
      setTimeout(() => { clearInterval(interval); setToasts((prev) => prev.filter((x) => x.id !== id)); }, duration * 1000);
    }
  };

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const posClasses: Record<string, string> = {
    'top-left': 'top-2 left-2 items-start',
    'top-center': 'top-2 left-1/2 -translate-x-1/2 items-center',
    'top-right': 'top-2 right-2 items-end',
    'bottom-left': 'bottom-2 left-2 items-start',
    'bottom-center': 'bottom-2 left-1/2 -translate-x-1/2 items-center',
    'bottom-right': 'bottom-2 right-2 items-end',
  };
  const isTop = position.startsWith('top');

  return (
    <div className='w-full max-w-md space-y-4'>
      {/* Quick trigger buttons */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Quick Triggers</h4>
        <div className='flex flex-wrap gap-1.5'>
          {([
            { type: 'default', label: 'Default', dot: 'bg-foreground/40' },
            { type: 'success', label: 'Success', dot: 'bg-emerald-500' },
            { type: 'error', label: 'Error', dot: 'bg-red-500' },
            { type: 'warning', label: 'Warning', dot: 'bg-amber-500' },
            { type: 'info', label: 'Info', dot: 'bg-blue-500' },
            { type: 'loading', label: 'Promise', dot: 'bg-primary' },
          ]).map((b) => (
            <SingleButton key={b.type} size='sm' variant='outline' onClick={() => addToast(b.type)}>
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1', b.dot)} />{b.label}
            </SingleButton>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className='rounded-lg border border-border bg-card p-4 space-y-3'>
        <h4 className='text-xs font-semibold text-foreground'>Customize Toast</h4>
        <div className='grid sm:grid-cols-2 gap-3'>
          {/* Left column */}
          <div className='space-y-2.5'>
            {/* Variant */}
            <div>
              <label className='text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block'>Variant</label>
              <div className='flex flex-wrap gap-1'>
                {(['default', 'success', 'warning', 'error', 'info'] as const).map((v) => {
                  const dots: Record<string, string> = { default: 'bg-foreground/40', success: 'bg-emerald-500', warning: 'bg-amber-500', error: 'bg-red-500', info: 'bg-blue-500' };
                  return (
                    <button key={v} onClick={() => setSelectedVariant(v)}
                      className={cn('px-2 py-1 rounded-md text-[10px] font-medium capitalize border transition-colors flex items-center gap-1',
                        selectedVariant === v ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted text-muted-foreground')}>
                      <span className={cn('w-1.5 h-1.5 rounded-full', dots[v])} />{v}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Position */}
            <div>
              <label className='text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block'>Position</label>
              <div className='grid grid-cols-3 gap-1'>
                {['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map((p) => (
                  <button key={p} onClick={() => setPosition(p)}
                    className={cn('h-6 rounded text-[9px] border transition-colors',
                      position === p ? 'border-primary bg-primary/10 text-primary font-medium' : 'border-border hover:bg-muted text-muted-foreground')}>
                    {p.split('-').map((w) => w[0].toUpperCase()).join('-')}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Right column */}
          <div className='space-y-2.5'>
            {/* Duration */}
            <div>
              <label className='text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block'>
                Auto-dismiss: <span className='text-foreground'>{duration === 0 ? 'Never' : `${duration}s`}</span>
              </label>
              <input type='range' min={0} max={10} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className='w-full h-1.5 accent-primary' />
            </div>
            {/* Options */}
            <div className='flex items-center gap-4'>
              <label className='flex items-center gap-1.5 cursor-pointer'>
                <CheckboxControl checked={showAction} onChange={setShowAction} />
                <span className='text-[10px]'>Action button</span>
              </label>
            </div>
            {/* Custom message */}
            <div>
              <label className='text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1 block'>Custom message</label>
              <input id='toast-custom-title' placeholder='Title (optional)' className='w-full h-7 px-2 rounded-md border border-input bg-background text-[11px] mb-1 focus:outline-none focus:ring-1 focus:ring-ring' />
              <input id='toast-custom-desc' placeholder='Description (optional)' className='w-full h-7 px-2 rounded-md border border-input bg-background text-[11px] focus:outline-none focus:ring-1 focus:ring-ring' />
            </div>
          </div>
        </div>
        <SingleButton onClick={() => {
          const customTitle = (document.getElementById('toast-custom-title') as HTMLInputElement)?.value;
          const customDesc = (document.getElementById('toast-custom-desc') as HTMLInputElement)?.value;
          if (customTitle) {
            const id = nextId;
            setNextId((n) => n + 1);
            const t: ToastItem = { id, title: customTitle, description: customDesc || undefined, variant: selectedVariant, duration, progress: 100, action: showAction ? 'Undo' : undefined, createdAt: Date.now() };
            setToasts((prev) => [...prev, t]);
            if (duration > 0) {
              const interval = setInterval(() => { setToasts((prev) => prev.map((x) => x.id === id ? { ...x, progress: Math.max(0, x.progress - (100 / (duration * 10))) } : x)); }, 100);
              setTimeout(() => { clearInterval(interval); setToasts((prev) => prev.filter((x) => x.id !== id)); }, duration * 1000);
            }
          } else {
            addToast();
          }
        }} size='sm' className='w-full'>Show Toast</SingleButton>
      </div>

      {/* Preview area */}
      <div className='relative rounded-xl border border-dashed border-border bg-muted/5 h-52 overflow-hidden'>
        {toasts.length === 0 && <div className='absolute inset-0 flex items-center justify-center text-[10px] text-muted-foreground/30'>Toasts appear here</div>}
        <div className={cn('absolute flex flex-col gap-2 z-10 w-[240px]', posClasses[position], isTop ? '' : 'flex-col-reverse')}>
          {toasts.slice(-5).map((toast, i, arr) => {
            const isStale = arr.length > 1 && i < arr.length - 1;
            return (
              <div key={toast.id} className={cn('rounded-lg border shadow-lg overflow-hidden animate-slide-up transition-all', toastVariantStyles[toast.variant] || toastVariantStyles.default, isStale ? 'opacity-70 scale-[0.97]' : '')}>
                <div className='p-2.5 flex items-start gap-2'>
                  {toast.variant === 'loading'
                    ? <div className='w-4 h-4 rounded-full border-2 border-muted border-t-primary animate-spin shrink-0 mt-0.5' />
                    : (_toastIcons[toast.variant] || _toastIcons.default)}
                  <div className='flex-1 min-w-0'>
                    <p className='text-[11px] font-semibold leading-tight'>{toast.title}</p>
                    {toast.description && <p className='text-[10px] text-muted-foreground mt-0.5 leading-snug'>{toast.description}</p>}
                    {toast.action && <button onClick={() => dismiss(toast.id)} className='text-[10px] font-semibold text-primary hover:underline mt-1 block'>{toast.action}</button>}
                  </div>
                  <button onClick={() => dismiss(toast.id)} className='text-muted-foreground/40 hover:text-foreground shrink-0'>
                    <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M6 18L18 6M6 6l12 12' /></svg>
                  </button>
                </div>
                {toast.variant !== 'loading' && toast.duration > 0 && (
                  <div className='h-[2px] bg-border/20'>
                    <div className={cn('h-full transition-all duration-100', toastProgressColors[toast.variant] || toastProgressColors.default)} style={{ width: `${toast.progress}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Dropdown Menu ───────────────────────────────────────────────────────────
export function DemoDropdownMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className='relative inline-block'>
      <SingleButton variant='outline' onClick={() => setOpen(!open)}>
        Options ▾
      </SingleButton>
      {open && (
        <div className='absolute top-full left-0 mt-1 w-48 rounded-lg border border-border bg-popover p-1 shadow-lg z-50'>
          {[
            { label: 'Edit', shortcut: '⌘E' },
            { label: 'Duplicate', shortcut: '⌘D' },
            { label: 'Archive', shortcut: '⌘A' },
          ].map((item) => (
            <button key={item.label} onClick={() => setOpen(false)} className='flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors'>
              {item.label}
              <span className='text-xs text-muted-foreground'>{item.shortcut}</span>
            </button>
          ))}
          <div className='h-px bg-border my-1 -mx-1' />
          <button onClick={() => setOpen(false)} className='flex items-center w-full px-2 py-1.5 text-sm rounded-md text-destructive hover:bg-destructive/10 transition-colors'>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Popover ─────────────────────────────────────────────────────────────────
export function DemoPopover() {
  const [open, setOpen] = useState(false);
  return (
    <div className='relative inline-block'>
      <SingleButton variant='outline' onClick={() => setOpen(!open)}>Open Popover</SingleButton>
      {open && (
        <div className='absolute top-full left-0 mt-2 w-72 rounded-xl border border-border bg-popover p-4 shadow-lg z-50'>
          <h4 className='text-sm font-semibold text-foreground mb-1'>Dimensions</h4>
          <p className='text-xs text-muted-foreground mb-3'>Set the dimensions for the layer.</p>
          <div className='grid grid-cols-2 gap-2'>
            {['Width', 'Height', 'Max Width', 'Max Height'].map((label) => (
              <div key={label}>
                <label className='text-xs text-muted-foreground'>{label}</label>
                <input className='mt-1 w-full h-8 px-2 rounded-md border border-input bg-background text-sm' defaultValue='100%' />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sheet ───────────────────────────────────────────────────────────────────
export function DemoSheet() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SingleButton variant='outline' onClick={() => setOpen(true)}>Open Sheet</SingleButton>
      {open && (
        <div className='fixed inset-0 z-50'>
          <div className='fixed inset-0 bg-black/60' onClick={() => setOpen(false)} />
          <div className='fixed right-0 top-0 h-full w-80 bg-background border-l border-border p-6 shadow-lg z-50'>
            <h3 className='text-lg font-semibold mb-1'>Edit Profile</h3>
            <p className='text-sm text-muted-foreground mb-4'>Make changes to your profile.</p>
            <div className='space-y-3'>
              <div>
                <label className='text-sm font-medium'>Name</label>
                <input className='mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm' defaultValue='John Doe' />
              </div>
              <div>
                <label className='text-sm font-medium'>Email</label>
                <input className='mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm' defaultValue='john@example.com' />
              </div>
            </div>
            <div className='mt-6 flex justify-end gap-2'>
              <SingleButton variant='outline' size='sm' onClick={() => setOpen(false)}>Cancel</SingleButton>
              <SingleButton size='sm' onClick={() => setOpen(false)}>Save</SingleButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Radio Group ─────────────────────────────────────────────────────────────
export function DemoRadioGroup() {
  const [value, setValue] = useState('comfortable');
  const options = [
    { value: 'default', label: 'Default' },
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'compact', label: 'Compact' },
  ];
  return (
    <div className='space-y-2'>
      {options.map((opt) => (
        <label key={opt.value} className='flex items-center gap-2.5 cursor-pointer'>
          <button
            onClick={() => setValue(opt.value)}
            className={cn(
              'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
              value === opt.value ? 'border-primary' : 'border-input',
            )}
          >
            {value === opt.value && <span className='w-2 h-2 rounded-full bg-primary' />}
          </button>
          <span className='text-sm'>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

// ─── Toggle ──────────────────────────────────────────────────────────────────
export function DemoToggle() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className='flex items-center gap-2'>
      <button
        aria-pressed={pressed}
        onClick={() => setPressed(!pressed)}
        className={cn(
          'inline-flex items-center justify-center h-10 w-10 rounded-md text-sm font-medium transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          pressed ? 'bg-accent text-accent-foreground' : 'hover:bg-muted hover:text-muted-foreground',
        )}
      >
        <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' /></svg>
      </button>
      <button
        className='inline-flex items-center justify-center h-10 w-10 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      >
        <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h7' /></svg>
      </button>
    </div>
  );
}

// ─── Breadcrumb ──────────────────────────────────────────────────────────────
export function DemoBreadcrumb() {
  return (
    <nav className='flex items-center gap-1.5 text-sm'>
      <a className='text-muted-foreground hover:text-foreground transition-colors cursor-pointer'>Home</a>
      <span className='text-muted-foreground/50'>/</span>
      <a className='text-muted-foreground hover:text-foreground transition-colors cursor-pointer'>Components</a>
      <span className='text-muted-foreground/50'>/</span>
      <span className='text-foreground font-medium'>Breadcrumb</span>
    </nav>
  );
}

// ─── Pagination ──────────────────────────────────────────────────────────────
export function DemoPagination() {
  const [page, setPage] = useState(3);
  return (
    <nav className='flex items-center gap-1'>
      <button onClick={() => setPage(Math.max(1, page - 1))} className='h-8 px-2.5 rounded-md border border-input text-xs hover:bg-accent transition-colors'>Prev</button>
      {[1, 2, 3, 4, 5].map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={cn(
            'h-8 w-8 rounded-md text-xs font-medium transition-colors',
            p === page ? 'bg-primary text-primary-foreground' : 'hover:bg-accent',
          )}
        >{p}</button>
      ))}
      <button onClick={() => setPage(Math.min(5, page + 1))} className='h-8 px-2.5 rounded-md border border-input text-xs hover:bg-accent transition-colors'>Next</button>
    </nav>
  );
}

// ─── Table ───────────────────────────────────────────────────────────────────
export function DemoTable() {
  const data = [
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'Editor' },
    { name: 'Carol', email: 'carol@example.com', role: 'Viewer' },
  ];
  return (
    <div className='overflow-x-auto rounded-lg border border-border max-w-sm'>
      <table className='w-full text-sm'>
        <thead><tr className='border-b border-border bg-muted/30'>
          <th className='text-left px-3 py-2 font-medium text-foreground text-xs'>Name</th>
          <th className='text-left px-3 py-2 font-medium text-foreground text-xs'>Email</th>
          <th className='text-left px-3 py-2 font-medium text-foreground text-xs'>Role</th>
        </tr></thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.name} className={cn('border-b border-border last:border-0', i % 2 ? 'bg-muted/10' : '')}>
              <td className='px-3 py-2 font-medium text-xs'>{row.name}</td>
              <td className='px-3 py-2 text-muted-foreground text-xs'>{row.email}</td>
              <td className='px-3 py-2'><SingleBadge variant='secondary'>{row.role}</SingleBadge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Kbd ─────────────────────────────────────────────────────────────────────
export function DemoKbd() {
  return (
    <div className='flex items-center gap-3'>
      <kbd className='inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-1 text-xs font-mono text-muted-foreground shadow-sm'>⌘</kbd>
      <span className='text-sm text-muted-foreground'>+</span>
      <kbd className='inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-1 text-xs font-mono text-muted-foreground shadow-sm'>K</kbd>
      <span className='text-sm text-muted-foreground ml-2'>to search</span>
    </div>
  );
}

// ─── Hover Card ──────────────────────────────────────────────────────────────
export function DemoHoverCard() {
  const [show, setShow] = useState(false);
  return (
    <div className='relative inline-block' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <a className='text-sm text-primary hover:underline cursor-pointer font-medium'>@adhar-ui</a>
      {show && (
        <div className='absolute top-full left-0 mt-2 w-64 rounded-xl border border-border bg-popover p-4 shadow-lg z-50'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground'>AU</div>
            <div>
              <p className='text-sm font-semibold'>Adhar UI</p>
              <p className='text-xs text-muted-foreground'>@adhar-ui</p>
            </div>
          </div>
          <p className='text-xs text-muted-foreground leading-relaxed'>Open-source design system with 80+ components for React, Vue, Solid, Svelte, and Angular.</p>
        </div>
      )}
    </div>
  );
}

// ─── Scroll Area ─────────────────────────────────────────────────────────────
export function DemoScrollArea() {
  return (
    <div className='h-40 w-48 overflow-y-auto rounded-lg border border-border p-3 scrollbar-thin'>
      <h4 className='mb-2 text-sm font-semibold'>Tags</h4>
      {['React', 'Vue', 'Solid', 'Svelte', 'Angular', 'Astro', 'Next.js', 'Nuxt', 'Remix', 'Gatsby', 'Vite', 'Deno'].map((tag) => (
        <div key={tag} className='py-1.5 text-sm border-b border-border last:border-0'>{tag}</div>
      ))}
    </div>
  );
}

// ─── Collapsible ─────────────────────────────────────────────────────────────
export function DemoCollapsible() {
  const [open, setOpen] = useState(false);
  return (
    <div className='w-full max-w-[256px] rounded-lg border border-border'>
      <button onClick={() => setOpen(!open)} className='flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-muted/30 transition-colors'>
        <span>@adhar-ui/primitives</span>
        <svg className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M19 9l-7 7-7-7' /></svg>
      </button>
      {open && (
        <div className='border-t border-border px-4 py-2 space-y-1'>
          {['button.styles.ts', 'input.styles.ts', 'card.styles.ts'].map((f) => (
            <div key={f} className='text-xs text-muted-foreground py-1 font-mono'>{f}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Alert Dialog ────────────────────────────────────────────────────────────
export function DemoAlertDialog() {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const dialogs: Record<string, { icon: React.ReactNode; iconBg: string; title: string; desc: string; confirmLabel: string; confirmVariant: string; confirmIcon?: React.ReactNode }> = {
    delete: {
      icon: <svg className='w-6 h-6 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}><path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' /></svg>,
      iconBg: 'bg-red-500/10',
      title: 'Delete Account',
      desc: 'This action cannot be undone. This will permanently delete your account, remove all your data, and cancel any active subscriptions.',
      confirmLabel: 'Yes, delete my account',
      confirmVariant: 'destructive',
    },
    discard: {
      icon: <svg className='w-6 h-6 text-amber-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}><path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' /></svg>,
      iconBg: 'bg-amber-500/10',
      title: 'Discard Changes',
      desc: 'You have unsaved changes that will be lost. Are you sure you want to leave this page without saving?',
      confirmLabel: 'Discard changes',
      confirmVariant: 'default',
    },
    logout: {
      icon: <svg className='w-6 h-6 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}><path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9' /></svg>,
      iconBg: 'bg-blue-500/10',
      title: 'Sign Out',
      desc: 'Are you sure you want to sign out? You will need to enter your credentials again to access your account.',
      confirmLabel: 'Sign out',
      confirmVariant: 'default',
    },
  };

  const active = activeDialog ? dialogs[activeDialog] : null;

  return (
    <div className='w-full max-w-sm space-y-4'>
      {/* Trigger buttons */}
      <div>
        <h4 className='text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3'>Alert Dialog Variants</h4>
        <div className='flex flex-wrap gap-2'>
          <SingleButton variant='destructive' size='sm' onClick={() => setActiveDialog('delete')}>
            <svg className='w-3.5 h-3.5 mr-1.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' /></svg>
            Delete Account
          </SingleButton>
          <SingleButton variant='outline' size='sm' onClick={() => setActiveDialog('discard')}>
            <svg className='w-3.5 h-3.5 mr-1.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' /></svg>
            Discard Changes
          </SingleButton>
          <SingleButton variant='secondary' size='sm' onClick={() => setActiveDialog('logout')}>
            <svg className='w-3.5 h-3.5 mr-1.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9' /></svg>
            Sign Out
          </SingleButton>
        </div>
      </div>

      {/* Dialog */}
      {active && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm' onClick={() => setActiveDialog(null)} />
          <div className='relative z-50 w-full max-w-[400px] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden animate-scale-in'>
            {/* Content */}
            <div className='p-6 pb-5'>
              <div className='flex items-start gap-4'>
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', active.iconBg)}>
                  {active.icon}
                </div>
                <div className='flex-1 min-w-0'>
                  <h2 className='text-base font-semibold text-foreground mb-1'>{active.title}</h2>
                  <p className='text-sm text-muted-foreground leading-relaxed'>{active.desc}</p>
                </div>
              </div>

              {/* Delete confirmation input */}
              {activeDialog === 'delete' && (
                <div className='mt-4 p-3 rounded-lg bg-destructive/5 border border-destructive/20'>
                  <label className='text-xs font-medium text-destructive block mb-1.5'>
                    Type <strong>"delete my account"</strong> to confirm
                  </label>
                  <input
                    className='w-full h-9 px-3 rounded-md border border-destructive/30 bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/30'
                    placeholder='delete my account'
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className='flex items-center justify-end gap-2.5 px-6 py-4 border-t border-border bg-muted/20'>
              <SingleButton variant='outline' onClick={() => setActiveDialog(null)}>Cancel</SingleButton>
              <SingleButton
                variant={active.confirmVariant as any}
                onClick={() => setActiveDialog(null)}
              >
                {active.confirmLabel}
              </SingleButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Aspect Ratio ────────────────────────────────────────────────────────────
export function DemoAspectRatio() {
  return (
    <div className='w-full max-w-[192px] rounded-lg overflow-hidden border border-border'>
      <div className='relative w-full' style={{ paddingBottom: '56.25%' }}>
        <div className='absolute inset-0 bg-muted flex items-center justify-center'>
          <span className='text-xs text-muted-foreground font-medium'>16:9</span>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Sheet ────────────────────────────────────────────────────────────
export function DemoBottomSheet() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SingleButton variant='outline' size='sm' onClick={() => setOpen(true)}>Open Sheet</SingleButton>
      {open && (
        <div className='fixed inset-0 z-50'>
          <div className='fixed inset-0 bg-black/60' onClick={() => setOpen(false)} />
          <div className='fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-xl border-t border-border p-6 shadow-lg max-h-[60vh]'>
            <div className='w-10 h-1 rounded-full bg-muted mx-auto mb-4' />
            <h3 className='text-base font-semibold mb-2'>Share</h3>
            <div className='grid grid-cols-4 gap-4'>
              {['Copy Link', 'Email', 'Twitter', 'Slack'].map((s) => (
                <button key={s} onClick={() => setOpen(false)} className='flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-muted transition-colors'>
                  <div className='w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground'>{s[0]}</div>
                  <span className='text-[10px] text-muted-foreground'>{s}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Calendar ────────────────────────────────────────────────────────────────
export function DemoCalendar() {
  const [selected, setSelected] = useState(15);
  const [month, setMonth] = useState(2); // March = 2
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const today = 12;
  const events: Record<number, string> = { 5: 'Meeting', 12: 'Today', 15: 'Selected', 20: 'Deadline', 25: 'Review' };
  // First day offset and days in month
  const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31][month];
  const firstDay = new Date(2026, month, 1).getDay();

  return (
    <div className='w-full max-w-[280px] rounded-xl border border-border bg-card p-4'>
      <div className='flex items-center justify-between mb-3'>
        <button onClick={() => setMonth((month - 1 + 12) % 12)} className='w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors'>
          <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M15 19l-7-7 7-7' /></svg>
        </button>
        <span className='text-sm font-semibold'>{months[month]} 2026</span>
        <button onClick={() => setMonth((month + 1) % 12)} className='w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors'>
          <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M9 5l7 7-7 7' /></svg>
        </button>
      </div>
      <div className='grid grid-cols-7 gap-0.5 text-center'>
        {days.map((d) => <div key={d} className='text-[10px] text-muted-foreground font-medium py-1.5'>{d}</div>)}
        {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isSelected = selected === day;
          const isToday = day === today && month === 2;
          const hasEvent = events[day];
          return (
            <button key={i} onClick={() => setSelected(day)}
              className={cn('w-8 h-8 rounded-lg text-xs relative transition-all',
                isSelected ? 'bg-primary text-primary-foreground font-semibold shadow-sm' :
                isToday ? 'bg-accent text-accent-foreground font-medium ring-1 ring-primary/30' :
                'hover:bg-muted')}>
              {day}
              {hasEvent && !isSelected && <span className='absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary' />}
            </button>
          );
        })}
      </div>
      {selected && events[selected] && (
        <div className='mt-3 pt-3 border-t border-border'>
          <div className='flex items-center gap-2 text-xs'>
            <span className='w-1.5 h-1.5 rounded-full bg-primary' />
            <span className='font-medium'>{months[month]} {selected}</span>
            <span className='text-muted-foreground'>— {events[selected]}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Carousel ────────────────────────────────────────────────────────────────
export function DemoCarousel() {
  const [idx, setIdx] = useState(0);
  const slides = [
    { title: 'Modern Design', desc: 'Clean and minimal UI', color: 'from-blue-500/20 to-cyan-500/10' },
    { title: 'Multi-Framework', desc: 'Every major framework supported', color: 'from-violet-500/20 to-pink-500/10' },
    { title: 'Enterprise Ready', desc: 'Production-grade components included', color: 'from-amber-500/20 to-orange-500/10' },
  ];
  return (
    <div className='w-full max-w-xs rounded-xl border border-border overflow-hidden bg-card'>
      <div className={cn('h-36 bg-gradient-to-br flex flex-col items-center justify-center transition-all duration-300', slides[idx].color)}>
        <h3 className='text-sm font-semibold text-foreground'>{slides[idx].title}</h3>
        <p className='text-xs text-muted-foreground mt-1'>{slides[idx].desc}</p>
      </div>
      <div className='flex items-center justify-between px-3 py-2.5 border-t border-border/60'>
        <button onClick={() => setIdx((idx - 1 + 3) % 3)} className='w-7 h-7 rounded-full border border-input hover:bg-muted flex items-center justify-center transition-colors'>
          <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M15 19l-7-7 7-7' /></svg>
        </button>
        <div className='flex gap-1.5'>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={cn('w-2 h-2 rounded-full transition-all', i === idx ? 'bg-primary w-4' : 'bg-muted-foreground/20 hover:bg-muted-foreground/40')} />
          ))}
        </div>
        <button onClick={() => setIdx((idx + 1) % 3)} className='w-7 h-7 rounded-full border border-input hover:bg-muted flex items-center justify-center transition-colors'>
          <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M9 5l7 7-7 7' /></svg>
        </button>
      </div>
    </div>
  );
}

// ─── Chart ───────────────────────────────────────────────────────────────────
export function DemoChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const bars = [40, 65, 45, 80, 55, 70, 90];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const max = Math.max(...bars);
  return (
    <div className='w-full max-w-xs rounded-lg border border-border bg-card p-4'>
      <div className='flex items-center justify-between mb-3'>
        <div>
          <h4 className='text-xs font-semibold'>Weekly Activity</h4>
          <p className='text-[10px] text-muted-foreground'>Tasks completed per day</p>
        </div>
        <span className='text-lg font-bold text-foreground'>{bars.reduce((a, b) => a + b, 0)}</span>
      </div>
      <div className='relative'>
        {[100, 50, 0].map((tick) => (
          <div key={tick} className='absolute left-0 right-0 flex items-center' style={{ bottom: `${(tick / 100) * 80}px` }}>
            <span className='text-[8px] text-muted-foreground/40 w-5 text-right mr-1.5'>{Math.round(max * tick / 100)}</span>
            <div className='flex-1 h-px bg-border/30' />
          </div>
        ))}
        <div className='flex items-end gap-1 h-20 ml-7'>
          {bars.map((h, i) => (
            <div key={i} className='flex-1 flex flex-col items-center gap-1 relative' onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <div className={cn('w-full rounded-t transition-all cursor-pointer', hovered === i ? 'bg-primary shadow-sm' : 'bg-primary/70')} style={{ height: `${(h / max) * 100}%` }} />
              {hovered === i && (
                <div className='absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-foreground text-background text-[9px] font-medium whitespace-nowrap z-10'>
                  {h} tasks
                </div>
              )}
              <span className='text-[8px] text-muted-foreground'>{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Chat ────────────────────────────────────────────────────────────────────
export function DemoChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I\'m your AI assistant. How can I help you today?', time: '2:30 PM' },
    { role: 'user', text: 'Can you show me how to use the Button component?', time: '2:31 PM' },
    { role: 'assistant', text: 'Sure! Here\'s a basic example:\n\n<Button variant="default">Click me</Button>\n\nYou can use variants like "outline", "secondary", "destructive", and "ghost".', time: '2:31 PM' },
  ]);
  const [input, setInput] = useState('');
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
    setTimeout(() => setMessages((prev) => [...prev, { role: 'assistant', text: 'That\'s a great question! Let me help you with that.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]), 800);
  };
  return (
    <div className='w-full max-w-sm rounded-xl border border-border bg-card flex flex-col h-[340px]'>
      <div className='px-4 py-2.5 border-b border-border flex items-center gap-2.5'>
        <div className='w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-bold text-primary'>AI</div>
        <div className='flex-1'><div className='text-xs font-semibold'>AI Assistant</div><div className='text-[10px] text-emerald-500 flex items-center gap-1'><span className='w-1.5 h-1.5 rounded-full bg-emerald-500' />Online</div></div>
        <button className='w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground text-xs'>···</button>
      </div>
      <div className='flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin'>
        {messages.map((msg, i) => (
          <div key={i} className={cn('flex gap-2', msg.role === 'user' && 'flex-row-reverse')}>
            {msg.role === 'assistant' && <div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary shrink-0 mt-0.5'>AI</div>}
            <div className={cn('rounded-xl px-3 py-2 text-xs max-w-[80%] leading-relaxed', msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm')}>
              {msg.text.split('\n').map((line, li) => <React.Fragment key={li}>{li > 0 && <br />}{line.startsWith('<') ? <code className='px-1 py-0.5 rounded bg-background/20 text-[10px] font-mono'>{line}</code> : line}</React.Fragment>)}
              <div className={cn('text-[9px] mt-1', msg.role === 'user' ? 'text-primary-foreground/50' : 'text-muted-foreground/50')}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='px-3 py-2 border-t border-border flex gap-2 items-end'>
        <button className='w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground shrink-0'>
          <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13' /></svg>
        </button>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} className='flex-1 h-8 px-3 rounded-lg border border-input bg-background text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring' placeholder='Type a message...' />
        <button onClick={handleSend} className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 transition-colors', input.trim() ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
          <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M12 19V5m0 0l-7 7m7-7l7 7' /></svg>
        </button>
      </div>
    </div>
  );
}

// ─── Code Block ──────────────────────────────────────────────────────────────
export function DemoCodeBlock() {
  return (
    <div className='w-full max-w-[256px] rounded-lg border border-border overflow-hidden'>
      <div className='flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800'>
        <span className='w-2 h-2 rounded-full bg-zinc-700' /><span className='w-2 h-2 rounded-full bg-zinc-700' /><span className='w-2 h-2 rounded-full bg-zinc-700' />
        <span className='text-[10px] text-zinc-500 font-mono ml-1'>example.tsx</span>
      </div>
      <pre className='p-3 bg-zinc-950 text-xs font-mono leading-relaxed'>
        <span className='text-purple-400'>import</span><span className='text-zinc-300'> {'{'} Button {'}'} </span><span className='text-purple-400'>from</span><span className='text-green-400'> "@adhar-ui"</span>{'\n'}
        {'\n'}
        <span className='text-purple-400'>export default</span><span className='text-zinc-300'> () {'=> ('}</span>{'\n'}
        <span className='text-zinc-300'>  {'<'}</span><span className='text-red-400'>Button</span><span className='text-zinc-300'>{'>'}</span><span className='text-zinc-300'>Click</span><span className='text-zinc-300'>{'</'}</span><span className='text-red-400'>Button</span><span className='text-zinc-300'>{'>'}</span>{'\n'}
        <span className='text-zinc-300'>{')'}</span>
      </pre>
    </div>
  );
}

// ─── Color Picker ────────────────────────────────────────────────────────────
export function DemoColorPicker() {
  const [color, setColor] = useState('#4f46e5');
  const presets = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#4f46e5', '#8b5cf6', '#ec4899'];
  return (
    <div className='w-full max-w-[192px] space-y-2'>
      <div className='h-24 rounded-lg border border-border' style={{ background: color }} />
      <div className='flex flex-wrap gap-1.5'>
        {presets.map((c) => <button key={c} onClick={() => setColor(c)} className={cn('w-6 h-6 rounded-full border-2 transition-all', color === c ? 'border-foreground scale-110' : 'border-transparent')} style={{ background: c }} />)}
      </div>
      <input value={color} onChange={(e) => setColor(e.target.value)} className='w-full h-8 px-2 rounded border border-input bg-background text-xs font-mono' />
    </div>
  );
}

// ─── Combobox ────────────────────────────────────────────────────────────────
export function DemoCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const items = ['React', 'Vue', 'Solid', 'Svelte', 'Angular'];
  return (
    <div className='relative w-48'>
      <button onClick={() => setOpen(!open)} className='w-full h-9 px-3 rounded-md border border-input bg-background text-sm text-left flex items-center justify-between'>
        <span className={value ? 'text-foreground' : 'text-muted-foreground'}>{value || 'Select...'}</span>
        <span className='text-muted-foreground text-xs'>▾</span>
      </button>
      {open && (
        <div className='absolute top-full left-0 w-full mt-1 rounded-md border border-border bg-popover p-1 shadow-lg z-50'>
          <input className='w-full h-7 px-2 mb-1 rounded border border-input bg-background text-xs' placeholder='Search...' />
          {items.map((item) => (
            <button key={item} onClick={() => { setValue(item); setOpen(false); }} className='w-full text-left px-2 py-1.5 text-xs rounded hover:bg-accent transition-colors'>{item}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Command ─────────────────────────────────────────────────────────────────
export function DemoCommand() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const groups = [
    { title: 'Pages', items: [
      { icon: '🏠', label: 'Home', shortcut: '⌘H' },
      { icon: '📊', label: 'Dashboard', shortcut: '⌘D' },
      { icon: '⚙️', label: 'Settings', shortcut: '⌘,' },
    ]},
    { title: 'Components', items: [
      { icon: '◇', label: 'Button', shortcut: '' },
      { icon: '◇', label: 'Dialog', shortcut: '' },
      { icon: '◇', label: 'Data Table', shortcut: '' },
    ]},
    { title: 'Actions', items: [
      { icon: '🔍', label: 'Search docs...', shortcut: '⌘K' },
      { icon: '🌙', label: 'Toggle dark mode', shortcut: '⌘⇧D' },
      { icon: '📋', label: 'Copy current URL', shortcut: '⌘⇧C' },
    ]},
  ];
  const allItems = groups.flatMap((g) => g.items);
  const filtered = query ? groups.map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())) })).filter((g) => g.items.length > 0) : groups;
  let globalIdx = 0;
  return (
    <div className='w-full max-w-xs rounded-xl border border-border bg-card shadow-lg overflow-hidden'>
      <div className='flex items-center gap-2 px-3 py-2.5 border-b border-border'>
        <svg className='w-4 h-4 text-muted-foreground shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /></svg>
        <input value={query} onChange={(e) => { setQuery(e.target.value); setSelected(0); }} className='flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none' placeholder='Type a command or search...' />
        <kbd className='text-[9px] px-1.5 py-0.5 rounded border border-border bg-muted text-muted-foreground/60 font-mono'>ESC</kbd>
      </div>
      <div className='max-h-[200px] overflow-y-auto p-1 scrollbar-thin'>
        {filtered.length === 0 && <div className='py-6 text-center text-xs text-muted-foreground'>No results found.</div>}
        {filtered.map((group) => (
          <div key={group.title}>
            <div className='px-2 py-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-wider'>{group.title}</div>
            {group.items.map((item) => {
              const idx = globalIdx++;
              return (
                <button key={item.label} onMouseEnter={() => setSelected(idx)} className={cn('w-full text-left px-2.5 py-2 rounded-md text-xs flex items-center gap-2.5 transition-colors', selected === idx ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground')}>
                  <span className='text-sm'>{item.icon}</span>
                  <span className='flex-1 font-medium'>{item.label}</span>
                  {item.shortcut && <span className='text-[10px] text-muted-foreground/40 font-mono'>{item.shortcut}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className='px-3 py-1.5 border-t border-border bg-muted/10 flex items-center justify-between text-[10px] text-muted-foreground'>
        <span>↑↓ Navigate</span>
        <span>↵ Select</span>
        <span>esc Close</span>
      </div>
    </div>
  );
}

// ─── Context Menu ────────────────────────────────────────────────────────────
export function DemoContextMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div className='relative'>
      <div
        className='w-52 h-28 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-xs text-muted-foreground select-none cursor-context-menu hover:border-primary/30 transition-colors'
        onContextMenu={(e) => { e.preventDefault(); setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); setOpen(true); }}
      >Right-click here</div>
      {open && (
        <>
          <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />
          <div className='absolute z-50 w-40 rounded-md border border-border bg-popover p-1 shadow-lg' style={{ left: pos.x, top: pos.y }}>
            {['Cut', 'Copy', 'Paste'].map((a) => <button key={a} onClick={() => setOpen(false)} className='w-full text-left px-2 py-1.5 text-xs rounded hover:bg-accent transition-colors'>{a}</button>)}
            <div className='h-px bg-border my-1 -mx-1' />
            <button onClick={() => setOpen(false)} className='w-full text-left px-2 py-1.5 text-xs rounded hover:bg-accent text-destructive transition-colors'>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Copy Button ─────────────────────────────────────────────────────────────
export function DemoCopyButton() {
  const [copied, setCopied] = useState(false);
  return (
    <div className='flex items-center gap-2'>
      <code className='text-xs bg-muted px-2 py-1 rounded font-mono'>npm install @adhar-ui/react</code>
      <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className='h-7 w-7 rounded border border-input flex items-center justify-center hover:bg-muted transition-colors'>
        <span className='text-xs'>{copied ? '✓' : '⎘'}</span>
      </button>
    </div>
  );
}

// ─── Data Table ──────────────────────────────────────────────────────────────
export function DemoDataTable() {
  const [sortCol, setSortCol] = useState<string>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const data = [
    { id: 'INV-001', customer: 'Alice Chen', status: 'Paid', method: 'Credit Card', amount: 250 },
    { id: 'INV-002', customer: 'Bob Smith', status: 'Pending', method: 'PayPal', amount: 150 },
    { id: 'INV-003', customer: 'Carol Davis', status: 'Failed', method: 'Bank Transfer', amount: 350 },
    { id: 'INV-004', customer: 'Dan Wilson', status: 'Paid', method: 'Credit Card', amount: 450 },
    { id: 'INV-005', customer: 'Eve Brown', status: 'Pending', method: 'Stripe', amount: 200 },
  ];
  const sorted = [...data].sort((a, b) => {
    const av = (a as any)[sortCol], bv = (b as any)[sortCol];
    const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });
  const toggleSort = (col: string) => { if (sortCol === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortCol(col); setSortDir('asc'); } };
  const toggleCheck = (id: string) => setChecked((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => setChecked(checked.size === data.length ? new Set() : new Set(data.map((d) => d.id)));
  const statusColor: Record<string, string> = { Paid: 'bg-emerald-500/10 text-emerald-600', Pending: 'bg-amber-500/10 text-amber-600', Failed: 'bg-red-500/10 text-red-600' };
  const SortIcon = ({ col }: { col: string }) => (
    <svg className={cn('w-3 h-3 ml-0.5 inline', sortCol === col ? 'text-foreground' : 'text-muted-foreground/30')} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
      <path strokeLinecap='round' d={sortCol === col && sortDir === 'desc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'} />
    </svg>
  );
  return (
    <div className='w-full max-w-lg space-y-2'>
      <div className='flex items-center justify-between'>
        <div className='relative w-40'>
          <svg className='absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /></svg>
          <input placeholder='Filter...' className='w-full h-7 pl-7 pr-2 rounded-md border border-input bg-background text-[11px] focus:outline-none focus:ring-1 focus:ring-ring' />
        </div>
        {checked.size > 0 && <span className='text-[10px] text-muted-foreground'>{checked.size} selected</span>}
      </div>
      <div className='overflow-x-auto rounded-lg border border-border'>
        <table className='w-full text-[11px]'>
          <thead><tr className='border-b bg-muted/20'>
            <th className='w-8 px-2 py-2'><CheckboxControl checked={checked.size === data.length} onChange={toggleAll} /></th>
            {[{ key: 'id', label: 'Invoice' }, { key: 'customer', label: 'Customer' }, { key: 'status', label: 'Status' }, { key: 'method', label: 'Method' }, { key: 'amount', label: 'Amount' }].map((col) => (
              <th key={col.key} className={cn('px-2.5 py-2 font-medium cursor-pointer hover:text-foreground select-none', col.key === 'amount' ? 'text-right' : 'text-left')} onClick={() => toggleSort(col.key)}>
                {col.label}<SortIcon col={col.key} />
              </th>
            ))}
          </tr></thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={r.id} className={cn('border-b last:border-0 transition-colors', checked.has(r.id) ? 'bg-primary/5' : i % 2 ? 'bg-muted/5' : '', 'hover:bg-muted/10')}>
                <td className='w-8 px-2 py-1.5'><CheckboxControl checked={checked.has(r.id)} onChange={() => toggleCheck(r.id)} /></td>
                <td className='px-2.5 py-1.5 font-mono font-medium'>{r.id}</td>
                <td className='px-2.5 py-1.5'>{r.customer}</td>
                <td className='px-2.5 py-1.5'><span className={cn('px-1.5 py-0.5 rounded-full text-[9px] font-semibold', statusColor[r.status])}>{r.status}</span></td>
                <td className='px-2.5 py-1.5 text-muted-foreground'>{r.method}</td>
                <td className='px-2.5 py-1.5 text-right font-medium'>${r.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-between text-[10px] text-muted-foreground'>
        <span>Showing {data.length} of {data.length} results</span>
        <div className='flex items-center gap-1'>
          <button className='h-6 px-2 rounded border border-input hover:bg-muted text-[10px]'>Previous</button>
          <button className='h-6 w-6 rounded bg-primary text-primary-foreground text-[10px] font-medium'>1</button>
          <button className='h-6 px-2 rounded border border-input hover:bg-muted text-[10px]'>Next</button>
        </div>
      </div>
    </div>
  );
}

// ─── Date Picker ─────────────────────────────────────────────────────────────
export function DemoDatePicker() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<number | null>(null);
  return (
    <div className='relative'>
      <button onClick={() => setOpen(!open)} className='h-9 px-3 rounded-md border border-input bg-background text-sm flex items-center gap-2 hover:bg-muted transition-colors'>
        <svg className='w-4 h-4 text-muted-foreground' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><rect x='3' y='4' width='18' height='18' rx='2'/><path d='M16 2v4M8 2v4M3 10h18'/></svg>
        <span className={date ? 'text-foreground' : 'text-muted-foreground'}>{date ? `March ${date}, 2026` : 'Pick a date'}</span>
      </button>
      {open && (
        <>
          <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />
          <div className='absolute top-full left-0 mt-1 z-50 w-56 rounded-lg border border-border bg-popover p-3 shadow-lg'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs font-medium'>March 2026</span>
            </div>
            <div className='grid grid-cols-7 gap-0.5 text-center'>
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => <div key={d} className='text-[9px] text-muted-foreground py-0.5'>{d}</div>)}
              {Array.from({ length: 6 }, (_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: 28 }, (_, i) => (
                <button key={i} onClick={() => { setDate(i + 1); setOpen(false); }} className={cn('w-6 h-6 rounded text-[10px] transition-colors', date === i + 1 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted')}>{i + 1}</button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Drawer ──────────────────────────────────────────────────────────────────
export function DemoDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SingleButton variant='outline' size='sm' onClick={() => setOpen(true)}>Open Drawer</SingleButton>
      {open && (
        <div className='fixed inset-0 z-50'>
          <div className='fixed inset-0 bg-black/60' onClick={() => setOpen(false)} />
          <div className='fixed left-0 top-0 h-full w-72 bg-background border-r border-border p-6 shadow-lg z-50'>
            <h3 className='text-base font-semibold mb-1'>Navigation</h3>
            <p className='text-xs text-muted-foreground mb-4'>Browse the app sections.</p>
            <nav className='space-y-1'>
              {['Home', 'Dashboard', 'Settings', 'Help'].map((item) => (
                <button key={item} onClick={() => setOpen(false)} className='w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors'>{item}</button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
export function DemoEmptyState() {
  return (
    <div className='w-full max-w-[224px] text-center py-8'>
      <div className='w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center'>
        <svg className='w-6 h-6 text-muted-foreground' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}><path strokeLinecap='round' strokeLinejoin='round' d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' /></svg>
      </div>
      <h3 className='text-sm font-medium mb-1'>No results</h3>
      <p className='text-xs text-muted-foreground mb-3'>Try adjusting your search or filters.</p>
      <SingleButton size='sm'>Clear filters</SingleButton>
    </div>
  );
}

// ─── Feedback Buttons ────────────────────────────────────────────────────────
export function DemoFeedbackButtons() {
  const [vote, setVote] = useState<'up'|'down'|null>(null);
  return (
    <div className='flex items-center gap-1'>
      <span className='text-xs text-muted-foreground mr-2'>Was this helpful?</span>
      <button onClick={() => setVote('up')} className={cn('h-8 w-8 rounded-md border text-sm flex items-center justify-center transition-colors', vote === 'up' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600' : 'border-input hover:bg-muted')}>👍</button>
      <button onClick={() => setVote('down')} className={cn('h-8 w-8 rounded-md border text-sm flex items-center justify-center transition-colors', vote === 'down' ? 'bg-red-500/10 border-red-500/30 text-red-600' : 'border-input hover:bg-muted')}>👎</button>
    </div>
  );
}

// ─── File Upload ─────────────────────────────────────────────────────────────
export function DemoFileUpload() {
  return (
    <div className='w-full max-w-[224px] rounded-lg border-2 border-dashed border-border hover:border-primary/30 p-6 text-center transition-colors cursor-pointer'>
      <svg className='w-8 h-8 mx-auto text-muted-foreground mb-2' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}><path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5' /></svg>
      <p className='text-xs font-medium'>Drop files here</p>
      <p className='text-[10px] text-muted-foreground mt-0.5'>PNG, JPG up to 10MB</p>
    </div>
  );
}

// ─── Form ────────────────────────────────────────────────────────────────────
export function DemoForm() {
  return (
    <form className='w-56 space-y-3' onSubmit={(e) => e.preventDefault()}>
      <div><label className='text-xs font-medium'>Name</label><input className='mt-1 w-full h-8 px-2 rounded-md border border-input bg-background text-xs' placeholder='John Doe' /></div>
      <div><label className='text-xs font-medium'>Email</label><input className='mt-1 w-full h-8 px-2 rounded-md border border-input bg-background text-xs' placeholder='john@example.com' /></div>
      <SingleButton size='sm' className='w-full'>Submit</SingleButton>
    </form>
  );
}

// ─── Form Builder ────────────────────────────────────────────────────────────
export function DemoFormBuilder() {
  return (
    <div className='w-full max-w-[224px] space-y-2'>
      <div className='text-xs font-medium mb-2'>Form Fields</div>
      {['Text Input', 'Email', 'Dropdown'].map((f) => (
        <div key={f} className='flex items-center gap-2 p-2 rounded border border-border bg-card text-xs cursor-grab hover:shadow-sm transition-shadow'>
          <span className='text-muted-foreground'>⠿</span>{f}
        </div>
      ))}
      <button className='w-full h-7 rounded border-2 border-dashed border-border text-[10px] text-muted-foreground hover:border-primary/30 transition-colors'>+ Add field</button>
    </div>
  );
}

// ─── Input OTP ───────────────────────────────────────────────────────────────
export function DemoInputOTP() {
  return (
    <div className='flex items-center gap-1.5'>
      {[1,2,3].map((i) => <input key={i} maxLength={1} className='w-10 h-10 rounded-md border border-input bg-background text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-ring' defaultValue={i === 1 ? '4' : i === 2 ? '2' : ''} />)}
      <span className='text-muted-foreground mx-1'>-</span>
      {[4,5,6].map((i) => <input key={i} maxLength={1} className='w-10 h-10 rounded-md border border-input bg-background text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-ring' />)}
    </div>
  );
}

// ─── Kanban Board ────────────────────────────────────────────────────────────
export function DemoKanbanBoard() {
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-zinc-500', tasks: [
      { id: '1', title: 'Design landing page', tag: 'Design', tagColor: 'bg-violet-500/10 text-violet-600', assignee: 'AC', priority: 'High', priorityColor: 'text-red-500' },
      { id: '2', title: 'Write API documentation', tag: 'Docs', tagColor: 'bg-blue-500/10 text-blue-600', assignee: 'BS', priority: 'Medium', priorityColor: 'text-amber-500' },
    ]},
    { id: 'progress', title: 'In Progress', color: 'bg-blue-500', tasks: [
      { id: '3', title: 'Build authentication flow', tag: 'Backend', tagColor: 'bg-emerald-500/10 text-emerald-600', assignee: 'CD', priority: 'High', priorityColor: 'text-red-500' },
      { id: '4', title: 'Create component tests', tag: 'QA', tagColor: 'bg-amber-500/10 text-amber-600', assignee: 'DW', priority: 'Low', priorityColor: 'text-emerald-500' },
    ]},
    { id: 'done', title: 'Done', color: 'bg-emerald-500', tasks: [
      { id: '5', title: 'Setup CI/CD pipeline', tag: 'DevOps', tagColor: 'bg-cyan-500/10 text-cyan-600', assignee: 'AC', priority: 'Medium', priorityColor: 'text-amber-500' },
    ]},
  ];
  return (
    <div className='w-full overflow-x-auto pb-2'>
      <div className='flex gap-3 min-w-max'>
        {columns.map((col) => (
          <div key={col.id} className='w-[200px] shrink-0 rounded-lg bg-muted/20 border border-border/60'>
            <div className='px-3 py-2.5 flex items-center gap-2'>
              <span className={cn('w-2 h-2 rounded-full', col.color)} />
              <span className='text-[11px] font-semibold text-foreground flex-1'>{col.title}</span>
              <span className='text-[10px] text-muted-foreground/50 bg-muted rounded-full w-5 h-5 flex items-center justify-center'>{col.tasks.length}</span>
            </div>
            <div className='px-2 pb-2 space-y-2'>
              {col.tasks.map((task) => (
                <div key={task.id} className='rounded-lg border border-border bg-card p-3 cursor-pointer hover:shadow-sm hover:border-primary/20 transition-all'>
                  <p className='text-[11px] font-medium text-foreground mb-2 leading-snug'>{task.title}</p>
                  <div className='flex items-center justify-between'>
                    <span className={cn('text-[9px] px-1.5 py-0.5 rounded-full font-medium', task.tagColor)}>{task.tag}</span>
                    <div className='flex items-center gap-1.5'>
                      <span className={cn('text-[10px]', task.priorityColor)}>●</span>
                      <div className='w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground'>{task.assignee}</div>
                    </div>
                  </div>
                </div>
              ))}
              <button className='w-full h-8 rounded-md border border-dashed border-border/60 text-[10px] text-muted-foreground hover:bg-muted/30 hover:border-primary/20 transition-colors flex items-center justify-center gap-1'>
                <span className='text-sm'>+</span> Add task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Menubar ─────────────────────────────────────────────────────────────────
export function DemoMenubar() {
  return (
    <div className='inline-flex items-center rounded-md border border-border bg-card p-0.5 gap-0.5'>
      {['File', 'Edit', 'View', 'Help'].map((item) => (
        <button key={item} className='px-2.5 py-1 text-xs font-medium rounded hover:bg-muted transition-colors'>{item}</button>
      ))}
    </div>
  );
}

// ─── Message Bubble ──────────────────────────────────────────────────────────
export function DemoMessageBubble() {
  return (
    <div className='space-y-2 max-w-xs'>
      <div className='bg-muted rounded-lg rounded-tl-sm px-3 py-2 text-xs max-w-[80%]'>Hello! How are you?</div>
      <div className='bg-primary text-primary-foreground rounded-lg rounded-tr-sm px-3 py-2 text-xs max-w-[80%] ml-auto'>I'm doing great, thanks!</div>
    </div>
  );
}

// ─── Model Selector ──────────────────────────────────────────────────────────
export function DemoModelSelector() {
  const [model, setModel] = useState('gpt-4');
  return (
    <div className='inline-flex items-center rounded-md border border-border bg-card p-0.5'>
      {['gpt-4', 'gpt-3.5', 'claude'].map((m) => (
        <button key={m} onClick={() => setModel(m)} className={cn('px-2.5 py-1 text-[11px] font-medium rounded transition-colors', model === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}>{m}</button>
      ))}
    </div>
  );
}

// ─── Multi Select ────────────────────────────────────────────────────────────
export function DemoMultiSelect() {
  const [selected, setSelected] = useState(['React']);
  const toggle = (v: string) => setSelected((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v]);
  return (
    <div className='w-full max-w-[192px] space-y-2'>
      <div className='flex flex-wrap gap-1 min-h-[32px] p-1.5 rounded-md border border-input bg-background'>
        {selected.map((s) => <span key={s} className='inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium'>{s}<button onClick={() => toggle(s)} className='hover:text-destructive'>×</button></span>)}
      </div>
      <div className='flex flex-wrap gap-1'>
        {['React', 'Vue', 'Solid', 'Svelte'].map((f) => (
          <button key={f} onClick={() => toggle(f)} className={cn('px-2 py-1 rounded text-[10px] border transition-colors', selected.includes(f) ? 'border-primary bg-primary/10 text-primary' : 'border-input hover:bg-muted')}>{f}</button>
        ))}
      </div>
    </div>
  );
}

// ─── Navigation Menu ─────────────────────────────────────────────────────────
export function DemoNavigationMenu() {
  return (
    <nav className='flex items-center gap-1 p-1 rounded-lg border border-border bg-card'>
      {['Getting Started', 'Components', 'Docs'].map((item, i) => (
        <button key={item} className={cn('px-3 py-1.5 rounded-md text-xs font-medium transition-colors', i === 0 ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>{item}</button>
      ))}
    </nav>
  );
}

// ─── Prompt Input ────────────────────────────────────────────────────────────
export function DemoPromptInput() {
  return (
    <div className='w-full max-w-[256px] flex items-end gap-2 p-2 rounded-lg border border-border bg-card'>
      <textarea className='flex-1 min-h-[32px] max-h-20 resize-none bg-transparent text-xs placeholder:text-muted-foreground focus:outline-none' placeholder='Ask anything...' rows={1} />
      <button className='h-7 w-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs shrink-0'>↑</button>
    </div>
  );
}

// ─── Resizable ───────────────────────────────────────────────────────────────
export function DemoResizable() {
  return (
    <div className='w-full max-w-[256px] flex rounded-lg border border-border overflow-hidden h-24'>
      <div className='flex-1 p-3 bg-card'><span className='text-xs text-muted-foreground'>Panel 1</span></div>
      <div className='w-1.5 bg-border cursor-col-resize hover:bg-primary/30 transition-colors' />
      <div className='flex-1 p-3 bg-card'><span className='text-xs text-muted-foreground'>Panel 2</span></div>
    </div>
  );
}

// ─── Responsive Sidebar ──────────────────────────────────────────────────────
export function DemoResponsiveSidebar() {
  return (
    <div className='w-full max-w-[192px] rounded-lg border border-border bg-card h-36 flex flex-col'>
      <div className='px-3 py-2 border-b border-border flex items-center gap-1.5'>
        <div className='w-4 h-4 rounded bg-primary flex items-center justify-center'><span className='text-white text-[8px] font-bold'>A</span></div>
        <span className='text-[10px] font-semibold'>App</span>
      </div>
      <nav className='flex-1 p-1.5 space-y-0.5'>
        {['Home', 'Projects', 'Settings'].map((item, i) => (
          <button key={item} className={cn('w-full text-left px-2 py-1 rounded text-[10px] transition-colors', i === 0 ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted')}>{item}</button>
        ))}
      </nav>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
export function DemoSidebar() {
  const [active, setActive] = useState('inbox');
  return (
    <div className='w-full max-w-[208px] rounded-lg border border-border bg-card h-40 flex flex-col'>
      <div className='px-3 py-2 border-b border-border text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>Navigation</div>
      <nav className='flex-1 p-1.5 space-y-0.5'>
        {[{ id: 'inbox', label: 'Inbox', count: '24' }, { id: 'sent', label: 'Sent' }, { id: 'drafts', label: 'Drafts', count: '3' }, { id: 'trash', label: 'Trash' }].map((item) => (
          <button key={item.id} onClick={() => setActive(item.id)} className={cn('w-full text-left px-2.5 py-1 rounded text-[11px] flex items-center justify-between', active === item.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted')}>
            {item.label}
            {item.count && <span className={cn('text-[9px] px-1 rounded-full', active === item.id ? 'bg-primary/20 text-primary' : 'bg-muted')}>{item.count}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}

// ─── Split View ──────────────────────────────────────────────────────────────
export function DemoSplitView() {
  return (
    <div className='w-full max-w-[288px] flex rounded-lg border border-border overflow-hidden h-28'>
      <div className='flex-[2] p-3 bg-card border-r border-border'>
        <div className='text-[10px] font-medium mb-1'>Editor</div>
        <div className='text-[10px] text-muted-foreground font-mono leading-relaxed'>const x = 42;</div>
      </div>
      <div className='w-1.5 bg-border/50 cursor-col-resize hover:bg-primary/20 transition-colors shrink-0' />
      <div className='flex-1 p-3 bg-muted/20'>
        <div className='text-[10px] font-medium mb-1'>Preview</div>
        <div className='text-[10px] text-muted-foreground'>Output: 42</div>
      </div>
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
export function DemoStatCard() {
  return (
    <div className='flex gap-2'>
      {[{ label: 'Revenue', value: '$12.5k', change: '+12%' }, { label: 'Users', value: '1,234', change: '+8%' }].map((s) => (
        <div key={s.label} className='w-28 rounded-lg border border-border bg-card p-3'>
          <p className='text-[10px] text-muted-foreground'>{s.label}</p>
          <p className='text-base font-bold mt-0.5'>{s.value}</p>
          <p className='text-[10px] text-emerald-500 font-medium'>{s.change}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Stepper ─────────────────────────────────────────────────────────────────
export function DemoStepper() {
  return (
    <div className='flex items-center gap-1'>
      {['Account', 'Profile', 'Review'].map((step, i) => (
        <React.Fragment key={step}>
          {i > 0 && <div className={cn('w-8 h-0.5 rounded', i <= 1 ? 'bg-primary' : 'bg-border')} />}
          <div className='flex items-center gap-1.5'>
            <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold', i <= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>{i + 1}</div>
            <span className={cn('text-[10px]', i <= 1 ? 'font-medium' : 'text-muted-foreground')}>{step}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Streaming Text ──────────────────────────────────────────────────────────
export function DemoStreamingText() {
  return (
    <div className='w-full max-w-[224px] p-3 rounded-lg border border-border bg-card'>
      <p className='text-xs leading-relaxed'>The quick brown fox jumps over the lazy dog<span className='inline-block w-0.5 h-3.5 bg-primary ml-0.5 animate-pulse' /></p>
    </div>
  );
}

// ─── Suggestion Chips ────────────────────────────────────────────────────────
export function DemoSuggestionChips() {
  return (
    <div className='flex flex-wrap gap-1.5 max-w-xs'>
      {['Tell me a joke', 'Summarize this', 'Translate to French', 'Write code'].map((s) => (
        <button key={s} className='px-2.5 py-1 rounded-full border border-border text-[10px] font-medium hover:bg-muted hover:border-primary/20 transition-colors'>{s}</button>
      ))}
    </div>
  );
}

// ─── Thinking Indicator ──────────────────────────────────────────────────────
export function DemoThinkingIndicator() {
  return (
    <div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 w-fit'>
      <div className='flex gap-1'>
        <span className='w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce' />
        <span className='w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0.15s]' />
        <span className='w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0.3s]' />
      </div>
      <span className='text-xs text-muted-foreground'>Thinking...</span>
    </div>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────────
export function DemoTimeline() {
  return (
    <div className='space-y-0 max-w-xs'>
      {[{ t: 'Created', d: '2 hours ago' }, { t: 'Updated', d: '1 hour ago' }, { t: 'Published', d: 'Just now' }].map((item, i) => (
        <div key={item.t} className='flex gap-3'>
          <div className='flex flex-col items-center'>
            <div className={cn('w-2.5 h-2.5 rounded-full border-2 mt-1', i === 2 ? 'bg-primary border-primary' : 'bg-background border-border')} />
            {i < 2 && <div className='w-0.5 h-8 bg-border' />}
          </div>
          <div className='pb-4'><p className='text-xs font-medium'>{item.t}</p><p className='text-[10px] text-muted-foreground'>{item.d}</p></div>
        </div>
      ))}
    </div>
  );
}

// ─── Toggle Group ────────────────────────────────────────────────────────────
export function DemoToggleGroup() {
  const [active, setActive] = useState('left');
  return (
    <div className='inline-flex items-center rounded-md border border-border p-0.5'>
      {[{ id: 'left', icon: '≡' }, { id: 'center', icon: '≡' }, { id: 'right', icon: '≡' }].map((item) => (
        <button key={item.id} onClick={() => setActive(item.id)} className={cn('h-8 w-8 rounded-sm flex items-center justify-center text-sm transition-colors', active === item.id ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground')}>{item.icon}</button>
      ))}
    </div>
  );
}

// ─── Token Counter ───────────────────────────────────────────────────────────
export function DemoTokenCounter() {
  return (
    <div className='flex items-center gap-3 px-3 py-1.5 rounded-md bg-muted/30 border border-border w-fit'>
      <span className='text-[10px] text-muted-foreground'>Tokens</span>
      <span className='text-xs font-mono font-medium'>1,247 / 4,096</span>
      <div className='w-16 h-1.5 rounded-full bg-secondary'><div className='h-full rounded-full bg-primary w-[30%]' /></div>
    </div>
  );
}

// ─── Transfer List ───────────────────────────────────────────────────────────
export function DemoTransferList() {
  return (
    <div className='flex items-center gap-2'>
      <div className='w-28 rounded border border-border p-1.5'>
        <div className='text-[10px] font-medium mb-1 px-1'>Available</div>
        {['Item A', 'Item B'].map((i) => <div key={i} className='px-1.5 py-1 text-[10px] rounded hover:bg-muted cursor-pointer'>{i}</div>)}
      </div>
      <div className='flex flex-col gap-1'>
        <button className='w-6 h-6 rounded border border-input flex items-center justify-center text-[10px] hover:bg-muted'>→</button>
        <button className='w-6 h-6 rounded border border-input flex items-center justify-center text-[10px] hover:bg-muted'>←</button>
      </div>
      <div className='w-28 rounded border border-border p-1.5'>
        <div className='text-[10px] font-medium mb-1 px-1'>Selected</div>
        {['Item C'].map((i) => <div key={i} className='px-1.5 py-1 text-[10px] rounded hover:bg-muted cursor-pointer'>{i}</div>)}
      </div>
    </div>
  );
}

// ─── Tree View ───────────────────────────────────────────────────────────────
export function DemoTreeView() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['src', 'components']));
  const toggle = (id: string) => setExpanded((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const [selected, setSelected] = useState('button.tsx');

  const TreeItem = ({ id, label, icon, children, depth = 0 }: { id: string; label: string; icon: string; children?: React.ReactNode; depth?: number }) => {
    const isFolder = !!children;
    const isOpen = expanded.has(id);
    const isSel = selected === id;
    return (
      <div>
        <button
          onClick={() => { if (isFolder) toggle(id); else setSelected(id); }}
          className={cn('w-full text-left flex items-center gap-1.5 py-[3px] px-1.5 rounded-md text-xs transition-colors', isSel && !isFolder ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50')}
          style={{ paddingLeft: `${depth * 12 + 6}px` }}
        >
          {isFolder ? (
            <svg className={cn('w-3 h-3 text-muted-foreground/50 transition-transform shrink-0', isOpen && 'rotate-90')} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M9 5l7 7-7 7' /></svg>
          ) : <span className='w-3' />}
          <span className='text-xs shrink-0'>{icon}</span>
          <span className={cn('truncate', isSel && !isFolder ? 'font-medium' : '')}>{label}</span>
        </button>
        {isFolder && isOpen && <div>{children}</div>}
      </div>
    );
  };

  return (
    <div className='w-full max-w-[220px] rounded-lg border border-border bg-card p-1.5'>
      <TreeItem id='src' label='src' icon='📁' depth={0}>
        <TreeItem id='components' label='components' icon='📁' depth={1}>
          <TreeItem id='ui' label='ui' icon='📁' depth={2}>
            <TreeItem id='button.tsx' label='button.tsx' icon='⚛' depth={3} />
            <TreeItem id='card.tsx' label='card.tsx' icon='⚛' depth={3} />
            <TreeItem id='dialog.tsx' label='dialog.tsx' icon='⚛' depth={3} />
          </TreeItem>
          <TreeItem id='icons.tsx' label='icons.tsx' icon='⚛' depth={2} />
        </TreeItem>
        <TreeItem id='lib' label='lib' icon='📁' depth={1}>
          <TreeItem id='utils.ts' label='utils.ts' icon='📄' depth={2} />
        </TreeItem>
        <TreeItem id='app.tsx' label='app.tsx' icon='⚛' depth={1} />
        <TreeItem id='globals.css' label='globals.css' icon='🎨' depth={1} />
      </TreeItem>
      <TreeItem id='package.json' label='package.json' icon='📄' depth={0} />
      <TreeItem id='tsconfig.json' label='tsconfig.json' icon='⚙' depth={0} />
    </div>
  );
}

// ─── Rich Text Editor ────────────────────────────────────────────────────────
export function DemoRichTextEditor() {
  const [activeFormat, setActiveFormat] = useState<Set<string>>(new Set(['B']));
  const toggleFormat = (f: string) => setActiveFormat((p) => { const n = new Set(p); n.has(f) ? n.delete(f) : n.add(f); return n; });
  const toolGroups = [
    [
      { id: 'B', label: 'B', title: 'Bold' },
      { id: 'I', label: 'I', title: 'Italic', className: 'italic' },
      { id: 'U', label: 'U', title: 'Underline', className: 'underline' },
      { id: 'S', label: 'S', title: 'Strikethrough', className: 'line-through' },
    ],
    [
      { id: 'h1', label: 'H1', title: 'Heading 1' },
      { id: 'h2', label: 'H2', title: 'Heading 2' },
      { id: 'p', label: '¶', title: 'Paragraph' },
    ],
    [
      { id: 'ul', label: '•', title: 'Bullet list' },
      { id: 'ol', label: '1.', title: 'Numbered list' },
      { id: 'quote', label: '"', title: 'Blockquote' },
    ],
    [
      { id: 'code', label: '⟨⟩', title: 'Code' },
      { id: 'link', label: '🔗', title: 'Link' },
      { id: 'img', label: '🖼', title: 'Image' },
    ],
  ];
  return (
    <div className='w-full max-w-sm rounded-lg border border-border overflow-hidden bg-card'>
      <div className='flex flex-wrap items-center gap-px px-1.5 py-1 border-b border-border bg-muted/10'>
        {toolGroups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <div className='w-px h-5 bg-border mx-1' />}
            {group.map((tool) => (
              <button
                key={tool.id}
                title={tool.title}
                onClick={() => toggleFormat(tool.id)}
                className={cn(
                  'w-7 h-7 rounded text-[11px] flex items-center justify-center transition-colors',
                  (tool as any).className,
                  activeFormat.has(tool.id) ? 'bg-accent text-accent-foreground font-bold' : 'hover:bg-muted text-muted-foreground',
                )}
              >{tool.label}</button>
            ))}
          </React.Fragment>
        ))}
        <div className='flex-1' />
        <select className='h-6 px-1.5 rounded border border-input bg-background text-[10px] text-muted-foreground'>
          <option>Normal</option><option>Heading 1</option><option>Heading 2</option><option>Code</option>
        </select>
      </div>
      <div className='p-4 min-h-[120px] text-sm leading-relaxed focus-within:ring-1 focus-within:ring-ring outline-none' contentEditable suppressContentEditableWarning>
        <h2 className='text-base font-bold mb-2'>Getting Started</h2>
        <p className='mb-2'>Welcome to <strong>Adhar UI</strong> — the open-source design system. This editor supports <em>rich text formatting</em>, lists, and code blocks.</p>
        <ul className='list-disc pl-5 mb-2 space-y-0.5'>
          <li>A complete component library across every major framework</li>
          <li>Curated theme presets with dark mode</li>
          <li>Full accessibility support</li>
        </ul>
        <blockquote className='border-l-2 border-primary/30 pl-3 italic text-muted-foreground text-xs'>
          "Own your components. Ship to any framework."
        </blockquote>
      </div>
      <div className='px-3 py-1.5 border-t border-border bg-muted/5 flex items-center justify-between text-[10px] text-muted-foreground'>
        <span>142 words</span>
        <span>Markdown supported</span>
      </div>
    </div>
  );
}

// ─── Sortable List (Drag & Drop) ─────────────────────────────────────────────
export function DemoSortableList() {
  const [items, setItems] = useState([
    { text: 'Design landing page', priority: 'High', color: 'bg-red-500' },
    { text: 'Write API docs', priority: 'Medium', color: 'bg-amber-500' },
    { text: 'Setup CI/CD', priority: 'Low', color: 'bg-emerald-500' },
    { text: 'Code review', priority: 'Medium', color: 'bg-amber-500' },
  ]);
  const [dragging, setDragging] = useState<number | null>(null);
  return (
    <div className='w-full max-w-xs space-y-1'>
      <p className='text-[10px] text-muted-foreground mb-2 flex items-center gap-1'>
        <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4' /></svg>
        Drag items to reorder
      </p>
      {items.map((item, i) => (
        <div
          key={item.text}
          draggable
          onDragStart={() => setDragging(i)}
          onDragOver={(e) => { e.preventDefault(); }}
          onDragEnd={() => setDragging(null)}
          onDrop={() => {
            if (dragging === null) return;
            const next = [...items];
            const [moved] = next.splice(dragging, 1);
            next.splice(i, 0, moved);
            setItems(next);
            setDragging(null);
          }}
          className={cn('flex items-center gap-2.5 px-3 py-2.5 rounded-lg border bg-card text-xs cursor-grab active:cursor-grabbing transition-all hover:shadow-sm', dragging === i ? 'opacity-50 border-primary shadow-md scale-[1.02]' : 'border-border')}
        >
          <svg className='w-3.5 h-3.5 text-muted-foreground/30 shrink-0' fill='currentColor' viewBox='0 0 24 24'><circle cx='9' cy='5' r='1.5' /><circle cx='15' cy='5' r='1.5' /><circle cx='9' cy='12' r='1.5' /><circle cx='15' cy='12' r='1.5' /><circle cx='9' cy='19' r='1.5' /><circle cx='15' cy='19' r='1.5' /></svg>
          <span className='flex-1 font-medium'>{item.text}</span>
          <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', item.color)} />
        </div>
      ))}
    </div>
  );
}

// ─── Tag Input ───────────────────────────────────────────────────────────────
export function DemoTagInput() {
  const [tags, setTags] = useState(['React', 'TypeScript']);
  const [input, setInput] = useState('');
  return (
    <div className='w-56'>
      <div className='flex flex-wrap gap-1 p-2 rounded-md border border-input bg-background min-h-[40px]'>
        {tags.map((tag) => (
          <span key={tag} className='inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-medium'>
            {tag}
            <button onClick={() => setTags(tags.filter((t) => t !== tag))} className='hover:text-destructive text-[10px]'>×</button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && input.trim()) { setTags([...tags, input.trim()]); setInput(''); } }}
          placeholder={tags.length ? '' : 'Add tag...'}
          className='flex-1 min-w-[60px] bg-transparent text-xs focus:outline-none'
        />
      </div>
    </div>
  );
}

// ─── Avatar Group ────────────────────────────────────────────────────────────
export function DemoAvatarGroup() {
  const people = ['AC', 'BS', 'CD', 'DW', 'EF'];
  return (
    <div className='flex -space-x-2'>
      {people.slice(0, 3).map((initials) => (
        <div key={initials} className='w-9 h-9 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-semibold text-muted-foreground'>{initials}</div>
      ))}
      <div className='w-9 h-9 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-medium text-muted-foreground'>+{people.length - 3}</div>
    </div>
  );
}

// ─── Search Input ────────────────────────────────────────────────────────────
export function DemoSearchInput() {
  const [value, setValue] = useState('');
  return (
    <div className='relative w-56'>
      <svg className='absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /></svg>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Search...' className='w-full h-9 pl-8 pr-8 rounded-md border border-input bg-background text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2' />
      {value && <button onClick={() => setValue('')} className='absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground hover:text-foreground'>×</button>}
      <kbd className='absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] px-1 py-0.5 rounded border border-border bg-muted text-muted-foreground/60 font-mono hidden sm:inline' style={{ display: value ? 'none' : undefined }}>⌘K</kbd>
    </div>
  );
}

// ─── Number Input ────────────────────────────────────────────────────────────
export function DemoNumberInput() {
  const [value, setValue] = useState(1);
  return (
    <div className='flex items-center border border-input rounded-md overflow-hidden w-32'>
      <button onClick={() => setValue(Math.max(0, value - 1))} className='w-9 h-9 flex items-center justify-center text-muted-foreground hover:bg-muted text-sm border-r border-input'>−</button>
      <input type='number' value={value} onChange={(e) => setValue(Number(e.target.value))} className='flex-1 h-9 text-center text-sm bg-background focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
      <button onClick={() => setValue(value + 1)} className='w-9 h-9 flex items-center justify-center text-muted-foreground hover:bg-muted text-sm border-l border-input'>+</button>
    </div>
  );
}

// ─── Area Chart ──────────────────────────────────────────────────────────────
export function DemoAreaChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = [20, 40, 35, 60, 45, 70, 85, 65, 90, 75];
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const max = Math.max(...data);
  const w = 260, h = 100, padL = 28, padB = 16;
  const pts = data.map((v, i) => ({ x: padL + (i / (data.length - 1)) * (w - padL), y: (h - padB) - (v / max) * (h - padB - 8) }));
  const pointsStr = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath = `M${padL},${h - padB} L${pointsStr} L${w},${h - padB} Z`;
  return (
    <div className='w-full max-w-xs rounded-lg border border-border bg-card p-4'>
      <div className='flex items-center justify-between mb-2'>
        <h4 className='text-xs font-semibold'>Revenue Trend</h4>
        <span className='text-[10px] text-emerald-500 font-medium'>+23%</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className='w-full h-auto'>
        <defs><linearGradient id='area-g' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stopColor='hsl(var(--primary))' stopOpacity='0.2' /><stop offset='100%' stopColor='hsl(var(--primary))' stopOpacity='0' /></linearGradient></defs>
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = (h - padB) - (tick / 100) * (h - padB - 8);
          return <line key={tick} x1={padL} y1={y} x2={w} y2={y} stroke='hsl(var(--border))' strokeWidth='0.5' strokeDasharray='2 2' />;
        })}
        <path d={areaPath} fill='url(#area-g)' />
        <polyline points={pointsStr} fill='none' stroke='hsl(var(--primary))' strokeWidth='2' strokeLinejoin='round' strokeLinecap='round' />
        {pts.map((p, i) => (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <circle cx={p.x} cy={p.y} r={hovered === i ? 4 : 2.5} fill={hovered === i ? 'hsl(var(--primary))' : 'hsl(var(--background))'} stroke='hsl(var(--primary))' strokeWidth='1.5' className='transition-all cursor-pointer' />
            {hovered === i && <text x={p.x} y={p.y - 8} textAnchor='middle' className='text-[8px] font-semibold fill-foreground'>${data[i]}k</text>}
          </g>
        ))}
        {labels.filter((_, i) => i % 2 === 0).map((l, i) => <text key={l} x={padL + (i * 2 / (data.length - 1)) * (w - padL)} y={h - 2} textAnchor='middle' className='text-[7px] fill-muted-foreground'>{l}</text>)}
      </svg>
    </div>
  );
}

// ─── Bar Chart ───────────────────────────────────────────────────────────────
export function DemoBarChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = [
    { label: 'Jan', a: 40, b: 24 }, { label: 'Feb', a: 65, b: 45 }, { label: 'Mar', a: 45, b: 35 },
    { label: 'Apr', a: 80, b: 55 }, { label: 'May', a: 55, b: 40 }, { label: 'Jun', a: 70, b: 50 },
  ];
  const max = Math.max(...data.map((d) => d.a));
  return (
    <div className='w-full max-w-xs rounded-lg border border-border bg-card p-4'>
      <div className='flex items-center justify-between mb-2'>
        <h4 className='text-xs font-semibold'>Sales vs Target</h4>
        <div className='flex items-center gap-3'>
          <span className='flex items-center gap-1 text-[9px] text-muted-foreground'><span className='w-2 h-2 rounded-sm bg-primary' />Sales</span>
          <span className='flex items-center gap-1 text-[9px] text-muted-foreground'><span className='w-2 h-2 rounded-sm bg-primary/30' />Target</span>
        </div>
      </div>
      <div className='flex items-end gap-1.5 h-24'>
        {data.map((d, i) => (
          <div key={d.label} className='flex-1 flex flex-col items-center gap-0.5' onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div className='w-full flex gap-px justify-center' style={{ height: `${(d.a / max) * 100}%` }}>
              <div className='flex-1 rounded-t bg-primary/30' style={{ height: `${(d.b / d.a) * 100}%`, marginTop: 'auto' }} />
              <div className={cn('flex-1 rounded-t transition-all', hovered === i ? 'bg-primary shadow-sm' : 'bg-primary/70')} />
            </div>
            <span className='text-[8px] text-muted-foreground'>{d.label}</span>
            {hovered === i && <span className='text-[8px] font-semibold text-foreground -mt-0.5'>{d.a}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Line Chart ──────────────────────────────────────────────────────────────
export function DemoLineChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const series = [
    { name: 'Users', data: [30, 45, 40, 60, 55, 70, 65], color: 'hsl(var(--primary))' },
    { name: 'Sessions', data: [20, 35, 50, 45, 65, 55, 80], color: '#22c55e' },
  ];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const max = 100;
  const w = 240, h = 90, padL = 24, padB = 14;
  const pts = (d: number[]) => d.map((v, i) => ({ x: padL + (i / (d.length - 1)) * (w - padL), y: (h - padB) - (v / max) * (h - padB - 6) }));
  return (
    <div className='w-full max-w-xs rounded-lg border border-border bg-card p-4'>
      <div className='flex items-center justify-between mb-2'>
        <h4 className='text-xs font-semibold'>Weekly Overview</h4>
        <div className='flex items-center gap-3'>
          {series.map((s) => <span key={s.name} className='flex items-center gap-1 text-[9px] text-muted-foreground'><span className='w-3 h-0.5 rounded' style={{ background: s.color }} />{s.name}</span>)}
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className='w-full h-auto'>
        {[0, 50, 100].map((tick) => {
          const y = (h - padB) - (tick / 100) * (h - padB - 6);
          return <line key={tick} x1={padL} y1={y} x2={w} y2={y} stroke='hsl(var(--border))' strokeWidth='0.5' strokeDasharray='2 2' />;
        })}
        {series.map((s) => {
          const p = pts(s.data);
          return <polyline key={s.name} points={p.map((pt) => `${pt.x},${pt.y}`).join(' ')} fill='none' stroke={s.color} strokeWidth='2' strokeLinejoin='round' strokeLinecap='round' />;
        })}
        {pts(series[0].data).map((p, i) => (
          <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <line x1={p.x} y1={6} x2={p.x} y2={h - padB} stroke={hovered === i ? 'hsl(var(--border))' : 'transparent'} strokeWidth='0.5' />
            {series.map((s) => { const sp = pts(s.data)[i]; return <circle key={s.name} cx={sp.x} cy={sp.y} r={hovered === i ? 3 : 0} fill={s.color} className='transition-all' />; })}
            {hovered === i && <text x={p.x} y={4} textAnchor='middle' className='text-[7px] font-semibold fill-foreground'>{labels[i]}</text>}
          </g>
        ))}
        {labels.map((l, i) => <text key={l} x={padL + (i / (labels.length - 1)) * (w - padL)} y={h - 1} textAnchor='middle' className='text-[7px] fill-muted-foreground'>{l}</text>)}
      </svg>
    </div>
  );
}

// ─── Pie Chart ───────────────────────────────────────────────────────────────
export function DemoPieChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = [
    { label: 'Desktop', pct: 55, color: 'hsl(var(--primary))', value: '$12.5k' },
    { label: 'Mobile', pct: 30, color: '#22c55e', value: '$6.8k' },
    { label: 'Tablet', pct: 15, color: '#f59e0b', value: '$3.4k' },
  ];
  let cum = 0;
  return (
    <div className='w-full max-w-xs rounded-lg border border-border bg-card p-4'>
      <h4 className='text-xs font-semibold mb-3'>Traffic Sources</h4>
      <div className='flex items-center gap-5'>
        <div className='relative'>
          <svg viewBox='0 0 36 36' className='w-24 h-24'>
            {data.map((d, i) => {
              const start = cum;
              cum += d.pct;
              return (
                <circle key={d.label} cx='18' cy='18' r='15.915' fill='none' stroke={d.color}
                  strokeWidth={hovered === i ? 6 : 4.5} strokeDasharray={`${d.pct} ${100 - d.pct}`}
                  strokeDashoffset={-start} transform='rotate(-90 18 18)'
                  className='transition-all cursor-pointer' style={{ opacity: hovered !== null && hovered !== i ? 0.3 : 1 }}
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} />
              );
            })}
            <circle cx='18' cy='18' r='11' fill='hsl(var(--card))' />
            <text x='18' y='17' textAnchor='middle' className='text-[5px] font-bold fill-foreground'>
              {hovered !== null ? `${data[hovered].pct}%` : '100%'}
            </text>
            <text x='18' y='22' textAnchor='middle' className='text-[3.5px] fill-muted-foreground'>
              {hovered !== null ? data[hovered].label : 'Total'}
            </text>
          </svg>
        </div>
        <div className='space-y-2 flex-1'>
          {data.map((d, i) => (
            <div key={d.label} className={cn('flex items-center gap-2 cursor-pointer transition-opacity', hovered !== null && hovered !== i ? 'opacity-40' : '')}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <span className='w-2.5 h-2.5 rounded-full shrink-0' style={{ background: d.color }} />
              <div className='flex-1'>
                <div className='text-[11px] font-medium'>{d.label}</div>
                <div className='text-[9px] text-muted-foreground'>{d.value}</div>
              </div>
              <span className='text-[11px] font-semibold tabular-nums'>{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Notification ────────────────────────────────────────────────────────────
export function DemoNotification() {
  return (
    <div className='w-full max-w-[256px] rounded-lg border border-border bg-card'>
      <div className='px-3 py-2 border-b border-border flex items-center justify-between'>
        <span className='text-xs font-semibold'>Notifications</span>
        <span className='text-[10px] px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-medium'>3</span>
      </div>
      {[
        { title: 'New comment', desc: 'Alice commented on your PR', time: '2m', read: false },
        { title: 'Deploy complete', desc: 'Production deploy succeeded', time: '1h', read: false },
        { title: 'Welcome', desc: 'Thanks for joining!', time: '2d', read: true },
      ].map((n) => (
        <div key={n.title} className={cn('px-3 py-2.5 border-b border-border last:border-0 flex items-start gap-2', !n.read && 'bg-primary/5')}>
          {!n.read && <span className='w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0' />}
          <div className={cn('flex-1 min-w-0', n.read && 'ml-3.5')}>
            <p className='text-xs font-medium truncate'>{n.title}</p>
            <p className='text-[10px] text-muted-foreground truncate'>{n.desc}</p>
          </div>
          <span className='text-[9px] text-muted-foreground shrink-0'>{n.time}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Image ───────────────────────────────────────────────────────────────────
export function DemoImage() {
  return (
    <div className='w-full max-w-[192px] rounded-lg overflow-hidden border border-border'>
      <div className='aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center'>
        <svg className='w-8 h-8 text-primary/40' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
          <rect x='3' y='3' width='18' height='18' rx='2' />
          <circle cx='8.5' cy='8.5' r='1.5' />
          <path d='m21 15-5-5L5 21' />
        </svg>
      </div>
      <div className='px-3 py-2'>
        <p className='text-xs font-medium'>Image Component</p>
        <p className='text-[10px] text-muted-foreground'>Lazy loaded with fallback</p>
      </div>
    </div>
  );
}

// ─── Radar Chart ─────────────────────────────────────────────────────────────
export function DemoRadarChart() {
  const axes = ['Speed', 'Power', 'Range', 'Defense', 'Accuracy'];
  const values = [80, 65, 90, 50, 75];
  const n = axes.length;
  const cx = 80, cy = 80, r = 60;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i: number, pct: number) => ({
    x: cx + Math.cos(angle(i)) * r * (pct / 100),
    y: cy + Math.sin(angle(i)) * r * (pct / 100),
  });
  const dataPath = values.map((v, i) => { const p = point(i, v); return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`; }).join(' ') + ' Z';

  return (
    <div className='w-48'>
      <svg viewBox='0 0 160 160' className='w-full h-auto'>
        {[20, 40, 60, 80, 100].map((pct) => (
          <polygon key={pct} points={Array.from({ length: n }, (_, i) => { const p = point(i, pct); return `${p.x},${p.y}`; }).join(' ')} fill='none' stroke='hsl(var(--border))' strokeWidth='0.5' />
        ))}
        {axes.map((_, i) => { const p = point(i, 100); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke='hsl(var(--border))' strokeWidth='0.5' />; })}
        <path d={dataPath} fill='hsl(var(--primary))' fillOpacity='0.15' stroke='hsl(var(--primary))' strokeWidth='1.5' />
        {values.map((v, i) => { const p = point(i, v); return <circle key={i} cx={p.x} cy={p.y} r='2.5' fill='hsl(var(--primary))' />; })}
        {axes.map((label, i) => { const p = point(i, 115); return <text key={label} x={p.x} y={p.y} textAnchor='middle' dominantBaseline='middle' className='text-[7px] fill-muted-foreground'>{label}</text>; })}
      </svg>
    </div>
  );
}

// ─── Scatter Chart ───────────────────────────────────────────────────────────
export function DemoScatterChart() {
  const data = [
    { x: 10, y: 30 }, { x: 25, y: 50 }, { x: 40, y: 20 }, { x: 55, y: 65 },
    { x: 70, y: 40 }, { x: 85, y: 75 }, { x: 30, y: 55 }, { x: 60, y: 35 },
    { x: 45, y: 70 }, { x: 15, y: 45 }, { x: 75, y: 60 }, { x: 90, y: 80 },
  ];
  return (
    <div className='w-56'>
      <svg viewBox='0 0 220 100' className='w-full h-auto'>
        <line x1='20' y1='85' x2='210' y2='85' stroke='hsl(var(--border))' strokeWidth='0.5' />
        <line x1='20' y1='5' x2='20' y2='85' stroke='hsl(var(--border))' strokeWidth='0.5' />
        {data.map((d, i) => (
          <circle key={i} cx={20 + d.x * 2} cy={85 - d.y} r='4' fill='hsl(var(--primary))' fillOpacity='0.6' stroke='hsl(var(--primary))' strokeWidth='1' />
        ))}
      </svg>
    </div>
  );
}

// ─── Gauge Chart ─────────────────────────────────────────────────────────────
export function DemoGaugeChart() {
  const value = 72;
  const circumference = Math.PI * 70;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className='w-32 text-center'>
      <svg viewBox='0 0 100 60' className='w-full h-auto'>
        <path d='M15 55 A35 35 0 0 1 85 55' fill='none' stroke='hsl(var(--muted))' strokeWidth='8' strokeLinecap='round' />
        <path d='M15 55 A35 35 0 0 1 85 55' fill='none' stroke='hsl(var(--primary))' strokeWidth='8' strokeLinecap='round' strokeDasharray={`${(value / 100) * 110} 110`} />
        <text x='50' y='48' textAnchor='middle' className='text-[16px] font-bold fill-foreground'>{value}%</text>
        <text x='50' y='58' textAnchor='middle' className='text-[7px] fill-muted-foreground'>CPU Usage</text>
      </svg>
    </div>
  );
}

// ─── Candlestick Chart ───────────────────────────────────────────────────────
export function DemoCandlestickChart() {
  const data = [
    { o: 40, h: 65, l: 35, c: 60 }, { o: 60, h: 70, l: 45, c: 50 },
    { o: 50, h: 80, l: 48, c: 75 }, { o: 75, h: 85, l: 55, c: 58 },
    { o: 58, h: 72, l: 50, c: 68 }, { o: 68, h: 90, l: 62, c: 85 },
    { o: 85, h: 95, l: 70, c: 72 }, { o: 72, h: 88, l: 65, c: 82 },
  ];
  const max = 100;
  return (
    <div className='w-56'>
      <svg viewBox='0 0 200 90' className='w-full h-auto'>
        {data.map((d, i) => {
          const x = 15 + i * 24;
          const green = d.c >= d.o;
          const color = green ? '#22c55e' : '#ef4444';
          const top = Math.min(d.o, d.c);
          const bot = Math.max(d.o, d.c);
          return (
            <g key={i}>
              <line x1={x} y1={85 - (d.h / max) * 80} x2={x} y2={85 - (d.l / max) * 80} stroke={color} strokeWidth='1' />
              <rect x={x - 5} y={85 - (bot / max) * 80} width='10' height={Math.max(1, ((bot - top) / max) * 80)} fill={color} rx='1' />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Heatmap ─────────────────────────────────────────────────────────────────
export function DemoHeatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = ['9am', '12pm', '3pm', '6pm'];
  const data = [
    [2, 5, 8, 3], [6, 9, 4, 7], [3, 7, 10, 5], [8, 4, 6, 9], [5, 8, 3, 2],
  ];
  const max = 10;
  return (
    <div className='w-56'>
      <div className='flex'>
        <div className='flex flex-col justify-around pr-1.5 py-0.5'>
          {days.map((d) => <span key={d} className='text-[8px] text-muted-foreground h-5 flex items-center'>{d}</span>)}
        </div>
        <div className='flex-1'>
          <div className='flex mb-1'>
            {hours.map((h) => <span key={h} className='flex-1 text-center text-[8px] text-muted-foreground'>{h}</span>)}
          </div>
          <div className='grid gap-0.5' style={{ gridTemplateColumns: `repeat(${hours.length}, 1fr)`, gridTemplateRows: `repeat(${days.length}, 20px)` }}>
            {data.flatMap((row, ri) => row.map((val, ci) => (
              <div key={`${ri}-${ci}`} className='rounded-sm' style={{ backgroundColor: `hsl(var(--primary) / ${0.1 + (val / max) * 0.8})` }} title={`${days[ri]} ${hours[ci]}: ${val}`} />
            )))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sparkline ───────────────────────────────────────────────────────────────
export function DemoSparkline() {
  const datasets = [
    { label: 'Revenue', data: [20, 35, 25, 45, 40, 55, 50], color: 'hsl(var(--primary))', change: '+12%' },
    { label: 'Users', data: [30, 25, 40, 35, 50, 45, 60], color: '#22c55e', change: '+8%' },
    { label: 'Errors', data: [15, 25, 20, 10, 15, 8, 5], color: '#ef4444', change: '-47%' },
  ];
  return (
    <div className='flex gap-3'>
      {datasets.map((ds) => {
        const max = Math.max(...ds.data);
        const pts = ds.data.map((v, i) => `${(i / (ds.data.length - 1)) * 60},${24 - (v / max) * 20}`).join(' ');
        return (
          <div key={ds.label} className='rounded-lg border border-border bg-card p-2.5 w-28'>
            <div className='text-[9px] text-muted-foreground'>{ds.label}</div>
            <div className='flex items-end justify-between'>
              <svg viewBox='0 0 60 28' className='w-12 h-5 mt-1'>
                <polyline points={pts} fill='none' stroke={ds.color} strokeWidth='1.5' strokeLinejoin='round' />
              </svg>
              <span className={cn('text-[10px] font-semibold', ds.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500')}>{ds.change}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Treemap ─────────────────────────────────────────────────────────────────
export function DemoTreemap() {
  const data = [
    { label: 'src', pct: 40, color: 'hsl(var(--primary))' },
    { label: 'node_modules', pct: 30, color: '#f59e0b' },
    { label: 'dist', pct: 15, color: '#22c55e' },
    { label: 'public', pct: 10, color: '#06b6d4' },
    { label: 'config', pct: 5, color: '#8b5cf6' },
  ];
  return (
    <div className='w-56'>
      <div className='flex flex-wrap gap-0.5 rounded-lg overflow-hidden' style={{ height: 100 }}>
        {data.map((d) => (
          <div key={d.label} className='flex items-end p-1.5 rounded-sm' style={{ backgroundColor: d.color, width: `${d.pct}%`, opacity: 0.8, flexGrow: 1, minWidth: 30 }}>
            <span className='text-[8px] text-white font-medium leading-tight'>{d.label}<br />{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Funnel Chart ────────────────────────────────────────────────────────────
export function DemoFunnelChart() {
  const data = [
    { label: 'Visitors', value: 5000 },
    { label: 'Leads', value: 3200 },
    { label: 'Qualified', value: 1800 },
    { label: 'Proposals', value: 900 },
    { label: 'Closed', value: 450 },
  ];
  const max = data[0].value;
  return (
    <div className='w-full max-w-xs space-y-1'>
      {data.map((d, i) => {
        const widthPct = 40 + (d.value / max) * 60;
        const opacity = 0.4 + (1 - i / data.length) * 0.6;
        return (
          <div key={d.label} className='flex items-center gap-2'>
            <div className='rounded-sm h-6 flex items-center justify-center mx-auto' style={{ width: `${widthPct}%`, backgroundColor: `hsl(var(--primary) / ${opacity})` }}>
              <span className='text-[9px] font-medium text-primary-foreground'>{d.value.toLocaleString()}</span>
            </div>
            <span className='text-[9px] text-muted-foreground w-16 shrink-0'>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Drag and Drop ───────────────────────────────────────────────────────────
export function DemoDragAndDrop() {
  const [lists, setLists] = useState<{ todo: string[]; done: string[] }>({
    todo: ['Design homepage', 'Write tests', 'Setup deploy'],
    done: ['Create repo', 'Init project'],
  });
  const [draggingItem, setDraggingItem] = useState<{ item: string; from: 'todo' | 'done' } | null>(null);
  const [dragOver, setDragOver] = useState<'todo' | 'done' | null>(null);

  const handleDragStart = (item: string, from: 'todo' | 'done') => {
    setDraggingItem({ item, from });
  };

  const handleDrop = (to: 'todo' | 'done') => {
    if (!draggingItem) return;
    const { item, from } = draggingItem;
    if (from === to) { setDraggingItem(null); setDragOver(null); return; }
    setLists((prev) => ({
      ...prev,
      [from]: prev[from].filter((i) => i !== item),
      [to]: [...prev[to], item],
    }));
    setDraggingItem(null);
    setDragOver(null);
  };

  const renderZone = (id: 'todo' | 'done', title: string, items: string[], color: string, dotColor: string) => (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(id); }}
      onDragLeave={() => setDragOver(null)}
      onDrop={() => handleDrop(id)}
      className={cn(
        'flex-1 min-w-[140px] rounded-lg border-2 border-dashed p-2.5 transition-all min-h-[140px]',
        dragOver === id ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border/60 bg-muted/5',
      )}
    >
      <div className='flex items-center gap-1.5 mb-2 px-1'>
        <span className={cn('w-2 h-2 rounded-full', dotColor)} />
        <span className='text-[10px] font-semibold uppercase tracking-wider text-muted-foreground'>{title}</span>
        <span className='text-[9px] text-muted-foreground/50 ml-auto'>{items.length}</span>
      </div>
      <div className='space-y-1'>
        {items.map((item) => (
          <div
            key={item}
            draggable
            onDragStart={() => handleDragStart(item, id)}
            className={cn(
              'flex items-center gap-2 px-2.5 py-2 rounded-md border bg-card text-[11px] cursor-grab active:cursor-grabbing transition-all hover:shadow-sm',
              draggingItem?.item === item ? 'opacity-40 border-primary scale-95' : 'border-border',
            )}
          >
            <svg className='w-3 h-3 text-muted-foreground/30 shrink-0' fill='currentColor' viewBox='0 0 24 24'>
              <circle cx='9' cy='5' r='1.5' /><circle cx='15' cy='5' r='1.5' />
              <circle cx='9' cy='12' r='1.5' /><circle cx='15' cy='12' r='1.5' />
              <circle cx='9' cy='19' r='1.5' /><circle cx='15' cy='19' r='1.5' />
            </svg>
            <span className='flex-1 font-medium'>{item}</span>
          </div>
        ))}
        {items.length === 0 && (
          <div className='flex items-center justify-center h-16 text-[10px] text-muted-foreground/40 italic'>
            Drop items here
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className='w-full max-w-sm'>
      <p className='text-[10px] text-muted-foreground mb-2 flex items-center gap-1.5'>
        <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4' />
        </svg>
        Drag items between zones
      </p>
      <div className='flex gap-2.5'>
        {renderZone('todo', 'To Do', lists.todo, 'text-blue-500', 'bg-blue-500')}
        {renderZone('done', 'Done', lists.done, 'text-emerald-500', 'bg-emerald-500')}
      </div>
    </div>
  );
}

export { cn };
