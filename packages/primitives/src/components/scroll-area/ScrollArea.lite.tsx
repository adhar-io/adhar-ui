import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface ScrollAreaProps {
  orientation?: 'vertical' | 'horizontal' | 'both';
  className?: string;
  /** Adds tabindex so keyboard users can scroll the region */
  focusable?: boolean;
  'aria-label'?: string;
  children?: any;
}

export default function ScrollArea(props: ScrollAreaProps) {
  return (
    <div
      className={props.className}
      tabIndex={props.focusable ? 0 : undefined}
      role={props.focusable ? 'region' : undefined}
      aria-label={props['aria-label']}
      data-orientation={props.orientation || 'vertical'}
    >
      {props.children}
    </div>
  );
}
