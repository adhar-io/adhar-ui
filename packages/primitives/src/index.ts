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
export {
  inputVariants,
  labelVariants as inputLabelVariants,
} from './components/input/input.styles.ts';
export { textareaVariants } from './components/textarea/textarea.styles.ts';
export {
  selectContentVariants,
  selectItemVariants,
  selectLabelVariants,
  selectSeparatorVariants,
  selectTriggerVariants,
} from './components/select/select.styles.ts';
export { checkboxVariants } from './components/checkbox/checkbox.styles.ts';
export { switchThumbVariants, switchVariants } from './components/switch/switch.styles.ts';
export { labelVariants } from './components/label/label.styles.ts';

// ─── Display ────────────────────────────────────────────────────────────
export { badgeVariants } from './components/badge/badge.styles.ts';
export {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
} from './components/avatar/avatar.styles.ts';
export {
  progressIndicatorVariants,
  progressVariants,
} from './components/progress/progress.styles.ts';
export { skeletonVariants } from './components/skeleton/skeleton.styles.ts';
export { spinnerVariants } from './components/spinner/spinner.styles.ts';
export { separatorVariants } from './components/separator/separator.styles.ts';

// ─── Layout & Composite ────────────────────────────────────────────────
export {
  cardContentVariants,
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardVariants,
} from './components/card/card.styles.ts';
export {
  tabsContentVariants,
  tabsListVariants,
  tabsTriggerVariants,
} from './components/tabs/tabs.styles.ts';
export {
  accordionContentVariants,
  accordionItemVariants,
  accordionTriggerVariants,
} from './components/accordion/accordion.styles.ts';

// ─── Feedback & Overlay ────────────────────────────────────────────────
export {
  alertDescriptionVariants,
  alertTitleVariants,
  alertVariants,
} from './components/alert/alert.styles.ts';
export {
  dialogCloseVariants,
  dialogContentVariants,
  dialogDescriptionVariants,
  dialogFooterVariants,
  dialogHeaderVariants,
  dialogOverlayVariants,
  dialogTitleVariants,
} from './components/dialog/dialog.styles.ts';
export {
  toastCloseVariants,
  toastDescriptionVariants,
  toastTitleVariants,
  toastVariants,
} from './components/toast/toast.styles.ts';
export { tooltipContentVariants } from './components/tooltip/tooltip.styles.ts';
export { popoverContentVariants } from './components/popover/popover.styles.ts';
export {
  sheetCloseVariants,
  sheetContentVariants,
  sheetDescriptionVariants,
  sheetFooterVariants,
  sheetHeaderVariants,
  sheetOverlayVariants,
  sheetTitleVariants,
} from './components/sheet/sheet.styles.ts';
export { placementVariants } from './components/_internal/placement.styles.ts';
export type { PlacementVariants } from './components/_internal/placement.styles.ts';
export {
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  dropdownMenuLabelVariants,
  dropdownMenuSeparatorVariants,
  dropdownMenuShortcutVariants,
} from './components/dropdown-menu/dropdown-menu.styles.ts';

// ─── Form Controls (extended) ──────────────────────────────────────────
export {
  radioGroupIndicatorVariants,
  radioGroupItemVariants,
  radioGroupVariants,
} from './components/radio-group/radio-group.styles.ts';
export { sliderVariants } from './components/slider/slider.styles.ts';
export { toggleVariants } from './components/toggle/toggle.styles.ts';
export { toggleGroupVariants } from './components/toggle-group/toggle-group.styles.ts';

// ─── Navigation ────────────────────────────────────────────────────────
export {
  breadcrumbEllipsisVariants,
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbListVariants,
  breadcrumbPageVariants,
  breadcrumbSeparatorVariants,
} from './components/breadcrumb/breadcrumb.styles.ts';
export {
  paginationContentVariants,
  paginationEllipsisVariants,
  paginationItemVariants,
  paginationLinkVariants,
  paginationVariants,
} from './components/pagination/pagination.styles.ts';

// ─── Display (extended) ────────────────────────────────────────────────
export { kbdVariants } from './components/kbd/kbd.styles.ts';

// ─── Advanced Components ───────────────────────────────────────────────
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
} from './components/command/command.styles.ts';
export {
  stepConnectorVariants,
  stepDescriptionVariants,
  stepIndicatorVariants,
  stepLabelVariants,
  stepperVariants,
  stepVariants,
} from './components/stepper/stepper.styles.ts';
export {
  timelineConnectorVariants,
  timelineContentVariants,
  timelineDotVariants,
  timelineItemVariants,
  timelineMarkerVariants,
  timelineTimeVariants,
  timelineTitleVariants,
  timelineVariants,
} from './components/timeline/timeline.styles.ts';
export {
  statCardTrendVariants,
  statCardVariants,
} from './components/stat-card/stat-card.styles.ts';
export {
  emptyStateDescriptionVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateVariants,
} from './components/empty-state/empty-state.styles.ts';
export {
  collapsibleContentInnerVariants,
  collapsibleContentVariants,
} from './components/collapsible/collapsible.styles.ts';
export { aspectRatioVariants } from './components/aspect-ratio/aspect-ratio.styles.ts';
export { scrollAreaVariants } from './components/scroll-area/scroll-area.styles.ts';
export {
  hoverCardContentVariants,
  hoverCardVariants,
} from './components/hover-card/hover-card.styles.ts';
export { inputOTPVariants } from './components/input-otp/input-otp.styles.ts';

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
export type {
  RadioGroupItemProps,
  RadioGroupProps,
} from './components/radio-group/radio-group.types.ts';
export type {
  RadioGroupItemVariants,
  RadioGroupVariants,
} from './components/radio-group/radio-group.styles.ts';
export type { SliderProps } from './components/slider/slider.types.ts';
export type { SliderVariants } from './components/slider/slider.styles.ts';
export type { ToggleProps } from './components/toggle/toggle.types.ts';
export type { ToggleVariants } from './components/toggle/toggle.styles.ts';
export type {
  ToggleGroupItemProps,
  ToggleGroupProps,
} from './components/toggle-group/toggle-group.types.ts';
export type { ToggleGroupVariants } from './components/toggle-group/toggle-group.styles.ts';
export type { PaginationLinkVariants } from './components/pagination/pagination.styles.ts';
export type { KbdProps } from './components/kbd/kbd.types.ts';
export type { KbdVariants } from './components/kbd/kbd.styles.ts';
export type {
  StepIndicatorVariants,
  StepperVariants,
} from './components/stepper/stepper.styles.ts';
export type { TimelineDotVariants } from './components/timeline/timeline.styles.ts';
export type {
  StatCardTrendVariants,
  StatCardVariants,
} from './components/stat-card/stat-card.styles.ts';
export type { EmptyStateVariants } from './components/empty-state/empty-state.styles.ts';
export type { CollapsibleContentVariants } from './components/collapsible/collapsible.styles.ts';
export type { AspectRatioVariants } from './components/aspect-ratio/aspect-ratio.styles.ts';
export type { ScrollAreaVariants } from './components/scroll-area/scroll-area.styles.ts';
export type { HoverCardContentVariants } from './components/hover-card/hover-card.styles.ts';
export type { InputOTPVariants } from './components/input-otp/input-otp.styles.ts';
