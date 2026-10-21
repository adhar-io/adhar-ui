// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TimelineItemProps {
  title?: string;
  /** Display text for the timestamp, e.g. "2 hours ago" */
  time?: string;
  /** Machine-readable timestamp for the <time> element, e.g. "2026-10-21T09:00" */
  dateTime?: string;
  /** Dot color */
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "destructive"
    | "outline";
  /** Dot size; use ’lg’ to fit an icon */
  size?: "sm" | "default" | "lg";
  /** Hide the connector on the last item */
  last?: boolean;
  className?: string;
  markerClass?: string;
  dotClass?: string;
  connectorClass?: string;
  contentClass?: string;
  titleClass?: string;
  timeClass?: string;
  /** Optional icon rendered inside the dot (pair with size="lg") */
  icon?: any;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import {
  timelineConnectorVariants,
  timelineContentVariants,
  timelineDotVariants,
  timelineItemVariants,
  timelineMarkerVariants,
  timelineTimeVariants,
  timelineTitleVariants,
} from "./timeline.styles.ts";

@Component({
  selector: "adhar-timeline-item",
  template: `
    <li [class]="classes">
      <div aria-hidden="true" [class]="markerClasses">
        <span [class]="dotClasses">{{icon}}</span>
        <ng-container *ngIf="!last"
          ><span [class]="connectorClasses"></span
        ></ng-container>
      </div>
      <div [class]="contentClasses">
        <ng-container *ngIf="title"
          ><span [class]="titleClasses">{{title}}</span></ng-container
        >
        <ng-container *ngIf="time"
          ><time
            [attr.dateTime]="dateTime"
            [class]="timeClasses"
            >{{time}}</time
          ></ng-container
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
  @Input() variant!: TimelineItemProps["variant"];
  @Input() size!: TimelineItemProps["size"];
  @Input() dotClass!: TimelineItemProps["dotClass"];
  @Input() connectorClass!: TimelineItemProps["connectorClass"];
  @Input() contentClass!: TimelineItemProps["contentClass"];
  @Input() titleClass!: TimelineItemProps["titleClass"];
  @Input() timeClass!: TimelineItemProps["timeClass"];
  @Input() icon!: TimelineItemProps["icon"];
  @Input() last!: TimelineItemProps["last"];
  @Input() title!: TimelineItemProps["title"];
  @Input() time!: TimelineItemProps["time"];
  @Input() dateTime!: TimelineItemProps["dateTime"];

  get classes() {
    return cn(timelineItemVariants(), this.className);
  }
  get markerClasses() {
    return cn(timelineMarkerVariants(), this.markerClass);
  }
  get dotClasses() {
    return cn(
      timelineDotVariants({
        variant: this.variant,
        size: this.size,
      }),
      this.dotClass
    );
  }
  get connectorClasses() {
    return cn(timelineConnectorVariants(), this.connectorClass);
  }
  get contentClasses() {
    return cn(timelineContentVariants(), this.contentClass);
  }
  get titleClasses() {
    return cn(timelineTitleVariants(), "block", this.titleClass);
  }
  get timeClasses() {
    return cn(timelineTimeVariants(), "block", this.timeClass);
  }
}
