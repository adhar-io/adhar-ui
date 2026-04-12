/**
 * Separator accessibility specification.
 */
export const separatorA11y = {
  role: 'separator',
  ariaAttributes: {
    role: '"separator" — indicates a thematic break between content',
    'aria-orientation': '"horizontal" (default) or "vertical"',
  },
  notes: [
    'Decorative separators can use role="none" or aria-hidden="true".',
    'Semantic separators use role="separator" to indicate content grouping.',
    'The <hr> element has implicit separator role.',
    'Vertical separators need explicit aria-orientation="vertical".',
  ],
} as const;
