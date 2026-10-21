// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  /** Hover delay in ms before showing (default 300). Keyboard focus shows immediately. */
  delay?: number;
  /** Suppress the tooltip (e.g. while a menu it labels is open) */
  disabled?: boolean;
  /** Content id; generated when omitted */
  id?: string;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  children?: any;
}

// Shows on hover (after `delay`) and on keyboard focus, hides on Escape. The
// pointer can move onto the tooltip without it closing (WCAG 1.4.13).

import { cn, generateId } from "@adhar-ui/utils";
import { tooltipContentVariants } from "./tooltip.styles.ts";
import { placementVariants } from "../_internal/placement.styles.ts";

@Component({
  selector: "adhar-tooltip",
  template: `
    <div
      (mouseenter)="show(false)"
      (mouseleave)="hide()"
      (keydown)="handleKeyDown($event)"
      [class]="rootClasses"
    >
      <div
        (focusin)="show(true)"
        (focusout)="hide()"
        [attr.aria-describedby]="visible ? tooltipId : undefined"
        [class]="triggerClass"
      >
        <ng-content></ng-content>
      </div>
      <ng-container *ngIf="visible"
        ><div
          role="tooltip"
          data-state="open"
          [attr.id]="tooltipId"
          [attr.data-side]="resolvedSide"
          [class]="contentClasses"
        >
          {{content}}
        </div></ng-container
      >
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
export default class Tooltip {
  @Input() id!: TooltipProps["id"];
  @Input() side!: TooltipProps["side"];
  @Input() className!: TooltipProps["className"];
  @Input() align!: TooltipProps["align"];
  @Input() contentClass!: TooltipProps["contentClass"];
  @Input() disabled!: TooltipProps["disabled"];
  @Input() content!: TooltipProps["content"];
  @Input() delay!: TooltipProps["delay"];
  @Input() triggerClass!: TooltipProps["triggerClass"];

  visible = false;
  generatedId = "";
  inst = {
    timer: 0 as any,
  };
  get tooltipId() {
    return this.id || this.generatedId;
  }
  get resolvedSide() {
    return this.side || "top";
  }
  get rootClasses() {
    return cn("relative inline-block", this.className);
  }
  get contentClasses() {
    return cn(
      placementVariants({
        side: this.resolvedSide,
        align: this.align,
      }),
      tooltipContentVariants(),
      "w-max max-w-xs",
      this.contentClass
    );
  }
  clearTimer() {
    if (this.inst.timer) clearTimeout(this.inst.timer);
    this.inst.timer = 0;
  }
  show(immediate: boolean) {
    if (this.disabled || !this.content) return;
    this.clearTimer();
    const delay = this.delay === undefined ? 300 : this.delay;
    if (immediate || delay <= 0) {
      this.visible = true;
    } else {
      this.inst.timer = setTimeout(() => {
        this.visible = true;
      }, delay);
    }
  }
  hide() {
    this.clearTimer();
    this.visible = false;
  }
  handleKeyDown(event: any) {
    if (event.key === "Escape" && this.visible) {
      event.stopPropagation();
      this.hide();
    }
  }

  ngOnInit() {
    this.generatedId = generateId("adhar-tooltip");
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}
