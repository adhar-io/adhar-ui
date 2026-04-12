import React, { useState, useEffect } from 'react';
import * as Palette from './lib/builder-palette.ts';
import { MonacoEditor } from './components/monaco-editor.tsx';
import { Toolbar } from './components/toolbar.tsx';
import { CanvasView } from './components/canvas-view.tsx';
import { PropertiesPanel } from './components/properties-panel.tsx';
import { ThemePanel } from './components/theme-panel.tsx';
import { AIPanel } from './components/ai-panel.tsx';
import { FileExplorer } from './components/file-explorer.tsx';
import { OutlinePanel } from './components/outline-panel.tsx';
import { generateCode, generateHTMLPage, nodeToHTML } from './lib/builder-codegen.ts';
import { themePresets, getThemePreset, generateThemeCSS, exportDesignTokens, exportTokensAsCustomProperties, generateWithAI, downloadFile } from './lib/builder-api.ts';
import {
  genId, defaultProject, migratePages,
  findFileInTree, getFilePath, isPageFile, getAllPageFiles,
  updateFileInTree, removeFileFromTree, addFileToFolder, langFromName,
  findNode, addChildToNode, removeNodeFromTree, updateNodeProp, reIdNodes,
  moveNodeInTree, wrapNodeInContainer, insertNodeAt, extractNode, findNodeParent,
  type AppState, type CanvasNode, type ProjectFile, type AIMessage,
} from './lib/builder-types.ts';

// ─── App Shell ───────────────────────────────────────────────────────────────
export function App() {
  const saved = JSON.parse(localStorage.getItem('builder-project') || 'null');
  const legacySaved = JSON.parse(localStorage.getItem('builder-pages') || 'null');
  const initialFiles = saved || migratePages(legacySaved) || defaultProject();
  const firstPage = getAllPageFiles(initialFiles)[0];
  const savedSettings = JSON.parse(localStorage.getItem('builder-settings') || '{}');

  const [s, setS] = useState<AppState>({
    files: initialFiles,
    activeFileId: firstPage?.id || null,
    openFileIds: firstPage ? [firstPage.id] : [],
    selectedNodeIds: [],
    zoom: 100,
    viewMode: 'design',
    framework: savedSettings.framework || 'react',
    theme: savedSettings.theme || 'zinc',
    darkMode: false,
    showRuler: true,
    canvasBg: 'dots',
    aiPrompt: '',
    aiLoading: false,
    aiProvider: savedSettings.aiProvider || 'anthropic',
    aiApiKey: savedSettings.aiApiKey || '',
    aiMessages: [],
    aiModifyMode: false,
    paletteSearch: '',
    leftPanel: 'components',
    rightPanel: 'properties',
    history: [],
    historyIndex: -1,
    clipboard: null,
    openMenu: null,
    renamingFileId: null,
    customTokenOverrides: {},
    devicePreview: 'desktop',
  });

  // ─── Derived state ─────────────────────────────────────────────
  const activeFile = s.activeFileId ? findFileInTree(s.files, s.activeFileId) : null;
  const isActive = activeFile ? isPageFile(activeFile) : false;
  const activeNodes = isActive && activeFile?.nodes ? activeFile.nodes : [];
  const selNode = s.selectedNodeIds.length === 1 ? findNode(activeNodes, s.selectedNodeIds[0]) : null;
  const activeFilePath = s.activeFileId ? getFilePath(s.files, s.activeFileId) : '';
  const pageName = activeFile ? activeFile.name.replace(/\.\w+$/, '').replace(/\s+/g, '') : 'Untitled';
  const pageFiles = getAllPageFiles(s.files);
  const currentTheme = getThemePreset(s.theme);

  // ─── Auto-save ─────────────────────────────────────────────────
  useEffect(() => { localStorage.setItem('builder-project', JSON.stringify(s.files)); }, [s.files]);
  useEffect(() => { localStorage.setItem('builder-settings', JSON.stringify({ framework: s.framework, theme: s.theme, aiProvider: s.aiProvider, aiApiKey: s.aiApiKey })); }, [s.framework, s.theme, s.aiProvider, s.aiApiKey]);

  // Apply theme tokens to document
  useEffect(() => {
    const tokens = s.darkMode ? currentTheme.dark : currentTheme.light;
    const root = document.documentElement;
    Object.entries(tokens).forEach(([key, value]) => {
      const override = s.customTokenOverrides[key];
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, override || value);
    });
    if (s.darkMode) root.classList.add('dark'); else root.classList.remove('dark');
  }, [s.theme, s.darkMode, s.customTokenOverrides]);

  // ─── Node operations ───────────────────────────────────────────
  function updateNodes(fn: (nodes: CanvasNode[]) => CanvasNode[]) {
    setS((p) => {
      if (!p.activeFileId) return p;
      const file = findFileInTree(p.files, p.activeFileId);
      if (!file || !isPageFile(file)) return p;
      const old = file.nodes || [];
      const next = fn(old);
      return { ...p, files: updateFileInTree(p.files, p.activeFileId, (f) => ({ ...f, nodes: next })), history: [...p.history.slice(0, p.historyIndex + 1), old], historyIndex: p.historyIndex + 1 };
    });
  }

  function addNode(type: string, parentId?: string) {
    const item = Palette.builtinPalette.flatMap((c) => c.items).find((i) => i.type === type);
    if (!item) return;
    const node: CanvasNode = { id: genId(), type: item.type, props: { ...item.defaultProps }, children: [], style: {} };
    if (parentId) updateNodes((nodes) => addChildToNode(nodes, parentId, node));
    else updateNodes((nodes) => [...nodes, node]);
  }

  function deleteNode(nodeId: string) { updateNodes((nodes) => removeNodeFromTree(nodes, nodeId)); setS((p) => ({ ...p, selectedNodeIds: p.selectedNodeIds.filter((id) => id !== nodeId) })); }
  function updateProp(nodeId: string, key: string, value: string) { updateNodes((nodes) => updateNodeProp(nodes, nodeId, key, value)); }

  function undo() { setS((p) => { if (p.historyIndex < 0 || !p.activeFileId) return p; return { ...p, files: updateFileInTree(p.files, p.activeFileId, (f) => ({ ...f, nodes: p.history[p.historyIndex] })), historyIndex: p.historyIndex - 1, selectedNodeIds: [] }; }); }
  function redo() { setS((p) => { if (p.historyIndex >= p.history.length - 1 || !p.activeFileId) return p; return { ...p, files: updateFileInTree(p.files, p.activeFileId, (f) => ({ ...f, nodes: p.history[p.historyIndex + 2] || f.nodes || [] })), historyIndex: p.historyIndex + 1, selectedNodeIds: [] }; }); }

  function copyNode() {
    const n = s.selectedNodeIds.length === 1 ? findNode(activeNodes, s.selectedNodeIds[0]) : null;
    if (n) setS((p) => ({ ...p, clipboard: JSON.parse(JSON.stringify(n)) }));
  }
  function pasteNode() { if (!s.clipboard) return; updateNodes((nodes) => [...nodes, reIdNodes(s.clipboard!)]); }
  function duplicateNode() { const n = s.selectedNodeIds.length === 1 ? findNode(activeNodes, s.selectedNodeIds[0]) : null; if (n) updateNodes((nodes) => [...nodes, reIdNodes(JSON.parse(JSON.stringify(n)))]); }
  function clearCanvas() { updateNodes(() => []); setS((p) => ({ ...p, selectedNodeIds: [] })); }
  function moveUp(nodeId: string) { updateNodes((nodes) => moveNodeInTree(nodes, nodeId, 'up')); }
  function moveDown(nodeId: string) { updateNodes((nodes) => moveNodeInTree(nodes, nodeId, 'down')); }
  function wrapNode(nodeId: string) { updateNodes((nodes) => wrapNodeInContainer(nodes, nodeId)); }

  function handleSelect(nodeId: string, shiftKey: boolean) {
    setS((p) => {
      if (shiftKey) {
        const ids = p.selectedNodeIds.includes(nodeId) ? p.selectedNodeIds.filter((id) => id !== nodeId) : [...p.selectedNodeIds, nodeId];
        return { ...p, selectedNodeIds: ids, rightPanel: 'properties' };
      }
      return { ...p, selectedNodeIds: [nodeId], rightPanel: 'properties' };
    });
  }

  function handleDropReorder(sourceId: string, targetParentId: string | null, insertIndex: number) {
    updateNodes((nodes) => {
      const { remaining, extracted } = extractNode(JSON.parse(JSON.stringify(nodes)), sourceId);
      if (!extracted) return nodes;
      return insertNodeAt(remaining, extracted, targetParentId, insertIndex);
    });
  }

  // ─── File operations ───────────────────────────────────────────
  function openFile(fileId: string) {
    setS((p) => {
      const file = findFileInTree(p.files, fileId);
      if (!file || file.type === 'folder') return p;
      const openIds = p.openFileIds.includes(fileId) ? p.openFileIds : [...p.openFileIds, fileId];
      return { ...p, activeFileId: fileId, openFileIds: openIds, selectedNodeIds: [], history: [], historyIndex: -1 };
    });
  }
  function closeFile(fileId: string) {
    setS((p) => {
      const openIds = p.openFileIds.filter((fid) => fid !== fileId);
      let activeId = p.activeFileId;
      if (activeId === fileId) { const idx = p.openFileIds.indexOf(fileId); activeId = openIds[Math.min(idx, openIds.length - 1)] || null; }
      return { ...p, openFileIds: openIds, activeFileId: activeId, selectedNodeIds: [] };
    });
  }
  function toggleFolder(folderId: string) { setS((p) => ({ ...p, files: updateFileInTree(p.files, folderId, (f) => ({ ...f, expanded: !f.expanded })) })); }
  function createFile(parentFolderId: string, name: string, asPage: boolean) {
    const fid = `f_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`;
    const lang = langFromName(name);
    const newFile: ProjectFile = asPage ? { id: fid, name, type: 'file', language: lang, nodes: [] } : { id: fid, name, type: 'file', language: lang, content: '' };
    setS((p) => ({ ...p, files: addFileToFolder(p.files, parentFolderId, newFile) }));
    openFile(fid);
  }
  function createFolder(parentFolderId: string, name: string) {
    const fid = `f_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`;
    setS((p) => ({ ...p, files: addFileToFolder(p.files, parentFolderId, { id: fid, name, type: 'folder', children: [], expanded: true }) }));
  }
  function deleteFile(fileId: string) { setS((p) => ({ ...p, files: removeFileFromTree(p.files, fileId), openFileIds: p.openFileIds.filter((fid) => fid !== fileId), activeFileId: p.activeFileId === fileId ? (p.openFileIds.filter((fid) => fid !== fileId)[0] || null) : p.activeFileId, selectedNodeIds: p.activeFileId === fileId ? [] : p.selectedNodeIds })); }
  function renameFile(fileId: string, newName: string) { if (!newName.trim()) return; setS((p) => ({ ...p, files: updateFileInTree(p.files, fileId, (f) => ({ ...f, name: newName.trim(), language: f.type === 'file' ? langFromName(newName.trim()) : f.language })), renamingFileId: null })); }
  function updateFileContent(fileId: string, content: string) { setS((p) => ({ ...p, files: updateFileInTree(p.files, fileId, (f) => ({ ...f, content })) })); }

  // ─── AI ─────────────────────────────────────────────────────────
  async function handleAIGenerate() {
    if (!s.aiPrompt.trim() || s.aiLoading || !isActive) return;
    const userMsg: AIMessage = { id: genId(), role: 'user', content: s.aiPrompt, timestamp: Date.now() };
    setS((p) => ({ ...p, aiLoading: true, aiMessages: [...p.aiMessages, userMsg], aiPrompt: '' }));

    try {
      let nodes: CanvasNode[] = [];
      if (s.aiProvider === 'local') {
        nodes = generateLocalTemplate(s.aiPrompt);
      } else {
        const result = await generateWithAI(s.aiPrompt, s.aiApiKey, s.aiProvider);
        if (result.success && result.nodes) {
          nodes = result.nodes.map(reIdNodes);
        } else {
          const errMsg: AIMessage = { id: genId(), role: 'system', content: `Error: ${result.error}`, timestamp: Date.now() };
          setS((p) => ({ ...p, aiLoading: false, aiMessages: [...p.aiMessages, errMsg] }));
          return;
        }
      }
      const assistantMsg: AIMessage = { id: genId(), role: 'assistant', content: `Generated ${nodes.length} element${nodes.length !== 1 ? 's' : ''}`, nodes, timestamp: Date.now() };
      setS((p) => ({ ...p, aiLoading: false, aiMessages: [...p.aiMessages, assistantMsg] }));
    } catch (e) {
      const errMsg: AIMessage = { id: genId(), role: 'system', content: `Error: ${(e as Error).message}`, timestamp: Date.now() };
      setS((p) => ({ ...p, aiLoading: false, aiMessages: [...p.aiMessages, errMsg] }));
    }
  }

  function insertAINodes(nodes: CanvasNode[]) { updateNodes((old) => [...old, ...nodes.map(reIdNodes)]); }
  function dismissAIMessage(messageId: string) { setS((p) => ({ ...p, aiMessages: p.aiMessages.filter((m) => m.id !== messageId) })); }

  function generateLocalTemplate(prompt: string): CanvasNode[] {
    const lower = prompt.toLowerCase();
    const id = genId;
    if (lower.includes('hero') || lower.includes('landing')) {
      return [{ id: id(), type: 'section', props: { className: 'flex flex-col items-center justify-center py-20 text-center gap-6' }, children: [
        { id: id(), type: 'h1', props: { className: 'text-5xl font-bold tracking-tight', children: 'Build something amazing' }, children: [], style: {} },
        { id: id(), type: 'p', props: { className: 'text-xl text-muted-foreground max-w-2xl', children: 'A modern solution for building beautiful user interfaces.' }, children: [], style: {} },
        { id: id(), type: 'flex', props: { className: 'flex gap-4' }, children: [
          { id: id(), type: 'button', props: { className: 'px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold', children: 'Get Started' }, children: [], style: {} },
          { id: id(), type: 'button', props: { className: 'px-6 py-3 border border-border rounded-lg font-semibold', children: 'Learn More' }, children: [], style: {} },
        ], style: {} },
      ], style: {} }];
    }
    if (lower.includes('card') || lower.includes('pricing')) {
      return [{ id: id(), type: 'grid', props: { className: 'grid grid-cols-3 gap-6' }, children: [1, 2, 3].map((i) => (
        { id: id(), type: 'card', props: { className: 'p-6 rounded-xl border border-border bg-card flex flex-col gap-4' }, children: [
          { id: id(), type: 'h3', props: { className: 'text-lg font-semibold', children: ['Starter', 'Pro', 'Enterprise'][i - 1] }, children: [], style: {} },
          { id: id(), type: 'h2', props: { className: 'text-3xl font-bold', children: ['$9/mo', '$29/mo', '$99/mo'][i - 1] }, children: [], style: {} },
          { id: id(), type: 'button', props: { className: `w-full py-2 rounded-lg font-medium ${i === 2 ? 'bg-primary text-primary-foreground' : 'border border-border'}`, children: 'Choose Plan' }, children: [], style: {} },
        ], style: {} }
      )), style: {} }];
    }
    if (lower.includes('form') || lower.includes('login')) {
      return [{ id: id(), type: 'card', props: { className: 'max-w-md mx-auto p-8 rounded-xl border border-border bg-card flex flex-col gap-5' }, children: [
        { id: id(), type: 'h2', props: { className: 'text-2xl font-bold text-center', children: 'Sign In' }, children: [], style: {} },
        { id: id(), type: 'input', props: { className: 'w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm', placeholder: 'Email address' }, children: [], style: {} },
        { id: id(), type: 'input', props: { className: 'w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm', placeholder: 'Password' }, children: [], style: {} },
        { id: id(), type: 'button', props: { className: 'w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold', children: 'Sign In' }, children: [], style: {} },
      ], style: {} }];
    }
    if (lower.includes('nav') || lower.includes('header')) {
      return [{ id: id(), type: 'nav', props: { className: 'flex items-center justify-between px-6 py-4 border-b border-border' }, children: [
        { id: id(), type: 'span', props: { className: 'text-xl font-bold', children: 'Acme Inc' }, children: [], style: {} },
        { id: id(), type: 'flex', props: { className: 'flex items-center gap-6' }, children: [
          { id: id(), type: 'span', props: { className: 'text-sm text-muted-foreground cursor-pointer', children: 'Products' }, children: [], style: {} },
          { id: id(), type: 'span', props: { className: 'text-sm text-muted-foreground cursor-pointer', children: 'Pricing' }, children: [], style: {} },
          { id: id(), type: 'button', props: { className: 'px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium', children: 'Sign In' }, children: [], style: {} },
        ], style: {} },
      ], style: {} }];
    }
    if (lower.includes('dashboard') || lower.includes('stats')) {
      return [{ id: id(), type: 'flex-col', props: { className: 'flex flex-col gap-6' }, children: [
        { id: id(), type: 'h2', props: { className: 'text-2xl font-bold', children: 'Dashboard' }, children: [], style: {} },
        { id: id(), type: 'grid', props: { className: 'grid grid-cols-4 gap-4' }, children: [
          { l: 'Revenue', v: '$45,231', c: '+20.1%' }, { l: 'Users', v: '+2,350', c: '+180%' },
          { l: 'Sales', v: '+12,234', c: '+19%' }, { l: 'Active', v: '+573', c: '+201' },
        ].map((st: any) => (
          { id: id(), type: 'card', props: { className: 'p-6 rounded-xl border border-border bg-card' }, children: [
            { id: id(), type: 'p', props: { className: 'text-sm text-muted-foreground font-medium', children: st.l }, children: [], style: {} },
            { id: id(), type: 'h3', props: { className: 'text-2xl font-bold mt-1', children: st.v }, children: [], style: {} },
            { id: id(), type: 'p', props: { className: 'text-xs text-green-500 mt-1', children: `${st.c} from last month` }, children: [], style: {} },
          ], style: {} }
        )), style: {} },
      ], style: {} }];
    }
    if (lower.includes('footer')) {
      return [{ id: id(), type: 'footer', props: { className: 'border-t border-border px-6 py-12' }, children: [
        { id: id(), type: 'grid', props: { className: 'grid grid-cols-4 gap-8' }, children: ['Product', 'Company', 'Resources', 'Legal'].map((title) => (
          { id: id(), type: 'flex-col', props: { className: 'flex flex-col gap-3' }, children: [
            { id: id(), type: 'h4', props: { className: 'text-sm font-semibold', children: title }, children: [], style: {} },
            ...['Link 1', 'Link 2', 'Link 3'].map((link) => ({ id: id(), type: 'span', props: { className: 'text-sm text-muted-foreground cursor-pointer', children: link }, children: [], style: {} })),
          ], style: {} }
        )), style: {} },
      ], style: {} }];
    }
    return [{ id: id(), type: 'section', props: { className: 'p-8 rounded-xl border border-border bg-card' }, children: [
      { id: id(), type: 'h2', props: { className: 'text-xl font-semibold mb-2', children: 'New Section' }, children: [], style: {} },
      { id: id(), type: 'p', props: { className: 'text-muted-foreground', children: prompt }, children: [], style: {} },
    ], style: {} }];
  }

  // ─── Keyboard shortcuts ────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const m = e.metaKey || e.ctrlKey;
      const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || (e.target as HTMLElement)?.isContentEditable;
      if (m && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if (m && e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); }
      if (m && e.key === 'c' && !isInput) { e.preventDefault(); copyNode(); }
      if (m && e.key === 'v' && !isInput) { e.preventDefault(); pasteNode(); }
      if (m && e.key === 'd' && !isInput) { e.preventDefault(); duplicateNode(); }
      if (m && e.key === 'w') { e.preventDefault(); if (s.activeFileId) closeFile(s.activeFileId); }
      if (m && e.key === 'e' && !isInput) { e.preventDefault(); setS((p) => ({ ...p, leftPanel: p.leftPanel === 'files' ? 'components' : 'files' })); }
      if ((e.key === 'Delete' || e.key === 'Backspace') && !isInput && s.selectedNodeIds.length > 0) { e.preventDefault(); s.selectedNodeIds.forEach(deleteNode); }
      if (e.key === 'Escape') setS((p) => ({ ...p, selectedNodeIds: [], openMenu: null, renamingFileId: null }));
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  // ─── Code generation ───────────────────────────────────────────
  const fullCode = isActive ? generateCode(activeNodes, pageName, s.framework) : (activeFile?.content || '');

  // ─── Menu definitions ──────────────────────────────────────────
  const menus = [
    { id: 'file', label: 'File', items: [
      { label: 'New Page...', shortcut: '⌘N', action: () => { const n = prompt('Page name'); if (n) { const pf = findFileInTree(s.files, 'f_pages'); createFile(pf ? 'f_pages' : 'f_src', `${n.replace(/\s+/g, '')}.tsx`, true); } } },
      { label: 'New File...', action: () => { const n = prompt('File name'); if (n) createFile('f_src', n, false); } },
      { label: 'New Folder...', action: () => { const n = prompt('Folder name'); if (n) createFolder('f_src', n); } },
      { label: 'separator' },
      { label: 'Clear Canvas', action: clearCanvas, disabled: !isActive },
      { label: 'separator' },
      { label: 'Save', shortcut: '⌘S', action: () => localStorage.setItem('builder-project', JSON.stringify(s.files)) },
      { label: 'separator' },
      ...(isActive ? [
        { label: 'Export as HTML', action: () => { const b = new Blob([generateHTMLPage(activeNodes)], { type: 'text/html' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = `${pageName}.html`; a.click(); } },
        { label: 'Export as JSON', action: () => { const b = new Blob([JSON.stringify(activeNodes, null, 2)], { type: 'application/json' }); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href = u; a.download = `${pageName}.json`; a.click(); } },
      ] : []),
    ]},
    { id: 'edit', label: 'Edit', items: [
      { label: 'Undo', shortcut: '⌘Z', action: undo, disabled: s.historyIndex < 0 },
      { label: 'Redo', shortcut: '⌘⇧Z', action: redo, disabled: s.historyIndex >= s.history.length - 1 },
      { label: 'separator' },
      { label: 'Copy', shortcut: '⌘C', action: copyNode, disabled: s.selectedNodeIds.length === 0 },
      { label: 'Paste', shortcut: '⌘V', action: pasteNode, disabled: !s.clipboard },
      { label: 'Duplicate', shortcut: '⌘D', action: duplicateNode, disabled: s.selectedNodeIds.length === 0 },
      { label: 'separator' },
      { label: 'Delete', shortcut: '⌫', action: () => s.selectedNodeIds.forEach(deleteNode), disabled: s.selectedNodeIds.length === 0 },
    ]},
    { id: 'view', label: 'View', items: [
      { label: 'Design', shortcut: '⌘1', action: () => setS((p) => ({ ...p, viewMode: 'design' })), active: s.viewMode === 'design' },
      { label: 'Code', shortcut: '⌘2', action: () => setS((p) => ({ ...p, viewMode: 'code' })), active: s.viewMode === 'code' },
      { label: 'Preview', shortcut: '⌘3', action: () => setS((p) => ({ ...p, viewMode: 'preview' })), active: s.viewMode === 'preview' },
      { label: 'separator' },
      { label: 'Zoom In', shortcut: '⌘+', action: () => setS((p) => ({ ...p, zoom: Math.min(200, p.zoom + 10) })) },
      { label: 'Zoom Out', shortcut: '⌘−', action: () => setS((p) => ({ ...p, zoom: Math.max(25, p.zoom - 10) })) },
      { label: 'Reset Zoom', shortcut: '⌘0', action: () => setS((p) => ({ ...p, zoom: 100 })) },
      { label: 'separator' },
      { label: 'Canvas: White', action: () => setS((p) => ({ ...p, canvasBg: 'white' })), active: s.canvasBg === 'white' },
      { label: 'Canvas: Dots', action: () => setS((p) => ({ ...p, canvasBg: 'dots' })), active: s.canvasBg === 'dots' },
      { label: 'Canvas: Dark', action: () => setS((p) => ({ ...p, canvasBg: 'dark' })), active: s.canvasBg === 'dark' },
    ]},
    { id: 'insert', label: 'Insert', items: [
      { label: 'Container', action: () => addNode('div'), disabled: !isActive },
      { label: 'Flex Row', action: () => addNode('flex'), disabled: !isActive },
      { label: 'Flex Column', action: () => addNode('flex-col'), disabled: !isActive },
      { label: 'Grid', action: () => addNode('grid'), disabled: !isActive },
      { label: 'separator' },
      { label: 'Heading', action: () => addNode('h2'), disabled: !isActive },
      { label: 'Paragraph', action: () => addNode('p'), disabled: !isActive },
      { label: 'Button', action: () => addNode('button'), disabled: !isActive },
      { label: 'Input', action: () => addNode('input'), disabled: !isActive },
    ]},
    { id: 'go', label: 'Go', items: [
      ...pageFiles.map((pf) => ({ label: `${pf.id === s.activeFileId ? '● ' : '  '}${pf.name.replace(/\.\w+$/, '')}`, action: () => openFile(pf.id) })),
      { label: 'separator' },
      { label: 'Explorer', shortcut: '⌘E', action: () => setS((p) => ({ ...p, leftPanel: 'files' })) },
    ]},
    { id: 'help', label: 'Help', items: [
      { label: 'Keyboard Shortcuts', action: () => alert('⌘Z Undo · ⌘⇧Z Redo · ⌘C Copy · ⌘V Paste · ⌘D Duplicate · ⌫ Delete · Esc Deselect · ⌘1/2/3 View · ⌘W Close · ⌘E Explorer') },
      { label: 'separator' },
      { label: 'About Builder', action: () => alert('Adhar UI Builder v0.2.0\n\n97 components · 8 themes · 5 frameworks\nVisual page builder for Adhar UI') },
    ]},
  ];

  // ─── Palette ───────────────────────────────────────────────────
  const palette = Palette.searchPalette(Palette.getFullPalette(), s.paletteSearch);

  // ─── Layout state ──────────────────────────────────────────────
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const leftW = leftCollapsed ? 0 : 220;
  const rightW = rightCollapsed ? 0 : 272;

  // Activity bar icons for left panel
  const activityItems: { id: typeof s.leftPanel; icon: React.ReactNode; label: string }[] = [
    { id: 'components', label: 'Components', icon: <svg className='w-[18px] h-[18px]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}><rect x='3' y='3' width='7' height='7' rx='1' /><rect x='14' y='3' width='7' height='7' rx='1' /><rect x='3' y='14' width='7' height='7' rx='1' /><rect x='14' y='14' width='7' height='7' rx='1' /></svg> },
    { id: 'files', label: 'Explorer', icon: <svg className='w-[18px] h-[18px]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}><path d='M3 7V5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z' /></svg> },
  ];

  // Right panel icons
  const rightItems: { id: typeof s.rightPanel; icon: React.ReactNode; label: string }[] = [
    { id: 'outline', label: 'Layers', icon: <svg className='w-[18px] h-[18px]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}><path d='M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' /></svg> },
    { id: 'properties', label: 'Properties', icon: <svg className='w-[18px] h-[18px]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}><path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z' /><circle cx='12' cy='12' r='3' /></svg> },
    { id: 'theme', label: 'Theme', icon: <svg className='w-[18px] h-[18px]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}><circle cx='12' cy='12' r='5' /><path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' /></svg> },
    { id: 'ai', label: 'AI', icon: <svg className='w-[18px] h-[18px]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}><path d='M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z' /><path d='M9 14h.01M15 14h.01M10 18h4' /></svg> },
  ];

  // ─── Icon helper ───────────────────────────────────────────────
  const Ic = ({ d, s: sz = 18 }: { d: string; s?: number }) => (
    <svg width={sz} height={sz} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round'><path d={d} /></svg>
  );

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div className='h-screen flex flex-col bg-background text-foreground overflow-hidden select-none'>
      {/* ═══ Top Menu Bar ═══ */}
      <Toolbar
        viewMode={s.viewMode} zoom={s.zoom} devicePreview={s.devicePreview}
        isActivePage={isActive} activeFilePath={activeFilePath}
        elementCount={activeNodes.length} fileLanguage={activeFile?.language}
        canUndo={s.historyIndex >= 0} canRedo={s.historyIndex < s.history.length - 1}
        hasSelection={s.selectedNodeIds.length > 0} hasClipboard={!!s.clipboard}
        openMenu={s.openMenu} menus={menus} canvasBg={s.canvasBg}
        onUndo={undo} onRedo={redo}
        onCopy={copyNode} onPaste={pasteNode} onDuplicate={duplicateNode}
        onDelete={() => s.selectedNodeIds.forEach(deleteNode)} onClearCanvas={clearCanvas}
        onViewMode={(v) => setS((p) => ({ ...p, viewMode: v }))}
        onZoom={(z) => setS((p) => ({ ...p, zoom: z }))}
        onDevice={(d) => setS((p) => ({ ...p, devicePreview: d }))}
        onCanvasBg={(bg) => setS((p) => ({ ...p, canvasBg: bg }))}
        onAddNode={addNode}
        onSetMenu={(m) => setS((p) => ({ ...p, openMenu: m }))}
      />

      {/* ═══ Main body ═══ */}
      <div className='flex-1 flex overflow-hidden'>

      {/* ── Left Activity Bar ── */}
      <div className='w-11 bg-card border-r border-border flex flex-col items-center py-2 gap-1 shrink-0'>
        {/* Logo */}
        <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-2'>
          <span className='text-primary-foreground text-[10px] font-bold'>A</span>
        </div>

        {activityItems.map((item) => (
          <button key={item.id} title={item.label}
            onClick={() => { if (s.leftPanel === item.id && !leftCollapsed) setLeftCollapsed(true); else { setS((p) => ({ ...p, leftPanel: item.id })); setLeftCollapsed(false); } }}
            className={`activity-item ${s.leftPanel === item.id && !leftCollapsed ? 'active' : ''}`}>
            {item.icon}
          </button>
        ))}
        <div className='flex-1' />
        <button title={s.darkMode ? 'Light mode' : 'Dark mode'} onClick={() => setS((p) => ({ ...p, darkMode: !p.darkMode }))} className='activity-item'>
          {s.darkMode ? <Ic d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z' /> : <Ic d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />}
        </button>
      </div>

      {/* ── Left Panel ── */}
      {!leftCollapsed && (
        <div className='border-r border-border bg-card flex flex-col shrink-0 overflow-hidden' style={{ width: leftW }}>
          <div className='h-9 flex items-center px-3 border-b border-border shrink-0'>
            <span className='text-xs font-semibold text-foreground'>{s.leftPanel === 'files' ? 'Explorer' : 'Components'}</span>
            <div className='flex-1' />
            <button onClick={() => setLeftCollapsed(true)} className='btn-icon-sm !w-5 !h-5 !min-w-0'>
              <svg className='w-3 h-3' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><path d='M15 18l-6-6 6-6' /></svg>
            </button>
          </div>
          {s.leftPanel === 'components' && (
            <div className='px-2 py-2 border-b border-border shrink-0'>
              <div className='relative'>
                <svg className='absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><circle cx='11' cy='11' r='8' /><path d='m21 21-4.3-4.3' /></svg>
                <input value={s.paletteSearch} onChange={(e) => setS((p) => ({ ...p, paletteSearch: e.target.value }))} placeholder='Search components...' className='input-sm !h-7 !pl-7' />
              </div>
            </div>
          )}
          <div className='flex-1 overflow-y-auto px-1.5 py-1.5'>
            {s.leftPanel === 'components' && palette.map((cat) => (
              <div key={cat.id} className='mb-3'>
                <div className='px-1.5 py-1 text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider flex items-center gap-1.5'>
                  <span>{cat.icon}</span><span>{cat.label}</span>
                  <span className='ml-auto text-[9px] text-muted-foreground/25 tabular-nums'>{cat.items.length}</span>
                </div>
                <div className='grid grid-cols-2 gap-0.5 mt-0.5'>
                  {cat.items.map((item) => (
                    <button key={item.type} draggable onDragStart={(e) => { e.dataTransfer.setData('adhar/type', item.type); }}
                      onClick={() => addNode(item.type)} title={item.type}
                      className='group text-left px-1.5 py-1.5 rounded-md text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-accent cursor-grab active:cursor-grabbing transition-colors'>
                      <span className='w-5 h-5 rounded-md bg-muted/40 group-hover:bg-primary/10 flex items-center justify-center text-[10px] shrink-0 transition-colors'>{item.icon}</span>
                      <span className='truncate'>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {s.leftPanel === 'files' && (
              <FileExplorer files={s.files} activeFileId={s.activeFileId} renamingFileId={s.renamingFileId}
                onOpen={openFile} onToggle={toggleFolder} onDelete={deleteFile}
                onRename={renameFile} onStartRename={(fid) => setS((p) => ({ ...p, renamingFileId: fid }))}
                onNewFile={(fid) => { const n = prompt('File name'); if (n) createFile(fid, n, n.endsWith('.tsx')); }}
                onNewFolder={(fid) => { const n = prompt('Folder name'); if (n) createFolder(fid, n); }}
              />
            )}
          </div>
        </div>
      )}

      {/* ═══ Center Workspace ═══ */}
      <div className='flex-1 flex flex-col overflow-hidden min-w-0 relative'>
        {/* Tab bar */}
        {s.openFileIds.length > 0 && (
          <div className='h-[32px] bg-card border-b border-border flex items-end shrink-0 overflow-x-auto px-1 scrollbar-none'>
            {s.openFileIds.map((fid) => {
              const f = findFileInTree(s.files, fid);
              if (!f) return null;
              const isAct = fid === s.activeFileId;
              return (
                <div key={fid} onClick={() => openFile(fid)} className={`tab group ${isAct ? 'active' : ''}`}>
                  <span className='truncate max-w-[120px]'>{f.name}</span>
                  {f.nodes !== undefined && <span className='w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0' />}
                  <button onClick={(e) => { e.stopPropagation(); closeFile(fid); }}
                    className='w-4 h-4 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-60 hover:!opacity-100 hover:bg-accent transition-opacity'>
                    <svg className='w-2.5 h-2.5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2.5}><path d='M18 6 6 18M6 6l12 12' /></svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Welcome screen */}
        {!activeFile && (
          <div className='flex-1 flex flex-col items-center justify-center' style={{ background: 'hsl(var(--canvas))' }}>
            <div className='w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5'>
              <div className='w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold'>A</div>
            </div>
            <h2 className='text-xl font-semibold text-foreground mb-1'>Adhar UI Builder</h2>
            <p className='text-xs text-muted-foreground mb-8'>Visual page builder for the Adhar UI design system</p>
            <div className='flex gap-2'>
              {pageFiles.slice(0, 3).map((pf) => (
                <button key={pf.id} onClick={() => openFile(pf.id)}
                  className='flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-card hover:border-primary/20 transition-all'>
                  <Ic d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM13 2v7h7' s={15} />
                  {pf.name.replace(/\.\w+$/, '')}
                </button>
              ))}
            </div>
            <div className='flex items-center gap-3 mt-10 text-[10px] text-muted-foreground/30'>
              <span>97 components</span><span>·</span><span>8 themes</span><span>·</span><span>5 frameworks</span>
            </div>
          </div>
        )}

        {/* Design view — pages */}
        {activeFile && s.viewMode === 'design' && isActive && (
          <CanvasView
            nodes={activeNodes} selectedNodeIds={s.selectedNodeIds}
            zoom={s.zoom} devicePreview={s.devicePreview} canvasBg={s.canvasBg} pageName={pageName}
            onSelect={handleSelect} onDeselect={() => setS((p) => ({ ...p, selectedNodeIds: [] }))}
            onUpdateText={(nid, txt) => updateProp(nid, 'children', txt)}
            onDropNew={(type, pid) => addNode(type, pid)} onDropReorder={handleDropReorder} onContextMenu={() => {}}
            onCopy={copyNode} onPaste={pasteNode} onDuplicate={duplicateNode}
            onMoveUp={(nid) => moveUp(nid)} onMoveDown={(nid) => moveDown(nid)}
            onWrap={(nid) => wrapNode(nid)} onDelete={deleteNode}
          />
        )}

        {/* Design view — code files */}
        {activeFile && s.viewMode === 'design' && !isActive && (
          <div className='flex-1 overflow-hidden'><MonacoEditor value={activeFile.content || ''} language={activeFile.language || 'text'} readOnly={false} onChange={(val) => { if (val !== undefined && s.activeFileId) updateFileContent(s.activeFileId, val); }} /></div>
        )}

        {/* Code view */}
        {activeFile && s.viewMode === 'code' && (
          <div className='flex-1 overflow-hidden'><MonacoEditor value={fullCode} language={activeFile.language || 'tsx'} readOnly={isActive} onChange={(val) => { if (val !== undefined && s.activeFileId && !isActive) updateFileContent(s.activeFileId, val); }} /></div>
        )}

        {/* Preview */}
        {activeFile && s.viewMode === 'preview' && isActive && (
          <div className='flex-1 flex justify-center p-6 overflow-auto' style={{ background: 'hsl(var(--canvas))' }}>
            <iframe srcDoc={`<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"><\/script><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><style>:root{--primary:240 5.9% 10%;--primary-foreground:0 0% 98%;--background:0 0% 100%;--foreground:240 10% 3.9%;--muted:240 4.8% 95.9%;--muted-foreground:240 3.8% 46.1%;--border:240 5.9% 90%;--input:240 5.9% 90%;--secondary:240 4.8% 95.9%;--secondary-foreground:240 5.9% 10%;--accent:240 4.8% 95.9%;--destructive:0 84.2% 60.2%;--ring:240 5.9% 10%;--radius:0.5rem;--card:0 0% 100%}*{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter,sans-serif;background:hsl(var(--background));color:hsl(var(--foreground))}</style><script>tailwind.config={theme:{extend:{colors:{border:'hsl(var(--border))',input:'hsl(var(--input))',ring:'hsl(var(--ring))',background:'hsl(var(--background))',foreground:'hsl(var(--foreground))',primary:{DEFAULT:'hsl(var(--primary))',foreground:'hsl(var(--primary-foreground))'},secondary:{DEFAULT:'hsl(var(--secondary))',foreground:'hsl(var(--secondary-foreground))'},destructive:{DEFAULT:'hsl(var(--destructive))'},muted:{DEFAULT:'hsl(var(--muted))',foreground:'hsl(var(--muted-foreground))'},accent:{DEFAULT:'hsl(var(--accent))'},card:{DEFAULT:'hsl(var(--card))'}},borderRadius:{lg:'var(--radius)',md:'calc(var(--radius) - 2px)',sm:'calc(var(--radius) - 4px)'}}}}<\/script></head><body><div class="max-w-7xl mx-auto px-4 py-8">${activeNodes.map(nodeToHTML).join('')}</div></body></html>`}
              className='rounded-xl border border-border' style={{ background: 'hsl(var(--background))', boxShadow: '0 4px 24px hsl(var(--foreground) / 0.06)', width: s.devicePreview === 'mobile' ? 375 : s.devicePreview === 'tablet' ? 768 : '100%', maxWidth: '100%', height: '100%', minHeight: 400 }} sandbox='allow-scripts' title='Preview' />
          </div>
        )}
        {activeFile && s.viewMode === 'preview' && !isActive && (
          <div className='flex-1 flex items-center justify-center text-muted-foreground/30'><p className='text-sm'>Preview not available for .{activeFile.language} files</p></div>
        )}

        {/* ═══ Floating Toolbox (bottom of canvas) ═══ */}
        {activeFile && isActive && s.viewMode === 'design' && (
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 rounded-xl border border-border px-2 py-1.5 animate-slide-up'
            style={{ background: 'hsl(var(--popover) / 0.92)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px hsl(var(--foreground) / 0.08), 0 2px 8px hsl(var(--foreground) / 0.04)' }}>

            {/* Undo / Redo */}
            <button className='btn-icon-sm' onClick={undo} disabled={s.historyIndex < 0} title='Undo (⌘Z)'><Ic d='M3 10h10a5 5 0 0 1 5 5v2M3 10l4-4M3 10l4 4' s={14} /></button>
            <button className='btn-icon-sm' onClick={redo} disabled={s.historyIndex >= s.history.length - 1} title='Redo (⌘⇧Z)'><Ic d='M21 10H11a5 5 0 0 0-5 5v2M21 10l-4-4M21 10l-4 4' s={14} /></button>

            <div className='w-px h-5 bg-border mx-1' />

            {/* Edit */}
            <button className='btn-icon-sm' onClick={copyNode} disabled={s.selectedNodeIds.length === 0} title='Copy (⌘C)'><Ic d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' s={13} /></button>
            <button className='btn-icon-sm' onClick={pasteNode} disabled={!s.clipboard} title='Paste (⌘V)'><Ic d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6v4H9z' s={13} /></button>
            <button className='btn-icon-sm' onClick={duplicateNode} disabled={s.selectedNodeIds.length === 0} title='Duplicate (⌘D)'><Ic d='M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2M10 20h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z' s={13} /></button>
            <button className='btn-icon-sm' onClick={() => s.selectedNodeIds.forEach(deleteNode)} disabled={s.selectedNodeIds.length === 0} title='Delete (⌫)' style={{ color: s.selectedNodeIds.length > 0 ? 'hsl(var(--destructive))' : undefined }}>
              <Ic d='M3 6h18M8 6V4h8v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' s={13} />
            </button>

            <div className='w-px h-5 bg-border mx-1' />

            {/* Quick insert */}
            {[
              { type: 'div', d: 'M3 3h18v18H3z', t: 'Container' },
              { type: 'flex', d: 'M3 6h18M3 12h18M3 18h18', t: 'Flex' },
              { type: 'h2', d: 'M4 7V4h16v3M9 20h6M12 4v16', t: 'Text' },
              { type: 'button', d: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z', t: 'Button' },
              { type: 'input', d: 'M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM6 12h4', t: 'Input' },
              { type: 'img-placeholder', d: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM21 15l-5-5L5 21', t: 'Image' },
            ].map((n) => (
              <button key={n.type} className='btn-icon-sm' onClick={() => addNode(n.type)} title={n.t}><Ic d={n.d} s={13} /></button>
            ))}
          </div>
        )}
      </div>

      {/* ── Right Panel (opens to the left of the activity bar) ── */}
      {!rightCollapsed && (
        <div className='border-l border-border bg-card flex flex-col shrink-0 overflow-hidden' style={{ width: rightW }}>
          <div className='h-9 flex items-center px-3 border-b border-border shrink-0'>
            <span className='text-xs font-semibold text-foreground'>
              {s.rightPanel === 'ai' ? 'AI Assistant' : s.rightPanel === 'outline' ? 'Layers' : s.rightPanel.charAt(0).toUpperCase() + s.rightPanel.slice(1)}
            </span>
            <div className='flex-1' />
            <button onClick={() => setRightCollapsed(true)} className='btn-icon-sm !w-5 !h-5 !min-w-0'>
              <svg className='w-3 h-3' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><path d='M9 18l6-6-6-6' /></svg>
            </button>
          </div>
          <div className='flex-1 overflow-y-auto'>
            {s.rightPanel === 'outline' && <OutlinePanel nodes={activeNodes} selectedNodeIds={s.selectedNodeIds} onSelect={(nid) => handleSelect(nid, false)} />}
            {s.rightPanel === 'properties' && <PropertiesPanel selectedNode={selNode} activeFile={activeFile} activeFilePath={activeFilePath} isActivePage={isActive} onUpdateProp={updateProp} onDelete={deleteNode} />}
            {s.rightPanel === 'theme' && <ThemePanel theme={s.theme} darkMode={s.darkMode} framework={s.framework} customTokenOverrides={s.customTokenOverrides}
              onSetTheme={(t) => setS((p) => ({ ...p, theme: t }))} onSetDarkMode={(d) => setS((p) => ({ ...p, darkMode: d }))} onSetFramework={(fw) => setS((p) => ({ ...p, framework: fw }))}
              onSetTokenOverride={(token, value) => setS((p) => ({ ...p, customTokenOverrides: { ...p.customTokenOverrides, [token]: value } }))}
              onExportDTCG={() => downloadFile(JSON.stringify(exportDesignTokens(s.theme), null, 2), `${s.theme}-tokens.json`, 'application/json')}
              onExportCSS={() => downloadFile(exportTokensAsCustomProperties(s.theme), `${s.theme}-theme.css`, 'text/css')}
              onApplyToGlobals={() => { const gf = findFileInTree(s.files, 'f_globals'); if (gf) { updateFileContent('f_globals', `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${generateThemeCSS(currentTheme)}\n`); openFile('f_globals'); } }}
            />}
            {s.rightPanel === 'ai' && <AIPanel aiMessages={s.aiMessages} aiPrompt={s.aiPrompt} aiLoading={s.aiLoading} aiProvider={s.aiProvider} aiApiKey={s.aiApiKey} aiModifyMode={s.aiModifyMode}
              isActivePage={isActive} selectedNodeIds={s.selectedNodeIds} activeNodes={activeNodes}
              onSetPrompt={(p) => setS((prev) => ({ ...prev, aiPrompt: p }))} onSetProvider={(p) => setS((prev) => ({ ...prev, aiProvider: p }))} onSetApiKey={(k) => setS((p) => ({ ...p, aiApiKey: k }))}
              onSetModifyMode={(m) => setS((p) => ({ ...p, aiModifyMode: m }))} onGenerate={handleAIGenerate} onInsertNodes={insertAINodes} onDismissMessage={dismissAIMessage}
            />}
          </div>
        </div>
      )}

      {/* ── Right Activity Bar (always at far right edge) ── */}
      <div className='w-11 bg-card border-l border-border flex flex-col items-center py-2 gap-1 shrink-0'>
        {rightItems.map((item) => (
          <button key={item.id} title={item.label}
            onClick={() => { if (s.rightPanel === item.id && !rightCollapsed) setRightCollapsed(true); else { setS((p) => ({ ...p, rightPanel: item.id })); setRightCollapsed(false); } }}
            className={`activity-item ${s.rightPanel === item.id && !rightCollapsed ? 'active' : ''}`}>
            {item.icon}
          </button>
        ))}
      </div>
      </div>{/* end main body */}
    </div>
  );
}
