// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TimelineItemProps {
  title?: string;
  time?: string;
  /** Hide the connector on the last item */
  last?: boolean;
  className?: string;
  markerClass?: string;
  dotClass?: string;
  connectorClass?: string;
  contentClass?: string;
  titleClass?: string;
  timeClass?: string;
  /** Optional icon rendered inside the dot */
  icon?: any;
  children?: any;
}

@Component({
  selector: "timeline-item",
  template: `
    <li [class]="className">
      <div [class]="markerClass">
        <span [class]="dotClass">{{icon}}</span>
        <ng-container *ngIf="!last"
          ><span aria-hidden="true" [class]="connectorClass"></span
        ></ng-container>
      </div>
      <div [class]="contentClass">
        <ng-container *ngIf="time"
          ><span [class]="timeClass">{{time}}</span></ng-container
        >
        <ng-container *ngIf="title"
          ><span [class]="titleClass">{{title}}</span></ng-container
        >
        <ng-content></ng-content>
      </div>
    </li>
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
export default class TimelineItem {
  @Input() className!: TimelineItemProps["className"];
  @Input() markerClass!: TimelineItemProps["markerClass"];
  @Input() dotClass!: TimelineItemProps["dotClass"];
  @Input() icon!: TimelineItemProps["icon"];
  @Input() last!: TimelineItemProps["last"];
  @Input() connectorClass!: TimelineItemProps["connectorClass"];
  @Input() contentClass!: TimelineItemProps["contentClass"];
  @Input() time!: TimelineItemProps["time"];
  @Input() timeClass!: TimelineItemProps["timeClass"];
  @Input() title!: TimelineItemProps["title"];
  @Input() titleClass!: TimelineItemProps["titleClass"];
}
