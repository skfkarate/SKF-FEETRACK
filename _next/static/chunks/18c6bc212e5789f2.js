(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,87073,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(18566),n=e.i(30699),r=e.i(75254);let l=(0,r.default)("indian-rupee",[["path",{d:"M6 3h12",key:"ggurg9"}],["path",{d:"M6 8h12",key:"6g4wlu"}],["path",{d:"m6 13 8.5 8",key:"u1kupk"}],["path",{d:"M6 13h3",key:"wdp6ag"}],["path",{d:"M9 13c6.667 0 6.667-10 0-10",key:"1nkvk2"}]]),i=(0,r.default)("target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]),d=(0,r.default)("trending-down",[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]]),o=(0,r.default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]),c=(0,r.default)("funnel",[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]]);var x=e.i(95468),m=e.i(3116);let p=(0,r.default)("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);var h=e.i(8402),u=e.i(90519),f=e.i(9165),g=e.i(932),b=e.i(57688);let v="https://skfkarate.github.io/SKF-FEETRACK",j=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function y(e){let s,n,r,l,i,d,o,c,x,m,p,h,u,f,y,N,w,k,S,C,A,P,M,F,D,R,_,T,I,z,E,L,$,K,W,O,B,U,J,G,q,H,V,Y,Q,X,Z,ee,et,ea,es,en,er,el,ei,ed=(0,g.c)(101),{student:eo,month:ec,branch:ex,onClose:em}=e,ep=(0,a.useRef)(null);ed[0]!==ex?(s="MPSC"===ex?"MP Sports Club":ex?.toUpperCase(),ed[0]=ex,ed[1]=s):s=ed[1];let eh=s;ed[2]===Symbol.for("react.memo_cache_sentinel")?(n=Math.floor(1e4*Math.random()).toString().padStart(4,"0"),ed[2]=n):n=ed[2];let eu=n;ed[3]!==ex?(r=ex.substring(0,1).toUpperCase(),ed[3]=ex,ed[4]=r):r=ed[4];let ef=`SKF-${r}-${eu}`;ed[5]===Symbol.for("react.memo_cache_sentinel")?(l=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}),ed[5]=l):l=ed[5],ed[6]!==ec?(i=new Date(2026,ec,1).toLocaleDateString("en-IN",{month:"long"}),ed[6]=ec,ed[7]=i):i=ed[7];let eg=`${i} Monthly Training Fee`;ed[8]!==eo.fee?(d=eo.fee.toLocaleString(),ed[8]=eo.fee,ed[9]=d):d=ed[9];let eb=`Rupees ${d} Only`;ed[10]!==ef||ed[11]!==eg||ed[12]!==eb?(o={receiptNo:ef,date:l,purpose:eg,amountWords:eb},ed[10]=ef,ed[11]=eg,ed[12]=eb,ed[13]=o):o=ed[13];let{receiptNo:ev,date:ej,purpose:ey,amountWords:eN}=o;ed[14]!==eN||ed[15]!==eh||ed[16]!==ej||ed[17]!==ec||ed[18]!==ey||ed[19]!==ev||ed[20]!==eo.fee||ed[21]!==eo.id||ed[22]!==eo.name||ed[23]!==eo.parentName?(c=()=>{let e=window.open("","_blank","width=600,height=800");if(!e)return void alert("Please allow popups to download the receipt.");let t=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${eo.id}_${j[ec]}2026_Fee</title>
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
      <img src="${v}/logo.png" alt="SKF" class="logo">
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
        <span class="value">${eh}</span>
      </div>
      <div class="row">
        <span class="label">Receipt No</span>
        <span class="value">${ev}</span>
      </div>
      <div class="row">
        <span class="label">Date</span>
        <span class="value">${ej}</span>
      </div>
    </div>
    
    <div class="section">
      <div class="row">
        <span class="label">Parent / Guardian</span>
        <span class="value">${eo.parentName||"N/A"}</span>
      </div>
      <div class="row">
        <span class="label">Student Name</span>
        <span class="value">
          ${eo.name}<br>
          <span class="id-badge">${eo.id}</span>
        </span>
      </div>
      <div class="row">
        <span class="label">Purpose</span>
        <span class="value">${ey}</span>
      </div>
      
      <div class="amount-box">
        <div class="amount">₹ ${eo.fee.toLocaleString()}</div>
        <div class="words">${eN}</div>
      </div>
      
      <div class="status">✔ Payment Received with Thanks</div>
      
      <div class="stamp">
        <img src="${v}/stamp.png" alt="PAID">
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
    `;e.document.write(t),e.document.close()},ed[14]=eN,ed[15]=eh,ed[16]=ej,ed[17]=ec,ed[18]=ey,ed[19]=ev,ed[20]=eo.fee,ed[21]=eo.id,ed[22]=eo.name,ed[23]=eo.parentName,ed[24]=c):c=ed[24];let ew=c;ed[25]===Symbol.for("react.memo_cache_sentinel")?(x={zIndex:100},ed[25]=x):x=ed[25],ed[26]===Symbol.for("react.memo_cache_sentinel")?(m={backgroundColor:"#ffffff",color:"#1a1f2e",borderRadius:"12px",overflow:"hidden",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},p=(0,t.jsxs)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"24px",textAlign:"center"},children:[(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginBottom:"12px"},children:(0,t.jsx)(b.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/logo.png",alt:"SKF",width:70,height:70,className:"rounded-full object-contain border border-[#d4af37]/50 bg-white/5"})}),(0,t.jsx)("h1",{style:{color:"#ffffff",fontSize:"28px",fontWeight:900,letterSpacing:"0.2em",margin:0},children:"SKF"}),(0,t.jsx)("p",{style:{color:"#d4af37",fontSize:"11px",fontWeight:600,letterSpacing:"0.1em",marginTop:"4px"},children:"Sports Karate-do Fitness & Self Defence Association ®"})]}),h={padding:"24px",borderBottom:"1px solid #e5e7eb"},u=(0,t.jsxs)("div",{style:{textAlign:"center",marginBottom:"16px"},children:[(0,t.jsx)("h2",{style:{color:"#1a1f2e",fontSize:"18px",fontWeight:900,margin:0},children:"Monthly Fee Receipt"}),(0,t.jsx)("p",{style:{color:"#6b7280",fontSize:"11px",marginTop:"4px"},children:"Payment confirmation"})]}),f={width:"100%",borderCollapse:"collapse"},y=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Branch"}),N={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},ed[26]=m,ed[27]=p,ed[28]=h,ed[29]=u,ed[30]=f,ed[31]=y,ed[32]=N):(m=ed[26],p=ed[27],h=ed[28],u=ed[29],f=ed[30],y=ed[31],N=ed[32]),ed[33]!==eh?(w=(0,t.jsxs)("tr",{children:[y,(0,t.jsx)("td",{style:N,children:eh})]}),ed[33]=eh,ed[34]=w):w=ed[34],ed[35]===Symbol.for("react.memo_cache_sentinel")?(k=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Receipt No"}),S={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},ed[35]=k,ed[36]=S):(k=ed[35],S=ed[36]),ed[37]!==ev?(C=(0,t.jsxs)("tr",{children:[k,(0,t.jsx)("td",{style:S,children:ev})]}),ed[37]=ev,ed[38]=C):C=ed[38],ed[39]===Symbol.for("react.memo_cache_sentinel")?(A=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Date"}),P={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},ed[39]=A,ed[40]=P):(A=ed[39],P=ed[40]),ed[41]!==ej?(M=(0,t.jsxs)("tr",{children:[A,(0,t.jsx)("td",{style:P,children:ej})]}),ed[41]=ej,ed[42]=M):M=ed[42],ed[43]!==w||ed[44]!==C||ed[45]!==M?(F=(0,t.jsxs)("div",{style:h,children:[u,(0,t.jsx)("table",{style:f,children:(0,t.jsxs)("tbody",{children:[w,C,M]})})]}),ed[43]=w,ed[44]=C,ed[45]=M,ed[46]=F):F=ed[46],ed[47]===Symbol.for("react.memo_cache_sentinel")?(D={padding:"24px",position:"relative"},R={width:"100%",borderCollapse:"collapse"},_=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Parent / Guardian"}),T={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},ed[47]=D,ed[48]=R,ed[49]=_,ed[50]=T):(D=ed[47],R=ed[48],_=ed[49],T=ed[50]);let ek=eo.parentName||"N/A";return ed[51]!==ek?(I=(0,t.jsxs)("tr",{children:[_,(0,t.jsx)("td",{style:T,children:ek})]}),ed[51]=ek,ed[52]=I):I=ed[52],ed[53]===Symbol.for("react.memo_cache_sentinel")?(z=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"top"},children:"Student Name"}),E={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"top"},ed[53]=z,ed[54]=E):(z=ed[53],E=ed[54]),ed[55]===Symbol.for("react.memo_cache_sentinel")?(L=(0,t.jsx)("br",{}),$={backgroundColor:"#b8860b",color:"#ffffff",fontSize:"10px",padding:"2px 8px",borderRadius:"4px",fontWeight:700,display:"inline-block",marginTop:"4px"},ed[55]=L,ed[56]=$):(L=ed[55],$=ed[56]),ed[57]!==eo.id?(K=(0,t.jsx)("span",{style:$,children:eo.id}),ed[57]=eo.id,ed[58]=K):K=ed[58],ed[59]!==eo.name||ed[60]!==K?(W=(0,t.jsxs)("tr",{children:[z,(0,t.jsxs)("td",{style:E,children:[eo.name,L,K]})]}),ed[59]=eo.name,ed[60]=K,ed[61]=W):W=ed[61],ed[62]===Symbol.for("react.memo_cache_sentinel")?(O=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Purpose"}),B={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},ed[62]=O,ed[63]=B):(O=ed[62],B=ed[63]),ed[64]!==ey?(U=(0,t.jsxs)("tr",{children:[O,(0,t.jsx)("td",{style:B,children:ey})]}),ed[64]=ey,ed[65]=U):U=ed[65],ed[66]!==I||ed[67]!==W||ed[68]!==U?(J=(0,t.jsx)("table",{style:R,children:(0,t.jsxs)("tbody",{children:[I,W,U]})}),ed[66]=I,ed[67]=W,ed[68]=U,ed[69]=J):J=ed[69],ed[70]===Symbol.for("react.memo_cache_sentinel")?(G={marginTop:"24px",padding:"16px",borderRadius:"12px",border:"2px solid #d4af37",background:"linear-gradient(135deg, #fafbfc, #f3f4f6)",textAlign:"center"},q={fontSize:"28px",fontWeight:900,color:"#1a1f2e"},ed[70]=G,ed[71]=q):(G=ed[70],q=ed[71]),ed[72]!==eo.fee?(H=eo.fee.toLocaleString(),ed[72]=eo.fee,ed[73]=H):H=ed[73],ed[74]!==H?(V=(0,t.jsxs)("div",{style:q,children:["₹ ",H]}),ed[74]=H,ed[75]=V):V=ed[75],ed[76]===Symbol.for("react.memo_cache_sentinel")?(Y={fontSize:"11px",fontStyle:"italic",color:"#6b7280",marginTop:"4px"},ed[76]=Y):Y=ed[76],ed[77]!==eN?(Q=(0,t.jsx)("div",{style:Y,children:eN}),ed[77]=eN,ed[78]=Q):Q=ed[78],ed[79]!==V||ed[80]!==Q?(X=(0,t.jsxs)("div",{style:G,children:[V,Q]}),ed[79]=V,ed[80]=Q,ed[81]=X):X=ed[81],ed[82]===Symbol.for("react.memo_cache_sentinel")?(Z=(0,t.jsx)("div",{style:{marginTop:"16px",textAlign:"center",fontWeight:700,fontSize:"13px",color:"#16a34a"},children:"✔ Payment Received with Thanks"}),ee=(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"8px",opacity:.9},children:(0,t.jsx)(b.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/stamp.png",alt:"PAID",width:96,height:96,className:"object-contain -rotate-12"})}),ed[82]=Z,ed[83]=ee):(Z=ed[82],ee=ed[83]),ed[84]!==J||ed[85]!==X?(et=(0,t.jsxs)("div",{style:D,children:[J,X,Z,ee]}),ed[84]=J,ed[85]=X,ed[86]=et):et=ed[86],ed[87]===Symbol.for("react.memo_cache_sentinel")?(ea=(0,t.jsx)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"12px",textAlign:"center"},children:(0,t.jsx)("p",{style:{color:"#d1d5db",fontSize:"10px",margin:0},children:"This receipt is issued for confirmation and record purposes only."})}),ed[87]=ea):ea=ed[87],ed[88]!==F||ed[89]!==et?(es=(0,t.jsxs)("div",{ref:ep,style:m,children:[p,F,et,ea]}),ed[88]=F,ed[89]=et,ed[90]=es):es=ed[90],ed[91]!==em?(en=(0,t.jsx)("button",{onClick:em,className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider",children:"CLOSE"}),ed[91]=em,ed[92]=en):en=ed[92],ed[93]!==ew?(er=(0,t.jsx)("button",{onClick:ew,className:"btn-primary flex-1 font-[family-name:var(--font-space)] tracking-wider flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 border-none text-white",children:"⬇ DOWNLOAD"}),ed[93]=ew,ed[94]=er):er=ed[94],ed[95]!==en||ed[96]!==er?(el=(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[en,er]}),ed[95]=en,ed[96]=er,ed[97]=el):el=ed[97],ed[98]!==es||ed[99]!==el?(ei=(0,t.jsx)("div",{className:"glass-modal-overlay",style:x,children:(0,t.jsxs)("div",{className:"w-full max-w-[520px] max-h-[90vh] overflow-y-auto px-4 custom-scrollbar",children:[es,el]})}),ed[98]=es,ed[99]=el,ed[100]=ei):ei=ed[100],ei}var N=e.i(21319),w=e.i(71664);let k=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function S({branch:e}){let r=(0,s.useRouter)(),g=(0,s.useSearchParams)(),[b,v]=(0,a.useState)([]),[j,S]=(0,a.useState)(!0),[C,A]=(0,a.useState)(""),[P,M]=(0,a.useState)(""),[F,D]=(0,a.useState)(!1),[R,_]=(0,a.useState)(null),[T,I]=(0,a.useState)(null),[z,E]=(0,a.useState)(null),[L,$]=(0,a.useState)(!1),[K,W]=(0,a.useState)(null),[O,B]=(0,a.useState)(!1),[U,J]=(0,a.useState)({skfId:"",name:"",fee:500,phone:"",joinMonth:0,admissionFee:1e3,admissionPaid:!0,dressFee:1500,dressCost:1e3,dressPaid:!0}),[G,q]=(0,a.useState)(!1),[H,V]=(0,a.useState)(null),[Y,Q]=(0,a.useState)(null),X=(0,a.useRef)(null),[Z,ee]=(0,a.useState)(!1),[et,ea]=(0,a.useState)(null),[es,en]=(0,a.useState)(null),[er,el]=(0,a.useState)(null),[ei,ed]=(0,a.useState)(null),eo=parseInt(g.get("month")||new Date().getMonth().toString()),ec=(0,a.useRef)(eo);(0,a.useEffect)(()=>{let e=localStorage.getItem("skf_user"),t=localStorage.getItem("skf_login_time");(!e||!t||Date.now()-parseInt(t)>18e5)&&r.push("/")},[r]);let ex=(0,a.useCallback)(async(t=!1)=>{if(e){S(!0),A("");try{let a=await (0,f.getStudents)(e,eo,t);v(a)}catch(e){A(e instanceof Error?e.message:"Failed to load students")}finally{S(!1)}}},[e,eo]);(0,a.useEffect)(()=>{let e=ec.current!==eo;ec.current=eo,ex(e)},[ex,eo]);let em=(0,a.useMemo)(()=>{let e=b.filter(e=>"Active"===e.status),t=e.filter(e=>"Paid"===e.monthStatus),a=e.filter(e=>"Pending"===e.monthStatus),s=e.filter(e=>"Break"===e.monthStatus),n=e.filter(e=>"Discontinued"===e.monthStatus);return{totalStudents:e.length,paidCount:t.length,pendingCount:a.length,onBreakCount:s.length,discontinuedCount:n.length,expectedAmount:a.reduce((e,t)=>e+(t.fee||0),0)+t.reduce((e,t)=>e+(t.fee||0),0),collectedAmount:t.reduce((e,t)=>e+(t.fee||0),0),pendingAmount:a.reduce((e,t)=>e+(t.fee||0),0),collectionRate:a.length+t.length>0?Math.round(t.length/(a.length+t.length)*100):0}},[b]),ep=async t=>{I(t),E(null),W(null),$(!0);try{let a=await (0,f.getStudentAvailableCredits)(t.id,e);E(a),a.credits.length>0&&W(a.credits[0].id)}catch{}finally{$(!1)}},eh=async()=>{if(T){_(T.id),I(null);try{K?await (0,f.markPaidWithCredit)(T.id,e,eo,K):await (0,f.markPaid)(T.id,e,eo),v(e=>e.map(e=>e.id===T.id?{...e,paid:!0,monthStatus:"Paid"}:e)),V(T)}catch(e){alert(e instanceof Error?e.message:"Failed to mark as paid")}finally{_(null),W(null),E(null)}}},eu=e=>{X.current=setTimeout(()=>{Q(e),ee(!0)},3e3)},ef=()=>{X.current&&(clearTimeout(X.current),X.current=null)},eg=async()=>{if(et){ed(et.id),ea(null);try{await (0,f.markBreak)(et.id,e,eo),v(e=>e.map(e=>e.id===et.id?{...e,paid:!1,monthStatus:"Break"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as break")}finally{ed(null)}}},eb=async()=>{if(es){ed(es.id),en(null);try{await (0,f.markDiscontinued)(es.id,e,eo),v(e=>e.map(e=>e.id===es.id?{...e,paid:!1,monthStatus:"Discontinued"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as discontinued")}finally{ed(null)}}},ev=async()=>{if(!er)return;ed(er.student.id);let{student:t,type:a}=er;el(null);try{await (0,f.markNonRecurringFeePaid)(t.id,e,a),v(e=>e.map(e=>{if(e.id===t.id){if("Admission"===a)return{...e,admissionStatus:"Paid"};if("Dress"===a)return{...e,dressStatus:"Paid"}}return e}))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as paid")}finally{ed(null)}},ej=async()=>{if(!U.skfId.trim())return void alert("Please enter SKF ID");if(!U.name.trim())return void alert("Please enter student name");q(!0);try{await (0,f.addStudent)(e,U.skfId,U.name,U.fee,U.phone,U.joinMonth,U.admissionFee,U.admissionPaid,U.dressFee,U.dressCost,U.dressPaid),B(!1),J({skfId:"",name:"",fee:500,phone:"",joinMonth:eo,admissionFee:1e3,admissionPaid:!0,dressFee:1500,dressCost:1e3,dressPaid:!0}),ex()}catch(e){alert(e instanceof Error?e.message:"Failed to add student")}finally{q(!1)}},ey=b.filter(e=>{let t=e.name.toLowerCase().includes(P.toLowerCase())||e.id.toLowerCase().includes(P.toLowerCase()),a=!F||"Pending"===e.monthStatus,s="Active"===e.status;return t&&a&&s}),eN=(0,a.useMemo)(()=>{let e={Pending:0,Paid:1,Break:2,Discontinued:3,"N/A":4};return[...ey].sort((t,a)=>{let s=t.id.localeCompare(a.id,void 0,{numeric:!0,sensitivity:"base"});return 0!==s?s:(e[t.monthStatus]??4)-(e[a.monthStatus]??4)})},[ey]),ew="MPSC"===e?"MP SPORTS CLUB":e?.toUpperCase();return(0,t.jsxs)("div",{className:"min-h-screen",style:{background:"var(--bg-deep)"},children:[(0,t.jsx)(w.default,{title:ew,showBack:!0,rightContent:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("div",{className:"hidden sm:flex flex-col items-end mr-2",children:[(0,t.jsxs)("span",{className:"text-[10px] text-[var(--text-muted)] uppercase tracking-wider",children:[k[eo]," 2026"]}),(0,t.jsxs)("span",{className:"text-green-400 font-bold text-xs font-[family-name:var(--font-space)]",children:[em.paidCount,"/",em.totalStudents," Paid"]})]}),(0,t.jsx)(N.default,{selectedMonth:eo,onMonthChange:t=>{let a=new URLSearchParams(g.toString());a.set("month",t.toString()),r.push(`/students/${e}?${a.toString()}`)},className:"scale-90 origin-right"})]})}),(0,t.jsxs)("main",{className:"max-w-2xl mx-auto p-4 pt-24",children:[!j&&!C&&(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-fade-in",children:[(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(59, 130, 246, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(i,{className:"w-12 h-12 text-blue-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(i,{className:"w-3 h-3"})," Expected"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-blue-400",children:["₹",em.expectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(34, 197, 94, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(x.CheckCircle2,{className:"w-12 h-12 text-green-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(x.CheckCircle2,{className:"w-3 h-3"})," Collected"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-green-400",children:["₹",em.collectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(245, 158, 11, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(m.Clock,{className:"w-12 h-12 text-amber-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(m.Clock,{className:"w-3 h-3"})," Pending"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-amber-400",children:["₹",em.pendingAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(d,{className:"w-12 h-12 text-white"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(d,{className:"w-3 h-3"})," Efficiency"]}),(0,t.jsxs)("p",{className:`font-[family-name:var(--font-space)] text-lg sm:text-xl ${em.collectionRate>=80?"text-green-400":em.collectionRate>=50?"text-yellow-400":"text-red-400"}`,children:[em.collectionRate,"%"]})]})]}),(0,t.jsxs)("div",{className:"mb-6 space-y-3",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(o,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"}),(0,t.jsx)("input",{type:"text",value:P,onChange:e=>M(e.target.value),placeholder:"Search student...",className:"w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-white/15 transition-all placeholder:text-[var(--text-muted)]"})]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)("button",{onClick:()=>D(!F),className:`flex-1 px-4 py-2.5 text-sm rounded-lg border transition-all duration-200 font-medium tracking-wide flex items-center justify-center gap-2 ${F?"bg-amber-600/20 border-amber-500/50 text-amber-400":"bg-white/5 border-white/5 text-[var(--text-secondary)] hover:bg-white/10"}`,children:[(0,t.jsx)(c,{className:"w-3 h-3"}),F?"Pending View":"All Students"]}),(0,t.jsx)("button",{onClick:()=>{J({...U,joinMonth:eo}),B(!0)},className:"flex-1 px-4 py-2.5 text-sm rounded-lg border border-green-600/30 bg-green-600/10 text-green-400 hover:bg-green-600 hover:text-white transition-all duration-200 font-medium tracking-wide flex items-center justify-center gap-2",children:(0,t.jsx)("span",{children:"+ Add Student"})})]})]}),j&&(0,t.jsxs)("div",{className:"text-center py-16",children:[(0,t.jsx)("div",{className:"spinner mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-sm",children:"Loading students..."})]}),C&&(0,t.jsxs)("div",{className:"text-center py-16",children:[(0,t.jsx)("p",{className:"text-red-400 mb-4 text-sm",children:C}),(0,t.jsx)("button",{onClick:()=>ex(!0),className:"btn-primary text-sm",children:"Retry"})]}),!j&&!C&&(0,t.jsx)("div",{className:"space-y-2",children:0===eN.length?(0,t.jsx)("p",{className:"text-center text-[var(--text-muted)] py-16 text-sm",children:"No students found"}):eN.map((e,a)=>{let s="Break"===e.monthStatus,r="Discontinued"===e.monthStatus,i=s||r;return(0,t.jsx)("div",{className:`glass-card p-4 transition-all duration-200 animate-slide-up hover:border-white/10 group ${r?"opacity-40 grayscale":s?"opacity-60":""}`,style:{animationDelay:`${Math.min(30*a,300)}ms`,animationFillMode:"backwards"},children:(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-1",children:[(0,t.jsx)("h3",{className:"font-[family-name:var(--font-space)] text-base tracking-wide text-white group-hover:text-amber-400 transition-colors truncate",children:e.name}),s&&(0,t.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded border border-yellow-500/50 text-yellow-500 uppercase tracking-wider",children:"Break"}),r&&(0,t.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded border border-red-500/50 text-red-500 uppercase tracking-wider",children:"Left"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[var(--text-muted)] text-xs",children:[(0,t.jsx)("span",{className:"font-mono opacity-70",children:e.id}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(l,{className:"w-3 h-3"})," ₹",e.fee]})]}),(e.creditApplied||0)>0&&(0,t.jsxs)("div",{className:"mt-2 inline-flex items-center gap-1.5 text-[10px] bg-purple-500/10 text-purple-300 px-2 py-1 rounded-md border border-purple-500/20",children:[(0,t.jsx)(n.Gift,{className:"w-3 h-3"}),(0,t.jsxs)("span",{children:["Credit Applied: ₹",e.creditApplied]})]}),("Pending"===e.admissionStatus||"Pending"===e.dressStatus)&&(0,t.jsxs)("div",{className:"mt-2 flex gap-2 flex-wrap",children:["Pending"===e.admissionStatus&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 text-[10px] bg-blue-500/10 text-blue-300 px-2 py-1 rounded-md border border-blue-500/20",children:[(0,t.jsx)(h.Ticket,{className:"w-3 h-3"}),(0,t.jsx)("span",{children:"Adm Due"})]}),"Pending"===e.dressStatus&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 text-[10px] bg-pink-500/10 text-pink-300 px-2 py-1 rounded-md border border-pink-500/20",children:[(0,t.jsx)(u.Shirt,{className:"w-3 h-3"}),(0,t.jsx)("span",{children:"Dress Due"})]})]})]}),(0,t.jsx)("div",{className:"flex-shrink-0",children:"Paid"===e.monthStatus?(0,t.jsx)("button",{onClick:()=>V(e),className:"w-9 h-9 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-400 transition-all shadow-md shadow-green-900/40",title:"View Receipt",children:(0,t.jsx)("svg",{className:"w-4 h-4 text-white",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:(0,t.jsx)("polyline",{points:"20 6 9 17 4 12"})})}):i?(0,t.jsx)("div",{className:"w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[var(--text-muted)]",children:(0,t.jsx)(p,{className:"w-4 h-4"})}):(0,t.jsx)("button",{onClick:()=>ep(e),onMouseDown:()=>eu(e),onMouseUp:ef,onMouseLeave:ef,onTouchStart:()=>eu(e),onTouchEnd:ef,disabled:R===e.id||ei===e.id,className:`w-9 h-9 rounded-full flex items-center justify-center transition-all select-none ${R===e.id||ei===e.id?"bg-white/5 text-[var(--text-muted)]":"bg-white text-black hover:bg-gray-200 shadow-[0_0_12px_rgba(255,255,255,0.15)]"}`,title:"Mark Paid",children:R===e.id||ei===e.id?(0,t.jsx)("div",{className:"spinner !w-4 !h-4"}):(0,t.jsx)(l,{className:"w-4 h-4"})})})]})},e.id)})})]}),T&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center",children:"CONFIRM PAYMENT"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-4",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:T.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:T.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Original Fee"}),(0,t.jsxs)("p",{className:"text-xl font-bold text-white",children:["₹",T.fee]})]}),L?(0,t.jsx)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-sm",children:"Checking for credits..."})}):z&&z.credits.length>0?(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-purple-400 text-sm",children:[(0,t.jsx)(n.Gift,{className:"w-3 h-3"})," Referral Credit Available"]}),(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:!!K,onChange:e=>W(e.target.checked?z.credits[0].id:null),className:"w-4 h-4 accent-purple-600 rounded"}),(0,t.jsx)("span",{className:"text-sm text-[var(--text-secondary)]",children:"Apply"})]})]}),(0,t.jsxs)("p",{className:"text-purple-400 font-bold",children:["-₹",z.totalAvailable]}),z.credits[0].reason&&(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mt-1",children:z.credits[0].reason})]}):null,(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Amount to Collect"}),(0,t.jsxs)("p",{className:"text-2xl font-bold text-green-400",children:["₹",K&&z?Math.max(0,T.fee-z.totalAvailable):T.fee]})]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[k[eo]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-4",children:K&&z?`Collect ₹${Math.max(0,T.fee-z.totalAvailable)} (₹${z.totalAvailable} credit applied)`:`Collect ₹${T.fee}?`}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>{I(null),W(null),E(null)},className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:eh,className:"flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors",children:"✓ CONFIRM"})]})]})})}),O&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-6 text-center",children:"ADD NEW STUDENT"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"SKF ID *"}),(0,t.jsx)("input",{type:"text",value:U.skfId,onChange:e=>J({...U,skfId:e.target.value.toUpperCase()}),placeholder:"e.g., HERO-001 or MP-001",className:"input-field font-mono"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Student Name *"}),(0,t.jsx)("input",{type:"text",value:U.name,onChange:e=>J({...U,name:e.target.value}),placeholder:"Enter full name",className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Monthly Fee (₹)"}),(0,t.jsx)("input",{type:"number",value:U.fee,onChange:e=>J({...U,fee:parseInt(e.target.value)||500}),className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Phone Number"}),(0,t.jsx)("input",{type:"tel",value:U.phone,onChange:e=>J({...U,phone:e.target.value}),placeholder:"Optional",className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Joining Month *"}),(0,t.jsx)("select",{value:U.joinMonth,onChange:e=>J({...U,joinMonth:parseInt(e.target.value)}),className:"input-field",children:k.map((e,a)=>(0,t.jsxs)("option",{value:a,children:[e," 2026"]},a))}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mt-2",children:"Fees will only be calculated from this month onwards"})]}),(0,t.jsxs)("div",{className:"flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5",children:[(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Admission Fee"}),(0,t.jsx)("input",{type:"number",value:U.admissionFee,onChange:e=>J({...U,admissionFee:parseInt(e.target.value)||0}),className:"input-field"})]}),(0,t.jsx)("div",{className:"flex items-end mb-2",children:(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer bg-black/40 px-3 py-2 rounded-md border border-white/10 hover:bg-black/60 transition-colors",children:[(0,t.jsx)("input",{type:"checkbox",checked:U.admissionPaid,onChange:e=>J({...U,admissionPaid:e.target.checked}),className:"w-4 h-4 accent-green-500 rounded cursor-pointer"}),(0,t.jsx)("span",{className:"text-sm",children:"Paid Now?"})]})})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-3 p-3 bg-white/5 rounded-lg border border-white/5",children:[(0,t.jsxs)("div",{className:"flex gap-4",children:[(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Dress Fee"}),(0,t.jsx)("input",{type:"number",value:U.dressFee,onChange:e=>J({...U,dressFee:parseInt(e.target.value)||0}),className:"input-field"})]}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium text-amber-500",children:"Dress Cost"}),(0,t.jsx)("input",{type:"number",value:U.dressCost,onChange:e=>J({...U,dressCost:parseInt(e.target.value)||0}),className:"input-field !border-amber-500/30 focus:!border-amber-500/60",placeholder:"Cost"})]})]}),(0,t.jsx)("div",{className:"flex justify-end",children:(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer bg-black/40 px-3 py-2 rounded-md border border-white/10 hover:bg-black/60 transition-colors",children:[(0,t.jsx)("input",{type:"checkbox",checked:U.dressPaid,onChange:e=>J({...U,dressPaid:e.target.checked}),className:"w-4 h-4 accent-green-500 rounded cursor-pointer"}),(0,t.jsx)("span",{className:"text-sm",children:"Paid Now?"})]})})]})]}),(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[(0,t.jsx)("button",{onClick:()=>B(!1),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ej,disabled:G||!U.name.trim(),className:"flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors disabled:opacity-50",children:G?"...":"+ ADD"})]})]})})}),Z&&Y&&(0,t.jsx)("div",{className:"glass-modal-overlay",onClick:()=>ee(!1),children:(0,t.jsxs)("div",{className:"glass-modal !max-w-xs",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider p-4 border-b border-[var(--border)]",children:Y.name}),(0,t.jsxs)("button",{onClick:()=>{ee(!1),ea(Y)},className:"w-full text-left px-4 py-4 text-amber-400 hover:bg-white/5 transition-colors flex items-center gap-3",children:[(0,t.jsx)("span",{className:"text-xl",children:"⏸"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"MARK AS BREAK"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs",children:"Student on leave this month"})]})]}),"Pending"===Y.admissionStatus&&(0,t.jsxs)("button",{onClick:()=>{ee(!1),el({student:Y,type:"Admission"})},className:"w-full text-left px-4 py-4 text-blue-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]",children:[(0,t.jsx)(h.Ticket,{className:"w-5 h-5"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"MARK ADMISSION PAID"}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-xs",children:["Collect ₹",Y.admissionFee||0]})]})]}),"Pending"===Y.dressStatus&&(0,t.jsxs)("button",{onClick:()=>{ee(!1),el({student:Y,type:"Dress"})},className:"w-full text-left px-4 py-4 text-pink-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]",children:[(0,t.jsx)(u.Shirt,{className:"w-5 h-5"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"MARK DRESS PAID"}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-xs",children:["Collect ₹",Y.dressFee||0]})]})]}),(0,t.jsxs)("button",{onClick:()=>{ee(!1),en(Y)},className:"w-full text-left px-4 py-4 text-gray-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]",children:[(0,t.jsx)("span",{className:"text-xl",children:"⛔"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"DISCONTINUED"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs",children:"Student left permanently"})]})]})]})}),et&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center text-amber-400",children:"MARK AS BREAK"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:et.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:et.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[k[eo]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-6",children:"This student will not be counted in pending fees for this month."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>ea(null),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:eg,className:"flex-1 py-3 bg-amber-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-amber-500 transition-colors",children:"⏸ CONFIRM"})]})]})})}),es&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center text-gray-400",children:"MARK AS DISCONTINUED"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:es.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:es.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"From Month"}),(0,t.jsxs)("p",{className:"text-white",children:[k[eo]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-6",children:"This student will be marked as discontinued and moved to the bottom of the list."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>en(null),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:eb,className:"flex-1 py-3 bg-gray-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-gray-500 transition-colors",children:"⛔ CONFIRM"})]})]})})}),H&&(0,t.jsx)(y,{student:H,month:eo,branch:e,onClose:()=>{V(null)}}),er&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsxs)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center",children:["CONFIRM ",er.type.toUpperCase()," FEE"]}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:er.student.name}),(0,t.jsxs)("div",{className:"mt-4 pt-4 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Amount to Collect"}),(0,t.jsxs)("p",{className:"text-2xl font-bold text-green-400",children:["₹","Admission"===er.type?er.student.admissionFee:er.student.dressFee]})]})]}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>el(null),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ev,className:"flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors",children:"✓ CONFIRM PAID"})]})]})})})]})}e.s(["default",()=>S],87073)}]);