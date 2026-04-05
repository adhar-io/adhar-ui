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
export { default as Button } from './generated/src/components/button/Button.lite.tsx';
export type { ButtonProps } from './generated/src/components/button/Button.lite.tsx';

export { default as Badge } from './generated/src/components/badge/Badge.lite.tsx';
export type { BadgeProps } from './generated/src/components/badge/Badge.lite.tsx';

export { default as Input } from './generated/src/components/input/Input.lite.tsx';
export type { InputProps } from './generated/src/components/input/Input.lite.tsx';

export { default as Textarea } from './generated/src/components/textarea/Textarea.lite.tsx';
export type { TextareaProps } from './generated/src/components/textarea/Textarea.lite.tsx';

export { default as Label } from './generated/src/components/label/Label.lite.tsx';
export type { LabelProps } from './generated/src/components/label/Label.lite.tsx';

export { default as Checkbox } from './generated/src/components/checkbox/Checkbox.lite.tsx';
export type { CheckboxProps } from './generated/src/components/checkbox/Checkbox.lite.tsx';

export { default as Switch } from './generated/src/components/switch/Switch.lite.tsx';
export type { SwitchProps } from './generated/src/components/switch/Switch.lite.tsx';

export { default as Select } from './generated/src/components/select/Select.lite.tsx';
export type { SelectProps } from './generated/src/components/select/Select.lite.tsx';

export { default as Separator } from './generated/src/components/separator/Separator.lite.tsx';
export type { SeparatorProps } from './generated/src/components/separator/Separator.lite.tsx';

export { default as Avatar } from './generated/src/components/avatar/Avatar.lite.tsx';
export type { AvatarProps } from './generated/src/components/avatar/Avatar.lite.tsx';

export { default as Skeleton } from './generated/src/components/skeleton/Skeleton.lite.tsx';
export type { SkeletonProps } from './generated/src/components/skeleton/Skeleton.lite.tsx';

export { default as Card } from './generated/src/components/card/Card.lite.tsx';
export type { CardProps } from './generated/src/components/card/Card.lite.tsx';
export { default as CardHeader } from './generated/src/components/card/CardHeader.lite.tsx';
export { default as CardTitle } from './generated/src/components/card/CardTitle.lite.tsx';
export { default as CardDescription } from './generated/src/components/card/CardDescription.lite.tsx';
export { default as CardContent } from './generated/src/components/card/CardContent.lite.tsx';
export { default as CardFooter } from './generated/src/components/card/CardFooter.lite.tsx';

export { default as Alert } from './generated/src/components/alert/Alert.lite.tsx';
export type { AlertProps } from './generated/src/components/alert/Alert.lite.tsx';
export { default as AlertTitle } from './generated/src/components/alert/AlertTitle.lite.tsx';
export { default as AlertDescription } from './generated/src/components/alert/AlertDescription.lite.tsx';

export { default as Progress } from './generated/src/components/progress/Progress.lite.tsx';
export type { ProgressProps } from './generated/src/components/progress/Progress.lite.tsx';

export { default as Spinner } from './generated/src/components/spinner/Spinner.lite.tsx';
export type { SpinnerProps } from './generated/src/components/spinner/Spinner.lite.tsx';

export { default as Tabs } from './generated/src/components/tabs/Tabs.lite.tsx';
export type { TabsProps } from './generated/src/components/tabs/Tabs.lite.tsx';
export { default as TabsList } from './generated/src/components/tabs/TabsList.lite.tsx';
export { default as TabsTrigger } from './generated/src/components/tabs/TabsTrigger.lite.tsx';
export { default as TabsContent } from './generated/src/components/tabs/TabsContent.lite.tsx';

export { default as Dialog } from './generated/src/components/dialog/Dialog.lite.tsx';
export type { DialogProps } from './generated/src/components/dialog/Dialog.lite.tsx';
export { default as DialogHeader } from './generated/src/components/dialog/DialogHeader.lite.tsx';
export { default as DialogTitle } from './generated/src/components/dialog/DialogTitle.lite.tsx';
export { default as DialogDescription } from './generated/src/components/dialog/DialogDescription.lite.tsx';
export { default as DialogFooter } from './generated/src/components/dialog/DialogFooter.lite.tsx';

export { default as Tooltip } from './generated/src/components/tooltip/Tooltip.lite.tsx';
export type { TooltipProps } from './generated/src/components/tooltip/Tooltip.lite.tsx';

export { default as Popover } from './generated/src/components/popover/Popover.lite.tsx';
export type { PopoverProps } from './generated/src/components/popover/Popover.lite.tsx';

export { default as Toast } from './generated/src/components/toast/Toast.lite.tsx';
export type { ToastProps } from './generated/src/components/toast/Toast.lite.tsx';

export { default as Accordion } from './generated/src/components/accordion/Accordion.lite.tsx';
export type { AccordionProps } from './generated/src/components/accordion/Accordion.lite.tsx';
export { default as AccordionItem } from './generated/src/components/accordion/AccordionItem.lite.tsx';
export { default as AccordionTrigger } from './generated/src/components/accordion/AccordionTrigger.lite.tsx';
export { default as AccordionContent } from './generated/src/components/accordion/AccordionContent.lite.tsx';

export { default as Sheet } from './generated/src/components/sheet/Sheet.lite.tsx';
export type { SheetProps } from './generated/src/components/sheet/Sheet.lite.tsx';

export { default as DropdownMenu } from './generated/src/components/dropdown-menu/DropdownMenu.lite.tsx';
export type { DropdownMenuProps } from './generated/src/components/dropdown-menu/DropdownMenu.lite.tsx';
export { default as DropdownMenuItem } from './generated/src/components/dropdown-menu/DropdownMenuItem.lite.tsx';
export { default as DropdownMenuSeparator } from './generated/src/components/dropdown-menu/DropdownMenuSeparator.lite.tsx';

// -- Accessibility utilities --
export { announce, createFocusTrap, createRovingTabIndex, skipNavClasses } from '@adhar-ui/a11y';

// -- Icon utilities --
export { getIcon, hasIcon, registerIcon, registerIcons, renderIconSvg } from '@adhar-ui/icons';
