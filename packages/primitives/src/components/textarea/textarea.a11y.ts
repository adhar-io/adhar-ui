/**
 * Textarea accessibility specification.
 * Extends input accessibility for multi-line text.
 */
export const textareaA11y = {
  role: 'textbox',
  ariaAttributes: {
    'aria-multiline': 'true — distinguishes from single-line input for screen readers',
    'aria-invalid': 'Set when validation fails',
    'aria-required': 'Set when field is mandatory',
    'aria-describedby': 'References error message, help text, or character count',
    'aria-label': 'Required when no visible label is present',
  },
  keyboard: {
    Tab: 'Focus/unfocus the textarea',
    Enter: 'Insert new line (does NOT submit form)',
    'Ctrl+Enter': 'Common convention for form submission from textarea',
  },
  notes: [
    'Must have an associated label.',
    'Character count should be announced via aria-describedby.',
    'resize-y allows vertical resizing; resize-none disables resizing.',
    'Auto-growing textareas should announce height changes via aria-live.',
    'Placeholder is not a label substitute.',
  ],
} as const;
