/**
 * Popover accessibility specification.
 * Follows WAI-ARIA Dialog (non-modal) pattern.
 */
export const popoverA11y = {
  role: 'dialog',
  ariaAttributes: {
    'aria-modal': 'false — popover is non-modal (background remains interactive)',
    'aria-labelledby': 'References the popover heading if present',
    'aria-describedby': 'References popover description',
  },
  keyboard: {
    Escape: 'Close the popover',
    Tab: 'Move focus within popover content, then out to next element',
  },
  focusManagement: {
    onOpen: 'Focus moves to first focusable element inside popover',
    onClose: 'Focus returns to trigger element',
    trap: 'No focus trap — Tab can leave the popover (non-modal)',
  },
  notes: [
    'Trigger should have aria-expanded and aria-controls.',
    'Popover closes on outside click and Escape.',
    'Position adapts to viewport (flip/shift) to stay visible.',
    'Non-modal: background content remains accessible to screen readers.',
  ],
} as const;
