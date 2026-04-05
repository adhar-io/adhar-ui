# @adhar-ui/registry

Component metadata registry for the Adhar UI design system. Contains the index of all 127 entries (91 components + 36 blocks) with their dependencies, categories, and tier assignments.

## Usage

```ts
import {
  getAllComponentNames,
  getComponent,
  getComponentsByCategory,
  getComponentsByTier,
} from '@adhar-ui/registry';

// Get a specific component
const button = getComponent('button');
// { name: 'button', tier: 1, categories: ['form'], dependencies: ['class-variance-authority'], ... }

// Get all AI components
const aiComponents = getComponentsByCategory('ai');

// Get enterprise tier
const enterprise = getComponentsByTier(3);

// Get all names
const names = getAllComponentNames(); // ['button', 'input', 'badge', ...]
```

## Component Count

| Tier | Count | Description                     |
| ---- | ----- | ------------------------------- |
| 1    | 39    | Core primitives (shadcn parity) |
| 2    | 12    | Composite components            |
| 3    | 27    | Enterprise + AI + Layout        |

## Categories

`form`, `display`, `feedback`, `layout`, `overlay`, `navigation`, `enterprise`, `ai`
