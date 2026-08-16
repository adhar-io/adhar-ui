import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{n}from"./iframe-xPHbGT99.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";var i,a,o,s,c,l,u,d,f,p,m,h;function g(){return(g=t((()=>{i=e(n(),1),a=r(),o=(...e)=>e.filter(Boolean).join(` `),s={title:`Components/Layout & Feedback`},c={name:`Card`,args:{title:`Card Title`,description:`Deploy your new project in one-click.`,showFooter:!0,variant:`default`},argTypes:{title:{control:`text`},description:{control:`text`},showFooter:{control:`boolean`},variant:{control:`select`,options:[`default`,`bordered`,`elevated`]}},render:e=>{let t={default:`border bg-card shadow-sm`,bordered:`border-2 border-primary bg-card`,elevated:`bg-card shadow-xl`}[e.variant];return(0,a.jsxs)(`div`,{className:o(`max-w-sm rounded-lg`,t),children:[(0,a.jsxs)(`div`,{className:`flex flex-col space-y-1.5 p-6`,children:[(0,a.jsx)(`h3`,{className:`text-2xl font-semibold tracking-tight`,children:e.title}),e.description&&(0,a.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:e.description})]}),(0,a.jsxs)(`div`,{className:`p-6 pt-0 space-y-3`,children:[(0,a.jsx)(`label`,{className:`text-sm font-medium`,children:`Name`}),(0,a.jsx)(`input`,{className:`flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm`,placeholder:`Project`})]}),e.showFooter&&(0,a.jsxs)(`div`,{className:`flex items-center p-6 pt-0 justify-between`,children:[(0,a.jsx)(`button`,{className:`h-10 rounded-md border px-4 text-sm hover:bg-accent`,children:`Cancel`}),(0,a.jsx)(`button`,{className:`h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground`,children:`Deploy`})]})]})}},l={name:`Scroll Area`,args:{height:200,orientation:`vertical`},argTypes:{height:{control:{type:`number`,min:100,max:400,step:10}},orientation:{control:`select`,options:[`vertical`,`horizontal`]}},render:e=>e.orientation===`horizontal`?(0,a.jsx)(`div`,{className:`w-72 overflow-hidden rounded-md border`,style:{height:e.height},children:(0,a.jsx)(`div`,{className:`overflow-x-auto p-4 h-full`,children:(0,a.jsx)(`div`,{className:`flex gap-3`,style:{width:800},children:Array.from({length:15},(e,t)=>(0,a.jsx)(`div`,{className:`h-20 w-20 shrink-0 rounded-md bg-muted flex items-center justify-center text-sm`,children:t+1},t))})})}):(0,a.jsx)(`div`,{className:`w-64 overflow-hidden rounded-md border`,style:{height:e.height},children:(0,a.jsxs)(`div`,{className:`h-full overflow-auto p-4`,children:[(0,a.jsx)(`h4`,{className:`mb-4 text-sm font-medium`,children:`Tags`}),Array.from({length:20},(e,t)=>(0,a.jsxs)(`div`,{className:`border-b py-2 text-sm`,children:[`Tag `,t+1]},t))]})})},u={name:`Collapsible`,args:{title:`Toggle Section`,defaultOpen:!1},argTypes:{title:{control:`text`},defaultOpen:{control:`boolean`}},render:e=>{let[t,n]=(0,i.useState)(e.defaultOpen);return(0,a.jsxs)(`div`,{className:`max-w-sm space-y-2`,children:[(0,a.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,a.jsx)(`h4`,{className:`text-sm font-semibold`,children:e.title}),(0,a.jsx)(`button`,{onClick:()=>n(!t),className:`rounded p-1 hover:bg-accent text-sm`,children:t?`▲`:`▼`})]}),(0,a.jsx)(`div`,{className:`rounded-md border px-4 py-3 text-sm font-mono`,children:`@adhar-ui/primitives`}),t&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`div`,{className:`rounded-md border px-4 py-3 text-sm font-mono`,children:`@adhar-ui/tokens`}),(0,a.jsx)(`div`,{className:`rounded-md border px-4 py-3 text-sm font-mono`,children:`@adhar-ui/utils`})]})]})}},d={name:`Resizable`,args:{direction:`horizontal`,defaultSize:50},argTypes:{direction:{control:`select`,options:[`horizontal`,`vertical`]},defaultSize:{control:{type:`number`,min:30,max:70,step:1}}},render:e=>{let t=e.direction===`horizontal`;return(0,a.jsxs)(`div`,{className:o(`max-w-lg rounded-lg border`,t?`flex h-48`:`flex flex-col h-72`),children:[(0,a.jsx)(`div`,{className:`p-4`,style:t?{width:`${e.defaultSize}%`}:{height:`${e.defaultSize}%`},children:(0,a.jsx)(`h4`,{className:`text-sm font-semibold`,children:t?`Left`:`Top`})}),(0,a.jsx)(`div`,{className:o(`flex items-center justify-center bg-border`,t?`w-px`:`h-px`),children:(0,a.jsx)(`div`,{className:`z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border text-[8px]`,children:t?`⋮`:`⋯`})}),(0,a.jsx)(`div`,{className:`p-4 flex-1`,children:(0,a.jsx)(`h4`,{className:`text-sm font-semibold`,children:t?`Right`:`Bottom`})})]})}},f={name:`Alert`,args:{variant:`default`,title:`Heads up!`,description:`You can add components using the CLI.`},argTypes:{variant:{control:`select`,options:[`default`,`destructive`,`success`,`warning`]},title:{control:`text`},description:{control:`text`}},render:e=>{let t={default:`border`,destructive:`border border-destructive/50 text-destructive`,success:`border border-green-500/50 text-green-700`,warning:`border border-yellow-500/50 text-yellow-700`}[e.variant];return(0,a.jsxs)(`div`,{className:o(`max-w-lg rounded-lg p-4`,t),children:[(0,a.jsx)(`h5`,{className:`mb-1 font-medium text-sm`,children:e.title}),(0,a.jsx)(`p`,{className:`text-sm`,children:e.description})]})}},p={name:`Alert Dialog`,args:{title:`Are you sure?`,description:`This action cannot be undone.`,confirmLabel:`Continue`,cancelLabel:`Cancel`},argTypes:{title:{control:`text`},description:{control:`text`},confirmLabel:{control:`text`},cancelLabel:{control:`text`}},render:e=>{let[t,n]=(0,i.useState)(!1);return(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`button`,{onClick:()=>n(!0),className:`h-10 rounded-md bg-destructive px-4 text-sm text-destructive-foreground`,children:`Open Dialog`}),t&&(0,a.jsxs)(`div`,{className:`fixed inset-0 z-50 flex items-center justify-center`,children:[(0,a.jsx)(`div`,{className:`fixed inset-0 bg-black/80`,onClick:()=>n(!1)}),(0,a.jsxs)(`div`,{className:`relative z-50 max-w-md rounded-lg border bg-background p-6 shadow-lg`,children:[(0,a.jsx)(`h2`,{className:`text-lg font-semibold`,children:e.title}),(0,a.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:e.description}),(0,a.jsxs)(`div`,{className:`mt-6 flex justify-end gap-2`,children:[(0,a.jsx)(`button`,{onClick:()=>n(!1),className:`h-10 rounded-md border px-4 text-sm hover:bg-accent`,children:e.cancelLabel}),(0,a.jsx)(`button`,{onClick:()=>n(!1),className:`h-10 rounded-md bg-destructive px-4 text-sm text-destructive-foreground`,children:e.confirmLabel})]})]})]})]})}},m={name:`Toast`,args:{message:`Event created`,variant:`default`},argTypes:{message:{control:`text`},variant:{control:`select`,options:[`default`,`success`,`destructive`,`warning`]}},render:e=>{let[t,n]=(0,i.useState)(!1),r={default:`border bg-background`,success:`border border-green-500/50 bg-green-50 text-green-700`,destructive:`border border-destructive/50 bg-red-50 text-destructive`,warning:`border border-yellow-500/50 bg-yellow-50 text-yellow-700`}[e.variant];return(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`button`,{onClick:()=>{n(!0),setTimeout(()=>n(!1),3e3)},className:`h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground`,children:`Show Toast`}),t&&(0,a.jsx)(`div`,{className:o(`fixed bottom-4 right-4 z-50 rounded-lg p-4 shadow-lg w-72`,r),children:(0,a.jsx)(`p`,{className:`text-sm font-semibold`,children:e.message})})]})}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h=[`Card`,`ScrollArea`,`Collapsible`,`Resizable`,`Alert`,`AlertDialog`,`Toast`]})))()}g();export{f as Alert,p as AlertDialog,c as Card,u as Collapsible,d as Resizable,l as ScrollArea,m as Toast,h as __namedExportsOrder,s as default};