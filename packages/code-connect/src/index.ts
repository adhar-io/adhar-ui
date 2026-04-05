/**
 * @adhar-ui/code-connect
 *
 * Figma Code Connect mapping generator for Adhar UI components.
 * Auto-generates .figma.ts files that map Figma component instances
 * to Adhar UI code, enabling code snippets in Figma Dev Mode.
 *
 * Supports: React, Vue, Solid, Svelte, Angular
 *
 * @example
 * ```ts
 * import { generateCodeConnect } from '@adhar-ui/code-connect'
 * import { componentIndex } from '@adhar-ui/registry'
 *
 * // Generate Code Connect files for all components
 * const files = generateCodeConnect(componentIndex, 'react', 'FILE_KEY')
 * ```
 *
 * @module
 */

export {
  type CodeConnectFile,
  generateCodeConnect,
  generateComponentConnect,
} from './generator.ts';
