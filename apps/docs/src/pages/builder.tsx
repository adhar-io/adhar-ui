import React, { useState } from 'react';

// ─── Builder Page ─────────────────────────────────────────────────────────────
// Embeds the standalone Builder app (apps/builder) via iframe.
// Dev: localhost:5174 | Prod: /builder/index.html

const BUILDER_DEV_URL = 'http://localhost:5174';
const BUILDER_PROD_URL = '/builder/index.html';

function getBuilderUrl(): string {
  // In development, connect to the builder dev server
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return BUILDER_DEV_URL;
  }
  return BUILDER_PROD_URL;
}

export function BuilderPage({ navigate }: { navigate: (path: string) => void }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const builderUrl = getBuilderUrl();

  return (
    <div className='h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden'>
      {/* Top bar with back navigation */}
      <div className='h-9 bg-card border-b border-border flex items-center px-3 shrink-0 gap-2'>
        <button
          onClick={() => navigate('/')}
          className='flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors'
        >
          <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M10 19l-7-7m0 0l7-7m-7 7h18' />
          </svg>
          Docs
        </button>
        <div className='w-px h-4 bg-border' />
        <div className='flex items-center gap-1.5'>
          <div className='w-4 h-4 rounded bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center'>
            <span className='text-white text-[7px] font-bold'>A</span>
          </div>
          <span className='text-[12px] font-semibold text-foreground'>Adhar UI Builder</span>
        </div>
        <div className='flex-1' />
        <button
          onClick={() => window.open(builderUrl, '_blank')}
          className='flex items-center gap-1 px-2 py-1 rounded text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors'
        >
          <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25' />
          </svg>
          Open in new tab
        </button>
      </div>

      {/* Iframe container */}
      <div className='flex-1 relative'>
        {loading && !error && (
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-background z-10'>
            <div className='w-8 h-8 border-2 border-muted-foreground/20 border-t-primary rounded-full animate-spin mb-3' />
            <p className='text-sm text-muted-foreground'>Loading Builder...</p>
            <p className='text-xs text-muted-foreground/50 mt-1'>Connecting to {builderUrl}</p>
          </div>
        )}
        {error && (
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-background z-10'>
            <div className='text-4xl mb-3'>!</div>
            <p className='text-sm font-medium text-foreground'>Builder not available</p>
            <p className='text-xs text-muted-foreground mt-1 max-w-sm text-center'>
              The Builder app needs to be running. Start it with:
            </p>
            <code className='mt-3 px-4 py-2 rounded-lg bg-muted text-xs font-mono'>
              deno task builder:dev
            </code>
            <p className='text-xs text-muted-foreground/50 mt-2'>Expected at {builderUrl}</p>
            <button
              onClick={() => { setError(false); setLoading(true); }}
              className='mt-4 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted/50 transition-colors'
            >
              Retry
            </button>
          </div>
        )}
        <iframe
          src={builderUrl}
          className='w-full h-full border-0'
          title='Adhar UI Builder'
          onLoad={() => setLoading(false)}
          onError={() => { setLoading(false); setError(true); }}
          allow='clipboard-read; clipboard-write'
          style={{ display: error ? 'none' : 'block' }}
        />
      </div>
    </div>
  );
}
