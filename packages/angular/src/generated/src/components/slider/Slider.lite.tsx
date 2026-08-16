// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Human-readable value for screen readers (e.g. "$40", "Medium") */
  "aria-valuetext"?: string;
  /** Fires continuously while dragging */
  onInput?: (value: number) => void;
  /** Fires when the value is committed (drag end / keyboard) */
  onChange?: (value: number) => void;
}

@Component({
  selector: "slider",
  template: `
    <input
      type="range"
      [attr.min]="min || 0"
      [attr.max]="max || 100"
      [attr.step]="step || 1"
      [attr.value]="value"
      [attr.disabled]="disabled"
      [attr.name]="name"
      [attr.id]="id"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-valuetext]="'aria-valuetext'"
      [attr.aria-orientation]="orientation || 'horizontal'"
      (input)="onInput?.(Number($event.target.value))"
      (change)="onChange?.(Number($event.target.value))"
      [class]="className"
    />
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
export default class Slider {
  @Input() min!: SliderProps["min"];
  @Input() max!: SliderProps["max"];
  @Input() step!: SliderProps["step"];
  @Input() value!: SliderProps["value"];
  @Input() disabled!: SliderProps["disabled"];
  @Input() name!: SliderProps["name"];
  @Input() id!: SliderProps["id"];
  @Input() orientation!: SliderProps["orientation"];
  @Input() onInput!: SliderProps["onInput"];
  @Input() onChange!: SliderProps["onChange"];
  @Input() className!: SliderProps["className"];
}
