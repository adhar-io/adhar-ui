/**
 * @adhar-ui/primitives
 *
 * Headless component primitives for the Adhar UI design system.
 * This package contains Mitosis source components that compile to
 * framework-specific outputs (React, Vue, Solid, Svelte, Angular).
 *
 * These files are NOT consumed directly by end users.
 * Instead, use the framework-specific packages:
 *   - @adhar-ui/react
 *   - @adhar-ui/vue
 *   - @adhar-ui/solid
 *   - @adhar-ui/svelte
 *   - @adhar-ui/angular
 */

// ─── Form Controls ──────────────────────────────────────────────────────
export { buttonVariants } from './components/button/button.styles.ts';
export { inputVariants, labelVariants as inputLabelVariants } from './components/input/input.styles.ts';
export { textareaVariants } from './components/textarea/textarea.styles.ts';
export { selectTriggerVariants, selectContentVariants, selectItemVariants } from './components/select/select.styles.ts';
export { checkboxVariants } from './components/checkbox/checkbox.styles.ts';
export { switchVariants, switchThumbVariants } from './components/switch/switch.styles.ts';
export { labelVariants } from './components/label/label.styles.ts';

// ─── Display ────────────────────────────────────────────────────────────
export { badgeVariants } from './components/badge/badge.styles.ts';
export { avatarVariants, avatarImageVariants, avatarFallbackVariants } from './components/avatar/avatar.styles.ts';
export { progressVariants, progressIndicatorVariants } from './components/progress/progress.styles.ts';
export { skeletonVariants } from './components/skeleton/skeleton.styles.ts';
export { spinnerVariants } from './components/spinner/spinner.styles.ts';
export { separatorVariants } from './components/separator/separator.styles.ts';

// ─── Layout & Composite ────────────────────────────────────────────────
export { cardVariants, cardHeaderVariants, cardTitleVariants, cardDescriptionVariants, cardContentVariants, cardFooterVariants } from './components/card/card.styles.ts';
export { tabsListVariants, tabsTriggerVariants, tabsContentVariants } from './components/tabs/tabs.styles.ts';
export { accordionItemVariants, accordionTriggerVariants, accordionContentVariants } from './components/accordion/accordion.styles.ts';

// ─── Feedback & Overlay ────────────────────────────────────────────────
export { alertVariants, alertTitleVariants, alertDescriptionVariants } from './components/alert/alert.styles.ts';
export { dialogOverlayVariants, dialogContentVariants, dialogHeaderVariants, dialogFooterVariants, dialogTitleVariants, dialogDescriptionVariants, dialogCloseVariants } from './components/dialog/dialog.styles.ts';
export { toastVariants, toastTitleVariants, toastDescriptionVariants, toastCloseVariants } from './components/toast/toast.styles.ts';
export { tooltipContentVariants } from './components/tooltip/tooltip.styles.ts';
export { popoverContentVariants } from './components/popover/popover.styles.ts';
export { sheetContentVariants, sheetOverlayVariants, sheetHeaderVariants, sheetFooterVariants, sheetTitleVariants, sheetDescriptionVariants } from './components/sheet/sheet.styles.ts';
export { dropdownMenuContentVariants, dropdownMenuItemVariants, dropdownMenuSeparatorVariants, dropdownMenuLabelVariants, dropdownMenuShortcutVariants } from './components/dropdown-menu/dropdown-menu.styles.ts';

// ─── Form Controls (extended) ──────────────────────────────────────────
export { radioGroupVariants, radioGroupItemVariants, radioGroupIndicatorVariants } from './components/radio-group/radio-group.styles.ts';
export { sliderVariants } from './components/slider/slider.styles.ts';
export { toggleVariants } from './components/toggle/toggle.styles.ts';
export { toggleGroupVariants } from './components/toggle-group/toggle-group.styles.ts';

// ─── Navigation ────────────────────────────────────────────────────────
export { breadcrumbListVariants, breadcrumbItemVariants, breadcrumbLinkVariants, breadcrumbPageVariants, breadcrumbSeparatorVariants, breadcrumbEllipsisVariants } from './components/breadcrumb/breadcrumb.styles.ts';
export { paginationVariants, paginationContentVariants, paginationItemVariants, paginationLinkVariants, paginationEllipsisVariants } from './components/pagination/pagination.styles.ts';

// ─── Display (extended) ────────────────────────────────────────────────
export { kbdVariants } from './components/kbd/kbd.styles.ts';

// ─── Types ──────────────────────────────────────────────────────────────
export type { ButtonProps } from './components/button/button.types.ts';
export type { ButtonVariants } from './components/button/button.styles.ts';
export type { InputVariants } from './components/input/input.styles.ts';
export type { CardVariants } from './components/card/card.styles.ts';
export type { AlertVariants } from './components/alert/alert.styles.ts';
export type { BadgeVariants } from './components/badge/badge.styles.ts';
export type { SkeletonVariants } from './components/skeleton/skeleton.styles.ts';
export type { SeparatorVariants } from './components/separator/separator.styles.ts';
export type { AvatarVariants } from './components/avatar/avatar.styles.ts';
export type { SwitchVariants } from './components/switch/switch.styles.ts';
export type { CheckboxVariants } from './components/checkbox/checkbox.styles.ts';
export type { TextareaVariants } from './components/textarea/textarea.styles.ts';
export type { ProgressVariants } from './components/progress/progress.styles.ts';
export type { SpinnerVariants } from './components/spinner/spinner.styles.ts';
export type { LabelVariants } from './components/label/label.styles.ts';
export type { ToastVariants } from './components/toast/toast.styles.ts';
export type { SheetVariants } from './components/sheet/sheet.styles.ts';
export type { RadioGroupProps, RadioGroupItemProps } from './components/radio-group/radio-group.types.ts';
export type { RadioGroupVariants, RadioGroupItemVariants } from './components/radio-group/radio-group.styles.ts';
export type { SliderProps } from './components/slider/slider.types.ts';
export type { SliderVariants } from './components/slider/slider.styles.ts';
export type { ToggleProps } from './components/toggle/toggle.types.ts';
export type { ToggleVariants } from './components/toggle/toggle.styles.ts';
export type { ToggleGroupProps, ToggleGroupItemProps } from './components/toggle-group/toggle-group.types.ts';
export type { ToggleGroupVariants } from './components/toggle-group/toggle-group.styles.ts';
export type { PaginationLinkVariants } from './components/pagination/pagination.styles.ts';
export type { KbdProps } from './components/kbd/kbd.types.ts';
export type { KbdVariants } from './components/kbd/kbd.styles.ts';
