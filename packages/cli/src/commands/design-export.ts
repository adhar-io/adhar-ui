/**
 * `adhar-ui design-export` command.
 * Export design tokens in various formats.
 *
 * Subcommands:
 *   dtcg     - Export as W3C DTCG JSON
 *
 * @module
 */

import { readConfig } from '../utils/config.ts';
import { logger } from '../utils/logger.ts';
import { themeToDtcg, validateDtcg } from '@adhar-ui/dtcg';
import { blue, green, slate, zinc } from '@adhar-ui/tokens';
import type { ThemePreset } from '@adhar-ui/tokens';

const presets: Record<string, ThemePreset> = { zinc, slate, blue, green };

export async function designExportCommand(cwd: string, args: string[]): Promise<void> {
  const config = await readConfig(cwd);
  if (!config) {
    logger.error('No adhar-ui.json found. Run `adhar-ui init` first.');
    return;
  }

  const format = args[0] ?? 'dtcg';

  if (format === 'dtcg') {
    await exportDtcg(cwd, config.tailwind.baseColor);
    return;
  }

  logger.error(`Unknown format: "${format}". Supported: dtcg`);
}

async function exportDtcg(cwd: string, baseColor: string): Promise<void> {
  const preset = presets[baseColor] ?? zinc;
  const dtcg = themeToDtcg(preset);

  // Validate before writing
  const validation = validateDtcg(dtcg);
  if (!validation.valid) {
    logger.error('Generated DTCG has validation errors:');
    for (const err of validation.errors) {
      logger.dim(`  ${err.path}: ${err.message}`);
    }
    return;
  }

  const json = JSON.stringify(dtcg, null, 2) + '\n';
  const outputPath = `${cwd}/tokens.dtcg.json`;

  await Deno.writeTextFile(outputPath, json);
  logger.success(`Exported DTCG tokens to tokens.dtcg.json (${json.length} bytes)`);
  logger.info(`Preset: ${preset.label} (${baseColor})`);
  logger.dim(
    'This file can be imported into Figma, Penpot, Style Dictionary, or any DTCG-compatible tool.',
  );
}
