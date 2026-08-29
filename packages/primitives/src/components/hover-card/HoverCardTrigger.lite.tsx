import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface HoverCardTriggerProps {
  className?: string;
  /** ID of the content this trigger describes (for AT association) */
  'aria-describedby'?: string;
  children?: any;
}

// Focusable so the card opens on keyboard focus (group-focus-within), not just hover.
export default function HoverCardTrigger(props: HoverCardTriggerProps) {
  return (
    <span
      className={props.className}
      tabIndex={0}
      aria-describedby={props['aria-describedby']}
    >
      {props.children}
    </span>
  );
}
