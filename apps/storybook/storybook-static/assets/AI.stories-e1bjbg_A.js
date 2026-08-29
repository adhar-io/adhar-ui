import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{n}from"./iframe-BvQCw4VR.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";function i({showTyping:e=!1,messageCount:t=3}){let n=[{id:`1`,r:`assistant`,c:`Hello! How can I help?`},{id:`2`,r:`user`,c:`What is Adhar UI?`},{id:`3`,r:`assistant`,c:`A framework-agnostic design system with components you own.`},{id:`4`,r:`user`,c:`Which frameworks are supported?`},{id:`5`,r:`assistant`,c:`React, Vue, Angular, Svelte, and Solid.`},{id:`6`,r:`user`,c:`How do I install it?`},{id:`7`,r:`assistant`,c:"Run `npx adhar-ui init` to get started."},{id:`8`,r:`user`,c:`Can I customize the theme?`},{id:`9`,r:`assistant`,c:`Yes, Adhar UI supports full theming via CSS variables.`},{id:`10`,r:`user`,c:`Thanks!`}],[r,i]=(0,m.useState)(n.slice(0,t)),[a,o]=(0,m.useState)(``);m.useEffect(()=>{i(n.slice(0,t))},[t]);let s=()=>{a.trim()&&(i([...r,{id:Date.now().toString(),r:`user`,c:a}]),o(``))};return(0,h.jsxs)(`div`,{className:`h-72 max-w-lg rounded-lg border flex flex-col`,children:[(0,h.jsxs)(`div`,{className:`flex-1 overflow-y-auto p-4 space-y-3`,children:[r.map(e=>(0,h.jsxs)(`div`,{className:g(`flex gap-2`,e.r===`user`&&`justify-end`),children:[e.r===`assistant`&&(0,h.jsx)(`div`,{className:`h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[9px]`,children:`AI`}),(0,h.jsx)(`div`,{className:g(`max-w-[75%] rounded-lg px-3 py-2 text-sm`,e.r===`user`?`bg-primary text-primary-foreground`:`bg-muted`),children:e.c})]},e.id)),e&&(0,h.jsxs)(`div`,{className:`flex gap-2`,children:[(0,h.jsx)(`div`,{className:`h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[9px]`,children:`AI`}),(0,h.jsx)(`div`,{className:`rounded-lg bg-muted px-3 py-2 text-sm`,children:(0,h.jsxs)(`span`,{className:`flex gap-1`,children:[(0,h.jsx)(`span`,{className:`h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50`,style:{animationDelay:`0ms`}}),(0,h.jsx)(`span`,{className:`h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50`,style:{animationDelay:`150ms`}}),(0,h.jsx)(`span`,{className:`h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50`,style:{animationDelay:`300ms`}})]})})]})]}),(0,h.jsxs)(`div`,{className:`border-t p-3 flex gap-2`,children:[(0,h.jsx)(`input`,{value:a,onChange:e=>o(e.target.value),onKeyDown:e=>e.key===`Enter`&&s(),placeholder:`Message...`,className:`flex-1 h-9 rounded-md border px-3 text-sm`}),(0,h.jsx)(`button`,{onClick:s,className:`h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground`,children:`Send`})]})]})}function a({placeholder:e=`Ask anything...`,disabled:t=!1,showSendButton:n=!0}){let[r,i]=(0,m.useState)(``);return(0,h.jsxs)(`div`,{className:g(`max-w-lg relative rounded-lg border`,t&&`opacity-50`),children:[(0,h.jsx)(`textarea`,{value:r,onChange:e=>i(e.target.value),placeholder:e,disabled:t,rows:1,className:`w-full resize-none bg-transparent px-4 py-3 pr-20 text-sm outline-none disabled:cursor-not-allowed`,style:{height:Math.min(Math.max(40,r.split(`
`).length*24),200)}}),(0,h.jsxs)(`div`,{className:`absolute bottom-2 right-2 flex items-center gap-2`,children:[(0,h.jsxs)(`span`,{className:`text-xs text-muted-foreground`,children:[r.length,`/4000`]}),n&&(0,h.jsx)(`button`,{disabled:!r.trim()||t,className:`h-8 w-8 rounded-md bg-primary text-primary-foreground disabled:opacity-50 flex items-center justify-center text-sm`,children:`→`})]})]})}function o({text:e=`Adhar UI is a framework-agnostic design system with production-ready components.`,speed:t=`normal`}){let[n,r]=(0,m.useState)(``),[i,a]=(0,m.useState)(!1),o={slow:60,normal:25,fast:8};return(0,h.jsxs)(`div`,{className:`max-w-lg space-y-3`,children:[(0,h.jsxs)(`button`,{onClick:()=>{r(``),a(!0);let n=0,i=setInterval(()=>{n<e.length?(r(e.slice(0,n+1)),n++):(clearInterval(i),a(!1))},o[t])},disabled:i,className:`h-9 rounded-md border px-3 text-sm hover:bg-accent disabled:opacity-50`,children:[`▶ Stream (`,t,`)`]}),(0,h.jsxs)(`div`,{className:`rounded-md border p-4 min-h-[60px] text-sm`,children:[n,i&&(0,h.jsx)(`span`,{className:`animate-pulse text-primary`,children:`█`}),!i&&!n&&(0,h.jsx)(`span`,{className:`text-muted-foreground`,children:`Click stream to start.`})]})]})}function s({language:e=`tsx`,showLineNumbers:t=!0}){let[n,r]=(0,m.useState)(!1),{file:i,code:a}={tsx:{file:`page.tsx`,code:`import { Button } from '@/components/ui/button'

export default function Page() {
  return <Button>Click me</Button>
}`},python:{file:`main.py`,code:`from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"hello": "world"}`},go:{file:`main.go`,code:`package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}`},bash:{file:`setup.sh`,code:`#!/bin/bash
npx adhar-ui init
npx adhar-ui add button
npm run dev`}}[e];return(0,h.jsxs)(`div`,{className:`max-w-lg rounded-lg border bg-zinc-950 text-zinc-50`,children:[(0,h.jsxs)(`div`,{className:`flex items-center justify-between border-b border-zinc-800 px-4 py-2`,children:[(0,h.jsx)(`span`,{className:`text-xs text-zinc-400`,children:i}),(0,h.jsx)(`button`,{onClick:()=>{navigator.clipboard?.writeText(a),r(!0),setTimeout(()=>r(!1),2e3)},className:`text-xs text-zinc-400 hover:text-zinc-200`,children:n?`✓ Copied`:`Copy`})]}),(0,h.jsx)(`div`,{className:`overflow-x-auto p-4`,children:(0,h.jsx)(`pre`,{className:`text-sm leading-relaxed`,children:(0,h.jsx)(`code`,{children:a.split(`
`).map((e,n)=>(0,h.jsxs)(`div`,{className:`table-row`,children:[t&&(0,h.jsx)(`span`,{className:`table-cell select-none pr-4 text-right text-zinc-600`,children:n+1}),(0,h.jsx)(`span`,{className:`table-cell`,children:e})]},n))})})})]})}function c({selectedModel:e=`claude-3`}){let[t,n]=(0,m.useState)(e);return m.useEffect(()=>{n(e)},[e]),(0,h.jsx)(`div`,{className:`max-w-[280px] space-y-2`,children:[{id:`claude-3`,name:`Claude 4.6 Opus`,provider:`Anthropic`},{id:`gpt-4`,name:`GPT-4.1`,provider:`OpenAI`},{id:`gemini`,name:`Gemini 2.5 Pro`,provider:`Google`}].map(e=>(0,h.jsxs)(`label`,{onClick:()=>n(e.id),className:g(`flex items-center gap-3 rounded-lg border p-3 cursor-pointer`,t===e.id?`border-primary ring-1 ring-primary`:`hover:bg-accent`),children:[(0,h.jsx)(`div`,{className:g(`h-4 w-4 rounded-full border-2`,t===e.id?`border-primary bg-primary`:`border-muted-foreground/30`)}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`p`,{className:`text-sm font-medium`,children:e.name}),(0,h.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:e.provider})]})]},e.id))})}function l({used:e=3200,max:t=4096}){let n=t>0?e/t:0;return(0,h.jsxs)(`div`,{className:`space-y-2 max-w-xs`,children:[(0,h.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,h.jsx)(`div`,{className:`h-2 flex-1 rounded-full bg-secondary`,children:(0,h.jsx)(`div`,{className:g(`h-full rounded-full transition-all`,n>=.8?`bg-destructive`:`bg-primary`),style:{width:`${Math.min(n*100,100)}%`}})}),(0,h.jsxs)(`span`,{className:g(`text-xs tabular-nums`,n>=.8?`text-destructive`:`text-muted-foreground`),children:[e,`/`,t]})]}),n>=.8&&(0,h.jsx)(`p`,{className:`text-xs text-destructive`,children:`Warning: approaching token limit`})]})}function u({variant:e=`dots`}){return(0,h.jsxs)(`div`,{className:`flex items-center gap-2 text-sm text-muted-foreground`,children:[e===`dots`&&(0,h.jsxs)(`div`,{className:`flex gap-1`,children:[(0,h.jsx)(`span`,{className:`h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40`,style:{animationDelay:`0ms`}}),(0,h.jsx)(`span`,{className:`h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40`,style:{animationDelay:`150ms`}}),(0,h.jsx)(`span`,{className:`h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40`,style:{animationDelay:`300ms`}})]}),e===`pulse`&&(0,h.jsx)(`div`,{className:`h-4 w-4 animate-pulse rounded-full bg-primary/50`}),e===`spinner`&&(0,h.jsx)(`div`,{className:`h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary`}),(0,h.jsx)(`span`,{children:`Thinking...`})]})}function d({variant:e=`thumbs`}){let[t,n]=(0,m.useState)(null);return e===`stars`?(0,h.jsxs)(`div`,{className:`flex items-center gap-1`,children:[[1,2,3,4,5].map(e=>(0,h.jsx)(`button`,{onClick:()=>n(e),className:g(`text-lg`,t!==null&&e<=t?`text-yellow-500`:`text-muted-foreground/30`),children:`&starf;`},e)),t!==null&&(0,h.jsxs)(`span`,{className:`ml-2 text-sm text-muted-foreground`,children:[t,`/5`]})]}):e===`emoji`?(0,h.jsx)(`div`,{className:`flex items-center gap-1`,children:[`😠`,`😕`,`😐`,`😊`,`😍`].map((e,r)=>(0,h.jsx)(`button`,{onClick:()=>n(r),className:g(`rounded-md p-1.5 text-lg hover:bg-accent`,t===r&&`ring-2 ring-primary`),children:e},r))}):(0,h.jsxs)(`div`,{className:`flex items-center gap-1`,children:[(0,h.jsx)(`button`,{onClick:()=>n(t===1?null:1),className:g(`rounded-md p-1.5 hover:bg-accent`,t===1&&`text-green-500`),children:`👍`}),(0,h.jsx)(`button`,{onClick:()=>n(t===0?null:0),className:g(`rounded-md p-1.5 hover:bg-accent`,t===0&&`text-red-500`),children:`👎`}),t!==null&&(0,h.jsx)(`span`,{className:`ml-2 text-sm text-muted-foreground`,children:t===1?`Thanks!`:`We'll improve`})]})}function f({chips:e=5}){let t=[`Explain code`,`Write tests`,`Refactor`,`Add types`,`Optimize`,`Debug`,`Document`,`Translate`].slice(0,e),[n,r]=(0,m.useState)(null);return(0,h.jsxs)(`div`,{className:`space-y-3`,children:[(0,h.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:t.map(e=>(0,h.jsx)(`button`,{onClick:()=>r(e),className:g(`rounded-full border px-3 py-1.5 text-sm`,n===e?`bg-primary text-primary-foreground border-primary`:`hover:bg-accent`),children:e},e))}),n&&(0,h.jsxs)(`p`,{className:`text-sm`,children:[`Selected: `,(0,h.jsx)(`strong`,{children:n})]})]})}function p({role:e=`assistant`,content:t="Run `adhar-ui add button` to copy the component to your project."}){return(0,h.jsxs)(`div`,{className:g(`max-w-lg flex gap-3`,e===`user`&&`flex-row-reverse`),children:[(0,h.jsx)(`div`,{className:`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium`,children:e===`user`?`You`:`AI`}),(0,h.jsxs)(`div`,{className:g(`flex max-w-[75%] flex-col gap-1`,e===`user`&&`items-end`),children:[(0,h.jsx)(`div`,{className:g(`rounded-lg px-4 py-2 text-sm`,e===`user`?`bg-primary text-primary-foreground`:`bg-muted`),children:t}),(0,h.jsx)(`time`,{className:`text-[10px] text-muted-foreground`,children:`10:30 AM`})]})]})}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=t((()=>{m=e(n(),1),h=r(),g=(...e)=>e.filter(Boolean).join(` `),_={name:`Chat`,render:e=>(0,h.jsx)(i,{...e}),args:{showTyping:!1,messageCount:3},argTypes:{showTyping:{control:`boolean`},messageCount:{control:{type:`number`,min:1,max:10}}}},v={name:`Prompt Input`,render:e=>(0,h.jsx)(a,{...e}),args:{placeholder:`Ask anything...`,disabled:!1,showSendButton:!0},argTypes:{placeholder:{control:`text`},disabled:{control:`boolean`},showSendButton:{control:`boolean`}}},y={name:`Streaming Text`,render:e=>(0,h.jsx)(o,{...e}),args:{text:`Adhar UI is a framework-agnostic design system with production-ready components.`,speed:`normal`},argTypes:{text:{control:`text`},speed:{control:`select`,options:[`slow`,`normal`,`fast`]}}},b={name:`Code Block`,render:e=>(0,h.jsx)(s,{...e}),args:{language:`tsx`,showLineNumbers:!0},argTypes:{language:{control:`select`,options:[`tsx`,`python`,`go`,`bash`]},showLineNumbers:{control:`boolean`}}},x={name:`Model Selector`,render:e=>(0,h.jsx)(c,{...e}),args:{selectedModel:`claude-3`},argTypes:{selectedModel:{control:`select`,options:[`gpt-4`,`claude-3`,`gemini`]}}},S={name:`Token Counter`,render:e=>(0,h.jsx)(l,{...e}),args:{used:3200,max:4096},argTypes:{used:{control:{type:`number`,min:0,max:4096}},max:{control:{type:`number`,min:1024,max:8192}}}},C={name:`Thinking Indicator`,render:e=>(0,h.jsx)(u,{...e}),args:{variant:`dots`},argTypes:{variant:{control:`select`,options:[`dots`,`pulse`,`spinner`]}}},w={name:`Feedback Buttons`,render:e=>(0,h.jsx)(d,{...e}),args:{variant:`thumbs`},argTypes:{variant:{control:`select`,options:[`thumbs`,`stars`,`emoji`]}}},T={name:`Suggestion Chips`,render:e=>(0,h.jsx)(f,{...e}),args:{chips:5},argTypes:{chips:{control:{type:`number`,min:3,max:8}}}},E={name:`Message Bubble`,render:e=>(0,h.jsx)(p,{...e}),args:{role:`assistant`,content:"Run `adhar-ui add button` to copy the component to your project."},argTypes:{role:{control:`select`,options:[`user`,`assistant`]},content:{control:`text`}}},D={title:`Components/AI`},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},O=[`ChatStory`,`PromptInputStory`,`StreamingTextStory`,`CodeBlockStory`,`ModelSelectorStory`,`TokenCounterStory`,`ThinkingIndicatorStory`,`FeedbackButtonsStory`,`SuggestionChipsStory`,`MessageBubbleStory`]})))()}k();export{_ as ChatStory,b as CodeBlockStory,w as FeedbackButtonsStory,E as MessageBubbleStory,x as ModelSelectorStory,v as PromptInputStory,y as StreamingTextStory,T as SuggestionChipsStory,C as ThinkingIndicatorStory,S as TokenCounterStory,O as __namedExportsOrder,D as default};