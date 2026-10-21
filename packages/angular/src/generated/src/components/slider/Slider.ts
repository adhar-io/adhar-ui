// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  /** Initial value when uncontrolled */
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  name?: string;
  id?: string;
  form?: string;
  /** ID of a <datalist> with tick marks */
  list?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Human-readable value for screen readers (e.g. "$40", "Medium") */
  "aria-valuetext"?: string;
  /** Fires continuously while dragging */
  onInput?: (value: number) => void;
  /** Alias of `onInput` */
  onValueChange?: (value: number) => void;
  /** Fires when the value is committed (drag end / keyboard) */
  onChange?: (value: number) => void;
}

import { cn } from "@adhar-ui/utils";
import { sliderVariants } from "./slider.styles.ts";

@Component({
  selector: "adhar-slider",
  template: `
    <input
      type="range"
      [attr.min]="min === undefined ? 0 : min"
      [attr.max]="max === undefined ? 100 : max"
      [attr.step]="step || 1"
      [attr.value]="value"
      [attr.defaultValue]="defaultValue"
      [attr.disabled]="disabled"
      [attr.name]="name"
      [attr.id]="id"
      [attr.form]="form"
      [attr.list]="list"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.aria-valuetext]="'aria-valuetext'"
      [attr.aria-orientation]="orientation || 'horizontal'"
      (input)="handleInput($event)"
      (change)="onChange?.(Number($event.target.value))"
      [class]="classes"
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
  @Input() size!: SliderProps["size"];
  @Input() orientation!: SliderProps["orientation"];
  @Input() className!: SliderProps["className"];
  @Input() onInput!: SliderProps["onInput"];
  @Input() onValueChange!: SliderProps["onValueChange"];
  @Input() min!: SliderProps["min"];
  @Input() max!: SliderProps["max"];
  @Input() step!: SliderProps["step"];
  @Input() value!: SliderProps["value"];
  @Input() defaultValue!: SliderProps["defaultValue"];
  @Input() disabled!: SliderProps["disabled"];
  @Input() name!: SliderProps["name"];
  @Input() id!: SliderProps["id"];
  @Input() form!: SliderProps["form"];
  @Input() list!: SliderProps["list"];
  @Input() onChange!: SliderProps["onChange"];

  get classes() {
    return cn(
      sliderVariants({
        size: this.size,
      }),
      this.orientation === "vertical"
        ? "[writing-mode:vertical-lr] [direction:rtl] h-auto w-5"
        : "",
      this.className
    );
  }
  handleInput(event: any) {
    const next = Number(event.target.value);
    this.onInput?.(next);
    this.onValueChange?.(next);
  }
}
