<script context="module" lang="ts">
  export interface AlertProps {
    variant?: "default" | "destructive" | "success" | "warning" | "info";
    /**
     * ARIA role. Defaults to "alert" (assertive) for destructive / warning and
     * "status" (polite) otherwise. Use "none" for static, non-urgent notes.
     */
    role?: string;
    /** Leading icon; positioned automatically by the alert styles */
    icon?: any;
    /** Shows a close button that calls this handler */
    onDismiss?: () => void;
    /** Accessible label for the close button (default "Dismiss") */
    dismissLabel?: string;
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { alertVariants } from "./alert.styles.ts";

  export let variant: AlertProps["variant"] = undefined;
  export let onDismiss: AlertProps["onDismiss"] = undefined;
  export let className: AlertProps["className"] = undefined;
  export let role: AlertProps["role"] = undefined;
  export let id: AlertProps["id"] = undefined;
  export let icon: AlertProps["icon"] = undefined;

  export let dismissLabel: AlertProps["dismissLabel"] = undefined;

  $: classes = () => {
    return cn(
      alertVariants({
        variant: variant,
      }),
      onDismiss ? "pr-10" : "",
      className
    );
  };
  $: roleValue = () => {
    if (role) return role;
    return variant === "destructive" || variant === "warning"
      ? "alert"
      : "status";
  };
</script>

<div {id} role={roleValue()} class={classes()}>
  {#if icon}
    {icon}
  {/if}
  <div><slot /></div>
  {#if onDismiss}
    <button
      type="button"
      class="absolute right-2 top-2 rounded-md p-1.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={dismissLabel || "Dismiss"}
      on:click={(event) => {
        onDismiss?.();
      }}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
      ></button
    >
  {/if}
</div>