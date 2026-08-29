// @ts-nocheck
export interface CommandProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

// Command menu / palette container. Filtering & keyboard navigation are driven
// by the consumer (controlled), keeping the primitive framework-portable.

function Command(props: CommandProps) {
  return (
    <div
      class={props.className}
      aria-label={props["aria-label"] || "Command menu"}
    >
      {props.children}
    </div>
  );
}

export default Command;
