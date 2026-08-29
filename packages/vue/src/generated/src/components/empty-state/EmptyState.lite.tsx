// @ts-nocheck
<template>
  <div role="status" :class="props.className">
    <template v-if="props.icon">
      <div aria-hidden="true" :class="props.iconClass">{{ props.icon }}</div>
    </template>

    <template v-if="props.title">
      <h3 :class="props.titleClass">{{ props.title }}</h3>
    </template>

    <template v-if="props.description">
      <p :class="props.descriptionClass">{{ props.description }}</p>
    </template>

    <template v-if="props.children">
      <div class="mt-2 flex flex-wrap items-center justify-center gap-2">
        <slot />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
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

export default defineComponent({
  name: "empty-state",

  props: [
    "className",
    "icon",
    "iconClass",
    "title",
    "titleClass",
    "description",
    "descriptionClass",
  ],
});
</script>