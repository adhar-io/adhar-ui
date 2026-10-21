// @ts-nocheck
import { Show, createSignal, createMemo } from "solid-js";

export interface TimelineItemProps {
  title?: string;
  /** Display text for the timestamp, e.g. "2 hours ago" */
  time?: string;
  /** Machine-readable timestamp for the <time> element, e.g. "2026-10-21T09:00" */
  dateTime?: string;
  /** Dot color */
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "destructive"
    | "outline";
  /** Dot size; use ’lg’ to fit an icon */
  size?: "sm" | "default" | "lg";
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

import { cn } from "@adhar-ui/utils";
import {
  timelineConnectorVariants,
  timelineContentVariants,
  timelineDotVariants,
  timelineItemVariants,
  timelineMarkerVariants,
  timelineTimeVariants,
  timelineTitleVariants,
} from "./timeline.styles.ts";

function TimelineItem(props: TimelineItemProps) {
  const classes = createMemo(() => {
    return cn(timelineItemVariants(), props.className);
  });

  const markerClasses = createMemo(() => {
    return cn(timelineMarkerVariants(), props.markerClass);
  });

  const dotClasses = createMemo(() => {
    return cn(
      timelineDotVariants({
        variant: props.variant,
        size: props.size,
      }),
      props.dotClass
    );
  });

  const connectorClasses = createMemo(() => {
    return cn(timelineConnectorVariants(), props.connectorClass);
  });

  const contentClasses = createMemo(() => {
    return cn(timelineContentVariants(), props.contentClass);
  });

  const titleClasses = createMemo(() => {
    return cn(timelineTitleVariants(), "block", props.titleClass);
  });

  const timeClasses = createMemo(() => {
    return cn(timelineTimeVariants(), "block", props.timeClass);
  });

  return (
    <li class={classes()}>
      <div class={markerClasses()} aria-hidden="true">
        <span class={dotClasses()}>{props.icon}</span>
        <Show when={!props.last}>
          <span class={connectorClasses()}></span>
        </Show>
      </div>
      <div class={contentClasses()}>
        <Show when={props.title}>
          <span class={titleClasses()}>{props.title}</span>
        </Show>
        <Show when={props.time}>
          <time class={timeClasses()} dateTime={props.dateTime}>
            {props.time}
          </time>
        </Show>
        {props.children}
      </div>
    </li>
  );
}

export default TimelineItem;
