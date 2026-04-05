// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface CardContentProps {
  className?: string;
  children?: any;
}

@Component({
  selector: 'card-content',
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
export default class CardContent {
  @Input()
  className!: CardContentProps['className'];
}
