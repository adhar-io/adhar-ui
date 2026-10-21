/**
 * Behaviour tests for the Mitosis-compiled React components.
 *
 * These render the generated output (src/generated) into a happy-dom document,
 * so they exercise what consumers actually import — including the codegen,
 * not just the .lite.tsx sources.
 */
import { GlobalRegistrator } from 'npm:@happy-dom/global-registrator@15.11.7';

GlobalRegistrator.register({ url: 'http://localhost/' });
// happy-dom does no layout, so every element reports zero client rects and
// would count as hidden to the focus helpers. Treat attached, non-hidden
// elements as visible.
HTMLElement.prototype.getClientRects = function (this: HTMLElement) {
  const hidden = this.closest('[hidden]') || !this.isConnected;
  return (hidden ? [] : [{}]) as unknown as DOMRectList;
};
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

import { assert, assertEquals, assertStringIncludes } from 'jsr:@std/assert@^1.0.13';
import * as React from 'react';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
  Accordion,
  AccordionTrigger,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Command,
  CommandItem,
  Dialog,
  DropdownMenu,
  DropdownMenuItem,
  InputOTP,
  PaginationLink,
  Popover,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Select,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  Toast,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
} from '../index.ts';

const h = React.createElement;

interface Mounted {
  container: HTMLElement;
  root: Root;
  rerender(el: React.ReactElement): Promise<void>;
  unmount(): Promise<void>;
}

async function mount(el: React.ReactElement): Promise<Mounted> {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => root.render(el));
  return {
    container,
    root,
    rerender: async (next) => {
      await act(async () => root.render(next));
    },
    unmount: async () => {
      await act(async () => root.unmount());
      container.remove();
    },
  };
}

/** Lets components' setTimeout(0) focus hand-offs run. */
async function flush(ms = 0) {
  await act(async () => {
    await new Promise((r) => setTimeout(r, ms));
  });
}

async function key(target: Element, k: string, init: KeyboardEventInit = {}) {
  await act(async () => {
    target.dispatchEvent(
      new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true, ...init }),
    );
  });
}

async function click(target: Element) {
  await act(async () => {
    (target as HTMLElement).click();
  });
}

const testOpts = { sanitizeOps: false, sanitizeResources: false };

Deno.test('Button applies variant, size and className', testOpts, async () => {
  const m = await mount(
    h(Button, { variant: 'destructive', size: 'sm', className: 'px-9' }, 'Delete'),
  );
  const btn = m.container.querySelector('button')!;
  assertStringIncludes(btn.className, 'bg-destructive');
  assertStringIncludes(btn.className, 'h-9');
  // tailwind-merge: the consumer's px-9 replaces the size's px-3.
  assertStringIncludes(btn.className, 'px-9');
  assert(!btn.className.includes('px-3'));
  assertEquals(btn.getAttribute('type'), 'button');
  await m.unmount();
});

Deno.test('Button loading blocks clicks and announces', testOpts, async () => {
  let clicks = 0;
  const m = await mount(h(Button, { loading: true, onClick: () => clicks++ }, 'Save'));
  const btn = m.container.querySelector('button')!;
  assert(btn.disabled);
  assertEquals(btn.getAttribute('aria-busy'), 'true');
  assertStringIncludes(btn.textContent!, 'Loading');
  await click(btn);
  assertEquals(clicks, 0);
  await m.unmount();
});

Deno.test('Badge with onClick is keyboard operable', testOpts, async () => {
  let clicks = 0;
  const m = await mount(h(Badge, { onClick: () => clicks++ }, 'Filter'));
  const badge = m.container.querySelector('span')!;
  assertEquals(badge.getAttribute('role'), 'button');
  assertEquals(badge.getAttribute('tabindex'), '0');
  await key(badge, 'Enter');
  await key(badge, ' ');
  assertEquals(clicks, 2);
  await m.unmount();
});

Deno.test('Checkbox works uncontrolled and reflects indeterminate', testOpts, async () => {
  const seen: boolean[] = [];
  const m = await mount(
    h(Checkbox, { defaultChecked: true, onCheckedChange: (v: boolean) => seen.push(v) }),
  );
  const input = m.container.querySelector('input')!;
  assert(input.checked);
  assertEquals(input.dataset.state, 'checked');
  await click(input);
  assertEquals(seen, [false]);
  assertEquals(input.dataset.state, 'unchecked');
  await m.rerender(h(Checkbox, { indeterminate: true }));
  assert(input.indeterminate);
  assertEquals(input.getAttribute('aria-checked'), 'mixed');
  await m.unmount();
});

Deno.test('Switch toggles once per activation and submits via hidden input', testOpts, async () => {
  const seen: boolean[] = [];
  const m = await mount(h(Switch, { name: 'notify', onChange: (v: boolean) => seen.push(v) }));
  const sw = m.container.querySelector('[role="switch"]')!;
  assertEquals(sw.getAttribute('aria-checked'), 'false');
  assertEquals(m.container.querySelector('input[type="hidden"]'), null);
  await click(sw);
  assertEquals(seen, [true]);
  assertEquals(sw.getAttribute('aria-checked'), 'true');
  assertEquals(sw.getAttribute('data-state'), 'checked');
  assertEquals(m.container.querySelector<HTMLInputElement>('input[type="hidden"]')!.value, 'on');
  await m.unmount();
});

Deno.test('Avatar falls back to initials from alt', testOpts, async () => {
  const m = await mount(h(Avatar, { alt: 'Ada Lovelace' }));
  assertEquals(m.container.textContent, 'AL');
  assertEquals(m.container.firstElementChild!.getAttribute('aria-label'), 'Ada Lovelace');
  await m.unmount();
});

Deno.test('Progress honours max and supports indeterminate', testOpts, async () => {
  const m = await mount(h(Progress, { value: 50, max: 200 }));
  const bar = m.container.querySelector('[role="progressbar"]')!;
  assertEquals(bar.getAttribute('aria-valuetext'), '25%');
  assertEquals((bar.firstElementChild as HTMLElement).style.transform, 'translateX(-75%)');
  await m.rerender(h(Progress, {}));
  assertEquals(bar.getAttribute('aria-valuenow'), null);
  assertEquals(bar.getAttribute('data-state'), 'indeterminate');
  await m.unmount();
});

Deno.test('Dialog manages focus, Escape, Tab trap and scroll lock', testOpts, async () => {
  const opener = document.createElement('button');
  document.body.appendChild(opener);
  opener.focus();
  const changes: boolean[] = [];
  const view = (open: boolean) =>
    h(
      Dialog,
      { open, 'aria-label': 'Settings', onOpenChange: (v: boolean) => changes.push(v) },
      h('input', { id: 'first' }),
      h('button', { id: 'last' }, 'Save'),
    );
  const m = await mount(view(true));
  await flush();
  const dialog = document.querySelector('[role="dialog"]')!;
  assertEquals(document.activeElement?.id, 'first');
  assertEquals(document.body.style.overflow, 'hidden');

  // Tab from the last focusable (the close button) wraps to the first.
  const closeBtn = dialog.querySelector<HTMLElement>('button[aria-label="Close"]')!;
  closeBtn.focus();
  await key(closeBtn, 'Tab');
  assertEquals(document.activeElement?.id, 'first');

  await key(document.activeElement!, 'Escape');
  assertEquals(changes, [false]);

  await m.rerender(view(false));
  await flush();
  assertEquals(document.querySelector('[role="dialog"]'), null);
  assertEquals(document.body.style.overflow, '');
  assertEquals(document.activeElement, opener);
  await m.unmount();
  opener.remove();
});

Deno.test('Tabs: arrow keys move and activate, root reports value', testOpts, async () => {
  let value = 'a';
  const view = () =>
    h(
      Tabs,
      { value, onValueChange: (v: string) => (value = v) },
      h(
        TabsList,
        null,
        h(TabsTrigger, { value: 'a', active: value === 'a' }, 'A'),
        h(TabsTrigger, { value: 'b', active: value === 'b' }, 'B'),
      ),
    );
  const m = await mount(view());
  const tabs = m.container.querySelectorAll<HTMLElement>('[role="tab"]');
  assertEquals(tabs[0].getAttribute('data-state'), 'active');
  assertEquals(tabs[1].tabIndex, -1);
  tabs[0].focus();
  await key(tabs[0], 'ArrowRight');
  assertEquals(document.activeElement, tabs[1]);
  assertEquals(value, 'b');
  await m.unmount();
});

Deno.test('RadioGroup: roving tab stop, arrows select, root reports value', testOpts, async () => {
  let value = '';
  const view = () =>
    h(
      RadioGroup,
      { value, name: 'plan', 'aria-label': 'Plan', onValueChange: (v: string) => (value = v) },
      h(RadioGroupItem, { value: 'free', checked: value === 'free', 'aria-label': 'Free' }),
      h(RadioGroupItem, { value: 'pro', checked: value === 'pro', 'aria-label': 'Pro' }),
    );
  const m = await mount(view());
  const radios = m.container.querySelectorAll<HTMLElement>('[role="radio"]');
  // Nothing checked: the first enabled radio is the tab stop.
  assertEquals([radios[0].tabIndex, radios[1].tabIndex], [0, -1]);
  radios[0].focus();
  await key(radios[0], 'ArrowDown');
  assertEquals(value, 'pro');
  await m.rerender(view());
  await flush();
  assertEquals([radios[0].tabIndex, radios[1].tabIndex], [-1, 0]);
  assertEquals(m.container.querySelector<HTMLInputElement>('input[name="plan"]')!.value, 'pro');
  await m.unmount();
});

Deno.test('ToggleGroup multiple computes the next array', testOpts, async () => {
  let value: string[] = ['b'];
  const view = () =>
    h(
      ToggleGroup,
      { type: 'multiple', value, onValueChange: (v: string[]) => (value = v) },
      h(ToggleGroupItem, { value: 'b', pressed: value.includes('b') }, 'Bold'),
      h(ToggleGroupItem, { value: 'i', pressed: value.includes('i') }, 'Italic'),
    );
  const m = await mount(view());
  const [bold, italic] = m.container.querySelectorAll('button');
  await click(italic);
  assertEquals(value, ['b', 'i']);
  await m.rerender(view());
  assertEquals(italic.getAttribute('aria-pressed'), 'true');
  await click(bold);
  assertEquals(value, ['i']);
  await m.unmount();
});

Deno.test(
  'DropdownMenu: ArrowDown opens on first item, select closes, Escape restores focus',
  testOpts,
  async () => {
    let picked = 0;
    const m = await mount(
      h(
        DropdownMenu,
        { trigger: 'Actions' },
        h(DropdownMenuItem, { onSelect: () => picked++ }, 'Edit'),
        h(DropdownMenuItem, { disabled: true }, 'Archive'),
        h(DropdownMenuItem, null, 'Delete'),
      ),
    );
    const trigger = m.container.querySelector<HTMLElement>('button')!;
    trigger.focus();
    await key(trigger, 'ArrowDown');
    await flush();
    const items = m.container.querySelectorAll<HTMLElement>('[role="menuitem"]');
    assertEquals(document.activeElement, items[0]);
    // Disabled items are skipped.
    await key(items[0], 'ArrowDown');
    assertEquals(document.activeElement, items[2]);
    await key(items[2], 'Escape');
    assertEquals(m.container.querySelector('[role="menu"]'), null);
    assertEquals(document.activeElement, trigger);

    await click(trigger);
    await flush();
    await key(m.container.querySelector('[role="menuitem"]')!, 'Enter');
    assertEquals(picked, 1);
    assertEquals(m.container.querySelector('[role="menu"]'), null);
    await m.unmount();
  },
);

Deno.test('Popover closes on outside click via its backdrop', testOpts, async () => {
  const m = await mount(h(Popover, { trigger: 'Open', defaultOpen: true }, h('p', null, 'Body')));
  assert(m.container.querySelector('[role="dialog"]'));
  await click(m.container.querySelector('.fixed.inset-0')!);
  assertEquals(m.container.querySelector('[role="dialog"]'), null);
  await m.unmount();
});

Deno.test('Tooltip shows on focus, hides on Escape, ids are unique', testOpts, async () => {
  const m = await mount(
    h(
      'div',
      null,
      h(Tooltip, { content: 'First' }, h('button', { id: 't1' }, '1')),
      h(Tooltip, { content: 'Second' }, h('button', { id: 't2' }, '2')),
    ),
  );
  const b1 = m.container.querySelector<HTMLElement>('#t1')!;
  const b2 = m.container.querySelector<HTMLElement>('#t2')!;
  await act(async () => b1.focus());
  const tip1 = m.container.querySelector('[role="tooltip"]')!;
  assertEquals(tip1.textContent, 'First');
  await key(b1, 'Escape');
  assertEquals(m.container.querySelector('[role="tooltip"]'), null);
  await act(async () => b2.focus());
  const tip2 = m.container.querySelector('[role="tooltip"]')!;
  assert(tip1.id !== tip2.id);
  assertEquals(b2.parentElement!.getAttribute('aria-describedby'), tip2.id);
  await m.unmount();
});

Deno.test('Toast auto-dismisses after duration', testOpts, async () => {
  let closed = 0;
  const m = await mount(h(Toast, { title: 'Saved', duration: 20, onClose: () => closed++ }));
  assertEquals(m.container.querySelector('[role="status"]')!.textContent!.includes('Saved'), true);
  await flush(40);
  assertEquals(closed, 1);
  await m.unmount();
});

Deno.test('InputOTP strips non-digits and completes once', testOpts, async () => {
  const done: string[] = [];
  const m = await mount(h(InputOTP, { length: 4, onComplete: (v: string) => done.push(v) }));
  const input = m.container.querySelector('input')!;
  const type = async (v: string) => {
    await act(async () => {
      input.value = v;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  };
  await type('1a2b');
  assertEquals(input.value, '12');
  await type('1234');
  await type('12345');
  assertEquals(input.value, '1234');
  assertEquals(done, ['1234']);
  await m.unmount();
});

Deno.test('Select renders its placeholder option', testOpts, async () => {
  const m = await mount(h(Select, { placeholder: 'Pick one' }, h('option', { value: 'x' }, 'X')));
  const select = m.container.querySelector('select')!;
  assertEquals(select.options[0].textContent, 'Pick one');
  assertEquals(select.options[0].value, '');
  await m.unmount();
});

Deno.test('Command: arrows report highlight, Enter selects it', testOpts, async () => {
  let highlighted = 'a';
  let selected = '';
  const view = () =>
    h(
      Command,
      { onHighlightChange: (v: string) => (highlighted = v) },
      h(CommandItem, {
        value: 'a',
        selected: highlighted === 'a',
        onSelect: (v: string) => (selected = v),
      }, 'A'),
      h(CommandItem, {
        value: 'b',
        selected: highlighted === 'b',
        onSelect: (v: string) => (selected = v),
      }, 'B'),
    );
  const m = await mount(view());
  const root = m.container.firstElementChild!;
  await key(root, 'ArrowDown');
  assertEquals(highlighted, 'b');
  await m.rerender(view());
  await key(root, 'Enter');
  assertEquals(selected, 'b');
  await m.unmount();
});

Deno.test('PaginationLink disabled has no href and ignores clicks', testOpts, async () => {
  let clicks = 0;
  const m = await mount(
    h(PaginationLink, { href: '?page=2', disabled: true, onClick: () => clicks++ }, '2'),
  );
  const a = m.container.querySelector('a')!;
  assertEquals(a.getAttribute('href'), null);
  assertEquals(a.tabIndex, -1);
  await click(a);
  assertEquals(clicks, 0);
  await m.unmount();
});

Deno.test('Accordion single + collapsible reports open item', testOpts, async () => {
  let value = 'one';
  const view = () =>
    h(
      Accordion,
      { value, onValueChange: (v: string) => (value = v) },
      h(AccordionTrigger, { value: 'one', open: value === 'one' }, 'One'),
      h(AccordionTrigger, { value: 'two', open: value === 'two' }, 'Two'),
    );
  const m = await mount(view());
  const [one, two] = m.container.querySelectorAll('button');
  assertEquals(one.closest('h3') !== null, true);
  await click(two);
  assertEquals(value, 'two');
  await m.rerender(view());
  await click(two);
  assertEquals(value, '');
  await m.unmount();
});
