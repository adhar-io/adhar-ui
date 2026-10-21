<template>
  <li :class="classes">
    <div aria-hidden="true" :class="markerClasses">
      <span :class="dotClasses">{{ icon }}</span>
      <template v-if="!last">
        <span :class="connectorClasses"></span>
      </template>
    </div>
    <div :class="contentClasses">
      <template v-if="title">
        <span :class="titleClasses">{{ title }}</span>
      </template>

      <template v-if="time">
        <time :dateTime="dateTime" :class="timeClasses">{{ time }}</time>
      </template>

      <slot />
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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

export default defineComponent({
  name: "timeline-item",

  props: [
    "className",
    "markerClass",
    "variant",
    "size",
    "dotClass",
    "connectorClass",
    "contentClass",
    "titleClass",
    "timeClass",
    "icon",
    "last",
    "title",
    "time",
    "dateTime",
  ],

  computed: {
    classes() {
      return cn(timelineItemVariants(), this.className);
    },
    markerClasses() {
      return cn(timelineMarkerVariants(), this.markerClass);
    },
    dotClasses() {
      return cn(
        timelineDotVariants({
          variant: this.variant,
          size: this.size,
        }),
        this.dotClass
      );
    },
    connectorClasses() {
      return cn(timelineConnectorVariants(), this.connectorClass);
    },
    contentClasses() {
      return cn(timelineContentVariants(), this.contentClass);
    },
    titleClasses() {
      return cn(timelineTitleVariants(), "block", this.titleClass);
    },
    timeClasses() {
      return cn(timelineTimeVariants(), "block", this.timeClass);
    },
  },
});
</script>