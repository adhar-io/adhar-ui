# @adhar-ui/react

React components for the Adhar UI design system. Compiled from Mitosis sources with React-specific optimizations including `forwardRef`, `useState`, and the `useLocalProxy` runtime for stateful components.

## Usage

```tsx
import { Button, buttonVariants } from '@adhar-ui/react'
import { cn } from '@adhar-ui/utils'

// Use the compiled React component
<Button className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
  Click me
</Button>
```

## What's Included

- 42 compiled React components from Mitosis sources
- All CVA style variant exports (buttonVariants, badgeVariants, etc.)
- Re-exports of tokens, utils, a11y, and icons
- `useLocalProxy` runtime for Mitosis-generated stateful components
