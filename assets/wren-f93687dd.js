function I(t){const s=t.regex,e=/[a-zA-Z]\w*/,c=["as","break","class","construct","continue","else","for","foreign","if","import","in","is","return","static","var","while"],n=["true","false","null"],a=["this","super"],p=["Bool","Class","Fiber","Fn","List","Map","Null","Num","Object","Range","Sequence","String","System"],o=["-","~",/\*/,"%",/\.\.\./,/\.\./,/\+/,"<<",">>",">=","<=","<",">",/\^/,/!=/,/!/,/\bis\b/,"==","&&","&",/\|\|/,/\|/,/\?:/,"="],i={relevance:0,match:s.concat(/\b(?!(if|while|for|else|super)\b)/,e,/(?=\s*[({])/),className:"title.function"},T={match:s.concat(s.either(s.concat(/\b(?!(if|while|for|else|super)\b)/,e),s.either(...o)),/(?=\s*\([^)]+\)\s*\{)/),className:"title.function",starts:{contains:[{begin:/\(/,end:/\)/,contains:[{relevance:0,scope:"params",match:e}]}]}},u={variants:[{match:[/class\s+/,e,/\s+is\s+/,e]},{match:[/class\s+/,e]}],scope:{2:"title.class",4:"title.class.inherited"},keywords:c},r={relevance:0,match:s.either(...o),className:"operator"},A={className:"string",begin:/"""/,end:/"""/},R={className:"property",begin:s.concat(/\./,s.lookahead(e)),end:e,excludeBegin:!0,relevance:0},l={relevance:0,match:s.concat(/\b_/,e),scope:"variable"},E={relevance:0,match:/\b[A-Z]+[a-z]+([A-Z]+[a-z]+)*/,scope:"title.class",keywords:{_:p}},m=t.C_NUMBER_MODE,S={match:[e,/\s*/,/=/,/\s*/,/\(/,e,/\)\s*\{/],scope:{1:"title.function",3:"operator",6:"params"}},h=t.COMMENT(/\/\*\*/,/\*\//,{contains:[{match:/@[a-z]+/,scope:"doctag"},"self"]}),b={scope:"subst",begin:/%\(/,end:/\)/,contains:[m,E,i,l,r]},N={scope:"string",begin:/"/,end:/"/,contains:[b,{scope:"char.escape",variants:[{match:/\\\\|\\["0%abefnrtv]/},{match:/\\x[0-9A-F]{2}/},{match:/\\u[0-9A-F]{4}/},{match:/\\U[0-9A-F]{8}/}]}]};b.contains.push(N);const _=[...c,...a,...n],O={relevance:0,match:s.concat("\\b(?!",_.join("|"),"\\b)",/[a-zA-Z_]\w*(?:[?!]|\b)/),className:"variable"};return{name:"Wren",keywords:{keyword:c,"variable.language":a,literal:n},contains:[{scope:"comment",variants:[{begin:[/#!?/,/[A-Za-z_]+(?=\()/],beginScope:{},keywords:{literal:n},contains:[],end:/\)/},{begin:[/#!?/,/[A-Za-z_]+/],beginScope:{},end:/$/}]},m,N,A,h,t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE,E,u,S,T,i,r,l,R,O]}}export{I as default};