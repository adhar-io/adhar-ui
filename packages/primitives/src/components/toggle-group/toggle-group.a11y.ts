/**
 * Toggle Group accessibility specification.
 * A grouped set of toggle buttons. Single-select variants may use
 * radiogroup semantics; multi-select uses grouped toggle buttons.
 * https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const toggleGroupA11y = {
  role: 'group (container) + button[aria-pressed] (items)',
  keyboard: {
    Tab: 'Move focus into the group (single tab stop with roving tabindex)',
    'ArrowRight / ArrowDown': 'Move focus to the next item',
    'ArrowLeft / ArrowUp': 'Move focus to the previous item',
    'Space / Enter': 'Toggle the focused item',
  },
  ariaAttributes: {
    'role="group"': 'Wraps the related toggles',
    'aria-label / aria-labelledby': 'Names the group (e.g. "Text alignment")',
    'aria-pressed': 'Set per item to reflect on/off state',
    'aria-disabled': 'Set on the group or individual items',
  },
  focusManagement: {
    rovingTabIndex:
      'Use createRovingTabIndex from @adhar-ui/a11y so the group is a single tab stop and arrows move between items.',
  },
  notes: [
    'Name the group so its purpose is announced ("Text formatting", "View mode").',
    'For single-select groups, ensure only one item is pressed at a time.',
    'Icon-only items each need an aria-label.',
    'The segmented (attached) layout is visual only — keep the grouping semantics intact.',
  ],
} as const;
