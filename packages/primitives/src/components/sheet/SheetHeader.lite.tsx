import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { sheetHeaderVariants } from './sheet.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-sheet-header' },
});

export interface SheetHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function SheetHeader(props: SheetHeaderProps) {
  const state = useStore({
    get classes(): string {
      return cn(sheetHeaderVariants(), props.className);
    },
  });

  return (
    <div className={state.classes} id={props.id}>
      {props.children}
    </div>
  );
}
