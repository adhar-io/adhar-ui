/**
 * Button accessibility specification.
 * Follows WAI-ARIA Button pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const buttonA11y = {
  role: 'button',
  keyboard: {
    Enter: 'Activate the button',
    Space: 'Activate the button',
    Tab: 'Move focus to the next focusable element',
    'Shift+Tab': 'Move focus to the previous focusable element',
  },
  ariaAttributes: {
    'aria-disabled':
      'Set when button is disabled or loading. Preferred over HTML disabled for screen reader announcements.',
    'aria-pressed': 'Set for toggle buttons to indicate pressed/unpressed state.',
    'aria-expanded': 'Set when button controls expandable content (dropdown, accordion).',
    'aria-controls': 'ID of the element this button controls.',
    'aria-label': 'Required when button has no visible text (icon-only buttons).',
    'aria-busy': 'Set to true during loading state.',
    'aria-haspopup': 'Set when button opens a menu, listbox, or dialog.',
  },
  focusManagement: {
    focusable: true,
    focusVisible:
      'Visible focus ring via focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    focusOrder: 'Follows DOM order. Use tabindex="-1" to remove from tab order when disabled.',
  },
  motionPreferences: {
    reducedMotion: 'All transitions disabled via motion-reduce:transition-none',
    activeScale: 'Press feedback (scale-[0.98]) disabled when prefers-reduced-motion is set',
  },
  touchTargets: {
    mobile: 'Minimum 44x44px touch target on mobile (min-h-[44px] min-w-[44px])',
    desktop: 'Standard sizing on desktop (sm:min-h-0 sm:min-w-0)',
  },
  colorContrast: {
    default: 'Primary foreground on primary background — WCAG AA minimum 4.5:1 ratio',
    destructive: 'White on red — WCAG AA compliant',
    outline: 'Foreground on transparent — inherits page contrast',
  },
  notes: [
    'Use <button> element, never <div> or <a> for button behavior.',
    'Disabled buttons remain in the tab order with aria-disabled="true" for discoverability.',
    'Loading buttons show spinner and set aria-busy="true".',
    'Icon-only buttons must have aria-label or visually hidden text.',
    'Button groups should use role="group" on the container.',
    'Destructive actions should have a confirmation step (AlertDialog).',
  ],
} as const;
