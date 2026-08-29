// @ts-nocheck
<template>
  <div role="group" :class="props.className">
    <template v-if="props.heading">
      <div aria-hidden="true" :class="props.headingClass">
        {{ props.heading }}
      </div>
    </template>

    <slot />
  </div>
</template>

<script lang="ts">
export interface CommandGroupProps {
  heading?: string;
  className?: string;
  headingClass?: string;
  children?: any;
}

export default defineComponent({
  name: "command-group",

  props: ["className", "heading", "headingClass"],
});
</script>