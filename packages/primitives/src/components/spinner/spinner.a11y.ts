/**
 * Spinner accessibility specification.
 */
export const spinnerA11y = {
  role: 'status',
  ariaAttributes: {
    role: '"status" — announces loading state to screen readers',
    'aria-label': '"Loading" or specific like "Saving changes"',
    'aria-live': '"polite" — announced without interrupting current speech',
  },
  visual: {
    animation: 'animate-spin for rotation, animate-pulse for pulsing variants',
    reducedMotion: 'motion-reduce:animate-none — stops animation for vestibular disorders',
  },
  notes: [
    'Always provide text alternative: aria-label or adjacent sr-only text.',
    'Spinner in a button should not replace the button label — show both.',
    'Full-page spinners should use aria-busy="true" on the main content area.',
    'Remove spinner and role="status" when loading completes.',
    'SVG spinners should have aria-hidden="true" — the role="status" container provides the label.',
  ],
} as const;
