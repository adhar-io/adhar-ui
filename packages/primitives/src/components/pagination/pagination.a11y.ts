/**
 * Pagination accessibility specification.
 * A navigation landmark listing page links.
 * https://www.w3.org/WAI/ARIA/apg/
 */
export const paginationA11y = {
  role: 'navigation landmark wrapping a list of page links',
  structure: {
    nav: '<nav role="navigation" aria-label="Pagination">',
    list: '<ul> of <li> items',
    link: '<a> per page; the current page uses aria-current="page"',
    prevNext: 'Previous/Next links carry descriptive aria-labels',
    ellipsis: 'Ellipsis is aria-hidden with an sr-only "More pages" label',
  },
  ariaAttributes: {
    'aria-label="Pagination"': 'Names the navigation landmark (applied by default)',
    'aria-current="page"': 'Marks the active page link',
    'aria-disabled="true"': 'Disables Previous/Next at the range boundaries',
  },
  notes: [
    'Wrap page links in a <nav aria-label="Pagination"> so multiple navs stay distinguishable.',
    'Mark the current page with aria-current="page" — not just a visual style.',
    'Give Previous/Next accessible labels ("Go to previous page").',
    'Disabled Previous/Next should set aria-disabled and prevent navigation.',
    'The ellipsis is decorative; keep an sr-only label so its meaning is not lost.',
  ],
} as const;
