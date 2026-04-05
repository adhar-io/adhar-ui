/**
 * Combined template registry.
 * All component + block templates indexed by name.
 */

import { tier1Templates } from './tier1.ts';
import { tier2Templates } from './tier2.ts';
import { tier3Templates } from './tier3.ts';
import { blockTemplates } from './blocks.ts';

export const allTemplates: Record<string, string> = {
  ...tier1Templates,
  ...tier2Templates,
  ...tier3Templates,
  ...blockTemplates,
};

export function getTemplate(name: string): string | undefined {
  return allTemplates[name];
}

export function hasTemplate(name: string): boolean {
  return name in allTemplates;
}

export function getTemplateCount(): number {
  return Object.keys(allTemplates).length;
}
