import{d as N,n as q,q as _,s as L,m as B,r as u,o,c,g as s,h,F as g,i as F,a as x,k as m,b as A,A as R,l as T,t as n,p as b,j as E}from"./app.0ce71bde.js";import{d as U,f as j}from"./index.e852a593.js";const z={class:"bg-gray-500/8 p-3 min-h-100%"},M=R('<div class="bg-white text-left p-4 pb-5 text-15px rounded"><li class="flex items-center"><div class="w-5.5em"> \u2022 \u6D3B\u52A8\u540D\u79F0 </div><div class="text-13px"> \u73ED\u7EA7\u4F1A\u8BAE </div></li><li class="mt-3 flex items-center"><div class="w-5.5em"> \u2022 \u7EDF\u8BA1\u89C4\u5219 </div><div class="text-13px text-hex-41AA62"> \u7EDF\u8BA1\u7B7E\u5230\u8BB0\u5F55 </div></li><li class="mt-3 flex items-center"><div class="w-5.5em"> \u2022 \u8BF4\u660E </div><div class="text-13px text-hex-41AA62"> \u7EDF\u8BA1\u65B9\u5F0F\uFF1A\u6210\u5458\u79EF\u5206/\u603B\u79EF\u5206 </div></li></div>',1),G={class:"bg-white mt-2 border border-t-2 border-hex-ccc border-t-hex-28B648 px-2"},H={class:"flex py-2"},J={class:"flex-1"},K=T("\u5B66\u53F7/\u5DE5\u53F7"),O=s("span",{class:"flex-1"},"\u59D3\u540D",-1),P=s("span",{class:"flex-1"},"\u7EDF\u8BA1",-1),Q={class:"flex-1"},W={class:"flex-1"},X={class:"flex-1"},Y={class:"my-2 text-center"},Z={class:"text-14px text-hex-666"},$={key:0,class:"text-12px text-hex-999"},ee=N({setup(se){const v=q().query.id,d=_([]),r=_({spaceId:v,signId:""}),f=()=>{d.length=0,j(r).then(t=>{t.code===200&&d.push(...t.data)}).catch(t=>{})},a=_([]);L(()=>{f(),U({spaceId:v}).then(t=>{t.code===200&&(a.push(...t.data),a.length!==0&&a.push({name:"\u6240\u6709\u8BB0\u5F55",id:"",createTime:""}))})});const p=B(!1),y=()=>{p.value=!0},l=B(""),D=()=>{l.value=r.signId},w=()=>{r.signId=l.value,f()};return(t,i)=>{const k=u("van-icon"),C=u("van-empty"),S=u("van-radio"),V=u("van-radio-group"),I=u("van-dialog");return o(),c("div",z,[M,s("div",{class:"mt-2 bg-hex-10AA62 text-white py-2 rounded",onClick:y},"\u7B5B\u9009(\u67D0\u4E00\u6B21\u6216\u591A\u6B21\u7B7E\u5230\u8BB0\u5F55)"),s("ul",G,[s("li",H,[s("span",J,[K,h(k,{name:"sort"})]),O,P]),(o(!0),c(g,null,F(x(d),e=>(o(),c("li",{key:e,class:"flex py-2 border-t border-hex-ccc"},[s("span",Q,n(e.userId),1),s("span",W,n(e.userName),1),s("span",X,n(e.number)+" / "+n(e.total),1)]))),128))]),h(I,{show:p.value,"onUpdate:show":i[1]||(i[1]=e=>p.value=e),title:"\u7B5B\u9009","show-cancel-button":"","confirm-button-color":"rgb(63,133,255)",onConfirm:w,onCancel:D},{default:m(()=>[x(a).length===0?(o(),b(C,{key:0,description:"\u8BE5\u7A7A\u95F4\u6682\u65F6\u6CA1\u6709\u53D1\u8D77\u8FC7\u7B7E\u5230"})):E("",!0),h(V,{class:"p-3",modelValue:l.value,"onUpdate:modelValue":i[0]||(i[0]=e=>l.value=e),"checked-color":"#10AA62"},{default:m(()=>[(o(!0),c(g,null,F(x(a),e=>(o(),b(S,{key:e,name:e.id,shape:"square","icon-size":"15px",class:"flex items-center"},{default:m(()=>[s("div",Y,[s("div",Z,n(e.name),1),e.createTime!==""?(o(),c("div",$,"\uFF08"+n(e.createTime)+"\uFF09",1)):E("",!0)])]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"])]),_:1},8,["show"])])}}});typeof A=="function"&&A(ee);export{ee as default};