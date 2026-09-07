import{A as _,_ as L,a0 as j,a as p,$ as C}from"./index-92015bd6.js";var E={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M290 236.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0013.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 000 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 00-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"}}]},name:"fullscreen",theme:"outlined"};const T=E,y=window.React;var M=function(t,n){return y.createElement(_,L({},t,{ref:n,icon:T}))},P=y.forwardRef(M);const D=P,k=`html,body{width:100%;height:100%}input::-ms-clear,input::-ms-reveal{display:none}*,*:before,*:after{box-sizing:border-box}html{font-family:sans-serif;line-height:1.15;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-ms-overflow-style:scrollbar;-webkit-tap-highlight-color:rgba(0,0,0,0)}@-ms-viewport{width:device-width}body{margin:0}[tabindex="-1"]:focus{outline:none}hr{box-sizing:content-box;height:0;overflow:visible}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5em;font-weight:500}p{margin-top:0;margin-bottom:1em}abbr[title],abbr[data-original-title]{-webkit-text-decoration:underline dotted;text-decoration:underline;text-decoration:underline dotted;border-bottom:0;cursor:help}address{margin-bottom:1em;font-style:normal;line-height:inherit}input[type=text],input[type=password],input[type=number],textarea{-webkit-appearance:none}ol,ul,dl{margin-top:0;margin-bottom:1em}ol ol,ul ul,ol ul,ul ol{margin-bottom:0}dt{font-weight:500}dd{margin-bottom:.5em;margin-left:0}blockquote{margin:0 0 1em}dfn{font-style:italic}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}pre,code,kbd,samp{font-size:1em;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace}pre{margin-top:0;margin-bottom:1em;overflow:auto}figure{margin:0 0 1em}img{vertical-align:middle;border-style:none}a,area,button,[role=button],input:not([type=range]),label,select,summary,textarea{touch-action:manipulation}table{border-collapse:collapse}caption{padding-top:.75em;padding-bottom:.3em;text-align:left;caption-side:bottom}input,button,select,optgroup,textarea{margin:0;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit}button,input{overflow:visible}button,select{text-transform:none}button,html [type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{padding:0;border-style:none}input[type=radio],input[type=checkbox]{box-sizing:border-box;padding:0}input[type=date],input[type=time],input[type=datetime-local],input[type=month]{-webkit-appearance:listbox}textarea{overflow:auto;resize:vertical}fieldset{min-width:0;margin:0;padding:0;border:0}legend{display:block;width:100%;max-width:100%;margin-bottom:.5em;padding:0;color:inherit;font-size:1.5em;line-height:inherit;white-space:normal}progress{vertical-align:baseline}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px;-webkit-appearance:none}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}output{display:inline-block}summary{display:list-item}template{display:none}[hidden]{display:none!important}mark{padding:.2em;background-color:#feffe6}
`,A=`/* eslint-disable no-console,sonarjs/cognitive-complexity */

// eslint-disable-next-line no-extra-semi
try {
    const ConsoleTimeKey = window.name;

    console.time(ConsoleTimeKey);

    window.React = window.parent.React;
    window.ReactDOM = window.parent.ReactDOM;
    window.dayjs = window.parent.dayjs;
    window._ = window.parent._;

    const loadScript = src => {
        return new Promise(resolve => {
            const script = document.createElement('script');
            script.onload = () => {
                resolve();
            };
            script.src = src;
            document.head.appendChild(script);
        });
    };

    const ScriptList = [
        'https://registry.npmmirror.com/antd/5.19.4/files/dist/antd.min.js',
        'https://registry.npmmirror.com/@babel/standalone/7.22.9/files/babel.min.js'
    ];

    await Promise.all(ScriptList.map(loadScript));

    // eslint-disable-next-line
    for (const src of PlaygroundJsAssets) {
        await loadScript(src);
    }

    const { Babel } = window;

    const ExternalMap = {
        react: 'React',
        'react-dom': 'ReactDOM',
        dayjs: 'dayjs',
        antd: 'antd',
        lodash: '_'
    };

    // eslint-disable-next-line quotes
    const { code } = Babel.transform(decodeURIComponent(atob('__JsCode__')), {
        filename: [window.name, '.js'].join(''),
        sourceType: 'module',
        presets: [
            [
                'env',
                {
                    modules: false
                }
            ],
            'react',
            'typescript'
        ],
        targets: {
            chrome: '200'
        }
    });

    const CodeList = code.replaceAll('/*#__PURE__*/', '').split('\\n');

    CodeList.forEach((v, i) => {
        if (v.includes('import') && v.includes('from')) {
            const name = v.split("'")[1];
            const externalName = ExternalMap[name];

            if (externalName) {
                if (v.includes('{')) {
                    if (v.includes(',') && v.indexOf(',') < v.indexOf('{')) {
                        CodeList[i] = v.replace(v.slice('import'.length + 1, v.indexOf(',') + 1), '');
                    }
                    CodeList[i] = CodeList[i].replace('import', 'const').replace('from', '=').replace(name, externalName).replaceAll("'", '');
                } else {
                    CodeList[i] = '';
                }
            }
        }
    });

    const script = document.createElement('script');
    script.setAttribute('type', 'module');
    script.innerHTML = CodeList.join('\\n');
    document.body.appendChild(script);

    window.parent.postMessage(
        {
            type: 'playground',
            id: window.name,
            eventName: 'initialized',
            // eslint-disable-next-line no-undef
            initializedTime: Date.now() - PlaygroundStartTime
        },
        '/'
    );

    console.timeEnd(ConsoleTimeKey);
} catch (e) {
    console.error(e);
    window.parent.postMessage(
        {
            type: 'playground',
            id: window.name,
            eventName: 'error',
            error: e,
            // eslint-disable-next-line no-undef
            initializedTime: Date.now() - PlaygroundStartTime
        },
        '/'
    );
}
`,w=({name:e,version:t,path:n})=>["https://registry.npmmirror.com",e,t,"files",n].join("/"),b=new Map,v=(e="",t="")=>{if(b.has(e))return b.get(e);const n=new Promise((o,l)=>{const i=document.createElement("script");j(i,{src:e}),i.onload=()=>{o(window[t]??null)},i.onerror=()=>{l(new Error(`加载js文件失败: ${e}`))},document.head.append(i)});return b.set(e,n),n},f={printWidth:160,useTabs:!1,tabWidth:4,semi:!0,singleQuote:!0,trailingComma:"none",proseWrap:"never",arrowParens:"avoid",bracketSpacing:!0,htmlWhitespaceSensitivity:"ignore"},x=new Map,g=async(e,t)=>{await Promise.all([p(()=>import("https://registry.npmmirror.com/prettier/2.7.1/files/standalone.js"),[]),p(()=>import("https://registry.npmmirror.com/prettier/2.7.1/files/parser-babel.js"),[]),p(()=>import("https://registry.npmmirror.com/prettier/2.7.1/files/parser-html.js"),[]),p(()=>import("https://registry.npmmirror.com/prettier/2.7.1/files/parser-postcss.js"),[])]);const{prettier:n,prettierPlugins:o}=window;return t==="js"?n.format(e,{parser:"babel",plugins:[o.babel],...f}):["css","less"].includes(t)?n.format(e,{parser:"less",plugins:[o.postcss],...f}):t==="html"?n.format(e,{parser:"html",plugins:[o.html],...f}):e},I=e=>{const t=C(),n="style",o="template",l="script",i={html:"",css:"",cssAssets:[],js:"",jsAssets:[]},m=document.createElement("template");m.innerHTML=e;const{content:r}=m;return Array.from(r.children).forEach(async c=>{const{localName:s,innerHTML:d,dataset:u}=c,a=(u.assets||"").split(";").filter(Boolean);s===n&&(i.css=await g(d,"css"),i.cssAssets=a),s===o&&(i.html=await g(d,"html")),s===l&&(i.js=await g(d,"js"),i.jsAssets=a)}),x.set(t,i),t},z=async e=>e.length?(await(await v(w({name:"less",version:"4.2.0",path:"dist/less.min.js"}),"less")).render(e)).css:"",S=({PlaygroundStartTime:e,js:t,jsAssets:n})=>{let o;return t.includes("export default")?o=[t.replace("export default","const PlaygroundApp = "),'ReactDOM.createRoot(document.querySelector("#app")).render(<PlaygroundApp />);'].join(`
`):o=t,A.replace("__JsCode__",btoa(encodeURIComponent(o))).replaceAll("PlaygroundStartTime",e).replaceAll("PlaygroundJsAssets",JSON.stringify(n))},h=(e,t)=>{const n=e.createElement("style");n.innerHTML=t,e.head.appendChild(n)},R=(e,t)=>{const n=e.createElement("link");n.rel="stylesheet",n.href=t,e.head.appendChild(n)},N=e=>{const t=Date.now(),{html:n,css:o,cssAssets:l,js:i,jsAssets:m}=x.get(e),r=document.createElement("iframe");return r.name=e,r.addEventListener("load",async()=>{const c=r.contentWindow,s=c.document,d=()=>{l.forEach(a=>{R(s,a)})},u=()=>{const a=s.createElement("script");a.type="module",a.innerHTML=S({PlaygroundStartTime:t,js:i,jsAssets:m}),s.body.appendChild(a)};if(d(),h(s,k),o){const a=await z(o);h(s,a)}s.body.insertAdjacentHTML("afterbegin",n||'<div id="app"></div>'),i?u():c.parent.postMessage({type:"playground",id:e,eventName:"initialized",initializedTime:Date.now()-t},"/"),setInterval(()=>{const a=Number(c.document.body.scrollHeight);r.height!==a&&(r.style.height=[a,"px"].join(""))},1e3)}),r},F={theme:"vs-dark",autoIndent:!0,formatOnPaste:!0,formatOnType:!0,fontSize:14,automaticLayout:!0,scrollBeyondLastLine:!1},H=async()=>{const e=["standalone.js","parser-babel.js","parser-html.js","parser-postcss.js"];await Promise.all(e.map(n=>v(w({name:"prettier",version:"2.7.1",path:n}))));const{default:t}=await p(()=>import("./index-035032ca.js"),[]);return t.config({paths:{vs:"https://registry.npmmirror.com/monaco-editor/0.44.0/files/min/vs"}}),await t.init()};export{D as F,F as M,x as P,N as c,g as f,H as g,I as p};
