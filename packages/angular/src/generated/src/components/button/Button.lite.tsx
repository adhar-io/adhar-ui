// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface ButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: (event: any) => void;
  children?: any;
}

@Component({
  selector: 'button',
  template: `
    <button
      [attr.disabled]="disabled"
      [attr.type]="type || 'button'"
      [attr.aria-disabled]="disabled"
      (click)="onClick?.($event)"
      [class]="className"
    >
      <ng-content></ng-content>
    </button>
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
export default class Button {
  @Input()
  disabled!: ButtonProps['disabled'];
  @Input()
  type!: ButtonProps['type'];
  @Input()
  onClick!: ButtonProps['onClick'];
  @Input()
  className!: ButtonProps['className'];
}
