import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

/* ─── Chat ────────────────────────────────────────────────────────── */

function Chat({ showTyping = false, messageCount = 3 }: { showTyping?: boolean; messageCount?: number }) {
  const allMsgs = [
    { id: '1', r: 'assistant', c: 'Hello! How can I help?' },
    { id: '2', r: 'user', c: 'What is Adhar UI?' },
    { id: '3', r: 'assistant', c: 'A framework-agnostic design system with components you own.' },
    { id: '4', r: 'user', c: 'Which frameworks are supported?' },
    { id: '5', r: 'assistant', c: 'React, Vue, Angular, Svelte, and Solid.' },
    { id: '6', r: 'user', c: 'How do I install it?' },
    { id: '7', r: 'assistant', c: 'Run `npx adhar-ui init` to get started.' },
    { id: '8', r: 'user', c: 'Can I customize the theme?' },
    { id: '9', r: 'assistant', c: 'Yes, Adhar UI supports full theming via CSS variables.' },
    { id: '10', r: 'user', c: 'Thanks!' },
  ];
  const [msgs, setMsgs] = useState(allMsgs.slice(0, messageCount));
  const [inp, setInp] = useState('');
  React.useEffect(() => { setMsgs(allMsgs.slice(0, messageCount)); }, [messageCount]);
  const send = () => { if (!inp.trim()) return; setMsgs([...msgs, { id: Date.now().toString(), r: 'user', c: inp }]); setInp(''); };
  return (
    <div className='h-72 max-w-lg rounded-lg border flex flex-col'>
      <div className='flex-1 overflow-y-auto p-4 space-y-3'>
        {msgs.map((m) => (
          <div key={m.id} className={cn('flex gap-2', m.r === 'user' && 'justify-end')}>
            {m.r === 'assistant' && (
              <div className='h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[9px]'>AI</div>
            )}
            <div className={cn('max-w-[75%] rounded-lg px-3 py-2 text-sm', m.r === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>{m.c}</div>
          </div>
        ))}
        {showTyping && (
          <div className='flex gap-2'>
            <div className='h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[9px]'>AI</div>
            <div className='rounded-lg bg-muted px-3 py-2 text-sm'>
              <span className='flex gap-1'>
                <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50' style={{ animationDelay: '0ms' }} />
                <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50' style={{ animationDelay: '150ms' }} />
                <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50' style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}
      </div>
      <div className='border-t p-3 flex gap-2'>
        <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder='Message...' className='flex-1 h-9 rounded-md border px-3 text-sm' />
        <button onClick={send} className='h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground'>Send</button>
      </div>
    </div>
  );
}

export const ChatStory: StoryObj<typeof Chat> = {
  name: 'Chat',
  render: (args) => <Chat {...args} />,
  args: { showTyping: false, messageCount: 3 },
  argTypes: {
    showTyping: { control: 'boolean' },
    messageCount: { control: { type: 'number', min: 1, max: 10 } },
  },
};

/* ─── Prompt Input ────────────────────────────────────────────────── */

function PromptInput({ placeholder = 'Ask anything...', disabled = false, showSendButton = true }: { placeholder?: string; disabled?: boolean; showSendButton?: boolean }) {
  const [v, sv] = useState('');
  return (
    <div className={cn('max-w-lg relative rounded-lg border', disabled && 'opacity-50')}>
      <textarea
        value={v}
        onChange={(e) => sv(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className='w-full resize-none bg-transparent px-4 py-3 pr-20 text-sm outline-none disabled:cursor-not-allowed'
        style={{ height: Math.min(Math.max(40, v.split('\n').length * 24), 200) }}
      />
      <div className='absolute bottom-2 right-2 flex items-center gap-2'>
        <span className='text-xs text-muted-foreground'>{v.length}/4000</span>
        {showSendButton && (
          <button disabled={!v.trim() || disabled} className='h-8 w-8 rounded-md bg-primary text-primary-foreground disabled:opacity-50 flex items-center justify-center text-sm'>&rarr;</button>
        )}
      </div>
    </div>
  );
}

export const PromptInputStory: StoryObj<typeof PromptInput> = {
  name: 'Prompt Input',
  render: (args) => <PromptInput {...args} />,
  args: { placeholder: 'Ask anything...', disabled: false, showSendButton: true },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    showSendButton: { control: 'boolean' },
  },
};

/* ─── Streaming Text ──────────────────────────────────────────────── */

function StreamingText({ text = 'Adhar UI is a framework-agnostic design system with production-ready components.', speed = 'normal' }: { text?: string; speed?: 'slow' | 'normal' | 'fast' }) {
  const [d, sd] = useState('');
  const [r, sr] = useState(false);
  const speeds: Record<string, number> = { slow: 60, normal: 25, fast: 8 };
  const start = () => {
    sd(''); sr(true);
    let i = 0;
    const t = setInterval(() => {
      if (i < text.length) { sd(text.slice(0, i + 1)); i++; } else { clearInterval(t); sr(false); }
    }, speeds[speed]);
  };
  return (
    <div className='max-w-lg space-y-3'>
      <button onClick={start} disabled={r} className='h-9 rounded-md border px-3 text-sm hover:bg-accent disabled:opacity-50'>
        &#9654; Stream ({speed})
      </button>
      <div className='rounded-md border p-4 min-h-[60px] text-sm'>
        {d}
        {r && <span className='animate-pulse text-primary'>&#x2588;</span>}
        {!r && !d && <span className='text-muted-foreground'>Click stream to start.</span>}
      </div>
    </div>
  );
}

export const StreamingTextStory: StoryObj<typeof StreamingText> = {
  name: 'Streaming Text',
  render: (args) => <StreamingText {...args} />,
  args: { text: 'Adhar UI is a framework-agnostic design system with production-ready components.', speed: 'normal' },
  argTypes: {
    text: { control: 'text' },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'] },
  },
};

/* ─── Code Block ──────────────────────────────────────────────────── */

function CodeBlock({ language = 'tsx', showLineNumbers = true }: { language?: 'tsx' | 'python' | 'go' | 'bash'; showLineNumbers?: boolean }) {
  const [c, sc] = useState(false);
  const codes: Record<string, { file: string; code: string }> = {
    tsx: { file: 'page.tsx', code: `import { Button } from '@/components/ui/button'\n\nexport default function Page() {\n  return <Button>Click me</Button>\n}` },
    python: { file: 'main.py', code: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"hello": "world"}` },
    go: { file: 'main.go', code: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, world!")\n}` },
    bash: { file: 'setup.sh', code: `#!/bin/bash\nnpx adhar-ui init\nnpx adhar-ui add button\nnpm run dev` },
  };
  const { file, code } = codes[language];
  return (
    <div className='max-w-lg rounded-lg border bg-zinc-950 text-zinc-50'>
      <div className='flex items-center justify-between border-b border-zinc-800 px-4 py-2'>
        <span className='text-xs text-zinc-400'>{file}</span>
        <button onClick={() => { navigator.clipboard?.writeText(code); sc(true); setTimeout(() => sc(false), 2000); }} className='text-xs text-zinc-400 hover:text-zinc-200'>
          {c ? '\u2713 Copied' : 'Copy'}
        </button>
      </div>
      <div className='overflow-x-auto p-4'>
        <pre className='text-sm leading-relaxed'>
          <code>
            {code.split('\n').map((l, i) => (
              <div key={i} className='table-row'>
                {showLineNumbers && <span className='table-cell select-none pr-4 text-right text-zinc-600'>{i + 1}</span>}
                <span className='table-cell'>{l}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export const CodeBlockStory: StoryObj<typeof CodeBlock> = {
  name: 'Code Block',
  render: (args) => <CodeBlock {...args} />,
  args: { language: 'tsx', showLineNumbers: true },
  argTypes: {
    language: { control: 'select', options: ['tsx', 'python', 'go', 'bash'] },
    showLineNumbers: { control: 'boolean' },
  },
};

/* ─── Model Selector ──────────────────────────────────────────────── */

function ModelSelector({ selectedModel = 'claude-3' }: { selectedModel?: 'gpt-4' | 'claude-3' | 'gemini' }) {
  const [sel, setSel] = useState(selectedModel);
  React.useEffect(() => { setSel(selectedModel); }, [selectedModel]);
  const models = [
    { id: 'claude-3', name: 'Claude 4.6 Opus', provider: 'Anthropic' },
    { id: 'gpt-4', name: 'GPT-4.1', provider: 'OpenAI' },
    { id: 'gemini', name: 'Gemini 2.5 Pro', provider: 'Google' },
  ];
  return (
    <div className='max-w-[280px] space-y-2'>
      {models.map((m) => (
        <label key={m.id} onClick={() => setSel(m.id as any)} className={cn(
          'flex items-center gap-3 rounded-lg border p-3 cursor-pointer',
          sel === m.id ? 'border-primary ring-1 ring-primary' : 'hover:bg-accent',
        )}>
          <div className={cn('h-4 w-4 rounded-full border-2', sel === m.id ? 'border-primary bg-primary' : 'border-muted-foreground/30')} />
          <div>
            <p className='text-sm font-medium'>{m.name}</p>
            <p className='text-xs text-muted-foreground'>{m.provider}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

export const ModelSelectorStory: StoryObj<typeof ModelSelector> = {
  name: 'Model Selector',
  render: (args) => <ModelSelector {...args} />,
  args: { selectedModel: 'claude-3' },
  argTypes: { selectedModel: { control: 'select', options: ['gpt-4', 'claude-3', 'gemini'] } },
};

/* ─── Token Counter ───────────────────────────────────────────────── */

function TokenCounter({ used = 3200, max = 4096 }: { used?: number; max?: number }) {
  const p = max > 0 ? used / max : 0;
  return (
    <div className='space-y-2 max-w-xs'>
      <div className='flex items-center gap-2'>
        <div className='h-2 flex-1 rounded-full bg-secondary'>
          <div className={cn('h-full rounded-full transition-all', p >= 0.8 ? 'bg-destructive' : 'bg-primary')} style={{ width: `${Math.min(p * 100, 100)}%` }} />
        </div>
        <span className={cn('text-xs tabular-nums', p >= 0.8 ? 'text-destructive' : 'text-muted-foreground')}>{used}/{max}</span>
      </div>
      {p >= 0.8 && <p className='text-xs text-destructive'>Warning: approaching token limit</p>}
    </div>
  );
}

export const TokenCounterStory: StoryObj<typeof TokenCounter> = {
  name: 'Token Counter',
  render: (args) => <TokenCounter {...args} />,
  args: { used: 3200, max: 4096 },
  argTypes: {
    used: { control: { type: 'number', min: 0, max: 4096 } },
    max: { control: { type: 'number', min: 1024, max: 8192 } },
  },
};

/* ─── Thinking Indicator ──────────────────────────────────────────── */

function ThinkingIndicator({ variant = 'dots' }: { variant?: 'dots' | 'pulse' | 'spinner' }) {
  return (
    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
      {variant === 'dots' && (
        <div className='flex gap-1'>
          <span className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40' style={{ animationDelay: '0ms' }} />
          <span className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40' style={{ animationDelay: '150ms' }} />
          <span className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40' style={{ animationDelay: '300ms' }} />
        </div>
      )}
      {variant === 'pulse' && (
        <div className='h-4 w-4 animate-pulse rounded-full bg-primary/50' />
      )}
      {variant === 'spinner' && (
        <div className='h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary' />
      )}
      <span>Thinking...</span>
    </div>
  );
}

export const ThinkingIndicatorStory: StoryObj<typeof ThinkingIndicator> = {
  name: 'Thinking Indicator',
  render: (args) => <ThinkingIndicator {...args} />,
  args: { variant: 'dots' },
  argTypes: { variant: { control: 'select', options: ['dots', 'pulse', 'spinner'] } },
};

/* ─── Feedback Buttons ────────────────────────────────────────────── */

function FeedbackButtons({ variant = 'thumbs' }: { variant?: 'thumbs' | 'stars' | 'emoji' }) {
  const [fb, setFb] = useState<number | null>(null);

  if (variant === 'stars') {
    return (
      <div className='flex items-center gap-1'>
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} onClick={() => setFb(s)} className={cn('text-lg', fb !== null && s <= fb ? 'text-yellow-500' : 'text-muted-foreground/30')}>&starf;</button>
        ))}
        {fb !== null && <span className='ml-2 text-sm text-muted-foreground'>{fb}/5</span>}
      </div>
    );
  }

  if (variant === 'emoji') {
    const emojis = ['\u{1F620}', '\u{1F615}', '\u{1F610}', '\u{1F60A}', '\u{1F60D}'];
    return (
      <div className='flex items-center gap-1'>
        {emojis.map((e, i) => (
          <button key={i} onClick={() => setFb(i)} className={cn('rounded-md p-1.5 text-lg hover:bg-accent', fb === i && 'ring-2 ring-primary')}>{e}</button>
        ))}
      </div>
    );
  }

  return (
    <div className='flex items-center gap-1'>
      <button onClick={() => setFb(fb === 1 ? null : 1)} className={cn('rounded-md p-1.5 hover:bg-accent', fb === 1 && 'text-green-500')}>{'\u{1F44D}'}</button>
      <button onClick={() => setFb(fb === 0 ? null : 0)} className={cn('rounded-md p-1.5 hover:bg-accent', fb === 0 && 'text-red-500')}>{'\u{1F44E}'}</button>
      {fb !== null && <span className='ml-2 text-sm text-muted-foreground'>{fb === 1 ? 'Thanks!' : "We'll improve"}</span>}
    </div>
  );
}

export const FeedbackButtonsStory: StoryObj<typeof FeedbackButtons> = {
  name: 'Feedback Buttons',
  render: (args) => <FeedbackButtons {...args} />,
  args: { variant: 'thumbs' },
  argTypes: { variant: { control: 'select', options: ['thumbs', 'stars', 'emoji'] } },
};

/* ─── Suggestion Chips ────────────────────────────────────────────── */

function SuggestionChips({ chips = 5 }: { chips?: number }) {
  const allChips = ['Explain code', 'Write tests', 'Refactor', 'Add types', 'Optimize', 'Debug', 'Document', 'Translate'];
  const shown = allChips.slice(0, chips);
  const [s, ss] = useState<string | null>(null);
  return (
    <div className='space-y-3'>
      <div className='flex flex-wrap gap-2'>
        {shown.map((c) => (
          <button key={c} onClick={() => ss(c)} className={cn(
            'rounded-full border px-3 py-1.5 text-sm',
            s === c ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent',
          )}>{c}</button>
        ))}
      </div>
      {s && <p className='text-sm'>Selected: <strong>{s}</strong></p>}
    </div>
  );
}

export const SuggestionChipsStory: StoryObj<typeof SuggestionChips> = {
  name: 'Suggestion Chips',
  render: (args) => <SuggestionChips {...args} />,
  args: { chips: 5 },
  argTypes: { chips: { control: { type: 'number', min: 3, max: 8 } } },
};

/* ─── Message Bubble ──────────────────────────────────────────────── */

function MessageBubble({ role = 'assistant', content = 'Run `adhar-ui add button` to copy the component to your project.' }: { role?: 'user' | 'assistant'; content?: string }) {
  return (
    <div className={cn('max-w-lg flex gap-3', role === 'user' && 'flex-row-reverse')}>
      <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium'>
        {role === 'user' ? 'You' : 'AI'}
      </div>
      <div className={cn('flex max-w-[75%] flex-col gap-1', role === 'user' && 'items-end')}>
        <div className={cn('rounded-lg px-4 py-2 text-sm', role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>{content}</div>
        <time className='text-[10px] text-muted-foreground'>10:30 AM</time>
      </div>
    </div>
  );
}

export const MessageBubbleStory: StoryObj<typeof MessageBubble> = {
  name: 'Message Bubble',
  render: (args) => <MessageBubble {...args} />,
  args: { role: 'assistant', content: 'Run `adhar-ui add button` to copy the component to your project.' },
  argTypes: {
    role: { control: 'select', options: ['user', 'assistant'] },
    content: { control: 'text' },
  },
};

const meta: Meta = { title: 'Components/AI' };
export default meta;
