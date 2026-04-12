/**
 * Avatar accessibility specification.
 */
export const avatarA11y = {
  role: 'img',
  ariaAttributes: {
    alt: 'Required on <img> — describes the person ("Photo of Jane Doe")',
    'aria-label': 'Set on fallback initials to describe who they represent',
    role: '"img" on the fallback container when no image is present',
  },
  notes: [
    'Image avatars must have meaningful alt text.',
    'Fallback initials should have aria-label with the full name.',
    'Decorative avatars (in lists with adjacent text) can use alt="".',
    'Avatar groups should announce count: "5 team members, showing 3".',
    'Status indicators (online/offline dot) need sr-only text.',
  ],
} as const;
