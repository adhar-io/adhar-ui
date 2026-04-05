/**
 * Lockfile management for tracking sync state.
 *
 * The `.adhar-ui.lock` file records the last-known state of tokens
 * in code and each design tool. It serves as the "common ancestor"
 * in three-way merge operations for conflict detection.
 *
 * @module
 */

/** State of a single sync source (code, figma, or penpot). */
export interface SyncSource {
  /** Design tool file identifier. */
  fileKey?: string;
  fileId?: string;
  /** SHA-256 hash of the DTCG-normalized token state at last sync. */
  tokenHash: string;
  /** Per-component hashes for incremental sync. */
  componentHashes?: Record<string, string>;
}

/** Complete lockfile structure. */
export interface SyncLockfile {
  /** Lockfile format version. */
  version: number;
  /** ISO timestamp of last successful sync. */
  lastSync: string;
  /** State of each sync source. */
  sources: {
    figma?: SyncSource;
    penpot?: SyncSource;
    code: SyncSource;
  };
}

const LOCKFILE_NAME = '.adhar-ui.lock';

/**
 * Read the sync lockfile from a project directory.
 *
 * @param cwd - Project root directory
 * @returns Parsed lockfile, or null if not found
 */
export async function readLockfile(cwd: string): Promise<SyncLockfile | null> {
  try {
    const text = await Deno.readTextFile(`${cwd}/${LOCKFILE_NAME}`);
    return JSON.parse(text) as SyncLockfile;
  } catch {
    return null;
  }
}

/**
 * Write the sync lockfile to a project directory.
 *
 * @param cwd - Project root directory
 * @param lockfile - Lockfile data to write
 */
export async function writeLockfile(cwd: string, lockfile: SyncLockfile): Promise<void> {
  const text = JSON.stringify(lockfile, null, 2) + '\n';
  await Deno.writeTextFile(`${cwd}/${LOCKFILE_NAME}`, text);
}

/**
 * Create a new lockfile with initial code state.
 *
 * @param tokenHash - SHA-256 hash of current code tokens
 * @returns Fresh lockfile
 */
export function createLockfile(tokenHash: string): SyncLockfile {
  return {
    version: 1,
    lastSync: new Date().toISOString(),
    sources: {
      code: { tokenHash },
    },
  };
}

/**
 * Compute a SHA-256 hash of a DTCG document for change detection.
 *
 * @param dtcgJson - Stringified DTCG document
 * @returns Hex-encoded SHA-256 hash
 */
export async function hashTokens(dtcgJson: string): Promise<string> {
  const data = new TextEncoder().encode(dtcgJson);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
