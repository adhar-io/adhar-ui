# @adhar-ui/primitives

Framework-agnostic component sources for the Adhar UI design system. Mitosis components (`.lite.tsx`) compile to React, Vue, Solid, Svelte, and Angular; the CVA style variants they use are exported from this package for consumers who want the classes without the components.

## Architecture

```
src/components/<name>/
  <Name>.lite.tsx      # Mitosis source (framework-agnostic JSX)
  <name>.styles.ts     # CVA variants (Tailwind class definitions)
  <name>.types.ts      # TypeScript prop interfaces (some components)
  <name>.a11y.ts       # Accessibility specification
src/components/_internal/
  dom.ts               # Focus trap, roving focus, scroll lock, helpers
  placement.styles.ts  # CSS-only side/align placement for overlays
```

Every component applies its own variants and merges `className` with `cn()`, so `<Button variant="outline" size="sm">` is styled with no extra work. Overlays (Dialog, Sheet, Popover, DropdownMenu, Tooltip) handle focus, Escape, and outside clicks. Composite widgets (Tabs, RadioGroup, ToggleGroup, Accordion, Command, DropdownMenu) support WAI-ARIA keyboard navigation, and their roots report selection through `onValueChange`.

## Components

Accordion (Item, Trigger, Content), Alert (Title, Description), AspectRatio, Avatar, Badge, Breadcrumb (List, Item, Link, Page, Separator, Ellipsis), Button, Card (Header, Title, Description, Content, Footer), Checkbox, Collapsible (Trigger, Content), Command (Input, List, Group, Item, Empty, Separator, Shortcut), Dialog (Header, Title, Description, Footer), DropdownMenu (Item, Label, Separator, Shortcut), EmptyState, HoverCard (Trigger, Content), Input, InputOTP, Kbd, Label, Pagination (Content, Item, Link, Previous, Next, Ellipsis), Popover, Progress, RadioGroup (Item), ScrollArea, Select, Separator, Sheet (Header, Title, Description, Footer), Skeleton, Slider, Spinner, StatCard, Stepper (Step), Switch, Tabs (List, Trigger, Content), Textarea, Timeline (Item), Toast, Toggle, ToggleGroup (Item), Tooltip

## Building

```bash
deno task build    # from packages/primitives
```

`scripts/compile.sh` runs `mitosis build` with `mitosis.config.cjs`, which writes each target's native files (`.tsx`, `.vue`, `.svelte`, `.ts`) to `packages/<target>/src/generated/src/components/`, and copies the `.styles.ts` and `_internal` files next to them. Generated React output is type-checked by `deno task check` and exercised by `packages/react/src/__tests__/components_test.tsx`.

## Authoring rules

Mitosis accepts a subset of TSX, and several mistakes compile without an error but produce broken output. Follow these when editing a `.lite.tsx` file:

- **Use `useStore`, not `useState`.** Mitosis `useState` is the tuple form (`const [x, setX] = useState(0)`). Passing it an object compiles every member to `null`.
- **Compute classes in store getters.** `get classes() { return cn(fooVariants({ size: props.size }), props.className) }`. Imported functions called directly in JSX do not reach the Vue template.
- **No `props['aria-x']` inside the store.** Bracket access to props only works in JSX; use it there.
- **No `//` comments inside hook bodies or store methods.** Mitosis joins those lines, so the comment swallows the code after it. Use `/* ... */`.
- **No ASCII apostrophes in comments.** An odd number of `'` in a comment confuses Mitosis's whitespace handling and drops newlines. Write `’` instead.
- **Don't name a store member after a prop, or a local after a store member.** Vue, Svelte and Angular put props and store members in one namespace, and React compiles `const items = state.items()` to `const items = items()`.
- **Don't keep functions in the store.** React compiles store values to `useState`, which calls a function argument as an updater. Keep timers, flags and saved elements in a nested object (`inst: { timer: 0 }`) and mutate it in place, which compiles to a stable object in every target.
- **Avoid document listeners.** React's mount/unmount effects capture the first render, and Angular passes methods unbound. Handle events on the component's own elements, and use event delegation (`event.target.closest(...)`) for compound components.
- **Use `onFocusIn` / `onFocusOut`** for focus that should bubble from children. The build maps them to React's `onFocus` / `onBlur`, which already bubble.
- **Set an Angular selector.** `useMetadata({ angular: { selector: 'adhar-<name>' } })`; the default (`button`, `input`, ...) would capture native elements.
- **A prop named `state`** collides with the store rewrite in object keys. See `stepper.styles.ts` for the positional-helper workaround.

## CVA style variants

```ts
import { buttonVariants } from '@adhar-ui/primitives';

buttonVariants({ variant: 'outline', size: 'sm' });
// => 'inline-flex items-center ... border border-input bg-background ... h-9 rounded-md px-3'
```
