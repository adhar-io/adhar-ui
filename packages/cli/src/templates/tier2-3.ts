export const tier2Templates: Record<string, string> = {
  'command': `"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "./dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
}
`,

  'combobox': `"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onSelect?: (value: string) => void
  searchable?: boolean
  placeholder?: string
  emptyMessage?: string
  className?: string
}

const Combobox = ({
  options,
  value,
  onSelect,
  searchable = true,
  placeholder = "Select option...",
  emptyMessage = "No option found.",
  className,
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState("")

  const currentValue = value !== undefined ? value : internalValue

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === currentValue ? "" : selectedValue
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onSelect?.(newValue)
    setOpen(false)
  }

  const selectedLabel = options.find((opt) => opt.value === currentValue)?.label

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {searchable && <CommandInput placeholder="Search..." />}
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentValue === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
Combobox.displayName = "Combobox"

export { Combobox }
`,

  'date-picker': `"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  dateFormat?: string
  className?: string
}

const DatePicker = ({
  value,
  onChange,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  className,
}: DatePickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(value)

  React.useEffect(() => {
    setDate(value)
  }, [value])

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onChange?.(selectedDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, dateFormat) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
DatePicker.displayName = "DatePicker"

export { DatePicker }
`,

  'calendar': `"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
`,

  'color-picker': `"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Label } from "./label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
  className?: string
}

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 0, l: 0 }
  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#000000", "#ffffff",
]

const ColorPicker = ({ value = "#3b82f6", onChange, className }: ColorPickerProps) => {
  const [color, setColor] = React.useState(value)

  React.useEffect(() => {
    setColor(value)
  }, [value])

  const handleChange = (newColor: string) => {
    setColor(newColor)
    onChange?.(newColor)
  }

  const hsl = hexToHSL(color)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-md border border-input shadow-sm",
            className
          )}
          style={{ backgroundColor: color }}
          aria-label="Pick a color"
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-3">
        <div className="flex items-center gap-2">
          <div
            className="h-10 w-10 rounded-md border"
            style={{ backgroundColor: color }}
          />
          <div className="flex-1 space-y-1">
            <Label htmlFor="hex-input" className="text-xs">Hex</Label>
            <Input
              id="hex-input"
              value={color}
              onChange={(e) => handleChange(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">
            HSL: {hsl.h}, {hsl.s}%, {hsl.l}%
          </Label>
        </div>
        <div>
          <Label className="text-xs">Presets</Label>
          <div className="mt-1 flex flex-wrap gap-1">
            {PRESET_COLORS.map((preset) => (
              <button
                key={preset}
                className={cn(
                  "h-6 w-6 rounded-md border",
                  color === preset && "ring-2 ring-ring ring-offset-2"
                )}
                style={{ backgroundColor: preset }}
                onClick={() => handleChange(preset)}
                aria-label={preset}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
ColorPicker.displayName = "ColorPicker"

export { ColorPicker }
`,

  'form': `"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "./label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: \\\`\\\${id}-form-item\\\`,
    formDescriptionId: \\\`\\\${id}-form-item-description\\\`,
    formMessageId: \\\`\\\${id}-form-item-message\\\`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? formDescriptionId
          : \\\`\\\${formDescriptionId} \\\${formMessageId}\\\`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
`,

  'input-otp': `"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
`,

  'table': `import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
`,

  'carousel': `"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) return
      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
`,

  'chart': `"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = \\\`chart-\\\${id || uniqueId.replace(/:/g, "")}\\\`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => cfg.theme || cfg.color
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) =>
              \\\`\\\${prefix} [data-chart=\\\${id}] {
\\\${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? \\\`  --color-\\\${key}: \\\${color};\\\` : null
  })
  .filter(Boolean)
  .join("\\n")}
}\\\`
          )
          .join("\\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) return null

      const [item] = payload
      const key = \\\`\\\${labelKey || item?.dataKey || item?.name || "value"}\\\`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? itemConfig?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) return null

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) return null

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = \\\`\\\${nameKey || item.name || item.dataKey || "value"}\\\`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {!hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          }
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value !== undefined && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = \\\`\\\${nameKey || item.dataKey || "value"}\\\`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegendContent"

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) return undefined

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in config
  ) {
    configLabelKey = key
  } else if (
    payloadPayload &&
    "dataKey" in payloadPayload &&
    typeof payloadPayload.dataKey === "string" &&
    payloadPayload.dataKey in config
  ) {
    configLabelKey = payloadPayload.dataKey
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
`,

  'drawer': `"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
`,

  'sonner': `"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
`,
};

export const tier3Templates: Record<string, string> = {
  'data-table': `"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
  Column,
  Table as TanstackTable,
} from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
  PlusCircle,
  Check,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "./dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command"
import { Badge } from "./badge"
import { Separator } from "./separator"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Filter...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} searchKey={searchKey} searchPlaceholder={searchPlaceholder} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}

interface DataTablePaginationProps<TData> {
  table: TanstackTable<TData>
}

function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={\\\`\\\${table.getState().pagination.pageSize}\\\`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={\\\`\\\${pageSize}\\\`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface DataTableToolbarProps<TData> {
  table: TanstackTable<TData>
  searchKey?: string
  searchPlaceholder?: string
}

function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

interface DataTableViewOptionsProps<TData> {
  table: TanstackTable<TData>
}

function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Settings2 className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export {
  DataTable,
  DataTablePagination,
  DataTableToolbar,
  DataTableColumnHeader,
  DataTableViewOptions,
  DataTableFacetedFilter,
}
`,

  'form-builder': `"use client"

import * as React from "react"
import { useForm, DefaultValues, FieldValues, Path } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Checkbox } from "./checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"

type FieldConfig = {
  name: string
  label: string
  type?: "text" | "email" | "password" | "number" | "textarea" | "checkbox" | "select"
  placeholder?: string
  description?: string
  options?: { label: string; value: string }[]
}

interface FormBuilderProps<TSchema extends z.ZodObject<any>> {
  schema: TSchema
  fields: FieldConfig[]
  onSubmit: (values: z.infer<TSchema>) => void
  defaultValues?: DefaultValues<z.infer<TSchema>>
  submitLabel?: string
  className?: string
}

function FormBuilder<TSchema extends z.ZodObject<any>>({
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitLabel = "Submit",
  className,
}: FormBuilderProps<TSchema>) {
  type FormValues = z.infer<TSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const renderField = (fieldConfig: FieldConfig) => {
    const { name, label, type = "text", placeholder, description, options } = fieldConfig

    return (
      <FormField
        key={name}
        control={form.control}
        name={name as Path<FormValues>}
        render={({ field }) => (
          <FormItem>
            {type !== "checkbox" && <FormLabel>{label}</FormLabel>}
            <FormControl>
              {type === "textarea" ? (
                <Textarea placeholder={placeholder} {...field} />
              ) : type === "checkbox" ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="font-normal">{label}</FormLabel>
                </div>
              ) : type === "select" ? (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  onChange={type === "number"
                    ? (e) => field.onChange(e.target.valueAsNumber)
                    : field.onChange
                  }
                />
              )}
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        {fields.map(renderField)}
        <Button type="submit">{submitLabel}</Button>
      </form>
    </Form>
  )
}
FormBuilder.displayName = "FormBuilder"

export { FormBuilder, type FieldConfig }
`,

  'file-upload': `"use client"

import * as React from "react"
import { Upload, X, File, CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Progress } from "./progress"

interface FileInfo {
  file: File
  id: string
  progress: number
  status: "pending" | "uploading" | "complete" | "error"
  error?: string
}

interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void
  onUpload?: (file: File) => Promise<void>
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  className?: string
}

const FileUpload = ({
  onFilesSelected,
  onUpload,
  accept,
  multiple = true,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
  className,
}: FileUploadProps) => {
  const [files, setFiles] = React.useState<FileInfo[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addFiles = React.useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles)
        .filter((f) => f.size <= maxSize)
        .slice(0, maxFiles - files.length)

      const newFileInfos: FileInfo[] = fileArray.map((file) => ({
        file,
        id: Math.random().toString(36).slice(2),
        progress: 0,
        status: "pending" as const,
      }))

      setFiles((prev) => [...prev, ...newFileInfos])
      onFilesSelected?.(fileArray)
    },
    [files.length, maxFiles, maxSize, onFilesSelected]
  )

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length) {
      addFiles(e.dataTransfer.files)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      addFiles(e.target.files)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
      >
        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">
          Drag & drop files here, or click to browse
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Max {formatSize(maxSize)} per file
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((fileInfo) => (
            <div
              key={fileInfo.id}
              className="flex items-center gap-3 rounded-md border p-3"
            >
              <File className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">
                  {fileInfo.file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(fileInfo.file.size)}
                </p>
                {fileInfo.status === "uploading" && (
                  <Progress value={fileInfo.progress} className="mt-1 h-1" />
                )}
              </div>
              {fileInfo.status === "complete" ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeFile(fileInfo.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
FileUpload.displayName = "FileUpload"

export { FileUpload, type FileInfo }
`,

  'rich-text-editor': `"use client"

import * as React from "react"
import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Minus,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Toggle } from "./toggle"
import { Separator } from "./separator"

interface EditorToolbarProps {
  editor: Editor | null
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap items-center gap-1 border-b p-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={false}
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Toggle
        size="sm"
        pressed={false}
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={false}
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Toggle>
    </div>
  )
}

interface RichTextEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Write something...",
  className,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none min-h-[150px] p-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  return (
    <div className={cn("rounded-md border", className)}>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
RichTextEditor.displayName = "RichTextEditor"

export { RichTextEditor, EditorToolbar }
`,

  'kanban-board': `"use client"

import * as React from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

interface KanbanItem {
  id: string
  title: string
  description?: string
  columnId: string
}

interface KanbanColumnData {
  id: string
  title: string
}

interface KanbanBoardProps {
  columns: KanbanColumnData[]
  items: KanbanItem[]
  onItemMove?: (itemId: string, fromColumn: string, toColumn: string) => void
  onReorder?: (items: KanbanItem[]) => void
  className?: string
}

const KanbanCard = ({
  item,
  className,
}: {
  item: KanbanItem
  className?: string
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-md border bg-card p-3 shadow-sm",
        isDragging && "opacity-50",
        className
      )}
    >
      <div className="flex items-start gap-2">
        <button
          className="mt-0.5 cursor-grab text-muted-foreground hover:text-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{item.title}</p>
          {item.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const KanbanColumn = ({
  column,
  items,
  className,
}: {
  column: KanbanColumnData
  items: KanbanItem[]
  className?: string
}) => {
  return (
    <div
      className={cn(
        "flex w-[300px] shrink-0 flex-col rounded-lg bg-muted/50 p-2",
        className
      )}
    >
      <div className="flex items-center justify-between px-2 py-1.5">
        <h3 className="text-sm font-semibold">{column.title}</h3>
        <span className="text-xs text-muted-foreground">{items.length}</span>
      </div>
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-1 flex-col gap-2 p-1">
          {items.map((item) => (
            <KanbanCard key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

const KanbanBoard = ({
  columns,
  items: initialItems,
  onItemMove,
  onReorder,
  className,
}: KanbanBoardProps) => {
  const [items, setItems] = React.useState(initialItems)
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const activeItem = activeId ? items.find((i) => i.id === activeId) : null

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeItem = items.find((i) => i.id === active.id)
    const overItem = items.find((i) => i.id === over.id)

    if (!activeItem) return

    if (overItem && activeItem.columnId !== overItem.columnId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === activeItem.id
            ? { ...item, columnId: overItem.columnId }
            : item
        )
      )
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeItem = items.find((i) => i.id === active.id)
    if (!activeItem) return

    const columnItems = items.filter((i) => i.columnId === activeItem.columnId)
    const oldIndex = columnItems.findIndex((i) => i.id === active.id)
    const newIndex = columnItems.findIndex((i) => i.id === over.id)

    if (oldIndex !== newIndex && newIndex !== -1) {
      const reordered = arrayMove(columnItems, oldIndex, newIndex)
      const otherItems = items.filter((i) => i.columnId !== activeItem.columnId)
      const newItems = [...otherItems, ...reordered]
      setItems(newItems)
      onReorder?.(newItems)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={cn("flex gap-4 overflow-x-auto p-4", className)}>
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            items={items.filter((i) => i.columnId === column.id)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeItem ? (
          <div className="rounded-md border bg-card p-3 shadow-lg">
            <p className="text-sm font-medium">{activeItem.title}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
KanbanBoard.displayName = "KanbanBoard"

export { KanbanBoard, KanbanColumn, KanbanCard, type KanbanItem, type KanbanColumnData }
`,

  'timeline': `import * as React from "react"

import { cn } from "@/lib/utils"

const Timeline = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative space-y-0", className)} {...props} />
))
Timeline.displayName = "Timeline"

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isLast?: boolean
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, isLast, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative flex gap-4 pb-8", isLast && "pb-0", className)}
      {...props}
    />
  )
)
TimelineItem.displayName = "TimelineItem"

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute left-[11px] top-[24px] h-[calc(100%-16px)] w-px bg-border",
      className
    )}
    {...props}
  />
))
TimelineConnector.displayName = "TimelineConnector"

interface TimelineDotProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "success" | "warning" | "destructive"
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 bg-background",
        {
          "border-border": variant === "default",
          "border-primary": variant === "primary",
          "border-green-500": variant === "success",
          "border-yellow-500": variant === "warning",
          "border-destructive": variant === "destructive",
        },
        className
      )}
      {...props}
    >
      <div
        className={cn("h-2 w-2 rounded-full", {
          "bg-border": variant === "default",
          "bg-primary": variant === "primary",
          "bg-green-500": variant === "success",
          "bg-yellow-500": variant === "warning",
          "bg-destructive": variant === "destructive",
        })}
      />
    </div>
  )
)
TimelineDot.displayName = "TimelineDot"

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 pt-0.5 pb-2", className)}
    {...props}
  />
))
TimelineContent.displayName = "TimelineContent"

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
}
`,

  'tree-view': `"use client"

import * as React from "react"
import { ChevronRight, Folder, File } from "lucide-react"

import { cn } from "@/lib/utils"

interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  icon?: React.ReactNode
}

interface TreeViewProps {
  data: TreeNode[]
  onSelect?: (node: TreeNode) => void
  defaultExpanded?: string[]
  className?: string
}

interface TreeItemProps {
  node: TreeNode
  level: number
  expanded: Set<string>
  selected: string | null
  onToggle: (id: string) => void
  onSelect: (node: TreeNode) => void
}

const TreeItem = ({
  node,
  level,
  expanded,
  selected,
  onToggle,
  onSelect,
}: TreeItemProps) => {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expanded.has(node.id)
  const isSelected = selected === node.id

  return (
    <div>
      <button
        className={cn(
          "flex w-full items-center gap-1 rounded-sm px-2 py-1 text-sm hover:bg-accent",
          isSelected && "bg-accent text-accent-foreground"
        )}
        style={{ paddingLeft: \\\`\\\${level * 16 + 8}px\\\` }}
        onClick={() => {
          if (hasChildren) onToggle(node.id)
          onSelect(node)
        }}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 transition-transform",
              isExpanded && "rotate-90"
            )}
          />
        ) : (
          <span className="w-4" />
        )}
        {node.icon || (hasChildren ? (
          <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <File className="h-4 w-4 shrink-0 text-muted-foreground" />
        ))}
        <span className="truncate">{node.label}</span>
      </button>
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const TreeView = ({
  data,
  onSelect,
  defaultExpanded = [],
  className,
}: TreeViewProps) => {
  const [expanded, setExpanded] = React.useState<Set<string>>(
    new Set(defaultExpanded)
  )
  const [selected, setSelected] = React.useState<string | null>(null)

  const handleToggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleSelect = (node: TreeNode) => {
    setSelected(node.id)
    onSelect?.(node)
  }

  return (
    <div className={cn("rounded-md border p-2", className)} role="tree">
      {data.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          level={0}
          expanded={expanded}
          selected={selected}
          onToggle={handleToggle}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}
TreeView.displayName = "TreeView"

export { TreeView, TreeItem, type TreeNode }
`,

  'stepper': `"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface StepperContextValue {
  activeStep: number
  orientation: "horizontal" | "vertical"
  setActiveStep: (step: number) => void
}

const StepperContext = React.createContext<StepperContextValue>({
  activeStep: 0,
  orientation: "horizontal",
  setActiveStep: () => {},
})

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep?: number
  onStepChange?: (step: number) => void
  orientation?: "horizontal" | "vertical"
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      activeStep = 0,
      onStepChange,
      orientation = "horizontal",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const setActiveStep = React.useCallback(
      (step: number) => {
        onStepChange?.(step)
      },
      [onStepChange]
    )

    return (
      <StepperContext.Provider value={{ activeStep, orientation, setActiveStep }}>
        <div
          ref={ref}
          className={cn(
            "flex gap-2",
            orientation === "horizontal" ? "flex-row items-center" : "flex-col",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    )
  }
)
Stepper.displayName = "Stepper"

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number
  title?: string
  description?: string
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ step, title, description, className, children, ...props }, ref) => {
    const { activeStep, orientation } = React.useContext(StepperContext)
    const isActive = activeStep === step
    const isCompleted = activeStep > step

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3",
          orientation === "horizontal" ? "flex-1 items-center" : "items-start",
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
              isCompleted
                ? "border-primary bg-primary text-primary-foreground"
                : isActive
                ? "border-primary text-primary"
                : "border-muted-foreground/25 text-muted-foreground"
            )}
          >
            {isCompleted ? <Check className="h-4 w-4" /> : step + 1}
          </div>
        </div>
        <div className="flex flex-col">
          {title && (
            <span
              className={cn(
                "text-sm font-medium",
                !isActive && !isCompleted && "text-muted-foreground"
              )}
            >
              {title}
            </span>
          )}
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
        {children}
      </div>
    )
  }
)
StepperItem.displayName = "StepperItem"

const StepperTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { step: number }
>(({ step, className, children, ...props }, ref) => {
  const { setActiveStep } = React.useContext(StepperContext)

  return (
    <button
      ref={ref}
      className={cn("cursor-pointer", className)}
      onClick={() => setActiveStep(step)}
      {...props}
    >
      {children}
    </button>
  )
})
StepperTrigger.displayName = "StepperTrigger"

const StepperContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { step: number }
>(({ step, className, ...props }, ref) => {
  const { activeStep } = React.useContext(StepperContext)

  if (activeStep !== step) return null

  return <div ref={ref} className={cn("mt-4", className)} {...props} />
})
StepperContent.displayName = "StepperContent"

export { Stepper, StepperItem, StepperTrigger, StepperContent }
`,

  'multi-select': `"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
}

const MultiSelect = ({
  options,
  value = [],
  onChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
}: MultiSelectProps) => {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>(value)

  React.useEffect(() => {
    setSelected(value)
  }, [value])

  const handleSelect = (val: string) => {
    const next = selected.includes(val)
      ? selected.filter((s) => s !== val)
      : [...selected, val]
    setSelected(next)
    onChange?.(next)
  }

  const handleRemove = (val: string) => {
    const next = selected.filter((s) => s !== val)
    setSelected(next)
    onChange?.(next)
  }

  const selectedLabels = selected.map(
    (val) => options.find((o) => o.value === val)?.label || val
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {selected.map((val, i) => (
              <Badge key={val} variant="secondary" className="gap-1">
                {selectedLabels[i]}
                <button
                  className="rounded-full outline-none hover:bg-muted"
                  onPointerDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleRemove(val)
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50"
                      )}
                    >
                      {isSelected && <span className="text-xs">✓</span>}
                    </div>
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
MultiSelect.displayName = "MultiSelect"

export { MultiSelect, type MultiSelectOption }
`,

  'transfer-list': `"use client"

import * as React from "react"
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Checkbox } from "./checkbox"
import { ScrollArea } from "./scroll-area"

interface TransferListItem {
  value: string
  label: string
}

interface TransferListProps {
  leftItems: TransferListItem[]
  rightItems: TransferListItem[]
  onChange?: (left: TransferListItem[], right: TransferListItem[]) => void
  leftTitle?: string
  rightTitle?: string
  searchable?: boolean
  className?: string
}

const TransferList = ({
  leftItems: initialLeft,
  rightItems: initialRight,
  onChange,
  leftTitle = "Available",
  rightTitle = "Selected",
  searchable = true,
  className,
}: TransferListProps) => {
  const [left, setLeft] = React.useState(initialLeft)
  const [right, setRight] = React.useState(initialRight)
  const [leftChecked, setLeftChecked] = React.useState<Set<string>>(new Set())
  const [rightChecked, setRightChecked] = React.useState<Set<string>>(new Set())
  const [leftSearch, setLeftSearch] = React.useState("")
  const [rightSearch, setRightSearch] = React.useState("")

  const update = (newLeft: TransferListItem[], newRight: TransferListItem[]) => {
    setLeft(newLeft)
    setRight(newRight)
    onChange?.(newLeft, newRight)
  }

  const moveRight = () => {
    const toMove = left.filter((item) => leftChecked.has(item.value))
    const remaining = left.filter((item) => !leftChecked.has(item.value))
    setLeftChecked(new Set())
    update(remaining, [...right, ...toMove])
  }

  const moveLeft = () => {
    const toMove = right.filter((item) => rightChecked.has(item.value))
    const remaining = right.filter((item) => !rightChecked.has(item.value))
    setRightChecked(new Set())
    update([...left, ...toMove], remaining)
  }

  const moveAllRight = () => {
    setLeftChecked(new Set())
    update([], [...right, ...left])
  }

  const moveAllLeft = () => {
    setRightChecked(new Set())
    update([...left, ...right], [])
  }

  const toggleCheck = (set: Set<string>, setFn: React.Dispatch<React.SetStateAction<Set<string>>>, value: string) => {
    const next = new Set(set)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    setFn(next)
  }

  const renderPanel = (
    title: string,
    items: TransferListItem[],
    checked: Set<string>,
    setChecked: React.Dispatch<React.SetStateAction<Set<string>>>,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const filtered = items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    )

    return (
      <div className="flex-1 rounded-md border">
        <div className="border-b px-3 py-2">
          <h4 className="text-sm font-medium">{title}</h4>
          <span className="text-xs text-muted-foreground">
            {checked.size}/{items.length} selected
          </span>
        </div>
        {searchable && (
          <div className="border-b p-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8"
            />
          </div>
        )}
        <ScrollArea className="h-[200px]">
          <div className="p-2 space-y-1">
            {filtered.map((item) => (
              <label
                key={item.value}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-accent"
              >
                <Checkbox
                  checked={checked.has(item.value)}
                  onCheckedChange={() => toggleCheck(checked, setChecked, item.value)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {renderPanel(leftTitle, left, leftChecked, setLeftChecked, leftSearch, setLeftSearch)}
      <div className="flex flex-col gap-1">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={moveAllRight} disabled={left.length === 0}>
          <ChevronsRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={moveRight} disabled={leftChecked.size === 0}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={moveLeft} disabled={rightChecked.size === 0}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={moveAllLeft} disabled={right.length === 0}>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
      </div>
      {renderPanel(rightTitle, right, rightChecked, setRightChecked, rightSearch, setRightSearch)}
    </div>
  )
}
TransferList.displayName = "TransferList"

export { TransferList, type TransferListItem }
`,

  'empty-state': `import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 rounded-full bg-muted p-3 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} className="mt-4" size="sm">
          {action.label}
        </Button>
      )}
    </div>
  )
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
`,

  'stat-card': `import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  trend?: "up" | "down"
  changePercent?: number
  icon?: React.ReactNode
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, trend, changePercent, icon, className, ...props }, ref) => (
    <Card ref={ref} className={cn("", className)} {...props}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {icon && (
            <div className="text-muted-foreground">{icon}</div>
          )}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-bold">{value}</p>
          {trend && changePercent !== undefined && (
            <span
              className={cn(
                "flex items-center text-xs font-medium",
                trend === "up" ? "text-green-600" : "text-red-600"
              )}
            >
              {trend === "up" ? (
                <TrendingUp className="mr-0.5 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-0.5 h-3 w-3" />
              )}
              {changePercent}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
)
StatCard.displayName = "StatCard"

export { StatCard }
`,

  'kbd': `import * as React from "react"

import { cn } from "@/lib/utils"

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys?: string[]
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ keys, className, children, ...props }, ref) => {
    const renderKey = (key: string) => (
      <kbd
        key={key}
        className={cn(
          "inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground",
          className
        )}
      >
        {key}
      </kbd>
    )

    if (keys) {
      return (
        <span ref={ref} className="inline-flex items-center gap-0.5" {...props}>
          {keys.map((key, i) => (
            <React.Fragment key={key}>
              {renderKey(key)}
              {i < keys.length - 1 && (
                <span className="text-xs text-muted-foreground">+</span>
              )}
            </React.Fragment>
          ))}
        </span>
      )
    }

    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    )
  }
)
Kbd.displayName = "Kbd"

export { Kbd }
`,

  'copy-button': `"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./tooltip"

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  onCopied?: () => void
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, onCopied, className, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        onCopied?.()
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", className)}
              onClick={handleCopy}
              {...props}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {copied ? "Copied!" : "Copy to clipboard"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)
CopyButton.displayName = "CopyButton"

export { CopyButton }
`,

  'chat': `"use client"

import * as React from "react"
import { Send } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Avatar, AvatarFallback } from "./avatar"
import { ScrollArea } from "./scroll-area"

interface ChatMessageData {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: Date
}

interface ChatMessagesProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: ChatMessageData[]
}

const ChatMessage = ({
  message,
  className,
}: {
  message: ChatMessageData
  className?: string
}) => {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser && "flex-row-reverse",
        className
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={cn(isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.timestamp && (
          <p className={cn(
            "mt-1 text-xs",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>
    </div>
  )
}

const ChatMessages = React.forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ messages, className, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, [messages])

    return (
      <ScrollArea
        ref={ref}
        className={cn("flex-1 p-4", className)}
        {...props}
      >
        <div ref={scrollRef} className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
    )
  }
)
ChatMessages.displayName = "ChatMessages"

interface ChatInputProps {
  onSend?: (message: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const ChatInput = ({
  onSend,
  placeholder = "Type a message...",
  disabled = false,
  className,
}: ChatInputProps) => {
  const [value, setValue] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && !disabled) {
      onSend?.(value.trim())
      setValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex items-end gap-2 border-t p-4", className)}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Button type="submit" size="icon" disabled={!value.trim() || disabled}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}

interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatContainer = React.forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-[600px] flex-col rounded-lg border", className)}
      {...props}
    />
  )
)
ChatContainer.displayName = "ChatContainer"

export {
  ChatContainer,
  ChatMessages,
  ChatMessage,
  ChatInput,
  type ChatMessageData,
}
`,

  'prompt-input': `"use client"

import * as React from "react"
import { Send, Paperclip } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

interface PromptInputProps {
  onSubmit?: (value: string) => void
  onFileAttach?: () => void
  placeholder?: string
  maxLength?: number
  showCharCount?: boolean
  disabled?: boolean
  className?: string
}

const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
  (
    {
      onSubmit,
      onFileAttach,
      placeholder = "Ask anything...",
      maxLength,
      showCharCount = false,
      disabled = false,
      className,
    },
    ref
  ) => {
    const [value, setValue] = React.useState("")
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const adjustHeight = () => {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.style.height = "auto"
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"
      }
    }

    React.useEffect(() => {
      adjustHeight()
    }, [value])

    const handleSubmit = () => {
      if (value.trim() && !disabled) {
        onSubmit?.(value.trim())
        setValue("")
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col rounded-lg border bg-background shadow-sm",
          className
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            if (maxLength && e.target.value.length > maxLength) return
            setValue(e.target.value)
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="min-h-[44px] w-full resize-none bg-transparent px-3 pt-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="flex items-center justify-between px-3 pb-2">
          <div className="flex items-center gap-1">
            {onFileAttach && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onFileAttach}
                disabled={disabled}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showCharCount && maxLength && (
              <span className="text-xs text-muted-foreground">
                {value.length}/{maxLength}
              </span>
            )}
            <Button
              size="icon"
              className="h-8 w-8"
              onClick={handleSubmit}
              disabled={!value.trim() || disabled}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }
)
PromptInput.displayName = "PromptInput"

export { PromptInput }
`,

  'streaming-text': `"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface StreamingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string
  speed?: number
  showCursor?: boolean
  onComplete?: () => void
}

const StreamingText = React.forwardRef<HTMLDivElement, StreamingTextProps>(
  (
    {
      content,
      speed = 20,
      showCursor = true,
      onComplete,
      className,
      ...props
    },
    ref
  ) => {
    const [displayed, setDisplayed] = React.useState("")
    const [isComplete, setIsComplete] = React.useState(false)

    React.useEffect(() => {
      setDisplayed("")
      setIsComplete(false)
      let index = 0

      const interval = setInterval(() => {
        if (index < content.length) {
          setDisplayed(content.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(interval)
    }, [content, speed, onComplete])

    return (
      <div ref={ref} className={cn("whitespace-pre-wrap text-sm", className)} {...props}>
        {displayed}
        {showCursor && !isComplete && (
          <span className="inline-block h-4 w-0.5 animate-pulse bg-foreground ml-0.5" />
        )}
      </div>
    )
  }
)
StreamingText.displayName = "StreamingText"

export { StreamingText }
`,

  'code-block': `"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      language = "plaintext",
      filename,
      showLineNumbers = true,
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }

    const lines = code.split("\\n")

    return (
      <div
        ref={ref}
        className={cn("overflow-hidden rounded-lg border bg-muted/50", className)}
        {...props}
      >
        {(filename || language) && (
          <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
            <span className="text-xs font-medium text-muted-foreground">
              {filename || language}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        )}
        <div className="overflow-x-auto p-4">
          <pre className="text-sm">
            <code>
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  {showLineNumbers && (
                    <span className="mr-4 inline-block w-8 select-none text-right text-muted-foreground">
                      {i + 1}
                    </span>
                  )}
                  <span>{line}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
`,

  'model-selector': `"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Badge } from "./badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface Model {
  id: string
  name: string
  description?: string
  capabilities?: string[]
}

interface ModelSelectorProps {
  models: Model[]
  value?: string
  onSelect?: (modelId: string) => void
  className?: string
}

const ModelSelector = ({
  models,
  value,
  onSelect,
  className,
}: ModelSelectorProps) => {
  const [open, setOpen] = React.useState(false)
  const selectedModel = models.find((m) => m.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[280px] justify-between", className)}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            {selectedModel?.name || "Select model..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.id}
                  onSelect={() => {
                    onSelect?.(model.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === model.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{model.name}</span>
                    {model.description && (
                      <span className="text-xs text-muted-foreground">
                        {model.description}
                      </span>
                    )}
                    {model.capabilities && model.capabilities.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {model.capabilities.map((cap) => (
                          <Badge key={cap} variant="secondary" className="text-[10px] px-1 py-0">
                            {cap}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
ModelSelector.displayName = "ModelSelector"

export { ModelSelector, type Model }
`,

  'token-counter': `import * as React from "react"

import { cn } from "@/lib/utils"
import { Progress } from "./progress"

interface TokenCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  used: number
  total: number
  warningThreshold?: number
  label?: string
}

const TokenCounter = React.forwardRef<HTMLDivElement, TokenCounterProps>(
  (
    {
      used,
      total,
      warningThreshold = 0.8,
      label = "Tokens",
      className,
      ...props
    },
    ref
  ) => {
    const percent = total > 0 ? (used / total) * 100 : 0
    const isWarning = percent / 100 >= warningThreshold
    const isOver = used >= total

    const formatNumber = (n: number) => {
      if (n >= 1000000) return (n / 1000000).toFixed(1) + "M"
      if (n >= 1000) return (n / 1000).toFixed(1) + "K"
      return n.toString()
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-1.5", className)}
        {...props}
      >
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span
            className={cn(
              "font-mono font-medium",
              isOver
                ? "text-destructive"
                : isWarning
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-foreground"
            )}
          >
            {formatNumber(used)} / {formatNumber(total)}
          </span>
        </div>
        <Progress
          value={Math.min(percent, 100)}
          className={cn(
            "h-2",
            isOver && "[&>div]:bg-destructive",
            isWarning && !isOver && "[&>div]:bg-yellow-500"
          )}
        />
      </div>
    )
  }
)
TokenCounter.displayName = "TokenCounter"

export { TokenCounter }
`,

  'thinking-indicator': `import * as React from "react"

import { cn } from "@/lib/utils"

interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  variant?: "dots" | "text" | "pulse"
}

const ThinkingIndicator = React.forwardRef<HTMLDivElement, ThinkingIndicatorProps>(
  ({ text = "Thinking", variant = "dots", className, ...props }, ref) => {
    if (variant === "pulse") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-2", className)}
          {...props}
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">{text}</span>
        </div>
      )
    }

    if (variant === "text") {
      return (
        <div
          ref={ref}
          className={cn("text-sm text-muted-foreground", className)}
          {...props}
        >
          <span>{text}</span>
          <span className="inline-flex w-6">
            <span className="animate-[ellipsis_1.5s_infinite]">...</span>
          </span>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
        </div>
        {text && <span className="text-sm text-muted-foreground">{text}</span>}
      </div>
    )
  }
)
ThinkingIndicator.displayName = "ThinkingIndicator"

export { ThinkingIndicator }
`,

  'feedback-buttons': `"use client"

import * as React from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

interface FeedbackButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  onLike?: () => void
  onDislike?: () => void
  activeState?: "like" | "dislike" | null
}

const FeedbackButtons = React.forwardRef<HTMLDivElement, FeedbackButtonsProps>(
  ({ onLike, onDislike, activeState = null, className, ...props }, ref) => {
    const [active, setActive] = React.useState<"like" | "dislike" | null>(activeState)

    React.useEffect(() => {
      setActive(activeState)
    }, [activeState])

    const handleLike = () => {
      const next = active === "like" ? null : "like"
      setActive(next)
      if (next === "like") onLike?.()
    }

    const handleDislike = () => {
      const next = active === "dislike" ? null : "dislike"
      setActive(next)
      if (next === "dislike") onDislike?.()
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", active === "like" && "text-green-500")}
          onClick={handleLike}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="sr-only">Like</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", active === "dislike" && "text-red-500")}
          onClick={handleDislike}
        >
          <ThumbsDown className="h-4 w-4" />
          <span className="sr-only">Dislike</span>
        </Button>
      </div>
    )
  }
)
FeedbackButtons.displayName = "FeedbackButtons"

export { FeedbackButtons }
`,

  'suggestion-chips': `import * as React from "react"

import { cn } from "@/lib/utils"

interface SuggestionChip {
  label: string
  value?: string
  icon?: React.ReactNode
}

interface SuggestionChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  chips: SuggestionChip[]
  onClick?: (chip: SuggestionChip) => void
}

const SuggestionChips = React.forwardRef<HTMLDivElement, SuggestionChipsProps>(
  ({ chips, onClick, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {chips.map((chip, index) => (
        <button
          key={chip.value || chip.label}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          )}
          onClick={() => onClick?.(chip)}
        >
          {chip.icon}
          {chip.label}
        </button>
      ))}
    </div>
  )
)
SuggestionChips.displayName = "SuggestionChips"

export { SuggestionChips, type SuggestionChip }
`,

  'message-bubble': `import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role: "user" | "assistant"
  content: string
  avatar?: {
    src?: string
    fallback: string
  }
  timestamp?: Date
}

const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ role, content, avatar, timestamp, className, ...props }, ref) => {
    const isUser = role === "user"

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3",
          isUser && "flex-row-reverse",
          className
        )}
        {...props}
      >
        {avatar && (
          <Avatar className="h-8 w-8 shrink-0">
            {avatar.src && <AvatarImage src={avatar.src} />}
            <AvatarFallback
              className={cn(
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
              )}
            >
              {avatar.fallback}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={cn(
            "max-w-[75%] space-y-1",
            isUser ? "items-end" : "items-start"
          )}
        >
          <div
            className={cn(
              "rounded-2xl px-4 py-2 text-sm",
              isUser
                ? "rounded-br-sm bg-primary text-primary-foreground"
                : "rounded-bl-sm bg-muted text-foreground"
            )}
          >
            <div className="whitespace-pre-wrap">{content}</div>
          </div>
          {timestamp && (
            <p
              className={cn(
                "text-[10px] text-muted-foreground",
                isUser ? "text-right" : "text-left"
              )}
            >
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
      </div>
    )
  }
)
MessageBubble.displayName = "MessageBubble"

export { MessageBubble }
`,

  'responsive-sidebar': `"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "./sheet"
import { Button } from "./button"
import { Menu } from "lucide-react"

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [query])

  return matches
}

interface ResponsiveSidebarProps {
  children: React.ReactNode
  className?: string
  breakpoint?: string
  side?: "left" | "right"
}

const ResponsiveSidebar = ({
  children,
  className,
  breakpoint = "(min-width: 768px)",
  side = "left",
}: ResponsiveSidebarProps) => {
  const isDesktop = useMediaQuery(breakpoint)
  const [open, setOpen] = React.useState(false)

  if (isDesktop) {
    return (
      <aside
        className={cn(
          "flex h-full w-64 shrink-0 flex-col border-r bg-background",
          className
        )}
      >
        {children}
      </aside>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className={cn("w-64 p-0", className)}>
        {children}
      </SheetContent>
    </Sheet>
  )
}
ResponsiveSidebar.displayName = "ResponsiveSidebar"

export { ResponsiveSidebar }
`,

  'bottom-sheet': `"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

interface BottomSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  snapPoints?: (string | number)[]
  children: React.ReactNode
  className?: string
}

const BottomSheet = ({
  open,
  onOpenChange,
  snapPoints = [0.25, 0.5, 1],
  children,
  className,
}: BottomSheetProps) => {
  return (
    <DrawerPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
    >
      {children}
    </DrawerPrimitive.Root>
  )
}

const BottomSheetTrigger = DrawerPrimitive.Trigger

const BottomSheetContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
))
BottomSheetContent.displayName = "BottomSheetContent"

const BottomSheetClose = DrawerPrimitive.Close

export { BottomSheet, BottomSheetTrigger, BottomSheetContent, BottomSheetClose }
`,

  'split-view': `"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable"

interface SplitViewProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
  defaultSizes?: number[]
  minSizes?: number[]
  children: React.ReactNode[]
}

const SplitView = React.forwardRef<HTMLDivElement, SplitViewProps>(
  (
    {
      direction = "horizontal",
      defaultSizes,
      minSizes,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const panels = React.Children.toArray(children)
    const sizes = defaultSizes || panels.map(() => 100 / panels.length)
    const mins = minSizes || panels.map(() => 10)

    return (
      <div ref={ref} className={cn("h-full w-full", className)} {...props}>
        <ResizablePanelGroup direction={direction}>
          {panels.map((child, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ResizableHandle withHandle />}
              <ResizablePanel
                defaultSize={sizes[index]}
                minSize={mins[index]}
              >
                {child}
              </ResizablePanel>
            </React.Fragment>
          ))}
        </ResizablePanelGroup>
      </div>
    )
  }
)
SplitView.displayName = "SplitView"

export { SplitView }
`,
};
