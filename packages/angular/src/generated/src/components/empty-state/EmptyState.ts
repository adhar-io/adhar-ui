// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  size?: "sm" | "default" | "lg";
  /** Optional illustration/icon element shown in the media circle */
  icon?: any;
  /**
   * ARIA role. Use "status" when the empty state appears in response to a
   * user action (e.g. a search with no results) so it is announced.
   */
  role?: string;
  className?: string;
  iconClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  /** Actions (buttons/links) rendered below the copy */
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import {
  emptyStateDescriptionVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateVariants,
} from "./empty-state.styles.ts";

@Component({
  selector: "adhar-empty-state",
  template: `
    <div [attr.role]="role" [class]="classes">
      <ng-container *ngIf="icon"
        ><div aria-hidden="true" [class]="iconClasses">
          {{icon}}
        </div></ng-container
      >
      <ng-container *ngIf="title"
        ><h3 [class]="titleClasses">{{title}}</h3></ng-container
      >
      <ng-container *ngIf="description"
        ><p [class]="descriptionClasses">{{description}}</p></ng-container
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
  @Input() size!: EmptyStateProps["size"];
  @Input() className!: EmptyStateProps["className"];
  @Input() iconClass!: EmptyStateProps["iconClass"];
  @Input() titleClass!: EmptyStateProps["titleClass"];
  @Input() descriptionClass!: EmptyStateProps["descriptionClass"];
  @Input() role!: EmptyStateProps["role"];
  @Input() icon!: EmptyStateProps["icon"];
  @Input() title!: EmptyStateProps["title"];
  @Input() description!: EmptyStateProps["description"];

  get classes() {
    return cn(
      emptyStateVariants({
        size: this.size,
      }),
      this.className
    );
  }
  get iconClasses() {
    return cn(
      emptyStateIconVariants({
        size: this.size,
      }),
      this.iconClass
    );
  }
  get titleClasses() {
    return cn(emptyStateTitleVariants(), this.titleClass);
  }
  get descriptionClasses() {
    return cn(emptyStateDescriptionVariants(), this.descriptionClass);
  }
}
