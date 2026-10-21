// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SkeletonProps {
  /** Preset shape: text line, heading, avatar circle, button, card, or image */
  variant?:
    | "default"
    | "text"
    | "heading"
    | "avatar"
    | "button"
    | "card"
    | "image";
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { skeletonVariants } from "./skeleton.styles.ts";

@Component({
  selector: "adhar-skeleton",
  template: ` <div aria-hidden="true" [class]="classes"></div> `,
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
export default class Skeleton {
  @Input() variant!: SkeletonProps["variant"];
  @Input() className!: SkeletonProps["className"];

  get classes() {
    return cn(
      skeletonVariants({
        variant: this.variant,
      }),
      "motion-reduce:animate-none",
      this.className
    );
  }
}
