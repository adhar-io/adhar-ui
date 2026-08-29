// @ts-nocheck
import { Show } from "solid-js";

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

function TimelineItem(props: TimelineItemProps) {
  return (
    <li class={props.className}>
      <div class={props.markerClass}>
        <span class={props.dotClass}>{props.icon}</span>
        <Show when={!props.last}>
          <span class={props.connectorClass} aria-hidden="true"></span>
        </Show>
      </div>
      <div class={props.contentClass}>
        <Show when={props.time}>
          <span class={props.timeClass}>{props.time}</span>
        </Show>
        <Show when={props.title}>
          <span class={props.titleClass}>{props.title}</span>
        </Show>
        {props.children}
      </div>
    </li>
  );
}

export default TimelineItem;
