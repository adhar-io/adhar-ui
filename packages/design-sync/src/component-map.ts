/**
 * Component variant mapping between CVA definitions and design tool variants.
 *
 * Reflects on CVA variant exports from @adhar-ui/primitives to produce
 * a structured map that design tools can use to create component sets
 * with matching variant properties.
 *
 * @module
 */

/** A single variant axis (e.g., "variant" or "size"). */
export interface VariantAxis {
  /** Axis name (e.g., "variant", "size"). */
  axisName: string;
  /** All possible values for this axis. */
  values: string[];
  /** The default value. */
  defaultValue: string;
  /** Map of value → Tailwind class string. */
  classMap: Record<string, string>;
}

/** Complete variant mapping for a component. */
export interface ComponentVariantMap {
  /** Component name (e.g., "button"). */
  componentName: string;
  /** Human-readable title (e.g., "Button"). */
  title: string;
  /** Base Tailwind classes applied to all variants. */
  baseClasses: string;
  /** Variant axes with all values and defaults. */
  variantAxes: VariantAxis[];
  /** Total number of variant combinations. */
  totalVariants: number;
}

/**
 * Build a ComponentVariantMap from a CVA config object.
 *
 * CVA variant functions expose their config via the function object.
 * This function extracts the variant axes, values, and defaults.
 *
 * @param componentName - Component identifier (e.g., "button")
 * @param title - Display name (e.g., "Button")
 * @param cvaConfig - The CVA configuration object (second arg to cva())
 *
 * @example
 * ```ts
 * // The CVA config is the second argument to cva():
 * const config = {
 *   variants: { variant: { default: '...', outline: '...' }, size: { sm: '...', lg: '...' } },
 *   defaultVariants: { variant: 'default', size: 'sm' }
 * }
 * const map = buildComponentMap('button', 'Button', config)
 * ```
 */
export function buildComponentMap(
  componentName: string,
  title: string,
  cvaConfig: {
    variants?: Record<string, Record<string, string>>;
    defaultVariants?: Record<string, string>;
  },
  baseClasses = '',
): ComponentVariantMap {
  const axes: VariantAxis[] = [];
  const variants = cvaConfig.variants ?? {};
  const defaults = cvaConfig.defaultVariants ?? {};

  for (const [axisName, valuesMap] of Object.entries(variants)) {
    const values = Object.keys(valuesMap);
    axes.push({
      axisName,
      values,
      defaultValue: defaults[axisName] ?? values[0] ?? '',
      classMap: valuesMap,
    });
  }

  // Calculate total variant combinations
  const totalVariants = axes.reduce(
    (total, axis) => total * axis.values.length,
    axes.length > 0 ? 1 : 0,
  );

  return {
    componentName,
    title,
    baseClasses,
    variantAxes: axes,
    totalVariants,
  };
}

/**
 * Generate all variant combinations for a component.
 * Used when creating design tool component sets with one frame per combination.
 *
 * @param map - Component variant map
 * @returns Array of variant property objects (e.g., [{ variant: "default", size: "sm" }, ...])
 */
export function generateVariantCombinations(
  map: ComponentVariantMap,
): Record<string, string>[] {
  if (map.variantAxes.length === 0) return [{}];

  const combinations: Record<string, string>[] = [];
  const axes = map.variantAxes;

  function recurse(index: number, current: Record<string, string>): void {
    if (index === axes.length) {
      combinations.push({ ...current });
      return;
    }
    for (const value of axes[index].values) {
      current[axes[index].axisName] = value;
      recurse(index + 1, current);
    }
  }

  recurse(0, {});
  return combinations;
}
