export const buttonA11y = {
  role: 'button',
  keyboard: {
    Enter: 'Activate the button',
    Space: 'Activate the button',
  },
  ariaAttributes: {
    'aria-disabled': 'Set when button is disabled',
    'aria-pressed': 'Set for toggle buttons',
    'aria-expanded': 'Set when button controls expandable content',
  },
  focusManagement: {
    focusable: true,
    focusVisible: 'Ring style via focus-visible:ring-2',
  },
  notes: [
    'Minimum touch target size of 44x44px on mobile (enforced via min-h-touch)',
    'Disabled buttons use aria-disabled over the disabled attribute when in a form group',
  ],
} as const;
