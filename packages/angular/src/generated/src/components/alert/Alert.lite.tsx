// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface AlertProps {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  className?: string;
  children?: any;
}

@Component({
  selector: 'alert',
  template: `
    <div role="alert" [class]="className"><ng-content></ng-content></div>
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
export default class Alert {
  @Input()
  className!: AlertProps['className'];
}
