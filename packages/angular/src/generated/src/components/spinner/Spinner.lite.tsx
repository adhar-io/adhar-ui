// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SpinnerProps {
  size?: "sm" | "default" | "lg";
  className?: string;
  "aria-label"?: string;
}

@Component({
  selector: "spinner",
  template: `
    <div
      role="status"
      [attr.aria-label]="'aria-label' || 'Loading'"
      [class]="className"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          opacity="0.25"
        ></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          opacity="0.75"
        ></path>
      </svg>
      <span class="sr-only">{{'aria-label' || 'Loading'}}</span>
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
export default class Spinner {
  @Input() className!: SpinnerProps["className"];
}
