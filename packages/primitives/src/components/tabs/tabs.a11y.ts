/**
 * Tabs accessibility specification.
 * Follows WAI-ARIA Tabs pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
export const tabsA11y = {
  roles: {
    tablist: 'Container for tab triggers',
    tab: 'Each trigger button',
    tabpanel: 'Content panel associated with a tab',
  },
  keyboard: {
    ArrowLeft: 'Move to previous tab',
    ArrowRight: 'Move to next tab',
    Home: 'Move to first tab',
    End: 'Move to last tab',
    Tab: 'Move focus into the active tabpanel',
  },
  ariaAttributes: {
    'aria-selected': 'Set on active tab trigger',
    'aria-controls': 'Tab trigger references its tabpanel',
    'aria-labelledby': 'Tabpanel references its tab trigger',
    'tabindex': '0 for active tab, -1 for inactive tabs (roving tabindex)',
  },
  notes: [
    'Only the active tab trigger is in the tab order.',
    'Arrow keys navigate between tabs (roving tabindex pattern).',
    'Tab content should be announced when switching tabs.',
    'Disabled tabs should remain visible but not selectable.',
  ],
} as const;
