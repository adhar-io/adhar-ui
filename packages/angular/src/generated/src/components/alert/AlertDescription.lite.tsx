// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface AlertDescriptionProps {
  className?: string;
  children?: any;
}

@Component({
  selector: 'alert-description',
  template: ` <div [class]="className"><ng-content></ng-content></div> `,
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
  @Input()
  className!: AlertDescriptionProps['className'];
}
