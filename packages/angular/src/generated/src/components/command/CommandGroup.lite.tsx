// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandGroupProps {
  heading?: string;
  className?: string;
  headingClass?: string;
  children?: any;
}

@Component({
  selector: "command-group",
  template: `
    <div role="group" [class]="className">
      <ng-container *ngIf="heading"
        ><div aria-hidden="true" [class]="headingClass">
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
  @Input() heading!: CommandGroupProps["heading"];
  @Input() headingClass!: CommandGroupProps["headingClass"];
}
