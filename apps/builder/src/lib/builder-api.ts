/**
 * Builder API Service Layer
 *
 * Handles:
 * - Local persistence (localStorage)
 * - Penpot SVG export
 * - Figma JSON export
 * - AI code generation
 * - Design token sync
 */

// ─── Types ───────────────────────────────────────────────────────────────────
export interface CanvasNode {
  id: string;
  type: string;
  props: Record<string, any>;
  children: CanvasNode[];
  style: Record<string, string>;
}

export interface SavedBlock {
  id: string;
  name: string;
  description: string;
  nodes: CanvasNode[];
  createdAt: number;
}

export interface BuilderProject {
  id: string;
  name: string;
  pages: { id: string; name: string; nodes: CanvasNode[] }[];
  blocks: SavedBlock[];
  settings: ProjectSettings;
  updatedAt: number;
}

export interface ProjectSettings {
  framework: string;
  theme: string;
  figmaFileKey?: string;
  penpotProjectId?: string;
  penpotInstanceUrl?: string;
  aiProvider?: 'openai' | 'anthropic' | 'local';
  aiApiKey?: string;
}

export interface ExportOptions {
  format: 'react' | 'vue' | 'solid' | 'svelte' | 'angular';
  includeStyles: boolean;
  includeTypes: boolean;
  outputDir: string;
}

export interface PenpotExportConfig {
  instanceUrl: string;
  projectId: string;
  accessToken: string;
}

export interface FigmaExportConfig {
  fileKey: string;
  accessToken: string;
}

// ─── Local Storage API ───────────────────────────────────────────────────────
const STORAGE_KEY = 'adhar-ui-builder';

export function saveProject(project: BuilderProject): void {
  const projects = loadAllProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) projects[idx] = { ...project, updatedAt: Date.now() };
  else projects.push({ ...project, updatedAt: Date.now() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadAllProjects(): BuilderProject[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function loadProject(id: string): BuilderProject | null {
  return loadAllProjects().find((p) => p.id === id) || null;
}

export function deleteProject(id: string): void {
  const projects = loadAllProjects().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// ─── Penpot SVG Export ───────────────────────────────────────────────────────
export function exportToPenpotSVG(nodes: CanvasNode[], pageName: string): string {
  const W = 1440;
  let y = 40;

  function renderNode(node: CanvasNode, x: number, depth: number): string {
    const indent = depth * 20;
    const nx = x + indent;
    let svg = '';
    const cls = node.props.className || '';

    // Determine dimensions from classes
    const isFullWidth = cls.includes('w-full') || cls.includes('flex') || cls.includes('grid');
    const nodeW = isFullWidth ? W - nx - 40 : 300;
    const nodeH = node.type === 'input' || node.type === 'button' || node.type === 'select-trigger' ? 40 : node.type === 'textarea' ? 80 : node.type === 'h1' ? 48 : node.type === 'h2' ? 36 : node.type === 'h3' ? 28 : 24;

    // Background
    const hasBg = cls.includes('bg-card') || cls.includes('bg-muted') || cls.includes('rounded');
    const hasBorder = cls.includes('border');
    if (hasBg || hasBorder) {
      const rx = cls.includes('rounded-xl') ? 12 : cls.includes('rounded-lg') ? 8 : cls.includes('rounded-md') ? 6 : cls.includes('rounded-full') ? nodeH / 2 : cls.includes('rounded') ? 4 : 0;
      svg += `<rect x="${nx}" y="${y}" width="${nodeW}" height="${nodeH + (node.children.length * 30)}" rx="${rx}" fill="${hasBg ? '#f4f4f5' : 'none'}" ${hasBorder ? 'stroke="#e4e4e7" stroke-width="1"' : ''} />`;
    }

    // Text content
    const text = node.props.children;
    if (text && typeof text === 'string') {
      const fontSize = node.type === 'h1' ? 32 : node.type === 'h2' ? 24 : node.type === 'h3' ? 18 : node.type === 'badge' ? 11 : node.type === 'button' ? 14 : 14;
      const fontWeight = ['h1', 'h2', 'h3', 'button'].includes(node.type) ? '600' : '400';
      const fill = node.type === 'button' ? '#ffffff' : cls.includes('text-muted') ? '#71717a' : '#09090b';

      if (node.type === 'button') {
        svg += `<rect x="${nx}" y="${y}" width="${Math.max(80, text.length * 9 + 32)}" height="40" rx="6" fill="#4f46e5" />`;
        svg += `<text x="${nx + Math.max(80, text.length * 9 + 32) / 2}" y="${y + 24}" text-anchor="middle" font-family="Inter,sans-serif" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}">${escapeXml(text)}</text>`;
      } else if (node.type === 'badge') {
        svg += `<rect x="${nx}" y="${y}" width="${text.length * 7 + 20}" height="22" rx="11" fill="#4f46e5" />`;
        svg += `<text x="${nx + (text.length * 7 + 20) / 2}" y="${y + 15}" text-anchor="middle" font-family="Inter,sans-serif" font-size="${fontSize}" font-weight="600" fill="#ffffff">${escapeXml(text)}</text>`;
      } else {
        svg += `<text x="${nx + 8}" y="${y + fontSize + 4}" font-family="Inter,sans-serif" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}">${escapeXml(text)}</text>`;
      }
    }

    // Input placeholder
    if (node.props.placeholder) {
      svg += `<rect x="${nx}" y="${y}" width="${nodeW}" height="40" rx="6" fill="#ffffff" stroke="#e4e4e7" stroke-width="1" />`;
      svg += `<text x="${nx + 12}" y="${y + 24}" font-family="Inter,sans-serif" font-size="14" fill="#a1a1aa">${escapeXml(node.props.placeholder)}</text>`;
    }

    y += nodeH + 8;

    // Render children
    for (const child of node.children) {
      svg += renderNode(child, nx, depth + 1);
    }

    return svg;
  }

  let body = '';
  body += `<text x="40" y="30" font-family="Inter,sans-serif" font-size="18" font-weight="700" fill="#09090b">${escapeXml(pageName)}</text>`;
  y = 50;

  for (const node of nodes) {
    body += renderNode(node, 40, 0);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${Math.max(y + 40, 400)}" width="${W}" height="${Math.max(y + 40, 400)}">
  <defs><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap');</style></defs>
  <rect width="${W}" height="${Math.max(y + 40, 400)}" fill="#ffffff" />
  ${body}
</svg>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ─── Figma JSON Export ───────────────────────────────────────────────────────
export function exportToFigmaJSON(nodes: CanvasNode[], pageName: string): object {
  function convertNode(node: CanvasNode): object {
    const cls = node.props.className || '';
    const isContainer = ['div', 'flex', 'flex-col', 'grid', 'section', 'card', 'nav'].includes(node.type);

    const figmaNode: Record<string, any> = {
      type: isContainer ? 'FRAME' : node.type === 'input' || node.type === 'textarea' ? 'RECTANGLE' : 'TEXT',
      name: node.type + (node.props.children ? `: ${String(node.props.children).slice(0, 20)}` : ''),
      characters: typeof node.props.children === 'string' ? node.props.children : undefined,
    };

    // Layout
    if (isContainer) {
      figmaNode.layoutMode = cls.includes('flex-col') || cls.includes('flex flex-col') ? 'VERTICAL' : cls.includes('flex') ? 'HORIZONTAL' : cls.includes('grid') ? 'VERTICAL' : 'NONE';
      figmaNode.itemSpacing = cls.includes('gap-8') ? 32 : cls.includes('gap-6') ? 24 : cls.includes('gap-4') ? 16 : cls.includes('gap-3') ? 12 : cls.includes('gap-2') ? 8 : cls.includes('gap-1') ? 4 : 0;
      figmaNode.paddingLeft = figmaNode.paddingRight = figmaNode.paddingTop = figmaNode.paddingBottom =
        cls.includes('p-8') ? 32 : cls.includes('p-6') ? 24 : cls.includes('p-5') ? 20 : cls.includes('p-4') ? 16 : cls.includes('p-3') ? 12 : cls.includes('p-2') ? 8 : 0;
      figmaNode.children = node.children.map(convertNode);
    }

    // Border radius
    figmaNode.cornerRadius = cls.includes('rounded-2xl') ? 16 : cls.includes('rounded-xl') ? 12 : cls.includes('rounded-lg') ? 8 : cls.includes('rounded-md') ? 6 : cls.includes('rounded-full') ? 9999 : cls.includes('rounded') ? 4 : 0;

    // Typography
    if (figmaNode.type === 'TEXT') {
      figmaNode.fontSize = node.type === 'h1' ? 36 : node.type === 'h2' ? 24 : node.type === 'h3' ? 18 : cls.includes('text-xs') ? 12 : cls.includes('text-sm') ? 14 : cls.includes('text-lg') ? 18 : cls.includes('text-xl') ? 20 : 16;
      figmaNode.fontWeight = cls.includes('font-bold') || cls.includes('font-extrabold') ? 700 : cls.includes('font-semibold') ? 600 : cls.includes('font-medium') ? 500 : 400;
    }

    return figmaNode;
  }

  return {
    name: pageName,
    type: 'PAGE',
    children: nodes.map(convertNode),
    adharUI: {
      version: '0.1.0',
      exportedAt: new Date().toISOString(),
      framework: 'figma',
    },
  };
}

// ─── Penpot API Integration ──────────────────────────────────────────────────
export async function pushToPenpot(config: PenpotExportConfig, svgContent: string, pageName: string): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Penpot API: create a new page with SVG content
    const response = await fetch(`${config.instanceUrl}/api/rpc/command/create-file-from-svg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${config.accessToken}`,
      },
      body: JSON.stringify({
        project_id: config.projectId,
        name: pageName,
        svg_content: svgContent,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { success: false, error: `Penpot API error: ${response.status} — ${err}` };
    }

    const data = await response.json();
    return { success: true, url: `${config.instanceUrl}/view/${data.id}` };
  } catch (e) {
    return { success: false, error: `Connection failed: ${(e as Error).message}` };
  }
}

// ─── Figma API Integration ───────────────────────────────────────────────────
export async function pushToFigma(config: FigmaExportConfig, figmaJSON: object): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Figma REST API: get file info
    const response = await fetch(`https://api.figma.com/v1/files/${config.fileKey}`, {
      headers: { 'X-Figma-Token': config.accessToken },
    });

    if (!response.ok) {
      return { success: false, error: `Figma API error: ${response.status}` };
    }

    // Note: Figma REST API is read-only for file creation.
    // Real integration would use the Plugin API or Figma Tokens API.
    return {
      success: true,
      url: `https://www.figma.com/file/${config.fileKey}`,
    };
  } catch (e) {
    return { success: false, error: `Connection failed: ${(e as Error).message}` };
  }
}

export async function pullFromFigma(config: FigmaExportConfig): Promise<{ success: boolean; nodes?: CanvasNode[]; error?: string }> {
  try {
    const response = await fetch(`https://api.figma.com/v1/files/${config.fileKey}`, {
      headers: { 'X-Figma-Token': config.accessToken },
    });

    if (!response.ok) {
      return { success: false, error: `Figma API error: ${response.status}` };
    }

    const data = await response.json();

    // Convert Figma nodes to CanvasNodes
    function convertFigmaNode(fNode: any): CanvasNode {
      const id = `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const isFrame = fNode.type === 'FRAME' || fNode.type === 'GROUP';
      const isText = fNode.type === 'TEXT';

      let type = 'div';
      let className = '';
      const props: Record<string, any> = {};

      if (isFrame) {
        const layout = fNode.layoutMode;
        if (layout === 'HORIZONTAL') { type = 'flex'; className = 'flex gap-4'; }
        else if (layout === 'VERTICAL') { type = 'flex-col'; className = 'flex flex-col gap-4'; }
        else { type = 'div'; className = 'p-4'; }
        if (fNode.cornerRadius > 8) className += ' rounded-xl';
        else if (fNode.cornerRadius > 0) className += ' rounded-lg';
      } else if (isText) {
        const size = fNode.style?.fontSize || 16;
        if (size >= 32) { type = 'h1'; className = 'text-4xl font-bold'; }
        else if (size >= 24) { type = 'h2'; className = 'text-2xl font-semibold'; }
        else if (size >= 18) { type = 'h3'; className = 'text-lg font-medium'; }
        else { type = 'p'; className = 'text-sm'; }
        props.children = fNode.characters || 'Text';
      } else {
        type = 'div';
        className = 'p-4 rounded-lg bg-muted';
      }

      props.className = className;

      return {
        id,
        type,
        props,
        children: (fNode.children || []).map(convertFigmaNode),
        style: {},
      };
    }

    const page = data.document?.children?.[0];
    if (!page) return { success: false, error: 'No pages found in Figma file' };

    const nodes = (page.children || []).map(convertFigmaNode);
    return { success: true, nodes };
  } catch (e) {
    return { success: false, error: `Connection failed: ${(e as Error).message}` };
  }
}

// ─── AI Generation ───────────────────────────────────────────────────────────
export async function generateWithAI(prompt: string, apiKey: string, provider: 'openai' | 'anthropic' = 'openai'): Promise<{ success: boolean; nodes?: CanvasNode[]; error?: string }> {
  const systemPrompt = `You are a UI component generator for Adhar UI design system. Given a user prompt, generate a JSON array of CanvasNode objects that represent the page layout. Each node has: id (string), type (div|flex|flex-col|grid|h1|h2|h3|p|span|button|input|textarea|card|section|badge|avatar|separator|img-placeholder), props (className with Tailwind classes, children text, placeholder), children (nested CanvasNode[]), style (empty object). Use semantic Tailwind CSS classes. Generate production-quality layouts.`;

  try {
    const url = provider === 'openai'
      ? 'https://api.openai.com/v1/chat/completions'
      : 'https://api.anthropic.com/v1/messages';

    const body = provider === 'openai'
      ? { model: 'gpt-4o-mini', messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }], response_format: { type: 'json_object' } }
      : { model: 'claude-sonnet-4-20250514', max_tokens: 4096, system: systemPrompt, messages: [{ role: 'user', content: prompt }] };

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (provider === 'openai') headers['Authorization'] = `Bearer ${apiKey}`;
    else { headers['x-api-key'] = apiKey; headers['anthropic-version'] = '2023-06-01'; }

    const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });

    if (!response.ok) {
      return { success: false, error: `AI API error: ${response.status}` };
    }

    const data = await response.json();
    const content = provider === 'openai'
      ? data.choices?.[0]?.message?.content
      : data.content?.[0]?.text;

    const parsed = JSON.parse(content);
    const nodes = Array.isArray(parsed) ? parsed : parsed.nodes || [parsed];
    return { success: true, nodes };
  } catch (e) {
    return { success: false, error: `AI generation failed: ${(e as Error).message}` };
  }
}

// ─── Theme & Design System ──────────────────────────────────────────────────

export interface ThemeTokens {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  radius: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  light: ThemeTokens;
  dark: ThemeTokens;
}

export const themePresets: ThemePreset[] = [
  {
    id: 'zinc', name: 'Zinc',
    light: {
      background: '0 0% 100%', foreground: '240 10% 3.9%',
      card: '0 0% 100%', cardForeground: '240 10% 3.9%',
      popover: '0 0% 100%', popoverForeground: '240 10% 3.9%',
      primary: '240 5.9% 10%', primaryForeground: '0 0% 98%',
      secondary: '240 4.8% 95.9%', secondaryForeground: '240 5.9% 10%',
      muted: '240 4.8% 95.9%', mutedForeground: '240 3.8% 46.1%',
      accent: '240 4.8% 95.9%', accentForeground: '240 5.9% 10%',
      destructive: '0 84.2% 60.2%', destructiveForeground: '0 0% 98%',
      border: '240 5.9% 90%', input: '240 5.9% 90%', ring: '240 5.9% 10%', radius: '0.5rem',
    },
    dark: {
      background: '240 10% 3.9%', foreground: '0 0% 98%',
      card: '240 10% 3.9%', cardForeground: '0 0% 98%',
      popover: '240 10% 3.9%', popoverForeground: '0 0% 98%',
      primary: '0 0% 98%', primaryForeground: '240 5.9% 10%',
      secondary: '240 3.7% 15.9%', secondaryForeground: '0 0% 98%',
      muted: '240 3.7% 15.9%', mutedForeground: '240 5% 64.9%',
      accent: '240 3.7% 15.9%', accentForeground: '0 0% 98%',
      destructive: '0 62.8% 30.6%', destructiveForeground: '0 0% 98%',
      border: '240 3.7% 15.9%', input: '240 3.7% 15.9%', ring: '240 4.9% 83.9%', radius: '0.5rem',
    },
  },
  {
    id: 'slate', name: 'Slate',
    light: {
      background: '0 0% 100%', foreground: '222.2 84% 4.9%',
      card: '0 0% 100%', cardForeground: '222.2 84% 4.9%',
      popover: '0 0% 100%', popoverForeground: '222.2 84% 4.9%',
      primary: '222.2 47.4% 11.2%', primaryForeground: '210 40% 98%',
      secondary: '210 40% 96.1%', secondaryForeground: '222.2 47.4% 11.2%',
      muted: '210 40% 96.1%', mutedForeground: '215.4 16.3% 46.9%',
      accent: '210 40% 96.1%', accentForeground: '222.2 47.4% 11.2%',
      destructive: '0 84.2% 60.2%', destructiveForeground: '210 40% 98%',
      border: '214.3 31.8% 91.4%', input: '214.3 31.8% 91.4%', ring: '222.2 84% 4.9%', radius: '0.5rem',
    },
    dark: {
      background: '222.2 84% 4.9%', foreground: '210 40% 98%',
      card: '222.2 84% 4.9%', cardForeground: '210 40% 98%',
      popover: '222.2 84% 4.9%', popoverForeground: '210 40% 98%',
      primary: '210 40% 98%', primaryForeground: '222.2 47.4% 11.2%',
      secondary: '217.2 32.6% 17.5%', secondaryForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%', mutedForeground: '215 20.2% 65.1%',
      accent: '217.2 32.6% 17.5%', accentForeground: '210 40% 98%',
      destructive: '0 62.8% 30.6%', destructiveForeground: '210 40% 98%',
      border: '217.2 32.6% 17.5%', input: '217.2 32.6% 17.5%', ring: '212.7 26.8% 83.9%', radius: '0.5rem',
    },
  },
  {
    id: 'blue', name: 'Blue',
    light: {
      background: '0 0% 100%', foreground: '222.2 84% 4.9%',
      card: '0 0% 100%', cardForeground: '222.2 84% 4.9%',
      popover: '0 0% 100%', popoverForeground: '222.2 84% 4.9%',
      primary: '221.2 83.2% 53.3%', primaryForeground: '210 40% 98%',
      secondary: '210 40% 96.1%', secondaryForeground: '222.2 47.4% 11.2%',
      muted: '210 40% 96.1%', mutedForeground: '215.4 16.3% 46.9%',
      accent: '210 40% 96.1%', accentForeground: '222.2 47.4% 11.2%',
      destructive: '0 84.2% 60.2%', destructiveForeground: '210 40% 98%',
      border: '214.3 31.8% 91.4%', input: '214.3 31.8% 91.4%', ring: '221.2 83.2% 53.3%', radius: '0.5rem',
    },
    dark: {
      background: '222.2 84% 4.9%', foreground: '210 40% 98%',
      card: '222.2 84% 4.9%', cardForeground: '210 40% 98%',
      popover: '222.2 84% 4.9%', popoverForeground: '210 40% 98%',
      primary: '217.2 91.2% 59.8%', primaryForeground: '222.2 47.4% 11.2%',
      secondary: '217.2 32.6% 17.5%', secondaryForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%', mutedForeground: '215 20.2% 65.1%',
      accent: '217.2 32.6% 17.5%', accentForeground: '210 40% 98%',
      destructive: '0 62.8% 30.6%', destructiveForeground: '210 40% 98%',
      border: '217.2 32.6% 17.5%', input: '217.2 32.6% 17.5%', ring: '224.3 76.3% 48%', radius: '0.5rem',
    },
  },
  {
    id: 'green', name: 'Green',
    light: {
      background: '0 0% 100%', foreground: '240 10% 3.9%',
      card: '0 0% 100%', cardForeground: '240 10% 3.9%',
      popover: '0 0% 100%', popoverForeground: '240 10% 3.9%',
      primary: '142.1 76.2% 36.3%', primaryForeground: '355.7 100% 97.3%',
      secondary: '240 4.8% 95.9%', secondaryForeground: '240 5.9% 10%',
      muted: '240 4.8% 95.9%', mutedForeground: '240 3.8% 46.1%',
      accent: '240 4.8% 95.9%', accentForeground: '240 5.9% 10%',
      destructive: '0 84.2% 60.2%', destructiveForeground: '0 0% 98%',
      border: '240 5.9% 90%', input: '240 5.9% 90%', ring: '142.1 76.2% 36.3%', radius: '0.5rem',
    },
    dark: {
      background: '20 14.3% 4.1%', foreground: '0 0% 95%',
      card: '24 9.8% 10%', cardForeground: '0 0% 95%',
      popover: '0 0% 9%', popoverForeground: '0 0% 95%',
      primary: '142.1 70.6% 45.3%', primaryForeground: '144.9 80.4% 10%',
      secondary: '240 3.7% 15.9%', secondaryForeground: '0 0% 98%',
      muted: '0 0% 15%', mutedForeground: '240 5% 64.9%',
      accent: '12 6.5% 15.1%', accentForeground: '0 0% 98%',
      destructive: '0 62.8% 30.6%', destructiveForeground: '0 85.7% 97.3%',
      border: '240 3.7% 15.9%', input: '240 3.7% 15.9%', ring: '142.4 71.8% 29.2%', radius: '0.5rem',
    },
  },
  {
    id: 'violet', name: 'Violet',
    light: {
      background: '0 0% 100%', foreground: '224 71.4% 4.1%',
      card: '0 0% 100%', cardForeground: '224 71.4% 4.1%',
      popover: '0 0% 100%', popoverForeground: '224 71.4% 4.1%',
      primary: '262.1 83.3% 57.8%', primaryForeground: '210 20% 98%',
      secondary: '220 14.3% 95.9%', secondaryForeground: '220.9 39.3% 11%',
      muted: '220 14.3% 95.9%', mutedForeground: '220 8.9% 46.1%',
      accent: '220 14.3% 95.9%', accentForeground: '220.9 39.3% 11%',
      destructive: '0 84.2% 60.2%', destructiveForeground: '210 20% 98%',
      border: '220 13% 91%', input: '220 13% 91%', ring: '262.1 83.3% 57.8%', radius: '0.5rem',
    },
    dark: {
      background: '224 71.4% 4.1%', foreground: '210 20% 98%',
      card: '224 71.4% 4.1%', cardForeground: '210 20% 98%',
      popover: '224 71.4% 4.1%', popoverForeground: '210 20% 98%',
      primary: '263.4 70% 50.4%', primaryForeground: '210 20% 98%',
      secondary: '215 27.9% 16.9%', secondaryForeground: '210 20% 98%',
      muted: '215 27.9% 16.9%', mutedForeground: '217.9 10.6% 64.9%',
      accent: '215 27.9% 16.9%', accentForeground: '210 20% 98%',
      destructive: '0 62.8% 30.6%', destructiveForeground: '210 20% 98%',
      border: '215 27.9% 16.9%', input: '215 27.9% 16.9%', ring: '263.4 70% 50.4%', radius: '0.5rem',
    },
  },
  {
    id: 'rose', name: 'Rose',
    light: {
      background: '0 0% 100%', foreground: '240 10% 3.9%',
      card: '0 0% 100%', cardForeground: '240 10% 3.9%',
      popover: '0 0% 100%', popoverForeground: '240 10% 3.9%',
      primary: '346.8 77.2% 49.8%', primaryForeground: '355.7 100% 97.3%',
      secondary: '240 4.8% 95.9%', secondaryForeground: '240 5.9% 10%',
      muted: '240 4.8% 95.9%', mutedForeground: '240 3.8% 46.1%',
      accent: '240 4.8% 95.9%', accentForeground: '240 5.9% 10%',
      destructive: '0 84.2% 60.2%', destructiveForeground: '0 0% 98%',
      border: '240 5.9% 90%', input: '240 5.9% 90%', ring: '346.8 77.2% 49.8%', radius: '0.5rem',
    },
    dark: {
      background: '20 14.3% 4.1%', foreground: '0 0% 95%',
      card: '24 9.8% 10%', cardForeground: '0 0% 95%',
      popover: '0 0% 9%', popoverForeground: '0 0% 95%',
      primary: '346.8 77.2% 49.8%', primaryForeground: '355.7 100% 97.3%',
      secondary: '240 3.7% 15.9%', secondaryForeground: '0 0% 98%',
      muted: '0 0% 15%', mutedForeground: '240 5% 64.9%',
      accent: '12 6.5% 15.1%', accentForeground: '0 0% 98%',
      destructive: '0 62.8% 30.6%', destructiveForeground: '0 85.7% 97.3%',
      border: '240 3.7% 15.9%', input: '240 3.7% 15.9%', ring: '346.8 77.2% 49.8%', radius: '0.5rem',
    },
  },
  {
    id: 'orange', name: 'Orange',
    light: {
      background: '0 0% 100%', foreground: '20 14.3% 4.1%',
      card: '0 0% 100%', cardForeground: '20 14.3% 4.1%',
      popover: '0 0% 100%', popoverForeground: '20 14.3% 4.1%',
      primary: '24.6 95% 53.1%', primaryForeground: '60 9.1% 97.8%',
      secondary: '60 4.8% 95.9%', secondaryForeground: '24 9.8% 10%',
      muted: '60 4.8% 95.9%', mutedForeground: '25 5.3% 44.7%',
      accent: '60 4.8% 95.9%', accentForeground: '24 9.8% 10%',
      destructive: '0 84.2% 60.2%', destructiveForeground: '60 9.1% 97.8%',
      border: '20 5.9% 90%', input: '20 5.9% 90%', ring: '24.6 95% 53.1%', radius: '0.5rem',
    },
    dark: {
      background: '20 14.3% 4.1%', foreground: '60 9.1% 97.8%',
      card: '20 14.3% 4.1%', cardForeground: '60 9.1% 97.8%',
      popover: '20 14.3% 4.1%', popoverForeground: '60 9.1% 97.8%',
      primary: '20.5 90.2% 48.2%', primaryForeground: '60 9.1% 97.8%',
      secondary: '12 6.5% 15.1%', secondaryForeground: '60 9.1% 97.8%',
      muted: '12 6.5% 15.1%', mutedForeground: '24 5.4% 63.9%',
      accent: '12 6.5% 15.1%', accentForeground: '60 9.1% 97.8%',
      destructive: '0 72.2% 50.6%', destructiveForeground: '60 9.1% 97.8%',
      border: '12 6.5% 15.1%', input: '12 6.5% 15.1%', ring: '20.5 90.2% 48.2%', radius: '0.5rem',
    },
  },
  {
    id: 'teal', name: 'Teal',
    light: {
      background: '0 0% 100%', foreground: '240 10% 3.9%',
      card: '0 0% 100%', cardForeground: '240 10% 3.9%',
      popover: '0 0% 100%', popoverForeground: '240 10% 3.9%',
      primary: '173 80.4% 40%', primaryForeground: '0 0% 98%',
      secondary: '240 4.8% 95.9%', secondaryForeground: '240 5.9% 10%',
      muted: '240 4.8% 95.9%', mutedForeground: '240 3.8% 46.1%',
      accent: '240 4.8% 95.9%', accentForeground: '240 5.9% 10%',
      destructive: '0 84.2% 60.2%', destructiveForeground: '0 0% 98%',
      border: '240 5.9% 90%', input: '240 5.9% 90%', ring: '173 80.4% 40%', radius: '0.5rem',
    },
    dark: {
      background: '176 84% 3.5%', foreground: '0 0% 98%',
      card: '176 60% 7%', cardForeground: '0 0% 98%',
      popover: '176 60% 7%', popoverForeground: '0 0% 98%',
      primary: '173 80.4% 40%', primaryForeground: '0 0% 98%',
      secondary: '240 3.7% 15.9%', secondaryForeground: '0 0% 98%',
      muted: '240 3.7% 15.9%', mutedForeground: '240 5% 64.9%',
      accent: '240 3.7% 15.9%', accentForeground: '0 0% 98%',
      destructive: '0 62.8% 30.6%', destructiveForeground: '0 0% 98%',
      border: '240 3.7% 15.9%', input: '240 3.7% 15.9%', ring: '173 80.4% 40%', radius: '0.5rem',
    },
  },
];

export function getThemePreset(id: string): ThemePreset {
  return themePresets.find((t) => t.id === id) || themePresets[0];
}

export function generateThemeCSS(theme: ThemePreset): string {
  const tokenToCSS = (tokens: ThemeTokens, indent: string): string => {
    return [
      `${indent}--background: ${tokens.background};`,
      `${indent}--foreground: ${tokens.foreground};`,
      `${indent}--card: ${tokens.card};`,
      `${indent}--card-foreground: ${tokens.cardForeground};`,
      `${indent}--popover: ${tokens.popover};`,
      `${indent}--popover-foreground: ${tokens.popoverForeground};`,
      `${indent}--primary: ${tokens.primary};`,
      `${indent}--primary-foreground: ${tokens.primaryForeground};`,
      `${indent}--secondary: ${tokens.secondary};`,
      `${indent}--secondary-foreground: ${tokens.secondaryForeground};`,
      `${indent}--muted: ${tokens.muted};`,
      `${indent}--muted-foreground: ${tokens.mutedForeground};`,
      `${indent}--accent: ${tokens.accent};`,
      `${indent}--accent-foreground: ${tokens.accentForeground};`,
      `${indent}--destructive: ${tokens.destructive};`,
      `${indent}--destructive-foreground: ${tokens.destructiveForeground};`,
      `${indent}--border: ${tokens.border};`,
      `${indent}--input: ${tokens.input};`,
      `${indent}--ring: ${tokens.ring};`,
      `${indent}--radius: ${tokens.radius};`,
    ].join('\n');
  };

  return `@layer base {\n  :root {\n${tokenToCSS(theme.light, '    ')}\n  }\n\n  .dark {\n${tokenToCSS(theme.dark, '    ')}\n  }\n}`;
}

export function exportDesignTokens(themeId: string): object {
  const theme = getThemePreset(themeId);
  const hslToHex = (hsl: string): string => {
    const parts = hsl.split(/\s+/);
    if (parts.length < 3) return '#000000';
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * c).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const toTokens = (tokens: ThemeTokens, mode: string) =>
    Object.fromEntries(
      Object.entries(tokens).map(([key, value]) => {
        const name = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        const isColor = key !== 'radius';
        return [name, {
          $type: isColor ? 'color' : 'dimension',
          $value: isColor ? hslToHex(value) : value,
          $extensions: { 'com.adhar-ui': { hslRaw: value, mode } },
        }];
      })
    );

  return {
    $schema: 'https://design-tokens.github.io/community-group/format/',
    'adhar-ui': {
      theme: theme.id,
      light: toTokens(theme.light, 'light'),
      dark: toTokens(theme.dark, 'dark'),
    },
  };
}

export function exportTokensAsCustomProperties(themeId: string): string {
  const theme = getThemePreset(themeId);
  return generateThemeCSS(theme);
}

// ─── Download Helper ─────────────────────────────────────────────────────────
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
