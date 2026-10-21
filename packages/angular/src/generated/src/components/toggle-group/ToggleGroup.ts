// @ts-nocheck
import {
  Output,
  EventEmitter,
  Component,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ToggleGroupProps {
  /** ’single’ allows one active item, ’multiple’ allows many */
  type?: "single" | "multiple";
  /**
   * Current value — a string for type="single" (’’ when nothing is pressed),
   * an array of strings for type="multiple". Used to compute `onValueChange`.
   */
  value?: string | string[];
  orientation?: "horizontal" | "vertical";
  /** Segmented-control look: items share borders with no gaps */
  attached?: boolean;
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /**
   * Fires with the next value when an item is activated: the item’s value or
   * ’’ (single), or the toggled array (multiple).
   */
  onValueChange?: (value: any) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { toggleGroupVariants } from "./toggle-group.styles.ts";
import { rovingFocus } from "../_internal/dom.ts";

@Component({
  selector: "adhar-toggle-group",
  template: `
    <div
      role="group"
      #groupRef
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-disabled]="disabled ? true : undefined"
      [attr.data-type]="type || 'single'"
      [attr.data-orientation]="orientation || 'horizontal'"
      (keydown)="handleKeyDown($event)"
      (click)="handleClick($event)"
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
export default class ToggleGroup {
  @Input() orientation!: ToggleGroupProps["orientation"];
  @Input() attached!: ToggleGroupProps["attached"];
  @Input() className!: ToggleGroupProps["className"];
  @Input() loop!: ToggleGroupProps["loop"];
  @Input() disabled!: ToggleGroupProps["disabled"];
  @Input() type!: ToggleGroupProps["type"];
  @Input() value!: ToggleGroupProps["value"];
  @Output() onValueChange = new EventEmitter<any>();

  @ViewChild("groupRef") groupRef!: ElementRef;

  get classes() {
    return cn(
      toggleGroupVariants({
        orientation: this.orientation,
        attached: !!this.attached,
      }),
      this.className
    );
  }
  handleKeyDown(event: any) {
    rovingFocus(event, this.groupRef?.nativeElement, "button", {
      orientation: this.orientation === "vertical" ? "vertical" : "horizontal",
      loop: this.loop !== false,
    });
  }
  handleClick(event: any) {
    if (this.disabled || !this.onValueChange) return;
    const item = event.target.closest
      ? event.target.closest("button[value]")
      : null;
    if (
      !item ||
      item.disabled ||
      !this.groupRef?.nativeElement ||
      !this.groupRef?.nativeElement.contains(item)
    )
      return;
    const itemValue: string = item.getAttribute("value") || "";
    if (this.type === "multiple") {
      const current: string[] = Array.isArray(this.value) ? this.value : [];
      const next =
        current.indexOf(itemValue) >= 0
          ? current.filter((v) => v !== itemValue)
          : current.concat([itemValue]);
      this.onValueChange.emit(next);
    } else {
      this.onValueChange.emit(this.value === itemValue ? "" : itemValue);
    }
  }
}
