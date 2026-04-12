/**
 * Checkbox accessibility specification.
 * Follows WAI-ARIA Checkbox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
 */
export const checkboxA11y = {
  role: 'checkbox',
  keyboard: {
    Space: 'Toggle checked state',
    Tab: 'Move focus to/from checkbox',
  },
  ariaAttributes: {
    'aria-checked': 'true | false | "mixed" for indeterminate state',
    'aria-required': 'Set when checkbox is required in a form',
    'aria-disabled': 'Set when checkbox is disabled',
    'aria-describedby': 'References help text or error message',
  },
  states: {
    unchecked: 'Empty checkbox with border',
    checked: 'Filled with checkmark icon',
    indeterminate: 'Filled with minus/dash icon (mixed state)',
    disabled: 'Reduced opacity, not interactive',
  },
  notes: [
    'Must have an associated label (visible or aria-label).',
    'Checkbox groups should use fieldset + legend.',
    'Indeterminate state is only settable via JavaScript.',
    'Focus indicator must be visible (focus-visible:ring).',
  ],
} as const;
