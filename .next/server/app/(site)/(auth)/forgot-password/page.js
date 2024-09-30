(()=>{var e={};e.id=287,e.ids=[287],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},5330:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>d,routeModule:()=>x,tree:()=>c});var s=r(482),a=r(9108),o=r(2563),i=r.n(o),n=r(8300),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let c=["",{children:["(site)",{children:["(auth)",{children:["forgot-password",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,810)),"/Users/dev/Documents/GitHub/rb-construction/src/app/(site)/(auth)/forgot-password/page.tsx"]}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1342)),"/Users/dev/Documents/GitHub/rb-construction/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,8206)),"/Users/dev/Documents/GitHub/rb-construction/src/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/dev/Documents/GitHub/rb-construction/src/app/(site)/(auth)/forgot-password/page.tsx"],p="/(site)/(auth)/forgot-password/page",u={require:r,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/(site)/(auth)/forgot-password/page",pathname:"/forgot-password",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},5562:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,1476,23)),Promise.resolve().then(r.bind(r,1721))},1721:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var s=r(5344),a=r(3729),o=r(4669),i=r(3608),n=r(9703),l=r(6506),c=r(9410);let d=()=>{let[e,t]=(0,a.useState)(""),[r,d]=(0,a.useState)(!1),p=async r=>{if(r.preventDefault(),!e){o.ZP.error("Please enter your email address.");return}d(!0);try{let r=await i.Z.post("/api/forgot-password/reset",{email:e.toLowerCase()});if(404===r.status){o.ZP.error("User not found.");return}200===r.status&&(o.ZP.success(r.data),t("")),t(""),d(!1)}catch(e){o.ZP.error(e?.response.data),d(!1)}};return s.jsx("section",{className:"bg-[#F4F7FF] py-14 dark:bg-dark lg:py-20",children:s.jsx("div",{className:"container",children:s.jsx("div",{className:"-mx-4 flex flex-wrap",children:s.jsx("div",{className:"w-full px-4",children:(0,s.jsxs)("div",{className:"wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]","data-wow-delay":".15s",children:[s.jsx("div",{className:"mb-10 text-center",children:(0,s.jsxs)(l.default,{href:"/",className:"mx-auto inline-block max-w-[160px]",children:[s.jsx(c.default,{src:"/images/logo/logo.svg",alt:"logo",width:140,height:30,className:"dark:hidden"}),s.jsx(c.default,{src:"/images/logo/logo-white.svg",alt:"logo",width:140,height:30,className:"hidden dark:block"})]})}),(0,s.jsxs)("form",{onSubmit:p,children:[s.jsx("div",{className:"mb-[22px]",children:s.jsx("input",{type:"email",placeholder:"Email",name:"email",value:e,onChange:e=>t(e.target.value),required:!0,className:"w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"})}),s.jsx("div",{className:"",children:(0,s.jsxs)("button",{type:"submit",className:"flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-blue-dark",children:["Send Email ",r&&s.jsx(n.Z,{})]})})]}),(0,s.jsxs)("div",{children:[s.jsx("span",{className:"absolute right-1 top-1",children:(0,s.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 40 40",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[s.jsx("circle",{cx:"1.39737",cy:"38.6026",r:"1.39737",transform:"rotate(-90 1.39737 38.6026)",fill:"#3056D3"}),s.jsx("circle",{cx:"1.39737",cy:"1.99122",r:"1.39737",transform:"rotate(-90 1.39737 1.99122)",fill:"#3056D3"}),s.jsx("circle",{cx:"13.6943",cy:"38.6026",r:"1.39737",transform:"rotate(-90 13.6943 38.6026)",fill:"#3056D3"}),s.jsx("circle",{cx:"13.6943",cy:"1.99122",r:"1.39737",transform:"rotate(-90 13.6943 1.99122)",fill:"#3056D3"}),s.jsx("circle",{cx:"25.9911",cy:"38.6026",r:"1.39737",transform:"rotate(-90 25.9911 38.6026)",fill:"#3056D3"}),s.jsx("circle",{cx:"25.9911",cy:"1.99122",r:"1.39737",transform:"rotate(-90 25.9911 1.99122)",fill:"#3056D3"}),s.jsx("circle",{cx:"38.288",cy:"38.6026",r:"1.39737",transform:"rotate(-90 38.288 38.6026)",fill:"#3056D3"}),s.jsx("circle",{cx:"38.288",cy:"1.99122",r:"1.39737",transform:"rotate(-90 38.288 1.99122)",fill:"#3056D3"}),s.jsx("circle",{cx:"1.39737",cy:"26.3057",r:"1.39737",transform:"rotate(-90 1.39737 26.3057)",fill:"#3056D3"}),s.jsx("circle",{cx:"13.6943",cy:"26.3057",r:"1.39737",transform:"rotate(-90 13.6943 26.3057)",fill:"#3056D3"}),s.jsx("circle",{cx:"25.9911",cy:"26.3057",r:"1.39737",transform:"rotate(-90 25.9911 26.3057)",fill:"#3056D3"}),s.jsx("circle",{cx:"38.288",cy:"26.3057",r:"1.39737",transform:"rotate(-90 38.288 26.3057)",fill:"#3056D3"}),s.jsx("circle",{cx:"1.39737",cy:"14.0086",r:"1.39737",transform:"rotate(-90 1.39737 14.0086)",fill:"#3056D3"}),s.jsx("circle",{cx:"13.6943",cy:"14.0086",r:"1.39737",transform:"rotate(-90 13.6943 14.0086)",fill:"#3056D3"}),s.jsx("circle",{cx:"25.9911",cy:"14.0086",r:"1.39737",transform:"rotate(-90 25.9911 14.0086)",fill:"#3056D3"}),s.jsx("circle",{cx:"38.288",cy:"14.0086",r:"1.39737",transform:"rotate(-90 38.288 14.0086)",fill:"#3056D3"})]})}),s.jsx("span",{className:"absolute bottom-1 left-1",children:(0,s.jsxs)("svg",{width:"29",height:"40",viewBox:"0 0 29 40",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[s.jsx("circle",{cx:"2.288",cy:"25.9912",r:"1.39737",transform:"rotate(-90 2.288 25.9912)",fill:"#3056D3"}),s.jsx("circle",{cx:"14.5849",cy:"25.9911",r:"1.39737",transform:"rotate(-90 14.5849 25.9911)",fill:"#3056D3"}),s.jsx("circle",{cx:"26.7216",cy:"25.9911",r:"1.39737",transform:"rotate(-90 26.7216 25.9911)",fill:"#3056D3"}),s.jsx("circle",{cx:"2.288",cy:"13.6944",r:"1.39737",transform:"rotate(-90 2.288 13.6944)",fill:"#3056D3"}),s.jsx("circle",{cx:"14.5849",cy:"13.6943",r:"1.39737",transform:"rotate(-90 14.5849 13.6943)",fill:"#3056D3"}),s.jsx("circle",{cx:"26.7216",cy:"13.6943",r:"1.39737",transform:"rotate(-90 26.7216 13.6943)",fill:"#3056D3"}),s.jsx("circle",{cx:"2.288",cy:"38.0087",r:"1.39737",transform:"rotate(-90 2.288 38.0087)",fill:"#3056D3"}),s.jsx("circle",{cx:"2.288",cy:"1.39739",r:"1.39737",transform:"rotate(-90 2.288 1.39739)",fill:"#3056D3"}),s.jsx("circle",{cx:"14.5849",cy:"38.0089",r:"1.39737",transform:"rotate(-90 14.5849 38.0089)",fill:"#3056D3"}),s.jsx("circle",{cx:"26.7216",cy:"38.0089",r:"1.39737",transform:"rotate(-90 26.7216 38.0089)",fill:"#3056D3"}),s.jsx("circle",{cx:"14.5849",cy:"1.39761",r:"1.39737",transform:"rotate(-90 14.5849 1.39761)",fill:"#3056D3"}),s.jsx("circle",{cx:"26.7216",cy:"1.39761",r:"1.39737",transform:"rotate(-90 26.7216 1.39761)",fill:"#3056D3"})]})})]})]})})})})})}},9703:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(5344);r(3729);let a=()=>s.jsx("span",{className:"ml-1.5 h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-t-transparent"})},810:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>c});var s=r(5036);r(2);let a=(0,r(6843).createProxy)(String.raw`/Users/dev/Documents/GitHub/rb-construction/src/components/Auth/ForgotPassword/index.tsx`),{__esModule:o,$$typeof:i}=a,n=a.default;var l=r(9315);let c={title:"Forgot Password | Play SaaS Starter Kit and Boilerplate for Next.js"},d=()=>(0,s.jsxs)(s.Fragment,{children:[s.jsx(l.Z,{pageName:"Forget Password"}),s.jsx(n,{})]})},4669:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>M});var s,a=r(3729);let o={data:""},i=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||o,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":s+="f"==o[1]?d(i,o):o+"{"+d(i,"k"==o[1]?"":t)+"}":"object"==typeof i?s+=d(i,t?t.replace(/([^,])+/g,e=>o.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(o,i):o+":"+i+";")}return r+(t&&a?t+"{"+a+"}":a)+s},p={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e},x=(e,t,r,s,a)=>{let o=u(e),i=p[o]||(p[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!p[i]){let t=o!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(r=t[3].replace(c," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(c," ").trim();return s[0]})(e);p[i]=d(a?{["@keyframes "+i]:t}:t,r?"":"."+i)}let x=r&&p.g?p.g:null;return r&&(p.g=p[i]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(p[i],t,s,x),i},m=(e,t,r)=>e.reduce((e,s,a)=>{let o=t[a];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==o?"":o)},"");function f(e){let t=this||{},r=e.call?e(t.p):e;return x(r.unshift?r.raw?m(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,i(t.target),t.g,t.o,t.k)}f.bind({g:1});let g,h,b,y=f.bind({k:1});function v(e,t){let r=this||{};return function(){let s=arguments;function a(o,i){let n=Object.assign({},o),l=n.className||a.className;r.p=Object.assign({theme:h&&h()},n),r.o=/ *go\d+/.test(l),n.className=f.apply(r,s)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),b&&c[0]&&b(n),g(c,n)}return t?t(a):a}}var w=e=>"function"==typeof e,j=(e,t)=>w(e)?e(t):e,D=(()=>{let e=0;return()=>(++e).toString()})(),k=((()=>{let e;return()=>e})(),new Map),P=e=>{if(k.has(e))return;let t=setTimeout(()=>{k.delete(e),A({type:4,toastId:e})},1e3);k.set(e,t)},q=e=>{let t=k.get(e);t&&clearTimeout(t)},N=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&q(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return e.toasts.find(e=>e.id===r.id)?N(e,{type:1,toast:r}):N(e,{type:0,toast:r});case 3:let{toastId:s}=t;return s?P(s):e.toasts.forEach(e=>{P(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},_=[],$={toasts:[],pausedAt:void 0},A=e=>{$=N($,e),_.forEach(e=>{e($)})},F={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},G=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||D()}),E=e=>(t,r)=>{let s=G(t,e,r);return A({type:2,toast:s}),s.id},S=(e,t)=>E("blank")(e,t);S.error=E("error"),S.success=E("success"),S.loading=E("loading"),S.custom=E("custom"),S.dismiss=e=>{A({type:3,toastId:e})},S.remove=e=>A({type:4,toastId:e}),S.promise=(e,t,r)=>{let s=S.loading(t.loading,{...r,...null==r?void 0:r.loading});return e.then(e=>(S.success(j(t.success,e),{id:s,...r,...null==r?void 0:r.success}),e)).catch(e=>{S.error(j(t.error,e),{id:s,...r,...null==r?void 0:r.error})}),e};var Z=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,C=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,I=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${C} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),U=(v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${I} 1s linear infinite;
`,y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),H=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,O=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${H} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,v("div")`
  position: absolute;
`,v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${O} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,s=a.createElement,d.p=void 0,g=s,h=void 0,b=void 0,f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var M=S}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,845,608,211],()=>r(5330));module.exports=s})();