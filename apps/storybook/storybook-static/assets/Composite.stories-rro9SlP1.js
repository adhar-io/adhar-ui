import{R as e,r as m}from"./iframe-C6JDg_SY.js";import"./preload-helper-PPVm8Dsz.js";const c=(...t)=>t.filter(Boolean).join(" ");function w({placeholder:t="Type command...",maxItems:o=5}){const[a,n]=m.useState(""),s=["Calendar","Search","Settings","Profile","Billing","Logout","Help","Notifications"].filter(l=>l.toLowerCase().includes(a.toLowerCase())).slice(0,o);return e.createElement("div",{className:"w-64 rounded-md border bg-popover shadow-md"},e.createElement("div",{className:"flex items-center border-b px-3"},e.createElement("span",{className:"mr-2 opacity-50"},"🔍"),e.createElement("input",{value:a,onChange:l=>n(l.target.value),placeholder:t,className:"h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"})),e.createElement("div",{className:"p-1"},s.length===0?e.createElement("p",{className:"py-4 text-center text-sm text-muted-foreground"},"No results"):s.map(l=>e.createElement("div",{key:l,className:"rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default"},l))))}const u={name:"Command",render:t=>e.createElement(w,{...t}),args:{placeholder:"Type command...",maxItems:5},argTypes:{placeholder:{control:"text"},maxItems:{control:{type:"number",min:1,max:10}}}};function C({placeholder:t="Select...",disabled:o=!1}){const[a,n]=m.useState(!1),[r,s]=m.useState(""),[l,N]=m.useState(""),S=["React","Vue","Angular","Svelte","Solid","Preact"].filter(d=>d.toLowerCase().includes(l.toLowerCase()));return e.createElement("div",{className:"relative w-[200px]"},e.createElement("button",{onClick:()=>!o&&n(!a),disabled:o,className:c("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm",o&&"opacity-50 cursor-not-allowed")},e.createElement("span",{className:r?"":"text-muted-foreground"},r||t),e.createElement("span",{className:"opacity-50"},"▾")),a&&!o&&e.createElement("div",{className:"absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md"},e.createElement("input",{value:l,onChange:d=>N(d.target.value),placeholder:"Search...",className:"mb-1 h-8 w-full bg-transparent px-2 text-sm outline-none",autoFocus:!0}),S.map(d=>e.createElement("div",{key:d,onClick:()=>{s(d),n(!1),N("")},className:c("rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default",r===d&&"bg-accent")},d," ",r===d&&"✓"))))}const i={name:"Combobox",render:t=>e.createElement(C,{...t}),args:{placeholder:"Select...",disabled:!1},argTypes:{placeholder:{control:"text"},disabled:{control:"boolean"}}};function k({placeholder:t="Pick a date",format:o="short"}){const[a,n]=m.useState(""),r=a?o==="long"?new Date(a).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):new Date(a).toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric"}):"";return e.createElement("div",{className:"max-w-xs space-y-3"},e.createElement("div",{className:"space-y-1"},e.createElement("p",{className:"text-xs text-muted-foreground"},"Format: ",o),e.createElement("input",{type:"date",value:a,onChange:s=>n(s.target.value),placeholder:t,className:"flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"})),r&&e.createElement("p",{className:"text-sm"},"Formatted: ",e.createElement("strong",null,r)))}const p={name:"Date Picker",render:t=>e.createElement(k,{...t}),args:{placeholder:"Pick a date",format:"short"},argTypes:{placeholder:{control:"text"},format:{control:"select",options:["short","long"]}}};function T({showWeekNumbers:t=!1}){const[o,a]=m.useState(15);return e.createElement("div",{className:"w-72 rounded-md border p-4"},e.createElement("div",{className:"flex items-center justify-between mb-3"},e.createElement("button",{className:"h-7 w-7 rounded-md border text-sm hover:bg-accent"},"←"),e.createElement("h4",{className:"text-sm font-medium"},"April 2026"),e.createElement("button",{className:"h-7 w-7 rounded-md border text-sm hover:bg-accent"},"→")),e.createElement("div",{className:c("grid gap-1 text-center",t?"grid-cols-8":"grid-cols-7")},t&&e.createElement("div",{className:"py-1 text-xs text-muted-foreground"},"Wk"),["Su","Mo","Tu","We","Th","Fr","Sa"].map(n=>e.createElement("div",{key:n,className:"py-1 text-xs text-muted-foreground"},n)),t&&e.createElement("div",{className:"py-1 text-[10px] text-muted-foreground"},"14"),[...Array(3)].map((n,r)=>e.createElement("div",{key:`e${r}`})),Array.from({length:30},(n,r)=>{const s=r+1,l=t&&(r+3)%7===0&&r>0;return e.createElement(e.Fragment,{key:r},l&&e.createElement("div",{className:"py-1 text-[10px] text-muted-foreground"},14+Math.ceil((r+3)/7)),e.createElement("button",{onClick:()=>a(s),className:c("rounded-md py-1 text-sm hover:bg-accent",o===s&&"bg-primary text-primary-foreground")},s))})))}const g={name:"Calendar",render:t=>e.createElement(T,{...t}),args:{showWeekNumbers:!1},argTypes:{showWeekNumbers:{control:"boolean"}}};function P({defaultColor:t="#6366f1"}){const[o,a]=m.useState(t);return e.createElement("div",{className:"flex items-center gap-3"},e.createElement("input",{type:"color",value:o,onChange:n=>a(n.target.value),className:"h-10 w-10 cursor-pointer rounded-md border p-0.5"}),e.createElement("input",{value:o,onChange:n=>a(n.target.value),className:"h-10 w-28 rounded-md border px-3 text-sm font-mono uppercase"}),e.createElement("div",{className:"h-10 w-10 rounded-md border",style:{backgroundColor:o}}))}const b={name:"Color Picker",render:t=>e.createElement(P,{...t}),args:{defaultColor:"#6366f1"},argTypes:{defaultColor:{control:"color"}}};function I({layout:t="vertical"}){const o=t==="horizontal";return e.createElement("form",{className:"max-w-md space-y-4",onSubmit:a=>a.preventDefault()},e.createElement("div",{className:c(o?"flex items-center gap-4":"space-y-2")},e.createElement("label",{className:c("text-sm font-medium",o&&"w-24 shrink-0")},"Username"),e.createElement("div",{className:"flex-1 space-y-1"},e.createElement("input",{placeholder:"Enter username",className:"flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"}),!o&&e.createElement("p",{className:"text-sm text-muted-foreground"},"Public display name."))),e.createElement("div",{className:c(o?"flex items-center gap-4":"space-y-2")},e.createElement("label",{className:c("text-sm font-medium",o&&"w-24 shrink-0")},"Email"),e.createElement("input",{type:"email",placeholder:"you@example.com",className:"flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"})),e.createElement("div",{className:c(o&&"pl-28")},e.createElement("button",{type:"submit",className:"h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground"},"Submit")))}const f={name:"Form",render:t=>e.createElement(I,{...t}),args:{layout:"vertical"},argTypes:{layout:{control:"select",options:["vertical","horizontal"]}}};function D({length:t=6}){const[o,a]=m.useState(Array(t).fill(""));return e.createElement("div",{className:"flex gap-2"},Array.from({length:t},(n,r)=>e.createElement("input",{key:r,maxLength:1,value:o[r]||"",onChange:s=>{const l=[...o];l[r]=s.target.value,a(l),s.target.value&&r<t-1&&s.target.nextElementSibling?.focus()},className:"flex h-12 w-12 items-center justify-center rounded-md border text-center text-lg font-semibold focus:ring-2 focus:ring-ring focus:outline-none"})))}const x={name:"Input OTP",render:t=>e.createElement(D,{...t}),args:{length:6},argTypes:{length:{control:"select",options:[4,6,8]}}};function F({striped:t=!1,rows:o=3}){const a=[["INV001","Paid","Card","$250"],["INV002","Pending","PayPal","$150"],["INV003","Unpaid","Bank","$350"],["INV004","Paid","Card","$420"],["INV005","Pending","PayPal","$180"],["INV006","Paid","Bank","$560"],["INV007","Unpaid","Card","$90"],["INV008","Paid","PayPal","$310"]].slice(0,o);return e.createElement("div",{className:"w-full overflow-auto"},e.createElement("table",{className:"w-full text-sm"},e.createElement("thead",null,e.createElement("tr",{className:"border-b"},["Invoice","Status","Method","Amount"].map(n=>e.createElement("th",{key:n,className:"h-12 px-4 text-left font-medium text-muted-foreground"},n)))),e.createElement("tbody",null,a.map((n,r)=>e.createElement("tr",{key:n[0],className:c("border-b hover:bg-muted/50",t&&r%2===1&&"bg-muted/30")},e.createElement("td",{className:"p-4 font-medium"},n[0]),e.createElement("td",{className:"p-4"},e.createElement("span",{className:c("rounded-full px-2 py-0.5 text-xs font-semibold",n[1]==="Paid"?"bg-green-100 text-green-700":n[1]==="Pending"?"bg-yellow-100 text-yellow-700":"bg-red-100 text-red-700")},n[1])),e.createElement("td",{className:"p-4"},n[2]),e.createElement("td",{className:"p-4 text-right font-medium"},n[3]))))))}const y={name:"Table",render:t=>e.createElement(F,{...t}),args:{striped:!1,rows:3},argTypes:{striped:{control:"boolean"},rows:{control:{type:"number",min:1,max:8}}}};function $({autoplay:t=!1,showDots:o=!0}){const a=["Slide 1","Slide 2","Slide 3","Slide 4"],[n,r]=m.useState(0);return e.useEffect(()=>{if(!t)return;const s=setInterval(()=>r(l=>(l+1)%a.length),2e3);return()=>clearInterval(s)},[t]),e.createElement("div",{className:"relative max-w-sm"},e.createElement("div",{className:"overflow-hidden rounded-lg border"},e.createElement("div",{className:"flex h-40 items-center justify-center bg-muted text-lg font-semibold"},a[n],t&&e.createElement("span",{className:"ml-2 text-xs text-muted-foreground"},"(auto)"))),e.createElement("div",{className:"mt-2 flex justify-center gap-2"},e.createElement("button",{onClick:()=>r((n-1+a.length)%a.length),className:"h-8 w-8 rounded-full border text-sm"},"←"),o&&a.map((s,l)=>e.createElement("button",{key:l,onClick:()=>r(l),className:c("h-2 w-2 rounded-full",l===n?"bg-primary":"bg-muted-foreground/30")})),e.createElement("button",{onClick:()=>r((n+1)%a.length),className:"h-8 w-8 rounded-full border text-sm"},"→")))}const h={name:"Carousel",render:t=>e.createElement($,{...t}),args:{autoplay:!1,showDots:!0},argTypes:{autoplay:{control:"boolean"},showDots:{control:"boolean"}}};function V({type:t="bar",showGrid:o=!0}){const a=[40,65,45,80,55,70,90],n=["M","T","W","T","F","S","S"];return e.createElement("div",{className:"rounded-lg border p-6"},e.createElement("h4",{className:"text-sm font-semibold mb-4"},"Weekly (",t,")"),e.createElement("div",{className:"relative"},o&&e.createElement("div",{className:"absolute inset-0 flex flex-col justify-between pointer-events-none"},[0,1,2,3].map(r=>e.createElement("div",{key:r,className:"border-t border-dashed border-muted-foreground/15"}))),t==="bar"?e.createElement("div",{className:"flex items-end gap-2 h-32 relative"},a.map((r,s)=>e.createElement("div",{key:s,className:"flex-1 flex flex-col items-center gap-1"},e.createElement("div",{className:"w-full rounded-t-sm bg-primary hover:bg-primary/80",style:{height:`${r}%`}}),e.createElement("span",{className:"text-[10px] text-muted-foreground"},n[s])))):e.createElement("div",{className:"h-32 relative"},e.createElement("svg",{viewBox:"0 0 600 120",className:"w-full h-full",preserveAspectRatio:"none"},e.createElement("polyline",{fill:"none",stroke:"hsl(var(--primary))",strokeWidth:"3",points:a.map((r,s)=>`${s*100},${120-r*1.2}`).join(" ")}),a.map((r,s)=>e.createElement("circle",{key:s,cx:s*100,cy:120-r*1.2,r:"4",fill:"hsl(var(--primary))"}))),e.createElement("div",{className:"flex justify-between mt-1"},n.map((r,s)=>e.createElement("span",{key:s,className:"text-[10px] text-muted-foreground"},r))))))}const E={name:"Chart",render:t=>e.createElement(V,{...t}),args:{type:"bar",showGrid:!0},argTypes:{type:{control:"select",options:["bar","line"]},showGrid:{control:"boolean"}}};function A({variant:t="default"}){const[o,a]=m.useState(!1),r={default:{bg:"bg-background",border:"border",icon:"i",text:"Event created."},success:{bg:"bg-green-50",border:"border-green-200",icon:"✓",text:"Successfully saved!"},error:{bg:"bg-red-50",border:"border-red-200",icon:"✗",text:"Something went wrong."}}[t];return e.createElement("div",{className:"space-y-3"},e.createElement("button",{onClick:()=>{a(!0),setTimeout(()=>a(!1),3e3)},className:"h-9 rounded-md border px-4 text-sm hover:bg-accent"},"Show toast (",t,")"),o&&e.createElement("div",{className:c("max-w-sm rounded-lg p-4 shadow-lg flex items-center gap-3",r.bg,r.border)},e.createElement("span",{className:"text-sm font-medium"},r.icon),e.createElement("p",{className:"text-sm flex-1"},r.text),e.createElement("button",{onClick:()=>a(!1),className:"text-xs text-muted-foreground hover:text-foreground"},"×")))}const v={name:"Sonner",render:t=>e.createElement(A,{...t}),args:{variant:"default"},argTypes:{variant:{control:"select",options:["default","success","error"]}}},W={title:"Components/Composite"};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Command',
  render: args => <Command {...args} />,
  args: {
    placeholder: 'Type command...',
    maxItems: 5
  },
  argTypes: {
    placeholder: {
      control: 'text'
    },
    maxItems: {
      control: {
        type: 'number',
        min: 1,
        max: 10
      }
    }
  }
}`,...u.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Combobox',
  render: args => <Combobox {...args} />,
  args: {
    placeholder: 'Select...',
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
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Date Picker',
  render: args => <DatePicker {...args} />,
  args: {
    placeholder: 'Pick a date',
    format: 'short'
  },
  argTypes: {
    placeholder: {
      control: 'text'
    },
    format: {
      control: 'select',
      options: ['short', 'long']
    }
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Calendar',
  render: args => <Calendar {...args} />,
  args: {
    showWeekNumbers: false
  },
  argTypes: {
    showWeekNumbers: {
      control: 'boolean'
    }
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Color Picker',
  render: args => <ColorPicker {...args} />,
  args: {
    defaultColor: '#6366f1'
  },
  argTypes: {
    defaultColor: {
      control: 'color'
    }
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Form',
  render: args => <Form {...args} />,
  args: {
    layout: 'vertical'
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal']
    }
  }
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Input OTP',
  render: args => <InputOTP {...args} />,
  args: {
    length: 6
  },
  argTypes: {
    length: {
      control: 'select',
      options: [4, 6, 8]
    }
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Table',
  render: args => <Table {...args} />,
  args: {
    striped: false,
    rows: 3
  },
  argTypes: {
    striped: {
      control: 'boolean'
    },
    rows: {
      control: {
        type: 'number',
        min: 1,
        max: 8
      }
    }
  }
}`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Carousel',
  render: args => <Carousel {...args} />,
  args: {
    autoplay: false,
    showDots: true
  },
  argTypes: {
    autoplay: {
      control: 'boolean'
    },
    showDots: {
      control: 'boolean'
    }
  }
}`,...h.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Chart',
  render: args => <Chart {...args} />,
  args: {
    type: 'bar',
    showGrid: true
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'line']
    },
    showGrid: {
      control: 'boolean'
    }
  }
}`,...E.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Sonner',
  render: args => <Sonner {...args} />,
  args: {
    variant: 'default'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error']
    }
  }
}`,...v.parameters?.docs?.source}}};const _=["CommandStory","ComboboxStory","DatePickerStory","CalendarStory","ColorPickerStory","FormStory","InputOTPStory","TableStory","CarouselStory","ChartStory","SonnerStory"];export{g as CalendarStory,h as CarouselStory,E as ChartStory,b as ColorPickerStory,i as ComboboxStory,u as CommandStory,p as DatePickerStory,f as FormStory,x as InputOTPStory,v as SonnerStory,y as TableStory,_ as __namedExportsOrder,W as default};
