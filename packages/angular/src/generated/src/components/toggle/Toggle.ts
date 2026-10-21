// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ToggleProps {
  /** Whether the toggle is currently pressed/on (controlled) */
  pressed?: boolean;
  /** Initial pressed state when uncontrolled */
  defaultPressed?: boolean;
  disabled?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
  id?: string;
  title?: string;
  "aria-label"?: string;
  /** Fired with the next pressed state when activated */
  onPressedChange?: (pressed: boolean) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { toggleVariants } from "./toggle.styles.ts";

@Component({
  selector: "adhar-toggle",
  template: `
    <button
      type="button"
      [attr.id]="id"
      [attr.title]="title"
      [attr.aria-pressed]="isPressed"
      [attr.aria-label]="'aria-label'"
      [attr.data-state]="isPressed ? 'on' : 'off'"
      [attr.disabled]="disabled"
      (click)="handleClick()"
      [class]="classes"
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
export default class Toggle {
  @Input() defaultPressed!: ToggleProps["defaultPressed"];
  @Input() pressed!: ToggleProps["pressed"];
  @Input() variant!: ToggleProps["variant"];
  @Input() size!: ToggleProps["size"];
  @Input() className!: ToggleProps["className"];
  @Input() disabled!: ToggleProps["disabled"];
  @Input() onPressedChange!: ToggleProps["onPressedChange"];
  @Input() id!: ToggleProps["id"];
  @Input() title!: ToggleProps["title"];

  internalPressed = false;
  get isPressed() {
    return this.pressed !== undefined ? !!this.pressed : this.internalPressed;
  }
  get classes() {
    return cn(
      toggleVariants({
        variant: this.variant,
        size: this.size,
      }),
      this.className
    );
  }
  handleClick() {
    if (this.disabled) return;
    const next = !this.isPressed;
    this.internalPressed = next;
    this.onPressedChange?.(next);
  }

  ngOnInit() {
    this.internalPressed = !!this.defaultPressed;
  }
}
