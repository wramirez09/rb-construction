"use strict";exports.id=632,exports.ids=[632],exports.modules={7090:(e,t,r)=>{r.d(t,{Z:()=>d});var a=r(5344),o=r(3729),i=r(4669),s=r(9703);let d=()=>{let[e,t]=(0,o.useState)(""),[r,d]=(0,o.useState)(!1);return(0,a.jsxs)("form",{onSubmit:t=>{if(t.preventDefault(),!e)return i.ZP.error("Please enter your email address.");d(!0)},children:[a.jsx("div",{className:"mb-[22px]",children:a.jsx("input",{type:"email",placeholder:"Email",name:"email",required:!0,value:e,onChange:e=>t(e.target.value.toLowerCase()),className:"w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"})}),a.jsx("div",{className:"mb-9",children:(0,a.jsxs)("button",{type:"submit",className:"flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-blue-dark",children:["Send Magic Link ",r&&a.jsx(s.Z,{})]})})]})}},693:(e,t,r)=>{r.d(t,{Z:()=>i});var a=r(5344);r(3729);var o=r(7674);let i=()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("button",{onClick:()=>(0,o.signIn)("google"),className:"flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-4 p-3.5 text-dark duration-200 ease-in hover:border-gray-5 hover:bg-gray dark:border-dark-3 dark:text-white dark:hover:bg-dark-3",children:[(0,a.jsxs)("svg",{width:"23",height:"22",viewBox:"0 0 23 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsxs)("g",{clipPath:"url(#clip0_709_8846)",children:[a.jsx("path",{d:"M22.5001 11.2438C22.5134 10.4876 22.4338 9.73256 22.2629 8.995H11.7246V13.0771H17.9105C17.7933 13.7929 17.5296 14.478 17.1352 15.0914C16.7409 15.7047 16.224 16.2335 15.6158 16.646L15.5942 16.7827L18.9264 19.3124L19.1571 19.335C21.2772 17.4161 22.4997 14.5926 22.4997 11.2438",fill:"#4285F4"}),a.jsx("path",{d:"M11.7245 22C14.755 22 17.2992 21.0221 19.1577 19.3355L15.6156 16.6464C14.6679 17.2944 13.3958 17.7467 11.7245 17.7467C10.3051 17.7385 8.92433 17.2926 7.77814 16.472C6.63195 15.6515 5.77851 14.4981 5.33892 13.1755L5.20737 13.1865L1.74255 15.8142L1.69727 15.9376C2.63043 17.7602 4.06252 19.2925 5.83341 20.3631C7.60429 21.4337 9.64416 22.0005 11.7249 22",fill:"#34A853"}),a.jsx("path",{d:"M5.33889 13.1755C5.09338 12.4753 4.96669 11.7404 4.96388 11C4.9684 10.2608 5.09041 9.52685 5.32552 8.8245L5.31927 8.67868L1.81196 6.00867L1.69724 6.06214C0.910039 7.5938 0.5 9.28491 0.5 10.9999C0.5 12.7148 0.910039 14.406 1.69724 15.9376L5.33889 13.1755Z",fill:"#FBBC05"}),a.jsx("path",{d:"M11.7249 4.25337C13.3333 4.22889 14.8888 4.8159 16.065 5.89121L19.2329 2.86003C17.2011 0.992106 14.5106 -0.0328008 11.7249 3.27798e-05C9.64418 -0.000452376 7.60433 0.566279 5.83345 1.63686C4.06256 2.70743 2.63046 4.23965 1.69727 6.06218L5.32684 8.82455C5.77077 7.50213 6.62703 6.34962 7.77491 5.5295C8.9228 4.70938 10.3044 4.26302 11.7249 4.25337Z",fill:"#EB4335"})]}),a.jsx("defs",{children:a.jsx("clipPath",{id:"clip0_709_8846",children:a.jsx("rect",{width:"22",height:"22",fill:"white",transform:"translate(0.5)"})})})]}),"Sign in with Google"]}),(0,a.jsxs)("button",{onClick:()=>(0,o.signIn)("github"),className:"mt-4 flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-4 p-3.5 text-dark duration-200 ease-in hover:border-gray-5 hover:bg-gray dark:border-dark-3 dark:text-white dark:hover:bg-dark-3",children:[a.jsx("svg",{width:"22",height:"22",viewBox:"0 0 22 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:a.jsx("path",{d:"M10.9997 1.83331C5.93773 1.83331 1.83301 6.04119 1.83301 11.232C1.83301 15.3847 4.45954 18.9077 8.10178 20.1505C8.55988 20.2375 8.72811 19.9466 8.72811 19.6983C8.72811 19.4743 8.71956 18.7338 8.71567 17.9485C6.16541 18.517 5.6273 16.8395 5.6273 16.8395C5.21032 15.7532 4.60951 15.4644 4.60951 15.4644C3.77785 14.8811 4.6722 14.893 4.6722 14.893C5.59272 14.9593 6.07742 15.8615 6.07742 15.8615C6.89499 17.2984 8.22184 16.883 8.74493 16.6429C8.82718 16.0353 9.06478 15.6208 9.32694 15.3861C7.2909 15.1484 5.15051 14.3425 5.15051 10.7412C5.15051 9.71509 5.5086 8.87661 6.09503 8.21844C5.99984 7.98167 5.68611 7.02577 6.18382 5.73115C6.18382 5.73115 6.95358 5.47855 8.70532 6.69458C9.43648 6.48627 10.2207 6.3819 10.9997 6.37836C11.7787 6.3819 12.5635 6.48627 13.2961 6.69458C15.0457 5.47855 15.8145 5.73115 15.8145 5.73115C16.3134 7.02577 15.9995 7.98167 15.9043 8.21844C16.4921 8.87661 16.8477 9.715 16.8477 10.7412C16.8477 14.351 14.7033 15.146 12.662 15.3786C12.9909 15.6702 13.2838 16.2423 13.2838 17.1191C13.2838 18.3766 13.2732 19.3888 13.2732 19.6983C13.2732 19.9485 13.4382 20.2415 13.9028 20.1492C17.5431 18.905 20.1663 15.3833 20.1663 11.232C20.1663 6.04119 16.0621 1.83331 10.9997 1.83331Z",fill:"currentColor"})}),"Sign in with Github"]})]})},1298:(e,t,r)=>{r.d(t,{Z:()=>o});var a=r(5344);r(3729);let o=({isPassword:e,setIsPassword:t})=>(0,a.jsxs)("div",{className:"dark:border-strokedark mx-auto mb-8 flex  flex-col items-center justify-center gap-2.5 rounded-lg border border-stroke bg-gray p-2 dark:border-dark-3 dark:bg-gray-800 md:flex-row ",children:[a.jsx("button",{className:`w-full rounded-lg border px-6 py-3 text-base outline-none transition-all duration-300 hover:border-dark-3 hover:bg-dark-3 hover:text-white dark:border-transparent dark:hover:bg-dark-3 dark:hover:shadow-none  ${!e&&"bg-dark-3 text-white"}`,onClick:()=>t(!1),children:"Magic Link"}),a.jsx("button",{className:`w-full rounded-lg border px-6 py-3 text-base outline-none transition-all duration-300 hover:border-dark-3 hover:bg-dark-3 hover:text-white dark:border-transparent dark:hover:bg-dark-3 dark:hover:shadow-none  ${e&&" bg-dark-3 text-white"}`,onClick:()=>t(!0),children:"Password"})]})},9703:(e,t,r)=>{r.d(t,{Z:()=>o});var a=r(5344);r(3729);let o=()=>a.jsx("span",{className:"ml-1.5 h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-t-transparent"})},4669:(e,t,r)=>{r.d(t,{ZP:()=>T});var a,o=r(3729);let i={data:""},s=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||i,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?c(s,i):i+"{"+c(s,"k"==i[1]?"":t)+"}":"object"==typeof s?a+=c(s,t?t.replace(/([^,])+/g,e=>i.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=c.p?c.p(i,s):i+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+a},p={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e},h=(e,t,r,a,o)=>{let i=u(e),s=p[i]||(p[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!p[s]){let t=i!==e?e:(e=>{let t,r,a=[{}];for(;t=d.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);p[s]=c(o?{["@keyframes "+s]:t}:t,r?"":"."+s)}let h=r&&p.g?p.g:null;return r&&(p.g=p[s]),((e,t,r,a)=>{a?t.data=t.data.replace(a,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(p[s],t,a,h),s},g=(e,t,r)=>e.reduce((e,a,o)=>{let i=t[o];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function b(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,s(t.target),t.g,t.o,t.k)}b.bind({g:1});let m,f,x,y=b.bind({k:1});function v(e,t){let r=this||{};return function(){let a=arguments;function o(i,s){let d=Object.assign({},i),n=d.className||o.className;r.p=Object.assign({theme:f&&f()},d),r.o=/ *go\d+/.test(n),d.className=b.apply(r,a)+(n?" "+n:""),t&&(d.ref=s);let l=e;return e[0]&&(l=d.as||e,delete d.as),x&&l[0]&&x(d),m(l,d)}return t?t(o):o}}var w=e=>"function"==typeof e,k=(e,t)=>w(e)?e(t):e,C=(()=>{let e=0;return()=>(++e).toString()})(),j=((()=>{let e;return()=>e})(),new Map),L=e=>{if(j.has(e))return;let t=setTimeout(()=>{j.delete(e),A({type:4,toastId:e})},1e3);j.set(e,t)},$=e=>{let t=j.get(e);t&&clearTimeout(t)},N=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&$(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return e.toasts.find(e=>e.id===r.id)?N(e,{type:1,toast:r}):N(e,{type:0,toast:r});case 3:let{toastId:a}=t;return a?L(a):e.toasts.forEach(e=>{L(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},Z=[],M={toasts:[],pausedAt:void 0},A=e=>{M=N(M,e),Z.forEach(e=>{e(M)})},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},S=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||C()}),F=e=>(t,r)=>{let a=S(t,e,r);return A({type:2,toast:a}),a.id},P=(e,t)=>F("blank")(e,t);P.error=F("error"),P.success=F("success"),P.loading=F("loading"),P.custom=F("custom"),P.dismiss=e=>{A({type:3,toastId:e})},P.remove=e=>A({type:4,toastId:e}),P.promise=(e,t,r)=>{let a=P.loading(t.loading,{...r,...null==r?void 0:r.loading});return e.then(e=>(P.success(k(t.success,e),{id:a,...r,...null==r?void 0:r.success}),e)).catch(e=>{P.error(k(t.error,e),{id:a,...r,...null==r?void 0:r.error})}),e};var _=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,E=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,B=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${z} 0.15s ease-out forwards;
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
    animation: ${E} 0.15s ease-out forwards;
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
`),D=(v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),O=y`
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
}`,H=(v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${O} 0.2s ease-out forwards;
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
  animation: ${H} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,a=o.createElement,c.p=void 0,m=a,f=void 0,x=void 0,b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var T=P}};