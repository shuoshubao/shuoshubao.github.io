import{x as j,w as v,a as b}from"./index-350c0149.js";const y=({name:e,version:n,path:t})=>["https://registry.npmmirror.com",e,n,"files",t].join("/"),u=new Map,g=(e="",n="")=>{if(u.has(e))return u.get(e);const t=new Promise((s,o)=>{const{define:r}=window;window.define=void 0;const i=document.createElement("script");j(i,{src:e}),i.onload=()=>{window.define=r,s(window[n]??null)},i.onerror=()=>{window.define=r,o(new Error(`加载js文件失败: ${e}`))},document.head.append(i)});return u.set(e,t),t},C=`/* eslint-disable no-console,sonarjs/cognitive-complexity */

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
`,f={printWidth:160,useTabs:!1,tabWidth:4,semi:!0,singleQuote:!0,trailingComma:"none",proseWrap:"never",arrowParens:"avoid",bracketSpacing:!0,htmlWhitespaceSensitivity:"ignore"},h=new Map,w=async(e,n)=>{const t=["standalone.js","parser-babel.js","parser-html.js","parser-postcss.js"];await Promise.all(t.map(r=>g(y({name:"prettier",version:"2.7.1",path:r}))));const{prettier:s,prettierPlugins:o}=window;return n==="js"?s.format(e,{parser:"babel",plugins:[o.babel],...f}):["css","less"].includes(n)?s.format(e,{parser:"less",plugins:[o.postcss],...f}):n==="html"?s.format(e,{parser:"html",plugins:[o.html],...f}):e},L=e=>{const n=v(),t="style",s="template",o="script",r={html:"",css:"",cssAssets:[],js:"",jsAssets:[]},i=document.createElement("template");i.innerHTML=e;const{content:c}=i;return Array.from(c.children).forEach(async d=>{const{localName:l,innerHTML:p,dataset:m}=d,a=(m.assets||"").split(";").filter(Boolean);l===t&&(r.css=await w(p,"css"),r.cssAssets=a),l===s&&(r.html=await w(p,"html")),l===o&&(r.js=await w(p,"js"),r.jsAssets=a)}),h.set(n,r),n},T=async e=>e.length?(await(await g(y({name:"less",version:"4.2.0",path:"dist/less.min.js"}),"less")).render(e)).css:"",P=({PlaygroundStartTime:e,js:n,jsAssets:t})=>{let s;return n.includes("export default")?s=[n.replace("export default","const PlaygroundApp = "),'ReactDOM.createRoot(document.querySelector("#app")).render(<PlaygroundApp />);'].join(`
`):s=n,C.replace("__JsCode__",btoa(encodeURIComponent(s))).replaceAll("PlaygroundStartTime",e).replaceAll("PlaygroundJsAssets",JSON.stringify(t))},S=(e,n)=>{const t=e.createElement("style");t.innerHTML=n,e.head.appendChild(t)},x=(e,n)=>{const t=e.createElement("link");t.rel="stylesheet",t.href=n,e.head.appendChild(t)},M=e=>{const n=Date.now(),{html:t,css:s,cssAssets:o,js:r,jsAssets:i}=h.get(e),c=document.createElement("iframe");return c.name=e,c.addEventListener("load",async()=>{const d=c.contentWindow,l=d.document,p=()=>{["https://registry.npmmirror.com/antd/5.19.4/files/dist/reset.css",...o].forEach(a=>{x(l,a)})},m=()=>{const a=l.createElement("script");a.type="module",a.innerHTML=P({PlaygroundStartTime:n,js:r,jsAssets:i}),l.body.appendChild(a)};if(p(),s){const a=await T(s);S(l,a)}l.body.insertAdjacentHTML("afterbegin",t||'<div id="app"></div>'),r?m():d.parent.postMessage({type:"playground",id:e,eventName:"initialized",initializedTime:Date.now()-n},"/"),setInterval(()=>{const a=Number(d.document.body.scrollHeight);c.height!==a&&(c.style.height=[a,"px"].join(""))},1e3)}),c},_={theme:"vs-dark",autoIndent:!0,formatOnPaste:!0,formatOnType:!0,fontSize:14,automaticLayout:!0,scrollBeyondLastLine:!1},A=async()=>{const e=["standalone.js","parser-babel.js","parser-html.js","parser-postcss.js"];await Promise.all(e.map(t=>g(y({name:"prettier",version:"2.7.1",path:t}))));const{default:n}=await b(()=>import("./index-035032ca.js"),[]);return n.config({paths:{vs:"https://registry.npmmirror.com/monaco-editor/0.44.0/files/min/vs"}}),await n.init()};export{_ as M,h as P,M as c,w as f,A as g,L as p};
