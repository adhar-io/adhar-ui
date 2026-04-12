import{R as e,r as b}from"./iframe-C6JDg_SY.js";import"./preload-helper-PPVm8Dsz.js";const o=(...t)=>t.filter(Boolean).join(" ");function y({showSocial:t=!0,title:r="Welcome back"}){return e.createElement("div",{className:"max-w-xs mx-auto space-y-4 py-4"},e.createElement("h3",{className:"text-lg font-bold text-center"},r),e.createElement("div",{className:"space-y-3"},e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"Email"),e.createElement("input",{placeholder:"you@example.com",className:"flex h-9 w-full rounded-md border px-3 text-sm"})),e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"Password"),e.createElement("input",{type:"password",placeholder:"••••••••",className:"flex h-9 w-full rounded-md border px-3 text-sm"})),e.createElement("button",{className:"h-9 w-full rounded-md bg-primary text-sm text-primary-foreground"},"Sign in")),t&&e.createElement(e.Fragment,null,e.createElement("div",{className:"relative"},e.createElement("div",{className:"absolute inset-0 flex items-center"},e.createElement("div",{className:"w-full border-t"})),e.createElement("div",{className:"relative flex justify-center text-xs"},e.createElement("span",{className:"bg-background px-2 text-muted-foreground"},"or"))),e.createElement("div",{className:"grid grid-cols-2 gap-2"},e.createElement("button",{className:"h-9 rounded-md border text-xs"},"Google"),e.createElement("button",{className:"h-9 rounded-md border text-xs"},"GitHub"))))}const m={name:"Block — Login",render:t=>e.createElement(y,{...t}),args:{showSocial:!0,title:"Welcome back"},argTypes:{showSocial:{control:"boolean"},title:{control:"text"}}};function N({cards:t=3}){const s=[{t:"Revenue",v:"$45K",c:"+20%"},{t:"Users",v:"2.3K",c:"+12%"},{t:"Orders",v:"384",c:"+8%"},{t:"Visits",v:"18K",c:"+15%"},{t:"Conversion",v:"3.2%",c:"+0.5%"},{t:"Avg. Order",v:"$85",c:"+3%"}].slice(0,t);return e.createElement("div",{className:"space-y-4"},e.createElement("div",{className:o("grid gap-3",(t<=3,"grid-cols-3"))},s.map(a=>e.createElement("div",{key:a.t,className:"rounded-lg border p-3"},e.createElement("p",{className:"text-xs text-muted-foreground"},a.t),e.createElement("p",{className:"text-lg font-bold"},a.v),e.createElement("p",{className:"text-xs text-green-600"},"↑ ",a.c)))),e.createElement("div",{className:"rounded-lg border p-4"},e.createElement("h4",{className:"text-xs font-semibold mb-2"},"Weekly"),e.createElement("div",{className:"flex items-end gap-1 h-16"},[40,65,45,80,55,70,90].map((a,n)=>e.createElement("div",{key:n,className:"flex-1 rounded-t-sm bg-primary",style:{height:`${a}%`}})))))}const d={name:"Block — Dashboard",render:t=>e.createElement(N,{...t}),args:{cards:3},argTypes:{cards:{control:{type:"number",min:2,max:6}}}};function h({alignment:t="center",showCTA:r=!0}){return e.createElement("div",{className:o("py-8",t==="center"?"text-center":"text-left max-w-md")},e.createElement("span",{className:"rounded-full border px-3 py-1 text-xs font-medium"},"New"),e.createElement("h1",{className:"mt-4 text-2xl font-bold"},"Build faster with Adhar UI"),e.createElement("p",{className:"mt-2 text-sm text-muted-foreground"},"Components you own. 5 frameworks."),r&&e.createElement("div",{className:o("mt-4 flex gap-2",t==="center"?"justify-center":"")},e.createElement("button",{className:"h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground"},"Get Started"),e.createElement("button",{className:"h-9 rounded-md border px-4 text-sm"},"Learn More")))}const i={name:"Block — Hero",render:t=>e.createElement(h,{...t}),args:{alignment:"center",showCTA:!0},argTypes:{alignment:{control:"select",options:["left","center"]},showCTA:{control:"boolean"}}};function v({tiers:t=3,highlighted:r="pro"}){const a=[{n:"Free",p:"$0",f:["5 projects","Basic support"]},{n:"Pro",p:"$19",f:["Unlimited projects","Priority support"]},{n:"Enterprise",p:"$99",f:["Custom deploy","Dedicated support"]},{n:"Ultimate",p:"$249",f:["White-label","SLA 99.99%"]}].slice(0,t);return e.createElement("div",{className:o("grid gap-3 max-w-2xl",t<=3?"grid-cols-3":"grid-cols-4")},a.map(n=>{const l=r!=="none"&&n.n.toLowerCase()===r;return e.createElement("div",{key:n.n,className:o("rounded-lg border p-4",l&&"border-primary ring-1 ring-primary")},e.createElement("h3",{className:"text-sm font-semibold"},n.n),e.createElement("p",{className:"text-2xl font-bold mt-1"},n.p,e.createElement("span",{className:"text-xs text-muted-foreground"},"/mo")),e.createElement("ul",{className:"mt-3 space-y-1"},n.f.map(c=>e.createElement("li",{key:c,className:"text-xs text-muted-foreground"},"&check; ",c))),e.createElement("button",{className:o("mt-3 h-8 w-full rounded-md text-xs",l?"bg-primary text-primary-foreground":"border hover:bg-accent")},"Choose"))}))}const p={name:"Block — Pricing",render:t=>e.createElement(v,{...t}),args:{tiers:3,highlighted:"pro"},argTypes:{tiers:{control:{type:"number",min:2,max:4}},highlighted:{control:"select",options:["none","pro","enterprise"]}}};function k({activeTab:t="general"}){const[r,s]=b.useState(t);return e.useEffect(()=>{s(t)},[t]),e.createElement("div",{className:"max-w-md space-y-3"},e.createElement("div",{className:"flex gap-1 border-b"},["general","notifications","security"].map(a=>e.createElement("button",{key:a,onClick:()=>s(a),className:o("px-3 py-1.5 text-xs font-medium border-b-2 -mb-px",r===a?"border-primary text-foreground":"border-transparent text-muted-foreground")},a.charAt(0).toUpperCase()+a.slice(1)))),e.createElement("div",{className:"rounded-lg border p-4 space-y-3"},r==="general"&&e.createElement(e.Fragment,null,e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"Name"),e.createElement("input",{defaultValue:"John",className:"h-8 w-full rounded-md border px-2 text-sm"})),e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"Bio"),e.createElement("textarea",{rows:2,className:"w-full rounded-md border px-2 py-1 text-sm",defaultValue:"Developer"}))),r==="notifications"&&e.createElement("div",{className:"space-y-3"},["Email notifications","Push notifications","SMS alerts"].map(a=>e.createElement("label",{key:a,className:"flex items-center justify-between"},e.createElement("span",{className:"text-sm"},a),e.createElement("input",{type:"checkbox",defaultChecked:!0,className:"h-4 w-4 accent-primary"})))),r==="security"&&e.createElement("div",{className:"space-y-3"},e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"Current Password"),e.createElement("input",{type:"password",className:"h-8 w-full rounded-md border px-2 text-sm"})),e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"New Password"),e.createElement("input",{type:"password",className:"h-8 w-full rounded-md border px-2 text-sm"}))),e.createElement("button",{className:"h-8 rounded-md bg-primary px-4 text-xs text-primary-foreground"},"Save")))}const u={name:"Block — Settings",render:t=>e.createElement(k,{...t}),args:{activeTab:"general"},argTypes:{activeTab:{control:"select",options:["general","notifications","security"]}}};function w({code:t="404"}){const s={404:{t:"Page not found",btn:"Go home"},500:{t:"Internal server error",btn:"Retry"},403:{t:"Access forbidden",btn:"Request access"}}[t];return e.createElement("div",{className:"rounded-lg border p-8 text-center max-w-sm mx-auto"},e.createElement("p",{className:"text-5xl font-bold text-muted-foreground/20"},t),e.createElement("h3",{className:"mt-3 text-sm font-bold"},s.t),e.createElement("p",{className:"mt-1 text-xs text-muted-foreground"},"The requested resource could not be served."),e.createElement("button",{className:"mt-4 h-8 rounded-md bg-primary px-4 text-xs text-primary-foreground"},s.btn))}const x={name:"Block — Error Pages",render:t=>e.createElement(w,{...t}),args:{code:"404"},argTypes:{code:{control:"select",options:["404","500","403"]}}};function S({showSidebar:t=!0}){return e.createElement("div",{className:"flex h-56 rounded-md border overflow-hidden"},t&&e.createElement("div",{className:"w-40 border-r bg-muted/30 p-2 space-y-1"},e.createElement("button",{className:"w-full rounded-md bg-accent px-2 py-1.5 text-xs text-left font-medium"},"Active chat"),["Chat 2","Chat 3"].map(r=>e.createElement("button",{key:r,className:"w-full rounded-md px-2 py-1.5 text-xs text-left hover:bg-accent text-muted-foreground"},r))),e.createElement("div",{className:"flex flex-1 flex-col"},e.createElement("div",{className:"flex-1 p-3 space-y-2"},e.createElement("div",{className:"flex gap-2"},e.createElement("div",{className:"h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px]"},"AI"),e.createElement("div",{className:"rounded-lg bg-muted px-2.5 py-1.5 text-xs max-w-[80%]"},"How can I help?"))),e.createElement("div",{className:"border-t p-2 flex gap-1"},e.createElement("input",{placeholder:"Message...",className:"flex-1 h-7 rounded-md border px-2 text-xs"}),e.createElement("button",{className:"h-7 rounded-md bg-primary px-2 text-xs text-primary-foreground"},"Send"))))}const g={name:"Block — Chat Page",render:t=>e.createElement(S,{...t}),args:{showSidebar:!0},argTypes:{showSidebar:{control:"boolean"}}};function B({columns:t=3,showFilters:r=!1}){const a=["Headphones","Keyboard","Mouse","Monitor","Webcam","Speaker"].slice(0,t*2);return e.createElement("div",{className:"space-y-3"},r&&e.createElement("div",{className:"flex gap-2"},["All","Audio","Input","Display"].map(n=>e.createElement("button",{key:n,className:"h-7 rounded-full border px-3 text-xs hover:bg-accent"},n))),e.createElement("div",{className:o("grid gap-3",t===2?"grid-cols-2":t===3?"grid-cols-3":"grid-cols-4"),style:{maxWidth:t*180}},a.map(n=>e.createElement("div",{key:n,className:"rounded-lg border overflow-hidden"},e.createElement("div",{className:"aspect-square bg-muted flex items-center justify-center text-xs text-muted-foreground"},"Image"),e.createElement("div",{className:"p-3"},e.createElement("p",{className:"text-xs font-semibold"},n),e.createElement("p",{className:"text-sm font-bold mt-0.5"},"$99"),e.createElement("button",{className:"mt-2 h-7 w-full rounded-md bg-primary text-[10px] text-primary-foreground"},"Add to cart"))))))}const E={name:"Block — Products",render:t=>e.createElement(B,{...t}),args:{columns:3,showFilters:!1},argTypes:{columns:{control:{type:"number",min:2,max:4}},showFilters:{control:"boolean"}}};function C({step:t=1}){const[r,s]=b.useState(t-1);e.useEffect(()=>{s(t-1)},[t]);const n=["Shipping","Payment","Review","Confirm"].slice(0,Math.max(t+1,3));return e.createElement("div",{className:"max-w-sm space-y-4"},e.createElement("div",{className:"flex items-center gap-1"},n.map((l,c)=>e.createElement(e.Fragment,{key:l},e.createElement("div",{className:"flex items-center gap-1"},e.createElement("div",{className:o("flex h-6 w-6 items-center justify-center rounded-full text-xs border-2",c<=r?"border-primary bg-primary text-primary-foreground":"border-muted-foreground/30 text-muted-foreground")},c<r?"✓":c+1),e.createElement("span",{className:"text-xs"},l)),c<n.length-1&&e.createElement("div",{className:"h-0.5 flex-1 bg-muted"})))),e.createElement("div",{className:"rounded-md border p-4"},r===0&&e.createElement("div",{className:"space-y-2"},e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"Address"),e.createElement("input",{className:"h-8 w-full rounded-md border px-2 text-sm",placeholder:"123 Main St"})),e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"City"),e.createElement("input",{className:"h-8 w-full rounded-md border px-2 text-sm",placeholder:"New York"}))),r===1&&e.createElement("div",{className:"space-y-2"},e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"Card Number"),e.createElement("input",{className:"h-8 w-full rounded-md border px-2 text-sm",placeholder:"4242 4242 4242 4242"})),e.createElement("div",{className:"grid grid-cols-2 gap-2"},e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"Expiry"),e.createElement("input",{className:"h-8 w-full rounded-md border px-2 text-sm",placeholder:"MM/YY"})),e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-xs font-medium"},"CVC"),e.createElement("input",{className:"h-8 w-full rounded-md border px-2 text-sm",placeholder:"123"})))),r>=2&&e.createElement("div",{className:"text-sm space-y-1"},e.createElement("p",{className:"font-medium"},"Order Summary"),e.createElement("p",{className:"text-muted-foreground"},"1x Headphones - $99"),e.createElement("p",{className:"font-bold mt-2"},"Total: $99"))),e.createElement("div",{className:"flex justify-between"},e.createElement("button",{onClick:()=>s(Math.max(0,r-1)),disabled:r===0,className:"h-8 rounded-md border px-3 text-xs disabled:opacity-50"},"Back"),e.createElement("button",{onClick:()=>s(Math.min(3,r+1)),className:"h-8 rounded-md bg-primary px-3 text-xs text-primary-foreground"},r>=2?"Place Order":"Next")))}const f={name:"Block — Checkout",render:t=>e.createElement(C,{...t}),args:{step:1},argTypes:{step:{control:{type:"number",min:1,max:4}}}},A={title:"Blocks"};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Block \\u2014 Login',
  render: args => <Login {...args} />,
  args: {
    showSocial: true,
    title: 'Welcome back'
  },
  argTypes: {
    showSocial: {
      control: 'boolean'
    },
    title: {
      control: 'text'
    }
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Block \\u2014 Dashboard',
  render: args => <Dashboard {...args} />,
  args: {
    cards: 3
  },
  argTypes: {
    cards: {
      control: {
        type: 'number',
        min: 2,
        max: 6
      }
    }
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Block \\u2014 Hero',
  render: args => <Hero {...args} />,
  args: {
    alignment: 'center',
    showCTA: true
  },
  argTypes: {
    alignment: {
      control: 'select',
      options: ['left', 'center']
    },
    showCTA: {
      control: 'boolean'
    }
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Block \\u2014 Pricing',
  render: args => <Pricing {...args} />,
  args: {
    tiers: 3,
    highlighted: 'pro'
  },
  argTypes: {
    tiers: {
      control: {
        type: 'number',
        min: 2,
        max: 4
      }
    },
    highlighted: {
      control: 'select',
      options: ['none', 'pro', 'enterprise']
    }
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Block \\u2014 Settings',
  render: args => <Settings {...args} />,
  args: {
    activeTab: 'general'
  },
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['general', 'notifications', 'security']
    }
  }
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Block \\u2014 Error Pages',
  render: args => <ErrorPage {...args} />,
  args: {
    code: '404'
  },
  argTypes: {
    code: {
      control: 'select',
      options: ['404', '500', '403']
    }
  }
}`,...x.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Block \\u2014 Chat Page',
  render: args => <ChatPage {...args} />,
  args: {
    showSidebar: true
  },
  argTypes: {
    showSidebar: {
      control: 'boolean'
    }
  }
}`,...g.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Block \\u2014 Products',
  render: args => <ProductGrid {...args} />,
  args: {
    columns: 3,
    showFilters: false
  },
  argTypes: {
    columns: {
      control: {
        type: 'number',
        min: 2,
        max: 4
      }
    },
    showFilters: {
      control: 'boolean'
    }
  }
}`,...E.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Block \\u2014 Checkout',
  render: args => <Checkout {...args} />,
  args: {
    step: 1
  },
  argTypes: {
    step: {
      control: {
        type: 'number',
        min: 1,
        max: 4
      }
    }
  }
}`,...f.parameters?.docs?.source}}};const M=["BlockLoginStory","BlockDashboardStory","BlockHeroStory","BlockPricingStory","BlockSettingsStory","BlockErrorStory","BlockChatPageStory","BlockProductStory","BlockCheckoutStory"];export{g as BlockChatPageStory,f as BlockCheckoutStory,d as BlockDashboardStory,x as BlockErrorStory,i as BlockHeroStory,m as BlockLoginStory,p as BlockPricingStory,E as BlockProductStory,u as BlockSettingsStory,M as __namedExportsOrder,A as default};
