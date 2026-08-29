// @ts-nocheck
<template>
  <div :class="props.className">
    <div class="flex items-center justify-between gap-2">
      <span class="text-sm font-medium text-muted-foreground">{{
        props.label
      }}</span>
      <template v-if="props.icon">
        <span class="text-muted-foreground [&_svg]:size-4">{{
          props.icon
        }}</span>
      </template>
    </div>
    <div
      class="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-foreground"
    >
      {{ props.value }}
    </div>
    <template v-if="props.trendValue || props.description">
      <div class="mt-2 flex items-center gap-2">
        <template v-if="props.trendValue">
          <span :class="props.trendClass">
            <template v-if="props.trend === 'up'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M17 7H8M17 7v9"></path>
              </svg>
            </template>

            <template v-if="props.trend === 'down'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 7l10 10M17 17V8M17 17H8"></path>
              </svg>
            </template>

            {{ props.trendValue }}</span
          >
        </template>

        <template v-if="props.description">
          <span class="text-xs text-muted-foreground">{{
            props.description
          }}</span>
        </template>
      </div>
    </template>

    <slot />
  </div>
</template>

<script lang="ts">
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

export default defineComponent({
  name: "stat-card",

  props: [
    "className",
    "label",
    "icon",
    "value",
    "trendValue",
    "description",
    "trendClass",
    "trend",
  ],
});
</script>