/**
 * Registry schema for Adhar UI components.
 * Inspired by shadcn/ui registry pattern.
 * Components are copied to the user's project, not installed from npm.
 */

export type RegistryItemType =
  | 'registry:ui'
  | 'registry:component'
  | 'registry:hook'
  | 'registry:lib'
  | 'registry:theme'
  | 'registry:block'
  | 'registry:page';

export type Framework = 'react' | 'vue' | 'angular' | 'solid' | 'svelte';

export interface RegistryItemFile {
  path: string;
  content: string;
  type: RegistryItemType;
  target?: string;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  files: Record<Framework, RegistryItemFile[]>;
  categories: string[];
  tier: 1 | 2 | 3;
  docs?: string;
  cssVars?: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  tailwind?: {
    config?: Record<string, unknown>;
  };
}

export interface RegistryIndex {
  version: string;
  components: RegistryItem[];
}
