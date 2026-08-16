/**
 * Toggle (toggle button) accessibility specification.
 * Follows the WAI-ARIA Button pattern with aria-pressed:
 * https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const toggleA11y = {
  role: 'button (with aria-pressed)',
  keyboard: {
    'Space / Enter': 'Toggle the pressed state',
    Tab: 'Move focus to/from the toggle',
  },
  ariaAttributes: {
    'aria-pressed': 'Reflects the on/off state — this is what makes it a toggle button',
    'aria-label': 'Required for icon-only toggles (e.g. bold, italic)',
    'aria-disabled': 'Set when the toggle is disabled',
  },
  notes: [
    'Use a real <button> with aria-pressed, not a checkbox, for standalone toggles.',
    'Icon-only toggles must provide an aria-label describing the action.',
    'The pressed state must be visually distinct beyond color alone.',
    'For a set of related toggles, use ToggleGroup for roving focus and grouping.',
  ],
} as const;
