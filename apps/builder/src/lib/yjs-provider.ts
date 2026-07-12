// ─── Yjs Collaboration Provider ──────────────────────────────────────────────
// Sets up Yjs document, WebSocket sync, awareness (cursors), and undo manager.

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// ─── Yjs Document (singleton) ────────────────────────────────────────────────
export const ydoc = new Y.Doc();

// ─── WebSocket Provider ──────────────────────────────────────────────────────
const WS_URL = 'ws://localhost:4444';
let provider: WebsocketProvider | null = null;

export function connectProvider(roomName: string): WebsocketProvider {
  if (provider) provider.destroy();
  provider = new WebsocketProvider(WS_URL, roomName, ydoc, {
    connect: true,
    maxBackoffTime: 5000,
  });
  return provider;
}

export function getProvider(): WebsocketProvider | null {
  return provider;
}

export function getAwareness() {
  return provider?.awareness || null;
}

export function disconnectProvider() {
  if (provider) { provider.destroy(); provider = null; }
}

// ─── Shared Data Accessors ───────────────────────────────────────────────────

// Get nodes array for a specific page
export function getYNodes(pageId: string): Y.Array<Y.Map<any>> {
  return ydoc.getArray(`page:${pageId}`);
}

// Get project metadata map (theme, framework, file tree, etc.)
export function getYMeta(): Y.Map<any> {
  return ydoc.getMap('meta');
}

// ─── Undo Manager ────────────────────────────────────────────────────────────
let undoManager: Y.UndoManager | null = null;

export function createUndoManager(pageId: string): Y.UndoManager {
  if (undoManager) undoManager.destroy();
  const yNodes = getYNodes(pageId);
  undoManager = new Y.UndoManager(yNodes, {
    captureTimeout: 300,
  });
  return undoManager;
}

export function getUndoManager(): Y.UndoManager | null {
  return undoManager;
}

export function yjsUndo(): boolean {
  if (undoManager && undoManager.undoStack.length > 0) {
    undoManager.undo();
    return true;
  }
  return false;
}

export function yjsRedo(): boolean {
  if (undoManager && undoManager.redoStack.length > 0) {
    undoManager.redo();
    return true;
  }
  return false;
}

export function canYjsUndo(): boolean {
  return (undoManager?.undoStack.length ?? 0) > 0;
}

export function canYjsRedo(): boolean {
  return (undoManager?.redoStack.length ?? 0) > 0;
}

// ─── Awareness Helpers ───────────────────────────────────────────────────────

const USER_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6'];

export function setLocalUser(name: string) {
  const awareness = getAwareness();
  if (!awareness) return;
  const color = USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
  awareness.setLocalStateField('user', { name, color });
}

export function setLocalCursor(x: number, y: number) {
  const awareness = getAwareness();
  if (!awareness) return;
  awareness.setLocalStateField('cursor', { x, y });
}

export function setLocalSelection(ids: string[]) {
  const awareness = getAwareness();
  if (!awareness) return;
  awareness.setLocalStateField('selectedIds', ids);
}

export interface RemoteUser {
  clientId: number;
  name: string;
  color: string;
  cursor?: { x: number; y: number };
  selectedIds?: string[];
}

export function getRemoteUsers(): RemoteUser[] {
  const awareness = getAwareness();
  if (!awareness) return [];
  const users: RemoteUser[] = [];
  awareness.getStates().forEach((state, clientId) => {
    if (clientId === awareness.clientID) return; // skip self
    if (state.user) {
      users.push({
        clientId,
        name: state.user.name || 'Anonymous',
        color: state.user.color || '#6366f1',
        cursor: state.cursor,
        selectedIds: state.selectedIds,
      });
    }
  });
  return users;
}

// ─── Connection Status ───────────────────────────────────────────────────────
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export function getConnectionStatus(): ConnectionStatus {
  if (!provider) return 'disconnected';
  if (provider.synced) return 'connected';
  return 'connecting';
}
