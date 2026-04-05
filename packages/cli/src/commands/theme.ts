/**
 * `adhar-ui theme` command.
 * Apply or create theme presets.
 */

import { readConfig, writeConfig } from '../utils/config.ts';
import { logger } from '../utils/logger.ts';
import { blue, generateCSS, green, slate, zinc } from '@adhar-ui/tokens';
import type { ThemePreset } from '@adhar-ui/tokens';

const presets: Record<string, ThemePreset> = { zinc, slate, blue, green };

export async function themeCommand(
  cwd: string,
  args: string[],
): Promise<void> {
  const config = await readConfig(cwd);
  if (!config) {
    logger.error('No adhar-ui.json found. Run `adhar-ui init` first.');
    return;
  }

  const subcommand = args[0];

  if (!subcommand || subcommand === 'list') {
    logger.header('Available themes:');
    for (const [name, preset] of Object.entries(presets)) {
      const active = config.tailwind.baseColor === name ? ' \x1b[32m(active)\x1b[0m' : '';
      console.log(`  ${name.padEnd(12)} ${preset.label}${active}`);
    }
    return;
  }

  if (subcommand === 'create') {
    const themeName = args[1];
    if (!themeName) {
      logger.error('Usage: adhar-ui theme create <name>');
      return;
    }
    await createCustomTheme(cwd, themeName);
    return;
  }

  // Apply a preset
  const preset = presets[subcommand];
  if (!preset) {
    logger.error(`Unknown theme: "${subcommand}". Available: ${Object.keys(presets).join(', ')}`);
    return;
  }

  // Update CSS file
  const cssPath = `${cwd}/${config.tailwind.css}`;
  const css = generateCSS(preset);

  try {
    let existing = '';
    try {
      existing = await Deno.readTextFile(cssPath);
    } catch { /* file doesn't exist */ }

    // Replace @layer base block or append
    if (existing.includes('@layer base')) {
      const newContent = existing.replace(
        /@layer base\s*\{[\s\S]*?\n\}/g,
        css.trim(),
      );
      await Deno.writeTextFile(cssPath, newContent);
    } else {
      await Deno.writeTextFile(cssPath, existing + '\n' + css);
    }

    // Update config
    config.tailwind.baseColor = subcommand;
    await writeConfig(cwd, config);

    logger.success(`Applied theme: ${preset.label}`);
    logger.info(`Updated: ${config.tailwind.css}`);
    logger.info(`Updated: adhar-ui.json`);
  } catch (err) {
    logger.error(`Failed to apply theme: ${err}`);
  }
}

async function createCustomTheme(cwd: string, name: string): Promise<void> {
  const themePath = `${cwd}/adhar-ui.theme.ts`;

  const content = `import { defineTheme } from '@adhar-ui/tokens'

export default defineTheme({
  name: '${name}',
  label: '${name.charAt(0).toUpperCase() + name.slice(1)}',
  extends: 'zinc',
  light: {
    colors: {
      // Override light theme colors (HSL values without hsl() wrapper)
      // primary: { DEFAULT: '220 70% 50%', foreground: '0 0% 100%' },
    },
    radius: '0.5rem',
  },
  dark: {
    colors: {
      // Override dark theme colors
      // primary: { DEFAULT: '220 70% 60%', foreground: '0 0% 100%' },
    },
    radius: '0.5rem',
  },
})
`;

  await Deno.writeTextFile(themePath, content);
  logger.success(`Created custom theme: ${themePath}`);
  logger.info('Edit this file to customize your theme colors.');
}
