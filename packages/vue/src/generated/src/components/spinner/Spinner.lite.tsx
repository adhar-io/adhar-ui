// @ts-nocheck
<template>
  <div
    role="status"
    :aria-label="props['aria-label'] || 'Loading'"
    :class="props.className"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
        opacity="0.25"
      ></circle>
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        opacity="0.75"
      ></path></svg
    ><span class="sr-only">{{ props["aria-label"] || "Loading" }}</span>
  </div>
</template>

<script lang="ts">
export interface SpinnerProps {
  size?: "sm" | "default" | "lg";
  className?: string;
  "aria-label"?: string;
}

export default defineComponent({
  name: "spinner",

  props: ["className"],
});
</script>