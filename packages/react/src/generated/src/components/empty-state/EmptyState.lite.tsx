// @ts-nocheck
import * as React from "react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  /** Optional illustration/icon element shown in the media circle */
  icon?: any;
  className?: string;
  iconClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  /** Actions (buttons/links) rendered below the copy */
  children?: any;
}

function EmptyState(props: EmptyStateProps) {
  return (
    <div role="status" className={props.className}>
      {props.icon ? (
        <div aria-hidden="true" className={props.iconClass}>
          {props.icon}
        </div>
      ) : null}
      {props.title ? <h3 className={props.titleClass}>{props.title}</h3> : null}
      {props.description ? (
        <p className={props.descriptionClass}>{props.description}</p>
      ) : null}
      {props.children ? (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {props.children}
        </div>
      ) : null}
    </div>
  );
}

export default EmptyState;
