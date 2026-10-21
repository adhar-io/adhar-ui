// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandGroupProps {
  heading?: string;
  className?: string;
  headingClass?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import {
  commandGroupHeadingVariants,
  commandGroupVariants,
} from "./command.styles.ts";

@Component({
  selector: "adhar-command-group",
  template: `
    <div role="group" [attr.aria-label]="heading" [class]="classes">
      <ng-container *ngIf="heading"
        ><div aria-hidden="true" [class]="headingClasses">
          {{heading}}
        </div></ng-container
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
export default class CommandGroup {
  @Input() className!: CommandGroupProps["className"];
  @Input() headingClass!: CommandGroupProps["headingClass"];
  @Input() heading!: CommandGroupProps["heading"];

  get classes() {
    return cn(commandGroupVariants(), this.className);
  }
  get headingClasses() {
    return cn(commandGroupHeadingVariants(), this.headingClass);
  }
}
