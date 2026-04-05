// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface TooltipProps {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  delay?: number;
  children?: any;
}

@Component({
  selector: 'tooltip',
  template: `
    <div
      [ngStyle]="{
          position: 'relative',
          display: 'inline-block'
        }"
      [class]="className"
    >
      <div
        (mouseenter)="handleMouseEnter()"
        (mouseleave)="handleMouseLeave()"
        (focus)="handleFocus()"
        (blur)="handleBlur()"
        [attr.aria-describedby]="visible ? 'tooltip-content' : undefined"
        [class]="triggerClass"
      >
        <ng-content></ng-content>
      </div>
      <ng-container *ngIf="visible"
        ><div id="tooltip-content" role="tooltip" [class]="contentClass">
          {{content}}
        </div></ng-container
      >
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
export default class Tooltip {
  @Input()
  className!: TooltipProps['className'];
  @Input()
  triggerClass!: TooltipProps['triggerClass'];
  @Input()
  contentClass!: TooltipProps['contentClass'];
  @Input()
  content!: TooltipProps['content'];
}
