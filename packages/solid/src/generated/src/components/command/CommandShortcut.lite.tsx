// @ts-nocheck
export interface CommandShortcutProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function CommandShortcut(props: CommandShortcutProps) {
  return (
    <span class={props.className} aria-label={props["aria-label"]}>
      {props.children}
    </span>
  );
}

export default CommandShortcut;
