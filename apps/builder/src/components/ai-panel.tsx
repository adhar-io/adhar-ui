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

  const emptySuggestions = ['Landing page', 'Dashboard layout', 'Contact form', 'Blog post'];
  const contentSuggestions = ['Add hero section', 'Add footer', 'Add sidebar', 'Add nav bar'];
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
      {/* ── Provider selector ──────────────────────────────────────────── */}
      <div className="flex rounded-md border border-border overflow-hidden mx-1 mb-2">
        {PROVIDERS.map((p) => (
          <button
            key={p.id}
            onClick={() => onSetProvider(p.id)}
            className={`flex-1 text-xs py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
              aiProvider === p.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-muted-foreground hover:bg-muted'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ── API key input ──────────────────────────────────────────────── */}
      {aiProvider !== 'local' && (
        <div className="px-1 mb-2">
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={aiApiKey}
              onChange={(e) => onSetApiKey(e.target.value)}
              placeholder={`${aiProvider === 'anthropic' ? 'Anthropic' : 'OpenAI'} API Key`}
              className="w-full text-xs px-2 py-1.5 pr-8 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
              title={showApiKey ? 'Hide key' : 'Show key'}
            >
              {showApiKey ? '◉' : '○'}
            </button>
          </div>
        </div>
      )}

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
      <div className="px-1 pt-2 pb-1">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={aiPrompt}
            onChange={(e) => onSetPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isActivePage ? 'Describe a component...' : 'Select a page first'}
            disabled={!isActivePage || aiLoading}
            rows={1}
            className="w-full text-xs px-3 py-2 pr-9 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={onGenerate}
            disabled={!aiPrompt.trim() || aiLoading || !isActivePage}
            className="absolute right-1.5 bottom-1.5 p-1 rounded-md bg-primary text-primary-foreground disabled:opacity-30 hover:opacity-90 transition-opacity"
            title="Send (Cmd+Enter)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground/40 mt-0.5 text-right">Cmd+Enter to send</p>
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
