// ─── Collaboration & Feedback Panel ───────────────────────────────────────────
// Multi-user comments, feedback threads, and design review on the project.

import React, { useState, useRef, useEffect } from 'react';
import type { CanvasNode } from '../lib/builder-types.ts';
import type { RemoteUser } from '../lib/yjs-provider.ts';

export interface ProjectComment {
  id: string;
  author: string;
  authorColor: string;
  text: string;
  timestamp: number;
  targetNodeId?: string;      // linked to a specific element
  targetNodeType?: string;
  resolved: boolean;
  replies: ProjectComment[];
}

interface CollaboratePanelProps {
  comments: ProjectComment[];
  remoteUsers: RemoteUser[];
  selectedNodeIds: string[];
  nodes: CanvasNode[];
  onAddComment: (comment: ProjectComment) => void;
  onResolveComment: (commentId: string) => void;
  onDeleteComment: (commentId: string) => void;
  onReplyComment: (parentId: string, reply: ProjectComment) => void;
  onSelectNode: (nodeId: string) => void;
}

export function CollaboratePanel({
  comments, remoteUsers, selectedNodeIds, nodes,
  onAddComment, onResolveComment, onDeleteComment, onReplyComment, onSelectNode,
}: CollaboratePanelProps) {
  const [newText, setNewText] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const [linkToElement, setLinkToElement] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const filteredComments = comments.filter((c) => {
    if (filter === 'open') return !c.resolved;
    if (filter === 'resolved') return c.resolved;
    return true;
  });

  const openCount = comments.filter((c) => !c.resolved).length;

  function handleSubmit() {
    if (!newText.trim()) return;
    const selectedNode = selectedNodeIds.length === 1 ? nodes.find((n) => n.id === selectedNodeIds[0]) : null;
    const comment: ProjectComment = {
      id: `pc_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
      author: 'You',
      authorColor: '#6366f1',
      text: newText.trim(),
      timestamp: Date.now(),
      targetNodeId: linkToElement && selectedNode ? selectedNode.id : undefined,
      targetNodeType: linkToElement && selectedNode ? selectedNode.type : undefined,
      resolved: false,
      replies: [],
    };
    onAddComment(comment);
    setNewText('');
    setLinkToElement(false);
  }

  function handleReply(parentId: string) {
    if (!replyText.trim()) return;
    const reply: ProjectComment = {
      id: `pc_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
      author: 'You',
      authorColor: '#6366f1',
      text: replyText.trim(),
      timestamp: Date.now(),
      resolved: false,
      replies: [],
    };
    onReplyComment(parentId, reply);
    setReplyText('');
    setReplyingTo(null);
  }

  function formatTime(ts: number) {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - ts;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  return (
    <div className='flex flex-col h-full'>
      {/* Header with online users */}
      <div className='px-3 py-2 border-b border-border'>
        <div className='flex items-center gap-2 mb-2'>
          <span className='text-xs font-medium text-foreground'>Team</span>
          <div className='flex items-center -space-x-1.5'>
            <div className='w-5 h-5 rounded-full bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center border-2 border-card z-10'>Y</div>
            {remoteUsers.slice(0, 4).map((u) => (
              <div key={u.clientId} className='w-5 h-5 rounded-full text-white text-[8px] font-bold flex items-center justify-center border-2 border-card'
                style={{ backgroundColor: u.color }}>
                {u.name.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
          <span className='text-[10px] text-muted-foreground/40'>{1 + remoteUsers.length} online</span>
        </div>

        {/* Filter */}
        <div className='flex items-center gap-1'>
          {(['all', 'open', 'resolved'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${filter === f ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
              {f === 'all' ? `All (${comments.length})` : f === 'open' ? `Open (${openCount})` : `Resolved (${comments.length - openCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Comments list */}
      <div className='flex-1 overflow-y-auto px-2 py-2 space-y-2'>
        {filteredComments.length === 0 && (
          <div className='flex flex-col items-center justify-center py-8 text-center'>
            <svg className='w-8 h-8 text-muted-foreground/15 mb-2' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1}><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' /></svg>
            <p className='text-xs text-muted-foreground/40'>{filter === 'all' ? 'No comments yet' : `No ${filter} comments`}</p>
            <p className='text-[10px] text-muted-foreground/25 mt-0.5'>Add feedback to collaborate</p>
          </div>
        )}

        {filteredComments.map((comment) => (
          <div key={comment.id} className={`rounded-lg border p-2.5 transition-colors ${comment.resolved ? 'border-border/30 opacity-60' : 'border-border bg-card'}`}>
            {/* Comment header */}
            <div className='flex items-center gap-1.5 mb-1.5'>
              <div className='w-4 h-4 rounded-full text-white text-[7px] font-bold flex items-center justify-center shrink-0'
                style={{ backgroundColor: comment.authorColor }}>
                {comment.author.charAt(0).toUpperCase()}
              </div>
              <span className='text-xs font-medium text-foreground'>{comment.author}</span>
              <span className='text-[10px] text-muted-foreground/40 ml-auto'>{formatTime(comment.timestamp)}</span>
            </div>

            {/* Linked element */}
            {comment.targetNodeId && (
              <button onClick={() => onSelectNode(comment.targetNodeId!)}
                className='flex items-center gap-1 mb-1.5 text-[10px] text-primary/70 hover:text-primary transition-colors'>
                <svg className='w-3 h-3' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}><path d='M15 3h6v6M14 10l6.1-6.1M10 14L3.9 20.1M9 21H3v-6' /></svg>
                {comment.targetNodeType || 'element'}
              </button>
            )}

            {/* Comment text */}
            <p className='text-xs text-foreground leading-relaxed'>{comment.text}</p>

            {/* Actions */}
            <div className='flex items-center gap-2 mt-2'>
              <button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className='text-[10px] text-muted-foreground hover:text-foreground transition-colors'>Reply</button>
              <button onClick={() => onResolveComment(comment.id)}
                className='text-[10px] text-muted-foreground hover:text-foreground transition-colors'>
                {comment.resolved ? 'Reopen' : 'Resolve'}
              </button>
              <button onClick={() => onDeleteComment(comment.id)}
                className='text-[10px] text-muted-foreground hover:text-destructive transition-colors ml-auto'>Delete</button>
            </div>

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className='mt-2 ml-3 pl-2 border-l-2 border-border/40 space-y-2'>
                {comment.replies.map((reply) => (
                  <div key={reply.id}>
                    <div className='flex items-center gap-1.5 mb-0.5'>
                      <div className='w-3 h-3 rounded-full text-white text-[6px] font-bold flex items-center justify-center shrink-0'
                        style={{ backgroundColor: reply.authorColor }}>
                        {reply.author.charAt(0).toUpperCase()}
                      </div>
                      <span className='text-[10px] font-medium text-foreground'>{reply.author}</span>
                      <span className='text-[9px] text-muted-foreground/30'>{formatTime(reply.timestamp)}</span>
                    </div>
                    <p className='text-[11px] text-foreground/80 leading-relaxed'>{reply.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply input */}
            {replyingTo === comment.id && (
              <div className='mt-2 flex gap-1.5'>
                <input value={replyText} onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleReply(comment.id); }}
                  placeholder='Reply...' autoFocus
                  className='input-sm text-[11px] flex-1' />
                <button onClick={() => handleReply(comment.id)}
                  disabled={!replyText.trim()}
                  className='h-7 px-2.5 rounded-md bg-primary text-primary-foreground text-[10px] font-medium disabled:opacity-30 hover:bg-primary/90 transition-colors shrink-0'>
                  Send
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New comment input */}
      <div className='px-2 pt-2 pb-2 border-t border-border'>
        {/* Link to element toggle */}
        {selectedNodeIds.length === 1 && (
          <label className='flex items-center gap-1.5 mb-1.5 cursor-pointer'>
            <input type='checkbox' checked={linkToElement} onChange={(e) => setLinkToElement(e.target.checked)}
              className='rounded accent-primary w-3 h-3' />
            <span className='text-[10px] text-muted-foreground'>
              Link to selected {nodes.find((n) => n.id === selectedNodeIds[0])?.type || 'element'}
            </span>
          </label>
        )}

        <div className='flex gap-1.5'>
          <textarea ref={inputRef} value={newText} onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            placeholder='Add a comment...'
            rows={1}
            className='flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring resize-none transition-all' />
          <button onClick={handleSubmit} disabled={!newText.trim()}
            className='h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 hover:bg-primary/90 active:scale-95 transition-all shrink-0 self-end'>
            <svg width={14} height={14} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><path d='M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z' /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
