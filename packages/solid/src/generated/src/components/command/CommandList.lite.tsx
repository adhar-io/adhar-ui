// @ts-nocheck
export interface CommandListProps {
  id?: string;
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function CommandList(props: CommandListProps) {
  return (
    <div
      class={props.className}
      role="listbox"
      id={props.id}
      aria-label={props["aria-label"] || "Suggestions"}
    >
      {props.children}
    </div>
  );
}

export default CommandList;
