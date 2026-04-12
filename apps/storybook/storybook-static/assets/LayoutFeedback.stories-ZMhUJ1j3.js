import{R as e,r as u}from"./iframe-C6JDg_SY.js";import"./preload-helper-PPVm8Dsz.js";const s=(...t)=>t.filter(Boolean).join(" "),x={title:"Components/Layout & Feedback"},o={name:"Card",args:{title:"Card Title",description:"Deploy your new project in one-click.",showFooter:!0,variant:"default"},argTypes:{title:{control:"text"},description:{control:"text"},showFooter:{control:"boolean"},variant:{control:"select",options:["default","bordered","elevated"]}},render:t=>{const r={default:"border bg-card shadow-sm",bordered:"border-2 border-primary bg-card",elevated:"bg-card shadow-xl"}[t.variant];return e.createElement("div",{className:s("max-w-sm rounded-lg",r)},e.createElement("div",{className:"flex flex-col space-y-1.5 p-6"},e.createElement("h3",{className:"text-2xl font-semibold tracking-tight"},t.title),t.description&&e.createElement("p",{className:"text-sm text-muted-foreground"},t.description)),e.createElement("div",{className:"p-6 pt-0 space-y-3"},e.createElement("label",{className:"text-sm font-medium"},"Name"),e.createElement("input",{className:"flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm",placeholder:"Project"})),t.showFooter&&e.createElement("div",{className:"flex items-center p-6 pt-0 justify-between"},e.createElement("button",{className:"h-10 rounded-md border px-4 text-sm hover:bg-accent"},"Cancel"),e.createElement("button",{className:"h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground"},"Deploy")))}},n={name:"Scroll Area",args:{height:200,orientation:"vertical"},argTypes:{height:{control:{type:"number",min:100,max:400,step:10}},orientation:{control:"select",options:["vertical","horizontal"]}},render:t=>t.orientation==="horizontal"?e.createElement("div",{className:"w-72 overflow-hidden rounded-md border",style:{height:t.height}},e.createElement("div",{className:"overflow-x-auto p-4 h-full"},e.createElement("div",{className:"flex gap-3",style:{width:800}},Array.from({length:15},(r,a)=>e.createElement("div",{key:a,className:"h-20 w-20 shrink-0 rounded-md bg-muted flex items-center justify-center text-sm"},a+1))))):e.createElement("div",{className:"w-64 overflow-hidden rounded-md border",style:{height:t.height}},e.createElement("div",{className:"h-full overflow-auto p-4"},e.createElement("h4",{className:"mb-4 text-sm font-medium"},"Tags"),Array.from({length:20},(r,a)=>e.createElement("div",{key:a,className:"border-b py-2 text-sm"},"Tag ",a+1))))},l={name:"Collapsible",args:{title:"Toggle Section",defaultOpen:!1},argTypes:{title:{control:"text"},defaultOpen:{control:"boolean"}},render:t=>{const[r,a]=u.useState(t.defaultOpen);return e.createElement("div",{className:"max-w-sm space-y-2"},e.createElement("div",{className:"flex items-center justify-between"},e.createElement("h4",{className:"text-sm font-semibold"},t.title),e.createElement("button",{onClick:()=>a(!r),className:"rounded p-1 hover:bg-accent text-sm"},r?"▲":"▼")),e.createElement("div",{className:"rounded-md border px-4 py-3 text-sm font-mono"},"@adhar-ui/primitives"),r&&e.createElement(e.Fragment,null,e.createElement("div",{className:"rounded-md border px-4 py-3 text-sm font-mono"},"@adhar-ui/tokens"),e.createElement("div",{className:"rounded-md border px-4 py-3 text-sm font-mono"},"@adhar-ui/utils")))}},d={name:"Resizable",args:{direction:"horizontal",defaultSize:50},argTypes:{direction:{control:"select",options:["horizontal","vertical"]},defaultSize:{control:{type:"number",min:30,max:70,step:1}}},render:t=>{const r=t.direction==="horizontal";return e.createElement("div",{className:s("max-w-lg rounded-lg border",r?"flex h-48":"flex flex-col h-72")},e.createElement("div",{className:"p-4",style:r?{width:`${t.defaultSize}%`}:{height:`${t.defaultSize}%`}},e.createElement("h4",{className:"text-sm font-semibold"},r?"Left":"Top")),e.createElement("div",{className:s("flex items-center justify-center bg-border",r?"w-px":"h-px")},e.createElement("div",{className:"z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border text-[8px]"},r?"⋮":"⋯")),e.createElement("div",{className:"p-4 flex-1"},e.createElement("h4",{className:"text-sm font-semibold"},r?"Right":"Bottom")))}},i={name:"Alert",args:{variant:"default",title:"Heads up!",description:"You can add components using the CLI."},argTypes:{variant:{control:"select",options:["default","destructive","success","warning"]},title:{control:"text"},description:{control:"text"}},render:t=>{const r={default:"border",destructive:"border border-destructive/50 text-destructive",success:"border border-green-500/50 text-green-700",warning:"border border-yellow-500/50 text-yellow-700"}[t.variant];return e.createElement("div",{className:s("max-w-lg rounded-lg p-4",r)},e.createElement("h5",{className:"mb-1 font-medium text-sm"},t.title),e.createElement("p",{className:"text-sm"},t.description))}},c={name:"Alert Dialog",args:{title:"Are you sure?",description:"This action cannot be undone.",confirmLabel:"Continue",cancelLabel:"Cancel"},argTypes:{title:{control:"text"},description:{control:"text"},confirmLabel:{control:"text"},cancelLabel:{control:"text"}},render:t=>{const[r,a]=u.useState(!1);return e.createElement("div",null,e.createElement("button",{onClick:()=>a(!0),className:"h-10 rounded-md bg-destructive px-4 text-sm text-destructive-foreground"},"Open Dialog"),r&&e.createElement("div",{className:"fixed inset-0 z-50 flex items-center justify-center"},e.createElement("div",{className:"fixed inset-0 bg-black/80",onClick:()=>a(!1)}),e.createElement("div",{className:"relative z-50 max-w-md rounded-lg border bg-background p-6 shadow-lg"},e.createElement("h2",{className:"text-lg font-semibold"},t.title),e.createElement("p",{className:"mt-2 text-sm text-muted-foreground"},t.description),e.createElement("div",{className:"mt-6 flex justify-end gap-2"},e.createElement("button",{onClick:()=>a(!1),className:"h-10 rounded-md border px-4 text-sm hover:bg-accent"},t.cancelLabel),e.createElement("button",{onClick:()=>a(!1),className:"h-10 rounded-md bg-destructive px-4 text-sm text-destructive-foreground"},t.confirmLabel)))))}},m={name:"Toast",args:{message:"Event created",variant:"default"},argTypes:{message:{control:"text"},variant:{control:"select",options:["default","success","destructive","warning"]}},render:t=>{const[r,a]=u.useState(!1),p={default:"border bg-background",success:"border border-green-500/50 bg-green-50 text-green-700",destructive:"border border-destructive/50 bg-red-50 text-destructive",warning:"border border-yellow-500/50 bg-yellow-50 text-yellow-700"}[t.variant];return e.createElement("div",null,e.createElement("button",{onClick:()=>{a(!0),setTimeout(()=>a(!1),3e3)},className:"h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground"},"Show Toast"),r&&e.createElement("div",{className:s("fixed bottom-4 right-4 z-50 rounded-lg p-4 shadow-lg w-72",p)},e.createElement("p",{className:"text-sm font-semibold"},t.message)))}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Card',
  args: {
    title: 'Card Title',
    description: 'Deploy your new project in one-click.',
    showFooter: true,
    variant: 'default'
  },
  argTypes: {
    title: {
      control: 'text'
    },
    description: {
      control: 'text'
    },
    showFooter: {
      control: 'boolean'
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated']
    }
  },
  render: args => {
    const variantClass = {
      default: 'border bg-card shadow-sm',
      bordered: 'border-2 border-primary bg-card',
      elevated: 'bg-card shadow-xl'
    }[args.variant];
    return <div className={cn('max-w-sm rounded-lg', variantClass)}>
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold tracking-tight">{args.title}</h3>
          {args.description && <p className="text-sm text-muted-foreground">{args.description}</p>}
        </div>
        <div className="p-6 pt-0 space-y-3">
          <label className="text-sm font-medium">Name</label>
          <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" placeholder="Project" />
        </div>
        {args.showFooter && <div className="flex items-center p-6 pt-0 justify-between">
            <button className="h-10 rounded-md border px-4 text-sm hover:bg-accent">Cancel</button>
            <button className="h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground">
              Deploy
            </button>
          </div>}
      </div>;
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Scroll Area',
  args: {
    height: 200,
    orientation: 'vertical'
  },
  argTypes: {
    height: {
      control: {
        type: 'number',
        min: 100,
        max: 400,
        step: 10
      }
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal']
    }
  },
  render: args => {
    if (args.orientation === 'horizontal') {
      return <div className="w-72 overflow-hidden rounded-md border" style={{
        height: args.height
      }}>
          <div className="overflow-x-auto p-4 h-full">
            <div className="flex gap-3" style={{
            width: 800
          }}>
              {Array.from({
              length: 15
            }, (_, i) => <div key={i} className="h-20 w-20 shrink-0 rounded-md bg-muted flex items-center justify-center text-sm">
                  {i + 1}
                </div>)}
            </div>
          </div>
        </div>;
    }
    return <div className="w-64 overflow-hidden rounded-md border" style={{
      height: args.height
    }}>
        <div className="h-full overflow-auto p-4">
          <h4 className="mb-4 text-sm font-medium">Tags</h4>
          {Array.from({
          length: 20
        }, (_, i) => <div key={i} className="border-b py-2 text-sm">
              Tag {i + 1}
            </div>)}
        </div>
      </div>;
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Collapsible',
  args: {
    title: 'Toggle Section',
    defaultOpen: false
  },
  argTypes: {
    title: {
      control: 'text'
    },
    defaultOpen: {
      control: 'boolean'
    }
  },
  render: args => {
    const [open, setOpen] = useState(args.defaultOpen);
    return <div className="max-w-sm space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">{args.title}</h4>
          <button onClick={() => setOpen(!open)} className="rounded p-1 hover:bg-accent text-sm">
            {open ? '▲' : '▼'}
          </button>
        </div>
        <div className="rounded-md border px-4 py-3 text-sm font-mono">@adhar-ui/primitives</div>
        {open && <>
            <div className="rounded-md border px-4 py-3 text-sm font-mono">@adhar-ui/tokens</div>
            <div className="rounded-md border px-4 py-3 text-sm font-mono">@adhar-ui/utils</div>
          </>}
      </div>;
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Resizable',
  args: {
    direction: 'horizontal',
    defaultSize: 50
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    defaultSize: {
      control: {
        type: 'number',
        min: 30,
        max: 70,
        step: 1
      }
    }
  },
  render: args => {
    const isHorizontal = args.direction === 'horizontal';
    return <div className={cn('max-w-lg rounded-lg border', isHorizontal ? 'flex h-48' : 'flex flex-col h-72')}>
        <div className="p-4" style={isHorizontal ? {
        width: \`\${args.defaultSize}%\`
      } : {
        height: \`\${args.defaultSize}%\`
      }}>
          <h4 className="text-sm font-semibold">{isHorizontal ? 'Left' : 'Top'}</h4>
        </div>
        <div className={cn('flex items-center justify-center bg-border', isHorizontal ? 'w-px' : 'h-px')}>
          <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border text-[8px]">
            {isHorizontal ? '⋮' : '⋯'}
          </div>
        </div>
        <div className="p-4 flex-1">
          <h4 className="text-sm font-semibold">{isHorizontal ? 'Right' : 'Bottom'}</h4>
        </div>
      </div>;
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Alert',
  args: {
    variant: 'default',
    title: 'Heads up!',
    description: 'You can add components using the CLI.'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning']
    },
    title: {
      control: 'text'
    },
    description: {
      control: 'text'
    }
  },
  render: args => {
    const variantClass = {
      default: 'border',
      destructive: 'border border-destructive/50 text-destructive',
      success: 'border border-green-500/50 text-green-700',
      warning: 'border border-yellow-500/50 text-yellow-700'
    }[args.variant];
    return <div className={cn('max-w-lg rounded-lg p-4', variantClass)}>
        <h5 className="mb-1 font-medium text-sm">{args.title}</h5>
        <p className="text-sm">{args.description}</p>
      </div>;
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Alert Dialog',
  args: {
    title: 'Are you sure?',
    description: 'This action cannot be undone.',
    confirmLabel: 'Continue',
    cancelLabel: 'Cancel'
  },
  argTypes: {
    title: {
      control: 'text'
    },
    description: {
      control: 'text'
    },
    confirmLabel: {
      control: 'text'
    },
    cancelLabel: {
      control: 'text'
    }
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <div>
        <button onClick={() => setOpen(true)} className="h-10 rounded-md bg-destructive px-4 text-sm text-destructive-foreground">
          Open Dialog
        </button>
        {open && <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/80" onClick={() => setOpen(false)} />
            <div className="relative z-50 max-w-md rounded-lg border bg-background p-6 shadow-lg">
              <h2 className="text-lg font-semibold">{args.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{args.description}</p>
              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setOpen(false)} className="h-10 rounded-md border px-4 text-sm hover:bg-accent">
                  {args.cancelLabel}
                </button>
                <button onClick={() => setOpen(false)} className="h-10 rounded-md bg-destructive px-4 text-sm text-destructive-foreground">
                  {args.confirmLabel}
                </button>
              </div>
            </div>
          </div>}
      </div>;
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Toast',
  args: {
    message: 'Event created',
    variant: 'default'
  },
  argTypes: {
    message: {
      control: 'text'
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'destructive', 'warning']
    }
  },
  render: args => {
    const [show, setShow] = useState(false);
    const variantClass = {
      default: 'border bg-background',
      success: 'border border-green-500/50 bg-green-50 text-green-700',
      destructive: 'border border-destructive/50 bg-red-50 text-destructive',
      warning: 'border border-yellow-500/50 bg-yellow-50 text-yellow-700'
    }[args.variant];
    return <div>
        <button onClick={() => {
        setShow(true);
        setTimeout(() => setShow(false), 3000);
      }} className="h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground">
          Show Toast
        </button>
        {show && <div className={cn('fixed bottom-4 right-4 z-50 rounded-lg p-4 shadow-lg w-72', variantClass)}>
            <p className="text-sm font-semibold">{args.message}</p>
          </div>}
      </div>;
  }
}`,...m.parameters?.docs?.source}}};const v=["Card","ScrollArea","Collapsible","Resizable","Alert","AlertDialog","Toast"];export{i as Alert,c as AlertDialog,o as Card,l as Collapsible,d as Resizable,n as ScrollArea,m as Toast,v as __namedExportsOrder,x as default};
