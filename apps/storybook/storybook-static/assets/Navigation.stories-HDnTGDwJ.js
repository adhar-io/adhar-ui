import{r as m,R as e}from"./iframe-C6JDg_SY.js";import"./preload-helper-PPVm8Dsz.js";const c=(...t)=>t.filter(Boolean).join(" "),P={title:"Components/Navigation"},u={name:"Tabs",args:{defaultTab:"account",variant:"default"},argTypes:{defaultTab:{control:"select",options:["account","password","settings"],description:"Initially active tab"},variant:{control:"select",options:["default","underline","pills"],description:"Visual style of the tab bar"}},render:t=>{const[r,n]=m.useState(t.defaultTab),s={default:"inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 p-1",underline:"inline-flex h-10 items-center justify-center border-b gap-2",pills:"inline-flex h-10 items-center justify-center gap-2"},a={default:"rounded-sm px-3 py-1.5 text-sm font-medium transition-colors",underline:"px-3 py-1.5 text-sm font-medium border-b-2 border-transparent -mb-px transition-colors",pills:"rounded-full px-4 py-1.5 text-sm font-medium transition-colors"},o={default:"bg-white text-black shadow-sm",underline:"border-b-2 border-black text-black",pills:"bg-black text-white"},l="text-neutral-500 hover:text-black";return e.createElement("div",null,e.createElement("div",{className:s[t.variant]},["account","password","settings"].map(i=>e.createElement("button",{key:i,onClick:()=>n(i),className:c(a[t.variant],r===i?o[t.variant]:l)},i.charAt(0).toUpperCase()+i.slice(1)))),e.createElement("div",{className:"mt-4 rounded-md border border-neutral-200 p-4 text-sm"},"Content for ",e.createElement("strong",null,r),"."))}},E=[{id:"1",q:"Is it accessible?",a:"Yes. It follows WAI-ARIA design patterns."},{id:"2",q:"Is it styled?",a:"Yes. Ships with default styles matching the design system."},{id:"3",q:"Is it animated?",a:"Yes. Uses CSS transitions for open/close."}],p={name:"Accordion",args:{type:"single",collapsible:!0},argTypes:{type:{control:"select",options:["single","multiple"],description:"Allow one or many items open at a time"},collapsible:{control:"boolean",description:"Allow collapsing all items when type is single"}},render:t=>{const[r,n]=m.useState(new Set(["1"])),s=a=>{n(o=>{const l=new Set(o);if(l.has(a)){if(t.type==="single"&&!t.collapsible)return o;l.delete(a)}else t.type==="single"&&l.clear(),l.add(a);return l})};return e.createElement("div",{className:"max-w-lg"},E.map(a=>e.createElement("div",{key:a.id,className:"border-b border-neutral-200"},e.createElement("button",{className:"flex w-full items-center justify-between py-4 text-sm font-medium hover:underline",onClick:()=>s(a.id)},a.q,e.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:c("h-4 w-4 transition-transform duration-200",r.has(a.id)&&"rotate-180")},e.createElement("path",{d:"m6 9 6 6 6-6"}))),r.has(a.id)&&e.createElement("p",{className:"pb-4 text-sm text-neutral-500"},a.a))))}},b={name:"Dropdown Menu",args:{triggerLabel:"Options",align:"start"},argTypes:{triggerLabel:{control:"text",description:"Label on the trigger button"},align:{control:"select",options:["start","center","end"],description:"Horizontal alignment of the dropdown panel"}},render:t=>{const[r,n]=m.useState(!1),s={start:"left-0",center:"left-1/2 -translate-x-1/2",end:"right-0"};return e.createElement("div",{className:"relative inline-block"},e.createElement("button",{onClick:()=>n(!r),className:"h-10 rounded-md border border-neutral-200 px-4 text-sm hover:bg-neutral-100"},t.triggerLabel," ▾"),r&&e.createElement(e.Fragment,null,e.createElement("div",{className:"fixed inset-0",onClick:()=>n(!1)}),e.createElement("div",{className:c("absolute z-50 mt-2 min-w-[180px] rounded-md border border-neutral-200 bg-white p-1 shadow-md",s[t.align])},e.createElement("div",{className:"px-2 py-1.5 text-sm font-semibold"},"Account"),e.createElement("div",{className:"-mx-1 my-1 h-px bg-neutral-100"}),["Profile","Settings","Billing"].map(a=>e.createElement("div",{key:a,className:"cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100",onClick:()=>n(!1)},a)),e.createElement("div",{className:"-mx-1 my-1 h-px bg-neutral-100"}),e.createElement("div",{className:"cursor-default rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-neutral-100",onClick:()=>n(!1)},"Log out"))))}},g={name:"Context Menu",render:()=>{const[t,r]=m.useState(null);return e.createElement("div",null,e.createElement("div",{className:"flex h-40 items-center justify-center rounded-md border-2 border-dashed border-neutral-300 text-sm text-neutral-500",onContextMenu:n=>{n.preventDefault(),r({x:n.clientX,y:n.clientY})}},"Right-click here"),t&&e.createElement(e.Fragment,null,e.createElement("div",{className:"fixed inset-0 z-40",onClick:()=>r(null)}),e.createElement("div",{className:"fixed z-50 min-w-[160px] rounded-md border border-neutral-200 bg-white p-1 shadow-md",style:{left:t.x,top:t.y}},["Cut ⌘X","Copy ⌘C","Paste ⌘V"].map(n=>e.createElement("div",{key:n,className:"cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100",onClick:()=>r(null)},n)),e.createElement("div",{className:"-mx-1 my-1 h-px bg-neutral-100"}),e.createElement("div",{className:"cursor-default rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-neutral-100",onClick:()=>r(null)},"Delete"))))}},x={name:"Menubar",render:()=>{const[t,r]=m.useState(null),n={File:["New File","Open...","Save","Exit"],Edit:["Undo","Redo","Cut","Copy","Paste"],View:["Zoom In","Zoom Out","Full Screen"]};return e.createElement("div",{className:"relative flex h-10 items-center space-x-1 rounded-md border border-neutral-200 bg-white p-1"},Object.keys(n).map(s=>e.createElement("div",{key:s,className:"relative"},e.createElement("button",{className:c("rounded-sm px-3 py-1.5 text-sm font-medium hover:bg-neutral-100",t===s&&"bg-neutral-100"),onClick:()=>r(t===s?null:s)},s),t===s&&e.createElement(e.Fragment,null,e.createElement("div",{className:"fixed inset-0 z-40",onClick:()=>r(null)}),e.createElement("div",{className:"absolute left-0 z-50 mt-1 min-w-[160px] rounded-md border border-neutral-200 bg-white p-1 shadow-md"},n[s].map(a=>e.createElement("div",{key:a,className:"cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-neutral-100",onClick:()=>r(null)},a)))))))}},f={name:"Navigation Menu",args:{orientation:"horizontal"},argTypes:{orientation:{control:"select",options:["horizontal","vertical"],description:"Layout direction of navigation links"}},render:t=>{const r=["Home","Products","Pricing","About"],n=t.orientation==="vertical";return e.createElement("nav",{className:c("flex gap-1",n?"flex-col w-48":"flex-row items-center")},r.map(s=>e.createElement("a",{key:s,href:"#",onClick:a=>a.preventDefault(),className:c("inline-flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-neutral-100 transition-colors",n?"justify-start":"justify-center h-10")},s)))}},C=["Home","Components","Navigation","Breadcrumb","Variants","Current"],h={name:"Breadcrumb",args:{items:3,showEllipsis:!1},argTypes:{items:{control:{type:"number",min:3,max:6,step:1},description:"Total number of breadcrumb segments"},showEllipsis:{control:"boolean",description:"Collapse middle items into an ellipsis"}},render:t=>{const r=Math.min(Math.max(t.items,3),6),n=C.slice(0,r),s=()=>{if(t.showEllipsis&&r>3){const a=n[0],o=n[n.length-1],l=n[n.length-2];return e.createElement(e.Fragment,null,e.createElement("li",null,e.createElement("a",{href:"#",onClick:i=>i.preventDefault(),className:"hover:text-black"},a)),e.createElement("li",{className:"text-neutral-300"},"/"),e.createElement("li",{className:"text-neutral-400"},"⋯"),e.createElement("li",{className:"text-neutral-300"},"/"),e.createElement("li",null,e.createElement("a",{href:"#",onClick:i=>i.preventDefault(),className:"hover:text-black"},l)),e.createElement("li",{className:"text-neutral-300"},"/"),e.createElement("li",{className:"text-black font-medium"},o))}return n.map((a,o)=>{const l=o===n.length-1;return e.createElement(e.Fragment,{key:a},o>0&&e.createElement("li",{className:"text-neutral-300"},"/"),e.createElement("li",null,l?e.createElement("span",{className:"text-black font-medium"},a):e.createElement("a",{href:"#",onClick:i=>i.preventDefault(),className:"hover:text-black"},a)))})};return e.createElement("nav",null,e.createElement("ol",{className:"flex items-center gap-1.5 text-sm text-neutral-500"},s()))}},v={name:"Pagination",args:{totalPages:10,currentPage:1,showEdges:!0},argTypes:{totalPages:{control:{type:"number",min:1,max:20,step:1},description:"Total number of pages"},currentPage:{control:{type:"number",min:1,max:20,step:1},description:"Currently active page"},showEdges:{control:"boolean",description:"Show first/last page buttons"}},render:t=>{const[r,n]=m.useState(t.currentPage),s=Math.max(1,t.totalPages),a=Math.min(Math.max(1,r),s),o=()=>{if(s<=7)return Array.from({length:s},(d,k)=>k+1);const l=[];t.showEdges&&l.push(1);let i=Math.max(t.showEdges?2:1,a-1),N=Math.min(t.showEdges?s-1:s,a+1);i>(t.showEdges?2:1)&&l.push("...");for(let d=i;d<=N;d++)l.push(d);return N<(t.showEdges?s-1:s)&&l.push("..."),t.showEdges&&l.push(s),l};return e.createElement("nav",{className:"flex justify-center"},e.createElement("ul",{className:"flex items-center gap-1"},e.createElement("li",null,e.createElement("button",{onClick:()=>n(Math.max(1,a-1)),disabled:a===1,className:"h-10 px-3 rounded-md text-sm hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"},"← Prev")),o().map((l,i)=>l==="..."?e.createElement("li",{key:`ellipsis-${i}`,className:"h-10 w-10 flex items-center justify-center text-sm text-neutral-400"},"⋯"):e.createElement("li",{key:l},e.createElement("button",{onClick:()=>n(l),className:c("h-10 w-10 rounded-md text-sm hover:bg-neutral-100",a===l&&"border border-neutral-200 bg-white font-medium")},l))),e.createElement("li",null,e.createElement("button",{onClick:()=>n(Math.min(s,a+1)),disabled:a===s,className:"h-10 px-3 rounded-md text-sm hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"},"Next →"))))}},w=[{key:"home",label:"Home",icon:"⌂"},{key:"projects",label:"Projects",icon:"▦"},{key:"inbox",label:"Inbox",icon:"✉"},{key:"team",label:"Team",icon:"⚑"},{key:"settings",label:"Settings",icon:"⚙"}],y={name:"Sidebar",args:{collapsed:!1,activeItem:"home"},argTypes:{collapsed:{control:"boolean",description:"Whether the sidebar is collapsed to icon-only mode"},activeItem:{control:"select",options:["home","projects","settings","team","inbox"],description:"Currently active navigation item"}},render:t=>{const[r,n]=m.useState(t.collapsed),[s,a]=m.useState(t.activeItem);return e.createElement("div",{className:"flex h-64 rounded-md border border-neutral-200 overflow-hidden"},e.createElement("aside",{className:c("flex flex-col border-r border-neutral-200 bg-neutral-50 transition-all duration-200",r?"w-14":"w-52")},e.createElement("div",{className:"flex h-10 items-center justify-between border-b border-neutral-200 px-2"},!r&&e.createElement("span",{className:"text-sm font-semibold px-1"},"App"),e.createElement("button",{onClick:()=>n(!r),className:"rounded p-1 hover:bg-neutral-200 text-sm"},"☰")),e.createElement("div",{className:"flex-1 p-2 space-y-0.5"},w.map(o=>e.createElement("button",{key:o.key,onClick:()=>a(o.key),title:r?o.label:void 0,className:c("flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-neutral-200 transition-colors",s===o.key&&"bg-neutral-200 font-medium")},e.createElement("span",null,o.icon),!r&&e.createElement("span",null,o.label))))),e.createElement("div",{className:"flex-1 p-4 text-sm text-neutral-500"},e.createElement("span",{className:"font-medium text-black"},w.find(o=>o.key===s)?.label)," ","content area"))}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};const A=["Tabs","Accordion","DropdownMenu","ContextMenu","Menubar","NavigationMenu","Breadcrumb","Pagination","Sidebar"];export{p as Accordion,h as Breadcrumb,g as ContextMenu,b as DropdownMenu,x as Menubar,f as NavigationMenu,v as Pagination,y as Sidebar,u as Tabs,A as __namedExportsOrder,P as default};
