import React, { useEffect, useRef, useState } from 'react';

// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success';
  className?: string;
}) {
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-border text-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
        variants[variant]
      } ${className}`}
    >
      {children}
    </span>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
export function Tabs({
  tabs,
  className = '',
  variant = 'underline',
}: {
  tabs: { label: string; content: React.ReactNode }[];
  className?: string;
  variant?: 'underline' | 'pills';
}) {
  const [active, setActive] = useState(0);

  if (variant === 'pills') {
    return (
      <div className={className}>
        <div className='inline-flex items-center gap-0.5 p-1 rounded-lg bg-muted/60 border border-border/50'>
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                i === active
                  ? 'bg-background text-foreground shadow-sm ring-1 ring-border/50'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className='mt-3'>{tabs[active]?.content}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className='flex border-b border-border'>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              i === active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            {i === active && (
              <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full' />
            )}
          </button>
        ))}
      </div>
      <div className='mt-4'>{tabs[active]?.content}</div>
    </div>
  );
}

// ─── CodeBlock ────────────────────────────────────────────────────────────────
/**
 * Lightweight regex-based syntax highlighter for code blocks.
 * Supports TSX/JSX, TypeScript, JavaScript, Bash, JSON, CSS.
 * No external dependencies — runs entirely in the browser.
 */
function highlightCode(code: string, language: string): React.ReactNode[] {
  if (language === 'bash' || language === 'sh' || language === 'shell') {
    return highlightBash(code);
  }
  if (language === 'json') {
    return highlightJSON(code);
  }
  if (language === 'css') {
    return highlightCSS(code);
  }
  // Default: TSX / TypeScript / JavaScript
  return highlightTSX(code);
}

function highlightTSX(code: string): React.ReactNode[] {
  // Token patterns ordered by priority
  const patterns: [RegExp, string][] = [
    // Comments
    [/\/\/.*$/gm, 'syn-comment'],
    [/\/\*[\s\S]*?\*\//g, 'syn-comment'],
    // JSX tags: <Component  or </div>  or  />
    [/<\/?[A-Z][A-Za-z0-9.]*/g, 'syn-tag'],
    [/<\/?[a-z][a-z0-9-]*/g, 'syn-tag-html'],
    [/\/?>/g, 'syn-tag-html'],
    // Strings (double, single, template)
    [/"(?:[^"\\]|\\.)*"/g, 'syn-string'],
    [/'(?:[^'\\]|\\.)*'/g, 'syn-string'],
    [/`(?:[^`\\]|\\.)*`/g, 'syn-string'],
    // Keywords
    [/\b(import|export|from|const|let|var|function|return|if|else|for|while|switch|case|break|default|new|typeof|instanceof|class|extends|implements|interface|type|enum|async|await|yield|throw|try|catch|finally|this|super|void|null|undefined|true|false|as|in|of|readonly|keyof|infer|declare|module|namespace|satisfies)\b/g, 'syn-keyword'],
    // JSX attributes
    [/\b(className|onClick|onChange|onSubmit|onFocus|onBlur|onKeyDown|href|src|alt|type|name|value|placeholder|disabled|checked|ref|key|style|id|aria-\w+|data-\w+|tabIndex|role)\b(?=\s*[=])/g, 'syn-attr'],
    // Component/Type names (PascalCase)
    [/\b[A-Z][A-Za-z0-9]+\b/g, 'syn-type'],
    // Numbers
    [/\b\d+(\.\d+)?\b/g, 'syn-number'],
    // Decorators
    [/@\w+/g, 'syn-decorator'],
    // Template literal expressions ${...}
    [/\$\{[^}]*\}/g, 'syn-template-expr'],
  ];

  return tokenize(code, patterns);
}

function highlightBash(code: string): React.ReactNode[] {
  const patterns: [RegExp, string][] = [
    // Comments
    [/#.*$/gm, 'syn-comment'],
    // Strings
    [/"(?:[^"\\]|\\.)*"/g, 'syn-string'],
    [/'(?:[^'\\]|\\.)*'/g, 'syn-string'],
    // Commands/keywords
    [/\b(deno|npx|bunx|npm|pnpm|yarn|bun|run|install|add|init|cd|git|mkdir|rm|ls|echo|export|source|curl|wget|docker|chmod)\b/g, 'syn-keyword'],
    // Flags
    [/\s--?\w[\w-]*/g, 'syn-attr'],
    // Package names with @
    [/@[\w-]+\/[\w-]+/g, 'syn-string'],
  ];

  return tokenize(code, patterns);
}

function highlightJSON(code: string): React.ReactNode[] {
  const patterns: [RegExp, string][] = [
    // Keys (quoted property names before colon)
    [/"(?:[^"\\]|\\.)*"(?=\s*:)/g, 'syn-attr'],
    // String values
    [/"(?:[^"\\]|\\.)*"/g, 'syn-string'],
    // Numbers
    [/\b\d+(\.\d+)?\b/g, 'syn-number'],
    // Booleans and null
    [/\b(true|false|null)\b/g, 'syn-keyword'],
  ];

  return tokenize(code, patterns);
}

function highlightCSS(code: string): React.ReactNode[] {
  const patterns: [RegExp, string][] = [
    // Comments
    [/\/\*[\s\S]*?\*\//g, 'syn-comment'],
    // Selectors (before {)
    [/[\w.#:[\]>+~=-]+(?=\s*\{)/g, 'syn-tag'],
    // Properties
    [/[\w-]+(?=\s*:)/g, 'syn-attr'],
    // Strings
    [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, 'syn-string'],
    // Numbers with units
    [/\b\d+(\.\d+)?(px|rem|em|%|vh|vw|s|ms|deg)?\b/g, 'syn-number'],
    // CSS keywords
    [/\b(var|calc|rgb|hsl|rgba|hsla|url|linear-gradient|radial-gradient)\b/g, 'syn-keyword'],
    // @rules
    [/@\w[\w-]*/g, 'syn-decorator'],
    // CSS variables
    [/--[\w-]+/g, 'syn-template-expr'],
  ];

  return tokenize(code, patterns);
}

/**
 * Generic tokenizer: applies regex patterns to source code and wraps
 * matched tokens in styled spans. Unmatched text is rendered as-is.
 */
function tokenize(code: string, patterns: [RegExp, string][]): React.ReactNode[] {
  // Collect all matches with their positions
  interface Match { start: number; end: number; text: string; cls: string }
  const matches: Match[] = [];

  for (const [pattern, cls] of patterns) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let m;
    while ((m = regex.exec(code)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], cls });
    }
  }

  // Sort by position, then by length (longer matches first for overlaps)
  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  // Remove overlapping matches (keep first/longest)
  const filtered: Match[] = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  }

  // Build React nodes
  const nodes: React.ReactNode[] = [];
  let pos = 0;
  let key = 0;

  for (const m of filtered) {
    if (m.start > pos) {
      nodes.push(<span key={key++}>{code.slice(pos, m.start)}</span>);
    }
    nodes.push(<span key={key++} className={m.cls}>{m.text}</span>);
    pos = m.end;
  }

  if (pos < code.length) {
    nodes.push(<span key={key++}>{code.slice(pos)}</span>);
  }

  return nodes;
}

export function CodeBlock({
  code,
  language = 'tsx',
  filename,
  className = '',
  showLineNumbers = false,
}: {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div
      className={`code-block rounded-lg border border-border/60 overflow-hidden ${className}`}
    >
      {/* Header bar */}
      {filename && (
        <div className='flex items-center justify-between border-b border-white/[0.06] px-3.5 py-2 bg-zinc-900'>
          <div className='flex items-center gap-2.5'>
            <div className='flex gap-1'>
              <span className='w-2.5 h-2.5 rounded-full bg-zinc-700' />
              <span className='w-2.5 h-2.5 rounded-full bg-zinc-700' />
              <span className='w-2.5 h-2.5 rounded-full bg-zinc-700' />
            </div>
            <span className='text-[11px] text-zinc-500 font-mono'>{filename}</span>
          </div>
          <CopyButton copied={copied} onClick={handleCopy} />
        </div>
      )}
      <div className='relative group bg-zinc-950'>
        {!filename && (
          <div className='absolute right-2.5 top-2.5 opacity-0 group-hover:opacity-100 transition-opacity z-10'>
            <CopyButton copied={copied} onClick={handleCopy} />
          </div>
        )}
        <pre className='overflow-x-auto p-3.5 text-[12.5px] leading-[1.65]'>
          <code>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className='table-row'>
                    <span className='table-cell pr-4 text-right text-zinc-600 select-none w-8 text-xs font-mono'>
                      {i + 1}
                    </span>
                    <span className='table-cell'>{highlightCode(line, language)}</span>
                    {'\n'}
                  </span>
                ))
              : highlightCode(code, language)}
          </code>
        </pre>
      </div>
    </div>
  );
}

function CopyButton({ copied, onClick }: { copied: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className='inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-background transition-colors'
    >
      {copied
        ? (
          <>
            <svg
              className='w-3.5 h-3.5 text-emerald-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
            Copied
          </>
        )
        : (
          <>
            <svg
              className='w-3.5 h-3.5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
              />
            </svg>
            Copy
          </>
        )}
    </button>
  );
}

// ─── PropsTable ───────────────────────────────────────────────────────────────
export interface PropDef {
  name: string;
  type: string;
  default: string;
  description: string;
  required?: boolean;
}

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className='overflow-x-auto rounded-lg border border-border'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b border-border bg-muted/50'>
            <th className='text-left px-4 py-3 font-medium text-foreground'>Prop</th>
            <th className='text-left px-4 py-3 font-medium text-foreground'>Type</th>
            <th className='text-left px-4 py-3 font-medium text-foreground'>Default</th>
            <th className='text-left px-4 py-3 font-medium text-foreground'>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}
            >
              <td className='px-4 py-3 font-mono text-sm'>
                <span className='text-primary'>{prop.name}</span>
                {prop.required && <span className='text-destructive ml-0.5'>*</span>}
              </td>
              <td className='px-4 py-3 font-mono text-xs text-muted-foreground max-w-[200px]'>
                <code className='bg-muted rounded px-1.5 py-0.5 break-words'>{prop.type}</code>
              </td>
              <td className='px-4 py-3 font-mono text-xs text-muted-foreground'>
                <code className='bg-muted rounded px-1.5 py-0.5'>{prop.default}</code>
              </td>
              <td className='px-4 py-3 text-muted-foreground'>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── ComponentPreview ─────────────────────────────────────────────────────────
export function ComponentPreview({
  children,
  code,
  title,
  className = '',
}: {
  children: React.ReactNode;
  code: string;
  title?: string;
  className?: string;
}) {
  const [showCode, setShowCode] = useState(false);
  const [bgMode, setBgMode] = useState<'light' | 'dark' | 'dots'>('light');

  const previewBg = bgMode === 'dark'
    ? 'bg-zinc-900 dark'
    : bgMode === 'dots'
    ? 'bg-background bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] bg-[size:16px_16px]'
    : 'bg-background';

  return (
    <div className={`rounded-xl border border-border overflow-hidden shadow-sm ${className}`}>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-border px-4 py-2 bg-muted/30'>
        <div className='flex items-center gap-2'>
          {/* Traffic-light dots */}
          <div className='flex items-center gap-1.5 mr-2'>
            <span className='w-2.5 h-2.5 rounded-full bg-red-400/70' />
            <span className='w-2.5 h-2.5 rounded-full bg-amber-400/70' />
            <span className='w-2.5 h-2.5 rounded-full bg-emerald-400/70' />
          </div>
          {title && <span className='text-xs font-medium text-muted-foreground'>{title}</span>}
        </div>
        <div className='flex items-center gap-1.5'>
          {/* Background swatches */}
          {(['light', 'dark', 'dots'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setBgMode(mode)}
              title={`${mode} background`}
              className={`w-4 h-4 rounded-sm transition-all border ${
                bgMode === mode
                  ? 'ring-2 ring-primary ring-offset-1 ring-offset-background'
                  : 'hover:ring-1 hover:ring-border'
              } ${
                mode === 'light'
                  ? 'bg-white border-zinc-200'
                  : mode === 'dark'
                  ? 'bg-zinc-800 border-zinc-700'
                  : 'bg-white border-zinc-200 bg-[radial-gradient(#ccc_1px,transparent_1px)] bg-[size:4px_4px]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Preview */}
      <div
        className={`p-8 flex items-center justify-center min-h-[160px] transition-colors duration-200 ${previewBg}`}
      >
        <div className='flex flex-wrap items-center gap-4'>{children}</div>
      </div>

      {/* Code Toggle */}
      <div className='border-t border-border'>
        <button
          onClick={() => setShowCode(!showCode)}
          className='flex items-center gap-2 px-4 py-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-full group'
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-150 ${
              showCode ? 'rotate-90' : ''
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
          </svg>
          <span className='font-medium'>{showCode ? 'Hide code' : 'View code'}</span>
          <span className='ml-auto text-[10px] text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity'>
            TSX
          </span>
        </button>
        {showCode && (
          <div className='border-t border-border animate-fade-in'>
            <CodeBlock code={code} showLineNumbers />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── InstallBlock ─────────────────────────────────────────────────────────────
export function InstallBlock({
  component,
  className = '',
}: {
  component: string;
  className?: string;
}) {
  const commands = [
    { label: 'npm', cmd: `npx @adhar-ui/cli add ${component}` },
    { label: 'yarn', cmd: `yarn dlx @adhar-ui/cli add ${component}` },
    { label: 'pnpm', cmd: `pnpm dlx @adhar-ui/cli add ${component}` },
    { label: 'bun', cmd: `bunx @adhar-ui/cli add ${component}` },
    { label: 'deno', cmd: `deno run -A jsr:@adhar-ui/cli add ${component}` },
  ];

  return (
    <Tabs
      variant='pills'
      className={className}
      tabs={commands.map((c) => ({
        label: c.label,
        content: <CodeBlock code={c.cmd} language='bash' />,
      }))}
    />
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
export function PageHeader({
  title,
  description,
  badge,
  children,
}: {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className='mb-6 pb-5 border-b border-border/60'>
      <div className='flex items-center gap-3 mb-1.5'>
        <h1 className='text-2xl font-bold tracking-tight text-foreground'>{title}</h1>
        {badge}
      </div>
      {description && (
        <p className='text-[15px] text-muted-foreground leading-relaxed max-w-3xl'>{description}</p>
      )}
      {children}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function DocCard({
  title,
  description,
  icon,
  onClick,
  href,
  className = '',
  children,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const content = (
    <>
      {icon && <div className='mb-3 text-primary'>{icon}</div>}
      <h3 className='text-base font-semibold text-foreground mb-1'>{title}</h3>
      {description && <p className='text-sm text-muted-foreground leading-relaxed'>{description}
      </p>}
      {children}
    </>
  );

  const cls =
    `rounded-lg border border-border bg-card p-5 transition-all hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 cursor-pointer ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className={cls}>
      {content}
    </div>
  );
}

// ─── Callout ──────────────────────────────────────────────────────────────────
export function Callout({
  type = 'info',
  title,
  children,
  className = '',
}: {
  type?: 'info' | 'warning' | 'tip' | 'danger';
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const styles: Record<string, { border: string; bg: string; icon: React.ReactNode; text: string }> = {
    info: {
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/5',
      icon: <svg className='w-4 h-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><circle cx='12' cy='12' r='10'/><path d='M12 16v-4M12 8h.01'/></svg>,
      text: 'text-blue-600 dark:text-blue-400',
    },
    warning: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/5',
      icon: <svg className='w-4 h-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z'/><path d='M12 9v4M12 17h.01'/></svg>,
      text: 'text-amber-600 dark:text-amber-400',
    },
    tip: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/5',
      icon: <svg className='w-4 h-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path d='M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5'/><path d='M9 18h6M10 22h4'/></svg>,
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    danger: {
      border: 'border-red-500/30',
      bg: 'bg-red-500/5',
      icon: <svg className='w-4 h-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><circle cx='12' cy='12' r='10'/><line x1='12' x2='12' y1='8' y2='12'/><line x1='12' x2='12.01' y1='16' y2='16'/></svg>,
      text: 'text-red-600 dark:text-red-400',
    },
  };
  const s = styles[type];
  return (
    <div className={`rounded-lg border ${s.border} ${s.bg} p-3.5 my-3 ${className}`}>
      <div className={`flex items-center gap-2 font-medium ${s.text} mb-1.5`}>
        {s.icon}
        {title || type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <div className='text-sm text-muted-foreground leading-relaxed'>{children}</div>
    </div>
  );
}

// ─── Step ─────────────────────────────────────────────────────────────────────
export function Steps({ children }: { children: React.ReactNode }) {
  return <div className='space-y-6 ml-4 border-l-2 border-border pl-6 my-6'>{children}</div>;
}

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='relative'>
      <div className='absolute -left-[34px] w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold'>
        {number}
      </div>
      <h3 className='text-lg font-semibold text-foreground mb-2'>{title}</h3>
      <div className='text-muted-foreground text-sm leading-relaxed space-y-3'>{children}</div>
    </div>
  );
}
