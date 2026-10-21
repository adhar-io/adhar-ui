<script context="module" lang="ts">
  export interface DropdownMenuItemProps {
    disabled?: boolean;
    /** "destructive" for delete-style actions */
    variant?: "default" | "destructive";
    /** Indent to line up with items that have a leading icon */
    inset?: boolean;
    className?: string;
    onClick?: () => void;
    /** Alias of `onClick` */
    onSelect?: () => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { dropdownMenuItemVariants } from "./dropdown-menu.styles.ts";

  export let variant: DropdownMenuItemProps["variant"] = undefined;
  export let inset: DropdownMenuItemProps["inset"] = undefined;
  export let className: DropdownMenuItemProps["className"] = undefined;
  export let disabled: DropdownMenuItemProps["disabled"] = undefined;
  export let onClick: DropdownMenuItemProps["onClick"] = undefined;
  export let onSelect: DropdownMenuItemProps["onSelect"] = undefined;

  function activate() {
    if (disabled) return;
    onClick?.();
    onSelect?.();
  }
  function handleKeyDown(event: any) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      /* Route through click so DropdownMenu sees it and closes. */
      if (!disabled) event.currentTarget.click();
    }
  }
  $: classes = () => {
    return cn(
      dropdownMenuItemVariants({
        variant: variant,
        inset: !!inset,
      }),
      className
    );
  };
</script>

<div
  role="menuitem"
  tabIndex={-1}
  aria-disabled={disabled ? true : undefined}
  data-disabled={disabled ? "" : undefined}
  on:click={(event) => {
    activate();
  }}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  class={classes()}
>
  <slot />
</div>