// @ts-nocheck
export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

function Separator(props: SeparatorProps) {
  return (
    <div
      class={props.className}
      role='separator'
      aria-orientation={props.orientation || 'horizontal'}
    >
    </div>
  );
}

export default Separator;
