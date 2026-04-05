/**
 * Configuration management for Adhar UI.
 * Reads/writes adhar-ui.json (equivalent to shadcn's components.json).
 */

import type { Framework } from './detect-framework.ts';

export interface AdharUIConfig {
  $schema?: string;
  framework: Framework;
  typescript: boolean;
  tailwind: {
    config: string;
    css: string;
    baseColor: string;
    cssVariables: boolean;
    prefix: string;
  };
  aliases: {
    components: string;
    ui: string;
    utils: string;
    lib: string;
    hooks: string;
  };
  iconLibrary: 'lucide' | 'icons';
}

const CONFIG_FILE = 'adhar-ui.json';

export const defaultConfig: AdharUIConfig = {
  $schema: 'https://ui.adhar.io/schema.json',
  framework: 'react',
  typescript: true,
  tailwind: {
    config: 'tailwind.config.ts',
    css: 'src/globals.css',
    baseColor: 'zinc',
    cssVariables: true,
    prefix: '',
  },
  aliases: {
    components: '@/components',
    ui: '@/components/ui',
    utils: '@/lib/utils',
    lib: '@/lib',
    hooks: '@/hooks',
  },
  iconLibrary: 'lucide',
};

export async function readConfig(cwd: string): Promise<AdharUIConfig | null> {
  try {
    const text = await Deno.readTextFile(`${cwd}/${CONFIG_FILE}`);
    return JSON.parse(text) as AdharUIConfig;
  } catch {
    return null;
  }
}

export async function writeConfig(cwd: string, config: AdharUIConfig): Promise<void> {
  const text = JSON.stringify(config, null, 2) + '\n';
  await Deno.writeTextFile(`${cwd}/${CONFIG_FILE}`, text);
}

export function resolveAliasPath(alias: string, cwd: string): string {
  // @/ -> src/ or ./
  // ~/ -> ./
  let resolved = alias;
  if (resolved.startsWith('@/')) {
    resolved = resolved.replace('@/', 'src/');
  } else if (resolved.startsWith('~/')) {
    resolved = resolved.replace('~/', './');
  }
  return `${cwd}/${resolved}`;
}
