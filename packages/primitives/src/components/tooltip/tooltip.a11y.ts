/**
 * Tooltip accessibility specification.
 * Follows WAI-ARIA Tooltip pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 */
export const tooltipA11y = {
  role: 'tooltip',
  ariaAttributes: {
    role: '"tooltip" on the tooltip content element',
    'aria-describedby': 'Set on the trigger, referencing the tooltip ID',
    id: 'Tooltip element needs a unique ID for aria-describedby reference',
  },
  keyboard: {
    Escape: 'Dismiss the tooltip',
    focus: 'Tooltip shows on focus (keyboard accessible)',
    blur: 'Tooltip hides on blur',
  },
  trigger: {
    hover: 'Shows on mouseenter, hides on mouseleave',
    focus: 'Shows on focus, hides on blur — keyboard accessible',
    delay: 'Show after 200-500ms delay, hide immediately or after short delay',
  },
  notes: [
    'Tooltips must be keyboard accessible — show on focus, not just hover.',
    'Tooltip content should be text-only (no interactive elements).',
    'Use Popover for interactive floating content.',
    'Tooltip should remain visible while the mouse is over it.',
    'Escape key dismisses without moving focus.',
    'Touch devices: show on long-press or tap.',
  ],
} as const;
