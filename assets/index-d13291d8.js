import{A as W,_ as X,T as te,u as Q,j as n,C as we,a as ye,b as he,c as ve,d as le,D as xe,e as be,i as U,h as je,P as Ce,k as Se,l as Te,m as Ee,I as F,n as ke,o as Me,p as Re,g as Ie,q as _e,r as Be,s as Le,t as $e,M as De,v as Ae,w as Oe}from"./index-d43e70b1.js";import{F as ze,g as Ne,M as He}from"./monaco-1e384486.js";var qe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 00308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 00-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"}}]},name:"code",theme:"outlined"};const Pe=qe,de=window.React;var Ve=function(t,e){return de.createElement(W,X({},t,{ref:e,icon:Pe}))},Ke=de.forwardRef(Ve);const Ue=Ke;var Fe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"}}]},name:"copy",theme:"outlined"};const Ye=Fe,ue=window.React;var Ge=function(t,e){return ue.createElement(W,X({},t,{ref:e,icon:Ye}))},Ze=ue.forwardRef(Ge);const Je=Ze;var We={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"unordered-list",theme:"outlined"};const Xe=We,fe=window.React;var Qe=function(t,e){return fe.createElement(W,X({},t,{ref:e,icon:Xe}))},et=fe.forwardRef(Qe);const tt=et,nt=window.antd.Layout,ot=window.antd.Space,at=window.antd.Tooltip,st=window.antd.Tree,rt=window.antd.Typography,ct=window.antd.theme,ne=window._.map,oe=window.React.useEffect,L=window.React.useState,{Sider:it}=nt,{Text:lt}=rt,{useToken:dt}=ct,ut=r=>{const{data:t}=r,[e,i]=L(JSON.parse(window.localStorage.getItem(te)||"false")),[o,a]=L([]),[c,l]=L([]),[u,s]=L(!0),[d,f]=L([]),[S,m]=L([]),{token:v}=dt(),{t:I}=Q(),j=()=>{document.querySelector(`[id="${window.location.hash.slice(1)}"]`)?.scrollIntoView(),document.querySelector(".ant-tree-node-selected")?.scrollIntoView(),f([window.location.hash.slice(1)])};return oe(()=>{(async()=>{const x=await he(t);l(x.treeData),a(x.list),m(ne(x.list,"slug"))})(),setTimeout(()=>{j()},500)},[l,a,m]),oe(()=>(window.addEventListener("hashchange",j),()=>{window.removeEventListener("hashchange",j)}),[f]),o.length?n.jsxs(it,{theme:"light",collapsible:!0,reverseArrow:!0,collapsedWidth:0,collapsed:e,onCollapse:y=>{i(y),window.localStorage.setItem(te,JSON.stringify(y))},width:300,style:{position:"sticky",top:0,zIndex:1,marginLeft:12,height:"100vh",overflowY:"auto",borderRight:e?"none":`1px solid ${v.colorBorderSecondary}`},zeroWidthTriggerStyle:{position:"fixed",top:"calc(50% - 22px)",insetInlineStart:"auto",insetInlineEnd:e?0:300+12/2,width:12,height:44,fontSize:12,border:`1px solid ${v.colorBorderSecondary}`,borderRadius:e?"6px 0 0 6px":6,overflow:"hidden"},trigger:e?n.jsx(we,{}):n.jsx(ye,{}),children:[n.jsx("div",{style:{padding:"6px 10px 6px 28px",marginBottom:v.paddingContentVertical,background:v.colorBgBase,borderBottom:`1px solid ${v.colorBorderSecondary}`},children:n.jsxs(ot,{children:[n.jsx(lt,{strong:!0,style:{lineHeight:"20px"},children:I("toc")}),n.jsx(at,{title:u?"全部折叠":"全部展开",children:n.jsx(tt,{onClick:()=>{m(u?[]:ne(o,"slug")),s(!u)}})})]})}),n.jsx(st,{treeData:c,selectedKeys:d,expandedKeys:S,onSelect:y=>{y[0]&&(window.location.hash=y[0])},onExpand:y=>{m(y)}})]}):null};function ft(r,t,e,i){function o(a){return a instanceof e?a:new e(function(c){c(a)})}return new(e||(e=Promise))(function(a,c){function l(d){try{s(i.next(d))}catch(f){c(f)}}function u(d){try{s(i.throw(d))}catch(f){c(f)}}function s(d){d.done?a(d.value):o(d.value).then(l,u)}s((i=i.apply(r,t||[])).next())})}function mt(r,t){var e={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},i,o,a,c;return c={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(c[Symbol.iterator]=function(){return this}),c;function l(s){return function(d){return u([s,d])}}function u(s){if(i)throw new TypeError("Generator is already executing.");for(;c&&(c=0,s[0]&&(e=0)),e;)try{if(i=1,o&&(a=s[0]&2?o.return:s[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,s[1])).done)return a;switch(o=0,a&&(s=[s[0]&2,a.value]),s[0]){case 0:case 1:a=s;break;case 4:return e.label++,{value:s[1],done:!1};case 5:e.label++,o=s[1],s=[0];continue;case 7:s=e.ops.pop(),e.trys.pop();continue;default:if(a=e.trys,!(a=a.length>0&&a[a.length-1])&&(s[0]===6||s[0]===2)){e=0;continue}if(s[0]===3&&(!a||s[1]>a[0]&&s[1]<a[3])){e.label=s[1];break}if(s[0]===6&&e.label<a[1]){e.label=a[1],a=s;break}if(a&&e.label<a[2]){e.label=a[2],e.ops.push(s);break}a[2]&&e.ops.pop(),e.trys.pop();continue}s=t.call(r,e)}catch(d){s=[6,d],o=0}finally{i=a=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}}var gt=function(r){return typeof r=="function"};const pt=window.React.useEffect;function wt(r){return gt(r[Symbol.asyncIterator])}function yt(r,t){pt(function(){var e=r(),i=!1;function o(){return ft(this,void 0,void 0,function(){var a;return mt(this,function(c){switch(c.label){case 0:if(!wt(e))return[3,4];c.label=1;case 1:return[4,e.next()];case 2:return a=c.sent(),a.done||i?[3,3]:[3,1];case 3:return[3,6];case 4:return[4,e];case 5:c.sent(),c.label=6;case 6:return[2]}})})}return o(),function(){i=!0}},t)}var ht=function(){var r=document.getSelection();if(!r.rangeCount)return function(){};for(var t=document.activeElement,e=[],i=0;i<r.rangeCount;i++)e.push(r.getRangeAt(i));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return r.removeAllRanges(),function(){r.type==="Caret"&&r.removeAllRanges(),r.rangeCount||e.forEach(function(o){r.addRange(o)}),t&&t.focus()}},vt=ht,ae={"text/plain":"Text","text/html":"Url",default:"Text"},xt="Copy to clipboard: #{key}, Enter";function bt(r){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return r.replace(/#{\s*key\s*}/g,t)}function jt(r,t){var e,i,o,a,c,l,u=!1;t||(t={}),e=t.debug||!1;try{o=vt(),a=document.createRange(),c=document.getSelection(),l=document.createElement("span"),l.textContent=r,l.ariaHidden="true",l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(d){if(d.stopPropagation(),t.format)if(d.preventDefault(),typeof d.clipboardData>"u"){e&&console.warn("unable to use e.clipboardData"),e&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var f=ae[t.format]||ae.default;window.clipboardData.setData(f,r)}else d.clipboardData.clearData(),d.clipboardData.setData(t.format,r);t.onCopy&&(d.preventDefault(),t.onCopy(d.clipboardData))}),document.body.appendChild(l),a.selectNodeContents(l),c.addRange(a);var s=document.execCommand("copy");if(!s)throw new Error("copy command was unsuccessful");u=!0}catch(d){e&&console.error("unable to copy using execCommand: ",d),e&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",r),t.onCopy&&t.onCopy(window.clipboardData),u=!0}catch(f){e&&console.error("unable to copy using clipboardData: ",f),e&&console.error("falling back to prompt"),i=bt("message"in t?t.message:xt),window.prompt(i,r)}}finally{c&&(typeof c.removeRange=="function"?c.removeRange(a):c.removeAllRanges()),l&&document.body.removeChild(l),o()}return u}var Ct=jt;const me=ve(Ct),St=()=>n.jsx("svg",{viewBox:"0 0 200 117",style:{width:16},children:n.jsx("path",{fill:"currentColor",d:"M59.688 2.578c-3.438-3.437-8.438-3.437-11.563 0L3.75 48.516c-5 5.937-5 14.062 0 19.062l44.063 45.938c1.562 1.562 4.062 2.5 5.937 2.5s4.063-.938 5.938-2.5c3.437-3.438 3.437-8.438 0-11.563l-42.5-43.437 42.5-44.063c3.437-3.437 3.437-8.437 0-11.875Zm135.937 45.938L151.25 2.578c-3.438-3.437-8.438-3.437-11.563 0-3.125 3.438-3.437 8.438 0 11.563l42.5 44.375-42.5 44.062c-3.437 3.438-3.437 8.438 0 11.563 1.563 1.562 3.438 2.5 5.938 2.5 2.5 0 4.063-.938 5.938-2.5l44.062-45.938c5.625-5.625 5.625-13.75 0-19.687Zm-75.938-45c-4.062-1.563-9.062.937-10.937 5l-34.063 95c-1.562 4.062.938 9.062 5 10.937.938 0 1.563.938 2.5.938 3.438 0 6.563-2.5 7.5-5.938l35-95.937c1.563-4.063-.937-9.063-5-10Z"})}),Tt=()=>n.jsx("svg",{viewBox:"0 0 200 117",style:{width:16},children:n.jsx("path",{fill:"currentColor",d:"M59.688 2.578c-3.438-3.437-8.438-3.437-11.563 0L3.75 48.516c-5 5.937-5 14.062 0 19.062l44.063 45.938c1.562 1.562 4.062 2.5 5.937 2.5s4.063-.938 5.938-2.5c3.437-3.438 3.437-8.438 0-11.563l-42.5-43.437 42.5-44.063c3.437-3.437 3.437-8.437 0-11.875Zm135.937 45.938L151.25 2.578c-3.438-3.437-8.438-3.437-11.563 0-3.125 3.438-3.437 8.438 0 11.563l42.5 44.375-42.5 44.062c-3.437 3.438-3.437 8.438 0 11.563 1.563 1.562 3.438 2.5 5.938 2.5 2.5 0 4.063-.938 5.938-2.5l44.062-45.938c5.625-5.625 5.625-13.75 0-19.687Z"})}),B={"playground-container":"_playground-container_qdqya_1","playground-container-open":"_playground-container-open_qdqya_5","playground-container-files":"_playground-container-files_qdqya_5","playground-container-source-code":"_playground-container-source-code_qdqya_6","playground-container-demo":"_playground-container-demo_qdqya_9","playground-container-meta":"_playground-container-meta_qdqya_23","playground-container-actions":"_playground-container-actions_qdqya_23"},Y=window.antd.Button,Et=window.antd.ConfigProvider,se=window.antd.Radio,kt=window.antd.Result,Mt=window.antd.Space,Rt=window.antd.Spin,It=window.antd.Tag,G=window.antd.Tooltip,_t=window.antd.message,ge=window.antd.theme,Bt=window._.isUndefined,D=window.React.useEffect,Lt=window.React.useRef,R=window.React.useState,{defaultAlgorithm:$t,darkAlgorithm:Dt}=ge,At=window.localStorage.getItem(le)||xe,Ot=({id:r})=>{const{t}=Q(),e=Lt(null),[i,o]=R(!0),[a,c]=R(null),[l,u]=R(0),[s,d]=R(!1),[f,S]=R([]),[m,v]=R(0),[I,j]=R(""),[y,x]=_t.useMessage();D(()=>{const g=h=>{if(h.data?.type!=="playground")return;const{id:w,eventName:p,initializedTime:C}=h.data;w===r&&(p==="initialized"&&(u(C),o(!1)),p==="error"&&(c(h.data.error),u(C),o(!1)))};return window.addEventListener("message",g,!1),()=>{window.removeEventListener("message",g,!1)}},[]),D(()=>{const{html:g,css:h,cssType:w,js:p}=Ce.get(r),C=[];p&&C.push({value:"js",label:"js",content:p,icon:F.JavaScript}),h&&C.push({value:w,label:w,content:h,icon:F.Css}),g&&C.push({value:"html",label:"html",content:g,icon:F.Html}),S(C)},[]),D(()=>{const g=Se(r);e.current.appendChild(g)},[r]),yt(async()=>{if(!s)return;const{value:g,content:h}=f[m],{default:w}=await ke(()=>import("./core-916879f1.js"),["assets/core-916879f1.js","assets/index-d43e70b1.js","assets/index-dedc2444.css"]);await Me(w,g);const p=await Re(h,g);j(p)},[s,m]);const{token:T}=ge.useToken(),{colorBorderSecondary:E}=T,k=l<500?"success":l<1e3?"warning":"error";return n.jsxs("div",{className:Te("playground-container",B["playground-container"],{[B["playground-container-open"]]:s}),style:{borderColor:E},children:[n.jsx(Rt,{spinning:i,tip:"Loading...",children:n.jsx("div",{className:B["playground-container-demo"],ref:e,style:{display:a?"none":"block"}})}),!i&&a&&n.jsx(kt,{status:"error",title:a.name,children:n.jsx("pre",{style:{margin:0},children:a.message})}),n.jsxs("div",{className:B["playground-container-meta"],children:[n.jsxs("div",{className:B["playground-container-actions"],style:{borderColor:E},children:[n.jsx("div",{className:B["playground-container-files"],children:n.jsx(se.Group,{value:m,onChange:g=>{v(g.target.value)},children:f.map((g,h)=>{const{label:w,icon:p}=g;return n.jsxs(se.Button,{value:h,children:[p,w]},h)})})}),n.jsxs(Mt,{children:[!!l&&n.jsx(It,{color:k,style:{marginRight:0,marginBottom:5},children:[l,"ms"].join(" ")}),n.jsx(G,{title:t("fullscreen"),children:n.jsx(Y,{type:"text",icon:n.jsx(ze,{}),onClick:()=>{e.current.requestFullscreen()}})}),s&&n.jsx(G,{title:"复制代码",children:n.jsx(Y,{type:"text",icon:n.jsx(Je,{}),onClick:()=>{me(f[m].content),y.success(t("copied"))}})}),n.jsx(G,{title:t(s?"collapse_code":"expand_code"),children:n.jsx(Y,{type:"text",icon:s?n.jsx(Tt,{}):n.jsx(St,{}),onClick:()=>{d(!s)}})})]})]}),n.jsx("div",{className:B["playground-container-source-code"],style:{borderColor:E},children:n.jsx("div",{dangerouslySetInnerHTML:{__html:I}})})]}),x]})},zt=({id:r})=>{const[t,e]=R(At),[i,o]=R(),a=c=>{e(c),c!==Ee.SYSTEM&&o(U(c))};return D(()=>{be(()=>{o(U(t))})},[o]),D(()=>{o(U(t))},[o]),D(()=>(je.on(le,a),()=>{}),[e,o]),Bt(i)?null:n.jsx(Et,{theme:{algorithm:i?Dt:$t},children:n.jsx(Ot,{id:r},i)})};/**
 * filesize
 *
 * @copyright 2022 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 8.0.7
 */const Nt=/^(b|B)$/,re={iec:{bits:["bit","Kibit","Mibit","Gibit","Tibit","Pibit","Eibit","Zibit","Yibit"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["bit","Kbit","Mbit","Gbit","Tbit","Pbit","Ebit","Zbit","Ybit"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},Ht={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]},qt={floor:Math.floor,ceil:Math.ceil};function J(r,t={}){let e=[],i=0,o,a,c,l,u,s,d,f,S,m,v,I,j,y,x,T,E,k,g,h,w;if(isNaN(r))throw new TypeError("Invalid number");if(c=t.bits===!0,x=t.unix===!0,I=t.pad===!0,a=t.base||10,j=t.round!==void 0?t.round:x?1:2,d=t.locale!==void 0?t.locale:"",f=t.localeOptions||{},T=t.separator!==void 0?t.separator:"",E=t.spacer!==void 0?t.spacer:x?"":" ",g=t.symbols||{},k=a===2?t.standard||"iec":"jedec",v=t.output||"string",u=t.fullform===!0,s=t.fullforms instanceof Array?t.fullforms:[],o=t.exponent!==void 0?t.exponent:-1,h=qt[t.roundingMethod]||Math.round,m=Number(r),S=m<0,l=a>2?1e3:1024,w=isNaN(t.precision)===!1?parseInt(t.precision,10):0,S&&(m=-m),(o===-1||isNaN(o))&&(o=Math.floor(Math.log(m)/Math.log(l)),o<0&&(o=0)),o>8&&(w>0&&(w+=8-o),o=8),v==="exponent")return o;if(m===0)e[0]=0,y=e[1]=x?"":re[k][c?"bits":"bytes"][o];else{i=m/(a===2?Math.pow(2,o*10):Math.pow(1e3,o)),c&&(i=i*8,i>=l&&o<8&&(i=i/l,o++));const p=Math.pow(10,o>0?j:0);e[0]=h(i*p)/p,e[0]===l&&o<8&&t.exponent===void 0&&(e[0]=1,o++),y=e[1]=a===10&&o===1?c?"kbit":"kB":re[k][c?"bits":"bytes"][o],x&&(e[1]=e[1].charAt(0),Nt.test(e[1])&&(e[0]=Math.floor(e[0]),e[1]=""))}if(S&&(e[0]=-e[0]),w>0&&(e[0]=e[0].toPrecision(w)),e[1]=g[e[1]]||e[1],d===!0?e[0]=e[0].toLocaleString():d.length>0?e[0]=e[0].toLocaleString(d,f):T.length>0&&(e[0]=e[0].toString().replace(".",T)),I&&Number.isInteger(e[0])===!1&&j>0){const p=T||".",C=e[0].toString().split(p),O=C[1]||"",z=O.length,N=j-z;e[0]=`${C[0]}${p}${O.padEnd(z+N,"0")}`}return u&&(e[1]=s[o]?s[o]:Ht[k][o]+(c?"bit":"byte")+(e[0]===1?"":"s")),v==="array"?e:v==="object"?{value:e[0],symbol:e[1],exponent:o,unit:y}:e.join(E)}J.partial=r=>t=>J(t,r);const Pt=window.antd.Button,Vt=window.antd.Card,Kt=window.antd.Divider,ce=window.antd.Image,pe=window.antd.Layout,Ut=window.antd.Modal,Ft=window.antd.Result,ie=window.antd.Space,Yt=window.antd.Tag,Gt=window.antd.Typography,Zt=window.antd.message,Jt=window.antd.theme,Wt=window.dayjs,Xt=window._.find,Qt=window._.map,P=window.React.useEffect,en=window.React.useRef,$=window.React.useState,{useToken:tn}=Jt,{Text:V}=Gt,{Content:nn}=pe,on=r=>J(r||0,{base:2,standard:"jedec"}),Z=r=>Wt(r).format("YYYY-MM-DD HH:mm:ss"),rn=r=>{const{data:t}=r,e=en(),[i,o]=$(""),[a,c]=$(""),[l,u]=$(!1),[s,d]=Zt.useMessage(),[f,S]=Ie(),[m,v]=$(!1),[I,j]=$([]),[y,x]=$(0),{t:T}=Q(),{token:E}=tn(),k=t[f],g=async()=>{const b=await Le(`article/${[f,S].join("/")}.md`),M=await $e(b),A=(await De(M)).render(b);c(A),o(b),Ae(),setTimeout(()=>{j([...document.querySelectorAll(".markdown-body img")].map(H=>H.src))},1),setTimeout(()=>{[...document.querySelectorAll(".playground-coordinate")].forEach(q=>{const{id:ee}=q.dataset,K=document.createElement("div");K.id=ee,q.insertAdjacentElement("afterend",K),Oe(K).render(n.jsx(zt,{id:ee}))})},100)},h=async()=>{(await Ne()).editor.create(e.current,{...He,value:i,language:"markdown",readOnly:!0})},w=b=>{const{target:M}=b;let _;if(!M.closest(".markdown-body .playground-container")&&(M.classList.contains("anticon-copy")&&(_=M),M.closest(".markdown-body .anticon-copy")&&(_=M.closest(".markdown-body .anticon-copy")),_)){const A=decodeURIComponent(_.dataset.code);me(A),s.success(T("copied"))}},p=b=>{const{tagName:M,src:_,parentNode:A}=b.target;if(M==="IMG"){if(A.tagName==="A")return;const H=[...document.querySelectorAll(".markdown-body img")].map(q=>q.src).indexOf(_);x(H),v(!0)}};if(P(()=>{_e(E.colorPrimary==="#1668dc")},[E.colorPrimary]),P(()=>{Be(),g()},[c,o]),P(()=>(document.body.addEventListener("click",w),()=>{document.body.removeEventListener("click",w)}),[]),P(()=>(document.body.addEventListener("click",p),()=>{document.body.removeEventListener("click",p)}),[]),!Qt(k,"name").includes(S))return n.jsx(Ft,{status:"404",title:"404",subTitle:T("page_not_found")});const{title:C,size:O,ctime:z,mtime:N}=Xt(k,{name:S});return n.jsxs(pe,{children:[n.jsxs(nn,{children:[n.jsx(Vt,{title:C,extra:n.jsxs(ie,{children:[n.jsx(V,{type:"secondary",italic:!0,children:Z(N)}),n.jsx(Pt,{icon:n.jsx(Ue,{}),onClick:()=>{u(!0),h()}})]}),loading:!i,children:n.jsx("div",{className:"markdown-body",dangerouslySetInnerHTML:{__html:a}})}),n.jsx(Ut,{title:n.jsxs(ie,{split:n.jsx(Kt,{type:"vertical"}),children:[n.jsx(V,{children:"Markdown 源码"}),n.jsx(V,{type:"secondary",italic:!0,children:Z(z)}),n.jsx(V,{type:"secondary",italic:!0,children:Z(N)}),n.jsx(Yt,{color:"cyan",children:on(O)})]}),open:l,onCancel:()=>{u(!1)},maskClosable:!0,width:"90%",style:{top:20},footer:null,children:n.jsx("div",{className:"markdown-source",ref:e})}),n.jsx("div",{style:{display:"none"},children:n.jsx(ce.PreviewGroup,{preview:{visible:m,current:y,onVisibleChange:b=>v(b)},children:I.map(b=>n.jsx(ce,{src:b},b))})}),d]}),!!i&&n.jsx(ut,{data:i})]})};export{rn as default};
