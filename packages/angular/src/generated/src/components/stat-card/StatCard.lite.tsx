// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

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

@Component({
  selector: "stat-card",
  template: `
    <div [class]="className">
      <div class="flex items-center justify-between gap-2">
        <span class="text-sm font-medium text-muted-foreground">{{label}}</span>
        <ng-container *ngIf="icon"
          ><span
            class="text-muted-foreground [&_svg]:size-4"
            >{{icon}}</span
          ></ng-container
        >
      </div>
      <div
        class="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-foreground"
      >
        {{value}}
      </div>
      <ng-container *ngIf="trendValue || description"
        ><div class="mt-2 flex items-center gap-2">
          <ng-container *ngIf="trendValue"
            ><span [class]="trendClass"
              ><ng-container *ngIf="trend === 'up'"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M17 7H8M17 7v9"></path></svg
              ></ng-container>
              <ng-container *ngIf="trend === 'down'"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 7l10 10M17 17V8M17 17H8"></path></svg
              ></ng-container>
              {{trendValue}}</span
            ></ng-container
          >
          <ng-container *ngIf="description"
            ><span
              class="text-xs text-muted-foreground"
              >{{description}}</span
            ></ng-container
          >
        </div></ng-container
      >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export default class StatCard {
  @Input() className!: StatCardProps["className"];
  @Input() label!: StatCardProps["label"];
  @Input() icon!: StatCardProps["icon"];
  @Input() value!: StatCardProps["value"];
  @Input() trendValue!: StatCardProps["trendValue"];
  @Input() description!: StatCardProps["description"];
  @Input() trendClass!: StatCardProps["trendClass"];
  @Input() trend!: StatCardProps["trend"];
}
