// @ts-nocheck
<template>
  <label :for="props.htmlFor" :class="props.className"><slot /></label>
</template>

<script lang="ts">
export interface LabelProps {
  /** ID of the form control this label is bound to (compiles to `for` per framework) */
  htmlFor?: string;
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "label",

  props: ["htmlFor", "className"],
});
</script>