// @ts-nocheck
<script context="module" lang="ts">
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
</script>

<script lang="ts">
  export let className: EmptyStateProps["className"];
  export let icon: EmptyStateProps["icon"];
  export let iconClass: EmptyStateProps["iconClass"];
  export let title: EmptyStateProps["title"];
  export let titleClass: EmptyStateProps["titleClass"];
  export let description: EmptyStateProps["description"];
  export let descriptionClass: EmptyStateProps["descriptionClass"];
</script>

<div role="status" class={className}>
  {#if icon}
    <div aria-hidden="true" class={iconClass}>{icon}</div>
  {/if}
  {#if title}
    <h3 class={titleClass}>{title}</h3>
  {/if}
  {#if description}
    <p class={descriptionClass}>{description}</p>
  {/if}
  {#if $$slots.default}
    <div class="mt-2 flex flex-wrap items-center justify-center gap-2">
      <slot />
    </div>
  {/if}
</div>