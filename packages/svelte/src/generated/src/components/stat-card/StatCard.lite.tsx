// @ts-nocheck
<script context="module" lang="ts">
  export interface StatCardProps {
    label?: string;
    value?: string;
    /** Trend direction — drives the badge color and arrow */
    trend?: "up" | "down" | "neutral";
    /** Trend text, e.g. "+12.5%" */
    trendValue?: string;
    /** Supporting text next to the trend, e.g. "vs last month" */
    description?: string;
    /** Optional leading icon element */
    icon?: any;
    className?: string;
    /** Class for the trend badge (compose with statCardTrendVariants) */
    trendClass?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: StatCardProps["className"];
  export let label: StatCardProps["label"];
  export let icon: StatCardProps["icon"];
  export let value: StatCardProps["value"];
  export let trendValue: StatCardProps["trendValue"];
  export let description: StatCardProps["description"];
  export let trendClass: StatCardProps["trendClass"];
  export let trend: StatCardProps["trend"];
</script>

<div class={className}>
  <div class="flex items-center justify-between gap-2">
    <span class="text-sm font-medium text-muted-foreground">{label}</span>
    {#if icon}
      <span class="text-muted-foreground [&_svg]:size-4">{icon}</span>
    {/if}
  </div>
  <div
    class="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-foreground"
  >
    {value}
  </div>
  {#if trendValue || description}
    <div class="mt-2 flex items-center gap-2">
      {#if trendValue}
        <span class={trendClass}>
          {#if trend === "up"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"><path d="M7 17 17 7M17 7H8M17 7v9" /></svg
            >
          {/if}
          {#if trend === "down"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"><path d="M7 7l10 10M17 17V8M17 17H8" /></svg
            >
          {/if}{trendValue}</span
        >
      {/if}
      {#if description}
        <span class="text-xs text-muted-foreground">{description}</span>
      {/if}
    </div>
  {/if}<slot />
</div>