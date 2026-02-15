module.exports=[87532,a=>{"use strict";let b=(0,a.i(70106).default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]);a.s(["Search",()=>b],87532)},77197,a=>{"use strict";var b=a.i(9581),c=a.i(129),d=a.i(46271),e=a.i(70106);let f=(0,e.default)("arrow-up-down",[["path",{d:"m21 16-4 4-4-4",key:"f6ql7i"}],["path",{d:"M17 20V4",key:"1ejh1v"}],["path",{d:"m3 8 4-4 4 4",key:"11wl7u"}],["path",{d:"M7 4v16",key:"1glfcx"}]]),g=(0,e.default)("arrow-up",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]),h=(0,e.default)("arrow-down",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]),i=(0,c.createContext)(null),j=(0,c.forwardRef)(({caption:a,captionHidden:d=!0,sortable:e=!1,sortState:f,onSortChange:g,className:h="",children:j,...k},l)=>{let[m,n]=(0,c.useState)({column:null,direction:null}),o=f??m,p=(0,c.useCallback)(a=>{let b={column:a,direction:o.column===a?"asc"===o.direction?"desc":"desc"===o.direction?null:"asc":"asc"};null===b.direction&&(b.column=null),g?g(b):n(b)},[o,g]),q=e?{sortState:o,onSort:p}:null;return(0,b.jsx)(i.Provider,{value:q,children:(0,b.jsx)("div",{className:"w-full overflow-x-auto",children:(0,b.jsxs)("table",{ref:l,className:`
              w-full
              border-collapse
              border-2 border-black
              rounded-[16px]
              bg-white
              ${h}
            `.trim().replace(/\s+/g," "),...k,children:[a&&(0,b.jsx)("caption",{className:d?"sr-only":"text-left p-4 font-semibold",children:a}),j]})})})});j.displayName="Table";let k=(0,c.forwardRef)(({className:a="",children:c,...d},e)=>(0,b.jsx)("thead",{ref:e,className:`
          bg-[var(--color-bg-tertiary)]
          border-b-2 border-black
          ${a}
        `.trim().replace(/\s+/g," "),...d,children:c}));k.displayName="TableHeader";let l=(0,c.forwardRef)(({className:a="",children:c,...d},e)=>(0,b.jsx)("tbody",{ref:e,className:a,...d,children:c}));l.displayName="TableBody";let m=(0,c.forwardRef)(({onClick:a,selected:c=!1,className:e="",children:f,...g},h)=>a?(0,b.jsx)(d.motion.tr,{ref:h,whileHover:{backgroundColor:"var(--color-bg-secondary)",x:4},whileTap:{backgroundColor:"var(--color-bg-tertiary)"},transition:{duration:.15},onClick:a,onKeyDown:b=>"Enter"===b.key&&a?.(),tabIndex:0,role:"button",className:`
            border-b border-[var(--color-border-light)]
            cursor-pointer
            outline-none
            focus-visible:bg-[var(--color-primary-50)]
            ${c?"bg-[var(--color-primary-50)]":""}
            ${e}
          `.trim().replace(/\s+/g," "),...g,children:f}):(0,b.jsx)("tr",{ref:h,className:`
          border-b border-[var(--color-border-light)]
          ${c?"bg-[var(--color-primary-50)]":""}
          ${e}
        `.trim().replace(/\s+/g," "),...g,children:f}));m.displayName="TableRow";let n=(0,c.forwardRef)(({sortKey:a,sortable:d=!0,className:e="",children:j,...k},l)=>{let m=(0,c.useContext)(i),n=m&&d&&a,o=m?.sortState.column===a,p=o?m?.sortState.direction:null,q=()=>{n&&a&&m.onSort(a)};return(0,b.jsx)("th",{ref:l,scope:"col",onClick:n?q:void 0,onKeyDown:n?a=>"Enter"===a.key&&q():void 0,tabIndex:n?0:void 0,"aria-sort":o?"asc"===p?"ascending":"descending":void 0,className:`
          px-4 py-3
          text-left
          text-sm font-semibold
          text-[var(--color-text-primary)]
          ${n?"cursor-pointer select-none hover:bg-[var(--color-bg-secondary)]":""}
          ${e}
        `.trim().replace(/\s+/g," "),style:{fontFamily:"var(--font-display)"},...k,children:(0,b.jsxs)("span",{className:"flex items-center gap-2",children:[j,n&&(0,b.jsx)("asc"===p?g:"desc"===p?h:f,{className:`h-4 w-4 ${o?"text-[var(--color-primary-600)]":"text-[var(--color-text-tertiary)]"}`,"aria-hidden":"true"})]})})});n.displayName="TableHead";let o=(0,c.forwardRef)(({isRowHeader:a=!1,numeric:c=!1,className:d="",children:e,...f},g)=>{let h=`
      px-4 py-3
      text-sm
      text-[var(--color-text-primary)]
      ${c?"font-mono tabular-nums":""}
      ${d}
    `.trim().replace(/\s+/g," ");return a?(0,b.jsx)("th",{ref:g,scope:"row",className:`${h} font-medium`,...f,children:e}):(0,b.jsx)("td",{ref:g,className:h,...f,children:e})});function p({colSpan:a,icon:c,message:d="No data available",action:e,className:f="",...g}){return(0,b.jsx)("tr",{...g,children:(0,b.jsx)("td",{colSpan:a,className:`
          px-4 py-12
          text-center
          text-[var(--color-text-secondary)]
          ${f}
        `.trim().replace(/\s+/g," "),children:(0,b.jsxs)("div",{className:"flex flex-col items-center gap-3",children:[c&&(0,b.jsx)("div",{className:"text-[var(--color-text-tertiary)]",children:c}),(0,b.jsx)("p",{className:"text-sm",children:d}),e&&(0,b.jsx)("div",{className:"mt-2",children:e})]})})})}o.displayName="TableCell",(0,c.forwardRef)(({className:a="",children:c,...d},e)=>(0,b.jsx)("tfoot",{ref:e,className:`
          bg-[var(--color-bg-secondary)]
          border-t-2 border-black
          ${a}
        `.trim().replace(/\s+/g," "),...d,children:c})).displayName="TableFooter",a.s(["Table",0,j,"TableBody",0,l,"TableCell",0,o,"TableEmpty",()=>p,"TableHead",0,n,"TableHeader",0,k,"TableRow",0,m],77197)},92759,a=>{"use strict";let b=(0,a.i(70106).default)("send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);a.s(["Send",()=>b],92759)},42664,a=>{"use strict";var b=a.i(9581),c=a.i(46271),d=a.i(4720),e=a.i(92759),f=a.i(70106);let g=(0,f.default)("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);var h=a.i(16201),i=a.i(73570);let j=(0,f.default)("clock",[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);var k=a.i(75250);let l={draft:{bg:"bg-gray-100",text:"text-gray-700",border:"border-gray-300",icon:d.FileText},sent:{bg:"bg-blue-100",text:"text-blue-800",border:"border-blue-300",icon:e.Send},viewed:{bg:"bg-purple-100",text:"text-purple-800",border:"border-purple-300",icon:g},paid:{bg:"bg-green-100",text:"text-green-800",border:"border-green-300",icon:h.CheckCircle},overdue:{bg:"bg-red-100",text:"text-red-800",border:"border-red-300",icon:i.AlertTriangle},pending:{bg:"bg-yellow-100",text:"text-yellow-800",border:"border-yellow-300",icon:j},neutral:{bg:"bg-gray-100",text:"text-gray-700",border:"border-gray-300"},info:{bg:"bg-[var(--color-info-bg)]",text:"text-[var(--color-info-text)]",border:"border-[var(--color-info-border)]"},success:{bg:"bg-[var(--color-success-bg)]",text:"text-[var(--color-success-text)]",border:"border-[var(--color-success-border)]"},warning:{bg:"bg-[var(--color-warning-bg)]",text:"text-[var(--color-warning-text)]",border:"border-[var(--color-warning-border)]"},error:{bg:"bg-[var(--color-error-bg)]",text:"text-[var(--color-error-text)]",border:"border-[var(--color-error-border)]"}};function m({variant:a,children:d,showIcon:e=!0,animate:f=!1,className:g=""}){let h=l[a],i=h.icon,j=`
    inline-flex items-center gap-1.5
    px-2.5 py-1
    text-xs font-medium
    rounded-[8px]
    border
    ${h.bg}
    ${h.text}
    ${h.border}
    ${g}
  `.trim().replace(/\s+/g," ");return f?(0,b.jsxs)(c.motion.span,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:k.spring.bouncy,className:j,children:[e&&i&&(0,b.jsx)(i,{className:"h-3.5 w-3.5","aria-hidden":!0}),d]}):(0,b.jsxs)("span",{className:j,children:[e&&i&&(0,b.jsx)(i,{className:"h-3.5 w-3.5","aria-hidden":!0}),d]})}let n={draft:"Draft",sent:"Sent",viewed:"Viewed",paid:"Paid",overdue:"Overdue",pending:"Pending"};function o({status:a,animate:c=!1,className:d=""}){return(0,b.jsx)(m,{variant:a,animate:c,className:d,children:n[a]})}a.s(["Badge",()=>m,"InvoiceStatusBadge",()=>o],42664)},92258,a=>{"use strict";let b=(0,a.i(70106).default)("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]);a.s(["Mail",()=>b],92258)},59023,a=>{"use strict";var b=a.i(9581),c=a.i(129);a.i(6205);var d=a.i(22800);let e=(0,c.createContext)(null);function f({isOpen:a,onClose:b,size:d="md",closeOnOverlayClick:e=!0,closeOnEscape:f=!0,showCloseButton:g=!0,children:h,className:i=""}){let j;(0,c.useId)(),(0,c.useId)(),j=(0,c.useRef)(null),(0,c.useEffect)(()=>{if(!a||!j.current)return;let b=j.current,c=b.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),d=c[0],e=c[c.length-1],f=document.activeElement;function g(a){"Tab"===a.key&&(a.shiftKey?document.activeElement===d&&(a.preventDefault(),e?.focus()):document.activeElement===e&&(a.preventDefault(),d?.focus()))}return d?.focus(),b.addEventListener("keydown",g),()=>{b.removeEventListener("keydown",g),f?.focus()}},[a]),(0,c.useEffect)(()=>{if(!a)return;let b=window.getComputedStyle(document.body).overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=b}},[a]);let k=(0,c.useCallback)(a=>{f&&"Escape"===a.key&&b()},[f,b]);return(0,c.useEffect)(()=>{if(a)return document.addEventListener("keydown",k),()=>document.removeEventListener("keydown",k)},[a,k]),null}function g({title:a,description:d,className:f="",...g}){let{titleId:h,descriptionId:i}=function(){let a=(0,c.useContext)(e);if(!a)throw Error("Modal components must be used within a Modal");return a}();return(0,b.jsxs)("div",{className:`px-6 pt-6 pb-4 ${f}`,...g,children:[(0,b.jsx)("h2",{id:h,className:"text-xl font-semibold text-[var(--color-text-primary)] pr-8",style:{fontFamily:"var(--font-display)"},children:a}),d&&(0,b.jsx)("p",{id:i,className:"mt-2 text-sm text-[var(--color-text-secondary)]",children:d})]})}function h({className:a="",children:c,...d}){return(0,b.jsx)("div",{className:`px-6 py-4 ${a}`,...d,children:c})}function i({className:a="",children:c,...d}){return(0,b.jsx)("div",{className:`
        flex items-center justify-end gap-3
        px-6 py-4
        border-t border-[var(--color-border-light)]
        ${a}
      `.trim().replace(/\s+/g," "),...d,children:c})}function j({isOpen:a,onClose:c,onConfirm:e,title:h,description:j,confirmText:k="Confirm",cancelText:l="Cancel",variant:m="primary",isLoading:n=!1}){return(0,b.jsxs)(f,{isOpen:a,onClose:c,size:"sm",children:[(0,b.jsx)(g,{title:h,description:j}),(0,b.jsxs)(i,{children:[(0,b.jsx)(d.Button,{variant:"secondary",onClick:c,disabled:n,children:l}),(0,b.jsx)(d.Button,{variant:"danger"===m?"danger":"primary",onClick:e,isLoading:n,children:k})]})]})}a.s(["ConfirmModal",()=>j,"Modal",()=>f,"ModalBody",()=>h,"ModalFooter",()=>i,"ModalHeader",()=>g])},36848,a=>{"use strict";var b=a.i(9581),c=a.i(46271);function d({width:a,height:d,variant:e="text",className:f="",animate:g=!0}){let h={text:"rounded-[4px]",circular:"rounded-full",rectangular:"rounded-none",rounded:"rounded-[12px]"},i={width:a??"100%",height:"text"===e?"1em":d};return g?(0,b.jsx)(c.motion.div,{animate:{opacity:[.5,1,.5]},transition:{duration:1.5,repeat:1/0,ease:"easeInOut"},className:`bg-gray-200 ${h[e]} ${f}`,style:i,"aria-hidden":"true"}):(0,b.jsx)("div",{className:`bg-gray-200 ${h[e]} ${f}`,style:i,"aria-hidden":"true"})}function e({lines:a=3,spacing:c="md",lastLineWidth:e="75%",className:f=""}){return(0,b.jsx)("div",{className:`${{sm:"space-y-1.5",md:"space-y-2",lg:"space-y-3"}[c]} ${f}`,"aria-label":"Loading content...",children:Array.from({length:a}).map((c,f)=>(0,b.jsx)(d,{variant:"text",width:f===a-1?e:"100%",height:"1em"},f))})}let f={sm:"h-8 w-8",md:"h-10 w-10",lg:"h-12 w-12",xl:"h-16 w-16"};function g({size:a="md",className:c=""}){return(0,b.jsx)(d,{variant:"circular",className:`${f[a]} ${c}`})}function h({showHeader:a=!0,lines:c=3,showFooter:f=!1,className:h=""}){return(0,b.jsxs)("div",{className:`p-6 bg-white border-2 border-black rounded-[16px] shadow-[4px_4px_0_0_#000000] ${h}`,"aria-label":"Loading card...",children:[a&&(0,b.jsxs)("div",{className:"flex items-center gap-3 mb-4",children:[(0,b.jsx)(g,{size:"md"}),(0,b.jsxs)("div",{className:"flex-1 space-y-2",children:[(0,b.jsx)(d,{variant:"text",width:"40%",height:"1em"}),(0,b.jsx)(d,{variant:"text",width:"25%",height:"0.875em"})]})]}),(0,b.jsx)(e,{lines:c}),f&&(0,b.jsxs)("div",{className:"flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200",children:[(0,b.jsx)(d,{variant:"rounded",width:80,height:36}),(0,b.jsx)(d,{variant:"rounded",width:100,height:36})]})]})}function i({className:a=""}){return(0,b.jsx)("div",{className:`p-6 bg-white border-2 border-black rounded-[16px] shadow-[4px_4px_0_0_#000000] ${a}`,"aria-label":"Loading client...",children:(0,b.jsxs)("div",{className:"flex items-start gap-4",children:[(0,b.jsx)(g,{size:"lg"}),(0,b.jsxs)("div",{className:"flex-1 min-w-0 space-y-2",children:[(0,b.jsx)(d,{variant:"text",width:"60%",height:"1.25em"}),(0,b.jsx)(d,{variant:"text",width:"40%",height:"0.875em"}),(0,b.jsxs)("div",{className:"pt-2 space-y-1.5",children:[(0,b.jsx)(d,{variant:"text",width:"70%",height:"0.875em"}),(0,b.jsx)(d,{variant:"text",width:"50%",height:"0.875em"})]})]}),(0,b.jsxs)("div",{className:"text-right space-y-1",children:[(0,b.jsx)(d,{variant:"text",width:80,height:"1.25em"}),(0,b.jsx)(d,{variant:"text",width:60,height:"0.75em"})]})]})})}function j({className:a=""}){return(0,b.jsxs)("div",{className:`p-6 bg-white border-2 border-black rounded-[16px] shadow-[4px_4px_0_0_#000000] ${a}`,"aria-label":"Loading metric...",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3 mb-3",children:[(0,b.jsx)(d,{variant:"rounded",width:40,height:40}),(0,b.jsx)(d,{variant:"text",width:80,height:"0.875em"})]}),(0,b.jsx)(d,{variant:"text",width:140,height:"2em"}),(0,b.jsx)(d,{variant:"text",width:100,height:"0.75em",className:"mt-2"})]})}a.s(["Skeleton",()=>d,"SkeletonCard",()=>h,"SkeletonClientCard",()=>i,"SkeletonKPI",()=>j,"SkeletonText",()=>e])},99343,58644,a=>{"use strict";var b=a.i(9581),c=a.i(129),d=a.i(46271),e=a.i(40650),f=a.i(75250);let g=(0,c.forwardRef)(({label:a,helperText:g,error:h,success:i,showCount:j=!1,maxLength:k,minRows:l=3,autoResize:m=!1,className:n="",required:o,id:p,value:q,defaultValue:r,onChange:s,...t},u)=>{let[v,w]=(0,c.useState)(!1),[x,y]=(0,c.useState)((q?.toString()||r?.toString()||"").length),z=(0,c.useId)(),A=p||z,B=`${A}-error`,C=`${A}-helper`,D=`${A}-counter`,E=(0,e.useAnimationControls)(),F=async()=>{h&&await E.start(f.shakeAnimation)},G=h?"error":i?"success":v?"focus":"idle",H=k&&x>k,I=k&&x>.9*k;return(0,b.jsxs)(d.motion.div,{animate:E,className:"w-full",children:[a&&(0,b.jsxs)("label",{htmlFor:A,className:"block text-sm font-medium text-[var(--color-text-primary)] mb-2",children:[a,o&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("span",{className:"text-[var(--color-error-border)] ml-1","aria-hidden":"true",children:"*"}),(0,b.jsx)("span",{className:"sr-only",children:"(required)"})]})]}),(0,b.jsx)(d.motion.textarea,{ref:u,id:A,variants:f.inputVariants,animate:G,transition:f.spring.snappy,onFocus:()=>w(!0),onBlur:()=>{w(!1),F()},onChange:a=>{y(a.target.value.length),m&&(a.target.style.height="auto",a.target.style.height=`${a.target.scrollHeight}px`),s?.(a)},value:q,defaultValue:r,required:o,maxLength:k,rows:l,"aria-required":o,"aria-invalid":h?"true":void 0,"aria-describedby":[h?B:null,g?C:null,j?D:null].filter(Boolean).join(" ")||void 0,className:`
            w-full
            bg-white
            border-2 border-black
            rounded-[12px]
            px-3 py-3
            text-[15px]
            text-[var(--color-text-primary)]
            placeholder:text-[var(--color-text-tertiary)]
            outline-none
            resize-y
            ${m?"resize-none overflow-hidden":""}
            ${n}
          `.trim().replace(/\s+/g," "),style:{fontFamily:"var(--font-body)",minHeight:`${1.6*l}em`},...t}),(0,b.jsxs)("div",{className:"flex justify-between items-start mt-2",children:[(0,b.jsxs)("div",{className:"flex-1",children:[h&&(0,b.jsx)("p",{id:B,role:"alert",className:"text-sm text-[var(--color-error-text)]",children:h}),g&&!h&&(0,b.jsx)("p",{id:C,className:"text-sm text-[var(--color-text-tertiary)]",children:g})]}),j&&k&&(0,b.jsxs)(d.motion.span,{id:D,animate:{color:H?"var(--color-error-border)":I?"var(--color-warning-border)":"var(--color-text-tertiary)",scale:I?[1,1.1,1]:1},transition:f.spring.snappy,className:"text-sm ml-2 font-mono tabular-nums","aria-live":"polite",children:[x,"/",k]})]})]})});g.displayName="Textarea",a.s(["Textarea",0,g],99343);var h=a.i(33441);let i={sm:{box:"h-4 w-4",icon:"h-2.5 w-2.5",label:"text-sm",gap:"gap-2"},md:{box:"h-5 w-5",icon:"h-3 w-3",label:"text-[15px]",gap:"gap-2.5"},lg:{box:"h-6 w-6",icon:"h-4 w-4",label:"text-base",gap:"gap-3"}},j=(0,c.forwardRef)(({label:a,helperText:e,error:g=!1,size:j="md",className:k="",id:l,disabled:m,checked:n,...o},p)=>{let q=(0,c.useId)(),r=l||q,s=`${r}-helper`,t=i[j];return(0,b.jsxs)("div",{className:`flex items-start ${t.gap} ${k}`,children:[(0,b.jsxs)("div",{className:"relative flex items-center justify-center",children:[(0,b.jsx)("input",{ref:p,type:"checkbox",id:r,disabled:m,checked:n,"aria-describedby":e?s:void 0,className:" peer sr-only ",...o}),(0,b.jsx)(d.motion.div,{animate:{borderColor:g?"var(--color-error-border)":n?"var(--color-primary-600)":"#000000",backgroundColor:n?"var(--color-primary-600)":"white",scale:1},whileTap:{scale:.9},transition:f.spring.bouncy,className:`
              ${t.box}
              flex items-center justify-center
              border-2
              rounded-[6px]
              cursor-pointer
              ${m?"opacity-50 cursor-not-allowed":""}
              peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary-600)] peer-focus-visible:ring-offset-2
            `.trim().replace(/\s+/g," "),onClick:a=>a.stopPropagation(),children:(0,b.jsx)(d.motion.div,{initial:{scale:0,opacity:0},animate:{scale:+!!n,opacity:+!!n},transition:f.spring.bouncy,children:(0,b.jsx)(h.Check,{className:`${t.icon} text-white`,"aria-hidden":"true"})})})]}),(a||e)&&(0,b.jsxs)("div",{className:"flex-1",children:[a&&(0,b.jsx)("label",{htmlFor:r,className:`
                  block
                  ${t.label}
                  font-medium
                  text-[var(--color-text-primary)]
                  cursor-pointer
                  ${m?"opacity-50 cursor-not-allowed":""}
                `.trim().replace(/\s+/g," "),children:a}),e&&(0,b.jsx)("p",{id:s,className:"text-sm text-[var(--color-text-secondary)] mt-0.5",children:e})]})]})});j.displayName="Checkbox";let k=(0,c.forwardRef)(({label:a,helperText:e,size:g="md",className:h="",id:j,disabled:k,checked:l,...m},n)=>{let o=(0,c.useId)(),p=j||o,q=`${p}-helper`,r=i[g];return(0,b.jsxs)("div",{className:`flex items-start ${r.gap} ${h}`,children:[(0,b.jsxs)("div",{className:"relative flex items-center justify-center",children:[(0,b.jsx)("input",{ref:n,type:"radio",id:p,disabled:k,checked:l,"aria-describedby":e?q:void 0,className:"peer sr-only",...m}),(0,b.jsx)(d.motion.div,{animate:{borderColor:l?"var(--color-primary-600)":"#000000"},whileTap:{scale:.9},transition:f.spring.bouncy,className:`
              ${r.box}
              flex items-center justify-center
              border-2
              rounded-full
              cursor-pointer
              ${k?"opacity-50 cursor-not-allowed":""}
              peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary-600)] peer-focus-visible:ring-offset-2
            `.trim().replace(/\s+/g," "),onClick:a=>a.stopPropagation(),children:(0,b.jsx)(d.motion.div,{initial:{scale:0},animate:{scale:+!!l},transition:f.spring.bouncy,className:`
                ${"sm"===g?"h-2 w-2":"md"===g?"h-2.5 w-2.5":"h-3 w-3"}
                rounded-full
                bg-[var(--color-primary-600)]
              `})})]}),(a||e)&&(0,b.jsxs)("div",{className:"flex-1",children:[a&&(0,b.jsx)("label",{htmlFor:p,className:`
                  block
                  ${r.label}
                  font-medium
                  text-[var(--color-text-primary)]
                  cursor-pointer
                  ${k?"opacity-50 cursor-not-allowed":""}
                `.trim().replace(/\s+/g," "),children:a}),e&&(0,b.jsx)("p",{id:q,className:"text-sm text-[var(--color-text-secondary)] mt-0.5",children:e})]})]})});function l({name:a,value:c,onChange:d,children:e,direction:f="vertical",label:g,className:h=""}){return(0,b.jsx)("div",{role:"radiogroup","aria-label":g,className:`
        flex
        ${"horizontal"===f?"flex-row gap-4":"flex-col gap-2"}
        ${h}
      `.trim().replace(/\s+/g," "),children:e})}k.displayName="Radio",a.s(["Checkbox",0,j,"Radio",0,k,"RadioGroup",()=>l],58644)}];

//# sourceMappingURL=_c9a3f547._.js.map