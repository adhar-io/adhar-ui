// @ts-nocheck
export interface HoverCardTriggerProps {
  className?: string;
  /** ID of the content this trigger describes (for AT association) */
  "aria-describedby"?: string;
  /** Set false when the child is already focusable (a link or button) */
  focusable?: boolean;
  children?: any;
}

// Focusable so the card opens on keyboard focus (group-focus-within), not just hover.

function HoverCardTrigger(props: HoverCardTriggerProps) {
  return (
    <span
      class={props.className}
      tabIndex={props.focusable === false ? undefined : 0}
      aria-describedby={props["aria-describedby"]}
    >
      {props.children}
    </span>
  );
}

export default HoverCardTrigger;
