import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t}from"./iframe-xPHbGT99.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";function r({variant:e=`default`,size:t=`default`,children:n=`Badge`,dot:r=!1}){return(0,u.jsxs)(`span`,{className:d(`inline-flex items-center rounded-full border font-semibold leading-none`,m[t]??m.default,p[e]??p.default),children:[r&&(0,u.jsx)(`span`,{className:`mr-1 inline-block size-1.5 rounded-full bg-current opacity-70`}),n]})}function i({size:e=`md`,fallback:t=`AB`,src:n}){return(0,u.jsx)(`span`,{className:d(`relative flex shrink-0 overflow-hidden rounded-full`,g[e]??g.md),children:n?(0,u.jsx)(`img`,{src:n,alt:t,className:`h-full w-full rounded-full object-cover`}):(0,u.jsx)(`span`,{className:`flex h-full w-full items-center justify-center rounded-full bg-muted font-medium`,children:t})})}function a({orientation:e=`horizontal`,label:t}){return e===`vertical`?(0,u.jsxs)(`div`,{className:`flex h-8 items-center space-x-4 text-sm`,children:[(0,u.jsx)(`span`,{children:`Left`}),(0,u.jsx)(`div`,{className:`h-full w-[1px] bg-border`}),(0,u.jsx)(`span`,{children:`Right`})]}):t?(0,u.jsxs)(`div`,{className:`relative`,children:[(0,u.jsx)(`div`,{className:`absolute inset-0 flex items-center`,children:(0,u.jsx)(`div`,{className:`w-full border-t`})}),(0,u.jsx)(`div`,{className:`relative flex justify-center text-xs uppercase`,children:(0,u.jsx)(`span`,{className:`bg-background px-2 text-muted-foreground`,children:t})})]}):(0,u.jsx)(`div`,{className:`my-4 h-[1px] w-full bg-border`})}function o({variant:e=`card`,animated:t=!0}){let n=t?`animate-pulse`:``;return e===`avatar`?(0,u.jsx)(`div`,{className:d(`h-12 w-12 rounded-full bg-muted`,n)}):e===`text`?(0,u.jsxs)(`div`,{className:`space-y-2`,children:[(0,u.jsx)(`div`,{className:d(`h-4 w-[250px] rounded bg-muted`,n)}),(0,u.jsx)(`div`,{className:d(`h-4 w-[200px] rounded bg-muted`,n)}),(0,u.jsx)(`div`,{className:d(`h-4 w-[160px] rounded bg-muted`,n)})]}):e===`button`?(0,u.jsx)(`div`,{className:d(`h-10 w-24 rounded-md bg-muted`,n)}):(0,u.jsxs)(`div`,{className:`flex items-center space-x-4`,children:[(0,u.jsx)(`div`,{className:d(`h-12 w-12 rounded-full bg-muted`,n)}),(0,u.jsxs)(`div`,{className:`space-y-2`,children:[(0,u.jsx)(`div`,{className:d(`h-4 w-[250px] rounded bg-muted`,n)}),(0,u.jsx)(`div`,{className:d(`h-4 w-[200px] rounded bg-muted`,n)})]})]})}function s({value:e=60,showLabel:t=!1,color:n=`default`}){let r=Math.max(0,Math.min(100,e));return(0,u.jsxs)(`div`,{className:`max-w-sm space-y-1`,children:[t&&(0,u.jsxs)(`div`,{className:`flex justify-between text-sm`,children:[(0,u.jsx)(`span`,{children:`Progress`}),(0,u.jsxs)(`span`,{children:[r,`%`]})]}),(0,u.jsx)(`div`,{className:`relative h-3 w-full overflow-hidden rounded-full bg-secondary`,children:(0,u.jsx)(`div`,{className:d(`h-full rounded-full transition-all`,b[n]??b.default),style:{width:`${r}%`}})})]})}function c({size:e=`md`,label:t}){return(0,u.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,u.jsx)(`div`,{className:d(`animate-spin`,S[e]??S.md),children:(0,u.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,children:[(0,u.jsx)(`circle`,{className:`opacity-25`,cx:`12`,cy:`12`,r:`10`,stroke:`currentColor`,strokeWidth:`4`}),(0,u.jsx)(`path`,{className:`opacity-75`,fill:`currentColor`,d:`M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z`})]})}),t&&(0,u.jsx)(`span`,{className:`text-sm text-muted-foreground`,children:t})]})}function l({ratio:e=`16:9`}){let t=w[e]??16/9;return(0,u.jsxs)(`div`,{className:`max-w-xs`,children:[(0,u.jsx)(`p`,{className:`mb-1 text-xs text-muted-foreground`,children:e}),(0,u.jsx)(`div`,{style:{paddingBottom:`${100/t}%`,position:`relative`},className:`w-full rounded-md bg-muted`,children:(0,u.jsx)(`div`,{className:`absolute inset-0 flex items-center justify-center text-sm text-muted-foreground`,children:e})})]})}var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{t(),u=n(),d=(...e)=>e.filter(Boolean).join(` `),f={title:`Components/Display`},p={default:`border-transparent bg-primary text-primary-foreground`,secondary:`border-transparent bg-secondary text-secondary-foreground`,destructive:`border-transparent bg-destructive text-destructive-foreground`,outline:`text-foreground`,success:`border-transparent bg-green-500/15 text-green-700 dark:text-green-400`,warning:`border-transparent bg-yellow-500/15 text-yellow-700 dark:text-yellow-400`,info:`border-transparent bg-blue-500/15 text-blue-700 dark:text-blue-400`},m={sm:`px-2 py-px text-[10px]`,default:`px-2.5 py-0.5 text-xs`,lg:`px-3 py-1 text-sm`},h={name:`Badge`,render:e=>(0,u.jsx)(r,{...e}),args:{variant:`default`,size:`default`,children:`Badge`,dot:!1},argTypes:{variant:{control:`select`,options:[`default`,`secondary`,`destructive`,`outline`,`success`,`warning`,`info`]},size:{control:`select`,options:[`sm`,`default`,`lg`]},dot:{control:`boolean`},children:{control:`text`}}},g={xs:`h-6 w-6 text-[10px]`,sm:`h-8 w-8 text-xs`,md:`h-10 w-10 text-sm`,lg:`h-12 w-12 text-base`,xl:`h-16 w-16 text-lg`},_={name:`Avatar`,render:e=>(0,u.jsx)(i,{...e}),args:{size:`md`,fallback:`AB`,src:``},argTypes:{size:{control:`select`,options:[`xs`,`sm`,`md`,`lg`,`xl`]},fallback:{control:`text`},src:{control:`text`}}},v={name:`Separator`,render:e=>(0,u.jsx)(a,{...e}),args:{orientation:`horizontal`,label:``},argTypes:{orientation:{control:`select`,options:[`horizontal`,`vertical`]},label:{control:`text`}}},y={name:`Skeleton`,render:e=>(0,u.jsx)(o,{...e}),args:{variant:`card`,animated:!0},argTypes:{variant:{control:`select`,options:[`card`,`text`,`avatar`,`button`]},animated:{control:`boolean`}}},b={default:`bg-primary`,success:`bg-green-500`,warning:`bg-yellow-500`,destructive:`bg-destructive`},x={name:`Progress`,render:e=>(0,u.jsx)(s,{...e}),args:{value:60,showLabel:!1,color:`default`},argTypes:{value:{control:{type:`range`,min:0,max:100,step:1}},showLabel:{control:`boolean`},color:{control:`select`,options:[`default`,`success`,`warning`,`destructive`]}}},S={sm:`h-4 w-4`,md:`h-6 w-6`,lg:`h-8 w-8`},C={name:`Spinner`,render:e=>(0,u.jsx)(c,{...e}),args:{size:`md`,label:`Loading...`},argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`]},label:{control:`text`}}},w={"16:9":16/9,"4:3":4/3,"1:1":1,"21:9":21/9},T={name:`Aspect Ratio`,render:e=>(0,u.jsx)(l,{...e}),args:{ratio:`16:9`},argTypes:{ratio:{control:`select`,options:[`16:9`,`4:3`,`1:1`,`21:9`]}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Badge',
  render: args => <Badge {...args} />,
  args: {
    variant: 'default',
    size: 'default',
    children: 'Badge',
    dot: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info']
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg']
    },
    dot: {
      control: 'boolean'
    },
    children: {
      control: 'text'
    }
  }
}`,...h.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E=[`BadgeStory`,`AvatarStory`,`SeparatorStory`,`SkeletonStory`,`ProgressStory`,`SpinnerStory`,`AspectRatioStory`]})))()}D();export{T as AspectRatioStory,_ as AvatarStory,h as BadgeStory,x as ProgressStory,v as SeparatorStory,y as SkeletonStory,C as SpinnerStory,E as __namedExportsOrder,f as default};