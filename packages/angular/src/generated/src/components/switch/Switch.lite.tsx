// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  thumbClass?: string;
  "aria-label"?: string;
  onChange?: (checked: boolean) => void;
}

@Component({
  selector: "switch",
  template: `
    <button
      type="button"
      role="switch"
      [attr.id]="id"
      [attr.aria-checked]="isChecked"
      [attr.aria-label]="'aria-label'"
      [attr.disabled]="disabled"
      (click)="handleClick()"
      (keydown)="handleKeyDown($event)"
      [class]="className"
    >
      <span [class]="thumbClass"></span>
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
export default class Switch {
  @Input() id!: SwitchProps["id"];
  @Input() disabled!: SwitchProps["disabled"];
  @Input() className!: SwitchProps["className"];
  @Input() thumbClass!: SwitchProps["thumbClass"];
}
