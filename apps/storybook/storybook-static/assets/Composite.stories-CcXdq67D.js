import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{n}from"./iframe-xPHbGT99.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";function i({placeholder:e=`Type command...`,maxItems:t=5}){let[n,r]=(0,h.useState)(``),i=[`Calendar`,`Search`,`Settings`,`Profile`,`Billing`,`Logout`,`Help`,`Notifications`].filter(e=>e.toLowerCase().includes(n.toLowerCase())).slice(0,t);return(0,g.jsxs)(`div`,{className:`w-64 rounded-md border bg-popover shadow-md`,children:[(0,g.jsxs)(`div`,{className:`flex items-center border-b px-3`,children:[(0,g.jsx)(`span`,{className:`mr-2 opacity-50`,children:`🔍`}),(0,g.jsx)(`input`,{value:n,onChange:e=>r(e.target.value),placeholder:e,className:`h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground`})]}),(0,g.jsx)(`div`,{className:`p-1`,children:i.length===0?(0,g.jsx)(`p`,{className:`py-4 text-center text-sm text-muted-foreground`,children:`No results`}):i.map(e=>(0,g.jsx)(`div`,{className:`rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default`,children:e},e))})]})}function a({placeholder:e=`Select...`,disabled:t=!1}){let[n,r]=(0,h.useState)(!1),[i,a]=(0,h.useState)(``),[o,s]=(0,h.useState)(``),c=[`React`,`Vue`,`Angular`,`Svelte`,`Solid`,`Preact`].filter(e=>e.toLowerCase().includes(o.toLowerCase()));return(0,g.jsxs)(`div`,{className:`relative w-[200px]`,children:[(0,g.jsxs)(`button`,{onClick:()=>!t&&r(!n),disabled:t,className:_(`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm`,t&&`opacity-50 cursor-not-allowed`),children:[(0,g.jsx)(`span`,{className:i?``:`text-muted-foreground`,children:i||e}),(0,g.jsx)(`span`,{className:`opacity-50`,children:`▾`})]}),n&&!t&&(0,g.jsxs)(`div`,{className:`absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md`,children:[(0,g.jsx)(`input`,{value:o,onChange:e=>s(e.target.value),placeholder:`Search...`,className:`mb-1 h-8 w-full bg-transparent px-2 text-sm outline-none`,autoFocus:!0}),c.map(e=>(0,g.jsxs)(`div`,{onClick:()=>{a(e),r(!1),s(``)},className:_(`rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default`,i===e&&`bg-accent`),children:[e,` `,i===e&&`✓`]},e))]})]})}function o({placeholder:e=`Pick a date`,format:t=`short`}){let[n,r]=(0,h.useState)(``),i=n?t===`long`?new Date(n).toLocaleDateString(`en-US`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`}):new Date(n).toLocaleDateString(`en-US`,{month:`2-digit`,day:`2-digit`,year:`numeric`}):``;return(0,g.jsxs)(`div`,{className:`max-w-xs space-y-3`,children:[(0,g.jsxs)(`div`,{className:`space-y-1`,children:[(0,g.jsxs)(`p`,{className:`text-xs text-muted-foreground`,children:[`Format: `,t]}),(0,g.jsx)(`input`,{type:`date`,value:n,onChange:e=>r(e.target.value),placeholder:e,className:`flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm`})]}),i&&(0,g.jsxs)(`p`,{className:`text-sm`,children:[`Formatted: `,(0,g.jsx)(`strong`,{children:i})]})]})}function s({showWeekNumbers:e=!1}){let[t,n]=(0,h.useState)(15);return(0,g.jsxs)(`div`,{className:`w-72 rounded-md border p-4`,children:[(0,g.jsxs)(`div`,{className:`flex items-center justify-between mb-3`,children:[(0,g.jsx)(`button`,{className:`h-7 w-7 rounded-md border text-sm hover:bg-accent`,children:`←`}),(0,g.jsx)(`h4`,{className:`text-sm font-medium`,children:`April 2026`}),(0,g.jsx)(`button`,{className:`h-7 w-7 rounded-md border text-sm hover:bg-accent`,children:`→`})]}),(0,g.jsxs)(`div`,{className:_(`grid gap-1 text-center`,e?`grid-cols-8`:`grid-cols-7`),children:[e&&(0,g.jsx)(`div`,{className:`py-1 text-xs text-muted-foreground`,children:`Wk`}),[`Su`,`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`].map(e=>(0,g.jsx)(`div`,{className:`py-1 text-xs text-muted-foreground`,children:e},e)),e&&(0,g.jsx)(`div`,{className:`py-1 text-[10px] text-muted-foreground`,children:`14`}),[...[,,,]].map((e,t)=>(0,g.jsx)(`div`,{},`e${t}`)),Array.from({length:30},(r,i)=>{let a=i+1,o=e&&(i+3)%7==0&&i>0;return(0,g.jsxs)(h.Fragment,{children:[o&&(0,g.jsx)(`div`,{className:`py-1 text-[10px] text-muted-foreground`,children:14+Math.ceil((i+3)/7)}),(0,g.jsx)(`button`,{onClick:()=>n(a),className:_(`rounded-md py-1 text-sm hover:bg-accent`,t===a&&`bg-primary text-primary-foreground`),children:a})]},i)})]})]})}function c({defaultColor:e=`#6366f1`}){let[t,n]=(0,h.useState)(e);return(0,g.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,g.jsx)(`input`,{type:`color`,value:t,onChange:e=>n(e.target.value),className:`h-10 w-10 cursor-pointer rounded-md border p-0.5`}),(0,g.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),className:`h-10 w-28 rounded-md border px-3 text-sm font-mono uppercase`}),(0,g.jsx)(`div`,{className:`h-10 w-10 rounded-md border`,style:{backgroundColor:t}})]})}function l({layout:e=`vertical`}){let t=e===`horizontal`;return(0,g.jsxs)(`form`,{className:`max-w-md space-y-4`,onSubmit:e=>e.preventDefault(),children:[(0,g.jsxs)(`div`,{className:_(t?`flex items-center gap-4`:`space-y-2`),children:[(0,g.jsx)(`label`,{className:_(`text-sm font-medium`,t&&`w-24 shrink-0`),children:`Username`}),(0,g.jsxs)(`div`,{className:`flex-1 space-y-1`,children:[(0,g.jsx)(`input`,{placeholder:`Enter username`,className:`flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm`}),!t&&(0,g.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Public display name.`})]})]}),(0,g.jsxs)(`div`,{className:_(t?`flex items-center gap-4`:`space-y-2`),children:[(0,g.jsx)(`label`,{className:_(`text-sm font-medium`,t&&`w-24 shrink-0`),children:`Email`}),(0,g.jsx)(`input`,{type:`email`,placeholder:`you@example.com`,className:`flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm`})]}),(0,g.jsx)(`div`,{className:_(t&&`pl-28`),children:(0,g.jsx)(`button`,{type:`submit`,className:`h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground`,children:`Submit`})})]})}function u({length:e=6}){let[t,n]=(0,h.useState)(Array(e).fill(``));return(0,g.jsx)(`div`,{className:`flex gap-2`,children:Array.from({length:e},(r,i)=>(0,g.jsx)(`input`,{maxLength:1,value:t[i]||``,onChange:r=>{let a=[...t];a[i]=r.target.value,n(a),r.target.value&&i<e-1&&r.target.nextElementSibling?.focus()},className:`flex h-12 w-12 items-center justify-center rounded-md border text-center text-lg font-semibold focus:ring-2 focus:ring-ring focus:outline-none`},i))})}function d({striped:e=!1,rows:t=3}){let n=[[`INV001`,`Paid`,`Card`,`$250`],[`INV002`,`Pending`,`PayPal`,`$150`],[`INV003`,`Unpaid`,`Bank`,`$350`],[`INV004`,`Paid`,`Card`,`$420`],[`INV005`,`Pending`,`PayPal`,`$180`],[`INV006`,`Paid`,`Bank`,`$560`],[`INV007`,`Unpaid`,`Card`,`$90`],[`INV008`,`Paid`,`PayPal`,`$310`]].slice(0,t);return(0,g.jsx)(`div`,{className:`w-full overflow-auto`,children:(0,g.jsxs)(`table`,{className:`w-full text-sm`,children:[(0,g.jsx)(`thead`,{children:(0,g.jsx)(`tr`,{className:`border-b`,children:[`Invoice`,`Status`,`Method`,`Amount`].map(e=>(0,g.jsx)(`th`,{className:`h-12 px-4 text-left font-medium text-muted-foreground`,children:e},e))})}),(0,g.jsx)(`tbody`,{children:n.map((t,n)=>(0,g.jsxs)(`tr`,{className:_(`border-b hover:bg-muted/50`,e&&n%2==1&&`bg-muted/30`),children:[(0,g.jsx)(`td`,{className:`p-4 font-medium`,children:t[0]}),(0,g.jsx)(`td`,{className:`p-4`,children:(0,g.jsx)(`span`,{className:_(`rounded-full px-2 py-0.5 text-xs font-semibold`,t[1]===`Paid`?`bg-green-100 text-green-700`:t[1]===`Pending`?`bg-yellow-100 text-yellow-700`:`bg-red-100 text-red-700`),children:t[1]})}),(0,g.jsx)(`td`,{className:`p-4`,children:t[2]}),(0,g.jsx)(`td`,{className:`p-4 text-right font-medium`,children:t[3]})]},t[0]))})]})})}function f({autoplay:e=!1,showDots:t=!0}){let n=[`Slide 1`,`Slide 2`,`Slide 3`,`Slide 4`],[r,i]=(0,h.useState)(0);return h.useEffect(()=>{if(!e)return;let t=setInterval(()=>i(e=>(e+1)%n.length),2e3);return()=>clearInterval(t)},[e]),(0,g.jsxs)(`div`,{className:`relative max-w-sm`,children:[(0,g.jsx)(`div`,{className:`overflow-hidden rounded-lg border`,children:(0,g.jsxs)(`div`,{className:`flex h-40 items-center justify-center bg-muted text-lg font-semibold`,children:[n[r],e&&(0,g.jsx)(`span`,{className:`ml-2 text-xs text-muted-foreground`,children:`(auto)`})]})}),(0,g.jsxs)(`div`,{className:`mt-2 flex justify-center gap-2`,children:[(0,g.jsx)(`button`,{onClick:()=>i((r-1+n.length)%n.length),className:`h-8 w-8 rounded-full border text-sm`,children:`←`}),t&&n.map((e,t)=>(0,g.jsx)(`button`,{onClick:()=>i(t),className:_(`h-2 w-2 rounded-full`,t===r?`bg-primary`:`bg-muted-foreground/30`)},t)),(0,g.jsx)(`button`,{onClick:()=>i((r+1)%n.length),className:`h-8 w-8 rounded-full border text-sm`,children:`→`})]})]})}function p({type:e=`bar`,showGrid:t=!0}){let n=[40,65,45,80,55,70,90],r=[`M`,`T`,`W`,`T`,`F`,`S`,`S`];return(0,g.jsxs)(`div`,{className:`rounded-lg border p-6`,children:[(0,g.jsxs)(`h4`,{className:`text-sm font-semibold mb-4`,children:[`Weekly (`,e,`)`]}),(0,g.jsxs)(`div`,{className:`relative`,children:[t&&(0,g.jsx)(`div`,{className:`absolute inset-0 flex flex-col justify-between pointer-events-none`,children:[0,1,2,3].map(e=>(0,g.jsx)(`div`,{className:`border-t border-dashed border-muted-foreground/15`},e))}),e===`bar`?(0,g.jsx)(`div`,{className:`flex items-end gap-2 h-32 relative`,children:n.map((e,t)=>(0,g.jsxs)(`div`,{className:`flex-1 flex flex-col items-center gap-1`,children:[(0,g.jsx)(`div`,{className:`w-full rounded-t-sm bg-primary hover:bg-primary/80`,style:{height:`${e}%`}}),(0,g.jsx)(`span`,{className:`text-[10px] text-muted-foreground`,children:r[t]})]},t))}):(0,g.jsxs)(`div`,{className:`h-32 relative`,children:[(0,g.jsxs)(`svg`,{viewBox:`0 0 600 120`,className:`w-full h-full`,preserveAspectRatio:`none`,children:[(0,g.jsx)(`polyline`,{fill:`none`,stroke:`hsl(var(--primary))`,strokeWidth:`3`,points:n.map((e,t)=>`${t*100},${120-e*1.2}`).join(` `)}),n.map((e,t)=>(0,g.jsx)(`circle`,{cx:t*100,cy:120-e*1.2,r:`4`,fill:`hsl(var(--primary))`},t))]}),(0,g.jsx)(`div`,{className:`flex justify-between mt-1`,children:r.map((e,t)=>(0,g.jsx)(`span`,{className:`text-[10px] text-muted-foreground`,children:e},t))})]})]})]})}function m({variant:e=`default`}){let[t,n]=(0,h.useState)(!1),r={default:{bg:`bg-background`,border:`border`,icon:`i`,text:`Event created.`},success:{bg:`bg-green-50`,border:`border-green-200`,icon:`✓`,text:`Successfully saved!`},error:{bg:`bg-red-50`,border:`border-red-200`,icon:`✗`,text:`Something went wrong.`}}[e];return(0,g.jsxs)(`div`,{className:`space-y-3`,children:[(0,g.jsxs)(`button`,{onClick:()=>{n(!0),setTimeout(()=>n(!1),3e3)},className:`h-9 rounded-md border px-4 text-sm hover:bg-accent`,children:[`Show toast (`,e,`)`]}),t&&(0,g.jsxs)(`div`,{className:_(`max-w-sm rounded-lg p-4 shadow-lg flex items-center gap-3`,r.bg,r.border),children:[(0,g.jsx)(`span`,{className:`text-sm font-medium`,children:r.icon}),(0,g.jsx)(`p`,{className:`text-sm flex-1`,children:r.text}),(0,g.jsx)(`button`,{onClick:()=>n(!1),className:`text-xs text-muted-foreground hover:text-foreground`,children:`×`})]})]})}var h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=t((()=>{h=e(n(),1),g=r(),_=(...e)=>e.filter(Boolean).join(` `),v={name:`Command`,render:e=>(0,g.jsx)(i,{...e}),args:{placeholder:`Type command...`,maxItems:5},argTypes:{placeholder:{control:`text`},maxItems:{control:{type:`number`,min:1,max:10}}}},y={name:`Combobox`,render:e=>(0,g.jsx)(a,{...e}),args:{placeholder:`Select...`,disabled:!1},argTypes:{placeholder:{control:`text`},disabled:{control:`boolean`}}},b={name:`Date Picker`,render:e=>(0,g.jsx)(o,{...e}),args:{placeholder:`Pick a date`,format:`short`},argTypes:{placeholder:{control:`text`},format:{control:`select`,options:[`short`,`long`]}}},x={name:`Calendar`,render:e=>(0,g.jsx)(s,{...e}),args:{showWeekNumbers:!1},argTypes:{showWeekNumbers:{control:`boolean`}}},S={name:`Color Picker`,render:e=>(0,g.jsx)(c,{...e}),args:{defaultColor:`#6366f1`},argTypes:{defaultColor:{control:`color`}}},C={name:`Form`,render:e=>(0,g.jsx)(l,{...e}),args:{layout:`vertical`},argTypes:{layout:{control:`select`,options:[`vertical`,`horizontal`]}}},w={name:`Input OTP`,render:e=>(0,g.jsx)(u,{...e}),args:{length:6},argTypes:{length:{control:`select`,options:[4,6,8]}}},T={name:`Table`,render:e=>(0,g.jsx)(d,{...e}),args:{striped:!1,rows:3},argTypes:{striped:{control:`boolean`},rows:{control:{type:`number`,min:1,max:8}}}},E={name:`Carousel`,render:e=>(0,g.jsx)(f,{...e}),args:{autoplay:!1,showDots:!0},argTypes:{autoplay:{control:`boolean`},showDots:{control:`boolean`}}},D={name:`Chart`,render:e=>(0,g.jsx)(p,{...e}),args:{type:`bar`,showGrid:!0},argTypes:{type:{control:`select`,options:[`bar`,`line`]},showGrid:{control:`boolean`}}},O={name:`Sonner`,render:e=>(0,g.jsx)(m,{...e}),args:{variant:`default`},argTypes:{variant:{control:`select`,options:[`default`,`success`,`error`]}}},k={title:`Components/Composite`},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},A=[`CommandStory`,`ComboboxStory`,`DatePickerStory`,`CalendarStory`,`ColorPickerStory`,`FormStory`,`InputOTPStory`,`TableStory`,`CarouselStory`,`ChartStory`,`SonnerStory`]})))()}j();export{x as CalendarStory,E as CarouselStory,D as ChartStory,S as ColorPickerStory,y as ComboboxStory,v as CommandStory,b as DatePickerStory,C as FormStory,w as InputOTPStory,O as SonnerStory,T as TableStory,A as __namedExportsOrder,k as default};