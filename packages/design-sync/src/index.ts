/**
 * @adhar-ui/design-sync
 *
 * Shared sync engine for bidirectional design tool synchronization.
 * Provides diff computation, conflict resolution, component variant mapping,
 * and lockfile management used by the CLI, plugins, and sync server.
 *
 * @module
 */

export { diffTokens, type TokenChange, type TokenDiff } from './diff-engine.ts';
export {
  type ConflictRecord,
  type ConflictStrategy,
  resolveConflicts,
} from './conflict-resolver.ts';
export {
  buildComponentMap,
  type ComponentVariantMap,
  generateVariantCombinations,
  type VariantAxis,
} from './component-map.ts';
export { readLockfile, type SyncLockfile, type SyncSource, writeLockfile } from './lockfile.ts';
export { type SyncDirection, type SyncResult } from './types.ts';
