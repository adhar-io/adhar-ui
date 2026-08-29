import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface TimelineProps {
  className?: string;
  'aria-label'?: string;
  children?: any;
}

export default function Timeline(props: TimelineProps) {
  return (
    <ol className={props.className} aria-label={props['aria-label'] || 'Timeline'}>
      {props.children}
    </ol>
  );
}
