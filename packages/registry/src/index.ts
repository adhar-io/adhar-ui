/**
 * @adhar-ui/registry
 *
 * Complete component registry for the Adhar UI design system.
 * Each component entry defines metadata, dependencies, and categories.
 * Source files are resolved from the primitives package at build time.
 */

export type {
  Framework,
  RegistryIndex,
  RegistryItem,
  RegistryItemFile,
  RegistryItemType,
} from './schema.ts';
export {
  componentIndex,
  getAllComponentNames,
  getComponent,
  getComponentsByCategory,
  getComponentsByTier,
} from './component-index.ts';
