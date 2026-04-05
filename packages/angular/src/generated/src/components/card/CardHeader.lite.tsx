// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface CardHeaderProps {
  className?: string;
  children?: any;
}

@Component({
  selector: 'card-header',
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
export default class CardHeader {
  @Input()
  className!: CardHeaderProps['className'];
}
