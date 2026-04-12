/**
 * Dropdown Menu accessibility specification.
 * Follows WAI-ARIA Menu pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menu/
 */
export const dropdownMenuA11y = {
  roles: {
    trigger: 'button with aria-haspopup="menu"',
    menu: 'menu — the dropdown container',
    item: 'menuitem — each selectable option',
    separator: 'separator — visual divider between groups',
    group: 'group — logical grouping of items',
    label: 'presentation — group label (not interactive)',
  },
  keyboard: {
    Enter: 'Open menu / activate focused item',
    Space: 'Open menu / activate focused item',
    Escape: 'Close menu, return focus to trigger',
    ArrowDown: 'Open menu / move to next item',
    ArrowUp: 'Move to previous item',
    Home: 'Move to first item',
    End: 'Move to last item',
    'Type-ahead': 'Focus item matching typed characters',
  },
  ariaAttributes: {
    'aria-expanded': 'Set on trigger when menu is open',
    'aria-haspopup': '"menu" on the trigger button',
    'aria-controls': 'Trigger references menu element ID',
    'aria-disabled': 'Set on disabled menu items',
    'aria-checked': 'Set on checkbox/radio menu items',
  },
  focusManagement: {
    onOpen: 'Focus moves to first menu item',
    onClose: 'Focus returns to trigger button',
    roving: 'Arrow keys move focus between items (roving tabindex)',
  },
  notes: [
    'Menu items with keyboard shortcuts should display them (role="menuitem" + aria-keyshortcuts).',
    'Destructive items should be visually distinct and optionally at the end.',
    'Sub-menus open on ArrowRight, close on ArrowLeft/Escape.',
    'Disabled items are visible but skipped during keyboard navigation.',
  ],
} as const;
