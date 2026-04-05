// @ts-nocheck
export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  children?: any;
}

function Badge(props: BadgeProps) {
  return (
    <div class={props.className} role='status'>
      {props.children}
    </div>
  );
}

export default Badge;
