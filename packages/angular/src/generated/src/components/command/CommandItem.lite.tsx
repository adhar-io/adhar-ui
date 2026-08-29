// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandItemProps {
  /** The value this item represents (passed to onSelect) */
  value?: string;
  /** Whether this item is the active/highlighted option */
  selected?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  onSelect?: (value: string) => void;
  children?: any;
}

@Component({
  selector: "command-item",
  template: `
    <div
      role="option"
      [attr.id]="id"
      [attr.tabIndex]="-1"
      [attr.aria-selected]="selected ? true : false"
      [attr.aria-disabled]="disabled ? true : false"
      [attr.data-selected]="selected ? 'true' : 'false'"
      (click)="disabled ? undefined : onSelect?.(value || '')"
      [class]="className"
    >
      <ng-content></ng-content>
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
export default class CommandItem {
  @Input() id!: CommandItemProps["id"];
  @Input() selected!: CommandItemProps["selected"];
  @Input() disabled!: CommandItemProps["disabled"];
  @Input() onSelect!: CommandItemProps["onSelect"];
  @Input() value!: CommandItemProps["value"];
  @Input() className!: CommandItemProps["className"];
}
