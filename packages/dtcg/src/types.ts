/**
 * W3C Design Tokens Community Group (DTCG) type definitions.
 *
 * Based on the DTCG specification (v1, stable October 2025).
 * See: https://www.designtokens.org/
 *
 * @module
 */

/** Valid DTCG token types as defined by the spec. */
export type DTCGTokenType =
  | 'color'
  | 'dimension'
  | 'fontFamily'
  | 'fontWeight'
  | 'duration'
  | 'cubicBezier'
  | 'number'
  | 'strokeStyle'
  | 'border'
  | 'transition'
  | 'shadow'
  | 'gradient'
  | 'typography';

/** Adhar UI extension namespace for preserving HSL round-trip fidelity. */
export interface AdharUIExtension {
  /** Original HSL triplet string (e.g. "240 5.9% 10%") for lossless round-trip. */
  hslRaw: string;
  /** Which theme mode this value belongs to. */
  mode?: 'light' | 'dark';
}

/** A single DTCG token with type, value, and optional metadata. */
export interface DTCGToken {
  /** The token type (e.g. "color", "dimension"). */
  $type: DTCGTokenType;
  /** The token value (hex for colors, string for dimensions). */
  $value: string | number | Record<string, unknown>;
  /** Human-readable description of the token's purpose. */
  $description?: string;
  /** Vendor extensions. */
  $extensions?: {
    'com.adhar-ui'?: AdharUIExtension;
    [key: string]: unknown;
  };
}

/** A DTCG group: can contain tokens or nested groups. */
export interface DTCGGroup {
  /** Optional description for the group. */
  $description?: string;
  /** Optional type inherited by child tokens. */
  $type?: DTCGTokenType;
  /** Child tokens or sub-groups (keys without $ prefix). */
  [key: string]: DTCGToken | DTCGGroup | string | undefined;
}

/** Root DTCG document shape. */
export interface DTCGDocument {
  'adhar-ui': DTCGGroup;
}

/** RGBA color representation used by Figma Variables API. */
export interface FigmaRGBA {
  r: number; // 0-1
  g: number; // 0-1
  b: number; // 0-1
  a: number; // 0-1
}

/** Figma variable value entry (per mode). */
export interface FigmaVariableValue {
  type: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  value: FigmaRGBA | number | string | boolean;
}

/** Figma variable definition from the REST API. */
export interface FigmaVariable {
  id: string;
  name: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  valuesByMode: Record<string, FigmaRGBA | number | string | boolean>;
}

/** Figma variable collection from the REST API. */
export interface FigmaVariableCollection {
  id: string;
  name: string;
  modes: { modeId: string; name: string }[];
  variableIds: string[];
}

/** Penpot library color entry. */
export interface PenpotColor {
  id: string;
  name: string;
  color: string; // hex
  opacity: number; // 0-1
  path?: string; // group path (e.g. "primary")
}
