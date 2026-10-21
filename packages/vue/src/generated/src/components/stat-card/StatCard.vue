<template>
  <div
    :role="onClick ? 'button' : undefined"
    :tabIndex="onClick ? 0 : undefined"
    :aria-busy="loading ? true : undefined"
    @click="async (event) => onClick?.(event)"
    @keydown="async (event) => handleKeyDown(event)"
    :class="classes"
  >
    <div class="flex items-center justify-between gap-2">
      <span class="text-sm font-medium text-muted-foreground">{{ label }}</span>
      <template v-if="icon">
        <span aria-hidden="true" class="text-muted-foreground [&_svg]:size-4">{{
          icon
        }}</span>
      </template>
    </div>
    <template v-if="!loading">
      <div
        class="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-foreground"
      >
        {{ value }}
      </div>

      <template v-if="trendValue || description">
        <div class="mt-2 flex flex-wrap items-center gap-2">
          <template v-if="trendValue">
            <span :class="trendClasses">
              <template v-if="trend === 'up'">
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

              <template v-if="trend === 'down'">
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

              <span class="sr-only">{{ trendSrText }}</span
              >{{ trendValue }}</span
            >
          </template>

          <template v-if="description">
            <span class="text-xs text-muted-foreground">{{ description }}</span>
          </template>
        </div>
      </template>
    </template>

    <template v-else>
      <div
        aria-hidden="true"
        class="mt-2 h-8 w-24 animate-pulse rounded-md bg-muted motion-reduce:animate-none"
      ></div>
    </template>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { statCardTrendVariants, statCardVariants } from "./stat-card.styles.ts";

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

export default defineComponent({
  name: "stat-card",

  props: [
    "interactive",
    "onClick",
    "className",
    "trend",
    "invertTrend",
    "trendClass",
    "loading",
    "label",
    "icon",
    "value",
    "trendValue",
    "description",
  ],

  computed: {
    classes() {
      return cn(
        statCardVariants({
          interactive: !!this.interactive || !!this.onClick,
        }),
        this.className
      );
    },
    trendColor() {
      const trend = this.trend || "neutral";
      if (!this.invertTrend || trend === "neutral") return trend;
      return trend === "up" ? "down" : "up";
    },
    trendClasses() {
      return cn(
        statCardTrendVariants({
          trend: this.trendColor,
        }),
        this.trendClass
      );
    },
    trendSrText() {
      if (this.trend === "up") return "Increased by";
      if (this.trend === "down") return "Decreased by";
      return "Changed by";
    },
  },

  methods: {
    handleKeyDown(event: any) {
      if (
        this.onClick &&
        event.target === event.currentTarget &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        this.onClick(event);
      }
    },
  },
});
</script>