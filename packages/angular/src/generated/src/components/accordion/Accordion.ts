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

export interface AccordionProps {
  /** ’single’ keeps at most one item open; ’multiple’ allows many */
  type?: "single" | "multiple";
  /**
   * Open item(s): a string for type="single" (’’ when all closed), an array
   * for type="multiple". Used to compute `onValueChange`.
   */
  value?: string | string[];
  /** type="single": allow closing the open item by clicking it again (default true) */
  collapsible?: boolean;
  className?: string;
  id?: string;
  /**
   * Fires with the next value when a trigger that has a `value` is clicked.
   * Lets the root own open state instead of wiring every trigger’s onClick.
   */
  onValueChange?: (value: any) => void;
  children?: any;
}

import { rovingFocus } from "../_internal/dom.ts";

@Component({
  selector: "adhar-accordion",
  template: `
    <div
      #rootRef
      [attr.id]="id"
      [attr.data-type]="type || 'single'"
      (keydown)="handleKeyDown($event)"
      (click)="handleClick($event)"
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
export default class Accordion {
  @Input() type!: AccordionProps["type"];
  @Input() value!: AccordionProps["value"];
  @Input() collapsible!: AccordionProps["collapsible"];
  @Input() id!: AccordionProps["id"];
  @Input() className!: AccordionProps["className"];
  @Output() onValueChange = new EventEmitter<any>();

  @ViewChild("rootRef") rootRef!: ElementRef;

  handleKeyDown(event: any) {
    if (
      !event.target.hasAttribute ||
      !event.target.hasAttribute("data-accordion-trigger")
    ) {
      return;
    }
    rovingFocus(
      event,
      this.rootRef?.nativeElement,
      "[data-accordion-trigger]",
      {
        orientation: "vertical",
      }
    );
  }
  handleClick(event: any) {
    if (!this.onValueChange) return;
    const trigger = event.target.closest
      ? event.target.closest("[data-accordion-trigger]")
      : null;
    if (
      !trigger ||
      trigger.disabled ||
      !this.rootRef?.nativeElement ||
      !this.rootRef?.nativeElement.contains(trigger)
    )
      return;
    const itemValue = trigger.getAttribute("data-value");
    if (!itemValue) return;
    if (this.type === "multiple") {
      const current: string[] = Array.isArray(this.value) ? this.value : [];
      this.onValueChange.emit(
        current.indexOf(itemValue) >= 0
          ? current.filter((v) => v !== itemValue)
          : current.concat([itemValue])
      );
    } else if (this.value === itemValue) {
      if (this.collapsible !== false) this.onValueChange.emit("");
    } else {
      this.onValueChange.emit(itemValue);
    }
  }
}
