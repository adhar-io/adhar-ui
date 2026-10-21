import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { dialogHeaderVariants } from './dialog.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-dialog-header' },
});

export interface DialogHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function DialogHeader(props: DialogHeaderProps) {
  const state = useStore({
    get classes(): string {
      return cn(dialogHeaderVariants(), props.className);
    },
  });

  return (
    <div className={state.classes} id={props.id}>
      {props.children}
    </div>
  );
}
