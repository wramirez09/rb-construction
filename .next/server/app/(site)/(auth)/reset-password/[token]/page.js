(()=>{var e={};e.id=5,e.ids=[5],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},3070:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>d,routeModule:()=>x,tree:()=>c});var s=r(482),a=r(9108),o=r(2563),i=r.n(o),n=r(8300),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let c=["",{children:["(site)",{children:["(auth)",{children:["reset-password",{children:["[token]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,2879)),"/Users/dev/Documents/GitHub/rb-construction/src/app/(site)/(auth)/reset-password/[token]/page.tsx"]}]},{}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1342)),"/Users/dev/Documents/GitHub/rb-construction/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,8206)),"/Users/dev/Documents/GitHub/rb-construction/src/app/not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/Users/dev/Documents/GitHub/rb-construction/src/app/(site)/(auth)/reset-password/[token]/page.tsx"],p="/(site)/(auth)/reset-password/[token]/page",u={require:r,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/(site)/(auth)/reset-password/[token]/page",pathname:"/reset-password/[token]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},5565:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,1476,23)),Promise.resolve().then(r.bind(r,4148))},4148:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var s=r(5344),a=r(3729),o=r(3608),i=r(8428),n=r(4669),l=r(9703),c=r(6506),d=r(9410);let p=({token:e})=>{let[t,r]=(0,a.useState)({newPassword:"",ReNewPassword:""}),[p,u]=(0,a.useState)(!1),[x,m]=(0,a.useState)({email:""}),f=(0,i.useRouter)();(0,a.useEffect)(()=>{(async()=>{try{let t=await o.Z.post("/api/forgot-password/verify-token",{token:e});200===t.status&&m({email:t.data.email})}catch(e){n.ZP.error(e?.response?.data),f.push("/forgot-password")}})()},[]);let h=e=>{r({...t,[e.target.name]:e.target.value})},g=async e=>{if(e.preventDefault(),u(!0),""===t.newPassword){n.ZP.error("Please enter your password.");return}try{let e=await o.Z.post("/api/forgot-password/update",{email:x?.email,password:t.newPassword});200===e.status&&(n.ZP.success(e.data),r({newPassword:"",ReNewPassword:""}),f.push("/signin")),u(!1)}catch(e){n.ZP.error(e.response.data),u(!1)}};return s.jsx("section",{className:"bg-[#F4F7FF] py-14 dark:bg-dark lg:py-20",children:s.jsx("div",{className:"container",children:s.jsx("div",{className:"-mx-4 flex flex-wrap",children:s.jsx("div",{className:"w-full px-4",children:(0,s.jsxs)("div",{className:"wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]","data-wow-delay":".15s",children:[s.jsx("div",{className:"mb-10 text-center",children:(0,s.jsxs)(c.default,{href:"/",className:"mx-auto inline-block max-w-[160px]",children:[s.jsx(d.default,{src:"/images/logo/logo.svg",alt:"logo",width:140,height:30,className:"dark:hidden"}),s.jsx(d.default,{src:"/images/logo/logo-white.svg",alt:"logo",width:140,height:30,className:"hidden dark:block"})]})}),(0,s.jsxs)("form",{onSubmit:g,children:[s.jsx("div",{className:"mb-[22px]",children:s.jsx("input",{type:"text",placeholder:"New password",name:"newPassword",value:t?.newPassword,onChange:h,required:!0,className:"w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"})}),s.jsx("div",{className:"mb-[22px]",children:s.jsx("input",{type:"text",placeholder:"New password",name:"newPassword",value:t?.newPassword,onChange:h,required:!0,className:"w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"})}),s.jsx("div",{className:"",children:(0,s.jsxs)("button",{type:"submit",className:"flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-blue-dark",children:["Save Password ",p&&s.jsx(l.Z,{})]})})]}),(0,s.jsxs)("div",{children:[s.jsx("span",{className:"absolute right-1 top-1",children:(0,s.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 40 40",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[s.jsx("circle",{cx:"1.39737",cy:"38.6026",r:"1.39737",transform:"rotate(-90 1.39737 38.6026)",fill:"#3056D3"}),s.jsx("circle",{cx:"1.39737",cy:"1.99122",r:"1.39737",transform:"rotate(-90 1.39737 1.99122)",fill:"#3056D3"}),s.jsx("circle",{cx:"13.6943",cy:"38.6026",r:"1.39737",transform:"rotate(-90 13.6943 38.6026)",fill:"#3056D3"}),s.jsx("circle",{cx:"13.6943",cy:"1.99122",r:"1.39737",transform:"rotate(-90 13.6943 1.99122)",fill:"#3056D3"}),s.jsx("circle",{cx:"25.9911",cy:"38.6026",r:"1.39737",transform:"rotate(-90 25.9911 38.6026)",fill:"#3056D3"}),s.jsx("circle",{cx:"25.9911",cy:"1.99122",r:"1.39737",transform:"rotate(-90 25.9911 1.99122)",fill:"#3056D3"}),s.jsx("circle",{cx:"38.288",cy:"38.6026",r:"1.39737",transform:"rotate(-90 38.288 38.6026)",fill:"#3056D3"}),s.jsx("circle",{cx:"38.288",cy:"1.99122",r:"1.39737",transform:"rotate(-90 38.288 1.99122)",fill:"#3056D3"}),s.jsx("circle",{cx:"1.39737",cy:"26.3057",r:"1.39737",transform:"rotate(-90 1.39737 26.3057)",fill:"#3056D3"}),s.jsx("circle",{cx:"13.6943",cy:"26.3057",r:"1.39737",transform:"rotate(-90 13.6943 26.3057)",fill:"#3056D3"}),s.jsx("circle",{cx:"25.9911",cy:"26.3057",r:"1.39737",transform:"rotate(-90 25.9911 26.3057)",fill:"#3056D3"}),s.jsx("circle",{cx:"38.288",cy:"26.3057",r:"1.39737",transform:"rotate(-90 38.288 26.3057)",fill:"#3056D3"}),s.jsx("circle",{cx:"1.39737",cy:"14.0086",r:"1.39737",transform:"rotate(-90 1.39737 14.0086)",fill:"#3056D3"}),s.jsx("circle",{cx:"13.6943",cy:"14.0086",r:"1.39737",transform:"rotate(-90 13.6943 14.0086)",fill:"#3056D3"}),s.jsx("circle",{cx:"25.9911",cy:"14.0086",r:"1.39737",transform:"rotate(-90 25.9911 14.0086)",fill:"#3056D3"}),s.jsx("circle",{cx:"38.288",cy:"14.0086",r:"1.39737",transform:"rotate(-90 38.288 14.0086)",fill:"#3056D3"})]})}),s.jsx("span",{className:"absolute bottom-1 left-1",children:(0,s.jsxs)("svg",{width:"29",height:"40",viewBox:"0 0 29 40",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[s.jsx("circle",{cx:"2.288",cy:"25.9912",r:"1.39737",transform:"rotate(-90 2.288 25.9912)",fill:"#3056D3"}),s.jsx("circle",{cx:"14.5849",cy:"25.9911",r:"1.39737",transform:"rotate(-90 14.5849 25.9911)",fill:"#3056D3"}),s.jsx("circle",{cx:"26.7216",cy:"25.9911",r:"1.39737",transform:"rotate(-90 26.7216 25.9911)",fill:"#3056D3"}),s.jsx("circle",{cx:"2.288",cy:"13.6944",r:"1.39737",transform:"rotate(-90 2.288 13.6944)",fill:"#3056D3"}),s.jsx("circle",{cx:"14.5849",cy:"13.6943",r:"1.39737",transform:"rotate(-90 14.5849 13.6943)",fill:"#3056D3"}),s.jsx("circle",{cx:"26.7216",cy:"13.6943",r:"1.39737",transform:"rotate(-90 26.7216 13.6943)",fill:"#3056D3"}),s.jsx("circle",{cx:"2.288",cy:"38.0087",r:"1.39737",transform:"rotate(-90 2.288 38.0087)",fill:"#3056D3"}),s.jsx("circle",{cx:"2.288",cy:"1.39739",r:"1.39737",transform:"rotate(-90 2.288 1.39739)",fill:"#3056D3"}),s.jsx("circle",{cx:"14.5849",cy:"38.0089",r:"1.39737",transform:"rotate(-90 14.5849 38.0089)",fill:"#3056D3"}),s.jsx("circle",{cx:"26.7216",cy:"38.0089",r:"1.39737",transform:"rotate(-90 26.7216 38.0089)",fill:"#3056D3"}),s.jsx("circle",{cx:"14.5849",cy:"1.39761",r:"1.39737",transform:"rotate(-90 14.5849 1.39761)",fill:"#3056D3"}),s.jsx("circle",{cx:"26.7216",cy:"1.39761",r:"1.39737",transform:"rotate(-90 26.7216 1.39761)",fill:"#3056D3"})]})})]})]})})})})})}},9703:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(5344);r(3729);let a=()=>s.jsx("span",{className:"ml-1.5 h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-t-transparent"})},2879:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>c});var s=r(5036);r(2);let a=(0,r(6843).createProxy)(String.raw`/Users/dev/Documents/GitHub/rb-construction/src/components/Auth/ResetPassword/index.tsx`),{__esModule:o,$$typeof:i}=a,n=a.default;var l=r(9315);let c={title:"Reset Password | Play SaaS Starter Kit and Boilerplate for Next.js"},d=({params:e})=>(0,s.jsxs)(s.Fragment,{children:[s.jsx(l.Z,{pageName:"Reset Password"}),s.jsx(n,{token:e.token})]})},4669:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>U});var s,a=r(3729);let o={data:""},i=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||o,n=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,c=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":s+="f"==o[1]?d(i,o):o+"{"+d(i,"k"==o[1]?"":t)+"}":"object"==typeof i?s+=d(i,t?t.replace(/([^,])+/g,e=>o.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(o,i):o+":"+i+";")}return r+(t&&a?t+"{"+a+"}":a)+s},p={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e},x=(e,t,r,s,a)=>{let o=u(e),i=p[o]||(p[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!p[i]){let t=o!==e?e:(e=>{let t,r,s=[{}];for(;t=n.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(r=t[3].replace(c," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(c," ").trim();return s[0]})(e);p[i]=d(a?{["@keyframes "+i]:t}:t,r?"":"."+i)}let x=r&&p.g?p.g:null;return r&&(p.g=p[i]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(p[i],t,s,x),i},m=(e,t,r)=>e.reduce((e,s,a)=>{let o=t[a];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==o?"":o)},"");function f(e){let t=this||{},r=e.call?e(t.p):e;return x(r.unshift?r.raw?m(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,i(t.target),t.g,t.o,t.k)}f.bind({g:1});let h,g,b,y=f.bind({k:1});function w(e,t){let r=this||{};return function(){let s=arguments;function a(o,i){let n=Object.assign({},o),l=n.className||a.className;r.p=Object.assign({theme:g&&g()},n),r.o=/ *go\d+/.test(l),n.className=f.apply(r,s)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),b&&c[0]&&b(n),h(c,n)}return t?t(a):a}}var v=e=>"function"==typeof e,j=(e,t)=>v(e)?e(t):e,k=(()=>{let e=0;return()=>(++e).toString()})(),P=((()=>{let e;return()=>e})(),new Map),D=e=>{if(P.has(e))return;let t=setTimeout(()=>{P.delete(e),A({type:4,toastId:e})},1e3);P.set(e,t)},N=e=>{let t=P.get(e);t&&clearTimeout(t)},q=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&N(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return e.toasts.find(e=>e.id===r.id)?q(e,{type:1,toast:r}):q(e,{type:0,toast:r});case 3:let{toastId:s}=t;return s?D(s):e.toasts.forEach(e=>{D(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},_=[],$={toasts:[],pausedAt:void 0},A=e=>{$=q($,e),_.forEach(e=>{e($)})},G={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||k()}),Z=e=>(t,r)=>{let s=S(t,e,r);return A({type:2,toast:s}),s.id},E=(e,t)=>Z("blank")(e,t);E.error=Z("error"),E.success=Z("success"),E.loading=Z("loading"),E.custom=Z("custom"),E.dismiss=e=>{A({type:3,toastId:e})},E.remove=e=>A({type:4,toastId:e}),E.promise=(e,t,r)=>{let s=E.loading(t.loading,{...r,...null==r?void 0:r.loading});return e.then(e=>(E.success(j(t.success,e),{id:s,...r,...null==r?void 0:r.success}),e)).catch(e=>{E.error(j(t.error,e),{id:s,...r,...null==r?void 0:r.error})}),e};var F=y`
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
}`,I=(w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${F} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`),R=(w("div")`
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
}`,O=(w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,w("div")`
  position: absolute;
`,w("div")`
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
}`);w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${O} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,w("div")`
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
`,w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,s=a.createElement,d.p=void 0,h=s,g=void 0,b=void 0,f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var U=E}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,845,608,211],()=>r(3070));module.exports=s})();