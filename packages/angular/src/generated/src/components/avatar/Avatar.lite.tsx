// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  imageClass?: string;
  fallbackClass?: string;
}

@Component({
  selector: 'avatar',
  template: `
    <span role="img" [attr.aria-label]="alt" [class]="className"
      ><ng-container *ngIf="showImage"
        ><img
          [attr.src]="src"
          [attr.alt]="alt || ''"
          (error)="handleError()"
          [class]="imageClass" /></ng-container
      ><ng-container *ngIf="!(showImage)"
        ><span
          aria-hidden="true"
          [class]="fallbackClass"
          >{{fallback || '?'}}</span
        ></ng-container
      ></span
    >
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
export default class Avatar {
  @Input()
  alt!: AvatarProps['alt'];
  @Input()
  className!: AvatarProps['className'];
  @Input()
  fallbackClass!: AvatarProps['fallbackClass'];
  @Input()
  fallback!: AvatarProps['fallback'];
  @Input()
  src!: AvatarProps['src'];
  @Input()
  imageClass!: AvatarProps['imageClass'];
}
