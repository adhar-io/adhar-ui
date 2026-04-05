// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface AlertTitleProps {
  className?: string;
  children?: any;
}

@Component({
  selector: 'alert-title',
  template: ` <h5 [class]="className"><ng-content></ng-content></h5> `,
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
  @Input()
  className!: AlertTitleProps['className'];
}
