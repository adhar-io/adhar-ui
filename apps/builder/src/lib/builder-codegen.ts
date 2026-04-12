// ─── Code Generation ─────────────────────────────────────────────────────────
// Generates proper framework code from CanvasNode trees.

import type { CanvasNode } from './builder-types.ts';

// ─── Tag mapping ─────────────────────────────────────────────────────────────
function nodeToTag(type: string): string {
  if (['flex', 'flex-col', 'grid', 'grid-3', 'section', 'card', 'nav', 'footer', 'sidebar',
    'hero-section', 'feature-card', 'pricing-card', 'cta-section', 'login-form', 'stat-card'].includes(type)) return 'div';
  if (['checkbox-row', 'switch-row'].includes(type)) return 'label';
  if (type.startsWith('btn-') || type === 'select-trigger') return 'button';
  if (type === 'label-el') return 'label';
  if (['img-placeholder', 'skeleton-text', 'progress-bar', 'empty-state-el'].includes(type)) return 'div';
  if (type === 'link' || type === 'menu-item') return 'a';
  if (type.startsWith('alert-') || type === 'badge-outline' || type === 'icon-placeholder') return 'span';
  return type;
}

// ─── React ───────────────────────────────────────────────────────────────────
function genReactJSX(nodes: CanvasNode[], depth = 2): string {
  return nodes.map((n) => {
    const sp = '  '.repeat(depth);
    const tag = nodeToTag(n.type);
    const cls = n.props.className ? ` className="${n.props.className}"` : '';
    const ph = n.props.placeholder ? ` placeholder="${n.props.placeholder}"` : '';
    const text = typeof n.props.children === 'string' ? n.props.children : '';
    const kids = genReactJSX(n.children, depth + 1);
    if (['input', 'textarea'].includes(tag)) return `${sp}<${tag}${cls}${ph} />`;
    if (n.children.length > 0) return `${sp}<${tag}${cls}>\n${text ? `${sp}  ${text}\n` : ''}${kids}\n${sp}</${tag}>`;
    return `${sp}<${tag}${cls}>${text}</${tag}>`;
  }).join('\n');
}

export function generateReactCode(nodes: CanvasNode[], pageName: string): string {
  const name = pageName.replace(/\.\w+$/, '').replace(/[^a-zA-Z0-9]/g, '') || 'Page';
  const jsx = genReactJSX(nodes);
  return `export default function ${name}() {\n  return (\n    <div className="mx-auto max-w-7xl px-4 py-8">\n${jsx}\n    </div>\n  );\n}\n`;
}

// ─── Vue SFC ─────────────────────────────────────────────────────────────────
function genVueTemplate(nodes: CanvasNode[], depth = 2): string {
  return nodes.map((n) => {
    const sp = '  '.repeat(depth);
    const tag = nodeToTag(n.type);
    const cls = n.props.className ? ` class="${n.props.className}"` : '';
    const ph = n.props.placeholder ? ` placeholder="${n.props.placeholder}"` : '';
    const text = typeof n.props.children === 'string' ? n.props.children : '';
    const kids = genVueTemplate(n.children, depth + 1);
    if (['input', 'textarea'].includes(tag)) return `${sp}<${tag}${cls}${ph} />`;
    if (n.children.length > 0) return `${sp}<${tag}${cls}>\n${text ? `${sp}  ${text}\n` : ''}${kids}\n${sp}</${tag}>`;
    return `${sp}<${tag}${cls}>${text}</${tag}>`;
  }).join('\n');
}

export function generateVueCode(nodes: CanvasNode[], pageName: string): string {
  const name = pageName.replace(/\.\w+$/, '').replace(/[^a-zA-Z0-9]/g, '') || 'Page';
  const tmpl = genVueTemplate(nodes);
  return `<script setup lang="ts">\n// ${name} component\n</script>\n\n<template>\n  <div class="mx-auto max-w-7xl px-4 py-8">\n${tmpl}\n  </div>\n</template>\n`;
}

// ─── Svelte ──────────────────────────────────────────────────────────────────
function genSvelteMarkup(nodes: CanvasNode[], depth = 1): string {
  return nodes.map((n) => {
    const sp = '  '.repeat(depth);
    const tag = nodeToTag(n.type);
    const cls = n.props.className ? ` class="${n.props.className}"` : '';
    const ph = n.props.placeholder ? ` placeholder="${n.props.placeholder}"` : '';
    const text = typeof n.props.children === 'string' ? n.props.children : '';
    const kids = genSvelteMarkup(n.children, depth + 1);
    if (['input', 'textarea'].includes(tag)) return `${sp}<${tag}${cls}${ph} />`;
    if (n.children.length > 0) return `${sp}<${tag}${cls}>\n${text ? `${sp}  ${text}\n` : ''}${kids}\n${sp}</${tag}>`;
    return `${sp}<${tag}${cls}>${text}</${tag}>`;
  }).join('\n');
}

export function generateSvelteCode(nodes: CanvasNode[], pageName: string): string {
  const name = pageName.replace(/\.\w+$/, '').replace(/[^a-zA-Z0-9]/g, '') || 'Page';
  const markup = genSvelteMarkup(nodes);
  return `<script lang="ts">\n  // ${name} component\n</script>\n\n<div class="mx-auto max-w-7xl px-4 py-8">\n${markup}\n</div>\n`;
}

// ─── Angular ─────────────────────────────────────────────────────────────────
export function generateAngularCode(nodes: CanvasNode[], pageName: string): string {
  const name = pageName.replace(/\.\w+$/, '').replace(/[^a-zA-Z0-9]/g, '') || 'Page';
  const selector = name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  const tmpl = genVueTemplate(nodes); // Angular templates use same class="" syntax
  return `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-${selector}',\n  standalone: true,\n  template: \`\n  <div class="mx-auto max-w-7xl px-4 py-8">\n${tmpl}\n  </div>\n  \`,\n})\nexport class ${name}Component {}\n`;
}

// ─── Solid ───────────────────────────────────────────────────────────────────
export function generateSolidCode(nodes: CanvasNode[], pageName: string): string {
  const name = pageName.replace(/\.\w+$/, '').replace(/[^a-zA-Z0-9]/g, '') || 'Page';
  const jsx = genReactJSX(nodes); // Solid uses same JSX syntax
  return `export default function ${name}() {\n  return (\n    <div class="mx-auto max-w-7xl px-4 py-8">\n${jsx.replace(/className=/g, 'class=')}\n    </div>\n  );\n}\n`;
}

// ─── HTML ────────────────────────────────────────────────────────────────────
function nodeToHTML(n: CanvasNode): string {
  const tag = ['flex', 'flex-col', 'grid', 'card', 'section', 'nav', 'footer', 'sidebar'].includes(n.type) ? 'div' : n.type.startsWith('btn-') ? 'button' : n.type === 'input' ? 'input' : n.type;
  const cls = n.props.className ? ` class="${n.props.className}"` : '';
  const text = typeof n.props.children === 'string' ? n.props.children : '';
  const kids = n.children.map(nodeToHTML).join('');
  if (tag === 'input') return `<input${cls} placeholder="${n.props.placeholder || ''}" />`;
  return `<${tag}${cls}>${text}${kids}</${tag}>`;
}

export function generateHTMLPage(nodes: CanvasNode[]): string {
  return `<!DOCTYPE html>\n<html>\n<head><script src="https://cdn.tailwindcss.com"><\/script></head>\n<body>\n<div class="mx-auto max-w-7xl px-4 py-8">\n${nodes.map(nodeToHTML).join('\n')}\n</div>\n</body>\n</html>`;
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────
export function generateCode(nodes: CanvasNode[], pageName: string, framework: string): string {
  switch (framework) {
    case 'vue': return generateVueCode(nodes, pageName);
    case 'svelte': return generateSvelteCode(nodes, pageName);
    case 'angular': return generateAngularCode(nodes, pageName);
    case 'solid': return generateSolidCode(nodes, pageName);
    default: return generateReactCode(nodes, pageName);
  }
}

export { nodeToHTML };
