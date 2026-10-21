// @ts-nocheck
import { Show, createSignal, createMemo } from "solid-js";

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
  const classes = createMemo(() => {
    return cn(
      emptyStateVariants({
        size: props.size,
      }),
      props.className
    );
  });

  const iconClasses = createMemo(() => {
    return cn(
      emptyStateIconVariants({
        size: props.size,
      }),
      props.iconClass
    );
  });

  const titleClasses = createMemo(() => {
    return cn(emptyStateTitleVariants(), props.titleClass);
  });

  const descriptionClasses = createMemo(() => {
    return cn(emptyStateDescriptionVariants(), props.descriptionClass);
  });

  return (
    <div class={classes()} role={props.role}>
      <Show when={props.icon}>
        <div class={iconClasses()} aria-hidden="true">
          {props.icon}
        </div>
      </Show>
      <Show when={props.title}>
        <h3 class={titleClasses()}>{props.title}</h3>
      </Show>
      <Show when={props.description}>
        <p class={descriptionClasses()}>{props.description}</p>
      </Show>
      <Show when={props.children}>
        <div class="mt-2 flex flex-wrap items-center justify-center gap-2">
          {props.children}
        </div>
      </Show>
    </div>
  );
}

export default EmptyState;
