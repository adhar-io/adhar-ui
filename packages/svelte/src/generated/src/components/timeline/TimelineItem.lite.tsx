// @ts-nocheck
<script context="module" lang="ts">
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
</script>

<script lang="ts">
  export let className: TimelineItemProps["className"];
  export let markerClass: TimelineItemProps["markerClass"];
  export let dotClass: TimelineItemProps["dotClass"];
  export let icon: TimelineItemProps["icon"];
  export let last: TimelineItemProps["last"];
  export let connectorClass: TimelineItemProps["connectorClass"];
  export let contentClass: TimelineItemProps["contentClass"];
  export let time: TimelineItemProps["time"];
  export let timeClass: TimelineItemProps["timeClass"];
  export let title: TimelineItemProps["title"];
  export let titleClass: TimelineItemProps["titleClass"];
</script>

<li class={className}>
  <div class={markerClass}>
    <span class={dotClass}>{icon}</span>
    {#if !last}
      <span aria-hidden="true" class={connectorClass} />
    {/if}
  </div>
  <div class={contentClass}>
    {#if time}
      <span class={timeClass}>{time}</span>
    {/if}
    {#if title}
      <span class={titleClass}>{title}</span>
    {/if}<slot />
  </div>
</li>