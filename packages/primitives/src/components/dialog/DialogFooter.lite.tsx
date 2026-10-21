import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { dialogFooterVariants } from './dialog.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-dialog-footer' },
});

export interface DialogFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function DialogFooter(props: DialogFooterProps) {
  const state = useStore({
    get classes(): string {
      return cn(dialogFooterVariants(), props.className);
    },
  });

  return (
    <div className={state.classes} id={props.id}>
      {props.children}
    </div>
  );
}
