(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,87073,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(18566),n=e.i(30699),l=e.i(75254);let i=(0,l.default)("indian-rupee",[["path",{d:"M6 3h12",key:"ggurg9"}],["path",{d:"M6 8h12",key:"6g4wlu"}],["path",{d:"m6 13 8.5 8",key:"u1kupk"}],["path",{d:"M6 13h3",key:"wdp6ag"}],["path",{d:"M9 13c6.667 0 6.667-10 0-10",key:"1nkvk2"}]]),r=(0,l.default)("target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]),o=(0,l.default)("trending-down",[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]]),c=(0,l.default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]),d=(0,l.default)("funnel",[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]]);var x=e.i(95468),m=e.i(3116);let p=(0,l.default)("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);var h=e.i(9165),f=e.i(932),u=e.i(57688);let g="https://skfkarate.github.io/SKF-FEETRACK",b=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function v(e){let s,n,l,i,r,o,c,d,x,m,p,h,v,j,y,N,w,k,S,C,A,M,_,P,R,T,z,F,D,E,I,$,L,K,W,B,O,U,J,G,q,H,V,Y,Q,X,Z,ee,et,ea,es,en,el,ei,er,eo=(0,f.c)(101),{student:ec,month:ed,branch:ex,onClose:em}=e,ep=(0,a.useRef)(null);eo[0]!==ex?(s="MPSC"===ex?"MP Sports Club":ex?.toUpperCase(),eo[0]=ex,eo[1]=s):s=eo[1];let eh=s;eo[2]===Symbol.for("react.memo_cache_sentinel")?(n=Math.floor(1e4*Math.random()).toString().padStart(4,"0"),eo[2]=n):n=eo[2];let ef=n;eo[3]!==ex?(l=ex.substring(0,1).toUpperCase(),eo[3]=ex,eo[4]=l):l=eo[4];let eu=`SKF-${l}-${ef}`;eo[5]===Symbol.for("react.memo_cache_sentinel")?(i=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}),eo[5]=i):i=eo[5],eo[6]!==ed?(r=new Date(2026,ed,1).toLocaleDateString("en-IN",{month:"long"}),eo[6]=ed,eo[7]=r):r=eo[7];let eg=`${r} Monthly Training Fee`;eo[8]!==ec.fee?(o=ec.fee.toLocaleString(),eo[8]=ec.fee,eo[9]=o):o=eo[9];let eb=`Rupees ${o} Only`;eo[10]!==eu||eo[11]!==eg||eo[12]!==eb?(c={receiptNo:eu,date:i,purpose:eg,amountWords:eb},eo[10]=eu,eo[11]=eg,eo[12]=eb,eo[13]=c):c=eo[13];let{receiptNo:ev,date:ej,purpose:ey,amountWords:eN}=c;eo[14]!==eN||eo[15]!==eh||eo[16]!==ej||eo[17]!==ed||eo[18]!==ey||eo[19]!==ev||eo[20]!==ec.fee||eo[21]!==ec.id||eo[22]!==ec.name||eo[23]!==ec.parentName?(d=()=>{let e=window.open("","_blank","width=600,height=800");if(!e)return void alert("Please allow popups to download the receipt.");let t=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${ec.id}_${b[ed]}2026_Fee</title>
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
      <img src="${g}/logo.png" alt="SKF" class="logo">
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
        <span class="value">${ec.parentName||"N/A"}</span>
      </div>
      <div class="row">
        <span class="label">Student Name</span>
        <span class="value">
          ${ec.name}<br>
          <span class="id-badge">${ec.id}</span>
        </span>
      </div>
      <div class="row">
        <span class="label">Purpose</span>
        <span class="value">${ey}</span>
      </div>
      
      <div class="amount-box">
        <div class="amount">₹ ${ec.fee.toLocaleString()}</div>
        <div class="words">${eN}</div>
      </div>
      
      <div class="status">✔ Payment Received with Thanks</div>
      
      <div class="stamp">
        <img src="${g}/stamp.png" alt="PAID">
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
    `;e.document.write(t),e.document.close()},eo[14]=eN,eo[15]=eh,eo[16]=ej,eo[17]=ed,eo[18]=ey,eo[19]=ev,eo[20]=ec.fee,eo[21]=ec.id,eo[22]=ec.name,eo[23]=ec.parentName,eo[24]=d):d=eo[24];let ew=d;eo[25]===Symbol.for("react.memo_cache_sentinel")?(x={zIndex:100},eo[25]=x):x=eo[25],eo[26]===Symbol.for("react.memo_cache_sentinel")?(m={backgroundColor:"#ffffff",color:"#1a1f2e",borderRadius:"12px",overflow:"hidden",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},p=(0,t.jsxs)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"24px",textAlign:"center"},children:[(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginBottom:"12px"},children:(0,t.jsx)(u.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/logo.png",alt:"SKF",width:70,height:70,className:"rounded-full object-contain border border-[#d4af37]/50 bg-white/5"})}),(0,t.jsx)("h1",{style:{color:"#ffffff",fontSize:"28px",fontWeight:900,letterSpacing:"0.2em",margin:0},children:"SKF"}),(0,t.jsx)("p",{style:{color:"#d4af37",fontSize:"11px",fontWeight:600,letterSpacing:"0.1em",marginTop:"4px"},children:"Sports Karate-do Fitness & Self Defence Association ®"})]}),h={padding:"24px",borderBottom:"1px solid #e5e7eb"},v=(0,t.jsxs)("div",{style:{textAlign:"center",marginBottom:"16px"},children:[(0,t.jsx)("h2",{style:{color:"#1a1f2e",fontSize:"18px",fontWeight:900,margin:0},children:"Monthly Fee Receipt"}),(0,t.jsx)("p",{style:{color:"#6b7280",fontSize:"11px",marginTop:"4px"},children:"Payment confirmation"})]}),j={width:"100%",borderCollapse:"collapse"},y=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Branch"}),N={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},eo[26]=m,eo[27]=p,eo[28]=h,eo[29]=v,eo[30]=j,eo[31]=y,eo[32]=N):(m=eo[26],p=eo[27],h=eo[28],v=eo[29],j=eo[30],y=eo[31],N=eo[32]),eo[33]!==eh?(w=(0,t.jsxs)("tr",{children:[y,(0,t.jsx)("td",{style:N,children:eh})]}),eo[33]=eh,eo[34]=w):w=eo[34],eo[35]===Symbol.for("react.memo_cache_sentinel")?(k=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Receipt No"}),S={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},eo[35]=k,eo[36]=S):(k=eo[35],S=eo[36]),eo[37]!==ev?(C=(0,t.jsxs)("tr",{children:[k,(0,t.jsx)("td",{style:S,children:ev})]}),eo[37]=ev,eo[38]=C):C=eo[38],eo[39]===Symbol.for("react.memo_cache_sentinel")?(A=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Date"}),M={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},eo[39]=A,eo[40]=M):(A=eo[39],M=eo[40]),eo[41]!==ej?(_=(0,t.jsxs)("tr",{children:[A,(0,t.jsx)("td",{style:M,children:ej})]}),eo[41]=ej,eo[42]=_):_=eo[42],eo[43]!==w||eo[44]!==C||eo[45]!==_?(P=(0,t.jsxs)("div",{style:h,children:[v,(0,t.jsx)("table",{style:j,children:(0,t.jsxs)("tbody",{children:[w,C,_]})})]}),eo[43]=w,eo[44]=C,eo[45]=_,eo[46]=P):P=eo[46],eo[47]===Symbol.for("react.memo_cache_sentinel")?(R={padding:"24px",position:"relative"},T={width:"100%",borderCollapse:"collapse"},z=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Parent / Guardian"}),F={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},eo[47]=R,eo[48]=T,eo[49]=z,eo[50]=F):(R=eo[47],T=eo[48],z=eo[49],F=eo[50]);let ek=ec.parentName||"N/A";return eo[51]!==ek?(D=(0,t.jsxs)("tr",{children:[z,(0,t.jsx)("td",{style:F,children:ek})]}),eo[51]=ek,eo[52]=D):D=eo[52],eo[53]===Symbol.for("react.memo_cache_sentinel")?(E=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"top"},children:"Student Name"}),I={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"top"},eo[53]=E,eo[54]=I):(E=eo[53],I=eo[54]),eo[55]===Symbol.for("react.memo_cache_sentinel")?($=(0,t.jsx)("br",{}),L={backgroundColor:"#b8860b",color:"#ffffff",fontSize:"10px",padding:"2px 8px",borderRadius:"4px",fontWeight:700,display:"inline-block",marginTop:"4px"},eo[55]=$,eo[56]=L):($=eo[55],L=eo[56]),eo[57]!==ec.id?(K=(0,t.jsx)("span",{style:L,children:ec.id}),eo[57]=ec.id,eo[58]=K):K=eo[58],eo[59]!==ec.name||eo[60]!==K?(W=(0,t.jsxs)("tr",{children:[E,(0,t.jsxs)("td",{style:I,children:[ec.name,$,K]})]}),eo[59]=ec.name,eo[60]=K,eo[61]=W):W=eo[61],eo[62]===Symbol.for("react.memo_cache_sentinel")?(B=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Purpose"}),O={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},eo[62]=B,eo[63]=O):(B=eo[62],O=eo[63]),eo[64]!==ey?(U=(0,t.jsxs)("tr",{children:[B,(0,t.jsx)("td",{style:O,children:ey})]}),eo[64]=ey,eo[65]=U):U=eo[65],eo[66]!==D||eo[67]!==W||eo[68]!==U?(J=(0,t.jsx)("table",{style:T,children:(0,t.jsxs)("tbody",{children:[D,W,U]})}),eo[66]=D,eo[67]=W,eo[68]=U,eo[69]=J):J=eo[69],eo[70]===Symbol.for("react.memo_cache_sentinel")?(G={marginTop:"24px",padding:"16px",borderRadius:"12px",border:"2px solid #d4af37",background:"linear-gradient(135deg, #fafbfc, #f3f4f6)",textAlign:"center"},q={fontSize:"28px",fontWeight:900,color:"#1a1f2e"},eo[70]=G,eo[71]=q):(G=eo[70],q=eo[71]),eo[72]!==ec.fee?(H=ec.fee.toLocaleString(),eo[72]=ec.fee,eo[73]=H):H=eo[73],eo[74]!==H?(V=(0,t.jsxs)("div",{style:q,children:["₹ ",H]}),eo[74]=H,eo[75]=V):V=eo[75],eo[76]===Symbol.for("react.memo_cache_sentinel")?(Y={fontSize:"11px",fontStyle:"italic",color:"#6b7280",marginTop:"4px"},eo[76]=Y):Y=eo[76],eo[77]!==eN?(Q=(0,t.jsx)("div",{style:Y,children:eN}),eo[77]=eN,eo[78]=Q):Q=eo[78],eo[79]!==V||eo[80]!==Q?(X=(0,t.jsxs)("div",{style:G,children:[V,Q]}),eo[79]=V,eo[80]=Q,eo[81]=X):X=eo[81],eo[82]===Symbol.for("react.memo_cache_sentinel")?(Z=(0,t.jsx)("div",{style:{marginTop:"16px",textAlign:"center",fontWeight:700,fontSize:"13px",color:"#16a34a"},children:"✔ Payment Received with Thanks"}),ee=(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"8px",opacity:.9},children:(0,t.jsx)(u.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/stamp.png",alt:"PAID",width:96,height:96,className:"object-contain -rotate-12"})}),eo[82]=Z,eo[83]=ee):(Z=eo[82],ee=eo[83]),eo[84]!==J||eo[85]!==X?(et=(0,t.jsxs)("div",{style:R,children:[J,X,Z,ee]}),eo[84]=J,eo[85]=X,eo[86]=et):et=eo[86],eo[87]===Symbol.for("react.memo_cache_sentinel")?(ea=(0,t.jsx)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"12px",textAlign:"center"},children:(0,t.jsx)("p",{style:{color:"#d1d5db",fontSize:"10px",margin:0},children:"This receipt is issued for confirmation and record purposes only."})}),eo[87]=ea):ea=eo[87],eo[88]!==P||eo[89]!==et?(es=(0,t.jsxs)("div",{ref:ep,style:m,children:[p,P,et,ea]}),eo[88]=P,eo[89]=et,eo[90]=es):es=eo[90],eo[91]!==em?(en=(0,t.jsx)("button",{onClick:em,className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider",children:"CLOSE"}),eo[91]=em,eo[92]=en):en=eo[92],eo[93]!==ew?(el=(0,t.jsx)("button",{onClick:ew,className:"btn-primary flex-1 font-[family-name:var(--font-space)] tracking-wider flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 border-none text-white",children:"⬇ DOWNLOAD"}),eo[93]=ew,eo[94]=el):el=eo[94],eo[95]!==en||eo[96]!==el?(ei=(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[en,el]}),eo[95]=en,eo[96]=el,eo[97]=ei):ei=eo[97],eo[98]!==es||eo[99]!==ei?(er=(0,t.jsx)("div",{className:"glass-modal-overlay",style:x,children:(0,t.jsxs)("div",{className:"w-full max-w-[520px] max-h-[90vh] overflow-y-auto px-4 custom-scrollbar",children:[es,ei]})}),eo[98]=es,eo[99]=ei,eo[100]=er):er=eo[100],er}var j=e.i(21319),y=e.i(71664);let N=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function w({branch:e}){let l=(0,s.useRouter)(),f=(0,s.useSearchParams)(),[u,g]=(0,a.useState)([]),[b,w]=(0,a.useState)(!0),[k,S]=(0,a.useState)(""),[C,A]=(0,a.useState)(""),[M,_]=(0,a.useState)(!1),[P,R]=(0,a.useState)(null),[T,z]=(0,a.useState)(null),[F,D]=(0,a.useState)(null),[E,I]=(0,a.useState)(!1),[$,L]=(0,a.useState)(null),[K,W]=(0,a.useState)(!1),[B,O]=(0,a.useState)({skfId:"",name:"",fee:500,phone:"",joinMonth:0}),[U,J]=(0,a.useState)(!1),[G,q]=(0,a.useState)(null),[H,V]=(0,a.useState)(null),Y=(0,a.useRef)(null),[Q,X]=(0,a.useState)(!1),[Z,ee]=(0,a.useState)(null),[et,ea]=(0,a.useState)(null),[es,en]=(0,a.useState)(null),el=parseInt(f.get("month")||new Date().getMonth().toString()),ei=(0,a.useRef)(el);(0,a.useEffect)(()=>{let e=localStorage.getItem("skf_user"),t=localStorage.getItem("skf_login_time");(!e||!t||Date.now()-parseInt(t)>18e5)&&l.push("/")},[l]);let er=(0,a.useCallback)(async(t=!1)=>{if(e){w(!0),S("");try{let a=await (0,h.getStudents)(e,el,t);g(a)}catch(e){S(e instanceof Error?e.message:"Failed to load students")}finally{w(!1)}}},[e,el]);(0,a.useEffect)(()=>{let e=ei.current!==el;ei.current=el,er(e)},[er,el]);let eo=(0,a.useMemo)(()=>{let e=u.filter(e=>"Active"===e.status),t=e.filter(e=>"Paid"===e.monthStatus),a=e.filter(e=>"Pending"===e.monthStatus),s=e.filter(e=>"Break"===e.monthStatus),n=e.filter(e=>"Discontinued"===e.monthStatus);return{totalStudents:e.length,paidCount:t.length,pendingCount:a.length,onBreakCount:s.length,discontinuedCount:n.length,expectedAmount:a.reduce((e,t)=>e+(t.fee||0),0)+t.reduce((e,t)=>e+(t.fee||0),0),collectedAmount:t.reduce((e,t)=>e+(t.fee||0),0),pendingAmount:a.reduce((e,t)=>e+(t.fee||0),0),collectionRate:a.length+t.length>0?Math.round(t.length/(a.length+t.length)*100):0}},[u]),ec=async t=>{z(t),D(null),L(null),I(!0);try{let a=await (0,h.getStudentAvailableCredits)(t.id,e);D(a),a.credits.length>0&&L(a.credits[0].id)}catch{}finally{I(!1)}},ed=async()=>{if(T){R(T.id),z(null);try{$?await (0,h.markPaidWithCredit)(T.id,e,el,$):await (0,h.markPaid)(T.id,e,el),g(e=>e.map(e=>e.id===T.id?{...e,paid:!0,monthStatus:"Paid"}:e)),q(T)}catch(e){alert(e instanceof Error?e.message:"Failed to mark as paid")}finally{R(null),L(null),D(null)}}},ex=e=>{Y.current=setTimeout(()=>{V(e),X(!0)},3e3)},em=()=>{Y.current&&(clearTimeout(Y.current),Y.current=null)},ep=async()=>{if(Z){en(Z.id),ee(null);try{await (0,h.markBreak)(Z.id,e,el),g(e=>e.map(e=>e.id===Z.id?{...e,paid:!1,monthStatus:"Break"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as break")}finally{en(null)}}},eh=async()=>{if(et){en(et.id),ea(null);try{await (0,h.markDiscontinued)(et.id,e,el),g(e=>e.map(e=>e.id===et.id?{...e,paid:!1,monthStatus:"Discontinued"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as discontinued")}finally{en(null)}}},ef=async()=>{if(!B.skfId.trim())return void alert("Please enter SKF ID");if(!B.name.trim())return void alert("Please enter student name");J(!0);try{await (0,h.addStudent)(e,B.skfId,B.name,B.fee,B.phone,B.joinMonth),W(!1),O({skfId:"",name:"",fee:500,phone:"",joinMonth:el}),er()}catch(e){alert(e instanceof Error?e.message:"Failed to add student")}finally{J(!1)}},eu=u.filter(e=>{let t=e.name.toLowerCase().includes(C.toLowerCase())||e.id.toLowerCase().includes(C.toLowerCase()),a=!M||"Pending"===e.monthStatus,s="Active"===e.status;return t&&a&&s}),eg=(0,a.useMemo)(()=>{let e={Pending:0,Paid:1,Break:2,Discontinued:3,"N/A":4};return[...eu].sort((t,a)=>{let s=t.id.localeCompare(a.id,void 0,{numeric:!0,sensitivity:"base"});return 0!==s?s:(e[t.monthStatus]??4)-(e[a.monthStatus]??4)})},[eu]),eb="MPSC"===e?"MP SPORTS CLUB":e?.toUpperCase();return(0,t.jsxs)("div",{className:"min-h-screen",style:{background:"var(--bg-deep)"},children:[(0,t.jsx)(y.default,{title:eb,showBack:!0,rightContent:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("div",{className:"hidden sm:flex flex-col items-end mr-2",children:[(0,t.jsxs)("span",{className:"text-[10px] text-[var(--text-muted)] uppercase tracking-wider",children:[N[el]," 2026"]}),(0,t.jsxs)("span",{className:"text-green-400 font-bold text-xs font-[family-name:var(--font-space)]",children:[eo.paidCount,"/",eo.totalStudents," Paid"]})]}),(0,t.jsx)(j.default,{selectedMonth:el,onMonthChange:t=>{let a=new URLSearchParams(f.toString());a.set("month",t.toString()),l.push(`/students/${e}?${a.toString()}`)},className:"scale-90 origin-right"})]})}),(0,t.jsxs)("main",{className:"max-w-2xl mx-auto p-4 pt-24",children:[!b&&!k&&(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-fade-in",children:[(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(59, 130, 246, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(r,{className:"w-12 h-12 text-blue-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(r,{className:"w-3 h-3"})," Expected"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-blue-400",children:["₹",eo.expectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(34, 197, 94, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(x.CheckCircle2,{className:"w-12 h-12 text-green-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(x.CheckCircle2,{className:"w-3 h-3"})," Collected"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-green-400",children:["₹",eo.collectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(245, 158, 11, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(m.Clock,{className:"w-12 h-12 text-amber-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(m.Clock,{className:"w-3 h-3"})," Pending"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-amber-400",children:["₹",eo.pendingAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(o,{className:"w-12 h-12 text-white"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(o,{className:"w-3 h-3"})," Efficiency"]}),(0,t.jsxs)("p",{className:`font-[family-name:var(--font-space)] text-lg sm:text-xl ${eo.collectionRate>=80?"text-green-400":eo.collectionRate>=50?"text-yellow-400":"text-red-400"}`,children:[eo.collectionRate,"%"]})]})]}),(0,t.jsxs)("div",{className:"mb-6 space-y-3",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(c,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"}),(0,t.jsx)("input",{type:"text",value:C,onChange:e=>A(e.target.value),placeholder:"Search student...",className:"input-field pl-10 bg-black/20 border-white/5 focus:border-white/10 placeholder:text-[var(--text-muted)] text-sm"})]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)("button",{onClick:()=>_(!M),className:`flex-1 px-4 py-2.5 text-sm rounded-lg border transition-all duration-200 font-medium tracking-wide flex items-center justify-center gap-2 ${M?"bg-amber-600/20 border-amber-500/50 text-amber-400":"bg-white/5 border-white/5 text-[var(--text-secondary)] hover:bg-white/10"}`,children:[(0,t.jsx)(d,{className:"w-3 h-3"}),M?"Pending View":"All Students"]}),(0,t.jsx)("button",{onClick:()=>{O({...B,joinMonth:el}),W(!0)},className:"flex-1 px-4 py-2.5 text-sm rounded-lg border border-green-600/30 bg-green-600/10 text-green-400 hover:bg-green-600 hover:text-white transition-all duration-200 font-medium tracking-wide flex items-center justify-center gap-2",children:(0,t.jsx)("span",{children:"+ Add Student"})})]})]}),b&&(0,t.jsxs)("div",{className:"text-center py-16",children:[(0,t.jsx)("div",{className:"spinner mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-sm",children:"Loading students..."})]}),k&&(0,t.jsxs)("div",{className:"text-center py-16",children:[(0,t.jsx)("p",{className:"text-red-400 mb-4 text-sm",children:k}),(0,t.jsx)("button",{onClick:()=>er(!0),className:"btn-primary text-sm",children:"Retry"})]}),!b&&!k&&(0,t.jsx)("div",{className:"space-y-2",children:0===eg.length?(0,t.jsx)("p",{className:"text-center text-[var(--text-muted)] py-16 text-sm",children:"No students found"}):eg.map((e,a)=>{let s="Break"===e.monthStatus,l="Discontinued"===e.monthStatus,r=s||l;return(0,t.jsx)("div",{className:`glass-card p-4 transition-all duration-200 animate-slide-up hover:border-white/10 group ${l?"opacity-40 grayscale":s?"opacity-60":""}`,style:{animationDelay:`${Math.min(30*a,300)}ms`,animationFillMode:"backwards"},children:(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-1",children:[(0,t.jsx)("h3",{className:"font-[family-name:var(--font-space)] text-base tracking-wide text-white group-hover:text-amber-400 transition-colors truncate",children:e.name}),s&&(0,t.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded border border-yellow-500/50 text-yellow-500 uppercase tracking-wider",children:"Break"}),l&&(0,t.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded border border-red-500/50 text-red-500 uppercase tracking-wider",children:"Left"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[var(--text-muted)] text-xs",children:[(0,t.jsx)("span",{className:"font-mono opacity-70",children:e.id}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(i,{className:"w-3 h-3"})," ₹",e.fee]})]}),(e.creditApplied||0)>0&&(0,t.jsxs)("div",{className:"mt-2 inline-flex items-center gap-1.5 text-[10px] bg-purple-500/10 text-purple-300 px-2 py-1 rounded-md border border-purple-500/20",children:[(0,t.jsx)(n.Gift,{className:"w-3 h-3"}),(0,t.jsxs)("span",{children:["Credit Applied: ₹",e.creditApplied]})]})]}),(0,t.jsx)("div",{className:"flex-shrink-0",children:"Paid"===e.monthStatus?(0,t.jsx)("button",{onClick:()=>q(e),className:"w-9 h-9 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 flex items-center justify-center hover:bg-green-500/25 transition-all",title:"View Receipt",children:(0,t.jsx)(x.CheckCircle2,{className:"w-4 h-4"})}):r?(0,t.jsx)("div",{className:"w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[var(--text-muted)]",children:(0,t.jsx)(p,{className:"w-4 h-4"})}):(0,t.jsx)("button",{onClick:()=>ec(e),onMouseDown:()=>ex(e),onMouseUp:em,onMouseLeave:em,onTouchStart:()=>ex(e),onTouchEnd:em,disabled:P===e.id||es===e.id,className:`w-9 h-9 rounded-full flex items-center justify-center transition-all select-none ${P===e.id||es===e.id?"bg-white/5 text-[var(--text-muted)]":"bg-white text-black hover:bg-gray-200 shadow-[0_0_12px_rgba(255,255,255,0.15)]"}`,title:"Mark Paid",children:P===e.id||es===e.id?(0,t.jsx)("div",{className:"spinner !w-4 !h-4"}):(0,t.jsx)(i,{className:"w-4 h-4"})})})]})},e.id)})})]}),T&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center",children:"CONFIRM PAYMENT"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-4",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:T.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:T.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Original Fee"}),(0,t.jsxs)("p",{className:"text-xl font-bold text-white",children:["₹",T.fee]})]}),E?(0,t.jsx)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-sm",children:"Checking for credits..."})}):F&&F.credits.length>0?(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-purple-400 text-sm",children:[(0,t.jsx)(n.Gift,{className:"w-3 h-3"})," Referral Credit Available"]}),(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:!!$,onChange:e=>L(e.target.checked?F.credits[0].id:null),className:"w-4 h-4 accent-purple-600 rounded"}),(0,t.jsx)("span",{className:"text-sm text-[var(--text-secondary)]",children:"Apply"})]})]}),(0,t.jsxs)("p",{className:"text-purple-400 font-bold",children:["-₹",F.totalAvailable]}),F.credits[0].reason&&(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mt-1",children:F.credits[0].reason})]}):null,(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Amount to Collect"}),(0,t.jsxs)("p",{className:"text-2xl font-bold text-green-400",children:["₹",$&&F?Math.max(0,T.fee-F.totalAvailable):T.fee]})]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[N[el]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-4",children:$&&F?`Collect ₹${Math.max(0,T.fee-F.totalAvailable)} (₹${F.totalAvailable} credit applied)`:`Collect ₹${T.fee}?`}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>{z(null),L(null),D(null)},className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ed,className:"flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors",children:"✓ CONFIRM"})]})]})})}),K&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-6 text-center",children:"ADD NEW STUDENT"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"SKF ID *"}),(0,t.jsx)("input",{type:"text",value:B.skfId,onChange:e=>O({...B,skfId:e.target.value.toUpperCase()}),placeholder:"e.g., HERO-001 or MP-001",className:"input-field font-mono"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Student Name *"}),(0,t.jsx)("input",{type:"text",value:B.name,onChange:e=>O({...B,name:e.target.value}),placeholder:"Enter full name",className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Monthly Fee (₹)"}),(0,t.jsx)("input",{type:"number",value:B.fee,onChange:e=>O({...B,fee:parseInt(e.target.value)||500}),className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Phone Number"}),(0,t.jsx)("input",{type:"tel",value:B.phone,onChange:e=>O({...B,phone:e.target.value}),placeholder:"Optional",className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Joining Month *"}),(0,t.jsx)("select",{value:B.joinMonth,onChange:e=>O({...B,joinMonth:parseInt(e.target.value)}),className:"input-field",children:N.map((e,a)=>(0,t.jsxs)("option",{value:a,children:[e," 2026"]},a))}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mt-2",children:"Fees will only be calculated from this month onwards"})]})]}),(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[(0,t.jsx)("button",{onClick:()=>W(!1),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ef,disabled:U||!B.name.trim(),className:"flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors disabled:opacity-50",children:U?"...":"+ ADD"})]})]})})}),Q&&H&&(0,t.jsx)("div",{className:"glass-modal-overlay",onClick:()=>X(!1),children:(0,t.jsxs)("div",{className:"glass-modal !max-w-xs",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider p-4 border-b border-[var(--border)]",children:H.name}),(0,t.jsxs)("button",{onClick:()=>{X(!1),ee(H)},className:"w-full text-left px-4 py-4 text-amber-400 hover:bg-white/5 transition-colors flex items-center gap-3",children:[(0,t.jsx)("span",{className:"text-xl",children:"⏸"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"MARK AS BREAK"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs",children:"Student on leave this month"})]})]}),(0,t.jsxs)("button",{onClick:()=>{X(!1),ea(H)},className:"w-full text-left px-4 py-4 text-gray-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]",children:[(0,t.jsx)("span",{className:"text-xl",children:"⛔"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"DISCONTINUED"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs",children:"Student left permanently"})]})]})]})}),Z&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center text-amber-400",children:"MARK AS BREAK"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:Z.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:Z.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[N[el]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-6",children:"This student will not be counted in pending fees for this month."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>ee(null),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ep,className:"flex-1 py-3 bg-amber-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-amber-500 transition-colors",children:"⏸ CONFIRM"})]})]})})}),et&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center text-gray-400",children:"MARK AS DISCONTINUED"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:et.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:et.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"From Month"}),(0,t.jsxs)("p",{className:"text-white",children:[N[el]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-6",children:"This student will be marked as discontinued and moved to the bottom of the list."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>ea(null),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:eh,className:"flex-1 py-3 bg-gray-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-gray-500 transition-colors",children:"⛔ CONFIRM"})]})]})})}),G&&(0,t.jsx)(v,{student:G,month:el,branch:e,onClose:()=>{q(null)}})]})}e.s(["default",()=>w],87073)}]);