<script context="module" lang="ts">
  export interface CardFooterProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { cardFooterVariants } from "./card.styles.ts";

  export let className: CardFooterProps["className"] = undefined;
  export let id: CardFooterProps["id"] = undefined;

  $: classes = () => {
    return cn(cardFooterVariants(), className);
  };
</script>

<div {id} class={classes()}><slot /></div>