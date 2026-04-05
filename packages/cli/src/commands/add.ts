/**
 * `adhar-ui add` command.
 * Adds components to the user's project by copying source files.
 * Shadcn-style: components are owned by the user, not installed from npm.
 *
 * Flow:
 * 1. Resolve component and all its dependencies
 * 2. Fetch template source for the target framework
 * 3. Transform import aliases to match user's config
 * 4. Copy files to the user's project
 * 5. Install npm dependencies
 */

import { type AdharUIConfig, readConfig, resolveAliasPath } from '../utils/config.ts';
import { logger } from '../utils/logger.ts';
import { componentIndex, getComponent } from '@adhar-ui/registry';
import { getTemplate } from '../templates/index.ts';

export async function addCommand(
  cwd: string,
  componentNames: string[],
  options: { overwrite?: boolean; all?: boolean } = {},
): Promise<void> {
  // 1. Load config
  const config = await readConfig(cwd);
  if (!config) {
    logger.error('No adhar-ui.json found. Run `adhar-ui init` first.');
    return;
  }

  // 2. Resolve components to install
  let toInstall: string[];
  if (options.all) {
    toInstall = componentIndex.map((c) => c.name);
    logger.info(`Adding all ${toInstall.length} components...`);
  } else if (componentNames.length === 0) {
    logger.error('No components specified. Usage: adhar-ui add <component...>');
    logger.info('Run `adhar-ui list` to see available components.');
    return;
  } else {
    toInstall = componentNames;
  }

  // 3. Resolve dependency tree
  const resolved = resolveTree(toInstall);
  const allDeps = new Set<string>();
  const allComponents: string[] = [];

  for (const name of resolved) {
    const comp = getComponent(name);
    if (!comp) {
      logger.warn(`Component "${name}" not found in registry. Skipping.`);
      continue;
    }
    allComponents.push(name);
    for (const dep of comp.dependencies) {
      allDeps.add(dep);
    }
  }

  if (allComponents.length === 0) {
    logger.error('No valid components to add.');
    return;
  }

  logger.info(`Resolved ${allComponents.length} component(s) to install:`);
  logger.list(allComponents);
  logger.break();

  // 4. Create component files
  const uiDir = resolveAliasPath(config.aliases.ui, cwd);
  try {
    await Deno.mkdir(uiDir, { recursive: true });
  } catch { /* exists */ }

  let created = 0;
  let skipped = 0;

  for (const name of allComponents) {
    const ext = config.typescript ? '.tsx' : '.jsx';
    const filePath = `${uiDir}/${name}${ext}`;

    // Check if file exists
    try {
      await Deno.stat(filePath);
      if (!options.overwrite) {
        logger.dim(`  Skipped ${name} (already exists)`);
        skipped++;
        continue;
      }
    } catch { /* doesn't exist, proceed */ }

    // Get template and transform imports
    const source = getComponentSource(name, config);

    try {
      await Deno.writeTextFile(filePath, source);
      logger.success(`Created ${config.aliases.ui}/${name}${ext}`);
      created++;
    } catch (err) {
      logger.error(`Failed to create ${name}: ${err}`);
    }
  }

  // 5. Install npm dependencies
  if (allDeps.size > 0) {
    logger.break();
    logger.info(`Dependencies to install: ${[...allDeps].join(', ')}`);
    await installDeps(cwd, [...allDeps]);
  }

  // 6. Report
  logger.break();
  logger.success(`Done! ${created} created, ${skipped} skipped.`);

  // Show docs for components that have them
  for (const name of allComponents) {
    const comp = getComponent(name)!;
    if (comp.docs) {
      logger.break();
      logger.info(`${comp.title}: ${comp.docs}`);
    }
  }
}

/**
 * Recursively resolve component dependencies.
 */
function resolveTree(names: string[]): string[] {
  const resolved = new Set<string>();
  const queue = [...names];

  while (queue.length > 0) {
    const name = queue.shift()!;
    if (resolved.has(name)) continue;
    resolved.add(name);

    const comp = getComponent(name);
    if (comp) {
      for (const dep of comp.registryDependencies) {
        if (!resolved.has(dep)) {
          queue.push(dep);
        }
      }
    }
  }

  return [...resolved];
}

/**
 * Get component source with import aliases transformed to match user's config.
 */
function getComponentSource(name: string, config: AdharUIConfig): string {
  // Look up template
  const template = getTemplate(name);

  if (template) {
    // Transform @/lib/utils to user's configured alias
    return transformImports(template, config);
  }

  // Fallback: generate a basic component shell
  const pascalName = name.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');

  if (config.framework === 'react') {
    return `import * as React from 'react'
import { cn } from '${config.aliases.utils}'

export interface ${pascalName}Props extends React.HTMLAttributes<HTMLDivElement> {}

const ${pascalName} = React.forwardRef<HTMLDivElement, ${pascalName}Props>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)
${pascalName}.displayName = '${pascalName}'

export { ${pascalName} }
`;
  }

  return `// ${name} component
// Framework: ${config.framework}
// Add your implementation here
export {}
`;
}

/**
 * Transform import aliases from template defaults to user's config.
 */
function transformImports(source: string, config: AdharUIConfig): string {
  let result = source;

  // Transform @/lib/utils -> user's utils alias
  result = result.replace(
    /from ['"]@\/lib\/utils['"]/g,
    `from '${config.aliases.utils}'`,
  );

  // Transform relative component imports: './button' -> user's UI alias
  // e.g., import { Button } from './button' -> import { Button } from '@/components/ui/button'
  result = result.replace(
    /from ['"]\.\/([a-z-]+)['"]/g,
    `from '${config.aliases.ui}/$1'`,
  );

  // Add Tailwind prefix if configured
  if (config.tailwind.prefix) {
    // This is a simplified prefix transformer
    // In production you'd use a proper CSS class transformer
    result = result.replace(
      /className={cn\(/g,
      `className={cn(/* prefix: ${config.tailwind.prefix} */ `,
    );
  }

  return result;
}

async function installDeps(cwd: string, deps: string[]): Promise<void> {
  let pm = 'npm';
  try {
    await Deno.stat(`${cwd}/pnpm-lock.yaml`);
    pm = 'pnpm';
  } catch {
    try {
      await Deno.stat(`${cwd}/yarn.lock`);
      pm = 'yarn';
    } catch {
      try {
        await Deno.stat(`${cwd}/bun.lockb`);
        pm = 'bun';
      } catch {
        try {
          await Deno.stat(`${cwd}/deno.lock`);
          pm = 'deno';
        } catch { /* npm */ }
      }
    }
  }

  if (pm === 'deno') {
    logger.dim('Deno detected - add deps to your import map manually.');
    return;
  }

  const cmd = pm === 'pnpm'
    ? ['pnpm', 'add']
    : pm === 'yarn'
    ? ['yarn', 'add']
    : pm === 'bun'
    ? ['bun', 'add']
    : ['npm', 'install'];

  try {
    const process = new Deno.Command(cmd[0], {
      args: [...cmd.slice(1), ...deps],
      cwd,
      stdout: 'piped',
      stderr: 'piped',
    });
    const result = await process.output();
    if (result.success) {
      logger.success(`Installed: ${deps.join(', ')}`);
    }
  } catch {
    logger.warn(`Install manually: ${cmd.join(' ')} ${deps.join(' ')}`);
  }
}
