import { Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import {
  timelineConnectorVariants,
  timelineContentVariants,
  timelineDotVariants,
  timelineItemVariants,
  timelineMarkerVariants,
  timelineTimeVariants,
  timelineTitleVariants,
} from './timeline.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-timeline-item' },
});

export interface TimelineItemProps {
  title?: string;
  /** Display text for the timestamp, e.g. "2 hours ago" */
  time?: string;
  /** Machine-readable timestamp for the <time> element, e.g. "2026-10-21T09:00" */
  dateTime?: string;
  /** Dot color */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'outline';
  /** Dot size; use ’lg’ to fit an icon */
  size?: 'sm' | 'default' | 'lg';
  /** Hide the connector on the last item */
  last?: boolean;
  className?: string;
  markerClass?: string;
  dotClass?: string;
  connectorClass?: string;
  contentClass?: string;
  titleClass?: string;
  timeClass?: string;
  /** Optional icon rendered inside the dot (pair with size="lg") */
  icon?: any;
  children?: any;
}

export default function TimelineItem(props: TimelineItemProps) {
  const state = useStore({
    get classes(): string {
      return cn(timelineItemVariants(), props.className);
    },
    get markerClasses(): string {
      return cn(timelineMarkerVariants(), props.markerClass);
    },
    get dotClasses(): string {
      return cn(timelineDotVariants({ variant: props.variant, size: props.size }), props.dotClass);
    },
    get connectorClasses(): string {
      return cn(timelineConnectorVariants(), props.connectorClass);
    },
    get contentClasses(): string {
      return cn(timelineContentVariants(), props.contentClass);
    },
    get titleClasses(): string {
      return cn(timelineTitleVariants(), 'block', props.titleClass);
    },
    get timeClasses(): string {
      return cn(timelineTimeVariants(), 'block', props.timeClass);
    },
  });

  return (
    <li className={state.classes}>
      <div className={state.markerClasses} aria-hidden='true'>
        <span className={state.dotClasses}>{props.icon}</span>
        <Show when={!props.last}>
          <span className={state.connectorClasses} />
        </Show>
      </div>
      <div className={state.contentClasses}>
        <Show when={props.title}>
          <span className={state.titleClasses}>{props.title}</span>
        </Show>
        <Show when={props.time}>
          <time className={state.timeClasses} dateTime={props.dateTime}>{props.time}</time>
        </Show>
        {props.children}
      </div>
    </li>
  );
}
