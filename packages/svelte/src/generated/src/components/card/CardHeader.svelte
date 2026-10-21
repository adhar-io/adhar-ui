<script context="module" lang="ts">
  export interface CardHeaderProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { cardHeaderVariants } from "./card.styles.ts";

  export let className: CardHeaderProps["className"] = undefined;
  export let id: CardHeaderProps["id"] = undefined;

  $: classes = () => {
    return cn(cardHeaderVariants(), className);
  };
</script>

<div {id} class={classes()}><slot /></div>