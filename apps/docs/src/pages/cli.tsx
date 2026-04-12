import React, { useState } from 'react';
import { Badge, Callout, CodeBlock, PageHeader, PropsTable, Tabs } from '../components/ui.tsx';

/** Convert a deno CLI command to all 5 runtime variants */
function cliTabs(denoCmd: string) {
  const core = denoCmd.replace('deno run -A jsr:@adhar-ui/cli', '').trim();
  return (
    <Tabs variant='pills' tabs={[
      { label: 'npm', content: <CodeBlock code={`npx @adhar-ui/cli ${core}`} language='bash' /> },
      { label: 'yarn', content: <CodeBlock code={`yarn dlx @adhar-ui/cli ${core}`} language='bash' /> },
      { label: 'pnpm', content: <CodeBlock code={`pnpm dlx @adhar-ui/cli ${core}`} language='bash' /> },
      { label: 'bun', content: <CodeBlock code={`bunx @adhar-ui/cli ${core}`} language='bash' /> },
      { label: 'deno', content: <CodeBlock code={denoCmd} language='bash' /> },
    ]} />
  );
}

interface CLICommand {
  name: string;
  description: string;
  usage: string;
  args?: string;
  flags?: { name: string; type: string; description: string; default?: string }[];
  examples: { title: string; code: string }[];
}

const commands: CLICommand[] = [
  {
    name: 'init',
    description:
      'Initialize Adhar UI in your project. Creates a components.json configuration file and sets up the required directory structure.',
    usage: 'adhar-ui init [options]',
    flags: [
      {
        name: '--yes, -y',
        type: 'boolean',
        description: 'Skip prompts and use defaults',
        default: 'false',
      },
      {
        name: '--defaults, -d',
        type: 'boolean',
        description: 'Use default configuration',
        default: 'false',
      },
      {
        name: '--force, -f',
        type: 'boolean',
        description: 'Overwrite existing configuration',
        default: 'false',
      },
      { name: '--cwd', type: 'string', description: 'Working directory', default: '.' },
    ],
    examples: [
      { title: 'Interactive setup', code: 'deno run -A jsr:@adhar-ui/cli init' },
      { title: 'Non-interactive with defaults', code: 'deno run -A jsr:@adhar-ui/cli init -y -d' },
    ],
  },
  {
    name: 'add',
    description:
      'Add components to your project. Resolves dependencies automatically and copies component source files.',
    usage: 'adhar-ui add [components...] [options]',
    args: 'Space-separated list of component names',
    flags: [
      {
        name: '--yes, -y',
        type: 'boolean',
        description: 'Skip confirmation prompts',
        default: 'false',
      },
      {
        name: '--overwrite, -o',
        type: 'boolean',
        description: 'Overwrite existing files',
        default: 'false',
      },
      {
        name: '--all',
        type: 'boolean',
        description: 'Add all available components',
        default: 'false',
      },
      {
        name: '--path',
        type: 'string',
        description: 'Custom output path',
        default: 'components.json path',
      },
      { name: '--cwd', type: 'string', description: 'Working directory', default: '.' },
    ],
    examples: [
      { title: 'Add single component', code: 'deno run -A jsr:@adhar-ui/cli add button' },
      {
        title: 'Add multiple components',
        code: 'deno run -A jsr:@adhar-ui/cli add button card dialog input',
      },
      { title: 'Add all components', code: 'deno run -A jsr:@adhar-ui/cli add --all' },
      { title: 'Overwrite existing', code: 'deno run -A jsr:@adhar-ui/cli add button -o' },
    ],
  },
  {
    name: 'list',
    description: 'List all available components in the registry with their categories and tiers.',
    usage: 'adhar-ui list [options]',
    flags: [
      { name: '--json', type: 'boolean', description: 'Output as JSON', default: 'false' },
      { name: '--cwd', type: 'string', description: 'Working directory', default: '.' },
    ],
    examples: [
      { title: 'List all components', code: 'deno run -A jsr:@adhar-ui/cli list' },
      { title: 'Output as JSON', code: 'deno run -A jsr:@adhar-ui/cli list --json' },
    ],
  },
  {
    name: 'diff',
    description:
      'Show differences between your local components and the registry. Useful for seeing what has changed upstream.',
    usage: 'adhar-ui diff [component] [options]',
    args: 'Optional component name (shows all if omitted)',
    flags: [
      { name: '--cwd', type: 'string', description: 'Working directory', default: '.' },
    ],
    examples: [
      { title: 'Diff all components', code: 'deno run -A jsr:@adhar-ui/cli diff' },
      { title: 'Diff specific component', code: 'deno run -A jsr:@adhar-ui/cli diff button' },
    ],
  },
  {
    name: 'theme',
    description:
      'Switch between built-in theme presets or apply a custom theme. Updates your CSS variables file.',
    usage: 'adhar-ui theme [preset] [options]',
    args: 'Preset name: zinc, slate, blue, green',
    flags: [
      { name: '--cwd', type: 'string', description: 'Working directory', default: '.' },
    ],
    examples: [
      { title: 'Switch to blue preset', code: 'deno run -A jsr:@adhar-ui/cli theme blue' },
      { title: 'Switch to green preset', code: 'deno run -A jsr:@adhar-ui/cli theme green' },
    ],
  },
  {
    name: 'doctor',
    description:
      'Diagnose common issues with your Adhar UI setup. Checks configuration, dependencies, and file structure.',
    usage: 'adhar-ui doctor [options]',
    flags: [
      { name: '--cwd', type: 'string', description: 'Working directory', default: '.' },
    ],
    examples: [
      { title: 'Run diagnostics', code: 'deno run -A jsr:@adhar-ui/cli doctor' },
    ],
  },
  {
    name: 'design-sync',
    description:
      'Synchronize design tokens between your codebase and design tools (Figma, Penpot) using W3C DTCG format.',
    usage: 'adhar-ui design-sync [options]',
    flags: [
      {
        name: '--pull',
        type: 'boolean',
        description: 'Pull tokens from design tool',
        default: 'false',
      },
      {
        name: '--push',
        type: 'boolean',
        description: 'Push tokens to design tool',
        default: 'false',
      },
      { name: '--cwd', type: 'string', description: 'Working directory', default: '.' },
    ],
    examples: [
      { title: 'Pull tokens from Figma', code: 'deno run -A jsr:@adhar-ui/cli design-sync --pull' },
      { title: 'Push tokens to Figma', code: 'deno run -A jsr:@adhar-ui/cli design-sync --push' },
    ],
  },
  {
    name: 'design-export',
    description:
      'Export components as design assets. Generates Figma or Penpot compatible component definitions.',
    usage: 'adhar-ui design-export [options]',
    flags: [
      {
        name: '--format',
        type: 'string',
        description: 'Output format (figma, penpot)',
        default: 'figma',
      },
      { name: '--cwd', type: 'string', description: 'Working directory', default: '.' },
    ],
    examples: [
      {
        title: 'Export for Figma',
        code: 'deno run -A jsr:@adhar-ui/cli design-export --format figma',
      },
      {
        title: 'Export for Penpot',
        code: 'deno run -A jsr:@adhar-ui/cli design-export --format penpot',
      },
    ],
  },
];

export function CLIPage() {
  const [selected, setSelected] = useState('init');
  const cmd = commands.find((c) => c.name === selected) || commands[0];

  return (
    <div className='space-y-10'>
      <PageHeader
        title='CLI Reference'
        description='The Adhar UI CLI helps you initialize projects, add components, manage themes, and sync with design tools.'
      />

      {/* Quick Install */}
      <div>
        <h2 className='text-lg font-semibold text-foreground mb-3'>Running the CLI</h2>
        <Tabs variant='pills' tabs={[
          { label: 'npm', content: <CodeBlock code='npx @adhar-ui/cli <command>' language='bash' /> },
          { label: 'yarn', content: <CodeBlock code='yarn dlx @adhar-ui/cli <command>' language='bash' /> },
          { label: 'pnpm', content: <CodeBlock code='pnpm dlx @adhar-ui/cli <command>' language='bash' /> },
          { label: 'bun', content: <CodeBlock code='bunx @adhar-ui/cli <command>' language='bash' /> },
          { label: 'deno', content: <CodeBlock code='deno run -A jsr:@adhar-ui/cli <command>' language='bash' /> },
        ]} />
      </div>

      {/* Command Selector */}
      <div className='grid lg:grid-cols-[200px_1fr] gap-6'>
        <div>
          <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3'>
            Commands ({commands.length})
          </h3>
          <div className='space-y-0.5'>
            {commands.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelected(c.name)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-mono transition-colors ${
                  selected === c.name
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className='space-y-6'>
          {/* Command Header */}
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <h2 className='text-2xl font-bold font-mono text-foreground'>{cmd.name}</h2>
            </div>
            <p className='text-muted-foreground'>{cmd.description}</p>
          </div>

          {/* Usage */}
          <div>
            <h3 className='text-sm font-medium text-foreground mb-2'>Usage</h3>
            <CodeBlock code={cmd.usage} language='bash' />
          </div>

          {/* Arguments */}
          {cmd.args && (
            <div>
              <h3 className='text-sm font-medium text-foreground mb-2'>Arguments</h3>
              <p className='text-sm text-muted-foreground'>{cmd.args}</p>
            </div>
          )}

          {/* Flags */}
          {cmd.flags && cmd.flags.length > 0 && (
            <div>
              <h3 className='text-sm font-medium text-foreground mb-2'>Options</h3>
              <div className='rounded-lg border border-border overflow-hidden'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b border-border bg-muted/30'>
                      <th className='text-left px-3 py-2 font-medium text-foreground'>Flag</th>
                      <th className='text-left px-3 py-2 font-medium text-foreground'>Type</th>
                      <th className='text-left px-3 py-2 font-medium text-foreground'>
                        Description
                      </th>
                      <th className='text-left px-3 py-2 font-medium text-foreground'>Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cmd.flags.map((flag) => (
                      <tr
                        key={flag.name}
                        className='border-b border-border last:border-0 hover:bg-muted/20'
                      >
                        <td className='px-3 py-2'>
                          <code className='text-xs px-1.5 py-0.5 rounded bg-muted font-mono text-primary'>
                            {flag.name}
                          </code>
                        </td>
                        <td className='px-3 py-2 text-muted-foreground'>{flag.type}</td>
                        <td className='px-3 py-2 text-muted-foreground'>{flag.description}</td>
                        <td className='px-3 py-2'>
                          <code className='text-xs font-mono text-muted-foreground'>
                            {flag.default || '-'}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Examples */}
          {cmd.examples.length > 0 && (
            <div>
              <h3 className='text-sm font-medium text-foreground mb-3'>Examples</h3>
              <div className='space-y-4'>
                {cmd.examples.map((ex, i) => (
                  <div key={i}>
                    <div className='text-xs text-muted-foreground mb-1.5 font-medium'>{ex.title}</div>
                    {cliTabs(ex.code)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
