<script context="module" lang="ts">
  export interface LabelProps {
    /** ID of the form control this label is bound to (compiles to `for` per framework) */
    htmlFor?: string;
    id?: string;
    /** Appends a required marker (*). The control itself should also set `required`. */
    required?: boolean;
    /** Dims the label to match a disabled control that is not its `peer` sibling */
    disabled?: boolean;
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { labelVariants } from "./label.styles.ts";

  export let required: LabelProps["required"] = undefined;
  export let disabled: LabelProps["disabled"] = undefined;
  export let className: LabelProps["className"] = undefined;
  export let id: LabelProps["id"] = undefined;
  export let htmlFor: LabelProps["htmlFor"] = undefined;

  $: classes = () => {
    return cn(
      labelVariants({
        required: !!required,
      }),
      disabled ? "cursor-not-allowed opacity-70" : "",
      className
    );
  };
</script>

<label
  {id}
  for={htmlFor}
  data-disabled={disabled ? "" : undefined}
  class={classes()}><slot /></label
>