/**
 * Generate design kit assets for Figma and Penpot.
 *
 * Outputs:
 *   public/downloads/adhar-ui-design-tokens.json   — W3C DTCG design tokens
 *   public/downloads/adhar-ui-figma-kit.svg         — SVG component library for Figma import
 *   public/downloads/adhar-ui-penpot-kit.svg         — SVG component library for Penpot import
 *   public/downloads/adhar-ui-color-palette.svg      — Color palette reference sheet
 */

const LIGHT_TOKENS = {
  background: '#ffffff',
  foreground: '#09090b',
  card: '#ffffff',
  cardForeground: '#09090b',
  popover: '#ffffff',
  popoverForeground: '#09090b',
  primary: '#4f46e5',
  primaryForeground: '#fafafa',
  secondary: '#f4f4f5',
  secondaryForeground: '#18181b',
  muted: '#f4f4f5',
  mutedForeground: '#71717a',
  accent: '#f4f4f5',
  accentForeground: '#18181b',
  destructive: '#ef4444',
  destructiveForeground: '#fafafa',
  border: '#e4e4e7',
  input: '#e4e4e7',
  ring: '#4f46e5',
  radius: '0.5rem',
};

const DARK_TOKENS = {
  background: '#09090b',
  foreground: '#fafafa',
  card: '#09090b',
  cardForeground: '#fafafa',
  primary: '#818cf8',
  primaryForeground: '#1e1b4b',
  secondary: '#27272a',
  secondaryForeground: '#fafafa',
  muted: '#27272a',
  mutedForeground: '#a1a1aa',
  accent: '#27272a',
  accentForeground: '#fafafa',
  destructive: '#dc2626',
  destructiveForeground: '#fafafa',
  border: '#27272a',
  input: '#27272a',
  ring: '#818cf8',
  radius: '0.5rem',
};

const THEME_PRESETS: Record<string, { light: Record<string, string>; dark: Record<string, string> }> = {
  zinc: {
    light: { primary: '#18181b', primaryForeground: '#fafafa', background: '#ffffff', foreground: '#09090b', muted: '#f4f4f5', accent: '#f4f4f5' },
    dark: { primary: '#fafafa', primaryForeground: '#18181b', background: '#09090b', foreground: '#fafafa', muted: '#27272a', accent: '#27272a' },
  },
  slate: {
    light: { primary: '#1e293b', primaryForeground: '#f8fafc', background: '#ffffff', foreground: '#0f172a', muted: '#f1f5f9', accent: '#f1f5f9' },
    dark: { primary: '#f1f5f9', primaryForeground: '#1e293b', background: '#0f172a', foreground: '#f1f5f9', muted: '#1e293b', accent: '#1e293b' },
  },
  blue: {
    light: { primary: '#3b82f6', primaryForeground: '#ffffff', background: '#ffffff', foreground: '#0f172a', muted: '#f1f5f9', accent: '#eff6ff' },
    dark: { primary: '#60a5fa', primaryForeground: '#1e3a5f', background: '#0f172a', foreground: '#f1f5f9', muted: '#1e293b', accent: '#1e3a5f' },
  },
  green: {
    light: { primary: '#16a34a', primaryForeground: '#ffffff', background: '#ffffff', foreground: '#09090b', muted: '#f4f4f5', accent: '#f0fdf4' },
    dark: { primary: '#4ade80', primaryForeground: '#052e16', background: '#09090b', foreground: '#fafafa', muted: '#27272a', accent: '#052e16' },
  },
  violet: {
    light: { primary: '#8b5cf6', primaryForeground: '#ffffff', background: '#ffffff', foreground: '#0a0118', muted: '#f3f0ff', accent: '#ede9fe' },
    dark: { primary: '#a78bfa', primaryForeground: '#2e1065', background: '#0a0118', foreground: '#fafafa', muted: '#1c1033', accent: '#2e1065' },
  },
  rose: {
    light: { primary: '#e11d48', primaryForeground: '#ffffff', background: '#ffffff', foreground: '#09090b', muted: '#fff1f2', accent: '#ffe4e6' },
    dark: { primary: '#fb7185', primaryForeground: '#4c0519', background: '#09090b', foreground: '#fafafa', muted: '#2a0a14', accent: '#4c0519' },
  },
  orange: {
    light: { primary: '#f97316', primaryForeground: '#ffffff', background: '#ffffff', foreground: '#1a0a00', muted: '#fff7ed', accent: '#ffedd5' },
    dark: { primary: '#fb923c', primaryForeground: '#431407', background: '#1a0a00', foreground: '#fafafa', muted: '#2a1508', accent: '#431407' },
  },
  teal: {
    light: { primary: '#14b8a6', primaryForeground: '#ffffff', background: '#ffffff', foreground: '#021a17', muted: '#f0fdfa', accent: '#ccfbf1' },
    dark: { primary: '#2dd4bf', primaryForeground: '#042f2e', background: '#021a17', foreground: '#fafafa', muted: '#0d2926', accent: '#042f2e' },
  },
};

// ─── DTCG Tokens ─────────────────────────────────────────────────────────────
function generateDTCGTokens(): string {
  const makeColorGroup = (colors: Record<string, string>, mode: string) =>
    Object.fromEntries(
      Object.entries(colors).map(([k, v]) => [
        k.replace(/([A-Z])/g, '-$1').toLowerCase(),
        { $type: 'color', $value: v, $description: `${mode} mode ${k}` },
      ]),
    );

  const tokens = {
    '$schema': 'https://design-tokens.github.io/community-group/format/',
    'adhar-ui': {
      color: {
        // Default (indigo) light/dark
        light: Object.fromEntries(
          Object.entries(LIGHT_TOKENS)
            .filter(([_, v]) => v.startsWith('#'))
            .map(([k, v]) => [
              k.replace(/([A-Z])/g, '-$1').toLowerCase(),
              { $type: 'color', $value: v, $description: `Light mode ${k}` },
            ]),
        ),
        dark: Object.fromEntries(
          Object.entries(DARK_TOKENS)
            .filter(([_, v]) => v.startsWith('#'))
            .map(([k, v]) => [
              k.replace(/([A-Z])/g, '-$1').toLowerCase(),
              { $type: 'color', $value: v, $description: `Dark mode ${k}` },
            ]),
        ),
        // All 8 theme presets
        presets: Object.fromEntries(
          Object.entries(THEME_PRESETS).map(([name, preset]) => [
            name,
            { light: makeColorGroup(preset.light, name), dark: makeColorGroup(preset.dark, name) },
          ]),
        ),
      },
      dimension: {
        'radius-sm': { $type: 'dimension', $value: '0.25rem' },
        'radius-md': { $type: 'dimension', $value: '0.5rem' },
        'radius-lg': { $type: 'dimension', $value: '0.75rem' },
        'radius-xl': { $type: 'dimension', $value: '1rem' },
        'radius-full': { $type: 'dimension', $value: '9999px' },
      },
      spacing: Object.fromEntries(
        [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((n) => [
          String(n).replace('.', '_'),
          { $type: 'dimension', $value: `${n * 0.25}rem` },
        ]),
      ),
      typography: {
        'font-family': { $type: 'fontFamily', $value: ['Inter', 'system-ui', 'sans-serif'] },
        'font-size': {
          xs: { $type: 'dimension', $value: '0.75rem' },
          sm: { $type: 'dimension', $value: '0.875rem' },
          base: { $type: 'dimension', $value: '1rem' },
          lg: { $type: 'dimension', $value: '1.125rem' },
          xl: { $type: 'dimension', $value: '1.25rem' },
          '2xl': { $type: 'dimension', $value: '1.5rem' },
          '3xl': { $type: 'dimension', $value: '1.875rem' },
          '4xl': { $type: 'dimension', $value: '2.25rem' },
        },
        'font-weight': {
          regular: { $type: 'fontWeight', $value: 400 },
          medium: { $type: 'fontWeight', $value: 500 },
          semibold: { $type: 'fontWeight', $value: 600 },
          bold: { $type: 'fontWeight', $value: 700 },
        },
        'line-height': {
          tight: { $type: 'dimension', $value: '1.25' },
          normal: { $type: 'dimension', $value: '1.5' },
          relaxed: { $type: 'dimension', $value: '1.75' },
        },
      },
      shadow: {
        sm: { $type: 'shadow', $value: { offsetX: '0', offsetY: '1px', blur: '2px', spread: '0', color: 'rgba(0,0,0,0.05)' } },
        md: { $type: 'shadow', $value: { offsetX: '0', offsetY: '4px', blur: '6px', spread: '-1px', color: 'rgba(0,0,0,0.1)' } },
        lg: { $type: 'shadow', $value: { offsetX: '0', offsetY: '10px', blur: '15px', spread: '-3px', color: 'rgba(0,0,0,0.1)' } },
      },
    },
  };
  return JSON.stringify(tokens, null, 2);
}

// ─── SVG Component Library ───────────────────────────────────────────────────
function generateComponentSVG(forPenpot = false): string {
  const T = LIGHT_TOKENS;
  const PAGE_W = 1440;
  const COL_W = 320;
  const GAP = 40;
  const MARGIN = 60;

  const componentGroups = [
    {
      title: 'Buttons',
      y: 100,
      components: [
        { label: 'Default', svg: btn('default', T.primary, T.primaryForeground) },
        { label: 'Secondary', svg: btn('secondary', T.secondary, T.secondaryForeground) },
        { label: 'Destructive', svg: btn('destructive', T.destructive, T.destructiveForeground) },
        { label: 'Outline', svg: btnOutline() },
        { label: 'Ghost', svg: btnGhost() },
        { label: 'Small', svg: btn('sm', T.primary, T.primaryForeground, 80, 36) },
        { label: 'Large', svg: btn('lg', T.primary, T.primaryForeground, 140, 44) },
        { label: 'Icon', svg: btnIcon() },
      ],
    },
    {
      title: 'Badges',
      y: 300,
      components: [
        { label: 'Default', svg: badge('default', T.primary, T.primaryForeground) },
        { label: 'Secondary', svg: badge('secondary', T.secondary, T.secondaryForeground) },
        { label: 'Destructive', svg: badge('destructive', T.destructive, '#ffffff') },
        { label: 'Outline', svg: badgeOutline() },
        { label: 'Success', svg: badge('success', '#dcfce7', '#15803d') },
        { label: 'Warning', svg: badge('warning', '#fef9c3', '#a16207') },
      ],
    },
    {
      title: 'Inputs',
      y: 460,
      components: [
        { label: 'Default', svg: input('default') },
        { label: 'With Value', svg: input('filled') },
        { label: 'Disabled', svg: input('disabled') },
        { label: 'Error', svg: input('error') },
      ],
    },
    {
      title: 'Card',
      y: 620,
      components: [
        { label: 'Default Card', svg: card() },
      ],
    },
    {
      title: 'Alert',
      y: 920,
      components: [
        { label: 'Default', svg: alert('default') },
        { label: 'Destructive', svg: alert('destructive') },
        { label: 'Success', svg: alert('success') },
        { label: 'Info', svg: alert('info') },
      ],
    },
    {
      title: 'Switch & Checkbox',
      y: 1120,
      components: [
        { label: 'Switch Off', svg: switchComp(false) },
        { label: 'Switch On', svg: switchComp(true) },
        { label: 'Checkbox Off', svg: checkbox(false) },
        { label: 'Checkbox On', svg: checkbox(true) },
      ],
    },
    {
      title: 'Avatar',
      y: 1280,
      components: [
        { label: 'Small', svg: avatar(32) },
        { label: 'Medium', svg: avatar(40) },
        { label: 'Large', svg: avatar(56) },
      ],
    },
    {
      title: 'Progress',
      y: 1420,
      components: [
        { label: '0%', svg: progress(0) },
        { label: '33%', svg: progress(33) },
        { label: '66%', svg: progress(66) },
        { label: '100%', svg: progress(100) },
      ],
    },
    {
      title: 'Tabs',
      y: 1540,
      components: [
        { label: 'Default Tabs', svg: tabs() },
      ],
    },
    {
      title: 'Dialog',
      y: 1700,
      components: [
        { label: 'Dialog', svg: dialog() },
      ],
    },
    {
      title: 'Toast',
      y: 2020,
      components: [
        { label: 'Default', svg: toast('default') },
        { label: 'Success', svg: toast('success') },
        { label: 'Error', svg: toast('error') },
      ],
    },
    {
      title: 'Skeleton',
      y: 2180,
      components: [
        { label: 'Content Skeleton', svg: skeleton() },
      ],
    },
    {
      title: 'Separator',
      y: 2360,
      components: [
        { label: 'Horizontal', svg: separator() },
      ],
    },
    {
      title: 'Tooltip',
      y: 2480,
      components: [
        { label: 'Tooltip', svg: tooltip() },
      ],
    },
    {
      title: 'Accordion',
      y: 2600,
      components: [
        { label: 'Accordion', svg: accordion() },
      ],
    },
    {
      title: 'Select',
      y: 2900,
      components: [
        { label: 'Select', svg: select() },
      ],
    },
    {
      title: 'Textarea',
      y: 3040,
      components: [
        { label: 'Textarea', svg: textarea() },
      ],
    },
    {
      title: 'Slider',
      y: 3200,
      components: [
        { label: 'Slider', svg: slider() },
      ],
    },
  ];

  let totalH = 3360;
  let body = '';

  // Title
  body += `<text x="${MARGIN}" y="50" font-family="Inter, system-ui, sans-serif" font-size="28" font-weight="700" fill="${T.foreground}">Adhar UI — Component Library</text>`;
  body += `<text x="${MARGIN}" y="78" font-family="Inter, system-ui, sans-serif" font-size="14" fill="${T.mutedForeground}">Design System Kit v0.1.0 · Import into ${forPenpot ? 'Penpot' : 'Figma'} for full editing</text>`;

  for (const group of componentGroups) {
    // Section title
    body += `<text x="${MARGIN}" y="${group.y - 12}" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="${T.foreground}" letter-spacing="0.05em">${group.title.toUpperCase()}</text>`;
    body += `<line x1="${MARGIN}" y1="${group.y - 4}" x2="${PAGE_W - MARGIN}" y2="${group.y - 4}" stroke="${T.border}" stroke-width="1"/>`;

    group.components.forEach((comp, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const cx = MARGIN + col * (COL_W + GAP);
      const cy = group.y + 16 + row * 140;

      // Label
      body += `<text x="${cx}" y="${cy + 12}" font-family="Inter, system-ui, sans-serif" font-size="11" fill="${T.mutedForeground}" font-weight="500">${comp.label}</text>`;
      // Component
      body += `<g transform="translate(${cx}, ${cy + 24})">${comp.svg}</g>`;
    });
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PAGE_W} ${totalH}" width="${PAGE_W}" height="${totalH}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap');
    </style>
  </defs>
  <rect width="${PAGE_W}" height="${totalH}" fill="${T.background}"/>
  ${body}
</svg>`;

  // ─── Component renderers ─────────────────────────────────────────
  function btn(variant: string, bg: string, fg: string, w = 110, h = 40): string {
    return `<rect width="${w}" height="${h}" rx="6" fill="${bg}"/><text x="${w / 2}" y="${h / 2 + 4}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="500" fill="${fg}">Button</text>`;
  }
  function btnOutline(): string {
    return `<rect width="110" height="40" rx="6" fill="none" stroke="${T.border}" stroke-width="1.5"/><text x="55" y="24" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="500" fill="${T.foreground}">Outline</text>`;
  }
  function btnGhost(): string {
    return `<rect width="110" height="40" rx="6" fill="${T.accent}" opacity="0"/><text x="55" y="24" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="500" fill="${T.foreground}">Ghost</text>`;
  }
  function btnIcon(): string {
    return `<rect width="40" height="40" rx="6" fill="${T.primary}"/><text x="20" y="24" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" fill="${T.primaryForeground}">+</text>`;
  }
  function badge(variant: string, bg: string, fg: string): string {
    return `<rect width="70" height="22" rx="11" fill="${bg}"/><text x="35" y="15" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="${fg}">${variant[0].toUpperCase() + variant.slice(1)}</text>`;
  }
  function badgeOutline(): string {
    return `<rect width="70" height="22" rx="11" fill="none" stroke="${T.border}" stroke-width="1"/><text x="35" y="15" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="${T.foreground}">Outline</text>`;
  }
  function input(state: string): string {
    const w = 260, h = 40;
    const borderColor = state === 'error' ? T.destructive : T.input;
    const opacity = state === 'disabled' ? '0.5' : '1';
    const text = state === 'filled' ? 'john@example.com' : 'Enter email...';
    const textFill = state === 'filled' ? T.foreground : T.mutedForeground;
    return `<g opacity="${opacity}"><rect width="${w}" height="${h}" rx="6" fill="${T.background}" stroke="${borderColor}" stroke-width="1.5"/><text x="12" y="24" font-family="Inter, system-ui, sans-serif" font-size="14" fill="${textFill}">${text}</text></g>`;
  }
  function card(): string {
    const w = 320, h = 220;
    return `<rect width="${w}" height="${h}" rx="12" fill="${T.card}" stroke="${T.border}" stroke-width="1" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))"/>
      <text x="24" y="36" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="${T.foreground}">Card Title</text>
      <text x="24" y="56" font-family="Inter, system-ui, sans-serif" font-size="13" fill="${T.mutedForeground}">Card description goes here.</text>
      <line x1="0" y1="76" x2="${w}" y2="76" stroke="${T.border}" stroke-width="1"/>
      <text x="24" y="100" font-family="Inter, system-ui, sans-serif" font-size="13" fill="${T.mutedForeground}">Content area with supporting text</text>
      <text x="24" y="120" font-family="Inter, system-ui, sans-serif" font-size="13" fill="${T.mutedForeground}">and additional details.</text>
      <line x1="0" y1="150" x2="${w}" y2="150" stroke="${T.border}" stroke-width="1"/>
      <rect x="24" y="166" width="80" height="32" rx="6" fill="${T.primary}"/>
      <text x="64" y="186" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="${T.primaryForeground}">Save</text>
      <rect x="116" y="166" width="80" height="32" rx="6" fill="none" stroke="${T.border}" stroke-width="1"/>
      <text x="156" y="186" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="${T.foreground}">Cancel</text>`;
  }
  function alert(variant: string): string {
    const w = 300, h = 72;
    const colors: Record<string, { border: string; bg: string; text: string }> = {
      default: { border: T.border, bg: T.background, text: T.foreground },
      destructive: { border: '#fca5a5', bg: '#fef2f2', text: '#b91c1c' },
      success: { border: '#86efac', bg: '#f0fdf4', text: '#15803d' },
      info: { border: '#93c5fd', bg: '#eff6ff', text: '#1d4ed8' },
    };
    const c = colors[variant] || colors.default;
    return `<rect width="${w}" height="${h}" rx="8" fill="${c.bg}" stroke="${c.border}" stroke-width="1"/>
      <text x="16" y="28" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" fill="${c.text}">Alert Title</text>
      <text x="16" y="48" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${T.mutedForeground}">This is a ${variant} alert message.</text>`;
  }
  function switchComp(on: boolean): string {
    const bg = on ? T.primary : T.input;
    const tx = on ? 20 : 2;
    return `<rect width="44" height="24" rx="12" fill="${bg}"/><circle cx="${tx + 10}" cy="12" r="9" fill="white" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))"/>`;
  }
  function checkbox(on: boolean): string {
    const bg = on ? T.primary : T.background;
    const stroke = on ? T.primary : T.border;
    const check = on ? `<polyline points="5,10 9,14 15,6" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` : '';
    return `<rect width="20" height="20" rx="4" fill="${bg}" stroke="${stroke}" stroke-width="1.5"/>${check}`;
  }
  function avatar(size: number): string {
    const r = size / 2;
    return `<circle cx="${r}" cy="${r}" r="${r}" fill="${T.muted}"/><text x="${r}" y="${r + 4}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="${size * 0.35}" font-weight="600" fill="${T.mutedForeground}">AU</text>`;
  }
  function progress(pct: number): string {
    const w = 260, h = 10;
    return `<rect width="${w}" height="${h}" rx="5" fill="${T.secondary}"/><rect width="${w * pct / 100}" height="${h}" rx="5" fill="${T.primary}"/>`;
  }
  function tabs(): string {
    const w = 340, h = 42;
    return `<rect width="${w}" height="${h}" rx="8" fill="${T.muted}"/>
      <rect x="4" y="4" width="100" height="34" rx="6" fill="${T.background}" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))"/>
      <text x="54" y="26" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="${T.foreground}">Account</text>
      <text x="160" y="26" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="${T.mutedForeground}">Password</text>
      <text x="260" y="26" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="${T.mutedForeground}">Settings</text>`;
  }
  function dialog(): string {
    const w = 400, h = 240;
    return `<rect width="${w + 40}" height="${h + 40}" rx="0" fill="rgba(0,0,0,0.5)"/>
      <rect x="20" y="20" width="${w}" height="${h}" rx="12" fill="${T.background}" stroke="${T.border}" stroke-width="1" filter="drop-shadow(0 10px 25px rgba(0,0,0,0.15))"/>
      <text x="44" y="56" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="600" fill="${T.foreground}">Are you sure?</text>
      <text x="44" y="80" font-family="Inter, system-ui, sans-serif" font-size="13" fill="${T.mutedForeground}">This action cannot be undone. This will</text>
      <text x="44" y="98" font-family="Inter, system-ui, sans-serif" font-size="13" fill="${T.mutedForeground}">permanently delete your account.</text>
      <rect x="${w - 80}" y="${h - 28}" width="80" height="32" rx="6" fill="${T.destructive}"/>
      <text x="${w - 40}" y="${h - 8}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="white">Delete</text>
      <rect x="${w - 172}" y="${h - 28}" width="80" height="32" rx="6" fill="none" stroke="${T.border}" stroke-width="1"/>
      <text x="${w - 132}" y="${h - 8}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="${T.foreground}">Cancel</text>
      <text x="${w - 4}" y="44" font-family="Inter, system-ui, sans-serif" font-size="18" fill="${T.mutedForeground}" cursor="pointer">×</text>`;
  }
  function toast(variant: string): string {
    const w = 300, h = 60;
    const colors: Record<string, { border: string; bg: string }> = {
      default: { border: T.border, bg: T.background },
      success: { border: '#86efac', bg: '#f0fdf4' },
      error: { border: '#fca5a5', bg: '#fef2f2' },
    };
    const c = colors[variant] || colors.default;
    return `<rect width="${w}" height="${h}" rx="8" fill="${c.bg}" stroke="${c.border}" stroke-width="1" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.07))"/>
      <text x="16" y="24" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" fill="${T.foreground}">Event created</text>
      <text x="16" y="44" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${T.mutedForeground}">Friday, March 14 at 3:00 PM</text>`;
  }
  function skeleton(): string {
    return `<circle cx="24" cy="24" r="24" fill="${T.muted}" opacity="0.6"/>
      <rect x="60" y="8" width="120" height="12" rx="6" fill="${T.muted}" opacity="0.6"/>
      <rect x="60" y="28" width="180" height="10" rx="5" fill="${T.muted}" opacity="0.4"/>`;
  }
  function separator(): string {
    return `<text x="0" y="0" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="${T.foreground}">Adhar UI</text>
      <text x="0" y="18" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${T.mutedForeground}">An open-source design system.</text>
      <line x1="0" y1="30" x2="260" y2="30" stroke="${T.border}" stroke-width="1"/>
      <g transform="translate(0, 44)">
        <text x="0" y="0" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${T.mutedForeground}">Docs</text>
        <line x1="36" y1="-8" x2="36" y2="4" stroke="${T.border}" stroke-width="1"/>
        <text x="48" y="0" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${T.mutedForeground}">Source</text>
        <line x1="96" y1="-8" x2="96" y2="4" stroke="${T.border}" stroke-width="1"/>
        <text x="108" y="0" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${T.mutedForeground}">Blog</text>
      </g>`;
  }
  function tooltip(): string {
    return `<rect width="110" height="36" rx="6" fill="none" stroke="${T.border}" stroke-width="1"/>
      <text x="55" y="22" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="${T.foreground}">Hover me</text>
      <rect x="16" y="-32" width="78" height="26" rx="4" fill="${T.primary}"/>
      <text x="55" y="-14" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" fill="white">Add to library</text>
      <polygon points="47,-6 55,2 63,-6" fill="${T.primary}"/>`;
  }
  function accordion(): string {
    const w = 340;
    const items = ['Is it accessible?', 'Is it styled?', 'Is it animated?'];
    let s = '';
    items.forEach((item, i) => {
      const y = i * 48;
      s += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${T.border}" stroke-width="1"/>`;
      s += `<text x="0" y="${y + 28}" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="500" fill="${T.foreground}">${item}</text>`;
      s += `<text x="${w - 12}" y="${y + 28}" font-family="Inter, system-ui, sans-serif" font-size="14" fill="${T.mutedForeground}">▾</text>`;
      if (i === 0) {
        s += `<text x="0" y="${y + 48}" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${T.mutedForeground}">Yes. It follows WAI-ARIA design patterns.</text>`;
      }
    });
    s += `<line x1="0" y1="${items.length * 48}" x2="${w}" y2="${items.length * 48}" stroke="${T.border}" stroke-width="1"/>`;
    return s;
  }
  function select(): string {
    const w = 260, h = 40;
    return `<rect width="${w}" height="${h}" rx="6" fill="${T.background}" stroke="${T.input}" stroke-width="1.5"/>
      <text x="12" y="24" font-family="Inter, system-ui, sans-serif" font-size="14" fill="${T.mutedForeground}">Select framework...</text>
      <text x="${w - 20}" y="24" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${T.mutedForeground}">▾</text>`;
  }
  function textarea(): string {
    const w = 260, h = 80;
    return `<rect width="${w}" height="${h}" rx="6" fill="${T.background}" stroke="${T.input}" stroke-width="1.5"/>
      <text x="12" y="24" font-family="Inter, system-ui, sans-serif" font-size="14" fill="${T.mutedForeground}">Write your message...</text>`;
  }
  function slider(): string {
    const w = 260, h = 8, pct = 0.6;
    return `<rect width="${w}" height="${h}" rx="4" fill="${T.secondary}"/>
      <rect width="${w * pct}" height="${h}" rx="4" fill="${T.primary}"/>
      <circle cx="${w * pct}" cy="4" r="8" fill="${T.primary}" stroke="white" stroke-width="2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))"/>`;
  }
}

// ─── Color Palette SVG ───────────────────────────────────────────────────────
function generateColorPalette(): string {
  const W = 1200, H = 600;
  const lightColors = Object.entries(LIGHT_TOKENS).filter(([_, v]) => v.startsWith('#'));
  const darkColors = Object.entries(DARK_TOKENS).filter(([_, v]) => v.startsWith('#'));
  const SWATCH = 80, GAP = 12, MARGIN = 60;

  let body = '';
  body += `<text x="${MARGIN}" y="44" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="700" fill="#09090b">Adhar UI — Color Palette</text>`;

  // Light
  body += `<text x="${MARGIN}" y="90" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="#09090b">LIGHT MODE</text>`;
  lightColors.forEach(([name, hex], i) => {
    const col = i % 12;
    const row = Math.floor(i / 12);
    const x = MARGIN + col * (SWATCH + GAP);
    const y = 106 + row * (SWATCH + 30);
    body += `<rect x="${x}" y="${y}" width="${SWATCH}" height="${SWATCH}" rx="8" fill="${hex}" stroke="#e4e4e7" stroke-width="1"/>`;
    body += `<text x="${x}" y="${y + SWATCH + 14}" font-family="Inter, system-ui, sans-serif" font-size="9" fill="#71717a" font-weight="500">${name}</text>`;
    body += `<text x="${x}" y="${y + SWATCH + 26}" font-family="Inter, system-ui, sans-serif" font-size="9" fill="#a1a1aa">${hex}</text>`;
  });

  const darkY = 320;
  body += `<text x="${MARGIN}" y="${darkY}" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="#09090b">DARK MODE</text>`;
  darkColors.forEach(([name, hex], i) => {
    const col = i % 12;
    const row = Math.floor(i / 12);
    const x = MARGIN + col * (SWATCH + GAP);
    const y = darkY + 16 + row * (SWATCH + 30);
    body += `<rect x="${x}" y="${y}" width="${SWATCH}" height="${SWATCH}" rx="8" fill="${hex}" stroke="#27272a" stroke-width="1"/>`;
    body += `<text x="${x}" y="${y + SWATCH + 14}" font-family="Inter, system-ui, sans-serif" font-size="9" fill="#71717a" font-weight="500">${name}</text>`;
    body += `<text x="${x}" y="${y + SWATCH + 26}" font-family="Inter, system-ui, sans-serif" font-size="9" fill="#a1a1aa">${hex}</text>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap');</style></defs>
  <rect width="${W}" height="${H}" fill="white"/>
  ${body}
</svg>`;
}

// ─── Main ────────────────────────────────────────────────────────────────────
const outDir = new URL('../public/downloads/', import.meta.url).pathname;

await Deno.mkdir(outDir, { recursive: true });

// 1. Design tokens
await Deno.writeTextFile(`${outDir}adhar-ui-design-tokens.json`, generateDTCGTokens());
console.log('✓ Design tokens JSON');

// 2. Figma SVG kit
await Deno.writeTextFile(`${outDir}adhar-ui-figma-kit.svg`, generateComponentSVG(false));
console.log('✓ Figma SVG component kit');

// 3. Penpot SVG kit
await Deno.writeTextFile(`${outDir}adhar-ui-penpot-kit.svg`, generateComponentSVG(true));
console.log('✓ Penpot SVG component kit');

// 4. Color palette
await Deno.writeTextFile(`${outDir}adhar-ui-color-palette.svg`, generateColorPalette());
console.log('✓ Color palette SVG');

console.log(`\nAll design kit files generated in ${outDir}`);
