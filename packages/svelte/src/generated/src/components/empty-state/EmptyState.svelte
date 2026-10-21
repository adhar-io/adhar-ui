<script context="module" lang="ts">
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
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import {
    emptyStateDescriptionVariants,
    emptyStateIconVariants,
    emptyStateTitleVariants,
    emptyStateVariants,
  } from "./empty-state.styles.ts";

  export let size: EmptyStateProps["size"] = undefined;
  export let className: EmptyStateProps["className"] = undefined;
  export let iconClass: EmptyStateProps["iconClass"] = undefined;
  export let titleClass: EmptyStateProps["titleClass"] = undefined;
  export let descriptionClass: EmptyStateProps["descriptionClass"] = undefined;
  export let role: EmptyStateProps["role"] = undefined;
  export let icon: EmptyStateProps["icon"] = undefined;
  export let title: EmptyStateProps["title"] = undefined;
  export let description: EmptyStateProps["description"] = undefined;

  $: classes = () => {
    return cn(
      emptyStateVariants({
        size: size,
      }),
      className
    );
  };
  $: iconClasses = () => {
    return cn(
      emptyStateIconVariants({
        size: size,
      }),
      iconClass
    );
  };
  $: titleClasses = () => {
    return cn(emptyStateTitleVariants(), titleClass);
  };
  $: descriptionClasses = () => {
    return cn(emptyStateDescriptionVariants(), descriptionClass);
  };
</script>

<div {role} class={classes()}>
  {#if icon}
    <div aria-hidden="true" class={iconClasses()}>{icon}</div>
  {/if}
  {#if title}
    <h3 class={titleClasses()}>{title}</h3>
  {/if}
  {#if description}
    <p class={descriptionClasses()}>{description}</p>
  {/if}
  {#if $$slots.default}
    <div class="mt-2 flex flex-wrap items-center justify-center gap-2">
      <slot />
    </div>
  {/if}
</div>