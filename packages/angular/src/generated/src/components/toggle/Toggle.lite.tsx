// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ToggleProps {
  /** Whether the toggle is currently pressed/on (controlled) */
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  /** Fired with the next pressed state when activated */
  onPressedChange?: (pressed: boolean) => void;
  children?: any;
}

@Component({
  selector: "toggle",
  template: `
    <button
      type="button"
      [attr.id]="id"
      [attr.aria-pressed]="pressed ? true : false"
      [attr.aria-label]="'aria-label'"
      [attr.data-state]="pressed ? 'on' : 'off'"
      [attr.disabled]="disabled"
      (click)="disabled ? undefined : onPressedChange?.(!pressed)"
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
export default class Toggle {
  @Input() id!: ToggleProps["id"];
  @Input() pressed!: ToggleProps["pressed"];
  @Input() disabled!: ToggleProps["disabled"];
  @Input() onPressedChange!: ToggleProps["onPressedChange"];
  @Input() className!: ToggleProps["className"];
}
