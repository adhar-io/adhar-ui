// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandItemProps {
  /** The value this item represents (passed to onSelect / onHighlightChange) */
  value?: string;
  /** Whether this item is the active/highlighted option */
  selected?: boolean;
  disabled?: boolean;
  /** Set an id to reference it from CommandInput `aria-activedescendant` */
  id?: string;
  className?: string;
  onSelect?: (value: string) => void;
  /** Fires on pointer hover, so mouse and keyboard share one highlight */
  onHighlight?: (value: string) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandItemVariants } from "./command.styles.ts";

@Component({
  selector: "adhar-command-item",
  template: `
    <div
      role="option"
      [attr.id]="id"
      [attr.tabIndex]="-1"
      [attr.aria-selected]="selected ? true : false"
      [attr.aria-disabled]="disabled ? true : undefined"
      [attr.data-selected]="selected ? 'true' : 'false'"
      [attr.data-disabled]="disabled ? '' : undefined"
      [attr.data-value]="value"
      (click)="disabled ? undefined : onSelect?.(value || '')"
      (mouseenter)="disabled ? undefined : onHighlight?.(value || '')"
      [class]="classes"
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
  @Input() className!: CommandItemProps["className"];
  @Input() id!: CommandItemProps["id"];
  @Input() selected!: CommandItemProps["selected"];
  @Input() disabled!: CommandItemProps["disabled"];
  @Input() value!: CommandItemProps["value"];
  @Input() onSelect!: CommandItemProps["onSelect"];
  @Input() onHighlight!: CommandItemProps["onHighlight"];

  get classes() {
    return cn(commandItemVariants(), this.className);
  }
}
