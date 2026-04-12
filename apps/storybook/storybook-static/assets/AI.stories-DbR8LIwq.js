import{R as e,r as m}from"./iframe-C6JDg_SY.js";import"./preload-helper-PPVm8Dsz.js";const c=(...t)=>t.filter(Boolean).join(" ");function S({showTyping:t=!1,messageCount:n=3}){const a=[{id:"1",r:"assistant",c:"Hello! How can I help?"},{id:"2",r:"user",c:"What is Adhar UI?"},{id:"3",r:"assistant",c:"A framework-agnostic design system with components you own."},{id:"4",r:"user",c:"Which frameworks are supported?"},{id:"5",r:"assistant",c:"React, Vue, Angular, Svelte, and Solid."},{id:"6",r:"user",c:"How do I install it?"},{id:"7",r:"assistant",c:"Run `npx adhar-ui init` to get started."},{id:"8",r:"user",c:"Can I customize the theme?"},{id:"9",r:"assistant",c:"Yes, Adhar UI supports full theming via CSS variables."},{id:"10",r:"user",c:"Thanks!"}],[r,s]=m.useState(a.slice(0,n)),[o,i]=m.useState("");e.useEffect(()=>{s(a.slice(0,n))},[n]);const d=()=>{o.trim()&&(s([...r,{id:Date.now().toString(),r:"user",c:o}]),i(""))};return e.createElement("div",{className:"h-72 max-w-lg rounded-lg border flex flex-col"},e.createElement("div",{className:"flex-1 overflow-y-auto p-4 space-y-3"},r.map(l=>e.createElement("div",{key:l.id,className:c("flex gap-2",l.r==="user"&&"justify-end")},l.r==="assistant"&&e.createElement("div",{className:"h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[9px]"},"AI"),e.createElement("div",{className:c("max-w-[75%] rounded-lg px-3 py-2 text-sm",l.r==="user"?"bg-primary text-primary-foreground":"bg-muted")},l.c))),t&&e.createElement("div",{className:"flex gap-2"},e.createElement("div",{className:"h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[9px]"},"AI"),e.createElement("div",{className:"rounded-lg bg-muted px-3 py-2 text-sm"},e.createElement("span",{className:"flex gap-1"},e.createElement("span",{className:"h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50",style:{animationDelay:"0ms"}}),e.createElement("span",{className:"h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50",style:{animationDelay:"150ms"}}),e.createElement("span",{className:"h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50",style:{animationDelay:"300ms"}}))))),e.createElement("div",{className:"border-t p-3 flex gap-2"},e.createElement("input",{value:o,onChange:l=>i(l.target.value),onKeyDown:l=>l.key==="Enter"&&d(),placeholder:"Message...",className:"flex-1 h-9 rounded-md border px-3 text-sm"}),e.createElement("button",{onClick:d,className:"h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground"},"Send")))}const u={name:"Chat",render:t=>e.createElement(S,{...t}),args:{showTyping:!1,messageCount:3},argTypes:{showTyping:{control:"boolean"},messageCount:{control:{type:"number",min:1,max:10}}}};function w({placeholder:t="Ask anything...",disabled:n=!1,showSendButton:a=!0}){const[r,s]=m.useState("");return e.createElement("div",{className:c("max-w-lg relative rounded-lg border",n&&"opacity-50")},e.createElement("textarea",{value:r,onChange:o=>s(o.target.value),placeholder:t,disabled:n,rows:1,className:"w-full resize-none bg-transparent px-4 py-3 pr-20 text-sm outline-none disabled:cursor-not-allowed",style:{height:Math.min(Math.max(40,r.split(`
`).length*24),200)}}),e.createElement("div",{className:"absolute bottom-2 right-2 flex items-center gap-2"},e.createElement("span",{className:"text-xs text-muted-foreground"},r.length,"/4000"),a&&e.createElement("button",{disabled:!r.trim()||n,className:"h-8 w-8 rounded-md bg-primary text-primary-foreground disabled:opacity-50 flex items-center justify-center text-sm"},"→")))}const p={name:"Prompt Input",render:t=>e.createElement(w,{...t}),args:{placeholder:"Ask anything...",disabled:!1,showSendButton:!0},argTypes:{placeholder:{control:"text"},disabled:{control:"boolean"},showSendButton:{control:"boolean"}}};function k({text:t="Adhar UI is a framework-agnostic design system with production-ready components.",speed:n="normal"}){const[a,r]=m.useState(""),[s,o]=m.useState(!1),i={slow:60,normal:25,fast:8},d=()=>{r(""),o(!0);let l=0;const N=setInterval(()=>{l<t.length?(r(t.slice(0,l+1)),l++):(clearInterval(N),o(!1))},i[n])};return e.createElement("div",{className:"max-w-lg space-y-3"},e.createElement("button",{onClick:d,disabled:s,className:"h-9 rounded-md border px-3 text-sm hover:bg-accent disabled:opacity-50"},"▶ Stream (",n,")"),e.createElement("div",{className:"rounded-md border p-4 min-h-[60px] text-sm"},a,s&&e.createElement("span",{className:"animate-pulse text-primary"},"█"),!s&&!a&&e.createElement("span",{className:"text-muted-foreground"},"Click stream to start.")))}const g={name:"Streaming Text",render:t=>e.createElement(k,{...t}),args:{text:"Adhar UI is a framework-agnostic design system with production-ready components.",speed:"normal"},argTypes:{text:{control:"text"},speed:{control:"select",options:["slow","normal","fast"]}}};function T({language:t="tsx",showLineNumbers:n=!0}){const[a,r]=m.useState(!1),s={tsx:{file:"page.tsx",code:`import { Button } from '@/components/ui/button'

export default function Page() {
  return <Button>Click me</Button>
}`},python:{file:"main.py",code:`from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"hello": "world"}`},go:{file:"main.go",code:`package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}`},bash:{file:"setup.sh",code:`#!/bin/bash
npx adhar-ui init
npx adhar-ui add button
npm run dev`}},{file:o,code:i}=s[t];return e.createElement("div",{className:"max-w-lg rounded-lg border bg-zinc-950 text-zinc-50"},e.createElement("div",{className:"flex items-center justify-between border-b border-zinc-800 px-4 py-2"},e.createElement("span",{className:"text-xs text-zinc-400"},o),e.createElement("button",{onClick:()=>{navigator.clipboard?.writeText(i),r(!0),setTimeout(()=>r(!1),2e3)},className:"text-xs text-zinc-400 hover:text-zinc-200"},a?"✓ Copied":"Copy")),e.createElement("div",{className:"overflow-x-auto p-4"},e.createElement("pre",{className:"text-sm leading-relaxed"},e.createElement("code",null,i.split(`
`).map((d,l)=>e.createElement("div",{key:l,className:"table-row"},n&&e.createElement("span",{className:"table-cell select-none pr-4 text-right text-zinc-600"},l+1),e.createElement("span",{className:"table-cell"},d)))))))}const x={name:"Code Block",render:t=>e.createElement(T,{...t}),args:{language:"tsx",showLineNumbers:!0},argTypes:{language:{control:"select",options:["tsx","python","go","bash"]},showLineNumbers:{control:"boolean"}}};function C({selectedModel:t="claude-3"}){const[n,a]=m.useState(t);e.useEffect(()=>{a(t)},[t]);const r=[{id:"claude-3",name:"Claude 4.6 Opus",provider:"Anthropic"},{id:"gpt-4",name:"GPT-4.1",provider:"OpenAI"},{id:"gemini",name:"Gemini 2.5 Pro",provider:"Google"}];return e.createElement("div",{className:"max-w-[280px] space-y-2"},r.map(s=>e.createElement("label",{key:s.id,onClick:()=>a(s.id),className:c("flex items-center gap-3 rounded-lg border p-3 cursor-pointer",n===s.id?"border-primary ring-1 ring-primary":"hover:bg-accent")},e.createElement("div",{className:c("h-4 w-4 rounded-full border-2",n===s.id?"border-primary bg-primary":"border-muted-foreground/30")}),e.createElement("div",null,e.createElement("p",{className:"text-sm font-medium"},s.name),e.createElement("p",{className:"text-xs text-muted-foreground"},s.provider)))))}const y={name:"Model Selector",render:t=>e.createElement(C,{...t}),args:{selectedModel:"claude-3"},argTypes:{selectedModel:{control:"select",options:["gpt-4","claude-3","gemini"]}}};function I({used:t=3200,max:n=4096}){const a=n>0?t/n:0;return e.createElement("div",{className:"space-y-2 max-w-xs"},e.createElement("div",{className:"flex items-center gap-2"},e.createElement("div",{className:"h-2 flex-1 rounded-full bg-secondary"},e.createElement("div",{className:c("h-full rounded-full transition-all",a>=.8?"bg-destructive":"bg-primary"),style:{width:`${Math.min(a*100,100)}%`}})),e.createElement("span",{className:c("text-xs tabular-nums",a>=.8?"text-destructive":"text-muted-foreground")},t,"/",n)),a>=.8&&e.createElement("p",{className:"text-xs text-destructive"},"Warning: approaching token limit"))}const b={name:"Token Counter",render:t=>e.createElement(I,{...t}),args:{used:3200,max:4096},argTypes:{used:{control:{type:"number",min:0,max:4096}},max:{control:{type:"number",min:1024,max:8192}}}};function B({variant:t="dots"}){return e.createElement("div",{className:"flex items-center gap-2 text-sm text-muted-foreground"},t==="dots"&&e.createElement("div",{className:"flex gap-1"},e.createElement("span",{className:"h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40",style:{animationDelay:"0ms"}}),e.createElement("span",{className:"h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40",style:{animationDelay:"150ms"}}),e.createElement("span",{className:"h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40",style:{animationDelay:"300ms"}})),t==="pulse"&&e.createElement("div",{className:"h-4 w-4 animate-pulse rounded-full bg-primary/50"}),t==="spinner"&&e.createElement("div",{className:"h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary"}),e.createElement("span",null,"Thinking..."))}const f={name:"Thinking Indicator",render:t=>e.createElement(B,{...t}),args:{variant:"dots"},argTypes:{variant:{control:"select",options:["dots","pulse","spinner"]}}};function M({variant:t="thumbs"}){const[n,a]=m.useState(null);if(t==="stars")return e.createElement("div",{className:"flex items-center gap-1"},[1,2,3,4,5].map(r=>e.createElement("button",{key:r,onClick:()=>a(r),className:c("text-lg",n!==null&&r<=n?"text-yellow-500":"text-muted-foreground/30")},"&starf;")),n!==null&&e.createElement("span",{className:"ml-2 text-sm text-muted-foreground"},n,"/5"));if(t==="emoji"){const r=["😠","😕","😐","😊","😍"];return e.createElement("div",{className:"flex items-center gap-1"},r.map((s,o)=>e.createElement("button",{key:o,onClick:()=>a(o),className:c("rounded-md p-1.5 text-lg hover:bg-accent",n===o&&"ring-2 ring-primary")},s)))}return e.createElement("div",{className:"flex items-center gap-1"},e.createElement("button",{onClick:()=>a(n===1?null:1),className:c("rounded-md p-1.5 hover:bg-accent",n===1&&"text-green-500")},"👍"),e.createElement("button",{onClick:()=>a(n===0?null:0),className:c("rounded-md p-1.5 hover:bg-accent",n===0&&"text-red-500")},"👎"),n!==null&&e.createElement("span",{className:"ml-2 text-sm text-muted-foreground"},n===1?"Thanks!":"We'll improve"))}const h={name:"Feedback Buttons",render:t=>e.createElement(M,{...t}),args:{variant:"thumbs"},argTypes:{variant:{control:"select",options:["thumbs","stars","emoji"]}}};function A({chips:t=5}){const a=["Explain code","Write tests","Refactor","Add types","Optimize","Debug","Document","Translate"].slice(0,t),[r,s]=m.useState(null);return e.createElement("div",{className:"space-y-3"},e.createElement("div",{className:"flex flex-wrap gap-2"},a.map(o=>e.createElement("button",{key:o,onClick:()=>s(o),className:c("rounded-full border px-3 py-1.5 text-sm",r===o?"bg-primary text-primary-foreground border-primary":"hover:bg-accent")},o))),r&&e.createElement("p",{className:"text-sm"},"Selected: ",e.createElement("strong",null,r)))}const E={name:"Suggestion Chips",render:t=>e.createElement(A,{...t}),args:{chips:5},argTypes:{chips:{control:{type:"number",min:3,max:8}}}};function j({role:t="assistant",content:n="Run `adhar-ui add button` to copy the component to your project."}){return e.createElement("div",{className:c("max-w-lg flex gap-3",t==="user"&&"flex-row-reverse")},e.createElement("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium"},t==="user"?"You":"AI"),e.createElement("div",{className:c("flex max-w-[75%] flex-col gap-1",t==="user"&&"items-end")},e.createElement("div",{className:c("rounded-lg px-4 py-2 text-sm",t==="user"?"bg-primary text-primary-foreground":"bg-muted")},n),e.createElement("time",{className:"text-[10px] text-muted-foreground"},"10:30 AM")))}const v={name:"Message Bubble",render:t=>e.createElement(j,{...t}),args:{role:"assistant",content:"Run `adhar-ui add button` to copy the component to your project."},argTypes:{role:{control:"select",options:["user","assistant"]},content:{control:"text"}}},D={title:"Components/AI"};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Chat',
  render: args => <Chat {...args} />,
  args: {
    showTyping: false,
    messageCount: 3
  },
  argTypes: {
    showTyping: {
      control: 'boolean'
    },
    messageCount: {
      control: {
        type: 'number',
        min: 1,
        max: 10
      }
    }
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Prompt Input',
  render: args => <PromptInput {...args} />,
  args: {
    placeholder: 'Ask anything...',
    disabled: false,
    showSendButton: true
  },
  argTypes: {
    placeholder: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    showSendButton: {
      control: 'boolean'
    }
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Streaming Text',
  render: args => <StreamingText {...args} />,
  args: {
    text: 'Adhar UI is a framework-agnostic design system with production-ready components.',
    speed: 'normal'
  },
  argTypes: {
    text: {
      control: 'text'
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast']
    }
  }
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Code Block',
  render: args => <CodeBlock {...args} />,
  args: {
    language: 'tsx',
    showLineNumbers: true
  },
  argTypes: {
    language: {
      control: 'select',
      options: ['tsx', 'python', 'go', 'bash']
    },
    showLineNumbers: {
      control: 'boolean'
    }
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Model Selector',
  render: args => <ModelSelector {...args} />,
  args: {
    selectedModel: 'claude-3'
  },
  argTypes: {
    selectedModel: {
      control: 'select',
      options: ['gpt-4', 'claude-3', 'gemini']
    }
  }
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Token Counter',
  render: args => <TokenCounter {...args} />,
  args: {
    used: 3200,
    max: 4096
  },
  argTypes: {
    used: {
      control: {
        type: 'number',
        min: 0,
        max: 4096
      }
    },
    max: {
      control: {
        type: 'number',
        min: 1024,
        max: 8192
      }
    }
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Thinking Indicator',
  render: args => <ThinkingIndicator {...args} />,
  args: {
    variant: 'dots'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dots', 'pulse', 'spinner']
    }
  }
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Feedback Buttons',
  render: args => <FeedbackButtons {...args} />,
  args: {
    variant: 'thumbs'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['thumbs', 'stars', 'emoji']
    }
  }
}`,...h.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Suggestion Chips',
  render: args => <SuggestionChips {...args} />,
  args: {
    chips: 5
  },
  argTypes: {
    chips: {
      control: {
        type: 'number',
        min: 3,
        max: 8
      }
    }
  }
}`,...E.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Message Bubble',
  render: args => <MessageBubble {...args} />,
  args: {
    role: 'assistant',
    content: 'Run \`adhar-ui add button\` to copy the component to your project.'
  },
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'assistant']
    },
    content: {
      control: 'text'
    }
  }
}`,...v.parameters?.docs?.source}}};const F=["ChatStory","PromptInputStory","StreamingTextStory","CodeBlockStory","ModelSelectorStory","TokenCounterStory","ThinkingIndicatorStory","FeedbackButtonsStory","SuggestionChipsStory","MessageBubbleStory"];export{u as ChatStory,x as CodeBlockStory,h as FeedbackButtonsStory,v as MessageBubbleStory,y as ModelSelectorStory,p as PromptInputStory,g as StreamingTextStory,E as SuggestionChipsStory,f as ThinkingIndicatorStory,b as TokenCounterStory,F as __namedExportsOrder,D as default};
