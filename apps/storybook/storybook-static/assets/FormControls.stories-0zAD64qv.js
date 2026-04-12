import{R as e}from"./iframe-C6JDg_SY.js";import"./preload-helper-PPVm8Dsz.js";const s=(...n)=>n.filter(Boolean).join(" "),z={title:"Components/Form Controls"},w="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";function T({variant:n="default",size:t="default",children:o="Click me",disabled:r=!1}){const a={default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent",link:"text-primary underline-offset-4 hover:underline"},l={default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"};return e.createElement("button",{disabled:r,className:s(w,a[n]||"",l[t]||"")},o)}const d={name:"Button",render:n=>e.createElement(T,{...n}),args:{variant:"default",size:"default",children:"Click me",disabled:!1},argTypes:{variant:{control:"select",options:["default","destructive","outline","secondary","ghost","link"]},size:{control:"select",options:["default","sm","lg","icon"]},children:{control:"text"},disabled:{control:"boolean"}}},S="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";function k({type:n="text",placeholder:t="Enter text...",disabled:o=!1,error:r=!1}){return e.createElement("div",{className:"max-w-sm space-y-1"},e.createElement("input",{type:n,placeholder:t,disabled:o,className:s(S,r?"border-destructive":"border-input")}),r&&e.createElement("p",{className:"text-sm text-destructive"},"This field has an error."))}const u={name:"Input",render:n=>e.createElement(k,{...n}),args:{type:"text",placeholder:"Enter text...",disabled:!1,error:!1},argTypes:{type:{control:"select",options:["text","email","password","number","search","url","tel"]},placeholder:{control:"text"},disabled:{control:"boolean"},error:{control:"boolean"}}};function N({placeholder:n="Write here...",rows:t=4,disabled:o=!1}){return e.createElement("textarea",{placeholder:n,rows:t,disabled:o,className:s("flex min-h-[60px] w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",o&&"cursor-not-allowed opacity-50")})}const m={name:"Textarea",render:n=>e.createElement(N,{...n}),args:{placeholder:"Write here...",rows:4,disabled:!1},argTypes:{placeholder:{control:"text"},rows:{control:{type:"number",min:2,max:10}},disabled:{control:"boolean"}}};function C({text:n="Email",required:t=!1}){return e.createElement("div",{className:"max-w-sm space-y-2"},e.createElement("label",{className:"text-sm font-medium leading-none"},n,t&&e.createElement("span",{className:"ml-1 text-destructive"},"*")),e.createElement("input",{className:s(S,"border-input"),placeholder:"you@example.com"}))}const p={name:"Label",render:n=>e.createElement(C,{...n}),args:{text:"Email",required:!1},argTypes:{text:{control:"text"},required:{control:"boolean"}}};function B({label:n="Accept terms and conditions",checked:t=!1,disabled:o=!1}){const[r,a]=e.useState(t);return e.useEffect(()=>a(t),[t]),e.createElement("label",{className:s("flex items-center gap-2 text-sm",o&&"cursor-not-allowed opacity-50")},e.createElement("input",{type:"checkbox",checked:r,onChange:()=>!o&&a(!r),disabled:o,className:"h-4 w-4 rounded accent-primary"}),n)}const g={name:"Checkbox",render:n=>e.createElement(B,{...n}),args:{label:"Accept terms and conditions",checked:!1,disabled:!1},argTypes:{label:{control:"text"},checked:{control:"boolean"},disabled:{control:"boolean"}}};function G({value:n="option1",disabled:t=!1}){const[o,r]=e.useState(n);e.useEffect(()=>r(n),[n]);const a=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}];return e.createElement("div",{className:"space-y-2"},a.map(l=>e.createElement("label",{key:l.value,className:s("flex items-center gap-2 text-sm",t&&"cursor-not-allowed opacity-50")},e.createElement("input",{type:"radio",name:"radio-group",checked:o===l.value,onChange:()=>!t&&r(l.value),disabled:t,className:"h-4 w-4 accent-primary"}),l.label)))}const b={name:"Radio Group",render:n=>e.createElement(G,{...n}),args:{value:"option1",disabled:!1},argTypes:{value:{control:"select",options:["option1","option2","option3"]},disabled:{control:"boolean"}}};function I({label:n="Airplane Mode",checked:t=!1,disabled:o=!1}){const[r,a]=e.useState(t);return e.useEffect(()=>a(t),[t]),e.createElement("div",{className:"flex items-center justify-between max-w-xs"},e.createElement("span",{className:s("text-sm",o&&"opacity-50")},n),e.createElement("button",{type:"button",role:"switch","aria-checked":r,disabled:o,onClick:()=>a(!r),className:s("inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors",r?"bg-primary":"bg-input",o?"cursor-not-allowed opacity-50":"cursor-pointer")},e.createElement("span",{className:s("block h-5 w-5 rounded-full bg-background shadow-lg transition-transform",r?"translate-x-5":"translate-x-0")})))}const f={name:"Switch",render:n=>e.createElement(I,{...n}),args:{label:"Airplane Mode",checked:!1,disabled:!1},argTypes:{label:{control:"text"},checked:{control:"boolean"},disabled:{control:"boolean"}}};function R({placeholder:n="Select framework...",disabled:t=!1}){return e.createElement("div",{className:"max-w-[220px]"},e.createElement("select",{disabled:t,className:s("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",t&&"cursor-not-allowed opacity-50")},e.createElement("option",{value:"",disabled:!0},n),e.createElement("option",{value:"react"},"React"),e.createElement("option",{value:"vue"},"Vue"),e.createElement("option",{value:"svelte"},"Svelte"),e.createElement("option",{value:"angular"},"Angular"),e.createElement("option",{value:"solid"},"Solid")))}const x={name:"Select",render:n=>e.createElement(R,{...n}),args:{placeholder:"Select framework...",disabled:!1},argTypes:{placeholder:{control:"text"},disabled:{control:"boolean"}}};function A({value:n=50,disabled:t=!1,showValue:o=!0}){const[r,a]=e.useState(n);return e.useEffect(()=>a(n),[n]),e.createElement("div",{className:"max-w-sm space-y-2"},o&&e.createElement("div",{className:"flex justify-between text-sm"},e.createElement("span",null,"Volume"),e.createElement("span",null,r,"%")),e.createElement("input",{type:"range",min:0,max:100,value:r,disabled:t,onChange:l=>a(Number(l.target.value)),className:s("w-full accent-primary",t&&"opacity-50")}))}const y={name:"Slider",render:n=>e.createElement(A,{...n}),args:{value:50,disabled:!1,showValue:!0},argTypes:{value:{control:{type:"number",min:0,max:100}},disabled:{control:"boolean"},showValue:{control:"boolean"}}};function j({label:n="Bold",pressed:t=!1,variant:o="default",disabled:r=!1}){const[a,l]=e.useState(t);e.useEffect(()=>l(t),[t]);const c="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 transition-colors",i={default:"hover:bg-muted",outline:"border border-input hover:bg-accent"};return e.createElement("button",{"aria-pressed":a,disabled:r,onClick:()=>l(!a),className:s(c,i[o]||i.default,a&&"bg-accent text-accent-foreground",r&&"pointer-events-none opacity-50")},n)}const h={name:"Toggle",render:n=>e.createElement(j,{...n}),args:{label:"Bold",pressed:!1,variant:"default",disabled:!1},argTypes:{label:{control:"text"},pressed:{control:"boolean"},variant:{control:"select",options:["default","outline"]},disabled:{control:"boolean"}}};function V({value:n="center",type:t="single"}){const[o,r]=e.useState(n?[n]:[]);e.useEffect(()=>r(n?[n]:[]),[n]);const a=["left","center","right"],l=c=>{r(t==="single"?[c]:i=>i.includes(c)?i.filter(E=>E!==c):[...i,c])};return e.createElement("div",{className:"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1"},a.map(c=>e.createElement("button",{key:c,onClick:()=>l(c),className:s("inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all",o.includes(c)?"bg-background text-foreground shadow-sm":"text-muted-foreground")},c.charAt(0).toUpperCase()+c.slice(1))))}const v={name:"Toggle Group",render:n=>e.createElement(V,{...n}),args:{value:"center",type:"single"},argTypes:{value:{control:"select",options:["left","center","right"]},type:{control:"select",options:["single","multiple"]}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Button',
  render: args => <Button {...args} />,
  args: {
    variant: 'default',
    size: 'default',
    children: 'Click me',
    disabled: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon']
    },
    children: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    }
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};const q=["ButtonStory","InputStory","TextareaStory","LabelStory","CheckboxStory","RadioGroupStory","SwitchStory","SelectStory","SliderStory","ToggleStory","ToggleGroupStory"];export{d as ButtonStory,g as CheckboxStory,u as InputStory,p as LabelStory,b as RadioGroupStory,x as SelectStory,y as SliderStory,f as SwitchStory,m as TextareaStory,v as ToggleGroupStory,h as ToggleStory,q as __namedExportsOrder,z as default};
