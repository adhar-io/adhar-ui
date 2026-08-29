/**
 * Stepper accessibility specification.
 * A process/progress indicator rendered as an ordered list of steps.
 */
export const stepperA11y = {
  role: 'ordered list of steps',
  structure: {
    list: '<ol> wraps the steps in order',
    step: '<li> per step; the active step sets aria-current="step"',
    indicator: 'A <button> when clickable, else a static marker; complete steps show a check',
  },
  ariaAttributes: {
    'aria-current="step"': 'Marks the step the user is currently on',
    'aria-label': 'Names the whole stepper (e.g. "Checkout progress")',
    'aria-disabled': 'Set on non-navigable step buttons',
  },
  keyboard: {
    Tab: 'Move between clickable step buttons',
    'Enter / Space': 'Activate a clickable step',
  },
  notes: [
    'Convey step state with more than color — the check icon, number, and ring all reinforce it.',
    'Only mark one step aria-current="step" at a time.',
    'For non-linear steppers make completed steps clickable; keep upcoming steps disabled.',
    'Connectors are decorative (aria-hidden).',
    'Announce validation errors on the step (state="error") and via the form field itself.',
  ],
} as const;
