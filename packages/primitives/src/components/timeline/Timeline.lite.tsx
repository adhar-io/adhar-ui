import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { timelineVariants } from './timeline.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-timeline' },
});

export interface TimelineProps {
  className?: string;
  id?: string;
  'aria-label'?: string;
  children?: any;
}

export default function Timeline(props: TimelineProps) {
  const state = useStore({
    get classes(): string {
      return cn(timelineVariants(), props.className);
    },
  });

  return (
    <ol className={state.classes} id={props.id} aria-label={props['aria-label'] || 'Timeline'}>
      {props.children}
    </ol>
  );
}
