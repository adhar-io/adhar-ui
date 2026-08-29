// @ts-nocheck
<template>
  <li :class="props.className">
    <div :class="props.markerClass">
      <span :class="props.dotClass">{{ props.icon }}</span>
      <template v-if="!props.last">
        <span aria-hidden="true" :class="props.connectorClass"></span>
      </template>
    </div>
    <div :class="props.contentClass">
      <template v-if="props.time">
        <span :class="props.timeClass">{{ props.time }}</span>
      </template>

      <template v-if="props.title">
        <span :class="props.titleClass">{{ props.title }}</span>
      </template>

      <slot />
    </div>
  </li>
</template>

<script lang="ts">
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

export default defineComponent({
  name: "timeline-item",

  props: [
    "className",
    "markerClass",
    "dotClass",
    "icon",
    "last",
    "connectorClass",
    "contentClass",
    "time",
    "timeClass",
    "title",
    "titleClass",
  ],
});
</script>