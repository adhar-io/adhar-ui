// deno-lint-ignore-file
/**
 * Tier 2: Composite component templates.
 * Components that use external npm deps or compose Tier 1 components.
 */

export const tier2Templates: Record<string, string> = {
  'command': `'use client'
import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '@/lib/utils'

const Command = React.forwardRef<React.ElementRef<typeof CommandPrimitive>, React.ComponentPropsWithoutRef<typeof CommandPrimitive>>(
  ({ className, ...props }, ref) => <CommandPrimitive ref={ref} className={cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', className)} {...props} />
)
Command.displayName = CommandPrimitive.displayName

const CommandInput = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Input>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center border-b px-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 h-4 w-4 shrink-0 opacity-50"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <CommandPrimitive.Input ref={ref} className={cn('flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', className)} {...props} />
    </div>
  )
)
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<React.ElementRef<typeof CommandPrimitive.List>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>>(
  ({ className, ...props }, ref) => <CommandPrimitive.List ref={ref} className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)} {...props} />
)
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Empty>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>>(
  (props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
)
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Group>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>>(
  ({ className, ...props }, ref) => <CommandPrimitive.Group ref={ref} className={cn('overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground', className)} {...props} />
)
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>>(
  ({ className, ...props }, ref) => <CommandPrimitive.Separator ref={ref} className={cn('-mx-1 h-px bg-border', className)} {...props} />
)
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Item>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>>(
  ({ className, ...props }, ref) => <CommandPrimitive.Item ref={ref} className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50', className)} {...props} />
)
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />

export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut }
`,

  'combobox': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ComboboxOption { value: string; label: string }

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
}

function Combobox({ options, value, onValueChange, placeholder = 'Select...', searchPlaceholder = 'Search...', emptyMessage = 'No results found.', className }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
  const selected = options.find(o => o.value === value)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => { if (!open) return; const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h) }, [open])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button type="button" onClick={() => setOpen(!open)} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <span className={!selected ? 'text-muted-foreground' : ''}>{selected?.label ?? placeholder}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 opacity-50"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={searchPlaceholder} className="flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground" />
          <div className="max-h-60 overflow-auto">
            {filtered.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>}
            {filtered.map(o => (
              <div key={o.value} onClick={() => { onValueChange?.(o.value); setOpen(false); setSearch('') }}
                className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground', value === o.value && 'bg-accent')}>
                {o.label}
                {value === o.value && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto h-4 w-4"><path d="M20 6 9 17l-5-5"/></svg>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { Combobox }
`,

  'date-picker': `'use client'
import * as React from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

function DatePicker({ date, onDateChange, placeholder = 'Pick a date', className }: DatePickerProps) {
  return (
    <div className={cn('relative', className)}>
      <input
        type="date"
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        onChange={(e) => onDateChange?.(e.target.value ? new Date(e.target.value) : undefined)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        placeholder={placeholder}
      />
    </div>
  )
}

export { DatePicker }
`,

  'calendar': `'use client'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-input',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative',
        day: 'h-9 w-9 p-0 font-normal inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground',
        day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
`,

  'color-picker': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
  className?: string
}

function ColorPicker({ value = '#000000', onChange, className }: ColorPickerProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <input type="color" value={value} onChange={(e) => onChange?.(e.target.value)} className="h-10 w-10 cursor-pointer rounded-md border border-input p-0.5" />
      <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} className="flex h-10 w-28 rounded-md border border-input bg-background px-3 py-2 text-sm font-mono uppercase" maxLength={7} />
    </div>
  )
}

export { ColorPicker }
`,

  'form': `'use client'
import * as React from 'react'
import { useFormContext, Controller, FormProvider, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form'
import { cn } from '@/lib/utils'

const Form = FormProvider

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = { name: TName }
const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}><Controller {...props} /></FormFieldContext.Provider>
)

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(fieldContext.name, formState)
  return { name: fieldContext.name, ...fieldState }
}

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('space-y-2', className)} {...props} />
)
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    const { error } = useFormField()
    return <label ref={ref} className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', error && 'text-destructive', className)} {...props} />
  }
)
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => <div ref={ref} {...props} />)
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
)
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error } = useFormField()
    const body = error ? String(error?.message) : children
    if (!body) return null
    return <p ref={ref} className={cn('text-sm font-medium text-destructive', className)} {...props}>{body}</p>
  }
)
FormMessage.displayName = 'FormMessage'

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField }
`,

  'input-otp': `'use client'
import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { cn } from '@/lib/utils'

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput ref={ref} containerClassName={cn('flex items-center gap-2 has-[:disabled]:opacity-50', containerClassName)} className={cn('disabled:cursor-not-allowed', className)} {...props} />
  )
)
InputOTP.displayName = 'InputOTP'

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center', className)} {...props} />
)
InputOTPGroup.displayName = 'InputOTPGroup'

const InputOTPSlot = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'> & { index: number }>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const slot = inputOTPContext.slots[index]
    return (
      <div ref={ref} className={cn('relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md', slot?.isActive && 'z-10 ring-2 ring-ring ring-offset-background', className)} {...props}>
        {slot?.char}
        {slot?.hasFakeCaret && <div className="pointer-events-none absolute inset-0 flex items-center justify-center"><div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" /></div>}
      </div>
    )
  }
)
InputOTPSlot.displayName = 'InputOTPSlot'

const InputOTPSeparator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ ...props }, ref) => <div ref={ref} role="separator" {...props}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/></svg></div>
)
InputOTPSeparator.displayName = 'InputOTPSeparator'

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
`,

  'table': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => <div className="relative w-full overflow-auto"><table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} /></div>)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => <tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => <tr ref={ref} className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)} {...props} />)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => <th ref={ref} className={cn('h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0', className)} {...props} />)
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => <td ref={ref} className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />)
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />)
TableCaption.displayName = 'TableCaption'

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
`,

  'carousel': `'use client'
import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { cn } from '@/lib/utils'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

const CarouselContext = React.createContext<{ carouselRef: ReturnType<typeof useEmblaCarousel>[0]; api: CarouselApi; scrollPrev: () => void; scrollNext: () => void; canScrollPrev: boolean; canScrollNext: boolean } | null>(null)

function useCarousel() { const ctx = React.useContext(CarouselContext); if (!ctx) throw new Error('useCarousel must be used within <Carousel>'); return ctx }

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> { opts?: CarouselOptions; plugins?: CarouselPlugin; orientation?: 'horizontal' | 'vertical'; setApi?: (api: CarouselApi) => void }

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const onSelect = React.useCallback((a: CarouselApi) => { if (!a) return; setCanScrollPrev(a.canScrollPrev()); setCanScrollNext(a.canScrollNext()) }, [])
  React.useEffect(() => { if (!api) return; onSelect(api); api.on('reInit', onSelect); api.on('select', onSelect); return () => { api?.off('select', onSelect) } }, [api, onSelect])
  React.useEffect(() => { if (api && setApi) setApi(api) }, [api, setApi])
  return <CarouselContext.Provider value={{ carouselRef, api, scrollPrev: () => api?.scrollPrev(), scrollNext: () => api?.scrollNext(), canScrollPrev, canScrollNext }}><div ref={ref} className={cn('relative', className)} role="region" aria-roledescription="carousel" {...props}>{children}</div></CarouselContext.Provider>
})
Carousel.displayName = 'Carousel'

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => { const { carouselRef } = useCarousel(); return <div ref={carouselRef} className="overflow-hidden"><div ref={ref} className={cn('flex', className)} {...props} /></div> })
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} role="group" aria-roledescription="slide" className={cn('min-w-0 shrink-0 grow-0 basis-full', className)} {...props} />)
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => { const { scrollPrev, canScrollPrev } = useCarousel(); return <button ref={ref} disabled={!canScrollPrev} onClick={scrollPrev} className={cn('absolute left-[-12px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border bg-background inline-flex items-center justify-center disabled:opacity-50', className)} {...props}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg><span className="sr-only">Previous</span></button> })
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => { const { scrollNext, canScrollNext } = useCarousel(); return <button ref={ref} disabled={!canScrollNext} onClick={scrollNext} className={cn('absolute right-[-12px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border bg-background inline-flex items-center justify-center disabled:opacity-50', className)} {...props}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg><span className="sr-only">Next</span></button> })
CarouselNext.displayName = 'CarouselNext'

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi }
`,

  'chart': `'use client'
import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '@/lib/utils'

export type ChartConfig = Record<string, { label?: string; icon?: React.ComponentType; color?: string; theme?: Record<string, string> }>

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null)

function useChart() { const ctx = React.useContext(ChartContext); if (!ctx) throw new Error('useChart must be used within <ChartContainer>'); return ctx }

const ChartContainer = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'> & { config: ChartConfig; children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'] }>(
  ({ className, children, config, ...props }, ref) => (
    <ChartContext.Provider value={{ config }}>
      <div ref={ref} className={cn('flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke=\\'#ccc\\']]:stroke-border/50', className)}
        style={{ '--color-background': 'hsl(var(--background))' } as React.CSSProperties} {...props}>
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
)
ChartContainer.displayName = 'ChartContainer'

function ChartTooltipContent({ active, payload, label, className, hideLabel, hideIndicator, indicator = 'dot', nameKey, labelKey }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className={cn('grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl', className)}>
      {!hideLabel && <div className="font-medium">{label}</div>}
      <div className="grid gap-1.5">{payload.map((item: any, i: number) => (
        <div key={i} className="flex items-center gap-1.5 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground">
          {!hideIndicator && <div className="h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />}
          <span className="text-muted-foreground">{item.name}</span>
          <span className="font-mono font-medium tabular-nums text-foreground ml-auto">{item.value}</span>
        </div>
      ))}</div>
    </div>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip
const ChartLegend = RechartsPrimitive.Legend

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, useChart, type ChartConfig }
`,

  'drawer': `'use client'
import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '@/lib/utils'

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>>(
  ({ className, ...props }, ref) => <DrawerPrimitive.Overlay ref={ref} className={cn('fixed inset-0 z-50 bg-black/80', className)} {...props} />
)
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>>(
  ({ className, children, ...props }, ref) => (
    <DrawerPortal><DrawerOverlay />
      <DrawerPrimitive.Content ref={ref} className={cn('fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background', className)} {...props}>
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
)
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
const DrawerTitle = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>>(({ className, ...props }, ref) => <DrawerPrimitive.Title ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />)
DrawerTitle.displayName = DrawerPrimitive.Title.displayName
const DrawerDescription = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>>(({ className, ...props }, ref) => <DrawerPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />)
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose }
`,

  'sonner': `'use client'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner className="toaster group" toastOptions={{ classNames: {
    toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
    description: 'group-[.toast]:text-muted-foreground',
    actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
    cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
  }}} {...props} />
)

export { Toaster }
export { toast } from 'sonner'
`,
};
