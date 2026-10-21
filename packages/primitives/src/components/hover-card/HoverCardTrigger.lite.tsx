import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-hover-card-trigger' },
});

export interface HoverCardTriggerProps {
  className?: string;
  /** ID of the content this trigger describes (for AT association) */
  'aria-describedby'?: string;
  /** Set false when the child is already focusable (a link or button) */
  focusable?: boolean;
  children?: any;
}

// Focusable so the card opens on keyboard focus (group-focus-within), not just hover.
export default function HoverCardTrigger(props: HoverCardTriggerProps) {
  return (
    <span
      className={props.className}
      tabIndex={props.focusable === false ? undefined : 0}
      aria-describedby={props['aria-describedby']}
    >
      {props.children}
    </span>
  );
}
