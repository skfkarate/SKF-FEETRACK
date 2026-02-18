(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,87073,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(18566),n=e.i(30699),l=e.i(75254);let r=(0,l.default)("indian-rupee",[["path",{d:"M6 3h12",key:"ggurg9"}],["path",{d:"M6 8h12",key:"6g4wlu"}],["path",{d:"m6 13 8.5 8",key:"u1kupk"}],["path",{d:"M6 13h3",key:"wdp6ag"}],["path",{d:"M9 13c6.667 0 6.667-10 0-10",key:"1nkvk2"}]]),i=(0,l.default)("target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]),o=(0,l.default)("trending-down",[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]]),c=(0,l.default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]),d=(0,l.default)("funnel",[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]]),x=(0,l.default)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]),m=(0,l.default)("ellipsis-vertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);var p=e.i(95468),h=e.i(3116),f=e.i(9165),g=e.i(932),u=e.i(57688);let b="https://skfkarate.github.io/SKF-FEETRACK",v=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function j(e){let s,n,l,r,i,o,c,d,x,m,p,h,f,j,y,N,w,k,S,C,A,M,P,_,R,T,D,F,z,E,I,$,L,K,W,B,O,U,J,G,H,Y,q,V,Q,X,Z,ee,et,ea,es,en,el,er,ei,eo=(0,g.c)(101),{student:ec,month:ed,branch:ex,onClose:em}=e,ep=(0,a.useRef)(null);eo[0]!==ex?(s="MPSC"===ex?"MP Sports Club":ex?.toUpperCase(),eo[0]=ex,eo[1]=s):s=eo[1];let eh=s;eo[2]===Symbol.for("react.memo_cache_sentinel")?(n=Math.floor(1e4*Math.random()).toString().padStart(4,"0"),eo[2]=n):n=eo[2];let ef=n;eo[3]!==ex?(l=ex.substring(0,1).toUpperCase(),eo[3]=ex,eo[4]=l):l=eo[4];let eg=`SKF-${l}-${ef}`;eo[5]===Symbol.for("react.memo_cache_sentinel")?(r=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"}),eo[5]=r):r=eo[5],eo[6]!==ed?(i=new Date(2026,ed,1).toLocaleDateString("en-IN",{month:"long"}),eo[6]=ed,eo[7]=i):i=eo[7];let eu=`${i} Monthly Training Fee`;eo[8]!==ec.fee?(o=ec.fee.toLocaleString(),eo[8]=ec.fee,eo[9]=o):o=eo[9];let eb=`Rupees ${o} Only`;eo[10]!==eg||eo[11]!==eu||eo[12]!==eb?(c={receiptNo:eg,date:r,purpose:eu,amountWords:eb},eo[10]=eg,eo[11]=eu,eo[12]=eb,eo[13]=c):c=eo[13];let{receiptNo:ev,date:ej,purpose:ey,amountWords:eN}=c;eo[14]!==eN||eo[15]!==eh||eo[16]!==ej||eo[17]!==ed||eo[18]!==ey||eo[19]!==ev||eo[20]!==ec.fee||eo[21]!==ec.id||eo[22]!==ec.name||eo[23]!==ec.parentName?(d=()=>{let e=window.open("","_blank","width=600,height=800");if(!e)return void alert("Please allow popups to download the receipt.");let t=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${ec.id}_${v[ed]}2026_Fee</title>
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
      <img src="${b}/logo.png" alt="SKF" class="logo">
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
        <img src="${b}/stamp.png" alt="PAID">
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
    `;e.document.write(t),e.document.close()},eo[14]=eN,eo[15]=eh,eo[16]=ej,eo[17]=ed,eo[18]=ey,eo[19]=ev,eo[20]=ec.fee,eo[21]=ec.id,eo[22]=ec.name,eo[23]=ec.parentName,eo[24]=d):d=eo[24];let ew=d;eo[25]===Symbol.for("react.memo_cache_sentinel")?(x={zIndex:100},eo[25]=x):x=eo[25],eo[26]===Symbol.for("react.memo_cache_sentinel")?(m={backgroundColor:"#ffffff",color:"#1a1f2e",borderRadius:"12px",overflow:"hidden",boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"},p=(0,t.jsxs)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"24px",textAlign:"center"},children:[(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginBottom:"12px"},children:(0,t.jsx)(u.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/logo.png",alt:"SKF",width:70,height:70,className:"rounded-full object-contain border border-[#d4af37]/50 bg-white/5"})}),(0,t.jsx)("h1",{style:{color:"#ffffff",fontSize:"28px",fontWeight:900,letterSpacing:"0.2em",margin:0},children:"SKF"}),(0,t.jsx)("p",{style:{color:"#d4af37",fontSize:"11px",fontWeight:600,letterSpacing:"0.1em",marginTop:"4px"},children:"Sports Karate-do Fitness & Self Defence Association ®"})]}),h={padding:"24px",borderBottom:"1px solid #e5e7eb"},f=(0,t.jsxs)("div",{style:{textAlign:"center",marginBottom:"16px"},children:[(0,t.jsx)("h2",{style:{color:"#1a1f2e",fontSize:"18px",fontWeight:900,margin:0},children:"Monthly Fee Receipt"}),(0,t.jsx)("p",{style:{color:"#6b7280",fontSize:"11px",marginTop:"4px"},children:"Payment confirmation"})]}),j={width:"100%",borderCollapse:"collapse"},y=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Branch"}),N={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},eo[26]=m,eo[27]=p,eo[28]=h,eo[29]=f,eo[30]=j,eo[31]=y,eo[32]=N):(m=eo[26],p=eo[27],h=eo[28],f=eo[29],j=eo[30],y=eo[31],N=eo[32]),eo[33]!==eh?(w=(0,t.jsxs)("tr",{children:[y,(0,t.jsx)("td",{style:N,children:eh})]}),eo[33]=eh,eo[34]=w):w=eo[34],eo[35]===Symbol.for("react.memo_cache_sentinel")?(k=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Receipt No"}),S={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},eo[35]=k,eo[36]=S):(k=eo[35],S=eo[36]),eo[37]!==ev?(C=(0,t.jsxs)("tr",{children:[k,(0,t.jsx)("td",{style:S,children:ev})]}),eo[37]=ev,eo[38]=C):C=eo[38],eo[39]===Symbol.for("react.memo_cache_sentinel")?(A=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0"},children:"Date"}),M={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0"},eo[39]=A,eo[40]=M):(A=eo[39],M=eo[40]),eo[41]!==ej?(P=(0,t.jsxs)("tr",{children:[A,(0,t.jsx)("td",{style:M,children:ej})]}),eo[41]=ej,eo[42]=P):P=eo[42],eo[43]!==w||eo[44]!==C||eo[45]!==P?(_=(0,t.jsxs)("div",{style:h,children:[f,(0,t.jsx)("table",{style:j,children:(0,t.jsxs)("tbody",{children:[w,C,P]})})]}),eo[43]=w,eo[44]=C,eo[45]=P,eo[46]=_):_=eo[46],eo[47]===Symbol.for("react.memo_cache_sentinel")?(R={padding:"24px",position:"relative"},T={width:"100%",borderCollapse:"collapse"},D=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Parent / Guardian"}),F={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},eo[47]=R,eo[48]=T,eo[49]=D,eo[50]=F):(R=eo[47],T=eo[48],D=eo[49],F=eo[50]);let ek=ec.parentName||"N/A";return eo[51]!==ek?(z=(0,t.jsxs)("tr",{children:[D,(0,t.jsx)("td",{style:F,children:ek})]}),eo[51]=ek,eo[52]=z):z=eo[52],eo[53]===Symbol.for("react.memo_cache_sentinel")?(E=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"top"},children:"Student Name"}),I={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"top"},eo[53]=E,eo[54]=I):(E=eo[53],I=eo[54]),eo[55]===Symbol.for("react.memo_cache_sentinel")?($=(0,t.jsx)("br",{}),L={backgroundColor:"#b8860b",color:"#ffffff",fontSize:"10px",padding:"2px 8px",borderRadius:"4px",fontWeight:700,display:"inline-block",marginTop:"4px"},eo[55]=$,eo[56]=L):($=eo[55],L=eo[56]),eo[57]!==ec.id?(K=(0,t.jsx)("span",{style:L,children:ec.id}),eo[57]=ec.id,eo[58]=K):K=eo[58],eo[59]!==ec.name||eo[60]!==K?(W=(0,t.jsxs)("tr",{children:[E,(0,t.jsxs)("td",{style:I,children:[ec.name,$,K]})]}),eo[59]=ec.name,eo[60]=K,eo[61]=W):W=eo[61],eo[62]===Symbol.for("react.memo_cache_sentinel")?(B=(0,t.jsx)("td",{style:{color:"#4b5563",fontWeight:700,fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em",padding:"4px 0",verticalAlign:"middle"},children:"Purpose"}),O={color:"#1a1f2e",fontWeight:700,fontSize:"14px",textAlign:"right",padding:"4px 0",verticalAlign:"middle"},eo[62]=B,eo[63]=O):(B=eo[62],O=eo[63]),eo[64]!==ey?(U=(0,t.jsxs)("tr",{children:[B,(0,t.jsx)("td",{style:O,children:ey})]}),eo[64]=ey,eo[65]=U):U=eo[65],eo[66]!==z||eo[67]!==W||eo[68]!==U?(J=(0,t.jsx)("table",{style:T,children:(0,t.jsxs)("tbody",{children:[z,W,U]})}),eo[66]=z,eo[67]=W,eo[68]=U,eo[69]=J):J=eo[69],eo[70]===Symbol.for("react.memo_cache_sentinel")?(G={marginTop:"24px",padding:"16px",borderRadius:"12px",border:"2px solid #d4af37",background:"linear-gradient(135deg, #fafbfc, #f3f4f6)",textAlign:"center"},H={fontSize:"28px",fontWeight:900,color:"#1a1f2e"},eo[70]=G,eo[71]=H):(G=eo[70],H=eo[71]),eo[72]!==ec.fee?(Y=ec.fee.toLocaleString(),eo[72]=ec.fee,eo[73]=Y):Y=eo[73],eo[74]!==Y?(q=(0,t.jsxs)("div",{style:H,children:["₹ ",Y]}),eo[74]=Y,eo[75]=q):q=eo[75],eo[76]===Symbol.for("react.memo_cache_sentinel")?(V={fontSize:"11px",fontStyle:"italic",color:"#6b7280",marginTop:"4px"},eo[76]=V):V=eo[76],eo[77]!==eN?(Q=(0,t.jsx)("div",{style:V,children:eN}),eo[77]=eN,eo[78]=Q):Q=eo[78],eo[79]!==q||eo[80]!==Q?(X=(0,t.jsxs)("div",{style:G,children:[q,Q]}),eo[79]=q,eo[80]=Q,eo[81]=X):X=eo[81],eo[82]===Symbol.for("react.memo_cache_sentinel")?(Z=(0,t.jsx)("div",{style:{marginTop:"16px",textAlign:"center",fontWeight:700,fontSize:"13px",color:"#16a34a"},children:"✔ Payment Received with Thanks"}),ee=(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",marginTop:"8px",opacity:.9},children:(0,t.jsx)(u.default,{src:"https://skfkarate.github.io/SKF-FEETRACK/stamp.png",alt:"PAID",width:96,height:96,className:"object-contain -rotate-12"})}),eo[82]=Z,eo[83]=ee):(Z=eo[82],ee=eo[83]),eo[84]!==J||eo[85]!==X?(et=(0,t.jsxs)("div",{style:R,children:[J,X,Z,ee]}),eo[84]=J,eo[85]=X,eo[86]=et):et=eo[86],eo[87]===Symbol.for("react.memo_cache_sentinel")?(ea=(0,t.jsx)("div",{style:{background:"linear-gradient(135deg, #1a1f2e, #0f1419)",padding:"12px",textAlign:"center"},children:(0,t.jsx)("p",{style:{color:"#d1d5db",fontSize:"10px",margin:0},children:"This receipt is issued for confirmation and record purposes only."})}),eo[87]=ea):ea=eo[87],eo[88]!==_||eo[89]!==et?(es=(0,t.jsxs)("div",{ref:ep,style:m,children:[p,_,et,ea]}),eo[88]=_,eo[89]=et,eo[90]=es):es=eo[90],eo[91]!==em?(en=(0,t.jsx)("button",{onClick:em,className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider",children:"CLOSE"}),eo[91]=em,eo[92]=en):en=eo[92],eo[93]!==ew?(el=(0,t.jsx)("button",{onClick:ew,className:"btn-primary flex-1 font-[family-name:var(--font-space)] tracking-wider flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 border-none text-white",children:"⬇ DOWNLOAD"}),eo[93]=ew,eo[94]=el):el=eo[94],eo[95]!==en||eo[96]!==el?(er=(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[en,el]}),eo[95]=en,eo[96]=el,eo[97]=er):er=eo[97],eo[98]!==es||eo[99]!==er?(ei=(0,t.jsx)("div",{className:"glass-modal-overlay",style:x,children:(0,t.jsxs)("div",{className:"w-full max-w-[520px] max-h-[90vh] overflow-y-auto px-4 custom-scrollbar",children:[es,er]})}),eo[98]=es,eo[99]=er,eo[100]=ei):ei=eo[100],ei}var y=e.i(21319),N=e.i(71664);let w=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function k({branch:e}){let l=(0,s.useRouter)(),g=(0,s.useSearchParams)(),[u,b]=(0,a.useState)([]),[v,k]=(0,a.useState)(!0),[S,C]=(0,a.useState)(""),[A,M]=(0,a.useState)(""),[P,_]=(0,a.useState)(!1),[R,T]=(0,a.useState)(null),[D,F]=(0,a.useState)(null),[z,E]=(0,a.useState)(null),[I,$]=(0,a.useState)(!1),[L,K]=(0,a.useState)(null),[W,B]=(0,a.useState)(!1),[O,U]=(0,a.useState)({skfId:"",name:"",fee:500,phone:"",joinMonth:0}),[J,G]=(0,a.useState)(!1),[H,Y]=(0,a.useState)(null),[q,V]=(0,a.useState)(null),Q=(0,a.useRef)(null),[X,Z]=(0,a.useState)(!1),[ee,et]=(0,a.useState)(null),[ea,es]=(0,a.useState)(null),[en,el]=(0,a.useState)(null),er=parseInt(g.get("month")||new Date().getMonth().toString()),ei=(0,a.useRef)(er);(0,a.useEffect)(()=>{let e=localStorage.getItem("skf_user"),t=localStorage.getItem("skf_login_time");(!e||!t||Date.now()-parseInt(t)>18e5)&&l.push("/")},[l]);let eo=(0,a.useCallback)(async(t=!1)=>{if(e){k(!0),C("");try{let a=await (0,f.getStudents)(e,er,t);b(a)}catch(e){C(e instanceof Error?e.message:"Failed to load students")}finally{k(!1)}}},[e,er]);(0,a.useEffect)(()=>{let e=ei.current!==er;ei.current=er,eo(e)},[eo,er]);let ec=(0,a.useMemo)(()=>{let e=u.filter(e=>"Active"===e.status),t=e.filter(e=>"Paid"===e.monthStatus),a=e.filter(e=>"Pending"===e.monthStatus),s=e.filter(e=>"Break"===e.monthStatus),n=e.filter(e=>"Discontinued"===e.monthStatus);return{totalStudents:e.length,paidCount:t.length,pendingCount:a.length,onBreakCount:s.length,discontinuedCount:n.length,expectedAmount:a.reduce((e,t)=>e+(t.fee||0),0)+t.reduce((e,t)=>e+(t.fee||0),0),collectedAmount:t.reduce((e,t)=>e+(t.fee||0),0),pendingAmount:a.reduce((e,t)=>e+(t.fee||0),0),collectionRate:a.length+t.length>0?Math.round(t.length/(a.length+t.length)*100):0}},[u]),ed=async t=>{F(t),E(null),K(null),$(!0);try{let a=await (0,f.getStudentAvailableCredits)(t.id,e);E(a),a.credits.length>0&&K(a.credits[0].id)}catch{}finally{$(!1)}},ex=async()=>{if(D){T(D.id),F(null);try{L?await (0,f.markPaidWithCredit)(D.id,e,er,L):await (0,f.markPaid)(D.id,e,er),b(e=>e.map(e=>e.id===D.id?{...e,paid:!0,monthStatus:"Paid"}:e)),Y(D)}catch(e){alert(e instanceof Error?e.message:"Failed to mark as paid")}finally{T(null),K(null),E(null)}}},em=e=>{Q.current=setTimeout(()=>{V(e),Z(!0)},3e3)},ep=()=>{Q.current&&(clearTimeout(Q.current),Q.current=null)},eh=async()=>{if(ee){el(ee.id),et(null);try{await (0,f.markBreak)(ee.id,e,er),b(e=>e.map(e=>e.id===ee.id?{...e,paid:!1,monthStatus:"Break"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as break")}finally{el(null)}}},ef=async()=>{if(ea){el(ea.id),es(null);try{await (0,f.markDiscontinued)(ea.id,e,er),b(e=>e.map(e=>e.id===ea.id?{...e,paid:!1,monthStatus:"Discontinued"}:e))}catch(e){alert(e instanceof Error?e.message:"Failed to mark as discontinued")}finally{el(null)}}},eg=async()=>{if(!O.skfId.trim())return void alert("Please enter SKF ID");if(!O.name.trim())return void alert("Please enter student name");G(!0);try{await (0,f.addStudent)(e,O.skfId,O.name,O.fee,O.phone,O.joinMonth),B(!1),U({skfId:"",name:"",fee:500,phone:"",joinMonth:er}),eo()}catch(e){alert(e instanceof Error?e.message:"Failed to add student")}finally{G(!1)}},eu=u.filter(e=>{let t=e.name.toLowerCase().includes(A.toLowerCase())||e.id.toLowerCase().includes(A.toLowerCase()),a=!P||"Pending"===e.monthStatus,s="Active"===e.status;return t&&a&&s}),eb=(0,a.useMemo)(()=>{let e={Pending:0,Paid:1,Break:2,Discontinued:3,"N/A":4};return[...eu].sort((t,a)=>{let s=t.id.localeCompare(a.id,void 0,{numeric:!0,sensitivity:"base"});return 0!==s?s:(e[t.monthStatus]??4)-(e[a.monthStatus]??4)})},[eu]),ev="MPSC"===e?"MP SPORTS CLUB":e?.toUpperCase();return(0,t.jsxs)("div",{className:"min-h-screen",style:{background:"var(--bg-deep)"},children:[(0,t.jsx)(N.default,{title:ev,showBack:!0,rightContent:(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("div",{className:"hidden sm:flex flex-col items-end mr-2",children:[(0,t.jsxs)("span",{className:"text-[10px] text-[var(--text-muted)] uppercase tracking-wider",children:[w[er]," 2026"]}),(0,t.jsxs)("span",{className:"text-green-400 font-bold text-xs font-[family-name:var(--font-space)]",children:[ec.paidCount,"/",ec.totalStudents," Paid"]})]}),(0,t.jsx)(y.default,{selectedMonth:er,onMonthChange:t=>{let a=new URLSearchParams(g.toString());a.set("month",t.toString()),l.push(`/students/${e}?${a.toString()}`)},className:"scale-90 origin-right"})]})}),(0,t.jsxs)("main",{className:"max-w-2xl mx-auto p-4 pt-24",children:[!v&&!S&&(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-fade-in",children:[(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(59, 130, 246, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(i,{className:"w-12 h-12 text-blue-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(i,{className:"w-3 h-3"})," Expected"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-blue-400",children:["₹",ec.expectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(34, 197, 94, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(p.CheckCircle2,{className:"w-12 h-12 text-green-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(p.CheckCircle2,{className:"w-3 h-3"})," Collected"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-green-400",children:["₹",ec.collectedAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",style:{borderColor:"rgba(245, 158, 11, 0.25)"},children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(h.Clock,{className:"w-12 h-12 text-amber-400"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(h.Clock,{className:"w-3 h-3"})," Pending"]}),(0,t.jsxs)("p",{className:"font-[family-name:var(--font-space)] text-lg sm:text-xl text-amber-400",children:["₹",ec.pendingAmount.toLocaleString()]})]}),(0,t.jsxs)("div",{className:"glass-card p-4 relative overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute top-0 right-0 p-2 opacity-10",children:(0,t.jsx)(o,{className:"w-12 h-12 text-white"})}),(0,t.jsxs)("p",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,t.jsx)(o,{className:"w-3 h-3"})," Efficiency"]}),(0,t.jsxs)("p",{className:`font-[family-name:var(--font-space)] text-lg sm:text-xl ${ec.collectionRate>=80?"text-green-400":ec.collectionRate>=50?"text-yellow-400":"text-red-400"}`,children:[ec.collectionRate,"%"]})]})]}),(0,t.jsxs)("div",{className:"mb-6 space-y-3",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(c,{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"}),(0,t.jsx)("input",{type:"text",value:A,onChange:e=>M(e.target.value),placeholder:"Search student...",className:"input-field pl-10 bg-black/20 border-white/5 focus:border-white/10 placeholder:text-[var(--text-muted)] text-sm"})]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)("button",{onClick:()=>_(!P),className:`flex-1 px-4 py-2.5 text-sm rounded-lg border transition-all duration-200 font-medium tracking-wide flex items-center justify-center gap-2 ${P?"bg-amber-600/20 border-amber-500/50 text-amber-400":"bg-white/5 border-white/5 text-[var(--text-secondary)] hover:bg-white/10"}`,children:[(0,t.jsx)(d,{className:"w-3 h-3"}),P?"Pending View":"All Students"]}),(0,t.jsx)("button",{onClick:()=>{U({...O,joinMonth:er}),B(!0)},className:"flex-1 px-4 py-2.5 text-sm rounded-lg border border-green-600/30 bg-green-600/10 text-green-400 hover:bg-green-600 hover:text-white transition-all duration-200 font-medium tracking-wide flex items-center justify-center gap-2",children:(0,t.jsx)("span",{children:"+ Add Student"})})]})]}),v&&(0,t.jsxs)("div",{className:"text-center py-16",children:[(0,t.jsx)("div",{className:"spinner mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-sm",children:"Loading students..."})]}),S&&(0,t.jsxs)("div",{className:"text-center py-16",children:[(0,t.jsx)("p",{className:"text-red-400 mb-4 text-sm",children:S}),(0,t.jsx)("button",{onClick:()=>eo(!0),className:"btn-primary text-sm",children:"Retry"})]}),!v&&!S&&(0,t.jsx)("div",{className:"space-y-2",children:0===eb.length?(0,t.jsx)("p",{className:"text-center text-[var(--text-muted)] py-16 text-sm",children:"No students found"}):eb.map((e,a)=>{let s="Break"===e.monthStatus,l="Discontinued"===e.monthStatus,i=s||l;return(0,t.jsx)("div",{className:`glass-card p-4 transition-all duration-200 animate-slide-up hover:border-white/10 group ${l?"opacity-40 grayscale":s?"opacity-60":""}`,style:{animationDelay:`${Math.min(30*a,300)}ms`,animationFillMode:"backwards"},children:(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-1",children:[(0,t.jsx)("h3",{className:"font-[family-name:var(--font-space)] text-base tracking-wide text-white group-hover:text-amber-400 transition-colors truncate",children:e.name}),s&&(0,t.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded border border-yellow-500/50 text-yellow-500 uppercase tracking-wider",children:"Break"}),l&&(0,t.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded border border-red-500/50 text-red-500 uppercase tracking-wider",children:"Left"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-3 text-[var(--text-muted)] text-xs",children:[(0,t.jsx)("span",{className:"font-mono opacity-70",children:e.id}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)(r,{className:"w-3 h-3"})," ",e.fee]}),e.phone&&(0,t.jsxs)("span",{className:"flex items-center gap-1 opacity-70",children:[(0,t.jsx)(x,{className:"w-3 h-3"})," ",e.phone]})]}),(e.creditApplied||0)>0&&(0,t.jsxs)("div",{className:"mt-2 inline-flex items-center gap-1.5 text-[10px] bg-purple-500/10 text-purple-300 px-2 py-1 rounded-md border border-purple-500/20",children:[(0,t.jsx)(n.Gift,{className:"w-3 h-3"}),(0,t.jsxs)("span",{children:["Credit Applied: ₹",e.creditApplied]})]})]}),(0,t.jsx)("div",{className:"flex-shrink-0",children:"Paid"===e.monthStatus?(0,t.jsxs)("button",{onClick:()=>Y(e),className:"bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg font-[family-name:var(--font-space)] text-xs tracking-wider hover:bg-green-500/20 transition-all flex items-center gap-1.5",children:[(0,t.jsx)(p.CheckCircle2,{className:"w-3 h-3"})," PAID"]}):i?(0,t.jsx)("div",{className:"text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-medium px-2 py-1",children:e.monthStatus}):(0,t.jsx)("button",{onClick:()=>ed(e),onMouseDown:()=>em(e),onMouseUp:ep,onMouseLeave:ep,onTouchStart:()=>em(e),onTouchEnd:ep,disabled:R===e.id||en===e.id,className:`px-4 py-2 rounded-lg font-[family-name:var(--font-space)] text-xs tracking-wider transition-all border select-none flex items-center gap-2 ${R===e.id?"bg-white/5 text-[var(--text-muted)] border-white/5":"bg-white text-black border-white hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]"}`,children:R===e.id||en===e.id?"...":(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("span",{children:"MARK PAID"}),(0,t.jsx)(m,{className:"w-3 h-3 opacity-50"})]})})})]})},e.id)})})]}),D&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center",children:"CONFIRM PAYMENT"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-4",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:D.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:D.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Original Fee"}),(0,t.jsxs)("p",{className:"text-xl font-bold text-white",children:["₹",D.fee]})]}),I?(0,t.jsx)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-sm",children:"Checking for credits..."})}):z&&z.credits.length>0?(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-purple-400 text-sm",children:[(0,t.jsx)(n.Gift,{className:"w-3 h-3"})," Referral Credit Available"]}),(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:!!L,onChange:e=>K(e.target.checked?z.credits[0].id:null),className:"w-4 h-4 accent-purple-600 rounded"}),(0,t.jsx)("span",{className:"text-sm text-[var(--text-secondary)]",children:"Apply"})]})]}),(0,t.jsxs)("p",{className:"text-purple-400 font-bold",children:["-₹",z.totalAvailable]}),z.credits[0].reason&&(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mt-1",children:z.credits[0].reason})]}):null,(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Amount to Collect"}),(0,t.jsxs)("p",{className:"text-2xl font-bold text-green-400",children:["₹",L&&z?Math.max(0,D.fee-z.totalAvailable):D.fee]})]}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[w[er]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-4",children:L&&z?`Collect ₹${Math.max(0,D.fee-z.totalAvailable)} (₹${z.totalAvailable} credit applied)`:`Collect ₹${D.fee}?`}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>{F(null),K(null),E(null)},className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ex,className:"flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors",children:"✓ CONFIRM"})]})]})})}),W&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-6 text-center",children:"ADD NEW STUDENT"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"SKF ID *"}),(0,t.jsx)("input",{type:"text",value:O.skfId,onChange:e=>U({...O,skfId:e.target.value.toUpperCase()}),placeholder:"e.g., HERO-001 or MP-001",className:"input-field font-mono"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Student Name *"}),(0,t.jsx)("input",{type:"text",value:O.name,onChange:e=>U({...O,name:e.target.value}),placeholder:"Enter full name",className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Monthly Fee (₹)"}),(0,t.jsx)("input",{type:"number",value:O.fee,onChange:e=>U({...O,fee:parseInt(e.target.value)||500}),className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Phone Number"}),(0,t.jsx)("input",{type:"tel",value:O.phone,onChange:e=>U({...O,phone:e.target.value}),placeholder:"Optional",className:"input-field"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider block mb-2 font-medium",children:"Joining Month *"}),(0,t.jsx)("select",{value:O.joinMonth,onChange:e=>U({...O,joinMonth:parseInt(e.target.value)}),className:"input-field",children:w.map((e,a)=>(0,t.jsxs)("option",{value:a,children:[e," 2026"]},a))}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mt-2",children:"Fees will only be calculated from this month onwards"})]})]}),(0,t.jsxs)("div",{className:"flex gap-3 mt-6",children:[(0,t.jsx)("button",{onClick:()=>B(!1),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:eg,disabled:J||!O.name.trim(),className:"flex-1 py-3 bg-green-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-green-500 transition-colors disabled:opacity-50",children:J?"...":"+ ADD"})]})]})})}),X&&q&&(0,t.jsx)("div",{className:"glass-modal-overlay",onClick:()=>Z(!1),children:(0,t.jsxs)("div",{className:"glass-modal !max-w-xs",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs uppercase tracking-wider p-4 border-b border-[var(--border)]",children:q.name}),(0,t.jsxs)("button",{onClick:()=>{Z(!1),et(q)},className:"w-full text-left px-4 py-4 text-amber-400 hover:bg-white/5 transition-colors flex items-center gap-3",children:[(0,t.jsx)("span",{className:"text-xl",children:"⏸"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"MARK AS BREAK"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs",children:"Student on leave this month"})]})]}),(0,t.jsxs)("button",{onClick:()=>{Z(!1),es(q)},className:"w-full text-left px-4 py-4 text-gray-400 hover:bg-white/5 transition-colors flex items-center gap-3 border-t border-[var(--border)]",children:[(0,t.jsx)("span",{className:"text-xl",children:"⛔"}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] tracking-wider text-sm",children:"DISCONTINUED"}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs",children:"Student left permanently"})]})]})]})}),ee&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center text-amber-400",children:"MARK AS BREAK"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:ee.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:ee.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Month"}),(0,t.jsxs)("p",{className:"text-white",children:[w[er]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-6",children:"This student will not be counted in pending fees for this month."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>et(null),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:eh,className:"flex-1 py-3 bg-amber-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-amber-500 transition-colors",children:"⏸ CONFIRM"})]})]})})}),ea&&(0,t.jsx)("div",{className:"glass-modal-overlay",children:(0,t.jsx)("div",{className:"glass-modal",children:(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"font-[family-name:var(--font-space)] text-xl tracking-wider mb-4 text-center text-gray-400",children:"MARK AS DISCONTINUED"}),(0,t.jsxs)("div",{className:"glass-surface p-4 mb-6",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"Student"}),(0,t.jsx)("p",{className:"font-[family-name:var(--font-space)] text-lg",children:ea.name}),(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs font-mono",children:ea.id}),(0,t.jsxs)("div",{className:"mt-3 pt-3 border-t border-[var(--border)]",children:[(0,t.jsx)("p",{className:"text-[var(--text-muted)] text-xs mb-1",children:"From Month"}),(0,t.jsxs)("p",{className:"text-white",children:[w[er]," 2026"]})]})]}),(0,t.jsx)("p",{className:"text-[var(--text-secondary)] text-center text-sm mb-6",children:"This student will be marked as discontinued and moved to the bottom of the list."}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("button",{onClick:()=>es(null),className:"btn-ghost flex-1 font-[family-name:var(--font-space)] tracking-wider text-sm",children:"CANCEL"}),(0,t.jsx)("button",{onClick:ef,className:"flex-1 py-3 bg-gray-600 text-white rounded-lg font-[family-name:var(--font-space)] tracking-wider text-sm hover:bg-gray-500 transition-colors",children:"⛔ CONFIRM"})]})]})})}),H&&(0,t.jsx)(j,{student:H,month:er,branch:e,onClose:()=>{Y(null)}})]})}e.s(["default",()=>k],87073)}]);