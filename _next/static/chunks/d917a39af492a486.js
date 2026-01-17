(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},18566,(e,t,r)=>{t.exports=e.r(76562)},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={assign:function(){return l},searchParamsToUrlQuery:function(){return s},urlQueryToSearchParams:function(){return o}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});function s(e){let t={};for(let[r,a]of e.entries()){let e=t[r];void 0===e?t[r]=a:Array.isArray(e)?e.push(a):t[r]=[e,a]}return t}function i(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function o(e){let t=new URLSearchParams;for(let[r,a]of Object.entries(e))if(Array.isArray(a))for(let e of a)t.append(r,i(e));else t.set(r,i(a));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,a]of r.entries())e.append(t,a)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={formatUrl:function(){return o},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let s=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/;function o(e){let{auth:t,hostname:r}=e,a=e.protocol||"",n=e.pathname||"",o=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(s.urlQueryToSearchParams(l)));let d=e.search||l&&`?${l}`||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||i.test(a))&&!1!==c?(c="//"+(c||""),n&&"/"!==n[0]&&(n="/"+n)):c||(c=""),o&&"#"!==o[0]&&(o="#"+o),d&&"?"!==d[0]&&(d="?"+d),n=n.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${a}${c}${n}${d}${o}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return o(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let a=e.r(71645);function n(e,t){let r=(0,a.useRef)(null),n=(0,a.useRef)(null);return(0,a.useCallback)(a=>{if(null===a){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=s(e,a)),t&&(n.current=s(t,a))},[e,t])}function s(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={DecodeError:function(){return g},MiddlewareNotFoundError:function(){return w},MissingStaticPage:function(){return j},NormalizeError:function(){return b},PageNotFoundError:function(){return y},SP:function(){return x},ST:function(){return h},WEB_VITALS:function(){return s},execOnce:function(){return i},getDisplayName:function(){return p},getLocationOrigin:function(){return c},getURL:function(){return d},isAbsoluteUrl:function(){return l},isResSent:function(){return u},loadGetInitialProps:function(){return m},normalizeRepeatedSlashes:function(){return f},stringifyError:function(){return v}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let s=["CLS","FCP","FID","INP","LCP","TTFB"];function i(e){let t,r=!1;return(...a)=>(r||(r=!0,t=e(...a)),t)}let o=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>o.test(e);function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function d(){let{href:e}=window.location,t=c();return e.substring(t.length)}function p(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function u(e){return e.finished||e.headersSent}function f(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function m(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await m(t.Component,t.ctx)}:{};let a=await e.getInitialProps(t);if(r&&u(r))return a;if(!a)throw Object.defineProperty(Error(`"${p(e)}.getInitialProps()" should resolve to an object. But found "${a}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return a}let x="u">typeof performance,h=x&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class g extends Error{}class b extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class j extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class w extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function v(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return s}});let a=e.r(18967),n=e.r(52817);function s(e){if(!(0,a.isAbsoluteUrl)(e))return!0;try{let t=(0,a.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,n.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return g},useLinkStatus:function(){return y}};for(var n in a)Object.defineProperty(r,n,{enumerable:!0,get:a[n]});let s=e.r(90809),i=e.r(43476),o=s._(e.r(71645)),l=e.r(95057),c=e.r(8372),d=e.r(18581),p=e.r(18967),u=e.r(5550);e.r(33525);let f=e.r(91949),m=e.r(73668),x=e.r(9396);function h(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}function g(t){var r;let a,n,s,[l,g]=(0,o.useOptimistic)(f.IDLE_LINK_STATUS),y=(0,o.useRef)(null),{href:j,as:w,children:v,prefetch:N=null,passHref:S,replace:k,shallow:C,scroll:_,onClick:A,onMouseEnter:P,onTouchStart:E,legacyBehavior:O=!1,onNavigate:T,ref:R,unstable_dynamicOnHover:M,...F}=t;a=v,O&&("string"==typeof a||"number"==typeof a)&&(a=(0,i.jsx)("a",{children:a}));let I=o.default.useContext(c.AppRouterContext),D=!1!==N,z=!1!==N?null===(r=N)||"auto"===r?x.FetchStrategy.PPR:x.FetchStrategy.Full:x.FetchStrategy.PPR,{href:L,as:$}=o.default.useMemo(()=>{let e=h(j);return{href:e,as:w?h(w):e}},[j,w]);if(O){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});n=o.default.Children.only(a)}let U=O?n&&"object"==typeof n&&n.ref:R,K=o.default.useCallback(e=>(null!==I&&(y.current=(0,f.mountLinkInstance)(e,L,I,z,D,g)),()=>{y.current&&((0,f.unmountLinkForCurrentNavigation)(y.current),y.current=null),(0,f.unmountPrefetchableInstance)(e)}),[D,L,I,z,g]),W={ref:(0,d.useMergedRef)(K,U),onClick(t){O||"function"!=typeof A||A(t),O&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!I||t.defaultPrevented||function(t,r,a,n,s,i,l){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,m.isLocalURL)(r)){s&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:p}=e.r(99781);o.default.startTransition(()=>{p(a||r,s?"replace":"push",i??!0,n.current)})}}(t,L,$,y,k,_,T)},onMouseEnter(e){O||"function"!=typeof P||P(e),O&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),I&&D&&(0,f.onNavigationIntent)(e.currentTarget,!0===M)},onTouchStart:function(e){O||"function"!=typeof E||E(e),O&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),I&&D&&(0,f.onNavigationIntent)(e.currentTarget,!0===M)}};return(0,p.isAbsoluteUrl)($)?W.href=$:O&&!S&&("a"!==n.type||"href"in n.props)||(W.href=(0,u.addBasePath)($)),s=O?o.default.cloneElement(n,W):(0,i.jsx)("a",{...F,...W,children:a}),(0,i.jsx)(b.Provider,{value:l,children:s})}e.r(84508);let b=(0,o.createContext)(f.IDLE_LINK_STATUS),y=()=>(0,o.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},75254,e=>{"use strict";var t=e.i(71645);let r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},a=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:s=2,absoluteStrokeWidth:i,className:o="",children:l,iconNode:c,...d},p)=>(0,t.createElement)("svg",{ref:p,...n,width:r,height:r,stroke:e,strokeWidth:i?24*Number(s)/Number(r):s,className:a("lucide",o),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(d)&&{"aria-hidden":"true"},...d},[...c.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(l)?l:[l]])),i=(e,n)=>{let i=(0,t.forwardRef)(({className:i,...o},l)=>(0,t.createElement)(s,{ref:l,iconNode:n,className:a(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,i),...o}));return i.displayName=r(e),i};e.s(["default",()=>i],75254)},71689,e=>{"use strict";let t=(0,e.i(75254).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",()=>t],71689)},9165,e=>{"use strict";let t="https://script.google.com/macros/s/AKfycbw1liGOq7-6mWTfgw3QsoTKvHl7MIqzn96XPx43JwGcEciv2tP4hSedoemyt0f_ZXEYzw/exec";async function r(e,r){let a=await fetch(`${t}?branch=${e}&month=${r}`),n=await a.json();if(!n.success)throw Error(n.error);return n.students}async function a(e,r,a){let n=await fetch(t,{method:"POST",body:JSON.stringify({action:"mark_paid",id:e,branch:r,month:a})}),s=await n.json();if(!s.success)throw Error(s.error)}async function n(e,r,a){let n=await fetch(t,{method:"POST",body:JSON.stringify({action:"mark_break",id:e,branch:r,month:a})}),s=await n.json();if(!s.success)throw Error(s.error)}async function s(e,r,a){let n=await fetch(t,{method:"POST",body:JSON.stringify({action:"mark_discontinued",id:e,branch:r,month:a})}),s=await n.json();if(!s.success)throw Error(s.error)}async function i(e,r,a,n,s,i){let o=await fetch(t,{method:"POST",body:JSON.stringify({action:"add_student",branch:e,id:r,name:a,fee:n,phone:s,joinMonth:i})}),l=await o.json();if(!l.success)throw Error(l.error);return l.data}async function o(e){let r=await fetch(t,{method:"POST",body:JSON.stringify({action:"get_dev_fund",branch:e})}),a=await r.json();if(!a.success)throw Error(a.error);return a.data}async function l(e,r,a,n){let s=await fetch(t,{method:"POST",body:JSON.stringify({action:"add_dev_expense",branch:e,month:r,description:a,amount:n})}),i=await s.json();if(!i.success)throw Error(i.error);return i.data}async function c(e){let r=await fetch(t,{method:"POST",body:JSON.stringify({action:"get_referral_credits",branch:e})}),a=await r.json();if(!a.success)throw Error(a.error);return a.data}async function d(e,r,a,n,s,i){let o=await fetch(t,{method:"POST",body:JSON.stringify({action:"add_referral_credit",branch:e,studentId:r,amount:a,reason:n,usedInMonth:s,usedDate:i})}),l=await o.json();if(!l.success)throw Error(l.error);return l.data}async function p(e,r){let a=await fetch(t,{method:"POST",body:JSON.stringify({action:"get_student_credits",studentId:e,branch:r})}),n=await a.json();if(!n.success)throw Error(n.error);return n.data}async function u(e,r,a,n){let s=await fetch(t,{method:"POST",body:JSON.stringify({action:"mark_paid_with_credit",id:e,branch:r,month:a,creditId:n})}),i=await s.json();if(!i.success)throw Error(i.error)}async function f(e,r){let a=await fetch(t,{method:"POST",body:JSON.stringify({action:"get_financial_summary",branch:e,month:r})}),n=await a.json();if(!n.success)throw Error(n.error);return n.data}Array.from({length:12},(e,t)=>({month:t,year:"2026",collected:0,devFund:0,spent:0,carryForward:0})),e.s(["addDevelopmentExpense",()=>l,"addReferralCredit",()=>d,"addStudent",()=>i,"getDevelopmentFundData",()=>o,"getFinancialSummary",()=>f,"getReferralCredits",()=>c,"getStudentAvailableCredits",()=>p,"getStudents",()=>r,"markBreak",()=>n,"markDiscontinued",()=>s,"markPaid",()=>a,"markPaidWithCredit",()=>u])},79474,(e,t,r)=>{"use strict";var a=e.r(71645).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;r.c=function(e){return a.H.useMemoCache(e)}},932,(e,t,r)=>{"use strict";t.exports=e.r(79474)},30699,e=>{"use strict";let t=(0,e.i(75254).default)("gift",[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]]);e.s(["Gift",()=>t],30699)},87073,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(18566),n=e.i(22016),s=e.i(71689),i=e.i(30699),o=e.i(9165),l=e.i(932);let c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function d(e){let a,n,s,i,o,d,p,u,f,m,x,h,g,b,y,j,w,v,N,S,k,C,_,A,P,E,O,T,R,M,F,I,D,z,L,$,U,K,W,B,J,G,H,X,Y,Z,q,Q,V,ee,et,er,ea,en,es=(0,l.c)(87),{student:ei,month:eo,branch:el,onClose:ec}=e,ed=(0,r.useRef)(null);es[0]!==el?(a="MPSC"===el?"MP Sports Club":el?.toUpperCase(),es[0]=el,es[1]=a):a=es[1];let ep=a;es[2]!==el?(n=el.substring(0,1).toUpperCase(),es[2]=el,es[3]=n):n=es[3],es[4]===Symbol.for("react.memo_cache_sentinel")?(s=Date.now().toString().slice(-4),es[4]=s):s=es[4];let eu=`SKF-${n}-${s}`;es[5]===Symbol.for("react.memo_cache_sentinel")?(i=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}),es[5]=i):i=es[5];let ef=i;es[6]!==ei.fee?(o=ei.fee.toLocaleString(),es[6]=ei.fee,es[7]=o):o=es[7];let em=`Rupees ${o} Only`;es[8]!==em||es[9]!==ep||es[10]!==eo||es[11]!==eu||es[12]!==ei.fee||es[13]!==ei.id||es[14]!==ei.name?(d=()=>{let e=window.open("","_blank","width=600,height=800");if(!e)return void alert("Please allow popups to download the receipt.");let t=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${ei.id}_${c[eo]}2026_Fee</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    @page {
      size: 110mm 175mm;
      margin: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .receipt {
      width: 110mm;
      height: 175mm;
      margin: 0 auto;
      background: white;
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #1a1f2e, #0f1419);
      padding: 24px;
      text-align: center;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .logo {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: contain;
      border: 1px solid rgba(212, 175, 55, 0.5);
      background: rgba(255, 255, 255, 0.05);
      margin-bottom: 12px;
    }
    
    .header h1 {
      color: white;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 0.2em;
    }
    
    .header p {
      color: #d4af37;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      margin-top: 4px;
    }
    
    .section {
      padding: 20px 24px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .section:last-of-type {
      border-bottom: none;
    }
    
    .title {
      text-align: center;
      margin-bottom: 16px;
    }
    
    .title h2 {
      color: #1a1f2e;
      font-size: 16px;
      font-weight: 900;
    }
    
    .title p {
      color: #6b7280;
      font-size: 10px;
      margin-top: 4px;
    }
    
    .row {
      display: table;
      width: 100%;
      margin-bottom: 8px;
    }
    
    .row:last-child {
      margin-bottom: 0;
    }
    
    .label {
      display: table-cell;
      color: #4b5563;
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      width: 50%;
      vertical-align: middle;
    }
    
    .value {
      display: table-cell;
      color: #1a1f2e;
      font-weight: 700;
      font-size: 12px;
      text-align: right;
      width: 50%;
      vertical-align: middle;
    }
    
    .id-badge {
      background: #b8860b;
      color: white;
      font-size: 9px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 700;
      display: inline-block;
      margin-top: 4px;
    }
    
    .amount-box {
      margin-top: 20px;
      padding: 16px;
      border-radius: 12px;
      border: 2px solid #d4af37;
      background: linear-gradient(135deg, #fafbfc, #f3f4f6);
      text-align: center;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .amount-box .amount {
      font-size: 24px;
      font-weight: 900;
      color: #1a1f2e;
    }
    
    .amount-box .words {
      font-size: 10px;
      font-style: italic;
      color: #6b7280;
      margin-top: 4px;
    }
    
    .status {
      margin-top: 16px;
      text-align: center;
      font-weight: 700;
      font-size: 12px;
      color: #16a34a;
    }
    
    .stamp {
      text-align: center;
      margin-top: 8px;
    }
    
    .stamp img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      transform: rotate(-12deg);
    }
    
    .footer {
      background: linear-gradient(135deg, #1a1f2e, #0f1419);
      padding: 12px;
      text-align: center;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .footer p {
      color: #d1d5db;
      font-size: 8px;
    }
    
    @media print {
      body { background: white; }
      .receipt { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <img src="/logo.png" alt="SKF" class="logo">
      <h1>S K F</h1>
      <p>Sports Karate-do Fitness & Self Defence Association \xae</p>
    </div>
    
    <div class="section">
      <div class="title">
        <h2>Monthly Fee Receipt</h2>
        <p>Payment confirmation</p>
      </div>
      
      <div class="row">
        <span class="label">Branch</span>
        <span class="value">${ep}</span>
      </div>
      <div class="row">
        <span class="label">Receipt No</span>
        <span class="value">${eu}</span>
      </div>
      <div class="row">
        <span class="label">Date</span>
        <span class="value">${ef}</span>
      </div>
    </div>
    
    <div class="section">
      <div class="row">
        <span class="label">Parent / Guardian</span>
        <span class="value">N/A</span>
      </div>
      <div class="row">
        <span class="label">Student Name</span>
        <span class="value">
          ${ei.name}<br>
          <span class="id-badge">${ei.id}</span>
        </span>
      </div>
      <div class="row">
        <span class="label">Purpose</span>
        <span class="value">Monthly Training Fee</span>
      </div>
      
      <div class="amount-box">
        <div class="amount">₹ ${ei.fee.toLocaleString()}</div>
        <div class="words">${em}</div>
      </div>
      
      <div class="status">✔ Payment Received with Thanks</div>
      
      <div class="stamp">
        <img src="/stamp.png" alt="PAID">
      </div>
    </div>
    
    <div class="footer">
      <p>This receipt is issued for confirmation and record purposes only.</p>
    </div>
  </div>
  
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
        window.onafterprint = function() { window.close(); };
      }, 500);
    };
  </script>
</body>
</html>
    `;e.document.write(t),e.document.close()},es[8]=em,es[9]=ep,es[10]=eo,es[11]=eu,es[12]=ei.fee,es[13]=ei.id,es[14]=ei.name,es[15]=d):d=es[15];let ex=d;return es[16]===Symbol.for("react.memo_cache_sentinel")?(p={position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"},u={width:"100%",maxWidth:"520px",maxHeight:"90vh",overflowY:"auto"},es[16]=p,es[17]=u):(p=es[16],u=es[17]),es[18]===Symbol.for("react.memo_cache_sentinel")?(x={backgroundColor:"#ffffff",color:"#1a1f2e",borderRadius:"12px",overflow:"hidden",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},f={background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"24px",textAlign:"center"},m={display:"flex",justifyContent:"center",marginBottom:"12px"},es[18]=f,es[19]=m,es[20]=x):(f=es[18],m=es[19],x=es[20]),es[21]===Symbol.for("react.memo_cache_sentinel")?(h=(0,t.jsxs)("div",{style:f,children:[(0,t.jsx)("div",{style:m,children:(0,t.jsx)("img",{src:"/logo.png",alt:"SKF",style:{width:"70px",height:"70px",borderRadius:"50%",objectFit:"contain",border:"1px solid rgba(212, 175, 55, 0.5)",backgroundColor:"rgba(255, 255, 255, 0.05)"}})}),(0,t.jsx)("h1",{style:{color:"#ffffff",fontSize:"28px",fontWeight:900,letterSpacing:"0.2em",margin:0},children:"SKF"}),(0,t.jsx)("p",{style:{color:"#d4af37",fontSize:"11px",fontWeight:600,letterSpacing:"0.1em",marginTop:"4px"},children:"Sports Karate-do Fitness & Self Defence Association ®"})]}),g={padding:"24px",borderBottom:"1px solid #e5e7eb"},b=(0,t.jsxs)("div",{style:{textAlign:"center",marginBottom:"16px"},children:[(0,t.jsx)("h2",{style:{color:"#1a1f2e",fontSize:"18px",fontWeight:900,margin:0},children:"Monthly Fee Receipt"}),(0,t.jsx)("p",{style:{color:"#6b7280",fontSize:"11px",marginTop:"4px"},children:"Payment confirmation"})]}),y={width:"100%",borderCollapse:"collapse"},j=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Branch"}),w={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},es[21]=h,es[22]=g,es[23]=b,es[24]=y,es[25]=j,es[26]=w):(h=es[21],g=es[22],b=es[23],y=es[24],j=es[25],w=es[26]),es[27]!==ep?(v=(0,t.jsxs)("tr",{children:[j,(0,t.jsx)("td",{style:w,children:ep})]}),es[27]=ep,es[28]=v):v=es[28],es[29]===Symbol.for("react.memo_cache_sentinel")?(N=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Receipt No"}),S={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},es[29]=N,es[30]=S):(N=es[29],S=es[30]),es[31]!==eu?(k=(0,t.jsxs)("tr",{children:[N,(0,t.jsx)("td",{style:S,children:eu})]}),es[31]=eu,es[32]=k):k=es[32],es[33]===Symbol.for("react.memo_cache_sentinel")?(C=(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Date"}),(0,t.jsx)("td",{style:{color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},children:ef})]}),es[33]=C):C=es[33],es[34]!==v||es[35]!==k?(_=(0,t.jsxs)("div",{style:g,children:[b,(0,t.jsx)("table",{style:y,children:(0,t.jsxs)("tbody",{children:[v,k,C]})})]}),es[34]=v,es[35]=k,es[36]=_):_=es[36],es[37]===Symbol.for("react.memo_cache_sentinel")?(A={padding:"24px",position:"relative"},P={width:"100%",borderCollapse:"collapse"},E=(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Parent / Guardian"}),(0,t.jsx)("td",{style:{color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},children:"N/A"})]}),O=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"top"},children:"Student Name"}),T={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"top"},es[37]=A,es[38]=P,es[39]=E,es[40]=O,es[41]=T):(A=es[37],P=es[38],E=es[39],O=es[40],T=es[41]),es[42]===Symbol.for("react.memo_cache_sentinel")?(R=(0,t.jsx)("br",{}),M={backgroundColor:"#b8860b",color:"#ffffff",fontSize:"10px",padding:"2px 8px",borderRadius:"4px",fontWeight:700,display:"inline-block",marginTop:"4px"},es[42]=R,es[43]=M):(R=es[42],M=es[43]),es[44]!==ei.id?(F=(0,t.jsx)("span",{style:M,children:ei.id}),es[44]=ei.id,es[45]=F):F=es[45],es[46]!==ei.name||es[47]!==F?(I=(0,t.jsxs)("tr",{children:[O,(0,t.jsxs)("td",{style:T,children:[ei.name,R,F]})]}),es[46]=ei.name,es[47]=F,es[48]=I):I=es[48],es[49]===Symbol.for("react.memo_cache_sentinel")?(D=(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Purpose"}),(0,t.jsx)("td",{style:{color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},children:"Monthly Training Fee"})]}),es[49]=D):D=es[49],es[50]!==I?(z=(0,t.jsx)("table",{style:P,children:(0,t.jsxs)("tbody",{children:[E,I,D]})}),es[50]=I,es[51]=z):z=es[51],es[52]===Symbol.for("react.memo_cache_sentinel")?(L={marginTop:"24px",padding:"16px",borderRadius:"12px",border:"2px solid #d4af37",background:"linear-gradient(135deg, #fafbfc, #f3f4f6)",textAlign:"center"},$={fontSize:"28px",fontWeight:900,color:"#1a1f2e"},es[52]=L,es[53]=$):(L=es[52],$=es[53]),es[54]!==ei.fee?(U=ei.fee.toLocaleString(),es[54]=ei.fee,es[55]=U):U=es[55],es[56]!==U?(K=(0,t.jsxs)("div",{style:$,children:["₹ ",U]}),es[56]=U,es[57]=K):K=es[57],es[58]===Symbol.for("react.memo_cache_sentinel")?(W={fontSize:"11px",fontStyle:"italic",color:"#6b7280",marginTop:"4px"},es[58]=W):W=es[58],es[59]!==em?(B=(0,t.jsx)("div",{style:W,children:em}),es[59]=em,es[60]=B):B=es[60],es[61]!==K||es[62]!==B?(J=(0,t.jsxs)("div",{style:L,children:[K,B]}),es[61]=K,es[62]=B,es[63]=J):J=es[63],es[64]===Symbol.for("react.memo_cache_sentinel")?(G=(0,t.jsx)("div",{style:{marginTop:"16px",textAlign:"center",fontWeight:700,fontSize:"13px",color:"#16a34a"},children:"✔ Payment Received with Thanks"}),H={display:"flex",justifyContent:"center",marginTop:"8px",opacity:.9},es[64]=G,es[65]=H):(G=es[64],H=es[65]),es[66]===Symbol.for("react.memo_cache_sentinel")?(X=(0,t.jsx)("div",{style:H,children:(0,t.jsx)("img",{src:"/stamp.png",alt:"PAID",style:{width:"96px",height:"96px",objectFit:"contain",transform:"rotate(-12deg)"}})}),es[66]=X):X=es[66],es[67]!==z||es[68]!==J?(Y=(0,t.jsxs)("div",{style:A,children:[z,J,G,X]}),es[67]=z,es[68]=J,es[69]=Y):Y=es[69],es[70]===Symbol.for("react.memo_cache_sentinel")?(Z=(0,t.jsx)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"12px",textAlign:"center"},children:(0,t.jsx)("p",{style:{color:"#d1d5db",fontSize:"10px",margin:0},children:"This receipt is issued for confirmation and record purposes only."})}),es[70]=Z):Z=es[70],es[71]!==_||es[72]!==Y?(q=(0,t.jsxs)("div",{ref:ed,style:x,children:[h,_,Y,Z]}),es[71]=_,es[72]=Y,es[73]=q):q=es[73],es[74]===Symbol.for("react.memo_cache_sentinel")?(Q={display:"flex",gap:"12px",marginTop:"16px"},es[74]=Q):Q=es[74],es[75]===Symbol.for("react.memo_cache_sentinel")?(V={flex:1,padding:"12px",backgroundColor:"#333",color:"white",fontWeight:600,letterSpacing:"0.05em",border:"none",borderRadius:"8px",cursor:"pointer"},es[75]=V):V=es[75],es[76]!==ec?(ee=(0,t.jsx)("button",{onClick:ec,style:V,children:"CLOSE"}),es[76]=ec,es[77]=ee):ee=es[77],es[78]===Symbol.for("react.memo_cache_sentinel")?(et={flex:1,padding:"12px",backgroundColor:"#16a34a",color:"white",fontWeight:600,letterSpacing:"0.05em",border:"none",borderRadius:"8px",cursor:"pointer"},es[78]=et):et=es[78],es[79]!==ex?(er=(0,t.jsx)("button",{onClick:ex,style:et,children:"🖨️ PRINT / SAVE PDF"}),es[79]=ex,es[80]=er):er=es[80],es[81]!==ee||es[82]!==er?(ea=(0,t.jsxs)("div",{style:Q,children:[ee,er]}),es[81]=ee,es[82]=er,es[83]=ea):ea=es[83],es[84]!==q||es[85]!==ea?(en=(0,t.jsx)("div",{style:p,children:(0,t.jsxs)("div",{style:u,children:[q,ea]})}),es[84]=q,es[85]=ea,es[86]=en):en=es[86],en}let p=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function u({branch:e}){let l=(0,a.useRouter)(),c=(0,a.useSearchParams)(),[u,f]=(0,r.useState)([]),[m,x]=(0,r.useState)(!0),[h,g]=(0,r.useState)(""),[b,y]=(0,r.useState)(""),[j,w]=(0,r.useState)(!1),[v,N]=(0,r.useState)(null),[S,k]=(0,r.useState)(null),[C,_]=(0,r.useState)(null),[A,P]=(0,r.useState)(!1),[E,O]=(0,r.useState)(null),[T,R]=(0,r.useState)(!1),[M,F]=(0,r.useState)({skfId:"",name:"",fee:500,phone:"",joinMonth:0}),[I,D]=(0,r.useState)(!1),[z,L]=(0,r.useState)(null),[$,U]=(0,r.useState)(null),K=(0,r.useRef)(null),[W,B]=(0,r.useState)(!1),[J,G]=(0,r.useState)(null),[H,X]=(0,r.useState)(null),[Y,Z]=(0,r.useState)(null),q=parseInt(c.get("month")||new Date().getMonth().toString());(0,r.useEffect)(()=>{let e=localStorage.getItem("skf_user"),t=localStorage.getItem("skf_login_time");(!e||!t||Date.now()-parseInt(t)>18e5)&&l.push("/")},[l]);let Q=(0,r.useCallback)(async()=>{if(e){x(!0),g("");try{let t=await (0,o.getStudents)(e,q);f(t)}catch(e){g(e instanceof Error?e.message:"Failed to load students")}finally{x(!1)}}},[e,q]);(0,r.useEffect)(()=>{Q()},[Q]);let V=(0,r.useMemo)(()=>{let e=u.filter(e=>"Active"===e.status),t=e.filter(e=>"Paid"===e.monthStatus),r=e.filter(e=>"Pending"===e.monthStatus),a=e.filter(e=>"Break"===e.monthStatus),n=e.filter(e=>"Discontinued"===e.monthStatus);return{totalStudents:e.length,paidCount:t.length,pendingCount:r.length,onBreakCount:a.length,discontinuedCount:n.length,expectedAmount:r.reduce((e,t)=>e+(t.fee||0),0)+t.reduce((e,t)=>e+(t.fee||0),0),collectedAmount:t.reduce((e,t)=>e+(t.fee||0),0),pendingAmount:r.reduce((e,t)=>e+(t.fee||0),0),collectionRate:r.length+t.length>0?Math.round(t.length/(r.length+t.length)*100):0}},[u]),ee=async t=>{k(t),_(null),O(null),P(!0);try{let r=await (0,o.getStudentAvailableCredits)(t.id,e);_(r),r.credits.length>0&&O(r.credits[0].id)}catch{}finally{P(!1)}},et=async()=>{if(S){N(S.id),k(null);try{E?await (0,o.markPaidWithCredit)(S.id,e,q,E):await (0,o.markPaid)(S.id,e,q),f(e=>e.map(e=>e.id===S.id?{...e,paid:!0,monthStatus:"Paid"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as paid")}finally{N(null),O(null),_(null)}}},er=e=>{K.current=setTimeout(()=>{U(e),B(!0)},3e3)},ea=()=>{K.current&&(clearTimeout(K.current),K.current=null)},en=async()=>{if(J){Z(J.id),G(null);try{await (0,o.markBreak)(J.id,e,q),f(e=>e.map(e=>e.id===J.id?{...e,paid:!1,monthStatus:"Break"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as break")}finally{Z(null)}}},es=async()=>{if(H){Z(H.id),X(null);try{await (0,o.markDiscontinued)(H.id,e,q),f(e=>e.map(e=>e.id===H.id?{...e,paid:!1,monthStatus:"Discontinued"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as discontinued")}finally{Z(null)}}},ei=async()=>{if(!M.skfId.trim())return void alert("Please enter SKF ID");if(!M.name.trim())return void alert("Please enter student name");D(!0);try{await (0,o.addStudent)(e,M.skfId,M.name,M.fee,M.phone,M.joinMonth),R(!1),F({skfId:"",name:"",fee:500,phone:"",joinMonth:q}),Q()}catch(e){alert(e instanceof Error?e.message:"Failed to add student")}finally{D(!1)}},eo=u.filter(e=>{let t=e.name.toLowerCase().includes(b.toLowerCase())||e.id.toLowerCase().includes(b.toLowerCase()),r=!j||"Pending"===e.monthStatus,a="Active"===e.status;return t&&r&&a}),el=(0,r.useMemo)(()=>{let e={Pending:0,Paid:1,Break:2,Discontinued:3,"N/A":4};return[...eo].sort((t,r)=>{let a=t.id.localeCompare(r.id,void 0,{numeric:!0,sensitivity:"base"});return 0!==a?a:(e[t.monthStatus]??4)-(e[r.monthStatus]??4)})},[eo]),ec="MPSC"===e?"MP SPORTS CLUB":e?.toUpperCase();return(0,t.jsxs)("div",{className:"min-h-screen bg-[#0a0a0a]",children:[(0,t.jsx)("header",{className:"bg-[#1a1a1a] border-b border-[#333] px-4 py-4 sticky top-0 z-50",children:(0,t.jsxs)("div",{className:"max-w-2xl mx-auto flex items-center gap-4",children:[(0,t.jsx)(n.default,{href:"/dashboard",className:"text-gray-400 hover:text-white transition-colors",children:(0,t.jsx)(s.ArrowLeft,{className:"w-6 h-6"})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("h1",{className:"font-[family-name:var(--font-oswald)] text-lg font-bold tracking-wider",children:ec}),(0,t.jsxs)("p",{className:"text-gray-500 text-sm",children:[p[q]," 2026"]})]}),(0,t.jsxs)("div",{className:"text-right",children:[(0,t.jsx)("p",{className:"text-green-500 font-bold",children:V.paidCount}),(0,t.jsxs)("p",{className:"text-gray-600 text-xs",children:["/ ",V.totalStudents]})]})]})}),(0,t.jsxs)("main",{className:"max-w-2xl mx-auto p-4",children:[!m&&!h&&(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3 mb-6",children:[(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Expected"}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-oswald)] text-2xl text-white",children:["₹",V.expectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-green-600/50 p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Collected"}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-oswald)] text-2xl text-green-500",children:["₹",V.collectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-orange-600/50 p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Pending"}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-oswald)] text-2xl text-orange-500",children:["₹",V.pendingAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Rate"}),(0,t.jsxs)("p",{className:`font-[family-name:var(--font-oswald)] text-2xl ${V.collectionRate>=80?"text-green-500":V.collectionRate>=50?"text-yellow-500":"text-red-500"}`,children:[V.collectionRate,"%"]})]})]}),(0,t.jsxs)("div",{className:"mb-4 space-y-3",children:[(0,t.jsx)("input",{type:"text",value:b,onChange:e=>y(e.target.value),placeholder:"Search by name or SKF ID...",className:"w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none placeholder:text-gray-600"}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:()=>w(!j),className:`px-4 py-2 text-sm border transition-all ${j?"bg-red-600 border-red-600 text-white":"bg-transparent border-[#333] text-gray-400 hover:border-red-600"}`,children:j?"✓ Pending":"Pending Only"}),(0,t.jsx)("button",{onClick:()=>{F({...M,joinMonth:q}),R(!0)},className:"px-4 py-2 text-sm border border-green-600 text-green-500 hover:bg-green-600 hover:text-white transition-all",children:"+ Add Student"})]})]}),m&&(0,t.jsxs)("div",{className:"text-center py-12",children:[(0,t.jsx)("div",{className:"w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-gray-500",children:"Loading students..."})]}),h&&(0,t.jsxs)("div",{className:"text-center py-12",children:[(0,t.jsx)("p",{className:"text-red-500 mb-4",children:h}),(0,t.jsx)("button",{onClick:Q,className:"px-4 py-2 bg-red-600 text-white hover:bg-red-700",children:"Retry"})]}),!m&&!h&&(0,t.jsx)("div",{className:"space-y-3",children:0===el.length?(0,t.jsx)("p",{className:"text-center text-gray-500 py-12",children:"No students found"}):el.map(e=>{let r="Break"===e.monthStatus,a="Discontinued"===e.monthStatus,n=r||a;return(0,t.jsx)("div",{className:`bg-[#1a1a1a] border border-[#333] p-4 transition-opacity ${a?"opacity-40":r?"opacity-50":""}`,children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("h3",{className:"font-[family-name:var(--font-oswald)] text-lg tracking-wide",children:e.name}),r&&(0,t.jsx)("span",{className:"text-xs bg-orange-600/30 text-orange-400 px-2 py-0.5 rounded",children:"BREAK"}),a&&(0,t.jsx)("span",{className:"text-xs bg-gray-600/30 text-gray-400 px-2 py-0.5 rounded",children:"DISCONTINUED"})]}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",e.id]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mt-1",children:[(0,t.jsxs)("p",{className:"text-gray-400",children:["₹",e.fee]}),e.creditApplied&&e.creditApplied>0&&(0,t.jsxs)("span",{className:"flex items-center gap-1 text-[10px] bg-purple-900/50 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/30",children:[(0,t.jsx)(i.Gift,{className:"w-3 h-3"}),"-₹",e.creditApplied]})]})]}),"Paid"===e.monthStatus?(0,t.jsx)("button",{onClick:()=>L(e),className:"bg-green-600/20 text-green-500 px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider hover:bg-green-600/30 transition-colors cursor-pointer",children:"✓ PAID"}):n?(0,t.jsx)("span",{className:`px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider ${r?"text-orange-500":"text-gray-500"}`,children:r?"ON BREAK":"LEFT"}):(0,t.jsx)("button",{onClick:()=>ee(e),onMouseDown:()=>er(e),onMouseUp:ea,onMouseLeave:ea,onTouchStart:()=>er(e),onTouchEnd:ea,disabled:v===e.id||Y===e.id,className:"bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider disabled:opacity-50 select-none",children:v===e.id||Y===e.id?"...":"MARK PAID"})]})},e.id)})})]}),S&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center",children:"CONFIRM PAYMENT"}),(0,t.jsxs)("div",{className:"bg-[#0a0a0a] border border-[#333] p-4 mb-4",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] text-lg",children:S.name}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",S.id]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Original Fee"}),(0,t.jsxs)("p",{className:"text-xl font-bold text-white",children:["₹",S.fee]})]}),A?(0,t.jsx)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:(0,t.jsx)("p",{className:"text-gray-500 text-sm",children:"Checking for credits..."})}):C&&C.credits.length>0?(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-purple-400 text-sm",children:[(0,t.jsx)(i.Gift,{className:"w-3 h-3"})," Referral Credit Available"]}),(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:!!E,onChange:e=>O(e.target.checked?C.credits[0].id:null),className:"w-4 h-4 accent-purple-600"}),(0,t.jsx)("span",{className:"text-sm text-gray-400",children:"Apply"})]})]}),(0,t.jsxs)("p",{className:"text-purple-400 font-bold",children:["-₹",C.totalAvailable]}),C.credits[0].reason&&(0,t.jsx)("p",{className:"text-gray-500 text-xs mt-1",children:C.credits[0].reason})]}):null,(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Amount to Collect"}),(0,t.jsxs)("p",{className:"text-2xl font-bold text-green-500",children:["₹",E&&C?Math.max(0,S.fee-C.totalAvailable):S.fee]})]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[p[q]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-gray-400 text-center text-sm mb-4",children:E&&C?`Collect ₹${Math.max(0,S.fee-C.totalAvailable)} (₹${C.totalAvailable} credit applied)`:`Collect ₹${S.fee}?`}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>{k(null),O(null),_(null)},className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:et,className:"flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700",children:"✓ CONFIRM"})]})]})}),T&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-6 text-center",children:"ADD NEW STUDENT"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"SKF ID *"}),(0,t.jsx)("input",{type:"text",value:M.skfId,onChange:e=>F({...M,skfId:e.target.value.toUpperCase()}),placeholder:"e.g., HERO-001 or MP-001",className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none font-mono"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Student Name *"}),(0,t.jsx)("input",{type:"text",value:M.name,onChange:e=>F({...M,name:e.target.value}),placeholder:"Enter full name",className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Monthly Fee (₹)"}),(0,t.jsx)("input",{type:"number",value:M.fee,onChange:e=>F({...M,fee:parseInt(e.target.value)||500}),className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Phone Number"}),(0,t.jsx)("input",{type:"tel",value:M.phone,onChange:e=>F({...M,phone:e.target.value}),placeholder:"Optional",className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Joining Month *"}),(0,t.jsx)("select",{value:M.joinMonth,onChange:e=>F({...M,joinMonth:parseInt(e.target.value)}),className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none",children:p.map((e,r)=>(0,t.jsxs)("option",{value:r,children:[e," 2026"]},r))}),(0,t.jsx)("p",{className:"text-gray-600 text-xs mt-2",children:"Fees will only be calculated from this month onwards"})]})]}),(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[(0,t.jsx)("button",{onClick:()=>R(!1),className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ei,disabled:I||!M.name.trim(),className:"flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700 disabled:opacity-50",children:I?"...":"+ ADD"})]})]})}),W&&$&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4",onClick:()=>B(!1),children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-xs",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("p",{className:"text-gray-400 text-xs uppercase tracking-wider p-4 border-b border-[#333]",children:$.name}),(0,t.jsxs)("button",{onClick:()=>{B(!1),G($)},className:"w-full text-left px-4 py-4 text-orange-400 hover:bg-[#252525] transition-colors flex items-center gap-3",children:[(0,t.jsx)("span",{className:"text-xl",children:"⏸"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] tracking-wider",children:"MARK AS BREAK"}),(0,t.jsx)("p",{className:"text-gray-500 text-xs",children:"Student on leave this month"})]})]}),(0,t.jsxs)("button",{onClick:()=>{B(!1),X($)},className:"w-full text-left px-4 py-4 text-gray-400 hover:bg-[#252525] transition-colors flex items-center gap-3 border-t border-[#333]",children:[(0,t.jsx)("span",{className:"text-xl",children:"⛔"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] tracking-wider",children:"DISCONTINUED"}),(0,t.jsx)("p",{className:"text-gray-500 text-xs",children:"Student left permanently"})]})]})]})}),J&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center text-orange-400",children:"MARK AS BREAK"}),(0,t.jsxs)("div",{className:"bg-[#0a0a0a] border border-[#333] p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] text-lg",children:J.name}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",J.id]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[p[q]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-gray-400 text-center text-sm mb-6",children:"This student will not be counted in pending fees for this month."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>G(null),className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:en,className:"flex-1 py-3 bg-orange-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-orange-700",children:"⏸ CONFIRM"})]})]})}),H&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center text-gray-400",children:"MARK AS DISCONTINUED"}),(0,t.jsxs)("div",{className:"bg-[#0a0a0a] border border-[#333] p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] text-lg",children:H.name}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",H.id]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"From Month"}),(0,t.jsxs)("p",{className:"text-white",children:[p[q]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-gray-400 text-center text-sm mb-6",children:"This student will be marked as discontinued and moved to the bottom of the list."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>X(null),className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:es,className:"flex-1 py-3 bg-gray-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-gray-700",children:"⛔ CONFIRM"})]})]})}),z&&(0,t.jsx)(d,{student:z,month:q,branch:e,onClose:()=>L(null)})]})}e.s(["default",()=>u],87073)}]);