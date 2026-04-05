/**
 * `adhar-ui init` command.
 * Initializes a project for Adhar UI usage.
 *
 * Flow:
 * 1. Detect framework (React, Vue, Angular, Solid, Svelte)
 * 2. Prompt for configuration
 * 3. Write adhar-ui.json
 * 4. Install base dependencies
 * 5. Create utility files (cn, globals.css)
 */

import { detectFramework } from '../utils/detect-framework.ts';
import { type AdharUIConfig, defaultConfig, writeConfig } from '../utils/config.ts';
import { logger } from '../utils/logger.ts';
import { generateCSS } from '@adhar-ui/tokens';
import { zinc } from '@adhar-ui/tokens';

export async function initCommand(
  cwd: string,
  options: { force?: boolean; defaults?: boolean } = {},
): Promise<void> {
  logger.header('Initializing Adhar UI...');

  // 1. Check for existing config
  try {
    await Deno.stat(`${cwd}/adhar-ui.json`);
    if (!options.force) {
      logger.error('adhar-ui.json already exists. Use --force to overwrite.');
      return;
    }
    logger.warn('Overwriting existing adhar-ui.json');
  } catch { /* no existing config, good */ }

  // 2. Detect framework
  logger.info('Detecting project framework...');
  const projectInfo = await detectFramework(cwd);

  if (projectInfo.framework === 'unknown') {
    logger.warn('Could not detect framework. Defaulting to React.');
    projectInfo.framework = 'react';
  }

  logger.success(`Detected: ${projectInfo.framework} (${projectInfo.metaFramework})`);
  logger.info(`TypeScript: ${projectInfo.isTypeScript}`);
  logger.info(`Package manager: ${projectInfo.packageManager}`);
  logger.info(
    `Tailwind CSS: ${
      projectInfo.tailwindVersion ? `v${projectInfo.tailwindVersion}` : 'not found'
    }`,
  );

  // 3. Build configuration
  const config: AdharUIConfig = {
    ...defaultConfig,
    framework: projectInfo.framework,
    typescript: projectInfo.isTypeScript,
  };

  // Adjust paths based on project structure
  if (projectInfo.isSrcDir) {
    config.tailwind.css = 'src/globals.css';
    config.aliases.components = '@/components';
    config.aliases.ui = '@/components/ui';
    config.aliases.utils = '@/lib/utils';
    config.aliases.lib = '@/lib';
    config.aliases.hooks = '@/hooks';
  } else {
    config.tailwind.css = 'app/globals.css';
    config.aliases.components = '~/components';
    config.aliases.ui = '~/components/ui';
    config.aliases.utils = '~/lib/utils';
    config.aliases.lib = '~/lib';
    config.aliases.hooks = '~/hooks';
  }

  // Adjust tailwind config filename
  if (projectInfo.isTypeScript) {
    config.tailwind.config = 'tailwind.config.ts';
  } else {
    config.tailwind.config = 'tailwind.config.js';
  }

  // 4. Write config
  await writeConfig(cwd, config);
  logger.success('Created adhar-ui.json');

  // 5. Create utility files
  await createUtilityFiles(cwd, config);

  // 6. Create globals CSS with theme
  await createGlobalCSS(cwd, config);

  // 7. Install dependencies
  await installBaseDependencies(cwd, projectInfo.packageManager);

  logger.break();
  logger.success('Adhar UI initialized successfully!');
  logger.break();
  logger.info('Next steps:');
  logger.list([
    'Run `adhar-ui add button` to add your first component',
    'Run `adhar-ui list` to see all available components',
    'Run `adhar-ui add --all` to add all components',
  ]);
}

async function createUtilityFiles(cwd: string, config: AdharUIConfig): Promise<void> {
  // Create utils directory and cn.ts
  const utilsPath = config.aliases.utils.replace('@/', 'src/').replace('~/', '');
  const utilsDir = `${cwd}/${utilsPath.split('/').slice(0, -1).join('/')}`;
  const ext = config.typescript ? '.ts' : '.js';

  try {
    await Deno.mkdir(utilsDir, { recursive: true });
  } catch { /* dir exists */ }

  const cnContent = config.typescript
    ? `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
    : `import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`;

  await Deno.writeTextFile(
    `${cwd}/${utilsPath.replace('@/', 'src/').replace('~/', '')}${ext}`,
    cnContent,
  );
  logger.success(`Created ${utilsPath}${ext}`);
}

async function createGlobalCSS(cwd: string, config: AdharUIConfig): Promise<void> {
  const cssPath = `${cwd}/${config.tailwind.css}`;
  const cssDir = cssPath.split('/').slice(0, -1).join('/');

  try {
    await Deno.mkdir(cssDir, { recursive: true });
  } catch { /* dir exists */ }

  const themeCSS = generateCSS(zinc);

  const content = `@tailwind base;
@tailwind components;
@tailwind utilities;

${themeCSS}`;

  // Only write if file doesn't exist
  try {
    await Deno.stat(cssPath);
    logger.dim(`Skipped ${config.tailwind.css} (already exists)`);
  } catch {
    await Deno.writeTextFile(cssPath, content);
    logger.success(`Created ${config.tailwind.css}`);
  }
}

async function installBaseDependencies(cwd: string, packageManager: string): Promise<void> {
  const deps = ['clsx', 'tailwind-merge', 'class-variance-authority', 'tailwindcss-animate'];

  logger.info('Installing base dependencies...');

  let cmd: string[];
  switch (packageManager) {
    case 'pnpm':
      cmd = ['pnpm', 'add', ...deps];
      break;
    case 'yarn':
      cmd = ['yarn', 'add', ...deps];
      break;
    case 'bun':
      cmd = ['bun', 'add', ...deps];
      break;
    case 'deno':
      // Deno uses npm: specifiers, no install needed
      logger.dim('Deno detected - dependencies use npm: specifiers (no install needed)');
      return;
    default:
      cmd = ['npm', 'install', ...deps];
  }

  try {
    const process = new Deno.Command(cmd[0], {
      args: cmd.slice(1),
      cwd,
      stdout: 'piped',
      stderr: 'piped',
    });
    const result = await process.output();

    if (result.success) {
      logger.success(`Installed: ${deps.join(', ')}`);
    } else {
      const stderr = new TextDecoder().decode(result.stderr);
      logger.warn(`Some dependencies may not have installed: ${stderr.slice(0, 200)}`);
    }
  } catch {
    logger.warn(`Could not auto-install dependencies. Please run manually:`);
    logger.dim(`  ${cmd.join(' ')}`);
  }
}
