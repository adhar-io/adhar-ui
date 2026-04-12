import React, { useState } from 'react';
import type { CanvasNode } from '../lib/builder-types.ts';
import { isContainer } from '../lib/builder-types.ts';

// ─── Types ──────────────────────────────────────────────────────────────────

interface OutlinePanelProps {
  nodes: CanvasNode[];
  selectedNodeIds: string[];
  onSelect: (nodeId: string) => void;
}

// ─── Outline Panel ──────────────────────────────────────────────────────────

export function OutlinePanel({ nodes, selectedNodeIds, onSelect }: OutlinePanelProps) {
  if (nodes.length === 0) {
    return (
      <div className='p-1'>
        <p className='text-center text-[10px] text-muted-foreground/40 py-8'>Empty canvas</p>
      </div>
    );
  }

  return (
    <div className='p-1'>
      {nodes.map((node) => (
        <OutlineNode
          key={node.id}
          node={node}
          depth={0}
          selectedNodeIds={selectedNodeIds}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

// ─── Outline Node ───────────────────────────────────────────────────────────

function OutlineNode({
  node,
  depth,
  selectedNodeIds,
  onSelect,
}: {
  node: CanvasNode;
  depth: number;
  selectedNodeIds: string[];
  onSelect: (nodeId: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const isSel = selectedNodeIds.includes(node.id);
  const isCont = isContainer(node.type);
  const hasChildren = node.children.length > 0;
  const text = typeof node.props.children === 'string'
    ? node.props.children.slice(0, 20)
    : '';

  function handleClick() {
    onSelect(node.id);
  }

  function handleChevronClick(e: React.MouseEvent) {
    e.stopPropagation();
    setCollapsed((prev) => !prev);
  }

  return (
    <>
      <button
        onClick={handleClick}
        style={{ paddingLeft: depth * 12 + 4 }}
        className={`w-full text-left py-[2px] px-1 rounded-md text-[10px] flex items-center gap-1 ${
          isSel
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-muted-foreground hover:bg-muted/50'
        }`}
      >
        {isCont ? (
          <span
            className='text-[10px] cursor-pointer select-none'
            onClick={handleChevronClick}
          >
            {collapsed ? '▸' : '▾'}
          </span>
        ) : (
          <span className='w-2' />
        )}
        <span className='truncate'>
          {node.type}
          {text ? `: ${text}` : ''}
        </span>
        {hasChildren && (
          <span className='text-[10px] text-muted-foreground/30 ml-auto px-1 py-0.5 rounded-md bg-muted/40'>
            {node.children.length}
          </span>
        )}
      </button>
      {!collapsed &&
        node.children.map((c) => (
          <OutlineNode
            key={c.id}
            node={c}
            depth={depth + 1}
            selectedNodeIds={selectedNodeIds}
            onSelect={onSelect}
          />
        ))}
    </>
  );
}
