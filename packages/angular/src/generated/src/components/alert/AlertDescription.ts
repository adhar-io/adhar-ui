// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AlertDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { alertDescriptionVariants } from "./alert.styles.ts";

@Component({
  selector: "adhar-alert-description",
  template: `
    <div [attr.id]="id" [class]="classes"><ng-content></ng-content></div>
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
export default class AlertDescription {
  @Input() className!: AlertDescriptionProps["className"];
  @Input() id!: AlertDescriptionProps["id"];

  get classes() {
    return cn(alertDescriptionVariants(), this.className);
  }
}
