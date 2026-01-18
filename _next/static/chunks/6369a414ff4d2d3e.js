(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88143,(e,t,a)=>{"use strict";function r({widthInt:e,heightInt:t,blurWidth:a,blurHeight:r,blurDataURL:n,objectFit:i}){let s=a?40*a:e,l=r?40*r:t,o=s&&l?`viewBox='0 0 ${s} ${l}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${o}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${o?"none":"contain"===i?"xMidYMid":"cover"===i?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${n}'/%3E%3C/svg%3E`}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},87690,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return s}};for(var n in r)Object.defineProperty(a,n,{enumerable:!0,get:r[n]});let i=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},8927,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImgProps",{enumerable:!0,get:function(){return d}}),e.r(33525);let r=e.r(43369),n=e.r(88143),i=e.r(87690),s=["-moz-initial","fill","none","scale-down",void 0];function l(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function d({src:e,sizes:t,unoptimized:a=!1,priority:d=!1,preload:c=!1,loading:p,className:m,quality:u,width:f,height:x,fill:h=!1,style:g,overrideSrc:b,onLoad:y,onLoadingComplete:v,placeholder:j="empty",blurDataURL:w,fetchPriority:S,decoding:N="async",layout:C,objectFit:k,objectPosition:_,lazyBoundary:P,lazyRoot:A,...R},E){var z;let M,O,D,{imgConf:T,showAltText:I,blurComplete:F,defaultLoader:$}=E,W=T||i.imageConfigDefault;if("allSizes"in W)M=W;else{let e=[...W.deviceSizes,...W.imageSizes].sort((e,t)=>e-t),t=W.deviceSizes.sort((e,t)=>e-t),a=W.qualities?.sort((e,t)=>e-t);M={...W,allSizes:e,deviceSizes:t,qualities:a}}if(void 0===$)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let K=R.loader||$;delete R.loader,delete R.srcSet;let L="__next_img_default"in K;if(L){if("custom"===M.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=K;K=t=>{let{config:a,...r}=t;return e(r)}}if(C){"fill"===C&&(h=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[C];e&&(g={...g,...e});let a={responsive:"100vw",fill:"100vw"}[C];a&&!t&&(t=a)}let B="",U=o(f),G=o(x);if((z=e)&&"object"==typeof z&&(l(z)||void 0!==z.src)){let t=l(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(O=t.blurWidth,D=t.blurHeight,w=w||t.blurDataURL,B=t.src,!h)if(U||G){if(U&&!G){let e=U/t.width;G=Math.round(t.height*e)}else if(!U&&G){let e=G/t.height;U=Math.round(t.width*e)}}else U=t.width,G=t.height}let q=!d&&!c&&("lazy"===p||void 0===p);(!(e="string"==typeof e?e:B)||e.startsWith("data:")||e.startsWith("blob:"))&&(a=!0,q=!1),M.unoptimized&&(a=!0),L&&!M.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(a=!0);let J=o(u),H=Object.assign(h?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:k,objectPosition:_}:{},I?{}:{color:"transparent"},g),X=F||"empty"===j?null:"blur"===j?`url("data:image/svg+xml;charset=utf-8,${(0,n.getImageBlurSvg)({widthInt:U,heightInt:G,blurWidth:O,blurHeight:D,blurDataURL:w||"",objectFit:H.objectFit})}")`:`url("${j}")`,V=s.includes(H.objectFit)?"fill"===H.objectFit?"100% 100%":"cover":H.objectFit,Y=X?{backgroundSize:V,backgroundPosition:H.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:X}:{},Q=function({config:e,src:t,unoptimized:a,width:n,quality:i,sizes:s,loader:l}){if(a){let e=(0,r.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")&&e){let a=t.includes("?")?"&":"?";t=`${t}${a}dpl=${e}`}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:o,kind:d}=function({deviceSizes:e,allSizes:t},a,r){if(r){let a=/(^|\s)(1?\d?\d)vw/g,n=[];for(let e;e=a.exec(r);)n.push(parseInt(e[2]));if(n.length){let a=.01*Math.min(...n);return{widths:t.filter(t=>t>=e[0]*a),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof a?{widths:e,kind:"w"}:{widths:[...new Set([a,2*a].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,n,s),c=o.length-1;return{sizes:s||"w"!==d?s:"100vw",srcSet:o.map((a,r)=>`${l({config:e,src:t,quality:i,width:a})} ${"w"===d?a:r+1}${d}`).join(", "),src:l({config:e,src:t,quality:i,width:o[c]})}}({config:M,src:e,unoptimized:a,width:U,quality:J,sizes:t,loader:K}),Z=q?"lazy":p;return{props:{...R,loading:Z,fetchPriority:S,width:U,height:G,decoding:N,className:m,style:{...H,...Y},sizes:Q.sizes,srcSet:Q.srcSet,src:b||Q.src},meta:{unoptimized:a,preload:c||d,placeholder:j,fill:h}}}},98879,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return l}});let r=e.r(71645),n="u"<typeof window,i=n?()=>{}:r.useLayoutEffect,s=n?()=>{}:r.useEffect;function l(e){let{headManager:t,reduceComponentsToState:a}=e;function l(){if(t&&t.mountedInstances){let e=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(a(e))}}return n&&(t?.mountedInstances?.add(e.children),l()),i(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),i(()=>(t&&(t._pendingUpdate=l),()=>{t&&(t._pendingUpdate=l)})),s(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return x},defaultHead:function(){return p}};for(var n in r)Object.defineProperty(a,n,{enumerable:!0,get:r[n]});let i=e.r(55682),s=e.r(90809),l=e.r(43476),o=s._(e.r(71645)),d=i._(e.r(98879)),c=e.r(42732);function p(){return[(0,l.jsx)("meta",{charSet:"utf-8"},"charset"),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function m(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let u=["name","httpEquiv","charSet","itemProp"];function f(e){let t,a,r,n;return e.reduce(m,[]).reverse().concat(p().reverse()).filter((t=new Set,a=new Set,r=new Set,n={},e=>{let i=!0,s=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){s=!0;let a=e.key.slice(e.key.indexOf("$")+1);t.has(a)?i=!1:t.add(a)}switch(e.type){case"title":case"base":a.has(e.type)?i=!1:a.add(e.type);break;case"meta":for(let t=0,a=u.length;t<a;t++){let a=u[t];if(e.props.hasOwnProperty(a))if("charSet"===a)r.has(a)?i=!1:r.add(a);else{let t=e.props[a],r=n[a]||new Set;("name"!==a||!s)&&r.has(t)?i=!1:(r.add(t),n[a]=r)}}}return i})).reverse().map((e,t)=>{let a=e.key||t;return o.default.cloneElement(e,{key:a})})}let x=function({children:e}){let t=(0,o.useContext)(c.HeadManagerContext);return(0,l.jsx)(d.default,{reduceComponentsToState:f,headManager:t,children:e})};("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},18556,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let r=e.r(55682)._(e.r(71645)),n=e.r(87690),i=r.default.createContext(n.imageConfigDefault)},65856,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"RouterContext",{enumerable:!0,get:function(){return r}});let r=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,a)=>{"use strict";function r(e,t){let a=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-a)<Math.abs(e-a)?t:e,0):a}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"findClosestQuality",{enumerable:!0,get:function(){return r}})},1948,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return s}});let r=e.r(70965),n=e.r(43369);function i({config:e,src:t,width:a,quality:i}){if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let s=(0,r.findClosestQuality)(i,e),l=(0,n.getDeploymentId)();return`${e.path}?url=${encodeURIComponent(t)}&w=${a}&q=${s}${t.startsWith("/")&&l?`&dpl=${l}`:""}`}i.__next_img_default=!0;let s=i},5500,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"Image",{enumerable:!0,get:function(){return v}});let r=e.r(55682),n=e.r(90809),i=e.r(43476),s=n._(e.r(71645)),l=r._(e.r(74080)),o=r._(e.r(25633)),d=e.r(8927),c=e.r(87690),p=e.r(18556);e.r(33525);let m=e.r(65856),u=r._(e.r(1948)),f=e.r(18581),x={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/SKF-FEETRACK/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function h(e,t,a,r,n,i,s){let l=e?.src;e&&e["data-loaded-src"]!==l&&(e["data-loaded-src"]=l,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&n(!0),a?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let r=!1,n=!1;a.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>r,isPropagationStopped:()=>n,persist:()=>{},preventDefault:()=>{r=!0,t.preventDefault()},stopPropagation:()=>{n=!0,t.stopPropagation()}})}r?.current&&r.current(e)}}))}function g(e){return s.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let b=(0,s.forwardRef)(({src:e,srcSet:t,sizes:a,height:r,width:n,decoding:l,className:o,style:d,fetchPriority:c,placeholder:p,loading:m,unoptimized:u,fill:x,onLoadRef:b,onLoadingCompleteRef:y,setBlurComplete:v,setShowAltText:j,sizesInput:w,onLoad:S,onError:N,...C},k)=>{let _=(0,s.useCallback)(e=>{e&&(N&&(e.src=e.src),e.complete&&h(e,p,b,y,v,u,w))},[e,p,b,y,v,N,u,w]),P=(0,f.useMergedRef)(k,_);return(0,i.jsx)("img",{...C,...g(c),loading:m,width:n,height:r,decoding:l,"data-nimg":x?"fill":"1",className:o,style:d,sizes:a,srcSet:t,src:e,ref:P,onLoad:e=>{h(e.currentTarget,p,b,y,v,u,w)},onError:e=>{j(!0),"empty"!==p&&v(!0),N&&N(e)}})});function y({isAppRouter:e,imgAttributes:t}){let a={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...g(t.fetchPriority)};return e&&l.default.preload?(l.default.preload(t.src,a),null):(0,i.jsx)(o.default,{children:(0,i.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...a},"__nimg-"+t.src+t.srcSet+t.sizes)})}let v=(0,s.forwardRef)((e,t)=>{let a=(0,s.useContext)(m.RouterContext),r=(0,s.useContext)(p.ImageConfigContext),n=(0,s.useMemo)(()=>{let e=x||r||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),a=e.deviceSizes.sort((e,t)=>e-t),n=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:a,qualities:n,localPatterns:"u"<typeof window?r?.localPatterns:e.localPatterns}},[r]),{onLoad:l,onLoadingComplete:o}=e,f=(0,s.useRef)(l);(0,s.useEffect)(()=>{f.current=l},[l]);let h=(0,s.useRef)(o);(0,s.useEffect)(()=>{h.current=o},[o]);let[g,v]=(0,s.useState)(!1),[j,w]=(0,s.useState)(!1),{props:S,meta:N}=(0,d.getImgProps)(e,{defaultLoader:u.default,imgConf:n,blurComplete:g,showAltText:j});return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(b,{...S,unoptimized:N.unoptimized,placeholder:N.placeholder,fill:N.fill,onLoadRef:f,onLoadingCompleteRef:h,setBlurComplete:v,setShowAltText:w,sizesInput:e.sizes,ref:t}),N.preload?(0,i.jsx)(y,{isAppRouter:!a,imgAttributes:S}):null]})});("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},94909,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return c},getImageProps:function(){return d}};for(var n in r)Object.defineProperty(a,n,{enumerable:!0,get:r[n]});let i=e.r(55682),s=e.r(8927),l=e.r(5500),o=i._(e.r(1948));function d(e){let{props:t}=(0,s.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/SKF-FEETRACK/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let c=l.Image},57688,(e,t,a)=>{t.exports=e.r(94909)},87073,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(18566),n=e.i(22016),i=e.i(71689),s=e.i(30699),l=e.i(9165),o=e.i(932),d=e.i(57688);let c="https://skfkarate.github.io/SKF-FEETRACK",p=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function m(e){let r,n,i,s,l,m,u,f,x,h,g,b,y,v,j,w,S,N,C,k,_,P,A,R,E,z,M,O,D,T,I,F,$,W,K,L,B,U,G,q,J,H,X,V,Y,Q,Z,ee,et,ea,er,en,ei,es,el,eo,ed,ec,ep,em,eu,ef,ex,eh=(0,o.c)(119),{student:eg,month:eb,branch:ey,onClose:ev,sendToWhatsApp:ej}=e,ew=void 0!==ej&&ej,eS=(0,a.useRef)(null);eh[0]!==ey?(r="MPSC"===ey?"MP Sports Club":ey?.toUpperCase(),eh[0]=ey,eh[1]=r):r=eh[1];let eN=r;eh[2]!==ey?(n=ey.substring(0,1).toUpperCase(),eh[2]=ey,eh[3]=n):n=eh[3],eh[4]===Symbol.for("react.memo_cache_sentinel")?(i=Date.now().toString().slice(-4),eh[4]=i):i=eh[4];let eC=`SKF-${n}-${i}`;eh[5]===Symbol.for("react.memo_cache_sentinel")?(s=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}),eh[5]=s):s=eh[5];let ek=s;eh[6]!==eb?(l=new Date(2026,eb,1).toLocaleDateString("en-IN",{month:"long"}),eh[6]=eb,eh[7]=l):l=eh[7];let e_=`${l} Monthly Training Fee`;eh[8]!==eg.fee?(m=eg.fee.toLocaleString(),eh[8]=eg.fee,eh[9]=m):m=eh[9];let eP=`Rupees ${m} Only`;eh[10]!==eP||eh[11]!==eN||eh[12]!==eb||eh[13]!==e_||eh[14]!==eC||eh[15]!==eg.fee||eh[16]!==eg.id||eh[17]!==eg.name||eh[18]!==eg.parentName?(u=()=>{let e=window.open("","_blank","width=600,height=800");if(!e)return void alert("Please allow popups to download the receipt.");let t=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${eg.id}_${p[eb]}2026_Fee</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    @page {
      size: A4 portrait;
      margin: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      height: 100vh;
      display: flex;
      align-items: center; /* Center vertically */
      justify-content: center; /* Center horizontally */
    }
    
    .receipt {
      width: 100%;
      max-width: 210mm;
      height: 297mm; /* Force full height */
      margin: 0 auto;
      background: white;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between; /* Distribute vertical space */
    }
    
    .header {
      background: linear-gradient(135deg, #1a1f2e, #0f1419);
      padding: 40px;
      text-align: center;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    .logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: contain;
      border: 2px solid rgba(212, 175, 55, 0.5);
      background: rgba(255, 255, 255, 0.05);
      margin-bottom: 20px;
    }
    
    .header h1 {
      color: white;
      font-size: 42px;
      font-weight: 900;
      letter-spacing: 0.25em;
    }
    
    .header p {
      color: #d4af37;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.15em;
      margin-top: 12px;
    }
    
    .section {
      padding: 32px 48px;
      border-bottom: 1px solid #e5e7eb;
      flex: 1; /* Allow sections to grow */
      display: flex;
      flex-direction: column;
      justify-content: center;
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
      font-size: 20px;
      font-weight: 900;
    }
    
    .title p {
      color: #6b7280;
      font-size: 14px;
      margin-top: 4px;
    }
    
    .row {
      display: table;
      width: 100%;
      margin-bottom: 12px;
    }
    
    .row:last-child {
      margin-bottom: 0;
    }
    
    .label {
      display: table-cell;
      color: #4b5563;
      font-weight: 700;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      width: 40%;
      vertical-align: middle;
      padding-right: 20px;
    }
    
    .value {
      display: table-cell;
      color: #1a1f2e;
      font-weight: 700;
      font-size: 20px;
      text-align: right;
      width: 60%;
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
      font-size: 40px;
      font-weight: 900;
      color: #1a1f2e;
    }
    
    .amount-box .words {
      font-size: 16px;
      font-style: italic;
      color: #6b7280;
      margin-top: 12px;
    }
    
    .status {
      margin-top: 24px;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
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
      <img src="${c}/logo.png" alt="SKF" class="logo">
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
        <span class="value">${eN}</span>
      </div>
      <div class="row">
        <span class="label">Receipt No</span>
        <span class="value">${eC}</span>
      </div>
      <div class="row">
        <span class="label">Date</span>
        <span class="value">${ek}</span>
      </div>
    </div>
    
    <div class="section">
      <div class="row">
        <span class="label">Parent / Guardian</span>
        <span class="value">${eg.parentName||"N/A"}</span>
      </div>
      <div class="row">
        <span class="label">Student Name</span>
        <span class="value">
          ${eg.name}<br>
          <span class="id-badge">${eg.id}</span>
        </span>
      </div>
      <div class="row">
        <span class="label">Purpose</span>
        <span class="value">${e_}</span>
      </div>
      
      <div class="amount-box">
        <div class="amount">₹ ${eg.fee.toLocaleString()}</div>
        <div class="words">${eP}</div>
      </div>
      
      <div class="status">✔ Payment Received with Thanks</div>
      
      <div class="stamp">
        <img src="${c}/stamp.png" alt="PAID">
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
    `;e.document.write(t),e.document.close()},eh[10]=eP,eh[11]=eN,eh[12]=eb,eh[13]=e_,eh[14]=eC,eh[15]=eg.fee,eh[16]=eg.id,eh[17]=eg.name,eh[18]=eg.parentName,eh[19]=u):u=eh[19];let eA=u;eh[20]!==eP||eh[21]!==eN||eh[22]!==e_||eh[23]!==eC||eh[24]!==eg.fee||eh[25]!==eg.id||eh[26]!==eg.name||eh[27]!==eg.parentName||eh[28]!==eg.phone||eh[29]!==eg.whatsapp?(f=()=>{let e=eg.whatsapp||eg.phone;if(console.log("ShareToWhatsApp called",{phone:e,whatsapp:eg.whatsapp,studentPhone:eg.phone}),!e)return void alert("No WhatsApp number available for this student. Please add a phone number to the student's record.");let t=e.replace(/[^\d+]/g,"");t.startsWith("+")||(t=t.startsWith("91")&&t.length>10?"+"+t:"+91"+t);let a=t.replace("+","");console.log("Cleaned phone:",a);let r=encodeURIComponent(`✅ *SKF KARATE - Payment Received*

Dear ${eg.parentName||"Parent"},

Thank you for the payment! Here are the details:

📋 *Receipt Details*
━━━━━━━━━━━━━━━━
🏢 Branch: ${eN}
📄 Receipt No: ${eC}
📅 Date: ${ek}

👤 *Student Details*
━━━━━━━━━━━━━━━━
Student: ${eg.name}
SKF ID: ${eg.id}
Purpose: ${e_}

💰 *Payment*
━━━━━━━━━━━━━━━━
Amount: ₹${eg.fee.toLocaleString()}
(${eP})

✔ *Payment Received with Thanks*

────────────────
_SKF Karate - Sports Karate-do Fitness & Self Defence Association_`),n=`https://wa.me/${a}?text=${r}`;console.log("WhatsApp URL:",n),window.location.href=n},eh[20]=eP,eh[21]=eN,eh[22]=e_,eh[23]=eC,eh[24]=eg.fee,eh[25]=eg.id,eh[26]=eg.name,eh[27]=eg.parentName,eh[28]=eg.phone,eh[29]=eg.whatsapp,eh[30]=f):f=eh[30];let eR=f;eh[31]!==ew||eh[32]!==eR?(x=()=>{if(ew){let e=setTimeout(()=>{eR()},500);return()=>clearTimeout(e)}},eh[31]=ew,eh[32]=eR,eh[33]=x):x=eh[33],eh[34]!==ew?(h=[ew],eh[34]=ew,eh[35]=h):h=eh[35],(0,a.useEffect)(x,h),eh[36]===Symbol.for("react.memo_cache_sentinel")?(g={position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"},b={width:"100%",maxWidth:"520px",maxHeight:"90vh",overflowY:"auto"},eh[36]=g,eh[37]=b):(g=eh[36],b=eh[37]),eh[38]===Symbol.for("react.memo_cache_sentinel")?(y={backgroundColor:"#ffffff",color:"#1a1f2e",borderRadius:"12px",overflow:"hidden",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},v=(0,t.jsxs)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"24px",textAlign:"center"},children:[(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginBottom:"12px"},children:(0,t.jsx)(d.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/logo.png",alt:"SKF",width:70,height:70,className:"rounded-full object-contain border border-[#d4af37]/50 bg-white/5"})}),(0,t.jsx)("h1",{style:{color:"#ffffff",fontSize:"28px",fontWeight:900,letterSpacing:"0.2em",margin:0},children:"SKF"}),(0,t.jsx)("p",{style:{color:"#d4af37",fontSize:"11px",fontWeight:600,letterSpacing:"0.1em",marginTop:"4px"},children:"Sports Karate-do Fitness & Self Defence Association ®"})]}),j={padding:"24px",borderBottom:"1px solid #e5e7eb"},w=(0,t.jsxs)("div",{style:{textAlign:"center",marginBottom:"16px"},children:[(0,t.jsx)("h2",{style:{color:"#1a1f2e",fontSize:"18px",fontWeight:900,margin:0},children:"Monthly Fee Receipt"}),(0,t.jsx)("p",{style:{color:"#6b7280",fontSize:"11px",marginTop:"4px"},children:"Payment confirmation"})]}),S={width:"100%",borderCollapse:"collapse"},N=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Branch"}),C={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},eh[38]=y,eh[39]=v,eh[40]=j,eh[41]=w,eh[42]=S,eh[43]=N,eh[44]=C):(y=eh[38],v=eh[39],j=eh[40],w=eh[41],S=eh[42],N=eh[43],C=eh[44]),eh[45]!==eN?(k=(0,t.jsxs)("tr",{children:[N,(0,t.jsx)("td",{style:C,children:eN})]}),eh[45]=eN,eh[46]=k):k=eh[46],eh[47]===Symbol.for("react.memo_cache_sentinel")?(_=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Receipt No"}),P={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},eh[47]=_,eh[48]=P):(_=eh[47],P=eh[48]),eh[49]!==eC?(A=(0,t.jsxs)("tr",{children:[_,(0,t.jsx)("td",{style:P,children:eC})]}),eh[49]=eC,eh[50]=A):A=eh[50],eh[51]===Symbol.for("react.memo_cache_sentinel")?(R=(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Date"}),(0,t.jsx)("td",{style:{color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},children:ek})]}),eh[51]=R):R=eh[51],eh[52]!==k||eh[53]!==A?(E=(0,t.jsxs)("div",{style:j,children:[w,(0,t.jsx)("table",{style:S,children:(0,t.jsxs)("tbody",{children:[k,A,R]})})]}),eh[52]=k,eh[53]=A,eh[54]=E):E=eh[54],eh[55]===Symbol.for("react.memo_cache_sentinel")?(z={padding:"24px",position:"relative"},M={width:"100%",borderCollapse:"collapse"},O=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Parent / Guardian"}),D={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},eh[55]=z,eh[56]=M,eh[57]=O,eh[58]=D):(z=eh[55],M=eh[56],O=eh[57],D=eh[58]);let eE=eg.parentName||"N/A";return eh[59]!==eE?(T=(0,t.jsxs)("tr",{children:[O,(0,t.jsx)("td",{style:D,children:eE})]}),eh[59]=eE,eh[60]=T):T=eh[60],eh[61]===Symbol.for("react.memo_cache_sentinel")?(I=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"top"},children:"Student Name"}),F={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"top"},eh[61]=I,eh[62]=F):(I=eh[61],F=eh[62]),eh[63]===Symbol.for("react.memo_cache_sentinel")?($=(0,t.jsx)("br",{}),W={backgroundColor:"#b8860b",color:"#ffffff",fontSize:"10px",padding:"2px 8px",borderRadius:"4px",fontWeight:700,display:"inline-block",marginTop:"4px"},eh[63]=$,eh[64]=W):($=eh[63],W=eh[64]),eh[65]!==eg.id?(K=(0,t.jsx)("span",{style:W,children:eg.id}),eh[65]=eg.id,eh[66]=K):K=eh[66],eh[67]!==eg.name||eh[68]!==K?(L=(0,t.jsxs)("tr",{children:[I,(0,t.jsxs)("td",{style:F,children:[eg.name,$,K]})]}),eh[67]=eg.name,eh[68]=K,eh[69]=L):L=eh[69],eh[70]===Symbol.for("react.memo_cache_sentinel")?(B=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Purpose"}),U={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},eh[70]=B,eh[71]=U):(B=eh[70],U=eh[71]),eh[72]!==e_?(G=(0,t.jsxs)("tr",{children:[B,(0,t.jsx)("td",{style:U,children:e_})]}),eh[72]=e_,eh[73]=G):G=eh[73],eh[74]!==T||eh[75]!==L||eh[76]!==G?(q=(0,t.jsx)("table",{style:M,children:(0,t.jsxs)("tbody",{children:[T,L,G]})}),eh[74]=T,eh[75]=L,eh[76]=G,eh[77]=q):q=eh[77],eh[78]===Symbol.for("react.memo_cache_sentinel")?(J={marginTop:"24px",padding:"16px",borderRadius:"12px",border:"2px solid #d4af37",background:"linear-gradient(135deg, #fafbfc, #f3f4f6)",textAlign:"center"},H={fontSize:"28px",fontWeight:900,color:"#1a1f2e"},eh[78]=J,eh[79]=H):(J=eh[78],H=eh[79]),eh[80]!==eg.fee?(X=eg.fee.toLocaleString(),eh[80]=eg.fee,eh[81]=X):X=eh[81],eh[82]!==X?(V=(0,t.jsxs)("div",{style:H,children:["₹ ",X]}),eh[82]=X,eh[83]=V):V=eh[83],eh[84]===Symbol.for("react.memo_cache_sentinel")?(Y={fontSize:"11px",fontStyle:"italic",color:"#6b7280",marginTop:"4px"},eh[84]=Y):Y=eh[84],eh[85]!==eP?(Q=(0,t.jsx)("div",{style:Y,children:eP}),eh[85]=eP,eh[86]=Q):Q=eh[86],eh[87]!==V||eh[88]!==Q?(Z=(0,t.jsxs)("div",{style:J,children:[V,Q]}),eh[87]=V,eh[88]=Q,eh[89]=Z):Z=eh[89],eh[90]===Symbol.for("react.memo_cache_sentinel")?(ee=(0,t.jsx)("div",{style:{marginTop:"16px",textAlign:"center",fontWeight:700,fontSize:"13px",color:"#16a34a"},children:"✔ Payment Received with Thanks"}),et=(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"8px",opacity:.9},children:(0,t.jsx)(d.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/stamp.png",alt:"PAID",width:96,height:96,className:"object-contain -rotate-12"})}),eh[90]=ee,eh[91]=et):(ee=eh[90],et=eh[91]),eh[92]!==q||eh[93]!==Z?(ea=(0,t.jsxs)("div",{style:z,children:[q,Z,ee,et]}),eh[92]=q,eh[93]=Z,eh[94]=ea):ea=eh[94],eh[95]===Symbol.for("react.memo_cache_sentinel")?(er=(0,t.jsx)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"12px",textAlign:"center"},children:(0,t.jsx)("p",{style:{color:"#d1d5db",fontSize:"10px",margin:0},children:"This receipt is issued for confirmation and record purposes only."})}),eh[95]=er):er=eh[95],eh[96]!==E||eh[97]!==ea?(en=(0,t.jsxs)("div",{ref:eS,style:y,children:[v,E,ea,er]}),eh[96]=E,eh[97]=ea,eh[98]=en):en=eh[98],eh[99]===Symbol.for("react.memo_cache_sentinel")?(ei={display:"flex",flexDirection:"column",gap:"12px",marginTop:"16px"},eh[99]=ei):ei=eh[99],eh[100]===Symbol.for("react.memo_cache_sentinel")?(es={width:"100%",padding:"14px",backgroundColor:"#25D366",color:"white",fontWeight:700,letterSpacing:"0.05em",border:"none",borderRadius:"8px",cursor:"pointer",fontSize:"14px"},eh[100]=es):es=eh[100],eh[101]!==eR?(el=(0,t.jsx)("button",{onClick:eR,style:es,children:"💬 SEND TO WHATSAPP"}),eh[101]=eR,eh[102]=el):el=eh[102],eh[103]===Symbol.for("react.memo_cache_sentinel")?(eo={display:"flex",gap:"12px"},eh[103]=eo):eo=eh[103],eh[104]===Symbol.for("react.memo_cache_sentinel")?(ed={flex:1,padding:"12px",backgroundColor:"#333",color:"white",fontWeight:600,letterSpacing:"0.05em",border:"none",borderRadius:"8px",cursor:"pointer"},eh[104]=ed):ed=eh[104],eh[105]!==ev?(ec=(0,t.jsx)("button",{onClick:ev,style:ed,children:"CLOSE"}),eh[105]=ev,eh[106]=ec):ec=eh[106],eh[107]===Symbol.for("react.memo_cache_sentinel")?(ep={flex:1,padding:"12px",backgroundColor:"#16a34a",color:"white",fontWeight:600,letterSpacing:"0.05em",border:"none",borderRadius:"8px",cursor:"pointer"},eh[107]=ep):ep=eh[107],eh[108]!==eA?(em=(0,t.jsx)("button",{onClick:eA,style:ep,children:"🖨️ PRINT"}),eh[108]=eA,eh[109]=em):em=eh[109],eh[110]!==ec||eh[111]!==em?(eu=(0,t.jsxs)("div",{style:eo,children:[ec,em]}),eh[110]=ec,eh[111]=em,eh[112]=eu):eu=eh[112],eh[113]!==el||eh[114]!==eu?(ef=(0,t.jsxs)("div",{style:ei,children:[el,eu]}),eh[113]=el,eh[114]=eu,eh[115]=ef):ef=eh[115],eh[116]!==en||eh[117]!==ef?(ex=(0,t.jsx)("div",{style:g,children:(0,t.jsxs)("div",{style:b,children:[en,ef]})}),eh[116]=en,eh[117]=ef,eh[118]=ex):ex=eh[118],ex}let u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function f({branch:e}){let o=(0,r.useRouter)(),d=(0,r.useSearchParams)(),[c,p]=(0,a.useState)([]),[f,x]=(0,a.useState)(!0),[h,g]=(0,a.useState)(""),[b,y]=(0,a.useState)(""),[v,j]=(0,a.useState)(!1),[w,S]=(0,a.useState)(null),[N,C]=(0,a.useState)(null),[k,_]=(0,a.useState)(null),[P,A]=(0,a.useState)(!1),[R,E]=(0,a.useState)(null),[z,M]=(0,a.useState)(!1),[O,D]=(0,a.useState)({skfId:"",name:"",fee:500,phone:"",joinMonth:0}),[T,I]=(0,a.useState)(!1),[F,$]=(0,a.useState)(null),[W,K]=(0,a.useState)(!1),[L,B]=(0,a.useState)(null),U=(0,a.useRef)(null),[G,q]=(0,a.useState)(!1),[J,H]=(0,a.useState)(null),[X,V]=(0,a.useState)(null),[Y,Q]=(0,a.useState)(null),Z=parseInt(d.get("month")||new Date().getMonth().toString());(0,a.useEffect)(()=>{let e=localStorage.getItem("skf_user"),t=localStorage.getItem("skf_login_time");(!e||!t||Date.now()-parseInt(t)>18e5)&&o.push("/")},[o]);let ee=(0,a.useCallback)(async()=>{if(e){x(!0),g("");try{let t=await (0,l.getStudents)(e,Z);p(t)}catch(e){g(e instanceof Error?e.message:"Failed to load students")}finally{x(!1)}}},[e,Z]);(0,a.useEffect)(()=>{ee()},[ee]);let et=(0,a.useMemo)(()=>{let e=c.filter(e=>"Active"===e.status),t=e.filter(e=>"Paid"===e.monthStatus),a=e.filter(e=>"Pending"===e.monthStatus),r=e.filter(e=>"Break"===e.monthStatus),n=e.filter(e=>"Discontinued"===e.monthStatus);return{totalStudents:e.length,paidCount:t.length,pendingCount:a.length,onBreakCount:r.length,discontinuedCount:n.length,expectedAmount:a.reduce((e,t)=>e+(t.fee||0),0)+t.reduce((e,t)=>e+(t.fee||0),0),collectedAmount:t.reduce((e,t)=>e+(t.fee||0),0),pendingAmount:a.reduce((e,t)=>e+(t.fee||0),0),collectionRate:a.length+t.length>0?Math.round(t.length/(a.length+t.length)*100):0}},[c]),ea=async t=>{C(t),_(null),E(null),A(!0);try{let a=await (0,l.getStudentAvailableCredits)(t.id,e);_(a),a.credits.length>0&&E(a.credits[0].id)}catch{}finally{A(!1)}},er=async()=>{if(N){S(N.id),C(null);try{R?await (0,l.markPaidWithCredit)(N.id,e,Z,R):await (0,l.markPaid)(N.id,e,Z),p(e=>e.map(e=>e.id===N.id?{...e,paid:!0,monthStatus:"Paid"}:e)),$(N),K(!0)}catch(e){alert(e instanceof Error?e.message:"Failed to mark as paid")}finally{S(null),E(null),_(null)}}},en=e=>{U.current=setTimeout(()=>{B(e),q(!0)},3e3)},ei=()=>{U.current&&(clearTimeout(U.current),U.current=null)},es=async()=>{if(J){Q(J.id),H(null);try{await (0,l.markBreak)(J.id,e,Z),p(e=>e.map(e=>e.id===J.id?{...e,paid:!1,monthStatus:"Break"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as break")}finally{Q(null)}}},el=async()=>{if(X){Q(X.id),V(null);try{await (0,l.markDiscontinued)(X.id,e,Z),p(e=>e.map(e=>e.id===X.id?{...e,paid:!1,monthStatus:"Discontinued"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as discontinued")}finally{Q(null)}}},eo=async()=>{if(!O.skfId.trim())return void alert("Please enter SKF ID");if(!O.name.trim())return void alert("Please enter student name");I(!0);try{await (0,l.addStudent)(e,O.skfId,O.name,O.fee,O.phone,O.joinMonth),M(!1),D({skfId:"",name:"",fee:500,phone:"",joinMonth:Z}),ee()}catch(e){alert(e instanceof Error?e.message:"Failed to add student")}finally{I(!1)}},ed=c.filter(e=>{let t=e.name.toLowerCase().includes(b.toLowerCase())||e.id.toLowerCase().includes(b.toLowerCase()),a=!v||"Pending"===e.monthStatus,r="Active"===e.status;return t&&a&&r}),ec=(0,a.useMemo)(()=>{let e={Pending:0,Paid:1,Break:2,Discontinued:3,"N/A":4};return[...ed].sort((t,a)=>{let r=t.id.localeCompare(a.id,void 0,{numeric:!0,sensitivity:"base"});return 0!==r?r:(e[t.monthStatus]??4)-(e[a.monthStatus]??4)})},[ed]),ep="MPSC"===e?"MP SPORTS CLUB":e?.toUpperCase();return(0,t.jsxs)("div",{className:"min-h-screen bg-[#0a0a0a]",children:[(0,t.jsx)("header",{className:"bg-[#1a1a1a] border-b border-[#333] px-4 py-4 sticky top-0 z-50",children:(0,t.jsxs)("div",{className:"max-w-2xl mx-auto flex items-center gap-4",children:[(0,t.jsx)(n.default,{href:"/dashboard",className:"text-gray-400 hover:text-white transition-colors",children:(0,t.jsx)(i.ArrowLeft,{className:"w-6 h-6"})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("h1",{className:"font-[family-name:var(--font-oswald)] text-lg font-bold tracking-wider",children:ep}),(0,t.jsxs)("p",{className:"text-gray-500 text-sm",children:[u[Z]," 2026"]})]}),(0,t.jsxs)("div",{className:"text-right",children:[(0,t.jsx)("p",{className:"text-green-500 font-bold",children:et.paidCount}),(0,t.jsxs)("p",{className:"text-gray-600 text-xs",children:["/ ",et.totalStudents]})]})]})}),(0,t.jsxs)("main",{className:"max-w-2xl mx-auto p-4",children:[!f&&!h&&(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3 mb-6",children:[(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Expected"}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-oswald)] text-2xl text-white",children:["₹",et.expectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-green-600/50 p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Collected"}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-oswald)] text-2xl text-green-500",children:["₹",et.collectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-orange-600/50 p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Pending"}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-oswald)] text-2xl text-orange-500",children:["₹",et.pendingAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Rate"}),(0,t.jsxs)("p",{className:`font-[family-name:var(--font-oswald)] text-2xl ${et.collectionRate>=80?"text-green-500":et.collectionRate>=50?"text-yellow-500":"text-red-500"}`,children:[et.collectionRate,"%"]})]})]}),(0,t.jsxs)("div",{className:"mb-4 space-y-3",children:[(0,t.jsx)("input",{type:"text",value:b,onChange:e=>y(e.target.value),placeholder:"Search by name or SKF ID...",className:"w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none placeholder:text-gray-600"}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:()=>j(!v),className:`px-4 py-2 text-sm border transition-all ${v?"bg-red-600 border-red-600 text-white":"bg-transparent border-[#333] text-gray-400 hover:border-red-600"}`,children:v?"✓ Pending":"Pending Only"}),(0,t.jsx)("button",{onClick:()=>{D({...O,joinMonth:Z}),M(!0)},className:"px-4 py-2 text-sm border border-green-600 text-green-500 hover:bg-green-600 hover:text-white transition-all",children:"+ Add Student"})]})]}),f&&(0,t.jsxs)("div",{className:"text-center py-12",children:[(0,t.jsx)("div",{className:"w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-gray-500",children:"Loading students..."})]}),h&&(0,t.jsxs)("div",{className:"text-center py-12",children:[(0,t.jsx)("p",{className:"text-red-500 mb-4",children:h}),(0,t.jsx)("button",{onClick:ee,className:"px-4 py-2 bg-red-600 text-white hover:bg-red-700",children:"Retry"})]}),!f&&!h&&(0,t.jsx)("div",{className:"space-y-3",children:0===ec.length?(0,t.jsx)("p",{className:"text-center text-gray-500 py-12",children:"No students found"}):ec.map(e=>{let a="Break"===e.monthStatus,r="Discontinued"===e.monthStatus,n=a||r;return(0,t.jsx)("div",{className:`bg-[#1a1a1a] border border-[#333] p-4 transition-opacity ${r?"opacity-40":a?"opacity-50":""}`,children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("h3",{className:"font-[family-name:var(--font-oswald)] text-lg tracking-wide",children:e.name}),a&&(0,t.jsx)("span",{className:"text-xs bg-orange-600/30 text-orange-400 px-2 py-0.5 rounded",children:"BREAK"}),r&&(0,t.jsx)("span",{className:"text-xs bg-gray-600/30 text-gray-400 px-2 py-0.5 rounded",children:"DISCONTINUED"})]}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",e.id]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mt-1",children:[(0,t.jsxs)("p",{className:"text-gray-400",children:["₹",e.fee]}),(e.creditApplied||0)>0&&(0,t.jsxs)("span",{className:"flex items-center gap-1 text-[10px] bg-purple-900/50 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/30",children:[(0,t.jsx)(s.Gift,{className:"w-3 h-3"}),"-₹",e.creditApplied]})]})]}),"Paid"===e.monthStatus?(0,t.jsx)("button",{onClick:()=>{K(!1),$(e)},className:"bg-green-600/20 text-green-500 px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider hover:bg-green-600/30 transition-colors cursor-pointer",children:"✓ PAID"}):n?(0,t.jsx)("span",{className:`px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider ${a?"text-orange-500":"text-gray-500"}`,children:a?"ON BREAK":"LEFT"}):(0,t.jsx)("button",{onClick:()=>ea(e),onMouseDown:()=>en(e),onMouseUp:ei,onMouseLeave:ei,onTouchStart:()=>en(e),onTouchEnd:ei,disabled:w===e.id||Y===e.id,className:"bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider disabled:opacity-50 select-none",children:w===e.id||Y===e.id?"...":"MARK PAID"})]})},e.id)})})]}),N&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center",children:"CONFIRM PAYMENT"}),(0,t.jsxs)("div",{className:"bg-[#0a0a0a] border border-[#333] p-4 mb-4",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] text-lg",children:N.name}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",N.id]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Original Fee"}),(0,t.jsxs)("p",{className:"text-xl font-bold text-white",children:["₹",N.fee]})]}),P?(0,t.jsx)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:(0,t.jsx)("p",{className:"text-gray-500 text-sm",children:"Checking for credits..."})}):k&&k.credits.length>0?(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-purple-400 text-sm",children:[(0,t.jsx)(s.Gift,{className:"w-3 h-3"})," Referral Credit Available"]}),(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:!!R,onChange:e=>E(e.target.checked?k.credits[0].id:null),className:"w-4 h-4 accent-purple-600"}),(0,t.jsx)("span",{className:"text-sm text-gray-400",children:"Apply"})]})]}),(0,t.jsxs)("p",{className:"text-purple-400 font-bold",children:["-₹",k.totalAvailable]}),k.credits[0].reason&&(0,t.jsx)("p",{className:"text-gray-500 text-xs mt-1",children:k.credits[0].reason})]}):null,(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Amount to Collect"}),(0,t.jsxs)("p",{className:"text-2xl font-bold text-green-500",children:["₹",R&&k?Math.max(0,N.fee-k.totalAvailable):N.fee]})]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[u[Z]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-gray-400 text-center text-sm mb-4",children:R&&k?`Collect ₹${Math.max(0,N.fee-k.totalAvailable)} (₹${k.totalAvailable} credit applied)`:`Collect ₹${N.fee}?`}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>{C(null),E(null),_(null)},className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:er,className:"flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700",children:"✓ CONFIRM"})]})]})}),z&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-6 text-center",children:"ADD NEW STUDENT"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"SKF ID *"}),(0,t.jsx)("input",{type:"text",value:O.skfId,onChange:e=>D({...O,skfId:e.target.value.toUpperCase()}),placeholder:"e.g., HERO-001 or MP-001",className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none font-mono"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Student Name *"}),(0,t.jsx)("input",{type:"text",value:O.name,onChange:e=>D({...O,name:e.target.value}),placeholder:"Enter full name",className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Monthly Fee (₹)"}),(0,t.jsx)("input",{type:"number",value:O.fee,onChange:e=>D({...O,fee:parseInt(e.target.value)||500}),className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Phone Number"}),(0,t.jsx)("input",{type:"tel",value:O.phone,onChange:e=>D({...O,phone:e.target.value}),placeholder:"Optional",className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Joining Month *"}),(0,t.jsx)("select",{value:O.joinMonth,onChange:e=>D({...O,joinMonth:parseInt(e.target.value)}),className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none",children:u.map((e,a)=>(0,t.jsxs)("option",{value:a,children:[e," 2026"]},a))}),(0,t.jsx)("p",{className:"text-gray-600 text-xs mt-2",children:"Fees will only be calculated from this month onwards"})]})]}),(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[(0,t.jsx)("button",{onClick:()=>M(!1),className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:eo,disabled:T||!O.name.trim(),className:"flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700 disabled:opacity-50",children:T?"...":"+ ADD"})]})]})}),G&&L&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4",onClick:()=>q(!1),children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-xs",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("p",{className:"text-gray-400 text-xs uppercase tracking-wider p-4 border-b border-[#333]",children:L.name}),(0,t.jsxs)("button",{onClick:()=>{q(!1),H(L)},className:"w-full text-left px-4 py-4 text-orange-400 hover:bg-[#252525] transition-colors flex items-center gap-3",children:[(0,t.jsx)("span",{className:"text-xl",children:"⏸"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] tracking-wider",children:"MARK AS BREAK"}),(0,t.jsx)("p",{className:"text-gray-500 text-xs",children:"Student on leave this month"})]})]}),(0,t.jsxs)("button",{onClick:()=>{q(!1),V(L)},className:"w-full text-left px-4 py-4 text-gray-400 hover:bg-[#252525] transition-colors flex items-center gap-3 border-t border-[#333]",children:[(0,t.jsx)("span",{className:"text-xl",children:"⛔"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] tracking-wider",children:"DISCONTINUED"}),(0,t.jsx)("p",{className:"text-gray-500 text-xs",children:"Student left permanently"})]})]})]})}),J&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center text-orange-400",children:"MARK AS BREAK"}),(0,t.jsxs)("div",{className:"bg-[#0a0a0a] border border-[#333] p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] text-lg",children:J.name}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",J.id]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[u[Z]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-gray-400 text-center text-sm mb-6",children:"This student will not be counted in pending fees for this month."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>H(null),className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:es,className:"flex-1 py-3 bg-orange-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-orange-700",children:"⏸ CONFIRM"})]})]})}),X&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center text-gray-400",children:"MARK AS DISCONTINUED"}),(0,t.jsxs)("div",{className:"bg-[#0a0a0a] border border-[#333] p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] text-lg",children:X.name}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",X.id]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"From Month"}),(0,t.jsxs)("p",{className:"text-white",children:[u[Z]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-gray-400 text-center text-sm mb-6",children:"This student will be marked as discontinued and moved to the bottom of the list."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>V(null),className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:el,className:"flex-1 py-3 bg-gray-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-gray-700",children:"⛔ CONFIRM"})]})]})}),F&&(0,t.jsx)(m,{student:F,month:Z,branch:e,sendToWhatsApp:W,onClose:()=>{$(null),K(!1)}})]})}e.s(["default",()=>f],87073)}]);