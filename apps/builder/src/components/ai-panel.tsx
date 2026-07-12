import React, { useState, useRef, useEffect } from 'react';
import type { AIMessage, CanvasNode } from '../lib/builder-types';

// ─── Types ──────────────────────────────────────────────────────────────────

interface AIPanelProps {
  aiMessages: AIMessage[];
  aiPrompt: string;
  aiLoading: boolean;
  aiProvider: 'openai' | 'anthropic' | 'local';
  aiApiKey: string;
  aiModifyMode: boolean;
  isActivePage: boolean;
  selectedNodeIds: string[];
  activeNodes: CanvasNode[];
  onSetPrompt: (prompt: string) => void;
  onSetProvider: (provider: 'openai' | 'anthropic' | 'local') => void;
  onSetApiKey: (key: string) => void;
  onSetModifyMode: (mode: boolean) => void;
  onGenerate: () => void;
  onInsertNodes: (nodes: CanvasNode[]) => void;
  onDismissMessage: (messageId: string) => void;
}

// ─── Provider labels ────────────────────────────────────────────────────────

const PROVIDERS: { id: 'local' | 'anthropic' | 'openai'; label: string }[] = [
  { id: 'local', label: 'Templates' },
  { id: 'anthropic', label: 'Claude' },
  { id: 'openai', label: 'OpenAI' },
];

// ─── Component ──────────────────────────────────────────────────────────────

export function AIPanel({
  aiMessages,
  aiPrompt,
  aiLoading,
  aiProvider,
  aiApiKey,
  aiModifyMode,
  isActivePage,
  selectedNodeIds,
  activeNodes,
  onSetPrompt,
  onSetProvider,
  onSetApiKey,
  onSetModifyMode,
  onGenerate,
  onInsertNodes,
  onDismissMessage,
}: AIPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [aiPrompt]);

  const hasContent = activeNodes.length > 0;

  const emptySuggestions = ['SaaS landing page', 'E-commerce storefront', 'Analytics dashboard', 'Portfolio site', 'Blog home', 'Pricing page', 'Login form'];
  const contentSuggestions = ['Make it minimal', 'Make it bold', 'Add pricing section', 'Add testimonials', 'Add FAQ', 'Add footer', 'Regenerate'];
  const suggestions = hasContent ? contentSuggestions : emptySuggestions;

  function handleSuggestionClick(text: string) {
    onSetPrompt(text);
    // Trigger generation after a tick so state updates
    setTimeout(() => onGenerate(), 0);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (aiPrompt.trim() && !aiLoading) {
        onGenerate();
      }
    }
  }

  function renderNodePreview(nodes: CanvasNode[]) {
    const count = nodes.length;
    const types = nodes.map((n) => n.type).slice(0, 3).join(', ');
    return (
      <span className="text-xs text-muted-foreground">
        {count} element{count !== 1 ? 's' : ''}: {types}
        {count > 3 ? '...' : ''}
      </span>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Provider badge ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-2">
        <span className='text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium'>
          {aiProvider === 'anthropic' ? 'Claude' : aiProvider === 'openai' ? 'GPT' : 'Templates'}
        </span>
        {aiProvider !== 'local' && !aiApiKey && (
          <span className='text-[10px] text-amber-500'>No API key — configure in Settings</span>
        )}
        <div className='flex-1' />
        {aiMessages.length > 0 && (
          <button onClick={() => { /* Could add clear history */ }} className='text-[10px] text-muted-foreground/40 hover:text-muted-foreground transition-colors'>
            {aiMessages.length} messages
          </button>
        )}
      </div>

      {/* ── Message history ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-1 space-y-2 min-h-0">
        {aiMessages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-muted-foreground/50 text-center px-4">
              Describe a UI component or layout and AI will generate it for you.
            </p>
          </div>
        )}

        {aiMessages.map((msg) => {
          if (msg.role === 'system') {
            return (
              <div key={msg.id} className="text-center">
                <span className="text-[10px] text-muted-foreground/50">{msg.content}</span>
              </div>
            );
          }

          if (msg.role === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-xl rounded-br-sm bg-primary/10 px-3 py-2">
                  <p className="text-xs text-foreground whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            );
          }

          // Assistant message
          return (
            <div key={msg.id} className="flex justify-start">
              <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-muted px-3 py-2 space-y-2">
                <p className="text-xs text-foreground whitespace-pre-wrap">{msg.content}</p>

                {msg.nodes && msg.nodes.length > 0 && (
                  <div className="border border-border rounded-lg p-2 bg-background space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-foreground">Generated UI</span>
                      {renderNodePreview(msg.nodes)}
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => onInsertNodes(msg.nodes!)}
                        className="flex-1 text-[11px] font-medium py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        Insert to canvas
                      </button>
                      <button
                        onClick={() => onDismissMessage(msg.id)}
                        className="flex-1 text-[11px] font-medium py-1 rounded-md border border-border text-muted-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading indicator */}
        {aiLoading && (
          <div className="flex justify-start">
            <div className="rounded-xl rounded-bl-sm bg-muted px-3 py-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Modify toggle ──────────────────────────────────────────────── */}
      {selectedNodeIds.length > 0 && (
        <div className="px-1 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={aiModifyMode}
              onChange={(e) => onSetModifyMode(e.target.checked)}
              className="rounded border-border text-primary focus:ring-ring h-3.5 w-3.5"
            />
            <span className="text-xs text-muted-foreground">
              Modify selected ({selectedNodeIds.length} element{selectedNodeIds.length !== 1 ? 's' : ''})
            </span>
          </label>
        </div>
      )}

      {/* ── Prompt input ───────────────────────────────────────────────── */}
      <div className="px-2 pt-2 pb-2">
        <div className="rounded-xl border border-border bg-background overflow-hidden transition-all focus-within:ring-2 focus-within:ring-ring/20 focus-within:border-ring">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            data-ai-input
            value={aiPrompt}
            onChange={(e) => onSetPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isActivePage ? 'Describe what to build...' : 'Select a page first'}
            disabled={!isActivePage || aiLoading}
            rows={2}
            className="w-full text-xs px-3 pt-2.5 pb-1 bg-transparent text-foreground placeholder:text-muted-foreground/35 resize-none outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {/* Action bar */}
          <div className="flex items-center gap-1 px-2 pb-2">
            {/* Image upload */}
            <label className='btn-icon-sm !h-6 !w-6 !min-w-0 cursor-pointer' title='Attach image'>
              <input type='file' accept='image/*' className='hidden' onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => { onSetPrompt(aiPrompt + `\n[Image: ${file.name}]`); };
                  reader.readAsDataURL(file);
                }
                e.target.value = '';
              }} />
              <svg width={13} height={13} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}><rect x='3' y='3' width='18' height='18' rx='2' /><circle cx='8.5' cy='8.5' r='1.5' /><path d='M21 15l-5-5L5 21' /></svg>
            </label>
            {/* Paste from clipboard */}
            <button className='btn-icon-sm !h-6 !w-6 !min-w-0' title='Paste from clipboard' onClick={async () => {
              try { const text = await navigator.clipboard.readText(); if (text) onSetPrompt(aiPrompt + (aiPrompt ? '\n' : '') + text); } catch {}
            }}>
              <svg width={13} height={13} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}><path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6v4H9z' /></svg>
            </button>
            {/* Code context */}
            <button className='btn-icon-sm !h-6 !w-6 !min-w-0' title='Add code context' onClick={() => {
              const ctx = `Current page has ${activeNodes.length} elements. Types: ${[...new Set(activeNodes.map(n => n.type))].join(', ')}`;
              onSetPrompt(aiPrompt + (aiPrompt ? '\n\n' : '') + `[Context: ${ctx}]`);
            }}>
              <svg width={13} height={13} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}><path d='M16 18l6-6-6-6M8 6l-6 6 6 6' /></svg>
            </button>

            <div className='flex-1' />

            {/* Character count */}
            {aiPrompt.length > 0 && (
              <span className='text-[9px] text-muted-foreground/30 tabular-nums mr-1'>{aiPrompt.length}</span>
            )}

            {/* Send button */}
            <button
              onClick={onGenerate}
              disabled={!aiPrompt.trim() || aiLoading || !isActivePage}
              className="h-7 px-3 rounded-lg bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5 disabled:opacity-30 hover:opacity-90 active:scale-[0.97] transition-all"
              title="Generate (⌘↵)"
            >
              {aiLoading ? (
                <div className='flex items-center gap-1'>
                  {[0, 100, 200].map((d) => <div key={d} className='w-1 h-1 rounded-full bg-primary-foreground animate-bounce' style={{ animationDelay: `${d}ms` }} />)}
                </div>
              ) : (
                <>
                  <svg width={12} height={12} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><path d='M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .963L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z' /></svg>
                  Generate
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Smart suggestions ──────────────────────────────────────────── */}
      {isActivePage && !aiLoading && (
        <div className="px-1 pb-2 flex flex-wrap gap-1">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestionClick(s)}
              className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
