/**
 * Input accessibility specification.
 * Follows HTML input best practices with WAI-ARIA enhancements.
 */
export const inputA11y = {
  role: 'textbox',
  keyboard: {
    Tab: 'Focus/unfocus the input',
    Enter: 'Submit the form (when inside a form)',
  },
  ariaAttributes: {
    'aria-invalid': 'Set to true when validation fails — triggers destructive border',
    'aria-required': 'Indicates the field is mandatory',
    'aria-describedby': 'References error message or help text element',
    'aria-label': 'Required when no visible label is associated',
  },
  labelAssociation: {
    method: 'Use <Label htmlFor="id"> paired with <Input id="id">',
    requirement: 'Every input must have an associated label — visible or aria-label',
  },
  states: {
    disabled: 'cursor-not-allowed, opacity-50, not focusable',
    error: 'border-destructive, focus ring changes to destructive color',
    readonly: 'Focusable but not editable',
  },
  notes: [
    'Use type attribute correctly: email, password, number, tel, url, search.',
    'Placeholder is not a substitute for a label.',
    'Error messages should be associated via aria-describedby.',
    'File inputs have custom styling for the file selector button.',
  ],
} as const;
