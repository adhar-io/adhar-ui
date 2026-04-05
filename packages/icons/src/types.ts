export interface IconProps {
  /** Icon name from the registry */
  name: string;
  /** Size in pixels. Default 24. */
  size?: number;
  /** Stroke width. Default 2. */
  strokeWidth?: number;
  /** CSS class name */
  class?: string;
  /** Color (defaults to currentColor) */
  color?: string;
  /** Accessible label. If provided, sets aria-label. Otherwise aria-hidden="true". */
  label?: string;
}

export interface IconDefinition {
  name: string;
  svg: string;
  keywords?: string[];
}
