import { Show, useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface TimelineItemProps {
  title?: string;
  time?: string;
  /** Hide the connector on the last item */
  last?: boolean;
  className?: string;
  markerClass?: string;
  dotClass?: string;
  connectorClass?: string;
  contentClass?: string;
  titleClass?: string;
  timeClass?: string;
  /** Optional icon rendered inside the dot */
  icon?: any;
  children?: any;
}

export default function TimelineItem(props: TimelineItemProps) {
  return (
    <li className={props.className}>
      <div className={props.markerClass}>
        <span className={props.dotClass}>{props.icon}</span>
        <Show when={!props.last}>
          <span className={props.connectorClass} aria-hidden='true' />
        </Show>
      </div>
      <div className={props.contentClass}>
        <Show when={props.time}>
          <span className={props.timeClass}>{props.time}</span>
        </Show>
        <Show when={props.title}>
          <span className={props.titleClass}>{props.title}</span>
        </Show>
        {props.children}
      </div>
    </li>
  );
}
