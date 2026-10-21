import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { commandEmptyVariants } from './command.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-command-empty' },
});

export interface CommandEmptyProps {
  className?: string;
  children?: any;
}

export default function CommandEmpty(props: CommandEmptyProps) {
  const state = useStore({
    get classes(): string {
      return cn(commandEmptyVariants(), props.className);
    },
  });

  return (
    <div role='presentation' className={state.classes}>
      {props.children}
    </div>
  );
}
