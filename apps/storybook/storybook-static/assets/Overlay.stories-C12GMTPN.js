import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{n}from"./iframe-BvQCw4VR.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";var i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=t((()=>{i=e(n(),1),a=r(),o=(...e)=>e.filter(Boolean).join(` `),s={title:`Components/Overlay`},c=e=>{let[t,n]=(0,i.useState)(!1);return(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`button`,{onClick:()=>n(!0),className:`h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground`,children:`Open Dialog`}),t&&(0,a.jsxs)(`div`,{className:`fixed inset-0 z-50 flex items-center justify-center`,children:[(0,a.jsx)(`div`,{className:`fixed inset-0 bg-black/80`,onClick:()=>n(!1)}),(0,a.jsxs)(`div`,{className:`relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg`,children:[(0,a.jsx)(`h2`,{className:`text-lg font-semibold`,children:e.title}),e.description&&(0,a.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:e.description}),(0,a.jsxs)(`div`,{className:`mt-4 space-y-3`,children:[(0,a.jsx)(`label`,{className:`text-sm font-medium`,children:`Name`}),(0,a.jsx)(`input`,{className:`flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm`,defaultValue:`John Doe`})]}),e.showFooter&&(0,a.jsxs)(`div`,{className:`mt-6 flex justify-end gap-2`,children:[(0,a.jsx)(`button`,{className:`h-10 rounded-md border px-4 text-sm hover:bg-accent`,onClick:()=>n(!1),children:`Cancel`}),(0,a.jsx)(`button`,{className:`h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground`,onClick:()=>n(!1),children:`Save`})]}),(0,a.jsx)(`button`,{className:`absolute right-4 top-4 opacity-70 hover:opacity-100`,onClick:()=>n(!1),children:`✕`})]})]})]})},l={name:`Dialog`,args:{title:`Edit Profile`,description:`Make changes to your profile here.`,showFooter:!0,open:!1},argTypes:{title:{control:`text`,description:`Dialog title`},description:{control:`text`,description:`Dialog description text`},showFooter:{control:`boolean`,description:`Show the footer with Cancel/Save buttons`},open:{control:`boolean`,description:`Initial open state (use the button to open/close)`}},render:e=>(0,a.jsx)(c,{...e})},u={right:`inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l`,left:`inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r`,top:`inset-x-0 top-0 border-b`,bottom:`inset-x-0 bottom-0 border-t`},d=e=>{let[t,n]=(0,i.useState)(!1);return(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`button`,{onClick:()=>n(!0),className:`h-10 rounded-md border px-4 text-sm hover:bg-accent`,children:`Open Sheet`}),t&&(0,a.jsxs)(`div`,{className:`fixed inset-0 z-50`,children:[(0,a.jsx)(`div`,{className:`fixed inset-0 bg-black/80`,onClick:()=>n(!1)}),(0,a.jsxs)(`div`,{className:o(`fixed z-50 bg-background p-6 shadow-lg`,u[e.side]),children:[(0,a.jsx)(`h2`,{className:`text-lg font-semibold`,children:e.title}),(0,a.jsxs)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:[`Slides in from the `,e.side,`.`]}),(0,a.jsx)(`button`,{className:`mt-4 h-9 rounded-md border px-3 text-sm hover:bg-accent`,onClick:()=>n(!1),children:`Close`}),(0,a.jsx)(`button`,{className:`absolute right-4 top-4 opacity-70 hover:opacity-100`,onClick:()=>n(!1),children:`✕`})]})]})]})},f={name:`Sheet`,args:{side:`right`,title:`Sheet Title`},argTypes:{side:{control:`select`,options:[`left`,`right`,`top`,`bottom`],description:`Side from which the sheet slides in`},title:{control:`text`,description:`Sheet title`}},render:e=>(0,a.jsx)(d,{...e})},p={top:`bottom-full left-1/2 -translate-x-1/2 mb-2`,right:`left-full top-1/2 -translate-y-1/2 ml-2`,bottom:`top-full left-1/2 -translate-x-1/2 mt-2`,left:`right-full top-1/2 -translate-y-1/2 mr-2`},m=e=>(0,a.jsx)(`div`,{className:`flex justify-center py-12`,children:(0,a.jsxs)(`div`,{className:`group relative inline-flex`,children:[(0,a.jsx)(`button`,{className:`h-9 rounded-md border px-3 text-sm hover:bg-accent`,children:`Hover me`}),(0,a.jsx)(`div`,{className:o(`absolute z-50 hidden rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md group-hover:block whitespace-nowrap`,p[e.position]),children:e.content})]})}),h={name:`Tooltip`,args:{content:`Tooltip text`,position:`top`},argTypes:{content:{control:`text`,description:`Text displayed inside the tooltip`},position:{control:`select`,options:[`top`,`right`,`bottom`,`left`],description:`Position of the tooltip relative to the trigger`}},render:e=>(0,a.jsx)(m,{...e})},g=e=>{let[t,n]=(0,i.useState)(!1);return(0,a.jsxs)(`div`,{className:`relative inline-block`,children:[(0,a.jsx)(`button`,{onClick:()=>n(!t),className:`h-10 rounded-md border px-4 text-sm hover:bg-accent`,children:`Popover`}),t&&(0,a.jsxs)(`div`,{className:`absolute left-0 z-50 mt-2 w-72 rounded-md border bg-popover p-4 shadow-md`,children:[e.showArrow&&(0,a.jsx)(`div`,{className:`absolute -top-2 left-6 h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-popover`}),(0,a.jsx)(`h4`,{className:`text-sm font-medium mb-2`,children:e.title}),(0,a.jsxs)(`div`,{className:`grid grid-cols-3 items-center gap-2`,children:[(0,a.jsx)(`label`,{className:`text-sm`,children:`Width`}),(0,a.jsx)(`input`,{className:`col-span-2 h-8 rounded border px-2 text-sm`,defaultValue:`100%`})]}),(0,a.jsx)(`button`,{onClick:()=>n(!1),className:`mt-3 h-8 rounded-md bg-primary px-3 text-sm text-primary-foreground`,children:`Apply`})]})]})},_={name:`Popover`,args:{title:`Settings`,showArrow:!0},argTypes:{title:{control:`text`,description:`Popover heading text`},showArrow:{control:`boolean`,description:`Show a directional arrow on the popover`}},render:e=>(0,a.jsx)(g,{...e})},v={sm:`w-48`,md:`w-64`,lg:`w-80`},y=e=>(0,a.jsx)(`div`,{className:`py-8`,children:(0,a.jsxs)(`div`,{className:`group relative inline-block`,children:[(0,a.jsx)(`a`,{href:`#`,className:`text-sm font-medium text-primary underline underline-offset-4`,children:e.triggerText}),(0,a.jsx)(`div`,{className:o(`absolute z-50 mt-2 rounded-md border bg-popover p-4 shadow-md hidden group-hover:block`,v[e.width]),children:(0,a.jsxs)(`div`,{className:`flex gap-3`,children:[(0,a.jsx)(`span`,{className:`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm`,children:`A`}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`h4`,{className:`text-sm font-semibold`,children:`Adhar UI`}),(0,a.jsx)(`p`,{className:`text-xs text-muted-foreground mt-1`,children:`Framework-agnostic design system.`})]})]})})]})}),b={name:`Hover Card`,args:{triggerText:`Hover me`,width:`md`},argTypes:{triggerText:{control:`text`,description:`Text of the hover trigger link`},width:{control:`select`,options:[`sm`,`md`,`lg`],description:`Width of the hover card`}},render:e=>(0,a.jsx)(y,{...e})},x=e=>{let[t,n]=(0,i.useState)(!1);return(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`button`,{onClick:()=>n(!0),className:`h-10 rounded-md border px-4 text-sm hover:bg-accent`,children:`Open Drawer`}),t&&(0,a.jsxs)(`div`,{className:`fixed inset-0 z-50`,children:[(0,a.jsx)(`div`,{className:`fixed inset-0 bg-black/80`,onClick:()=>n(!1)}),(0,a.jsxs)(`div`,{className:`fixed inset-x-0 bottom-0 z-50 rounded-t-xl border bg-background`,children:[(0,a.jsx)(`div`,{className:`mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted`}),(0,a.jsxs)(`div`,{className:`p-6`,children:[(0,a.jsx)(`h2`,{className:`text-lg font-semibold`,children:e.title}),e.description&&(0,a.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:e.description}),(0,a.jsx)(`button`,{onClick:()=>n(!1),className:`mt-4 h-10 w-full rounded-md border text-sm hover:bg-accent`,children:`Close`})]})]})]})]})},S={name:`Drawer`,args:{title:`Drawer Title`,description:`Mobile-friendly bottom drawer.`},argTypes:{title:{control:`text`,description:`Drawer title`},description:{control:`text`,description:`Drawer description text`}},render:e=>(0,a.jsx)(x,{...e})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C=[`DialogStory`,`SheetStory`,`TooltipStory`,`PopoverStory`,`HoverCardStory`,`DrawerStory`]})))()}w();export{l as DialogStory,S as DrawerStory,b as HoverCardStory,_ as PopoverStory,f as SheetStory,h as TooltipStory,C as __namedExportsOrder,s as default};