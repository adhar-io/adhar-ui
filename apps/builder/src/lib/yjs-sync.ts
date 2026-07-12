// ─── Yjs ↔ CanvasNode Bidirectional Sync ─────────────────────────────────────
// Converts between Yjs shared types (Y.Array/Y.Map) and plain CanvasNode objects.

import * as Y from 'yjs';
import type { CanvasNode } from './builder-types.ts';

// ─── CanvasNode → Y.Map (write to Yjs) ──────────────────────────────────────

export function canvasNodeToYMap(node: CanvasNode, doc: Y.Doc): Y.Map<any> {
  const yMap = new Y.Map();
  yMap.set('id', node.id);
  yMap.set('type', node.type);

  // Props as Y.Map for granular updates
  const yProps = new Y.Map();
  Object.entries(node.props).forEach(([k, v]) => yProps.set(k, v));
  yMap.set('props', yProps);

  // Style as Y.Map
  const yStyle = new Y.Map();
  Object.entries(node.style).forEach(([k, v]) => yStyle.set(k, v));
  yMap.set('style', yStyle);

  // Children as Y.Array (recursive)
  const yChildren = new Y.Array();
  node.children.forEach((child) => yChildren.push([canvasNodeToYMap(child, doc)]));
  yMap.set('children', yChildren);

  // Optional fields
  if (node.x !== undefined) yMap.set('x', node.x);
  if (node.y !== undefined) yMap.set('y', node.y);
  if (node.width !== undefined) yMap.set('width', node.width);
  if (node.height !== undefined) yMap.set('height', node.height);
  if (node.interactions) yMap.set('interactions', JSON.stringify(node.interactions));
  if (node.hoverClassName) yMap.set('hoverClassName', node.hoverClassName);
  if (node.hidden) yMap.set('hidden', node.hidden);
  if (node.comments) yMap.set('comments', JSON.stringify(node.comments));
  if (node.componentName) yMap.set('componentName', node.componentName);

  return yMap;
}

// ─── Y.Map → CanvasNode (read from Yjs) ─────────────────────────────────────

export function yMapToCanvasNode(yMap: Y.Map<any>): CanvasNode {
  const props: Record<string, any> = {};
  const yProps = yMap.get('props') as Y.Map<any> | undefined;
  if (yProps) yProps.forEach((v, k) => { props[k] = v; });

  const style: Record<string, string> = {};
  const yStyle = yMap.get('style') as Y.Map<any> | undefined;
  if (yStyle) yStyle.forEach((v, k) => { style[k] = v; });

  const children: CanvasNode[] = [];
  const yChildren = yMap.get('children') as Y.Array<Y.Map<any>> | undefined;
  if (yChildren) yChildren.forEach((yChild) => children.push(yMapToCanvasNode(yChild)));

  const node: CanvasNode = {
    id: yMap.get('id') || '',
    type: yMap.get('type') || 'div',
    props,
    children,
    style,
  };

  // Optional fields
  const x = yMap.get('x'); if (x !== undefined) node.x = x;
  const y = yMap.get('y'); if (y !== undefined) node.y = y;
  const w = yMap.get('width'); if (w !== undefined) node.width = w;
  const h = yMap.get('height'); if (h !== undefined) node.height = h;
  const hcn = yMap.get('hoverClassName'); if (hcn) node.hoverClassName = hcn;
  const hidden = yMap.get('hidden'); if (hidden) node.hidden = hidden;
  const cn = yMap.get('componentName'); if (cn) node.componentName = cn;

  try {
    const ints = yMap.get('interactions');
    if (ints) node.interactions = JSON.parse(ints);
  } catch {}
  try {
    const cmts = yMap.get('comments');
    if (cmts) node.comments = JSON.parse(cmts);
  } catch {}

  return node;
}

// ─── Bulk Operations ─────────────────────────────────────────────────────────

// Read all nodes from a Y.Array into plain CanvasNode[]
export function yArrayToCanvasNodes(yArray: Y.Array<Y.Map<any>>): CanvasNode[] {
  const nodes: CanvasNode[] = [];
  yArray.forEach((yMap) => nodes.push(yMapToCanvasNode(yMap)));
  return nodes;
}

// Write CanvasNode[] into a Y.Array (replaces all content)
export function canvasNodesToYArray(nodes: CanvasNode[], yArray: Y.Array<Y.Map<any>>, doc: Y.Doc) {
  doc.transact(() => {
    yArray.delete(0, yArray.length);
    nodes.forEach((node) => yArray.push([canvasNodeToYMap(node, doc)]));
  });
}

// Add a single node to the Y.Array at a specific index
export function addNodeToYArray(node: CanvasNode, yArray: Y.Array<Y.Map<any>>, doc: Y.Doc, index?: number) {
  const yMap = canvasNodeToYMap(node, doc);
  if (index !== undefined && index < yArray.length) {
    yArray.insert(index, [yMap]);
  } else {
    yArray.push([yMap]);
  }
}

// Remove a node from Y.Array by index
export function removeFromYArray(yArray: Y.Array<Y.Map<any>>, index: number) {
  if (index >= 0 && index < yArray.length) {
    yArray.delete(index, 1);
  }
}

// Find a node in Y.Array by ID and return its index
export function findInYArray(yArray: Y.Array<Y.Map<any>>, nodeId: string): number {
  for (let i = 0; i < yArray.length; i++) {
    const yMap = yArray.get(i);
    if (yMap.get('id') === nodeId) return i;
    // Check children recursively
    const yChildren = yMap.get('children') as Y.Array<Y.Map<any>> | undefined;
    if (yChildren && findInYArray(yChildren, nodeId) >= 0) return i;
  }
  return -1;
}

// ─── Observation ─────────────────────────────────────────────────────────────

// Observe a Y.Array for changes and call back with fresh CanvasNode[]
export function observeYNodes(
  yArray: Y.Array<Y.Map<any>>,
  callback: (nodes: CanvasNode[]) => void
): () => void {
  const handler = () => callback(yArrayToCanvasNodes(yArray));
  yArray.observeDeep(handler);
  return () => yArray.unobserveDeep(handler);
}
