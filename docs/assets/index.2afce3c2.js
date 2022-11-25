var t=Object.defineProperty,e=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,i=Object.prototype.propertyIsEnumerable,s=(e,a,i)=>a in e?t(e,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[a]=i,o=(t,o)=>{for(var n in o||(o={}))e.call(o,n)&&s(t,n,o[n]);if(a)for(var n of a(o))i.call(o,n)&&s(t,n,o[n]);return t};import{m as n,c as r,l,V as c,E as d}from"./vendor.c92154d8.js";var h=[{text:"Home",categorie:"index"},{text:"JS",categorie:"js"},{text:"Node",categorie:"node"},{text:"HTML",categorie:"html"},{text:"CSS",categorie:"css"},{text:"Tool",title:"前端工具",categorie:"tool"},{text:"Assemble",categorie:"assemble"}];var p={title:"WEB前端开发",author:"shuoshubao",qq:"759979885",email:"759979885@qq.com",description:"专注前端开发，关注用户体验",keywords:"shuoshubao 硕鼠宝 FE 前端 JS",qqLink:"http://sighttp.qq.com/authd?IDKEY=ac3c33ef370b9c4efc05e5660a2d2085b121007e508c595f",sinaLink:"http://weibo.com/qq759979885",githubLink:"https://github.com/shuoshubao/shuoshubao.github.io/",hostnameProd:"shuoshubao.github.io",registration:"京ICP备15042742号"};function u(t,e,a,i,s,o,n,r){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=a,c._compiled=!0),i&&(c.functional=!0),o&&(c._scopeId="data-v-"+o),n?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},c._ssrRegister=l):s&&(l=r?function(){s.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:s),l)if(c.functional){c._injectStyles=l;var d=c.render;c.render=function(t,e){return l.call(e),d(t,e)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,l):[l]}return{exports:t,options:c}}const g={};var v=u({props:{categorie:{type:String},listData:{type:Object}},data(){const{categorie:t,listData:e}=this;let a=[];return a=["index",""].includes(t)?h.map((t=>t.categorie)).filter((t=>"index"!==t)).reduce(((t,a)=>(t.push(...e[a].map((t=>o(o({},t),{categorie:a})))),t)),[]):e[t],{list:a}}},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[t._v("共")]),t._v(" "),a("el-link",{attrs:{type:"primary"}},[t._v(t._s(t.list.length))]),t._v(" "),a("span",[t._v("篇文章")])],1),t._v(" "),t._l(t.list,(function(e,i){return a("div",{key:i,staticStyle:{padding:"10px 0","line-height":"20px"}},[a("el-link",{attrs:{href:"#"+[e.categorie||t.categorie,e.name].join("/"),type:"primary"}},[t._v(t._s(e.title))])],1)}))],2)}),[],!1,(function(t){for(let e in g)this[e]=g[e]}),null,null,null).exports;const m=n({highlight:(t,e)=>{if(e&&l.getLanguage(e))try{const{code:a,value:i}=l.highlight(t,{language:e});return["<pre>",`<code class="hljs language-${e}" lang="${e}">`,i,`<span class="btn-copycode" data-code="${btoa(encodeURIComponent(a))}">复制代码</span>`,"</code>","</pre>"].join("")}catch(a){}return""}}),_={};var b=u({props:{categorie:{type:Array},listData:{type:Object}},data:()=>({loading:!0,articleTitle:"",sourceCode:"",MarkdownHtml:"",dialogData:{title:"Markdown源码",visible:!1}}),methods:{async fetchData(){const{categorie:t}=this,e=await fetch(`https://raw.githubusercontent.com/shuoshubao/blog/master/article/${t.join("/")}.md`).then((t=>t.text()));this.sourceCode=e,this.MarkdownHtml=m.render(e),this.loading=!1,await this.$nextTick(),document.querySelectorAll(".btn-copycode").forEach((t=>{t.addEventListener("click",(()=>{const e=decodeURIComponent(atob(t.dataset.code));return r(e),this.$message({message:"代码复制成功",type:"success",duration:2e3}),!1}))}))},showCode(){this.dialogData.visible=!0}},async created(){await this.fetchData();const{listData:t}=this,[e,a]=this.categorie,i=t[e].find((t=>t.name===a)).title;this.articleTitle=i}},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-card",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"},attrs:{slot:"header"},slot:"header"},[a("span",[t._v(t._s(t.articleTitle))]),t._v(" "),a("el-tooltip",{attrs:{effect:"dark",content:"Markdown源码",placement:"top-start"}},[a("i",{staticClass:"el-icon-view",on:{click:t.showCode}})])],1),t._v(" "),a("div",{staticClass:"markdown-body",domProps:{innerHTML:t._s(t.MarkdownHtml)}})]),t._v(" "),a("el-dialog",{staticClass:"dialog-markdown",attrs:{visible:t.dialogData.visible,width:"95%",top:"50px",title:t.dialogData.title},on:{"update:visible":function(e){return t.$set(t.dialogData,"visible",e)}}},[a("pre",{staticStyle:{margin:"0"},domProps:{innerHTML:t._s(t.sourceCode)}})])],1)}),[],!1,(function(t){for(let e in _)this[e]=_[e]}),null,null,null).exports;const f={};var y=u({components:{List:v,Detail:b},data:()=>({loading:!0,mobileOpen:!1,DATA_META:p,DATA_NAV:h,DATA_ARTICLE:{},validHashList:[],defaultActive:"",categorie:"",pageType:""}),methods:{onClickOpen(t){this.mobileOpen=!0,t.stopPropagation()},onClickTopbar(t){t.stopPropagation()},onSelectMenu(t,e){window.location.hash="index"===e[0]?"":e[0]},async fetchData(){return fetch("https://raw.githubusercontent.com/shuoshubao/blog/master/data/db.json").then((t=>t.json())).then((t=>{this.DATA_ARTICLE=t,this.loading=!1})).catch((()=>{this.loading=!1}))},validateUrl(){const{DATA_ARTICLE:t}=this;this.validHashList=Object.entries(t).reduce(((t,[e,a])=>(t.push(e,...a.map((t=>[e,t.name].join("/")))),t)),["","index"])},onHashchange(){const t=window.location.hash.substring(1),[e,a=""]=t.split("/");this.validHashList.includes(t)?t.includes("/")?this.renderDetail(e,a.split("?")[0]):this.renderList(e):this.renderError()},renderList(t){this.pageType="list",this.categorie=t},renderDetail(t,e){this.pageType="detail",this.categorie=[t,e]},renderError(){this.pageType="error"}},mounted(){document.body.addEventListener("click",(()=>{this.mobileOpen=!1}))},async created(){await this.fetchData(),this.validateUrl(),window.addEventListener("hashchange",this.onHashchange,!1),this.onHashchange()}},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{height:"100%"}},[a("div",{staticClass:"ss-topbar-mobile"},[a("div",{staticClass:"topbar-inner"},[a("span",{staticClass:"el-icon-s-operation",on:{click:t.onClickOpen}})])]),t._v(" "),a("el-container",{staticClass:"ss-container"},[a("el-aside",{class:["ss-aside",{open:t.mobileOpen}],attrs:{width:"150px"},on:{click:t.onClickTopbar}},[a("div",{staticClass:"aside-inner"},[a("el-menu",{attrs:{"default-active":t.defaultActive},on:{select:t.onSelectMenu}},t._l(t.DATA_NAV,(function(e,i){return a("el-menu-item",{key:i,attrs:{index:e.categorie}},[a("i",{staticClass:"el-icon-menu"}),t._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.text))])])})),1)],1)]),t._v(" "),a("el-main",{key:[t.pageType,t.categorie].join("_"),staticClass:"ss-main"},["list"===t.pageType?a("List",{attrs:{categorie:t.categorie,"list-data":t.DATA_ARTICLE}}):t._e(),t._v(" "),"detail"===t.pageType?a("Detail",{attrs:{categorie:t.categorie,"list-data":t.DATA_ARTICLE}}):t._e(),t._v(" "),"error"===t.pageType?a("div",[a("el-alert",{attrs:{title:"您访问的博客不存在",type:"error",closable:!1}})],1):t._e()],1)],1)],1)}),[],!1,(function(t){for(let e in f)this[e]=f[e]}),"5cedb52f",null,null).exports;c.use(d),new c({render:t=>t(y)}).$mount("#app");
