// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface RadioGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is the selected one */
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  /** Classes for the inner selected-state dot */
  indicatorClass?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Fired with this item's value when the user selects it */
  onSelect?: (value: string) => void;
}

@Component({
  selector: "radio-group-item",
  template: `
    <button
      type="button"
      role="radio"
      [attr.id]="id"
      [attr.value]="value"
      [attr.aria-checked]="checked ? true : false"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.disabled]="disabled"
      (click)="disabled ? undefined : onSelect?.(value)"
      (keydown)="
          if (($event.key === ' ' || $event.key === 'Enter') && !disabled) {
            $event.preventDefault();
            onSelect?.(value);
          }
        "
      [class]="className"
    >
      <ng-container *ngIf="checked"
        ><span aria-hidden="true" [class]="indicatorClass"></span
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
export default class RadioGroupItem {
  @Input() id!: RadioGroupItemProps["id"];
  @Input() value!: RadioGroupItemProps["value"];
  @Input() checked!: RadioGroupItemProps["checked"];
  @Input() disabled!: RadioGroupItemProps["disabled"];
  @Input() onSelect!: RadioGroupItemProps["onSelect"];
  @Input() className!: RadioGroupItemProps["className"];
  @Input() indicatorClass!: RadioGroupItemProps["indicatorClass"];
}
