import{R as e,r as m}from"./iframe-C6JDg_SY.js";import"./preload-helper-PPVm8Dsz.js";const d=(...t)=>t.filter(Boolean).join(" "),N={title:"Components/Overlay"},p=t=>{const[r,o]=m.useState(!1);return e.createElement("div",null,e.createElement("button",{onClick:()=>o(!0),className:"h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground"},"Open Dialog"),r&&e.createElement("div",{className:"fixed inset-0 z-50 flex items-center justify-center"},e.createElement("div",{className:"fixed inset-0 bg-black/80",onClick:()=>o(!1)}),e.createElement("div",{className:"relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg"},e.createElement("h2",{className:"text-lg font-semibold"},t.title),t.description&&e.createElement("p",{className:"mt-1 text-sm text-muted-foreground"},t.description),e.createElement("div",{className:"mt-4 space-y-3"},e.createElement("label",{className:"text-sm font-medium"},"Name"),e.createElement("input",{className:"flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm",defaultValue:"John Doe"})),t.showFooter&&e.createElement("div",{className:"mt-6 flex justify-end gap-2"},e.createElement("button",{className:"h-10 rounded-md border px-4 text-sm hover:bg-accent",onClick:()=>o(!1)},"Cancel"),e.createElement("button",{className:"h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground",onClick:()=>o(!1)},"Save")),e.createElement("button",{className:"absolute right-4 top-4 opacity-70 hover:opacity-100",onClick:()=>o(!1)},"✕"))))},n={name:"Dialog",args:{title:"Edit Profile",description:"Make changes to your profile here.",showFooter:!0,open:!1},argTypes:{title:{control:"text",description:"Dialog title"},description:{control:"text",description:"Dialog description text"},showFooter:{control:"boolean",description:"Show the footer with Cancel/Save buttons"},open:{control:"boolean",description:"Initial open state (use the button to open/close)"}},render:t=>e.createElement(p,{...t})},g={right:"inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l",left:"inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r",top:"inset-x-0 top-0 border-b",bottom:"inset-x-0 bottom-0 border-t"},u=t=>{const[r,o]=m.useState(!1);return e.createElement("div",null,e.createElement("button",{onClick:()=>o(!0),className:"h-10 rounded-md border px-4 text-sm hover:bg-accent"},"Open Sheet"),r&&e.createElement("div",{className:"fixed inset-0 z-50"},e.createElement("div",{className:"fixed inset-0 bg-black/80",onClick:()=>o(!1)}),e.createElement("div",{className:d("fixed z-50 bg-background p-6 shadow-lg",g[t.side])},e.createElement("h2",{className:"text-lg font-semibold"},t.title),e.createElement("p",{className:"mt-2 text-sm text-muted-foreground"},"Slides in from the ",t.side,"."),e.createElement("button",{className:"mt-4 h-9 rounded-md border px-3 text-sm hover:bg-accent",onClick:()=>o(!1)},"Close"),e.createElement("button",{className:"absolute right-4 top-4 opacity-70 hover:opacity-100",onClick:()=>o(!1)},"✕"))))},a={name:"Sheet",args:{side:"right",title:"Sheet Title"},argTypes:{side:{control:"select",options:["left","right","top","bottom"],description:"Side from which the sheet slides in"},title:{control:"text",description:"Sheet title"}},render:t=>e.createElement(u,{...t})},h={top:"bottom-full left-1/2 -translate-x-1/2 mb-2",right:"left-full top-1/2 -translate-y-1/2 ml-2",bottom:"top-full left-1/2 -translate-x-1/2 mt-2",left:"right-full top-1/2 -translate-y-1/2 mr-2"},x=t=>e.createElement("div",{className:"flex justify-center py-12"},e.createElement("div",{className:"group relative inline-flex"},e.createElement("button",{className:"h-9 rounded-md border px-3 text-sm hover:bg-accent"},"Hover me"),e.createElement("div",{className:d("absolute z-50 hidden rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md group-hover:block whitespace-nowrap",h[t.position])},t.content))),s={name:"Tooltip",args:{content:"Tooltip text",position:"top"},argTypes:{content:{control:"text",description:"Text displayed inside the tooltip"},position:{control:"select",options:["top","right","bottom","left"],description:"Position of the tooltip relative to the trigger"}},render:t=>e.createElement(x,{...t})},b=t=>{const[r,o]=m.useState(!1);return e.createElement("div",{className:"relative inline-block"},e.createElement("button",{onClick:()=>o(!r),className:"h-10 rounded-md border px-4 text-sm hover:bg-accent"},"Popover"),r&&e.createElement("div",{className:"absolute left-0 z-50 mt-2 w-72 rounded-md border bg-popover p-4 shadow-md"},t.showArrow&&e.createElement("div",{className:"absolute -top-2 left-6 h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-popover"}),e.createElement("h4",{className:"text-sm font-medium mb-2"},t.title),e.createElement("div",{className:"grid grid-cols-3 items-center gap-2"},e.createElement("label",{className:"text-sm"},"Width"),e.createElement("input",{className:"col-span-2 h-8 rounded border px-2 text-sm",defaultValue:"100%"})),e.createElement("button",{onClick:()=>o(!1),className:"mt-3 h-8 rounded-md bg-primary px-3 text-sm text-primary-foreground"},"Apply")))},l={name:"Popover",args:{title:"Settings",showArrow:!0},argTypes:{title:{control:"text",description:"Popover heading text"},showArrow:{control:"boolean",description:"Show a directional arrow on the popover"}},render:t=>e.createElement(b,{...t})},f={sm:"w-48",md:"w-64",lg:"w-80"},v=t=>e.createElement("div",{className:"py-8"},e.createElement("div",{className:"group relative inline-block"},e.createElement("a",{href:"#",className:"text-sm font-medium text-primary underline underline-offset-4"},t.triggerText),e.createElement("div",{className:d("absolute z-50 mt-2 rounded-md border bg-popover p-4 shadow-md hidden group-hover:block",f[t.width])},e.createElement("div",{className:"flex gap-3"},e.createElement("span",{className:"flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm"},"A"),e.createElement("div",null,e.createElement("h4",{className:"text-sm font-semibold"},"Adhar UI"),e.createElement("p",{className:"text-xs text-muted-foreground mt-1"},"Framework-agnostic design system.")))))),i={name:"Hover Card",args:{triggerText:"Hover me",width:"md"},argTypes:{triggerText:{control:"text",description:"Text of the hover trigger link"},width:{control:"select",options:["sm","md","lg"],description:"Width of the hover card"}},render:t=>e.createElement(v,{...t})},w=t=>{const[r,o]=m.useState(!1);return e.createElement("div",null,e.createElement("button",{onClick:()=>o(!0),className:"h-10 rounded-md border px-4 text-sm hover:bg-accent"},"Open Drawer"),r&&e.createElement("div",{className:"fixed inset-0 z-50"},e.createElement("div",{className:"fixed inset-0 bg-black/80",onClick:()=>o(!1)}),e.createElement("div",{className:"fixed inset-x-0 bottom-0 z-50 rounded-t-xl border bg-background"},e.createElement("div",{className:"mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"}),e.createElement("div",{className:"p-6"},e.createElement("h2",{className:"text-lg font-semibold"},t.title),t.description&&e.createElement("p",{className:"mt-2 text-sm text-muted-foreground"},t.description),e.createElement("button",{onClick:()=>o(!1),className:"mt-4 h-10 w-full rounded-md border text-sm hover:bg-accent"},"Close")))))},c={name:"Drawer",args:{title:"Drawer Title",description:"Mobile-friendly bottom drawer."},argTypes:{title:{control:"text",description:"Drawer title"},description:{control:"text",description:"Drawer description text"}},render:t=>e.createElement(w,{...t})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Dialog',
  args: {
    title: 'Edit Profile',
    description: 'Make changes to your profile here.',
    showFooter: true,
    open: false
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Dialog title'
    },
    description: {
      control: 'text',
      description: 'Dialog description text'
    },
    showFooter: {
      control: 'boolean',
      description: 'Show the footer with Cancel/Save buttons'
    },
    open: {
      control: 'boolean',
      description: 'Initial open state (use the button to open/close)'
    }
  },
  render: args => <DialogComponent {...args} />
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Sheet',
  args: {
    side: 'right',
    title: 'Sheet Title'
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Side from which the sheet slides in'
    },
    title: {
      control: 'text',
      description: 'Sheet title'
    }
  },
  render: args => <SheetComponent {...args} />
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Tooltip',
  args: {
    content: 'Tooltip text',
    position: 'top'
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Text displayed inside the tooltip'
    },
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the tooltip relative to the trigger'
    }
  },
  render: args => <TooltipComponent {...args} />
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Popover',
  args: {
    title: 'Settings',
    showArrow: true
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Popover heading text'
    },
    showArrow: {
      control: 'boolean',
      description: 'Show a directional arrow on the popover'
    }
  },
  render: args => <PopoverComponent {...args} />
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Hover Card',
  args: {
    triggerText: 'Hover me',
    width: 'md'
  },
  argTypes: {
    triggerText: {
      control: 'text',
      description: 'Text of the hover trigger link'
    },
    width: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Width of the hover card'
    }
  },
  render: args => <HoverCardComponent {...args} />
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Drawer',
  args: {
    title: 'Drawer Title',
    description: 'Mobile-friendly bottom drawer.'
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Drawer title'
    },
    description: {
      control: 'text',
      description: 'Drawer description text'
    }
  },
  render: args => <DrawerComponent {...args} />
}`,...c.parameters?.docs?.source}}};const S=["DialogStory","SheetStory","TooltipStory","PopoverStory","HoverCardStory","DrawerStory"];export{n as DialogStory,c as DrawerStory,i as HoverCardStory,l as PopoverStory,a as SheetStory,s as TooltipStory,S as __namedExportsOrder,N as default};
