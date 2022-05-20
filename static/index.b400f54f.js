import{d as V,e as I,m as t,x as T,q as h,r as c,o as E,c as r,g as e,t as f,y as m,z as g,h as B,a as L,k as N,b as A,A as j,T as _,l as q}from"./app.0ce71bde.js";import{s as G}from"./index.17bc6917.js";const P={class:"p-3"},U={class:"bg-hex-F2EFF6 p-3"},W={class:"text-sm p-2 bg-hex-E0FAFB text-hex-003399 border border-hex-A6DEFB mt-3"},$={class:"mt-6"},z={key:0,class:"my-6 border w-200px mx-auto py-3 text-base rounded border-hex-4FC09C text-hex-4FC09C"},M={class:"text-3xl mt-5"},H={class:"bg-hex-F7F7F7 mt-1 text-sm text-left p-4 leading-loose"},K=j('<div class="color-hex-41AA62">\u600E\u4E48\u7B7E\u5230</div><div class="bg-hex-f7f7f7 px-4"> \u5148\u6253\u5F00WIFI\uFF08\u53EA\u9700\u8981\u6253\u5F00\uFF0C\u8FDE\u4E0D\u8FDE\u63A5\u90FD\u53EF\u4EE5\uFF09\uFF0C\u7136\u540E\u70B9\u51FB\u4E0A\u65B9\u7B7E\u5230\u6309\u94AE </div><div class="color-hex-41AA62 mt-2">\u5B9A\u4F4D\u5931\u8D25\u600E\u4E48\u529E</div><div class="bg-hex-f7f7f7 px-4"> \u786E\u4FDDWIFI\u5DF2\u7ECF\u6253\u5F00\uFF0C\u4E14\u80FD\u591F\u641C\u7D22\u5230\u5468\u56F4\u7684WIFI\u4FE1\u53F7\uFF0C\u6700\u597D\u540C\u65F6\u6253\u5F00GPS </div><div class="color-hex-41AA62 mt-2">\u591A\u6B21\u5B9A\u4F4D\u5931\u8D25\u600E\u4E48\u529E</div><div class="bg-hex-f7f7f7 px-4"> \u5982\u679C\u591A\u6B21\u7B7E\u5230\u5931\u8D25\uFF0C\u8BF7\u5BFB\u627E\u7B7E\u5230\u53D1\u8D77\u4EBA\u8FDB\u884C\u626B\u7801\u7B7E\u5230\u6216\u8005\u8865\u5F55 </div><div class="color-hex-41AA62 mt-2">\u6709\u95EE\u9898\u3001\u610F\u89C1\u3001\u5EFA\u8BAE</div><div class="bg-hex-f7f7f7 px-4"> \u5982\u679C\u5728\u4F7F\u7528\u8FC7\u7A0B\u4E2D\u6709\u4EC0\u4E48\u95EE\u9898\u3001\u610F\u89C1\u6216\u5EFA\u8BAE\uFF0C\u5E76\u4E14\u5728<a class="color-hex-0066FF">\u4F7F\u7528\u5E2E\u52A9</a>\u4E2D\u4E5F\u65E0\u6CD5\u627E\u5230\u60F3\u8981\u7684\u7ED3\u679C\u65F6 \uFF0C\u53EF\u4EE5\u901A\u8FC7<a class="color-hex-0066FF">\u7559\u8A00\u53CD\u9988</a>\u8054\u7CFB\u6211\u4EEC\uFF0C\u7559\u8A00\u65F6\u8BF7\u52A1\u5FC5\u8BF4\u660E\u5177\u4F53\u60C5\u51B5\uFF08\u5982\u7B7E\u5230\u95EE\u9898\u8BF7\u8BF4\u660E\u5F53\u524D\u65F6\u95F4\u3001\u5730\u70B9\u3001\u7B7E\u5230\u65B9\u5F0F\u7B49\u7B49\u5177\u4F53\u95EE\u9898\u63CF\u8FF0\uFF09 </div>',8),O={class:"mt-5"},J=q(" \u67E5\u770B\u66F4\u591A\u5E2E\u52A9 "),Q=V({setup(X){const D=/^\d{4}$/,b=I(),o=t(""),F=t(!1),i=t(!0),l=t(!1),y=t(T(()=>D.test(o.value)?(F.value=!0,"\u70B9\u51FB\u786E\u8BA4\u7B7E\u5230\u8FDB\u884C\u7B7E\u5230"):(F.value=!1,"\u8BF7\u8F93\u51654\u4F4D\u6709\u6548\u7684\u7B7E\u5230\u7801*^_^*")));let v=t(0),C=t(0),x=t(!0);(function(){new BMapGL.Geolocation().getCurrentPosition(function(u){this.getStatus()==BMAP_STATUS_SUCCESS?(v.value=u.point.lng,C.value=u.point.lat,x.value=!1):alert("failed"+this.getStatus())},function(u){console.warn("ERROR("+u.code+"): "+u.message)},{enableHighAccuracy:!0})})();let s=h({longitude:0,latitude:0,signCode:"",os:"windows10",browser:"chrome",ip:"127.0.0.1"}),p=h({id:0});const w=()=>{F.value&&(s.longitude=v.value,s.latitude=C.value,s.signCode=o.value,G(s).then(a=>{let{msg:u,code:n}=a;n!==200?_({message:u,duration:2e3}):n===200&&(_({message:u,duration:1e3}),p.id=a.data,i.value=!1)}))},k=function(){b.push({path:"/join/sign/detail",query:{id:p.id}})};return(a,u)=>{const n=c("van-password-input"),S=c("van-number-keyboard"),R=c("van-button");return E(),r("div",P,[e("div",U,[e("div",W,f(y.value),1),m(e("div",null,[e("div",$,[B(n,{value:o.value,mask:!1,length:4,gutter:5,focused:l.value,onFocus:u[0]||(u[0]=d=>l.value=!0)},null,8,["value","focused"]),B(S,{modelValue:o.value,"onUpdate:modelValue":u[1]||(u[1]=d=>o.value=d),show:l.value,onBlur:u[2]||(u[2]=d=>l.value=!1)},null,8,["modelValue","show"])]),L(x)?(E(),r("div",z," \u6B63\u5728\u83B7\u53D6\u4F4D\u7F6E\u4FE1\u606F\u2026\u2026 ")):(E(),r("div",{key:1,class:"my-6 border w-150px mx-auto py-3 text-xl rounded border-hex-4FC09C text-hex-4FC09C",onClick:w}," \u786E\u8BA4\u7B7E\u5230 "))],512),[[g,i.value]]),m(e("div",null,[e("div",M,f(o.value),1),e("div",{class:"my-6 border w-150px mx-auto py-3 text-xl rounded border-hex-4FC09C text-hex-4FC09C",onClick:k}," \u67E5\u770B\u7B7E\u5230\u8BB0\u5F55 ")],512),[[g,!i.value]])]),e("div",H,[K,e("div",O,[B(R,{size:"large",color:"rgb(129,185,138)"},{default:N(()=>[J]),_:1})])])])}}});typeof A=="function"&&A(Q);export{Q as default};
