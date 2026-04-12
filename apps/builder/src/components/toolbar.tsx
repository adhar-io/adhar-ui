import React, { useState, useRef, useEffect } from 'react';

interface ToolbarProps {
  viewMode: 'design' | 'code' | 'preview';
  zoom: number;
  devicePreview: 'desktop' | 'tablet' | 'mobile';
  isActivePage: boolean;
  activeFilePath: string;
  elementCount: number;
  fileLanguage: string | undefined;
  canUndo: boolean;
  canRedo: boolean;
  hasSelection: boolean;
  hasClipboard: boolean;
  openMenu: string | null;
  menus: Array<{ id: string; label: string; items: any[] }>;
  canvasBg: 'white' | 'dots' | 'dark';
  onUndo: () => void;
  onRedo: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onClearCanvas: () => void;
  onViewMode: (mode: 'design' | 'code' | 'preview') => void;
  onZoom: (zoom: number) => void;
  onDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  onCanvasBg: (bg: 'white' | 'dots' | 'dark') => void;
  onAddNode: (type: string) => void;
  onSetMenu: (menuId: string | null) => void;
}

const I = ({ d, s = 14 }: { d: string; s?: number }) => (
  <svg width={s} height={s} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round'><path d={d} /></svg>
);

export function Toolbar(props: ToolbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { props.onSetMenu(null); setZoomOpen(false); } };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [props.onSetMenu]);

  const viewModes = [
    { id: 'design' as const, label: 'Design', d: 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' },
    { id: 'code' as const, label: 'Code', d: 'M16 18l6-6-6-6M8 6l-6 6 6 6' },
    { id: 'preview' as const, label: 'Preview', d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
  ];

  return (
    <div ref={ref} className='flex items-center h-11 px-2 gap-1.5 bg-card border-b border-border select-none shrink-0'>

      {/* ── Menus ── */}
      <div className='flex items-center gap-0.5 shrink-0'>
        {props.menus.map((menu) => (
          <div key={menu.id} className='relative'>
            <button
              onClick={() => props.onSetMenu(props.openMenu === menu.id ? null : menu.id)}
              onMouseEnter={() => props.openMenu && props.onSetMenu(menu.id)}
              className={`px-2 py-1 text-xs rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${props.openMenu === menu.id ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}`}>
              {menu.label}
            </button>
            {props.openMenu === menu.id && (
              <div className='dropdown left-0 top-full mt-1'>
                {menu.items.map((item: any, i: number) =>
                  item.label === 'separator' ? <div key={i} className='dropdown-separator' /> :
                  <button key={i} onClick={() => { if (!item.disabled) { item.action?.(); props.onSetMenu(null); } }} disabled={item.disabled}
                    className={`dropdown-item ${item.active ? 'text-primary font-medium' : ''}`}>
                    <span>{item.label}</span>
                    {item.shortcut && <kbd className='text-[10px] text-muted-foreground/40 font-mono'>{item.shortcut}</kbd>}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ═══ Center: Design / Code / Preview ═══ */}
      <div className='flex-1 flex justify-center'>
        <div className='flex items-center rounded-lg p-[3px]' style={{ background: 'hsl(var(--muted) / 0.5)', border: '1px solid hsl(var(--border) / 0.6)' }}>
          {viewModes.map((v) => {
            const active = props.viewMode === v.id;
            return (
              <button key={v.id} onClick={() => props.onViewMode(v.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={active ? { background: 'hsl(var(--background))', boxShadow: '0 1px 3px hsl(var(--foreground) / 0.08), 0 0 0 1px hsl(var(--border) / 0.4)' } : undefined}>
                <I d={v.d} s={13} />
                {v.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ Right: Canvas bg + Device + Zoom ═══ */}

      {/* Canvas background (design mode only) */}
      {props.isActivePage && props.viewMode === 'design' && (
        <>
          <div className='toggle-group shrink-0'>
            {([
              { k: 'white' as const, cls: 'bg-background border border-border' },
              { k: 'dots' as const, cls: 'bg-secondary' },
              { k: 'dark' as const, cls: 'bg-foreground' },
            ]).map((b) => (
              <button key={b.k} onClick={() => props.onCanvasBg(b.k)} title={b.k} className={`!px-1 ${props.canvasBg === b.k ? 'active' : ''}`}>
                <div className={`w-3 h-3 rounded-sm ${b.cls}`} />
              </button>
            ))}
          </div>
          <div className='w-px h-5 bg-border mx-0.5 shrink-0' />
        </>
      )}

      {/* Device */}
      <div className='toggle-group shrink-0'>
        {[
          { id: 'desktop' as const, d: 'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zM8 21h8M12 17v4' },
          { id: 'tablet' as const, d: 'M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01' },
          { id: 'mobile' as const, d: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01' },
        ].map((d) => (
          <button key={d.id} onClick={() => props.onDevice(d.id)} title={d.id} className={`!px-1 ${props.devicePreview === d.id ? 'active' : ''}`}>
            <I d={d.d} s={13} />
          </button>
        ))}
      </div>

      {/* Zoom */}
      <div className='toggle-group relative shrink-0'>
        <button onClick={() => props.onZoom(Math.max(25, props.zoom - 25))} className='!px-0.5'><I d='M5 12h14' s={12} /></button>
        <button onClick={() => setZoomOpen(!zoomOpen)} className='!px-1 !min-w-[40px] text-xs tabular-nums font-mono'>{props.zoom}%</button>
        <button onClick={() => props.onZoom(Math.min(200, props.zoom + 25))} className='!px-0.5'><I d='M12 5v14M5 12h14' s={12} /></button>
        {zoomOpen && (
          <div className='dropdown right-0 top-full mt-1 min-w-[72px]'>
            {[25, 50, 75, 100, 125, 150, 200].map((z) => (
              <button key={z} onClick={() => { props.onZoom(z); setZoomOpen(false); }}
                className={`dropdown-item tabular-nums ${props.zoom === z ? 'text-primary font-medium' : ''}`}>{z}%</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
