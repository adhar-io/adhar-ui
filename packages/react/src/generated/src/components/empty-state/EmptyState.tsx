"use client";
import * as React from "react";
import { useState } from "react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  size?: "sm" | "default" | "lg";
  /** Optional illustration/icon element shown in the media circle */
  icon?: any;
  /**
   * ARIA role. Use "status" when the empty state appears in response to a
   * user action (e.g. a search with no results) so it is announced.
   */
  role?: string;
  className?: string;
  iconClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  /** Actions (buttons/links) rendered below the copy */
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import {
  emptyStateDescriptionVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateVariants,
} from "./empty-state.styles.ts";

function EmptyState(props: EmptyStateProps) {
  function classes() {
    return cn(
      emptyStateVariants({
        size: props.size,
      }),
      props.className
    );
  }

  function iconClasses() {
    return cn(
      emptyStateIconVariants({
        size: props.size,
      }),
      props.iconClass
    );
  }

  function titleClasses() {
    return cn(emptyStateTitleVariants(), props.titleClass);
  }

  function descriptionClasses() {
    return cn(emptyStateDescriptionVariants(), props.descriptionClass);
  }

  const [styles, setStyles] = useState(() => null);

  return (
    <div role={props.role} className={classes()}>
      {props.icon ? (
        <div aria-hidden="true" className={iconClasses()}>
          {props.icon}
        </div>
      ) : null}
      {props.title ? <h3 className={titleClasses()}>{props.title}</h3> : null}
      {props.description ? (
        <p className={descriptionClasses()}>{props.description}</p>
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
