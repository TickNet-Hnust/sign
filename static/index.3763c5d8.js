import{g as q,_ as z}from"./record.f0f9792f.js";import{d as S,n as j,m as k,q as R,x as C,s as G,r as _,o as l,c as d,h as p,k as h,g as s,t as u,a as t,F,i as B,p as L,j as m,b as I,l as g,G as y}from"./app.0ce71bde.js";import{g as E,a as M}from"./draw.ee1302d6.js";const U={key:0,class:"bg-gray-500/8 w-screen h-screen p-3"},H=g(" \u52A0\u8F7D\u4E2D... "),J={key:1,class:"bg-gray-500/8 w-screen h-screen p-3"},K={class:"border-gray-200 border p-3 bg-white text-left rounded"},O={class:"mb-3"},Q={key:0},W=["name","onClick"],X={key:0},Y={class:"float-right text-gray-500"},Z={key:1},oo=s("span",{class:"float-right text-gray-500"},"\u5DF2\u62BD\u4E2D\u8BE5\u9879",-1),to={key:1},eo=["name","onClick"],no={class:"float-right text-gray-500"},ao=["name","onClick"],so=s("span",{class:"float-right text-gray-500"},"\u5DF2\u62BD\u4E2D\u8BE5\u9879",-1),io={class:"text-cool-gray-500"},lo={class:"text-xs my-3 text-left px-2"},uo={class:"flex justify-center"},ro={class:"my-1rem"},co=S({setup(po){const V=j(),w=k(!0),c=Number(V.query.id),o=R({type:"\u62BD\u7B7E",question:"",status:0,allPollNum:C(()=>{let a=0;return o.option.forEach(e=>{a=a+e.allPoll}),a}),drawingAlreadyNum:C(()=>{let a=0;return o.option.forEach(e=>{a=a+e.lastPoll}),o.allPollNum-a}),endTime:"",optionChecked:0,optionCheckedValue:"",isDrawing:0,isVisible:1,option:[{optionId:0,optionValue:"",allPoll:0,lastPoll:0}],text:C(()=>o.status===0?o.isDrawing?"\u5DF2\u62BD\u7B7E":"\u5F00\u59CB\u62BD\u7B7E":o.isDrawing?"\u5DF2\u62BD\u7B7E":"\u5DF2\u7ED3\u675F")});G(()=>{window.scrollTo(0,0),q(c).then(a=>{o.question=a.data.drawName,o.endTime=a.data.endTime,o.status=a.data.status,o.isVisible=a.data.visible,o.isDrawing=a.data.attend,o.optionChecked=a.data.attend?a.data.optionId:0,o.option.pop();for(let e=0;e<a.data.optionContent.length;e++){const i={optionId:e+1,optionValue:a.data.optionContent[e],allPoll:a.data.optionNum[e],lastPoll:0};o.option.push(i)}for(let e=0;e<a.data.optionContent.length;e++)o.option[e].optionValue===a.data.optionId&&(o.optionChecked=e+1,o.optionCheckedValue=o.option[e].optionValue);E(c).then(e=>{for(let i=0;i<e.data.length;i++)o.option[i].lastPoll=e.data[i];w.value=!1})})});const r=k(!1),N=function(){r.value=!r.value},f=k(!1),P=()=>{M(c).then(a=>{o.isDrawing=1,o.optionCheckedValue=a.data;for(let e=0;e<o.option.length;e++)o.option[e].optionValue===a.data&&(o.optionChecked=o.option[e].optionId);f.value=!0,E(c).then(e=>{for(let i=0;i<e.data.length;i++)o.option[i].lastPoll=e.data[i]})})},v="background-color: #ffffff;border-color: #E1E2E3;",D="background-color:#C8E5C9;border-color: #1FA71F;";return(a,e)=>{const i=_("van-loading"),x=_("van-tag"),A=_("van-button"),T=_("van-dialog"),$=z;return w.value?(l(),d("div",U,[p(i,{size:"24px"},{default:h(()=>[H]),_:1})])):(l(),d("div",J,[s("div",K,[s("div",O,u(t(o).question),1),p(x,{size:"medium",type:"primary",color:t(o).status?"#C9C9C9":"#66ccff",class:"mr-3"},{default:h(()=>[g(u(t(o).status?"\u5DF2\u7ED3\u675F":"\u8FDB\u884C\u4E2D"),1)]),_:1},8,["color"]),p(x,{size:"medium",type:"primary",color:"#28b648"},{default:h(()=>[g(u("\u5DF2\u62BD"+t(o).drawingAlreadyNum+" / "+t(o).allPollNum),1)]),_:1})]),t(o).isVisible?(l(),d("div",Q,[(l(!0),d(F,null,B(t(o).option,n=>(l(),d("div",{key:n.optionId},[s("div",{class:"mt-4 text-left border p-2.5 text-sm rounded",name:n.optionId,style:y(t(o).isDrawing&&n.optionId===t(o).optionChecked?D:v),onClick:b=>t(o).isDrawing&&n.optionId===t(o).optionChecked?r.value=!0:""},[t(o).optionChecked!==n.optionId?(l(),d("div",X,[s("span",null,u(n.optionValue),1),s("span",Y,"\xD7"+u(n.lastPoll),1)])):t(o).optionChecked===n.optionId?(l(),d("div",Z,[s("span",null,u(n.optionValue),1),oo])):m("",!0)],12,W)]))),128))])):(l(),d("div",to,[(l(!0),d(F,null,B(t(o).option,n=>(l(),d("div",{key:n.optionId},[t(o).isDrawing===0?(l(),d("div",{key:0,class:"mt-4 text-left border p-2.5 text-sm rounded",name:n.optionId,style:y(t(o).isDrawing&&n.optionId===t(o).optionChecked?D:v),onClick:b=>t(o).isDrawing&&n.optionId===t(o).optionChecked?r.value=!0:""},[s("div",null,[s("span",null,"\u9009\u9879"+u(n.optionId),1),s("span",no,"\xD7"+u(n.lastPoll),1)])],12,eo)):t(o).optionChecked===n.optionId?(l(),d("div",{key:1,class:"mt-4 text-left border p-2.5 text-sm rounded",name:n.optionId,style:y(t(o).isDrawing&&n.optionId===t(o).optionChecked?D:v),onClick:b=>t(o).isDrawing&&n.optionId===t(o).optionChecked?r.value=!0:""},[s("div",null,[s("span",null,u(n.optionValue),1),so])],12,ao)):m("",!0)]))),128))])),s("div",io,[s("div",lo,u("\u622A\u6B62\u65F6\u95F4\uFF1A"+t(o).endTime),1)]),s("div",uo,[p(A,{type:"primary",size:"large",class:"font-400",disabled:t(o).status===1||t(o).isDrawing===1,color:t(o).status===1||t(o).isDrawing===1?"#9DD49D":"#1FA71F",onClick:e[0]||(e[0]=n=>P())},{default:h(()=>[g(u(t(o).text),1)]),_:1},8,["disabled","color"])]),p(T,{show:f.value,"onUpdate:show":e[1]||(e[1]=n=>f.value=n),title:"\u62BD\u53D6\u7ED3\u679C","confirm-button-color":"#0033CC"},{default:h(()=>[s("div",ro,u(t(o).optionCheckedValue),1)]),_:1},8,["show"]),t(o).optionChecked?(l(),L($,{key:2,show:r.value,type:t(o).type,"active-id":t(c),"option-checked-value":t(o).option[t(o).optionChecked-1].optionValue,onShowChange:e[2]||(e[2]=n=>N())},null,8,["show","type","active-id","option-checked-value"])):m("",!0)]))}}});typeof I=="function"&&I(co);export{co as default};
