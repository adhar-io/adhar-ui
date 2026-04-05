<template>
  <div role="alert" :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface AlertProps {
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "alert",

  props: ["className"],
});
</script>