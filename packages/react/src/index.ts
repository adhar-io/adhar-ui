/**
 * @adhar-ui/react
 *
 * React components for the Adhar UI design system.
 * Each component re-exports the Mitosis-compiled component alongside its CVA style variants.
 */

// -- Utilities --
export { cn } from '@adhar-ui/utils';

// -- Tokens --
export type { Breakpoint, ThemePreset } from '@adhar-ui/tokens';
export { breakpoints, breakpointValues } from '@adhar-ui/tokens';

// -- Style variants (framework-agnostic CVA definitions) --
export { buttonVariants } from '@adhar-ui/primitives';
export type { ButtonVariants } from '../../primitives/src/components/button/button.styles.ts';
export { badgeVariants } from '@adhar-ui/primitives';
export { inputVariants } from '@adhar-ui/primitives';
export {
  cardContentVariants,
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardVariants,
} from '../../primitives/src/components/card/card.styles.ts';
export {
  alertDescriptionVariants,
  alertTitleVariants,
  alertVariants,
} from '../../primitives/src/components/alert/alert.styles.ts';
export { skeletonVariants } from '@adhar-ui/primitives';
export { separatorVariants } from '@adhar-ui/primitives';
export {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
} from '../../primitives/src/components/avatar/avatar.styles.ts';

// -- Generated React components --
export { default as Button } from './generated/src/components/button/Button.tsx';
export type { ButtonProps } from './generated/src/components/button/Button.tsx';

export { default as Badge } from './generated/src/components/badge/Badge.tsx';
export type { BadgeProps } from './generated/src/components/badge/Badge.tsx';

export { default as Input } from './generated/src/components/input/Input.tsx';
export type { InputProps } from './generated/src/components/input/Input.tsx';

export { default as Textarea } from './generated/src/components/textarea/Textarea.tsx';
export type { TextareaProps } from './generated/src/components/textarea/Textarea.tsx';

export { default as Label } from './generated/src/components/label/Label.tsx';
export type { LabelProps } from './generated/src/components/label/Label.tsx';

export { default as Checkbox } from './generated/src/components/checkbox/Checkbox.tsx';
export type { CheckboxProps } from './generated/src/components/checkbox/Checkbox.tsx';

export { default as Switch } from './generated/src/components/switch/Switch.tsx';
export type { SwitchProps } from './generated/src/components/switch/Switch.tsx';

export { default as Select } from './generated/src/components/select/Select.tsx';
export type { SelectProps } from './generated/src/components/select/Select.tsx';

export { default as Separator } from './generated/src/components/separator/Separator.tsx';
export type { SeparatorProps } from './generated/src/components/separator/Separator.tsx';

export { default as Avatar } from './generated/src/components/avatar/Avatar.tsx';
export type { AvatarProps } from './generated/src/components/avatar/Avatar.tsx';

export { default as Skeleton } from './generated/src/components/skeleton/Skeleton.tsx';
export type { SkeletonProps } from './generated/src/components/skeleton/Skeleton.tsx';

export { default as Card } from './generated/src/components/card/Card.tsx';
export type { CardProps } from './generated/src/components/card/Card.tsx';
export { default as CardHeader } from './generated/src/components/card/CardHeader.tsx';
export { default as CardTitle } from './generated/src/components/card/CardTitle.tsx';
export { default as CardDescription } from './generated/src/components/card/CardDescription.tsx';
export { default as CardContent } from './generated/src/components/card/CardContent.tsx';
export { default as CardFooter } from './generated/src/components/card/CardFooter.tsx';

export { default as Alert } from './generated/src/components/alert/Alert.tsx';
export type { AlertProps } from './generated/src/components/alert/Alert.tsx';
export { default as AlertTitle } from './generated/src/components/alert/AlertTitle.tsx';
export { default as AlertDescription } from './generated/src/components/alert/AlertDescription.tsx';

export { default as Progress } from './generated/src/components/progress/Progress.tsx';
export type { ProgressProps } from './generated/src/components/progress/Progress.tsx';

export { default as Spinner } from './generated/src/components/spinner/Spinner.tsx';
export type { SpinnerProps } from './generated/src/components/spinner/Spinner.tsx';

export { default as Tabs } from './generated/src/components/tabs/Tabs.tsx';
export type { TabsProps } from './generated/src/components/tabs/Tabs.tsx';
export { default as TabsList } from './generated/src/components/tabs/TabsList.tsx';
export { default as TabsTrigger } from './generated/src/components/tabs/TabsTrigger.tsx';
export { default as TabsContent } from './generated/src/components/tabs/TabsContent.tsx';

export { default as Dialog } from './generated/src/components/dialog/Dialog.tsx';
export type { DialogProps } from './generated/src/components/dialog/Dialog.tsx';
export { default as DialogHeader } from './generated/src/components/dialog/DialogHeader.tsx';
export { default as DialogTitle } from './generated/src/components/dialog/DialogTitle.tsx';
export { default as DialogDescription } from './generated/src/components/dialog/DialogDescription.tsx';
export { default as DialogFooter } from './generated/src/components/dialog/DialogFooter.tsx';

export { default as Tooltip } from './generated/src/components/tooltip/Tooltip.tsx';
export type { TooltipProps } from './generated/src/components/tooltip/Tooltip.tsx';

export { default as Popover } from './generated/src/components/popover/Popover.tsx';
export type { PopoverProps } from './generated/src/components/popover/Popover.tsx';

export { default as Toast } from './generated/src/components/toast/Toast.tsx';
export type { ToastProps } from './generated/src/components/toast/Toast.tsx';

export { default as Accordion } from './generated/src/components/accordion/Accordion.tsx';
export type { AccordionProps } from './generated/src/components/accordion/Accordion.tsx';
export { default as AccordionItem } from './generated/src/components/accordion/AccordionItem.tsx';
export { default as AccordionTrigger } from './generated/src/components/accordion/AccordionTrigger.tsx';
export { default as AccordionContent } from './generated/src/components/accordion/AccordionContent.tsx';

export { default as Sheet } from './generated/src/components/sheet/Sheet.tsx';
export type { SheetProps } from './generated/src/components/sheet/Sheet.tsx';
export { default as SheetHeader } from './generated/src/components/sheet/SheetHeader.tsx';
export { default as SheetTitle } from './generated/src/components/sheet/SheetTitle.tsx';
export { default as SheetDescription } from './generated/src/components/sheet/SheetDescription.tsx';
export { default as SheetFooter } from './generated/src/components/sheet/SheetFooter.tsx';

export { default as DropdownMenu } from './generated/src/components/dropdown-menu/DropdownMenu.tsx';
export type { DropdownMenuProps } from './generated/src/components/dropdown-menu/DropdownMenu.tsx';
export { default as DropdownMenuItem } from './generated/src/components/dropdown-menu/DropdownMenuItem.tsx';
export { default as DropdownMenuSeparator } from './generated/src/components/dropdown-menu/DropdownMenuSeparator.tsx';
export { default as DropdownMenuLabel } from './generated/src/components/dropdown-menu/DropdownMenuLabel.tsx';
export { default as DropdownMenuShortcut } from './generated/src/components/dropdown-menu/DropdownMenuShortcut.tsx';

// ─── Extended: Form Controls ────────────────────────────────────────────
export {
  radioGroupIndicatorVariants,
  radioGroupItemVariants,
  radioGroupVariants,
  sliderVariants,
  toggleGroupVariants,
  toggleVariants,
} from '@adhar-ui/primitives';
export type {
  RadioGroupItemVariants,
  RadioGroupVariants,
  SliderVariants,
  ToggleGroupVariants,
  ToggleVariants,
} from '@adhar-ui/primitives';

export { default as RadioGroup } from './generated/src/components/radio-group/RadioGroup.tsx';
export type { RadioGroupProps } from './generated/src/components/radio-group/RadioGroup.tsx';
export { default as RadioGroupItem } from './generated/src/components/radio-group/RadioGroupItem.tsx';
export type { RadioGroupItemProps } from './generated/src/components/radio-group/RadioGroupItem.tsx';

export { default as Slider } from './generated/src/components/slider/Slider.tsx';
export type { SliderProps } from './generated/src/components/slider/Slider.tsx';

export { default as Toggle } from './generated/src/components/toggle/Toggle.tsx';
export type { ToggleProps } from './generated/src/components/toggle/Toggle.tsx';

export { default as ToggleGroup } from './generated/src/components/toggle-group/ToggleGroup.tsx';
export type { ToggleGroupProps } from './generated/src/components/toggle-group/ToggleGroup.tsx';
export { default as ToggleGroupItem } from './generated/src/components/toggle-group/ToggleGroupItem.tsx';
export type { ToggleGroupItemProps } from './generated/src/components/toggle-group/ToggleGroupItem.tsx';

// ─── Extended: Navigation ───────────────────────────────────────────────
export {
  breadcrumbEllipsisVariants,
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbListVariants,
  breadcrumbPageVariants,
  breadcrumbSeparatorVariants,
  paginationContentVariants,
  paginationEllipsisVariants,
  paginationItemVariants,
  paginationLinkVariants,
  paginationVariants,
} from '@adhar-ui/primitives';
export type { PaginationLinkVariants } from '@adhar-ui/primitives';

export { default as Breadcrumb } from './generated/src/components/breadcrumb/Breadcrumb.tsx';
export type { BreadcrumbProps } from './generated/src/components/breadcrumb/Breadcrumb.tsx';
export { default as BreadcrumbList } from './generated/src/components/breadcrumb/BreadcrumbList.tsx';
export { default as BreadcrumbItem } from './generated/src/components/breadcrumb/BreadcrumbItem.tsx';
export { default as BreadcrumbLink } from './generated/src/components/breadcrumb/BreadcrumbLink.tsx';
export { default as BreadcrumbPage } from './generated/src/components/breadcrumb/BreadcrumbPage.tsx';
export { default as BreadcrumbSeparator } from './generated/src/components/breadcrumb/BreadcrumbSeparator.tsx';
export { default as BreadcrumbEllipsis } from './generated/src/components/breadcrumb/BreadcrumbEllipsis.tsx';

export { default as Pagination } from './generated/src/components/pagination/Pagination.tsx';
export type { PaginationProps } from './generated/src/components/pagination/Pagination.tsx';
export { default as PaginationContent } from './generated/src/components/pagination/PaginationContent.tsx';
export { default as PaginationItem } from './generated/src/components/pagination/PaginationItem.tsx';
export { default as PaginationLink } from './generated/src/components/pagination/PaginationLink.tsx';
export { default as PaginationPrevious } from './generated/src/components/pagination/PaginationPrevious.tsx';
export { default as PaginationNext } from './generated/src/components/pagination/PaginationNext.tsx';
export { default as PaginationEllipsis } from './generated/src/components/pagination/PaginationEllipsis.tsx';

// ─── Extended: Display ──────────────────────────────────────────────────
export { kbdVariants } from '@adhar-ui/primitives';
export type { KbdVariants } from '@adhar-ui/primitives';
export { default as Kbd } from './generated/src/components/kbd/Kbd.tsx';
export type { KbdProps } from './generated/src/components/kbd/Kbd.tsx';

// ─── Advanced: Command palette ──────────────────────────────────────────
export {
  commandEmptyVariants,
  commandGroupHeadingVariants,
  commandGroupVariants,
  commandInputVariants,
  commandInputWrapperVariants,
  commandItemVariants,
  commandListVariants,
  commandSeparatorVariants,
  commandShortcutVariants,
  commandVariants,
} from '@adhar-ui/primitives';
export { default as Command } from './generated/src/components/command/Command.tsx';
export type { CommandProps } from './generated/src/components/command/Command.tsx';
export { default as CommandInput } from './generated/src/components/command/CommandInput.tsx';
export { default as CommandList } from './generated/src/components/command/CommandList.tsx';
export { default as CommandGroup } from './generated/src/components/command/CommandGroup.tsx';
export { default as CommandItem } from './generated/src/components/command/CommandItem.tsx';
export { default as CommandEmpty } from './generated/src/components/command/CommandEmpty.tsx';
export { default as CommandSeparator } from './generated/src/components/command/CommandSeparator.tsx';
export { default as CommandShortcut } from './generated/src/components/command/CommandShortcut.tsx';

// ─── Advanced: Stepper ──────────────────────────────────────────────────
export {
  stepConnectorVariants,
  stepDescriptionVariants,
  stepIndicatorVariants,
  stepLabelVariants,
  stepperVariants,
  stepVariants,
} from '@adhar-ui/primitives';
export type { StepIndicatorVariants, StepperVariants } from '@adhar-ui/primitives';
export { default as Stepper } from './generated/src/components/stepper/Stepper.tsx';
export type { StepperProps } from './generated/src/components/stepper/Stepper.tsx';
export { default as Step } from './generated/src/components/stepper/Step.tsx';
export type { StepProps } from './generated/src/components/stepper/Step.tsx';

// ─── Advanced: Timeline ─────────────────────────────────────────────────
export {
  timelineConnectorVariants,
  timelineContentVariants,
  timelineDotVariants,
  timelineItemVariants,
  timelineMarkerVariants,
  timelineTimeVariants,
  timelineTitleVariants,
  timelineVariants,
} from '@adhar-ui/primitives';
export type { TimelineDotVariants } from '@adhar-ui/primitives';
export { default as Timeline } from './generated/src/components/timeline/Timeline.tsx';
export type { TimelineProps } from './generated/src/components/timeline/Timeline.tsx';
export { default as TimelineItem } from './generated/src/components/timeline/TimelineItem.tsx';
export type { TimelineItemProps } from './generated/src/components/timeline/TimelineItem.tsx';

// ─── Advanced: Stat Card & Empty State ──────────────────────────────────
export { statCardTrendVariants, statCardVariants } from '@adhar-ui/primitives';
export type { StatCardTrendVariants, StatCardVariants } from '@adhar-ui/primitives';
export { default as StatCard } from './generated/src/components/stat-card/StatCard.tsx';
export type { StatCardProps } from './generated/src/components/stat-card/StatCard.tsx';
export {
  emptyStateDescriptionVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateVariants,
} from '@adhar-ui/primitives';
export type { EmptyStateVariants } from '@adhar-ui/primitives';
export { default as EmptyState } from './generated/src/components/empty-state/EmptyState.tsx';
export type { EmptyStateProps } from './generated/src/components/empty-state/EmptyState.tsx';

// ─── Advanced: Disclosure & Layout ──────────────────────────────────────
export { collapsibleContentInnerVariants, collapsibleContentVariants } from '@adhar-ui/primitives';
export type { CollapsibleContentVariants } from '@adhar-ui/primitives';
export { default as Collapsible } from './generated/src/components/collapsible/Collapsible.tsx';
export type { CollapsibleProps } from './generated/src/components/collapsible/Collapsible.tsx';
export { default as CollapsibleTrigger } from './generated/src/components/collapsible/CollapsibleTrigger.tsx';
export { default as CollapsibleContent } from './generated/src/components/collapsible/CollapsibleContent.tsx';

export { aspectRatioVariants } from '@adhar-ui/primitives';
export type { AspectRatioVariants } from '@adhar-ui/primitives';
export { default as AspectRatio } from './generated/src/components/aspect-ratio/AspectRatio.tsx';
export type { AspectRatioProps } from './generated/src/components/aspect-ratio/AspectRatio.tsx';

export { scrollAreaVariants } from '@adhar-ui/primitives';
export type { ScrollAreaVariants } from '@adhar-ui/primitives';
export { default as ScrollArea } from './generated/src/components/scroll-area/ScrollArea.tsx';
export type { ScrollAreaProps } from './generated/src/components/scroll-area/ScrollArea.tsx';

export { hoverCardContentVariants, hoverCardVariants } from '@adhar-ui/primitives';
export type { HoverCardContentVariants } from '@adhar-ui/primitives';
export { default as HoverCard } from './generated/src/components/hover-card/HoverCard.tsx';
export type { HoverCardProps } from './generated/src/components/hover-card/HoverCard.tsx';
export { default as HoverCardTrigger } from './generated/src/components/hover-card/HoverCardTrigger.tsx';
export { default as HoverCardContent } from './generated/src/components/hover-card/HoverCardContent.tsx';

// ─── Advanced: Input OTP ────────────────────────────────────────────────
export { inputOTPVariants } from '@adhar-ui/primitives';
export type { InputOTPVariants } from '@adhar-ui/primitives';
export { default as InputOTP } from './generated/src/components/input-otp/InputOTP.tsx';
export type { InputOTPProps } from './generated/src/components/input-otp/InputOTP.tsx';

// -- Accessibility utilities --
export { announce, createFocusTrap, createRovingTabIndex, skipNavClasses } from '@adhar-ui/a11y';

// -- Icon utilities --
export { getIcon, hasIcon, registerIcon, registerIcons, renderIconSvg } from '@adhar-ui/icons';
