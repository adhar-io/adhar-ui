/**
 * Timeline accessibility specification.
 * A chronological list of events rendered as an ordered list.
 */
export const timelineA11y = {
  role: 'ordered list of events',
  structure: {
    list: '<ol> conveys chronological order to assistive tech',
    item: '<li> per event with a marker (dot) and content',
    time: 'Wrap timestamps in <time datetime="…"> where possible',
  },
  ariaAttributes: {
    'aria-label': 'Names the timeline (e.g. "Order history")',
    'aria-hidden': 'Decorative dots and connectors are hidden from AT',
  },
  notes: [
    'Use an <ol> so the sequence/order is exposed, not just visual.',
    'Dots and connector lines are decorative — keep them aria-hidden.',
    'Do not rely on dot color alone to convey status; include a label or icon.',
    'For live-updating feeds, consider aria-live on the container.',
  ],
} as const;
