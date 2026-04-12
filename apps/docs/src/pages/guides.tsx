import React, { useState } from 'react';
import { Callout, CodeBlock, DocCard, PageHeader, Tabs } from '../components/ui.tsx';

type GuideId = 'accessibility' | 'design-sync' | 'frameworks' | 'contributing';

const guides: Record<GuideId, { title: string; description: string }> = {
  accessibility: {
    title: 'Accessibility',
    description: 'Learn how Adhar UI implements WCAG 2.1 AA standards across all components.',
  },
  'design-sync': {
    title: 'Design Sync',
    description: 'Bidirectional synchronization between code and design tools using W3C DTCG.',
  },
  frameworks: {
    title: 'Multi-Framework',
    description: 'How Adhar UI compiles to React, Vue, Solid, Svelte, and Angular.',
  },
  contributing: {
    title: 'Contributing',
    description: 'Guidelines for contributing components, features, and documentation.',
  },
};

function AccessibilityGuide() {
  return (
    <div className='space-y-8'>
      <Callout type='info'>
        Adhar UI is designed to meet WCAG 2.1 Level AA. Every component includes proper ARIA
        attributes, keyboard navigation, focus management, and screen reader support out of the box.
      </Callout>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>
          Built-in Accessibility Primitives
        </h2>
        <p className='text-muted-foreground mb-4'>
          The{' '}
          <code className='text-xs px-1.5 py-0.5 rounded bg-muted font-mono'>@adhar-ui/a11y</code>
          {' '}
          package provides low-level accessibility utilities used internally by all components:
        </p>
        <div className='grid sm:grid-cols-2 gap-3'>
          {[
            {
              name: 'Focus Trap',
              desc: 'Traps focus within modal dialogs, preventing tab to background content.',
            },
            {
              name: 'Roving Tabindex',
              desc: 'Manages keyboard navigation within composite widgets (tabs, menus, toolbars).',
            },
            {
              name: 'Live Region',
              desc: 'Announces dynamic content changes to screen readers via aria-live regions.',
            },
            {
              name: 'Focus Visible',
              desc: 'Shows focus indicators only for keyboard navigation, not mouse clicks.',
            },
          ].map((a) => (
            <div key={a.name} className='p-4 rounded-lg border border-border bg-card'>
              <h3 className='font-semibold text-foreground text-sm mb-1'>{a.name}</h3>
              <p className='text-xs text-muted-foreground'>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Keyboard Navigation</h2>
        <p className='text-muted-foreground mb-4'>
          Every interactive component supports full keyboard operation:
        </p>
        <div className='rounded-lg border border-border overflow-hidden'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-border bg-muted/30'>
                <th className='text-left px-4 py-2 font-medium text-foreground'>Component</th>
                <th className='text-left px-4 py-2 font-medium text-foreground'>Keys</th>
              </tr>
            </thead>
            <tbody>
              {[
                { comp: 'Button', keys: 'Enter, Space — activate' },
                { comp: 'Dialog', keys: 'Escape — close; Tab — cycle focus' },
                { comp: 'Tabs', keys: 'Arrow Left/Right — switch tabs; Home/End — first/last' },
                { comp: 'Menu', keys: 'Arrow Up/Down — navigate; Enter — select; Escape — close' },
                {
                  comp: 'Select',
                  keys: 'Arrow Up/Down — navigate; Enter — select; Type to search',
                },
                { comp: 'Accordion', keys: 'Enter/Space — toggle; Arrow Up/Down — navigate' },
                { comp: 'Slider', keys: 'Arrow Left/Right — adjust; Home/End — min/max' },
              ].map((row) => (
                <tr key={row.comp} className='border-b border-border last:border-0'>
                  <td className='px-4 py-2 font-medium text-foreground'>{row.comp}</td>
                  <td className='px-4 py-2 text-muted-foreground'>{row.keys}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Color Contrast</h2>
        <p className='text-muted-foreground mb-4'>
          All theme presets are designed to meet WCAG AA minimum contrast ratios:
        </p>
        <ul className='list-disc pl-6 space-y-2 text-sm text-muted-foreground'>
          <li>
            <strong className='text-foreground'>Normal text:</strong> Minimum 4.5:1 contrast ratio
          </li>
          <li>
            <strong className='text-foreground'>Large text:</strong> Minimum 3:1 contrast ratio
          </li>
          <li>
            <strong className='text-foreground'>UI components:</strong>{' '}
            Minimum 3:1 contrast ratio against adjacent colors
          </li>
          <li>
            <strong className='text-foreground'>Focus indicators:</strong> Visible and high-contrast
          </li>
        </ul>
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Testing</h2>
        <p className='text-muted-foreground mb-4'>
          We recommend these tools for accessibility testing:
        </p>
        <CodeBlock
          code={`# Automated testing with axe-core\nnpm install -D @axe-core/react\n\n# In your test setup:\nimport { axe, toHaveNoViolations } from 'jest-axe'\nexpect.extend(toHaveNoViolations)\n\nit('should have no a11y violations', async () => {\n  const { container } = render(<Button>Click me</Button>)\n  const results = await axe(container)\n  expect(results).toHaveNoViolations()\n})`}
          language='tsx'
        />
      </div>
    </div>
  );
}

function DesignSyncGuide() {
  return (
    <div className='space-y-8'>
      <Callout type='info'>
        Adhar UI supports bidirectional design-code sync using the W3C Design Token Community Group
        (DTCG) standard. Changes in Figma or Penpot flow to code, and vice versa.
      </Callout>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>How It Works</h2>
        <div className='grid sm:grid-cols-3 gap-3 mb-4'>
          {[
            { step: '1', title: 'Define', desc: 'Design tokens defined in W3C DTCG JSON format' },
            {
              step: '2',
              title: 'Sync',
              desc: 'CLI pulls/pushes tokens between code and design tools',
            },
            {
              step: '3',
              title: 'Generate',
              desc: 'Tokens generate CSS variables, Tailwind config, and design tool styles',
            },
          ].map((s) => (
            <div key={s.step} className='p-4 rounded-lg border border-border bg-card text-center'>
              <div className='w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mx-auto mb-2'>
                {s.step}
              </div>
              <h3 className='font-semibold text-foreground text-sm'>{s.title}</h3>
              <p className='text-xs text-muted-foreground mt-1'>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Token Format (W3C DTCG)</h2>
        <CodeBlock
          code={`{\n  "color": {\n    "primary": {\n      "$value": "#2563EB",\n      "$type": "color",\n      "$description": "Primary brand color"\n    },\n    "background": {\n      "$value": "#FFFFFF",\n      "$type": "color",\n      "$description": "Page background"\n    }\n  },\n  "spacing": {\n    "sm": {\n      "$value": "0.5rem",\n      "$type": "dimension"\n    },\n    "md": {\n      "$value": "1rem",\n      "$type": "dimension"\n    }\n  },\n  "borderRadius": {\n    "default": {\n      "$value": "0.5rem",\n      "$type": "dimension"\n    }\n  }\n}`}
          language='json'
        />
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Supported Design Tools</h2>
        <div className='grid sm:grid-cols-2 gap-3'>
          <div className='p-4 rounded-lg border border-border bg-card'>
            <h3 className='font-semibold text-foreground mb-1'>Figma</h3>
            <p className='text-sm text-muted-foreground mb-3'>
              Sync via the Adhar UI Figma plugin. Imports/exports design tokens and component
              styles.
            </p>
            <Tabs variant='pills' tabs={[
              { label: 'npm', content: <CodeBlock code='npx @adhar-ui/cli design-sync --pull' language='bash' /> },
              { label: 'yarn', content: <CodeBlock code='yarn dlx @adhar-ui/cli design-sync --pull' language='bash' /> },
              { label: 'pnpm', content: <CodeBlock code='pnpm dlx @adhar-ui/cli design-sync --pull' language='bash' /> },
              { label: 'bun', content: <CodeBlock code='bunx @adhar-ui/cli design-sync --pull' language='bash' /> },
              { label: 'deno', content: <CodeBlock code='deno run -A jsr:@adhar-ui/cli design-sync --pull' language='bash' /> },
            ]} />
          </div>
          <div className='p-4 rounded-lg border border-border bg-card'>
            <h3 className='font-semibold text-foreground mb-1'>Penpot</h3>
            <p className='text-sm text-muted-foreground mb-3'>
              Sync via the Adhar UI Penpot plugin. Open-source design tool integration.
            </p>
            <Tabs variant='pills' tabs={[
              { label: 'npm', content: <CodeBlock code='npx @adhar-ui/cli design-sync --push' language='bash' /> },
              { label: 'yarn', content: <CodeBlock code='yarn dlx @adhar-ui/cli design-sync --push' language='bash' /> },
              { label: 'pnpm', content: <CodeBlock code='pnpm dlx @adhar-ui/cli design-sync --push' language='bash' /> },
              { label: 'bun', content: <CodeBlock code='bunx @adhar-ui/cli design-sync --push' language='bash' /> },
              { label: 'deno', content: <CodeBlock code='deno run -A jsr:@adhar-ui/cli design-sync --push' language='bash' /> },
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FrameworksGuide() {
  return (
    <div className='space-y-8'>
      <Callout type='info'>
        Adhar UI components are authored once in Mitosis, then compiled to native code for React,
        Vue, Solid, Svelte, and Angular. No runtime wrappers or adapters — each output is idiomatic
        to its framework.
      </Callout>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Architecture</h2>
        <div className='p-4 rounded-lg border border-border bg-card'>
          <CodeBlock
            code={`                    ┌─────────────┐\n                    │   Mitosis   │  ← Author once\n                    │  (Source)   │\n                    └──────┬──────┘\n         ┌─────────┬───────┼───────┬──────────┐\n         ▼         ▼       ▼       ▼          ▼\n     ┌───────┐ ┌──────┐ ┌──────┐ ┌───────┐ ┌────────┐\n     │ React │ │ Vue  │ │Solid │ │Svelte │ │Angular │\n     └───────┘ └──────┘ └──────┘ └───────┘ └────────┘\n         Native output for each framework`}
            language='text'
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Mitosis Component Example</h2>
        <CodeBlock
          code={`// packages/primitives/src/button.lite.tsx\nimport { useMetadata, useDefaultProps } from '@builder.io/mitosis';\n\nuseMetadata({ isAttachedToShadowDom: false });\n\nexport default function Button(props) {\n  useDefaultProps({\n    variant: 'default',\n    size: 'default',\n  });\n\n  return (\n    <button\n      class={getButtonClasses(props.variant, props.size)}\n      onClick={props.onClick}\n    >\n      {props.children}\n    </button>\n  );\n}`}
          language='tsx'
        />
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Framework-Specific Usage</h2>
        <div className='space-y-4'>
          {[
            {
              fw: 'React',
              code:
                `import { Button } from '@/components/ui/button'\n\nexport function App() {\n  return <Button variant="default" onClick={() => alert('hi')}>Click me</Button>\n}`,
            },
            {
              fw: 'Vue',
              code:
                `<template>\n  <Button variant="default" @click="handleClick">Click me</Button>\n</template>\n\n<script setup>\nimport { Button } from '@/components/ui/button'\n\nconst handleClick = () => alert('hi')\n</script>`,
            },
            {
              fw: 'Solid',
              code:
                `import { Button } from '@/components/ui/button'\n\nexport function App() {\n  return <Button variant="default" onClick={() => alert('hi')}>Click me</Button>\n}`,
            },
            {
              fw: 'Svelte',
              code:
                `<script>\n  import { Button } from '$lib/components/ui/button'\n</script>\n\n<Button variant="default" on:click={() => alert('hi')}>Click me</Button>`,
            },
          ].map((item) => (
            <div key={item.fw}>
              <h3 className='text-sm font-medium text-foreground mb-2'>{item.fw}</h3>
              <CodeBlock
                code={item.code}
                language={item.fw === 'Vue' || item.fw === 'Svelte' ? 'html' : 'tsx'}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Styling</h2>
        <p className='text-muted-foreground mb-4'>
          All framework outputs use the same Tailwind CSS classes and CSS variables. This means:
        </p>
        <ul className='list-disc pl-6 space-y-2 text-sm text-muted-foreground'>
          <li>Identical visual output across all frameworks</li>
          <li>Shared theme system (change once, applies everywhere)</li>
          <li>CVA (Class Variance Authority) handles variant computation</li>
          <li>No framework-specific styling quirks</li>
        </ul>
      </div>
    </div>
  );
}

function ContributingGuide() {
  return (
    <div className='space-y-8'>
      <Callout type='info'>
        Adhar UI is open source and welcomes contributions. Components, documentation, bug fixes,
        and design improvements are all appreciated.
      </Callout>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Development Setup</h2>
        <CodeBlock
          code={`# Clone the repository\ngit clone https://github.com/nicober1/adhar-ui.git\ncd adhar-ui\n\n# Install dependencies (Deno workspace)\ndeno install\n\n# Start development server\ndeno task docs:dev\n\n# Start playground\ndeno task playground:dev`}
          language='bash'
        />
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Project Structure</h2>
        <CodeBlock
          code={`adhar-ui/\n├── apps/\n│   ├── docs/          # Documentation site (this!)\n│   ├── playground/    # Component playground\n│   └── storybook/     # Storybook stories\n├── packages/\n│   ├── a11y/          # Accessibility utilities\n│   ├── cli/           # CLI tool\n│   ├── design-sync/   # Design tool sync\n│   ├── dtcg/          # DTCG token processor\n│   ├── icons/         # Icon library\n│   ├── primitives/    # Mitosis source components\n│   ├── react/         # React compiled output\n│   ├── vue/           # Vue compiled output\n│   ├── solid/         # Solid compiled output\n│   ├── svelte/        # Svelte compiled output\n│   ├── angular/       # Angular compiled output\n│   ├── registry/      # Component registry\n│   ├── tailwind-preset/ # Tailwind preset\n│   ├── tokens/        # Design tokens\n│   └── utils/         # Shared utilities\n├── deno.json          # Workspace root\n└── turbo.json         # Build orchestration`}
          language='text'
        />
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Adding a Component</h2>
        <ol className='list-decimal pl-6 space-y-3 text-sm text-muted-foreground'>
          <li>
            Create the Mitosis source in{' '}
            <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>
              packages/primitives/src/
            </code>
          </li>
          <li>Add style variants using CVA in the component file</li>
          <li>
            Register the component in{' '}
            <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>
              packages/registry/
            </code>
          </li>
          <li>
            Add a Storybook story in{' '}
            <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>
              apps/storybook/stories/
            </code>
          </li>
          <li>Add documentation in the docs app</li>
          <li>
            Run{' '}
            <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>deno task build</code>
            {' '}
            to compile all framework outputs
          </li>
          <li>Submit a pull request</li>
        </ol>
      </div>

      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Guidelines</h2>
        <ul className='list-disc pl-6 space-y-2 text-sm text-muted-foreground'>
          <li>
            <strong className='text-foreground'>Accessibility:</strong>{' '}
            Every component must be WAI-ARIA compliant
          </li>
          <li>
            <strong className='text-foreground'>Styling:</strong>{' '}
            Use Tailwind CSS with CSS variables; no hard-coded colors
          </li>
          <li>
            <strong className='text-foreground'>TypeScript:</strong> Full type annotations required
          </li>
          <li>
            <strong className='text-foreground'>Testing:</strong>{' '}
            Include unit tests for all interactive behavior
          </li>
          <li>
            <strong className='text-foreground'>Documentation:</strong>{' '}
            Add examples, props table, and installation instructions
          </li>
        </ul>
      </div>
    </div>
  );
}

export function GuidesPage({
  guideId,
  navigate,
}: {
  guideId?: GuideId;
  navigate: (path: string) => void;
}) {
  if (!guideId) {
    return (
      <div className='space-y-8'>
        <PageHeader
          title='Guides'
          description='In-depth guides covering accessibility, design sync, multi-framework development, and contributing to Adhar UI.'
        />
        <div className='grid sm:grid-cols-2 gap-4'>
          {(Object.entries(guides) as [GuideId, typeof guides[GuideId]][]).map(([id, guide]) => (
            <DocCard
              key={id}
              title={guide.title}
              description={guide.description}
              onClick={() => navigate(`/guides/${id}`)}
            />
          ))}
        </div>
      </div>
    );
  }

  const guide = guides[guideId];
  if (!guide) {
    return (
      <div className='py-16 text-center'>
        <p className='text-muted-foreground'>Guide not found</p>
        <button
          onClick={() => navigate('/guides')}
          className='text-primary hover:underline text-sm mt-2'
        >
          ← Back to Guides
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <nav className='flex items-center gap-2 text-sm text-muted-foreground'>
        <button
          onClick={() => navigate('/guides')}
          className='hover:text-foreground transition-colors'
        >
          Guides
        </button>
        <span>/</span>
        <span className='text-foreground font-medium'>{guide.title}</span>
      </nav>

      <PageHeader title={guide.title} description={guide.description} />

      {guideId === 'accessibility' && <AccessibilityGuide />}
      {guideId === 'design-sync' && <DesignSyncGuide />}
      {guideId === 'frameworks' && <FrameworksGuide />}
      {guideId === 'contributing' && <ContributingGuide />}
    </div>
  );
}
