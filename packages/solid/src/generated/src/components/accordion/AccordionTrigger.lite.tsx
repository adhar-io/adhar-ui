// @ts-nocheck
export interface AccordionTriggerProps {
  open?: boolean;
  className?: string;
  onClick?: () => void;
  children?: any;
}

function AccordionTrigger(props: AccordionTriggerProps) {
  return (
    <button
      class={props.className}
      type='button'
      aria-expanded={props.open}
      onClick={(event) => props.onClick?.()}
    >
      {props.children}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        aria-hidden='true'
        style={{
          transform: props.open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}
      >
        <path d='m6 9 6 6 6-6'></path>
      </svg>
    </button>
  );
}

export default AccordionTrigger;
