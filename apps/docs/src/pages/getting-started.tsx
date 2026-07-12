import React from 'react';
import { Badge, Callout, CodeBlock, PageHeader, Step, Steps, Tabs } from '../components/ui.tsx';

export function GettingStartedPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className='space-y-10'>
      <PageHeader
        title='Getting Started'
        description='Set up Adhar UI in your project in under 5 minutes. This guide walks you through installation, configuration, and your first component.'
      />

      {/* What is Adhar UI */}
      <section>
        <h2 className='text-lg font-semibold text-foreground mb-3'>What is Adhar UI?</h2>
        <p className='text-sm text-muted-foreground leading-relaxed mb-4'>
          Adhar UI is an open-source design system with a <strong className='text-foreground'>complete primitive library</strong> and a growing collection of{' '}
          <strong className='text-foreground'>pre-composed page blocks</strong>. Unlike traditional component libraries that install as npm packages,
          Adhar UI copies component source code directly into your project. This means you own every line —
          read it, modify it, extend it, delete what you don't need.
        </p>
        <div className='grid sm:grid-cols-3 gap-3'>
          {[
            { title: 'Copy-Paste Model', desc: 'Components are added as source files you own. No dependency lock-in, no version conflicts.' },
            { title: '5 Frameworks', desc: 'React, Vue, SolidJS, Svelte, Angular — same API, native output for each framework.' },
            { title: 'Tailwind CSS v4', desc: 'Built on CSS custom properties with HSL colors. Supports alpha compositing and class-based dark mode.' },
          ].map((item) => (
            <div key={item.title} className='p-4 rounded-lg border border-border bg-card'>
              <h3 className='text-sm font-semibold text-foreground mb-1'>{item.title}</h3>
              <p className='text-xs text-muted-foreground leading-relaxed'>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Callout type='info'>
        Adhar UI follows the same model as{' '}
        <a href='https://ui.shadcn.com' target='_blank' rel='noopener' className='text-primary hover:underline font-medium'>shadcn/ui</a>
        . If you've used shadcn, you already know the workflow. Adhar UI extends it with enterprise components,
        AI components, design tool sync, and multi-framework support.
      </Callout>

      {/* Prerequisites */}
      <section>
        <h2 className='text-lg font-semibold text-foreground mb-3'>Prerequisites</h2>
        <p className='text-sm text-muted-foreground mb-4'>
          Before installing Adhar UI, make sure you have:
        </p>
        <div className='grid sm:grid-cols-2 gap-3 mb-4'>
          <div className='p-4 rounded-lg border border-border bg-card'>
            <h3 className='text-sm font-semibold text-foreground mb-2'>Runtime</h3>
            <p className='text-xs text-muted-foreground mb-3'>Any one of these JavaScript runtimes:</p>
            <div className='space-y-1.5'>
              {[
                { name: 'Node.js', version: '18+', note: 'Most common — works with npm, yarn, pnpm' },
                { name: 'Bun', version: '1.0+', note: 'Fast alternative runtime' },
                { name: 'Deno', version: '2.0+', note: 'Secure runtime with TypeScript built-in' },
              ].map((rt) => (
                <div key={rt.name} className='flex items-center gap-2 text-xs'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0' />
                  <span className='font-medium text-foreground'>{rt.name} {rt.version}</span>
                  <span className='text-muted-foreground/60'>— {rt.note}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='p-4 rounded-lg border border-border bg-card'>
            <h3 className='text-sm font-semibold text-foreground mb-2'>Framework Project</h3>
            <p className='text-xs text-muted-foreground mb-3'>An existing project using one of these:</p>
            <div className='space-y-1.5'>
              {[
                { name: 'React', frameworks: 'Next.js, Remix, Vite, Astro' },
                { name: 'Vue', frameworks: 'Nuxt, Vite' },
                { name: 'SolidJS', frameworks: 'SolidStart, Vite' },
                { name: 'Svelte', frameworks: 'SvelteKit, Vite' },
                { name: 'Angular', frameworks: 'Angular CLI' },
              ].map((fw) => (
                <div key={fw.name} className='flex items-center gap-2 text-xs'>
                  <span className='w-1.5 h-1.5 rounded-full bg-primary shrink-0' />
                  <span className='font-medium text-foreground'>{fw.name}</span>
                  <span className='text-muted-foreground/60'>— {fw.frameworks}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Callout type='tip'>
          Don't have a project yet? Create one with{' '}
          <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>npx create-next-app@latest</code>,{' '}
          <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>npm create vite@latest</code>, or your framework's starter template.
          Make sure Tailwind CSS v4 is configured.
        </Callout>
      </section>

      {/* Installation Steps */}
      <section>
        <h2 className='text-lg font-semibold text-foreground mb-4'>Installation</h2>
        <Steps>
          <Step number={1} title='Initialize Adhar UI'>
            <p className='text-sm text-muted-foreground mb-4'>
              Run the init command in your project root. The CLI will auto-detect your framework, package manager, and meta-framework,
              then create the necessary configuration files.
            </p>
            <Tabs variant='pills' tabs={[
              { label: 'npm', content: <CodeBlock code='npx @adhar-ui/cli init' language='bash' /> },
              { label: 'yarn', content: <CodeBlock code='yarn dlx @adhar-ui/cli init' language='bash' /> },
              { label: 'pnpm', content: <CodeBlock code='pnpm dlx @adhar-ui/cli init' language='bash' /> },
              { label: 'bun', content: <CodeBlock code='bunx @adhar-ui/cli init' language='bash' /> },
              { label: 'deno', content: <CodeBlock code='deno run -A jsr:@adhar-ui/cli init' language='bash' /> },
            ]} />
            <div className='mt-4 p-4 rounded-lg border border-border bg-muted/20'>
              <p className='text-xs font-semibold text-foreground mb-2'>The init wizard will:</p>
              <ol className='list-decimal pl-5 space-y-1.5 text-xs text-muted-foreground'>
                <li>Detect your framework (React, Vue, Solid, Svelte, or Angular) and meta-framework (Next.js, Nuxt, etc.)</li>
                <li>Ask for your component output directory (default: <code className='px-1 py-0.5 rounded bg-muted font-mono'>src/components/ui</code>)</li>
                <li>Ask for your CSS file path (default: <code className='px-1 py-0.5 rounded bg-muted font-mono'>src/globals.css</code>)</li>
                <li>Let you choose a theme preset (zinc, slate, blue, green, violet, rose, orange, or teal)</li>
                <li>Create <code className='px-1 py-0.5 rounded bg-muted font-mono'>adhar-ui.json</code> configuration file</li>
                <li>Generate <code className='px-1 py-0.5 rounded bg-muted font-mono'>src/lib/utils.ts</code> with the <code className='px-1 py-0.5 rounded bg-muted font-mono'>cn()</code> class merging utility</li>
                <li>Add CSS variables for your chosen theme to your globals.css</li>
                <li>Install required dependencies: <code className='px-1 py-0.5 rounded bg-muted font-mono'>clsx</code>, <code className='px-1 py-0.5 rounded bg-muted font-mono'>tailwind-merge</code>, <code className='px-1 py-0.5 rounded bg-muted font-mono'>class-variance-authority</code></li>
              </ol>
            </div>
          </Step>

          <Step number={2} title='Add Components'>
            <p className='text-sm text-muted-foreground mb-4'>
              Add the components you need. Each component is installed as source code in your project — not as a package dependency.
              Dependencies between components resolve automatically.
            </p>
            <Tabs variant='pills' tabs={[
              { label: 'npm', content: <CodeBlock code={'# Add a single component\nnpx @adhar-ui/cli add button\n\n# Add multiple components\nnpx @adhar-ui/cli add button card dialog input badge'} language='bash' /> },
              { label: 'yarn', content: <CodeBlock code={'# Add a single component\nyarn dlx @adhar-ui/cli add button\n\n# Add multiple components\nyarn dlx @adhar-ui/cli add button card dialog input badge'} language='bash' /> },
              { label: 'pnpm', content: <CodeBlock code={'# Add a single component\npnpm dlx @adhar-ui/cli add button\n\n# Add multiple components\npnpm dlx @adhar-ui/cli add button card dialog input badge'} language='bash' /> },
              { label: 'bun', content: <CodeBlock code={'# Add a single component\nbunx @adhar-ui/cli add button\n\n# Add multiple components\nbunx @adhar-ui/cli add button card dialog input badge'} language='bash' /> },
              { label: 'deno', content: <CodeBlock code={'# Add a single component\ndeno run -A jsr:@adhar-ui/cli add button\n\n# Add multiple components\ndeno run -A jsr:@adhar-ui/cli add button card dialog input badge'} language='bash' /> },
            ]} />
            <Callout type='tip' className='mt-4'>
              Dependencies resolve automatically. Adding <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>dialog</code> will
              also install <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>button</code> if it's not already present.
              Use <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>--all</code> to add every component at once.
            </Callout>
          </Step>

          <Step number={3} title='Use in Your Code'>
            <p className='text-sm text-muted-foreground mb-4'>
              Import components from your output directory and use them like any other React/Vue/Solid component.
              Every component supports the <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>className</code> prop
              for additional styling via Tailwind classes.
            </p>
            <CodeBlock
              code={`import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Welcome back
          <Badge variant="secondary">Pro</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-3">
        <Button>View Projects</Button>
        <Button variant="outline">Settings</Button>
        <Button variant="ghost" size="icon">
          <BellIcon />
        </Button>
      </CardContent>
    </Card>
  )
}`}
              language='tsx'
              showLineNumbers
            />
          </Step>

          <Step number={4} title='Customize'>
            <p className='text-sm text-muted-foreground mb-4'>
              Since the component source code lives in your project, you can customize anything. Edit CVA variants to add
              new button styles, change spacing, modify animations — the code is yours.
            </p>
            <CodeBlock
              code={`// src/components/ui/button.tsx — YOUR file, edit freely

const buttonVariants = cva("inline-flex items-center ...", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      // Add your own variant:
      brand: "bg-indigo-600 text-white hover:bg-indigo-700",
      gradient: "bg-gradient-to-r from-violet-500 to-pink-500 text-white",
    },
    size: {
      default: "h-10 px-4",
      // Add your own size:
      xl: "h-14 rounded-lg px-12 text-lg",
    },
  },
})`}
              language='tsx'
              showLineNumbers
            />
            <p className='text-sm text-muted-foreground mt-3'>
              Use <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>npx @adhar-ui/cli diff</code> to compare your
              modified components against the latest upstream versions when you want to pull in updates.
            </p>
          </Step>
        </Steps>
      </section>

      {/* Project Structure */}
      <section>
        <h2 className='text-lg font-semibold text-foreground mb-3'>Project Structure</h2>
        <p className='text-sm text-muted-foreground mb-4'>
          After initialization and adding a few components, your project will look like this:
        </p>
        <CodeBlock
          code={`your-project/
├── src/
│   ├── components/
│   │   └── ui/                # Adhar UI components (source code)
│   │       ├── button.tsx     # Button with CVA variants
│   │       ├── card.tsx       # Card, CardHeader, CardContent, CardFooter
│   │       ├── dialog.tsx     # Dialog with overlay and animations
│   │       ├── input.tsx      # Input with size/variant props
│   │       ├── badge.tsx      # Badge with semantic variants
│   │       └── ...            # More components as you add them
│   ├── lib/
│   │   └── utils.ts           # cn() — Tailwind class merging utility
│   └── globals.css            # Theme CSS variables (light + dark mode)
├── adhar-ui.json              # Adhar UI configuration
├── tailwind.config.ts
└── package.json`}
          language='text'
        />
      </section>

      {/* Configuration */}
      <section>
        <h2 className='text-lg font-semibold text-foreground mb-3'>Configuration</h2>
        <p className='text-sm text-muted-foreground mb-4'>
          The <code className='text-xs px-1.5 py-0.5 rounded bg-muted font-mono'>adhar-ui.json</code> file controls how the CLI adds components
          to your project. It's created automatically during init, but you can edit it manually.
        </p>
        <CodeBlock
          code={`{
  "$schema": "https://adhar-ui.dev/schema.json",
  "framework": "react",        // react | vue | solid | svelte | angular
  "typescript": true,
  "tailwind": {
    "css": "src/globals.css",   // Path to your CSS file
    "baseColor": "zinc",        // Theme preset
    "cssVariables": true        // Use CSS variables for colors
  },
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",    // Where components are installed
    "utils": "@/lib/utils"      // Path to cn() utility
  }
}`}
          language='json'
          showLineNumbers
        />
      </section>

      {/* How Theming Works */}
      <section>
        <h2 className='text-lg font-semibold text-foreground mb-3'>How Theming Works</h2>
        <p className='text-sm text-muted-foreground mb-4'>
          Adhar UI uses CSS custom properties with HSL color values. This approach enables Tailwind's
          alpha modifier syntax (<code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>bg-primary/50</code>) and
          runtime theme switching. There are <strong className='text-foreground'>8 built-in presets</strong>:
        </p>
        <div className='grid grid-cols-4 sm:grid-cols-8 gap-2 mb-4'>
          {[
            { name: 'Zinc', color: '#18181b' }, { name: 'Slate', color: '#1e293b' },
            { name: 'Blue', color: '#3b82f6' }, { name: 'Green', color: '#16a34a' },
            { name: 'Violet', color: '#8b5cf6' }, { name: 'Rose', color: '#e11d48' },
            { name: 'Orange', color: '#f97316' }, { name: 'Teal', color: '#14b8a6' },
          ].map((p) => (
            <div key={p.name} className='text-center'>
              <div className='w-full aspect-square rounded-lg border border-border mb-1' style={{ background: p.color }} />
              <span className='text-[10px] text-muted-foreground'>{p.name}</span>
            </div>
          ))}
        </div>
        <p className='text-sm text-muted-foreground'>
          Switch presets anytime with the CLI or by editing your <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>globals.css</code>.
          Dark mode is class-based — add <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>class="dark"</code> to your
          root element. Works with <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>next-themes</code> and similar libraries.
        </p>
      </section>

      {/* Key Concepts */}
      <section>
        <h2 className='text-lg font-semibold text-foreground mb-3'>Key Concepts</h2>
        <div className='space-y-4'>
          {[
            {
              title: 'CVA (Class Variance Authority)',
              desc: 'Every component uses CVA to define type-safe variants. Instead of passing style props, you pass variant names like variant="destructive" or size="lg". CVA generates the correct Tailwind classes.',
              code: '<Button variant="destructive" size="lg">Delete</Button>',
            },
            {
              title: 'cn() Utility',
              desc: 'The cn() function merges Tailwind classes with conflict resolution. It combines clsx (conditional classes) and tailwind-merge (deduplication). Pass className to override any component styles.',
              code: '<Card className={cn("p-8", isActive && "ring-2 ring-primary")}>...</Card>',
            },
            {
              title: 'CSS Variables',
              desc: 'All semantic colors are CSS custom properties using HSL values. This enables alpha compositing (bg-primary/50), theme switching, and dark mode — all without rebuilding CSS.',
              code: ':root { --primary: 240 5.9% 10%; }  .dark { --primary: 0 0% 98%; }',
            },
          ].map((concept) => (
            <div key={concept.title} className='p-4 rounded-lg border border-border bg-card'>
              <h3 className='text-sm font-semibold text-foreground mb-1'>{concept.title}</h3>
              <p className='text-xs text-muted-foreground leading-relaxed mb-3'>{concept.desc}</p>
              <CodeBlock code={concept.code} language='tsx' />
            </div>
          ))}
        </div>
      </section>

      {/* Component Categories */}
      <section>
        <h2 className='text-lg font-semibold text-foreground mb-3'>What's Included</h2>
        <p className='text-sm text-muted-foreground mb-4'>
          Components are organized into three tiers:
        </p>
        <div className='grid sm:grid-cols-3 gap-3'>
          {[
            {
              tier: 'Basic',
              count: 44,
              desc: 'Core UI primitives — Button, Input, Card, Dialog, Tabs, Badge, Avatar, Select, Checkbox, Switch, and more.',
              color: 'badge-basic',
            },
            {
              tier: 'Advanced',
              count: 12,
              desc: 'Composed patterns — Calendar, Date Picker, Color Picker, Carousel, Form Builder, Rich Text Editor.',
              color: 'badge-advanced',
            },
            {
              tier: 'Enterprise',
              count: 42,
              desc: 'Data Table, Charts (13 types), Kanban Board, Drag & Drop, Chat, AI components, and more.',
              color: 'badge-enterprise',
            },
          ].map((t) => (
            <div key={t.tier} className='p-4 rounded-lg border border-border bg-card'>
              <div className='flex items-center gap-2 mb-2'>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.color}`}>{t.tier}</span>
                <span className='text-xs text-muted-foreground'>{t.count} components</span>
              </div>
              <p className='text-xs text-muted-foreground leading-relaxed'>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className='text-lg font-semibold text-foreground mb-4'>Frequently Asked Questions</h2>
        <div className='space-y-3'>
          {[
            { q: 'How do I update components?', a: 'Run `npx @adhar-ui/cli diff` to compare your local version with upstream. Then selectively pull changes or re-add components with `--overwrite`.' },
            { q: 'Can I use this with an existing project?', a: 'Yes. The init command adds configuration alongside your existing code. Components are installed in a separate directory and don\'t conflict with existing components.' },
            { q: 'Does it work with Tailwind CSS v3?', a: 'Adhar UI is designed for Tailwind CSS v4 with CSS custom properties. Some components may work with v3, but v4 is recommended for full compatibility.' },
            { q: 'How does multi-framework support work?', a: 'Components are authored in Mitosis and compiled to native code for each framework. The CLI detects your framework and installs the correct version.' },
            { q: 'Is there a Figma/Penpot kit?', a: 'Yes! Visit the Design Resources page to download SVG component kits and W3C DTCG design tokens for Figma, Penpot, and other tools.' },
          ].map((faq) => (
            <details key={faq.q} className='group rounded-lg border border-border'>
              <summary className='flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-foreground hover:bg-muted/30 transition-colors'>
                {faq.q}
                <svg className='w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform shrink-0 ml-2' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' d='M19 9l-7 7-7-7' />
                </svg>
              </summary>
              <div className='px-4 pb-3 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3'>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className='rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-6'>
        <h3 className='font-semibold text-foreground mb-4'>Next Steps</h3>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-3'>
          {[
            { label: 'Browse Components', href: '/components/form-controls', desc: 'Explore the full library with live previews' },
            { label: 'Theming Guide', href: '/theming', desc: 'Customize colors, fonts, and built-in presets' },
            { label: 'CLI Reference', href: '/cli', desc: 'All commands with examples' },
            { label: 'Storybook', href: '/storybook', desc: 'Try components live with prop controls' },
            { label: 'Blocks', href: '/blocks', desc: 'Copy-paste page sections' },
            { label: 'Design Resources', href: '/design-resources', desc: 'Figma & Penpot kits' },
            { label: 'Accessibility', href: '/guides/accessibility', desc: 'WCAG 2.1 AA compliance' },
          ].map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className='flex items-start gap-2.5 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 hover:border-primary/20 transition-all text-left group'
            >
              <svg className='w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M13 7l5 5m0 0l-5 5m5-5H6' />
              </svg>
              <div>
                <div className='text-xs font-medium text-foreground'>{item.label}</div>
                <div className='text-[10px] text-muted-foreground leading-relaxed'>{item.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
