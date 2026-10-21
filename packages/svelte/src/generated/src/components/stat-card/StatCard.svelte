<script context="module" lang="ts">
  export interface StatCardProps {
    label?: string;
    value?: string | number;
    /** Trend direction — drives the badge color and arrow */
    trend?: "up" | "down" | "neutral";
    /** Trend text, e.g. "+12.5%" */
    trendValue?: string;
    /**
     * Flip the trend colors when lower is better (e.g. error rate, churn), so
     * "down" reads as good (green) and "up" as bad.
     */
    invertTrend?: boolean;
    /** Supporting text next to the trend, e.g. "vs last month" */
    description?: string;
    /** Optional leading icon element */
    icon?: any;
    /** Shows a skeleton in place of the value and trend */
    loading?: boolean;
    /** Hover / focus affordance; implied by `onClick` */
    interactive?: boolean;
    className?: string;
    /** Extra classes for the trend badge */
    trendClass?: string;
    onClick?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import {
    statCardTrendVariants,
    statCardVariants,
  } from "./stat-card.styles.ts";

  export let interactive: StatCardProps["interactive"] = undefined;
  export let onClick: StatCardProps["onClick"] = undefined;
  export let className: StatCardProps["className"] = undefined;
  export let trend: StatCardProps["trend"] = undefined;
  export let invertTrend: StatCardProps["invertTrend"] = undefined;
  export let trendClass: StatCardProps["trendClass"] = undefined;
  export let loading: StatCardProps["loading"] = undefined;
  export let label: StatCardProps["label"] = undefined;
  export let icon: StatCardProps["icon"] = undefined;
  export let value: StatCardProps["value"] = undefined;
  export let trendValue: StatCardProps["trendValue"] = undefined;
  export let description: StatCardProps["description"] = undefined;

  function handleKeyDown(event: any) {
    if (
      onClick &&
      event.target === event.currentTarget &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      onClick(event);
    }
  }
  $: classes = () => {
    return cn(
      statCardVariants({
        interactive: !!interactive || !!onClick,
      }),
      className
    );
  };
  $: trendColor = () => {
    const trend = trend || "neutral";
    if (!invertTrend || trend === "neutral") return trend;
    return trend === "up" ? "down" : "up";
  };
  $: trendClasses = () => {
    return cn(
      statCardTrendVariants({
        trend: trendColor(),
      }),
      trendClass
    );
  };
  $: trendSrText = () => {
    if (trend === "up") return "Increased by";
    if (trend === "down") return "Decreased by";
    return "Changed by";
  };
</script>

<div
  role={onClick ? "button" : undefined}
  tabIndex={onClick ? 0 : undefined}
  aria-busy={loading ? true : undefined}
  on:click={(event) => {
    onClick?.(event);
  }}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  class={classes()}
>
  <div class="flex items-center justify-between gap-2">
    <span class="text-sm font-medium text-muted-foreground">{label}</span>
    {#if icon}
      <span aria-hidden="true" class="text-muted-foreground [&_svg]:size-4"
        >{icon}</span
      >
    {/if}
  </div>
  {#if !loading}
    <div
      class="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-foreground"
    >
      {value}
    </div>

    {#if trendValue || description}
      <div class="mt-2 flex flex-wrap items-center gap-2">
        {#if trendValue}
          <span class={trendClasses()}>
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
            {/if}<span class="sr-only">{trendSrText()}</span>{trendValue}</span
          >
        {/if}
        {#if description}
          <span class="text-xs text-muted-foreground">{description}</span>
        {/if}
      </div>
    {/if}
  {:else}
    <div
      aria-hidden="true"
      class="mt-2 h-8 w-24 animate-pulse rounded-md bg-muted motion-reduce:animate-none"
    />
  {/if}<slot />
</div>