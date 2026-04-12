import React, { useState } from 'react';
import { Callout, CodeBlock, PageHeader, Tabs } from '../components/ui.tsx';

const presets = [
  {
    name: 'Zinc',
    id: 'zinc',
    colors: {
      background: '0 0% 100%',
      foreground: '240 10% 3.9%',
      primary: '240 5.9% 10%',
      card: '0 0% 100%',
      muted: '240 4.8% 95.9%',
    },
    darkColors: {
      background: '240 10% 3.9%',
      foreground: '0 0% 98%',
      primary: '0 0% 98%',
      card: '240 10% 3.9%',
      muted: '240 3.7% 15.9%',
    },
  },
  {
    name: 'Slate',
    id: 'slate',
    colors: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      primary: '222.2 47.4% 11.2%',
      card: '0 0% 100%',
      muted: '210 40% 96.1%',
    },
    darkColors: {
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      primary: '210 40% 98%',
      card: '222.2 84% 4.9%',
      muted: '217.2 32.6% 17.5%',
    },
  },
  {
    name: 'Blue',
    id: 'blue',
    colors: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      primary: '221.2 83.2% 53.3%',
      card: '0 0% 100%',
      muted: '210 40% 96.1%',
    },
    darkColors: {
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      primary: '217.2 91.2% 59.8%',
      card: '222.2 84% 4.9%',
      muted: '217.2 32.6% 17.5%',
    },
  },
  {
    name: 'Green',
    id: 'green',
    colors: {
      background: '0 0% 100%',
      foreground: '240 10% 3.9%',
      primary: '142.1 76.2% 36.3%',
      card: '0 0% 100%',
      muted: '240 4.8% 95.9%',
    },
    darkColors: {
      background: '240 10% 3.9%',
      foreground: '0 0% 98%',
      primary: '142.1 70.6% 45.3%',
      card: '240 10% 3.9%',
      muted: '240 3.7% 15.9%',
    },
  },
  {
    name: 'Violet',
    id: 'violet',
    colors: {
      background: '0 0% 100%',
      foreground: '224 71% 4%',
      primary: '262 83% 58%',
      card: '0 0% 100%',
      muted: '260 20% 96%',
    },
    darkColors: {
      background: '224 71% 4%',
      foreground: '0 0% 98%',
      primary: '263 70% 65%',
      card: '224 71% 6%',
      muted: '260 15% 15%',
    },
  },
  {
    name: 'Rose',
    id: 'rose',
    colors: {
      background: '0 0% 100%',
      foreground: '240 10% 3.9%',
      primary: '346 77% 50%',
      card: '0 0% 100%',
      muted: '340 20% 96%',
    },
    darkColors: {
      background: '240 10% 3.9%',
      foreground: '0 0% 98%',
      primary: '346 77% 60%',
      card: '240 10% 5%',
      muted: '340 15% 15%',
    },
  },
  {
    name: 'Orange',
    id: 'orange',
    colors: {
      background: '0 0% 100%',
      foreground: '20 14% 4%',
      primary: '24 95% 53%',
      card: '0 0% 100%',
      muted: '30 20% 96%',
    },
    darkColors: {
      background: '20 14% 4%',
      foreground: '0 0% 98%',
      primary: '20 90% 58%',
      card: '20 14% 6%',
      muted: '20 10% 15%',
    },
  },
  {
    name: 'Teal',
    id: 'teal',
    colors: {
      background: '0 0% 100%',
      foreground: '185 60% 4%',
      primary: '173 80% 40%',
      card: '0 0% 100%',
      muted: '170 20% 96%',
    },
    darkColors: {
      background: '185 60% 4%',
      foreground: '0 0% 98%',
      primary: '173 70% 50%',
      card: '185 60% 6%',
      muted: '170 15% 15%',
    },
  },
];

const cssVariablesList = [
  { name: '--background', desc: 'Page background color' },
  { name: '--foreground', desc: 'Default text color' },
  { name: '--card', desc: 'Card/surface background' },
  { name: '--card-foreground', desc: 'Card text color' },
  { name: '--popover', desc: 'Popover background' },
  { name: '--popover-foreground', desc: 'Popover text color' },
  { name: '--primary', desc: 'Primary action color (buttons, links)' },
  { name: '--primary-foreground', desc: 'Text on primary color' },
  { name: '--secondary', desc: 'Secondary action color' },
  { name: '--secondary-foreground', desc: 'Text on secondary color' },
  { name: '--muted', desc: 'Muted/subtle backgrounds' },
  { name: '--muted-foreground', desc: 'Muted text (descriptions, placeholders)' },
  { name: '--accent', desc: 'Accent highlights (hover states)' },
  { name: '--accent-foreground', desc: 'Text on accent color' },
  { name: '--destructive', desc: 'Destructive/error actions' },
  { name: '--destructive-foreground', desc: 'Text on destructive color' },
  { name: '--border', desc: 'Border color' },
  { name: '--input', desc: 'Input border color' },
  { name: '--ring', desc: 'Focus ring color' },
  { name: '--radius', desc: 'Border radius base value' },
];

export function ThemingPage({ navigate }: { navigate: (path: string) => void }) {
  const [activePreset, setActivePreset] = useState('zinc');
  const preset = presets.find((p) => p.id === activePreset) || presets[0];

  return (
    <div className='space-y-10'>
      <PageHeader
        title='Theming'
        description='Adhar UI uses CSS variables with HSL color values for a flexible and powerful theming system. Choose a preset or create your own.'
      />

      {/* Overview */}
      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>How It Works</h2>
        <p className='text-muted-foreground mb-4 leading-relaxed'>
          Adhar UI defines a set of semantic CSS custom properties (e.g.,{' '}
          <code className='text-xs px-1.5 py-0.5 rounded bg-muted font-mono'>--primary</code>,{' '}
          <code className='text-xs px-1.5 py-0.5 rounded bg-muted font-mono'>--background</code>) in
          HSL format. These variables are referenced throughout all components via Tailwind utility
          classes. Changing a single variable instantly updates every component that uses it.
        </p>
        <Callout type='info'>
          Colors are stored as raw HSL values (e.g.,{' '}
          <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>240 10% 3.9%</code>)
          without the <code className='text-xs px-1 py-0.5 rounded bg-muted font-mono'>hsl()</code>
          {' '}
          wrapper, so Tailwind can apply opacity modifiers.
        </Callout>
      </div>

      {/* Theme Presets */}
      <div>
        <h2 className='text-xl font-bold text-foreground mb-4'>Theme Presets</h2>
        <p className='text-muted-foreground mb-4'>
          Choose from 4 built-in presets. Switch presets via the CLI or by editing your CSS
          variables directly.
        </p>

        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6'>
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePreset(p.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                activePreset === p.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className='flex gap-1'>
                {Object.values(p.colors).slice(0, 4).map((c, i) => (
                  <div
                    key={i}
                    className='w-5 h-5 rounded-full border border-black/10'
                    style={{ backgroundColor: `hsl(${c})` }}
                  />
                ))}
              </div>
              <span className='text-sm font-medium text-foreground'>{p.name}</span>
            </button>
          ))}
        </div>

        <div className='grid md:grid-cols-2 gap-4'>
          {/* Light Preview */}
          <div className='rounded-xl border border-border overflow-hidden'>
            <div className='px-4 py-2 border-b border-border bg-muted/30 flex items-center gap-2'>
              <div className='flex gap-1.5'>
                <div className='w-3 h-3 rounded-full bg-red-400' />
                <div className='w-3 h-3 rounded-full bg-yellow-400' />
                <div className='w-3 h-3 rounded-full bg-green-400' />
              </div>
              <span className='text-xs text-muted-foreground ml-2'>Light Mode</span>
            </div>
            <div
              className='p-4 space-y-3'
              style={{
                backgroundColor: `hsl(${preset.colors.background})`,
                color: `hsl(${preset.colors.foreground})`,
              }}
            >
              <div className='flex items-center gap-2'>
                <div
                  className='h-9 px-4 rounded-md flex items-center text-sm font-medium'
                  style={{
                    backgroundColor: `hsl(${preset.colors.primary})`,
                    color: `hsl(${preset.colors.background})`,
                  }}
                >
                  Button
                </div>
                <div
                  className='h-9 px-4 rounded-md flex items-center text-sm border'
                  style={{ borderColor: `hsl(${preset.colors.muted})` }}
                >
                  Outline
                </div>
              </div>
              <div
                className='p-3 rounded-lg'
                style={{
                  backgroundColor: `hsl(${preset.colors.card})`,
                  border: `1px solid hsl(${preset.colors.muted})`,
                }}
              >
                <div className='text-sm font-medium'>Card Title</div>
                <div
                  className='text-xs mt-1'
                  style={{ color: `hsl(${preset.colors.foreground} / 0.6)` }}
                >
                  Description text
                </div>
              </div>
              <div
                className='h-9 px-3 rounded-md flex items-center text-sm'
                style={{
                  backgroundColor: `hsl(${preset.colors.muted})`,
                  color: `hsl(${preset.colors.foreground} / 0.6)`,
                }}
              >
                Search components...
              </div>
            </div>
          </div>

          {/* Dark Preview */}
          <div className='rounded-xl border border-border overflow-hidden'>
            <div className='px-4 py-2 border-b border-border bg-muted/30 flex items-center gap-2'>
              <div className='flex gap-1.5'>
                <div className='w-3 h-3 rounded-full bg-red-400' />
                <div className='w-3 h-3 rounded-full bg-yellow-400' />
                <div className='w-3 h-3 rounded-full bg-green-400' />
              </div>
              <span className='text-xs text-muted-foreground ml-2'>Dark Mode</span>
            </div>
            <div
              className='p-4 space-y-3'
              style={{
                backgroundColor: `hsl(${preset.darkColors.background})`,
                color: `hsl(${preset.darkColors.foreground})`,
              }}
            >
              <div className='flex items-center gap-2'>
                <div
                  className='h-9 px-4 rounded-md flex items-center text-sm font-medium'
                  style={{
                    backgroundColor: `hsl(${preset.darkColors.primary})`,
                    color: `hsl(${preset.darkColors.background})`,
                  }}
                >
                  Button
                </div>
                <div
                  className='h-9 px-4 rounded-md flex items-center text-sm border'
                  style={{ borderColor: `hsl(${preset.darkColors.muted})` }}
                >
                  Outline
                </div>
              </div>
              <div
                className='p-3 rounded-lg'
                style={{
                  backgroundColor: `hsl(${preset.darkColors.card})`,
                  border: `1px solid hsl(${preset.darkColors.muted})`,
                }}
              >
                <div className='text-sm font-medium'>Card Title</div>
                <div
                  className='text-xs mt-1'
                  style={{ color: `hsl(${preset.darkColors.foreground} / 0.6)` }}
                >
                  Description text
                </div>
              </div>
              <div
                className='h-9 px-3 rounded-md flex items-center text-sm'
                style={{
                  backgroundColor: `hsl(${preset.darkColors.muted})`,
                  color: `hsl(${preset.darkColors.foreground} / 0.6)`,
                }}
              >
                Search components...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Switching Presets */}
      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Switch Presets via CLI</h2>
        <Tabs variant='pills' tabs={[
          { label: 'npm', content: <CodeBlock code={'# Switch to the blue preset\nnpx @adhar-ui/cli theme blue\n\n# Available presets: zinc, slate, blue, green, violet, rose, orange, teal'} language='bash' /> },
          { label: 'yarn', content: <CodeBlock code={'# Switch to the blue preset\nyarn dlx @adhar-ui/cli theme blue\n\n# Available presets: zinc, slate, blue, green, violet, rose, orange, teal'} language='bash' /> },
          { label: 'pnpm', content: <CodeBlock code={'# Switch to the blue preset\npnpm dlx @adhar-ui/cli theme blue\n\n# Available presets: zinc, slate, blue, green, violet, rose, orange, teal'} language='bash' /> },
          { label: 'bun', content: <CodeBlock code={'# Switch to the blue preset\nbunx @adhar-ui/cli theme blue\n\n# Available presets: zinc, slate, blue, green, violet, rose, orange, teal'} language='bash' /> },
          { label: 'deno', content: <CodeBlock code={'# Switch to the blue preset\ndeno run -A jsr:@adhar-ui/cli theme blue\n\n# Available presets: zinc, slate, blue, green, violet, rose, orange, teal'} language='bash' /> },
        ]} />
      </div>

      {/* CSS Variables Reference */}
      <div>
        <h2 className='text-xl font-bold text-foreground mb-4'>CSS Variables Reference</h2>
        <div className='rounded-xl border border-border overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-border bg-muted/30'>
                  <th className='text-left px-4 py-2.5 font-medium text-foreground'>Variable</th>
                  <th className='text-left px-4 py-2.5 font-medium text-foreground'>Description</th>
                  <th className='text-left px-4 py-2.5 font-medium text-foreground'>
                    Current Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {cssVariablesList.map((v) => (
                  <tr
                    key={v.name}
                    className='border-b border-border last:border-0 hover:bg-muted/20 transition-colors'
                  >
                    <td className='px-4 py-2.5'>
                      <code className='text-xs px-1.5 py-0.5 rounded bg-muted font-mono text-primary'>
                        {v.name}
                      </code>
                    </td>
                    <td className='px-4 py-2.5 text-muted-foreground'>{v.desc}</td>
                    <td className='px-4 py-2.5'>
                      <div className='flex items-center gap-2'>
                        <div
                          className='w-4 h-4 rounded border border-border shrink-0'
                          style={v.name !== '--radius'
                            ? { backgroundColor: `hsl(var(${v.name}))` }
                            : undefined}
                        />
                        <code className='text-xs font-mono text-muted-foreground'>
                          {v.name === '--radius' ? '0.5rem' : 'hsl(...)'}
                        </code>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Theme */}
      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Creating a Custom Theme</h2>
        <p className='text-muted-foreground mb-4'>
          Override any CSS variable in your{' '}
          <code className='text-xs px-1.5 py-0.5 rounded bg-muted font-mono'>globals.css</code>{' '}
          file:
        </p>
        <CodeBlock
          code={`@layer base {\n  :root {\n    --background: 0 0% 100%;\n    --foreground: 222.2 84% 4.9%;\n    --primary: 221.2 83.2% 53.3%;\n    --primary-foreground: 210 40% 98%;\n    --secondary: 210 40% 96.1%;\n    --secondary-foreground: 222.2 47.4% 11.2%;\n    --muted: 210 40% 96.1%;\n    --muted-foreground: 215.4 16.3% 46.9%;\n    --accent: 210 40% 96.1%;\n    --accent-foreground: 222.2 47.4% 11.2%;\n    --destructive: 0 84.2% 60.2%;\n    --destructive-foreground: 210 40% 98%;\n    --border: 214.3 31.8% 91.4%;\n    --input: 214.3 31.8% 91.4%;\n    --ring: 221.2 83.2% 53.3%;\n    --radius: 0.5rem;\n  }\n\n  .dark {\n    --background: 222.2 84% 4.9%;\n    --foreground: 210 40% 98%;\n    /* ... dark mode overrides */\n  }\n}`}
          language='css'
        />
      </div>

      {/* Tailwind Integration */}
      <div>
        <h2 className='text-xl font-bold text-foreground mb-3'>Tailwind CSS Integration</h2>
        <p className='text-muted-foreground mb-4'>
          CSS variables are mapped to Tailwind utility classes in your{' '}
          <code className='text-xs px-1.5 py-0.5 rounded bg-muted font-mono'>
            tailwind.config.ts
          </code>:
        </p>
        <CodeBlock
          code={`// tailwind.config.ts\nexport default {\n  darkMode: ['class'],\n  theme: {\n    extend: {\n      colors: {\n        background: 'hsl(var(--background))',\n        foreground: 'hsl(var(--foreground))',\n        primary: {\n          DEFAULT: 'hsl(var(--primary))',\n          foreground: 'hsl(var(--primary-foreground))',\n        },\n        secondary: {\n          DEFAULT: 'hsl(var(--secondary))',\n          foreground: 'hsl(var(--secondary-foreground))',\n        },\n        muted: {\n          DEFAULT: 'hsl(var(--muted))',\n          foreground: 'hsl(var(--muted-foreground))',\n        },\n        // ... more color mappings\n      },\n      borderRadius: {\n        lg: 'var(--radius)',\n        md: 'calc(var(--radius) - 2px)',\n        sm: 'calc(var(--radius) - 4px)',\n      },\n    },\n  },\n}`}
          language='typescript'
        />
      </div>
    </div>
  );
}
