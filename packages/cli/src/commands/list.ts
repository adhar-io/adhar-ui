/**
 * `adhar-ui list` command.
 * Lists all available components organized by category and tier.
 */

import { componentIndex } from '@adhar-ui/registry';
import { readConfig } from '../utils/config.ts';
import { logger } from '../utils/logger.ts';

export async function listCommand(
  cwd: string,
  options: { category?: string; tier?: string; json?: boolean } = {},
): Promise<void> {
  const config = await readConfig(cwd);

  if (options.json) {
    console.log(JSON.stringify(componentIndex, null, 2));
    return;
  }

  // Filter by category
  let components = componentIndex;
  if (options.category) {
    components = components.filter((c) => c.categories.includes(options.category!));
  }
  if (options.tier) {
    const tier = parseInt(options.tier) as 1 | 2 | 3;
    components = components.filter((c) => c.tier === tier);
  }

  // Group by tier
  const tiers = [
    { level: 1, label: 'Core Primitives', components: components.filter((c) => c.tier === 1) },
    { level: 2, label: 'Composite Components', components: components.filter((c) => c.tier === 2) },
    { level: 3, label: 'Enterprise & AI', components: components.filter((c) => c.tier === 3) },
  ];

  logger.header(`Adhar UI Components (${components.length} total)`);
  if (config) {
    logger.dim(`Framework: ${config.framework}`);
  }
  logger.break();

  for (const tier of tiers) {
    if (tier.components.length === 0) continue;
    console.log(`\x1b[1mTier ${tier.level}: ${tier.label}\x1b[0m (${tier.components.length})`);
    console.log();

    // Group by category
    const categories = new Map<string, typeof tier.components>();
    for (const comp of tier.components) {
      const cat = comp.categories[0] || 'other';
      if (!categories.has(cat)) categories.set(cat, []);
      categories.get(cat)!.push(comp);
    }

    for (const [cat, comps] of categories) {
      console.log(`  \x1b[36m${cat}\x1b[0m`);
      for (const comp of comps) {
        const deps = comp.registryDependencies.length > 0
          ? `\x1b[2m (requires: ${comp.registryDependencies.join(', ')})\x1b[0m`
          : '';
        console.log(
          `    \x1b[32m${comp.name.padEnd(24)}\x1b[0m ${comp.description.slice(0, 60)}${deps}`,
        );
      }
    }
    console.log();
  }
}
