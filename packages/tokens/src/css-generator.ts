import type { ThemePreset, ThemeTokens } from './types.ts';

function generateColorVars(tokens: ThemeTokens): string {
  const lines: string[] = [];
  const { colors } = tokens;

  lines.push(`    --background: ${colors.background};`);
  lines.push(`    --foreground: ${colors.foreground};`);
  lines.push(`    --card: ${colors.card.DEFAULT};`);
  lines.push(`    --card-foreground: ${colors.card.foreground};`);
  lines.push(`    --popover: ${colors.popover.DEFAULT};`);
  lines.push(`    --popover-foreground: ${colors.popover.foreground};`);
  lines.push(`    --primary: ${colors.primary.DEFAULT};`);
  lines.push(`    --primary-foreground: ${colors.primary.foreground};`);
  lines.push(`    --secondary: ${colors.secondary.DEFAULT};`);
  lines.push(`    --secondary-foreground: ${colors.secondary.foreground};`);
  lines.push(`    --muted: ${colors.muted.DEFAULT};`);
  lines.push(`    --muted-foreground: ${colors.muted.foreground};`);
  lines.push(`    --accent: ${colors.accent.DEFAULT};`);
  lines.push(`    --accent-foreground: ${colors.accent.foreground};`);
  lines.push(`    --destructive: ${colors.destructive.DEFAULT};`);
  lines.push(`    --destructive-foreground: ${colors.destructive.foreground};`);
  lines.push(`    --border: ${colors.border};`);
  lines.push(`    --input: ${colors.input};`);
  lines.push(`    --ring: ${colors.ring};`);
  lines.push(`    --radius: ${tokens.radius};`);

  // Sidebar tokens
  lines.push(`    --sidebar-background: ${colors.sidebar.background};`);
  lines.push(`    --sidebar-foreground: ${colors.sidebar.foreground};`);
  lines.push(`    --sidebar-primary: ${colors.sidebar.primary};`);
  lines.push(`    --sidebar-primary-foreground: ${colors.sidebar['primary-foreground']};`);
  lines.push(`    --sidebar-accent: ${colors.sidebar.accent};`);
  lines.push(`    --sidebar-accent-foreground: ${colors.sidebar['accent-foreground']};`);
  lines.push(`    --sidebar-border: ${colors.sidebar.border};`);
  lines.push(`    --sidebar-ring: ${colors.sidebar.ring};`);

  return lines.join('\n');
}

export function generateCSS(preset: ThemePreset): string {
  return `@layer base {
  :root {
${generateColorVars(preset.light)}
  }

  .dark {
${generateColorVars(preset.dark)}
  }
}

@layer base {
  * {
    border-color: hsl(var(--border));
  }

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}
`;
}

export function defineTheme(
  overrides: Partial<ThemePreset> & { extends?: string },
): ThemePreset {
  // This is a runtime helper for users to create custom themes
  // The extends field would be resolved by the CLI/build tool
  return {
    name: overrides.name ?? 'custom',
    label: overrides.label ?? 'Custom',
    light: overrides.light ?? {
      colors: {} as ThemePreset['light']['colors'],
      radius: '0.5rem',
    },
    dark: overrides.dark ?? {
      colors: {} as ThemePreset['dark']['colors'],
      radius: '0.5rem',
    },
  };
}
