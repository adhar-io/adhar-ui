// ─── Custom React Flow Node Renderers ────────────────────────────────────────
import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { CanvasNode } from '../lib/builder-types.ts';
import { isContainer } from '../lib/builder-types.ts';

// ─── Type labels and colors ──────────────────────────────────────────────────
const TYPE_META: Record<string, { label: string; color: string; icon: string }> = {
  div: { label: 'Container', color: '#6366f1', icon: '▦' },
  flex: { label: 'Flex Row', color: '#6366f1', icon: '↔' },
  'flex-col': { label: 'Flex Column', color: '#6366f1', icon: '↕' },
  grid: { label: 'Grid', color: '#6366f1', icon: '⊞' },
  section: { label: 'Section', color: '#6366f1', icon: '§' },
  card: { label: 'Card', color: '#8b5cf6', icon: '▣' },
  nav: { label: 'Navbar', color: '#0ea5e9', icon: '☰' },
  footer: { label: 'Footer', color: '#0ea5e9', icon: '▤' },
  sidebar: { label: 'Sidebar', color: '#0ea5e9', icon: '▌' },
  button: { label: 'Button', color: '#f59e0b', icon: '⬡' },
  'btn-secondary': { label: 'Secondary Btn', color: '#f59e0b', icon: '⬡' },
  'btn-outline': { label: 'Outline Btn', color: '#f59e0b', icon: '⬡' },
  'btn-destructive': { label: 'Danger Btn', color: '#ef4444', icon: '⬡' },
  'btn-ghost': { label: 'Ghost Btn', color: '#f59e0b', icon: '⬡' },
  input: { label: 'Input', color: '#10b981', icon: '▭' },
  textarea: { label: 'Textarea', color: '#10b981', icon: '▭' },
  'select-trigger': { label: 'Select', color: '#10b981', icon: '▾' },
  h1: { label: 'H1', color: '#f97316', icon: 'H1' },
  h2: { label: 'H2', color: '#f97316', icon: 'H2' },
  h3: { label: 'H3', color: '#f97316', icon: 'H3' },
  p: { label: 'Paragraph', color: '#64748b', icon: '¶' },
  span: { label: 'Span', color: '#64748b', icon: 'T' },
  badge: { label: 'Badge', color: '#ec4899', icon: '●' },
  avatar: { label: 'Avatar', color: '#ec4899', icon: '◐' },
  'img-placeholder': { label: 'Image', color: '#06b6d4', icon: '◇' },
  separator: { label: 'Divider', color: '#94a3b8', icon: '—' },
  'screen-mobile': { label: 'Mobile Screen', color: '#6366f1', icon: '📱' },
  'screen-tablet': { label: 'Tablet Screen', color: '#6366f1', icon: '📲' },
  'screen-desktop': { label: 'Desktop Screen', color: '#6366f1', icon: '🖥' },
  frame: { label: 'Frame', color: '#6366f1', icon: '⬜' },
  'flow-step': { label: 'Flow Step', color: '#8b5cf6', icon: '⬡' },
  'data-model': { label: 'Data Model', color: '#0ea5e9', icon: '🗄' },
  'api-endpoint': { label: 'API Endpoint', color: '#8b5cf6', icon: '🌐' },
  note: { label: 'Note', color: '#eab308', icon: '📌' },
  'shape-rect': { label: 'Rectangle', color: '#64748b', icon: '⬜' },
  'shape-circle': { label: 'Circle', color: '#64748b', icon: '⭕' },
  'shape-line': { label: 'Line', color: '#64748b', icon: '—' },
};

function getMeta(type: string) {
  return TYPE_META[type] || { label: type, color: '#6366f1', icon: '•' };
}

// ─── Node Content Preview ────────────────────────────────────────────────────
function NodePreview({ node }: { node: CanvasNode }) {
  const text = typeof node.props.children === 'string' ? node.props.children : '';
  const meta = getMeta(node.type);

  // Input/Textarea
  if (node.type === 'input' || node.type === 'textarea') {
    return (
      <div className='w-full rounded-md border border-border/60 bg-background px-2.5 py-1.5 text-xs text-muted-foreground/40'>
        {node.props.placeholder || 'Enter text...'}
      </div>
    );
  }

  // Button variants
  if (node.type === 'button' || node.type.startsWith('btn-')) {
    const isDestructive = node.type === 'btn-destructive';
    const isOutline = node.type === 'btn-outline';
    const isGhost = node.type === 'btn-ghost';
    return (
      <div className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium ${
        isDestructive ? 'bg-destructive text-destructive-foreground' :
        isOutline ? 'border border-border text-foreground' :
        isGhost ? 'text-foreground' :
        'bg-primary text-primary-foreground'
      }`}>
        {text || 'Button'}
      </div>
    );
  }

  // Badge
  if (node.type === 'badge' || node.type === 'badge-outline') {
    return (
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        node.type === 'badge-outline' ? 'border border-border' : 'bg-primary text-primary-foreground'
      }`}>
        {text || 'Badge'}
      </span>
    );
  }

  // Separator
  if (node.type === 'separator') return <div className='h-px w-full bg-border' />;

  // Progress
  if (node.type === 'progress-bar') {
    return (
      <div className='w-full h-2 rounded-full bg-secondary overflow-hidden'>
        <div className='h-full bg-primary rounded-full' style={{ width: `${node.props['data-value'] || 66}%` }} />
      </div>
    );
  }

  // Headings
  if (node.type === 'h1') return <div className='text-xl font-bold truncate'>{text || 'Heading'}</div>;
  if (node.type === 'h2') return <div className='text-lg font-semibold truncate'>{text || 'Subheading'}</div>;
  if (node.type === 'h3') return <div className='text-sm font-medium truncate'>{text || 'Title'}</div>;

  // Text
  if (node.type === 'p' || node.type === 'span' || node.type === 'blockquote') {
    return <div className='text-xs text-muted-foreground truncate'>{text || 'Text content'}</div>;
  }

  // Image placeholder
  if (node.type === 'img-placeholder') {
    return (
      <div className='w-full aspect-video rounded-md bg-muted flex items-center justify-center text-muted-foreground/30'>
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1}><rect x='3' y='3' width='18' height='18' rx='2' /><circle cx='8.5' cy='8.5' r='1.5' /><path d='M21 15l-5-5L5 21' /></svg>
      </div>
    );
  }

  // Note
  if (node.type === 'note') {
    return <div className='text-xs italic text-yellow-800 dark:text-yellow-200'>{text || 'Add note...'}</div>;
  }

  // Containers / sections — show type label
  if (isContainer(node.type) && !text) {
    return (
      <div className='text-[10px] text-muted-foreground/30 italic'>{meta.label}</div>
    );
  }

  // Default — show text or type
  return <div className='text-xs truncate'>{text || ''}</div>;
}

// ─── Layout Node ─────────────────────────────────────────────────────────────
export const LayoutNode = memo(({ data, selected }: NodeProps) => {
  const node = data as unknown as CanvasNode;
  const meta = getMeta(node.type);
  const isCont = isContainer(node.type);

  return (
    <div className={`rounded-lg border bg-card shadow-sm transition-shadow ${selected ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-border/60 hover:border-border hover:shadow'}`}
      style={{ minWidth: 140, minHeight: 40, maxWidth: 600 }}>

      {/* Header bar */}
      <div className='flex items-center gap-1.5 px-2 py-1 border-b border-border/40 bg-muted/20 rounded-t-lg'>
        <span className='text-[10px]' style={{ color: meta.color }}>{meta.icon}</span>
        <span className='text-[10px] font-medium text-muted-foreground truncate'>{meta.label}</span>
        {node.comments?.some((c) => !c.resolved) && <span className='w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0' />}
        {(node.interactions?.length || 0) > 0 && <span className='text-[8px] text-primary/50'>⚡</span>}
        {node.hidden && <span className='text-[8px] text-muted-foreground/30'>Hidden</span>}
      </div>

      {/* Content area */}
      <div className='px-2 py-1.5'>
        <NodePreview node={node} />
      </div>

      {/* Empty container drop zone */}
      {isCont && node.children.length === 0 && (
        <div className='mx-2 mb-2 flex items-center justify-center py-3 border border-dashed border-border/30 rounded-md text-[10px] text-muted-foreground/20'>
          Drop children here
        </div>
      )}
    </div>
  );
});
LayoutNode.displayName = 'LayoutNode';

// ─── Freeform Node ───────────────────────────────────────────────────────────
export const FreeformNode = memo(({ data, selected }: NodeProps) => {
  const node = data as unknown as CanvasNode;
  const meta = getMeta(node.type);

  return (
    <div className={`rounded-lg border bg-card shadow-sm transition-shadow ${selected ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-border/60 hover:border-border hover:shadow'}`}
      style={{ minWidth: node.width || 160, minHeight: node.height || 60, maxWidth: 800 }}>

      {/* Connection handles */}
      <Handle type='target' position={Position.Top} className='!w-2 !h-2 !bg-primary !border-card !border-2' />
      <Handle type='source' position={Position.Bottom} className='!w-2 !h-2 !bg-primary !border-card !border-2' />
      <Handle type='target' position={Position.Left} className='!w-2 !h-2 !bg-primary !border-card !border-2' />
      <Handle type='source' position={Position.Right} className='!w-2 !h-2 !bg-primary !border-card !border-2' />

      {/* Header */}
      <div className='flex items-center gap-1.5 px-2 py-1 border-b border-border/40 bg-muted/20 rounded-t-lg'>
        <span className='text-[10px]' style={{ color: meta.color }}>{meta.icon}</span>
        <span className='text-[10px] font-medium text-muted-foreground truncate'>{meta.label}</span>
        {node.comments?.some((c) => !c.resolved) && <span className='w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0' />}
        {(node.interactions?.length || 0) > 0 && <span className='text-[8px] text-primary/50'>⚡</span>}
      </div>

      {/* Content */}
      <div className='px-2 py-1.5'>
        <NodePreview node={node} />
      </div>

      {/* Resize handle */}
      {selected && (
        <div className='absolute bottom-0 right-0 w-3 h-3 cursor-se-resize rounded-br-lg' style={{ borderRight: '2px solid hsl(var(--primary))', borderBottom: '2px solid hsl(var(--primary))' }} />
      )}
    </div>
  );
});
FreeformNode.displayName = 'FreeformNode';

// ─── Node type registry ──────────────────────────────────────────────────────
export const nodeTypes = {
  layout: LayoutNode,
  freeform: FreeformNode,
};
