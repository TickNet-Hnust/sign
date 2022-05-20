import{g as j,_ as M}from"./record.f0f9792f.js";import{d as G,n as L,e as U,m as f,q as H,x as D,s as J,r as h,o as l,c as d,h as c,k as _,g as s,t as u,a as e,F,i as I,p as K,j as k,b as V,l as m,G as C}from"./app.0ce71bde.js";import{g as N,a as O}from"./draw.ee1302d6.js";const Q={key:0,class:"bg-gray-500/8 w-screen h-screen p-3"},W=m(" \u52A0\u8F7D\u4E2D... "),X={key:1,class:"bg-gray-500/8 w-screen h-screen p-3"},Y={class:"border-gray-200 border p-3 bg-white text-left rounded"},Z={class:"mb-3"},oo={key:0},to=["name","onClick"],eo={key:0},no={class:"float-right text-gray-500"},ao={key:1},so=s("span",{class:"float-right text-gray-500"},"\u5DF2\u62BD\u4E2D\u8BE5\u9879",-1),io={key:1},lo=["name","onClick"],uo={class:"float-right text-gray-500"},ro=["name","onClick"],co=s("span",{class:"float-right text-gray-500"},"\u5DF2\u62BD\u4E2D\u8BE5\u9879",-1),po={class:"text-cool-gray-500"},ho={class:"text-xs my-3 text-left px-2"},_o={class:"flex justify-center"},mo={class:"flex justify-left my-5 text-sm"},go={class:"border-gray-300 bg-white p-4 w-30"},vo=s("div",null,"\u62BD\u7B7E\u8BB0\u5F55",-1),yo={class:"border-gray-300 bg-white p-4 ml-2 w-30"},fo=s("div",null,"\u4FEE\u6539\u90E8\u5206\u8BBE\u7F6E",-1),Do={class:"my-1rem"},ko=G({setup(Co){const P=L(),w=U(),b=f(!0),r=Number(P.query.id),o=H({type:"\u62BD\u7B7E",anonymity:0,question:"",status:0,allPollNum:D(()=>{let n=0;return o.option.forEach(t=>{n=n+t.allPoll}),n}),drawingAlreadyNum:D(()=>{let n=0;return o.option.forEach(t=>{n=n+t.lastPoll}),o.allPollNum-n}),endTime:"",createTime:"",optionChecked:0,optionCheckedValue:"",isDrawing:0,isVisible:1,option:[{optionId:0,optionValue:"",allPoll:0,lastPoll:0}],text:D(()=>o.status===0?o.isDrawing?"\u5DF2\u62BD\u7B7E":"\u5F00\u59CB\u62BD\u7B7E":o.isDrawing?"\u5DF2\u62BD\u7B7E":"\u5DF2\u7ED3\u675F")});J(()=>{window.scrollTo(0,0),j(r).then(n=>{console.warn(n),o.question=n.data.drawName,o.anonymity=n.data.anonymity,o.createTime=n.data.createTime,o.endTime=n.data.endTime,o.status=n.data.status,o.isVisible=n.data.visible,o.isDrawing=n.data.attend,o.optionChecked=n.data.attend?n.data.optionId:0,o.option.pop();for(let t=0;t<n.data.optionContent.length;t++){const i={optionId:t+1,optionValue:n.data.optionContent[t],allPoll:n.data.optionNum[t],lastPoll:0};o.option.push(i)}for(let t=0;t<n.data.optionContent.length;t++)o.option[t].optionValue===n.data.optionId&&(o.optionChecked=t+1,o.optionCheckedValue=o.option[t].optionValue);N(r).then(t=>{for(let i=0;i<t.data.length;i++)o.option[i].lastPoll=t.data[i];b.value=!1})})});const p=f(!1),T=function(){p.value=!p.value},g=f(!1),$=()=>{O(r).then(n=>{o.isDrawing=1,o.optionCheckedValue=n.data;for(let t=0;t<o.option.length;t++)o.option[t].optionValue===n.data&&(o.optionChecked=o.option[t].optionId);g.value=!0,N(r).then(t=>{for(let i=0;i<t.data.length;i++)o.option[i].lastPoll=t.data[i]})})},v="background-color: #ffffff;border-color: #E1E2E3;",y="background-color:#C8E5C9;border-color: #1FA71F;",q=()=>{w.push({path:"/record/sortitionRecord",query:{id:r}})},z=()=>{w.push({path:"/space/manage/draw/owner_draw/modify",query:{id:r,anonymity:o.anonymity}})};return(n,t)=>{const i=h("van-loading"),x=h("van-tag"),A=h("van-button"),B=h("van-icon"),R=h("van-dialog"),S=M;return b.value?(l(),d("div",Q,[c(i,{size:"24px"},{default:_(()=>[W]),_:1})])):(l(),d("div",X,[s("div",Y,[s("div",Z,u(e(o).question),1),c(x,{size:"medium",type:"primary",color:e(o).status?"#C9C9C9":"#66ccff",class:"mr-3"},{default:_(()=>[m(u(e(o).status?"\u5DF2\u7ED3\u675F":"\u8FDB\u884C\u4E2D"),1)]),_:1},8,["color"]),c(x,{size:"medium",type:"primary",color:"#28b648"},{default:_(()=>[m(u("\u5DF2\u62BD"+e(o).drawingAlreadyNum+" / "+e(o).allPollNum),1)]),_:1})]),e(o).isVisible?(l(),d("div",oo,[(l(!0),d(F,null,I(e(o).option,a=>(l(),d("div",{key:a.optionId},[s("div",{class:"mt-4 text-left border p-2.5 text-sm rounded",name:a.optionId,style:C(e(o).isDrawing&&a.optionId===e(o).optionChecked?y:v),onClick:E=>e(o).isDrawing&&a.optionId===e(o).optionChecked?p.value=!0:""},[e(o).optionChecked!==a.optionId?(l(),d("div",eo,[s("span",null,u(a.optionValue),1),s("span",no,"\xD7"+u(a.lastPoll),1)])):e(o).optionChecked===a.optionId?(l(),d("div",ao,[s("span",null,u(a.optionValue),1),so])):k("",!0)],12,to)]))),128))])):(l(),d("div",io,[(l(!0),d(F,null,I(e(o).option,a=>(l(),d("div",{key:a.optionId},[e(o).isDrawing===0?(l(),d("div",{key:0,class:"mt-4 text-left border p-2.5 text-sm rounded",name:a.optionId,style:C(e(o).isDrawing&&a.optionId===e(o).optionChecked?y:v),onClick:E=>e(o).isDrawing&&a.optionId===e(o).optionChecked?p.value=!0:""},[s("div",null,[s("span",null,"\u9009\u9879"+u(a.optionId),1),s("span",uo,"\xD7"+u(a.lastPoll),1)])],12,lo)):e(o).optionChecked===a.optionId?(l(),d("div",{key:1,class:"mt-4 text-left border p-2.5 text-sm rounded",name:a.optionId,style:C(e(o).isDrawing&&a.optionId===e(o).optionChecked?y:v),onClick:E=>e(o).isDrawing&&a.optionId===e(o).optionChecked?p.value=!0:""},[s("div",null,[s("span",null,u(a.optionValue),1),co])],12,ro)):k("",!0)]))),128))])),s("div",po,[s("div",ho,u("\u622A\u6B62\u65F6\u95F4\uFF1A"+e(o).endTime),1)]),s("div",_o,[c(A,{type:"primary",size:"large",class:"font-400",disabled:e(o).status===1||e(o).isDrawing===1,color:e(o).status===1||e(o).isDrawing===1?"#9DD49D":"#1FA71F",onClick:t[0]||(t[0]=a=>$())},{default:_(()=>[m(u(e(o).text),1)]),_:1},8,["disabled","color"])]),s("div",mo,[s("div",go,[s("div",{onClick:t[1]||(t[1]=a=>q())},[c(B,{name:"records",size:"2rem",class:"mb-2"}),vo])]),s("span",yo,[s("div",{onClick:t[2]||(t[2]=a=>z())},[c(B,{name:"setting-o",size:"2rem",class:"mb-2"}),fo])])]),c(R,{show:g.value,"onUpdate:show":t[3]||(t[3]=a=>g.value=a),title:"\u62BD\u53D6\u7ED3\u679C","confirm-button-color":"#0033CC"},{default:_(()=>[s("div",Do,u(e(o).optionCheckedValue),1)]),_:1},8,["show"]),e(o).optionChecked?(l(),K(S,{key:2,show:p.value,type:e(o).type,"active-id":e(r),"option-checked-value":e(o).option[e(o).optionChecked-1].optionValue,onShowChange:t[4]||(t[4]=a=>T())},null,8,["show","type","active-id","option-checked-value"])):k("",!0)]))}}});typeof V=="function"&&V(ko);export{ko as default};
