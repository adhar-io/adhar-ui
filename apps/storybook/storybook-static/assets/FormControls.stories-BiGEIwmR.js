import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{n}from"./iframe-xPHbGT99.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";function i({variant:e=`default`,size:t=`default`,children:n=`Click me`,disabled:r=!1,loading:i=!1,fullWidth:a=!1}){return(0,g.jsxs)(`button`,{disabled:r||i,"aria-busy":i||void 0,className:_(y,{default:`bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80`,destructive:`bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90`,outline:`border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground`,secondary:`bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80`,ghost:`hover:bg-accent hover:text-accent-foreground`,link:`text-primary underline-offset-4 hover:underline`}[e]||``,{xs:`h-7 rounded px-2 text-xs gap-1`,sm:`h-9 rounded-md px-3 text-xs`,default:`h-10 px-4 py-2`,lg:`h-11 rounded-md px-8 text-base`,xl:`h-12 rounded-lg px-10 text-base`,icon:`h-10 w-10 p-0`,"icon-sm":`h-9 w-9 p-0`,"icon-lg":`h-11 w-11 p-0`}[t]||``,a&&`w-full`),children:[i&&(0,g.jsx)(`span`,{className:`inline-block size-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none`}),n]})}function a({type:e=`text`,placeholder:t=`Enter text...`,disabled:n=!1,error:r=!1}){return(0,g.jsxs)(`div`,{className:`max-w-sm space-y-1`,children:[(0,g.jsx)(`input`,{type:e,placeholder:t,disabled:n,className:_(x,r?`border-destructive`:`border-input`)}),r&&(0,g.jsx)(`p`,{className:`text-sm text-destructive`,children:`This field has an error.`})]})}function o({placeholder:e=`Write here...`,rows:t=4,disabled:n=!1}){return(0,g.jsx)(`textarea`,{placeholder:e,rows:t,disabled:n,className:_(`flex min-h-[60px] w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`,n&&`cursor-not-allowed opacity-50`)})}function s({text:e=`Email`,required:t=!1}){return(0,g.jsxs)(`div`,{className:`max-w-sm space-y-2`,children:[(0,g.jsxs)(`label`,{className:`text-sm font-medium leading-none`,children:[e,t&&(0,g.jsx)(`span`,{className:`ml-1 text-destructive`,children:`*`})]}),(0,g.jsx)(`input`,{className:_(x,`border-input`),placeholder:`you@example.com`})]})}function c({label:e=`Accept terms and conditions`,checked:t=!1,disabled:n=!1}){let[r,i]=h.useState(t);return h.useEffect(()=>i(t),[t]),(0,g.jsxs)(`label`,{className:_(`flex items-center gap-2 text-sm`,n&&`cursor-not-allowed opacity-50`),children:[(0,g.jsx)(`input`,{type:`checkbox`,checked:r,onChange:()=>!n&&i(!r),disabled:n,className:`h-4 w-4 rounded accent-primary`}),e]})}function l({value:e=`option1`,disabled:t=!1}){let[n,r]=h.useState(e);return h.useEffect(()=>r(e),[e]),(0,g.jsx)(`div`,{className:`space-y-2`,children:[{value:`option1`,label:`Option 1`},{value:`option2`,label:`Option 2`},{value:`option3`,label:`Option 3`}].map(e=>(0,g.jsxs)(`label`,{className:_(`flex items-center gap-2 text-sm`,t&&`cursor-not-allowed opacity-50`),children:[(0,g.jsx)(`input`,{type:`radio`,name:`radio-group`,checked:n===e.value,onChange:()=>!t&&r(e.value),disabled:t,className:`h-4 w-4 accent-primary`}),e.label]},e.value))})}function u({label:e=`Airplane Mode`,checked:t=!1,disabled:n=!1}){let[r,i]=h.useState(t);return h.useEffect(()=>i(t),[t]),(0,g.jsxs)(`div`,{className:`flex items-center justify-between max-w-xs`,children:[(0,g.jsx)(`span`,{className:_(`text-sm`,n&&`opacity-50`),children:e}),(0,g.jsx)(`button`,{type:`button`,role:`switch`,"aria-checked":r,disabled:n,onClick:()=>i(!r),className:_(`inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors`,r?`bg-primary`:`bg-input`,n?`cursor-not-allowed opacity-50`:`cursor-pointer`),children:(0,g.jsx)(`span`,{className:_(`block h-5 w-5 rounded-full bg-background shadow-lg transition-transform`,r?`translate-x-5`:`translate-x-0`)})})]})}function d({placeholder:e=`Select framework...`,disabled:t=!1}){return(0,g.jsx)(`div`,{className:`max-w-[220px]`,children:(0,g.jsxs)(`select`,{disabled:t,className:_(`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`,t&&`cursor-not-allowed opacity-50`),children:[(0,g.jsx)(`option`,{value:``,disabled:!0,children:e}),(0,g.jsx)(`option`,{value:`react`,children:`React`}),(0,g.jsx)(`option`,{value:`vue`,children:`Vue`}),(0,g.jsx)(`option`,{value:`svelte`,children:`Svelte`}),(0,g.jsx)(`option`,{value:`angular`,children:`Angular`}),(0,g.jsx)(`option`,{value:`solid`,children:`Solid`})]})})}function f({value:e=50,disabled:t=!1,showValue:n=!0}){let[r,i]=h.useState(e);return h.useEffect(()=>i(e),[e]),(0,g.jsxs)(`div`,{className:`max-w-sm space-y-2`,children:[n&&(0,g.jsxs)(`div`,{className:`flex justify-between text-sm`,children:[(0,g.jsx)(`span`,{children:`Volume`}),(0,g.jsxs)(`span`,{children:[r,`%`]})]}),(0,g.jsx)(`input`,{type:`range`,min:0,max:100,value:r,disabled:t,onChange:e=>i(Number(e.target.value)),className:_(`w-full accent-primary`,t&&`opacity-50`)})]})}function p({label:e=`Bold`,pressed:t=!1,variant:n=`default`,disabled:r=!1}){let[i,a]=h.useState(t);h.useEffect(()=>a(t),[t]);let o={default:`hover:bg-muted`,outline:`border border-input hover:bg-accent`};return(0,g.jsx)(`button`,{"aria-pressed":i,disabled:r,onClick:()=>a(!i),className:_(`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 transition-colors`,o[n]||o.default,i&&`bg-accent text-accent-foreground`,r&&`pointer-events-none opacity-50`),children:e})}function m({value:e=`center`,type:t=`single`}){let[n,r]=h.useState(e?[e]:[]);h.useEffect(()=>r(e?[e]:[]),[e]);let i=[`left`,`center`,`right`],a=e=>{r(t===`single`?[e]:t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])};return(0,g.jsx)(`div`,{className:`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1`,children:i.map(e=>(0,g.jsx)(`button`,{onClick:()=>a(e),className:_(`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all`,n.includes(e)?`bg-background text-foreground shadow-sm`:`text-muted-foreground`),children:e.charAt(0).toUpperCase()+e.slice(1)},e))})}var h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=t((()=>{h=e(n(),1),g=r(),_=(...e)=>e.filter(Boolean).join(` `),v={title:`Components/Form Controls`},y=`inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`,b={name:`Button`,render:e=>(0,g.jsx)(i,{...e}),args:{variant:`default`,size:`default`,children:`Click me`,disabled:!1,loading:!1,fullWidth:!1},argTypes:{variant:{control:`select`,options:[`default`,`destructive`,`outline`,`secondary`,`ghost`,`link`]},size:{control:`select`,options:[`xs`,`sm`,`default`,`lg`,`xl`,`icon`,`icon-sm`,`icon-lg`]},children:{control:`text`},disabled:{control:`boolean`},loading:{control:`boolean`},fullWidth:{control:`boolean`}}},x=`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,S={name:`Input`,render:e=>(0,g.jsx)(a,{...e}),args:{type:`text`,placeholder:`Enter text...`,disabled:!1,error:!1},argTypes:{type:{control:`select`,options:[`text`,`email`,`password`,`number`,`search`,`url`,`tel`]},placeholder:{control:`text`},disabled:{control:`boolean`},error:{control:`boolean`}}},C={name:`Textarea`,render:e=>(0,g.jsx)(o,{...e}),args:{placeholder:`Write here...`,rows:4,disabled:!1},argTypes:{placeholder:{control:`text`},rows:{control:{type:`number`,min:2,max:10}},disabled:{control:`boolean`}}},w={name:`Label`,render:e=>(0,g.jsx)(s,{...e}),args:{text:`Email`,required:!1},argTypes:{text:{control:`text`},required:{control:`boolean`}}},T={name:`Checkbox`,render:e=>(0,g.jsx)(c,{...e}),args:{label:`Accept terms and conditions`,checked:!1,disabled:!1},argTypes:{label:{control:`text`},checked:{control:`boolean`},disabled:{control:`boolean`}}},E={name:`Radio Group`,render:e=>(0,g.jsx)(l,{...e}),args:{value:`option1`,disabled:!1},argTypes:{value:{control:`select`,options:[`option1`,`option2`,`option3`]},disabled:{control:`boolean`}}},D={name:`Switch`,render:e=>(0,g.jsx)(u,{...e}),args:{label:`Airplane Mode`,checked:!1,disabled:!1},argTypes:{label:{control:`text`},checked:{control:`boolean`},disabled:{control:`boolean`}}},O={name:`Select`,render:e=>(0,g.jsx)(d,{...e}),args:{placeholder:`Select framework...`,disabled:!1},argTypes:{placeholder:{control:`text`},disabled:{control:`boolean`}}},k={name:`Slider`,render:e=>(0,g.jsx)(f,{...e}),args:{value:50,disabled:!1,showValue:!0},argTypes:{value:{control:{type:`number`,min:0,max:100}},disabled:{control:`boolean`},showValue:{control:`boolean`}}},A={name:`Toggle`,render:e=>(0,g.jsx)(p,{...e}),args:{label:`Bold`,pressed:!1,variant:`default`,disabled:!1},argTypes:{label:{control:`text`},pressed:{control:`boolean`},variant:{control:`select`,options:[`default`,`outline`]},disabled:{control:`boolean`}}},j={name:`Toggle Group`,render:e=>(0,g.jsx)(m,{...e}),args:{value:`center`,type:`single`},argTypes:{value:{control:`select`,options:[`left`,`center`,`right`]},type:{control:`select`,options:[`single`,`multiple`]}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Button',
  render: args => <Button {...args} />,
  args: {
    variant: 'default',
    size: 'default',
    children: 'Click me',
    disabled: false,
    loading: false,
    fullWidth: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg']
    },
    children: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    },
    fullWidth: {
      control: 'boolean'
    }
  }
}`,...b.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Input',
  render: args => <Input {...args} />,
  args: {
    type: 'text',
    placeholder: 'Enter text...',
    disabled: false,
    error: false
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'url', 'tel']
    },
    placeholder: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    error: {
      control: 'boolean'
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Textarea',
  render: args => <Textarea {...args} />,
  args: {
    placeholder: 'Write here...',
    rows: 4,
    disabled: false
  },
  argTypes: {
    placeholder: {
      control: 'text'
    },
    rows: {
      control: {
        type: 'number',
        min: 2,
        max: 10
      }
    },
    disabled: {
      control: 'boolean'
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Label',
  render: args => <Label {...args} />,
  args: {
    text: 'Email',
    required: false
  },
  argTypes: {
    text: {
      control: 'text'
    },
    required: {
      control: 'boolean'
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Checkbox',
  render: args => <Checkbox {...args} />,
  args: {
    label: 'Accept terms and conditions',
    checked: false,
    disabled: false
  },
  argTypes: {
    label: {
      control: 'text'
    },
    checked: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Radio Group',
  render: args => <RadioGroup {...args} />,
  args: {
    value: 'option1',
    disabled: false
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['option1', 'option2', 'option3']
    },
    disabled: {
      control: 'boolean'
    }
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Switch',
  render: args => <Switch {...args} />,
  args: {
    label: 'Airplane Mode',
    checked: false,
    disabled: false
  },
  argTypes: {
    label: {
      control: 'text'
    },
    checked: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Select',
  render: args => <Select {...args} />,
  args: {
    placeholder: 'Select framework...',
    disabled: false
  },
  argTypes: {
    placeholder: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    }
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Slider',
  render: args => <Slider {...args} />,
  args: {
    value: 50,
    disabled: false,
    showValue: true
  },
  argTypes: {
    value: {
      control: {
        type: 'number',
        min: 0,
        max: 100
      }
    },
    disabled: {
      control: 'boolean'
    },
    showValue: {
      control: 'boolean'
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Toggle',
  render: args => <Toggle {...args} />,
  args: {
    label: 'Bold',
    pressed: false,
    variant: 'default',
    disabled: false
  },
  argTypes: {
    label: {
      control: 'text'
    },
    pressed: {
      control: 'boolean'
    },
    variant: {
      control: 'select',
      options: ['default', 'outline']
    },
    disabled: {
      control: 'boolean'
    }
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Toggle Group',
  render: args => <ToggleGroup {...args} />,
  args: {
    value: 'center',
    type: 'single'
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['left', 'center', 'right']
    },
    type: {
      control: 'select',
      options: ['single', 'multiple']
    }
  }
}`,...j.parameters?.docs?.source}}},M=[`ButtonStory`,`InputStory`,`TextareaStory`,`LabelStory`,`CheckboxStory`,`RadioGroupStory`,`SwitchStory`,`SelectStory`,`SliderStory`,`ToggleStory`,`ToggleGroupStory`]})))()}N();export{b as ButtonStory,T as CheckboxStory,S as InputStory,w as LabelStory,E as RadioGroupStory,O as SelectStory,k as SliderStory,D as SwitchStory,C as TextareaStory,j as ToggleGroupStory,A as ToggleStory,M as __namedExportsOrder,v as default};