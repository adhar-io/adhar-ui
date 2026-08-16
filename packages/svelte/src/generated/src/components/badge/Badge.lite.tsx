// @ts-nocheck
<script context="module" lang="ts">
  export interface BadgeProps {
    variant?:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "success"
      | "warning"
      | "info";
    size?: "sm" | "default" | "lg";
    className?: string;
    /** Renders a small leading status dot inheriting the badge's text color */
    dot?: boolean;
    /** Extra classes for the leading dot (e.g. a fixed color) */
    dotClass?: string;
    /**
     * ARIA role. Only set "status" for live, dynamic counters (e.g. unread
     * counts) so screen readers announce changes. Static labels need no role.
     */
    role?: string;
    "aria-label"?: string;
    onClick?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let role: BadgeProps["role"];
  export let onClick: BadgeProps["onClick"];
  export let className: BadgeProps["className"];
  export let dot: BadgeProps["dot"];
  export let dotClass: BadgeProps["dotClass"];
</script>

<span
  {role}
  aria-label={"aria-label"}
  on:click={(event) => {
    onClick?.(event);
  }}
  class={className}
>
  {#if dot}
    <span
      aria-hidden="true"
      class={dotClass ||
        "mr-1 inline-block size-1.5 rounded-full bg-current opacity-70"}
    />
  {/if}<slot /></span
>