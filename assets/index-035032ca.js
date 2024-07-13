function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?y(Object(n),!0).forEach(function(r){C(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function D(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function q(e,t){if(e==null)return{};var n=D(e,t),r,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function R(e,t){return z(e)||M(e,t)||L(e,t)||F()}function z(e){if(Array.isArray(e))return e}function M(e,t){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(e)))){var n=[],r=!0,o=!1,i=void 0;try{for(var a=e[Symbol.iterator](),u;!(r=(u=a.next()).done)&&(n.push(u.value),!(t&&n.length===t));r=!0);}catch(c){o=!0,i=c}finally{try{!r&&a.return!=null&&a.return()}finally{if(o)throw i}}return n}}function L(e,t){if(e){if(typeof e=="string")return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(e,t)}}function j(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function F(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function H(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?w(Object(n),!0).forEach(function(r){H(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function x(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduceRight(function(o,i){return i(o)},r)}}function l(e){return function t(){for(var n=this,r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return o.length>=e.length?e.apply(this,o):function(){for(var a=arguments.length,u=new Array(a),c=0;c<a;c++)u[c]=arguments[c];return t.apply(n,[].concat(o,u))}}}function v(e){return{}.toString.call(e).includes("Object")}function U(e){return!Object.keys(e).length}function s(e){return typeof e=="function"}function W(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function B(e,t){return v(t)||f("changeType"),Object.keys(t).some(function(n){return!W(e,n)})&&f("changeField"),t}function K(e){s(e)||f("selectorType")}function N(e){s(e)||v(e)||f("handlerType"),v(e)&&Object.values(e).some(function(t){return!s(t)})&&f("handlersType")}function G(e){e||f("initialIsRequired"),v(e)||f("initialType"),U(e)&&f("initialContent")}function Y(e,t){throw new Error(e[t]||e.default)}var J={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},f=l(Y)(J),g={changes:B,selector:K,handler:N,initial:G};function Q(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};g.initial(e),g.handler(t);var n={current:e},r=l(Z)(n,t),o=l(X)(n),i=l(g.changes)(e),a=l(V)(n);function u(){var p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function($){return $};return g.selector(p),p(n.current)}function c(p){x(r,o,i,a)(p)}return[u,c]}function V(e,t){return s(t)?t(e.current):t}function X(e,t){return e.current=P(P({},e.current),t),t}function Z(e,t,n){return s(t)?t(e.current):Object.keys(n).forEach(function(r){var o;return(o=t[r])===null||o===void 0?void 0:o.call(t,e.current[r])}),n}var _={create:Q},k={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs"}};function ee(e){return function t(){for(var n=this,r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return o.length>=e.length?e.apply(this,o):function(){for(var a=arguments.length,u=new Array(a),c=0;c<a;c++)u[c]=arguments[c];return t.apply(n,[].concat(o,u))}}}function te(e){return{}.toString.call(e).includes("Object")}function ne(e){return e||S("configIsRequired"),te(e)||S("configType"),e.urls?(re(),{paths:{vs:e.urls.monacoBase}}):e}function re(){console.warn(I.deprecation)}function oe(e,t){throw new Error(e[t]||e.default)}var I={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},S=ee(oe)(I),ie={config:ne},ae=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return function(o){return n.reduceRight(function(i,a){return a(i)},o)}};function A(e,t){return Object.keys(t).forEach(function(n){t[n]instanceof Object&&e[n]&&Object.assign(t[n],A(e[n],t[n]))}),O(O({},e),t)}var ce={type:"cancelation",msg:"operation is manually canceled"};function h(e){var t=!1,n=new Promise(function(r,o){e.then(function(i){return t?o(ce):r(i)}),e.catch(o)});return n.cancel=function(){return t=!0},n}var ue=_.create({config:k,isInitialized:!1,resolve:null,reject:null,monaco:null}),T=R(ue,2),d=T[0],m=T[1];function fe(e){var t=ie.config(e),n=t.monaco,r=q(t,["monaco"]);m(function(o){return{config:A(o.config,r),monaco:n}})}function le(){var e=d(function(t){var n=t.monaco,r=t.isInitialized,o=t.resolve;return{monaco:n,isInitialized:r,resolve:o}});if(!e.isInitialized){if(m({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),h(b);if(window.monaco&&window.monaco.editor)return E(window.monaco),e.resolve(window.monaco),h(b);ae(se,pe)(ge)}return h(b)}function se(e){return document.body.appendChild(e)}function de(e){var t=document.createElement("script");return e&&(t.src=e),t}function pe(e){var t=d(function(r){var o=r.config,i=r.reject;return{config:o,reject:i}}),n=de("".concat(t.config.paths.vs,"/loader.js"));return n.onload=function(){return e()},n.onerror=t.reject,n}function ge(){var e=d(function(n){var r=n.config,o=n.resolve,i=n.reject;return{config:r,resolve:o,reject:i}}),t=window.require;t.config(e.config),t(["vs/editor/editor.main"],function(n){E(n),e.resolve(n)},function(n){e.reject(n)})}function E(e){d().monaco||m({monaco:e})}function ve(){return d(function(e){var t=e.monaco;return t})}var b=new Promise(function(e,t){return m({resolve:e,reject:t})}),me={config:fe,init:le,__getMonacoInstance:ve};const he=me;export{he as default};
