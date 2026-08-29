import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CommandProps {
  className?: string;
  'aria-label'?: string;
  children?: any;
}

// Command menu / palette container. Filtering & keyboard navigation are driven
// by the consumer (controlled), keeping the primitive framework-portable.
export default function Command(props: CommandProps) {
  return (
    <div className={props.className} aria-label={props['aria-label'] || 'Command menu'}>
      {props.children}
    </div>
  );
}
