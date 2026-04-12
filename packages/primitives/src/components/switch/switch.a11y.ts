/**
 * Switch accessibility specification.
 * Follows WAI-ARIA Switch pattern: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
 */
export const switchA11y = {
  role: 'switch',
  keyboard: {
    Space: 'Toggle the switch',
    Enter: 'Toggle the switch',
    Tab: 'Move focus to/from the switch',
  },
  ariaAttributes: {
    'aria-checked': 'true when on, false when off',
    'aria-disabled': 'Set when switch is disabled',
    'aria-label': 'Required if no visible label is associated',
    'aria-describedby': 'References descriptive text explaining the switch effect',
  },
  notes: [
    'Switch implies immediate effect — use Checkbox for deferred actions.',
    'Must have an associated label.',
    'State change should be announced by screen readers.',
    'Reduced motion: thumb transition disabled via motion-reduce:transition-none.',
  ],
} as const;
