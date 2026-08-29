// @ts-nocheck
import * as React from "react";

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
    <li className={props.className}>
      <div className={props.markerClass}>
        <span className={props.dotClass}>{props.icon}</span>
        {!props.last ? (
          <span aria-hidden="true" className={props.connectorClass} />
        ) : null}
      </div>
      <div className={props.contentClass}>
        {props.time ? (
          <span className={props.timeClass}>{props.time}</span>
        ) : null}
        {props.title ? (
          <span className={props.titleClass}>{props.title}</span>
        ) : null}
        {props.children}
      </div>
    </li>
  );
}

export default TimelineItem;
