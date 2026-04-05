/**
 * Core types for the design sync engine.
 * @module
 */

/** Direction of a sync operation. */
export type SyncDirection = 'push' | 'pull';

/** Target design tool. */
export type SyncTarget = 'figma' | 'penpot';

/** Result of a sync operation. */
export interface SyncResult {
  /** Whether the sync succeeded. */
  success: boolean;
  /** Number of tokens created. */
  created: number;
  /** Number of tokens updated. */
  updated: number;
  /** Number of tokens deleted. */
  deleted: number;
  /** Number of unresolved conflicts. */
  conflicts: number;
  /** Human-readable summary. */
  summary: string;
}
