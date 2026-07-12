// ─── Remote Cursors for Multiplayer ──────────────────────────────────────────
// Displays other users' cursors and selections on the canvas.

import React from 'react';
import type { RemoteUser } from '../lib/yjs-provider.ts';

interface RemoteCursorsProps {
  users: RemoteUser[];
}

export function RemoteCursors({ users }: RemoteCursorsProps) {
  return (
    <>
      {users.map((user) => (
        user.cursor && (
          <div key={user.clientId}
            className='pointer-events-none fixed z-50 transition-transform duration-75'
            style={{ transform: `translate(${user.cursor.x}px, ${user.cursor.y}px)` }}>
            {/* Cursor arrow */}
            <svg width={16} height={20} viewBox='0 0 16 20' fill={user.color} className='drop-shadow-md'>
              <path d='M0 0L16 12L8 12L12 20L8 18L4 12L0 16Z' />
            </svg>
            {/* Name label */}
            <div className='absolute left-4 top-4 px-1.5 py-0.5 rounded-md text-[10px] font-medium text-white whitespace-nowrap shadow-sm'
              style={{ backgroundColor: user.color }}>
              {user.name}
            </div>
          </div>
        )
      ))}
    </>
  );
}

// ─── Presence Bar (shows connected users) ────────────────────────────────────

interface PresenceBarProps {
  users: RemoteUser[];
  localName: string;
}

export function PresenceBar({ users, localName }: PresenceBarProps) {
  const allUsers = [{ name: localName, color: '#6366f1', isLocal: true }, ...users.map((u) => ({ ...u, isLocal: false }))];

  if (allUsers.length <= 1) return null;

  return (
    <div className='flex items-center gap-1'>
      {allUsers.slice(0, 5).map((u, i) => (
        <div key={i} className='w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-sm border-2 border-background -ml-1 first:ml-0'
          style={{ backgroundColor: u.color }} title={u.name + (u.isLocal ? ' (you)' : '')}>
          {u.name.charAt(0).toUpperCase()}
        </div>
      ))}
      {allUsers.length > 5 && (
        <div className='w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium text-muted-foreground bg-muted border-2 border-background -ml-1'>
          +{allUsers.length - 5}
        </div>
      )}
    </div>
  );
}
