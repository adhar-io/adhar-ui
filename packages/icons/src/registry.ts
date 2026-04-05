import type { IconDefinition } from './types.ts';

/**
 * Icon registry for managing SVG icons.
 * Framework-agnostic -- each framework wrapper (React, Vue, etc.)
 * reads from this registry to render icons.
 *
 * Ships with no icons by default. Icons are registered via:
 * 1. The CLI `adhar-ui add icons` which copies Lucide icons
 * 2. Custom icon registration via `registerIcon()`
 */
const icons = new Map<string, IconDefinition>();

export function registerIcon(icon: IconDefinition): void {
  icons.set(icon.name, icon);
}

export function registerIcons(iconList: IconDefinition[]): void {
  for (const icon of iconList) {
    icons.set(icon.name, icon);
  }
}

export function getIcon(name: string): IconDefinition | undefined {
  return icons.get(name);
}

export function getAllIcons(): IconDefinition[] {
  return Array.from(icons.values());
}

export function hasIcon(name: string): boolean {
  return icons.has(name);
}

/**
 * Create an SVG string from an icon definition.
 * Used by framework wrappers to render icons.
 */
export function renderIconSvg(
  icon: IconDefinition,
  props: {
    size?: number;
    strokeWidth?: number;
    color?: string;
    class?: string;
    label?: string;
  } = {},
): string {
  const { size = 24, strokeWidth = 2, color = 'currentColor', label } = props;
  const ariaAttrs = label ? `aria-label="${label}" role="img"` : 'aria-hidden="true"';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" ${ariaAttrs} class="${
    props.class ?? ''
  }">${icon.svg}</svg>`;
}

// Built-in essential icons (always available)
registerIcons([
  {
    name: 'x',
    svg: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    keywords: ['close', 'dismiss'],
  },
  {
    name: 'check',
    svg: '<path d="M20 6 9 17l-5-5"/>',
    keywords: ['done', 'complete'],
  },
  {
    name: 'chevron-down',
    svg: '<path d="m6 9 6 6 6-6"/>',
    keywords: ['expand', 'dropdown'],
  },
  {
    name: 'chevron-up',
    svg: '<path d="m18 15-6-6-6 6"/>',
    keywords: ['collapse'],
  },
  {
    name: 'chevron-left',
    svg: '<path d="m15 18-6-6 6-6"/>',
    keywords: ['back', 'previous'],
  },
  {
    name: 'chevron-right',
    svg: '<path d="m9 18 6-6-6-6"/>',
    keywords: ['next', 'forward'],
  },
  {
    name: 'search',
    svg: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    keywords: ['find', 'query'],
  },
  {
    name: 'menu',
    svg:
      '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    keywords: ['hamburger', 'navigation'],
  },
  {
    name: 'sun',
    svg:
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    keywords: ['light', 'theme'],
  },
  {
    name: 'moon',
    svg: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    keywords: ['dark', 'theme'],
  },
  {
    name: 'loader',
    svg:
      '<path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/>',
    keywords: ['spinner', 'loading'],
  },
  {
    name: 'alert-circle',
    svg:
      '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    keywords: ['error', 'warning'],
  },
  {
    name: 'info',
    svg: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    keywords: ['information'],
  },
  {
    name: 'copy',
    svg:
      '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    keywords: ['clipboard', 'duplicate'],
  },
  {
    name: 'send',
    svg:
      '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    keywords: ['submit', 'message'],
  },
  {
    name: 'thumbs-up',
    svg:
      '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>',
    keywords: ['like', 'feedback'],
  },
  {
    name: 'thumbs-down',
    svg:
      '<path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>',
    keywords: ['dislike', 'feedback'],
  },
]);
