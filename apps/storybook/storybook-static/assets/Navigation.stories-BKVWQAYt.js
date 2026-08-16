import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{n}from"./iframe-xPHbGT99.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";var i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b;function x(){return(x=t((()=>{i=e(n(),1),a=r(),o=(...e)=>e.filter(Boolean).join(` `),s={title:`Components/Navigation`},c={name:`Tabs`,args:{defaultTab:`account`,variant:`default`},argTypes:{defaultTab:{control:`select`,options:[`account`,`password`,`settings`],description:`Initially active tab`},variant:{control:`select`,options:[`default`,`underline`,`pills`],description:`Visual style of the tab bar`}},render:e=>{let[t,n]=(0,i.useState)(e.defaultTab),r={default:`inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 p-1`,underline:`inline-flex h-10 items-center justify-center border-b gap-2`,pills:`inline-flex h-10 items-center justify-center gap-2`},s={default:`rounded-sm px-3 py-1.5 text-sm font-medium transition-colors`,underline:`px-3 py-1.5 text-sm font-medium border-b-2 border-transparent -mb-px transition-colors`,pills:`rounded-full px-4 py-1.5 text-sm font-medium transition-colors`},c={default:`bg-white text-black shadow-sm`,underline:`border-b-2 border-black text-black`,pills:`bg-black text-white`};return(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`div`,{className:r[e.variant],children:[`account`,`password`,`settings`].map(r=>(0,a.jsx)(`button`,{onClick:()=>n(r),className:o(s[e.variant],t===r?c[e.variant]:`text-neutral-500 hover:text-black`),children:r.charAt(0).toUpperCase()+r.slice(1)},r))}),(0,a.jsxs)(`div`,{className:`mt-4 rounded-md border border-neutral-200 p-4 text-sm`,children:[`Content for `,(0,a.jsx)(`strong`,{children:t}),`.`]})]})}},l=[{id:`1`,q:`Is it accessible?`,a:`Yes. It follows WAI-ARIA design patterns.`},{id:`2`,q:`Is it styled?`,a:`Yes. Ships with default styles matching the design system.`},{id:`3`,q:`Is it animated?`,a:`Yes. Uses CSS transitions for open/close.`}],u={name:`Accordion`,args:{type:`single`,collapsible:!0},argTypes:{type:{control:`select`,options:[`single`,`multiple`],description:`Allow one or many items open at a time`},collapsible:{control:`boolean`,description:`Allow collapsing all items when type is single`}},render:e=>{let[t,n]=(0,i.useState)(new Set([`1`])),r=t=>{n(n=>{let r=new Set(n);if(r.has(t)){if(e.type===`single`&&!e.collapsible)return n;r.delete(t)}else e.type===`single`&&r.clear(),r.add(t);return r})};return(0,a.jsx)(`div`,{className:`max-w-lg`,children:l.map(e=>(0,a.jsxs)(`div`,{className:`border-b border-neutral-200`,children:[(0,a.jsxs)(`button`,{className:`flex w-full items-center justify-between py-4 text-sm font-medium hover:underline`,onClick:()=>r(e.id),children:[e.q,(0,a.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,className:o(`h-4 w-4 transition-transform duration-200`,t.has(e.id)&&`rotate-180`),children:(0,a.jsx)(`path`,{d:`m6 9 6 6 6-6`})})]}),t.has(e.id)&&(0,a.jsx)(`p`,{className:`pb-4 text-sm text-neutral-500`,children:e.a})]},e.id))})}},d={name:`Dropdown Menu`,args:{triggerLabel:`Options`,align:`start`},argTypes:{triggerLabel:{control:`text`,description:`Label on the trigger button`},align:{control:`select`,options:[`start`,`center`,`end`],description:`Horizontal alignment of the dropdown panel`}},render:e=>{let[t,n]=(0,i.useState)(!1);return(0,a.jsxs)(`div`,{className:`relative inline-block`,children:[(0,a.jsxs)(`button`,{onClick:()=>n(!t),className:`h-10 rounded-md border border-neutral-200 px-4 text-sm hover:bg-neutral-100`,children:[e.triggerLabel,` ▾`]}),t&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`div`,{className:`fixed inset-0`,onClick:()=>n(!1)}),(0,a.jsxs)(`div`,{className:o(`absolute z-50 mt-2 min-w-[180px] rounded-md border border-neutral-200 bg-white p-1 shadow-md`,{start:`left-0`,center:`left-1/2 -translate-x-1/2`,end:`right-0`}[e.align]),children:[(0,a.jsx)(`div`,{className:`px-2 py-1.5 text-sm font-semibold`,children:`Account`}),(0,a.jsx)(`div`,{className:`-mx-1 my-1 h-px bg-neutral-100`}),[`Profile`,`Settings`,`Billing`].map(e=>(0,a.jsx)(`div`,{className:`cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100`,onClick:()=>n(!1),children:e},e)),(0,a.jsx)(`div`,{className:`-mx-1 my-1 h-px bg-neutral-100`}),(0,a.jsx)(`div`,{className:`cursor-default rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-neutral-100`,onClick:()=>n(!1),children:`Log out`})]})]})]})}},f={name:`Context Menu`,render:()=>{let[e,t]=(0,i.useState)(null);return(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`div`,{className:`flex h-40 items-center justify-center rounded-md border-2 border-dashed border-neutral-300 text-sm text-neutral-500`,onContextMenu:e=>{e.preventDefault(),t({x:e.clientX,y:e.clientY})},children:`Right-click here`}),e&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`div`,{className:`fixed inset-0 z-40`,onClick:()=>t(null)}),(0,a.jsxs)(`div`,{className:`fixed z-50 min-w-[160px] rounded-md border border-neutral-200 bg-white p-1 shadow-md`,style:{left:e.x,top:e.y},children:[[`Cut ⌘X`,`Copy ⌘C`,`Paste ⌘V`].map(e=>(0,a.jsx)(`div`,{className:`cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100`,onClick:()=>t(null),children:e},e)),(0,a.jsx)(`div`,{className:`-mx-1 my-1 h-px bg-neutral-100`}),(0,a.jsx)(`div`,{className:`cursor-default rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-neutral-100`,onClick:()=>t(null),children:`Delete`})]})]})]})}},p={name:`Menubar`,render:()=>{let[e,t]=(0,i.useState)(null),n={File:[`New File`,`Open...`,`Save`,`Exit`],Edit:[`Undo`,`Redo`,`Cut`,`Copy`,`Paste`],View:[`Zoom In`,`Zoom Out`,`Full Screen`]};return(0,a.jsx)(`div`,{className:`relative flex h-10 items-center space-x-1 rounded-md border border-neutral-200 bg-white p-1`,children:Object.keys(n).map(r=>(0,a.jsxs)(`div`,{className:`relative`,children:[(0,a.jsx)(`button`,{className:o(`rounded-sm px-3 py-1.5 text-sm font-medium hover:bg-neutral-100`,e===r&&`bg-neutral-100`),onClick:()=>t(e===r?null:r),children:r}),e===r&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`div`,{className:`fixed inset-0 z-40`,onClick:()=>t(null)}),(0,a.jsx)(`div`,{className:`absolute left-0 z-50 mt-1 min-w-[160px] rounded-md border border-neutral-200 bg-white p-1 shadow-md`,children:n[r].map(e=>(0,a.jsx)(`div`,{className:`cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100`,onClick:()=>t(null),children:e},e))})]})]},r))})}},m={name:`Navigation Menu`,args:{orientation:`horizontal`},argTypes:{orientation:{control:`select`,options:[`horizontal`,`vertical`],description:`Layout direction of navigation links`}},render:e=>{let t=[`Home`,`Products`,`Pricing`,`About`],n=e.orientation===`vertical`;return(0,a.jsx)(`nav`,{className:o(`flex gap-1`,n?`flex-col w-48`:`flex-row items-center`),children:t.map(e=>(0,a.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),className:o(`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-neutral-100 transition-colors`,n?`justify-start`:`justify-center h-10`),children:e},e))})}},h=[`Home`,`Components`,`Navigation`,`Breadcrumb`,`Variants`,`Current`],g={name:`Breadcrumb`,args:{items:3,showEllipsis:!1},argTypes:{items:{control:{type:`number`,min:3,max:6,step:1},description:`Total number of breadcrumb segments`},showEllipsis:{control:`boolean`,description:`Collapse middle items into an ellipsis`}},render:e=>{let t=Math.min(Math.max(e.items,3),6),n=h.slice(0,t);return(0,a.jsx)(`nav`,{children:(0,a.jsx)(`ol`,{className:`flex items-center gap-1.5 text-sm text-neutral-500`,children:(()=>{if(e.showEllipsis&&t>3){let e=n[0],t=n[n.length-1],r=n[n.length-2];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(`li`,{children:(0,a.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),className:`hover:text-black`,children:e})}),(0,a.jsx)(`li`,{className:`text-neutral-300`,children:`/`}),(0,a.jsx)(`li`,{className:`text-neutral-400`,children:`⋯`}),(0,a.jsx)(`li`,{className:`text-neutral-300`,children:`/`}),(0,a.jsx)(`li`,{children:(0,a.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),className:`hover:text-black`,children:r})}),(0,a.jsx)(`li`,{className:`text-neutral-300`,children:`/`}),(0,a.jsx)(`li`,{className:`text-black font-medium`,children:t})]})}return n.map((e,t)=>{let r=t===n.length-1;return(0,a.jsxs)(i.Fragment,{children:[t>0&&(0,a.jsx)(`li`,{className:`text-neutral-300`,children:`/`}),(0,a.jsx)(`li`,{children:r?(0,a.jsx)(`span`,{className:`text-black font-medium`,children:e}):(0,a.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),className:`hover:text-black`,children:e})})]},e)})})()})})}},_={name:`Pagination`,args:{totalPages:10,currentPage:1,showEdges:!0},argTypes:{totalPages:{control:{type:`number`,min:1,max:20,step:1},description:`Total number of pages`},currentPage:{control:{type:`number`,min:1,max:20,step:1},description:`Currently active page`},showEdges:{control:`boolean`,description:`Show first/last page buttons`}},render:e=>{let[t,n]=(0,i.useState)(e.currentPage),r=Math.max(1,e.totalPages),s=Math.min(Math.max(1,t),r);return(0,a.jsx)(`nav`,{className:`flex justify-center`,children:(0,a.jsxs)(`ul`,{className:`flex items-center gap-1`,children:[(0,a.jsx)(`li`,{children:(0,a.jsx)(`button`,{onClick:()=>n(Math.max(1,s-1)),disabled:s===1,className:`h-10 px-3 rounded-md text-sm hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed`,children:`← Prev`})}),(()=>{if(r<=7)return Array.from({length:r},(e,t)=>t+1);let t=[];e.showEdges&&t.push(1);let n=Math.max(e.showEdges?2:1,s-1),i=Math.min(e.showEdges?r-1:r,s+1);n>(e.showEdges?2:1)&&t.push(`...`);for(let e=n;e<=i;e++)t.push(e);return i<(e.showEdges?r-1:r)&&t.push(`...`),e.showEdges&&t.push(r),t})().map((e,t)=>e===`...`?(0,a.jsx)(`li`,{className:`h-10 w-10 flex items-center justify-center text-sm text-neutral-400`,children:`⋯`},`ellipsis-${t}`):(0,a.jsx)(`li`,{children:(0,a.jsx)(`button`,{onClick:()=>n(e),className:o(`h-10 w-10 rounded-md text-sm hover:bg-neutral-100`,s===e&&`border border-neutral-200 bg-white font-medium`),children:e})},e)),(0,a.jsx)(`li`,{children:(0,a.jsx)(`button`,{onClick:()=>n(Math.min(r,s+1)),disabled:s===r,className:`h-10 px-3 rounded-md text-sm hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed`,children:`Next →`})})]})})}},v=[{key:`home`,label:`Home`,icon:`⌂`},{key:`projects`,label:`Projects`,icon:`▦`},{key:`inbox`,label:`Inbox`,icon:`✉`},{key:`team`,label:`Team`,icon:`⚑`},{key:`settings`,label:`Settings`,icon:`⚙`}],y={name:`Sidebar`,args:{collapsed:!1,activeItem:`home`},argTypes:{collapsed:{control:`boolean`,description:`Whether the sidebar is collapsed to icon-only mode`},activeItem:{control:`select`,options:[`home`,`projects`,`settings`,`team`,`inbox`],description:`Currently active navigation item`}},render:e=>{let[t,n]=(0,i.useState)(e.collapsed),[r,s]=(0,i.useState)(e.activeItem);return(0,a.jsxs)(`div`,{className:`flex h-64 rounded-md border border-neutral-200 overflow-hidden`,children:[(0,a.jsxs)(`aside`,{className:o(`flex flex-col border-r border-neutral-200 bg-neutral-50 transition-all duration-200`,t?`w-14`:`w-52`),children:[(0,a.jsxs)(`div`,{className:`flex h-10 items-center justify-between border-b border-neutral-200 px-2`,children:[!t&&(0,a.jsx)(`span`,{className:`text-sm font-semibold px-1`,children:`App`}),(0,a.jsx)(`button`,{onClick:()=>n(!t),className:`rounded p-1 hover:bg-neutral-200 text-sm`,children:`☰`})]}),(0,a.jsx)(`div`,{className:`flex-1 p-2 space-y-0.5`,children:v.map(e=>(0,a.jsxs)(`button`,{onClick:()=>s(e.key),title:t?e.label:void 0,className:o(`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-neutral-200 transition-colors`,r===e.key&&`bg-neutral-200 font-medium`),children:[(0,a.jsx)(`span`,{children:e.icon}),!t&&(0,a.jsx)(`span`,{children:e.label})]},e.key))})]}),(0,a.jsxs)(`div`,{className:`flex-1 p-4 text-sm text-neutral-500`,children:[(0,a.jsx)(`span`,{className:`font-medium text-black`,children:v.find(e=>e.key===r)?.label}),` `,`content area`]})]})}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Tabs',
  args: {
    defaultTab: 'account',
    variant: 'default'
  },
  argTypes: {
    defaultTab: {
      control: 'select',
      options: ['account', 'password', 'settings'],
      description: 'Initially active tab'
    },
    variant: {
      control: 'select',
      options: ['default', 'underline', 'pills'],
      description: 'Visual style of the tab bar'
    }
  },
  render: args => {
    const [active, setActive] = useState(args.defaultTab);
    const wrapperStyles: Record<string, string> = {
      default: 'inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 p-1',
      underline: 'inline-flex h-10 items-center justify-center border-b gap-2',
      pills: 'inline-flex h-10 items-center justify-center gap-2'
    };
    const tabBase: Record<string, string> = {
      default: 'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
      underline: 'px-3 py-1.5 text-sm font-medium border-b-2 border-transparent -mb-px transition-colors',
      pills: 'rounded-full px-4 py-1.5 text-sm font-medium transition-colors'
    };
    const tabActive: Record<string, string> = {
      default: 'bg-white text-black shadow-sm',
      underline: 'border-b-2 border-black text-black',
      pills: 'bg-black text-white'
    };
    const tabInactive = 'text-neutral-500 hover:text-black';
    return <div>
        <div className={wrapperStyles[args.variant]}>
          {(['account', 'password', 'settings'] as const).map(v => <button key={v} onClick={() => setActive(v)} className={cn(tabBase[args.variant], active === v ? tabActive[args.variant] : tabInactive)}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>)}
        </div>
        <div className="mt-4 rounded-md border border-neutral-200 p-4 text-sm">
          Content for <strong>{active}</strong>.
        </div>
      </div>;
  }
}`,...c.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Accordion',
  args: {
    type: 'single',
    collapsible: true
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Allow one or many items open at a time'
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow collapsing all items when type is single'
    }
  },
  render: args => {
    const [open, setOpen] = useState<Set<string>>(new Set(['1']));
    const toggle = (id: string) => {
      setOpen(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          if (args.type === 'single' && !args.collapsible) return prev;
          next.delete(id);
        } else {
          if (args.type === 'single') {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    };
    return <div className="max-w-lg">
        {accordionItems.map(item => <div key={item.id} className="border-b border-neutral-200">
            <button className="flex w-full items-center justify-between py-4 text-sm font-medium hover:underline" onClick={() => toggle(item.id)}>
              {item.q}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn('h-4 w-4 transition-transform duration-200', open.has(item.id) && 'rotate-180')}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {open.has(item.id) && <p className="pb-4 text-sm text-neutral-500">{item.a}</p>}
          </div>)}
      </div>;
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Dropdown Menu',
  args: {
    triggerLabel: 'Options',
    align: 'start'
  },
  argTypes: {
    triggerLabel: {
      control: 'text',
      description: 'Label on the trigger button'
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Horizontal alignment of the dropdown panel'
    }
  },
  render: args => {
    const [open, setOpen] = useState(false);
    const alignClass: Record<string, string> = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0'
    };
    return <div className="relative inline-block">
        <button onClick={() => setOpen(!open)} className="h-10 rounded-md border border-neutral-200 px-4 text-sm hover:bg-neutral-100">
          {args.triggerLabel} ▾
        </button>
        {open && <>
            <div className="fixed inset-0" onClick={() => setOpen(false)} />
            <div className={cn('absolute z-50 mt-2 min-w-[180px] rounded-md border border-neutral-200 bg-white p-1 shadow-md', alignClass[args.align])}>
              <div className="px-2 py-1.5 text-sm font-semibold">Account</div>
              <div className="-mx-1 my-1 h-px bg-neutral-100" />
              {['Profile', 'Settings', 'Billing'].map(item => <div key={item} className="cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100" onClick={() => setOpen(false)}>
                  {item}
                </div>)}
              <div className="-mx-1 my-1 h-px bg-neutral-100" />
              <div className="cursor-default rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-neutral-100" onClick={() => setOpen(false)}>
                Log out
              </div>
            </div>
          </>}
      </div>;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Context Menu',
  render: () => {
    const [menu, setMenu] = useState<{
      x: number;
      y: number;
    } | null>(null);
    return <div>
        <div className="flex h-40 items-center justify-center rounded-md border-2 border-dashed border-neutral-300 text-sm text-neutral-500" onContextMenu={e => {
        e.preventDefault();
        setMenu({
          x: e.clientX,
          y: e.clientY
        });
      }}>
          Right-click here
        </div>
        {menu && <>
            <div className="fixed inset-0 z-40" onClick={() => setMenu(null)} />
            <div className="fixed z-50 min-w-[160px] rounded-md border border-neutral-200 bg-white p-1 shadow-md" style={{
          left: menu.x,
          top: menu.y
        }}>
              {['Cut ⌘X', 'Copy ⌘C', 'Paste ⌘V'].map(item => <div key={item} className="cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100" onClick={() => setMenu(null)}>
                  {item}
                </div>)}
              <div className="-mx-1 my-1 h-px bg-neutral-100" />
              <div className="cursor-default rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-neutral-100" onClick={() => setMenu(null)}>
                Delete
              </div>
            </div>
          </>}
      </div>;
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Menubar',
  render: () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const menus: Record<string, string[]> = {
      File: ['New File', 'Open...', 'Save', 'Exit'],
      Edit: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'],
      View: ['Zoom In', 'Zoom Out', 'Full Screen']
    };
    return <div className="relative flex h-10 items-center space-x-1 rounded-md border border-neutral-200 bg-white p-1">
        {Object.keys(menus).map(label => <div key={label} className="relative">
            <button className={cn('rounded-sm px-3 py-1.5 text-sm font-medium hover:bg-neutral-100', openMenu === label && 'bg-neutral-100')} onClick={() => setOpenMenu(openMenu === label ? null : label)}>
              {label}
            </button>
            {openMenu === label && <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                <div className="absolute left-0 z-50 mt-1 min-w-[160px] rounded-md border border-neutral-200 bg-white p-1 shadow-md">
                  {menus[label].map(item => <div key={item} className="cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100" onClick={() => setOpenMenu(null)}>
                      {item}
                    </div>)}
                </div>
              </>}
          </div>)}
      </div>;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Navigation Menu',
  args: {
    orientation: 'horizontal'
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of navigation links'
    }
  },
  render: args => {
    const links = ['Home', 'Products', 'Pricing', 'About'];
    const isVertical = args.orientation === 'vertical';
    return <nav className={cn('flex gap-1', isVertical ? 'flex-col w-48' : 'flex-row items-center')}>
        {links.map(label => <a key={label} href="#" onClick={e => e.preventDefault()} className={cn('inline-flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-neutral-100 transition-colors', isVertical ? 'justify-start' : 'justify-center h-10')}>
            {label}
          </a>)}
      </nav>;
  }
}`,...m.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Breadcrumb',
  args: {
    items: 3,
    showEllipsis: false
  },
  argTypes: {
    items: {
      control: {
        type: 'number',
        min: 3,
        max: 6,
        step: 1
      },
      description: 'Total number of breadcrumb segments'
    },
    showEllipsis: {
      control: 'boolean',
      description: 'Collapse middle items into an ellipsis'
    }
  },
  render: args => {
    const count = Math.min(Math.max(args.items, 3), 6);
    const labels = breadcrumbLabels.slice(0, count);
    const renderItems = () => {
      if (args.showEllipsis && count > 3) {
        const first = labels[0];
        const last = labels[labels.length - 1];
        const secondLast = labels[labels.length - 2];
        return <>
            <li>
              <a href="#" onClick={e => e.preventDefault()} className="hover:text-black">
                {first}
              </a>
            </li>
            <li className="text-neutral-300">/</li>
            <li className="text-neutral-400">&#x22EF;</li>
            <li className="text-neutral-300">/</li>
            <li>
              <a href="#" onClick={e => e.preventDefault()} className="hover:text-black">
                {secondLast}
              </a>
            </li>
            <li className="text-neutral-300">/</li>
            <li className="text-black font-medium">{last}</li>
          </>;
      }
      return labels.map((label, i) => {
        const isLast = i === labels.length - 1;
        return <React.Fragment key={label}>
            {i > 0 && <li className="text-neutral-300">/</li>}
            <li>
              {isLast ? <span className="text-black font-medium">{label}</span> : <a href="#" onClick={e => e.preventDefault()} className="hover:text-black">
                  {label}
                </a>}
            </li>
          </React.Fragment>;
      });
    };
    return <nav>
        <ol className="flex items-center gap-1.5 text-sm text-neutral-500">
          {renderItems()}
        </ol>
      </nav>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Pagination',
  args: {
    totalPages: 10,
    currentPage: 1,
    showEdges: true
  },
  argTypes: {
    totalPages: {
      control: {
        type: 'number',
        min: 1,
        max: 20,
        step: 1
      },
      description: 'Total number of pages'
    },
    currentPage: {
      control: {
        type: 'number',
        min: 1,
        max: 20,
        step: 1
      },
      description: 'Currently active page'
    },
    showEdges: {
      control: 'boolean',
      description: 'Show first/last page buttons'
    }
  },
  render: args => {
    const [page, setPage] = useState(args.currentPage);
    const total = Math.max(1, args.totalPages);
    const current = Math.min(Math.max(1, page), total);
    const getVisiblePages = (): (number | '...')[] => {
      if (total <= 7) return Array.from({
        length: total
      }, (_, i) => i + 1);
      const pages: (number | '...')[] = [];
      if (args.showEdges) pages.push(1);
      let start = Math.max(args.showEdges ? 2 : 1, current - 1);
      let end = Math.min(args.showEdges ? total - 1 : total, current + 1);
      if (start > (args.showEdges ? 2 : 1)) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < (args.showEdges ? total - 1 : total)) pages.push('...');
      if (args.showEdges) pages.push(total);
      return pages;
    };
    return <nav className="flex justify-center">
        <ul className="flex items-center gap-1">
          <li>
            <button onClick={() => setPage(Math.max(1, current - 1))} disabled={current === 1} className="h-10 px-3 rounded-md text-sm hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed">
              &larr; Prev
            </button>
          </li>
          {getVisiblePages().map((p, i) => p === '...' ? <li key={\`ellipsis-\${i}\`} className="h-10 w-10 flex items-center justify-center text-sm text-neutral-400">
                &#x22EF;
              </li> : <li key={p}>
                <button onClick={() => setPage(p)} className={cn('h-10 w-10 rounded-md text-sm hover:bg-neutral-100', current === p && 'border border-neutral-200 bg-white font-medium')}>
                  {p}
                </button>
              </li>)}
          <li>
            <button onClick={() => setPage(Math.min(total, current + 1))} disabled={current === total} className="h-10 px-3 rounded-md text-sm hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed">
              Next &rarr;
            </button>
          </li>
        </ul>
      </nav>;
  }
}`,..._.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Sidebar',
  args: {
    collapsed: false,
    activeItem: 'home'
  },
  argTypes: {
    collapsed: {
      control: 'boolean',
      description: 'Whether the sidebar is collapsed to icon-only mode'
    },
    activeItem: {
      control: 'select',
      options: ['home', 'projects', 'settings', 'team', 'inbox'],
      description: 'Currently active navigation item'
    }
  },
  render: args => {
    const [collapsed, setCollapsed] = useState(args.collapsed);
    const [active, setActive] = useState(args.activeItem);
    return <div className="flex h-64 rounded-md border border-neutral-200 overflow-hidden">
        <aside className={cn('flex flex-col border-r border-neutral-200 bg-neutral-50 transition-all duration-200', collapsed ? 'w-14' : 'w-52')}>
          <div className="flex h-10 items-center justify-between border-b border-neutral-200 px-2">
            {!collapsed && <span className="text-sm font-semibold px-1">App</span>}
            <button onClick={() => setCollapsed(!collapsed)} className="rounded p-1 hover:bg-neutral-200 text-sm">
              ☰
            </button>
          </div>
          <div className="flex-1 p-2 space-y-0.5">
            {sidebarItems.map(item => <button key={item.key} onClick={() => setActive(item.key)} title={collapsed ? item.label : undefined} className={cn('flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-neutral-200 transition-colors', active === item.key && 'bg-neutral-200 font-medium')}>
                <span>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>)}
          </div>
        </aside>
        <div className="flex-1 p-4 text-sm text-neutral-500">
          <span className="font-medium text-black">
            {sidebarItems.find(i => i.key === active)?.label}
          </span>{' '}
          content area
        </div>
      </div>;
  }
}`,...y.parameters?.docs?.source}}},b=[`Tabs`,`Accordion`,`DropdownMenu`,`ContextMenu`,`Menubar`,`NavigationMenu`,`Breadcrumb`,`Pagination`,`Sidebar`]})))()}x();export{u as Accordion,g as Breadcrumb,f as ContextMenu,d as DropdownMenu,p as Menubar,m as NavigationMenu,_ as Pagination,y as Sidebar,c as Tabs,b as __namedExportsOrder,s as default};