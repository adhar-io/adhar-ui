import * as React from "react";

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
  function classes() {
    return cn(timelineItemVariants(), props.className);
  }

  function markerClasses() {
    return cn(timelineMarkerVariants(), props.markerClass);
  }

  function dotClasses() {
    return cn(
      timelineDotVariants({
        variant: props.variant,
        size: props.size,
      }),
      props.dotClass
    );
  }

  function connectorClasses() {
    return cn(timelineConnectorVariants(), props.connectorClass);
  }

  function contentClasses() {
    return cn(timelineContentVariants(), props.contentClass);
  }

  function titleClasses() {
    return cn(timelineTitleVariants(), "block", props.titleClass);
  }

  function timeClasses() {
    return cn(timelineTimeVariants(), "block", props.timeClass);
  }

  return (
    <li className={classes()}>
      <div aria-hidden="true" className={markerClasses()}>
        <span className={dotClasses()}>{props.icon}</span>
        {!props.last ? <span className={connectorClasses()} /> : null}
      </div>
      <div className={contentClasses()}>
        {props.title ? (
          <span className={titleClasses()}>{props.title}</span>
        ) : null}
        {props.time ? (
          <time dateTime={props.dateTime} className={timeClasses()}>
            {props.time}
          </time>
        ) : null}
        {props.children}
      </div>
    </li>
  );
}

export default TimelineItem;
