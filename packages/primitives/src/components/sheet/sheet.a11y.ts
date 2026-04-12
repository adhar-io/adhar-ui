/**
 * Sheet accessibility specification.
 * Follows WAI-ARIA Dialog (modal) pattern — same as Dialog but slides from edge.
 */
export const sheetA11y = {
  role: 'dialog',
  ariaAttributes: {
    'aria-modal': 'true — blocks interaction with background content',
    'aria-labelledby': 'References the sheet title',
    'aria-describedby': 'References the sheet description',
  },
  keyboard: {
    Escape: 'Close the sheet',
    Tab: 'Cycle focus within the sheet (focus trapped)',
    'Shift+Tab': 'Reverse cycle focus within the sheet',
  },
  focusManagement: {
    onOpen: 'Focus moves to first focusable element (or close button)',
    onClose: 'Focus returns to the trigger element',
    focusTrap: 'Tab key is trapped within the sheet',
  },
  notes: [
    'Sheet slides from a screen edge (top, bottom, left, right).',
    'Background content gets aria-hidden="true" and inert.',
    'Overlay click closes the sheet.',
    'Slide animation respects prefers-reduced-motion.',
    'Use for secondary navigation, filters, or quick edit forms.',
  ],
} as const;
