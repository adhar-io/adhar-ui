import{R as e}from"./iframe-C6JDg_SY.js";import"./preload-helper-PPVm8Dsz.js";const n=(...t)=>t.filter(Boolean).join(" "),B={title:"Components/Display"},p={default:"border-transparent bg-primary text-primary-foreground",secondary:"border-transparent bg-secondary text-secondary-foreground",destructive:"border-transparent bg-destructive text-destructive-foreground",outline:"text-foreground"};function v({variant:t="default",children:r="Badge"}){return e.createElement("span",{className:n("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",p[t]??p.default)},r)}const s={name:"Badge",render:t=>e.createElement(v,{...t}),args:{variant:"default",children:"Badge"},argTypes:{variant:{control:"select",options:["default","secondary","destructive","outline"]},children:{control:"text"}}},g={xs:"h-6 w-6 text-[10px]",sm:"h-8 w-8 text-xs",md:"h-10 w-10 text-sm",lg:"h-12 w-12 text-base",xl:"h-16 w-16 text-lg"};function b({size:t="md",fallback:r="AB",src:a}){return e.createElement("span",{className:n("relative flex shrink-0 overflow-hidden rounded-full",g[t]??g.md)},a?e.createElement("img",{src:a,alt:r,className:"h-full w-full rounded-full object-cover"}):e.createElement("span",{className:"flex h-full w-full items-center justify-center rounded-full bg-muted font-medium"},r))}const o={name:"Avatar",render:t=>e.createElement(b,{...t}),args:{size:"md",fallback:"AB",src:""},argTypes:{size:{control:"select",options:["xs","sm","md","lg","xl"]},fallback:{control:"text"},src:{control:"text"}}};function y({orientation:t="horizontal",label:r}){return t==="vertical"?e.createElement("div",{className:"flex h-8 items-center space-x-4 text-sm"},e.createElement("span",null,"Left"),e.createElement("div",{className:"h-full w-[1px] bg-border"}),e.createElement("span",null,"Right")):r?e.createElement("div",{className:"relative"},e.createElement("div",{className:"absolute inset-0 flex items-center"},e.createElement("div",{className:"w-full border-t"})),e.createElement("div",{className:"relative flex justify-center text-xs uppercase"},e.createElement("span",{className:"bg-background px-2 text-muted-foreground"},r))):e.createElement("div",{className:"my-4 h-[1px] w-full bg-border"})}const l={name:"Separator",render:t=>e.createElement(y,{...t}),args:{orientation:"horizontal",label:""},argTypes:{orientation:{control:"select",options:["horizontal","vertical"]},label:{control:"text"}}};function E({variant:t="card",animated:r=!0}){const a=r?"animate-pulse":"";return t==="avatar"?e.createElement("div",{className:n("h-12 w-12 rounded-full bg-muted",a)}):t==="text"?e.createElement("div",{className:"space-y-2"},e.createElement("div",{className:n("h-4 w-[250px] rounded bg-muted",a)}),e.createElement("div",{className:n("h-4 w-[200px] rounded bg-muted",a)}),e.createElement("div",{className:n("h-4 w-[160px] rounded bg-muted",a)})):t==="button"?e.createElement("div",{className:n("h-10 w-24 rounded-md bg-muted",a)}):e.createElement("div",{className:"flex items-center space-x-4"},e.createElement("div",{className:n("h-12 w-12 rounded-full bg-muted",a)}),e.createElement("div",{className:"space-y-2"},e.createElement("div",{className:n("h-4 w-[250px] rounded bg-muted",a)}),e.createElement("div",{className:n("h-4 w-[200px] rounded bg-muted",a)})))}const c={name:"Skeleton",render:t=>e.createElement(E,{...t}),args:{variant:"card",animated:!0},argTypes:{variant:{control:"select",options:["card","text","avatar","button"]},animated:{control:"boolean"}}},f={default:"bg-primary",success:"bg-green-500",warning:"bg-yellow-500",destructive:"bg-destructive"};function h({value:t=60,showLabel:r=!1,color:a="default"}){const u=Math.max(0,Math.min(100,t));return e.createElement("div",{className:"max-w-sm space-y-1"},r&&e.createElement("div",{className:"flex justify-between text-sm"},e.createElement("span",null,"Progress"),e.createElement("span",null,u,"%")),e.createElement("div",{className:"relative h-3 w-full overflow-hidden rounded-full bg-secondary"},e.createElement("div",{className:n("h-full rounded-full transition-all",f[a]??f.default),style:{width:`${u}%`}})))}const m={name:"Progress",render:t=>e.createElement(h,{...t}),args:{value:60,showLabel:!1,color:"default"},argTypes:{value:{control:{type:"range",min:0,max:100,step:1}},showLabel:{control:"boolean"},color:{control:"select",options:["default","success","warning","destructive"]}}},x={sm:"h-4 w-4",md:"h-6 w-6",lg:"h-8 w-8"};function w({size:t="md",label:r}){return e.createElement("div",{className:"flex items-center gap-2"},e.createElement("div",{className:n("animate-spin",x[t]??x.md)},e.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},e.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}))),r&&e.createElement("span",{className:"text-sm text-muted-foreground"},r))}const d={name:"Spinner",render:t=>e.createElement(w,{...t}),args:{size:"md",label:"Loading..."},argTypes:{size:{control:"select",options:["sm","md","lg"]},label:{control:"text"}}},S={"16:9":16/9,"4:3":4/3,"1:1":1,"21:9":21/9};function N({ratio:t="16:9"}){const r=S[t]??1.7777777777777777;return e.createElement("div",{className:"max-w-xs"},e.createElement("p",{className:"mb-1 text-xs text-muted-foreground"},t),e.createElement("div",{style:{paddingBottom:`${100/r}%`,position:"relative"},className:"w-full rounded-md bg-muted"},e.createElement("div",{className:"absolute inset-0 flex items-center justify-center text-sm text-muted-foreground"},t)))}const i={name:"Aspect Ratio",render:t=>e.createElement(N,{...t}),args:{ratio:"16:9"},argTypes:{ratio:{control:"select",options:["16:9","4:3","1:1","21:9"]}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Badge',
  render: args => <Badge {...args} />,
  args: {
    variant: 'default',
    children: 'Badge'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline']
    },
    children: {
      control: 'text'
    }
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Avatar',
  render: args => <Avatar {...args} />,
  args: {
    size: 'md',
    fallback: 'AB',
    src: ''
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    fallback: {
      control: 'text'
    },
    src: {
      control: 'text'
    }
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Separator',
  render: args => <Separator {...args} />,
  args: {
    orientation: 'horizontal',
    label: ''
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    label: {
      control: 'text'
    }
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Skeleton',
  render: args => <Skeleton {...args} />,
  args: {
    variant: 'card',
    animated: true
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['card', 'text', 'avatar', 'button']
    },
    animated: {
      control: 'boolean'
    }
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Progress',
  render: args => <Progress {...args} />,
  args: {
    value: 60,
    showLabel: false,
    color: 'default'
  },
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1
      }
    },
    showLabel: {
      control: 'boolean'
    },
    color: {
      control: 'select',
      options: ['default', 'success', 'warning', 'destructive']
    }
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Spinner',
  render: args => <Spinner {...args} />,
  args: {
    size: 'md',
    label: 'Loading...'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    label: {
      control: 'text'
    }
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Aspect Ratio',
  render: args => <AspectRatio {...args} />,
  args: {
    ratio: '16:9'
  },
  argTypes: {
    ratio: {
      control: 'select',
      options: ['16:9', '4:3', '1:1', '21:9']
    }
  }
}`,...i.parameters?.docs?.source}}};const T=["BadgeStory","AvatarStory","SeparatorStory","SkeletonStory","ProgressStory","SpinnerStory","AspectRatioStory"];export{i as AspectRatioStory,o as AvatarStory,s as BadgeStory,m as ProgressStory,l as SeparatorStory,c as SkeletonStory,d as SpinnerStory,T as __namedExportsOrder,B as default};
