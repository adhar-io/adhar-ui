import React from 'react';
import { Badge, Callout, CodeBlock, DocCard, PageHeader, Tabs } from '../components/ui.tsx';
import {
  DesignSyncIllustration,
  HeroIllustration,
  IconArrowRight,
  IconBook,
  IconBrush,
  IconClipboard,
  IconCode,
  IconGlobe,
  IconGrid,
  IconLightbulb,
  IconShield,
  IconSparkles,
  IconZap,
  NavIcon,
} from '../components/icons.tsx';

// Stat cards on the home page. We use icons + qualitative descriptions
// instead of hardcoded counts so the copy never goes stale as the library grows.
const stats = [
  { label: 'Components', icon: '◧', desc: 'Full primitive set + page blocks' },
  { label: 'Frameworks', icon: '⬡', desc: 'React, Vue, Solid, Svelte, Angular' },
  { label: 'Design Tokens', icon: '◉', desc: 'Semantic CSS variables, themeable' },
  { label: 'CLI', icon: '⌨', desc: 'Add, init, build — all scripted' },
];

const features = [
  {
    icon: <IconCode className='w-6 h-6' />,
    title: 'Own Your Code',
    description:
      'Components are copied into your project. Read, modify, extend — no fighting upstream packages.',
  },
  {
    icon: <IconGlobe className='w-6 h-6' />,
    title: 'Multi-Framework',
    description:
      'Authored once in Mitosis, compiled to native React, Vue, Solid, Svelte, and Angular.',
  },
  {
    icon: <IconBrush className='w-6 h-6' />,
    title: 'Design Sync',
    description:
      'Bidirectional sync with Figma and Penpot via W3C DTCG standard. Code and design stay in lock-step.',
  },
  {
    icon: <IconSparkles className='w-6 h-6' />,
    title: 'Enterprise & AI Ready',
    description:
      'Data Tables, Kanban Boards, Chat interfaces, Streaming Text — production-grade components included.',
  },
  {
    icon: <IconShield className='w-6 h-6' />,
    title: 'Accessible by Default',
    description:
      'WAI-ARIA compliant with keyboard navigation, focus management, screen reader support built-in.',
  },
  {
    icon: <IconZap className='w-6 h-6' />,
    title: 'Powerful CLI',
    description:
      'Initialize projects, add components, manage themes, sync designs — all from the command line.',
  },
];

// Old features array removed — replaced with custom icon components above

const _removed = [
  {
    _: (
      <svg
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5'
        />
      </svg>
    ),
    title: 'Own Your Code',
    description:
      'Components are copied into your project. Read, modify, extend — no fighting upstream packages.',
  },
  {
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
        />
      </svg>
    ),
    title: 'Multi-Framework',
    description:
      'Authored once in Mitosis, compiled to native React, Vue, Solid, Svelte, and Angular.',
  },
  {
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125V7.5M6.75 21h10.5A2.25 2.25 0 0019.5 18.75v-7.5M12 3.375h5.25c.621 0 1.125.504 1.125 1.125V7.5'
        />
      </svg>
    ),
    title: 'Design Sync',
    description:
      'Bidirectional sync with Figma and Penpot via W3C DTCG standard. Code and design stay in lock-step.',
  },
  {
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
        />
      </svg>
    ),
    title: 'Enterprise & AI Ready',
    description:
      'Data Tables, Kanban Boards, Chat interfaces, Streaming Text — production-grade components included.',
  },
  {
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.72.608 5.18 1.64'
        />
      </svg>
    ),
    title: 'Accessible by Default',
    description:
      'WAI-ARIA compliant with keyboard navigation, focus management, screen reader support built-in.',
  },
  {
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.5}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z'
        />
      </svg>
    ),
    title: 'Powerful CLI',
    description:
      'Initialize projects, add components, manage themes, sync designs — all from the command line.',
  },
];

const frameworks = [
  {
    name: 'React',
    color: '#61DAFB',
    logo: (
      <svg viewBox='0 0 24 24' className='w-7 h-7' fill='#61DAFB'>
        <circle cx='12' cy='12' r='2.139' />
        <ellipse cx='12' cy='12' rx='11' ry='4.2' fill='none' stroke='#61DAFB' strokeWidth='1' />
        <ellipse cx='12' cy='12' rx='11' ry='4.2' fill='none' stroke='#61DAFB' strokeWidth='1' transform='rotate(60 12 12)' />
        <ellipse cx='12' cy='12' rx='11' ry='4.2' fill='none' stroke='#61DAFB' strokeWidth='1' transform='rotate(120 12 12)' />
      </svg>
    ),
  },
  {
    name: 'Vue',
    color: '#4FC08D',
    logo: (
      <svg viewBox='0 0 24 24' className='w-7 h-7' fill='none'>
        <path d='M2 3h4l6 10.2L18 3h4L12 21z' fill='#4FC08D' />
        <path d='M7.2 3L12 10.9 16.8 3h-4L12 5 11.2 3z' fill='#35495E' />
      </svg>
    ),
  },
  {
    name: 'Solid',
    color: '#2C4F7C',
    logo: (
      <svg viewBox='0 0 128 128' className='w-7 h-7'>
        <path fill='#76b3e1' d='M128 29.7S85.3-1.7 52.3 5.5l-2.4.8c-4.8 1.6-8.9 4-11.3 7.3l-1.6 2.4-12.1 20.9 20.9 4c8.9 5.7 20.1 8.1 30.6 5.7L128 29.7z' />
        <path fill='#518ac8' d='m38.6 29.7-3.2.8C21.7 34.5 17.7 47.4 25 58.7c8 10.5 25 16.1 38.6 12.1l49.9-16.9S70.8 22.4 38.6 29.7z' />
        <path fill='#315aa9' d='M104.7 65.9a36.2 36.2 0 0 0-38.7-12.1L16.1 69.9 0 98.1l90.2 15.3 16.1-29c3.2-5.6 2.4-12.1-1.6-18.5z' />
        <path fill='#1a336b' d='M88.6 94.1a36.2 36.2 0 0 0-38.7-12.1L0 98.1s42.7 32.2 75.7 24.2l2.4-.8c13.7-4 18.5-16.9 10.5-27.4z' />
      </svg>
    ),
  },
  {
    name: 'Svelte',
    color: '#FF3E00',
    logo: (
      <svg viewBox='0 0 24 24' className='w-7 h-7'>
        <path d='M19.824 5.293a5.586 5.586 0 0 0-7.68-1.968L7.26 6.79a4.648 4.648 0 0 0-2.106 3.128 4.862 4.862 0 0 0 .48 3.392 4.607 4.607 0 0 0-.672 2.16 4.884 4.884 0 0 0 .84 3.744 5.586 5.586 0 0 0 7.68 1.968l4.884-3.465a4.648 4.648 0 0 0 2.106-3.128 4.861 4.861 0 0 0-.48-3.392 4.608 4.608 0 0 0 .672-2.16 4.884 4.884 0 0 0-.84-3.744z' fill='#FF3E00' />
        <path d='M9.876 19.683a3.349 3.349 0 0 1-3.6-1.32 2.944 2.944 0 0 1-.504-2.256 2.54 2.54 0 0 1 .096-.408l.12-.336.312.216a5.6 5.6 0 0 0 1.704.84l.168.048-.024.168a.888.888 0 0 0 .168.576 1.02 1.02 0 0 0 1.092.408.94.94 0 0 0 .264-.12l4.86-3.465a.85.85 0 0 0 .384-.576.888.888 0 0 0-.156-.672 1.02 1.02 0 0 0-1.092-.408.94.94 0 0 0-.264.12l-1.86 1.32a3.094 3.094 0 0 1-.864.384 3.349 3.349 0 0 1-3.6-1.32 2.944 2.944 0 0 1-.504-2.256 2.792 2.792 0 0 1 1.272-1.896l4.86-3.465a3.094 3.094 0 0 1 .864-.384 3.349 3.349 0 0 1 3.6 1.32 2.944 2.944 0 0 1 .504 2.256 2.54 2.54 0 0 1-.096.408l-.12.336-.312-.216a5.6 5.6 0 0 0-1.704-.84l-.168-.048.024-.168a.888.888 0 0 0-.168-.576 1.02 1.02 0 0 0-1.092-.408.94.94 0 0 0-.264.12l-4.86 3.465a.85.85 0 0 0-.384.576.888.888 0 0 0 .156.672 1.02 1.02 0 0 0 1.092.408.94.94 0 0 0 .264-.12l1.86-1.32a3.094 3.094 0 0 1 .864-.384 3.349 3.349 0 0 1 3.6 1.32 2.944 2.944 0 0 1 .504 2.256 2.792 2.792 0 0 1-1.272 1.896l-4.86 3.465a3.094 3.094 0 0 1-.864.384z' fill='#fff' />
      </svg>
    ),
  },
  {
    name: 'Angular',
    color: '#DD0031',
    logo: (
      <svg viewBox='0 0 24 24' className='w-7 h-7'>
        <path d='M12 2L2.7 5.5l1.4 12.2L12 22l7.9-4.3 1.4-12.2z' fill='#DD0031' />
        <path d='M12 2v20l7.9-4.3 1.4-12.2z' fill='#C3002F' />
        <path d='M12 2L6.5 14.4h2.1l1.1-2.7h4.6l1.1 2.7h2.1L12 2zm1.5 8h-3L12 6.3l1.5 3.7z' fill='#fff' />
      </svg>
    ),
  },
];

export function HomePage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className='space-y-12'>
      {/* Hero */}
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 -z-10 hero-gradient rounded-3xl' />
        <div className='grid lg:grid-cols-2 gap-8 items-center pt-8 pb-12'>
          {/* Left — text */}
          <div className='text-center lg:text-left'>
            <div className='flex items-center justify-center lg:justify-start gap-2 mb-6'>
              <Badge variant='outline' className='text-xs animate-fade-in'>v0.1.0</Badge>
              <Badge variant='secondary' className='text-xs animate-fade-in'>Open Source</Badge>
            </div>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 animate-slide-up'>
              <span className='text-foreground'>Adhar</span>{' '}
              <span className='gradient-text'>UI</span>
            </h1>
            <p className='text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-slide-up'>
              The open, framework-agnostic design system.{' '}
              <span className='text-foreground font-medium'>
                Own your components. Ship to any framework. Sync with your design tools.
              </span>
            </p>
            <div className='flex items-center justify-center lg:justify-start gap-3 flex-wrap animate-slide-up'>
              <button
                onClick={() => navigate('/getting-started')}
                className='group inline-flex items-center gap-2 h-11 px-6 rounded-lg btn-gradient font-medium text-sm transition-all shadow-sm hover:shadow-lg hover:shadow-primary/25 cta-glow'
              >
                Get Started
                <IconArrowRight size={16} className='group-hover:translate-x-0.5 transition-transform' />
              </button>
              <button
                onClick={() => navigate('/components/form-controls')}
                className='inline-flex items-center gap-2 h-11 px-6 rounded-lg border border-border bg-background text-foreground font-medium text-sm hover:bg-muted transition-colors'
              >
                Browse Components
              </button>
            </div>
          </div>
          {/* Right — animated illustration */}
          <div className='hidden lg:block animate-fade-in'>
            <HeroIllustration />
          </div>
        </div>
      </div>

      {/* Quick Install */}
      <div className='rounded-xl border border-border bg-card p-6'>
        <h3 className='text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider'>
          Quick Start
        </h3>
        <Tabs variant='pills' tabs={[
          { label: 'npm', content: <CodeBlock code={'# Initialize your project\nnpx @adhar-ui/cli init\n\n# Add components\nnpx @adhar-ui/cli add button card dialog data-table chat'} language='bash' /> },
          { label: 'yarn', content: <CodeBlock code={'# Initialize your project\nyarn dlx @adhar-ui/cli init\n\n# Add components\nyarn dlx @adhar-ui/cli add button card dialog data-table chat'} language='bash' /> },
          { label: 'pnpm', content: <CodeBlock code={'# Initialize your project\npnpm dlx @adhar-ui/cli init\n\n# Add components\npnpm dlx @adhar-ui/cli add button card dialog data-table chat'} language='bash' /> },
          { label: 'bun', content: <CodeBlock code={'# Initialize your project\nbunx @adhar-ui/cli init\n\n# Add components\nbunx @adhar-ui/cli add button card dialog data-table chat'} language='bash' /> },
          { label: 'deno', content: <CodeBlock code={'# Initialize your project\ndeno run -A jsr:@adhar-ui/cli init\n\n# Add components\ndeno run -A jsr:@adhar-ui/cli add button card dialog data-table chat'} language='bash' /> },
        ]} />
      </div>

      {/* Stats — icon-led "what's in the box" tiles (no hardcoded counts to avoid staleness) */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {stats.map((stat) => (
          <div key={stat.label} className='group text-center p-6 rounded-xl border border-border bg-card card-glow hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5'>
            <div className='inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary text-xl font-semibold mb-3 group-hover:scale-105 transition-transform'>
              {stat.icon}
            </div>
            <div className='text-sm font-semibold text-foreground'>{stat.label}</div>
            <div className='text-xs text-muted-foreground mt-1'>{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div>
        <h2 className='text-2xl font-bold text-foreground mb-2'>
          Why <span className='gradient-text'>Adhar UI</span>?
        </h2>
        <p className='text-muted-foreground mb-6'>
          Everything you need for a world-class design system.
        </p>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {features.map((feature, i) => {
            const colors = [
              'from-blue-500/10 to-cyan-500/5 border-blue-500/20 hover:border-blue-500/40',
              'from-violet-500/10 to-purple-500/5 border-violet-500/20 hover:border-violet-500/40',
              'from-rose-500/10 to-pink-500/5 border-rose-500/20 hover:border-rose-500/40',
              'from-amber-500/10 to-orange-500/5 border-amber-500/20 hover:border-amber-500/40',
              'from-emerald-500/10 to-teal-500/5 border-emerald-500/20 hover:border-emerald-500/40',
              'from-cyan-500/10 to-blue-500/5 border-cyan-500/20 hover:border-cyan-500/40',
            ];
            const iconColors = [
              'text-blue-500', 'text-violet-500', 'text-rose-500',
              'text-amber-500', 'text-emerald-500', 'text-cyan-500',
            ];
            return (
              <div
                key={feature.title}
                className={`group rounded-xl border p-6 bg-gradient-to-br ${colors[i % colors.length]} hover:shadow-lg transition-all duration-300`}
              >
                <div className={`${iconColors[i % iconColors.length]} mb-4 group-hover:scale-110 transition-transform duration-300 inline-block`}>
                  {feature.icon}
                </div>
                <h3 className='font-semibold text-foreground mb-1.5'>{feature.title}</h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Component Tiers */}
      <div>
        <h2 className='text-2xl font-bold text-foreground mb-2'>Component Tiers</h2>
        <p className='text-muted-foreground mb-6'>
          From primitives to production-ready enterprise components.
        </p>
        <div className='grid sm:grid-cols-3 gap-4'>
          {[
            {
              tier: 1,
              label: 'Basic',
              subtitle: 'Core Primitives',
              count: 41,
              desc: 'Essential UI building blocks: Button, Input, Card, Dialog, Tabs, and more.',
              color: 'from-emerald-500/10 to-cyan-500/5 border-emerald-500/20',
              iconColor: 'text-emerald-500',
            },
            {
              tier: 2,
              label: 'Advanced',
              subtitle: 'Composites & Patterns',
              count: 12,
              desc: 'Composed components: Command Palette, Date Picker, Form, Carousel, Charts.',
              color: 'from-blue-500/10 to-violet-500/5 border-blue-500/20',
              iconColor: 'text-blue-500',
            },
            {
              tier: 3,
              label: 'Enterprise',
              subtitle: 'Pro & AI Components',
              count: 27,
              desc: 'Data Table, Kanban Board, AI Chat, Streaming Text, File Upload, and more.',
              color: 'from-amber-500/10 to-rose-500/5 border-amber-500/20',
              iconColor: 'text-amber-500',
            },
          ].map((t) => (
            <DocCard
              key={t.tier}
              title={t.label}
              description={t.desc}
              onClick={() => navigate('/components/form-controls')}
              className={`bg-gradient-to-br ${t.color}`}
            >
              <span className={`text-[10px] font-medium uppercase tracking-widest ${t.iconColor} opacity-80`}>
                {t.subtitle}
              </span>
              <div className='mt-2 text-2xl font-bold text-foreground'>
                {t.count}{' '}
                <span className='text-sm font-normal text-muted-foreground'>components</span>
              </div>
            </DocCard>
          ))}
        </div>
      </div>

      {/* Framework Support */}
      <div>
        <h2 className='text-2xl font-bold text-foreground mb-2'>Multi-Framework</h2>
        <p className='text-muted-foreground mb-6'>
          One component library, five native outputs. No wrappers.
        </p>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
          {frameworks.map((fw) => (
            <div
              key={fw.name}
              className='group flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-200 cursor-default'
            >
              <div className='transition-transform duration-200 group-hover:scale-110'>
                {fw.logo}
              </div>
              <span className='font-semibold text-foreground text-sm'>{fw.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Explore More */}
      <div>
        <h2 className='text-2xl font-bold text-foreground mb-2'>Explore the Portal</h2>
        <p className='text-muted-foreground mb-6'>
          Interactive tools, examples, and resources to help you build faster.
        </p>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {(() => {
            const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
            const SB_URL = isLocal ? 'http://localhost:6006' : '/storybook/index.html';
            const BD_URL = isLocal ? 'http://localhost:5174' : '/builder/index.html';
            const items = [
              {
                icon: '◧',
                title: 'Blocks',
                desc: 'Copy-paste real-world UI patterns and page layouts.',
                route: '/blocks',
                color: 'from-amber-500/10 to-amber-500/5 border-amber-500/20',
                external: false,
              },
              {
                icon: '◉',
                title: 'Changelog',
                desc: 'Track new features, fixes, and releases.',
                route: '/changelog',
                color: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20',
                external: false,
              },
              {
                icon: '◈',
                title: 'Storybook',
                desc: 'Tweak props live, browse every component variant, run a11y checks.',
                route: SB_URL,
                color: 'from-pink-500/10 to-pink-500/5 border-pink-500/20',
                external: true,
              },
              {
                icon: '⬡',
                title: 'Page Builder',
                desc: 'Drag-and-drop visual builder for full pages and apps.',
                route: BD_URL,
                color: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20',
                external: true,
              },
            ];
            return items.map((item) => {
              const inner = (
                <>
                  <div className='flex items-start justify-between mb-3'>
                    <NavIcon icon={item.icon} className='text-primary w-6 h-6' />
                    {item.external && (
                      <svg className='w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-foreground transition-colors' aria-hidden='true' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
                        <path d='M7 17L17 7' />
                        <path d='M9 7h8v8' />
                      </svg>
                    )}
                  </div>
                  <h3 className='font-semibold text-foreground mb-1 group-hover:text-primary transition-colors'>
                    {item.title}
                  </h3>
                  <p className='text-xs text-muted-foreground leading-relaxed'>{item.desc}</p>
                </>
              );
              return item.external ? (
                <a
                  key={item.title}
                  href={item.route}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`group rounded-xl border p-5 text-left bg-gradient-to-br ${item.color} hover:shadow-md transition-all`}
                >
                  {inner}
                </a>
              ) : (
                <button
                  key={item.title}
                  onClick={() => navigate(item.route)}
                  className={`group rounded-xl border p-5 text-left bg-gradient-to-br ${item.color} hover:shadow-md transition-all`}
                >
                  {inner}
                </button>
              );
            });
          })()}
        </div>
      </div>

      {/* CTA */}
      <div className='relative text-center py-16 rounded-2xl overflow-hidden'>
        <div className='absolute inset-0 hero-gradient' />
        <div className='absolute inset-0 dot-pattern opacity-30' />
        <div className='relative z-10'>
          <h2 className='text-3xl font-bold text-foreground mb-3'>
            Ready to <span className='gradient-text'>build</span>?
          </h2>
          <p className='text-muted-foreground mb-8 max-w-md mx-auto'>
            Start with a single CLI command. Add components as you need them.
          </p>
          <button
            onClick={() => navigate('/getting-started')}
            className='group inline-flex items-center gap-2 h-12 px-8 rounded-xl btn-gradient font-medium text-sm transition-all shadow-lg hover:shadow-xl cta-glow'
          >
            Get Started Now
            <IconArrowRight size={16} className='group-hover:translate-x-1 transition-transform' />
          </button>
        </div>
      </div>
    </div>
  );
}
