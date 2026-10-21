import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { commandListVariants } from './command.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-command-list' },
});

export interface CommandListProps {
  id?: string;
  className?: string;
  'aria-label'?: string;
  children?: any;
}

export default function CommandList(props: CommandListProps) {
  const state = useStore({
    get classes(): string {
      return cn(commandListVariants(), props.className);
    },
  });

  return (
    <div
      id={props.id}
      role='listbox'
      aria-label={props['aria-label'] || 'Suggestions'}
      className={state.classes}
    >
      {props.children}
    </div>
  );
}
