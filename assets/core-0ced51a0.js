import{c as qe}from"./index-09e4abec.js";function we(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const i=e[t],u=typeof i;(u==="object"||u==="function")&&!Object.isFrozen(i)&&we(i)}),e}class he{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function xe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function B(e,...t){const i=Object.create(null);for(const u in e)i[u]=e[u];return t.forEach(function(u){for(const b in u)i[b]=u[b]}),i}const Qe="</span>",pe=e=>!!e.scope,me=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const i=e.split(".");return[`${t}${i.shift()}`,...i.map((u,b)=>`${u}${"_".repeat(b+1)}`)].join(" ")}return`${t}${e}`};class et{constructor(t,i){this.buffer="",this.classPrefix=i.classPrefix,t.walk(this)}addText(t){this.buffer+=xe(t)}openNode(t){if(!pe(t))return;const i=me(t.scope,{prefix:this.classPrefix});this.span(i)}closeNode(t){pe(t)&&(this.buffer+=Qe)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const de=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class te{constructor(){this.rootNode=de(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const i=de({scope:t});this.add(i),this.stack.push(i)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,i){return typeof i=="string"?t.addText(i):i.children&&(t.openNode(i),i.children.forEach(u=>this._walk(t,u)),t.closeNode(i)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(i=>typeof i=="string")?t.children=[t.children.join("")]:t.children.forEach(i=>{te._collapse(i)}))}}class tt extends te{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,i){const u=t.root;i&&(u.scope=`language:${i}`),this.add(u)}toHTML(){return new et(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function P(e){return e?typeof e=="string"?e:e.source:null}function Oe(e){return C("(?=",e,")")}function nt(e){return C("(?:",e,")*")}function it(e){return C("(?:",e,")?")}function C(...e){return e.map(i=>P(i)).join("")}function st(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ne(...e){return"("+(st(e).capture?"":"?:")+e.map(u=>P(u)).join("|")+")"}function Re(e){return new RegExp(e.toString()+"|").exec("").length-1}function rt(e,t){const i=e&&e.exec(t);return i&&i.index===0}const ct=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ie(e,{joinWith:t}){let i=0;return e.map(u=>{i+=1;const b=i;let _=P(u),c="";for(;_.length>0;){const r=ct.exec(_);if(!r){c+=_;break}c+=_.substring(0,r.index),_=_.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?c+="\\"+String(Number(r[1])+b):(c+=r[0],r[0]==="("&&i++)}return c}).map(u=>`(${u})`).join(t)}const ot=/\b\B/,ye="[a-zA-Z]\\w*",se="[a-zA-Z_]\\w*",Se="\\b\\d+(\\.\\d+)?",Ne="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ae="\\b(0b[01]+)",at="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",lt=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=C(t,/.*\b/,e.binary,/\b.*/)),B({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(i,u)=>{i.index!==0&&u.ignoreMatch()}},e)},U={begin:"\\\\[\\s\\S]",relevance:0},ut={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[U]},ft={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[U]},gt={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Y=function(e,t,i={}){const u=B({scope:"comment",begin:e,end:t,contains:[]},i);u.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const b=ne("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return u.contains.push({begin:C(/[ ]+/,"(",b,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),u},ht=Y("//","$"),pt=Y("/\\*","\\*/"),dt=Y("#","$"),Et={scope:"number",begin:Se,relevance:0},bt={scope:"number",begin:Ne,relevance:0},_t={scope:"number",begin:Ae,relevance:0},Mt={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[U,{begin:/\[/,end:/\]/,relevance:0,contains:[U]}]}]},wt={scope:"title",begin:ye,relevance:0},xt={scope:"title",begin:se,relevance:0},Ot={begin:"\\.\\s*"+se,relevance:0},Rt=function(e){return Object.assign(e,{"on:begin":(t,i)=>{i.data._beginMatch=t[1]},"on:end":(t,i)=>{i.data._beginMatch!==t[1]&&i.ignoreMatch()}})};var z=Object.freeze({__proto__:null,MATCH_NOTHING_RE:ot,IDENT_RE:ye,UNDERSCORE_IDENT_RE:se,NUMBER_RE:Se,C_NUMBER_RE:Ne,BINARY_NUMBER_RE:Ae,RE_STARTERS_RE:at,SHEBANG:lt,BACKSLASH_ESCAPE:U,APOS_STRING_MODE:ut,QUOTE_STRING_MODE:ft,PHRASAL_WORDS_MODE:gt,COMMENT:Y,C_LINE_COMMENT_MODE:ht,C_BLOCK_COMMENT_MODE:pt,HASH_COMMENT_MODE:dt,NUMBER_MODE:Et,C_NUMBER_MODE:bt,BINARY_NUMBER_MODE:_t,REGEXP_MODE:Mt,TITLE_MODE:wt,UNDERSCORE_TITLE_MODE:xt,METHOD_GUARD:Ot,END_SAME_AS_BEGIN:Rt});function yt(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function St(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Nt(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=yt,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function At(e,t){Array.isArray(e.illegal)&&(e.illegal=ne(...e.illegal))}function kt(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Tt(e,t){e.relevance===void 0&&(e.relevance=1)}const It=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const i=Object.assign({},e);Object.keys(e).forEach(u=>{delete e[u]}),e.keywords=i.keywords,e.begin=C(i.beforeMatch,Oe(i.begin)),e.starts={relevance:0,contains:[Object.assign(i,{endsParent:!0})]},e.relevance=0,delete i.beforeMatch},Bt=["of","and","for","in","not","or","if","then","parent","list","value"],Dt="keyword";function ke(e,t,i=Dt){const u=Object.create(null);return typeof e=="string"?b(i,e.split(" ")):Array.isArray(e)?b(i,e):Object.keys(e).forEach(function(_){Object.assign(u,ke(e[_],t,_))}),u;function b(_,c){t&&(c=c.map(r=>r.toLowerCase())),c.forEach(function(r){const l=r.split("|");u[l[0]]=[_,vt(l[0],l[1])]})}}function vt(e,t){return t?Number(t):Ct(e)?0:1}function Ct(e){return Bt.includes(e.toLowerCase())}const Ee={},v=e=>{console.error(e)},be=(e,...t)=>{console.log(`WARN: ${e}`,...t)},L=(e,t)=>{Ee[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Ee[`${e}/${t}`]=!0)},X=new Error;function Te(e,t,{key:i}){let u=0;const b=e[i],_={},c={};for(let r=1;r<=t.length;r++)c[r+u]=b[r],_[r+u]=!0,u+=Re(t[r-1]);e[i]=c,e[i]._emit=_,e[i]._multi=!0}function Lt(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw v("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),X;if(typeof e.beginScope!="object"||e.beginScope===null)throw v("beginScope must be object"),X;Te(e,e.begin,{key:"beginScope"}),e.begin=ie(e.begin,{joinWith:""})}}function Ht(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw v("skip, excludeEnd, returnEnd not compatible with endScope: {}"),X;if(typeof e.endScope!="object"||e.endScope===null)throw v("endScope must be object"),X;Te(e,e.end,{key:"endScope"}),e.end=ie(e.end,{joinWith:""})}}function jt(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Pt(e){jt(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Lt(e),Ht(e)}function Ut(e){function t(c,r){return new RegExp(P(c),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class i{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,r]),this.matchAt+=Re(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(l=>l[1]);this.matcherRe=t(ie(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(r);if(!l)return null;const x=l.findIndex((j,Z)=>Z>0&&j!==void 0),M=this.matchIndexes[x];return l.splice(0,x),Object.assign(l,M)}}class u{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const l=new i;return this.rules.slice(r).forEach(([x,M])=>l.addRule(x,M)),l.compile(),this.multiRegexes[r]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,l){this.rules.push([r,l]),l.type==="begin"&&this.count++}exec(r){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let x=l.exec(r);if(this.resumingScanAtSamePosition()&&!(x&&x.index===this.lastIndex)){const M=this.getMatcher(0);M.lastIndex=this.lastIndex+1,x=M.exec(r)}return x&&(this.regexIndex+=x.position+1,this.regexIndex===this.count&&this.considerAll()),x}}function b(c){const r=new u;return c.contains.forEach(l=>r.addRule(l.begin,{rule:l,type:"begin"})),c.terminatorEnd&&r.addRule(c.terminatorEnd,{type:"end"}),c.illegal&&r.addRule(c.illegal,{type:"illegal"}),r}function _(c,r){const l=c;if(c.isCompiled)return l;[St,kt,Pt,It].forEach(M=>M(c,r)),e.compilerExtensions.forEach(M=>M(c,r)),c.__beforeBegin=null,[Nt,At,Tt].forEach(M=>M(c,r)),c.isCompiled=!0;let x=null;return typeof c.keywords=="object"&&c.keywords.$pattern&&(c.keywords=Object.assign({},c.keywords),x=c.keywords.$pattern,delete c.keywords.$pattern),x=x||/\w+/,c.keywords&&(c.keywords=ke(c.keywords,e.case_insensitive)),l.keywordPatternRe=t(x,!0),r&&(c.begin||(c.begin=/\B|\b/),l.beginRe=t(l.begin),!c.end&&!c.endsWithParent&&(c.end=/\B|\b/),c.end&&(l.endRe=t(l.end)),l.terminatorEnd=P(l.end)||"",c.endsWithParent&&r.terminatorEnd&&(l.terminatorEnd+=(c.end?"|":"")+r.terminatorEnd)),c.illegal&&(l.illegalRe=t(c.illegal)),c.contains||(c.contains=[]),c.contains=[].concat(...c.contains.map(function(M){return $t(M==="self"?c:M)})),c.contains.forEach(function(M){_(M,l)}),c.starts&&_(c.starts,r),l.matcher=b(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=B(e.classNameAliases||{}),_(e)}function Ie(e){return e?e.endsWithParent||Ie(e.starts):!1}function $t(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return B(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ie(e)?B(e,{starts:e.starts?B(e.starts):null}):Object.isFrozen(e)?B(e):e}var Gt="11.8.0";class Wt extends Error{constructor(t,i){super(t),this.name="HTMLInjectionError",this.html=i}}const ee=xe,_e=B,Me=Symbol("nomatch"),Kt=7,Be=function(e){const t=Object.create(null),i=Object.create(null),u=[];let b=!0;const _="Could not find the language '{}', did you forget to load/include a language module?",c={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:tt};function l(n){return r.noHighlightRe.test(n)}function x(n){let a=n.className+" ";a+=n.parentNode?n.parentNode.className:"";const h=r.languageDetectRe.exec(a);if(h){const d=T(h[1]);return d||(be(_.replace("{}",h[1])),be("Falling back to no-highlight mode for this block.",n)),d?h[1]:"no-highlight"}return a.split(/\s+/).find(d=>l(d)||T(d))}function M(n,a,h){let d="",w="";typeof a=="object"?(d=n,h=a.ignoreIllegals,w=a.language):(L("10.7.0","highlight(lang, code, ...args) has been deprecated."),L("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),w=n,d=a),h===void 0&&(h=!0);const S={code:d,language:w};G("before:highlight",S);const I=S.result?S.result:j(S.language,S.code,h);return I.code=S.code,G("after:highlight",I),I}function j(n,a,h,d){const w=Object.create(null);function S(s,o){return s.keywords[o]}function I(){if(!f.keywords){O.addText(E);return}let s=0;f.keywordPatternRe.lastIndex=0;let o=f.keywordPatternRe.exec(E),g="";for(;o;){g+=E.substring(s,o.index);const p=A.case_insensitive?o[0].toLowerCase():o[0],R=S(f,p);if(R){const[k,Je]=R;if(O.addText(g),g="",w[p]=(w[p]||0)+1,w[p]<=Kt&&(F+=Je),k.startsWith("_"))g+=o[0];else{const Ve=A.classNameAliases[k]||k;N(o[0],Ve)}}else g+=o[0];s=f.keywordPatternRe.lastIndex,o=f.keywordPatternRe.exec(E)}g+=E.substring(s),O.addText(g)}function W(){if(E==="")return;let s=null;if(typeof f.subLanguage=="string"){if(!t[f.subLanguage]){O.addText(E);return}s=j(f.subLanguage,E,!0,ge[f.subLanguage]),ge[f.subLanguage]=s._top}else s=J(E,f.subLanguage.length?f.subLanguage:null);f.relevance>0&&(F+=s.relevance),O.__addSublanguage(s._emitter,s.language)}function y(){f.subLanguage!=null?W():I(),E=""}function N(s,o){s!==""&&(O.startScope(o),O.addText(s),O.endScope())}function ae(s,o){let g=1;const p=o.length-1;for(;g<=p;){if(!s._emit[g]){g++;continue}const R=A.classNameAliases[s[g]]||s[g],k=o[g];R?N(k,R):(E=k,I(),E=""),g++}}function le(s,o){return s.scope&&typeof s.scope=="string"&&O.openNode(A.classNameAliases[s.scope]||s.scope),s.beginScope&&(s.beginScope._wrap?(N(E,A.classNameAliases[s.beginScope._wrap]||s.beginScope._wrap),E=""):s.beginScope._multi&&(ae(s.beginScope,o),E="")),f=Object.create(s,{parent:{value:f}}),f}function ue(s,o,g){let p=rt(s.endRe,g);if(p){if(s["on:end"]){const R=new he(s);s["on:end"](o,R),R.isMatchIgnored&&(p=!1)}if(p){for(;s.endsParent&&s.parent;)s=s.parent;return s}}if(s.endsWithParent)return ue(s.parent,o,g)}function Fe(s){return f.matcher.regexIndex===0?(E+=s[0],1):(m=!0,0)}function ze(s){const o=s[0],g=s.rule,p=new he(g),R=[g.__beforeBegin,g["on:begin"]];for(const k of R)if(k&&(k(s,p),p.isMatchIgnored))return Fe(o);return g.skip?E+=o:(g.excludeBegin&&(E+=o),y(),!g.returnBegin&&!g.excludeBegin&&(E=o)),le(g,s),g.returnBegin?0:o.length}function Xe(s){const o=s[0],g=a.substring(s.index),p=ue(f,s,g);if(!p)return Me;const R=f;f.endScope&&f.endScope._wrap?(y(),N(o,f.endScope._wrap)):f.endScope&&f.endScope._multi?(y(),ae(f.endScope,s)):R.skip?E+=o:(R.returnEnd||R.excludeEnd||(E+=o),y(),R.excludeEnd&&(E=o));do f.scope&&O.closeNode(),!f.skip&&!f.subLanguage&&(F+=f.relevance),f=f.parent;while(f!==p.parent);return p.starts&&le(p.starts,s),R.returnEnd?0:o.length}function Ye(){const s=[];for(let o=f;o!==A;o=o.parent)o.scope&&s.unshift(o.scope);s.forEach(o=>O.openNode(o))}let K={};function fe(s,o){const g=o&&o[0];if(E+=s,g==null)return y(),0;if(K.type==="begin"&&o.type==="end"&&K.index===o.index&&g===""){if(E+=a.slice(o.index,o.index+1),!b){const p=new Error(`0 width match regex (${n})`);throw p.languageName=n,p.badRule=K.rule,p}return 1}if(K=o,o.type==="begin")return ze(o);if(o.type==="illegal"&&!h){const p=new Error('Illegal lexeme "'+g+'" for mode "'+(f.scope||"<unnamed>")+'"');throw p.mode=f,p}else if(o.type==="end"){const p=Xe(o);if(p!==Me)return p}if(o.type==="illegal"&&g==="")return 1;if(Q>1e5&&Q>o.index*3)throw new Error("potential infinite loop, way more iterations than matches");return E+=g,g.length}const A=T(n);if(!A)throw v(_.replace("{}",n)),new Error('Unknown language: "'+n+'"');const Ze=Ut(A);let q="",f=d||Ze;const ge={},O=new r.__emitter(r);Ye();let E="",F=0,D=0,Q=0,m=!1;try{if(A.__emitTokens)A.__emitTokens(a,O);else{for(f.matcher.considerAll();;){Q++,m?m=!1:f.matcher.considerAll(),f.matcher.lastIndex=D;const s=f.matcher.exec(a);if(!s)break;const o=a.substring(D,s.index),g=fe(o,s);D=s.index+g}fe(a.substring(D))}return O.finalize(),q=O.toHTML(),{language:n,value:q,relevance:F,illegal:!1,_emitter:O,_top:f}}catch(s){if(s.message&&s.message.includes("Illegal"))return{language:n,value:ee(a),illegal:!0,relevance:0,_illegalBy:{message:s.message,index:D,context:a.slice(D-100,D+100),mode:s.mode,resultSoFar:q},_emitter:O};if(b)return{language:n,value:ee(a),illegal:!1,relevance:0,errorRaised:s,_emitter:O,_top:f};throw s}}function Z(n){const a={value:ee(n),illegal:!1,relevance:0,_top:c,_emitter:new r.__emitter(r)};return a._emitter.addText(n),a}function J(n,a){a=a||r.languages||Object.keys(t);const h=Z(n),d=a.filter(T).filter(oe).map(y=>j(y,n,!1));d.unshift(h);const w=d.sort((y,N)=>{if(y.relevance!==N.relevance)return N.relevance-y.relevance;if(y.language&&N.language){if(T(y.language).supersetOf===N.language)return 1;if(T(N.language).supersetOf===y.language)return-1}return 0}),[S,I]=w,W=S;return W.secondBest=I,W}function De(n,a,h){const d=a&&i[a]||h;n.classList.add("hljs"),n.classList.add(`language-${d}`)}function V(n){let a=null;const h=x(n);if(l(h))return;if(G("before:highlightElement",{el:n,language:h}),n.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(n)),r.throwUnescapedHTML))throw new Wt("One of your code blocks includes unescaped HTML.",n.innerHTML);a=n;const d=a.textContent,w=h?M(d,{language:h,ignoreIllegals:!0}):J(d);n.innerHTML=w.value,De(n,h,w.language),n.result={language:w.language,re:w.relevance,relevance:w.relevance},w.secondBest&&(n.secondBest={language:w.secondBest.language,relevance:w.secondBest.relevance}),G("after:highlightElement",{el:n,result:w,text:d})}function ve(n){r=_e(r,n)}const Ce=()=>{$(),L("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function Le(){$(),L("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let re=!1;function $(){if(document.readyState==="loading"){re=!0;return}document.querySelectorAll(r.cssSelector).forEach(V)}function He(){re&&$()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",He,!1);function je(n,a){let h=null;try{h=a(e)}catch(d){if(v("Language definition for '{}' could not be registered.".replace("{}",n)),b)v(d);else throw d;h=c}h.name||(h.name=n),t[n]=h,h.rawDefinition=a.bind(null,e),h.aliases&&ce(h.aliases,{languageName:n})}function Pe(n){delete t[n];for(const a of Object.keys(i))i[a]===n&&delete i[a]}function Ue(){return Object.keys(t)}function T(n){return n=(n||"").toLowerCase(),t[n]||t[i[n]]}function ce(n,{languageName:a}){typeof n=="string"&&(n=[n]),n.forEach(h=>{i[h.toLowerCase()]=a})}function oe(n){const a=T(n);return a&&!a.disableAutodetect}function $e(n){n["before:highlightBlock"]&&!n["before:highlightElement"]&&(n["before:highlightElement"]=a=>{n["before:highlightBlock"](Object.assign({block:a.el},a))}),n["after:highlightBlock"]&&!n["after:highlightElement"]&&(n["after:highlightElement"]=a=>{n["after:highlightBlock"](Object.assign({block:a.el},a))})}function Ge(n){$e(n),u.push(n)}function We(n){const a=u.indexOf(n);a!==-1&&u.splice(a,1)}function G(n,a){const h=n;u.forEach(function(d){d[h]&&d[h](a)})}function Ke(n){return L("10.7.0","highlightBlock will be removed entirely in v12.0"),L("10.7.0","Please use highlightElement now."),V(n)}Object.assign(e,{highlight:M,highlightAuto:J,highlightAll:$,highlightElement:V,highlightBlock:Ke,configure:ve,initHighlighting:Ce,initHighlightingOnLoad:Le,registerLanguage:je,unregisterLanguage:Pe,listLanguages:Ue,getLanguage:T,registerAliases:ce,autoDetection:oe,inherit:_e,addPlugin:Ge,removePlugin:We}),e.debugMode=function(){b=!1},e.safeMode=function(){b=!0},e.versionString=Gt,e.regex={concat:C,lookahead:Oe,either:ne,optional:it,anyNumberOfTimes:nt};for(const n in z)typeof z[n]=="object"&&we(z[n]);return Object.assign(e,z),e},H=Be({});H.newInstance=()=>Be({});var Ft=H;H.HighlightJS=H;H.default=H;const Xt=qe(Ft);export{Xt as HighlightJS,Xt as default};
