/**
 * Push CVA component variants to Figma as component set properties.
 *
 * Reads the ComponentVariantMap from @adhar-ui/design-sync and
 * produces instructions for creating Figma component sets with
 * matching variant properties.
 *
 * @module
 */

import { buildComponentMap, generateVariantCombinations } from '@adhar-ui/design-sync';

/** Instructions for creating a Figma component set. */
export interface FigmaComponentSetInstruction {
  /** Component name (e.g., "Button"). */
  name: string;
  /** Variant properties to create. */
  properties: {
    name: string;
    values: string[];
    defaultValue: string;
  }[];
  /** All variant combinations to create as frames. */
  combinations: Record<string, string>[];
  /** Total number of variant frames. */
  totalFrames: number;
}

/**
 * Generate Figma component set creation instructions from a CVA config.
 *
 * @param componentName - Component name (e.g., "button")
 * @param title - Display name (e.g., "Button")
 * @param cvaConfig - CVA configuration object
 * @returns Instructions for creating the Figma component set
 */
export function componentPush(
  componentName: string,
  title: string,
  cvaConfig: {
    variants?: Record<string, Record<string, string>>;
    defaultVariants?: Record<string, string>;
  },
): FigmaComponentSetInstruction {
  const map = buildComponentMap(componentName, title, cvaConfig);

  return {
    name: map.title,
    properties: map.variantAxes.map((axis) => ({
      name: axis.axisName.charAt(0).toUpperCase() + axis.axisName.slice(1),
      values: axis.values.map((v) => v.charAt(0).toUpperCase() + v.slice(1)),
      defaultValue: axis.defaultValue.charAt(0).toUpperCase() + axis.defaultValue.slice(1),
    })),
    combinations: generateVariantCombinations(map),
    totalFrames: map.totalVariants,
  };
}
