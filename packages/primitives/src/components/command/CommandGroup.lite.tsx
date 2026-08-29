import { Show, useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CommandGroupProps {
  heading?: string;
  className?: string;
  headingClass?: string;
  children?: any;
}

export default function CommandGroup(props: CommandGroupProps) {
  return (
    <div role='group' className={props.className}>
      <Show when={props.heading}>
        <div className={props.headingClass} aria-hidden='true'>
          {props.heading}
        </div>
      </Show>
      {props.children}
    </div>
  );
}
