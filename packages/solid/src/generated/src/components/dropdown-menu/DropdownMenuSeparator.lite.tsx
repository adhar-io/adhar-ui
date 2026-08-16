// @ts-nocheck
export interface DropdownMenuSeparatorProps {
  className?: string;
}

function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  return <div class={props.className} role="separator"></div>;
}

export default DropdownMenuSeparator;
