# @adhar-ui/primitives

Headless component primitives for the Adhar UI design system. Contains Mitosis source components (`.lite.tsx`) that compile to React, Vue, Solid, Svelte, and Angular.

## Architecture

```
src/components/<name>/
  <Name>.lite.tsx      # Mitosis source (framework-agnostic JSX)
  <name>.styles.ts     # CVA variants (Tailwind class definitions)
  <name>.types.ts      # TypeScript prop interfaces
  <name>.a11y.ts       # Accessibility specification
```

## Components (42 Mitosis sources)

Button, Badge, Input, Textarea, Label, Checkbox, Switch, Select, Separator, Avatar, Skeleton, Alert, AlertTitle, AlertDescription, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Progress, Spinner, Tabs, TabsList, TabsTrigger, TabsContent, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Tooltip, Popover, Toast, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Sheet, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator

## Building

```bash
# Compile to all 5 framework targets
deno task build

# This runs scripts/compile.sh which:
# 1. Compiles each .lite.tsx to react/vue/solid/svelte/angular
# 2. Adds @ts-nocheck to generated files
# 3. Injects useLocalProxy runtime for React stateful components
```

## CVA Style Variants

Each component exports Tailwind class variants via CVA:

```ts
import { buttonVariants } from '@adhar-ui/primitives';

buttonVariants({ variant: 'outline', size: 'sm' });
// => 'inline-flex items-center ... border border-input bg-background ... h-9 rounded-md px-3'
```
