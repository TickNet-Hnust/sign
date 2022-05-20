import{a as L,b as q,_ as S}from"./record.f0f9792f.js";import{d as W,n as P,m as y,q as C,x as g,s as R,r as u,o as d,c as r,h as p,k as h,g as a,t as i,a as s,F as w,i as j,b as V,H as G,l as _,p as H,G as F,j as I}from"./app.0ce71bde.js";import"./draw.ee1302d6.js";const M={key:0,class:"w-screen h-screen bg-gray-500/8 p-3"},O=_(" \u52A0\u8F7D\u4E2D... "),U={key:1,class:"w-screen h-screen"},J={class:"p-3 bg-gray-500/8"},K={class:"p-3 text-left border border-gray-200 bg-white rounded"},Q={class:"mb-2"},X={key:0,class:"mt-4 border-gray-200 border p-10px bg-white rounded text-sm"},Y={key:1},Z={class:"text-dark-900 left-3 relative w-40px leading-40px text-sm"},ee={class:"absolute right-50px leading-40px text-xs text-cool-gray-400"},te={key:1,class:"mt-4 border-true-gray-200 border rounded"},oe={class:"text-dark-900 left-10px relative w-40px leading-40px text-sm"},se={class:"absolute right-50px leading-40px text-sm text-cool-gray-400"},ne={key:2,class:"mt-4 border-true-gray-200 border h-42px text-dark-900 text-left bg-light-50 rounded"},ae={class:"leading-40px m-10px text-sm"},ie={class:"absolute right-50px leading-20px text-xs text-cool-gray-400 pt-10px"},le={class:"text-cool-gray-500"},de={class:"text-xs mt-15px text-left"},re=W({setup(ce){const N=P(),m=Number(N.query.id),f=y(!0),v=C({endDate:"",endTime:""}),e=C({type:"\u6295\u7968",status:1,question:"",voteNumLimit:1,endTime:"",isVote:0,optionChecked:[],option:[],text:g(()=>e.isVote?"\u5DF2\u6295\u7968":e.status?"\u5DF2\u7ED3\u675F":"\u5F00\u59CB\u6295\u7968"),optionWidth:g(()=>{const t=[];return e.option.forEach(o=>{t.push(`${o.poll*100/e.allPollNum}%`)}),t}),allPollNum:g(()=>{let t=0;return e.option.forEach(o=>{t=t+o.poll}),t})});R(()=>{window.scrollTo(0,0),L(m).then(t=>{console.warn(t.data),e.question=t.data.voteName,e.status=t.data.status,e.endTime=t.data.endTime,e.isVote=t.data.attend,e.voteNumLimit=t.data.voteNumLimit,v.endDate=e.endTime.split(" ")[0],v.endTime=`${e.endTime.split(" ")[1].split(":")[0]}:${e.endTime.split(" ")[1].split(":")[1]}`,console.warn(v);let o=1;e.option.pop();for(const l in t.data.voteNums){const c={id:o,optionValue:l,poll:t.data.voteNums[l]};e.option.push(c),o=o+1}o=1,t.data.presentChoices!==null&&t.data.presentChoices.forEach(l=>{for(const c of e.option)c.optionValue===l&&e.optionChecked.push(c.id)}),f.value=!1})});const x=y(!1),D=function(){x.value=!x},b=function(t){let o=!1;return e.optionChecked.forEach(l=>{l===t&&(o=!0)}),o},E=()=>{const t=[];console.warn(e.optionChecked),e.optionChecked.length===0?G.alert({message:"\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u9009\u9879\uFF01"}).then(()=>{}):(e.optionChecked.forEach(o=>{const l=e.option[o-1].optionValue;t.push(l)}),q(m,t).then(o=>{e.isVote=1}))};return(t,o)=>{const l=u("van-loading"),c=u("van-tag"),T=u("van-checkbox"),B=u("van-icon"),A=u("van-checkbox-group"),$=u("van-button"),z=S;return d(),r(w,null,[f.value?(d(),r("div",M,[p(l,{size:"24px"},{default:h(()=>[O]),_:1})])):(d(),r("div",U,[a("div",J,[a("div",K,[a("div",Q,i(s(e).question),1),p(c,{type:"primary",color:"#28B648",size:"medium"},{default:h(()=>[_(i(s(e).voteNumLimit>1?"\u591A\u9009":"\u5355\u9009"),1)]),_:1})]),a("div",null,[(d(!0),r(w,null,j(s(e).option,n=>(d(),H(A,{key:n.id,modelValue:s(e).optionChecked,"onUpdate:modelValue":o[1]||(o[1]=k=>s(e).optionChecked=k),max:s(e).voteNumLimit},{default:h(()=>[s(e).isVote===0&&s(e).status===0?(d(),r("div",X,[p(T,{name:n.id,"checked-color":"#dde1e3","icon-size":"16px"},{default:h(()=>[_(i(n.optionValue),1)]),_:2},1032,["name"])])):(d(),r("div",Y,[b(n.id)?(d(),r("div",{key:0,class:"mt-4 h-42px bg-light-50 border rounded",style:{"border-color":"#1FA71F"},onClick:o[0]||(o[0]=k=>x.value=!0)},[a("div",{class:"border-none h-40px leading-40px text-left flex",style:F([{width:s(e).optionWidth[n.id-1]},{"white-space":"nowrap","background-color":"#C8E5C9"}])},[p(B,{name:"checked",color:"green",size:"1.25em",class:"relative left-10px leading-40px"}),a("div",Z,i(n.optionValue),1),a("span",ee,i(n.poll+"\u7968"),1)],4)])):n.poll>0&&!b(n.id)?(d(),r("div",te,[a("div",{class:"border-none h-40px bg-gray-300 leading-40px text-left",style:F([{width:s(e).optionWidth[n.id-1]},{"white-space":"nowrap"}])},[a("div",oe,i(n.optionValue),1),a("span",se,i(n.poll+"\u7968"),1)],4)])):n.poll===0?(d(),r("div",ne,[a("span",ae,i(n.optionValue),1),a("span",ie,i(n.poll+"\u7968"),1)])):I("",!0)]))]),_:2},1032,["modelValue","max"]))),128))]),a("div",le,[a("div",de,i("\u622A\u6B62\u65F6\u95F4\uFF1A"+s(e).endTime),1),p($,{type:"primary",size:"large",color:s(e).isVote||s(e).status?"#9DD49D":"#1FA71F",class:"my-10px rounded",disabled:s(e).isVote===1||s(e).status===1,onClick:o[2]||(o[2]=n=>E())},{default:h(()=>[_(i(s(e).text),1)]),_:1},8,["color","disabled"])])])])),p(z,{show:x.value,type:s(e).type,"active-id":s(m),onShowChange:o[3]||(o[3]=n=>D())},null,8,["show","type","active-id"])],64)}}});typeof V=="function"&&V(re);export{re as default};