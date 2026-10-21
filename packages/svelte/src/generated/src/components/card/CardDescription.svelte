<script context="module" lang="ts">
  export interface CardDescriptionProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { cardDescriptionVariants } from "./card.styles.ts";

  export let className: CardDescriptionProps["className"] = undefined;
  export let id: CardDescriptionProps["id"] = undefined;

  $: classes = () => {
    return cn(cardDescriptionVariants(), className);
  };
</script>

<p {id} class={classes()}><slot /></p>