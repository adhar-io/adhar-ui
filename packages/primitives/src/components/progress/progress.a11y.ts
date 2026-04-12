/**
 * Progress accessibility specification.
 * Follows WAI-ARIA Progressbar pattern: https://www.w3.org/WAI/ARIA/apg/patterns/meter/
 */
export const progressA11y = {
  role: 'progressbar',
  ariaAttributes: {
    'aria-valuenow': 'Current progress value (0-100)',
    'aria-valuemin': '0 — minimum value',
    'aria-valuemax': '100 — maximum value',
    'aria-valuetext': 'Human-readable value, e.g. "66% complete"',
    'aria-label': 'Describes what is progressing, e.g. "File upload progress"',
    'aria-busy': 'true while the associated operation is in progress',
  },
  indeterminate: {
    behavior: 'Omit aria-valuenow for indeterminate progress (loading spinners)',
    visual: 'Animate the bar continuously without a specific position',
  },
  notes: [
    'Use aria-valuetext for meaningful descriptions ("Uploading 3 of 10 files").',
    'Progress bars should be associated with the operation they represent.',
    'Color should not be the only indicator — pair with percentage text.',
    'Indeterminate progress omits aria-valuenow (screen reader says "busy").',
  ],
} as const;
