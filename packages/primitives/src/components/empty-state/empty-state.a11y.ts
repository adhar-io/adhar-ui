/**
 * Empty State accessibility specification.
 * Shown when a collection/search/screen has no content yet.
 */
export const emptyStateA11y = {
  role: 'status region with a heading and optional actions',
  ariaAttributes: {
    'role="status"': 'Announces the empty state when it appears after a load/search',
    'aria-hidden': 'The decorative icon/illustration is hidden from AT',
  },
  notes: [
    'Use a real heading (<h3>) so the empty state is part of the page outline.',
    'Explain why it is empty and what to do next — pair copy with a clear primary action.',
    'Keep the illustration decorative (aria-hidden); the text must stand on its own.',
    'For "no search results", announce it via role="status" so it is read after typing.',
    'Ensure action buttons are keyboard reachable with visible focus.',
  ],
} as const;
