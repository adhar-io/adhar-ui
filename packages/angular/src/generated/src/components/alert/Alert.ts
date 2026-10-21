// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AlertProps {
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  /**
   * ARIA role. Defaults to "alert" (assertive) for destructive / warning and
   * "status" (polite) otherwise. Use "none" for static, non-urgent notes.
   */
  role?: string;
  /** Leading icon; positioned automatically by the alert styles */
  icon?: any;
  /** Shows a close button that calls this handler */
  onDismiss?: () => void;
  /** Accessible label for the close button (default "Dismiss") */
  dismissLabel?: string;
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { alertVariants } from "./alert.styles.ts";

@Component({
  selector: "adhar-alert",
  template: `
    <div [attr.id]="id" [attr.role]="roleValue" [class]="classes">
      <ng-container *ngIf="icon">{{icon}}</ng-container>
      <div><ng-content></ng-content></div>
      <ng-container *ngIf="onDismiss"
        ><button
          type="button"
          class="absolute right-2 top-2 rounded-md p-1.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          [attr.aria-label]="dismissLabel || 'Dismiss'"
          (click)="onDismiss?.()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg></button
      ></ng-container>
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
export default class Alert {
  @Input() variant!: AlertProps["variant"];
  @Input() onDismiss!: AlertProps["onDismiss"];
  @Input() className!: AlertProps["className"];
  @Input() role!: AlertProps["role"];
  @Input() id!: AlertProps["id"];
  @Input() icon!: AlertProps["icon"];
  @Input() dismissLabel!: AlertProps["dismissLabel"];

  get classes() {
    return cn(
      alertVariants({
        variant: this.variant,
      }),
      this.onDismiss ? "pr-10" : "",
      this.className
    );
  }
  get roleValue() {
    if (this.role) return this.role;
    return this.variant === "destructive" || this.variant === "warning"
      ? "alert"
      : "status";
  }
}
