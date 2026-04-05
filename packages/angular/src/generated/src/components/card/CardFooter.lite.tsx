// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface CardFooterProps {
  className?: string;
  children?: any;
}

@Component({
  selector: 'card-footer',
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
export default class CardFooter {
  @Input()
  className!: CardFooterProps['className'];
}
