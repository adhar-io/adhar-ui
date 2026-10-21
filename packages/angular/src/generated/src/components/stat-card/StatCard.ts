// @ts-nocheck
import { Output, EventEmitter, Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

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

@Component({
  selector: "adhar-stat-card",
  template: `
    <div
      [attr.role]="onClick ? 'button' : undefined"
      [attr.tabIndex]="onClick ? 0 : undefined"
      [attr.aria-busy]="loading ? true : undefined"
      (click)="onClick?.($event)"
      (keydown)="handleKeyDown($event)"
      [class]="classes"
    >
      <div class="flex items-center justify-between gap-2">
        <span class="text-sm font-medium text-muted-foreground">{{label}}</span>
        <ng-container *ngIf="icon"
          ><span
            aria-hidden="true"
            class="text-muted-foreground [&_svg]:size-4"
            >{{icon}}</span
          ></ng-container
        >
      </div>
      <ng-container *ngIf="!loading"
        ><div
          class="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-foreground"
        >
          {{value}}
        </div>
        <ng-container *ngIf="trendValue || description"
          ><div class="mt-2 flex flex-wrap items-center gap-2">
            <ng-container *ngIf="trendValue"
              ><span [class]="trendClasses"
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
                <span class="sr-only">{{trendSrText}}</span>
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
        ></ng-container
      ><ng-container *ngIf="!(!loading)"
        ><div
          aria-hidden="true"
          class="mt-2 h-8 w-24 animate-pulse rounded-md bg-muted motion-reduce:animate-none"
        ></div
      ></ng-container>
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
  @Input() interactive!: StatCardProps["interactive"];
  @Input() className!: StatCardProps["className"];
  @Input() trend!: StatCardProps["trend"];
  @Input() invertTrend!: StatCardProps["invertTrend"];
  @Input() trendClass!: StatCardProps["trendClass"];
  @Input() loading!: StatCardProps["loading"];
  @Input() label!: StatCardProps["label"];
  @Input() icon!: StatCardProps["icon"];
  @Input() value!: StatCardProps["value"];
  @Input() trendValue!: StatCardProps["trendValue"];
  @Input() description!: StatCardProps["description"];
  @Output() onClick = new EventEmitter<any>();

  get classes() {
    return cn(
      statCardVariants({
        interactive: !!this.interactive || !!this.onClick,
      }),
      this.className
    );
  }
  get trendColor() {
    const trend = this.trend || "neutral";
    if (!this.invertTrend || trend === "neutral") return trend;
    return trend === "up" ? "down" : "up";
  }
  get trendClasses() {
    return cn(
      statCardTrendVariants({
        trend: this.trendColor,
      }),
      this.trendClass
    );
  }
  get trendSrText() {
    if (this.trend === "up") return "Increased by";
    if (this.trend === "down") return "Decreased by";
    return "Changed by";
  }
  handleKeyDown(event: any) {
    if (
      this.onClick &&
      event.target === event.currentTarget &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      this.onClick.emit(event);
    }
  }
}
