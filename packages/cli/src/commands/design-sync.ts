/**
 * `adhar-ui design-sync` command.
 * Bidirectional sync of design tokens between code and design tools.
 *
 * Subcommands:
 *   pull [--source figma|penpot]  - Pull tokens from design tool
 *   push [--target figma|penpot]  - Push code tokens to design tool
 *   status                        - Show current sync state
 *
 * @module
 */

import { readConfig } from '../utils/config.ts';
import { logger } from '../utils/logger.ts';
import { readLockfile } from '@adhar-ui/design-sync';
import { themeToDtcg } from '@adhar-ui/dtcg';
import { blue, green, slate, zinc } from '@adhar-ui/tokens';
import type { ThemePreset } from '@adhar-ui/tokens';

const presets: Record<string, ThemePreset> = { zinc, slate, blue, green };

export async function designSyncCommand(cwd: string, args: string[]): Promise<void> {
  const config = await readConfig(cwd);
  if (!config) {
    logger.error('No adhar-ui.json found. Run `adhar-ui init` first.');
    return;
  }

  const subcommand = args[0];

  if (subcommand === 'status') {
    await showStatus(cwd);
    return;
  }

  if (subcommand === 'pull') {
    const source = args.find((a) => a.startsWith('--source='))?.split('=')[1] ?? 'figma';
    logger.info(`Pulling tokens from ${source}...`);
    logger.info('Connect your design tool to the sync server or use the plugin.');
    logger.dim(`  Sync server: adhar-ui design-sync status`);
    logger.dim(`  Figma plugin: Install @adhar-ui/figma-plugin`);
    logger.dim(`  Penpot plugin: Install @adhar-ui/penpot-plugin`);
    return;
  }

  if (subcommand === 'push') {
    const target = args.find((a) => a.startsWith('--target='))?.split('=')[1] ?? 'figma';
    logger.info(`Pushing tokens to ${target}...`);

    // Export current theme as DTCG
    const preset = presets[config.tailwind.baseColor] ?? zinc;
    const dtcg = themeToDtcg(preset);
    const json = JSON.stringify(dtcg, null, 2);

    logger.success(`Exported ${config.tailwind.baseColor} preset as DTCG (${json.length} bytes)`);
    logger.info(`Use the ${target} plugin or sync server to push these tokens.`);
    return;
  }

  // No subcommand or unknown
  logger.header('Design Sync');
  logger.break();
  logger.info('Usage:');
  logger.list([
    'adhar-ui design-sync pull [--source=figma|penpot]  Pull tokens from design tool',
    'adhar-ui design-sync push [--target=figma|penpot]  Push tokens to design tool',
    'adhar-ui design-sync status                        Show sync state',
  ]);
}

async function showStatus(cwd: string): Promise<void> {
  const lockfile = await readLockfile(cwd);

  logger.header('Design Sync Status');
  logger.break();

  if (!lockfile) {
    logger.dim('No .adhar-ui.lock found. No sync has been performed yet.');
    logger.info('Run `adhar-ui design-sync push` to start syncing.');
    return;
  }

  console.log(`  Last sync:     ${lockfile.lastSync}`);
  console.log(`  Code hash:     ${lockfile.sources.code.tokenHash.slice(0, 16)}...`);

  if (lockfile.sources.figma) {
    console.log(`  Figma file:    ${lockfile.sources.figma.fileKey}`);
    console.log(`  Figma hash:    ${lockfile.sources.figma.tokenHash.slice(0, 16)}...`);
  } else {
    console.log(`  Figma:         Not connected`);
  }

  if (lockfile.sources.penpot) {
    console.log(`  Penpot file:   ${lockfile.sources.penpot.fileId}`);
    console.log(`  Penpot hash:   ${lockfile.sources.penpot.tokenHash.slice(0, 16)}...`);
  } else {
    console.log(`  Penpot:        Not connected`);
  }
}
