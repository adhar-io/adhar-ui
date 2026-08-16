import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{n}from"./iframe-xPHbGT99.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";function i({showSocial:e=!0,title:t=`Welcome back`}){return(0,m.jsxs)(`div`,{className:`max-w-xs mx-auto space-y-4 py-4`,children:[(0,m.jsx)(`h3`,{className:`text-lg font-bold text-center`,children:t}),(0,m.jsxs)(`div`,{className:`space-y-3`,children:[(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`Email`}),(0,m.jsx)(`input`,{placeholder:`you@example.com`,className:`flex h-9 w-full rounded-md border px-3 text-sm`})]}),(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`Password`}),(0,m.jsx)(`input`,{type:`password`,placeholder:`••••••••`,className:`flex h-9 w-full rounded-md border px-3 text-sm`})]}),(0,m.jsx)(`button`,{className:`h-9 w-full rounded-md bg-primary text-sm text-primary-foreground`,children:`Sign in`})]}),e&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(`div`,{className:`relative`,children:[(0,m.jsx)(`div`,{className:`absolute inset-0 flex items-center`,children:(0,m.jsx)(`div`,{className:`w-full border-t`})}),(0,m.jsx)(`div`,{className:`relative flex justify-center text-xs`,children:(0,m.jsx)(`span`,{className:`bg-background px-2 text-muted-foreground`,children:`or`})})]}),(0,m.jsxs)(`div`,{className:`grid grid-cols-2 gap-2`,children:[(0,m.jsx)(`button`,{className:`h-9 rounded-md border text-xs`,children:`Google`}),(0,m.jsx)(`button`,{className:`h-9 rounded-md border text-xs`,children:`GitHub`})]})]})]})}function a({cards:e=3}){let t=[{t:`Revenue`,v:`$45K`,c:`+20%`},{t:`Users`,v:`2.3K`,c:`+12%`},{t:`Orders`,v:`384`,c:`+8%`},{t:`Visits`,v:`18K`,c:`+15%`},{t:`Conversion`,v:`3.2%`,c:`+0.5%`},{t:`Avg. Order`,v:`$85`,c:`+3%`}].slice(0,e);return(0,m.jsxs)(`div`,{className:`space-y-4`,children:[(0,m.jsx)(`div`,{className:h(`grid gap-3`,`grid-cols-3`),children:t.map(e=>(0,m.jsxs)(`div`,{className:`rounded-lg border p-3`,children:[(0,m.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:e.t}),(0,m.jsx)(`p`,{className:`text-lg font-bold`,children:e.v}),(0,m.jsxs)(`p`,{className:`text-xs text-green-600`,children:[`↑ `,e.c]})]},e.t))}),(0,m.jsxs)(`div`,{className:`rounded-lg border p-4`,children:[(0,m.jsx)(`h4`,{className:`text-xs font-semibold mb-2`,children:`Weekly`}),(0,m.jsx)(`div`,{className:`flex items-end gap-1 h-16`,children:[40,65,45,80,55,70,90].map((e,t)=>(0,m.jsx)(`div`,{className:`flex-1 rounded-t-sm bg-primary`,style:{height:`${e}%`}},t))})]})]})}function o({alignment:e=`center`,showCTA:t=!0}){return(0,m.jsxs)(`div`,{className:h(`py-8`,e===`center`?`text-center`:`text-left max-w-md`),children:[(0,m.jsx)(`span`,{className:`rounded-full border px-3 py-1 text-xs font-medium`,children:`New`}),(0,m.jsx)(`h1`,{className:`mt-4 text-2xl font-bold`,children:`Build faster with Adhar UI`}),(0,m.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`Components you own. 5 frameworks.`}),t&&(0,m.jsxs)(`div`,{className:h(`mt-4 flex gap-2`,e===`center`?`justify-center`:``),children:[(0,m.jsx)(`button`,{className:`h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground`,children:`Get Started`}),(0,m.jsx)(`button`,{className:`h-9 rounded-md border px-4 text-sm`,children:`Learn More`})]})]})}function s({tiers:e=3,highlighted:t=`pro`}){let n=[{n:`Free`,p:`$0`,f:[`5 projects`,`Basic support`]},{n:`Pro`,p:`$19`,f:[`Unlimited projects`,`Priority support`]},{n:`Enterprise`,p:`$99`,f:[`Custom deploy`,`Dedicated support`]},{n:`Ultimate`,p:`$249`,f:[`White-label`,`SLA 99.99%`]}].slice(0,e);return(0,m.jsx)(`div`,{className:h(`grid gap-3 max-w-2xl`,e<=3?`grid-cols-3`:`grid-cols-4`),children:n.map(e=>{let n=t!==`none`&&e.n.toLowerCase()===t;return(0,m.jsxs)(`div`,{className:h(`rounded-lg border p-4`,n&&`border-primary ring-1 ring-primary`),children:[(0,m.jsx)(`h3`,{className:`text-sm font-semibold`,children:e.n}),(0,m.jsxs)(`p`,{className:`text-2xl font-bold mt-1`,children:[e.p,(0,m.jsx)(`span`,{className:`text-xs text-muted-foreground`,children:`/mo`})]}),(0,m.jsx)(`ul`,{className:`mt-3 space-y-1`,children:e.f.map(e=>(0,m.jsxs)(`li`,{className:`text-xs text-muted-foreground`,children:[`&check; `,e]},e))}),(0,m.jsx)(`button`,{className:h(`mt-3 h-8 w-full rounded-md text-xs`,n?`bg-primary text-primary-foreground`:`border hover:bg-accent`),children:`Choose`})]},e.n)})})}function c({activeTab:e=`general`}){let[t,n]=(0,p.useState)(e);return p.useEffect(()=>{n(e)},[e]),(0,m.jsxs)(`div`,{className:`max-w-md space-y-3`,children:[(0,m.jsx)(`div`,{className:`flex gap-1 border-b`,children:[`general`,`notifications`,`security`].map(e=>(0,m.jsx)(`button`,{onClick:()=>n(e),className:h(`px-3 py-1.5 text-xs font-medium border-b-2 -mb-px`,t===e?`border-primary text-foreground`:`border-transparent text-muted-foreground`),children:e.charAt(0).toUpperCase()+e.slice(1)},e))}),(0,m.jsxs)(`div`,{className:`rounded-lg border p-4 space-y-3`,children:[t===`general`&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`Name`}),(0,m.jsx)(`input`,{defaultValue:`John`,className:`h-8 w-full rounded-md border px-2 text-sm`})]}),(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`Bio`}),(0,m.jsx)(`textarea`,{rows:2,className:`w-full rounded-md border px-2 py-1 text-sm`,defaultValue:`Developer`})]})]}),t===`notifications`&&(0,m.jsx)(`div`,{className:`space-y-3`,children:[`Email notifications`,`Push notifications`,`SMS alerts`].map(e=>(0,m.jsxs)(`label`,{className:`flex items-center justify-between`,children:[(0,m.jsx)(`span`,{className:`text-sm`,children:e}),(0,m.jsx)(`input`,{type:`checkbox`,defaultChecked:!0,className:`h-4 w-4 accent-primary`})]},e))}),t===`security`&&(0,m.jsxs)(`div`,{className:`space-y-3`,children:[(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`Current Password`}),(0,m.jsx)(`input`,{type:`password`,className:`h-8 w-full rounded-md border px-2 text-sm`})]}),(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`New Password`}),(0,m.jsx)(`input`,{type:`password`,className:`h-8 w-full rounded-md border px-2 text-sm`})]})]}),(0,m.jsx)(`button`,{className:`h-8 rounded-md bg-primary px-4 text-xs text-primary-foreground`,children:`Save`})]})]})}function l({code:e=`404`}){let t={404:{t:`Page not found`,btn:`Go home`},500:{t:`Internal server error`,btn:`Retry`},403:{t:`Access forbidden`,btn:`Request access`}}[e];return(0,m.jsxs)(`div`,{className:`rounded-lg border p-8 text-center max-w-sm mx-auto`,children:[(0,m.jsx)(`p`,{className:`text-5xl font-bold text-muted-foreground/20`,children:e}),(0,m.jsx)(`h3`,{className:`mt-3 text-sm font-bold`,children:t.t}),(0,m.jsx)(`p`,{className:`mt-1 text-xs text-muted-foreground`,children:`The requested resource could not be served.`}),(0,m.jsx)(`button`,{className:`mt-4 h-8 rounded-md bg-primary px-4 text-xs text-primary-foreground`,children:t.btn})]})}function u({showSidebar:e=!0}){return(0,m.jsxs)(`div`,{className:`flex h-56 rounded-md border overflow-hidden`,children:[e&&(0,m.jsxs)(`div`,{className:`w-40 border-r bg-muted/30 p-2 space-y-1`,children:[(0,m.jsx)(`button`,{className:`w-full rounded-md bg-accent px-2 py-1.5 text-xs text-left font-medium`,children:`Active chat`}),[`Chat 2`,`Chat 3`].map(e=>(0,m.jsx)(`button`,{className:`w-full rounded-md px-2 py-1.5 text-xs text-left hover:bg-accent text-muted-foreground`,children:e},e))]}),(0,m.jsxs)(`div`,{className:`flex flex-1 flex-col`,children:[(0,m.jsx)(`div`,{className:`flex-1 p-3 space-y-2`,children:(0,m.jsxs)(`div`,{className:`flex gap-2`,children:[(0,m.jsx)(`div`,{className:`h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px]`,children:`AI`}),(0,m.jsx)(`div`,{className:`rounded-lg bg-muted px-2.5 py-1.5 text-xs max-w-[80%]`,children:`How can I help?`})]})}),(0,m.jsxs)(`div`,{className:`border-t p-2 flex gap-1`,children:[(0,m.jsx)(`input`,{placeholder:`Message...`,className:`flex-1 h-7 rounded-md border px-2 text-xs`}),(0,m.jsx)(`button`,{className:`h-7 rounded-md bg-primary px-2 text-xs text-primary-foreground`,children:`Send`})]})]})]})}function d({columns:e=3,showFilters:t=!1}){let n=[`Headphones`,`Keyboard`,`Mouse`,`Monitor`,`Webcam`,`Speaker`].slice(0,e*2);return(0,m.jsxs)(`div`,{className:`space-y-3`,children:[t&&(0,m.jsx)(`div`,{className:`flex gap-2`,children:[`All`,`Audio`,`Input`,`Display`].map(e=>(0,m.jsx)(`button`,{className:`h-7 rounded-full border px-3 text-xs hover:bg-accent`,children:e},e))}),(0,m.jsx)(`div`,{className:h(`grid gap-3`,e===2?`grid-cols-2`:e===3?`grid-cols-3`:`grid-cols-4`),style:{maxWidth:e*180},children:n.map(e=>(0,m.jsxs)(`div`,{className:`rounded-lg border overflow-hidden`,children:[(0,m.jsx)(`div`,{className:`aspect-square bg-muted flex items-center justify-center text-xs text-muted-foreground`,children:`Image`}),(0,m.jsxs)(`div`,{className:`p-3`,children:[(0,m.jsx)(`p`,{className:`text-xs font-semibold`,children:e}),(0,m.jsx)(`p`,{className:`text-sm font-bold mt-0.5`,children:`$99`}),(0,m.jsx)(`button`,{className:`mt-2 h-7 w-full rounded-md bg-primary text-[10px] text-primary-foreground`,children:`Add to cart`})]})]},e))})]})}function f({step:e=1}){let[t,n]=(0,p.useState)(e-1);p.useEffect(()=>{n(e-1)},[e]);let r=[`Shipping`,`Payment`,`Review`,`Confirm`].slice(0,Math.max(e+1,3));return(0,m.jsxs)(`div`,{className:`max-w-sm space-y-4`,children:[(0,m.jsx)(`div`,{className:`flex items-center gap-1`,children:r.map((e,n)=>(0,m.jsxs)(p.Fragment,{children:[(0,m.jsxs)(`div`,{className:`flex items-center gap-1`,children:[(0,m.jsx)(`div`,{className:h(`flex h-6 w-6 items-center justify-center rounded-full text-xs border-2`,n<=t?`border-primary bg-primary text-primary-foreground`:`border-muted-foreground/30 text-muted-foreground`),children:n<t?`✓`:n+1}),(0,m.jsx)(`span`,{className:`text-xs`,children:e})]}),n<r.length-1&&(0,m.jsx)(`div`,{className:`h-0.5 flex-1 bg-muted`})]},e))}),(0,m.jsxs)(`div`,{className:`rounded-md border p-4`,children:[t===0&&(0,m.jsxs)(`div`,{className:`space-y-2`,children:[(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`Address`}),(0,m.jsx)(`input`,{className:`h-8 w-full rounded-md border px-2 text-sm`,placeholder:`123 Main St`})]}),(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`City`}),(0,m.jsx)(`input`,{className:`h-8 w-full rounded-md border px-2 text-sm`,placeholder:`New York`})]})]}),t===1&&(0,m.jsxs)(`div`,{className:`space-y-2`,children:[(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`Card Number`}),(0,m.jsx)(`input`,{className:`h-8 w-full rounded-md border px-2 text-sm`,placeholder:`4242 4242 4242 4242`})]}),(0,m.jsxs)(`div`,{className:`grid grid-cols-2 gap-2`,children:[(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`Expiry`}),(0,m.jsx)(`input`,{className:`h-8 w-full rounded-md border px-2 text-sm`,placeholder:`MM/YY`})]}),(0,m.jsxs)(`div`,{className:`space-y-1`,children:[(0,m.jsx)(`label`,{className:`text-xs font-medium`,children:`CVC`}),(0,m.jsx)(`input`,{className:`h-8 w-full rounded-md border px-2 text-sm`,placeholder:`123`})]})]})]}),t>=2&&(0,m.jsxs)(`div`,{className:`text-sm space-y-1`,children:[(0,m.jsx)(`p`,{className:`font-medium`,children:`Order Summary`}),(0,m.jsx)(`p`,{className:`text-muted-foreground`,children:`1x Headphones - $99`}),(0,m.jsx)(`p`,{className:`font-bold mt-2`,children:`Total: $99`})]})]}),(0,m.jsxs)(`div`,{className:`flex justify-between`,children:[(0,m.jsx)(`button`,{onClick:()=>n(Math.max(0,t-1)),disabled:t===0,className:`h-8 rounded-md border px-3 text-xs disabled:opacity-50`,children:`Back`}),(0,m.jsx)(`button`,{onClick:()=>n(Math.min(3,t+1)),className:`h-8 rounded-md bg-primary px-3 text-xs text-primary-foreground`,children:t>=2?`Place Order`:`Next`})]})]})}var p,m,h,g,_,v,y,b,x,S,C,w,T,E;function D(){return(D=t((()=>{p=e(n(),1),m=r(),h=(...e)=>e.filter(Boolean).join(` `),g={name:`Block — Login`,render:e=>(0,m.jsx)(i,{...e}),args:{showSocial:!0,title:`Welcome back`},argTypes:{showSocial:{control:`boolean`},title:{control:`text`}}},_={name:`Block — Dashboard`,render:e=>(0,m.jsx)(a,{...e}),args:{cards:3},argTypes:{cards:{control:{type:`number`,min:2,max:6}}}},v={name:`Block — Hero`,render:e=>(0,m.jsx)(o,{...e}),args:{alignment:`center`,showCTA:!0},argTypes:{alignment:{control:`select`,options:[`left`,`center`]},showCTA:{control:`boolean`}}},y={name:`Block — Pricing`,render:e=>(0,m.jsx)(s,{...e}),args:{tiers:3,highlighted:`pro`},argTypes:{tiers:{control:{type:`number`,min:2,max:4}},highlighted:{control:`select`,options:[`none`,`pro`,`enterprise`]}}},b={name:`Block — Settings`,render:e=>(0,m.jsx)(c,{...e}),args:{activeTab:`general`},argTypes:{activeTab:{control:`select`,options:[`general`,`notifications`,`security`]}}},x={name:`Block — Error Pages`,render:e=>(0,m.jsx)(l,{...e}),args:{code:`404`},argTypes:{code:{control:`select`,options:[`404`,`500`,`403`]}}},S={name:`Block — Chat Page`,render:e=>(0,m.jsx)(u,{...e}),args:{showSidebar:!0},argTypes:{showSidebar:{control:`boolean`}}},C={name:`Block — Products`,render:e=>(0,m.jsx)(d,{...e}),args:{columns:3,showFilters:!1},argTypes:{columns:{control:{type:`number`,min:2,max:4}},showFilters:{control:`boolean`}}},w={name:`Block — Checkout`,render:e=>(0,m.jsx)(f,{...e}),args:{step:1},argTypes:{step:{control:{type:`number`,min:1,max:4}}}},T={title:`Blocks`},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},E=[`BlockLoginStory`,`BlockDashboardStory`,`BlockHeroStory`,`BlockPricingStory`,`BlockSettingsStory`,`BlockErrorStory`,`BlockChatPageStory`,`BlockProductStory`,`BlockCheckoutStory`]})))()}D();export{S as BlockChatPageStory,w as BlockCheckoutStory,_ as BlockDashboardStory,x as BlockErrorStory,v as BlockHeroStory,g as BlockLoginStory,y as BlockPricingStory,C as BlockProductStory,b as BlockSettingsStory,E as __namedExportsOrder,T as default};