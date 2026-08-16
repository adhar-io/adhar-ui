/**
 * Breadcrumb accessibility specification.
 * Follows the WAI-ARIA Breadcrumb pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
 */
export const breadcrumbA11y = {
  role: 'navigation landmark wrapping an ordered list',
  structure: {
    nav: '<nav aria-label="Breadcrumb"> wraps the trail',
    list: '<ol> holds the items in order',
    item: '<li> per crumb',
    link: '<a> for navigable crumbs',
    current: 'The current page uses aria-current="page" and is not a link',
    separator: 'Separators are aria-hidden and role="presentation"',
  },
  ariaAttributes: {
    'aria-label="Breadcrumb"': 'Names the navigation landmark (default applied automatically)',
    'aria-current="page"': 'Marks the current page crumb',
    'aria-hidden="true"': 'Hides decorative separators from assistive tech',
  },
  notes: [
    'Use a real <nav> + <ol> so the trail is exposed as an ordered navigation landmark.',
    'Only the last crumb represents the current page — render it with BreadcrumbPage.',
    'Separators must be decorative (aria-hidden) so they are not announced.',
    'Collapse long trails with BreadcrumbEllipsis, which keeps an sr-only "More" label.',
    'Keep breadcrumbs keyboard-navigable — every link is naturally focusable.',
  ],
} as const;
