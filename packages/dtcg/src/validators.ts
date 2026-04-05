/**
 * DTCG JSON schema validation utilities.
 *
 * Validates that a DTCG document conforms to the W3C DTCG spec
 * and contains the expected Adhar UI token structure.
 *
 * @module
 */

import type { DTCGToken, DTCGTokenType } from './types.ts';

/** Validation error details. */
export interface ValidationError {
  path: string;
  message: string;
}

/** Validation result. */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/** Valid DTCG token types. */
const VALID_TYPES: Set<DTCGTokenType> = new Set([
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'number',
  'strokeStyle',
  'border',
  'transition',
  'shadow',
  'gradient',
  'typography',
]);

/**
 * Validate a DTCG document for Adhar UI compatibility.
 *
 * Checks:
 * - Root 'adhar-ui' group exists
 * - All tokens have valid $type and $value
 * - Color tokens have valid hex values
 * - Dimension tokens have valid CSS values
 *
 * @param doc - Document to validate
 * @returns Validation result with any errors
 */
export function validateDtcg(doc: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (typeof doc !== 'object' || doc === null) {
    errors.push({ path: '', message: 'Document must be a non-null object' });
    return { valid: false, errors };
  }

  const obj = doc as Record<string, unknown>;

  if (!obj['adhar-ui'] || typeof obj['adhar-ui'] !== 'object') {
    errors.push({ path: '', message: 'Missing root "adhar-ui" group' });
    return { valid: false, errors };
  }

  // Walk and validate all tokens
  walkAndValidate(obj['adhar-ui'] as Record<string, unknown>, 'adhar-ui', errors);

  return { valid: errors.length === 0, errors };
}

/**
 * Recursively validate tokens and groups.
 */
function walkAndValidate(
  group: Record<string, unknown>,
  path: string,
  errors: ValidationError[],
): void {
  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith('$')) continue;

    const currentPath = `${path}.${key}`;

    if (typeof value !== 'object' || value === null) {
      // Primitive values at wrong level
      if (typeof value !== 'string') {
        errors.push({ path: currentPath, message: `Unexpected value type: ${typeof value}` });
      }
      continue;
    }

    const obj = value as Record<string, unknown>;

    // Check if this is a token (has $type and $value)
    if ('$type' in obj && '$value' in obj) {
      validateToken(obj as unknown as DTCGToken, currentPath, errors);
    } else {
      // Recurse into group
      walkAndValidate(obj, currentPath, errors);
    }
  }
}

/**
 * Validate a single DTCG token.
 */
function validateToken(token: DTCGToken, path: string, errors: ValidationError[]): void {
  // Validate $type
  if (!VALID_TYPES.has(token.$type)) {
    errors.push({ path, message: `Invalid token type: "${token.$type}"` });
  }

  // Validate $value based on type
  if (token.$type === 'color') {
    const val = String(token.$value);
    if (!val.match(/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/)) {
      errors.push({ path, message: `Invalid color value: "${val}" (expected hex like #rrggbb)` });
    }
  } else if (token.$type === 'dimension') {
    const val = String(token.$value);
    if (!val.match(/^-?\d+(\.\d+)?(px|rem|em|%|vh|vw)?$/)) {
      errors.push({ path, message: `Invalid dimension value: "${val}"` });
    }
  }
}
