# @adhar-ui/react

React components for the Adhar UI design system, compiled from the Mitosis sources in `@adhar-ui/primitives`.

## Usage

```tsx
import { Button, Dialog, DialogTitle } from '@adhar-ui/react';

<Button variant='outline' size='sm' onClick={save}>Save</Button>

<Dialog open={open} onOpenChange={setOpen} aria-labelledby='dlg-title'>
  <DialogTitle id='dlg-title'>Edit profile</DialogTitle>
  ...
</Dialog>
```

Components apply their own Tailwind classes; pass `className` to extend or override them (conflicts are resolved with `tailwind-merge`). Your Tailwind config must scan this package so the classes are generated, and use the `@adhar-ui/tailwind-preset` tokens.

Form controls work controlled (`value` / `checked` / `open` + a change handler) or uncontrolled (`defaultValue` / `defaultChecked` / `defaultOpen`).

## What's included

- Compiled React components (see the primitives README for the list)
- All CVA style variant exports (`buttonVariants`, `badgeVariants`, ...)
- Re-exports of tokens, utils, a11y, and icons
