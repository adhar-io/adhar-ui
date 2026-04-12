import{R as e,r as d}from"./iframe-C6JDg_SY.js";import"./preload-helper-PPVm8Dsz.js";const o=(...t)=>t.filter(Boolean).join(" ");function P({rows:t=5,showCheckbox:a=!0,striped:r=!1}){const[n,l]=d.useState(""),c=[{n:"Ken",e:"ken@co.com",st:"Active",a:"$316"},{n:"Abe",e:"abe@co.com",st:"Inactive",a:"$242"},{n:"Monty",e:"monty@co.com",st:"Active",a:"$837"},{n:"Diana",e:"diana@co.com",st:"Active",a:"$524"},{n:"Eric",e:"eric@co.com",st:"Inactive",a:"$190"},{n:"Fiona",e:"fiona@co.com",st:"Active",a:"$610"},{n:"Greg",e:"greg@co.com",st:"Active",a:"$475"},{n:"Hana",e:"hana@co.com",st:"Inactive",a:"$320"},{n:"Ivan",e:"ivan@co.com",st:"Active",a:"$700"},{n:"Jade",e:"jade@co.com",st:"Active",a:"$280"}].slice(0,t).filter(m=>m.n.toLowerCase().includes(n.toLowerCase()));return e.createElement("div",{className:"space-y-3"},e.createElement("input",{value:n,onChange:m=>l(m.target.value),placeholder:"Filter...",className:"max-w-sm h-9 rounded-md border px-3 text-sm"}),e.createElement("div",{className:"rounded-md border"},e.createElement("table",{className:"w-full text-sm"},e.createElement("thead",null,e.createElement("tr",{className:"border-b"},a&&e.createElement("th",{className:"h-10 px-4 text-left text-muted-foreground w-8"},e.createElement("input",{type:"checkbox",className:"h-4 w-4 accent-primary"})),e.createElement("th",{className:"h-10 px-4 text-left text-muted-foreground"},"Name"),e.createElement("th",{className:"h-10 px-4 text-left text-muted-foreground"},"Email"),e.createElement("th",{className:"h-10 px-4 text-left text-muted-foreground"},"Status"),e.createElement("th",{className:"h-10 px-4 text-right text-muted-foreground"},"Amount"))),e.createElement("tbody",null,c.map((m,M)=>e.createElement("tr",{key:m.e,className:o("border-b hover:bg-muted/50",r&&M%2===1&&"bg-muted/30")},a&&e.createElement("td",{className:"p-4"},e.createElement("input",{type:"checkbox",className:"h-4 w-4 accent-primary"})),e.createElement("td",{className:"p-4 font-medium"},m.n),e.createElement("td",{className:"p-4"},m.e),e.createElement("td",{className:"p-4"},e.createElement("span",{className:o("rounded-full px-2 py-0.5 text-xs font-semibold",m.st==="Active"?"bg-green-100 text-green-700":"bg-red-100 text-red-700")},m.st)),e.createElement("td",{className:"p-4 text-right"},m.a)))))),e.createElement("div",{className:"flex justify-end gap-1"},e.createElement("button",{className:"h-8 px-3 rounded-md border text-xs",disabled:!0},"Prev"),e.createElement("button",{className:"h-8 px-3 rounded-md border text-xs"},"Next")))}const i={name:"Data Table",render:t=>e.createElement(P,{...t}),args:{rows:5,showCheckbox:!0,striped:!1},argTypes:{rows:{control:{type:"number",min:1,max:10}},showCheckbox:{control:"boolean"},striped:{control:"boolean"}}};function j({disabled:t=!1}){return e.createElement("div",{className:o("rounded-md border overflow-auto",t&&"opacity-50 pointer-events-none")},e.createElement("table",{className:"w-full text-sm"},e.createElement("thead",{className:"bg-muted/50"},e.createElement("tr",null,["ID","Name","Email","Dept"].map(a=>e.createElement("th",{key:a,className:"h-10 px-3 text-left text-xs font-medium text-muted-foreground cursor-pointer hover:bg-muted"},a," &updownarrow;")))),e.createElement("tbody",null,[["1","Alice","alice@co.com","Eng"],["2","Bob","bob@co.com","Design"],["3","Carol","carol@co.com","Product"]].map(a=>e.createElement("tr",{key:a[0],className:"border-t hover:bg-muted/30"},a.map((r,n)=>e.createElement("td",{key:n,className:"px-3 py-2"},r)))))))}const p={name:"Data Grid",render:t=>e.createElement(j,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function $({disabled:t=!1}){const[a,r]=d.useState("");return e.createElement("div",{className:o("max-w-sm rounded-md border",t&&"opacity-50 pointer-events-none")},e.createElement("div",{className:"border-b p-2"},e.createElement("input",{placeholder:"Search...",className:"h-8 w-full rounded-md border px-2 text-sm"})),["Project Alpha","Project Beta","Project Gamma"].map(n=>e.createElement("div",{key:n,onClick:()=>r(n),className:o("border-b px-4 py-3 text-sm cursor-pointer hover:bg-accent",a===n&&"bg-accent font-medium")},n)))}const u={name:"List View",render:t=>e.createElement($,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function U({disabled:t=!1}){return e.createElement("div",{className:o("grid gap-3 grid-cols-3 max-w-md",t&&"opacity-50 pointer-events-none")},["Alpha","Beta","Gamma","Delta","Epsilon","Zeta"].map(a=>e.createElement("div",{key:a,className:"rounded-lg border p-4 text-center hover:shadow-md cursor-pointer"},e.createElement("div",{className:"mx-auto mb-2 h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold text-muted-foreground"},a[0]),e.createElement("p",{className:"text-sm font-medium"},a))))}const g={name:"Grid View",render:t=>e.createElement(U,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function z({disabled:t=!1}){return e.createElement("div",{className:o("max-w-md",t&&"opacity-50 pointer-events-none")},e.createElement("div",{className:"flex items-center justify-between mb-4"},e.createElement("h2",{className:"text-lg font-semibold"},"Project Alpha"),e.createElement("span",{className:"rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold"},"Active")),e.createElement("div",{className:"rounded-lg border"},e.createElement("div",{className:"grid grid-cols-2 gap-px bg-border"},[["Owner","John Doe"],["Budget","$50,000"],["Priority","High"],["Sprint","14"]].map(([a,r])=>e.createElement("div",{key:a,className:"bg-card px-4 py-3"},e.createElement("dt",{className:"text-xs text-muted-foreground"},a),e.createElement("dd",{className:"mt-1 text-sm font-medium"},r))))))}const b={name:"Detail View",render:t=>e.createElement(z,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function _({disabled:t=!1}){const[a,r]=d.useState("Alpha");return e.createElement("div",{className:o("flex h-48 rounded-md border overflow-hidden",t&&"opacity-50 pointer-events-none")},e.createElement("div",{className:"w-40 border-r"},["Alpha","Beta","Gamma"].map(n=>e.createElement("div",{key:n,onClick:()=>r(n),className:o("border-b px-4 py-3 text-sm cursor-pointer hover:bg-accent",a===n&&"bg-accent font-medium")},n))),e.createElement("div",{className:"flex-1 p-4"},e.createElement("h3",{className:"text-sm font-semibold"},a),e.createElement("p",{className:"mt-2 text-sm text-muted-foreground"},"Details for ",a)))}const x={name:"Master Detail",render:t=>e.createElement(_,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function O({disabled:t=!1}){return e.createElement("form",{className:o("max-w-sm space-y-3",t&&"opacity-50 pointer-events-none"),onSubmit:a=>a.preventDefault()},e.createElement("p",{className:"text-xs text-muted-foreground"},"Schema-driven form"),e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-sm font-medium"},"Name *"),e.createElement("input",{className:"h-10 w-full rounded-md border px-3 text-sm"})),e.createElement("div",{className:"space-y-1"},e.createElement("label",{className:"text-sm font-medium"},"Role"),e.createElement("select",{className:"h-10 w-full rounded-md border px-3 text-sm"},e.createElement("option",null,"Admin"),e.createElement("option",null,"User"))),e.createElement("button",{className:"h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground"},"Create"))}const f={name:"Form Builder",render:t=>e.createElement(O,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function H({multiple:t=!1,accept:a="*"}){const[r,n]=d.useState([]);return e.createElement("div",{className:"max-w-sm space-y-3"},e.createElement("label",{className:"flex flex-col items-center rounded-lg border-2 border-dashed p-8 text-center cursor-pointer hover:border-muted-foreground/50"},e.createElement("p",{className:"text-sm font-medium"},"Drag & drop files"),e.createElement("p",{className:"text-xs text-muted-foreground mt-1"},t?"Multiple files allowed":"Single file only"," · ",a),e.createElement("input",{type:"file",className:"hidden",multiple:t,accept:a,onChange:l=>{const s=Array.from(l.target.files||[]).map(c=>c.name);n(t?[...r,...s]:s)}})),r.length>0&&e.createElement("div",{className:"space-y-1"},r.map((l,s)=>e.createElement("div",{key:s,className:"flex items-center justify-between rounded-md border px-3 py-2 text-sm"},e.createElement("span",null,l),e.createElement("button",{onClick:()=>n(r.filter((c,m)=>m!==s)),className:"text-xs text-muted-foreground hover:text-destructive"},"×")))))}const y={name:"File Upload",render:t=>e.createElement(H,{...t}),args:{multiple:!1,accept:"*"},argTypes:{multiple:{control:"boolean"},accept:{control:"text"}}};function J({disabled:t=!1}){return e.createElement("div",{className:o("rounded-md border max-w-md",t&&"opacity-50 pointer-events-none")},e.createElement("div",{className:"flex gap-1 border-b p-1"},["B","I","U","H2","•","1.","“","<>"].map(a=>e.createElement("button",{key:a,className:"rounded px-2 py-1 text-sm hover:bg-accent"},a))),e.createElement("div",{className:"min-h-[100px] p-4 text-sm",contentEditable:!t,suppressContentEditableWarning:!0},e.createElement("p",null,"Start writing...")))}const E={name:"Rich Text Editor",render:t=>e.createElement(J,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function W({columns:t=3}){const r=[{t:"To Do",c:["Design UI","Write docs"]},{t:"In Progress",c:["Build components"]},{t:"Review",c:["Code review","QA testing"]},{t:"Done",c:["Setup repo"]},{t:"Archived",c:["Old task"]}].slice(0,t);return e.createElement("div",{className:"flex gap-3 overflow-x-auto"},r.map(n=>e.createElement("div",{key:n.t,className:"w-44 shrink-0 rounded-lg bg-muted/50 p-2"},e.createElement("h3",{className:"mb-2 px-2 text-xs font-semibold"},n.t," ",e.createElement("span",{className:"text-muted-foreground"},"(",n.c.length,")")),e.createElement("div",{className:"space-y-2"},n.c.map(l=>e.createElement("div",{key:l,className:"rounded-md border bg-card p-2 text-xs shadow-sm"},l))))))}const N={name:"Kanban Board",render:t=>e.createElement(W,{...t}),args:{columns:3},argTypes:{columns:{control:{type:"number",min:2,max:5}}}};function Q({items:t=3,variant:a="default"}){const r=[{t:"Submitted",c:"bg-green-500"},{t:"In Review",c:"bg-blue-500"},{t:"Approved",c:"bg-green-500"},{t:"Building",c:"bg-yellow-500"},{t:"Deployed",c:"bg-green-500"},{t:"Monitoring",c:"bg-blue-500"},{t:"Completed",c:"bg-green-500"},{t:"Archived",c:"bg-muted-foreground"}].slice(0,t);return a==="alternating"?e.createElement("div",{className:"relative max-w-md mx-auto"},e.createElement("div",{className:"absolute left-1/2 top-0 bottom-0 w-px bg-muted-foreground/20"}),r.map((n,l)=>e.createElement("div",{key:l,className:o("mb-6 flex items-center gap-4",l%2===0?"flex-row":"flex-row-reverse")},e.createElement("div",{className:"flex-1 text-right"},l%2===0&&e.createElement("div",{className:"rounded-md border p-2 text-sm"},n.t)),e.createElement("div",{className:o("h-3 w-3 rounded-full border-2 border-background shrink-0 z-10",n.c)}),e.createElement("div",{className:"flex-1"},l%2!==0&&e.createElement("div",{className:"rounded-md border p-2 text-sm"},n.t))))):e.createElement("ol",{className:"relative border-l border-muted-foreground/20 ml-3"},r.map((n,l)=>e.createElement("li",{key:l,className:"mb-6 ml-6"},e.createElement("div",{className:o("absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-background",n.c)}),e.createElement("h3",{className:"text-sm font-semibold"},n.t))))}const v={name:"Timeline",render:t=>e.createElement(Q,{...t}),args:{items:3,variant:"default"},argTypes:{items:{control:{type:"number",min:3,max:8}},variant:{control:"select",options:["default","alternating"]}}};function Z({expanded:t=!0}){const[a,r]=d.useState(t?new Set(["src","components"]):new Set);e.useEffect(()=>{r(t?new Set(["src","components"]):new Set)},[t]);const n=s=>{const c=new Set(a);c.has(s)?c.delete(s):c.add(s),r(c)},l=[{id:"src",l:"src",ch:[{id:"components",l:"components",ch:[{id:"button",l:"button.tsx"},{id:"input",l:"input.tsx"}]},{id:"app",l:"app.tsx"}]},{id:"pkg",l:"package.json"}];return e.createElement("div",{className:"max-w-xs rounded-md border p-2"},l.map(function s(c,m=0){return e.createElement("div",{key:c.id},e.createElement("button",{onClick:()=>c.ch&&n(c.id),className:"flex w-full items-center gap-1.5 rounded-sm px-2 py-1 text-sm hover:bg-accent",style:{paddingLeft:m*16+8}},c.ch?e.createElement("span",{className:o("text-xs transition-transform",a.has(c.id)&&"rotate-90")},"&blacktriangleright;"):e.createElement("span",{className:"w-3"}),c.l),c.ch&&a.has(c.id)&&c.ch.map(M=>s(M,m+1)))}))}const S={name:"Tree View",render:t=>e.createElement(Z,{...t}),args:{expanded:!0},argTypes:{expanded:{control:"boolean"}}};function q({steps:t=3,currentStep:a=1}){const n=["Account","Profile","Review","Confirm","Payment","Done"].slice(0,t);return e.createElement("div",{className:"flex items-center gap-2 max-w-lg"},n.map((l,s)=>e.createElement(e.Fragment,{key:l},e.createElement("div",{className:"flex items-center gap-1.5"},e.createElement("div",{className:o("flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-medium",s<a?"border-primary bg-primary text-primary-foreground":s===a?"border-primary text-primary":"border-muted-foreground/30 text-muted-foreground")},s<a?"✓":s+1),e.createElement("span",{className:o("text-xs",s<=a?"font-medium":"text-muted-foreground")},l)),s<n.length-1&&e.createElement("div",{className:o("h-0.5 flex-1",s<a?"bg-primary":"bg-muted")}))))}const h={name:"Stepper",render:t=>e.createElement(q,{...t}),args:{steps:3,currentStep:1},argTypes:{steps:{control:{type:"number",min:3,max:6}},currentStep:{control:{type:"number",min:0,max:5}}}};function X({maxItems:t=5}){const[a,r]=d.useState(["react"]),n=["react","vue","angular","svelte","solid","preact","lit"],l=a.length<t;return e.createElement("div",{className:"max-w-sm"},e.createElement("div",{className:"flex flex-wrap items-center gap-1 rounded-md border px-3 py-2"},a.map(s=>e.createElement("span",{key:s,className:"inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs"},s,e.createElement("button",{onClick:()=>r(a.filter(c=>c!==s))},"×")))),e.createElement("p",{className:"mt-1 text-xs text-muted-foreground"},a.length,"/",t," selected"),e.createElement("div",{className:"mt-2 flex flex-wrap gap-1"},n.filter(s=>!a.includes(s)).map(s=>e.createElement("button",{key:s,onClick:()=>l&&r([...a,s]),disabled:!l,className:o("rounded-full border px-2 py-0.5 text-xs hover:bg-accent",!l&&"opacity-50 cursor-not-allowed")},"+ ",s))))}const w={name:"Multi Select",render:t=>e.createElement(X,{...t}),args:{maxItems:5},argTypes:{maxItems:{control:{type:"number",min:1,max:7}}}};function Y({disabled:t=!1}){const[a,r]=d.useState(["react","tailwind"]),[n,l]=d.useState("");return e.createElement("div",{className:o("max-w-sm",t&&"opacity-50 pointer-events-none")},e.createElement("div",{className:"flex flex-wrap items-center gap-1 rounded-md border px-3 py-2"},a.map(s=>e.createElement("span",{key:s,className:"inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs"},s,e.createElement("button",{onClick:()=>r(a.filter(c=>c!==s))},"×"))),e.createElement("input",{value:n,onChange:s=>l(s.target.value),onKeyDown:s=>{s.key==="Enter"&&n.trim()&&(r([...a,n.trim()]),l(""))},placeholder:"Add...",className:"flex-1 min-w-[60px] bg-transparent outline-none text-sm"})))}const T={name:"Tag Input",render:t=>e.createElement(Y,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function ee({disabled:t=!1}){return e.createElement("div",{className:o("flex items-center gap-2 max-w-md",t&&"opacity-50 pointer-events-none")},e.createElement("div",{className:"flex-1 rounded-md border"},e.createElement("div",{className:"border-b p-2 text-sm font-medium"},"Available"),e.createElement("div",{className:"p-1"},["Item A","Item B","Item C"].map(a=>e.createElement("label",{key:a,className:"flex items-center gap-2 px-2 py-1 text-sm hover:bg-accent"},e.createElement("input",{type:"checkbox",className:"h-3 w-3 accent-primary"}),a)))),e.createElement("div",{className:"flex flex-col gap-1"},e.createElement("button",{className:"h-8 w-8 rounded-md border text-sm hover:bg-accent"},"→"),e.createElement("button",{className:"h-8 w-8 rounded-md border text-sm hover:bg-accent"},"←")),e.createElement("div",{className:"flex-1 rounded-md border"},e.createElement("div",{className:"border-b p-2 text-sm font-medium"},"Selected"),e.createElement("div",{className:"p-1"},e.createElement("label",{className:"flex items-center gap-2 px-2 py-1 text-sm hover:bg-accent"},e.createElement("input",{type:"checkbox",className:"h-3 w-3 accent-primary"}),"Item D"))))}const C={name:"Transfer List",render:t=>e.createElement(ee,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function te({disabled:t=!1}){return e.createElement("div",{className:o("max-w-sm space-y-1",t&&"opacity-50 pointer-events-none")},["First","Second","Third","Fourth"].map((a,r)=>e.createElement("div",{key:a,className:"flex items-center gap-2 rounded-md border bg-card p-3 text-sm cursor-grab"},e.createElement("span",{className:"text-muted-foreground"},"&Colon;&Colon;"),e.createElement("span",{className:"flex-1"},a),e.createElement("span",{className:"text-xs text-muted-foreground rounded-full bg-muted px-2 py-0.5"},"#",r+1))))}const k={name:"Sortable List",render:t=>e.createElement(te,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function ae({disabled:t=!1}){return e.createElement("div",{className:o("divide-y rounded-lg border max-w-sm",t&&"opacity-50")},[["Name","Adhar UI"],["Version","0.1.0"],["License","Apache 2.0"]].map(([a,r])=>e.createElement("div",{key:a,className:"flex justify-between px-4 py-3"},e.createElement("dt",{className:"text-sm text-muted-foreground"},a),e.createElement("dd",{className:"text-sm font-medium"},r))))}const D={name:"Property List",render:t=>e.createElement(ae,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function re({disabled:t=!1}){return e.createElement("dl",{className:o("grid gap-3 sm:grid-cols-[auto_1fr] max-w-sm",t&&"opacity-50")},[["Name","John Doe"],["Email","john@co.com"],["Role","Admin"]].map(([a,r])=>e.createElement(e.Fragment,{key:a},e.createElement("dt",{className:"text-sm font-medium text-muted-foreground"},a),e.createElement("dd",{className:"text-sm"},r))))}const L={name:"Description List",render:t=>e.createElement(re,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function ne({title:t="No items",icon:a="inbox"}){const r={inbox:"📥",search:"🔍",error:"⚠️"};return e.createElement("div",{className:"flex flex-col items-center rounded-lg border border-dashed p-8 text-center"},e.createElement("span",{className:"text-3xl mb-2"},r[a]),e.createElement("h3",{className:"text-lg font-semibold"},t),e.createElement("p",{className:"mt-2 text-sm text-muted-foreground"},"Get started by creating your first item."),e.createElement("button",{className:"mt-4 h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground"},"Create"))}const B={name:"Empty State",render:t=>e.createElement(ne,{...t}),args:{title:"No items",icon:"inbox"},argTypes:{title:{control:"text"},icon:{control:"select",options:["inbox","search","error"]}}};function se({value:t="$45K",label:a="Revenue",trend:r="up"}){return e.createElement("div",{className:"rounded-lg border p-4 max-w-[200px]"},e.createElement("p",{className:"text-sm text-muted-foreground"},a),e.createElement("p",{className:"text-2xl font-bold mt-1"},t),e.createElement("p",{className:o("text-xs font-medium",r==="up"?"text-green-600":r==="down"?"text-red-600":"text-muted-foreground")},r==="up"?"↑ +20%":r==="down"?"↓ -4%":"↔ 0%"))}const A={name:"Stat Card",render:t=>e.createElement(se,{...t}),args:{value:"$45K",label:"Revenue",trend:"up"},argTypes:{value:{control:"text"},label:{control:"text"},trend:{control:"select",options:["up","down","neutral"]}}};function oe({disabled:t=!1}){return e.createElement("div",{className:o("space-y-2",t&&"opacity-50")},[["⌘","K","Command palette"],["Ctrl","S","Save"],["Esc","","Close"]].map(([a,r,n])=>e.createElement("div",{key:n,className:"flex items-center gap-2"},e.createElement("kbd",{className:"h-5 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground"},a),r&&e.createElement("kbd",{className:"h-5 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground"},r),e.createElement("span",{className:"text-sm text-muted-foreground"},n))))}const I={name:"Kbd",render:t=>e.createElement(oe,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function le({disabled:t=!1}){const[a,r]=d.useState(!1);return e.createElement("div",{className:o("flex items-center gap-2",t&&"opacity-50 pointer-events-none")},e.createElement("code",{className:"rounded bg-muted px-2 py-1 text-sm font-mono"},"adhar-ui add button"),e.createElement("button",{onClick:()=>{navigator.clipboard?.writeText("adhar-ui add button"),r(!0),setTimeout(()=>r(!1),2e3)},className:"rounded-md p-2 hover:bg-accent"},a?e.createElement("span",{className:"text-green-500 text-sm"},"&check;"):"📋"))}const V={name:"Copy Button",render:t=>e.createElement(le,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function ce({disabled:t=!1}){const[a,r]=d.useState(!1);return e.createElement("div",{className:o(t&&"opacity-50 pointer-events-none")},e.createElement("button",{onClick:()=>r(!a),className:"inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"},"\\u2318K Search"),a&&e.createElement("div",{className:"mt-2 w-64 rounded-md border bg-popover shadow-md p-1"},e.createElement("input",{placeholder:"Command...",className:"h-9 w-full bg-transparent px-2 text-sm outline-none",autoFocus:!0}),["Open file","Run command","Search"].map(n=>e.createElement("div",{key:n,className:"rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default",onClick:()=>r(!1)},n))))}const F={name:"Command Bar",render:t=>e.createElement(ce,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function me({disabled:t=!1}){return e.createElement("div",{className:o("w-72 rounded-lg border shadow-md",t&&"opacity-50 pointer-events-none")},e.createElement("div",{className:"flex items-center justify-between border-b px-4 py-3"},e.createElement("h4",{className:"text-sm font-semibold"},"Notifications"),e.createElement("span",{className:"rounded-full bg-primary px-1.5 text-xs text-primary-foreground"},"3")),e.createElement("div",{className:"divide-y"},[{t:"New comment",d:"5m ago",u:!0},{t:"Build passed",d:"1h ago",u:!0},{t:"Mention",d:"3h ago",u:!1}].map(a=>e.createElement("div",{key:a.t,className:o("px-4 py-3",a.u&&"bg-accent/40")},e.createElement("p",{className:o("text-sm",a.u&&"font-medium")},a.t),e.createElement("p",{className:"text-xs text-muted-foreground"},a.d)))))}const R={name:"Notification Center",render:t=>e.createElement(me,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function de({disabled:t=!1}){const[a,r]=d.useState(5);return e.createElement("div",{className:o("max-w-xs space-y-2",t&&"opacity-50 pointer-events-none")},Array.from({length:a},(n,l)=>e.createElement("div",{key:l,className:"rounded-md border p-3 text-sm"},"Item ",l+1)),a<15&&e.createElement("button",{onClick:()=>r(a+5),className:"w-full rounded-md border py-2 text-sm hover:bg-accent"},"Load more"))}const K={name:"Infinite Scroll",render:t=>e.createElement(de,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}};function ie({disabled:t=!1}){return e.createElement("div",{className:o("h-48 w-56 overflow-auto rounded-md border",t&&"opacity-50 pointer-events-none")},Array.from({length:100},(a,r)=>e.createElement("div",{key:r,className:"border-b px-4 py-2 text-sm"},"Row ",r+1)))}const G={name:"Virtualized List",render:t=>e.createElement(ie,{...t}),args:{disabled:!1},argTypes:{disabled:{control:"boolean"}}},ge={title:"Components/Enterprise"};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Data Table',
  render: args => <DataTable {...args} />,
  args: {
    rows: 5,
    showCheckbox: true,
    striped: false
  },
  argTypes: {
    rows: {
      control: {
        type: 'number',
        min: 1,
        max: 10
      }
    },
    showCheckbox: {
      control: 'boolean'
    },
    striped: {
      control: 'boolean'
    }
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Data Grid',
  render: args => <DataGrid {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'List View',
  render: args => <ListView {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Grid View',
  render: args => <GridView {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Detail View',
  render: args => <DetailView {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Master Detail',
  render: args => <MasterDetail {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Form Builder',
  render: args => <FormBuilder {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'File Upload',
  render: args => <FileUpload {...args} />,
  args: {
    multiple: false,
    accept: '*'
  },
  argTypes: {
    multiple: {
      control: 'boolean'
    },
    accept: {
      control: 'text'
    }
  }
}`,...y.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Rich Text Editor',
  render: args => <RichTextEditor {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...E.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Kanban Board',
  render: args => <KanbanBoard {...args} />,
  args: {
    columns: 3
  },
  argTypes: {
    columns: {
      control: {
        type: 'number',
        min: 2,
        max: 5
      }
    }
  }
}`,...N.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Timeline',
  render: args => <Timeline {...args} />,
  args: {
    items: 3,
    variant: 'default'
  },
  argTypes: {
    items: {
      control: {
        type: 'number',
        min: 3,
        max: 8
      }
    },
    variant: {
      control: 'select',
      options: ['default', 'alternating']
    }
  }
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Tree View',
  render: args => <TreeView {...args} />,
  args: {
    expanded: true
  },
  argTypes: {
    expanded: {
      control: 'boolean'
    }
  }
}`,...S.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Stepper',
  render: args => <Stepper {...args} />,
  args: {
    steps: 3,
    currentStep: 1
  },
  argTypes: {
    steps: {
      control: {
        type: 'number',
        min: 3,
        max: 6
      }
    },
    currentStep: {
      control: {
        type: 'number',
        min: 0,
        max: 5
      }
    }
  }
}`,...h.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Multi Select',
  render: args => <MultiSelect {...args} />,
  args: {
    maxItems: 5
  },
  argTypes: {
    maxItems: {
      control: {
        type: 'number',
        min: 1,
        max: 7
      }
    }
  }
}`,...w.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Tag Input',
  render: args => <TagInput {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...T.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Transfer List',
  render: args => <TransferList {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...C.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Sortable List',
  render: args => <SortableList {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...k.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Property List',
  render: args => <PropertyList {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...D.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Description List',
  render: args => <DescriptionList {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...L.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Empty State',
  render: args => <EmptyState {...args} />,
  args: {
    title: 'No items',
    icon: 'inbox'
  },
  argTypes: {
    title: {
      control: 'text'
    },
    icon: {
      control: 'select',
      options: ['inbox', 'search', 'error']
    }
  }
}`,...B.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Stat Card',
  render: args => <StatCard {...args} />,
  args: {
    value: '$45K',
    label: 'Revenue',
    trend: 'up'
  },
  argTypes: {
    value: {
      control: 'text'
    },
    label: {
      control: 'text'
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral']
    }
  }
}`,...A.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Kbd',
  render: args => <Kbd {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...I.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Copy Button',
  render: args => <CopyButton {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...V.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Command Bar',
  render: args => <CommandBar {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...F.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Notification Center',
  render: args => <NotificationCenter {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...R.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Infinite Scroll',
  render: args => <InfiniteScroll {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...K.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Virtualized List',
  render: args => <VirtualizedList {...args} />,
  args: {
    disabled: false
  },
  argTypes: {
    disabled: {
      control: 'boolean'
    }
  }
}`,...G.parameters?.docs?.source}}};const be=["DataTableStory","DataGridStory","ListViewStory","GridViewStory","DetailViewStory","MasterDetailStory","FormBuilderStory","FileUploadStory","RichTextEditorStory","KanbanBoardStory","TimelineStory","TreeViewStory","StepperStory","MultiSelectStory","TagInputStory","TransferListStory","SortableListStory","PropertyListStory","DescriptionListStory","EmptyStateStory","StatCardStory","KbdStory","CopyButtonStory","CommandBarStory","NotificationCenterStory","InfiniteScrollStory","VirtualizedListStory"];export{F as CommandBarStory,V as CopyButtonStory,p as DataGridStory,i as DataTableStory,L as DescriptionListStory,b as DetailViewStory,B as EmptyStateStory,y as FileUploadStory,f as FormBuilderStory,g as GridViewStory,K as InfiniteScrollStory,N as KanbanBoardStory,I as KbdStory,u as ListViewStory,x as MasterDetailStory,w as MultiSelectStory,R as NotificationCenterStory,D as PropertyListStory,E as RichTextEditorStory,k as SortableListStory,A as StatCardStory,h as StepperStory,T as TagInputStory,v as TimelineStory,C as TransferListStory,S as TreeViewStory,G as VirtualizedListStory,be as __namedExportsOrder,ge as default};
