// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AlertTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { alertTitleVariants } from "./alert.styles.ts";

@Component({
  selector: "adhar-alert-title",
  template: `
    <h5 [attr.id]="id" [class]="classes"><ng-content></ng-content></h5>
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
export default class AlertTitle {
  @Input() className!: AlertTitleProps["className"];
  @Input() id!: AlertTitleProps["id"];

  get classes() {
    return cn(alertTitleVariants(), this.className);
  }
}
