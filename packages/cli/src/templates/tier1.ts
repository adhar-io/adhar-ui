// deno-lint-ignore-file
/**
 * Tier 1: Core Primitive component templates.
 * shadcn/ui parity - all 39 components.
 * Each value is the full React source that gets copied to the user's project.
 */

export const tier1Templates: Record<string, string> = {
  // ─── Form Controls ────────────────────────────────────────────────────

  'button': `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
`,

  'input': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
`,

  'textarea': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

export { Textarea }
`,

  'label': `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70')

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof labelVariants>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn(labelVariants(), className)} {...props} />
  )
)
Label.displayName = 'Label'

export { Label }
`,

  'checkbox': `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary',
        className
      )}
      onChange={(e) => { onChange?.(e); onCheckedChange?.(e.target.checked) }}
      {...props}
    />
  )
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
`,

  'radio-group': `import * as React from 'react'
import { cn } from '@/lib/utils'

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroupContext = React.createContext<{ value?: string; onValueChange?: (v: string) => void }>({})

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, ...props }, ref) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} role="radiogroup" className={cn('grid gap-2', className)} {...props} />
    </RadioGroupContext.Provider>
  )
)
RadioGroup.displayName = 'RadioGroup'

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, ...props }, ref) => {
    const ctx = React.useContext(RadioGroupContext)
    return (
      <input
        type="radio"
        ref={ref}
        value={value}
        checked={ctx.value === value}
        onChange={() => ctx.onValueChange?.(value)}
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary',
          className
        )}
        {...props}
      />
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem }
`,

  'switch': `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onCheckedChange, ...props }, ref) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      ref={ref}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-primary' : 'bg-input',
        className
      )}
      {...props}
    >
      <span className={cn('pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform', checked ? 'translate-x-5' : 'translate-x-0')} />
    </button>
  )
)
Switch.displayName = 'Switch'

export { Switch }
`,

  'select': `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'24\\' height=\\'24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'%3E%3Cpath d=\\'m6 9 6 6 6-6\\'/%3E%3C/svg%3E")] bg-[length:1rem] bg-[right_0.5rem_center] bg-no-repeat pr-8',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
)
Select.displayName = 'Select'

const SelectGroup = React.forwardRef<HTMLOptGroupElement, React.OptgroupHTMLAttributes<HTMLOptGroupElement>>(
  (props, ref) => <optgroup ref={ref} {...props} />
)
SelectGroup.displayName = 'SelectGroup'

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  (props, ref) => <option ref={ref} {...props} />
)
SelectItem.displayName = 'SelectItem'

export { Select, SelectGroup, SelectItem }
`,

  'slider': `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, ...props }, ref) => (
    <input
      type="range"
      ref={ref}
      className={cn(
        'w-full h-2 cursor-pointer appearance-none rounded-full bg-secondary accent-primary disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Slider.displayName = 'Slider'

export { Slider }
`,

  'toggle': `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof toggleVariants> {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, pressed = false, onPressedChange, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      aria-pressed={pressed}
      data-state={pressed ? 'on' : 'off'}
      onClick={() => onPressedChange?.(!pressed)}
      className={cn(toggleVariants({ variant, size }), pressed && 'bg-accent text-accent-foreground', className)}
      {...props}
    />
  )
)
Toggle.displayName = 'Toggle'

export { Toggle, toggleVariants }
`,

  'toggle-group': `import * as React from 'react'
import { cn } from '@/lib/utils'

interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn('flex items-center justify-center gap-1', className)} {...props} />
  )
)
ToggleGroup.displayName = 'ToggleGroup'

interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground h-10 px-3',
        className
      )}
      {...props}
    />
  )
)
ToggleGroupItem.displayName = 'ToggleGroupItem'

export { ToggleGroup, ToggleGroupItem }
`,

  // ─── Display ──────────────────────────────────────────────────────────

  'badge': `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
`,

  'avatar': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)} {...props} />
  )
)
Avatar.displayName = 'Avatar'

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
  )
)
AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)} {...props} />
  )
)
AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }
`,

  'separator': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Separator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { orientation?: 'horizontal' | 'vertical'; decorative?: boolean }>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <div ref={ref} role={decorative ? 'none' : 'separator'} aria-orientation={!decorative ? orientation : undefined}
      className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)} {...props} />
  )
)
Separator.displayName = 'Separator'

export { Separator }
`,

  'skeleton': `import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
}

export { Skeleton }
`,

  'progress': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Progress = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value?: number; max?: number }>(
  ({ className, value = 0, max = 100, ...props }, ref) => (
    <div ref={ref} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)} {...props}>
      <div className="h-full w-full flex-1 bg-primary transition-all" style={{ transform: \`translateX(-\${100 - (value / max) * 100}%)\` }} />
    </div>
  )
)
Progress.displayName = 'Progress'

export { Progress }
`,

  'spinner': `import { cn } from '@/lib/utils'

const sizeClasses = { sm: 'h-4 w-4', default: 'h-6 w-6', lg: 'h-8 w-8' } as const

function Spinner({ className, size = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'default' | 'lg' }) {
  return (
    <div role="status" className={cn('animate-spin', sizeClasses[size], className)} {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <span className="sr-only">Loading</span>
    </div>
  )
}

export { Spinner }
`,

  'aspect-ratio': `import * as React from 'react'
import { cn } from '@/lib/utils'

const AspectRatio = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { ratio?: number }>(
  ({ className, ratio = 16 / 9, style, children, ...props }, ref) => (
    <div ref={ref} style={{ position: 'relative', paddingBottom: \`\${100 / ratio}%\`, ...style }} className={cn('w-full', className)} {...props}>
      <div className="absolute inset-0">{children}</div>
    </div>
  )
)
AspectRatio.displayName = 'AspectRatio'

export { AspectRatio }
`,

  // ─── Layout ───────────────────────────────────────────────────────────

  'card': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
`,

  'scroll-area': `import * as React from 'react'
import { cn } from '@/lib/utils'

const ScrollArea = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
      <div className="h-full w-full overflow-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">{children}</div>
    </div>
  )
)
ScrollArea.displayName = 'ScrollArea'

const ScrollBar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { orientation?: 'vertical' | 'horizontal' }>(
  ({ className, orientation = 'vertical', ...props }, ref) => (
    <div ref={ref} className={cn('flex touch-none select-none transition-colors', orientation === 'vertical' ? 'h-full w-2.5 border-l border-l-transparent p-[1px]' : 'h-2.5 flex-col border-t border-t-transparent p-[1px]', className)} {...props} />
  )
)
ScrollBar.displayName = 'ScrollBar'

export { ScrollArea, ScrollBar }
`,

  'collapsible': `import * as React from 'react'
import { cn } from '@/lib/utils'

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

function Collapsible({ open: controlledOpen, onOpenChange, defaultOpen = false, children, ...props }: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isOpen = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen
  return (
    <div data-state={isOpen ? 'open' : 'closed'} {...props}>
      {React.Children.map(children, (child: any) =>
        React.isValidElement(child) ? React.cloneElement(child as any, { 'data-open': isOpen, 'data-toggle': () => setOpen(!isOpen) }) : child
      )}
    </div>
  )
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { 'data-open'?: boolean; 'data-toggle'?: () => void }>(
  ({ className, onClick, 'data-toggle': toggle, ...props }, ref) => (
    <button type="button" ref={ref} className={cn(className)} onClick={(e) => { toggle?.(); onClick?.(e) }} {...props} />
  )
)
CollapsibleTrigger.displayName = 'CollapsibleTrigger'

const CollapsibleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { 'data-open'?: boolean }>(
  ({ className, 'data-open': open, ...props }, ref) => {
    if (!open) return null
    return <div ref={ref} className={cn('overflow-hidden transition-all', className)} {...props} />
  }
)
CollapsibleContent.displayName = 'CollapsibleContent'

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
`,

  'resizable': `import * as React from 'react'
import { cn } from '@/lib/utils'

const ResizablePanelGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { direction?: 'horizontal' | 'vertical' }>(
  ({ className, direction = 'horizontal', ...props }, ref) => (
    <div ref={ref} className={cn('flex h-full w-full', direction === 'vertical' ? 'flex-col' : 'flex-row', className)} {...props} />
  )
)
ResizablePanelGroup.displayName = 'ResizablePanelGroup'

const ResizablePanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { defaultSize?: number }>(
  ({ className, defaultSize, style, ...props }, ref) => (
    <div ref={ref} style={{ flexBasis: defaultSize ? \`\${defaultSize}%\` : undefined, ...style }} className={cn('flex-1 overflow-auto', className)} {...props} />
  )
)
ResizablePanel.displayName = 'ResizablePanel'

const ResizableHandle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-orientation=vertical]]:h-px [&[data-orientation=vertical]]:w-full', className)} {...props}>
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="9" r="1"/><circle cx="12" cy="15" r="1"/></svg>
      </div>
    </div>
  )
)
ResizableHandle.displayName = 'ResizableHandle'

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
`,

  // ─── Feedback ─────────────────────────────────────────────────────────

  'alert': `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  { variants: { variant: { default: 'bg-background text-foreground', destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive' } }, defaultVariants: { variant: 'default' } }
)

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
)
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription, alertVariants }
`,

  'alert-dialog': `import * as React from 'react'
import { cn } from '@/lib/utils'

const AlertDialogContext = React.createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} })

function AlertDialog({ children, open: co, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (v: boolean) => void }) {
  const [io, sio] = React.useState(false)
  return <AlertDialogContext.Provider value={{ open: co ?? io, setOpen: onOpenChange ?? sio }}>{children}</AlertDialogContext.Provider>
}

const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => { const { setOpen } = React.useContext(AlertDialogContext); return <button type="button" ref={ref} onClick={(e) => { setOpen(true); onClick?.(e) }} {...props} /> }
)
AlertDialogTrigger.displayName = 'AlertDialogTrigger'

function AlertDialogContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = React.useContext(AlertDialogContext)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80" onClick={() => setOpen(false)} />
      <div className={cn('relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg', className)} {...props}>{children}</div>
    </div>
  )
}

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>( ({ className, ...props }, ref) => <h2 ref={ref} className={cn('text-lg font-semibold', className)} {...props} />)
AlertDialogTitle.displayName = 'AlertDialogTitle'
const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>( ({ className, ...props }, ref) => <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />)
AlertDialogDescription.displayName = 'AlertDialogDescription'

function AlertDialogAction({ className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = React.useContext(AlertDialogContext)
  return <button type="button" className={cn('inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90', className)} onClick={(e) => { setOpen(false); onClick?.(e) }} {...props} />
}

function AlertDialogCancel({ className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = React.useContext(AlertDialogContext)
  return <button type="button" className={cn('inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground mt-2 sm:mt-0', className)} onClick={(e) => { setOpen(false); onClick?.(e) }} {...props} />
}

export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel }
`,

  'toast': `import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
export { toast } from 'sonner'
`,

  // ─── Overlay ──────────────────────────────────────────────────────────

  'dialog': `import * as React from 'react'
import { cn } from '@/lib/utils'

const DialogContext = React.createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} })

function Dialog({ children, open: co, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (v: boolean) => void }) {
  const [io, sio] = React.useState(false)
  return <DialogContext.Provider value={{ open: co ?? io, setOpen: onOpenChange ?? sio }}>{children}</DialogContext.Provider>
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => { const { setOpen } = React.useContext(DialogContext); return <button type="button" ref={ref} onClick={(e) => { setOpen(true); onClick?.(e) }} {...props} /> }
)
DialogTrigger.displayName = 'DialogTrigger'

function DialogContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = React.useContext(DialogContext)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 animate-in fade-in-0" onClick={() => setOpen(false)} />
      <div className={cn('relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg animate-in fade-in-0 zoom-in-95 sm:rounded-lg', className)} {...props}>
        {children}
        <button type="button" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" onClick={() => setOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}

function DialogClose({ onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = React.useContext(DialogContext)
  return <button type="button" onClick={(e) => { setOpen(false); onClick?.(e) }} {...props} />
}

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h2 ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />)
DialogTitle.displayName = 'DialogTitle'
const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />)
DialogDescription.displayName = 'DialogDescription'

export { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogFooter, DialogTitle, DialogDescription }
`,

  'sheet': `import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const SheetContext = React.createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} })

function Sheet({ children, open: co, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (v: boolean) => void }) {
  const [io, sio] = React.useState(false)
  return <SheetContext.Provider value={{ open: co ?? io, setOpen: onOpenChange ?? sio }}>{children}</SheetContext.Provider>
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => { const { setOpen } = React.useContext(SheetContext); return <button type="button" ref={ref} onClick={(e) => { setOpen(true); onClick?.(e) }} {...props} /> }
)
SheetTrigger.displayName = 'SheetTrigger'

const sheetVariants = cva('fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out', {
  variants: { side: {
    top: 'inset-x-0 top-0 border-b',
    bottom: 'inset-x-0 bottom-0 border-t',
    left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
    right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
  }},
  defaultVariants: { side: 'right' },
})

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sheetVariants> {}

function SheetContent({ className, side, children, ...props }: SheetContentProps) {
  const { open, setOpen } = React.useContext(SheetContext)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/80" onClick={() => setOpen(false)} />
      <div className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
        <button type="button" className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100" onClick={() => setOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h2 ref={ref} className={cn('text-lg font-semibold text-foreground', className)} {...props} />)
SheetTitle.displayName = 'SheetTitle'
const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />)
SheetDescription.displayName = 'SheetDescription'

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
`,

  'tooltip': `import * as React from 'react'
import { cn } from '@/lib/utils'

function TooltipProvider({ children }: { children: React.ReactNode }) { return <>{children}</> }

function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return <div className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
    {React.Children.map(children, (child: any) => React.isValidElement(child) ? React.cloneElement(child as any, { 'data-tooltip-open': open }) : child)}
  </div>
}

const TooltipTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ ...props }, ref) => <button type="button" ref={ref} {...props} />
)
TooltipTrigger.displayName = 'TooltipTrigger'

function TooltipContent({ className, 'data-tooltip-open': open, children, side = 'top', ...props }: React.HTMLAttributes<HTMLDivElement> & { 'data-tooltip-open'?: boolean; side?: 'top' | 'bottom' | 'left' | 'right' }) {
  if (!open) return null
  const sideClass = { top: 'bottom-full left-1/2 -translate-x-1/2 mb-2', bottom: 'top-full left-1/2 -translate-x-1/2 mt-2', left: 'right-full top-1/2 -translate-y-1/2 mr-2', right: 'left-full top-1/2 -translate-y-1/2 ml-2' }
  return <div role="tooltip" className={cn('absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95', sideClass[side], className)} {...props}>{children}</div>
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
`,

  'popover': `import * as React from 'react'
import { cn } from '@/lib/utils'

const PopoverContext = React.createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} })

function Popover({ children, open: co, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (v: boolean) => void }) {
  const [io, sio] = React.useState(false)
  return <PopoverContext.Provider value={{ open: co ?? io, setOpen: onOpenChange ?? sio }}><div className="relative inline-block">{children}</div></PopoverContext.Provider>
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => { const { open, setOpen } = React.useContext(PopoverContext); return <button type="button" ref={ref} aria-expanded={open} onClick={(e) => { setOpen(!open); onClick?.(e) }} {...props} /> }
)
PopoverTrigger.displayName = 'PopoverTrigger'

const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { align?: 'start' | 'center' | 'end' }>(
  ({ className, align = 'center', ...props }, ref) => {
    const { open } = React.useContext(PopoverContext)
    if (!open) return null
    const alignClass = { start: 'left-0', center: 'left-1/2 -translate-x-1/2', end: 'right-0' }
    return <div ref={ref} className={cn('absolute z-50 mt-2 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95', alignClass[align], className)} {...props} />
  }
)
PopoverContent.displayName = 'PopoverContent'

export { Popover, PopoverTrigger, PopoverContent }
`,

  'hover-card': `import * as React from 'react'
import { cn } from '@/lib/utils'

function HoverCard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return <div className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
    {React.Children.map(children, (child: any) => React.isValidElement(child) ? React.cloneElement(child as any, { 'data-hover-open': open }) : child)}
  </div>
}

const HoverCardTrigger = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  (props, ref) => <a ref={ref} {...props} />
)
HoverCardTrigger.displayName = 'HoverCardTrigger'

function HoverCardContent({ className, 'data-hover-open': open, ...props }: React.HTMLAttributes<HTMLDivElement> & { 'data-hover-open'?: boolean }) {
  if (!open) return null
  return <div className={cn('absolute z-50 mt-2 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95', className)} {...props} />
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
`,

  // ─── Navigation ───────────────────────────────────────────────────────

  'tabs': `import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> { defaultValue?: string; value?: string; onValueChange?: (v: string) => void }
const TabsContext = React.createContext<{ value: string; setValue: (v: string) => void }>({ value: '', setValue: () => {} })

function Tabs({ defaultValue = '', value: cv, onValueChange, children, className, ...props }: TabsProps) {
  const [iv, siv] = React.useState(defaultValue)
  return <TabsContext.Provider value={{ value: cv ?? iv, setValue: onValueChange ?? siv }}><div className={cn(className)} {...props}>{children}</div></TabsContext.Provider>
}

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} role="tablist" className={cn('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', className)} {...props} />
)
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }>(
  ({ className, value, onClick, ...props }, ref) => {
    const ctx = React.useContext(TabsContext)
    return <button type="button" ref={ref} role="tab" aria-selected={ctx.value === value} data-state={ctx.value === value ? 'active' : 'inactive'}
      className={cn('inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm', className)}
      onClick={(e) => { ctx.setValue(value); onClick?.(e) }} {...props} />
  }
)
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
    const ctx = React.useContext(TabsContext)
    if (ctx.value !== value) return null
    return <div ref={ref} role="tabpanel" tabIndex={0} className={cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)} {...props} />
  }
)
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
`,

  'accordion': `import * as React from 'react'
import { cn } from '@/lib/utils'

function Accordion({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { type?: 'single' | 'multiple' }) {
  return <div className={cn(className)} {...props}>{children}</div>
}

function AccordionItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const [open, setOpen] = React.useState(false)
  return <div className={cn('border-b', className)} {...props}>
    {React.Children.map(children, (child: any) => React.isValidElement(child) ? React.cloneElement(child as any, { 'data-open': open, 'data-toggle': () => setOpen(!open) }) : child)}
  </div>
}

function AccordionTrigger({ className, children, 'data-open': open, 'data-toggle': toggle, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { 'data-open'?: boolean; 'data-toggle'?: () => void }) {
  return (
    <h3 className="flex">
      <button type="button" className={cn('flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180', className)} data-state={open ? 'open' : 'closed'} onClick={() => toggle?.()} {...props}>
        {children}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 transition-transform duration-200"><path d="m6 9 6 6 6-6"/></svg>
      </button>
    </h3>
  )
}

function AccordionContent({ className, children, 'data-open': open, ...props }: React.HTMLAttributes<HTMLDivElement> & { 'data-open'?: boolean }) {
  if (!open) return null
  return <div className={cn('overflow-hidden text-sm transition-all', className)} {...props}><div className="pb-4 pt-0">{children}</div></div>
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
`,

  'dropdown-menu': `import * as React from 'react'
import { cn } from '@/lib/utils'

const DMContext = React.createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: false, setOpen: () => {} })

function DropdownMenu({ children, open: co, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (v: boolean) => void }) {
  const [io, sio] = React.useState(false)
  const open = co ?? io
  const setOpen = onOpenChange ?? sio
  React.useEffect(() => { if (!open) return; const h = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest('[data-dropdown-menu]')) setOpen(false) }; document.addEventListener('click', h); return () => document.removeEventListener('click', h) }, [open, setOpen])
  return <DMContext.Provider value={{ open, setOpen }}><div className="relative inline-block" data-dropdown-menu>{children}</div></DMContext.Provider>
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, ...props }, ref) => { const { open, setOpen } = React.useContext(DMContext); return <button type="button" ref={ref} aria-expanded={open} onClick={(e) => { e.stopPropagation(); setOpen(!open); onClick?.(e) }} {...props} /> }
)
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => { const { open } = React.useContext(DMContext); if (!open) return null; return <div ref={ref} role="menu" className={cn('absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95', className)} {...props} /> }
)
DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => { const { setOpen } = React.useContext(DMContext); return <div ref={ref} role="menuitem" tabIndex={0} className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', inset && 'pl-8', className)} onClick={() => setOpen(false)} {...props} /> }
)
DropdownMenuItem.displayName = 'DropdownMenuItem'

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} role="separator" className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
)
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>(
  ({ className, inset, ...props }, ref) => <div ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} {...props} />
)
DropdownMenuLabel.displayName = 'DropdownMenuLabel'

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { checked?: boolean }>(
  ({ className, children, checked, ...props }, ref) => <div ref={ref} role="menuitemcheckbox" aria-checked={checked} className={cn('relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent', className)} {...props}><span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">{checked && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>}</span>{children}</div>
)
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem'

const DropdownMenuGroup = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => <div role="group" {...props} />

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuCheckboxItem, DropdownMenuGroup }
`,

  'context-menu': `import * as React from 'react'
import { cn } from '@/lib/utils'

function ContextMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  React.useEffect(() => { if (open) { const h = () => setOpen(false); document.addEventListener('click', h); return () => document.removeEventListener('click', h) } }, [open])
  return <div onContextMenu={(e) => { e.preventDefault(); setPos({ x: e.clientX, y: e.clientY }); setOpen(true) }}>
    {React.Children.map(children, (child: any) => React.isValidElement(child) ? React.cloneElement(child as any, { 'data-ctx-open': open, 'data-ctx-pos': pos }) : child)}
  </div>
}

const ContextMenuTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => <div ref={ref} {...props} />)
ContextMenuTrigger.displayName = 'ContextMenuTrigger'

function ContextMenuContent({ className, children, 'data-ctx-open': open, 'data-ctx-pos': pos, ...props }: React.HTMLAttributes<HTMLDivElement> & { 'data-ctx-open'?: boolean; 'data-ctx-pos'?: { x: number; y: number } }) {
  if (!open || !pos) return null
  return <div role="menu" style={{ position: 'fixed', left: pos.x, top: pos.y }} className={cn('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md', className)} {...props}>{children}</div>
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} role="menuitem" tabIndex={0} className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground', className)} {...props} />
)
ContextMenuItem.displayName = 'ContextMenuItem'

const ContextMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
)
ContextMenuSeparator.displayName = 'ContextMenuSeparator'

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator }
`,

  'menubar': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Menubar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex h-10 items-center space-x-1 rounded-md border bg-background p-1', className)} {...props} />
)
Menubar.displayName = 'Menubar'

function MenubarMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return <div className="relative" onMouseLeave={() => setOpen(false)}>
    {React.Children.map(children, (child: any) => React.isValidElement(child) ? React.cloneElement(child as any, { 'data-menu-open': open, 'data-menu-toggle': () => setOpen(!open) }) : child)}
  </div>
}

const MenubarTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { 'data-menu-toggle'?: () => void }>(
  ({ className, 'data-menu-toggle': toggle, onClick, ...props }, ref) => (
    <button type="button" ref={ref} className={cn('flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent', className)} onClick={(e) => { toggle?.(); onClick?.(e) }} {...props} />
  )
)
MenubarTrigger.displayName = 'MenubarTrigger'

function MenubarContent({ className, 'data-menu-open': open, ...props }: React.HTMLAttributes<HTMLDivElement> & { 'data-menu-open'?: boolean }) {
  if (!open) return null
  return <div className={cn('absolute left-0 top-full z-50 mt-1 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md', className)} {...props} />
}

const MenubarItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} role="menuitem" className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground', className)} {...props} />
)
MenubarItem.displayName = 'MenubarItem'

const MenubarSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
)
MenubarSeparator.displayName = 'MenubarSeparator'

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator }
`,

  'navigation-menu': `import * as React from 'react'
import { cn } from '@/lib/utils'

const NavigationMenu = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <nav ref={ref} className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)} {...props}>
      {children}
    </nav>
  )
)
NavigationMenu.displayName = 'NavigationMenu'

const NavigationMenuList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => <ul ref={ref} className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)} {...props} />
)
NavigationMenuList.displayName = 'NavigationMenuList'

const NavigationMenuItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  (props, ref) => <li ref={ref} {...props} />
)
NavigationMenuItem.displayName = 'NavigationMenuItem'

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => <a ref={ref} className={cn('group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50', className)} {...props} />
)
NavigationMenuLink.displayName = 'NavigationMenuLink'

export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink }
`,

  'breadcrumb': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
)
Breadcrumb.displayName = 'Breadcrumb'

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => <ol ref={ref} className={cn('flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5', className)} {...props} />
)
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
)
BreadcrumbItem.displayName = 'BreadcrumbItem'

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => <a ref={ref} className={cn('transition-colors hover:text-foreground', className)} {...props} />
)
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn('font-normal text-foreground', className)} {...props} />
)
BreadcrumbPage.displayName = 'BreadcrumbPage'

function BreadcrumbSeparator({ children, className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li role="presentation" aria-hidden="true" className={cn('[&>svg]:size-3.5', className)} {...props}>{children ?? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>}</li>
}

const BreadcrumbEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span role="presentation" aria-hidden="true" className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
    <span className="sr-only">More</span>
  </span>
)

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis }
`,

  'pagination': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => <nav role="navigation" aria-label="pagination" className={cn('mx-auto flex w-full justify-center', className)} {...props} />
const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>( ({ className, ...props }, ref) => <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />)
PaginationContent.displayName = 'PaginationContent'
const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>((props, ref) => <li ref={ref} {...props} />)
PaginationItem.displayName = 'PaginationItem'

interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { isActive?: boolean; size?: 'default' | 'icon' }
function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
  return <a aria-current={isActive ? 'page' : undefined} className={cn('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10', isActive && 'border border-input bg-background', className)} {...props} />
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return <PaginationLink aria-label="Previous" size="default" className={cn('gap-1 pl-2.5', className)} {...props}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg><span>Previous</span></PaginationLink>
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return <PaginationLink aria-label="Next" size="default" className={cn('gap-1 pr-2.5', className)} {...props}><span>Next</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg></PaginationLink>
}

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
    <span className="sr-only">More pages</span>
  </span>
)

export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis }
`,

  'sidebar': `import * as React from 'react'
import { cn } from '@/lib/utils'

const SidebarContext = React.createContext<{ open: boolean; setOpen: (v: boolean) => void }>({ open: true, setOpen: () => {} })
export function useSidebar() { return React.useContext(SidebarContext) }

function SidebarProvider({ children, defaultOpen = true }: { children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen)
  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>
}

function Sidebar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar()
  return <aside className={cn('flex h-full flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300', open ? 'w-64' : 'w-16', className)} {...props}>{children}</aside>
}

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center gap-2 p-4', className)} {...props} />)
SidebarHeader.displayName = 'SidebarHeader'

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('flex-1 overflow-auto p-2', className)} {...props} />)
SidebarContent.displayName = 'SidebarContent'

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('border-t p-4', className)} {...props} />)
SidebarFooter.displayName = 'SidebarFooter'

const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(({ className, ...props }, ref) => <ul ref={ref} className={cn('flex flex-col gap-1', className)} {...props} />)
SidebarMenu.displayName = 'SidebarMenu'

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>((props, ref) => <li ref={ref} {...props} />)
SidebarMenuItem.displayName = 'SidebarMenuItem'

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }>(
  ({ className, isActive, ...props }, ref) => <button type="button" ref={ref} data-active={isActive} className={cn('flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground', className)} {...props} />
)
SidebarMenuButton.displayName = 'SidebarMenuButton'

function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSidebar()
  return <button type="button" className={cn('inline-flex items-center justify-center rounded-md p-2 text-sm hover:bg-accent', className)} onClick={() => setOpen(!open)} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
    <span className="sr-only">Toggle sidebar</span>
  </button>
}

export { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger }
`,
};
