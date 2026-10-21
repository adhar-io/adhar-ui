// @ts-nocheck
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TextareaProps {
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** @deprecated Use `readOnly` */
  readonly?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  /** Grow with the content instead of scrolling (up to `maxRows` if set) */
  autoResize?: boolean;
  /** Row cap for `autoResize` */
  maxRows?: number;
  size?: "sm" | "default" | "lg";
  name?: string;
  id?: string;
  form?: string;
  autoFocus?: boolean;
  spellcheck?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  onChange?: (event: any) => void;
  onInput?: (event: any) => void;
  /** Fires on every keystroke with the current string value */
  onValueChange?: (value: string) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
}

import { cn } from "@adhar-ui/utils";
import { textareaVariants } from "./textarea.styles.ts";

@Component({
  selector: "adhar-textarea",
  template: `
    <textarea
      #textareaRef
      [attr.placeholder]="placeholder"
      [attr.value]="value"
      [attr.defaultValue]="defaultValue"
      [attr.disabled]="disabled"
      [attr.readOnly]="readOnly || readonly"
      [attr.required]="required"
      [attr.rows]="rows || 3"
      [attr.maxLength]="maxLength"
      [attr.minLength]="minLength"
      [attr.name]="name"
      [attr.id]="id"
      [attr.form]="form"
      [attr.autoFocus]="autoFocus"
      [attr.spellcheck]="spellcheck"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.aria-invalid]="invalid || 'aria-invalid' ? true : undefined"
      (change)="onChange?.($event)"
      (input)="handleInput($event)"
      (focus)="onFocus?.($event)"
      (blur)="onBlur?.($event)"
      (keydown)="onKeyDown?.($event)"
      [class]="classes"
    ></textarea>
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
export default class Textarea {
  @Input() value!: TextareaProps["value"];
  @Input() size!: TextareaProps["size"];
  @Input() autoResize!: TextareaProps["autoResize"];
  @Input() className!: TextareaProps["className"];
  @Input() maxRows!: TextareaProps["maxRows"];
  @Input() onInput!: TextareaProps["onInput"];
  @Input() onValueChange!: TextareaProps["onValueChange"];
  @Input() placeholder!: TextareaProps["placeholder"];
  @Input() defaultValue!: TextareaProps["defaultValue"];
  @Input() disabled!: TextareaProps["disabled"];
  @Input() readOnly!: TextareaProps["readOnly"];
  @Input() readonly!: TextareaProps["readonly"];
  @Input() required!: TextareaProps["required"];
  @Input() rows!: TextareaProps["rows"];
  @Input() maxLength!: TextareaProps["maxLength"];
  @Input() minLength!: TextareaProps["minLength"];
  @Input() name!: TextareaProps["name"];
  @Input() id!: TextareaProps["id"];
  @Input() form!: TextareaProps["form"];
  @Input() autoFocus!: TextareaProps["autoFocus"];
  @Input() spellcheck!: TextareaProps["spellcheck"];
  @Input() invalid!: TextareaProps["invalid"];
  @Input() onChange!: TextareaProps["onChange"];
  @Input() onFocus!: TextareaProps["onFocus"];
  @Input() onBlur!: TextareaProps["onBlur"];
  @Input() onKeyDown!: TextareaProps["onKeyDown"];

  @ViewChild("textareaRef") textareaRef!: ElementRef;

  get classes() {
    return cn(
      textareaVariants({
        size: this.size,
      }),
      this.autoResize ? "resize-none overflow-hidden" : "",
      this.className
    );
  }
  resize() {
    const el = this.textareaRef?.nativeElement;
    if (!this.autoResize || !el) return;
    el.style.height = "auto";
    let next = el.scrollHeight;
    if (this.maxRows) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
      const cap =
        lineHeight * this.maxRows + (el.offsetHeight - el.clientHeight) + 16;
      if (next > cap) {
        next = cap;
        el.style.overflowY = "auto";
      } else {
        el.style.overflowY = "hidden";
      }
    }
    el.style.height = next + "px";
  }
  handleInput(event: any) {
    this.onInput?.(event);
    this.onValueChange?.(event.target.value);
    this.resize();
  }

  ngOnInit() {
    if (typeof window !== "undefined") {
      this.resize();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      this.resize();
    }
  }
}
