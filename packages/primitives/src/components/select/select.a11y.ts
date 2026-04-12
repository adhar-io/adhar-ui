/**
 * Select accessibility specification.
 * Follows WAI-ARIA Listbox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/listbox/
 */
export const selectA11y = {
  roles: {
    trigger: 'combobox — the button that opens the dropdown',
    content: 'listbox — the dropdown option list',
    item: 'option — each selectable item',
  },
  keyboard: {
    Enter: 'Open dropdown / select focused option',
    Space: 'Open dropdown / select focused option',
    Escape: 'Close dropdown without selecting',
    ArrowDown: 'Open dropdown / move to next option',
    ArrowUp: 'Move to previous option',
    Home: 'Move to first option',
    End: 'Move to last option',
    'Type-ahead': 'Focus option matching typed characters',
  },
  ariaAttributes: {
    'aria-expanded': 'Set on trigger when dropdown is open',
    'aria-haspopup': '"listbox" on the trigger',
    'aria-activedescendant': 'ID of focused option',
    'aria-selected': 'Set on the currently selected option',
    'aria-disabled': 'Set on disabled options',
  },
  notes: [
    'Focus returns to trigger when dropdown closes.',
    'Selected value must be announced by screen readers.',
    'Groups use role="group" with aria-label.',
    'Disabled options are visible but not selectable.',
  ],
} as const;
