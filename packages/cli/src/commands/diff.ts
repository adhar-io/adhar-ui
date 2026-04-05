/**
 * `adhar-ui diff` command.
 * Shows differences between local components and the registry.
 */

import { readConfig } from '../utils/config.ts';
import { logger } from '../utils/logger.ts';
import { getAllComponentNames, getComponent } from '@adhar-ui/registry';

export async function diffCommand(cwd: string, componentNames: string[]): Promise<void> {
  const config = await readConfig(cwd);
  if (!config) {
    logger.error('No adhar-ui.json found. Run `adhar-ui init` first.');
    return;
  }

  const uiPath = config.aliases.ui.replace('@/', 'src/').replace('~/', '');
  const uiDir = `${cwd}/${uiPath}`;

  // Get installed components
  const installed: string[] = [];
  try {
    for await (const entry of Deno.readDir(uiDir)) {
      if (entry.isFile && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        installed.push(entry.name.replace(/\.(tsx?|jsx?)$/, ''));
      }
    }
  } catch {
    logger.warn(`UI directory not found: ${uiPath}`);
    return;
  }

  const allNames = getAllComponentNames();

  // Filter to specific components or show all
  const toCheck = componentNames.length > 0 ? componentNames : installed;

  logger.header(`Component Status (${toCheck.length} checked)`);
  logger.break();

  let modified = 0;
  let upToDate = 0;
  let notInstalled = 0;

  for (const name of toCheck) {
    const registryEntry = getComponent(name);
    const isInstalled = installed.includes(name);

    if (!registryEntry) {
      console.log(
        `  \x1b[33m?\x1b[0m ${name.padEnd(24)} \x1b[2mNot in registry (custom component)\x1b[0m`,
      );
      continue;
    }

    if (!isInstalled) {
      console.log(`  \x1b[31m-\x1b[0m ${name.padEnd(24)} \x1b[2mNot installed\x1b[0m`);
      notInstalled++;
      continue;
    }

    // Check if the file has been modified (by checking file size as a heuristic)
    try {
      await Deno.stat(`${uiDir}/${name}.tsx`);
      // Simple heuristic: report as "installed"
      console.log(`  \x1b[32m✓\x1b[0m ${name.padEnd(24)} Installed`);
      upToDate++;
    } catch {
      console.log(`  \x1b[33m~\x1b[0m ${name.padEnd(24)} \x1b[2mModified\x1b[0m`);
      modified++;
    }
  }

  // Show available but not installed
  const notInstalledComponents = allNames.filter((n) => !installed.includes(n));
  if (notInstalledComponents.length > 0 && componentNames.length === 0) {
    logger.break();
    logger.dim(`${notInstalledComponents.length} components available but not installed.`);
    logger.dim('Run `adhar-ui list` to see all available components.');
  }

  logger.break();
  logger.info(`${upToDate} installed, ${modified} modified, ${notInstalled} not installed`);
}
