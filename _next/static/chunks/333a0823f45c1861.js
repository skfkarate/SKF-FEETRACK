(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88143,(e,t,a)=>{"use strict";function r({widthInt:e,heightInt:t,blurWidth:a,blurHeight:r,blurDataURL:n,objectFit:i}){let s=a?40*a:e,l=r?40*r:t,o=s&&l?`viewBox='0 0 ${s} ${l}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${o}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${o?"none":"contain"===i?"xMidYMid":"cover"===i?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${n}'/%3E%3C/svg%3E`}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},87690,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return s}};for(var n in r)Object.defineProperty(a,n,{enumerable:!0,get:r[n]});let i=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},8927,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImgProps",{enumerable:!0,get:function(){return d}}),e.r(33525);let r=e.r(43369),n=e.r(88143),i=e.r(87690),s=["-moz-initial","fill","none","scale-down",void 0];function l(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function d({src:e,sizes:t,unoptimized:a=!1,priority:d=!1,preload:c=!1,loading:p,className:m,quality:u,width:f,height:x,fill:g=!1,style:h,overrideSrc:b,onLoad:y,onLoadingComplete:j,placeholder:v="empty",blurDataURL:w,fetchPriority:S,decoding:N="async",layout:k,objectFit:C,objectPosition:_,lazyBoundary:P,lazyRoot:A,...E},R){var M;let z,O,I,{imgConf:T,showAltText:F,blurComplete:D,defaultLoader:$}=R,K=T||i.imageConfigDefault;if("allSizes"in K)z=K;else{let e=[...K.deviceSizes,...K.imageSizes].sort((e,t)=>e-t),t=K.deviceSizes.sort((e,t)=>e-t),a=K.qualities?.sort((e,t)=>e-t);z={...K,allSizes:e,deviceSizes:t,qualities:a}}if(void 0===$)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let L=E.loader||$;delete E.loader,delete E.srcSet;let W="__next_img_default"in L;if(W){if("custom"===z.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=L;L=t=>{let{config:a,...r}=t;return e(r)}}if(k){"fill"===k&&(g=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[k];e&&(h={...h,...e});let a={responsive:"100vw",fill:"100vw"}[k];a&&!t&&(t=a)}let B="",U=o(f),G=o(x);if((M=e)&&"object"==typeof M&&(l(M)||void 0!==M.src)){let t=l(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(O=t.blurWidth,I=t.blurHeight,w=w||t.blurDataURL,B=t.src,!g)if(U||G){if(U&&!G){let e=U/t.width;G=Math.round(t.height*e)}else if(!U&&G){let e=G/t.height;U=Math.round(t.width*e)}}else U=t.width,G=t.height}let q=!d&&!c&&("lazy"===p||void 0===p);(!(e="string"==typeof e?e:B)||e.startsWith("data:")||e.startsWith("blob:"))&&(a=!0,q=!1),z.unoptimized&&(a=!0),W&&!z.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(a=!0);let J=o(u),H=Object.assign(g?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:C,objectPosition:_}:{},F?{}:{color:"transparent"},h),V=D||"empty"===v?null:"blur"===v?`url("data:image/svg+xml;charset=utf-8,${(0,n.getImageBlurSvg)({widthInt:U,heightInt:G,blurWidth:O,blurHeight:I,blurDataURL:w||"",objectFit:H.objectFit})}")`:`url("${v}")`,X=s.includes(H.objectFit)?"fill"===H.objectFit?"100% 100%":"cover":H.objectFit,Y=V?{backgroundSize:X,backgroundPosition:H.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:V}:{},Q=function({config:e,src:t,unoptimized:a,width:n,quality:i,sizes:s,loader:l}){if(a){let e=(0,r.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")&&e){let a=t.includes("?")?"&":"?";t=`${t}${a}dpl=${e}`}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:o,kind:d}=function({deviceSizes:e,allSizes:t},a,r){if(r){let a=/(^|\s)(1?\d?\d)vw/g,n=[];for(let e;e=a.exec(r);)n.push(parseInt(e[2]));if(n.length){let a=.01*Math.min(...n);return{widths:t.filter(t=>t>=e[0]*a),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof a?{widths:e,kind:"w"}:{widths:[...new Set([a,2*a].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,n,s),c=o.length-1;return{sizes:s||"w"!==d?s:"100vw",srcSet:o.map((a,r)=>`${l({config:e,src:t,quality:i,width:a})} ${"w"===d?a:r+1}${d}`).join(", "),src:l({config:e,src:t,quality:i,width:o[c]})}}({config:z,src:e,unoptimized:a,width:U,quality:J,sizes:t,loader:L}),Z=q?"lazy":p;return{props:{...E,loading:Z,fetchPriority:S,width:U,height:G,decoding:N,className:m,style:{...H,...Y},sizes:Q.sizes,srcSet:Q.srcSet,src:b||Q.src},meta:{unoptimized:a,preload:c||d,placeholder:v,fill:g}}}},98879,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return l}});let r=e.r(71645),n="u"<typeof window,i=n?()=>{}:r.useLayoutEffect,s=n?()=>{}:r.useEffect;function l(e){let{headManager:t,reduceComponentsToState:a}=e;function l(){if(t&&t.mountedInstances){let e=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(a(e))}}return n&&(t?.mountedInstances?.add(e.children),l()),i(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),i(()=>(t&&(t._pendingUpdate=l),()=>{t&&(t._pendingUpdate=l)})),s(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return x},defaultHead:function(){return p}};for(var n in r)Object.defineProperty(a,n,{enumerable:!0,get:r[n]});let i=e.r(55682),s=e.r(90809),l=e.r(43476),o=s._(e.r(71645)),d=i._(e.r(98879)),c=e.r(42732);function p(){return[(0,l.jsx)("meta",{charSet:"utf-8"},"charset"),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function m(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let u=["name","httpEquiv","charSet","itemProp"];function f(e){let t,a,r,n;return e.reduce(m,[]).reverse().concat(p().reverse()).filter((t=new Set,a=new Set,r=new Set,n={},e=>{let i=!0,s=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){s=!0;let a=e.key.slice(e.key.indexOf("$")+1);t.has(a)?i=!1:t.add(a)}switch(e.type){case"title":case"base":a.has(e.type)?i=!1:a.add(e.type);break;case"meta":for(let t=0,a=u.length;t<a;t++){let a=u[t];if(e.props.hasOwnProperty(a))if("charSet"===a)r.has(a)?i=!1:r.add(a);else{let t=e.props[a],r=n[a]||new Set;("name"!==a||!s)&&r.has(t)?i=!1:(r.add(t),n[a]=r)}}}return i})).reverse().map((e,t)=>{let a=e.key||t;return o.default.cloneElement(e,{key:a})})}let x=function({children:e}){let t=(0,o.useContext)(c.HeadManagerContext);return(0,l.jsx)(d.default,{reduceComponentsToState:f,headManager:t,children:e})};("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},18556,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let r=e.r(55682)._(e.r(71645)),n=e.r(87690),i=r.default.createContext(n.imageConfigDefault)},65856,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"RouterContext",{enumerable:!0,get:function(){return r}});let r=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,a)=>{"use strict";function r(e,t){let a=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-a)<Math.abs(e-a)?t:e,0):a}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"findClosestQuality",{enumerable:!0,get:function(){return r}})},1948,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return s}});let r=e.r(70965),n=e.r(43369);function i({config:e,src:t,width:a,quality:i}){if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let s=(0,r.findClosestQuality)(i,e),l=(0,n.getDeploymentId)();return`${e.path}?url=${encodeURIComponent(t)}&w=${a}&q=${s}${t.startsWith("/")&&l?`&dpl=${l}`:""}`}i.__next_img_default=!0;let s=i},5500,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"Image",{enumerable:!0,get:function(){return j}});let r=e.r(55682),n=e.r(90809),i=e.r(43476),s=n._(e.r(71645)),l=r._(e.r(74080)),o=r._(e.r(25633)),d=e.r(8927),c=e.r(87690),p=e.r(18556);e.r(33525);let m=e.r(65856),u=r._(e.r(1948)),f=e.r(18581),x={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/SKF-FEETRACK/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function g(e,t,a,r,n,i,s){let l=e?.src;e&&e["data-loaded-src"]!==l&&(e["data-loaded-src"]=l,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&n(!0),a?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let r=!1,n=!1;a.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>r,isPropagationStopped:()=>n,persist:()=>{},preventDefault:()=>{r=!0,t.preventDefault()},stopPropagation:()=>{n=!0,t.stopPropagation()}})}r?.current&&r.current(e)}}))}function h(e){return s.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let b=(0,s.forwardRef)(({src:e,srcSet:t,sizes:a,height:r,width:n,decoding:l,className:o,style:d,fetchPriority:c,placeholder:p,loading:m,unoptimized:u,fill:x,onLoadRef:b,onLoadingCompleteRef:y,setBlurComplete:j,setShowAltText:v,sizesInput:w,onLoad:S,onError:N,...k},C)=>{let _=(0,s.useCallback)(e=>{e&&(N&&(e.src=e.src),e.complete&&g(e,p,b,y,j,u,w))},[e,p,b,y,j,N,u,w]),P=(0,f.useMergedRef)(C,_);return(0,i.jsx)("img",{...k,...h(c),loading:m,width:n,height:r,decoding:l,"data-nimg":x?"fill":"1",className:o,style:d,sizes:a,srcSet:t,src:e,ref:P,onLoad:e=>{g(e.currentTarget,p,b,y,j,u,w)},onError:e=>{v(!0),"empty"!==p&&j(!0),N&&N(e)}})});function y({isAppRouter:e,imgAttributes:t}){let a={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...h(t.fetchPriority)};return e&&l.default.preload?(l.default.preload(t.src,a),null):(0,i.jsx)(o.default,{children:(0,i.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...a},"__nimg-"+t.src+t.srcSet+t.sizes)})}let j=(0,s.forwardRef)((e,t)=>{let a=(0,s.useContext)(m.RouterContext),r=(0,s.useContext)(p.ImageConfigContext),n=(0,s.useMemo)(()=>{let e=x||r||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),a=e.deviceSizes.sort((e,t)=>e-t),n=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:a,qualities:n,localPatterns:"u"<typeof window?r?.localPatterns:e.localPatterns}},[r]),{onLoad:l,onLoadingComplete:o}=e,f=(0,s.useRef)(l);(0,s.useEffect)(()=>{f.current=l},[l]);let g=(0,s.useRef)(o);(0,s.useEffect)(()=>{g.current=o},[o]);let[h,j]=(0,s.useState)(!1),[v,w]=(0,s.useState)(!1),{props:S,meta:N}=(0,d.getImgProps)(e,{defaultLoader:u.default,imgConf:n,blurComplete:h,showAltText:v});return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(b,{...S,unoptimized:N.unoptimized,placeholder:N.placeholder,fill:N.fill,onLoadRef:f,onLoadingCompleteRef:g,setBlurComplete:j,setShowAltText:w,sizesInput:e.sizes,ref:t}),N.preload?(0,i.jsx)(y,{isAppRouter:!a,imgAttributes:S}):null]})});("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},94909,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return c},getImageProps:function(){return d}};for(var n in r)Object.defineProperty(a,n,{enumerable:!0,get:r[n]});let i=e.r(55682),s=e.r(8927),l=e.r(5500),o=i._(e.r(1948));function d(e){let{props:t}=(0,s.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/SKF-FEETRACK/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let c=l.Image},57688,(e,t,a)=>{t.exports=e.r(94909)},87073,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(18566),n=e.i(22016),i=e.i(71689),s=e.i(30699),l=e.i(9165),o=e.i(932),d=e.i(57688);let c="https://skfkarate.github.io/SKF-FEETRACK",p=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function m(e){let r,n,i,s,l,m,u,f,x,g,h,b,y,j,v,w,S,N,k,C,_,P,A,E,R,M,z,O,I,T,F,D,$,K,L,W,B,U,G,q,J,H,V,X,Y,Q,Z,ee,et,ea,er,en,ei,es=(0,o.c)(88),{student:el,month:eo,branch:ed,onClose:ec}=e,ep=(0,a.useRef)(null);es[0]!==ed?(r="MPSC"===ed?"MP Sports Club":ed?.toUpperCase(),es[0]=ed,es[1]=r):r=es[1];let em=r;es[2]!==ed?(n=ed.substring(0,1).toUpperCase(),es[2]=ed,es[3]=n):n=es[3],es[4]===Symbol.for("react.memo_cache_sentinel")?(i=Date.now().toString().slice(-4),es[4]=i):i=es[4];let eu=`SKF-${n}-${i}`;es[5]===Symbol.for("react.memo_cache_sentinel")?(s=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}),es[5]=s):s=es[5];let ef=s;es[6]!==el.fee?(l=el.fee.toLocaleString(),es[6]=el.fee,es[7]=l):l=es[7];let ex=`Rupees ${l} Only`;es[8]!==ex||es[9]!==em||es[10]!==eo||es[11]!==eu||es[12]!==el.fee||es[13]!==el.id||es[14]!==el.name?(m=()=>{let e=window.open("","_blank","width=600,height=800");if(!e)return void alert("Please allow popups to download the receipt.");let t=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${el.id}_${p[eo]}2026_Fee</title>
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
    }
    
    .receipt {
      width: 140mm;
      min-height: 200mm;
      margin: 10mm auto;
      background: white;
      position: relative;
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
      width: 40%;
      vertical-align: middle;
      padding-right: 12px;
    }
    
    .value {
      display: table-cell;
      color: #1a1f2e;
      font-weight: 700;
      font-size: 12px;
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
        <span class="value">${em}</span>
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
          ${el.name}<br>
          <span class="id-badge">${el.id}</span>
        </span>
      </div>
      <div class="row">
        <span class="label">Purpose</span>
        <span class="value">Monthly Training Fee</span>
      </div>
      
      <div class="amount-box">
        <div class="amount">₹ ${el.fee.toLocaleString()}</div>
        <div class="words">${ex}</div>
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
    `;e.document.write(t),e.document.close()},es[8]=ex,es[9]=em,es[10]=eo,es[11]=eu,es[12]=el.fee,es[13]=el.id,es[14]=el.name,es[15]=m):m=es[15];let eg=m;es[16]===Symbol.for("react.memo_cache_sentinel")?(u={position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"},f={width:"100%",maxWidth:"520px",maxHeight:"90vh",overflowY:"auto"},es[16]=u,es[17]=f):(u=es[16],f=es[17]),es[18]===Symbol.for("react.memo_cache_sentinel")?(v={backgroundColor:"#ffffff",color:"#1a1f2e",borderRadius:"12px",overflow:"hidden",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},x=(0,t.jsxs)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"24px",textAlign:"center"},children:[(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginBottom:"12px"},children:(0,t.jsx)(d.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/logo.png",alt:"SKF",width:70,height:70,className:"rounded-full object-contain border border-[#d4af37]/50 bg-white/5"})}),(0,t.jsx)("h1",{style:{color:"#ffffff",fontSize:"28px",fontWeight:900,letterSpacing:"0.2em",margin:0},children:"SKF"}),(0,t.jsx)("p",{style:{color:"#d4af37",fontSize:"11px",fontWeight:600,letterSpacing:"0.1em",marginTop:"4px"},children:"Sports Karate-do Fitness & Self Defence Association ®"})]}),g={padding:"24px",borderBottom:"1px solid #e5e7eb"},h=(0,t.jsxs)("div",{style:{textAlign:"center",marginBottom:"16px"},children:[(0,t.jsx)("h2",{style:{color:"#1a1f2e",fontSize:"18px",fontWeight:900,margin:0},children:"Monthly Fee Receipt"}),(0,t.jsx)("p",{style:{color:"#6b7280",fontSize:"11px",marginTop:"4px"},children:"Payment confirmation"})]}),b={width:"100%",borderCollapse:"collapse"},y=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Branch"}),j={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},es[18]=x,es[19]=g,es[20]=h,es[21]=b,es[22]=y,es[23]=j,es[24]=v):(x=es[18],g=es[19],h=es[20],b=es[21],y=es[22],j=es[23],v=es[24]),es[25]!==em?(w=(0,t.jsxs)("tr",{children:[y,(0,t.jsx)("td",{style:j,children:em})]}),es[25]=em,es[26]=w):w=es[26],es[27]===Symbol.for("react.memo_cache_sentinel")?(S=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Receipt No"}),N={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},es[27]=S,es[28]=N):(S=es[27],N=es[28]),es[29]!==eu?(k=(0,t.jsxs)("tr",{children:[S,(0,t.jsx)("td",{style:N,children:eu})]}),es[29]=eu,es[30]=k):k=es[30],es[31]===Symbol.for("react.memo_cache_sentinel")?(C=(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Date"}),(0,t.jsx)("td",{style:{color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},children:ef})]}),es[31]=C):C=es[31],es[32]!==w||es[33]!==k?(_=(0,t.jsxs)("div",{style:g,children:[h,(0,t.jsx)("table",{style:b,children:(0,t.jsxs)("tbody",{children:[w,k,C]})})]}),es[32]=w,es[33]=k,es[34]=_):_=es[34],es[35]===Symbol.for("react.memo_cache_sentinel")?(P={padding:"24px",position:"relative"},A={width:"100%",borderCollapse:"collapse"},E=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Parent / Guardian"}),R={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},es[35]=P,es[36]=A,es[37]=E,es[38]=R):(P=es[35],A=es[36],E=es[37],R=es[38]);let eh=el.parentName||"N/A";return es[39]!==eh?(M=(0,t.jsxs)("tr",{children:[E,(0,t.jsx)("td",{style:R,children:eh})]}),es[39]=eh,es[40]=M):M=es[40],es[41]===Symbol.for("react.memo_cache_sentinel")?(z=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"top"},children:"Student Name"}),O={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"top"},es[41]=z,es[42]=O):(z=es[41],O=es[42]),es[43]===Symbol.for("react.memo_cache_sentinel")?(I=(0,t.jsx)("br",{}),T={backgroundColor:"#b8860b",color:"#ffffff",fontSize:"10px",padding:"2px 8px",borderRadius:"4px",fontWeight:700,display:"inline-block",marginTop:"4px"},es[43]=I,es[44]=T):(I=es[43],T=es[44]),es[45]!==el.id?(F=(0,t.jsx)("span",{style:T,children:el.id}),es[45]=el.id,es[46]=F):F=es[46],es[47]!==el.name||es[48]!==F?(D=(0,t.jsxs)("tr",{children:[z,(0,t.jsxs)("td",{style:O,children:[el.name,I,F]})]}),es[47]=el.name,es[48]=F,es[49]=D):D=es[49],es[50]===Symbol.for("react.memo_cache_sentinel")?($=(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Purpose"}),(0,t.jsx)("td",{style:{color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},children:"Monthly Training Fee"})]}),es[50]=$):$=es[50],es[51]!==M||es[52]!==D?(K=(0,t.jsx)("table",{style:A,children:(0,t.jsxs)("tbody",{children:[M,D,$]})}),es[51]=M,es[52]=D,es[53]=K):K=es[53],es[54]===Symbol.for("react.memo_cache_sentinel")?(L={marginTop:"24px",padding:"16px",borderRadius:"12px",border:"2px solid #d4af37",background:"linear-gradient(135deg, #fafbfc, #f3f4f6)",textAlign:"center"},W={fontSize:"28px",fontWeight:900,color:"#1a1f2e"},es[54]=L,es[55]=W):(L=es[54],W=es[55]),es[56]!==el.fee?(B=el.fee.toLocaleString(),es[56]=el.fee,es[57]=B):B=es[57],es[58]!==B?(U=(0,t.jsxs)("div",{style:W,children:["₹ ",B]}),es[58]=B,es[59]=U):U=es[59],es[60]===Symbol.for("react.memo_cache_sentinel")?(G={fontSize:"11px",fontStyle:"italic",color:"#6b7280",marginTop:"4px"},es[60]=G):G=es[60],es[61]!==ex?(q=(0,t.jsx)("div",{style:G,children:ex}),es[61]=ex,es[62]=q):q=es[62],es[63]!==U||es[64]!==q?(J=(0,t.jsxs)("div",{style:L,children:[U,q]}),es[63]=U,es[64]=q,es[65]=J):J=es[65],es[66]===Symbol.for("react.memo_cache_sentinel")?(H=(0,t.jsx)("div",{style:{marginTop:"16px",textAlign:"center",fontWeight:700,fontSize:"13px",color:"#16a34a"},children:"✔ Payment Received with Thanks"}),V=(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"8px",opacity:.9},children:(0,t.jsx)(d.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/stamp.png",alt:"PAID",width:96,height:96,className:"object-contain -rotate-12"})}),es[66]=H,es[67]=V):(H=es[66],V=es[67]),es[68]!==K||es[69]!==J?(X=(0,t.jsxs)("div",{style:P,children:[K,J,H,V]}),es[68]=K,es[69]=J,es[70]=X):X=es[70],es[71]===Symbol.for("react.memo_cache_sentinel")?(Y=(0,t.jsx)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"12px",textAlign:"center"},children:(0,t.jsx)("p",{style:{color:"#d1d5db",fontSize:"10px",margin:0},children:"This receipt is issued for confirmation and record purposes only."})}),es[71]=Y):Y=es[71],es[72]!==_||es[73]!==X?(Q=(0,t.jsxs)("div",{ref:ep,style:v,children:[x,_,X,Y]}),es[72]=_,es[73]=X,es[74]=Q):Q=es[74],es[75]===Symbol.for("react.memo_cache_sentinel")?(Z={display:"flex",gap:"12px",marginTop:"16px"},es[75]=Z):Z=es[75],es[76]===Symbol.for("react.memo_cache_sentinel")?(ee={flex:1,padding:"12px",backgroundColor:"#333",color:"white",fontWeight:600,letterSpacing:"0.05em",border:"none",borderRadius:"8px",cursor:"pointer"},es[76]=ee):ee=es[76],es[77]!==ec?(et=(0,t.jsx)("button",{onClick:ec,style:ee,children:"CLOSE"}),es[77]=ec,es[78]=et):et=es[78],es[79]===Symbol.for("react.memo_cache_sentinel")?(ea={flex:1,padding:"12px",backgroundColor:"#16a34a",color:"white",fontWeight:600,letterSpacing:"0.05em",border:"none",borderRadius:"8px",cursor:"pointer"},es[79]=ea):ea=es[79],es[80]!==eg?(er=(0,t.jsx)("button",{onClick:eg,style:ea,children:"🖨️ PRINT / SAVE PDF"}),es[80]=eg,es[81]=er):er=es[81],es[82]!==et||es[83]!==er?(en=(0,t.jsxs)("div",{style:Z,children:[et,er]}),es[82]=et,es[83]=er,es[84]=en):en=es[84],es[85]!==Q||es[86]!==en?(ei=(0,t.jsx)("div",{style:u,children:(0,t.jsxs)("div",{style:f,children:[Q,en]})}),es[85]=Q,es[86]=en,es[87]=ei):ei=es[87],ei}let u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function f({branch:e}){let o=(0,r.useRouter)(),d=(0,r.useSearchParams)(),[c,p]=(0,a.useState)([]),[f,x]=(0,a.useState)(!0),[g,h]=(0,a.useState)(""),[b,y]=(0,a.useState)(""),[j,v]=(0,a.useState)(!1),[w,S]=(0,a.useState)(null),[N,k]=(0,a.useState)(null),[C,_]=(0,a.useState)(null),[P,A]=(0,a.useState)(!1),[E,R]=(0,a.useState)(null),[M,z]=(0,a.useState)(!1),[O,I]=(0,a.useState)({skfId:"",name:"",fee:500,phone:"",joinMonth:0}),[T,F]=(0,a.useState)(!1),[D,$]=(0,a.useState)(null),[K,L]=(0,a.useState)(null),W=(0,a.useRef)(null),[B,U]=(0,a.useState)(!1),[G,q]=(0,a.useState)(null),[J,H]=(0,a.useState)(null),[V,X]=(0,a.useState)(null),Y=parseInt(d.get("month")||new Date().getMonth().toString());(0,a.useEffect)(()=>{let e=localStorage.getItem("skf_user"),t=localStorage.getItem("skf_login_time");(!e||!t||Date.now()-parseInt(t)>18e5)&&o.push("/")},[o]);let Q=(0,a.useCallback)(async()=>{if(e){x(!0),h("");try{let t=await (0,l.getStudents)(e,Y);p(t)}catch(e){h(e instanceof Error?e.message:"Failed to load students")}finally{x(!1)}}},[e,Y]);(0,a.useEffect)(()=>{Q()},[Q]);let Z=(0,a.useMemo)(()=>{let e=c.filter(e=>"Active"===e.status),t=e.filter(e=>"Paid"===e.monthStatus),a=e.filter(e=>"Pending"===e.monthStatus),r=e.filter(e=>"Break"===e.monthStatus),n=e.filter(e=>"Discontinued"===e.monthStatus);return{totalStudents:e.length,paidCount:t.length,pendingCount:a.length,onBreakCount:r.length,discontinuedCount:n.length,expectedAmount:a.reduce((e,t)=>e+(t.fee||0),0)+t.reduce((e,t)=>e+(t.fee||0),0),collectedAmount:t.reduce((e,t)=>e+(t.fee||0),0),pendingAmount:a.reduce((e,t)=>e+(t.fee||0),0),collectionRate:a.length+t.length>0?Math.round(t.length/(a.length+t.length)*100):0}},[c]),ee=async t=>{k(t),_(null),R(null),A(!0);try{let a=await (0,l.getStudentAvailableCredits)(t.id,e);_(a),a.credits.length>0&&R(a.credits[0].id)}catch{}finally{A(!1)}},et=async()=>{if(N){S(N.id),k(null);try{E?await (0,l.markPaidWithCredit)(N.id,e,Y,E):await (0,l.markPaid)(N.id,e,Y),p(e=>e.map(e=>e.id===N.id?{...e,paid:!0,monthStatus:"Paid"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as paid")}finally{S(null),R(null),_(null)}}},ea=e=>{W.current=setTimeout(()=>{L(e),U(!0)},3e3)},er=()=>{W.current&&(clearTimeout(W.current),W.current=null)},en=async()=>{if(G){X(G.id),q(null);try{await (0,l.markBreak)(G.id,e,Y),p(e=>e.map(e=>e.id===G.id?{...e,paid:!1,monthStatus:"Break"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as break")}finally{X(null)}}},ei=async()=>{if(J){X(J.id),H(null);try{await (0,l.markDiscontinued)(J.id,e,Y),p(e=>e.map(e=>e.id===J.id?{...e,paid:!1,monthStatus:"Discontinued"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as discontinued")}finally{X(null)}}},es=async()=>{if(!O.skfId.trim())return void alert("Please enter SKF ID");if(!O.name.trim())return void alert("Please enter student name");F(!0);try{await (0,l.addStudent)(e,O.skfId,O.name,O.fee,O.phone,O.joinMonth),z(!1),I({skfId:"",name:"",fee:500,phone:"",joinMonth:Y}),Q()}catch(e){alert(e instanceof Error?e.message:"Failed to add student")}finally{F(!1)}},el=c.filter(e=>{let t=e.name.toLowerCase().includes(b.toLowerCase())||e.id.toLowerCase().includes(b.toLowerCase()),a=!j||"Pending"===e.monthStatus,r="Active"===e.status;return t&&a&&r}),eo=(0,a.useMemo)(()=>{let e={Pending:0,Paid:1,Break:2,Discontinued:3,"N/A":4};return[...el].sort((t,a)=>{let r=t.id.localeCompare(a.id,void 0,{numeric:!0,sensitivity:"base"});return 0!==r?r:(e[t.monthStatus]??4)-(e[a.monthStatus]??4)})},[el]),ed="MPSC"===e?"MP SPORTS CLUB":e?.toUpperCase();return(0,t.jsxs)("div",{className:"min-h-screen bg-[#0a0a0a]",children:[(0,t.jsx)("header",{className:"bg-[#1a1a1a] border-b border-[#333] px-4 py-4 sticky top-0 z-50",children:(0,t.jsxs)("div",{className:"max-w-2xl mx-auto flex items-center gap-4",children:[(0,t.jsx)(n.default,{href:"/dashboard",className:"text-gray-400 hover:text-white transition-colors",children:(0,t.jsx)(i.ArrowLeft,{className:"w-6 h-6"})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("h1",{className:"font-[family-name:var(--font-oswald)] text-lg font-bold tracking-wider",children:ed}),(0,t.jsxs)("p",{className:"text-gray-500 text-sm",children:[u[Y]," 2026"]})]}),(0,t.jsxs)("div",{className:"text-right",children:[(0,t.jsx)("p",{className:"text-green-500 font-bold",children:Z.paidCount}),(0,t.jsxs)("p",{className:"text-gray-600 text-xs",children:["/ ",Z.totalStudents]})]})]})}),(0,t.jsxs)("main",{className:"max-w-2xl mx-auto p-4",children:[!f&&!g&&(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-3 mb-6",children:[(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Expected"}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-oswald)] text-2xl text-white",children:["₹",Z.expectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-green-600/50 p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Collected"}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-oswald)] text-2xl text-green-500",children:["₹",Z.collectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-orange-600/50 p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Pending"}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-oswald)] text-2xl text-orange-500",children:["₹",Z.pendingAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] p-4",children:[(0,t.jsx)("p",{className:"text-gray-500 text-xs uppercase tracking-wider mb-1",children:"Rate"}),(0,t.jsxs)("p",{className:`font-[family-name:var(--font-oswald)] text-2xl ${Z.collectionRate>=80?"text-green-500":Z.collectionRate>=50?"text-yellow-500":"text-red-500"}`,children:[Z.collectionRate,"%"]})]})]}),(0,t.jsxs)("div",{className:"mb-4 space-y-3",children:[(0,t.jsx)("input",{type:"text",value:b,onChange:e=>y(e.target.value),placeholder:"Search by name or SKF ID...",className:"w-full bg-[#1a1a1a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none placeholder:text-gray-600"}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:()=>v(!j),className:`px-4 py-2 text-sm border transition-all ${j?"bg-red-600 border-red-600 text-white":"bg-transparent border-[#333] text-gray-400 hover:border-red-600"}`,children:j?"✓ Pending":"Pending Only"}),(0,t.jsx)("button",{onClick:()=>{I({...O,joinMonth:Y}),z(!0)},className:"px-4 py-2 text-sm border border-green-600 text-green-500 hover:bg-green-600 hover:text-white transition-all",children:"+ Add Student"})]})]}),f&&(0,t.jsxs)("div",{className:"text-center py-12",children:[(0,t.jsx)("div",{className:"w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-gray-500",children:"Loading students..."})]}),g&&(0,t.jsxs)("div",{className:"text-center py-12",children:[(0,t.jsx)("p",{className:"text-red-500 mb-4",children:g}),(0,t.jsx)("button",{onClick:Q,className:"px-4 py-2 bg-red-600 text-white hover:bg-red-700",children:"Retry"})]}),!f&&!g&&(0,t.jsx)("div",{className:"space-y-3",children:0===eo.length?(0,t.jsx)("p",{className:"text-center text-gray-500 py-12",children:"No students found"}):eo.map(e=>{let a="Break"===e.monthStatus,r="Discontinued"===e.monthStatus,n=a||r;return(0,t.jsx)("div",{className:`bg-[#1a1a1a] border border-[#333] p-4 transition-opacity ${r?"opacity-40":a?"opacity-50":""}`,children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("h3",{className:"font-[family-name:var(--font-oswald)] text-lg tracking-wide",children:e.name}),a&&(0,t.jsx)("span",{className:"text-xs bg-orange-600/30 text-orange-400 px-2 py-0.5 rounded",children:"BREAK"}),r&&(0,t.jsx)("span",{className:"text-xs bg-gray-600/30 text-gray-400 px-2 py-0.5 rounded",children:"DISCONTINUED"})]}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",e.id]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mt-1",children:[(0,t.jsxs)("p",{className:"text-gray-400",children:["₹",e.fee]}),e.creditApplied&&e.creditApplied>0&&(0,t.jsxs)("span",{className:"flex items-center gap-1 text-[10px] bg-purple-900/50 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/30",children:[(0,t.jsx)(s.Gift,{className:"w-3 h-3"}),"-₹",e.creditApplied]})]})]}),"Paid"===e.monthStatus?(0,t.jsx)("button",{onClick:()=>$(e),className:"bg-green-600/20 text-green-500 px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider hover:bg-green-600/30 transition-colors cursor-pointer",children:"✓ PAID"}):n?(0,t.jsx)("span",{className:`px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider ${a?"text-orange-500":"text-gray-500"}`,children:a?"ON BREAK":"LEFT"}):(0,t.jsx)("button",{onClick:()=>ee(e),onMouseDown:()=>ea(e),onMouseUp:er,onMouseLeave:er,onTouchStart:()=>ea(e),onTouchEnd:er,disabled:w===e.id||V===e.id,className:"bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-[family-name:var(--font-oswald)] text-sm tracking-wider disabled:opacity-50 select-none",children:w===e.id||V===e.id?"...":"MARK PAID"})]})},e.id)})})]}),N&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center",children:"CONFIRM PAYMENT"}),(0,t.jsxs)("div",{className:"bg-[#0a0a0a] border border-[#333] p-4 mb-4",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] text-lg",children:N.name}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",N.id]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Original Fee"}),(0,t.jsxs)("p",{className:"text-xl font-bold text-white",children:["₹",N.fee]})]}),P?(0,t.jsx)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:(0,t.jsx)("p",{className:"text-gray-500 text-sm",children:"Checking for credits..."})}):C&&C.credits.length>0?(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-purple-400 text-sm",children:[(0,t.jsx)(s.Gift,{className:"w-3 h-3"})," Referral Credit Available"]}),(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:!!E,onChange:e=>R(e.target.checked?C.credits[0].id:null),className:"w-4 h-4 accent-purple-600"}),(0,t.jsx)("span",{className:"text-sm text-gray-400",children:"Apply"})]})]}),(0,t.jsxs)("p",{className:"text-purple-400 font-bold",children:["-₹",C.totalAvailable]}),C.credits[0].reason&&(0,t.jsx)("p",{className:"text-gray-500 text-xs mt-1",children:C.credits[0].reason})]}):null,(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Amount to Collect"}),(0,t.jsxs)("p",{className:"text-2xl font-bold text-green-500",children:["₹",E&&C?Math.max(0,N.fee-C.totalAvailable):N.fee]})]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[u[Y]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-gray-400 text-center text-sm mb-4",children:E&&C?`Collect ₹${Math.max(0,N.fee-C.totalAvailable)} (₹${C.totalAvailable} credit applied)`:`Collect ₹${N.fee}?`}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>{k(null),R(null),_(null)},className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:et,className:"flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700",children:"✓ CONFIRM"})]})]})}),M&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-6 text-center",children:"ADD NEW STUDENT"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"SKF ID *"}),(0,t.jsx)("input",{type:"text",value:O.skfId,onChange:e=>I({...O,skfId:e.target.value.toUpperCase()}),placeholder:"e.g., HERO-001 or MP-001",className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none font-mono"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Student Name *"}),(0,t.jsx)("input",{type:"text",value:O.name,onChange:e=>I({...O,name:e.target.value}),placeholder:"Enter full name",className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Monthly Fee (₹)"}),(0,t.jsx)("input",{type:"number",value:O.fee,onChange:e=>I({...O,fee:parseInt(e.target.value)||500}),className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Phone Number"}),(0,t.jsx)("input",{type:"tel",value:O.phone,onChange:e=>I({...O,phone:e.target.value}),placeholder:"Optional",className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-gray-400 text-xs uppercase tracking-wider block mb-2",children:"Joining Month *"}),(0,t.jsx)("select",{value:O.joinMonth,onChange:e=>I({...O,joinMonth:parseInt(e.target.value)}),className:"w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-white focus:border-red-600 focus:outline-none",children:u.map((e,a)=>(0,t.jsxs)("option",{value:a,children:[e," 2026"]},a))}),(0,t.jsx)("p",{className:"text-gray-600 text-xs mt-2",children:"Fees will only be calculated from this month onwards"})]})]}),(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[(0,t.jsx)("button",{onClick:()=>z(!1),className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:es,disabled:T||!O.name.trim(),className:"flex-1 py-3 bg-green-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-green-700 disabled:opacity-50",children:T?"...":"+ ADD"})]})]})}),B&&K&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4",onClick:()=>U(!1),children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-xs",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("p",{className:"text-gray-400 text-xs uppercase tracking-wider p-4 border-b border-[#333]",children:K.name}),(0,t.jsxs)("button",{onClick:()=>{U(!1),q(K)},className:"w-full text-left px-4 py-4 text-orange-400 hover:bg-[#252525] transition-colors flex items-center gap-3",children:[(0,t.jsx)("span",{className:"text-xl",children:"⏸"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] tracking-wider",children:"MARK AS BREAK"}),(0,t.jsx)("p",{className:"text-gray-500 text-xs",children:"Student on leave this month"})]})]}),(0,t.jsxs)("button",{onClick:()=>{U(!1),H(K)},className:"w-full text-left px-4 py-4 text-gray-400 hover:bg-[#252525] transition-colors flex items-center gap-3 border-t border-[#333]",children:[(0,t.jsx)("span",{className:"text-xl",children:"⛔"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] tracking-wider",children:"DISCONTINUED"}),(0,t.jsx)("p",{className:"text-gray-500 text-xs",children:"Student left permanently"})]})]})]})}),G&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center text-orange-400",children:"MARK AS BREAK"}),(0,t.jsxs)("div",{className:"bg-[#0a0a0a] border border-[#333] p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] text-lg",children:G.name}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",G.id]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[u[Y]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-gray-400 text-center text-sm mb-6",children:"This student will not be counted in pending fees for this month."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>q(null),className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:en,className:"flex-1 py-3 bg-orange-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-orange-700",children:"⏸ CONFIRM"})]})]})}),J&&(0,t.jsx)("div",{className:"fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4",children:(0,t.jsxs)("div",{className:"bg-[#1a1a1a] border border-[#333] w-full max-w-sm p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-oswald)] text-xl tracking-wider mb-4 text-center text-gray-400",children:"MARK AS DISCONTINUED"}),(0,t.jsxs)("div",{className:"bg-[#0a0a0a] border border-[#333] p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-oswald)] text-lg",children:J.name}),(0,t.jsxs)("p",{className:"text-gray-600 text-sm font-mono",children:["SKF: ",J.id]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[#333]",children:[(0,t.jsx)("p",{className:"text-gray-400 text-sm mb-1",children:"From Month"}),(0,t.jsxs)("p",{className:"text-white",children:[u[Y]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-gray-400 text-center text-sm mb-6",children:"This student will be marked as discontinued and moved to the bottom of the list."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>H(null),className:"flex-1 py-3 bg-[#333] text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-[#444]",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ei,className:"flex-1 py-3 bg-gray-600 text-white font-[family-name:var(--font-oswald)] tracking-wider hover:bg-gray-700",children:"⛔ CONFIRM"})]})]})}),D&&(0,t.jsx)(m,{student:D,month:Y,branch:e,onClose:()=>$(null)})]})}e.s(["default",()=>f],87073)}]);