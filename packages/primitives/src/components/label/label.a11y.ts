/**
 * Label accessibility specification.
 */
export const labelA11y = {
  element: 'label',
  ariaAttributes: {
    htmlFor: 'Must match the id of the associated form control',
    'aria-required': 'Visual indicator (*) for required fields — pair with aria-required on the input',
  },
  behavior: {
    click: 'Clicking the label focuses/activates the associated form control',
    association: 'Use htmlFor/id pairing — not nesting (for consistent behavior across frameworks)',
  },
  notes: [
    'Every form control must have a label — visible or aria-label.',
    'Labels should be concise and descriptive.',
    'Required field indicator should use both visual (*) and aria-required.',
    'peer-disabled:opacity-70 dims the label when its input is disabled.',
    'Help text goes in a separate element referenced by aria-describedby on the input.',
  ],
} as const;
