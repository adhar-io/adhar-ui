/**
 * Stat Card accessibility specification.
 * A dashboard KPI tile: label, value, and an optional trend.
 */
export const statCardA11y = {
  role: 'group / figure conveying a single metric',
  ariaAttributes: {
    'aria-label': 'When interactive, give the card a label describing the metric and value',
    role: 'Use role="button" (or render a real button/link) when the card is clickable',
  },
  notes: [
    'Never rely on trend color alone — the up/down arrow and the +/- sign carry the meaning too.',
    'Use tabular-nums so values stay aligned as they update.',
    'If the value updates live, wrap it in an aria-live="polite" region.',
    'Interactive cards must be reachable by keyboard and show a focus ring.',
    'Keep the trend badge text (e.g. "+12.5%") readable by screen readers, not just the arrow.',
  ],
} as const;
