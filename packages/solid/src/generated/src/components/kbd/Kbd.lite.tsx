// @ts-nocheck
export interface KbdProps {
  className?: string;
  /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
  "aria-label"?: string;
  children?: any;
}

function Kbd(props: KbdProps) {
  return (
    <kbd class={props.className} aria-label={props["aria-label"]}>
      {props.children}
    </kbd>
  );
}

export default Kbd;
