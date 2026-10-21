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
  id?: string;
  title?: string;
  name?: string;
  value?: string;
  form?: string;
  autoFocus?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
  "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { buttonVariants } from "./button.styles.ts";

@Component({
  selector: "adhar-button",
  template: `
    <button
      [attr.id]="id"
      [attr.title]="title"
      [attr.disabled]="isInactive"
      [attr.type]="type || 'button'"
      [attr.name]="name"
      [attr.value]="value"
      [attr.form]="form"
      [attr.autoFocus]="autoFocus"
      [attr.aria-busy]="loading ? true : undefined"
      [attr.aria-label]="'aria-label'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.aria-controls]="'aria-controls'"
      [attr.aria-expanded]="'aria-expanded'"
      [attr.aria-pressed]="'aria-pressed'"
      [attr.aria-haspopup]="'aria-haspopup'"
      [attr.data-loading]="loading ? '' : undefined"
      (click)="
          if (!isInactive) onClick?.($event);
        "
      (focus)="onFocus?.($event)"
      (blur)="onBlur?.($event)"
      (keydown)="onKeyDown?.($event)"
      [class]="classes"
    >
      <ng-container *ngIf="loading"
        ><span
          aria-hidden="true"
          class="inline-block size-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none"
        ></span>
        <span class="sr-only">{{loadingText || 'Loading'}}</span></ng-container
      >
      <ng-container *ngIf="!(loading && isIconOnly)"
        ><ng-content></ng-content
      ></ng-container>
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
  @Input() variant!: ButtonProps["variant"];
  @Input() size!: ButtonProps["size"];
  @Input() fullWidth!: ButtonProps["fullWidth"];
  @Input() className!: ButtonProps["className"];
  @Input() disabled!: ButtonProps["disabled"];
  @Input() loading!: ButtonProps["loading"];
  @Input() id!: ButtonProps["id"];
  @Input() title!: ButtonProps["title"];
  @Input() type!: ButtonProps["type"];
  @Input() name!: ButtonProps["name"];
  @Input() value!: ButtonProps["value"];
  @Input() form!: ButtonProps["form"];
  @Input() autoFocus!: ButtonProps["autoFocus"];
  @Input() onClick!: ButtonProps["onClick"];
  @Input() onFocus!: ButtonProps["onFocus"];
  @Input() onBlur!: ButtonProps["onBlur"];
  @Input() onKeyDown!: ButtonProps["onKeyDown"];
  @Input() loadingText!: ButtonProps["loadingText"];

  get classes() {
    return cn(
      buttonVariants({
        variant: this.variant,
        size: this.size,
        fullWidth: !!this.fullWidth,
      }),
      this.className
    );
  }
  get isIconOnly() {
    return !!this.size && this.size.indexOf("icon") === 0;
  }
  get isInactive() {
    return !!this.disabled || !!this.loading;
  }
}
