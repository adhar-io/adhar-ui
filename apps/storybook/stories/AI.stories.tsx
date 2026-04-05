import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

export const ChatStory: StoryObj = {
  name: 'Chat',
  render: () => {
    const [msgs, setMsgs] = useState([{ id: '1', r: 'assistant', c: 'Hello! How can I help?' }, {
      id: '2',
      r: 'user',
      c: 'What is Adhar UI?',
    }, {
      id: '3',
      r: 'assistant',
      c: 'A framework-agnostic design system with components you own.',
    }]);
    const [inp, setInp] = useState('');
    const send = () => {
      if (!inp.trim()) return;
      setMsgs([...msgs, { id: Date.now().toString(), r: 'user', c: inp }]);
      setInp('');
    };
    return (
      <div className='h-72 max-w-lg rounded-lg border flex flex-col'>
        <div className='flex-1 overflow-y-auto p-4 space-y-3'>
          {msgs.map((m) => (
            <div key={m.id} className={cn('flex gap-2', m.r === 'user' && 'justify-end')}>
              {m.r === 'assistant' && (
                <div className='h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[9px]'>
                  AI
                </div>
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-lg px-3 py-2 text-sm',
                  m.r === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted',
                )}
              >
                {m.c}
              </div>
            </div>
          ))}
        </div>
        <div className='border-t p-3 flex gap-2'>
          <input
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder='Message...'
            className='flex-1 h-9 rounded-md border px-3 text-sm'
          />
          <button
            onClick={send}
            className='h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground'
          >
            Send
          </button>
        </div>
      </div>
    );
  },
};

export const PromptInputStory: StoryObj = {
  name: 'Prompt Input',
  render: () => {
    const [v, sv] = useState('');
    return (
      <div className='max-w-lg relative rounded-lg border'>
        <textarea
          value={v}
          onChange={(e) => sv(e.target.value)}
          placeholder='Ask anything...'
          rows={1}
          className='w-full resize-none bg-transparent px-4 py-3 pr-20 text-sm outline-none'
          style={{ height: Math.min(Math.max(40, v.split('\n').length * 24), 200) }}
        />
        <div className='absolute bottom-2 right-2 flex items-center gap-2'>
          <span className='text-xs text-muted-foreground'>{v.length}/4000</span>
          <button
            disabled={!v.trim()}
            className='h-8 w-8 rounded-md bg-primary text-primary-foreground disabled:opacity-50 flex items-center justify-center text-sm'
          >
            →
          </button>
        </div>
      </div>
    );
  },
};

export const StreamingTextStory: StoryObj = {
  name: 'Streaming Text',
  render: () => {
    const text = 'Adhar UI is a framework-agnostic design system with production-ready components.';
    const [d, sd] = useState('');
    const [r, sr] = useState(false);
    const start = () => {
      sd('');
      sr(true);
      let i = 0;
      const t = setInterval(() => {
        if (i < text.length) {
          sd(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(t);
          sr(false);
        }
      }, 25);
    };
    return (
      <div className='max-w-lg space-y-3'>
        <button
          onClick={start}
          disabled={r}
          className='h-9 rounded-md border px-3 text-sm hover:bg-accent disabled:opacity-50'
        >
          ▶ Stream
        </button>
        <div className='rounded-md border p-4 min-h-[60px] text-sm'>
          {d}
          {r && <span className='animate-pulse text-primary'>▊</span>}
          {!r && !d && <span className='text-muted-foreground'>Click stream to start.</span>}
        </div>
      </div>
    );
  },
};

export const CodeBlockStory: StoryObj = {
  name: 'Code Block',
  render: () => {
    const [c, sc] = useState(false);
    const code =
      `import { Button } from '@/components/ui/button'\n\nexport default function Page() {\n  return <Button>Click me</Button>\n}`;
    return (
      <div className='max-w-lg rounded-lg border bg-zinc-950 text-zinc-50'>
        <div className='flex items-center justify-between border-b border-zinc-800 px-4 py-2'>
          <span className='text-xs text-zinc-400'>page.tsx</span>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(code);
              sc(true);
              setTimeout(() => sc(false), 2000);
            }}
            className='text-xs text-zinc-400 hover:text-zinc-200'
          >
            {c ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <div className='overflow-x-auto p-4'>
          <pre className='text-sm leading-relaxed'><code>{code.split('\n').map((l, i) => <div key={i} className="table-row"><span className="table-cell select-none pr-4 text-right text-zinc-600">{i + 1}</span><span className="table-cell">{l}</span></div>)}</code></pre>
        </div>
      </div>
    );
  },
};

export const ModelSelectorStory: StoryObj = {
  name: 'Model Selector',
  render: () => (
    <select className='h-9 w-full max-w-[250px] rounded-md border px-3 text-sm'>
      <option>Claude 4.6 Opus (Anthropic)</option>
      <option>Claude 4.6 Sonnet (Anthropic)</option>
      <option>GPT-4.1 (OpenAI)</option>
      <option>Gemini 2.5 Pro (Google)</option>
      <option>Llama 4 (Meta)</option>
    </select>
  ),
};

export const TokenCounterStory: StoryObj = {
  name: 'Token Counter',
  render: () => {
    const [u, su] = useState(3200);
    const t = 4096;
    const p = u / t;
    return (
      <div className='space-y-3 max-w-xs'>
        <div className='flex items-center gap-2'>
          <div className='h-2 flex-1 rounded-full bg-secondary'>
            <div
              className={cn(
                'h-full rounded-full transition-all',
                p >= 0.8 ? 'bg-destructive' : 'bg-primary',
              )}
              style={{ width: `${p * 100}%` }}
            />
          </div>
          <span
            className={cn(
              'text-xs tabular-nums',
              p >= 0.8 ? 'text-destructive' : 'text-muted-foreground',
            )}
          >
            {u}/{t}
          </span>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => su(Math.min(t, u + 256))}
            className='h-8 rounded-md border px-3 text-xs'
          >
            +256
          </button>
          <button
            onClick={() => su(Math.max(0, u - 256))}
            className='h-8 rounded-md border px-3 text-xs'
          >
            -256
          </button>
        </div>
      </div>
    );
  },
};

export const ThinkingIndicatorStory: StoryObj = {
  name: 'Thinking Indicator',
  render: () => (
    <div className='space-y-3'>
      {['Thinking', 'Generating response', 'Analyzing code', 'Searching docs'].map((t) => (
        <div key={t} className='flex items-center gap-2 text-sm text-muted-foreground'>
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
          <span>{t}</span>
        </div>
      ))}
    </div>
  ),
};

export const FeedbackButtonsStory: StoryObj = {
  name: 'Feedback Buttons',
  render: () => {
    const [f, sf] = useState<boolean | null>(null);
    return (
      <div className='flex items-center gap-1'>
        <button
          onClick={() => sf(f === true ? null : true)}
          className={cn('rounded-md p-1.5 hover:bg-accent', f === true && 'text-green-500')}
        >
          👍
        </button>
        <button
          onClick={() => sf(f === false ? null : false)}
          className={cn('rounded-md p-1.5 hover:bg-accent', f === false && 'text-red-500')}
        >
          👎
        </button>
        {f !== null && (
          <span className='ml-2 text-sm text-muted-foreground'>
            {f ? 'Thanks!' : "We'll improve"}
          </span>
        )}
      </div>
    );
  },
};

export const SuggestionChipsStory: StoryObj = {
  name: 'Suggestion Chips',
  render: () => {
    const [s, ss] = useState<string | null>(null);
    return (
      <div className='space-y-3'>
        <div className='flex flex-wrap gap-2'>
          {['Explain code', 'Write tests', 'Refactor', 'Add types', 'Optimize'].map((c) => (
            <button
              key={c}
              onClick={() => ss(c)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-sm',
                s === c ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent',
              )}
            >
              {c}
            </button>
          ))}
        </div>
        {s && (
          <p className='text-sm'>
            Selected: <strong>{s}</strong>
          </p>
        )}
      </div>
    );
  },
};

export const MessageBubbleStory: StoryObj = {
  name: 'Message Bubble',
  render: () => (
    <div className='max-w-lg space-y-4'>
      {[{ r: 'user', c: 'How do I add a button?', t: '10:30 AM' }, {
        r: 'assistant',
        c: 'Run `adhar-ui add button` to copy the component to your project.',
        t: '10:30 AM',
      }].map((m, i) => (
        <div key={i} className={cn('flex gap-3', m.r === 'user' && 'flex-row-reverse')}>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium'>
            {m.r === 'user' ? 'You' : 'AI'}
          </div>
          <div className={cn('flex max-w-[75%] flex-col gap-1', m.r === 'user' && 'items-end')}>
            <div
              className={cn(
                'rounded-lg px-4 py-2 text-sm',
                m.r === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted',
              )}
            >
              {m.c}
            </div>
            <time className='text-[10px] text-muted-foreground'>{m.t}</time>
          </div>
        </div>
      ))}
    </div>
  ),
};

const meta: Meta = { title: 'Components/AI' };
export default meta;
