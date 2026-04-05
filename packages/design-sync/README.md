# @adhar-ui/design-sync

Shared sync engine for bidirectional design tool synchronization. Provides the core logic for comparing, merging, and tracking design tokens across code (Adhar UI) and design tools (Figma, Penpot).

This package is consumed by the CLI, Figma plugin, Penpot plugin, and sync server. It never talks to design tool APIs directly -- it operates on DTCG documents and produces instructions.

## Architecture

```
src/
  index.ts              # Public API exports
  types.ts              # SyncDirection, SyncResult types
  diff-engine.ts        # Structural diff of DTCG token trees
  conflict-resolver.ts  # Three-way merge with strategies
  component-map.ts      # CVA variant → design tool variant mapping
  lockfile.ts           # .adhar-ui.lock read/write/hash
```

## Getting Started

### Step 1: Compute a token diff

Compare two DTCG documents to find what changed:

```ts
import { diffTokens } from '@adhar-ui/design-sync';
import { themeToDtcg } from '@adhar-ui/dtcg';
import { blue, zinc } from '@adhar-ui/tokens';

const baseDtcg = themeToDtcg(zinc); // previous state
const currentDtcg = themeToDtcg(blue); // current state

const diff = diffTokens(baseDtcg, currentDtcg);

console.log(
  `Changes: ${diff.summary.added} added, ${diff.summary.modified} modified, ${diff.summary.removed} removed`,
);

for (const change of diff.changes) {
  console.log(`  ${change.type}: ${change.path}`);
  if (change.type === 'modified') {
    console.log(`    ${change.oldValue} → ${change.newValue}`);
  }
}
```

### Step 2: Resolve conflicts between code and design tool

When both code and the design tool change the same token:

```ts
import { diffTokens } from '@adhar-ui/design-sync';
import { resolveConflicts } from '@adhar-ui/design-sync';

// codeDiff: changes from lockfile base → current code
// designDiff: changes from lockfile base → current Figma state
const result = resolveConflicts(codeDiff, designDiff, 'prompt', 'figma');

// Non-conflicting changes are auto-resolved:
console.log(`Apply to code: ${result.applyToCode.length} changes`);
console.log(`Apply to Figma: ${result.applyToDesign.length} changes`);

// Conflicts need manual resolution:
for (const conflict of result.conflicts) {
  console.log(`CONFLICT at ${conflict.path}:`);
  console.log(`  Code value:   ${conflict.codeValue}`);
  console.log(`  Design value: ${conflict.designValue}`);
  console.log(`  Base value:   ${conflict.baseValue}`);
}
```

**Conflict strategies:**

| Strategy        | Behavior                                                 |
| --------------- | -------------------------------------------------------- |
| `"prompt"`      | Records conflicts for user to resolve manually (default) |
| `"code-wins"`   | Code changes always override design tool changes         |
| `"design-wins"` | Design tool changes always override code changes         |

Configure in `adhar-ui.json`:

```json
{
  "design": {
    "conflictStrategy": "prompt"
  }
}
```

### Step 3: Map CVA component variants to design tool variants

Extract variant information from CVA definitions for creating design tool component sets:

```ts
import { buildComponentMap, generateVariantCombinations } from '@adhar-ui/design-sync';

// CVA config (from button.styles.ts or extracted at runtime)
const cvaConfig = {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground...',
      destructive: 'bg-destructive text-destructive-foreground...',
      outline: 'border border-input bg-background...',
      secondary: 'bg-secondary text-secondary-foreground...',
      ghost: 'hover:bg-accent...',
      link: 'text-primary underline-offset-4...',
    },
    size: {
      sm: 'h-9 rounded-md px-3',
      default: 'h-10 px-4 py-2',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
};

// Build the variant map
const map = buildComponentMap('button', 'Button', cvaConfig);

console.log(`Component: ${map.componentName}`);
console.log(`Total variants: ${map.totalVariants}`); // 24 (6 × 4)

for (const axis of map.variantAxes) {
  console.log(`  ${axis.axisName}: [${axis.values.join(', ')}] (default: ${axis.defaultValue})`);
}
// Output:
//   variant: [default, destructive, outline, secondary, ghost, link] (default: default)
//   size: [sm, default, lg, icon] (default: default)

// Generate all combinations for design tool frames
const combos = generateVariantCombinations(map);
// Returns 24 objects like:
// [
//   { variant: "default", size: "sm" },
//   { variant: "default", size: "default" },
//   { variant: "default", size: "lg" },
//   { variant: "default", size: "icon" },
//   { variant: "destructive", size: "sm" },
//   ...
// ]
```

### Step 4: Manage the sync lockfile

The `.adhar-ui.lock` file tracks the last-known state of tokens for three-way merge:

```ts
import { hashTokens, readLockfile, writeLockfile } from '@adhar-ui/design-sync';
import { themeToDtcg } from '@adhar-ui/dtcg';
import { zinc } from '@adhar-ui/tokens';

// Read existing lockfile
const lockfile = await readLockfile('/path/to/project');

if (!lockfile) {
  console.log('No lockfile found. First sync will create one.');
}

// Compute token hash for change detection
const dtcg = themeToDtcg(zinc);
const hash = await hashTokens(JSON.stringify(dtcg));

// Write updated lockfile after successful sync
await writeLockfile('/path/to/project', {
  version: 1,
  lastSync: new Date().toISOString(),
  sources: {
    code: { tokenHash: hash },
    figma: { fileKey: 'abc123', tokenHash: hash },
  },
});
```

**Lockfile format** (`.adhar-ui.lock`):

```json
{
  "version": 1,
  "lastSync": "2026-04-05T12:00:00Z",
  "sources": {
    "code": {
      "tokenHash": "a1b2c3d4e5f6..."
    },
    "figma": {
      "fileKey": "abc123def456",
      "tokenHash": "a1b2c3d4e5f6..."
    },
    "penpot": {
      "fileId": "xyz789",
      "tokenHash": "a1b2c3d4e5f6..."
    }
  }
}
```

## Three-Way Merge Flow

```
               Lockfile (Base)
              /               \
             v                 v
     Code Changes        Design Changes
      (codeDiff)          (designDiff)
             \               /
              v             v
           Conflict Resolution
                  |
     +------------+------------+
     |            |            |
applyToCode  applyToDesign  conflicts
(auto)        (auto)       (manual)
```

## API Reference

| Export                                             | Type     | Purpose                                    |
| -------------------------------------------------- | -------- | ------------------------------------------ |
| `diffTokens(base, current)`                        | Function | Structural diff of two DTCG documents      |
| `resolveConflicts(code, design, strategy, source)` | Function | Three-way merge with conflict detection    |
| `buildComponentMap(name, title, cvaConfig)`        | Function | CVA config → ComponentVariantMap           |
| `generateVariantCombinations(map)`                 | Function | All variant property combinations          |
| `readLockfile(cwd)`                                | Function | Read `.adhar-ui.lock`                      |
| `writeLockfile(cwd, lockfile)`                     | Function | Write `.adhar-ui.lock`                     |
| `hashTokens(json)`                                 | Function | SHA-256 hash for change detection          |
| `TokenDiff`                                        | Type     | Diff result with changes and summary       |
| `TokenChange`                                      | Type     | Single change (added/removed/modified)     |
| `ConflictRecord`                                   | Type     | Unresolved conflict details                |
| `ConflictStrategy`                                 | Type     | `'prompt' \| 'code-wins' \| 'design-wins'` |
| `ComponentVariantMap`                              | Type     | Component variant axes and values          |
| `SyncLockfile`                                     | Type     | Lockfile structure                         |

## Development

```bash
# Type-check
deno check packages/design-sync/src/index.ts

# Lint
deno lint packages/design-sync/src
```
