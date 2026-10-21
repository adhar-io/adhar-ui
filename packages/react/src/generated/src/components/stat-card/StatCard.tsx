"use client";
import * as React from "react";

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

import { cn } from "@adhar-ui/utils";
import { statCardTrendVariants, statCardVariants } from "./stat-card.styles.ts";

function StatCard(props: StatCardProps) {
  function classes() {
    return cn(
      statCardVariants({
        interactive: !!props.interactive || !!props.onClick,
      }),
      props.className
    );
  }

  function trendColor() {
    const trend = props.trend || "neutral";
    if (!props.invertTrend || trend === "neutral") return trend;
    return trend === "up" ? "down" : "up";
  }

  function trendClasses() {
    return cn(
      statCardTrendVariants({
        trend: trendColor(),
      }),
      props.trendClass
    );
  }

  function trendSrText() {
    if (props.trend === "up") return "Increased by";
    if (props.trend === "down") return "Decreased by";
    return "Changed by";
  }

  function handleKeyDown(event: any) {
    if (
      props.onClick &&
      event.target === event.currentTarget &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      props.onClick(event);
    }
  }

  return (
    <div
      role={props.onClick ? "button" : undefined}
      tabIndex={props.onClick ? 0 : undefined}
      aria-busy={props.loading ? true : undefined}
      onClick={(event) => props.onClick?.(event)}
      onKeyDown={(event) => handleKeyDown(event)}
      className={classes()}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {props.label}
        </span>
        {props.icon ? (
          <span
            aria-hidden="true"
            className="text-muted-foreground [&_svg]:size-4"
          >
            {props.icon}
          </span>
        ) : null}
      </div>
      {!props.loading ? (
        <>
          <div className="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-foreground">
            {props.value}
          </div>
          {props.trendValue || props.description ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {props.trendValue ? (
                <span className={trendClasses()}>
                  {props.trend === "up" ? (
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
                      <path d="M7 17 17 7M17 7H8M17 7v9" />
                    </svg>
                  ) : null}
                  {props.trend === "down" ? (
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
                      <path d="M7 7l10 10M17 17V8M17 17H8" />
                    </svg>
                  ) : null}
                  <span className="sr-only">{trendSrText()}</span>
                  {props.trendValue}
                </span>
              ) : null}
              {props.description ? (
                <span className="text-xs text-muted-foreground">
                  {props.description}
                </span>
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="mt-2 h-8 w-24 animate-pulse rounded-md bg-muted motion-reduce:animate-none"
          />
        </>
      )}
      {props.children}
    </div>
  );
}

export default StatCard;
