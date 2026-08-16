// @ts-nocheck
<script context="module" lang="ts">
  export interface LabelProps {
    /** ID of the form control this label is bound to (compiles to `for` per framework) */
    htmlFor?: string;
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let htmlFor: LabelProps["htmlFor"];
  export let className: LabelProps["className"];
</script>

<label for={htmlFor} class={className}><slot /></label>