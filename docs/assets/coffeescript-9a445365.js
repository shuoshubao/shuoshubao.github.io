const I=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],f=["true","false","null","undefined","NaN","Infinity"],y=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],_=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],b=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],N=[].concat(b,y,_);function R(e){const o=["npm","print"],c=["yes","no","on","off"],E=["then","unless","until","loop","by","when","and","or","is","isnt","not"],l=["var","const","let","function","static"],d=A=>g=>!A.includes(g),t={keyword:I.concat(E).filter(d(l)),literal:f.concat(c),built_in:N.concat(o)},n="[A-Za-z$_][0-9A-Za-z$_]*",r={className:"subst",begin:/#\{/,end:/\}/,keywords:t},a=[e.BINARY_NUMBER_MODE,e.inherit(e.C_NUMBER_MODE,{starts:{end:"(\\s*/)?",relevance:0}}),{className:"string",variants:[{begin:/'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE]},{begin:/'/,end:/'/,contains:[e.BACKSLASH_ESCAPE]},{begin:/"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,r]},{begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,r]}]},{className:"regexp",variants:[{begin:"///",end:"///",contains:[r,e.HASH_COMMENT_MODE]},{begin:"//[gim]{0,3}(?=\\W)",relevance:0},{begin:/\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/}]},{begin:"@"+n},{subLanguage:"javascript",excludeBegin:!0,excludeEnd:!0,variants:[{begin:"```",end:"```"},{begin:"`",end:"`"}]}];r.contains=a;const u=e.inherit(e.TITLE_MODE,{begin:n}),i="(\\(.*\\)\\s*)?\\B[-=]>",s={className:"params",begin:"\\([^\\(]",returnBegin:!0,contains:[{begin:/\(/,end:/\)/,keywords:t,contains:["self"].concat(a)}]},S={variants:[{match:[/class\s+/,n,/\s+extends\s+/,n]},{match:[/class\s+/,n]}],scope:{2:"title.class",4:"title.class.inherited"},keywords:t};return{name:"CoffeeScript",aliases:["coffee","cson","iced"],keywords:t,illegal:/\/\*/,contains:[...a,e.COMMENT("###","###"),e.HASH_COMMENT_MODE,{className:"function",begin:"^\\s*"+n+"\\s*=\\s*"+i,end:"[-=]>",returnBegin:!0,contains:[u,s]},{begin:/[:\(,=]\s*/,relevance:0,contains:[{className:"function",begin:i,end:"[-=]>",returnBegin:!0,contains:[s]}]},S,{begin:n+":",end:":",returnBegin:!0,returnEnd:!0,relevance:0}]}}export{R as default};