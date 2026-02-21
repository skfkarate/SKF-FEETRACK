(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,87073,e=>{"use strict";var t=e.i(43476),s=e.i(71645),a=e.i(18566),n=e.i(30699),r=e.i(75254);let l=(0,r.default)("indian-rupee",[["path",{d:"M6 3h12",key:"ggurg9"}],["path",{d:"M6 8h12",key:"6g4wlu"}],["path",{d:"m6 13 8.5 8",key:"u1kupk"}],["path",{d:"M6 13h3",key:"wdp6ag"}],["path",{d:"M9 13c6.667 0 6.667-10 0-10",key:"1nkvk2"}]]),i=(0,r.default)("target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]),d=(0,r.default)("trending-down",[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]]),o=(0,r.default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]),c=(0,r.default)("funnel",[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]]);var x=e.i(95468),m=e.i(3116);let p=(0,r.default)("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);var h=e.i(8402),u=e.i(90519),f=e.i(43432),g=e.i(94983),b=e.i(37727),v=e.i(9165),j=e.i(932),N=e.i(57688);let y="https://skfkarate.github.io/SKF-FEETRACK",w=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function k(e){let a,n,r,l,i,d,o,c,x,m,p,h,u,f,g,b,v,k,S,C,A,P,M,F,D,R,T,_,I,z,E,$,L,O,W,B,K,U,J,G,q,H,V,Y,X,Q,Z,ee,et,es,ea,en,er,el,ei,ed=(0,j.c)(101),{student:eo,month:ec,branch:ex,onClose:em}=e,ep=(0,s.useRef)(null);ed[0]!==ex?(a="MPSC"===ex?"MP Sports Club":ex?.toUpperCase(),ed[0]=ex,ed[1]=a):a=ed[1];let eh=a;ed[2]===Symbol.for("react.memo_cache_sentinel")?(n=Math.floor(1e4*Math.random()).toString().padStart(4,"0"),ed[2]=n):n=ed[2];let eu=n;ed[3]!==ex?(r=ex.substring(0,1).toUpperCase(),ed[3]=ex,ed[4]=r):r=ed[4];let ef=`SKF-${r}-${eu}`;ed[5]===Symbol.for("react.memo_cache_sentinel")?(l=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}),ed[5]=l):l=ed[5],ed[6]!==ec?(i=new Date(2026,ec,1).toLocaleDateString("en-IN",{month:"long"}),ed[6]=ec,ed[7]=i):i=ed[7];let eg=`${i} Monthly Training Fee`;ed[8]!==eo.fee?(d=eo.fee.toLocaleString(),ed[8]=eo.fee,ed[9]=d):d=ed[9];let eb=`Rupees ${d} Only`;ed[10]!==ef||ed[11]!==eg||ed[12]!==eb?(o={receiptNo:ef,date:l,purpose:eg,amountWords:eb},ed[10]=ef,ed[11]=eg,ed[12]=eb,ed[13]=o):o=ed[13];let{receiptNo:ev,date:ej,purpose:eN,amountWords:ey}=o;ed[14]!==ey||ed[15]!==eh||ed[16]!==ej||ed[17]!==ec||ed[18]!==eN||ed[19]!==ev||ed[20]!==eo.fee||ed[21]!==eo.id||ed[22]!==eo.name||ed[23]!==eo.parentName?(c=()=>{let e=window.open("","_blank","width=600,height=800");if(!e)return void alert("Please allow popups to download the receipt.");let t=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${eo.id}_${w[ec]}2026_Fee</title>
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
      <img src="${y}/logo.png" alt="SKF" class="logo">
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
        <span class="value">${eN}</span>
      </div>
      
      <div class="amount-box">
        <div class="amount">₹ ${eo.fee.toLocaleString()}</div>
        <div class="words">${ey}</div>
      </div>
      
      <div class="status">✔ Payment Received with Thanks</div>
      
      <div class="stamp">
        <img src="${y}/stamp.png" alt="PAID">
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
    `;e.document.write(t),e.document.close()},ed[14]=ey,ed[15]=eh,ed[16]=ej,ed[17]=ec,ed[18]=eN,ed[19]=ev,ed[20]=eo.fee,ed[21]=eo.id,ed[22]=eo.name,ed[23]=eo.parentName,ed[24]=c):c=ed[24];let ew=c;ed[25]===Symbol.for("react.memo_cache_sentinel")?(x={zIndex:100},ed[25]=x):x=ed[25],ed[26]===Symbol.for("react.memo_cache_sentinel")?(m={backgroundColor:"#ffffff",color:"#1a1f2e",borderRadius:"12px",overflow:"hidden",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},p=(0,t.jsxs)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"24px",textAlign:"center"},children:[(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginBottom:"12px"},children:(0,t.jsx)(N.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/logo.png",alt:"SKF",width:70,height:70,className:"rounded-full object-contain border border-[#d4af37]/50 bg-white/5"})}),(0,t.jsx)("h1",{style:{color:"#ffffff",fontSize:"28px",fontWeight:900,letterSpacing:"0.2em",margin:0},children:"SKF"}),(0,t.jsx)("p",{style:{color:"#d4af37",fontSize:"11px",fontWeight:600,letterSpacing:"0.1em",marginTop:"4px"},children:"Sports Karate-do Fitness & Self Defence Association ®"})]}),h={padding:"24px",borderBottom:"1px solid #e5e7eb"},u=(0,t.jsxs)("div",{style:{textAlign:"center",marginBottom:"16px"},children:[(0,t.jsx)("h2",{style:{color:"#1a1f2e",fontSize:"18px",fontWeight:900,margin:0},children:"Monthly Fee Receipt"}),(0,t.jsx)("p",{style:{color:"#6b7280",fontSize:"11px",marginTop:"4px"},children:"Payment confirmation"})]}),f={width:"100%",borderCollapse:"collapse"},g=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Branch"}),b={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},ed[26]=m,ed[27]=p,ed[28]=h,ed[29]=u,ed[30]=f,ed[31]=g,ed[32]=b):(m=ed[26],p=ed[27],h=ed[28],u=ed[29],f=ed[30],g=ed[31],b=ed[32]),ed[33]!==eh?(v=(0,t.jsxs)("tr",{children:[g,(0,t.jsx)("td",{style:b,children:eh})]}),ed[33]=eh,ed[34]=v):v=ed[34],ed[35]===Symbol.for("react.memo_cache_sentinel")?(k=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Receipt No"}),S={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},ed[35]=k,ed[36]=S):(k=ed[35],S=ed[36]),ed[37]!==ev?(C=(0,t.jsxs)("tr",{children:[k,(0,t.jsx)("td",{style:S,children:ev})]}),ed[37]=ev,ed[38]=C):C=ed[38],ed[39]===Symbol.for("react.memo_cache_sentinel")?(A=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Date"}),P={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},ed[39]=A,ed[40]=P):(A=ed[39],P=ed[40]),ed[41]!==ej?(M=(0,t.jsxs)("tr",{children:[A,(0,t.jsx)("td",{style:P,children:ej})]}),ed[41]=ej,ed[42]=M):M=ed[42],ed[43]!==v||ed[44]!==C||ed[45]!==M?(F=(0,t.jsxs)("div",{style:h,children:[u,(0,t.jsx)("table",{style:f,children:(0,t.jsxs)("tbody",{children:[v,C,M]})})]}),ed[43]=v,ed[44]=C,ed[45]=M,ed[46]=F):F=ed[46],ed[47]===Symbol.for("react.memo_cache_sentinel")?(D={padding:"24px",position:"relative"},R={width:"100%",borderCollapse:"collapse"},T=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Parent / Guardian"}),_={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},ed[47]=D,ed[48]=R,ed[49]=T,ed[50]=_):(D=ed[47],R=ed[48],T=ed[49],_=ed[50]);let ek=eo.parentName||"N/A";return ed[51]!==ek?(I=(0,t.jsxs)("tr",{children:[T,(0,t.jsx)("td",{style:_,children:ek})]}),ed[51]=ek,ed[52]=I):I=ed[52],ed[53]===Symbol.for("react.memo_cache_sentinel")?(z=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"top"},children:"Student Name"}),E={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"top"},ed[53]=z,ed[54]=E):(z=ed[53],E=ed[54]),ed[55]===Symbol.for("react.memo_cache_sentinel")?($=(0,t.jsx)("br",{}),L={backgroundColor:"#b8860b",color:"#ffffff",fontSize:"10px",padding:"2px 8px",borderRadius:"4px",fontWeight:700,display:"inline-block",marginTop:"4px"},ed[55]=$,ed[56]=L):($=ed[55],L=ed[56]),ed[57]!==eo.id?(O=(0,t.jsx)("span",{style:L,children:eo.id}),ed[57]=eo.id,ed[58]=O):O=ed[58],ed[59]!==eo.name||ed[60]!==O?(W=(0,t.jsxs)("tr",{children:[z,(0,t.jsxs)("td",{style:E,children:[eo.name,$,O]})]}),ed[59]=eo.name,ed[60]=O,ed[61]=W):W=ed[61],ed[62]===Symbol.for("react.memo_cache_sentinel")?(B=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Purpose"}),K={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},ed[62]=B,ed[63]=K):(B=ed[62],K=ed[63]),ed[64]!==eN?(U=(0,t.jsxs)("tr",{children:[B,(0,t.jsx)("td",{style:K,children:eN})]}),ed[64]=eN,ed[65]=U):U=ed[65],ed[66]!==I||ed[67]!==W||ed[68]!==U?(J=(0,t.jsx)("table",{style:R,children:(0,t.jsxs)("tbody",{children:[I,W,U]})}),ed[66]=I,ed[67]=W,ed[68]=U,ed[69]=J):J=ed[69],ed[70]===Symbol.for("react.memo_cache_sentinel")?(G={marginTop:"24px",padding:"16px",borderRadius:"12px",border:"2px solid #d4af37",background:"linear-gradient(135deg, #fafbfc, #f3f4f6)",textAlign:"center"},q={fontSize:"28px",fontWeight:900,color:"#1a1f2e"},ed[70]=G,ed[71]=q):(G=ed[70],q=ed[71]),ed[72]!==eo.fee?(H=eo.fee.toLocaleString(),ed[72]=eo.fee,ed[73]=H):H=ed[73],ed[74]!==H?(V=(0,t.jsxs)("div",{style:q,children:["₹ ",H]}),ed[74]=H,ed[75]=V):V=ed[75],ed[76]===Symbol.for("react.memo_cache_sentinel")?(Y={fontSize:"11px",fontStyle:"italic",color:"#6b7280",marginTop:"4px"},ed[76]=Y):Y=ed[76],ed[77]!==ey?(X=(0,t.jsx)("div",{style:Y,children:ey}),ed[77]=ey,ed[78]=X):X=ed[78],ed[79]!==V||ed[80]!==X?(Q=(0,t.jsxs)("div",{style:G,children:[V,X]}),ed[79]=V,ed[80]=X,ed[81]=Q):Q=ed[81],ed[82]===Symbol.for("react.memo_cache_sentinel")?(Z=(0,t.jsx)("div",{style:{marginTop:"16px",textAlign:"center",fontWeight:700,fontSize:"13px",color:"#16a34a"},children:"✔ Payment Received with Thanks"}),ee=(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"8px",opacity:.9},children:(0,t.jsx)(N.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/stamp.png",alt:"PAID",width:96,height:96,className:"object-contain -rotate-12"})}),ed[82]=Z,ed[83]=ee):(Z=ed[82],ee=ed[83]),ed[84]!==J||ed[85]!==Q?(et=(0,t.jsxs)("div",{style:D,children:[J,Q,Z,ee]}),ed[84]=J,ed[85]=Q,ed[86]=et):et=ed[86],ed[87]===Symbol.for("react.memo_cache_sentinel")?(es=(0,t.jsx)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"12px",textAlign:"center"},children:(0,t.jsx)("p",{style:{color:"#d1d5db",fontSize:"10px",margin:0},children:"This receipt is issued for confirmation and record purposes only."})}),ed[87]=es):es=ed[87],ed[88]!==F||ed[89]!==et?(ea=(0,t.jsxs)("div",{ref:ep,style:m,children:[p,F,et,es]}),ed[88]=F,ed[89]=et,ed[90]=ea):ea=ed[90],ed[91]!==em?(en=(0,t.jsx)("button",{onClick:em,className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider",children:"CLOSE"}),ed[91]=em,ed[92]=en):en=ed[92],ed[93]!==ew?(er=(0,t.jsx)("button",{onClick:ew,className:"btn-primary flex-1 font-[family-name:var(--font-space)] tracking-wider flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 border-none text-white",children:"⬇ DOWNLOAD"}),ed[93]=ew,ed[94]=er):er=ed[94],ed[95]!==en||ed[96]!==er?(el=(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[en,er]}),ed[95]=en,ed[96]=er,ed[97]=el):el=ed[97],ed[98]!==ea||ed[99]!==el?(ei=(0,t.jsx)("div",{className:"glass-modal-overlay",style:x,children:(0,t.jsxs)("div",{className:"w-full max-w-[520px] max-h-[90vh] overflow-y-auto px-4 custom-scrollbar",children:[ea,el]})}),ed[98]=ea,ed[99]=el,ed[100]=ei):ei=ed[100],ei}var S=e.i(21319),C=e.i(71664);let A=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function P({branch:e}){let r=(0,a.useRouter)(),j=(0,a.useSearchParams)(),[N,y]=(0,s.useState)([]),[w,P]=(0,s.useState)(!0),[M,F]=(0,s.useState)(""),[D,R]=(0,s.useState)(""),[T,_]=(0,s.useState)(!1),[I,z]=(0,s.useState)(null),[E,$]=(0,s.useState)(null),[L,O]=(0,s.useState)(null),[W,B]=(0,s.useState)(!1),[K,U]=(0,s.useState)(null),[J,G]=(0,s.useState)(!1),[q,H]=(0,s.useState)({skfId:"",name:"",fee:500,phone:"",joinMonth:0,admissionFee:1e3,admissionPaid:!0,dressFee:1500,dressCost:1e3,dressPaid:!0}),[V,Y]=(0,s.useState)(!1),[X,Q]=(0,s.useState)(null),[Z,ee]=(0,s.useState)(null),et=(0,s.useRef)(null),es=(0,s.useRef)(!1),[ea,en]=(0,s.useState)(!1),[er,el]=(0,s.useState)(null),[ei,ed]=(0,s.useState)(null),[eo,ec]=(0,s.useState)(null),[ex,em]=(0,s.useState)(null),[ep,eh]=(0,s.useState)(null),eu=parseInt(j.get("month")||new Date().getMonth().toString()),ef=(0,s.useRef)(eu);(0,s.useEffect)(()=>{let e=localStorage.getItem("skf_user"),t=localStorage.getItem("skf_login_time");(!e||!t||Date.now()-parseInt(t)>18e5)&&r.push("/")},[r]);let eg=(0,s.useCallback)(async(t=!1)=>{if(e){P(!0),F("");try{let s=await (0,v.getStudents)(e,eu,t);y(s)}catch(e){F(e instanceof Error?e.message:"Failed to load students")}finally{P(!1)}}},[e,eu]);(0,s.useEffect)(()=>{let e=ef.current!==eu;ef.current=eu,eg(e)},[eg,eu]);let eb=(0,s.useMemo)(()=>{let e=N.filter(e=>"Active"===e.status),t=e.filter(e=>"Paid"===e.monthStatus),s=e.filter(e=>"Pending"===e.monthStatus),a=e.filter(e=>"Break"===e.monthStatus),n=e.filter(e=>"Discontinued"===e.monthStatus);return{totalStudents:e.length,paidCount:t.length,pendingCount:s.length,onBreakCount:a.length,discontinuedCount:n.length,expectedAmount:s.reduce((e,t)=>e+(t.fee||0),0)+t.reduce((e,t)=>e+(t.fee||0),0),collectedAmount:t.reduce((e,t)=>e+(t.fee||0),0),pendingAmount:s.reduce((e,t)=>e+(t.fee||0),0),collectionRate:s.length+t.length>0?Math.round(t.length/(s.length+t.length)*100):0}},[N]),ev=async(t,s)=>{t.stopPropagation(),$(s),O(null),U(null),B(!0);try{let t=await (0,v.getStudentAvailableCredits)(s.id,e);O(t),t.credits.length>0&&U(t.credits[0].id)}catch{}finally{B(!1)}},ej=async()=>{if(E){z(E.id),$(null);try{K?await (0,v.markPaidWithCredit)(E.id,e,eu,K):await (0,v.markPaid)(E.id,e,eu),y(e=>e.map(e=>e.id===E.id?{...e,paid:!0,monthStatus:"Paid"}:e)),Q(E)}catch(e){alert(e instanceof Error?e.message:"Failed to mark as paid")}finally{z(null),U(null),O(null)}}},eN=e=>{es.current=!1,et.current=setTimeout(()=>{es.current=!0,ee(e),en(!0)},600)},ey=()=>{et.current&&(clearTimeout(et.current),et.current=null),setTimeout(()=>{es.current=!1},100)},ew=async()=>{if(er){em(er.id),el(null);try{await (0,v.markBreak)(er.id,e,eu),y(e=>e.map(e=>e.id===er.id?{...e,paid:!1,monthStatus:"Break"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as break")}finally{em(null)}}},ek=async()=>{if(ei){em(ei.id),ed(null);try{await (0,v.markDiscontinued)(ei.id,e,eu),y(e=>e.map(e=>e.id===ei.id?{...e,paid:!1,monthStatus:"Discontinued"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as discontinued")}finally{em(null)}}},eS=async()=>{if(!eo)return;em(eo.student.id);let{student:t,type:s}=eo;ec(null);try{await (0,v.markNonRecurringFeePaid)(t.id,e,s),y(e=>e.map(e=>{if(e.id===t.id){if("Admission"===s)return{...e,admissionStatus:"Paid"};if("Dress"===s)return{...e,dressStatus:"Paid"}}return e}))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as paid")}finally{em(null)}},eC=async()=>{if(!q.skfId.trim())return void alert("Please enter SKF ID");if(!q.name.trim())return void alert("Please enter student name");Y(!0);try{await (0,v.addStudent)(e,q.skfId,q.name,q.fee,q.phone,q.joinMonth,q.admissionFee,q.admissionPaid,q.dressFee,q.dressCost,q.dressPaid),G(!1),H({skfId:"",name:"",fee:500,phone:"",joinMonth:eu,admissionFee:1e3,admissionPaid:!0,dressFee:1500,dressCost:1e3,dressPaid:!0}),eg()}catch(e){alert(e instanceof Error?e.message:"Failed to add student")}finally{Y(!1)}},eA=N.filter(e=>{let t=e.name.toLowerCase().includes(D.toLowerCase())||e.id.toLowerCase().includes(D.toLowerCase()),s=!T||"Pending"===e.monthStatus,a="Active"===e.status;return t&&s&&a}),eP=(0,s.useMemo)(()=>{let e={Pending:0,Paid:1,Break:2,Discontinued:3,"N/A":4};return[...eA].sort((t,s)=>{let a=t.id.localeCompare(s.id,void 0,{numeric:!0,sensitivity:"base"});return 0!==a?a:(e[t.monthStatus]??4)-(e[s.monthStatus]??4)})},[eA]),eM="MPSC"===e?"MP SPORTS CLUB":e?.toUpperCase();return(0,t.jsxs)("div",{className:"min-h-screen",style:{background:"var(--bg-deep)"},children:[(0,t.jsx)(C.default,{title:eM,showBack:!0,rightContent:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("div",{className:"hidden sm:flex flex-col items-end mr-2",children:[(0,t.jsxs)("span",{className:"text-[10px] text-[var(--text-muted)] uppercase tracking-wider",children:[A[eu]," 2026"]}),(0,t.jsxs)("span",{className:"text-green-400 font-bold text-xs font-[family-name:var(--font-space)]",children:[eb.paidCount,"/",eb.totalStudents," Paid"]})]}),(0,t.jsx)(S.default,{selectedMonth:eu,onMonthChange:t=>{let s=new URLSearchParams(j.toString());s.set("month",t.toString()),r.push(`/students/${e}?${s.toString()}`)},className:"scale-90 origin-right"})]})}),(0,t.jsxs)("main",{className:"max-w-2xl mx-auto p-4 pt-24",children:[!w&&!M&&(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-fade-in",children:[(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(59, 130, 246, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(i,{className:"w-12 h-12 text-blue-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(i,{className:"w-3 h-3"})," Expected"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-blue-400",children:["₹",eb.expectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(34, 197, 94, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(x.CheckCircle2,{className:"w-12 h-12 text-green-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(x.CheckCircle2,{className:"w-3 h-3"})," Collected"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-green-400",children:["₹",eb.collectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(245, 158, 11, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(m.Clock,{className:"w-12 h-12 text-amber-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(m.Clock,{className:"w-3 h-3"})," Pending"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-amber-400",children:["₹",eb.pendingAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(d,{className:"w-12 h-12 text-white"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(d,{className:"w-3 h-3"})," Efficiency"]}),(0,t.jsxs)("p",{className:`font-[family-name:var(--font-space)] text-lg sm:text-xl ${eb.collectionRate>=80?"text-green-400":eb.collectionRate>=50?"text-yellow-400":"text-red-400"}`,children:[eb.collectionRate,"%"]})]})]}),(0,t.jsxs)("div",{className:"mb-6 space-y-3",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(o,{className:"absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"}),(0,t.jsx)("input",{type:"text",value:D,onChange:e=>R(e.target.value),placeholder:"Search student...",className:"w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-white/15 transition-all placeholder:text-[var(--text-muted)]"})]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)("button",{onClick:()=>_(!T),className:`flex-1 px-4 py-2.5 text-sm rounded-lg border transition-all duration-200 font-medium tracking-wide flex items-center justify-center gap-2 ${T?"bg-amber-600/20 border-amber-500/50 text-amber-400":"bg-white/5 border-white/5 text-[var(--text-secondary)] hover:bg-white/10"}`,children:[(0,t.jsx)(c,{className:"w-3 h-3"}),T?"Pending View":"All Students"]}),(0,t.jsx)("button",{onClick:()=>{H({...q,joinMonth:eu}),G(!0)},className:"flex-1 px-4 py-2.5 text-sm rounded-lg border border-green-600/30 bg-green-600/10 text-green-400 hover:bg-green-600 hover:text-white transition-all duration-200 font-medium tracking-wide flex items-center justify-center gap-2",children:(0,t.jsx)("span",{children:"+ Add Student"})})]})]}),w&&(0,t.jsxs)("div",{className:"text-center py-16",children:[(0,t.jsx)("div",{className:"spinner mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-sm",children:"Loading students..."})]}),M&&(0,t.jsxs)("div",{className:"text-center py-16",children:[(0,t.jsx)("p",{className:"text-red-400 mb-4 text-sm",children:M}),(0,t.jsx)("button",{onClick:()=>eg(!0),className:"btn-primary text-sm",children:"Retry"})]}),!w&&!M&&(0,t.jsx)("div",{className:"space-y-2",children:0===eP.length?(0,t.jsx)("p",{className:"text-center text-[var(--text-muted)] py-16 text-sm",children:"No students found"}):eP.map((e,s)=>{let a="Break"===e.monthStatus,r="Discontinued"===e.monthStatus,i=a||r;return(0,t.jsx)("div",{onClick:()=>{es.current||eh(e)},onMouseDown:()=>eN(e),onMouseUp:ey,onMouseLeave:ey,onTouchStart:()=>eN(e),onTouchEnd:ey,onTouchMove:ey,className:`glass-card p-4 transition-all duration-200 animate-slide-up hover:border-white/10 group cursor-pointer select-none ${r?"opacity-40 grayscale":a?"opacity-60":""}`,style:{animationDelay:`${Math.min(30*s,300)}ms`,animationFillMode:"backwards",WebkitTouchCallout:"none",WebkitUserSelect:"none"},children:(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-1",children:[(0,t.jsx)("h3",{className:"font-[family-name:var(--font-space)] text-base tracking-wide text-white group-hover:text-amber-400 transition-colors truncate",children:e.name}),a&&(0,t.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded border border-yellow-500/50 text-yellow-500 uppercase tracking-wider",children:"Break"}),r&&(0,t.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded border border-red-500/50 text-red-500 uppercase tracking-wider",children:"Left"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[var(--text-muted)] text-xs",children:[(0,t.jsx)("span",{className:"font-mono opacity-70",children:e.id}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(l,{className:"w-3 h-3"})," ₹",e.fee]})]}),(e.creditApplied||0)>0&&(0,t.jsxs)("div",{className:"mt-2 inline-flex items-center gap-1.5 text-[10px] bg-purple-500/10 text-purple-300 px-2 py-1 rounded-md border border-purple-500/20",children:[(0,t.jsx)(n.Gift,{className:"w-3 h-3"}),(0,t.jsxs)("span",{children:["Credit Applied: ₹",e.creditApplied]})]}),("Pending"===e.admissionStatus||"Pending"===e.dressStatus)&&(0,t.jsxs)("div",{className:"mt-2 flex gap-2 flex-wrap",children:["Pending"===e.admissionStatus&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 text-[10px] bg-blue-500/10 text-blue-300 px-2 py-1 rounded-md border border-blue-500/20",children:[(0,t.jsx)(h.Ticket,{className:"w-3 h-3"}),(0,t.jsx)("span",{children:"Adm Due"})]}),"Pending"===e.dressStatus&&(0,t.jsxs)("div",{className:"inline-flex items-center gap-1.5 text-[10px] bg-pink-500/10 text-pink-300 px-2 py-1 rounded-md border border-pink-500/20",children:[(0,t.jsx)(u.Shirt,{className:"w-3 h-3"}),(0,t.jsx)("span",{children:"Dress Due"})]})]})]}),(0,t.jsx)("div",{className:"flex-shrink-0",children:"Paid"===e.monthStatus?(0,t.jsx)("button",{onClick:t=>{t.stopPropagation(),Q(e)},className:"w-9 h-9 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-400 transition-all shadow-md shadow-green-900/40",title:"View Receipt",children:(0,t.jsx)("svg",{className:"w-4 h-4 text-white",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",children:(0,t.jsx)("polyline",{points:"20 6 9 17 4 12"})})}):i?(0,t.jsx)("div",{className:"w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[var(--text-muted)]",children:(0,t.jsx)(p,{className:"w-4 h-4"})}):(0,t.jsx)("button",{onClick:t=>ev(t,e),disabled:I===e.id||ex===e.id,className:`w-9 h-9 rounded-full flex items-center justify-center transition-all select-none ${I===e.id||ex===e.id?"bg-white/5 text-[var(--text-muted)]":"bg-white text-black hover:bg-gray-200 shadow-[0_0_12px_rgba(255,255,255,0.15)]"}`,title:"Mark Paid",children:I===e.id||ex===e.id?(0,t.jsx)("div",{className:"spinner !w-4 !h-4"}):(0,t.jsx)(l,{className:"w-4 h-4"})})})]})},e.id)})})]}),E&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center",children:"CONFIRM PAYMENT"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-4",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:E.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:E.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Original Fee"}),(0,t.jsxs)("p",{className:"text-xl font-bold text-white",children:["₹",E.fee]})]}),W?(0,t.jsx)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-sm",children:"Checking for credits..."})}):L&&L.credits.length>0?(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-purple-400 text-sm",children:[(0,t.jsx)(n.Gift,{className:"w-3 h-3"})," Referral Credit Available"]}),(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:!!K,onChange:e=>U(e.target.checked?L.credits[0].id:null),className:"w-4 h-4 accent-purple-600 rounded"}),(0,t.jsx)("span",{className:"text-sm text-[var(--text-secondary)]",children:"Apply"})]})]}),(0,t.jsxs)("p",{className:"text-purple-400 font-bold",children:["-₹",L.totalAvailable]}),L.credits[0].reason&&(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mt-1",children:L.credits[0].reason})]}):null,(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Amount to Collect"}),(0,t.jsxs)("p",{className:"text-2xl font-bold text-green-400",children:["₹",K&&L?Math.max(0,E.fee-L.totalAvailable):E.fee]})]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[A[eu]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-4",children:K&&L?`Collect ₹${Math.max(0,E.fee-L.totalAvailable)} (₹${L.totalAvailable} credit applied)`:`Collect ₹${E.fee}?`}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>{$(null),U(null),O(null)},className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ej,className:"flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors",children:"✓ CONFIRM"})]})]})})}),J&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-6 text-center",children:"ADD NEW STUDENT"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"SKF ID *"}),(0,t.jsx)("input",{type:"text",value:q.skfId,onChange:e=>H({...q,skfId:e.target.value.toUpperCase()}),placeholder:"e.g., HERO-001 or MP-001",className:"input-field font-mono"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Student Name *"}),(0,t.jsx)("input",{type:"text",value:q.name,onChange:e=>H({...q,name:e.target.value}),placeholder:"Enter full name",className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Monthly Fee (₹)"}),(0,t.jsx)("input",{type:"number",value:q.fee,onChange:e=>H({...q,fee:parseInt(e.target.value)||500}),className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Phone Number"}),(0,t.jsx)("input",{type:"tel",value:q.phone,onChange:e=>H({...q,phone:e.target.value}),placeholder:"Optional",className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Joining Month *"}),(0,t.jsx)("select",{value:q.joinMonth,onChange:e=>H({...q,joinMonth:parseInt(e.target.value)}),className:"input-field",children:A.map((e,s)=>(0,t.jsxs)("option",{value:s,children:[e," 2026"]},s))}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mt-2",children:"Fees will only be calculated from this month onwards"})]}),(0,t.jsxs)("div",{className:"flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5",children:[(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Admission Fee"}),(0,t.jsx)("input",{type:"number",value:q.admissionFee,onChange:e=>H({...q,admissionFee:parseInt(e.target.value)||0}),className:"input-field"})]}),(0,t.jsx)("div",{className:"flex items-end mb-2",children:(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer bg-black/40 px-3 py-2 rounded-md border border-white/10 hover:bg-black/60 transition-colors",children:[(0,t.jsx)("input",{type:"checkbox",checked:q.admissionPaid,onChange:e=>H({...q,admissionPaid:e.target.checked}),className:"w-4 h-4 accent-green-500 rounded cursor-pointer"}),(0,t.jsx)("span",{className:"text-sm",children:"Paid Now?"})]})})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-3 p-3 bg-white/5 rounded-lg border border-white/5",children:[(0,t.jsxs)("div",{className:"flex gap-4",children:[(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Dress Fee"}),(0,t.jsx)("input",{type:"number",value:q.dressFee,onChange:e=>H({...q,dressFee:parseInt(e.target.value)||0}),className:"input-field"})]}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium text-amber-500",children:"Dress Cost"}),(0,t.jsx)("input",{type:"number",value:q.dressCost,onChange:e=>H({...q,dressCost:parseInt(e.target.value)||0}),className:"input-field !border-amber-500/30 focus:!border-amber-500/60",placeholder:"Cost"})]})]}),(0,t.jsx)("div",{className:"flex justify-end",children:(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer bg-black/40 px-3 py-2 rounded-md border border-white/10 hover:bg-black/60 transition-colors",children:[(0,t.jsx)("input",{type:"checkbox",checked:q.dressPaid,onChange:e=>H({...q,dressPaid:e.target.checked}),className:"w-4 h-4 accent-green-500 rounded cursor-pointer"}),(0,t.jsx)("span",{className:"text-sm",children:"Paid Now?"})]})})]})]}),(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[(0,t.jsx)("button",{onClick:()=>G(!1),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:eC,disabled:V||!q.name.trim(),className:"flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors disabled:opacity-50",children:V?"...":"+ ADD"})]})]})})}),ep&&(0,t.jsx)("div",{className:"glass-modal-overlay",onClick:()=>eh(null),children:(0,t.jsxs)("div",{className:"glass-modal",onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"flex justify-between items-start mb-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider text-white",children:ep.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-sm font-mono mt-1",children:ep.id})]}),(0,t.jsx)("button",{onClick:()=>eh(null),className:"p-2 hover:bg-white/10 rounded-full transition-colors",children:(0,t.jsx)(b.X,{className:"w-5 h-5 text-[var(--text-muted)]"})})]}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex gap-3 mb-6",children:[(0,t.jsxs)("a",{href:`tel:${String(ep.phone||"")}`,className:"flex-1 py-3 bg-green-600/20 border border-green-600/50 text-green-400 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600/30 transition-colors",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)(f.Phone,{className:"w-4 h-4"})," Call"]}),(0,t.jsxs)("a",{href:`https://wa.me/${String(ep.whatsapp||ep.phone||"").replace(/\D/g,"")}`,target:"_blank",rel:"noopener noreferrer",className:"flex-1 py-3 bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] rounded-lg flex items-center justify-center gap-2 hover:bg-[#25D366]/30 transition-colors",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)(g.MessageCircle,{className:"w-4 h-4"})," WhatsApp"]})]}),(0,t.jsxs)("div",{className:"glass-surface p-4 space-y-3",children:[(0,t.jsxs)("div",{className:"flex justify-between border-b border-white/5 pb-2",children:[(0,t.jsx)("span",{className:"text-[var(--text-muted)] text-sm",children:"Parent"}),(0,t.jsx)("span",{className:"text-white text-sm font-medium",children:ep.parentName||"-"})]}),(0,t.jsxs)("div",{className:"flex justify-between border-b border-white/5 pb-2",children:[(0,t.jsx)("span",{className:"text-[var(--text-muted)] text-sm",children:"DOB"}),(0,t.jsx)("span",{className:"text-white text-sm font-medium",children:ep.dateOfBirth&&""!==ep.dateOfBirth?(()=>{try{let e=new Date(ep.dateOfBirth);return isNaN(e.getTime())?"-":e.toLocaleDateString()}catch{return"-"}})():"-"})]}),(0,t.jsxs)("div",{className:"flex justify-between border-b border-white/5 pb-2",children:[(0,t.jsx)("span",{className:"text-[var(--text-muted)] text-sm",children:"Join Month"}),(0,t.jsx)("span",{className:"text-white text-sm font-medium",children:A[ep.joinMonth]??"-"})]}),(0,t.jsxs)("div",{className:"flex justify-between border-b border-white/5 pb-2",children:[(0,t.jsx)("span",{className:"text-[var(--text-muted)] text-sm",children:"Monthly Fee"}),(0,t.jsxs)("span",{className:"text-white text-sm font-medium",children:["₹",ep.fee??0]})]}),(0,t.jsxs)("div",{className:"flex justify-between",children:[(0,t.jsx)("span",{className:"text-[var(--text-muted)] text-sm",children:"Status"}),(0,t.jsx)("span",{className:`text-sm font-medium ${"Active"===ep.status?"text-green-400":"text-red-400"}`,children:ep.status})]})]})]})]})}),ea&&Z&&(0,t.jsx)("div",{className:"glass-modal-overlay",onClick:()=>en(!1),children:(0,t.jsxs)("div",{className:"glass-modal !max-w-xs",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider p-4 border-b border-[var(--border)]",children:Z.name}),(0,t.jsxs)("button",{onClick:()=>{en(!1),el(Z)},className:"w-full text-left px-4 py-4 text-amber-400 hover:bg-white/5 transition-colors flex items-center gap-3",children:[(0,t.jsx)("span",{className:"text-xl",children:"⏸"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"MARK AS BREAK"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs",children:"Student on leave this month"})]})]}),"Pending"===Z.admissionStatus&&(0,t.jsxs)("button",{onClick:()=>{en(!1),ec({student:Z,type:"Admission"})},className:"w-full text-left px-4 py-4 text-blue-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]",children:[(0,t.jsx)(h.Ticket,{className:"w-5 h-5"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"MARK ADMISSION PAID"}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-xs",children:["Collect ₹",Z.admissionFee||0]})]})]}),"Pending"===Z.dressStatus&&(0,t.jsxs)("button",{onClick:()=>{en(!1),ec({student:Z,type:"Dress"})},className:"w-full text-left px-4 py-4 text-pink-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]",children:[(0,t.jsx)(u.Shirt,{className:"w-5 h-5"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"MARK DRESS PAID"}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-xs",children:["Collect ₹",Z.dressFee||0]})]})]}),(0,t.jsxs)("button",{onClick:()=>{en(!1),ed(Z)},className:"w-full text-left px-4 py-4 text-gray-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]",children:[(0,t.jsx)("span",{className:"text-xl",children:"⛔"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"DISCONTINUED"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs",children:"Student left permanently"})]})]})]})}),er&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center text-amber-400",children:"MARK AS BREAK"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:er.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:er.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[A[eu]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-6",children:"This student will not be counted in pending fees for this month."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>el(null),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ew,className:"flex-1 py-3 bg-amber-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-amber-500 transition-colors",children:"⏸ CONFIRM"})]})]})})}),ei&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center text-gray-400",children:"MARK AS DISCONTINUED"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:ei.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:ei.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"From Month"}),(0,t.jsxs)("p",{className:"text-white",children:[A[eu]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-6",children:"This student will be marked as discontinued and moved to the bottom of the list."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>ed(null),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ek,className:"flex-1 py-3 bg-gray-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-gray-500 transition-colors",children:"⛔ CONFIRM"})]})]})})}),X&&(0,t.jsx)(k,{student:X,month:eu,branch:e,onClose:()=>{Q(null)}}),eo&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsxs)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center",children:["CONFIRM ",eo.type.toUpperCase()," FEE"]}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:eo.student.name}),(0,t.jsxs)("div",{className:"mt-4 pt-4 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Amount to Collect"}),(0,t.jsxs)("p",{className:"text-2xl font-bold text-green-400",children:["₹","Admission"===eo.type?eo.student.admissionFee:eo.student.dressFee]})]})]}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>ec(null),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:eS,className:"flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors",children:"✓ CONFIRM PAID"})]})]})})})]})}e.s(["default",()=>P],87073)}]);