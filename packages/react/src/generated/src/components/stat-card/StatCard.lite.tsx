// @ts-nocheck
import * as React from "react";

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

function StatCard(props: StatCardProps) {
  return (
    <div className={props.className}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {props.label}
        </span>
        {props.icon ? (
          <span className="text-muted-foreground [&_svg]:size-4">
            {props.icon}
          </span>
        ) : null}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-foreground">
        {props.value}
      </div>
      {props.trendValue || props.description ? (
        <div className="mt-2 flex items-center gap-2">
          {props.trendValue ? (
            <span className={props.trendClass}>
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
      {props.children}
    </div>
  );
}

export default StatCard;
