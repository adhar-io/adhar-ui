// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ToggleGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is currently pressed/on */
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  /** Fired with this item's value when activated */
  onToggle?: (value: string) => void;
  children?: any;
}

@Component({
  selector: "toggle-group-item",
  template: `
    <button
      type="button"
      [attr.id]="id"
      [attr.value]="value"
      [attr.aria-pressed]="pressed ? true : false"
      [attr.aria-label]="'aria-label'"
      [attr.data-state]="pressed ? 'on' : 'off'"
      [attr.disabled]="disabled"
      (click)="disabled ? undefined : onToggle?.(value)"
      [class]="className"
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
  @Input() id!: ToggleGroupItemProps["id"];
  @Input() value!: ToggleGroupItemProps["value"];
  @Input() pressed!: ToggleGroupItemProps["pressed"];
  @Input() disabled!: ToggleGroupItemProps["disabled"];
  @Input() onToggle!: ToggleGroupItemProps["onToggle"];
  @Input() className!: ToggleGroupItemProps["className"];
}
