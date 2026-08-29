// @ts-nocheck
export interface CommandSeparatorProps {
  className?: string;
}

function CommandSeparator(props: CommandSeparatorProps) {
  return (
    <div
      class={props.className}
      role="separator"
      aria-orientation="horizontal"
    ></div>
  );
}

export default CommandSeparator;
