import{d as H,n as J,e as K,q as Q,m as l,r as i,o as b,c as x,g as o,h as t,k as y,l as g,t as B,j as W,b as M,T as O,a as U,F as X,i as Y,N as uu}from"./app.0ce71bde.js";import{n as eu}from"./index.e852a593.js";const ou={class:"bg-gray-500/8 p-3 min-h-100vh"},tu={class:"bg-hex-fff rounded p-3"},su={class:"border-b-1 border-hex-C9C9C9"},nu={class:"flex items-center"},lu={class:"flex items-center"},au=["onClick"],Fu={class:"border-b-1 border-hex-C9C9C9 py-2.5"},iu={class:"bg-blue-500 rounded-1/2 text-white text-xs w-2em h-2em mr-3",style:{"line-height":"2em"}},du=g(" \u6DFB\u52A0\u9009\u9879 "),cu={class:"mt-4 bg-white text-sm p-3"},ru={class:"flex justify-between h-3em items-center border-b-1 border-hex-C9C9C9"},mu=o("span",null,"\u6295\u7968\u7C7B\u578B",-1),vu={key:0,class:"flex justify-between h-3em items-center border-b-1 border-hex-C9C9C9"},Cu=o("span",null,"\u6700\u591A\u53EF\u9009",-1),pu={class:"bg-hex-ccc px-3 py-0.5 ml-2"},hu={class:"flex justify-between h-3em items-center border-b-1 border-hex-C9C9C9"},fu=o("span",null,"\u6301\u7EED\u65F6\u95F4",-1),_u={class:"flex justify-between h-3em items-center border-b-1 border-hex-C9C9C9"},bu=o("span",null,"\u533F\u540D",-1),xu={class:"mt-8"},yu=g(" \u53D1\u8D77\u6295\u7968 "),gu=H({setup(wu){const j=J(),I=K(),a=Q({voteName:"",voteNumLimit:1,duration:60,voteOption:[],spaceId:Number(j.query.id),anonymity:1});l("");const d=l([{value:""},{value:""}]),P=()=>{d.value.push({value:""})},E=u=>{d.value.length>2&&d.value.splice(u,1)},$=l([{values:["0\u5929","1\u5929","2\u5929","3\u5929","4\u5929","5\u5929","6\u5929"],defaultIndex:0},{values:["0\u5C0F\u65F6","1\u5C0F\u65F6","2\u5C0F\u65F6","3\u5C0F\u65F6","4\u5C0F\u65F6","5\u5C0F\u65F6","6\u5C0F\u65F6","7\u5C0F\u65F6","8\u5C0F\u65F6","9\u5C0F\u65F6","10\u5C0F\u65F6","11\u5C0F\u65F6","12\u5C0F\u65F6","13\u5C0F\u65F6","14\u5C0F\u65F6","15\u5C0F\u65F6","16\u5C0F\u65F6","17\u5C0F\u65F6","18\u5C0F\u65F6","19\u5C0F\u65F6","20\u5C0F\u65F6","21\u5C0F\u65F6","22\u5C0F\u65F6","23\u5C0F\u65F6"],defaultIndex:1},{values:["0\u5206\u949F","1\u5206\u949F","2\u5206\u949F","3\u5206\u949F","4\u5206\u949F","5\u5206\u949F","6\u5206\u949F","7\u5206\u949F","8\u5206\u949F","9\u5206\u949F","10\u5206\u949F","11\u5206\u949F","12\u5206\u949F","13\u5206\u949F","14\u5206\u949F","15\u5206\u949F","16\u5206\u949F","17\u5206\u949F","18\u5206\u949F","19\u5206\u949F","20\u5206\u949F","21\u5206\u949F","22\u5206\u949F","23\u5206\u949F","24\u5206\u949F","25\u5206\u949F","26\u5206\u949F","27\u5206\u949F","28\u5206\u949F","29\u5206\u949F","30\u5206\u949F","31\u5206\u949F","32\u5206\u949F","33\u5206\u949F","34\u5206\u949F","35\u5206\u949F","36\u5206\u949F","37\u5206\u949F","38\u5206\u949F","39\u5206\u949F","40\u5206\u949F","41\u5206\u949F","42\u5206\u949F","43\u5206\u949F","44\u5206\u949F","45\u5206\u949F","46\u5206\u949F","47\u5206\u949F","48\u5206\u949F","49\u5206\u949F","50\u5206\u949F","51\u5206\u949F","52\u5206\u949F","53\u5206\u949F","54\u5206\u949F","55\u5206\u949F","56\u5206\u949F","57\u5206\u949F","58\u5206\u949F","59\u5206\u949F"],defaultIndex:0}]),q=[{text:"\u5355\u9009"},{text:"\u591A\u9009"}],v=l(!1),C=l(!1),h=l("\u5355\u9009"),w=l("60\u5206\u949F"),z=u=>{w.value="";for(var e=0;e<3;e++)u[e].charAt(0)!=="0"&&(w.value+=u[e]);let n=u[0][0]==="0"?0:u[0][0],F=u[1][0]==="0"?0:u[1][0],r=u[2][0]==="0"?0:+u[2][0];u[1][0]!=="0"&&u[1][1]!="\u5C0F"&&(F=F+u[1][1]),u[2][0]!=="0"&&u[2][1]!="\u5206"&&(r=r+u[2][1]);let f=n*1440,_=F*60,p=r,m=Number(f)+Number(_)+Number(p);m!==0?(a.duration=m,C.value=!1):uu({type:"warning",message:"\u6301\u7EED\u65F6\u95F4\u4E0D\u80FD\u4E3A0",duration:1e3})},L=()=>{C.value=!1},R=u=>{h.value=u.text,v.value=!1},V=()=>{v.value=!1},c=l(2),S=()=>{c.value>2&&c.value--},Z=()=>{c.value<d.value.length&&c.value++},k=l(!0),D=l(),N=u=>{if(u==="")return"\u8F93\u5165\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A";if(!/^[\u4E00-\u9FA5A-Za-z0-9\,\(\)\[\]_\"\'\u2018\u2019\u201C\u201D\u3010\u3011\uFF08\uFF09\u3001\uFF0C]+$/.test(u))return"\u53EA\u80FD\u5305\u62EC\u9017\u53F7\u3001\u987F\u53F7\u3001\u62EC\u53F7\u3001\u5F15\u53F7\u3001\u51CF\u53F7\u3001\u4E0B\u5212\u7EBF\u3001\u6C49\u5B57\u3001\u6570\u5B57\u3001\u5B57\u6BCD\uFF01"},G=async()=>{var u;(u=D.value)==null||u.validate().then(()=>{a.voteOption.length=0,d.value.forEach(e=>{a.voteOption.push(e.value)}),k?a.anonymity=1:a.anonymity=0,h.value==="\u591A\u9009"&&(a.voteNumLimit=c.value),eu(a).then(e=>{e.code===200?(O.success({message:"\u53D1\u8D77\u6295\u7968\u6210\u529F"}),I.replace({path:"/space/manage/vote/owner_vote",query:{id:e.data}})):O({message:e.message})})})};return(u,e)=>{const n=i("van-icon"),F=i("van-field"),r=i("van-form"),f=i("van-switch"),_=i("van-button"),p=i("van-picker"),m=i("van-popup");return b(),x("div",ou,[o("div",tu,[t(r,{ref_key:"voteForm",ref:D},{default:y(()=>[o("div",su,[o("span",nu,[o("i",{class:"border border-hex-30B648 rounded-1/2 text-hex-30B648 text-sm w-2.2em h-2em",style:{"line-height":"2em"},onClick:e[0]||(e[0]=s=>E(u.index))},[t(n,{name:"records"})]),t(F,{class:"text-lg",type:"text",placeholder:"\u6295\u7968\u6807\u9898",name:"validatorMessage",rules:[{validator:N}],modelValue:U(a).voteName,"onUpdate:modelValue":e[1]||(e[1]=s=>U(a).voteName=s)},null,8,["rules","modelValue"])])]),(b(!0),x(X,null,Y(d.value,(s,A)=>(b(),x("div",{class:"border-b-1 border-hex-C9C9C9",key:s},[o("span",lu,[o("i",{class:"bg-red-500 rounded-1/2 text-white text-xs w-2.2em h-2em",style:{"line-height":"2em"},onClick:T=>E(A)},[t(n,{name:"minus"})],8,au),t(F,{modelValue:s.value,"onUpdate:modelValue":T=>s.value=T,placeholder:`\u9009\u9879${A+1}`,name:"validatorMessage",rules:[{validator:N}]},null,8,["modelValue","onUpdate:modelValue","placeholder","rules"])])]))),128))]),_:1},512),o("div",Fu,[o("span",{class:"flex items-center",onClick:P},[o("i",iu,[t(n,{name:"plus"})]),du])])]),o("div",cu,[o("div",ru,[mu,o("span",{onClick:e[2]||(e[2]=()=>{v.value=!0})},[g(B(h.value),1),t(n,{name:"arrow"})])]),h.value==="\u591A\u9009"?(b(),x("div",vu,[Cu,o("span",null,[o("span",{class:"bg-hex-ccc px-1 py-0.5",onClick:S},[t(n,{name:"minus"})]),o("span",pu,B(c.value),1),o("span",{class:"bg-hex-ccc px-1 py-0.5 ml-2",onClick:Z},[t(n,{name:"plus"})])])])):W("",!0),o("div",hu,[fu,o("span",{onClick:e[3]||(e[3]=()=>{C.value=!0})},[g(B(w.value),1),t(n,{name:"arrow"})])]),o("div",_u,[bu,o("span",null,[t(f,{modelValue:k.value,"onUpdate:modelValue":e[4]||(e[4]=s=>k.value=s),size:"1.5em"},null,8,["modelValue"])])])]),o("div",xu,[t(_,{type:"success",size:"large",onClick:G},{default:y(()=>[yu]),_:1})]),t(m,{show:v.value,"onUpdate:show":e[5]||(e[5]=s=>v.value=s),position:"bottom",style:{height:"30%"}},{default:y(()=>[t(p,{title:"\u6295\u7968\u7C7B\u578B",columns:q,onConfirm:R,onCancel:V})]),_:1},8,["show"]),t(m,{show:C.value,"onUpdate:show":e[6]||(e[6]=s=>C.value=s),position:"bottom",style:{height:"30%"}},{default:y(()=>[t(p,{title:"\u6D3B\u52A8\u65F6\u957F",columns:$.value,onConfirm:z,onCancel:L},null,8,["columns"])]),_:1},8,["show"])])}}});typeof M=="function"&&M(gu);export{gu as default};
