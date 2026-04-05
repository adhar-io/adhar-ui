/**
 * AI component demos — All 10 AI components with full variants.
 * Chat, PromptInput, StreamingText, CodeBlock, ModelSelector,
 * TokenCounter, ThinkingIndicator, FeedbackButtons, SuggestionChips, MessageBubble
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function ChatDemo() {
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant' as const, content: 'Hello! How can I help you today?' },
    { id: '2', role: 'user' as const, content: 'What is Adhar UI?' },
    {
      id: '3',
      role: 'assistant' as const,
      content:
        'Adhar UI is a framework-agnostic design system with components, blocks, and design tool sync. It works with React, Vue, Solid, Svelte, and Angular.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const send = () => {
    if (!input.trim() || loading) return;
    const userMsg = { id: Date.now().toString(), role: 'user' as const, content: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(
        (prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `You said: "${input}". This is a demo response.`,
        }],
      );
      setLoading(false);
    }, 1500);
  };
  return (
    <div className='h-96 max-w-lg rounded-lg border flex flex-col'>
      <div className='border-b px-4 py-3 flex items-center gap-2'>
        <div className='h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold'>
          AI
        </div>
        <span className='text-sm font-semibold'>Adhar Assistant</span>
        <span className='ml-auto text-xs text-muted-foreground'>{messages.length} messages</span>
      </div>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((m) => (
          <div key={m.id} className={cn('flex gap-3', m.role === 'user' ? 'justify-end' : '')}>
            {m.role === 'assistant' && (
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold'>
                AI
              </div>
            )}
            <div
              className={cn(
                'max-w-[75%] rounded-lg px-4 py-2.5 text-sm',
                m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted',
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className='flex gap-3'>
            <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold'>
              AI
            </div>
            <div className='bg-muted rounded-lg px-4 py-2.5 text-sm'>
              <span className='inline-flex gap-1'>
                <span className='animate-bounce'>●</span>
                <span className='animate-bounce' style={{ animationDelay: '0.1s' }}>●</span>
                <span className='animate-bounce' style={{ animationDelay: '0.2s' }}>●</span>
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className='border-t p-3'>
        <div className='flex gap-2'>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder='Type a message...'
            rows={1}
            className='flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function PromptInputDemo() {
  const [value, setValue] = useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [value]);
  return (
    <div className='space-y-4 max-w-lg'>
      <div className='relative rounded-lg border bg-background'>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Ask anything... (Shift+Enter for new line)'
          rows={1}
          className='w-full resize-none bg-transparent px-4 py-3 pr-24 text-sm outline-none placeholder:text-muted-foreground'
        />
        <div className='absolute bottom-2 right-2 flex items-center gap-2'>
          <button
            className='inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent'
            title='Attach file'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48' />
            </svg>
          </button>
          <span className='text-xs text-muted-foreground'>{value.length}/4000</span>
          <button
            disabled={!value.trim()}
            className='inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M5 12h14' />
              <path d='m12 5 7 7-7 7' />
            </svg>
          </button>
        </div>
      </div>
      <p className='text-xs text-muted-foreground text-center'>
        Adhar AI can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}

export function StreamingTextDemo() {
  const text =
    'Adhar UI is a framework-agnostic design system with production-ready components. It works with React, Vue, Solid, Svelte, and Angular. Components are copied to your project — you own the code and can customize freely.';
  const [displayed, setDisplayed] = useState('');
  const [running, setRunning] = useState(false);
  const start = () => {
    setDisplayed('');
    setRunning(true);
    let i = 0;
    const t = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(t);
        setRunning(false);
      }
    }, 20);
  };
  return (
    <div className='max-w-lg space-y-3'>
      <div className='flex gap-2'>
        <button
          onClick={start}
          disabled={running}
          className='h-9 rounded-md border px-3 text-sm hover:bg-accent disabled:opacity-50'
        >
          ▶ Stream text
        </button>
        <button
          onClick={() => {
            setDisplayed('');
            setRunning(false);
          }}
          className='h-9 rounded-md border px-3 text-sm hover:bg-accent'
        >
          ↻ Reset
        </button>
      </div>
      <div className='rounded-md border p-4 min-h-[80px]'>
        <div className='text-sm whitespace-pre-wrap leading-relaxed'>
          {displayed}
          {running && <span className='animate-pulse text-primary'>▊</span>}
        </div>
        {!running && !displayed && (
          <p className='text-sm text-muted-foreground'>
            Click "Stream text" to see the typewriter effect.
          </p>
        )}
      </div>
    </div>
  );
}

export function CodeBlockDemo() {
  const [copied, setCopied] = useState<number | null>(null);
  const blocks = [
    {
      filename: 'app.tsx',
      language: 'typescript',
      code:
        `import { Button } from '@/components/ui/button'\nimport { Card, CardContent } from '@/components/ui/card'\n\nexport default function Page() {\n  return (\n    <Card>\n      <CardContent>\n        <Button variant="outline">Click me</Button>\n      </CardContent>\n    </Card>\n  )\n}`,
    },
    {
      filename: 'terminal',
      language: 'bash',
      code:
        `deno run -A jsr:@adhar-ui/cli init\nadhar-ui add button card dialog\nadhar-ui theme blue`,
    },
  ];
  return (
    <div className='space-y-4 max-w-lg'>
      {blocks.map((block, bi) => (
        <div key={bi} className='rounded-lg border bg-zinc-950 text-zinc-50 overflow-hidden'>
          <div className='flex items-center justify-between border-b border-zinc-800 px-4 py-2'>
            <div className='flex items-center gap-2'>
              <div className='flex gap-1.5'>
                <span className='h-3 w-3 rounded-full bg-zinc-700' />
                <span className='h-3 w-3 rounded-full bg-zinc-700' />
                <span className='h-3 w-3 rounded-full bg-zinc-700' />
              </div>
              <span className='text-xs text-zinc-400'>{block.filename}</span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(block.code);
                setCopied(bi);
                setTimeout(() =>
                  setCopied(null), 2000);
              }}
              className='text-xs text-zinc-400 hover:text-zinc-200 transition-colors'
            >
              {copied === bi ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <div className='overflow-x-auto p-4'>
            <pre className='text-sm leading-relaxed'><code>{block.code.split('\n').map((line, i) => (
            <div key={i} className="table-row"><span className="table-cell select-none pr-4 text-right text-zinc-600 w-8">{i + 1}</span><span className="table-cell">{line}</span></div>
          ))}</code></pre>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ModelSelectorDemo() {
  const [model, setModel] = useState('claude-opus');
  const models = [
    { id: 'claude-opus', name: 'Claude 4.6 Opus', provider: 'Anthropic', badge: 'Most capable' },
    { id: 'claude-sonnet', name: 'Claude 4.6 Sonnet', provider: 'Anthropic', badge: 'Fast' },
    { id: 'gpt-4', name: 'GPT-4.1', provider: 'OpenAI', badge: '' },
    { id: 'gemini', name: 'Gemini 2.5 Pro', provider: 'Google', badge: '' },
    { id: 'llama', name: 'Llama 4', provider: 'Meta', badge: 'Open source' },
  ];
  return (
    <div className='space-y-3 max-w-xs'>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
      >
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name} ({m.provider}){m.badge ? ` — ${m.badge}` : ''}
          </option>
        ))}
      </select>
      <div className='rounded-md border p-3'>
        <p className='text-xs text-muted-foreground'>
          Selected:{' '}
          <span className='font-medium text-foreground'>
            {models.find((m) => m.id === model)?.name}
          </span>
        </p>
      </div>
    </div>
  );
}

export function TokenCounterDemo() {
  const [used, setUsed] = useState(3200);
  const total = 4096;
  const pct = used / total;
  return (
    <div className='space-y-4 max-w-xs'>
      <div className='space-y-2'>
        <div className='flex items-center gap-3'>
          <div className='h-2 flex-1 overflow-hidden rounded-full bg-secondary'>
            <div
              className={cn(
                'h-full transition-all rounded-full',
                pct >= 0.9 ? 'bg-destructive' : pct >= 0.7 ? 'bg-yellow-500' : 'bg-primary',
              )}
              style={{ width: `${Math.min(pct * 100, 100)}%` }}
            />
          </div>
          <span
            className={cn(
              'text-xs tabular-nums font-medium',
              pct >= 0.9
                ? 'text-destructive'
                : pct >= 0.7
                ? 'text-yellow-600'
                : 'text-muted-foreground',
            )}
          >
            {used.toLocaleString()} / {total.toLocaleString()}
          </span>
        </div>
        {pct >= 0.9 && (
          <p className='text-xs text-destructive font-medium'>Warning: approaching token limit</p>
        )}
      </div>
      <div className='flex gap-2'>
        <button
          onClick={() => setUsed(Math.min(total, used + 256))}
          className='h-8 rounded-md border px-3 text-xs hover:bg-accent'
        >
          +256
        </button>
        <button
          onClick={() => setUsed(Math.max(0, used - 256))}
          className='h-8 rounded-md border px-3 text-xs hover:bg-accent'
        >
          -256
        </button>
        <button
          onClick={() => setUsed(0)}
          className='h-8 rounded-md border px-3 text-xs hover:bg-accent'
        >
          Reset
        </button>
        <button
          onClick={() => setUsed(total)}
          className='h-8 rounded-md border px-3 text-xs hover:bg-accent'
        >
          Max
        </button>
      </div>
    </div>
  );
}

export function ThinkingIndicatorDemo() {
  return (
    <div className='space-y-4'>
      {['Thinking', 'Generating response', 'Analyzing code', 'Searching documentation'].map(
        (text) => (
          <div key={text} className='flex items-center gap-2 text-sm text-muted-foreground'>
            <div className='flex gap-1'>
              <span
                className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40'
                style={{ animationDelay: '0ms' }}
              />
              <span
                className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40'
                style={{ animationDelay: '150ms' }}
              />
              <span
                className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40'
                style={{ animationDelay: '300ms' }}
              />
            </div>
            <span>{text}</span>
          </div>
        ),
      )}
    </div>
  );
}

export function FeedbackButtonsDemo() {
  const [feedback, setFeedback] = useState<Record<number, boolean | null>>({
    1: null,
    2: true,
    3: false,
  });
  return (
    <div className='space-y-3'>
      {[1, 2, 3].map((id) => (
        <div key={id} className='flex items-center gap-3'>
          <span className='text-sm text-muted-foreground w-24'>Response {id}</span>
          <div className='flex items-center gap-1'>
            <button
              onClick={() =>
                setFeedback({ ...feedback, [id]: feedback[id] === true ? null : true })}
              className={cn(
                'rounded-md p-1.5 transition-colors hover:bg-accent',
                feedback[id] === true && 'text-green-500',
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill={feedback[id] === true ? 'currentColor' : 'none'}
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M7 10v12' />
                <path d='M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z' />
              </svg>
            </button>
            <button
              onClick={() =>
                setFeedback({ ...feedback, [id]: feedback[id] === false ? null : false })}
              className={cn(
                'rounded-md p-1.5 transition-colors hover:bg-accent',
                feedback[id] === false && 'text-red-500',
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill={feedback[id] === false ? 'currentColor' : 'none'}
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M17 14V2' />
                <path d='M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z' />
              </svg>
            </button>
          </div>
          {feedback[id] === true && <span className='text-xs text-green-600'>Thanks!</span>}
          {feedback[id] === false && <span className='text-xs text-red-600'>We'll improve</span>}
        </div>
      ))}
    </div>
  );
}

export function SuggestionChipsDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const suggestions = [
    'Explain this code',
    'Write unit tests',
    'Refactor for performance',
    'Add error handling',
    'Generate documentation',
    'Convert to TypeScript',
  ];
  return (
    <div className='space-y-3 max-w-md'>
      <p className='text-xs font-medium text-muted-foreground'>
        Click a suggestion to use it as a prompt
      </p>
      <div className='flex flex-wrap gap-2'>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setSelected(s)}
            className={cn(
              'inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition-colors',
              selected === s
                ? 'bg-primary text-primary-foreground border-primary'
                : 'hover:bg-accent hover:text-accent-foreground',
            )}
          >
            {s}
          </button>
        ))}
      </div>
      {selected && (
        <div className='rounded-md border p-3'>
          <p className='text-sm'>
            Selected: <span className='font-medium'>{selected}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export function MessageBubbleDemo() {
  const messages = [
    { role: 'user' as const, content: 'How do I add a button component?', time: '10:30 AM' },
    {
      role: 'assistant' as const,
      content:
        'Run `adhar-ui add button` to add the Button component to your project. It will be copied to `src/components/ui/button.tsx`.',
      time: '10:30 AM',
    },
    { role: 'user' as const, content: 'Can I customize the variants?', time: '10:31 AM' },
    {
      role: 'assistant' as const,
      content:
        'Absolutely! Since you own the code, just edit the `buttonVariants` CVA definition in `button.tsx`. You can add new variants, change existing styles, or modify sizes.',
      time: '10:31 AM',
    },
  ];
  return (
    <div className='max-w-lg space-y-4'>
      {messages.map((m, i) => (
        <div key={i} className={cn('flex gap-3', m.role === 'user' ? 'flex-row-reverse' : '')}>
          <div
            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium'
            style={{
              backgroundColor: m.role === 'user' ? 'hsl(var(--muted))' : 'hsl(var(--primary))',
              color: m.role === 'user'
                ? 'hsl(var(--muted-foreground))'
                : 'hsl(var(--primary-foreground))',
            }}
          >
            {m.role === 'user' ? 'You' : 'AI'}
          </div>
          <div
            className={cn('flex max-w-[75%] flex-col gap-1', m.role === 'user' ? 'items-end' : '')}
          >
            <div
              className={cn(
                'rounded-lg px-4 py-2 text-sm',
                m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted',
              )}
            >
              {m.content}
            </div>
            <time className='text-[10px] text-muted-foreground'>{m.time}</time>
          </div>
        </div>
      ))}
    </div>
  );
}
