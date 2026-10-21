// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ToggleGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is currently pressed/on */
  pressed?: boolean;
  disabled?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
  id?: string;
  title?: string;
  "aria-label"?: string;
  /** Fired with this item’s value when activated */
  onToggle?: (value: string) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { toggleVariants } from "../toggle/toggle.styles.ts";

@Component({
  selector: "adhar-toggle-group-item",
  template: `
    <button
      type="button"
      [attr.id]="id"
      [attr.title]="title"
      [attr.value]="value"
      [attr.aria-pressed]="pressed ? true : false"
      [attr.aria-label]="'aria-label'"
      [attr.data-state]="pressed ? 'on' : 'off'"
      [attr.disabled]="disabled"
      (click)="disabled ? undefined : onToggle?.(value)"
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
export default class ToggleGroupItem {
  @Input() variant!: ToggleGroupItemProps["variant"];
  @Input() size!: ToggleGroupItemProps["size"];
  @Input() className!: ToggleGroupItemProps["className"];
  @Input() id!: ToggleGroupItemProps["id"];
  @Input() title!: ToggleGroupItemProps["title"];
  @Input() value!: ToggleGroupItemProps["value"];
  @Input() pressed!: ToggleGroupItemProps["pressed"];
  @Input() disabled!: ToggleGroupItemProps["disabled"];
  @Input() onToggle!: ToggleGroupItemProps["onToggle"];

  get classes() {
    return cn(
      toggleVariants({
        variant: this.variant,
        size: this.size,
      }),
      this.className
    );
  }
}
