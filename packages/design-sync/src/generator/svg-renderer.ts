/**
 * SVG renderer for Adhar UI components.
 *
 * Converts component variant definitions into SVG representations
 * that can be imported into Penpot as shared library components.
 * Each component generates one SVG per variant combination.
 *
 * The SVGs use the Adhar UI CSS variable naming so colors can be
 * re-mapped when the design kit theme is changed.
 *
 * @module
 */

/** Color palette using semantic token names mapped to concrete hex values. */
export interface DesignPalette {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  card: string;
  cardForeground: string;
  radius: number; // px
}

/** A rendered SVG component frame. */
export interface RenderedComponent {
  /** Component name (e.g., "button"). */
  name: string;
  /** Variant label (e.g., "default-md"). */
  variant: string;
  /** Display title (e.g., "Button / Default / Medium"). */
  title: string;
  /** SVG content string. */
  svg: string;
  /** Frame width in px. */
  width: number;
  /** Frame height in px. */
  height: number;
  /** Category for page grouping. */
  category: string;
}

/**
 * Create the default zinc light palette from hex values.
 */
export function createDefaultPalette(): DesignPalette {
  return {
    background: '#ffffff',
    foreground: '#09090b',
    primary: '#18181b',
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
    ring: '#18181b',
    card: '#ffffff',
    cardForeground: '#09090b',
    radius: 6,
  };
}

/**
 * Render a button component as SVG for all variant combinations.
 */
export function renderButton(p: DesignPalette): RenderedComponent[] {
  const variants: Record<string, { bg: string; fg: string; border?: string }> = {
    default: { bg: p.primary, fg: p.primaryForeground },
    secondary: { bg: p.secondary, fg: p.secondaryForeground },
    destructive: { bg: p.destructive, fg: p.destructiveForeground },
    outline: { bg: 'none', fg: p.foreground, border: p.border },
    ghost: { bg: 'none', fg: p.foreground },
    link: { bg: 'none', fg: p.primary },
  };

  const sizes: Record<string, { w: number; h: number; fontSize: number; px: number }> = {
    sm: { w: 80, h: 36, fontSize: 13, px: 12 },
    default: { w: 96, h: 40, fontSize: 14, px: 16 },
    lg: { w: 120, h: 44, fontSize: 14, px: 32 },
    icon: { w: 40, h: 40, fontSize: 14, px: 0 },
  };

  const results: RenderedComponent[] = [];

  for (const [vName, vStyle] of Object.entries(variants)) {
    for (const [sName, sStyle] of Object.entries(sizes)) {
      const { w, h, fontSize, px: _px } = sStyle;
      const label = sName === 'icon' ? '+' : 'Button';
      const textDecoration = vName === 'link' ? ' text-decoration="underline"' : '';
      const stroke = vStyle.border ? ` stroke="${vStyle.border}" stroke-width="1"` : '';
      const fill = vStyle.bg === 'none' ? 'fill="none"' : `fill="${vStyle.bg}"`;

      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" rx="${p.radius}" ${fill}${stroke}/>
  <text x="${w / 2}" y="${
          h / 2 + fontSize / 3
        }" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="${fontSize}" font-weight="500" fill="${vStyle.fg}"${textDecoration}>${label}</text>
</svg>`;

      results.push({
        name: 'button',
        variant: `${vName}-${sName}`,
        title: `Button / ${capitalize(vName)} / ${capitalize(sName)}`,
        svg,
        width: w,
        height: h,
        category: 'form',
      });
    }
  }

  return results;
}

/**
 * Render a badge component as SVG.
 */
export function renderBadge(p: DesignPalette): RenderedComponent[] {
  const variants: Record<string, { bg: string; fg: string; border?: string }> = {
    default: { bg: p.primary, fg: p.primaryForeground },
    secondary: { bg: p.secondary, fg: p.secondaryForeground },
    destructive: { bg: p.destructive, fg: p.destructiveForeground },
    outline: { bg: 'none', fg: p.foreground, border: p.border },
  };

  return Object.entries(variants).map(([vName, vStyle]) => {
    const w = 64;
    const h = 22;
    const stroke = vStyle.border ? ` stroke="${vStyle.border}" stroke-width="1"` : '';
    const fill = vStyle.bg === 'none' ? 'fill="none"' : `fill="${vStyle.bg}"`;

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" rx="${h / 2}" ${fill}${stroke}/>
  <text x="${w / 2}" y="${
        h / 2 + 4
      }" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="${vStyle.fg}">Badge</text>
</svg>`;

    return {
      name: 'badge',
      variant: vName,
      title: `Badge / ${capitalize(vName)}`,
      svg,
      width: w,
      height: h,
      category: 'display',
    };
  });
}

/**
 * Render an input component as SVG.
 */
export function renderInput(p: DesignPalette): RenderedComponent[] {
  const w = 240;
  const h = 40;

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect x="0.5" y="0.5" width="${w - 1}" height="${
      h - 1
    }" rx="${p.radius}" fill="${p.background}" stroke="${p.input}"/>
  <text x="12" y="${
      h / 2 + 4
    }" font-family="Inter, system-ui, sans-serif" font-size="14" fill="${p.mutedForeground}">Placeholder text...</text>
</svg>`;

  return [{
    name: 'input',
    variant: 'default',
    title: 'Input / Default',
    svg,
    width: w,
    height: h,
    category: 'form',
  }];
}

/**
 * Render a card component as SVG.
 */
export function renderCard(p: DesignPalette): RenderedComponent[] {
  const w = 320;
  const h = 180;

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect x="0.5" y="0.5" width="${w - 1}" height="${
      h - 1
    }" rx="${p.radius}" fill="${p.card}" stroke="${p.border}"/>
  <text x="24" y="36" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="600" fill="${p.cardForeground}">Card Title</text>
  <text x="24" y="56" font-family="Inter, system-ui, sans-serif" font-size="14" fill="${p.mutedForeground}">Card description goes here</text>
  <line x1="0" y1="72" x2="${w}" y2="72" stroke="${p.border}"/>
  <text x="24" y="100" font-family="Inter, system-ui, sans-serif" font-size="14" fill="${p.cardForeground}">Card content area</text>
  <rect x="24" y="132" width="80" height="32" rx="${p.radius}" fill="${p.primary}"/>
  <text x="64" y="152" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="${p.primaryForeground}">Action</text>
</svg>`;

  return [{
    name: 'card',
    variant: 'default',
    title: 'Card / Default',
    svg,
    width: w,
    height: h,
    category: 'layout',
  }];
}

/**
 * Render simple components that are single-variant.
 */
export function renderSimpleComponents(p: DesignPalette): RenderedComponent[] {
  const components: RenderedComponent[] = [];

  // Separator
  components.push({
    name: 'separator',
    variant: 'horizontal',
    title: 'Separator / Horizontal',
    svg:
      `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="2" viewBox="0 0 240 2"><line x1="0" y1="1" x2="240" y2="1" stroke="${p.border}" stroke-width="1"/></svg>`,
    width: 240,
    height: 2,
    category: 'display',
  });

  // Skeleton
  components.push({
    name: 'skeleton',
    variant: 'default',
    title: 'Skeleton / Default',
    svg:
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20" viewBox="0 0 200 20"><rect width="200" height="20" rx="${p.radius}" fill="${p.muted}"/></svg>`,
    width: 200,
    height: 20,
    category: 'display',
  });
  components.push({
    name: 'skeleton',
    variant: 'avatar',
    title: 'Skeleton / Avatar',
    svg:
      `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="${p.muted}"/></svg>`,
    width: 40,
    height: 40,
    category: 'display',
  });

  // Avatar
  components.push({
    name: 'avatar',
    variant: 'fallback',
    title: 'Avatar / Fallback',
    svg:
      `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="${p.muted}"/><text x="20" y="24" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="500" fill="${p.mutedForeground}">AB</text></svg>`,
    width: 40,
    height: 40,
    category: 'display',
  });

  // Progress
  components.push({
    name: 'progress',
    variant: '60pct',
    title: 'Progress / 60%',
    svg:
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="8" viewBox="0 0 200 8"><rect width="200" height="8" rx="4" fill="${p.secondary}"/><rect width="120" height="8" rx="4" fill="${p.primary}"/></svg>`,
    width: 200,
    height: 8,
    category: 'display',
  });

  // Switch
  const swOn = { bg: p.primary, thumb: p.primaryForeground, tx: 22 };
  const swOff = { bg: p.input, thumb: p.background, tx: 4 };
  for (const [state, s] of [['on', swOn], ['off', swOff]] as const) {
    components.push({
      name: 'switch',
      variant: state,
      title: `Switch / ${capitalize(state)}`,
      svg:
        `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="24" viewBox="0 0 44 24"><rect width="44" height="24" rx="12" fill="${s.bg}"/><circle cx="${
          s.tx + 8
        }" cy="12" r="8" fill="${s.thumb}"/></svg>`,
      width: 44,
      height: 24,
      category: 'form',
    });
  }

  // Checkbox
  for (const [state, checked] of [['checked', true], ['unchecked', false]] as const) {
    const inner = checked
      ? `<rect width="16" height="16" rx="3" fill="${p.primary}"/><polyline points="4,8 7,11 12,5" fill="none" stroke="${p.primaryForeground}" stroke-width="1.5"/>`
      : `<rect x="0.5" y="0.5" width="15" height="15" rx="3" fill="none" stroke="${p.border}"/>`;
    components.push({
      name: 'checkbox',
      variant: state,
      title: `Checkbox / ${capitalize(state)}`,
      svg:
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">${inner}</svg>`,
      width: 16,
      height: 16,
      category: 'form',
    });
  }

  // Alert
  for (
    const [v, bg, fg] of [['default', p.background, p.foreground], [
      'destructive',
      p.background,
      p.destructive,
    ]] as const
  ) {
    components.push({
      name: 'alert',
      variant: v,
      title: `Alert / ${capitalize(v)}`,
      svg:
        `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="72" viewBox="0 0 320 72"><rect x="0.5" y="0.5" width="319" height="71" rx="${p.radius}" fill="${bg}" stroke="${
          v === 'destructive' ? p.destructive : p.border
        }"/><text x="16" y="28" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="500" fill="${fg}">Alert Title</text><text x="16" y="48" font-family="Inter, system-ui, sans-serif" font-size="13" fill="${p.mutedForeground}">Alert description message here.</text></svg>`,
      width: 320,
      height: 72,
      category: 'feedback',
    });
  }

  // Tooltip
  components.push({
    name: 'tooltip',
    variant: 'default',
    title: 'Tooltip / Default',
    svg:
      `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="32" viewBox="0 0 120 32"><rect width="120" height="32" rx="${p.radius}" fill="${p.foreground}"/><text x="60" y="20" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${p.background}">Tooltip text</text></svg>`,
    width: 120,
    height: 32,
    category: 'overlay',
  });

  // Kbd
  components.push({
    name: 'kbd',
    variant: 'default',
    title: 'Kbd / Default',
    svg:
      `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" viewBox="0 0 28 20"><rect x="0.5" y="0.5" width="27" height="19" rx="3" fill="${p.muted}" stroke="${p.border}"/><text x="14" y="14" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" font-weight="500" fill="${p.mutedForeground}">⌘K</text></svg>`,
    width: 28,
    height: 20,
    category: 'enterprise',
  });

  return components;
}

/**
 * Render a color swatch for the token palette page.
 */
export function renderColorSwatch(name: string, hex: string, w = 120, h = 60): string {
  const isDark = isColorDark(hex);
  const textColor = isDark ? '#ffffff' : '#000000';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" rx="6" fill="${hex}"/>
  <text x="8" y="${
    h - 20
  }" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="500" fill="${textColor}">${name}</text>
  <text x="8" y="${
    h - 8
  }" font-family="Inter, system-ui, sans-serif" font-size="10" fill="${textColor}" opacity="0.7">${hex}</text>
</svg>`;
}

/**
 * Render a typography sample.
 */
export function renderTypographySample(
  name: string,
  fontSize: number,
  lineHeight: number,
  fontWeight: number,
  fg: string,
): string {
  const w = 400;
  const h = Math.max(lineHeight + 24, 40);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <text x="0" y="${
    fontSize + 4
  }" font-family="Inter, system-ui, sans-serif" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fg}">The quick brown fox jumps</text>
  <text x="0" y="${
    fontSize + 20
  }" font-family="Inter, system-ui, sans-serif" font-size="10" fill="${fg}" opacity="0.5">${name} — ${fontSize}px / ${lineHeight}px / ${fontWeight}</text>
</svg>`;
}

/**
 * Render a spacing scale visualization.
 */
export function renderSpacingScale(fg: string, muted: string): string {
  const spacings = [
    { name: '1', px: 4 },
    { name: '2', px: 8 },
    { name: '3', px: 12 },
    { name: '4', px: 16 },
    { name: '5', px: 20 },
    { name: '6', px: 24 },
    { name: '8', px: 32 },
    { name: '10', px: 40 },
    { name: '12', px: 48 },
    { name: '16', px: 64 },
  ];
  const w = 500;
  const rowH = 28;
  const h = spacings.length * rowH + 20;

  const rows = spacings.map((s, i) => {
    const y = i * rowH + 16;
    return `<text x="0" y="${
      y + 14
    }" font-family="Inter, system-ui, sans-serif" font-size="11" fill="${muted}">${s.name}</text>
  <rect x="40" y="${y}" width="${s.px}" height="18" rx="2" fill="${fg}" opacity="0.15"/>
  <text x="${48 + s.px}" y="${
      y + 14
    }" font-family="Inter, system-ui, sans-serif" font-size="11" fill="${muted}">${s.px}px</text>`;
  }).join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  ${rows}
</svg>`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function isColorDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
