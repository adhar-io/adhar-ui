<script context="module" lang="ts">
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
</script>

<script lang="ts">
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

  export let className: TimelineItemProps["className"] = undefined;
  export let markerClass: TimelineItemProps["markerClass"] = undefined;
  export let variant: TimelineItemProps["variant"] = undefined;
  export let size: TimelineItemProps["size"] = undefined;
  export let dotClass: TimelineItemProps["dotClass"] = undefined;
  export let connectorClass: TimelineItemProps["connectorClass"] = undefined;
  export let contentClass: TimelineItemProps["contentClass"] = undefined;
  export let titleClass: TimelineItemProps["titleClass"] = undefined;
  export let timeClass: TimelineItemProps["timeClass"] = undefined;
  export let icon: TimelineItemProps["icon"] = undefined;
  export let last: TimelineItemProps["last"] = undefined;
  export let title: TimelineItemProps["title"] = undefined;
  export let time: TimelineItemProps["time"] = undefined;
  export let dateTime: TimelineItemProps["dateTime"] = undefined;

  $: classes = () => {
    return cn(timelineItemVariants(), className);
  };
  $: markerClasses = () => {
    return cn(timelineMarkerVariants(), markerClass);
  };
  $: dotClasses = () => {
    return cn(
      timelineDotVariants({
        variant: variant,
        size: size,
      }),
      dotClass
    );
  };
  $: connectorClasses = () => {
    return cn(timelineConnectorVariants(), connectorClass);
  };
  $: contentClasses = () => {
    return cn(timelineContentVariants(), contentClass);
  };
  $: titleClasses = () => {
    return cn(timelineTitleVariants(), "block", titleClass);
  };
  $: timeClasses = () => {
    return cn(timelineTimeVariants(), "block", timeClass);
  };
</script>

<li class={classes()}>
  <div aria-hidden="true" class={markerClasses()}>
    <span class={dotClasses()}>{icon}</span>
    {#if !last}
      <span class={connectorClasses()} />
    {/if}
  </div>
  <div class={contentClasses()}>
    {#if title}
      <span class={titleClasses()}>{title}</span>
    {/if}
    {#if time}
      <time {dateTime} class={timeClasses()}>{time}</time>
    {/if}<slot />
  </div>
</li>