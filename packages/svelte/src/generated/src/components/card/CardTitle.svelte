<script context="module" lang="ts">
  export interface CardTitleProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { cardTitleVariants } from "./card.styles.ts";

  export let className: CardTitleProps["className"] = undefined;
  export let id: CardTitleProps["id"] = undefined;

  $: classes = () => {
    return cn(cardTitleVariants(), className);
  };
</script>

<h3 {id} class={classes()}><slot /></h3>