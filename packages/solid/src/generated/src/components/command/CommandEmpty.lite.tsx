// @ts-nocheck
export interface CommandEmptyProps {
  className?: string;
  children?: any;
}

function CommandEmpty(props: CommandEmptyProps) {
  return (
    <div class={props.className} role="presentation">
      {props.children}
    </div>
  );
}

export default CommandEmpty;
