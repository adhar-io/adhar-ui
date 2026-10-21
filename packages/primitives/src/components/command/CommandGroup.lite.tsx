import { Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { commandGroupHeadingVariants, commandGroupVariants } from './command.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-command-group' },
});

export interface CommandGroupProps {
  heading?: string;
  className?: string;
  headingClass?: string;
  children?: any;
}

export default function CommandGroup(props: CommandGroupProps) {
  const state = useStore({
    get classes(): string {
      return cn(commandGroupVariants(), props.className);
    },
    get headingClasses(): string {
      return cn(commandGroupHeadingVariants(), props.headingClass);
    },
  });

  return (
    <div role='group' aria-label={props.heading} className={state.classes}>
      <Show when={props.heading}>
        <div className={state.headingClasses} aria-hidden='true'>
          {props.heading}
        </div>
      </Show>
      {props.children}
    </div>
  );
}
