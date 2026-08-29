// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  /** Optional illustration/icon element shown in the media circle */
  icon?: any;
  className?: string;
  iconClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  /** Actions (buttons/links) rendered below the copy */
  children?: any;
}

@Component({
  selector: "empty-state",
  template: `
    <div role="status" [class]="className">
      <ng-container *ngIf="icon"
        ><div aria-hidden="true" [class]="iconClass">
          {{icon}}
        </div></ng-container
      >
      <ng-container *ngIf="title"
        ><h3 [class]="titleClass">{{title}}</h3></ng-container
      >
      <ng-container *ngIf="description"
        ><p [class]="descriptionClass">{{description}}</p></ng-container
      >
      <ng-container *ngIf="children"
        ><div class="mt-2 flex flex-wrap items-center justify-center gap-2">
          <ng-content></ng-content></div
      ></ng-container>
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
export default class EmptyState {
  @Input() className!: EmptyStateProps["className"];
  @Input() icon!: EmptyStateProps["icon"];
  @Input() iconClass!: EmptyStateProps["iconClass"];
  @Input() title!: EmptyStateProps["title"];
  @Input() titleClass!: EmptyStateProps["titleClass"];
  @Input() description!: EmptyStateProps["description"];
  @Input() descriptionClass!: EmptyStateProps["descriptionClass"];
}
