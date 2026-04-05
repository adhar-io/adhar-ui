/**
 * @adhar-ui/figma-plugin
 *
 * Figma plugin for bidirectional design token and component synchronization.
 *
 * Features:
 *  - Push Adhar UI tokens to Figma Variables (light/dark modes)
 *  - Pull Figma Variables back to Adhar UI ThemePreset
 *  - Push CVA component variants to Figma component sets
 *  - Dev Mode codegen: show Adhar UI component code for selected design nodes
 *
 * Architecture:
 *  - code.ts: Main thread with figma.* API access
 *  - ui/App.tsx: Plugin panel UI in iframe
 *  - handlers/: Token and component sync logic
 *  - codegen/: Dev Mode code snippet generation
 *
 * Build:
 *  - esbuild bundles to self-contained JS (no Deno APIs)
 *  - DTCG converter tree-shaken and inlined
 *
 * @module
 */

export { tokenPush } from './handlers/token-push.ts';
export { tokenPull } from './handlers/token-pull.ts';
export { componentPush } from './handlers/component-push.ts';
