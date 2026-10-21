<template>
  <div :role="role" :class="classes">
    <template v-if="icon">
      <div aria-hidden="true" :class="iconClasses">{{ icon }}</div>
    </template>

    <template v-if="title">
      <h3 :class="titleClasses">{{ title }}</h3>
    </template>

    <template v-if="description">
      <p :class="descriptionClasses">{{ description }}</p>
    </template>

    <template v-if="$slots.default">
      <div class="mt-2 flex flex-wrap items-center justify-center gap-2">
        <slot />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import {
  emptyStateDescriptionVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateVariants,
} from "./empty-state.styles.ts";

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

export default defineComponent({
  name: "empty-state",

  props: [
    "size",
    "className",
    "iconClass",
    "titleClass",
    "descriptionClass",
    "role",
    "icon",
    "title",
    "description",
  ],

  computed: {
    classes() {
      return cn(
        emptyStateVariants({
          size: this.size,
        }),
        this.className
      );
    },
    iconClasses() {
      return cn(
        emptyStateIconVariants({
          size: this.size,
        }),
        this.iconClass
      );
    },
    titleClasses() {
      return cn(emptyStateTitleVariants(), this.titleClass);
    },
    descriptionClasses() {
      return cn(emptyStateDescriptionVariants(), this.descriptionClass);
    },
  },
});
</script>