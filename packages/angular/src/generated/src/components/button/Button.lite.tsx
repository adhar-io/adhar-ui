// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Shows a spinner, sets aria-busy, and blocks interaction */
  loading?: boolean;
  /** Text announced by screen readers while loading (defaults to "Loading") */
  loadingText?: string;
  /** Stretches the button to fill its container */
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  name?: string;
  value?: string;
  form?: string;
  "aria-label"?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
  "aria-haspopup"?: boolean;
  onClick?: (event: any) => void;
  children?: any;
}

@Component({
  selector: "button",
  template: `
    <button
      [attr.disabled]="disabled || loading"
      [attr.type]="type || 'button'"
      [attr.name]="name"
      [attr.value]="value"
      [attr.form]="form"
      [attr.aria-disabled]="disabled || loading"
      [attr.aria-busy]="loading"
      [attr.aria-label]="'aria-label'"
      [attr.aria-controls]="'aria-controls'"
      [attr.aria-expanded]="'aria-expanded'"
      [attr.aria-pressed]="'aria-pressed'"
      [attr.aria-haspopup]="'aria-haspopup'"
      (click)="onClick?.($event)"
      [class]="className"
    >
      <ng-container *ngIf="loading"
        ><span
          aria-hidden="true"
          class="inline-block size-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none"
        ></span>
        <span class="sr-only">{{loadingText || 'Loading'}}</span></ng-container
      >
      <ng-content></ng-content>
    </button>
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
export default class Button {
  @Input() disabled!: ButtonProps["disabled"];
  @Input() loading!: ButtonProps["loading"];
  @Input() type!: ButtonProps["type"];
  @Input() name!: ButtonProps["name"];
  @Input() value!: ButtonProps["value"];
  @Input() form!: ButtonProps["form"];
  @Input() onClick!: ButtonProps["onClick"];
  @Input() className!: ButtonProps["className"];
  @Input() loadingText!: ButtonProps["loadingText"];
}
