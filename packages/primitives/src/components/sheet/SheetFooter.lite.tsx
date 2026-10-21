import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { sheetFooterVariants } from './sheet.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-sheet-footer' },
});

export interface SheetFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function SheetFooter(props: SheetFooterProps) {
  const state = useStore({
    get classes(): string {
      return cn(sheetFooterVariants(), props.className);
    },
  });

  return (
    <div className={state.classes} id={props.id}>
      {props.children}
    </div>
  );
}
