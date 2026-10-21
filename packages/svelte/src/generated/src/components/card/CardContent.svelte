<script context="module" lang="ts">
  export interface CardContentProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { cardContentVariants } from "./card.styles.ts";

  export let className: CardContentProps["className"] = undefined;
  export let id: CardContentProps["id"] = undefined;

  $: classes = () => {
    return cn(cardContentVariants(), className);
  };
</script>

<div {id} class={classes()}><slot /></div>