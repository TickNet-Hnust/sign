import{_ as C}from"./RecordsList.07db8424.js";import{d as w,s as F,n as b,m as k,r as m,o as i,c as u,g as t,t as n,a as o,h as r,k as c,F as x,i as E,b as f,D as B,l as d,y as A}from"./app.f64822d2.js";const N={class:"bg-true-gray-50 w-screen h-screen p-6"},V={class:"border-gray-200 border p-3 bg-white text-left"},z={class:"mb-3"},$=["name","onClick"],S=t("span",{class:"float-right text-gray-500"},"\xD71",-1),T={class:"text-cool-gray-500"},q={class:"text-xs my-3 text-left px-2"},M={class:"flex justify-center"},P=w({setup(j){const e=F({type:"\u62BD\u7B7E",question:"\u51AC\u5965\u4F1A2022\u5E74\u4EC0\u4E48\u65F6\u5019\u4E3E\u529E?",optionNum:3,status:"\u8FDB\u884C\u4E2D",allPollNum:8,drawingAlreadyNum:5,lastTime:"01-17 12:23",optionChecked:0,isDrawing:!1,permissions:!0,option:[{name:1,optionValue:"2\u67083\u53F7",poll:1},{name:2,optionValue:"2\u67084\u53F7",poll:4},{name:3,optionValue:"2\u67085\u53F7",poll:0}],text:b(()=>e.isDrawing?"\u5F00\u59CB\u62BD\u7B7E":"\u5DF2\u62BD\u7B7E")}),s=k(!1),_=function(){s.value=!s.value},g=()=>{e.optionChecked=Math.floor(Math.random()*3+1),e.option[e.optionChecked-1].poll=e.option[e.optionChecked-1].poll+1,e.isDrawing=!0,e.drawingAlreadyNum=e.drawingAlreadyNum+1,B.alert({title:"\u62BD\u53D6\u7ED3\u679C",message:e.option[e.optionChecked-1].optionValue,confirmButtonColor:"#0033D1"}).then(()=>{})},h="background-color: #ffffff;border-color: #E1E2E3;",D="background-color:#C8E5C9;border-color: #1FA71F;";return(L,l)=>{const p=m("van-tag"),y=m("van-button"),v=C;return i(),u("div",N,[t("div",V,[t("div",z,n(o(e).question),1),r(p,{size:"large",type:"primary",color:"#66ccff",class:"mr-3"},{default:c(()=>[d(n(o(e).status),1)]),_:1}),r(p,{size:"large",type:"primary",color:"#28b648"},{default:c(()=>[d(n("\u5DF2\u62BD"+o(e).drawingAlreadyNum+" / "+o(e).allPollNum),1)]),_:1})]),t("div",null,[(i(!0),u(x,null,E(o(e).option,a=>(i(),u("div",{key:a.name},[t("div",{class:"mt-5 text-left border p-2 text-base",name:a.name,style:A(o(e).isDrawing&&a.name===o(e).optionChecked?D:h),onClick:G=>o(e).isDrawing&&a.name===o(e).optionChecked?s.value=!0:""},[t("div",null,[t("span",null,n(a.optionValue),1),S])],12,$)]))),128))]),t("div",T,[t("div",q,n("\u622A\u6B62\u65F6\u95F4\uFF1A"+o(e).lastTime),1),t("div",M,[r(y,{type:"primary",size:"large",class:"font-400",disabled:o(e).isDrawing,color:o(e).isDrawing?"#9DD49D":"#1FA71F",onClick:l[0]||(l[0]=a=>g())},{default:c(()=>[d(n(o(e).text),1)]),_:1},8,["disabled","color"])])]),r(v,{show:s.value,type:o(e).type,onShowChange:l[1]||(l[1]=a=>_())},null,8,["show","type"])])}}});typeof f=="function"&&f(P);export{P as default};
