/**
 * Monaco Editor wrapper for the builder code view.
 * Uses @monaco-editor/react for full VS Code editor experience.
 */
import React, { useRef, useEffect, useState } from 'react';

interface MonacoEditorProps {
  value: string;
  language: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  theme?: 'vs-dark' | 'light';
  height?: string;
}

// Lazy load Monaco to avoid blocking initial render
let MonacoComponent: any = null;
let monacoLoadPromise: Promise<any> | null = null;

function loadMonaco(): Promise<any> {
  if (MonacoComponent) return Promise.resolve(MonacoComponent);
  if (monacoLoadPromise) return monacoLoadPromise;

  monacoLoadPromise = import('@monaco-editor/react').then((mod) => {
    MonacoComponent = mod.default || mod.Editor;
    return MonacoComponent;
  }).catch(() => {
    // Fallback if Monaco fails to load
    MonacoComponent = null;
    return null;
  });

  return monacoLoadPromise;
}

export function MonacoEditor({ value, language, readOnly = true, onChange, theme = 'vs-dark', height = '100%' }: MonacoEditorProps) {
  const [Editor, setEditor] = useState<any>(MonacoComponent);
  const [loading, setLoading] = useState(!MonacoComponent);

  useEffect(() => {
    if (!MonacoComponent) {
      loadMonaco().then((comp) => {
        setEditor(() => comp);
        setLoading(false);
      });
    }
  }, []);

  // Map our language names to Monaco language IDs
  const langMap: Record<string, string> = {
    tsx: 'typescript',
    jsx: 'javascript',
    ts: 'typescript',
    js: 'javascript',
    html: 'html',
    css: 'css',
    json: 'json',
    text: 'plaintext',
  };

  const monacoLang = langMap[language] || language;

  if (loading || !Editor) {
    // Fallback: simple code display while Monaco loads
    return (
      <div className='w-full h-full bg-[#1e1e1e] overflow-auto' style={{ height }}>
        <div className='flex items-center justify-center h-full'>
          <div className='text-center'>
            <div className='w-6 h-6 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin mx-auto mb-2' />
            <p className='text-xs text-zinc-500'>Loading editor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Editor
      height={height}
      language={monacoLang}
      value={value}
      theme={theme}
      onChange={onChange}
      options={{
        readOnly,
        domReadOnly: readOnly,
        minimap: { enabled: true, scale: 1 },
        fontSize: 13,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, monospace",
        fontLigatures: true,
        lineNumbers: 'on',
        renderLineHighlight: 'all',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 12, bottom: 12 },
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        bracketPairColorization: { enabled: true },
        guides: { bracketPairs: true, indentation: true },
        tabSize: 2,
        wordWrap: 'on',
        folding: true,
        foldingStrategy: 'indentation',
        renderWhitespace: 'selection',
        suggestOnTriggerCharacters: !readOnly,
        quickSuggestions: !readOnly,
        formatOnPaste: !readOnly,
        formatOnType: !readOnly,
        contextmenu: true,
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto',
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
        },
      }}
    />
  );
}
