/**
 * Skeleton accessibility specification.
 */
export const skeletonA11y = {
  ariaAttributes: {
    'aria-busy': 'true on the parent container while loading',
    'aria-hidden': 'true on individual skeleton elements (they are decorative)',
    'aria-label': 'Set on parent: "Loading content" or specific like "Loading user profile"',
  },
  liveRegion: {
    'aria-live': '"polite" on the container — announces when loading completes',
  },
  notes: [
    'Skeleton elements are decorative — hide from screen readers with aria-hidden.',
    'Parent container should have aria-busy="true" during loading.',
    'When content loads, remove aria-busy and skeleton — screen reader announces via aria-live.',
    'Animation uses animate-pulse — disabled via motion-reduce:animate-none.',
    'Provide an accessible loading message for screen reader users.',
  ],
} as const;
