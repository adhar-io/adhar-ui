// @ts-nocheck
import { Component, ViewChild, ElementRef, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandProps {
  className?: string;
  "aria-label"?: string;
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  /**
   * Fires with the value of the item ArrowUp / ArrowDown / Home / End should
   * highlight. Store it and pass `selected` to the matching CommandItem; Enter
   * then selects the highlighted item.
   */
  onHighlightChange?: (value: string) => void;
  children?: any;
}

// Command menu / palette container. Filtering is driven by the consumer;
// keyboard highlight is computed here from the rendered items.

import { cn } from "@adhar-ui/utils";
import { commandVariants } from "./command.styles.ts";

@Component({
  selector: "adhar-command",
  template: `
    <div
      #rootRef
      [attr.aria-label]="'aria-label' || 'Command menu'"
      (keydown)="handleKeyDown($event)"
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
export default class Command {
  @Input() className!: CommandProps["className"];
  @Input() loop!: CommandProps["loop"];
  @Input() onHighlightChange!: CommandProps["onHighlightChange"];

  @ViewChild("rootRef") rootRef!: ElementRef;

  get classes() {
    return cn(commandVariants(), this.className);
  }
  getItems() {
    if (!this.rootRef?.nativeElement) return [];
    return Array.from(
      this.rootRef?.nativeElement.querySelectorAll('[role="option"]')
    ).filter(
      (el: any) => el.getAttribute("aria-disabled") !== "true"
    ) as HTMLElement[];
  }
  handleKeyDown(event: any) {
    const items = this.getItems();
    if (items.length === 0) return;
    const current = items.findIndex(
      (el) => el.getAttribute("aria-selected") === "true"
    );
    if (event.key === "Enter") {
      if (current >= 0) {
        event.preventDefault();
        items[current].click();
      }
      return;
    }
    let next = -1;
    const loop = this.loop !== false;
    if (event.key === "ArrowDown") {
      next =
        current + 1 >= items.length
          ? loop
            ? 0
            : items.length - 1
          : current + 1;
    } else if (event.key === "ArrowUp") {
      next = current <= 0 ? (loop ? items.length - 1 : 0) : current - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = items.length - 1;
    }
    if (next < 0) return;
    event.preventDefault();
    this.onHighlightChange?.(items[next].getAttribute("data-value") || "");
    items[next].scrollIntoView({
      block: "nearest",
    });
  }
}
