// @ts-nocheck
import { Show } from "solid-js";

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
    <div class={props.className} role="status">
      <Show when={props.icon}>
        <div class={props.iconClass} aria-hidden="true">
          {props.icon}
        </div>
      </Show>
      <Show when={props.title}>
        <h3 class={props.titleClass}>{props.title}</h3>
      </Show>
      <Show when={props.description}>
        <p class={props.descriptionClass}>{props.description}</p>
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
