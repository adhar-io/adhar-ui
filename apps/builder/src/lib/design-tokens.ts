import type { DesignTokens, DesignSystemConfig, PaletteItem } from "./designer-types";

// ─── Default Adhar UI Design Tokens ────────────────────────────────

export function defaultAdharTokens(): DesignTokens {
  return {
    colors: [
      // Brand
      { name: "Primary", value: "hsl(263, 70%, 50%)", cssVar: "--primary", group: "brand" },
      { name: "Primary Foreground", value: "hsl(0, 0%, 98%)", cssVar: "--primary-foreground", group: "brand" },
      // Semantic
      { name: "Background", value: "hsl(0, 0%, 100%)", cssVar: "--background", group: "semantic" },
      { name: "Foreground", value: "hsl(240, 10%, 3.9%)", cssVar: "--foreground", group: "semantic" },
      { name: "Card", value: "hsl(0, 0%, 100%)", cssVar: "--card", group: "semantic" },
      { name: "Card Foreground", value: "hsl(240, 10%, 3.9%)", cssVar: "--card-foreground", group: "semantic" },
      { name: "Muted", value: "hsl(240, 4.8%, 95.9%)", cssVar: "--muted", group: "semantic" },
      { name: "Muted Foreground", value: "hsl(240, 3.8%, 46.1%)", cssVar: "--muted-foreground", group: "semantic" },
      { name: "Accent", value: "hsl(240, 4.8%, 95.9%)", cssVar: "--accent", group: "semantic" },
      { name: "Accent Foreground", value: "hsl(240, 5.9%, 10%)", cssVar: "--accent-foreground", group: "semantic" },
      // Feedback
      { name: "Destructive", value: "hsl(0, 84.2%, 60.2%)", cssVar: "--destructive", group: "feedback" },
      { name: "Success", value: "hsl(142, 71%, 45%)", group: "feedback" },
      { name: "Warning", value: "hsl(38, 92%, 50%)", group: "feedback" },
      { name: "Info", value: "hsl(217, 91%, 60%)", group: "feedback" },
      // Surface
      { name: "Border", value: "hsl(240, 5.9%, 90%)", cssVar: "--border", group: "surface" },
      { name: "Input", value: "hsl(240, 5.9%, 90%)", cssVar: "--input", group: "surface" },
      { name: "Ring", value: "hsl(263, 70%, 50%)", cssVar: "--ring", group: "surface" },
    ],
    typography: [
      { name: "Display", fontFamily: "Inter, system-ui, sans-serif", fontSize: 48, fontWeight: "700", lineHeight: 1.1, letterSpacing: -0.5 },
      { name: "Heading 1", fontFamily: "Inter, system-ui, sans-serif", fontSize: 36, fontWeight: "700", lineHeight: 1.2 },
      { name: "Heading 2", fontFamily: "Inter, system-ui, sans-serif", fontSize: 28, fontWeight: "600", lineHeight: 1.3 },
      { name: "Heading 3", fontFamily: "Inter, system-ui, sans-serif", fontSize: 22, fontWeight: "600", lineHeight: 1.4 },
      { name: "Heading 4", fontFamily: "Inter, system-ui, sans-serif", fontSize: 18, fontWeight: "600", lineHeight: 1.4 },
      { name: "Body", fontFamily: "Inter, system-ui, sans-serif", fontSize: 15, fontWeight: "400", lineHeight: 1.6 },
      { name: "Body Small", fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: "400", lineHeight: 1.5 },
      { name: "Caption", fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, fontWeight: "500", lineHeight: 1.4 },
      { name: "Overline", fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, fontWeight: "600", lineHeight: 1.5, letterSpacing: 0.5 },
    ],
    spacing: [
      { name: "2xs", value: 2 },
      { name: "xs", value: 4 },
      { name: "sm", value: 8 },
      { name: "md", value: 12 },
      { name: "lg", value: 16 },
      { name: "xl", value: 24 },
      { name: "2xl", value: 32 },
      { name: "3xl", value: 48 },
      { name: "4xl", value: 64 },
    ],
    radius: [
      { name: "none", value: 0 },
      { name: "sm", value: 4 },
      { name: "md", value: 6 },
      { name: "lg", value: 8 },
      { name: "xl", value: 12 },
      { name: "2xl", value: 16 },
      { name: "full", value: 9999 },
    ],
    shadows: [
      { name: "sm", value: "0 1px 2px rgba(0,0,0,0.05)" },
      { name: "md", value: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)" },
      { name: "lg", value: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)" },
      { name: "xl", value: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" },
      { name: "inner", value: "inset 0 2px 4px 0 rgba(0,0,0,0.05)" },
    ],
  };
}

// ─── Default Design System Config ──────────────────────────────────

export function defaultDesignSystemConfig(): DesignSystemConfig {
  return {
    name: "Adhar UI",
    version: "1.0.0",
    tokens: defaultAdharTokens(),
    componentOverrides: {},
    customComponents: [],
  };
}

// ─── Token Mutators ────────────────────────────────────────────────

export function updateTokenColor(
  config: DesignSystemConfig,
  index: number,
  patch: { name?: string; value?: string; group?: string },
): DesignSystemConfig {
  const colors = [...config.tokens.colors];
  colors[index] = { ...colors[index], ...patch };
  return { ...config, tokens: { ...config.tokens, colors } };
}

export function addTokenColor(
  config: DesignSystemConfig,
  color: { name: string; value: string; group?: string },
): DesignSystemConfig {
  return {
    ...config,
    tokens: { ...config.tokens, colors: [...config.tokens.colors, color] },
  };
}

export function removeTokenColor(config: DesignSystemConfig, index: number): DesignSystemConfig {
  const colors = config.tokens.colors.filter((_, i) => i !== index);
  return { ...config, tokens: { ...config.tokens, colors } };
}

export function updateTokenTypography(
  config: DesignSystemConfig,
  index: number,
  patch: Partial<DesignSystemConfig["tokens"]["typography"][number]>,
): DesignSystemConfig {
  const typography = [...config.tokens.typography];
  typography[index] = { ...typography[index], ...patch };
  return { ...config, tokens: { ...config.tokens, typography } };
}

export function updateTokenSpacing(config: DesignSystemConfig, index: number, value: number): DesignSystemConfig {
  const spacing = [...config.tokens.spacing];
  spacing[index] = { ...spacing[index], value };
  return { ...config, tokens: { ...config.tokens, spacing } };
}

export function updateTokenRadius(config: DesignSystemConfig, index: number, value: number): DesignSystemConfig {
  const radius = [...config.tokens.radius];
  radius[index] = { ...radius[index], value };
  return { ...config, tokens: { ...config.tokens, radius } };
}

export function addCustomComponent(config: DesignSystemConfig, item: PaletteItem): DesignSystemConfig {
  return { ...config, customComponents: [...config.customComponents, item] };
}

export function removeCustomComponent(config: DesignSystemConfig, id: string): DesignSystemConfig {
  return {
    ...config,
    customComponents: config.customComponents.filter((c) => c.id !== id),
  };
}

// ─── Export Helpers ─────────────────────────────────────────────────

export function tokensToCSS(tokens: DesignTokens): string {
  const lines: string[] = [":root {"];
  for (const c of tokens.colors) {
    if (c.cssVar) {
      lines.push(`  ${c.cssVar}: ${c.value};`);
    }
  }
  for (const s of tokens.spacing) {
    lines.push(`  --spacing-${s.name}: ${s.value}px;`);
  }
  for (const r of tokens.radius) {
    lines.push(`  --radius-${r.name}: ${r.value}px;`);
  }
  for (const sh of tokens.shadows) {
    lines.push(`  --shadow-${sh.name}: ${sh.value};`);
  }
  lines.push("}");
  return lines.join("\n");
}

export function tokensToTailwindConfig(tokens: DesignTokens): object {
  const colors: Record<string, string> = {};
  for (const c of tokens.colors) {
    const key = c.name.toLowerCase().replace(/\s+/g, "-");
    colors[key] = c.cssVar ? `hsl(var(${c.cssVar}))` : c.value;
  }

  const spacing: Record<string, string> = {};
  for (const s of tokens.spacing) {
    spacing[s.name] = `${s.value}px`;
  }

  const borderRadius: Record<string, string> = {};
  for (const r of tokens.radius) {
    borderRadius[r.name] = r.value === 9999 ? "9999px" : `${r.value}px`;
  }

  const boxShadow: Record<string, string> = {};
  for (const sh of tokens.shadows) {
    boxShadow[sh.name] = sh.value;
  }

  const fontSize: Record<string, [string, Record<string, string>]> = {};
  for (const t of tokens.typography) {
    const key = t.name.toLowerCase().replace(/\s+/g, "-");
    fontSize[key] = [`${t.fontSize}px`, { lineHeight: `${t.lineHeight}`, fontWeight: t.fontWeight }];
  }

  return {
    theme: {
      extend: {
        colors,
        spacing,
        borderRadius,
        boxShadow,
        fontSize,
      },
    },
  };
}

export function tokensToDesignTokensJSON(config: DesignSystemConfig): object {
  return {
    $schema: "https://design-tokens.github.io/community-group/format/",
    name: config.name,
    version: config.version,
    tokens: {
      color: Object.fromEntries(
        config.tokens.colors.map((c) => [
          c.name.toLowerCase().replace(/\s+/g, "-"),
          { $type: "color", $value: c.value, $description: c.group },
        ]),
      ),
      typography: Object.fromEntries(
        config.tokens.typography.map((t) => [
          t.name.toLowerCase().replace(/\s+/g, "-"),
          {
            $type: "typography",
            $value: {
              fontFamily: t.fontFamily,
              fontSize: `${t.fontSize}px`,
              fontWeight: t.fontWeight,
              lineHeight: String(t.lineHeight),
              letterSpacing: t.letterSpacing ? `${t.letterSpacing}px` : "0",
            },
          },
        ]),
      ),
      spacing: Object.fromEntries(
        config.tokens.spacing.map((s) => [s.name, { $type: "dimension", $value: `${s.value}px` }]),
      ),
      borderRadius: Object.fromEntries(
        config.tokens.radius.map((r) => [r.name, { $type: "dimension", $value: r.value === 9999 ? "9999px" : `${r.value}px` }]),
      ),
      shadow: Object.fromEntries(
        config.tokens.shadows.map((s) => [s.name, { $type: "shadow", $value: s.value }]),
      ),
    },
    componentOverrides: config.componentOverrides,
  };
}

// ─── Artboard Presets ──────────────────────────────────────────────

export const artboardPresets = [
  { id: "iphone-15", name: "iPhone 15", device: "iPhone 15", width: 393, height: 852, icon: "📱", category: "mobile" as const },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", device: "iPhone 15 Pro Max", width: 430, height: 932, icon: "📱", category: "mobile" as const },
  { id: "iphone-se", name: "iPhone SE", device: "iPhone SE", width: 375, height: 667, icon: "📱", category: "mobile" as const },
  { id: "android-small", name: "Android Small", device: "Android Small", width: 360, height: 640, icon: "📱", category: "mobile" as const },
  { id: "android-large", name: "Android Large", device: "Android Large", width: 412, height: 915, icon: "📱", category: "mobile" as const },
  { id: "pixel-8", name: "Pixel 8", device: "Pixel 8", width: 412, height: 892, icon: "📱", category: "mobile" as const },
  { id: "ipad-mini", name: "iPad Mini", device: "iPad Mini", width: 744, height: 1133, icon: "📲", category: "tablet" as const },
  { id: "ipad-pro-11", name: 'iPad Pro 11"', device: 'iPad Pro 11"', width: 834, height: 1194, icon: "📲", category: "tablet" as const },
  { id: "ipad-pro-13", name: 'iPad Pro 13"', device: 'iPad Pro 13"', width: 1024, height: 1366, icon: "📲", category: "tablet" as const },
  { id: "surface-pro", name: "Surface Pro", device: "Surface Pro", width: 912, height: 1368, icon: "📲", category: "tablet" as const },
  { id: "desktop-1280", name: "Desktop (1280)", device: "Desktop 1280", width: 1280, height: 800, icon: "🖥️", category: "desktop" as const },
  { id: "desktop-1440", name: "Desktop (1440)", device: "Desktop 1440", width: 1440, height: 900, icon: "🖥️", category: "desktop" as const },
  { id: "desktop-1920", name: "Desktop (1920)", device: "Desktop 1920", width: 1920, height: 1080, icon: "🖥️", category: "desktop" as const },
  { id: "macbook-air", name: "MacBook Air", device: "MacBook Air", width: 1280, height: 832, icon: "💻", category: "desktop" as const },
  { id: "macbook-pro-16", name: 'MacBook Pro 16"', device: 'MacBook Pro 16"', width: 1728, height: 1117, icon: "💻", category: "desktop" as const },
  { id: "apple-watch", name: "Apple Watch", device: "Apple Watch", width: 198, height: 242, icon: "⌚", category: "watch" as const },
];
