/*
 AngularJS v1.7.8
 (c) 2010-2018 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(C){'use strict';function re(a){if(D(a))w(a.objectMaxDepth)&&(Wb.objectMaxDepth=Xb(a.objectMaxDepth)?a.objectMaxDepth:NaN),w(a.urlErrorParamsEnabled)&&Ga(a.urlErrorParamsEnabled)&&(Wb.urlErrorParamsEnabled=a.urlErrorParamsEnabled);else return Wb}function Xb(a){return W(a)&&0<a}function F(a,b){b=b||Error;return function(){var d=arguments[0],c;c="["+(a?a+":":"")+d+"] http://errors.angularjs.org/1.7.8/"+(a?a+"/":"")+d;for(d=1;d<arguments.length;d++){c=c+(1==d?"?":"&")+"p"+(d-1)+"=";var e=encodeURIComponent,
f;f=arguments[d];f="function"==typeof f?f.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof f?"undefined":"string"!=typeof f?JSON.stringify(f):f;c+=e(f)}return new b(c)}}function ya(a){if(null==a||$a(a))return!1;if(H(a)||A(a)||x&&a instanceof x)return!0;var b="length"in Object(a)&&a.length;return W(b)&&(0<=b&&b-1 in a||"function"===typeof a.item)}function r(a,b,d){var c,e;if(a)if(B(a))for(c in a)"prototype"!==c&&"length"!==c&&"name"!==c&&a.hasOwnProperty(c)&&b.call(d,a[c],c,a);else if(H(a)||
ya(a)){var f="object"!==typeof a;c=0;for(e=a.length;c<e;c++)(f||c in a)&&b.call(d,a[c],c,a)}else if(a.forEach&&a.forEach!==r)a.forEach(b,d,a);else if(Nc(a))for(c in a)b.call(d,a[c],c,a);else if("function"===typeof a.hasOwnProperty)for(c in a)a.hasOwnProperty(c)&&b.call(d,a[c],c,a);else for(c in a)ta.call(a,c)&&b.call(d,a[c],c,a);return a}function Oc(a,b,d){for(var c=Object.keys(a).sort(),e=0;e<c.length;e++)b.call(d,a[c[e]],c[e]);return c}function Yb(a){return function(b,d){a(d,b)}}function se(){return++pb}
function Zb(a,b,d){for(var c=a.$$hashKey,e=0,f=b.length;e<f;++e){var g=b[e];if(D(g)||B(g))for(var k=Object.keys(g),h=0,l=k.length;h<l;h++){var m=k[h],p=g[m];d&&D(p)?ha(p)?a[m]=new Date(p.valueOf()):ab(p)?a[m]=new RegExp(p):p.nodeName?a[m]=p.cloneNode(!0):$b(p)?a[m]=p.clone():(D(a[m])||(a[m]=H(p)?[]:{}),Zb(a[m],[p],!0)):a[m]=p}}c?a.$$hashKey=c:delete a.$$hashKey;return a}function S(a){return Zb(a,Ha.call(arguments,1),!1)}function te(a){return Zb(a,Ha.call(arguments,1),!0)}function fa(a){return parseInt(a,
10)}function ac(a,b){return S(Object.create(a),b)}function E(){}function Ta(a){return a}function ia(a){return function(){return a}}function bc(a){return B(a.toString)&&a.toString!==la}function z(a){return"undefined"===typeof a}function w(a){return"undefined"!==typeof a}function D(a){return null!==a&&"object"===typeof a}function Nc(a){return null!==a&&"object"===typeof a&&!Pc(a)}function A(a){return"string"===typeof a}function W(a){return"number"===typeof a}function ha(a){return"[object Date]"===la.call(a)}
function H(a){return Array.isArray(a)||a instanceof Array}function cc(a){switch(la.call(a)){case "[object Error]":return!0;case "[object Exception]":return!0;case "[object DOMException]":return!0;default:return a instanceof Error}}function B(a){return"function"===typeof a}function ab(a){return"[object RegExp]"===la.call(a)}function $a(a){return a&&a.window===a}function bb(a){return a&&a.$evalAsync&&a.$watch}function Ga(a){return"boolean"===typeof a}function ue(a){return a&&W(a.length)&&ve.test(la.call(a))}
function $b(a){return!(!a||!(a.nodeName||a.prop&&a.attr&&a.find))}function we(a){var b={};a=a.split(",");var d;for(d=0;d<a.length;d++)b[a[d]]=!0;return b}function ua(a){return K(a.nodeName||a[0]&&a[0].nodeName)}function cb(a,b){var d=a.indexOf(b);0<=d&&a.splice(d,1);return d}function Ia(a,b,d){function c(a,b,c){c--;if(0>c)return"...";var d=b.$$hashKey,f;if(H(a)){f=0;for(var g=a.length;f<g;f++)b.push(e(a[f],c))}else if(Nc(a))for(f in a)b[f]=e(a[f],c);else if(a&&"function"===typeof a.hasOwnProperty)for(f in a)a.hasOwnProperty(f)&&
(b[f]=e(a[f],c));else for(f in a)ta.call(a,f)&&(b[f]=e(a[f],c));d?b.$$hashKey=d:delete b.$$hashKey;return b}function e(a,b){if(!D(a))return a;var d=g.indexOf(a);if(-1!==d)return k[d];if($a(a)||bb(a))throw pa("cpws");var d=!1,e=f(a);void 0===e&&(e=H(a)?[]:Object.create(Pc(a)),d=!0);g.push(a);k.push(e);return d?c(a,e,b):e}function f(a){switch(la.call(a)){case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Float32Array]":case "[object Float64Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":return new a.constructor(e(a.buffer),
a.byteOffset,a.length);case "[object ArrayBuffer]":if(!a.slice){var b=new ArrayBuffer(a.byteLength);(new Uint8Array(b)).set(new Uint8Array(a));return b}return a.slice(0);case "[object Boolean]":case "[object Number]":case "[object String]":case "[object Date]":return new a.constructor(a.valueOf());case "[object RegExp]":return b=new RegExp(a.source,a.toString().match(/[^/]*$/)[0]),b.lastIndex=a.lastIndex,b;case "[object Blob]":return new a.constructor([a],{type:a.type})}if(B(a.cloneNode))return a.cloneNode(!0)}
var g=[],k=[];d=Xb(d)?d:NaN;if(b){if(ue(b)||"[object ArrayBuffer]"===la.call(b))throw pa("cpta");if(a===b)throw pa("cpi");H(b)?b.length=0:r(b,function(a,c){"$$hashKey"!==c&&delete b[c]});g.push(a);k.push(b);return c(a,b,d)}return e(a,d)}function dc(a,b){return a===b||a!==a&&b!==b}function va(a,b){if(a===b)return!0;if(null===a||null===b)return!1;if(a!==a&&b!==b)return!0;var d=typeof a,c;if(d===typeof b&&"object"===d)if(H(a)){if(!H(b))return!1;if((d=a.length)===b.length){for(c=0;c<d;c++)if(!va(a[c],
b[c]))return!1;return!0}}else{if(ha(a))return ha(b)?dc(a.getTime(),b.getTime()):!1;if(ab(a))return ab(b)?a.toString()===b.toString():!1;if(bb(a)||bb(b)||$a(a)||$a(b)||H(b)||ha(b)||ab(b))return!1;d=T();for(c in a)if("$"!==c.charAt(0)&&!B(a[c])){if(!va(a[c],b[c]))return!1;d[c]=!0}for(c in b)if(!(c in d)&&"$"!==c.charAt(0)&&w(b[c])&&!B(b[c]))return!1;return!0}return!1}function db(a,b,d){return a.concat(Ha.call(b,d))}function Va(a,b){var d=2<arguments.length?Ha.call(arguments,2):[];return!B(b)||b instanceof
RegExp?b:d.length?function(){return arguments.length?b.apply(a,db(d,arguments,0)):b.apply(a,d)}:function(){return arguments.length?b.apply(a,arguments):b.call(a)}}function Qc(a,b){var d=b;"string"===typeof a&&"$"===a.charAt(0)&&"$"===a.charAt(1)?d=void 0:$a(b)?d="$WINDOW":b&&C.document===b?d="$DOCUMENT":bb(b)&&(d="$SCOPE");return d}function eb(a,b){if(!z(a))return W(b)||(b=b?2:null),JSON.stringify(a,Qc,b)}function Rc(a){return A(a)?JSON.parse(a):a}function ec(a,b){a=a.replace(xe,"");var d=Date.parse("Jan 01, 1970 00:00:00 "+
a)/6E4;return X(d)?b:d}function Sc(a,b){a=new Date(a.getTime());a.setMinutes(a.getMinutes()+b);return a}function fc(a,b,d){d=d?-1:1;var c=a.getTimezoneOffset();b=ec(b,c);return Sc(a,d*(b-c))}function za(a){a=x(a).clone().empty();var b=x("<div></div>").append(a).html();try{return a[0].nodeType===Pa?K(b):b.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/,function(a,b){return"<"+K(b)})}catch(d){return K(b)}}function Tc(a){try{return decodeURIComponent(a)}catch(b){}}function gc(a){var b={};r((a||"").split("&"),
function(a){var c,e,f;a&&(e=a=a.replace(/\+/g,"%20"),c=a.indexOf("="),-1!==c&&(e=a.substring(0,c),f=a.substring(c+1)),e=Tc(e),w(e)&&(f=w(f)?Tc(f):!0,ta.call(b,e)?H(b[e])?b[e].push(f):b[e]=[b[e],f]:b[e]=f))});return b}function ye(a){var b=[];r(a,function(a,c){H(a)?r(a,function(a){b.push(ba(c,!0)+(!0===a?"":"="+ba(a,!0)))}):b.push(ba(c,!0)+(!0===a?"":"="+ba(a,!0)))});return b.length?b.join("&"):""}function hc(a){return ba(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function ba(a,
b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,b?"%20":"+")}function ze(a,b){var d,c,e=Qa.length;for(c=0;c<e;++c)if(d=Qa[c]+b,A(d=a.getAttribute(d)))return d;return null}function Ae(a,b){var d,c,e={};r(Qa,function(b){b+="app";!d&&a.hasAttribute&&a.hasAttribute(b)&&(d=a,c=a.getAttribute(b))});r(Qa,function(b){b+="app";var e;!d&&(e=a.querySelector("["+b.replace(":","\\:")+"]"))&&(d=e,c=e.getAttribute(b))});
d&&(Be?(e.strictDi=null!==ze(d,"strict-di"),b(d,c?[c]:[],e)):C.console.error("AngularJS: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match."))}function Uc(a,b,d){D(d)||(d={});d=S({strictDi:!1},d);var c=function(){a=x(a);if(a.injector()){var c=a[0]===C.document?"document":za(a);throw pa("btstrpd",c.replace(/</,"&lt;").replace(/>/,"&gt;"));}b=b||[];b.unshift(["$provide",function(b){b.value("$rootElement",a)}]);d.debugInfoEnabled&&b.push(["$compileProvider",
function(a){a.debugInfoEnabled(!0)}]);b.unshift("ng");c=fb(b,d.strictDi);c.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;C&&e.test(C.name)&&(d.debugInfoEnabled=!0,C.name=C.name.replace(e,""));if(C&&!f.test(C.name))return c();C.name=C.name.replace(f,"");ca.resumeBootstrap=function(a){r(a,function(a){b.push(a)});return c()};B(ca.resumeDeferredBootstrap)&&
ca.resumeDeferredBootstrap()}function Ce(){C.name="NG_ENABLE_DEBUG_INFO!"+C.name;C.location.reload()}function De(a){a=ca.element(a).injector();if(!a)throw pa("test");return a.get("$$testability")}function Vc(a,b){b=b||"_";return a.replace(Ee,function(a,c){return(c?b:"")+a.toLowerCase()})}function Fe(){var a;if(!Wc){var b=qb();(rb=z(b)?C.jQuery:b?C[b]:void 0)&&rb.fn.on?(x=rb,S(rb.fn,{scope:Wa.scope,isolateScope:Wa.isolateScope,controller:Wa.controller,injector:Wa.injector,inheritedData:Wa.inheritedData})):
x=Y;a=x.cleanData;x.cleanData=function(b){for(var c,e=0,f;null!=(f=b[e]);e++)(c=(x._data(f)||{}).events)&&c.$destroy&&x(f).triggerHandler("$destroy");a(b)};ca.element=x;Wc=!0}}function gb(a,b,d){if(!a)throw pa("areq",b||"?",d||"required");return a}function sb(a,b,d){d&&H(a)&&(a=a[a.length-1]);gb(B(a),b,"not a function, got "+(a&&"object"===typeof a?a.constructor.name||"Object":typeof a));return a}function Ja(a,b){if("hasOwnProperty"===a)throw pa("badname",b);}function Ge(a,b,d){if(!b)return a;b=b.split(".");
for(var c,e=a,f=b.length,g=0;g<f;g++)c=b[g],a&&(a=(e=a)[c]);return!d&&B(a)?Va(e,a):a}function tb(a){for(var b=a[0],d=a[a.length-1],c,e=1;b!==d&&(b=b.nextSibling);e++)if(c||a[e]!==b)c||(c=x(Ha.call(a,0,e))),c.push(b);return c||a}function T(){return Object.create(null)}function ic(a){if(null==a)return"";switch(typeof a){case "string":break;case "number":a=""+a;break;default:a=!bc(a)||H(a)||ha(a)?eb(a):a.toString()}return a}function He(a){function b(a,b,c){return a[b]||(a[b]=c())}var d=F("$injector"),
c=F("ng");a=b(a,"angular",Object);a.$$minErr=a.$$minErr||F;return b(a,"module",function(){var a={};return function(f,g,k){var h={};if("hasOwnProperty"===f)throw c("badname","module");g&&a.hasOwnProperty(f)&&(a[f]=null);return b(a,f,function(){function a(b,c,d,f){f||(f=e);return function(){f[d||"push"]([b,c,arguments]);return t}}function b(a,c,d){d||(d=e);return function(b,e){e&&B(e)&&(e.$$moduleName=f);d.push([a,c,arguments]);return t}}if(!g)throw d("nomod",f);var e=[],n=[],s=[],G=a("$injector","invoke",
"push",n),t={_invokeQueue:e,_configBlocks:n,_runBlocks:s,info:function(a){if(w(a)){if(!D(a))throw c("aobj","value");h=a;return this}return h},requires:g,name:f,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:b("$provide","decorator",n),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider",
"directive"),component:b("$compileProvider","component"),config:G,run:function(a){s.push(a);return this}};k&&G(k);return t})}})}function ja(a,b){if(H(a)){b=b||[];for(var d=0,c=a.length;d<c;d++)b[d]=a[d]}else if(D(a))for(d in b=b||{},a)if("$"!==d.charAt(0)||"$"!==d.charAt(1))b[d]=a[d];return b||a}function Ie(a,b){var d=[];Xb(b)&&(a=ca.copy(a,null,b));return JSON.stringify(a,function(a,b){b=Qc(a,b);if(D(b)){if(0<=d.indexOf(b))return"...";d.push(b)}return b})}function Je(a){S(a,{errorHandlingConfig:re,
bootstrap:Uc,copy:Ia,extend:S,merge:te,equals:va,element:x,forEach:r,injector:fb,noop:E,bind:Va,toJson:eb,fromJson:Rc,identity:Ta,isUndefined:z,isDefined:w,isString:A,isFunction:B,isObject:D,isNumber:W,isElement:$b,isArray:H,version:Ke,isDate:ha,callbacks:{$$counter:0},getTestability:De,reloadWithDebugInfo:Ce,$$minErr:F,$$csp:Aa,$$encodeUriSegment:hc,$$encodeUriQuery:ba,$$lowercase:K,$$stringify:ic,$$uppercase:ub});kc=He(C);kc("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Le});
a.provider("$compile",Xc).directive({a:Me,input:Yc,textarea:Yc,form:Ne,script:Oe,select:Pe,option:Qe,ngBind:Re,ngBindHtml:Se,ngBindTemplate:Te,ngClass:Ue,ngClassEven:Ve,ngClassOdd:We,ngCloak:Xe,ngController:Ye,ngForm:Ze,ngHide:$e,ngIf:af,ngInclude:bf,ngInit:cf,ngNonBindable:df,ngPluralize:ef,ngRef:ff,ngRepeat:gf,ngShow:hf,ngStyle:jf,ngSwitch:kf,ngSwitchWhen:lf,ngSwitchDefault:mf,ngOptions:nf,ngTransclude:of,ngModel:pf,ngList:qf,ngChange:rf,pattern:Zc,ngPattern:Zc,required:$c,ngRequired:$c,minlength:ad,
ngMinlength:ad,maxlength:bd,ngMaxlength:bd,ngValue:sf,ngModelOptions:tf}).directive({ngInclude:uf,input:vf}).directive(vb).directive(cd);a.provider({$anchorScroll:wf,$animate:xf,$animateCss:yf,$$animateJs:zf,$$animateQueue:Af,$$AnimateRunner:Bf,$$animateAsyncRun:Cf,$browser:Df,$cacheFactory:Ef,$controller:Ff,$document:Gf,$$isDocumentHidden:Hf,$exceptionHandler:If,$filter:dd,$$forceReflow:Jf,$interpolate:Kf,$interval:Lf,$$intervalFactory:Mf,$http:Nf,$httpParamSerializer:Of,$httpParamSerializerJQLike:Pf,
$httpBackend:Qf,$xhrFactory:Rf,$jsonpCallbacks:Sf,$location:Tf,$log:Uf,$parse:Vf,$rootScope:Wf,$q:Xf,$$q:Yf,$sce:Zf,$sceDelegate:$f,$sniffer:ag,$$taskTrackerFactory:bg,$templateCache:cg,$templateRequest:dg,$$testability:eg,$timeout:fg,$window:gg,$$rAF:hg,$$jqLite:ig,$$Map:jg,$$cookieReader:kg})}]).info({angularVersion:"1.7.8"})}function wb(a,b){return b.toUpperCase()}function xb(a){return a.replace(lg,wb)}function lc(a){a=a.nodeType;return 1===a||!a||9===a}function ed(a,b){var d,c,e=b.createDocumentFragment(),
f=[];if(mc.test(a)){d=e.appendChild(b.createElement("div"));c=(mg.exec(a)||["",""])[1].toLowerCase();c=oa[c]||oa._default;d.innerHTML=c[1]+a.replace(ng,"<$1></$2>")+c[2];for(c=c[0];c--;)d=d.lastChild;f=db(f,d.childNodes);d=e.firstChild;d.textContent=""}else f.push(b.createTextNode(a));e.textContent="";e.innerHTML="";r(f,function(a){e.appendChild(a)});return e}function Y(a){if(a instanceof Y)return a;var b;A(a)&&(a=U(a),b=!0);if(!(this instanceof Y)){if(b&&"<"!==a.charAt(0))throw nc("nosel");return new Y(a)}if(b){b=
C.document;var d;a=(d=og.exec(a))?[b.createElement(d[1])]:(d=ed(a,b))?d.childNodes:[];oc(this,a)}else B(a)?fd(a):oc(this,a)}function pc(a){return a.cloneNode(!0)}function yb(a,b){!b&&lc(a)&&x.cleanData([a]);a.querySelectorAll&&x.cleanData(a.querySelectorAll("*"))}function gd(a){for(var b in a)return!1;return!0}function hd(a){var b=a.ng339,d=b&&Ka[b],c=d&&d.events,d=d&&d.data;d&&!gd(d)||c&&!gd(c)||(delete Ka[b],a.ng339=void 0)}function id(a,b,d,c){if(w(c))throw nc("offargs");var e=(c=zb(a))&&c.events,
f=c&&c.handle;if(f){if(b){var g=function(b){var c=e[b];w(d)&&cb(c||[],d);w(d)&&c&&0<c.length||(a.removeEventListener(b,f),delete e[b])};r(b.split(" "),function(a){g(a);Ab[a]&&g(Ab[a])})}else for(b in e)"$destroy"!==b&&a.removeEventListener(b,f),delete e[b];hd(a)}}function qc(a,b){var d=a.ng339;if(d=d&&Ka[d])b?delete d.data[b]:d.data={},hd(a)}function zb(a,b){var d=a.ng339,d=d&&Ka[d];b&&!d&&(a.ng339=d=++pg,d=Ka[d]={events:{},data:{},handle:void 0});return d}function rc(a,b,d){if(lc(a)){var c,e=w(d),
f=!e&&b&&!D(b),g=!b;a=(a=zb(a,!f))&&a.data;if(e)a[xb(b)]=d;else{if(g)return a;if(f)return a&&a[xb(b)];for(c in b)a[xb(c)]=b[c]}}}function Bb(a,b){return a.getAttribute?-1<(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+b+" "):!1}function Cb(a,b){if(b&&a.setAttribute){var d=(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," "),c=d;r(b.split(" "),function(a){a=U(a);c=c.replace(" "+a+" "," ")});c!==d&&a.setAttribute("class",U(c))}}function Db(a,b){if(b&&a.setAttribute){var d=
(" "+(a.getAttribute("class")||"")+" ").replace(/[\n\t]/g," "),c=d;r(b.split(" "),function(a){a=U(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});c!==d&&a.setAttribute("class",U(c))}}function oc(a,b){if(b)if(b.nodeType)a[a.length++]=b;else{var d=b.length;if("number"===typeof d&&b.window!==b){if(d)for(var c=0;c<d;c++)a[a.length++]=b[c]}else a[a.length++]=b}}function jd(a,b){return Eb(a,"$"+(b||"ngController")+"Controller")}function Eb(a,b,d){9===a.nodeType&&(a=a.documentElement);for(b=H(b)?b:[b];a;){for(var c=
0,e=b.length;c<e;c++)if(w(d=x.data(a,b[c])))return d;a=a.parentNode||11===a.nodeType&&a.host}}function kd(a){for(yb(a,!0);a.firstChild;)a.removeChild(a.firstChild)}function Fb(a,b){b||yb(a);var d=a.parentNode;d&&d.removeChild(a)}function qg(a,b){b=b||C;if("complete"===b.document.readyState)b.setTimeout(a);else x(b).on("load",a)}function fd(a){function b(){C.document.removeEventListener("DOMContentLoaded",b);C.removeEventListener("load",b);a()}"complete"===C.document.readyState?C.setTimeout(a):(C.document.addEventListener("DOMContentLoaded",
b),C.addEventListener("load",b))}function ld(a,b){var d=Gb[b.toLowerCase()];return d&&md[ua(a)]&&d}function rg(a,b){var d=function(c,d){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=b[d||c.type],g=f?f.length:0;if(g){if(z(c.immediatePropagationStopped)){var k=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();k&&k.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};
var h=f.specialHandlerWrapper||sg;1<g&&(f=ja(f));for(var l=0;l<g;l++)c.isImmediatePropagationStopped()||h(a,c,f[l])}};d.elem=a;return d}function sg(a,b,d){d.call(a,b)}function tg(a,b,d){var c=b.relatedTarget;c&&(c===a||ug.call(a,c))||d.call(a,b)}function ig(){this.$get=function(){return S(Y,{hasClass:function(a,b){a.attr&&(a=a[0]);return Bb(a,b)},addClass:function(a,b){a.attr&&(a=a[0]);return Db(a,b)},removeClass:function(a,b){a.attr&&(a=a[0]);return Cb(a,b)}})}}function La(a,b){var d=a&&a.$$hashKey;
if(d)return"function"===typeof d&&(d=a.$$hashKey()),d;d=typeof a;return d="function"===d||"object"===d&&null!==a?a.$$hashKey=d+":"+(b||se)():d+":"+a}function nd(){this._keys=[];this._values=[];this._lastKey=NaN;this._lastIndex=-1}function od(a){a=Function.prototype.toString.call(a).replace(vg,"");return a.match(wg)||a.match(xg)}function yg(a){return(a=od(a))?"function("+(a[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function fb(a,b){function d(a){return function(b,c){if(D(b))r(b,Yb(a));else return a(b,
c)}}function c(a,b){Ja(a,"service");if(B(b)||H(b))b=n.instantiate(b);if(!b.$get)throw Ba("pget",a);return p[a+"Provider"]=b}function e(a,b){return function(){var c=t.invoke(b,this);if(z(c))throw Ba("undef",a);return c}}function f(a,b,d){return c(a,{$get:!1!==d?e(a,b):b})}function g(a){gb(z(a)||H(a),"modulesToLoad","not an array");var b=[],c;r(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=n.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.set(a,!0);try{A(a)?(c=kc(a),
t.modules[a]=c,b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):B(a)?b.push(n.invoke(a)):H(a)?b.push(n.invoke(a)):sb(a,"module")}catch(e){throw H(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1===e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ba("modulerr",a,e.stack||e.message||e);}}});return b}function k(a,c){function d(b,e){if(a.hasOwnProperty(b)){if(a[b]===h)throw Ba("cdep",b+" <- "+l.join(" <- "));return a[b]}try{return l.unshift(b),a[b]=h,a[b]=c(b,e),
a[b]}catch(f){throw a[b]===h&&delete a[b],f;}finally{l.shift()}}function e(a,c,f){var g=[];a=fb.$$annotate(a,b,f);for(var h=0,k=a.length;h<k;h++){var l=a[h];if("string"!==typeof l)throw Ba("itkn",l);g.push(c&&c.hasOwnProperty(l)?c[l]:d(l,f))}return g}return{invoke:function(a,b,c,d){"string"===typeof c&&(d=c,c=null);c=e(a,c,d);H(a)&&(a=a[a.length-1]);d=a;if(Ca||"function"!==typeof d)d=!1;else{var f=d.$$ngIsClass;Ga(f)||(f=d.$$ngIsClass=/^class\b/.test(Function.prototype.toString.call(d)));d=f}return d?
(c.unshift(null),new (Function.prototype.bind.apply(a,c))):a.apply(b,c)},instantiate:function(a,b,c){var d=H(a)?a[a.length-1]:a;a=e(a,b,c);a.unshift(null);return new (Function.prototype.bind.apply(d,a))},get:d,annotate:fb.$$annotate,has:function(b){return p.hasOwnProperty(b+"Provider")||a.hasOwnProperty(b)}}}b=!0===b;var h={},l=[],m=new Hb,p={$provide:{provider:d(c),factory:d(f),service:d(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:d(function(a,b){return f(a,
ia(b),!1)}),constant:d(function(a,b){Ja(a,"constant");p[a]=b;s[a]=b}),decorator:function(a,b){var c=n.get(a+"Provider"),d=c.$get;c.$get=function(){var a=t.invoke(d,c);return t.invoke(b,null,{$delegate:a})}}}},n=p.$injector=k(p,function(a,b){ca.isString(b)&&l.push(b);throw Ba("unpr",l.join(" <- "));}),s={},G=k(s,function(a,b){var c=n.get(a+"Provider",b);return t.invoke(c.$get,c,void 0,a)}),t=G;p.$injectorProvider={$get:ia(G)};t.modules=n.modules=T();var N=g(a),t=G.get("$injector");t.strictDi=b;r(N,
function(a){a&&t.invoke(a)});t.loadNewModules=function(a){r(g(a),function(a){a&&t.invoke(a)})};return t}function wf(){var a=!0;this.disableAutoScrolling=function(){a=!1};this.$get=["$window","$location","$rootScope",function(b,d,c){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===ua(a))return b=a,!0});return b}function f(a){if(a){a.scrollIntoView();var c;c=g.yOffset;B(c)?c=c():$b(c)?(c=c[0],c="fixed"!==b.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):W(c)||
(c=0);c&&(a=a.getBoundingClientRect().top,b.scrollBy(0,a-c))}else b.scrollTo(0,0)}function g(a){a=A(a)?a:W(a)?a.toString():d.hash();var b;a?(b=k.getElementById(a))?f(b):(b=e(k.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var k=b.document;a&&c.$watch(function(){return d.hash()},function(a,b){a===b&&""===a||qg(function(){c.$evalAsync(g)})});return g}]}function hb(a,b){if(!a&&!b)return"";if(!a)return b;if(!b)return a;H(a)&&(a=a.join(" "));H(b)&&(b=b.join(" "));return a+" "+b}function zg(a){A(a)&&
(a=a.split(" "));var b=T();r(a,function(a){a.length&&(b[a]=!0)});return b}function ra(a){return D(a)?a:{}}function Ag(a,b,d,c,e){function f(){qa=null;k()}function g(){t=y();t=z(t)?null:t;va(t,P)&&(t=P);N=P=t}function k(){var a=N;g();if(v!==h.url()||a!==t)v=h.url(),N=t,r(J,function(a){a(h.url(),t)})}var h=this,l=a.location,m=a.history,p=a.setTimeout,n=a.clearTimeout,s={},G=e(d);h.isMock=!1;h.$$completeOutstandingRequest=G.completeTask;h.$$incOutstandingRequestCount=G.incTaskCount;h.notifyWhenNoOutstandingRequests=
G.notifyWhenNoPendingTasks;var t,N,v=l.href,jc=b.find("base"),qa=null,y=c.history?function(){try{return m.state}catch(a){}}:E;g();h.url=function(b,d,e){z(e)&&(e=null);l!==a.location&&(l=a.location);m!==a.history&&(m=a.history);if(b){var f=N===e;b=ga(b).href;if(v===b&&(!c.history||f))return h;var k=v&&Da(v)===Da(b);v=b;N=e;!c.history||k&&f?(k||(qa=b),d?l.replace(b):k?(d=l,e=b,f=e.indexOf("#"),e=-1===f?"":e.substr(f),d.hash=e):l.href=b,l.href!==b&&(qa=b)):(m[d?"replaceState":"pushState"](e,"",b),g());
qa&&(qa=b);return h}return(qa||l.href).replace(/#$/,"")};h.state=function(){return t};var J=[],I=!1,P=null;h.onUrlChange=function(b){if(!I){if(c.history)x(a).on("popstate",f);x(a).on("hashchange",f);I=!0}J.push(b);return b};h.$$applicationDestroyed=function(){x(a).off("hashchange popstate",f)};h.$$checkUrlChange=k;h.baseHref=function(){var a=jc.attr("href");return a?a.replace(/^(https?:)?\/\/[^/]*/,""):""};h.defer=function(a,b,c){var d;b=b||0;c=c||G.DEFAULT_TASK_TYPE;G.incTaskCount(c);d=p(function(){delete s[d];
G.completeTask(a,c)},b);s[d]=c;return d};h.defer.cancel=function(a){if(s.hasOwnProperty(a)){var b=s[a];delete s[a];n(a);G.completeTask(E,b);return!0}return!1}}function Df(){this.$get=["$window","$log","$sniffer","$document","$$taskTrackerFactory",function(a,b,d,c,e){return new Ag(a,c,b,d,e)}]}function Ef(){this.$get=function(){function a(a,c){function e(a){a!==p&&(n?n===a&&(n=a.n):n=a,f(a.n,a.p),f(a,p),p=a,p.n=null)}function f(a,b){a!==b&&(a&&(a.p=b),b&&(b.n=a))}if(a in b)throw F("$cacheFactory")("iid",
a);var g=0,k=S({},c,{id:a}),h=T(),l=c&&c.capacity||Number.MAX_VALUE,m=T(),p=null,n=null;return b[a]={put:function(a,b){if(!z(b)){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}a in h||g++;h[a]=b;g>l&&this.remove(n.key);return b}},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return h[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b===p&&(p=b.p);b===n&&(n=b.n);f(b.n,b.p);delete m[a]}a in h&&(delete h[a],g--)},removeAll:function(){h=T();g=0;m=T();
p=n=null},destroy:function(){m=k=h=null;delete b[a]},info:function(){return S({},k,{size:g})}}}var b={};a.info=function(){var a={};r(b,function(b,e){a[e]=b.info()});return a};a.get=function(a){return b[a]};return a}}function cg(){this.$get=["$cacheFactory",function(a){return a("templates")}]}function Xc(a,b){function d(a,b,c){var d=/^([@&]|[=<](\*?))(\??)\s*([\w$]*)$/,e=T();r(a,function(a,f){a=a.trim();if(a in p)e[f]=p[a];else{var g=a.match(d);if(!g)throw $("iscp",b,f,a,c?"controller bindings definition":
"isolate scope definition");e[f]={mode:g[1][0],collection:"*"===g[2],optional:"?"===g[3],attrName:g[4]||f};g[4]&&(p[a]=e[f])}});return e}function c(a){var b=a.charAt(0);if(!b||b!==K(b))throw $("baddir",a);if(a!==a.trim())throw $("baddir",a);}function e(a){var b=a.require||a.controller&&a.name;!H(b)&&D(b)&&r(b,function(a,c){var d=a.match(l);a.substring(d[0].length)||(b[c]=d[0]+c)});return b}var f={},g=/^\s*directive:\s*([\w-]+)\s+(.*)$/,k=/(([\w-]+)(?::([^;]+))?;?)/,h=we("ngSrc,ngSrcset,src,srcset"),
l=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,m=/^(on[a-z]+|formaction)$/,p=T();this.directive=function qa(b,d){gb(b,"name");Ja(b,"directive");A(b)?(c(b),gb(d,"directiveFactory"),f.hasOwnProperty(b)||(f[b]=[],a.factory(b+"Directive",["$injector","$exceptionHandler",function(a,c){var d=[];r(f[b],function(f,g){try{var h=a.invoke(f);B(h)?h={compile:ia(h)}:!h.compile&&h.link&&(h.compile=ia(h.link));h.priority=h.priority||0;h.index=g;h.name=h.name||b;h.require=e(h);var k=h,l=h.restrict;if(l&&(!A(l)||!/[EACM]/.test(l)))throw $("badrestrict",
l,b);k.restrict=l||"EA";h.$$moduleName=f.$$moduleName;d.push(h)}catch(m){c(m)}});return d}])),f[b].push(d)):r(b,Yb(qa));return this};this.component=function y(a,b){function c(a){function e(b){return B(b)||H(b)?function(c,d){return a.invoke(b,this,{$element:c,$attrs:d})}:b}var f=b.template||b.templateUrl?b.template:"",g={controller:d,controllerAs:Bg(b.controller)||b.controllerAs||"$ctrl",template:e(f),templateUrl:e(b.templateUrl),transclude:b.transclude,scope:{},bindToController:b.bindings||{},restrict:"E",
require:b.require};r(b,function(a,b){"$"===b.charAt(0)&&(g[b]=a)});return g}if(!A(a))return r(a,Yb(Va(this,y))),this;var d=b.controller||function(){};r(b,function(a,b){"$"===b.charAt(0)&&(c[b]=a,B(d)&&(d[b]=a))});c.$inject=["$injector"];return this.directive(a,c)};this.aHrefSanitizationWhitelist=function(a){return w(a)?(b.aHrefSanitizationWhitelist(a),this):b.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(a){return w(a)?(b.imgSrcSanitizationWhitelist(a),this):b.imgSrcSanitizationWhitelist()};
var n=!0;this.debugInfoEnabled=function(a){return w(a)?(n=a,this):n};var s=!1;this.strictComponentBindingsEnabled=function(a){return w(a)?(s=a,this):s};var G=10;this.onChangesTtl=function(a){return arguments.length?(G=a,this):G};var t=!0;this.commentDirectivesEnabled=function(a){return arguments.length?(t=a,this):t};var N=!0;this.cssClassDirectivesEnabled=function(a){return arguments.length?(N=a,this):N};var v=T();this.addPropertySecurityContext=function(a,b,c){var d=a.toLowerCase()+"|"+b.toLowerCase();
if(d in v&&v[d]!==c)throw $("ctxoverride",a,b,v[d],c);v[d]=c;return this};(function(){function a(b,c){r(c,function(a){v[a.toLowerCase()]=b})}a(V.HTML,["iframe|srcdoc","*|innerHTML","*|outerHTML"]);a(V.CSS,["*|style"]);a(V.URL,"area|href area|ping a|href a|ping blockquote|cite body|background del|cite input|src ins|cite q|cite".split(" "));a(V.MEDIA_URL,"audio|src img|src img|srcset source|src source|srcset track|src video|src video|poster".split(" "));a(V.RESOURCE_URL,"*|formAction applet|code applet|codebase base|href embed|src frame|src form|action head|profile html|manifest iframe|src link|href media|src object|codebase object|data script|src".split(" "))})();
this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$sce","$animate",function(a,b,c,e,p,M,L,u,R){function q(){try{if(!--Ja)throw Ua=void 0,$("infchng",G);L.$apply(function(){for(var a=0,b=Ua.length;a<b;++a)try{Ua[a]()}catch(d){c(d)}Ua=void 0})}finally{Ja++}}function ma(a,b){if(!a)return a;if(!A(a))throw $("srcset",b,a.toString());for(var c="",d=U(a),e=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,e=/\s/.test(d)?e:/(,)/,d=d.split(e),e=Math.floor(d.length/
2),f=0;f<e;f++)var g=2*f,c=c+u.getTrustedMediaUrl(U(d[g])),c=c+(" "+U(d[g+1]));d=U(d[2*f]).split(/\s/);c+=u.getTrustedMediaUrl(U(d[0]));2===d.length&&(c+=" "+U(d[1]));return c}function w(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr={};this.$$element=a}function O(a,b,c){Fa.innerHTML="<span "+b+">";b=Fa.firstChild.attributes;var d=b[0];b.removeNamedItem(d.name);d.value=c;a.attributes.setNamedItem(d)}function sa(a,b){try{a.addClass(b)}catch(c){}}
function da(a,b,c,d,e){a instanceof x||(a=x(a));var f=Xa(a,b,a,c,d,e);da.$$addScopeClass(a);var g=null;return function(b,c,d){if(!a)throw $("multilink");gb(b,"scope");e&&e.needsNewScope&&(b=b.$parent.$new());d=d||{};var h=d.parentBoundTranscludeFn,k=d.transcludeControllers;d=d.futureParentElement;h&&h.$$boundTransclude&&(h=h.$$boundTransclude);g||(g=(d=d&&d[0])?"foreignobject"!==ua(d)&&la.call(d).match(/SVG/)?"svg":"html":"html");d="html"!==g?x(ja(g,x("<div></div>").append(a).html())):c?Wa.clone.call(a):
a;if(k)for(var l in k)d.data("$"+l+"Controller",k[l].instance);da.$$addScopeInfo(d,b);c&&c(d,b);f&&f(b,d,d,h);c||(a=f=null);return d}}function Xa(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,m,p,I,t;if(n)for(t=Array(c.length),m=0;m<h.length;m+=3)f=h[m],t[f]=c[f];else t=c;m=0;for(p=h.length;m<p;)k=t[h[m++]],c=h[m++],f=h[m++],c?(c.scope?(l=a.$new(),da.$$addScopeInfo(x(k),l)):l=a,I=c.transcludeOnThisElement?ka(a,c.transclude,e):!c.templateOnThisElement&&e?e:!e&&b?ka(a,b):null,c(f,l,k,d,I)):f&&f(a,k.childNodes,
void 0,e)}for(var h=[],k=H(a)||a instanceof x,l,m,p,I,n,t=0;t<a.length;t++){l=new w;11===Ca&&ib(a,t,k);m=sc(a[t],[],l,0===t?d:void 0,e);(f=m.length?aa(m,a[t],l,b,c,null,[],[],f):null)&&f.scope&&da.$$addScopeClass(l.$$element);l=f&&f.terminal||!(p=a[t].childNodes)||!p.length?null:Xa(p,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&f.transclude:b);if(f||l)h.push(t,f,l),I=!0,n=n||f;f=null}return I?g:null}function ib(a,b,c){var d=a[b],e=d.parentNode,f;if(d.nodeType===Pa)for(;;){f=e?d.nextSibling:
a[b+1];if(!f||f.nodeType!==Pa)break;d.nodeValue+=f.nodeValue;f.parentNode&&f.parentNode.removeChild(f);c&&f===a[b+1]&&a.splice(b+1,1)}}function ka(a,b,c){function d(e,f,g,h,k){e||(e=a.$new(!1,k),e.$$transcluded=!0);return b(e,f,{parentBoundTranscludeFn:c,transcludeControllers:g,futureParentElement:h})}var e=d.$$slots=T(),f;for(f in b.$$slots)e[f]=b.$$slots[f]?ka(a,b.$$slots[f],c):null;return d}function sc(a,b,d,e,f){var g=d.$attr,h;switch(a.nodeType){case 1:h=ua(a);X(b,wa(h),"E",e,f);for(var l,m,
n,t,J,s=a.attributes,v=0,G=s&&s.length;v<G;v++){var P=!1,N=!1,r=!1,y=!1,u=!1,M;l=s[v];m=l.name;t=l.value;n=wa(m.toLowerCase());(J=n.match(Ra))?(r="Attr"===J[1],y="Prop"===J[1],u="On"===J[1],m=m.replace(pd,"").toLowerCase().substr(4+J[1].length).replace(/_(.)/g,function(a,b){return b.toUpperCase()})):(M=n.match(Sa))&&ca(M[1])&&(P=m,N=m.substr(0,m.length-5)+"end",m=m.substr(0,m.length-6));if(y||u)d[n]=t,g[n]=l.name,y?Ea(a,b,n,m):b.push(qd(p,L,c,n,m,!1));else{n=wa(m.toLowerCase());g[n]=m;if(r||!d.hasOwnProperty(n))d[n]=
t,ld(a,n)&&(d[n]=!0);Ia(a,b,t,n,r);X(b,n,"A",e,f,P,N)}}"input"===h&&"hidden"===a.getAttribute("type")&&a.setAttribute("autocomplete","off");if(!Qa)break;g=a.className;D(g)&&(g=g.animVal);if(A(g)&&""!==g)for(;a=k.exec(g);)n=wa(a[2]),X(b,n,"C",e,f)&&(d[n]=U(a[3])),g=g.substr(a.index+a[0].length);break;case Pa:na(b,a.nodeValue);break;case 8:if(!Oa)break;F(a,b,d,e,f)}b.sort(ia);return b}function F(a,b,c,d,e){try{var f=g.exec(a.nodeValue);if(f){var h=wa(f[1]);X(b,h,"M",d,e)&&(c[h]=U(f[2]))}}catch(k){}}
function V(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw $("uterdir",b,c);1===a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return x(d)}function Y(a,b,c){return function(d,e,f,g,h){e=V(e[0],b,c);return a(d,e,f,g,h)}}function Z(a,b,c,d,e,f){var g;return a?da(b,c,d,e,f):function(){g||(g=da(b,c,d,e,f),b=c=f=null);return g.apply(this,arguments)}}function aa(a,b,d,e,f,g,h,k,l){function m(a,b,c,d){if(a){c&&(a=
Y(a,c,d));a.require=u.require;a.directiveName=Q;if(s===u||u.$$isolateScope)a=Aa(a,{isolateScope:!0});h.push(a)}if(b){c&&(b=Y(b,c,d));b.require=u.require;b.directiveName=Q;if(s===u||u.$$isolateScope)b=Aa(b,{isolateScope:!0});k.push(b)}}function p(a,e,f,g,l){function m(a,b,c,d){var e;bb(a)||(d=c,c=b,b=a,a=void 0);N&&(e=P);c||(c=N?Q.parent():Q);if(d){var f=l.$$slots[d];if(f)return f(a,b,e,c,R);if(z(f))throw $("noslot",d,za(Q));}else return l(a,b,e,c,R)}var n,u,L,y,G,P,M,Q;b===f?(g=d,Q=d.$$element):(Q=
x(f),g=new w(Q,d));G=e;s?y=e.$new(!0):t&&(G=e.$parent);l&&(M=m,M.$$boundTransclude=l,M.isSlotFilled=function(a){return!!l.$$slots[a]});J&&(P=ea(Q,g,M,J,y,e,s));s&&(da.$$addScopeInfo(Q,y,!0,!(v&&(v===s||v===s.$$originalDirective))),da.$$addScopeClass(Q,!0),y.$$isolateBindings=s.$$isolateBindings,u=Da(e,g,y,y.$$isolateBindings,s),u.removeWatches&&y.$on("$destroy",u.removeWatches));for(n in P){u=J[n];L=P[n];var Cg=u.$$bindings.bindToController;L.instance=L();Q.data("$"+u.name+"Controller",L.instance);
L.bindingInfo=Da(G,g,L.instance,Cg,u)}r(J,function(a,b){var c=a.require;a.bindToController&&!H(c)&&D(c)&&S(P[b].instance,W(b,c,Q,P))});r(P,function(a){var b=a.instance;if(B(b.$onChanges))try{b.$onChanges(a.bindingInfo.initialChanges)}catch(d){c(d)}if(B(b.$onInit))try{b.$onInit()}catch(e){c(e)}B(b.$doCheck)&&(G.$watch(function(){b.$doCheck()}),b.$doCheck());B(b.$onDestroy)&&G.$on("$destroy",function(){b.$onDestroy()})});n=0;for(u=h.length;n<u;n++)L=h[n],Ba(L,L.isolateScope?y:e,Q,g,L.require&&W(L.directiveName,
L.require,Q,P),M);var R=e;s&&(s.template||null===s.templateUrl)&&(R=y);a&&a(R,f.childNodes,void 0,l);for(n=k.length-1;0<=n;n--)L=k[n],Ba(L,L.isolateScope?y:e,Q,g,L.require&&W(L.directiveName,L.require,Q,P),M);r(P,function(a){a=a.instance;B(a.$postLink)&&a.$postLink()})}l=l||{};for(var n=-Number.MAX_VALUE,t=l.newScopeDirective,J=l.controllerDirectives,s=l.newIsolateScopeDirective,v=l.templateDirective,L=l.nonTlbTranscludeDirective,G=!1,P=!1,N=l.hasElementTranscludeDirective,y=d.$$element=x(b),u,Q,
M,R=e,q,ma=!1,Ib=!1,O,sa=0,A=a.length;sa<A;sa++){u=a[sa];var E=u.$$start,ib=u.$$end;E&&(y=V(b,E,ib));M=void 0;if(n>u.priority)break;if(O=u.scope)u.templateUrl||(D(O)?(ba("new/isolated scope",s||t,u,y),s=u):ba("new/isolated scope",s,u,y)),t=t||u;Q=u.name;if(!ma&&(u.replace&&(u.templateUrl||u.template)||u.transclude&&!u.$$tlb)){for(O=sa+1;ma=a[O++];)if(ma.transclude&&!ma.$$tlb||ma.replace&&(ma.templateUrl||ma.template)){Ib=!0;break}ma=!0}!u.templateUrl&&u.controller&&(J=J||T(),ba("'"+Q+"' controller",
J[Q],u,y),J[Q]=u);if(O=u.transclude)if(G=!0,u.$$tlb||(ba("transclusion",L,u,y),L=u),"element"===O)N=!0,n=u.priority,M=y,y=d.$$element=x(da.$$createComment(Q,d[Q])),b=y[0],pa(f,Ha.call(M,0),b),R=Z(Ib,M,e,n,g&&g.name,{nonTlbTranscludeDirective:L});else{var ka=T();if(D(O)){M=C.document.createDocumentFragment();var Xa=T(),F=T();r(O,function(a,b){var c="?"===a.charAt(0);a=c?a.substring(1):a;Xa[a]=b;ka[b]=null;F[b]=c});r(y.contents(),function(a){var b=Xa[wa(ua(a))];b?(F[b]=!0,ka[b]=ka[b]||C.document.createDocumentFragment(),
ka[b].appendChild(a)):M.appendChild(a)});r(F,function(a,b){if(!a)throw $("reqslot",b);});for(var K in ka)ka[K]&&(R=x(ka[K].childNodes),ka[K]=Z(Ib,R,e));M=x(M.childNodes)}else M=x(pc(b)).contents();y.empty();R=Z(Ib,M,e,void 0,void 0,{needsNewScope:u.$$isolateScope||u.$$newScope});R.$$slots=ka}if(u.template)if(P=!0,ba("template",v,u,y),v=u,O=B(u.template)?u.template(y,d):u.template,O=Na(O),u.replace){g=u;M=mc.test(O)?rd(ja(u.templateNamespace,U(O))):[];b=M[0];if(1!==M.length||1!==b.nodeType)throw $("tplrt",
Q,"");pa(f,y,b);A={$attr:{}};O=sc(b,[],A);var Dg=a.splice(sa+1,a.length-(sa+1));(s||t)&&fa(O,s,t);a=a.concat(O).concat(Dg);ga(d,A);A=a.length}else y.html(O);if(u.templateUrl)P=!0,ba("template",v,u,y),v=u,u.replace&&(g=u),p=ha(a.splice(sa,a.length-sa),y,d,f,G&&R,h,k,{controllerDirectives:J,newScopeDirective:t!==u&&t,newIsolateScopeDirective:s,templateDirective:v,nonTlbTranscludeDirective:L}),A=a.length;else if(u.compile)try{q=u.compile(y,d,R);var X=u.$$originalDirective||u;B(q)?m(null,Va(X,q),E,ib):
q&&m(Va(X,q.pre),Va(X,q.post),E,ib)}catch(ca){c(ca,za(y))}u.terminal&&(p.terminal=!0,n=Math.max(n,u.priority))}p.scope=t&&!0===t.scope;p.transcludeOnThisElement=G;p.templateOnThisElement=P;p.transclude=R;l.hasElementTranscludeDirective=N;return p}function W(a,b,c,d){var e;if(A(b)){var f=b.match(l);b=b.substring(f[0].length);var g=f[1]||f[3],f="?"===f[2];"^^"===g?c=c.parent():e=(e=d&&d[b])&&e.instance;if(!e){var h="$"+b+"Controller";e="^^"===g&&c[0]&&9===c[0].nodeType?null:g?c.inheritedData(h):c.data(h)}if(!e&&
!f)throw $("ctreq",b,a);}else if(H(b))for(e=[],g=0,f=b.length;g<f;g++)e[g]=W(a,b[g],c,d);else D(b)&&(e={},r(b,function(b,f){e[f]=W(a,b,c,d)}));return e||null}function ea(a,b,c,d,e,f,g){var h=T(),k;for(k in d){var l=d[k],m={$scope:l===g||l.$$isolateScope?e:f,$element:a,$attrs:b,$transclude:c},p=l.controller;"@"===p&&(p=b[l.name]);m=M(p,m,!0,l.controllerAs);h[l.name]=m;a.data("$"+l.name+"Controller",m.instance)}return h}function fa(a,b,c){for(var d=0,e=a.length;d<e;d++)a[d]=ac(a[d],{$$isolateScope:b,
$$newScope:c})}function X(b,c,e,g,h,k,l){if(c===h)return null;var m=null;if(f.hasOwnProperty(c)){h=a.get(c+"Directive");for(var p=0,n=h.length;p<n;p++)if(c=h[p],(z(g)||g>c.priority)&&-1!==c.restrict.indexOf(e)){k&&(c=ac(c,{$$start:k,$$end:l}));if(!c.$$bindings){var I=m=c,t=c.name,u={isolateScope:null,bindToController:null};D(I.scope)&&(!0===I.bindToController?(u.bindToController=d(I.scope,t,!0),u.isolateScope={}):u.isolateScope=d(I.scope,t,!1));D(I.bindToController)&&(u.bindToController=d(I.bindToController,
t,!0));if(u.bindToController&&!I.controller)throw $("noctrl",t);m=m.$$bindings=u;D(m.isolateScope)&&(c.$$isolateBindings=m.isolateScope)}b.push(c);m=c}}return m}function ca(b){if(f.hasOwnProperty(b))for(var c=a.get(b+"Directive"),d=0,e=c.length;d<e;d++)if(b=c[d],b.multiElement)return!0;return!1}function ga(a,b){var c=b.$attr,d=a.$attr;r(a,function(d,e){"$"!==e.charAt(0)&&(b[e]&&b[e]!==d&&(d=d.length?d+(("style"===e?";":" ")+b[e]):b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,e){a.hasOwnProperty(e)||
"$"===e.charAt(0)||(a[e]=b,"class"!==e&&"style"!==e&&(d[e]=c[e]))})}function ha(a,b,d,f,g,h,k,l){var m=[],p,n,t=b[0],u=a.shift(),J=ac(u,{templateUrl:null,transclude:null,replace:null,$$originalDirective:u}),s=B(u.templateUrl)?u.templateUrl(b,d):u.templateUrl,L=u.templateNamespace;b.empty();e(s).then(function(c){var e,I;c=Na(c);if(u.replace){c=mc.test(c)?rd(ja(L,U(c))):[];e=c[0];if(1!==c.length||1!==e.nodeType)throw $("tplrt",u.name,s);c={$attr:{}};pa(f,b,e);var v=sc(e,[],c);D(u.scope)&&fa(v,!0);a=
v.concat(a);ga(d,c)}else e=t,b.html(c);a.unshift(J);p=aa(a,e,d,g,b,u,h,k,l);r(f,function(a,c){a===e&&(f[c]=b[0])});for(n=Xa(b[0].childNodes,g);m.length;){c=m.shift();I=m.shift();var y=m.shift(),P=m.shift(),v=b[0];if(!c.$$destroyed){if(I!==t){var G=I.className;l.hasElementTranscludeDirective&&u.replace||(v=pc(e));pa(y,x(I),v);sa(x(v),G)}I=p.transcludeOnThisElement?ka(c,p.transclude,P):P;p(n,c,v,f,I)}}m=null}).catch(function(a){cc(a)&&c(a)});return function(a,b,c,d,e){a=e;b.$$destroyed||(m?m.push(b,
c,d,a):(p.transcludeOnThisElement&&(a=ka(b,p.transclude,e)),p(n,b,c,d,a)))}}function ia(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function ba(a,b,c,d){function e(a){return a?" (module: "+a+")":""}if(b)throw $("multidir",b.name,e(b.$$moduleName),c.name,e(c.$$moduleName),a,za(d));}function na(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&da.$$addBindingClass(a);return function(a,c){var e=c.parent();
b||da.$$addBindingClass(e);da.$$addBindingInfo(e,d.expressions);a.$watch(d,function(a){c[0].nodeValue=a})}}})}function ja(a,b){a=K(a||"html");switch(a){case "svg":case "math":var c=C.document.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function oa(a,b){if("srcdoc"===b)return u.HTML;if("src"===b||"ngSrc"===b)return-1===["img","video","audio","source","track"].indexOf(a)?u.RESOURCE_URL:u.MEDIA_URL;if("xlinkHref"===b)return"image"===a?u.MEDIA_URL:
"a"===a?u.URL:u.RESOURCE_URL;if("form"===a&&"action"===b||"base"===a&&"href"===b||"link"===a&&"href"===b)return u.RESOURCE_URL;if("a"===a&&("href"===b||"ngHref"===b))return u.URL}function xa(a,b){var c=b.toLowerCase();return v[a+"|"+c]||v["*|"+c]}function ya(a){return ma(u.valueOf(a),"ng-prop-srcset")}function Ea(a,b,c,d){if(m.test(d))throw $("nodomevents");a=ua(a);var e=xa(a,d),f=Ta;"srcset"!==d||"img"!==a&&"source"!==a?e&&(f=u.getTrusted.bind(u,e)):f=ya;b.push({priority:100,compile:function(a,b){var e=
p(b[c]),g=p(b[c],function(a){return u.valueOf(a)});return{pre:function(a,b){function c(){var g=e(a);b[0][d]=f(g)}c();a.$watch(g,c)}}}})}function Ia(a,c,d,e,f){var g=ua(a),k=oa(g,e),l=h[e]||f,p=b(d,!f,k,l);if(p){if("multiple"===e&&"select"===g)throw $("selmulti",za(a));if(m.test(e))throw $("nodomevents");c.push({priority:100,compile:function(){return{pre:function(a,c,f){c=f.$$observers||(f.$$observers=T());var g=f[e];g!==d&&(p=g&&b(g,!0,k,l),d=g);p&&(f[e]=p(a),(c[e]||(c[e]=[])).$$inter=!0,(f.$$observers&&
f.$$observers[e].$$scope||a).$watch(p,function(a,b){"class"===e&&a!==b?f.$updateClass(a,b):f.$set(e,a)}))}}}})}}function pa(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]===d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=c);break}f&&f.replaceChild(c,d);a=C.document.createDocumentFragment();for(g=0;g<e;g++)a.appendChild(b[g]);x.hasData(d)&&(x.data(c,x.data(d)),x(d).off("$destroy"));x.cleanData(a.querySelectorAll("*"));
for(g=1;g<e;g++)delete b[g];b[0]=c;b.length=1}function Aa(a,b){return S(function(){return a.apply(null,arguments)},a,b)}function Ba(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,za(d))}}function ra(a,b){if(s)throw $("missingattr",a,b);}function Da(a,c,d,e,f){function g(b,c,e){B(d.$onChanges)&&!dc(c,e)&&(Ua||(a.$$postDigest(q),Ua=[]),m||(m={},Ua.push(h)),m[b]&&(e=m[b].previousValue),m[b]=new Jb(e,c))}function h(){d.$onChanges(m);m=void 0}var k=[],l={},m;r(e,function(e,h){var m=e.attrName,n=e.optional,
I,t,u,s;switch(e.mode){case "@":n||ta.call(c,m)||(ra(m,f.name),d[h]=c[m]=void 0);n=c.$observe(m,function(a){if(A(a)||Ga(a))g(h,a,d[h]),d[h]=a});c.$$observers[m].$$scope=a;I=c[m];A(I)?d[h]=b(I)(a):Ga(I)&&(d[h]=I);l[h]=new Jb(tc,d[h]);k.push(n);break;case "=":if(!ta.call(c,m)){if(n)break;ra(m,f.name);c[m]=void 0}if(n&&!c[m])break;t=p(c[m]);s=t.literal?va:dc;u=t.assign||function(){I=d[h]=t(a);throw $("nonassign",c[m],m,f.name);};I=d[h]=t(a);n=function(b){s(b,d[h])||(s(b,I)?u(a,b=d[h]):d[h]=b);return I=
b};n.$stateful=!0;n=e.collection?a.$watchCollection(c[m],n):a.$watch(p(c[m],n),null,t.literal);k.push(n);break;case "<":if(!ta.call(c,m)){if(n)break;ra(m,f.name);c[m]=void 0}if(n&&!c[m])break;t=p(c[m]);var v=t.literal,L=d[h]=t(a);l[h]=new Jb(tc,d[h]);n=a[e.collection?"$watchCollection":"$watch"](t,function(a,b){if(b===a){if(b===L||v&&va(b,L))return;b=L}g(h,a,b);d[h]=a});k.push(n);break;case "&":n||ta.call(c,m)||ra(m,f.name);t=c.hasOwnProperty(m)?p(c[m]):E;if(t===E&&n)break;d[h]=function(b){return t(a,
b)}}});return{initialChanges:l,removeWatches:k.length&&function(){for(var a=0,b=k.length;a<b;++a)k[a]()}}}var Ma=/^\w/,Fa=C.document.createElement("div"),Oa=t,Qa=N,Ja=G,Ua;w.prototype={$normalize:wa,$addClass:function(a){a&&0<a.length&&R.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&R.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=sd(a,b);c&&c.length&&R.addClass(this.$$element,c);(c=sd(b,a))&&c.length&&R.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=
ld(this.$$element[0],a),g=td[a],h=a;f?(this.$$element.prop(a,b),e=f):g&&(this[g]=b,h=g);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=e=Vc(a,"-"));"img"===ua(this.$$element)&&"srcset"===a&&(this[a]=b=ma(b,"$set('srcset', value)"));!1!==d&&(null===b||z(b)?this.$$element.removeAttr(e):Ma.test(e)?f&&!1===b?this.$$element.removeAttr(e):this.$$element.attr(e,b):O(this.$$element[0],e,b));(a=this.$$observers)&&r(a[h],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,
d=c.$$observers||(c.$$observers=T()),e=d[a]||(d[a]=[]);e.push(b);L.$evalAsync(function(){e.$$inter||!c.hasOwnProperty(a)||z(c[a])||b(c[a])});return function(){cb(e,b)}}};var Ka=b.startSymbol(),La=b.endSymbol(),Na="{{"===Ka&&"}}"===La?Ta:function(a){return a.replace(/\{\{/g,Ka).replace(/}}/g,La)},Ra=/^ng(Attr|Prop|On)([A-Z].*)$/,Sa=/^(.+)Start$/;da.$$addBindingInfo=n?function(a,b){var c=a.data("$binding")||[];H(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:E;da.$$addBindingClass=n?function(a){sa(a,
"ng-binding")}:E;da.$$addScopeInfo=n?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:E;da.$$addScopeClass=n?function(a,b){sa(a,b?"ng-isolate-scope":"ng-scope")}:E;da.$$createComment=function(a,b){var c="";n&&(c=" "+(a||"")+": ",b&&(c+=b+" "));return C.document.createComment(c)};return da}]}function Jb(a,b){this.previousValue=a;this.currentValue=b}function wa(a){return a.replace(pd,"").replace(Eg,function(a,d,c){return c?d.toUpperCase():d})}function sd(a,b){var d=
"",c=a.split(/\s+/),e=b.split(/\s+/),f=0;a:for(;f<c.length;f++){for(var g=c[f],k=0;k<e.length;k++)if(g===e[k])continue a;d+=(0<d.length?" ":"")+g}return d}function rd(a){a=x(a);var b=a.length;if(1>=b)return a;for(;b--;){var d=a[b];(8===d.nodeType||d.nodeType===Pa&&""===d.nodeValue.trim())&&Fg.call(a,b,1)}return a}function Bg(a,b){if(b&&A(b))return b;if(A(a)){var d=ud.exec(a);if(d)return d[3]}}function Ff(){var a={};this.has=function(b){return a.hasOwnProperty(b)};this.register=function(b,d){Ja(b,
"controller");D(b)?S(a,b):a[b]=d};this.$get=["$injector",function(b){function d(a,b,d,g){if(!a||!D(a.$scope))throw F("$controller")("noscp",g,b);a.$scope[b]=d}return function(c,e,f,g){var k,h,l;f=!0===f;g&&A(g)&&(l=g);if(A(c)){g=c.match(ud);if(!g)throw vd("ctrlfmt",c);h=g[1];l=l||g[3];c=a.hasOwnProperty(h)?a[h]:Ge(e.$scope,h,!0);if(!c)throw vd("ctrlreg",h);sb(c,h,!0)}if(f)return f=(H(c)?c[c.length-1]:c).prototype,k=Object.create(f||null),l&&d(e,l,k,h||c.name),S(function(){var a=b.invoke(c,k,e,h);
a!==k&&(D(a)||B(a))&&(k=a,l&&d(e,l,k,h||c.name));return k},{instance:k,identifier:l});k=b.instantiate(c,e,h);l&&d(e,l,k,h||c.name);return k}}]}function Gf(){this.$get=["$window",function(a){return x(a.document)}]}function Hf(){this.$get=["$document","$rootScope",function(a,b){function d(){e=c.hidden}var c=a[0],e=c&&c.hidden;a.on("visibilitychange",d);b.$on("$destroy",function(){a.off("visibilitychange",d)});return function(){return e}}]}function If(){this.$get=["$log",function(a){return function(b,
d){a.error.apply(a,arguments)}}]}function uc(a){return D(a)?ha(a)?a.toISOString():eb(a):a}function Of(){this.$get=function(){return function(a){if(!a)return"";var b=[];Oc(a,function(a,c){null===a||z(a)||B(a)||(H(a)?r(a,function(a){b.push(ba(c)+"="+ba(uc(a)))}):b.push(ba(c)+"="+ba(uc(a))))});return b.join("&")}}}function Pf(){this.$get=function(){return function(a){function b(a,e,f){H(a)?r(a,function(a,c){b(a,e+"["+(D(a)?c:"")+"]")}):D(a)&&!ha(a)?Oc(a,function(a,c){b(a,e+(f?"":"[")+c+(f?"":"]"))}):
(B(a)&&(a=a()),d.push(ba(e)+"="+(null==a?"":ba(uc(a)))))}if(!a)return"";var d=[];b(a,"",!0);return d.join("&")}}}function vc(a,b){if(A(a)){var d=a.replace(Gg,"").trim();if(d){var c=b("Content-Type"),c=c&&0===c.indexOf(wd),e;(e=c)||(e=(e=d.match(Hg))&&Ig[e[0]].test(d));if(e)try{a=Rc(d)}catch(f){if(!c)return a;throw Kb("baddata",a,f);}}}return a}function xd(a){var b=T(),d;A(a)?r(a.split("\n"),function(a){d=a.indexOf(":");var e=K(U(a.substr(0,d)));a=U(a.substr(d+1));e&&(b[e]=b[e]?b[e]+", "+a:a)}):D(a)&&
r(a,function(a,d){var f=K(d),g=U(a);f&&(b[f]=b[f]?b[f]+", "+g:g)});return b}function yd(a){var b;return function(d){b||(b=xd(a));return d?(d=b[K(d)],void 0===d&&(d=null),d):b}}function zd(a,b,d,c){if(B(c))return c(a,b,d);r(c,function(c){a=c(a,b,d)});return a}function Nf(){var a=this.defaults={transformResponse:[vc],transformRequest:[function(a){return D(a)&&"[object File]"!==la.call(a)&&"[object Blob]"!==la.call(a)&&"[object FormData]"!==la.call(a)?eb(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},
post:ja(wc),put:ja(wc),patch:ja(wc)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",paramSerializer:"$httpParamSerializer",jsonpCallbackParam:"callback"},b=!1;this.useApplyAsync=function(a){return w(a)?(b=!!a,this):b};var d=this.interceptors=[],c=this.xsrfWhitelistedOrigins=[];this.$get=["$browser","$httpBackend","$$cookieReader","$cacheFactory","$rootScope","$q","$injector","$sce",function(e,f,g,k,h,l,m,p){function n(b){function c(a,b){for(var d=0,e=b.length;d<e;){var f=b[d++],g=b[d++];
a=a.then(f,g)}b.length=0;return a}function d(a,b){var c,e={};r(a,function(a,d){B(a)?(c=a(b),null!=c&&(e[d]=c)):e[d]=a});return e}function f(a){var b=S({},a);b.data=zd(a.data,a.headers,a.status,g.transformResponse);a=a.status;return 200<=a&&300>a?b:l.reject(b)}if(!D(b))throw F("$http")("badreq",b);if(!A(p.valueOf(b.url)))throw F("$http")("badreq",b.url);var g=S({method:"get",transformRequest:a.transformRequest,transformResponse:a.transformResponse,paramSerializer:a.paramSerializer,jsonpCallbackParam:a.jsonpCallbackParam},
b);g.headers=function(b){var c=a.headers,e=S({},b.headers),f,g,h,c=S({},c.common,c[K(b.method)]);a:for(f in c){g=K(f);for(h in e)if(K(h)===g)continue a;e[f]=c[f]}return d(e,ja(b))}(b);g.method=ub(g.method);g.paramSerializer=A(g.paramSerializer)?m.get(g.paramSerializer):g.paramSerializer;e.$$incOutstandingRequestCount("$http");var h=[],k=[];b=l.resolve(g);r(v,function(a){(a.request||a.requestError)&&h.unshift(a.request,a.requestError);(a.response||a.responseError)&&k.push(a.response,a.responseError)});
b=c(b,h);b=b.then(function(b){var c=b.headers,d=zd(b.data,yd(c),void 0,b.transformRequest);z(d)&&r(c,function(a,b){"content-type"===K(b)&&delete c[b]});z(b.withCredentials)&&!z(a.withCredentials)&&(b.withCredentials=a.withCredentials);return s(b,d).then(f,f)});b=c(b,k);return b=b.finally(function(){e.$$completeOutstandingRequest(E,"$http")})}function s(c,d){function e(a){if(a){var c={};r(a,function(a,d){c[d]=function(c){function d(){a(c)}b?h.$applyAsync(d):h.$$phase?d():h.$apply(d)}});return c}}function k(a,
c,d,e,f){function g(){m(c,a,d,e,f)}R&&(200<=a&&300>a?R.put(O,[a,c,xd(d),e,f]):R.remove(O));b?h.$applyAsync(g):(g(),h.$$phase||h.$apply())}function m(a,b,d,e,f){b=-1<=b?b:0;(200<=b&&300>b?L.resolve:L.reject)({data:a,status:b,headers:yd(d),config:c,statusText:e,xhrStatus:f})}function s(a){m(a.data,a.status,ja(a.headers()),a.statusText,a.xhrStatus)}function v(){var a=n.pendingRequests.indexOf(c);-1!==a&&n.pendingRequests.splice(a,1)}var L=l.defer(),u=L.promise,R,q,ma=c.headers,x="jsonp"===K(c.method),
O=c.url;x?O=p.getTrustedResourceUrl(O):A(O)||(O=p.valueOf(O));O=G(O,c.paramSerializer(c.params));x&&(O=t(O,c.jsonpCallbackParam));n.pendingRequests.push(c);u.then(v,v);!c.cache&&!a.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(R=D(c.cache)?c.cache:D(a.cache)?a.cache:N);R&&(q=R.get(O),w(q)?q&&B(q.then)?q.then(s,s):H(q)?m(q[1],q[0],ja(q[2]),q[3],q[4]):m(q,200,{},"OK","complete"):R.put(O,u));z(q)&&((q=jc(c.url)?g()[c.xsrfCookieName||a.xsrfCookieName]:void 0)&&(ma[c.xsrfHeaderName||a.xsrfHeaderName]=
q),f(c.method,O,d,k,ma,c.timeout,c.withCredentials,c.responseType,e(c.eventHandlers),e(c.uploadEventHandlers)));return u}function G(a,b){0<b.length&&(a+=(-1===a.indexOf("?")?"?":"&")+b);return a}function t(a,b){var c=a.split("?");if(2<c.length)throw Kb("badjsonp",a);c=gc(c[1]);r(c,function(c,d){if("JSON_CALLBACK"===c)throw Kb("badjsonp",a);if(d===b)throw Kb("badjsonp",b,a);});return a+=(-1===a.indexOf("?")?"?":"&")+b+"=JSON_CALLBACK"}var N=k("$http");a.paramSerializer=A(a.paramSerializer)?m.get(a.paramSerializer):
a.paramSerializer;var v=[];r(d,function(a){v.unshift(A(a)?m.get(a):m.invoke(a))});var jc=Jg(c);n.pendingRequests=[];(function(a){r(arguments,function(a){n[a]=function(b,c){return n(S({},c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){n[a]=function(b,c,d){return n(S({},d||{},{method:a,url:b,data:c}))}})})("post","put","patch");n.defaults=a;return n}]}function Rf(){this.$get=function(){return function(){return new C.XMLHttpRequest}}}function Qf(){this.$get=
["$browser","$jsonpCallbacks","$document","$xhrFactory",function(a,b,d,c){return Kg(a,c,a.defer,b,d[0])}]}function Kg(a,b,d,c,e){function f(a,b,d){a=a.replace("JSON_CALLBACK",b);var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m);f.removeEventListener("error",m);e.body.removeChild(f);f=null;var g=-1,s="unknown";a&&("load"!==a.type||c.wasCalled(b)||(a={type:"error"}),s=a.type,g="error"===a.type?404:200);d&&d(g,s)};f.addEventListener("load",
m);f.addEventListener("error",m);e.body.appendChild(f);return m}return function(e,k,h,l,m,p,n,s,G,t){function N(a){J="timeout"===a;qa&&qa();y&&y.abort()}function v(a,b,c,e,f,g){w(P)&&d.cancel(P);qa=y=null;a(b,c,e,f,g)}k=k||a.url();if("jsonp"===K(e))var q=c.createCallback(k),qa=f(k,q,function(a,b){var d=200===a&&c.getResponse(q);v(l,a,d,"",b,"complete");c.removeCallback(q)});else{var y=b(e,k),J=!1;y.open(e,k,!0);r(m,function(a,b){w(a)&&y.setRequestHeader(b,a)});y.onload=function(){var a=y.statusText||
"",b="response"in y?y.response:y.responseText,c=1223===y.status?204:y.status;0===c&&(c=b?200:"file"===ga(k).protocol?404:0);v(l,c,b,y.getAllResponseHeaders(),a,"complete")};y.onerror=function(){v(l,-1,null,null,"","error")};y.ontimeout=function(){v(l,-1,null,null,"","timeout")};y.onabort=function(){v(l,-1,null,null,"",J?"timeout":"abort")};r(G,function(a,b){y.addEventListener(b,a)});r(t,function(a,b){y.upload.addEventListener(b,a)});n&&(y.withCredentials=!0);if(s)try{y.responseType=s}catch(I){if("json"!==
s)throw I;}y.send(z(h)?null:h)}if(0<p)var P=d(function(){N("timeout")},p);else p&&B(p.then)&&p.then(function(){N(w(p.$$timeoutId)?"timeout":"abort")})}}function Kf(){var a="{{",b="}}";this.startSymbol=function(b){return b?(a=b,this):a};this.endSymbol=function(a){return a?(b=a,this):b};this.$get=["$parse","$exceptionHandler","$sce",function(d,c,e){function f(a){return"\\\\\\"+a}function g(c){return c.replace(p,a).replace(n,b)}function k(a,b,c,d){var e=a.$watch(function(a){e();return d(a)},b,c);return e}
function h(f,h,n,p){function v(a){try{return a=n&&!r?e.getTrusted(n,a):e.valueOf(a),p&&!w(a)?a:ic(a)}catch(b){c(Ma.interr(f,b))}}var r=n===e.URL||n===e.MEDIA_URL;if(!f.length||-1===f.indexOf(a)){if(h)return;h=g(f);r&&(h=e.getTrusted(n,h));h=ia(h);h.exp=f;h.expressions=[];h.$$watchDelegate=k;return h}p=!!p;for(var q,y,J=0,I=[],P,Q=f.length,M=[],L=[],u;J<Q;)if(-1!==(q=f.indexOf(a,J))&&-1!==(y=f.indexOf(b,q+l)))J!==q&&M.push(g(f.substring(J,q))),J=f.substring(q+l,y),I.push(J),J=y+m,L.push(M.length),
M.push("");else{J!==Q&&M.push(g(f.substring(J)));break}u=1===M.length&&1===L.length;var R=r&&u?void 0:v;P=I.map(function(a){return d(a,R)});if(!h||I.length){var x=function(a){for(var b=0,c=I.length;b<c;b++){if(p&&z(a[b]))return;M[L[b]]=a[b]}if(r)return e.getTrusted(n,u?M[0]:M.join(""));n&&1<M.length&&Ma.throwNoconcat(f);return M.join("")};return S(function(a){var b=0,d=I.length,e=Array(d);try{for(;b<d;b++)e[b]=P[b](a);return x(e)}catch(g){c(Ma.interr(f,g))}},{exp:f,expressions:I,$$watchDelegate:function(a,
b){var c;return a.$watchGroup(P,function(d,e){var f=x(d);b.call(this,f,d!==e?c:f,a);c=f})}})}}var l=a.length,m=b.length,p=new RegExp(a.replace(/./g,f),"g"),n=new RegExp(b.replace(/./g,f),"g");h.startSymbol=function(){return a};h.endSymbol=function(){return b};return h}]}function Lf(){this.$get=["$$intervalFactory","$window",function(a,b){var d={},c=function(a){b.clearInterval(a);delete d[a]},e=a(function(a,c,e){a=b.setInterval(a,c);d[a]=e;return a},c);e.cancel=function(a){if(!a)return!1;if(!a.hasOwnProperty("$$intervalId"))throw Lg("badprom");
if(!d.hasOwnProperty(a.$$intervalId))return!1;a=a.$$intervalId;var b=d[a],e=b.promise;e.$$state&&(e.$$state.pur=!0);b.reject("canceled");c(a);return!0};return e}]}function Mf(){this.$get=["$browser","$q","$$q","$rootScope",function(a,b,d,c){return function(e,f){return function(g,k,h,l){function m(){p?g.apply(null,n):g(s)}var p=4<arguments.length,n=p?Ha.call(arguments,4):[],s=0,G=w(l)&&!l,t=(G?d:b).defer(),r=t.promise;h=w(h)?h:0;r.$$intervalId=e(function(){G?a.defer(m):c.$evalAsync(m);t.notify(s++);
0<h&&s>=h&&(t.resolve(s),f(r.$$intervalId));G||c.$apply()},k,t,G);return r}}}]}function Ad(a,b){var d=ga(a);b.$$protocol=d.protocol;b.$$host=d.hostname;b.$$port=fa(d.port)||Mg[d.protocol]||null}function Bd(a,b,d){if(Ng.test(a))throw jb("badpath",a);var c="/"!==a.charAt(0);c&&(a="/"+a);a=ga(a);for(var c=(c&&"/"===a.pathname.charAt(0)?a.pathname.substring(1):a.pathname).split("/"),e=c.length;e--;)c[e]=decodeURIComponent(c[e]),d&&(c[e]=c[e].replace(/\//g,"%2F"));d=c.join("/");b.$$path=d;b.$$search=gc(a.search);
b.$$hash=decodeURIComponent(a.hash);b.$$path&&"/"!==b.$$path.charAt(0)&&(b.$$path="/"+b.$$path)}function xc(a,b){return a.slice(0,b.length)===b}function xa(a,b){if(xc(b,a))return b.substr(a.length)}function Da(a){var b=a.indexOf("#");return-1===b?a:a.substr(0,b)}function yc(a,b,d){this.$$html5=!0;d=d||"";Ad(a,this);this.$$parse=function(a){var d=xa(b,a);if(!A(d))throw jb("ipthprfx",a,b);Bd(d,this,!0);this.$$path||(this.$$path="/");this.$$compose()};this.$$normalizeUrl=function(a){return b+a.substr(1)};
this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;w(f=xa(a,c))?(g=f,g=d&&w(f=xa(d,f))?b+(xa("/",f)||f):a+g):w(f=xa(b,c))?g=b+f:b===c+"/"&&(g=b);g&&this.$$parse(g);return!!g}}function zc(a,b,d){Ad(a,this);this.$$parse=function(c){var e=xa(a,c)||xa(b,c),f;z(e)||"#"!==e.charAt(0)?this.$$html5?f=e:(f="",z(e)&&(a=c,this.replace())):(f=xa(d,e),z(f)&&(f=e));Bd(f,this,!1);c=this.$$path;var e=a,g=/^\/[A-Z]:(\/.*)/;xc(f,e)&&(f=f.replace(e,""));g.exec(f)||(c=(f=g.exec(c))?
f[1]:c);this.$$path=c;this.$$compose()};this.$$normalizeUrl=function(b){return a+(b?d+b:"")};this.$$parseLinkUrl=function(b,d){return Da(a)===Da(b)?(this.$$parse(b),!0):!1}}function Cd(a,b,d){this.$$html5=!0;zc.apply(this,arguments);this.$$parseLinkUrl=function(c,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;a===Da(c)?f=c:(g=xa(b,c))?f=a+d+g:b===c+"/"&&(f=b);f&&this.$$parse(f);return!!f};this.$$normalizeUrl=function(b){return a+d+b}}function Lb(a){return function(){return this[a]}}function Dd(a,
b){return function(d){if(z(d))return this[a];this[a]=b(d);this.$$compose();return this}}function Tf(){var a="!",b={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(b){return w(b)?(a=b,this):a};this.html5Mode=function(a){if(Ga(a))return b.enabled=a,this;if(D(a)){Ga(a.enabled)&&(b.enabled=a.enabled);Ga(a.requireBase)&&(b.requireBase=a.requireBase);if(Ga(a.rewriteLinks)||A(a.rewriteLinks))b.rewriteLinks=a.rewriteLinks;return this}return b};this.$get=["$rootScope","$browser","$sniffer",
"$rootElement","$window",function(d,c,e,f,g){function k(a,b){return a===b||ga(a).href===ga(b).href}function h(a,b,d){var e=m.url(),f=m.$$state;try{c.url(a,b,d),m.$$state=c.state()}catch(g){throw m.url(e),m.$$state=f,g;}}function l(a,b){d.$broadcast("$locationChangeSuccess",m.absUrl(),a,m.$$state,b)}var m,p;p=c.baseHref();var n=c.url(),s;if(b.enabled){if(!p&&b.requireBase)throw jb("nobase");s=n.substring(0,n.indexOf("/",n.indexOf("//")+2))+(p||"/");p=e.history?yc:Cd}else s=Da(n),p=zc;var r=s.substr(0,
Da(s).lastIndexOf("/")+1);m=new p(s,r,"#"+a);m.$$parseLinkUrl(n,n);m.$$state=c.state();var t=/^\s*(javascript|mailto):/i;f.on("click",function(a){var e=b.rewriteLinks;if(e&&!a.ctrlKey&&!a.metaKey&&!a.shiftKey&&2!==a.which&&2!==a.button){for(var g=x(a.target);"a"!==ua(g[0]);)if(g[0]===f[0]||!(g=g.parent())[0])return;if(!A(e)||!z(g.attr(e))){var e=g.prop("href"),h=g.attr("href")||g.attr("xlink:href");D(e)&&"[object SVGAnimatedString]"===e.toString()&&(e=ga(e.animVal).href);t.test(e)||!e||g.attr("target")||
a.isDefaultPrevented()||!m.$$parseLinkUrl(e,h)||(a.preventDefault(),m.absUrl()!==c.url()&&d.$apply())}}});m.absUrl()!==n&&c.url(m.absUrl(),!0);var N=!0;c.onUrlChange(function(a,b){xc(a,r)?(d.$evalAsync(function(){var c=m.absUrl(),e=m.$$state,f;m.$$parse(a);m.$$state=b;f=d.$broadcast("$locationChangeStart",a,c,b,e).defaultPrevented;m.absUrl()===a&&(f?(m.$$parse(c),m.$$state=e,h(c,!1,e)):(N=!1,l(c,e)))}),d.$$phase||d.$digest()):g.location.href=a});d.$watch(function(){if(N||m.$$urlUpdatedByLocation){m.$$urlUpdatedByLocation=
!1;var a=c.url(),b=m.absUrl(),f=c.state(),g=m.$$replace,n=!k(a,b)||m.$$html5&&e.history&&f!==m.$$state;if(N||n)N=!1,d.$evalAsync(function(){var b=m.absUrl(),c=d.$broadcast("$locationChangeStart",b,a,m.$$state,f).defaultPrevented;m.absUrl()===b&&(c?(m.$$parse(a),m.$$state=f):(n&&h(b,g,f===m.$$state?null:m.$$state),l(a,f)))})}m.$$replace=!1});return m}]}function Uf(){var a=!0,b=this;this.debugEnabled=function(b){return w(b)?(a=b,this):a};this.$get=["$window",function(d){function c(a){cc(a)&&(a.stack&&
f?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=d.console||{},e=b[a]||b.log||E;return function(){var a=[];r(arguments,function(b){a.push(c(b))});return Function.prototype.apply.call(e,b,a)}}var f=Ca||/\bEdge\//.test(d.navigator&&d.navigator.userAgent);return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){a&&c.apply(b,
arguments)}}()}}]}function Og(a){return a+""}function Pg(a,b){return"undefined"!==typeof a?a:b}function Ed(a,b){return"undefined"===typeof a?b:"undefined"===typeof b?a:a+b}function Qg(a,b){switch(a.type){case q.MemberExpression:if(a.computed)return!1;break;case q.UnaryExpression:return 1;case q.BinaryExpression:return"+"!==a.operator?1:!1;case q.CallExpression:return!1}return void 0===b?Fd:b}function Z(a,b,d){var c,e,f=a.isPure=Qg(a,d);switch(a.type){case q.Program:c=!0;r(a.body,function(a){Z(a.expression,
b,f);c=c&&a.expression.constant});a.constant=c;break;case q.Literal:a.constant=!0;a.toWatch=[];break;case q.UnaryExpression:Z(a.argument,b,f);a.constant=a.argument.constant;a.toWatch=a.argument.toWatch;break;case q.BinaryExpression:Z(a.left,b,f);Z(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.left.toWatch.concat(a.right.toWatch);break;case q.LogicalExpression:Z(a.left,b,f);Z(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=a.constant?[]:[a];break;case q.ConditionalExpression:Z(a.test,
b,f);Z(a.alternate,b,f);Z(a.consequent,b,f);a.constant=a.test.constant&&a.alternate.constant&&a.consequent.constant;a.toWatch=a.constant?[]:[a];break;case q.Identifier:a.constant=!1;a.toWatch=[a];break;case q.MemberExpression:Z(a.object,b,f);a.computed&&Z(a.property,b,f);a.constant=a.object.constant&&(!a.computed||a.property.constant);a.toWatch=a.constant?[]:[a];break;case q.CallExpression:c=d=a.filter?!b(a.callee.name).$stateful:!1;e=[];r(a.arguments,function(a){Z(a,b,f);c=c&&a.constant;e.push.apply(e,
a.toWatch)});a.constant=c;a.toWatch=d?e:[a];break;case q.AssignmentExpression:Z(a.left,b,f);Z(a.right,b,f);a.constant=a.left.constant&&a.right.constant;a.toWatch=[a];break;case q.ArrayExpression:c=!0;e=[];r(a.elements,function(a){Z(a,b,f);c=c&&a.constant;e.push.apply(e,a.toWatch)});a.constant=c;a.toWatch=e;break;case q.ObjectExpression:c=!0;e=[];r(a.properties,function(a){Z(a.value,b,f);c=c&&a.value.constant;e.push.apply(e,a.value.toWatch);a.computed&&(Z(a.key,b,!1),c=c&&a.key.constant,e.push.apply(e,
a.key.toWatch))});a.constant=c;a.toWatch=e;break;case q.ThisExpression:a.constant=!1;a.toWatch=[];break;case q.LocalsExpression:a.constant=!1,a.toWatch=[]}}function Gd(a){if(1===a.length){a=a[0].expression;var b=a.toWatch;return 1!==b.length?b:b[0]!==a?b:void 0}}function Hd(a){return a.type===q.Identifier||a.type===q.MemberExpression}function Id(a){if(1===a.body.length&&Hd(a.body[0].expression))return{type:q.AssignmentExpression,left:a.body[0].expression,right:{type:q.NGValueParameter},operator:"="}}
function Jd(a){this.$filter=a}function Kd(a){this.$filter=a}function Mb(a,b,d){this.ast=new q(a,d);this.astCompiler=d.csp?new Kd(b):new Jd(b)}function Ac(a){return B(a.valueOf)?a.valueOf():Rg.call(a)}function Vf(){var a=T(),b={"true":!0,"false":!1,"null":null,undefined:void 0},d,c;this.addLiteral=function(a,c){b[a]=c};this.setIdentifierFns=function(a,b){d=a;c=b;return this};this.$get=["$filter",function(e){function f(b,c){var d,f;switch(typeof b){case "string":return f=b=b.trim(),d=a[f],d||(d=new Nb(G),
d=(new Mb(d,e,G)).parse(b),a[f]=p(d)),s(d,c);case "function":return s(b,c);default:return s(E,c)}}function g(a,b,c){return null==a||null==b?a===b:"object"!==typeof a||(a=Ac(a),"object"!==typeof a||c)?a===b||a!==a&&b!==b:!1}function k(a,b,c,d,e){var f=d.inputs,h;if(1===f.length){var k=g,f=f[0];return a.$watch(function(a){var b=f(a);g(b,k,f.isPure)||(h=d(a,void 0,void 0,[b]),k=b&&Ac(b));return h},b,c,e)}for(var l=[],m=[],n=0,p=f.length;n<p;n++)l[n]=g,m[n]=null;return a.$watch(function(a){for(var b=
!1,c=0,e=f.length;c<e;c++){var k=f[c](a);if(b||(b=!g(k,l[c],f[c].isPure)))m[c]=k,l[c]=k&&Ac(k)}b&&(h=d(a,void 0,void 0,m));return h},b,c,e)}function h(a,b,c,d,e){function f(){h(m)&&k()}function g(a,b,c,d){m=u&&d?d[0]:n(a,b,c,d);h(m)&&a.$$postDigest(f);return s(m)}var h=d.literal?l:w,k,m,n=d.$$intercepted||d,s=d.$$interceptor||Ta,u=d.inputs&&!n.inputs;g.literal=d.literal;g.constant=d.constant;g.inputs=d.inputs;p(g);return k=a.$watch(g,b,c,e)}function l(a){var b=!0;r(a,function(a){w(a)||(b=!1)});return b}
function m(a,b,c,d){var e=a.$watch(function(a){e();return d(a)},b,c);return e}function p(a){a.constant?a.$$watchDelegate=m:a.oneTime?a.$$watchDelegate=h:a.inputs&&(a.$$watchDelegate=k);return a}function n(a,b){function c(d){return b(a(d))}c.$stateful=a.$stateful||b.$stateful;c.$$pure=a.$$pure&&b.$$pure;return c}function s(a,b){if(!b)return a;a.$$interceptor&&(b=n(a.$$interceptor,b),a=a.$$intercepted);var c=!1,d=function(d,e,f,g){d=c&&g?g[0]:a(d,e,f,g);return b(d)};d.$$intercepted=a;d.$$interceptor=
b;d.literal=a.literal;d.oneTime=a.oneTime;d.constant=a.constant;b.$stateful||(c=!a.inputs,d.inputs=a.inputs?a.inputs:[a],b.$$pure||(d.inputs=d.inputs.map(function(a){return a.isPure===Fd?function(b){return a(b)}:a})));return p(d)}var G={csp:Aa().noUnsafeEval,literals:Ia(b),isIdentifierStart:B(d)&&d,isIdentifierContinue:B(c)&&c};f.$$getAst=function(a){var b=new Nb(G);return(new Mb(b,e,G)).getAst(a).ast};return f}]}function Xf(){var a=!0;this.$get=["$rootScope","$exceptionHandler",function(b,d){return Ld(function(a){b.$evalAsync(a)},
d,a)}];this.errorOnUnhandledRejections=function(b){return w(b)?(a=b,this):a}}function Yf(){var a=!0;this.$get=["$browser","$exceptionHandler",function(b,d){return Ld(function(a){b.defer(a)},d,a)}];this.errorOnUnhandledRejections=function(b){return w(b)?(a=b,this):a}}function Ld(a,b,d){function c(){return new e}function e(){var a=this.promise=new f;this.resolve=function(b){h(a,b)};this.reject=function(b){m(a,b)};this.notify=function(b){n(a,b)}}function f(){this.$$state={status:0}}function g(){for(;!w&&
x.length;){var a=x.shift();if(!a.pur){a.pur=!0;var c=a.value,c="Possibly unhandled rejection: "+("function"===typeof c?c.toString().replace(/ \{[\s\S]*$/,""):z(c)?"undefined":"string"!==typeof c?Ie(c,void 0):c);cc(a.value)?b(a.value,c):b(c)}}}function k(c){!d||c.pending||2!==c.status||c.pur||(0===w&&0===x.length&&a(g),x.push(c));!c.processScheduled&&c.pending&&(c.processScheduled=!0,++w,a(function(){var e,f,k;k=c.pending;c.processScheduled=!1;c.pending=void 0;try{for(var l=0,n=k.length;l<n;++l){c.pur=
!0;f=k[l][0];e=k[l][c.status];try{B(e)?h(f,e(c.value)):1===c.status?h(f,c.value):m(f,c.value)}catch(p){m(f,p),p&&!0===p.$$passToExceptionHandler&&b(p)}}}finally{--w,d&&0===w&&a(g)}}))}function h(a,b){a.$$state.status||(b===a?p(a,v("qcycle",b)):l(a,b))}function l(a,b){function c(b){g||(g=!0,l(a,b))}function d(b){g||(g=!0,p(a,b))}function e(b){n(a,b)}var f,g=!1;try{if(D(b)||B(b))f=b.then;B(f)?(a.$$state.status=-1,f.call(b,c,d,e)):(a.$$state.value=b,a.$$state.status=1,k(a.$$state))}catch(h){d(h)}}function m(a,
b){a.$$state.status||p(a,b)}function p(a,b){a.$$state.value=b;a.$$state.status=2;k(a.$$state)}function n(c,d){var e=c.$$state.pending;0>=c.$$state.status&&e&&e.length&&a(function(){for(var a,c,f=0,g=e.length;f<g;f++){c=e[f][0];a=e[f][3];try{n(c,B(a)?a(d):d)}catch(h){b(h)}}})}function s(a){var b=new f;m(b,a);return b}function G(a,b,c){var d=null;try{B(c)&&(d=c())}catch(e){return s(e)}return d&&B(d.then)?d.then(function(){return b(a)},s):b(a)}function t(a,b,c,d){var e=new f;h(e,a);return e.then(b,c,
d)}function q(a){if(!B(a))throw v("norslvr",a);var b=new f;a(function(a){h(b,a)},function(a){m(b,a)});return b}var v=F("$q",TypeError),w=0,x=[];S(f.prototype,{then:function(a,b,c){if(z(a)&&z(b)&&z(c))return this;var d=new f;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&k(this.$$state);return d},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return G(b,y,a)},function(b){return G(b,s,a)},
b)}});var y=t;q.prototype=f.prototype;q.defer=c;q.reject=s;q.when=t;q.resolve=y;q.all=function(a){var b=new f,c=0,d=H(a)?[]:{};r(a,function(a,e){c++;t(a).then(function(a){d[e]=a;--c||h(b,d)},function(a){m(b,a)})});0===c&&h(b,d);return b};q.race=function(a){var b=c();r(a,function(a){t(a).then(b.resolve,b.reject)});return b.promise};return q}function hg(){this.$get=["$window","$timeout",function(a,b){var d=a.requestAnimationFrame||a.webkitRequestAnimationFrame,c=a.cancelAnimationFrame||a.webkitCancelAnimationFrame||
a.webkitCancelRequestAnimationFrame,e=!!d,f=e?function(a){var b=d(a);return function(){c(b)}}:function(a){var c=b(a,16.66,!1);return function(){b.cancel(c)}};f.supported=e;return f}]}function Wf(){function a(a){function b(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$id=++pb;this.$$ChildScope=null;this.$$suspended=!1}b.prototype=a;return b}var b=10,d=F("$rootScope"),c=null,e=null;this.digestTtl=
function(a){arguments.length&&(b=a);return b};this.$get=["$exceptionHandler","$parse","$browser",function(f,g,k){function h(a){a.currentScope.$$destroyed=!0}function l(a){9===Ca&&(a.$$childHead&&l(a.$$childHead),a.$$nextSibling&&l(a.$$nextSibling));a.$parent=a.$$nextSibling=a.$$prevSibling=a.$$childHead=a.$$childTail=a.$root=a.$$watchers=null}function m(){this.$id=++pb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=
this;this.$$suspended=this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$watchersCount=0;this.$$isolateBindings=null}function p(a){if(v.$$phase)throw d("inprog",v.$$phase);v.$$phase=a}function n(a,b){do a.$$watchersCount+=b;while(a=a.$parent)}function s(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function G(){}function t(){for(;y.length;)try{y.shift()()}catch(a){f(a)}e=null}function q(){null===e&&(e=k.defer(function(){v.$apply(t)},
null,"$applyAsync"))}m.prototype={constructor:m,$new:function(b,c){var d;c=c||this;b?(d=new m,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=a(this)),d=new this.$$ChildScope);d.$parent=c;d.$$prevSibling=c.$$childTail;c.$$childHead?(c.$$childTail.$$nextSibling=d,c.$$childTail=d):c.$$childHead=c.$$childTail=d;(b||c!==this)&&d.$on("$destroy",h);return d},$watch:function(a,b,d,e){var f=g(a);b=B(b)?b:E;if(f.$$watchDelegate)return f.$$watchDelegate(this,b,d,f,a);var h=this,k=h.$$watchers,l=
{fn:b,last:G,get:f,exp:e||a,eq:!!d};c=null;k||(k=h.$$watchers=[],k.$$digestWatchIndex=-1);k.unshift(l);k.$$digestWatchIndex++;n(this,1);return function(){var a=cb(k,l);0<=a&&(n(h,-1),a<k.$$digestWatchIndex&&k.$$digestWatchIndex--);c=null}},$watchGroup:function(a,b){function c(){h=!1;try{k?(k=!1,b(e,e,g)):b(e,d,g)}finally{for(var f=0;f<a.length;f++)d[f]=e[f]}}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=
!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});r(a,function(a,b){var d=g.$watch(a,function(a){e[b]=a;h||(h=!0,g.$evalAsync(c))});f.push(d)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(!z(e)){if(D(e))if(ya(e))for(f!==n&&(f=n,t=f.length=0,l++),a=e.length,t!==a&&(l++,f.length=t=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===g||(l++,f[b]=g);else{f!==p&&(f=p={},t=0,l++);a=0;for(b in e)ta.call(e,
b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(t++,f[b]=g,l++));if(t>a)for(b in l++,f)ta.call(e,b)||(t--,delete f[b])}else f!==e&&(f=e,l++);return l}}c.$$pure=g(a).literal;c.$stateful=!c.$$pure;var d=this,e,f,h,k=1<b.length,l=0,m=g(a,c),n=[],p={},s=!0,t=0;return this.$watch(m,function(){s?(s=!1,b(e,e,d)):b(e,h,d);if(k)if(D(e))if(ya(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)ta.call(e,a)&&(h[a]=e[a]);else h=e})},$digest:function(){var a,
g,h,l,m,n,s,r=b,q,y=w.length?v:this,N=[],z,A;p("$digest");k.$$checkUrlChange();this===v&&null!==e&&(k.defer.cancel(e),t());c=null;do{s=!1;q=y;for(n=0;n<w.length;n++){try{A=w[n],l=A.fn,l(A.scope,A.locals)}catch(C){f(C)}c=null}w.length=0;a:do{if(n=!q.$$suspended&&q.$$watchers)for(n.$$digestWatchIndex=n.length;n.$$digestWatchIndex--;)try{if(a=n[n.$$digestWatchIndex])if(m=a.get,(g=m(q))!==(h=a.last)&&!(a.eq?va(g,h):X(g)&&X(h)))s=!0,c=a,a.last=a.eq?Ia(g,null):g,l=a.fn,l(g,h===G?g:h,q),5>r&&(z=4-r,N[z]||
(N[z]=[]),N[z].push({msg:B(a.exp)?"fn: "+(a.exp.name||a.exp.toString()):a.exp,newVal:g,oldVal:h}));else if(a===c){s=!1;break a}}catch(E){f(E)}if(!(n=!q.$$suspended&&q.$$watchersCount&&q.$$childHead||q!==y&&q.$$nextSibling))for(;q!==y&&!(n=q.$$nextSibling);)q=q.$parent}while(q=n);if((s||w.length)&&!r--)throw v.$$phase=null,d("infdig",b,N);}while(s||w.length);for(v.$$phase=null;J<x.length;)try{x[J++]()}catch(D){f(D)}x.length=J=0;k.$$checkUrlChange()},$suspend:function(){this.$$suspended=!0},$isSuspended:function(){return this.$$suspended},
$resume:function(){this.$$suspended=!1},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this===v&&k.$$applicationDestroyed();n(this,-this.$$watchersCount);for(var b in this.$$listenerCount)s(this,this.$$listenerCount[b],b);a&&a.$$childHead===this&&(a.$$childHead=this.$$nextSibling);a&&a.$$childTail===this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=
this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=E;this.$on=this.$watch=this.$watchGroup=function(){return E};this.$$listeners={};this.$$nextSibling=null;l(this)}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a,b){v.$$phase||w.length||k.defer(function(){w.length&&v.$digest()},null,"$evalAsync");w.push({scope:this,fn:g(a),locals:b})},$$postDigest:function(a){x.push(a)},$apply:function(a){try{p("$apply");try{return this.$eval(a)}finally{v.$$phase=
null}}catch(b){f(b)}finally{try{v.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&y.push(b);a=g(a);q()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){var d=c.indexOf(b);-1!==d&&(delete c[d],s(e,1,a))}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=
!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=db([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(n){f(n)}else d.splice(l,1),l--,m--;if(g)break;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=db([e],arguments,
1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var v=new m,w=v.$$asyncQueue=[],x=v.$$postDigestQueue=[],y=v.$$applyAsyncQueue=[],J=0;return v}]}function Le(){var a=/^\s*(https?|s?ftp|mailto|tel|file):/,b=/^\s*((https?|ftp|file|blob):|data:image\/)/;
this.aHrefSanitizationWhitelist=function(b){return w(b)?(a=b,this):a};this.imgSrcSanitizationWhitelist=function(a){return w(a)?(b=a,this):b};this.$get=function(){return function(d,c){var e=c?b:a,f=ga(d&&d.trim()).href;return""===f||f.match(e)?d:"unsafe:"+f}}}function Sg(a){if("self"===a)return a;if(A(a)){if(-1<a.indexOf("***"))throw Ea("iwcard",a);a=Md(a).replace(/\\\*\\\*/g,".*").replace(/\\\*/g,"[^:/.?&;]*");return new RegExp("^"+a+"$")}if(ab(a))return new RegExp("^"+a.source+"$");throw Ea("imatcher");
}function Nd(a){var b=[];w(a)&&r(a,function(a){b.push(Sg(a))});return b}function $f(){this.SCE_CONTEXTS=V;var a=["self"],b=[];this.resourceUrlWhitelist=function(b){arguments.length&&(a=Nd(b));return a};this.resourceUrlBlacklist=function(a){arguments.length&&(b=Nd(a));return b};this.$get=["$injector","$$sanitizeUri",function(d,c){function e(a,b){var c;"self"===a?(c=Bc(b,Od))||(C.document.baseURI?c=C.document.baseURI:(Na||(Na=C.document.createElement("a"),Na.href=".",Na=Na.cloneNode(!1)),c=Na.href),
c=Bc(b,c)):c=!!a.exec(b.href);return c}function f(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var g=function(a){throw Ea("unsafe");};d.has("$sanitize")&&(g=d.get("$sanitize"));var k=f(),h={};h[V.HTML]=f(k);h[V.CSS]=f(k);h[V.MEDIA_URL]=f(k);h[V.URL]=f(h[V.MEDIA_URL]);h[V.JS]=f(k);h[V.RESOURCE_URL]=
f(h[V.URL]);return{trustAs:function(a,b){var c=h.hasOwnProperty(a)?h[a]:null;if(!c)throw Ea("icontext",a,b);if(null===b||z(b)||""===b)return b;if("string"!==typeof b)throw Ea("itype",a);return new c(b)},getTrusted:function(d,f){if(null===f||z(f)||""===f)return f;var k=h.hasOwnProperty(d)?h[d]:null;if(k&&f instanceof k)return f.$$unwrapTrustedValue();B(f.$$unwrapTrustedValue)&&(f=f.$$unwrapTrustedValue());if(d===V.MEDIA_URL||d===V.URL)return c(f.toString(),d===V.MEDIA_URL);if(d===V.RESOURCE_URL){var k=
ga(f.toString()),n,s,r=!1;n=0;for(s=a.length;n<s;n++)if(e(a[n],k)){r=!0;break}if(r)for(n=0,s=b.length;n<s;n++)if(e(b[n],k)){r=!1;break}if(r)return f;throw Ea("insecurl",f.toString());}if(d===V.HTML)return g(f);throw Ea("unsafe");},valueOf:function(a){return a instanceof k?a.$$unwrapTrustedValue():a}}}]}function Zf(){var a=!0;this.enabled=function(b){arguments.length&&(a=!!b);return a};this.$get=["$parse","$sceDelegate",function(b,d){if(a&&8>Ca)throw Ea("iequirks");var c=ja(V);c.isEnabled=function(){return a};
c.trustAs=d.trustAs;c.getTrusted=d.getTrusted;c.valueOf=d.valueOf;a||(c.trustAs=c.getTrusted=function(a,b){return b},c.valueOf=Ta);c.parseAs=function(a,d){var e=b(d);return e.literal&&e.constant?e:b(d,function(b){return c.getTrusted(a,b)})};var e=c.parseAs,f=c.getTrusted,g=c.trustAs;r(V,function(a,b){var d=K(b);c[("parse_as_"+d).replace(Cc,wb)]=function(b){return e(a,b)};c[("get_trusted_"+d).replace(Cc,wb)]=function(b){return f(a,b)};c[("trust_as_"+d).replace(Cc,wb)]=function(b){return g(a,b)}});
return c}]}function ag(){this.$get=["$window","$document",function(a,b){var d={},c=!((!a.nw||!a.nw.process)&&a.chrome&&(a.chrome.app&&a.chrome.app.runtime||!a.chrome.app&&a.chrome.runtime&&a.chrome.runtime.id))&&a.history&&a.history.pushState,e=fa((/android (\d+)/.exec(K((a.navigator||{}).userAgent))||[])[1]),f=/Boxee/i.test((a.navigator||{}).userAgent),g=b[0]||{},k=g.body&&g.body.style,h=!1,l=!1;k&&(h=!!("transition"in k||"webkitTransition"in k),l=!!("animation"in k||"webkitAnimation"in k));return{history:!(!c||
4>e||f),hasEvent:function(a){if("input"===a&&Ca)return!1;if(z(d[a])){var b=g.createElement("div");d[a]="on"+a in b}return d[a]},csp:Aa(),transitions:h,animations:l,android:e}}]}function bg(){this.$get=ia(function(a){return new Tg(a)})}function Tg(a){function b(){var a=e.pop();return a&&a.cb}function d(a){for(var b=e.length-1;0<=b;--b){var c=e[b];if(c.type===a)return e.splice(b,1),c.cb}}var c={},e=[],f=this.ALL_TASKS_TYPE="$$all$$",g=this.DEFAULT_TASK_TYPE="$$default$$";this.completeTask=function(e,
h){h=h||g;try{e()}finally{var l;l=h||g;c[l]&&(c[l]--,c[f]--);l=c[h];var m=c[f];if(!m||!l)for(l=m?d:b;m=l(h);)try{m()}catch(p){a.error(p)}}};this.incTaskCount=function(a){a=a||g;c[a]=(c[a]||0)+1;c[f]=(c[f]||0)+1};this.notifyWhenNoPendingTasks=function(a,b){b=b||f;c[b]?e.push({type:b,cb:a}):a()}}function dg(){var a;this.httpOptions=function(b){return b?(a=b,this):a};this.$get=["$exceptionHandler","$templateCache","$http","$q","$sce",function(b,d,c,e,f){function g(k,h){g.totalPendingRequests++;if(!A(k)||
z(d.get(k)))k=f.getTrustedResourceUrl(k);var l=c.defaults&&c.defaults.transformResponse;H(l)?l=l.filter(function(a){return a!==vc}):l===vc&&(l=null);return c.get(k,S({cache:d,transformResponse:l},a)).finally(function(){g.totalPendingRequests--}).then(function(a){return d.put(k,a.data)},function(a){h||(a=Ug("tpload",k,a.status,a.statusText),b(a));return e.reject(a)})}g.totalPendingRequests=0;return g}]}function eg(){this.$get=["$rootScope","$browser","$location",function(a,b,d){return{findBindings:function(a,
b,d){a=a.getElementsByClassName("ng-binding");var g=[];r(a,function(a){var c=ca.element(a).data("$binding");c&&r(c,function(c){d?(new RegExp("(^|\\s)"+Md(b)+"(\\s|\\||$)")).test(c)&&g.push(a):-1!==c.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,d){for(var g=["ng-","data-ng-","ng\\:"],k=0;k<g.length;++k){var h=a.querySelectorAll("["+g[k]+"model"+(d?"=":"*=")+'"'+b+'"]');if(h.length)return h}},getLocation:function(){return d.url()},setLocation:function(b){b!==d.url()&&(d.url(b),a.$digest())},
whenStable:function(a){b.notifyWhenNoOutstandingRequests(a)}}}]}function fg(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(a,b,d,c,e){function f(f,h,l){B(f)||(l=h,h=f,f=E);var m=Ha.call(arguments,3),p=w(l)&&!l,n=(p?c:d).defer(),s=n.promise,r;r=b.defer(function(){try{n.resolve(f.apply(null,m))}catch(b){n.reject(b),e(b)}finally{delete g[s.$$timeoutId]}p||a.$apply()},h,"$timeout");s.$$timeoutId=r;g[r]=n;return s}var g={};f.cancel=function(a){if(!a)return!1;if(!a.hasOwnProperty("$$timeoutId"))throw Vg("badprom");
if(!g.hasOwnProperty(a.$$timeoutId))return!1;a=a.$$timeoutId;var c=g[a],d=c.promise;d.$$state&&(d.$$state.pur=!0);c.reject("canceled");delete g[a];return b.defer.cancel(a)};return f}]}function ga(a){if(!A(a))return a;Ca&&(aa.setAttribute("href",a),a=aa.href);aa.setAttribute("href",a);a=aa.hostname;!Wg&&-1<a.indexOf(":")&&(a="["+a+"]");return{href:aa.href,protocol:aa.protocol?aa.protocol.replace(/:$/,""):"",host:aa.host,search:aa.search?aa.search.replace(/^\?/,""):"",hash:aa.hash?aa.hash.replace(/^#/,
""):"",hostname:a,port:aa.port,pathname:"/"===aa.pathname.charAt(0)?aa.pathname:"/"+aa.pathname}}function Jg(a){var b=[Od].concat(a.map(ga));return function(a){a=ga(a);return b.some(Bc.bind(null,a))}}function Bc(a,b){a=ga(a);b=ga(b);return a.protocol===b.protocol&&a.host===b.host}function gg(){this.$get=ia(C)}function Pd(a){function b(a){try{return decodeURIComponent(a)}catch(b){return a}}var d=a[0]||{},c={},e="";return function(){var a,g,k,h,l;try{a=d.cookie||""}catch(m){a=""}if(a!==e)for(e=a,a=
e.split("; "),c={},k=0;k<a.length;k++)g=a[k],h=g.indexOf("="),0<h&&(l=b(g.substring(0,h)),z(c[l])&&(c[l]=b(g.substring(h+1))));return c}}function kg(){this.$get=Pd}function dd(a){function b(d,c){if(D(d)){var e={};r(d,function(a,c){e[c]=b(c,a)});return e}return a.factory(d+"Filter",c)}this.register=b;this.$get=["$injector",function(a){return function(b){return a.get(b+"Filter")}}];b("currency",Qd);b("date",Rd);b("filter",Xg);b("json",Yg);b("limitTo",Zg);b("lowercase",$g);b("number",Sd);b("orderBy",
Td);b("uppercase",ah)}function Xg(){return function(a,b,d,c){if(!ya(a)){if(null==a)return a;throw F("filter")("notarray",a);}c=c||"$";var e;switch(Dc(b)){case "function":break;case "boolean":case "null":case "number":case "string":e=!0;case "object":b=bh(b,d,c,e);break;default:return a}return Array.prototype.filter.call(a,b)}}function bh(a,b,d,c){var e=D(a)&&d in a;!0===b?b=va:B(b)||(b=function(a,b){if(z(a))return!1;if(null===a||null===b)return a===b;if(D(b)||D(a)&&!bc(a))return!1;a=K(""+a);b=K(""+
b);return-1!==a.indexOf(b)});return function(f){return e&&!D(f)?Fa(f,a[d],b,d,!1):Fa(f,a,b,d,c)}}function Fa(a,b,d,c,e,f){var g=Dc(a),k=Dc(b);if("string"===k&&"!"===b.charAt(0))return!Fa(a,b.substring(1),d,c,e);if(H(a))return a.some(function(a){return Fa(a,b,d,c,e)});switch(g){case "object":var h;if(e){for(h in a)if(h.charAt&&"$"!==h.charAt(0)&&Fa(a[h],b,d,c,!0))return!0;return f?!1:Fa(a,b,d,c,!1)}if("object"===k){for(h in b)if(f=b[h],!B(f)&&!z(f)&&(g=h===c,!Fa(g?a:a[h],f,d,c,g,g)))return!1;return!0}return d(a,
b);case "function":return!1;default:return d(a,b)}}function Dc(a){return null===a?"null":typeof a}function Qd(a){var b=a.NUMBER_FORMATS;return function(a,c,e){z(c)&&(c=b.CURRENCY_SYM);z(e)&&(e=b.PATTERNS[1].maxFrac);var f=c?/\u00A4/g:/\s*\u00A4\s*/g;return null==a?a:Ud(a,b.PATTERNS[1],b.GROUP_SEP,b.DECIMAL_SEP,e).replace(f,c)}}function Sd(a){var b=a.NUMBER_FORMATS;return function(a,c){return null==a?a:Ud(a,b.PATTERNS[0],b.GROUP_SEP,b.DECIMAL_SEP,c)}}function ch(a){var b=0,d,c,e,f,g;-1<(c=a.indexOf(Vd))&&
(a=a.replace(Vd,""));0<(e=a.search(/e/i))?(0>c&&(c=e),c+=+a.slice(e+1),a=a.substring(0,e)):0>c&&(c=a.length);for(e=0;a.charAt(e)===Ec;e++);if(e===(g=a.length))d=[0],c=1;else{for(g--;a.charAt(g)===Ec;)g--;c-=e;d=[];for(f=0;e<=g;e++,f++)d[f]=+a.charAt(e)}c>Wd&&(d=d.splice(0,Wd-1),b=c-1,c=1);return{d:d,e:b,i:c}}function dh(a,b,d,c){var e=a.d,f=e.length-a.i;b=z(b)?Math.min(Math.max(d,f),c):+b;d=b+a.i;c=e[d];if(0<d){e.splice(Math.max(a.i,d));for(var g=d;g<e.length;g++)e[g]=0}else for(f=Math.max(0,f),a.i=
1,e.length=Math.max(1,d=b+1),e[0]=0,g=1;g<d;g++)e[g]=0;if(5<=c)if(0>d-1){for(c=0;c>d;c--)e.unshift(0),a.i++;e.unshift(1);a.i++}else e[d-1]++;for(;f<Math.max(0,b);f++)e.push(0);if(b=e.reduceRight(function(a,b,c,d){b+=a;d[c]=b%10;return Math.floor(b/10)},0))e.unshift(b),a.i++}function Ud(a,b,d,c,e){if(!A(a)&&!W(a)||isNaN(a))return"";var f=!isFinite(a),g=!1,k=Math.abs(a)+"",h="";if(f)h="\u221e";else{g=ch(k);dh(g,e,b.minFrac,b.maxFrac);h=g.d;k=g.i;e=g.e;f=[];for(g=h.reduce(function(a,b){return a&&!b},
!0);0>k;)h.unshift(0),k++;0<k?f=h.splice(k,h.length):(f=h,h=[0]);k=[];for(h.length>=b.lgSize&&k.unshift(h.splice(-b.lgSize,h.length).join(""));h.length>b.gSize;)k.unshift(h.splice(-b.gSize,h.length).join(""));h.length&&k.unshift(h.join(""));h=k.join(d);f.length&&(h+=c+f.join(""));e&&(h+="e+"+e)}return 0>a&&!g?b.negPre+h+b.negSuf:b.posPre+h+b.posSuf}function Ob(a,b,d,c){var e="";if(0>a||c&&0>=a)c?a=-a+1:(a=-a,e="-");for(a=""+a;a.length<b;)a=Ec+a;d&&(a=a.substr(a.length-b));return e+a}function ea(a,
b,d,c,e){d=d||0;return function(f){f=f["get"+a]();if(0<d||f>-d)f+=d;0===f&&-12===d&&(f=12);return Ob(f,b,c,e)}}function kb(a,b,d){return function(c,e){var f=c["get"+a](),g=ub((d?"STANDALONE":"")+(b?"SHORT":"")+a);return e[g][f]}}function Xd(a){var b=(new Date(a,0,1)).getDay();return new Date(a,0,(4>=b?5:12)-b)}function Yd(a){return function(b){var d=Xd(b.getFullYear());b=+new Date(b.getFullYear(),b.getMonth(),b.getDate()+(4-b.getDay()))-+d;b=1+Math.round(b/6048E5);return Ob(b,a)}}function Fc(a,b){return 0>=
a.getFullYear()?b.ERAS[0]:b.ERAS[1]}function Rd(a){function b(a){var b;if(b=a.match(d)){a=new Date(0);var f=0,g=0,k=b[8]?a.setUTCFullYear:a.setFullYear,h=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=fa(b[9]+b[10]),g=fa(b[9]+b[11]));k.call(a,fa(b[1]),fa(b[2])-1,fa(b[3]));f=fa(b[4]||0)-f;g=fa(b[5]||0)-g;k=fa(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));h.call(a,f,g,k,b)}return a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,
d,f){var g="",k=[],h,l;d=d||"mediumDate";d=a.DATETIME_FORMATS[d]||d;A(c)&&(c=eh.test(c)?fa(c):b(c));W(c)&&(c=new Date(c));if(!ha(c)||!isFinite(c.getTime()))return c;for(;d;)(l=fh.exec(d))?(k=db(k,l,1),d=k.pop()):(k.push(d),d=null);var m=c.getTimezoneOffset();f&&(m=ec(f,m),c=fc(c,f,!0));r(k,function(b){h=gh[b];g+=h?h(c,a.DATETIME_FORMATS,m):"''"===b?"'":b.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Yg(){return function(a,b){z(b)&&(b=2);return eb(a,b)}}function Zg(){return function(a,
b,d){b=Infinity===Math.abs(Number(b))?Number(b):fa(b);if(X(b))return a;W(a)&&(a=a.toString());if(!ya(a))return a;d=!d||isNaN(d)?0:fa(d);d=0>d?Math.max(0,a.length+d):d;return 0<=b?Gc(a,d,d+b):0===d?Gc(a,b,a.length):Gc(a,Math.max(0,d+b),d)}}function Gc(a,b,d){return A(a)?a.slice(b,d):Ha.call(a,b,d)}function Td(a){function b(b){return b.map(function(b){var c=1,d=Ta;if(B(b))d=b;else if(A(b)){if("+"===b.charAt(0)||"-"===b.charAt(0))c="-"===b.charAt(0)?-1:1,b=b.substring(1);if(""!==b&&(d=a(b),d.constant))var e=
d(),d=function(a){return a[e]}}return{get:d,descending:c}})}function d(a){switch(typeof a){case "number":case "boolean":case "string":return!0;default:return!1}}function c(a,b){var c=0,d=a.type,h=b.type;if(d===h){var h=a.value,l=b.value;"string"===d?(h=h.toLowerCase(),l=l.toLowerCase()):"object"===d&&(D(h)&&(h=a.index),D(l)&&(l=b.index));h!==l&&(c=h<l?-1:1)}else c="undefined"===d?1:"undefined"===h?-1:"null"===d?1:"null"===h?-1:d<h?-1:1;return c}return function(a,f,g,k){if(null==a)return a;if(!ya(a))throw F("orderBy")("notarray",
a);H(f)||(f=[f]);0===f.length&&(f=["+"]);var h=b(f),l=g?-1:1,m=B(k)?k:c;a=Array.prototype.map.call(a,function(a,b){return{value:a,tieBreaker:{value:b,type:"number",index:b},predicateValues:h.map(function(c){var e=c.get(a);c=typeof e;if(null===e)c="null";else if("object"===c)a:{if(B(e.valueOf)&&(e=e.valueOf(),d(e)))break a;bc(e)&&(e=e.toString(),d(e))}return{value:e,type:c,index:b}})}});a.sort(function(a,b){for(var d=0,e=h.length;d<e;d++){var f=m(a.predicateValues[d],b.predicateValues[d]);if(f)return f*
h[d].descending*l}return(m(a.tieBreaker,b.tieBreaker)||c(a.tieBreaker,b.tieBreaker))*l});return a=a.map(function(a){return a.value})}}function Ra(a){B(a)&&(a={link:a});a.restrict=a.restrict||"AC";return ia(a)}function Pb(a,b,d,c,e){this.$$controls=[];this.$error={};this.$$success={};this.$pending=void 0;this.$name=e(b.name||b.ngForm||"")(d);this.$dirty=!1;this.$valid=this.$pristine=!0;this.$submitted=this.$invalid=!1;this.$$parentForm=lb;this.$$element=a;this.$$animate=c;Zd(this)}function Zd(a){a.$$classCache=
{};a.$$classCache[$d]=!(a.$$classCache[mb]=a.$$element.hasClass(mb))}function ae(a){function b(a,b,c){c&&!a.$$classCache[b]?(a.$$animate.addClass(a.$$element,b),a.$$classCache[b]=!0):!c&&a.$$classCache[b]&&(a.$$animate.removeClass(a.$$element,b),a.$$classCache[b]=!1)}function d(a,c,d){c=c?"-"+Vc(c,"-"):"";b(a,mb+c,!0===d);b(a,$d+c,!1===d)}var c=a.set,e=a.unset;a.clazz.prototype.$setValidity=function(a,g,k){z(g)?(this.$pending||(this.$pending={}),c(this.$pending,a,k)):(this.$pending&&e(this.$pending,
a,k),be(this.$pending)&&(this.$pending=void 0));Ga(g)?g?(e(this.$error,a,k),c(this.$$success,a,k)):(c(this.$error,a,k),e(this.$$success,a,k)):(e(this.$error,a,k),e(this.$$success,a,k));this.$pending?(b(this,"ng-pending",!0),this.$valid=this.$invalid=void 0,d(this,"",null)):(b(this,"ng-pending",!1),this.$valid=be(this.$error),this.$invalid=!this.$valid,d(this,"",this.$valid));g=this.$pending&&this.$pending[a]?void 0:this.$error[a]?!1:this.$$success[a]?!0:null;d(this,a,g);this.$$parentForm.$setValidity(a,
g,this)}}function be(a){if(a)for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function Hc(a){a.$formatters.push(function(b){return a.$isEmpty(b)?b:b.toString()})}function Sa(a,b,d,c,e,f){var g=K(b[0].type);if(!e.android){var k=!1;b.on("compositionstart",function(){k=!0});b.on("compositionupdate",function(a){if(z(a.data)||""===a.data)k=!1});b.on("compositionend",function(){k=!1;l()})}var h,l=function(a){h&&(f.defer.cancel(h),h=null);if(!k){var e=b.val();a=a&&a.type;"password"===g||d.ngTrim&&
"false"===d.ngTrim||(e=U(e));(c.$viewValue!==e||""===e&&c.$$hasNativeValidators)&&c.$setViewValue(e,a)}};if(e.hasEvent("input"))b.on("input",l);else{var m=function(a,b,c){h||(h=f.defer(function(){h=null;b&&b.value===c||l(a)}))};b.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&19>b||37<=b&&40>=b||m(a,this,this.value)});if(e.hasEvent("paste"))b.on("paste cut drop",m)}b.on("change",l);if(ce[g]&&c.$$hasNativeValidators&&g===d.type)b.on("keydown wheel mousedown",function(a){if(!h){var b=this.validity,
c=b.badInput,d=b.typeMismatch;h=f.defer(function(){h=null;b.badInput===c&&b.typeMismatch===d||l(a)})}});c.$render=function(){var a=c.$isEmpty(c.$viewValue)?"":c.$viewValue;b.val()!==a&&b.val(a)}}function Qb(a,b){return function(d,c){var e,f;if(ha(d))return d;if(A(d)){'"'===d.charAt(0)&&'"'===d.charAt(d.length-1)&&(d=d.substring(1,d.length-1));if(hh.test(d))return new Date(d);a.lastIndex=0;if(e=a.exec(d))return e.shift(),f=c?{yyyy:c.getFullYear(),MM:c.getMonth()+1,dd:c.getDate(),HH:c.getHours(),mm:c.getMinutes(),
ss:c.getSeconds(),sss:c.getMilliseconds()/1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},r(e,function(a,c){c<b.length&&(f[b[c]]=+a)}),e=new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0),100>f.yyyy&&e.setFullYear(f.yyyy),e}return NaN}}function nb(a,b,d,c){return function(e,f,g,k,h,l,m,p){function n(a){return a&&!(a.getTime&&a.getTime()!==a.getTime())}function s(a){return w(a)&&!ha(a)?r(a)||void 0:a}function r(a,b){var c=k.$options.getOption("timezone");v&&v!==c&&(b=Sc(b,ec(v)));var e=d(a,
b);!isNaN(e)&&c&&(e=fc(e,c));return e}Ic(e,f,g,k,a);Sa(e,f,g,k,h,l);var t="time"===a||"datetimelocal"===a,q,v;k.$parsers.push(function(c){if(k.$isEmpty(c))return null;if(b.test(c))return r(c,q);k.$$parserName=a});k.$formatters.push(function(a){if(a&&!ha(a))throw ob("datefmt",a);if(n(a)){q=a;var b=k.$options.getOption("timezone");b&&(v=b,q=fc(q,b,!0));var d=c;t&&A(k.$options.getOption("timeSecondsFormat"))&&(d=c.replace("ss.sss",k.$options.getOption("timeSecondsFormat")).replace(/:$/,""));a=m("date")(a,
d,b);t&&k.$options.getOption("timeStripZeroSeconds")&&(a=a.replace(/(?::00)?(?:\.000)?$/,""));return a}v=q=null;return""});if(w(g.min)||g.ngMin){var x=g.min||p(g.ngMin)(e),B=s(x);k.$validators.min=function(a){return!n(a)||z(B)||d(a)>=B};g.$observe("min",function(a){a!==x&&(B=s(a),x=a,k.$validate())})}if(w(g.max)||g.ngMax){var y=g.max||p(g.ngMax)(e),J=s(y);k.$validators.max=function(a){return!n(a)||z(J)||d(a)<=J};g.$observe("max",function(a){a!==y&&(J=s(a),y=a,k.$validate())})}}}function Ic(a,b,d,
c,e){(c.$$hasNativeValidators=D(b[0].validity))&&c.$parsers.push(function(a){var d=b.prop("validity")||{};if(d.badInput||d.typeMismatch)c.$$parserName=e;else return a})}function de(a){a.$parsers.push(function(b){if(a.$isEmpty(b))return null;if(ih.test(b))return parseFloat(b);a.$$parserName="number"});a.$formatters.push(function(b){if(!a.$isEmpty(b)){if(!W(b))throw ob("numfmt",b);b=b.toString()}return b})}function na(a){w(a)&&!W(a)&&(a=parseFloat(a));return X(a)?void 0:a}function Jc(a){var b=a.toString(),
d=b.indexOf(".");return-1===d?-1<a&&1>a&&(a=/e-(\d+)$/.exec(b))?Number(a[1]):0:b.length-d-1}function ee(a,b,d){a=Number(a);var c=(a|0)!==a,e=(b|0)!==b,f=(d|0)!==d;if(c||e||f){var g=c?Jc(a):0,k=e?Jc(b):0,h=f?Jc(d):0,g=Math.max(g,k,h),g=Math.pow(10,g);a*=g;b*=g;d*=g;c&&(a=Math.round(a));e&&(b=Math.round(b));f&&(d=Math.round(d))}return 0===(a-b)%d}function fe(a,b,d,c,e){if(w(c)){a=a(c);if(!a.constant)throw ob("constexpr",d,c);return a(b)}return e}function Kc(a,b){function d(a,b){if(!a||!a.length)return[];
if(!b||!b.length)return a;var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e===b[m])continue a;c.push(e)}return c}function c(a){if(!a)return a;var b=a;H(a)?b=a.map(c).join(" "):D(a)?b=Object.keys(a).filter(function(b){return a[b]}).join(" "):A(a)||(b=a+"");return b}a="ngClass"+a;var e;return["$parse",function(f){return{restrict:"AC",link:function(g,k,h){function l(a,b){var c=[];r(a,function(a){if(0<b||p[a])p[a]=(p[a]||0)+b,p[a]===+(0<b)&&c.push(a)});return c.join(" ")}function m(a){if(a===
b){var c=s,c=l(c&&c.split(" "),1);h.$addClass(c)}else c=s,c=l(c&&c.split(" "),-1),h.$removeClass(c);n=a}var p=k.data("$classCounts"),n=!0,s;p||(p=T(),k.data("$classCounts",p));"ngClass"!==a&&(e||(e=f("$index",function(a){return a&1})),g.$watch(e,m));g.$watch(f(h[a],c),function(a){if(n===b){var c=s&&s.split(" "),e=a&&a.split(" "),f=d(c,e),c=d(e,c),f=l(f,-1),c=l(c,1);h.$addClass(c);h.$removeClass(f)}s=a})}}}]}function qd(a,b,d,c,e,f){return{restrict:"A",compile:function(g,k){var h=a(k[c]);return function(a,
c){c.on(e,function(c){var e=function(){h(a,{$event:c})};if(b.$$phase)if(f)a.$evalAsync(e);else try{e()}catch(g){d(g)}else a.$apply(e)})}}}}function Rb(a,b,d,c,e,f,g,k,h){this.$modelValue=this.$viewValue=Number.NaN;this.$$rawModelValue=void 0;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=
void 0;this.$name=h(d.name||"",!1)(a);this.$$parentForm=lb;this.$options=Sb;this.$$updateEvents="";this.$$updateEventHandler=this.$$updateEventHandler.bind(this);this.$$parsedNgModel=e(d.ngModel);this.$$parsedNgModelAssign=this.$$parsedNgModel.assign;this.$$ngModelGet=this.$$parsedNgModel;this.$$ngModelSet=this.$$parsedNgModelAssign;this.$$pendingDebounce=null;this.$$parserValid=void 0;this.$$parserName="parse";this.$$currentValidationRunId=0;this.$$scope=a;this.$$rootScope=a.$root;this.$$attr=d;
this.$$element=c;this.$$animate=f;this.$$timeout=g;this.$$parse=e;this.$$q=k;this.$$exceptionHandler=b;Zd(this);jh(this)}function jh(a){a.$$scope.$watch(function(b){b=a.$$ngModelGet(b);b===a.$modelValue||a.$modelValue!==a.$modelValue&&b!==b||a.$$setModelValue(b);return b})}function Lc(a){this.$$options=a}function ge(a,b){r(b,function(b,c){w(a[c])||(a[c]=b)})}function Oa(a,b){a.prop("selected",b);a.attr("selected",b)}function he(a,b,d){if(a){A(a)&&(a=new RegExp("^"+a+"$"));if(!a.test)throw F("ngPattern")("noregexp",
b,a,za(d));return a}}function Tb(a){a=fa(a);return X(a)?-1:a}var Wb={objectMaxDepth:5,urlErrorParamsEnabled:!0},ie=/^\/(.+)\/([a-z]*)$/,ta=Object.prototype.hasOwnProperty,K=function(a){return A(a)?a.toLowerCase():a},ub=function(a){return A(a)?a.toUpperCase():a},Ca,x,rb,Ha=[].slice,Fg=[].splice,kh=[].push,la=Object.prototype.toString,Pc=Object.getPrototypeOf,pa=F("ng"),ca=C.angular||(C.angular={}),kc,pb=0;Ca=C.document.documentMode;var X=Number.isNaN||function(a){return a!==a};E.$inject=[];Ta.$inject=
[];var ve=/^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/,U=function(a){return A(a)?a.trim():a},Md=function(a){return a.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")},Aa=function(){if(!w(Aa.rules)){var a=C.document.querySelector("[ng-csp]")||C.document.querySelector("[data-ng-csp]");if(a){var b=a.getAttribute("ng-csp")||a.getAttribute("data-ng-csp");Aa.rules={noUnsafeEval:!b||-1!==b.indexOf("no-unsafe-eval"),noInlineStyle:!b||-1!==
b.indexOf("no-inline-style")}}else{a=Aa;try{new Function(""),b=!1}catch(d){b=!0}a.rules={noUnsafeEval:b,noInlineStyle:!1}}}return Aa.rules},qb=function(){if(w(qb.name_))return qb.name_;var a,b,d=Qa.length,c,e;for(b=0;b<d;++b)if(c=Qa[b],a=C.document.querySelector("["+c.replace(":","\\:")+"jq]")){e=a.getAttribute(c+"jq");break}return qb.name_=e},xe=/:/g,Qa=["ng-","data-ng-","ng:","x-ng-"],Be=function(a){var b=a.currentScript;if(!b)return!0;if(!(b instanceof C.HTMLScriptElement||b instanceof C.SVGScriptElement))return!1;
b=b.attributes;return[b.getNamedItem("src"),b.getNamedItem("href"),b.getNamedItem("xlink:href")].every(function(b){if(!b)return!0;if(!b.value)return!1;var c=a.createElement("a");c.href=b.value;if(a.location.origin===c.origin)return!0;switch(c.protocol){case "http:":case "https:":case "ftp:":case "blob:":case "file:":case "data:":return!0;default:return!1}})}(C.document),Ee=/[A-Z]/g,Wc=!1,Pa=3,Ke={full:"1.7.8",major:1,minor:7,dot:8,codeName:"enthusiastic-oblation"};Y.expando="ng339";var Ka=Y.cache=
{},pg=1;Y._data=function(a){return this.cache[a[this.expando]]||{}};var lg=/-([a-z])/g,lh=/^-ms-/,Ab={mouseleave:"mouseout",mouseenter:"mouseover"},nc=F("jqLite"),og=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,mc=/<|&#?\w+;/,mg=/<([\w:-]+)/,ng=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,oa={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>",
"</tr></tbody></table>"],_default:[0,"",""]};oa.optgroup=oa.option;oa.tbody=oa.tfoot=oa.colgroup=oa.caption=oa.thead;oa.th=oa.td;var ug=C.Node.prototype.contains||function(a){return!!(this.compareDocumentPosition(a)&16)},Wa=Y.prototype={ready:fd,toString:function(){var a=[];r(this,function(b){a.push(""+b)});return"["+a.join(", ")+"]"},eq:function(a){return 0<=a?x(this[a]):x(this[this.length+a])},length:0,push:kh,sort:[].sort,splice:[].splice},Gb={};r("multiple selected checked disabled readOnly required open".split(" "),
function(a){Gb[K(a)]=a});var md={};r("input select option textarea button form details".split(" "),function(a){md[a]=!0});var td={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern",ngStep:"step"};r({data:rc,removeData:qc,hasData:function(a){for(var b in Ka[a.ng339])return!0;return!1},cleanData:function(a){for(var b=0,d=a.length;b<d;b++)qc(a[b]),id(a[b])}},function(a,b){Y[b]=a});r({data:rc,inheritedData:Eb,scope:function(a){return x.data(a,"$scope")||Eb(a.parentNode||
a,["$isolateScope","$scope"])},isolateScope:function(a){return x.data(a,"$isolateScope")||x.data(a,"$isolateScopeNoTemplate")},controller:jd,injector:function(a){return Eb(a,"$injector")},removeAttr:function(a,b){a.removeAttribute(b)},hasClass:Bb,css:function(a,b,d){b=xb(b.replace(lh,"ms-"));if(w(d))a.style[b]=d;else return a.style[b]},attr:function(a,b,d){var c=a.nodeType;if(c!==Pa&&2!==c&&8!==c&&a.getAttribute){var c=K(b),e=Gb[c];if(w(d))null===d||!1===d&&e?a.removeAttribute(b):a.setAttribute(b,
e?c:d);else return a=a.getAttribute(b),e&&null!==a&&(a=c),null===a?void 0:a}},prop:function(a,b,d){if(w(d))a[b]=d;else return a[b]},text:function(){function a(a,d){if(z(d)){var c=a.nodeType;return 1===c||c===Pa?a.textContent:""}a.textContent=d}a.$dv="";return a}(),val:function(a,b){if(z(b)){if(a.multiple&&"select"===ua(a)){var d=[];r(a.options,function(a){a.selected&&d.push(a.value||a.text)});return d}return a.value}a.value=b},html:function(a,b){if(z(b))return a.innerHTML;yb(a,!0);a.innerHTML=b},
empty:kd},function(a,b){Y.prototype[b]=function(b,c){var e,f,g=this.length;if(a!==kd&&z(2===a.length&&a!==Bb&&a!==jd?b:c)){if(D(b)){for(e=0;e<g;e++)if(a===rc)a(this[e],b);else for(f in b)a(this[e],f,b[f]);return this}e=a.$dv;g=z(e)?Math.min(g,1):g;for(f=0;f<g;f++){var k=a(this[f],b,c);e=e?e+k:k}return e}for(e=0;e<g;e++)a(this[e],b,c);return this}});r({removeData:qc,on:function(a,b,d,c){if(w(c))throw nc("onargs");if(lc(a)){c=zb(a,!0);var e=c.events,f=c.handle;f||(f=c.handle=rg(a,e));c=0<=b.indexOf(" ")?
b.split(" "):[b];for(var g=c.length,k=function(b,c,g){var k=e[b];k||(k=e[b]=[],k.specialHandlerWrapper=c,"$destroy"===b||g||a.addEventListener(b,f));k.push(d)};g--;)b=c[g],Ab[b]?(k(Ab[b],tg),k(b,void 0,!0)):k(b)}},off:id,one:function(a,b,d){a=x(a);a.on(b,function e(){a.off(b,d);a.off(b,e)});a.on(b,d)},replaceWith:function(a,b){var d,c=a.parentNode;yb(a);r(new Y(b),function(b){d?c.insertBefore(b,d.nextSibling):c.replaceChild(b,a);d=b})},children:function(a){var b=[];r(a.childNodes,function(a){1===
a.nodeType&&b.push(a)});return b},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,b){var d=a.nodeType;if(1===d||11===d){b=new Y(b);for(var d=0,c=b.length;d<c;d++)a.appendChild(b[d])}},prepend:function(a,b){if(1===a.nodeType){var d=a.firstChild;r(new Y(b),function(b){a.insertBefore(b,d)})}},wrap:function(a,b){var d=x(b).eq(0).clone()[0],c=a.parentNode;c&&c.replaceChild(d,a);d.appendChild(a)},remove:Fb,detach:function(a){Fb(a,!0)},after:function(a,b){var d=a,c=a.parentNode;
if(c){b=new Y(b);for(var e=0,f=b.length;e<f;e++){var g=b[e];c.insertBefore(g,d.nextSibling);d=g}}},addClass:Db,removeClass:Cb,toggleClass:function(a,b,d){b&&r(b.split(" "),function(b){var e=d;z(e)&&(e=!Bb(a,b));(e?Db:Cb)(a,b)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,b){return a.getElementsByTagName?a.getElementsByTagName(b):[]},clone:pc,triggerHandler:function(a,b,d){var c,e,f=b.type||b,g=zb(a);if(g=(g=g&&g.events)&&
g[f])c={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:E,type:f,target:a},b.type&&(c=S(c,b)),b=ja(g),e=d?[c].concat(d):[c],r(b,function(b){c.isImmediatePropagationStopped()||b.apply(a,e)})}},function(a,b){Y.prototype[b]=function(b,c,e){for(var f,g=0,k=this.length;g<
k;g++)z(f)?(f=a(this[g],b,c,e),w(f)&&(f=x(f))):oc(f,a(this[g],b,c,e));return w(f)?f:this}});Y.prototype.bind=Y.prototype.on;Y.prototype.unbind=Y.prototype.off;var mh=Object.create(null);nd.prototype={_idx:function(a){a!==this._lastKey&&(this._lastKey=a,this._lastIndex=this._keys.indexOf(a));return this._lastIndex},_transformKey:function(a){return X(a)?mh:a},get:function(a){a=this._transformKey(a);a=this._idx(a);if(-1!==a)return this._values[a]},has:function(a){a=this._transformKey(a);return-1!==this._idx(a)},
set:function(a,b){a=this._transformKey(a);var d=this._idx(a);-1===d&&(d=this._lastIndex=this._keys.length);this._keys[d]=a;this._values[d]=b},delete:function(a){a=this._transformKey(a);a=this._idx(a);if(-1===a)return!1;this._keys.splice(a,1);this._values.splice(a,1);this._lastKey=NaN;this._lastIndex=-1;return!0}};var Hb=nd,jg=[function(){this.$get=[function(){return Hb}]}],wg=/^([^(]+?)=>/,xg=/^[^(]*\(\s*([^)]*)\)/m,nh=/,/,oh=/^\s*(_?)(\S+?)\1\s*$/,vg=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ba=F("$injector");
fb.$$annotate=function(a,b,d){var c;if("function"===typeof a){if(!(c=a.$inject)){c=[];if(a.length){if(b)throw A(d)&&d||(d=a.name||yg(a)),Ba("strictdi",d);b=od(a);r(b[1].split(nh),function(a){a.replace(oh,function(a,b,d){c.push(d)})})}a.$inject=c}}else H(a)?(b=a.length-1,sb(a[b],"fn"),c=a.slice(0,b)):sb(a,"fn",!0);return c};var je=F("$animate"),zf=function(){this.$get=E},Af=function(){var a=new Hb,b=[];this.$get=["$$AnimateRunner","$rootScope",function(d,c){function e(a,b,c){var d=!1;b&&(b=A(b)?b.split(" "):
H(b)?b:[],r(b,function(b){b&&(d=!0,a[b]=c)}));return d}function f(){r(b,function(b){var c=a.get(b);if(c){var d=zg(b.attr("class")),e="",f="";r(c,function(a,b){a!==!!d[b]&&(a?e+=(e.length?" ":"")+b:f+=(f.length?" ":"")+b)});r(b,function(a){e&&Db(a,e);f&&Cb(a,f)});a.delete(b)}});b.length=0}return{enabled:E,on:E,off:E,pin:E,push:function(g,k,h,l){l&&l();h=h||{};h.from&&g.css(h.from);h.to&&g.css(h.to);if(h.addClass||h.removeClass)if(k=h.addClass,l=h.removeClass,h=a.get(g)||{},k=e(h,k,!0),l=e(h,l,!1),
k||l)a.set(g,h),b.push(g),1===b.length&&c.$$postDigest(f);g=new d;g.complete();return g}}}]},xf=["$provide",function(a){var b=this,d=null,c=null;this.$$registeredAnimations=Object.create(null);this.register=function(c,d){if(c&&"."!==c.charAt(0))throw je("notcsel",c);var g=c+"-animation";b.$$registeredAnimations[c.substr(1)]=g;a.factory(g,d)};this.customFilter=function(a){1===arguments.length&&(c=B(a)?a:null);return c};this.classNameFilter=function(a){if(1===arguments.length&&(d=a instanceof RegExp?
a:null)&&/[(\s|\/)]ng-animate[(\s|\/)]/.test(d.toString()))throw d=null,je("nongcls","ng-animate");return d};this.$get=["$$animateQueue",function(a){function b(a,c,d){if(d){var e;a:{for(e=0;e<d.length;e++){var f=d[e];if(1===f.nodeType){e=f;break a}}e=void 0}!e||e.parentNode||e.previousElementSibling||(d=null)}d?d.after(a):c.prepend(a)}return{on:a.on,off:a.off,pin:a.pin,enabled:a.enabled,cancel:function(a){a.cancel&&a.cancel()},enter:function(c,d,h,l){d=d&&x(d);h=h&&x(h);d=d||h.parent();b(c,d,h);return a.push(c,
"enter",ra(l))},move:function(c,d,h,l){d=d&&x(d);h=h&&x(h);d=d||h.parent();b(c,d,h);return a.push(c,"move",ra(l))},leave:function(b,c){return a.push(b,"leave",ra(c),function(){b.remove()})},addClass:function(b,c,d){d=ra(d);d.addClass=hb(d.addclass,c);return a.push(b,"addClass",d)},removeClass:function(b,c,d){d=ra(d);d.removeClass=hb(d.removeClass,c);return a.push(b,"removeClass",d)},setClass:function(b,c,d,f){f=ra(f);f.addClass=hb(f.addClass,c);f.removeClass=hb(f.removeClass,d);return a.push(b,"setClass",
f)},animate:function(b,c,d,f,m){m=ra(m);m.from=m.from?S(m.from,c):c;m.to=m.to?S(m.to,d):d;m.tempClasses=hb(m.tempClasses,f||"ng-inline-animate");return a.push(b,"animate",m)}}}]}],Cf=function(){this.$get=["$$rAF",function(a){function b(b){d.push(b);1<d.length||a(function(){for(var a=0;a<d.length;a++)d[a]();d=[]})}var d=[];return function(){var a=!1;b(function(){a=!0});return function(d){a?d():b(d)}}}]},Bf=function(){this.$get=["$q","$sniffer","$$animateAsyncRun","$$isDocumentHidden","$timeout",function(a,
b,d,c,e){function f(a){this.setHost(a);var b=d();this._doneCallbacks=[];this._tick=function(a){c()?e(a,0,!1):b(a)};this._state=0}f.chain=function(a,b){function c(){if(d===a.length)b(!0);else a[d](function(a){!1===a?b(!1):(d++,c())})}var d=0;c()};f.all=function(a,b){function c(f){e=e&&f;++d===a.length&&b(e)}var d=0,e=!0;r(a,function(a){a.done(c)})};f.prototype={setHost:function(a){this.host=a||{}},done:function(a){2===this._state?a():this._doneCallbacks.push(a)},progress:E,getPromise:function(){if(!this.promise){var b=
this;this.promise=a(function(a,c){b.done(function(b){!1===b?c():a()})})}return this.promise},then:function(a,b){return this.getPromise().then(a,b)},"catch":function(a){return this.getPromise()["catch"](a)},"finally":function(a){return this.getPromise()["finally"](a)},pause:function(){this.host.pause&&this.host.pause()},resume:function(){this.host.resume&&this.host.resume()},end:function(){this.host.end&&this.host.end();this._resolve(!0)},cancel:function(){this.host.cancel&&this.host.cancel();this._resolve(!1)},
complete:function(a){var b=this;0===b._state&&(b._state=1,b._tick(function(){b._resolve(a)}))},_resolve:function(a){2!==this._state&&(r(this._doneCallbacks,function(b){b(a)}),this._doneCallbacks.length=0,this._state=2)}};return f}]},yf=function(){this.$get=["$$rAF","$q","$$AnimateRunner",function(a,b,d){return function(b,e){function f(){a(function(){g.addClass&&(b.addClass(g.addClass),g.addClass=null);g.removeClass&&(b.removeClass(g.removeClass),g.removeClass=null);g.to&&(b.css(g.to),g.to=null);k||
h.complete();k=!0});return h}var g=e||{};g.$$prepared||(g=Ia(g));g.cleanupStyles&&(g.from=g.to=null);g.from&&(b.css(g.from),g.from=null);var k,h=new d;return{start:f,end:f}}}]},$=F("$compile"),tc=new function(){};Xc.$inject=["$provide","$$sanitizeUriProvider"];Jb.prototype.isFirstChange=function(){return this.previousValue===tc};var pd=/^((?:x|data)[:\-_])/i,Eg=/[:\-_]+(.)/g,vd=F("$controller"),ud=/^(\S+)(\s+as\s+([\w$]+))?$/,Jf=function(){this.$get=["$document",function(a){return function(b){b?!b.nodeType&&
b instanceof x&&(b=b[0]):b=a[0].body;return b.offsetWidth+1}}]},wd="application/json",wc={"Content-Type":wd+";charset=utf-8"},Hg=/^\[|^\{(?!\{)/,Ig={"[":/]$/,"{":/}$/},Gg=/^\)]\}',?\n/,Kb=F("$http"),Ma=ca.$interpolateMinErr=F("$interpolate");Ma.throwNoconcat=function(a){throw Ma("noconcat",a);};Ma.interr=function(a,b){return Ma("interr",a,b.toString())};var Lg=F("$interval"),Sf=function(){this.$get=function(){function a(a){var b=function(a){b.data=a;b.called=!0};b.id=a;return b}var b=ca.callbacks,
d={};return{createCallback:function(c){c="_"+(b.$$counter++).toString(36);var e="angular.callbacks."+c,f=a(c);d[e]=b[c]=f;return e},wasCalled:function(a){return d[a].called},getResponse:function(a){return d[a].data},removeCallback:function(a){delete b[d[a].id];delete d[a]}}}},ph=/^([^?#]*)(\?([^#]*))?(#(.*))?$/,Mg={http:80,https:443,ftp:21},jb=F("$location"),Ng=/^\s*[\\/]{2,}/,qh={$$absUrl:"",$$html5:!1,$$replace:!1,$$compose:function(){for(var a=this.$$path,b=this.$$hash,d=ye(this.$$search),b=b?
"#"+hc(b):"",a=a.split("/"),c=a.length;c--;)a[c]=hc(a[c].replace(/%2F/g,"/"));this.$$url=a.join("/")+(d?"?"+d:"")+b;this.$$absUrl=this.$$normalizeUrl(this.$$url);this.$$urlUpdatedByLocation=!0},absUrl:Lb("$$absUrl"),url:function(a){if(z(a))return this.$$url;var b=ph.exec(a);(b[1]||""===a)&&this.path(decodeURIComponent(b[1]));(b[2]||b[1]||""===a)&&this.search(b[3]||"");this.hash(b[5]||"");return this},protocol:Lb("$$protocol"),host:Lb("$$host"),port:Lb("$$port"),path:Dd("$$path",function(a){a=null!==
a?a.toString():"";return"/"===a.charAt(0)?a:"/"+a}),search:function(a,b){switch(arguments.length){case 0:return this.$$search;case 1:if(A(a)||W(a))a=a.toString(),this.$$search=gc(a);else if(D(a))a=Ia(a,{}),r(a,function(b,c){null==b&&delete a[c]}),this.$$search=a;else throw jb("isrcharg");break;default:z(b)||null===b?delete this.$$search[a]:this.$$search[a]=b}this.$$compose();return this},hash:Dd("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};
r([Cd,zc,yc],function(a){a.prototype=Object.create(qh);a.prototype.state=function(b){if(!arguments.length)return this.$$state;if(a!==yc||!this.$$html5)throw jb("nostate");this.$$state=z(b)?null:b;this.$$urlUpdatedByLocation=!0;return this}});var Ya=F("$parse"),Rg={}.constructor.prototype.valueOf,Ub=T();r("+ - * / % === !== == != < > <= >= && || ! = |".split(" "),function(a){Ub[a]=!0});var rh={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},Nb=function(a){this.options=a};Nb.prototype={constructor:Nb,
lex:function(a){this.text=a;this.index=0;for(this.tokens=[];this.index<this.text.length;)if(a=this.text.charAt(this.index),'"'===a||"'"===a)this.readString(a);else if(this.isNumber(a)||"."===a&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdentifierStart(this.peekMultichar()))this.readIdent();else if(this.is(a,"(){}[].,;:?"))this.tokens.push({index:this.index,text:a}),this.index++;else if(this.isWhitespace(a))this.index++;else{var b=a+this.peek(),d=b+this.peek(2),c=Ub[b],e=Ub[d];Ub[a]||
c||e?(a=e?d:c?b:a,this.tokens.push({index:this.index,text:a,operator:!0}),this.index+=a.length):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a,b){return-1!==b.indexOf(a)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a&&"string"===typeof a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===a},isIdentifierStart:function(a){return this.options.isIdentifierStart?
this.options.isIdentifierStart(a,this.codePointAt(a)):this.isValidIdentifierStart(a)},isValidIdentifierStart:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isIdentifierContinue:function(a){return this.options.isIdentifierContinue?this.options.isIdentifierContinue(a,this.codePointAt(a)):this.isValidIdentifierContinue(a)},isValidIdentifierContinue:function(a,b){return this.isValidIdentifierStart(a,b)||this.isNumber(a)},codePointAt:function(a){return 1===a.length?a.charCodeAt(0):
(a.charCodeAt(0)<<10)+a.charCodeAt(1)-56613888},peekMultichar:function(){var a=this.text.charAt(this.index),b=this.peek();if(!b)return a;var d=a.charCodeAt(0),c=b.charCodeAt(0);return 55296<=d&&56319>=d&&56320<=c&&57343>=c?a+b:a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,b,d){d=d||this.index;b=w(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,d)+"]":" "+d;throw Ya("lexerr",a,b,this.text);},readNumber:function(){for(var a="",b=this.index;this.index<
this.text.length;){var d=K(this.text.charAt(this.index));if("."===d||this.isNumber(d))a+=d;else{var c=this.peek();if("e"===d&&this.isExpOperator(c))a+=d;else if(this.isExpOperator(d)&&c&&this.isNumber(c)&&"e"===a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||c&&this.isNumber(c)||"e"!==a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}this.tokens.push({index:b,text:a,constant:!0,value:Number(a)})},readIdent:function(){var a=this.index;for(this.index+=this.peekMultichar().length;this.index<
this.text.length;){var b=this.peekMultichar();if(!this.isIdentifierContinue(b))break;this.index+=b.length}this.tokens.push({index:a,text:this.text.slice(a,this.index),identifier:!0})},readString:function(a){var b=this.index;this.index++;for(var d="",c=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),c=c+f;if(e)"u"===f?(e=this.text.substring(this.index+1,this.index+5),e.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+e+"]"),this.index+=4,d+=String.fromCharCode(parseInt(e,
16))):d+=rh[f]||f,e=!1;else if("\\"===f)e=!0;else{if(f===a){this.index++;this.tokens.push({index:b,text:c,constant:!0,value:d});return}d+=f}this.index++}this.throwError("Unterminated quote",b)}};var q=function(a,b){this.lexer=a;this.options=b};q.Program="Program";q.ExpressionStatement="ExpressionStatement";q.AssignmentExpression="AssignmentExpression";q.ConditionalExpression="ConditionalExpression";q.LogicalExpression="LogicalExpression";q.BinaryExpression="BinaryExpression";q.UnaryExpression="UnaryExpression";
q.CallExpression="CallExpression";q.MemberExpression="MemberExpression";q.Identifier="Identifier";q.Literal="Literal";q.ArrayExpression="ArrayExpression";q.Property="Property";q.ObjectExpression="ObjectExpression";q.ThisExpression="ThisExpression";q.LocalsExpression="LocalsExpression";q.NGValueParameter="NGValueParameter";q.prototype={ast:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.program();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);return a},
program:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.expressionStatement()),!this.expect(";"))return{type:q.Program,body:a}},expressionStatement:function(){return{type:q.ExpressionStatement,expression:this.filterChain()}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary();if(this.expect("=")){if(!Hd(a))throw Ya("lval");
a={type:q.AssignmentExpression,left:a,right:this.assignment(),operator:"="}}return a},ternary:function(){var a=this.logicalOR(),b,d;return this.expect("?")&&(b=this.expression(),this.consume(":"))?(d=this.expression(),{type:q.ConditionalExpression,test:a,alternate:b,consequent:d}):a},logicalOR:function(){for(var a=this.logicalAND();this.expect("||");)a={type:q.LogicalExpression,operator:"||",left:a,right:this.logicalAND()};return a},logicalAND:function(){for(var a=this.equality();this.expect("&&");)a=
{type:q.LogicalExpression,operator:"&&",left:a,right:this.equality()};return a},equality:function(){for(var a=this.relational(),b;b=this.expect("==","!=","===","!==");)a={type:q.BinaryExpression,operator:b.text,left:a,right:this.relational()};return a},relational:function(){for(var a=this.additive(),b;b=this.expect("<",">","<=",">=");)a={type:q.BinaryExpression,operator:b.text,left:a,right:this.additive()};return a},additive:function(){for(var a=this.multiplicative(),b;b=this.expect("+","-");)a={type:q.BinaryExpression,
operator:b.text,left:a,right:this.multiplicative()};return a},multiplicative:function(){for(var a=this.unary(),b;b=this.expect("*","/","%");)a={type:q.BinaryExpression,operator:b.text,left:a,right:this.unary()};return a},unary:function(){var a;return(a=this.expect("+","-","!"))?{type:q.UnaryExpression,operator:a.text,prefix:!0,argument:this.unary()}:this.primary()},primary:function(){var a;this.expect("(")?(a=this.filterChain(),this.consume(")")):this.expect("[")?a=this.arrayDeclaration():this.expect("{")?
a=this.object():this.selfReferential.hasOwnProperty(this.peek().text)?a=Ia(this.selfReferential[this.consume().text]):this.options.literals.hasOwnProperty(this.peek().text)?a={type:q.Literal,value:this.options.literals[this.consume().text]}:this.peek().identifier?a=this.identifier():this.peek().constant?a=this.constant():this.throwError("not a primary expression",this.peek());for(var b;b=this.expect("(","[",".");)"("===b.text?(a={type:q.CallExpression,callee:a,arguments:this.parseArguments()},this.consume(")")):
"["===b.text?(a={type:q.MemberExpression,object:a,property:this.expression(),computed:!0},this.consume("]")):"."===b.text?a={type:q.MemberExpression,object:a,property:this.identifier(),computed:!1}:this.throwError("IMPOSSIBLE");return a},filter:function(a){a=[a];for(var b={type:q.CallExpression,callee:this.identifier(),arguments:a,filter:!0};this.expect(":");)a.push(this.expression());return b},parseArguments:function(){var a=[];if(")"!==this.peekToken().text){do a.push(this.filterChain());while(this.expect(","))
}return a},identifier:function(){var a=this.consume();a.identifier||this.throwError("is not a valid identifier",a);return{type:q.Identifier,name:a.text}},constant:function(){return{type:q.Literal,value:this.consume().value}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;a.push(this.expression())}while(this.expect(","))}this.consume("]");return{type:q.ArrayExpression,elements:a}},object:function(){var a=[],b;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;
b={type:q.Property,kind:"init"};this.peek().constant?(b.key=this.constant(),b.computed=!1,this.consume(":"),b.value=this.expression()):this.peek().identifier?(b.key=this.identifier(),b.computed=!1,this.peek(":")?(this.consume(":"),b.value=this.expression()):b.value=b.key):this.peek("[")?(this.consume("["),b.key=this.expression(),this.consume("]"),b.computed=!0,this.consume(":"),b.value=this.expression()):this.throwError("invalid key",this.peek());a.push(b)}while(this.expect(","))}this.consume("}");
return{type:q.ObjectExpression,properties:a}},throwError:function(a,b){throw Ya("syntax",b.text,a,b.index+1,this.text,this.text.substring(b.index));},consume:function(a){if(0===this.tokens.length)throw Ya("ueoe",this.text);var b=this.expect(a);b||this.throwError("is unexpected, expecting ["+a+"]",this.peek());return b},peekToken:function(){if(0===this.tokens.length)throw Ya("ueoe",this.text);return this.tokens[0]},peek:function(a,b,d,c){return this.peekAhead(0,a,b,d,c)},peekAhead:function(a,b,d,c,
e){if(this.tokens.length>a){a=this.tokens[a];var f=a.text;if(f===b||f===d||f===c||f===e||!(b||d||c||e))return a}return!1},expect:function(a,b,d,c){return(a=this.peek(a,b,d,c))?(this.tokens.shift(),a):!1},selfReferential:{"this":{type:q.ThisExpression},$locals:{type:q.LocalsExpression}}};var Fd=2;Jd.prototype={compile:function(a){var b=this;this.state={nextId:0,filters:{},fn:{vars:[],body:[],own:{}},assign:{vars:[],body:[],own:{}},inputs:[]};Z(a,b.$filter);var d="",c;this.stage="assign";if(c=Id(a))this.state.computing=
"assign",d=this.nextId(),this.recurse(c,d),this.return_(d),d="fn.assign="+this.generateFunction("assign","s,v,l");c=Gd(a.body);b.stage="inputs";r(c,function(a,c){var d="fn"+c;b.state[d]={vars:[],body:[],own:{}};b.state.computing=d;var k=b.nextId();b.recurse(a,k);b.return_(k);b.state.inputs.push({name:d,isPure:a.isPure});a.watchId=c});this.state.computing="fn";this.stage="main";this.recurse(a);a='"'+this.USE+" "+this.STRICT+'";\n'+this.filterPrefix()+"var fn="+this.generateFunction("fn","s,l,a,i")+
d+this.watchFns()+"return fn;";a=(new Function("$filter","getStringValue","ifDefined","plus",a))(this.$filter,Og,Pg,Ed);this.state=this.stage=void 0;return a},USE:"use",STRICT:"strict",watchFns:function(){var a=[],b=this.state.inputs,d=this;r(b,function(b){a.push("var "+b.name+"="+d.generateFunction(b.name,"s"));b.isPure&&a.push(b.name,".isPure="+JSON.stringify(b.isPure)+";")});b.length&&a.push("fn.inputs=["+b.map(function(a){return a.name}).join(",")+"];");return a.join("")},generateFunction:function(a,
b){return"function("+b+"){"+this.varsPrefix(a)+this.body(a)+"};"},filterPrefix:function(){var a=[],b=this;r(this.state.filters,function(d,c){a.push(d+"=$filter("+b.escape(c)+")")});return a.length?"var "+a.join(",")+";":""},varsPrefix:function(a){return this.state[a].vars.length?"var "+this.state[a].vars.join(",")+";":""},body:function(a){return this.state[a].body.join("")},recurse:function(a,b,d,c,e,f){var g,k,h=this,l,m,p;c=c||E;if(!f&&w(a.watchId))b=b||this.nextId(),this.if_("i",this.lazyAssign(b,
this.computedMember("i",a.watchId)),this.lazyRecurse(a,b,d,c,e,!0));else switch(a.type){case q.Program:r(a.body,function(b,c){h.recurse(b.expression,void 0,void 0,function(a){k=a});c!==a.body.length-1?h.current().body.push(k,";"):h.return_(k)});break;case q.Literal:m=this.escape(a.value);this.assign(b,m);c(b||m);break;case q.UnaryExpression:this.recurse(a.argument,void 0,void 0,function(a){k=a});m=a.operator+"("+this.ifDefined(k,0)+")";this.assign(b,m);c(m);break;case q.BinaryExpression:this.recurse(a.left,
void 0,void 0,function(a){g=a});this.recurse(a.right,void 0,void 0,function(a){k=a});m="+"===a.operator?this.plus(g,k):"-"===a.operator?this.ifDefined(g,0)+a.operator+this.ifDefined(k,0):"("+g+")"+a.operator+"("+k+")";this.assign(b,m);c(m);break;case q.LogicalExpression:b=b||this.nextId();h.recurse(a.left,b);h.if_("&&"===a.operator?b:h.not(b),h.lazyRecurse(a.right,b));c(b);break;case q.ConditionalExpression:b=b||this.nextId();h.recurse(a.test,b);h.if_(b,h.lazyRecurse(a.alternate,b),h.lazyRecurse(a.consequent,
b));c(b);break;case q.Identifier:b=b||this.nextId();d&&(d.context="inputs"===h.stage?"s":this.assign(this.nextId(),this.getHasOwnProperty("l",a.name)+"?l:s"),d.computed=!1,d.name=a.name);h.if_("inputs"===h.stage||h.not(h.getHasOwnProperty("l",a.name)),function(){h.if_("inputs"===h.stage||"s",function(){e&&1!==e&&h.if_(h.isNull(h.nonComputedMember("s",a.name)),h.lazyAssign(h.nonComputedMember("s",a.name),"{}"));h.assign(b,h.nonComputedMember("s",a.name))})},b&&h.lazyAssign(b,h.nonComputedMember("l",
a.name)));c(b);break;case q.MemberExpression:g=d&&(d.context=this.nextId())||this.nextId();b=b||this.nextId();h.recurse(a.object,g,void 0,function(){h.if_(h.notNull(g),function(){a.computed?(k=h.nextId(),h.recurse(a.property,k),h.getStringValue(k),e&&1!==e&&h.if_(h.not(h.computedMember(g,k)),h.lazyAssign(h.computedMember(g,k),"{}")),m=h.computedMember(g,k),h.assign(b,m),d&&(d.computed=!0,d.name=k)):(e&&1!==e&&h.if_(h.isNull(h.nonComputedMember(g,a.property.name)),h.lazyAssign(h.nonComputedMember(g,
a.property.name),"{}")),m=h.nonComputedMember(g,a.property.name),h.assign(b,m),d&&(d.computed=!1,d.name=a.property.name))},function(){h.assign(b,"undefined")});c(b)},!!e);break;case q.CallExpression:b=b||this.nextId();a.filter?(k=h.filter(a.callee.name),l=[],r(a.arguments,function(a){var b=h.nextId();h.recurse(a,b);l.push(b)}),m=k+"("+l.join(",")+")",h.assign(b,m),c(b)):(k=h.nextId(),g={},l=[],h.recurse(a.callee,k,g,function(){h.if_(h.notNull(k),function(){r(a.arguments,function(b){h.recurse(b,a.constant?
void 0:h.nextId(),void 0,function(a){l.push(a)})});m=g.name?h.member(g.context,g.name,g.computed)+"("+l.join(",")+")":k+"("+l.join(",")+")";h.assign(b,m)},function(){h.assign(b,"undefined")});c(b)}));break;case q.AssignmentExpression:k=this.nextId();g={};this.recurse(a.left,void 0,g,function(){h.if_(h.notNull(g.context),function(){h.recurse(a.right,k);m=h.member(g.context,g.name,g.computed)+a.operator+k;h.assign(b,m);c(b||m)})},1);break;case q.ArrayExpression:l=[];r(a.elements,function(b){h.recurse(b,
a.constant?void 0:h.nextId(),void 0,function(a){l.push(a)})});m="["+l.join(",")+"]";this.assign(b,m);c(b||m);break;case q.ObjectExpression:l=[];p=!1;r(a.properties,function(a){a.computed&&(p=!0)});p?(b=b||this.nextId(),this.assign(b,"{}"),r(a.properties,function(a){a.computed?(g=h.nextId(),h.recurse(a.key,g)):g=a.key.type===q.Identifier?a.key.name:""+a.key.value;k=h.nextId();h.recurse(a.value,k);h.assign(h.member(b,g,a.computed),k)})):(r(a.properties,function(b){h.recurse(b.value,a.constant?void 0:
h.nextId(),void 0,function(a){l.push(h.escape(b.key.type===q.Identifier?b.key.name:""+b.key.value)+":"+a)})}),m="{"+l.join(",")+"}",this.assign(b,m));c(b||m);break;case q.ThisExpression:this.assign(b,"s");c(b||"s");break;case q.LocalsExpression:this.assign(b,"l");c(b||"l");break;case q.NGValueParameter:this.assign(b,"v"),c(b||"v")}},getHasOwnProperty:function(a,b){var d=a+"."+b,c=this.current().own;c.hasOwnProperty(d)||(c[d]=this.nextId(!1,a+"&&("+this.escape(b)+" in "+a+")"));return c[d]},assign:function(a,
b){if(a)return this.current().body.push(a,"=",b,";"),a},filter:function(a){this.state.filters.hasOwnProperty(a)||(this.state.filters[a]=this.nextId(!0));return this.state.filters[a]},ifDefined:function(a,b){return"ifDefined("+a+","+this.escape(b)+")"},plus:function(a,b){return"plus("+a+","+b+")"},return_:function(a){this.current().body.push("return ",a,";")},if_:function(a,b,d){if(!0===a)b();else{var c=this.current().body;c.push("if(",a,"){");b();c.push("}");d&&(c.push("else{"),d(),c.push("}"))}},
not:function(a){return"!("+a+")"},isNull:function(a){return a+"==null"},notNull:function(a){return a+"!=null"},nonComputedMember:function(a,b){var d=/[^$_a-zA-Z0-9]/g;return/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(b)?a+"."+b:a+'["'+b.replace(d,this.stringEscapeFn)+'"]'},computedMember:function(a,b){return a+"["+b+"]"},member:function(a,b,d){return d?this.computedMember(a,b):this.nonComputedMember(a,b)},getStringValue:function(a){this.assign(a,"getStringValue("+a+")")},lazyRecurse:function(a,b,d,c,e,f){var g=
this;return function(){g.recurse(a,b,d,c,e,f)}},lazyAssign:function(a,b){var d=this;return function(){d.assign(a,b)}},stringEscapeRegex:/[^ a-zA-Z0-9]/g,stringEscapeFn:function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)},escape:function(a){if(A(a))return"'"+a.replace(this.stringEscapeRegex,this.stringEscapeFn)+"'";if(W(a))return a.toString();if(!0===a)return"true";if(!1===a)return"false";if(null===a)return"null";if("undefined"===typeof a)return"undefined";throw Ya("esc");},nextId:function(a,
b){var d="v"+this.state.nextId++;a||this.current().vars.push(d+(b?"="+b:""));return d},current:function(){return this.state[this.state.computing]}};Kd.prototype={compile:function(a){var b=this;Z(a,b.$filter);var d,c;if(d=Id(a))c=this.recurse(d);d=Gd(a.body);var e;d&&(e=[],r(d,function(a,c){var d=b.recurse(a);d.isPure=a.isPure;a.input=d;e.push(d);a.watchId=c}));var f=[];r(a.body,function(a){f.push(b.recurse(a.expression))});a=0===a.body.length?E:1===a.body.length?f[0]:function(a,b){var c;r(f,function(d){c=
d(a,b)});return c};c&&(a.assign=function(a,b,d){return c(a,d,b)});e&&(a.inputs=e);return a},recurse:function(a,b,d){var c,e,f=this,g;if(a.input)return this.inputs(a.input,a.watchId);switch(a.type){case q.Literal:return this.value(a.value,b);case q.UnaryExpression:return e=this.recurse(a.argument),this["unary"+a.operator](e,b);case q.BinaryExpression:return c=this.recurse(a.left),e=this.recurse(a.right),this["binary"+a.operator](c,e,b);case q.LogicalExpression:return c=this.recurse(a.left),e=this.recurse(a.right),
this["binary"+a.operator](c,e,b);case q.ConditionalExpression:return this["ternary?:"](this.recurse(a.test),this.recurse(a.alternate),this.recurse(a.consequent),b);case q.Identifier:return f.identifier(a.name,b,d);case q.MemberExpression:return c=this.recurse(a.object,!1,!!d),a.computed||(e=a.property.name),a.computed&&(e=this.recurse(a.property)),a.computed?this.computedMember(c,e,b,d):this.nonComputedMember(c,e,b,d);case q.CallExpression:return g=[],r(a.arguments,function(a){g.push(f.recurse(a))}),
a.filter&&(e=this.$filter(a.callee.name)),a.filter||(e=this.recurse(a.callee,!0)),a.filter?function(a,c,d,f){for(var p=[],n=0;n<g.length;++n)p.push(g[n](a,c,d,f));a=e.apply(void 0,p,f);return b?{context:void 0,name:void 0,value:a}:a}:function(a,c,d,f){var p=e(a,c,d,f),n;if(null!=p.value){n=[];for(var s=0;s<g.length;++s)n.push(g[s](a,c,d,f));n=p.value.apply(p.context,n)}return b?{value:n}:n};case q.AssignmentExpression:return c=this.recurse(a.left,!0,1),e=this.recurse(a.right),function(a,d,f,g){var p=
c(a,d,f,g);a=e(a,d,f,g);p.context[p.name]=a;return b?{value:a}:a};case q.ArrayExpression:return g=[],r(a.elements,function(a){g.push(f.recurse(a))}),function(a,c,d,e){for(var f=[],n=0;n<g.length;++n)f.push(g[n](a,c,d,e));return b?{value:f}:f};case q.ObjectExpression:return g=[],r(a.properties,function(a){a.computed?g.push({key:f.recurse(a.key),computed:!0,value:f.recurse(a.value)}):g.push({key:a.key.type===q.Identifier?a.key.name:""+a.key.value,computed:!1,value:f.recurse(a.value)})}),function(a,
c,d,e){for(var f={},n=0;n<g.length;++n)g[n].computed?f[g[n].key(a,c,d,e)]=g[n].value(a,c,d,e):f[g[n].key]=g[n].value(a,c,d,e);return b?{value:f}:f};case q.ThisExpression:return function(a){return b?{value:a}:a};case q.LocalsExpression:return function(a,c){return b?{value:c}:c};case q.NGValueParameter:return function(a,c,d){return b?{value:d}:d}}},"unary+":function(a,b){return function(d,c,e,f){d=a(d,c,e,f);d=w(d)?+d:0;return b?{value:d}:d}},"unary-":function(a,b){return function(d,c,e,f){d=a(d,c,
e,f);d=w(d)?-d:-0;return b?{value:d}:d}},"unary!":function(a,b){return function(d,c,e,f){d=!a(d,c,e,f);return b?{value:d}:d}},"binary+":function(a,b,d){return function(c,e,f,g){var k=a(c,e,f,g);c=b(c,e,f,g);k=Ed(k,c);return d?{value:k}:k}},"binary-":function(a,b,d){return function(c,e,f,g){var k=a(c,e,f,g);c=b(c,e,f,g);k=(w(k)?k:0)-(w(c)?c:0);return d?{value:k}:k}},"binary*":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)*b(c,e,f,g);return d?{value:c}:c}},"binary/":function(a,b,d){return function(c,
e,f,g){c=a(c,e,f,g)/b(c,e,f,g);return d?{value:c}:c}},"binary%":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)%b(c,e,f,g);return d?{value:c}:c}},"binary===":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)===b(c,e,f,g);return d?{value:c}:c}},"binary!==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)!==b(c,e,f,g);return d?{value:c}:c}},"binary==":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)==b(c,e,f,g);return d?{value:c}:c}},"binary!=":function(a,b,d){return function(c,
e,f,g){c=a(c,e,f,g)!=b(c,e,f,g);return d?{value:c}:c}},"binary<":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<b(c,e,f,g);return d?{value:c}:c}},"binary>":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>b(c,e,f,g);return d?{value:c}:c}},"binary<=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)<=b(c,e,f,g);return d?{value:c}:c}},"binary>=":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)>=b(c,e,f,g);return d?{value:c}:c}},"binary&&":function(a,b,d){return function(c,e,f,g){c=
a(c,e,f,g)&&b(c,e,f,g);return d?{value:c}:c}},"binary||":function(a,b,d){return function(c,e,f,g){c=a(c,e,f,g)||b(c,e,f,g);return d?{value:c}:c}},"ternary?:":function(a,b,d,c){return function(e,f,g,k){e=a(e,f,g,k)?b(e,f,g,k):d(e,f,g,k);return c?{value:e}:e}},value:function(a,b){return function(){return b?{context:void 0,name:void 0,value:a}:a}},identifier:function(a,b,d){return function(c,e,f,g){c=e&&a in e?e:c;d&&1!==d&&c&&null==c[a]&&(c[a]={});e=c?c[a]:void 0;return b?{context:c,name:a,value:e}:
e}},computedMember:function(a,b,d,c){return function(e,f,g,k){var h=a(e,f,g,k),l,m;null!=h&&(l=b(e,f,g,k),l+="",c&&1!==c&&h&&!h[l]&&(h[l]={}),m=h[l]);return d?{context:h,name:l,value:m}:m}},nonComputedMember:function(a,b,d,c){return function(e,f,g,k){e=a(e,f,g,k);c&&1!==c&&e&&null==e[b]&&(e[b]={});f=null!=e?e[b]:void 0;return d?{context:e,name:b,value:f}:f}},inputs:function(a,b){return function(d,c,e,f){return f?f[b]:a(d,c,e)}}};Mb.prototype={constructor:Mb,parse:function(a){a=this.getAst(a);var b=
this.astCompiler.compile(a.ast),d=a.ast;b.literal=0===d.body.length||1===d.body.length&&(d.body[0].expression.type===q.Literal||d.body[0].expression.type===q.ArrayExpression||d.body[0].expression.type===q.ObjectExpression);b.constant=a.ast.constant;b.oneTime=a.oneTime;return b},getAst:function(a){var b=!1;a=a.trim();":"===a.charAt(0)&&":"===a.charAt(1)&&(b=!0,a=a.substring(2));return{ast:this.ast.ast(a),oneTime:b}}};var Ea=F("$sce"),V={HTML:"html",CSS:"css",MEDIA_URL:"mediaUrl",URL:"url",RESOURCE_URL:"resourceUrl",
JS:"js"},Cc=/_([a-z])/g,Ug=F("$templateRequest"),Vg=F("$timeout"),aa=C.document.createElement("a"),Od=ga(C.location.href),Na;aa.href="http://[::1]";var Wg="[::1]"===aa.hostname;Pd.$inject=["$document"];dd.$inject=["$provide"];var Wd=22,Vd=".",Ec="0";Qd.$inject=["$locale"];Sd.$inject=["$locale"];var gh={yyyy:ea("FullYear",4,0,!1,!0),yy:ea("FullYear",2,0,!0,!0),y:ea("FullYear",1,0,!1,!0),MMMM:kb("Month"),MMM:kb("Month",!0),MM:ea("Month",2,1),M:ea("Month",1,1),LLLL:kb("Month",!1,!0),dd:ea("Date",2),
d:ea("Date",1),HH:ea("Hours",2),H:ea("Hours",1),hh:ea("Hours",2,-12),h:ea("Hours",1,-12),mm:ea("Minutes",2),m:ea("Minutes",1),ss:ea("Seconds",2),s:ea("Seconds",1),sss:ea("Milliseconds",3),EEEE:kb("Day"),EEE:kb("Day",!0),a:function(a,b){return 12>a.getHours()?b.AMPMS[0]:b.AMPMS[1]},Z:function(a,b,d){a=-1*d;return a=(0<=a?"+":"")+(Ob(Math[0<a?"floor":"ceil"](a/60),2)+Ob(Math.abs(a%60),2))},ww:Yd(2),w:Yd(1),G:Fc,GG:Fc,GGG:Fc,GGGG:function(a,b){return 0>=a.getFullYear()?b.ERANAMES[0]:b.ERANAMES[1]}},
fh=/((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))([\s\S]*)/,eh=/^-?\d+$/;Rd.$inject=["$locale"];var $g=ia(K),ah=ia(ub);Td.$inject=["$parse"];var Me=ia({restrict:"E",compile:function(a,b){if(!b.href&&!b.xlinkHref)return function(a,b){if("a"===b[0].nodeName.toLowerCase()){var e="[object SVGAnimatedString]"===la.call(b.prop("href"))?"xlink:href":"href";b.on("click",function(a){b.attr(e)||a.preventDefault()})}}}}),vb={};r(Gb,function(a,b){function d(a,d,e){a.$watch(e[c],
function(a){e.$set(b,!!a)})}if("multiple"!==a){var c=wa("ng-"+b),e=d;"checked"===a&&(e=function(a,b,e){e.ngModel!==e[c]&&d(a,b,e)});vb[c]=function(){return{restrict:"A",priority:100,link:e}}}});r(td,function(a,b){vb[b]=function(){return{priority:100,link:function(a,c,e){if("ngPattern"===b&&"/"===e.ngPattern.charAt(0)&&(c=e.ngPattern.match(ie))){e.$set("ngPattern",new RegExp(c[1],c[2]));return}a.$watch(e[b],function(a){e.$set(b,a)})}}}});r(["src","srcset","href"],function(a){var b=wa("ng-"+a);vb[b]=
["$sce",function(d){return{priority:99,link:function(c,e,f){var g=a,k=a;"href"===a&&"[object SVGAnimatedString]"===la.call(e.prop("href"))&&(k="xlinkHref",f.$attr[k]="xlink:href",g=null);f.$set(b,d.getTrustedMediaUrl(f[b]));f.$observe(b,function(b){b?(f.$set(k,b),Ca&&g&&e.prop(g,f[k])):"href"===a&&f.$set(k,null)})}}}]});var lb={$addControl:E,$getControls:ia([]),$$renameControl:function(a,b){a.$name=b},$removeControl:E,$setValidity:E,$setDirty:E,$setPristine:E,$setSubmitted:E,$$setSubmitted:E};Pb.$inject=
["$element","$attrs","$scope","$animate","$interpolate"];Pb.prototype={$rollbackViewValue:function(){r(this.$$controls,function(a){a.$rollbackViewValue()})},$commitViewValue:function(){r(this.$$controls,function(a){a.$commitViewValue()})},$addControl:function(a){Ja(a.$name,"input");this.$$controls.push(a);a.$name&&(this[a.$name]=a);a.$$parentForm=this},$getControls:function(){return ja(this.$$controls)},$$renameControl:function(a,b){var d=a.$name;this[d]===a&&delete this[d];this[b]=a;a.$name=b},$removeControl:function(a){a.$name&&
this[a.$name]===a&&delete this[a.$name];r(this.$pending,function(b,d){this.$setValidity(d,null,a)},this);r(this.$error,function(b,d){this.$setValidity(d,null,a)},this);r(this.$$success,function(b,d){this.$setValidity(d,null,a)},this);cb(this.$$controls,a);a.$$parentForm=lb},$setDirty:function(){this.$$animate.removeClass(this.$$element,Za);this.$$animate.addClass(this.$$element,Vb);this.$dirty=!0;this.$pristine=!1;this.$$parentForm.$setDirty()},$setPristine:function(){this.$$animate.setClass(this.$$element,
Za,Vb+" ng-submitted");this.$dirty=!1;this.$pristine=!0;this.$submitted=!1;r(this.$$controls,function(a){a.$setPristine()})},$setUntouched:function(){r(this.$$controls,function(a){a.$setUntouched()})},$setSubmitted:function(){for(var a=this;a.$$parentForm&&a.$$parentForm!==lb;)a=a.$$parentForm;a.$$setSubmitted()},$$setSubmitted:function(){this.$$animate.addClass(this.$$element,"ng-submitted");this.$submitted=!0;r(this.$$controls,function(a){a.$$setSubmitted&&a.$$setSubmitted()})}};ae({clazz:Pb,set:function(a,
b,d){var c=a[b];c?-1===c.indexOf(d)&&c.push(d):a[b]=[d]},unset:function(a,b,d){var c=a[b];c&&(cb(c,d),0===c.length&&delete a[b])}});var ke=function(a){return["$timeout","$parse",function(b,d){function c(a){return""===a?d('this[""]').assign:d(a).assign||E}return{name:"form",restrict:a?"EAC":"E",require:["form","^^?form"],controller:Pb,compile:function(d,f){d.addClass(Za).addClass(mb);var g=f.name?"name":a&&f.ngForm?"ngForm":!1;return{pre:function(a,d,e,f){var p=f[0];if(!("action"in e)){var n=function(b){a.$apply(function(){p.$commitViewValue();
p.$setSubmitted()});b.preventDefault()};d[0].addEventListener("submit",n);d.on("$destroy",function(){b(function(){d[0].removeEventListener("submit",n)},0,!1)})}(f[1]||p.$$parentForm).$addControl(p);var s=g?c(p.$name):E;g&&(s(a,p),e.$observe(g,function(b){p.$name!==b&&(s(a,void 0),p.$$parentForm.$$renameControl(p,b),s=c(p.$name),s(a,p))}));d.on("$destroy",function(){p.$$parentForm.$removeControl(p);s(a,void 0);S(p,lb)})}}}}}]},Ne=ke(),Ze=ke(!0),hh=/^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,
sh=/^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,th=/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,ih=/^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/,le=/^(\d{4,})-(\d{2})-(\d{2})$/,me=/^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Mc=/^(\d{4,})-W(\d\d)$/,ne=/^(\d{4,})-(\d\d)$/,
oe=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,ce=T();r(["date","datetime-local","month","time","week"],function(a){ce[a]=!0});var pe={text:function(a,b,d,c,e,f){Sa(a,b,d,c,e,f);Hc(c)},date:nb("date",le,Qb(le,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":nb("datetimelocal",me,Qb(me,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:nb("time",oe,Qb(oe,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:nb("week",Mc,function(a,b){if(ha(a))return a;if(A(a)){Mc.lastIndex=0;var d=Mc.exec(a);
if(d){var c=+d[1],e=+d[2],f=d=0,g=0,k=0,h=Xd(c),e=7*(e-1);b&&(d=b.getHours(),f=b.getMinutes(),g=b.getSeconds(),k=b.getMilliseconds());return new Date(c,0,h.getDate()+e,d,f,g,k)}}return NaN},"yyyy-Www"),month:nb("month",ne,Qb(ne,["yyyy","MM"]),"yyyy-MM"),number:function(a,b,d,c,e,f,g,k){Ic(a,b,d,c,"number");de(c);Sa(a,b,d,c,e,f);var h;if(w(d.min)||d.ngMin){var l=d.min||k(d.ngMin)(a);h=na(l);c.$validators.min=function(a,b){return c.$isEmpty(b)||z(h)||b>=h};d.$observe("min",function(a){a!==l&&(h=na(a),
l=a,c.$validate())})}if(w(d.max)||d.ngMax){var m=d.max||k(d.ngMax)(a),p=na(m);c.$validators.max=function(a,b){return c.$isEmpty(b)||z(p)||b<=p};d.$observe("max",function(a){a!==m&&(p=na(a),m=a,c.$validate())})}if(w(d.step)||d.ngStep){var n=d.step||k(d.ngStep)(a),s=na(n);c.$validators.step=function(a,b){return c.$isEmpty(b)||z(s)||ee(b,h||0,s)};d.$observe("step",function(a){a!==n&&(s=na(a),n=a,c.$validate())})}},url:function(a,b,d,c,e,f){Sa(a,b,d,c,e,f);Hc(c);c.$validators.url=function(a,b){var d=
a||b;return c.$isEmpty(d)||sh.test(d)}},email:function(a,b,d,c,e,f){Sa(a,b,d,c,e,f);Hc(c);c.$validators.email=function(a,b){var d=a||b;return c.$isEmpty(d)||th.test(d)}},radio:function(a,b,d,c){var e=!d.ngTrim||"false"!==U(d.ngTrim);z(d.name)&&b.attr("name",++pb);b.on("change",function(a){var g;b[0].checked&&(g=d.value,e&&(g=U(g)),c.$setViewValue(g,a&&a.type))});c.$render=function(){var a=d.value;e&&(a=U(a));b[0].checked=a===c.$viewValue};d.$observe("value",c.$render)},range:function(a,b,d,c,e,f){function g(a,
c){b.attr(a,d[a]);var e=d[a];d.$observe(a,function(a){a!==e&&(e=a,c(a))})}function k(a){p=na(a);X(c.$modelValue)||(m?(a=b.val(),p>a&&(a=p,b.val(a)),c.$setViewValue(a)):c.$validate())}function h(a){n=na(a);X(c.$modelValue)||(m?(a=b.val(),n<a&&(b.val(n),a=n<p?p:n),c.$setViewValue(a)):c.$validate())}function l(a){s=na(a);X(c.$modelValue)||(m?c.$viewValue!==b.val()&&c.$setViewValue(b.val()):c.$validate())}Ic(a,b,d,c,"range");de(c);Sa(a,b,d,c,e,f);var m=c.$$hasNativeValidators&&"range"===b[0].type,p=m?
0:void 0,n=m?100:void 0,s=m?1:void 0,r=b[0].validity;a=w(d.min);e=w(d.max);f=w(d.step);var q=c.$render;c.$render=m&&w(r.rangeUnderflow)&&w(r.rangeOverflow)?function(){q();c.$setViewValue(b.val())}:q;a&&(p=na(d.min),c.$validators.min=m?function(){return!0}:function(a,b){return c.$isEmpty(b)||z(p)||b>=p},g("min",k));e&&(n=na(d.max),c.$validators.max=m?function(){return!0}:function(a,b){return c.$isEmpty(b)||z(n)||b<=n},g("max",h));f&&(s=na(d.step),c.$validators.step=m?function(){return!r.stepMismatch}:
function(a,b){return c.$isEmpty(b)||z(s)||ee(b,p||0,s)},g("step",l))},checkbox:function(a,b,d,c,e,f,g,k){var h=fe(k,a,"ngTrueValue",d.ngTrueValue,!0),l=fe(k,a,"ngFalseValue",d.ngFalseValue,!1);b.on("change",function(a){c.$setViewValue(b[0].checked,a&&a.type)});c.$render=function(){b[0].checked=c.$viewValue};c.$isEmpty=function(a){return!1===a};c.$formatters.push(function(a){return va(a,h)});c.$parsers.push(function(a){return a?h:l})},hidden:E,button:E,submit:E,reset:E,file:E},Yc=["$browser","$sniffer",
"$filter","$parse",function(a,b,d,c){return{restrict:"E",require:["?ngModel"],link:{pre:function(e,f,g,k){k[0]&&(pe[K(g.type)]||pe.text)(e,f,g,k[0],b,a,d,c)}}}}],vf=function(){var a={configurable:!0,enumerable:!1,get:function(){return this.getAttribute("value")||""},set:function(a){this.setAttribute("value",a)}};return{restrict:"E",priority:200,compile:function(b,d){if("hidden"===K(d.type))return{pre:function(b,d,f,g){b=d[0];b.parentNode&&b.parentNode.insertBefore(b,b.nextSibling);Object.defineProperty&&
Object.defineProperty(b,"value",a)}}}}},uh=/^(true|false|\d+)$/,sf=function(){function a(a,d,c){var e=w(c)?c:9===Ca?"":null;a.prop("value",e);d.$set("value",c)}return{restrict:"A",priority:100,compile:function(b,d){return uh.test(d.ngValue)?function(b,d,f){b=b.$eval(f.ngValue);a(d,f,b)}:function(b,d,f){b.$watch(f.ngValue,function(b){a(d,f,b)})}}}},Re=["$compile",function(a){return{restrict:"AC",compile:function(b){a.$$addBindingClass(b);return function(b,c,e){a.$$addBindingInfo(c,e.ngBind);c=c[0];
b.$watch(e.ngBind,function(a){c.textContent=ic(a)})}}}}],Te=["$interpolate","$compile",function(a,b){return{compile:function(d){b.$$addBindingClass(d);return function(c,d,f){c=a(d.attr(f.$attr.ngBindTemplate));b.$$addBindingInfo(d,c.expressions);d=d[0];f.$observe("ngBindTemplate",function(a){d.textContent=z(a)?"":a})}}}}],Se=["$sce","$parse","$compile",function(a,b,d){return{restrict:"A",compile:function(c,e){var f=b(e.ngBindHtml),g=b(e.ngBindHtml,function(b){return a.valueOf(b)});d.$$addBindingClass(c);
return function(b,c,e){d.$$addBindingInfo(c,e.ngBindHtml);b.$watch(g,function(){var d=f(b);c.html(a.getTrustedHtml(d)||"")})}}}}],rf=ia({restrict:"A",require:"ngModel",link:function(a,b,d,c){c.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),Ue=Kc("",!0),We=Kc("Odd",0),Ve=Kc("Even",1),Xe=Ra({compile:function(a,b){b.$set("ngCloak",void 0);a.removeClass("ng-cloak")}}),Ye=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],cd={},vh={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
function(a){var b=wa("ng-"+a);cd[b]=["$parse","$rootScope","$exceptionHandler",function(d,c,e){return qd(d,c,e,b,a,vh[a])}]});var af=["$animate","$compile",function(a,b){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(d,c,e,f,g){var k,h,l;d.$watch(e.ngIf,function(d){d?h||g(function(d,f){h=f;d[d.length++]=b.$$createComment("end ngIf",e.ngIf);k={clone:d};a.enter(d,c.parent(),c)}):(l&&(l.remove(),l=null),h&&(h.$destroy(),h=null),k&&(l=tb(k.clone),
a.leave(l).done(function(a){!1!==a&&(l=null)}),k=null))})}}}],bf=["$templateRequest","$anchorScroll","$animate",function(a,b,d){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:ca.noop,compile:function(c,e){var f=e.ngInclude||e.src,g=e.onload||"",k=e.autoscroll;return function(c,e,m,p,n){var r=0,q,t,x,v=function(){t&&(t.remove(),t=null);q&&(q.$destroy(),q=null);x&&(d.leave(x).done(function(a){!1!==a&&(t=null)}),t=x,x=null)};c.$watch(f,function(f){var m=function(a){!1===
a||!w(k)||k&&!c.$eval(k)||b()},t=++r;f?(a(f,!0).then(function(a){if(!c.$$destroyed&&t===r){var b=c.$new();p.template=a;a=n(b,function(a){v();d.enter(a,null,e).done(m)});q=b;x=a;q.$emit("$includeContentLoaded",f);c.$eval(g)}},function(){c.$$destroyed||t!==r||(v(),c.$emit("$includeContentError",f))}),c.$emit("$includeContentRequested",f)):(v(),p.template=null)})}}}}],uf=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(b,d,c,e){la.call(d[0]).match(/SVG/)?
(d.empty(),a(ed(e.template,C.document).childNodes)(b,function(a){d.append(a)},{futureParentElement:d})):(d.html(e.template),a(d.contents())(b))}}}],cf=Ra({priority:450,compile:function(){return{pre:function(a,b,d){a.$eval(d.ngInit)}}}}),qf=function(){return{restrict:"A",priority:100,require:"ngModel",link:function(a,b,d,c){var e=d.ngList||", ",f="false"!==d.ngTrim,g=f?U(e):e;c.$parsers.push(function(a){if(!z(a)){var b=[];a&&r(a.split(g),function(a){a&&b.push(f?U(a):a)});return b}});c.$formatters.push(function(a){if(H(a))return a.join(e)});
c.$isEmpty=function(a){return!a||!a.length}}}},mb="ng-valid",$d="ng-invalid",Za="ng-pristine",Vb="ng-dirty",ob=F("ngModel");Rb.$inject="$scope $exceptionHandler $attrs $element $parse $animate $timeout $q $interpolate".split(" ");Rb.prototype={$$initGetterSetters:function(){if(this.$options.getOption("getterSetter")){var a=this.$$parse(this.$$attr.ngModel+"()"),b=this.$$parse(this.$$attr.ngModel+"($$$p)");this.$$ngModelGet=function(b){var c=this.$$parsedNgModel(b);B(c)&&(c=a(b));return c};this.$$ngModelSet=
function(a,c){B(this.$$parsedNgModel(a))?b(a,{$$$p:c}):this.$$parsedNgModelAssign(a,c)}}else if(!this.$$parsedNgModel.assign)throw ob("nonassign",this.$$attr.ngModel,za(this.$$element));},$render:E,$isEmpty:function(a){return z(a)||""===a||null===a||a!==a},$$updateEmptyClasses:function(a){this.$isEmpty(a)?(this.$$animate.removeClass(this.$$element,"ng-not-empty"),this.$$animate.addClass(this.$$element,"ng-empty")):(this.$$animate.removeClass(this.$$element,"ng-empty"),this.$$animate.addClass(this.$$element,
"ng-not-empty"))},$setPristine:function(){this.$dirty=!1;this.$pristine=!0;this.$$animate.removeClass(this.$$element,Vb);this.$$animate.addClass(this.$$element,Za)},$setDirty:function(){this.$dirty=!0;this.$pristine=!1;this.$$animate.removeClass(this.$$element,Za);this.$$animate.addClass(this.$$element,Vb);this.$$parentForm.$setDirty()},$setUntouched:function(){this.$touched=!1;this.$untouched=!0;this.$$animate.setClass(this.$$element,"ng-untouched","ng-touched")},$setTouched:function(){this.$touched=
!0;this.$untouched=!1;this.$$animate.setClass(this.$$element,"ng-touched","ng-untouched")},$rollbackViewValue:function(){this.$$timeout.cancel(this.$$pendingDebounce);this.$viewValue=this.$$lastCommittedViewValue;this.$render()},$validate:function(){if(!X(this.$modelValue)){var a=this.$$lastCommittedViewValue,b=this.$$rawModelValue,d=this.$valid,c=this.$modelValue,e=this.$options.getOption("allowInvalid"),f=this;this.$$runValidators(b,a,function(a){e||d===a||(f.$modelValue=a?b:void 0,f.$modelValue!==
c&&f.$$writeModelToScope())})}},$$runValidators:function(a,b,d){function c(){var c=!0;r(h.$validators,function(d,e){var g=Boolean(d(a,b));c=c&&g;f(e,g)});return c?!0:(r(h.$asyncValidators,function(a,b){f(b,null)}),!1)}function e(){var c=[],d=!0;r(h.$asyncValidators,function(e,g){var h=e(a,b);if(!h||!B(h.then))throw ob("nopromise",h);f(g,void 0);c.push(h.then(function(){f(g,!0)},function(){d=!1;f(g,!1)}))});c.length?h.$$q.all(c).then(function(){g(d)},E):g(!0)}function f(a,b){k===h.$$currentValidationRunId&&
h.$setValidity(a,b)}function g(a){k===h.$$currentValidationRunId&&d(a)}this.$$currentValidationRunId++;var k=this.$$currentValidationRunId,h=this;(function(){var a=h.$$parserName;if(z(h.$$parserValid))f(a,null);else return h.$$parserValid||(r(h.$validators,function(a,b){f(b,null)}),r(h.$asyncValidators,function(a,b){f(b,null)})),f(a,h.$$parserValid),h.$$parserValid;return!0})()?c()?e():g(!1):g(!1)},$commitViewValue:function(){var a=this.$viewValue;this.$$timeout.cancel(this.$$pendingDebounce);if(this.$$lastCommittedViewValue!==
a||""===a&&this.$$hasNativeValidators)this.$$updateEmptyClasses(a),this.$$lastCommittedViewValue=a,this.$pristine&&this.$setDirty(),this.$$parseAndValidate()},$$parseAndValidate:function(){var a=this.$$lastCommittedViewValue,b=this;this.$$parserValid=z(a)?void 0:!0;this.$setValidity(this.$$parserName,null);this.$$parserName="parse";if(this.$$parserValid)for(var d=0;d<this.$parsers.length;d++)if(a=this.$parsers[d](a),z(a)){this.$$parserValid=!1;break}X(this.$modelValue)&&(this.$modelValue=this.$$ngModelGet(this.$$scope));
var c=this.$modelValue,e=this.$options.getOption("allowInvalid");this.$$rawModelValue=a;e&&(this.$modelValue=a,b.$modelValue!==c&&b.$$writeModelToScope());this.$$runValidators(a,this.$$lastCommittedViewValue,function(d){e||(b.$modelValue=d?a:void 0,b.$modelValue!==c&&b.$$writeModelToScope())})},$$writeModelToScope:function(){this.$$ngModelSet(this.$$scope,this.$modelValue);r(this.$viewChangeListeners,function(a){try{a()}catch(b){this.$$exceptionHandler(b)}},this)},$setViewValue:function(a,b){this.$viewValue=
a;this.$options.getOption("updateOnDefault")&&this.$$debounceViewValueCommit(b)},$$debounceViewValueCommit:function(a){var b=this.$options.getOption("debounce");W(b[a])?b=b[a]:W(b["default"])&&-1===this.$options.getOption("updateOn").indexOf(a)?b=b["default"]:W(b["*"])&&(b=b["*"]);this.$$timeout.cancel(this.$$pendingDebounce);var d=this;0<b?this.$$pendingDebounce=this.$$timeout(function(){d.$commitViewValue()},b):this.$$rootScope.$$phase?this.$commitViewValue():this.$$scope.$apply(function(){d.$commitViewValue()})},
$overrideModelOptions:function(a){this.$options=this.$options.createChild(a);this.$$setUpdateOnEvents()},$processModelValue:function(){var a=this.$$format();this.$viewValue!==a&&(this.$$updateEmptyClasses(a),this.$viewValue=this.$$lastCommittedViewValue=a,this.$render(),this.$$runValidators(this.$modelValue,this.$viewValue,E))},$$format:function(){for(var a=this.$formatters,b=a.length,d=this.$modelValue;b--;)d=a[b](d);return d},$$setModelValue:function(a){this.$modelValue=this.$$rawModelValue=a;this.$$parserValid=
void 0;this.$processModelValue()},$$setUpdateOnEvents:function(){this.$$updateEvents&&this.$$element.off(this.$$updateEvents,this.$$updateEventHandler);if(this.$$updateEvents=this.$options.getOption("updateOn"))this.$$element.on(this.$$updateEvents,this.$$updateEventHandler)},$$updateEventHandler:function(a){this.$$debounceViewValueCommit(a&&a.type)}};ae({clazz:Rb,set:function(a,b){a[b]=!0},unset:function(a,b){delete a[b]}});var pf=["$rootScope",function(a){return{restrict:"A",require:["ngModel",
"^?form","^?ngModelOptions"],controller:Rb,priority:1,compile:function(b){b.addClass(Za).addClass("ng-untouched").addClass(mb);return{pre:function(a,b,e,f){var g=f[0];b=f[1]||g.$$parentForm;if(f=f[2])g.$options=f.$options;g.$$initGetterSetters();b.$addControl(g);e.$observe("name",function(a){g.$name!==a&&g.$$parentForm.$$renameControl(g,a)});a.$on("$destroy",function(){g.$$parentForm.$removeControl(g)})},post:function(b,c,e,f){function g(){k.$setTouched()}var k=f[0];k.$$setUpdateOnEvents();c.on("blur",
function(){k.$touched||(a.$$phase?b.$evalAsync(g):b.$apply(g))})}}}}}],Sb,wh=/(\s+|^)default(\s+|$)/;Lc.prototype={getOption:function(a){return this.$$options[a]},createChild:function(a){var b=!1;a=S({},a);r(a,function(d,c){"$inherit"===d?"*"===c?b=!0:(a[c]=this.$$options[c],"updateOn"===c&&(a.updateOnDefault=this.$$options.updateOnDefault)):"updateOn"===c&&(a.updateOnDefault=!1,a[c]=U(d.replace(wh,function(){a.updateOnDefault=!0;return" "})))},this);b&&(delete a["*"],ge(a,this.$$options));ge(a,Sb.$$options);
return new Lc(a)}};Sb=new Lc({updateOn:"",updateOnDefault:!0,debounce:0,getterSetter:!1,allowInvalid:!1,timezone:null});var tf=function(){function a(a,d){this.$$attrs=a;this.$$scope=d}a.$inject=["$attrs","$scope"];a.prototype={$onInit:function(){var a=this.parentCtrl?this.parentCtrl.$options:Sb,d=this.$$scope.$eval(this.$$attrs.ngModelOptions);this.$options=a.createChild(d)}};return{restrict:"A",priority:10,require:{parentCtrl:"?^^ngModelOptions"},bindToController:!0,controller:a}},df=Ra({terminal:!0,
priority:1E3}),xh=F("ngOptions"),yh=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,nf=["$compile","$document","$parse",function(a,b,d){function c(a,b,c){function e(a,b,c,d,f){this.selectValue=a;this.viewValue=b;this.label=c;this.group=d;this.disabled=f}function f(a){var b;if(!r&&ya(a))b=a;else{b=[];for(var c in a)a.hasOwnProperty(c)&&
"$"!==c.charAt(0)&&b.push(c)}return b}var p=a.match(yh);if(!p)throw xh("iexp",a,za(b));var n=p[5]||p[7],r=p[6];a=/ as /.test(p[0])&&p[1];var q=p[9];b=d(p[2]?p[1]:n);var t=a&&d(a)||b,w=q&&d(q),v=q?function(a,b){return w(c,b)}:function(a){return La(a)},x=function(a,b){return v(a,A(a,b))},z=d(p[2]||p[1]),y=d(p[3]||""),J=d(p[4]||""),I=d(p[8]),B={},A=r?function(a,b){B[r]=b;B[n]=a;return B}:function(a){B[n]=a;return B};return{trackBy:q,getTrackByValue:x,getWatchables:d(I,function(a){var b=[];a=a||[];for(var d=
f(a),e=d.length,g=0;g<e;g++){var k=a===d?g:d[g],l=a[k],k=A(l,k),l=v(l,k);b.push(l);if(p[2]||p[1])l=z(c,k),b.push(l);p[4]&&(k=J(c,k),b.push(k))}return b}),getOptions:function(){for(var a=[],b={},d=I(c)||[],g=f(d),k=g.length,n=0;n<k;n++){var p=d===g?n:g[n],r=A(d[p],p),s=t(c,r),p=v(s,r),w=z(c,r),B=y(c,r),r=J(c,r),s=new e(p,s,w,B,r);a.push(s);b[p]=s}return{items:a,selectValueMap:b,getOptionFromViewValue:function(a){return b[x(a)]},getViewValueFromOption:function(a){return q?Ia(a.viewValue):a.viewValue}}}}}
var e=C.document.createElement("option"),f=C.document.createElement("optgroup");return{restrict:"A",terminal:!0,require:["select","ngModel"],link:{pre:function(a,b,c,d){d[0].registerOption=E},post:function(d,k,h,l){function m(a){var b=(a=v.getOptionFromViewValue(a))&&a.element;b&&!b.selected&&(b.selected=!0);return a}function p(a,b){a.element=b;b.disabled=a.disabled;a.label!==b.label&&(b.label=a.label,b.textContent=a.label);b.value=a.selectValue}var n=l[0],q=l[1],z=h.multiple;l=0;for(var t=k.children(),
B=t.length;l<B;l++)if(""===t[l].value){n.hasEmptyOption=!0;n.emptyOption=t.eq(l);break}k.empty();l=!!n.emptyOption;x(e.cloneNode(!1)).val("?");var v,A=c(h.ngOptions,k,d),C=b[0].createDocumentFragment();n.generateUnknownOptionValue=function(a){return"?"};z?(n.writeValue=function(a){if(v){var b=a&&a.map(m)||[];v.items.forEach(function(a){a.element.selected&&-1===Array.prototype.indexOf.call(b,a)&&(a.element.selected=!1)})}},n.readValue=function(){var a=k.val()||[],b=[];r(a,function(a){(a=v.selectValueMap[a])&&
!a.disabled&&b.push(v.getViewValueFromOption(a))});return b},A.trackBy&&d.$watchCollection(function(){if(H(q.$viewValue))return q.$viewValue.map(function(a){return A.getTrackByValue(a)})},function(){q.$render()})):(n.writeValue=function(a){if(v){var b=k[0].options[k[0].selectedIndex],c=v.getOptionFromViewValue(a);b&&b.removeAttribute("selected");c?(k[0].value!==c.selectValue&&(n.removeUnknownOption(),k[0].value=c.selectValue,c.element.selected=!0),c.element.setAttribute("selected","selected")):n.selectUnknownOrEmptyOption(a)}},
n.readValue=function(){var a=v.selectValueMap[k.val()];return a&&!a.disabled?(n.unselectEmptyOption(),n.removeUnknownOption(),v.getViewValueFromOption(a)):null},A.trackBy&&d.$watch(function(){return A.getTrackByValue(q.$viewValue)},function(){q.$render()}));l&&(a(n.emptyOption)(d),k.prepend(n.emptyOption),8===n.emptyOption[0].nodeType?(n.hasEmptyOption=!1,n.registerOption=function(a,b){""===b.val()&&(n.hasEmptyOption=!0,n.emptyOption=b,n.emptyOption.removeClass("ng-scope"),q.$render(),b.on("$destroy",
function(){var a=n.$isEmptyOptionSelected();n.hasEmptyOption=!1;n.emptyOption=void 0;a&&q.$render()}))}):n.emptyOption.removeClass("ng-scope"));d.$watchCollection(A.getWatchables,function(){var a=v&&n.readValue();if(v)for(var b=v.items.length-1;0<=b;b--){var c=v.items[b];w(c.group)?Fb(c.element.parentNode):Fb(c.element)}v=A.getOptions();var d={};v.items.forEach(function(a){var b;if(w(a.group)){b=d[a.group];b||(b=f.cloneNode(!1),C.appendChild(b),b.label=null===a.group?"null":a.group,d[a.group]=b);
var c=e.cloneNode(!1);b.appendChild(c);p(a,c)}else b=e.cloneNode(!1),C.appendChild(b),p(a,b)});k[0].appendChild(C);q.$render();q.$isEmpty(a)||(b=n.readValue(),(A.trackBy||z?va(a,b):a===b)||(q.$setViewValue(b),q.$render()))})}}}}],ef=["$locale","$interpolate","$log",function(a,b,d){var c=/{}/g,e=/^when(Minus)?(.+)$/;return{link:function(f,g,k){function h(a){g.text(a||"")}var l=k.count,m=k.$attr.when&&g.attr(k.$attr.when),p=k.offset||0,n=f.$eval(m)||{},q={},w=b.startSymbol(),t=b.endSymbol(),x=w+l+"-"+
p+t,v=ca.noop,A;r(k,function(a,b){var c=e.exec(b);c&&(c=(c[1]?"-":"")+K(c[2]),n[c]=g.attr(k.$attr[b]))});r(n,function(a,d){q[d]=b(a.replace(c,x))});f.$watch(l,function(b){var c=parseFloat(b),e=X(c);e||c in n||(c=a.pluralCat(c-p));c===A||e&&X(A)||(v(),e=q[c],z(e)?(null!=b&&d.debug("ngPluralize: no rule defined for '"+c+"' in "+m),v=E,h()):v=f.$watch(e,h),A=c)})}}}],qe=F("ngRef"),ff=["$parse",function(a){return{priority:-1,restrict:"A",compile:function(b,d){var c=wa(ua(b)),e=a(d.ngRef),f=e.assign||
function(){throw qe("nonassign",d.ngRef);};return function(a,b,h){var l;if(h.hasOwnProperty("ngRefRead"))if("$element"===h.ngRefRead)l=b;else{if(l=b.data("$"+h.ngRefRead+"Controller"),!l)throw qe("noctrl",h.ngRefRead,d.ngRef);}else l=b.data("$"+c+"Controller");l=l||b;f(a,l);b.on("$destroy",function(){e(a)===l&&f(a,null)})}}}}],gf=["$parse","$animate","$compile",function(a,b,d){var c=F("ngRepeat"),e=function(a,b,c,d,e,f,g){a[c]=d;e&&(a[e]=f);a.$index=b;a.$first=0===b;a.$last=b===g-1;a.$middle=!(a.$first||
a.$last);a.$odd=!(a.$even=0===(b&1))},f=function(a,b,c){return La(c)},g=function(a,b){return b};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(k,h){var l=h.ngRepeat,m=d.$$createComment("end ngRepeat",l),p=l.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!p)throw c("iexp",l);var n=p[1],q=p[2],w=p[3],t=p[4],p=n.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/);if(!p)throw c("iidexp",
n);var x=p[3]||p[1],v=p[2];if(w&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(w)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(w)))throw c("badident",w);var z;if(t){var A={$id:La},y=a(t);z=function(a,b,c,d){v&&(A[v]=b);A[x]=c;A.$index=d;return y(a,A)}}return function(a,d,h,k,n){var p=T();a.$watchCollection(q,function(h){var k,q,t=d[0],s,y=T(),B,C,E,D,H,F,K;w&&(a[w]=h);if(ya(h))H=h,q=z||f;else for(K in q=z||g,H=[],h)ta.call(h,K)&&"$"!==K.charAt(0)&&H.push(K);
B=H.length;K=Array(B);for(k=0;k<B;k++)if(C=h===H?k:H[k],E=h[C],D=q(a,C,E,k),p[D])F=p[D],delete p[D],y[D]=F,K[k]=F;else{if(y[D])throw r(K,function(a){a&&a.scope&&(p[a.id]=a)}),c("dupes",l,D,E);K[k]={id:D,scope:void 0,clone:void 0};y[D]=!0}A&&(A[x]=void 0);for(s in p){F=p[s];D=tb(F.clone);b.leave(D);if(D[0].parentNode)for(k=0,q=D.length;k<q;k++)D[k].$$NG_REMOVED=!0;F.scope.$destroy()}for(k=0;k<B;k++)if(C=h===H?k:H[k],E=h[C],F=K[k],F.scope){s=t;do s=s.nextSibling;while(s&&s.$$NG_REMOVED);F.clone[0]!==
s&&b.move(tb(F.clone),null,t);t=F.clone[F.clone.length-1];e(F.scope,k,x,E,v,C,B)}else n(function(a,c){F.scope=c;var d=m.cloneNode(!1);a[a.length++]=d;b.enter(a,null,t);t=d;F.clone=a;y[F.id]=F;e(F.scope,k,x,E,v,C,B)});p=y})}}}}],hf=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,d,c){b.$watch(c.ngShow,function(b){a[b?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],$e=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(b,
d,c){b.$watch(c.ngHide,function(b){a[b?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],jf=Ra(function(a,b,d){a.$watchCollection(d.ngStyle,function(a,d){d&&a!==d&&(a||(a={}),r(d,function(b,d){null==a[d]&&(a[d]="")}));a&&b.css(a)})}),kf=["$animate","$compile",function(a,b){return{require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(d,c,e,f){var g=[],k=[],h=[],l=[],m=function(a,b){return function(c){!1!==c&&a.splice(b,1)}};d.$watch(e.ngSwitch||
e.on,function(c){for(var d,e;h.length;)a.cancel(h.pop());d=0;for(e=l.length;d<e;++d){var q=tb(k[d].clone);l[d].$destroy();(h[d]=a.leave(q)).done(m(h,d))}k.length=0;l.length=0;(g=f.cases["!"+c]||f.cases["?"])&&r(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=b.$$createComment("end ngSwitchWhen");k.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],lf=Ra({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){a=d.ngSwitchWhen.split(d.ngSwitchWhenSeparator).sort().filter(function(a,
b,c){return c[b-1]!==a});r(a,function(a){c.cases["!"+a]=c.cases["!"+a]||[];c.cases["!"+a].push({transclude:e,element:b})})}}),mf=Ra({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,b,d,c,e){c.cases["?"]=c.cases["?"]||[];c.cases["?"].push({transclude:e,element:b})}}),zh=F("ngTransclude"),of=["$compile",function(a){return{restrict:"EAC",compile:function(b){var d=a(b.contents());b.empty();return function(a,b,f,g,k){function h(){d(a,function(a){b.append(a)})}if(!k)throw zh("orphan",
za(b));f.ngTransclude===f.$attr.ngTransclude&&(f.ngTransclude="");f=f.ngTransclude||f.ngTranscludeSlot;k(function(a,c){var d;if(d=a.length)a:{d=0;for(var f=a.length;d<f;d++){var g=a[d];if(g.nodeType!==Pa||g.nodeValue.trim()){d=!0;break a}}d=void 0}d?b.append(a):(h(),c.$destroy())},null,f);f&&!k.isSlotFilled(f)&&h()}}}}],Oe=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(b,d){"text/ng-template"===d.type&&a.put(d.id,b[0].text)}}}],Ah={$setViewValue:E,$render:E},Bh=["$element",
"$scope",function(a,b){function d(){g||(g=!0,b.$$postDigest(function(){g=!1;e.ngModelCtrl.$render()}))}function c(a){k||(k=!0,b.$$postDigest(function(){b.$$destroyed||(k=!1,e.ngModelCtrl.$setViewValue(e.readValue()),a&&e.ngModelCtrl.$render())}))}var e=this,f=new Hb;e.selectValueMap={};e.ngModelCtrl=Ah;e.multiple=!1;e.unknownOption=x(C.document.createElement("option"));e.hasEmptyOption=!1;e.emptyOption=void 0;e.renderUnknownOption=function(b){b=e.generateUnknownOptionValue(b);e.unknownOption.val(b);
a.prepend(e.unknownOption);Oa(e.unknownOption,!0);a.val(b)};e.updateUnknownOption=function(b){b=e.generateUnknownOptionValue(b);e.unknownOption.val(b);Oa(e.unknownOption,!0);a.val(b)};e.generateUnknownOptionValue=function(a){return"? "+La(a)+" ?"};e.removeUnknownOption=function(){e.unknownOption.parent()&&e.unknownOption.remove()};e.selectEmptyOption=function(){e.emptyOption&&(a.val(""),Oa(e.emptyOption,!0))};e.unselectEmptyOption=function(){e.hasEmptyOption&&Oa(e.emptyOption,!1)};b.$on("$destroy",
function(){e.renderUnknownOption=E});e.readValue=function(){var b=a.val(),b=b in e.selectValueMap?e.selectValueMap[b]:b;return e.hasOption(b)?b:null};e.writeValue=function(b){var c=a[0].options[a[0].selectedIndex];c&&Oa(x(c),!1);e.hasOption(b)?(e.removeUnknownOption(),c=La(b),a.val(c in e.selectValueMap?c:b),Oa(x(a[0].options[a[0].selectedIndex]),!0)):e.selectUnknownOrEmptyOption(b)};e.addOption=function(a,b){if(8!==b[0].nodeType){Ja(a,'"option value"');""===a&&(e.hasEmptyOption=!0,e.emptyOption=
b);var c=f.get(a)||0;f.set(a,c+1);d()}};e.removeOption=function(a){var b=f.get(a);b&&(1===b?(f.delete(a),""===a&&(e.hasEmptyOption=!1,e.emptyOption=void 0)):f.set(a,b-1))};e.hasOption=function(a){return!!f.get(a)};e.$hasEmptyOption=function(){return e.hasEmptyOption};e.$isUnknownOptionSelected=function(){return a[0].options[0]===e.unknownOption[0]};e.$isEmptyOptionSelected=function(){return e.hasEmptyOption&&a[0].options[a[0].selectedIndex]===e.emptyOption[0]};e.selectUnknownOrEmptyOption=function(a){null==
a&&e.emptyOption?(e.removeUnknownOption(),e.selectEmptyOption()):e.unknownOption.parent().length?e.updateUnknownOption(a):e.renderUnknownOption(a)};var g=!1,k=!1;e.registerOption=function(a,b,f,g,k){if(f.$attr.ngValue){var q,r;f.$observe("value",function(a){var d,f=b.prop("selected");w(r)&&(e.removeOption(q),delete e.selectValueMap[r],d=!0);r=La(a);q=a;e.selectValueMap[r]=a;e.addOption(a,b);b.attr("value",r);d&&f&&c()})}else g?f.$observe("value",function(a){e.readValue();var d,f=b.prop("selected");
w(q)&&(e.removeOption(q),d=!0);q=a;e.addOption(a,b);d&&f&&c()}):k?a.$watch(k,function(a,d){f.$set("value",a);var g=b.prop("selected");d!==a&&e.removeOption(d);e.addOption(a,b);d&&g&&c()}):e.addOption(f.value,b);f.$observe("disabled",function(a){if("true"===a||a&&b.prop("selected"))e.multiple?c(!0):(e.ngModelCtrl.$setViewValue(null),e.ngModelCtrl.$render())});b.on("$destroy",function(){var a=e.readValue(),b=f.value;e.removeOption(b);d();(e.multiple&&a&&-1!==a.indexOf(b)||a===b)&&c(!0)})}}],Pe=function(){return{restrict:"E",
require:["select","?ngModel"],controller:Bh,priority:1,link:{pre:function(a,b,d,c){var e=c[0],f=c[1];if(f){if(e.ngModelCtrl=f,b.on("change",function(){e.removeUnknownOption();a.$apply(function(){f.$setViewValue(e.readValue())})}),d.multiple){e.multiple=!0;e.readValue=function(){var a=[];r(b.find("option"),function(b){b.selected&&!b.disabled&&(b=b.value,a.push(b in e.selectValueMap?e.selectValueMap[b]:b))});return a};e.writeValue=function(a){r(b.find("option"),function(b){var c=!!a&&(-1!==Array.prototype.indexOf.call(a,
b.value)||-1!==Array.prototype.indexOf.call(a,e.selectValueMap[b.value]));c!==b.selected&&Oa(x(b),c)})};var g,k=NaN;a.$watch(function(){k!==f.$viewValue||va(g,f.$viewValue)||(g=ja(f.$viewValue),f.$render());k=f.$viewValue});f.$isEmpty=function(a){return!a||0===a.length}}}else e.registerOption=E},post:function(a,b,d,c){var e=c[1];if(e){var f=c[0];e.$render=function(){f.writeValue(e.$viewValue)}}}}}},Qe=["$interpolate",function(a){return{restrict:"E",priority:100,compile:function(b,d){var c,e;w(d.ngValue)||
(w(d.value)?c=a(d.value,!0):(e=a(b.text(),!0))||d.$set("value",b.text()));return function(a,b,d){var h=b.parent();(h=h.data("$selectController")||h.parent().data("$selectController"))&&h.registerOption(a,b,d,c,e)}}}}],$c=["$parse",function(a){return{restrict:"A",require:"?ngModel",link:function(b,d,c,e){if(e){var f=c.hasOwnProperty("required")||a(c.ngRequired)(b);c.ngRequired||(c.required=!0);e.$validators.required=function(a,b){return!f||!e.$isEmpty(b)};c.$observe("required",function(a){f!==a&&(f=
a,e.$validate())})}}}}],Zc=["$parse",function(a){return{restrict:"A",require:"?ngModel",compile:function(b,d){var c,e;d.ngPattern&&(c=d.ngPattern,e="/"===d.ngPattern.charAt(0)&&ie.test(d.ngPattern)?function(){return d.ngPattern}:a(d.ngPattern));return function(a,b,d,h){if(h){var l=d.pattern;d.ngPattern?l=e(a):c=d.pattern;var m=he(l,c,b);d.$observe("pattern",function(a){var d=m;m=he(a,c,b);(d&&d.toString())!==(m&&m.toString())&&h.$validate()});h.$validators.pattern=function(a,b){return h.$isEmpty(b)||
z(m)||m.test(b)}}}}}}],bd=["$parse",function(a){return{restrict:"A",require:"?ngModel",link:function(b,d,c,e){if(e){var f=c.maxlength||a(c.ngMaxlength)(b),g=Tb(f);c.$observe("maxlength",function(a){f!==a&&(g=Tb(a),f=a,e.$validate())});e.$validators.maxlength=function(a,b){return 0>g||e.$isEmpty(b)||b.length<=g}}}}}],ad=["$parse",function(a){return{restrict:"A",require:"?ngModel",link:function(b,d,c,e){if(e){var f=c.minlength||a(c.ngMinlength)(b),g=Tb(f)||-1;c.$observe("minlength",function(a){f!==
a&&(g=Tb(a)||-1,f=a,e.$validate())});e.$validators.minlength=function(a,b){return e.$isEmpty(b)||b.length>=g}}}}}];C.angular.bootstrap?C.console&&console.log("WARNING: Tried to load AngularJS more than once."):(Fe(),Je(ca),ca.module("ngLocale",[],["$provide",function(a){function b(a){a+="";var b=a.indexOf(".");return-1==b?0:a.length-b-1}a.value("$locale",{DATETIME_FORMATS:{AMPMS:["AM","PM"],DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ERANAMES:["Before Christ","Anno Domini"],
ERAS:["BC","AD"],FIRSTDAYOFWEEK:6,MONTH:"January February March April May June July August September October November December".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),STANDALONEMONTH:"January February March April May June July August September October November December".split(" "),WEEKENDRANGE:[5,6],fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",medium:"MMM d, y h:mm:ss a",mediumDate:"MMM d, y",mediumTime:"h:mm:ss a",
"short":"M/d/yy h:mm a",shortDate:"M/d/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-\u00a4",negSuf:"",posPre:"\u00a4",posSuf:""}]},id:"en-us",localeID:"en_US",pluralCat:function(a,c){var e=a|0,f=c;void 0===f&&(f=Math.min(b(a),3));Math.pow(10,f);return 1==e&&0==f?"one":"other"}})}]),x(function(){Ae(C.document,
Uc)}))})(window);!window.angular.$$csp().noInlineStyle&&window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>');
//# sourceMappingURL=angular.min.js.map

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["printJS"] = factory();
	else
		root["printJS"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! ./sass/index.scss */ "./src/sass/index.scss");

var _init = __webpack_require__(/*! ./js/init */ "./src/js/init.js");

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var printJS = _init2.default.init;

if (typeof window !== 'undefined') {
  window.printJS = printJS;
}

exports.default = printJS;

/***/ }),

/***/ "./src/js/browser.js":
/*!***************************!*\
  !*** ./src/js/browser.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Browser = {
  // Firefox 1.0+
  isFirefox: function isFirefox() {
    return typeof InstallTrigger !== 'undefined';
  },
  // Internet Explorer 6-11
  isIE: function isIE() {
    return navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode;
  },
  // Edge 20+
  isEdge: function isEdge() {
    return !Browser.isIE() && !!window.StyleMedia;
  },
  // Chrome 1+
  isChrome: function isChrome() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

    return !!context.chrome;
  },
  // At least Safari 3+: "[object HTMLElementConstructor]"
  isSafari: function isSafari() {
    return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || navigator.userAgent.toLowerCase().indexOf('safari') !== -1;
  }
};

exports.default = Browser;

/***/ }),

/***/ "./src/js/functions.js":
/*!*****************************!*\
  !*** ./src/js/functions.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.addWrapper = addWrapper;
exports.capitalizePrint = capitalizePrint;
exports.collectStyles = collectStyles;
exports.addHeader = addHeader;
exports.cleanUp = cleanUp;
exports.isRawHTML = isRawHTML;

var _modal = __webpack_require__(/*! ./modal */ "./src/js/modal.js");

var _modal2 = _interopRequireDefault(_modal);

var _browser = __webpack_require__(/*! ./browser */ "./src/js/browser.js");

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addWrapper(htmlData, params) {
  var bodyStyle = 'font-family:' + params.font + ' !important; font-size: ' + params.font_size + ' !important; width:100%;';
  return '<div style="' + bodyStyle + '">' + htmlData + '</div>';
}

function capitalizePrint(obj) {
  return obj.charAt(0).toUpperCase() + obj.slice(1);
}

function collectStyles(element, params) {
  var win = document.defaultView || window;

  // String variable to hold styling for each element
  var elementStyle = '';

  // Loop over computed styles
  var styles = win.getComputedStyle(element, '');

  Object.keys(styles).map(function (key) {
    // Check if style should be processed
    if (params.targetStyles.indexOf('*') !== -1 || params.targetStyle.indexOf(styles[key]) !== -1 || targetStylesMatch(params.targetStyles, styles[key])) {
      if (styles.getPropertyValue(styles[key])) elementStyle += styles[key] + ':' + styles.getPropertyValue(styles[key]) + ';';
    }
  });

  // Print friendly defaults (deprecated)
  elementStyle += 'max-width: ' + params.maxWidth + 'px !important;' + params.font_size + ' !important;';

  return elementStyle;
}

function targetStylesMatch(styles, value) {
  for (var i = 0; i < styles.length; i++) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.indexOf(styles[i]) !== -1) return true;
  }
  return false;
}

function addHeader(printElement, params) {
  // Create the header container div
  var headerContainer = document.createElement('div');

  // Check if the header is text or raw html
  if (isRawHTML(params.header)) {
    headerContainer.innerHTML = params.header;
  } else {
    // Create header element
    var headerElement = document.createElement('h1');

    // Create header text node
    var headerNode = document.createTextNode(params.header);

    // Build and style
    headerElement.appendChild(headerNode);
    headerElement.setAttribute('style', params.headerStyle);
    headerContainer.appendChild(headerElement);
  }

  printElement.insertBefore(headerContainer, printElement.childNodes[0]);
}

function cleanUp(params) {
  // If we are showing a feedback message to user, remove it
  if (params.showModal) _modal2.default.close();

  // Check for a finished loading hook function
  if (params.onLoadingEnd) params.onLoadingEnd();

  // If preloading pdf files, clean blob url
  if (params.showModal || params.onLoadingStart) window.URL.revokeObjectURL(params.printable);

  // If a onPrintDialogClose callback is given, execute it
  if (params.onPrintDialogClose) {
    var event = 'mouseover';

    if (_browser2.default.isChrome() || _browser2.default.isFirefox()) {
      // Ps.: Firefox will require an extra click in the document to fire the focus event.
      event = 'focus';
    }
    var handler = function handler() {
      // Make sure the event only happens once.
      window.removeEventListener(event, handler);

      params.onPrintDialogClose();
    };

    window.addEventListener(event, handler);
  }
}

function isRawHTML(raw) {
  var regexHtml = new RegExp('<([A-Za-z][A-Za-z0-9]*)\\b[^>]*>(.*?)</\\1>');
  return regexHtml.test(raw);
}

/***/ }),

/***/ "./src/js/html.js":
/*!************************!*\
  !*** ./src/js/html.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _functions = __webpack_require__(/*! ./functions */ "./src/js/functions.js");

var _print = __webpack_require__(/*! ./print */ "./src/js/print.js");

var _print2 = _interopRequireDefault(_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  print: function print(params, printFrame) {
    // Get the DOM printable element
    var printElement = document.getElementById(params.printable);

    // Check if the element exists
    if (!printElement) {
      window.console.error('Invalid HTML element id: ' + params.printable);
      return;
    }

    // Clone the target element including its children (if available)
    params.printableElement = cloneElement(printElement, params);

    // Add header
    if (params.header) {
      (0, _functions.addHeader)(params.printableElement, params);
    }

    // Print html element contents
    _print2.default.send(params, printFrame);
  }
};


function cloneElement(element, params) {
  // Clone the main node (if not already inside the recursion process)
  var clone = element.cloneNode();

  // Loop over and process the children elements / nodes (including text nodes)
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = element.childNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;

      // Check if we are skiping the current element
      if (params.ignoreElements.indexOf(child.id) !== -1) {
        continue;
      }

      // Clone the child element
      var clonedChild = cloneElement(child, params);

      // Attach the cloned child to the cloned parent node
      clone.appendChild(clonedChild);
    }

    // Get all styling for print element (for nodes of type element only)
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (params.scanStyles && element.nodeType === 1) {
    clone.setAttribute('style', (0, _functions.collectStyles)(element, params));
  }

  // Check if the element needs any state processing (copy user input data)
  switch (element.tagName) {
    case 'SELECT':
      // Copy the current selection value to its clone
      clone.value = element.value;
      break;
    case 'CANVAS':
      // Copy the canvas content to its clone
      clone.getContext('2d').drawImage(element, 0, 0);
      break;
  }

  return clone;
}

/***/ }),

/***/ "./src/js/image.js":
/*!*************************!*\
  !*** ./src/js/image.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _functions = __webpack_require__(/*! ./functions */ "./src/js/functions.js");

var _print = __webpack_require__(/*! ./print */ "./src/js/print.js");

var _print2 = _interopRequireDefault(_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  print: function print(params, printFrame) {
    // Check if we are printing one image or multiple images
    if (params.printable.constructor !== Array) {
      // Create array with one image
      params.printable = [params.printable];
    }

    // Create printable element (container)
    params.printableElement = document.createElement('div');

    // Create all image elements and append them to the printable container
    params.printable.forEach(function (src) {
      // Create the image element
      var img = document.createElement('img');
      img.setAttribute('style', params.imageStyle);

      // Set image src with the file url
      img.src = src;

      // Create the image wrapper
      var imageWrapper = document.createElement('div');

      // Append image to the wrapper element
      imageWrapper.appendChild(img);

      // Append wrapper to the printable element
      params.printableElement.appendChild(imageWrapper);
    });

    // Check if we are adding a print header
    if (params.header) (0, _functions.addHeader)(params.printableElement, params);

    // Print image
    _print2.default.send(params, printFrame);
  }
};

/***/ }),

/***/ "./src/js/init.js":
/*!************************!*\
  !*** ./src/js/init.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _browser = __webpack_require__(/*! ./browser */ "./src/js/browser.js");

var _browser2 = _interopRequireDefault(_browser);

var _modal = __webpack_require__(/*! ./modal */ "./src/js/modal.js");

var _modal2 = _interopRequireDefault(_modal);

var _pdf = __webpack_require__(/*! ./pdf */ "./src/js/pdf.js");

var _pdf2 = _interopRequireDefault(_pdf);

var _html = __webpack_require__(/*! ./html */ "./src/js/html.js");

var _html2 = _interopRequireDefault(_html);

var _rawHtml = __webpack_require__(/*! ./raw-html */ "./src/js/raw-html.js");

var _rawHtml2 = _interopRequireDefault(_rawHtml);

var _image = __webpack_require__(/*! ./image */ "./src/js/image.js");

var _image2 = _interopRequireDefault(_image);

var _json = __webpack_require__(/*! ./json */ "./src/js/json.js");

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var printTypes = ['pdf', 'html', 'image', 'json', 'raw-html'];

exports.default = {
  init: function init() {
    var params = {
      printable: null,
      fallbackPrintable: null,
      type: 'pdf',
      header: null,
      headerStyle: 'font-weight: 300;',
      maxWidth: 800,
      font: 'TimesNewRoman',
      font_size: '12pt',
      honorMarginPadding: true,
      honorColor: false,
      properties: null,
      gridHeaderStyle: 'font-weight: bold; padding: 5px; border: 1px solid #dddddd;',
      gridStyle: 'border: 1px solid lightgray; margin-bottom: -1px;',
      showModal: false,
      onError: function onError(error) {
        throw error;
      },
      onLoadingStart: null,
      onLoadingEnd: null,
      onPrintDialogClose: null,
      onPdfOpen: null,
      onBrowserIncompatible: function onBrowserIncompatible() {
        return true;
      },
      modalMessage: 'Retrieving Document...',
      frameId: 'printJS',
      printableElement: null,
      documentTitle: 'Document',
      targetStyle: ['clear', 'display', 'width', 'min-width', 'height', 'min-height', 'max-height'],
      targetStyles: ['border', 'box', 'break', 'text-decoration'],
      ignoreElements: [],
      imageStyle: 'max-width: 100%;',
      repeatTableHeader: true,
      css: null,
      style: null,
      scanStyles: true,
      base64: false

      // Check if a printable document or object was supplied
    };var args = arguments[0];
    if (args === undefined) throw new Error('printJS expects at least 1 attribute.');

    // Process parameters
    switch (typeof args === 'undefined' ? 'undefined' : _typeof(args)) {
      case 'string':
        params.printable = encodeURI(args);
        params.fallbackPrintable = params.printable;
        params.type = arguments[1] || params.type;
        break;
      case 'object':
        params.printable = args.printable;
        params.base64 = typeof args.base64 !== 'undefined';
        params.fallbackPrintable = typeof args.fallbackPrintable !== 'undefined' ? args.fallbackPrintable : params.printable;
        params.fallbackPrintable = params.base64 ? 'data:application/pdf;base64,' + params.fallbackPrintable : params.fallbackPrintable;
        for (var k in params) {
          if (k === 'printable' || k === 'fallbackPrintable' || k === 'base64') continue;

          params[k] = typeof args[k] !== 'undefined' ? args[k] : params[k];
        }
        break;
      default:
        throw new Error('Unexpected argument type! Expected "string" or "object", got ' + (typeof args === 'undefined' ? 'undefined' : _typeof(args)));
    }

    // Validate printable
    if (!params.printable) throw new Error('Missing printable information.');

    // Validate type
    if (!params.type || typeof params.type !== 'string' || printTypes.indexOf(params.type.toLowerCase()) === -1) {
      throw new Error('Invalid print type. Available types are: pdf, html, image and json.');
    }

    // Check if we are showing a feedback message to the user (useful for large files)
    if (params.showModal) _modal2.default.show(params);

    // Check for a print start hook function
    if (params.onLoadingStart) params.onLoadingStart();

    // To prevent duplication and issues, remove any used printFrame from the DOM
    var usedFrame = document.getElementById(params.frameId);

    if (usedFrame) usedFrame.parentNode.removeChild(usedFrame);

    // Create a new iframe or embed element (IE prints blank pdf's if we use iframe)
    var printFrame = void 0;

    // Create iframe element
    printFrame = document.createElement('iframe');

    // Hide iframe
    printFrame.setAttribute('style', 'visibility: hidden; height: 0; width: 0; position: absolute;');

    // Set iframe element id
    printFrame.setAttribute('id', params.frameId);

    // For non pdf printing, pass an html document string to srcdoc (force onload callback)
    if (params.type !== 'pdf') {
      printFrame.srcdoc = '<html><head><title>' + params.documentTitle + '</title>';

      // Attach css files
      if (params.css) {
        // Add support for single file
        if (!Array.isArray(params.css)) params.css = [params.css];

        // Create link tags for each css file
        params.css.forEach(function (file) {
          printFrame.srcdoc += '<link rel="stylesheet" href="' + file + '">';
        });
      }

      printFrame.srcdoc += '</head><body></body></html>';
    }

    // Check printable type
    switch (params.type) {
      case 'pdf':
        // Check browser support for pdf and if not supported we will just open the pdf file instead
        if (_browser2.default.isFirefox() || _browser2.default.isEdge() || _browser2.default.isIE()) {
          try {
            console.info('PrintJS currently doesn\'t support PDF printing in Firefox, Internet Explorer and Edge.');
            if (params.onBrowserIncompatible() === true) {
              var win = window.open(params.fallbackPrintable, '_blank');
              win.focus();
              if (params.onPdfOpen) params.onPdfOpen();
            }
          } catch (e) {
            params.onError(e);
          } finally {
            // Make sure there is no loading modal opened
            if (params.showModal) _modal2.default.close();
            if (params.onLoadingEnd) params.onLoadingEnd();
          }
        } else {
          _pdf2.default.print(params, printFrame);
        }
        break;
      case 'image':
        _image2.default.print(params, printFrame);
        break;
      case 'html':
        _html2.default.print(params, printFrame);
        break;
      case 'raw-html':
        _rawHtml2.default.print(params, printFrame);
        break;
      case 'json':
        _json2.default.print(params, printFrame);
        break;
    }
  }
};

/***/ }),

/***/ "./src/js/json.js":
/*!************************!*\
  !*** ./src/js/json.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _functions = __webpack_require__(/*! ./functions */ "./src/js/functions.js");

var _print = __webpack_require__(/*! ./print */ "./src/js/print.js");

var _print2 = _interopRequireDefault(_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  print: function print(params, printFrame) {
    // Check if we received proper data
    if (_typeof(params.printable) !== 'object') {
      throw new Error('Invalid javascript data object (JSON).');
    }

    // Validate repeatTableHeader
    if (typeof params.repeatTableHeader !== 'boolean') {
      throw new Error('Invalid value for repeatTableHeader attribute (JSON).');
    }

    // Validate properties
    if (!params.properties || !Array.isArray(params.properties)) {
      throw new Error('Invalid properties array for your JSON data.');
    }

    // We will format the property objects to keep the JSON api compatible with older releases
    params.properties = params.properties.map(function (property) {
      return {
        field: (typeof property === 'undefined' ? 'undefined' : _typeof(property)) === 'object' ? property.field : property,
        displayName: (typeof property === 'undefined' ? 'undefined' : _typeof(property)) === 'object' ? property.displayName : property,
        columnSize: (typeof property === 'undefined' ? 'undefined' : _typeof(property)) === 'object' && property.columnSize ? property.columnSize + ';' : 100 / params.properties.length + '%;'
      };
    });

    // Create a print container element
    params.printableElement = document.createElement('div');

    // Check if we are adding a print header
    if (params.header) {
      (0, _functions.addHeader)(params.printableElement, params);
    }

    // Build the printable html data
    params.printableElement.innerHTML += jsonToHTML(params);

    // Print the json data
    _print2.default.send(params, printFrame);
  }
};


function jsonToHTML(params) {
  // Get the row and column data
  var data = params.printable;
  var properties = params.properties;

  // Create a html table
  var htmlData = '<table style="border-collapse: collapse; width: 100%;">';

  // Check if the header should be repeated
  if (params.repeatTableHeader) {
    htmlData += '<thead>';
  }

  // Add the table header row
  htmlData += '<tr>';

  // Add the table header columns
  for (var a = 0; a < properties.length; a++) {
    htmlData += '<th style="width:' + properties[a].columnSize + ';' + params.gridHeaderStyle + '">' + (0, _functions.capitalizePrint)(properties[a].displayName) + '</th>';
  }

  // Add the closing tag for the table header row
  htmlData += '</tr>';

  // If the table header is marked as repeated, add the closing tag
  if (params.repeatTableHeader) {
    htmlData += '</thead>';
  }

  // Create the table body
  htmlData += '<tbody>';

  // Add the table data rows
  for (var i = 0; i < data.length; i++) {
    // Add the row starting tag
    htmlData += '<tr>';

    // Print selected properties only
    for (var n = 0; n < properties.length; n++) {
      var stringData = data[i];

      // Support nested objects
      var property = properties[n].field.split('.');
      if (property.length > 1) {
        for (var p = 0; p < property.length; p++) {
          stringData = stringData[property[p]];
        }
      } else {
        stringData = stringData[properties[n].field];
      }

      // Add the row contents and styles
      htmlData += '<td style="width:' + properties[n].columnSize + params.gridStyle + '">' + stringData + '</td>';
    }

    // Add the row closing tag
    htmlData += '</tr>';
  }

  // Add the table and body closing tags
  htmlData += '</tbody></table>';

  return htmlData;
}

/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Modal = {
  show: function show(params) {
    // Build modal
    var modalStyle = 'font-family:sans-serif; ' + 'display:table; ' + 'text-align:center; ' + 'font-weight:300; ' + 'font-size:30px; ' + 'left:0; top:0;' + 'position:fixed; ' + 'z-index: 9990;' + 'color: #0460B5; ' + 'width: 100%; ' + 'height: 100%; ' + 'background-color:rgba(255,255,255,.9);' + 'transition: opacity .3s ease;';

    // Create wrapper
    var printModal = document.createElement('div');
    printModal.setAttribute('style', modalStyle);
    printModal.setAttribute('id', 'printJS-Modal');

    // Create content div
    var contentDiv = document.createElement('div');
    contentDiv.setAttribute('style', 'display:table-cell; vertical-align:middle; padding-bottom:100px;');

    // Add close button (requires print.css)
    var closeButton = document.createElement('div');
    closeButton.setAttribute('class', 'printClose');
    closeButton.setAttribute('id', 'printClose');
    contentDiv.appendChild(closeButton);

    // Add spinner (requires print.css)
    var spinner = document.createElement('span');
    spinner.setAttribute('class', 'printSpinner');
    contentDiv.appendChild(spinner);

    // Add message
    var messageNode = document.createTextNode(params.modalMessage);
    contentDiv.appendChild(messageNode);

    // Add contentDiv to printModal
    printModal.appendChild(contentDiv);

    // Append print modal element to document body
    document.getElementsByTagName('body')[0].appendChild(printModal);

    // Add event listener to close button
    document.getElementById('printClose').addEventListener('click', function () {
      Modal.close();
    });
  },
  close: function close() {
    var printFrame = document.getElementById('printJS-Modal');

    printFrame.parentNode.removeChild(printFrame);
  }
};

exports.default = Modal;

/***/ }),

/***/ "./src/js/pdf.js":
/*!***********************!*\
  !*** ./src/js/pdf.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _print = __webpack_require__(/*! ./print */ "./src/js/print.js");

var _print2 = _interopRequireDefault(_print);

var _functions = __webpack_require__(/*! ./functions */ "./src/js/functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  print: function print(params, printFrame) {
    // Check if we have base64 data
    if (params.base64) {
      var bytesArray = Uint8Array.from(atob(params.printable), function (c) {
        return c.charCodeAt(0);
      });
      createBlobAndPrint(params, printFrame, bytesArray);
      return;
    }

    // Format pdf url
    params.printable = /^(blob|http)/i.test(params.printable) ? params.printable : window.location.origin + (params.printable.charAt(0) !== '/' ? '/' + params.printable : params.printable);

    // Get the file through a http request (Preload)
    var req = new window.XMLHttpRequest();
    req.responseType = 'arraybuffer';

    req.addEventListener('load', function () {
      // Check for errors
      if ([200, 201].indexOf(req.status) === -1) {
        (0, _functions.cleanUp)(params);
        params.onError(req.statusText);

        // Since we don't have a pdf document available, we will stop the print job
        return;
      }

      // Print requested document
      createBlobAndPrint(params, printFrame, req.response);
    });

    req.open('GET', params.printable, true);
    req.send();
  }
};


function createBlobAndPrint(params, printFrame, data) {
  // Pass response or base64 data to a blob and create a local object url
  var localPdf = new window.Blob([data], { type: 'application/pdf' });
  localPdf = window.URL.createObjectURL(localPdf);

  // Set iframe src with pdf document url
  printFrame.setAttribute('src', localPdf);

  _print2.default.send(params, printFrame);
}

/***/ }),

/***/ "./src/js/print.js":
/*!*************************!*\
  !*** ./src/js/print.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _browser = __webpack_require__(/*! ./browser */ "./src/js/browser.js");

var _browser2 = _interopRequireDefault(_browser);

var _functions = __webpack_require__(/*! ./functions */ "./src/js/functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Print = {
  send: function send(params, printFrame) {
    // Append iframe element to document body
    document.getElementsByTagName('body')[0].appendChild(printFrame);

    // Get iframe element
    var iframeElement = document.getElementById(params.frameId);

    // Wait for iframe to load all content
    iframeElement.onload = function () {
      if (params.type === 'pdf') {
        performPrint(iframeElement, params);
        return;
      }

      // Get iframe element document
      var printDocument = iframeElement.contentWindow || iframeElement.contentDocument;
      if (printDocument.document) printDocument = printDocument.document;

      // Append printable element to the iframe body
      printDocument.body.appendChild(params.printableElement);

      // Add custom style
      if (params.type !== 'pdf' && params.style) {
        // Create style element
        var style = document.createElement('style');
        style.innerHTML = params.style;

        // Append style element to iframe's head
        printDocument.head.appendChild(style);
      }

      // If printing images, wait for them to load inside the iframe
      var images = printDocument.getElementsByTagName('img');

      if (images.length > 0) {
        loadIframeImages(images).then(function () {
          return performPrint(iframeElement, params);
        });
      } else {
        performPrint(iframeElement, params);
      }
    };
  }
};

function performPrint(iframeElement, params) {
  try {
    iframeElement.focus();

    // If Edge or IE, try catch with execCommand
    if (_browser2.default.isEdge() || _browser2.default.isIE()) {
      try {
        iframeElement.contentWindow.document.execCommand('print', false, null);
      } catch (e) {
        iframeElement.contentWindow.print();
      }
    } else {
      // Other browsers
      iframeElement.contentWindow.print();
    }
  } catch (error) {
    params.onError(error);
  } finally {
    (0, _functions.cleanUp)(params);
  }
}

function loadIframeImages(images) {
  var promises = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var image = _step.value;

      promises.push(loadIframeImage(image));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Promise.all(promises);
}

function loadIframeImage(image) {
  return new Promise(function (resolve) {
    var pollImage = function pollImage() {
      !image || typeof image.naturalWidth === 'undefined' || image.naturalWidth === 0 || !image.complete ? setTimeout(pollImage, 500) : resolve();
    };
    pollImage();
  });
}

exports.default = Print;

/***/ }),

/***/ "./src/js/raw-html.js":
/*!****************************!*\
  !*** ./src/js/raw-html.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _print = __webpack_require__(/*! ./print */ "./src/js/print.js");

var _print2 = _interopRequireDefault(_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  print: function print(params, printFrame) {
    // Create printable element (container)
    params.printableElement = document.createElement('div');
    params.printableElement.setAttribute('style', 'width:100%');

    // Set our raw html as the printable element inner html content
    params.printableElement.innerHTML = params.printable;

    // Print html contents
    _print2.default.send(params, printFrame);
  }
};

/***/ }),

/***/ "./src/sass/index.scss":
/*!*****************************!*\
  !*** ./src/sass/index.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=print.map
//! moment.js

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

/*!
 * ui-grid - v4.8.0 - 2019-05-02
 * Copyright (c) 2019 ; License: MIT 
 */


!function(){"use strict";angular.module("ui.grid.i18n",[]),angular.module("ui.grid",["ui.grid.i18n"])}(),function(){"use strict";angular.module("ui.grid.autoResize",["ui.grid"]).directive("uiGridAutoResize",["gridUtil",function(i){return{require:"uiGrid",scope:!1,link:function(e,n,t,o){var r;r=i.debounce(function(e,t,r,i){null!==n[0].offsetParent&&(o.grid.gridWidth=r,o.grid.gridHeight=i,o.grid.queueGridRefresh().then(function(){o.grid.api.core.raise.gridDimensionChanged(t,e,i,r)}))},400),e.$watchCollection(function(){return{width:i.elementWidth(n),height:i.elementHeight(n)}},function(e,t){angular.equals(e,t)||r(t.width,t.height,e.width,e.height)})}}}])}(),function(){"use strict";var e=angular.module("ui.grid.cellNav",["ui.grid"]);e.constant("uiGridCellNavConstants",{FEATURE_NAME:"gridCellNav",CELL_NAV_EVENT:"cellNav",direction:{LEFT:0,RIGHT:1,UP:2,DOWN:3,PG_UP:4,PG_DOWN:5},EVENT_TYPE:{KEYDOWN:0,CLICK:1,CLEAR:2}}),e.factory("uiGridCellNavFactory",["gridUtil","uiGridConstants","uiGridCellNavConstants","GridRowColumn","$q",function(e,t,i,l,r){var n=function(e,t,r,i){this.rows=e.visibleRowCache,this.columns=t.visibleColumnCache,this.leftColumns=r?r.visibleColumnCache:[],this.rightColumns=i?i.visibleColumnCache:[],this.bodyContainer=e};return n.prototype.getFocusableCols=function(){return this.leftColumns.concat(this.columns,this.rightColumns).filter(function(e){return e.colDef.allowCellFocus})},n.prototype.getFocusableRows=function(){return this.rows.filter(function(e){return!1!==e.allowCellFocus})},n.prototype.getNextRowCol=function(e,t,r){switch(e){case i.direction.LEFT:return this.getRowColLeft(t,r);case i.direction.RIGHT:return this.getRowColRight(t,r);case i.direction.UP:return this.getRowColUp(t,r);case i.direction.DOWN:return this.getRowColDown(t,r);case i.direction.PG_UP:return this.getRowColPageUp(t,r);case i.direction.PG_DOWN:return this.getRowColPageDown(t,r)}},n.prototype.initializeSelection=function(){var e=this.getFocusableCols(),t=this.getFocusableRows();return 0===e.length||0===t.length?null:new l(t[0],e[0])},n.prototype.getRowColLeft=function(e,t){var r=this.getFocusableCols(),i=this.getFocusableRows(),n=r.indexOf(t),o=i.indexOf(e);-1===n&&(n=1);var a=0===n?r.length-1:n-1;return new l(n<=a?0===o?e:i[o-1]:e,r[a])},n.prototype.getRowColRight=function(e,t){var r=this.getFocusableCols(),i=this.getFocusableRows(),n=r.indexOf(t),o=i.indexOf(e);-1===n&&(n=0);var a=n===r.length-1?0:n+1;return a<=n?o===i.length-1?new l(e,r[a]):new l(i[o+1],r[a]):new l(e,r[a])},n.prototype.getRowColDown=function(e,t){var r=this.getFocusableCols(),i=this.getFocusableRows(),n=r.indexOf(t),o=i.indexOf(e);return-1===n&&(n=0),o===i.length-1?new l(e,r[n]):new l(i[o+1],r[n])},n.prototype.getRowColPageDown=function(e,t){var r=this.getFocusableCols(),i=this.getFocusableRows(),n=r.indexOf(t),o=i.indexOf(e);-1===n&&(n=0);var a=this.bodyContainer.minRowsToRender();return o>=i.length-a?new l(i[i.length-1],r[n]):new l(i[o+a],r[n])},n.prototype.getRowColUp=function(e,t){var r=this.getFocusableCols(),i=this.getFocusableRows(),n=r.indexOf(t),o=i.indexOf(e);return-1===n&&(n=0),new l(0===o?e:i[o-1],r[n])},n.prototype.getRowColPageUp=function(e,t){var r=this.getFocusableCols(),i=this.getFocusableRows(),n=r.indexOf(t),o=i.indexOf(e);-1===n&&(n=0);var a=this.bodyContainer.minRowsToRender();return new l(o-a<0?i[0]:i[o-a],r[n])},n}]),e.service("uiGridCellNavService",["gridUtil","uiGridConstants","uiGridCellNavConstants","$q","uiGridCellNavFactory","GridRowColumn","ScrollEvent",function(e,t,r,i,n,o,a){var l={initializeGrid:function(i){i.registerColumnBuilder(l.cellNavColumnBuilder),i.cellNav={},i.cellNav.lastRowCol=null,i.cellNav.focusedCells=[],l.defaultGridOptions(i.options);var e={events:{cellNav:{navigate:function(e,t){},viewPortKeyDown:function(e,t){},viewPortKeyPress:function(e,t){}}},methods:{cellNav:{scrollToFocus:function(e,t){return l.scrollToFocus(i,e,t)},getFocusedCell:function(){return i.cellNav.lastRowCol},getCurrentSelection:function(){return i.cellNav.focusedCells},rowColSelectIndex:function(e){for(var t=-1,r=0;r<i.cellNav.focusedCells.length;r++)if(i.cellNav.focusedCells[r].col.uid===e.col.uid&&i.cellNav.focusedCells[r].row.uid===e.row.uid){t=r;break}return t}}}};i.api.registerEventsFromObject(e.events),i.api.registerMethodsFromObject(e.methods)},defaultGridOptions:function(e){e.modifierKeysToMultiSelectCells=!0===e.modifierKeysToMultiSelectCells,e.keyDownOverrides=e.keyDownOverrides||[]},decorateRenderContainers:function(e){var t=e.hasRightContainer()?e.renderContainers.right:null,r=e.hasLeftContainer()?e.renderContainers.left:null;null!==r&&(e.renderContainers.left.cellNav=new n(e.renderContainers.body,r,t,e.renderContainers.body)),null!==t&&(e.renderContainers.right.cellNav=new n(e.renderContainers.body,t,e.renderContainers.body,r)),e.renderContainers.body.cellNav=new n(e.renderContainers.body,e.renderContainers.body,r,t)},getDirection:function(e){return e.keyCode===t.keymap.LEFT||e.keyCode===t.keymap.TAB&&e.shiftKey?r.direction.LEFT:e.keyCode===t.keymap.RIGHT||e.keyCode===t.keymap.TAB?r.direction.RIGHT:e.keyCode===t.keymap.UP||e.keyCode===t.keymap.ENTER&&e.shiftKey?r.direction.UP:e.keyCode===t.keymap.PG_UP?r.direction.PG_UP:e.keyCode===t.keymap.DOWN||e.keyCode===t.keymap.ENTER&&!e.ctrlKey&&!e.altKey?r.direction.DOWN:e.keyCode===t.keymap.PG_DOWN?r.direction.PG_DOWN:null},cellNavColumnBuilder:function(e,t,r){return e.allowCellFocus=void 0===e.allowCellFocus||e.allowCellFocus,i.all([])},scrollToFocus:function(t,e,r){var i=null,n=null;return null!=e&&(i=t.getRow(e)),null!=r&&(n=t.getColumn(r.name?r.name:r.field)),t.api.core.scrollToIfNecessary(i,n).then(function(){var e={row:i,col:n};null!==i&&null!==n&&t.cellNav.broadcastCellNav(e,null,null)})},getLeftWidth:function(e,t){var r=0;if(!t)return r;var i=e.renderContainers.body.visibleColumnCache.indexOf(t);e.renderContainers.body.visibleColumnCache.forEach(function(e,t){t<i&&(r+=e.drawnWidth)});var n=0===i?0:(i+1)/e.renderContainers.body.visibleColumnCache.length;return r+=t.drawnWidth*n}};return l}]),e.directive("uiGridCellnav",["gridUtil","uiGridCellNavService","uiGridCellNavConstants","uiGridConstants","GridRowColumn","$timeout","$compile","i18nService",function(e,d,u,c,g,t,a,f){return{replace:!0,priority:-150,require:"^uiGrid",scope:!1,controller:function(){},compile:function(){return{pre:function(e,t,r,l){var i=e,s=l.grid;d.initializeGrid(s),l.cellNav={},l.cellNav.makeRowCol=function(e){return e instanceof g||(e=new g(e.row,e.col)),e},l.cellNav.getActiveCell=function(){var e=t[0].getElementsByClassName("ui-grid-cell-focus");if(0<e.length)return e[0]},l.cellNav.broadcastCellNav=s.cellNav.broadcastCellNav=function(e,t,r){t=!(void 0===t||!t),e=l.cellNav.makeRowCol(e),l.cellNav.broadcastFocus(e,t,r),i.$broadcast(u.CELL_NAV_EVENT,e,t,r)},l.cellNav.clearFocus=s.cellNav.clearFocus=function(){s.cellNav.focusedCells=[],i.$broadcast(u.CELL_NAV_EVENT)},l.cellNav.broadcastFocus=function(e,t,r){t=!(void 0===t||!t);var i=(e=l.cellNav.makeRowCol(e)).row,n=e.col,o=l.grid.api.cellNav.rowColSelectIndex(e);if(null===s.cellNav.lastRowCol||-1===o||s.cellNav.lastRowCol.col===n&&s.cellNav.lastRowCol.row===i){var a=new g(i,n);(null===s.cellNav.lastRowCol||s.cellNav.lastRowCol.row!==a.row||s.cellNav.lastRowCol.col!==a.col||s.options.enableCellEditOnFocus)&&(s.api.cellNav.raise.navigate(a,s.cellNav.lastRowCol,r),s.cellNav.lastRowCol=a),l.grid.options.modifierKeysToMultiSelectCells&&t?s.cellNav.focusedCells.push(e):s.cellNav.focusedCells=[e]}else s.options.modifierKeysToMultiSelectCells&&t&&0<=o&&s.cellNav.focusedCells.splice(o,1)},l.cellNav.handleKeyDown=function(e){var t=d.getDirection(e);if(null===t)return null;var r="body";e.uiGridTargetRenderContainerId&&(r=e.uiGridTargetRenderContainerId);var i=l.grid.api.cellNav.getFocusedCell();if(i){var n=l.grid.renderContainers[r].cellNav.getNextRowCol(t,i.row,i.col),o=l.grid.renderContainers[r].cellNav.getFocusableCols(),a=l.grid.api.cellNav.rowColSelectIndex(n);return t===u.direction.LEFT&&n.col===o[o.length-1]&&n.row===i.row&&e.keyCode===c.keymap.TAB&&e.shiftKey?(s.cellNav.focusedCells.splice(a,1),l.cellNav.clearFocus(),!0):t!==u.direction.RIGHT||n.col!==o[0]||n.row!==i.row||e.keyCode!==c.keymap.TAB||e.shiftKey?(s.scrollToIfNecessary(n.row,n.col).then(function(){l.cellNav.broadcastCellNav(n,null,e)}),e.stopPropagation(),e.preventDefault(),!1):(s.cellNav.focusedCells.splice(a,1),l.cellNav.clearFocus(),!0)}}},post:function(e,t,r,i){var n,g,p=i.grid,o=!0;try{angular.module("ngAria")}catch(e){o=!1}o&&(n='<div id="'+p.id+'-aria-speakable" class="ui-grid-a11y-ariascreenreader-speakable ui-grid-offscreen" aria-live="assertive" role="alert" aria-atomic="true" aria-hidden="false" aria-relevant="additions" >&nbsp;</div>',g=a(n)(e),t.prepend(g),e.$on(u.CELL_NAV_EVENT,function(e,t,r,i){if(!i||"focus"!==i.type){for(var n,o,a=[],l=p.api.cellNav.getCurrentSelection(),s=0;s<l.length;s++){var d=("selectionRowHeaderCol"===(o=l[s]).col.field?o.row.isSelected?f.getSafeText("search.aria.selected"):f.getSafeText("search.aria.notSelected"):p.getCellDisplayValue(o.row,o.col))+(n=l[s].col,", "+f.getSafeText("headerCell.aria.column")+" "+n.displayName);a.push(d)}var u,c=a.toString();(u=c)!==g.text().trim()&&(g[0].style.clip="rect(0px,0px,0px,0px)",g[0].innerHTML="",g[0].style.visibility="hidden",g[0].style.visibility="visible",""!==u&&(g[0].style.clip="auto",g[0].appendChild(document.createTextNode(u+" ")),g[0].style.visibility="hidden",g[0].style.visibility="visible"))}}))}}}}}]),e.directive("uiGridRenderContainer",["$timeout","$document","gridUtil","uiGridConstants","uiGridCellNavService","$compile","uiGridCellNavConstants",function(c,e,g,t,p,f,m){return{replace:!0,priority:-99999,require:["^uiGrid","uiGridRenderContainer","?^uiGridCellnav"],scope:!1,compile:function(){return{post:function(e,t,r,i){var n=i[0],o=i[1],a=i[2];if(n.grid.api.cellNav){var l=o.containerId,s=n.grid;if(p.decorateRenderContainers(s),"body"===l){n.grid.options.modifierKeysToMultiSelectCells?t.attr("aria-multiselectable",!0):t.attr("aria-multiselectable",!1);var d=f('<div class="ui-grid-focuser" role="region" aria-live="assertive" aria-atomic="false" tabindex="0" aria-controls="'+s.id+"-aria-speakable "+s.id+'-grid-container" aria-owns="'+s.id+'-grid-container"></div>')(e);t.append(d),d.on("focus",function(e){e.uiGridTargetRenderContainerId=l;var t=n.grid.api.cellNav.getFocusedCell();null===t&&(t=n.grid.renderContainers[l].cellNav.getNextRowCol(m.direction.DOWN,null,null)).row&&t.col&&n.cellNav.broadcastCellNav(t)}),a.setAriaActivedescendant=function(e){t.attr("aria-activedescendant",e)},a.removeAriaActivedescendant=function(e){t.attr("aria-activedescendant")===e&&t.attr("aria-activedescendant","")},n.focus=function(){g.focus.byElement(d[0])};var u=null;d.on("keydown",function(r){r.uiGridTargetRenderContainerId=l;var e=n.grid.api.cellNav.getFocusedCell();null===(n.grid.options.keyDownOverrides.some(function(t){return Object.keys(t).every(function(e){return t[e]===r[e]})})?null:n.cellNav.handleKeyDown(r))&&(n.grid.api.cellNav.raise.viewPortKeyDown(r,e,n.cellNav.handleKeyDown),u=e)}),d.on("keypress",function(e){u&&(c(function(){n.grid.api.cellNav.raise.viewPortKeyPress(e,u)},4),u=null)}),e.$on("$destroy",function(){d.off()})}}}}}}}]),e.directive("uiGridViewport",function(){return{replace:!0,priority:-99999,require:["^uiGrid","^uiGridRenderContainer","?^uiGridCellnav"],scope:!1,compile:function(){return{pre:function(e,t,r,i){},post:function(e,t,r,i){var n=i[0],o=i[1];if(n.grid.api.cellNav&&"body"===o.containerId){var a=n.grid;a.api.core.on.scrollBegin(e,function(){var e=n.grid.api.cellNav.getFocusedCell();null!==e&&o.colContainer.containsColumn(e.col)&&n.cellNav.clearFocus()}),a.api.core.on.scrollEnd(e,function(e){var t=n.grid.api.cellNav.getFocusedCell();null!==t&&o.colContainer.containsColumn(t.col)&&n.cellNav.broadcastCellNav(t)}),a.api.cellNav.on.navigate(e,function(){n.focus()})}}}}}}),e.directive("uiGridCell",["$timeout","$document","uiGridCellNavService","gridUtil","uiGridCellNavConstants","uiGridConstants","GridRowColumn",function(e,t,r,i,c,g,p){return{priority:-150,restrict:"A",require:["^uiGrid","?^uiGridCellnav"],scope:!1,link:function(r,t,e,i){var n=i[0],o=i[1];if(n.grid.api.cellNav&&r.col.colDef.allowCellFocus){var a=n.grid;r.focused=!1,t.attr("tabindex",-1),t.find("div").on("click",function(e){n.cellNav.broadcastCellNav(new p(r.row,r.col),e.ctrlKey||e.metaKey,e),e.stopPropagation(),r.$apply()}),t.on("mousedown",s),n.grid.api.edit&&(n.grid.api.edit.on.beginCellEdit(r,function(){t.off("mousedown",s)}),n.grid.api.edit.on.afterCellEdit(r,function(){t.on("mousedown",s)}),n.grid.api.edit.on.cancelCellEdit(r,function(){t.on("mousedown",s)})),d(),t.on("focus",function(e){n.cellNav.broadcastCellNav(new p(r.row,r.col),!1,e),e.stopPropagation(),r.$apply()}),r.$on(c.CELL_NAV_EVENT,d);var l=n.grid.registerDataChangeCallback(function(e){u(),r.$applyAsync(d)},[g.dataChange.ROW]);r.$on("$destroy",function(){l(),t.find("div").off(),t.off()})}function s(e){e.preventDefault()}function d(){a.cellNav.focusedCells.some(function(e,t){return e.row===r.row&&e.col===r.col})?function(){if(!r.focused){var e=t.find("div");e.addClass("ui-grid-cell-focus"),t.attr("aria-selected",!0),o.setAriaActivedescendant(t.attr("id")),r.focused=!0}}():u()}function u(){r.focused&&(t.find("div").removeClass("ui-grid-cell-focus"),t.attr("aria-selected",!1),o.removeAriaActivedescendant(t.attr("id")),r.focused=!1)}}}}])}(),function(){"use strict";angular.module("ui.grid").constant("uiGridConstants",{LOG_DEBUG_MESSAGES:!0,LOG_WARN_MESSAGES:!0,LOG_ERROR_MESSAGES:!0,CUSTOM_FILTERS:/CUSTOM_FILTERS/g,COL_FIELD:/COL_FIELD/g,MODEL_COL_FIELD:/MODEL_COL_FIELD/g,TOOLTIP:/title=\"TOOLTIP\"/g,DISPLAY_CELL_TEMPLATE:/DISPLAY_CELL_TEMPLATE/g,TEMPLATE_REGEXP:/<.+>/,FUNC_REGEXP:/(\([^)]*\))?$/,DOT_REGEXP:/\./g,APOS_REGEXP:/'/g,BRACKET_REGEXP:/^(.*)((?:\s*\[\s*\d+\s*\]\s*)|(?:\s*\[\s*"(?:[^"\\]|\\.)*"\s*\]\s*)|(?:\s*\[\s*'(?:[^'\\]|\\.)*'\s*\]\s*))(.*)$/,COL_CLASS_PREFIX:"ui-grid-col",ENTITY_BINDING:"$$this",events:{GRID_SCROLL:"uiGridScroll",COLUMN_MENU_SHOWN:"uiGridColMenuShown",ITEM_DRAGGING:"uiGridItemDragStart",COLUMN_HEADER_CLICK:"uiGridColumnHeaderClick"},keymap:{TAB:9,STRG:17,CAPSLOCK:20,CTRL:17,CTRLRIGHT:18,CTRLR:18,SHIFT:16,RETURN:13,ENTER:13,BACKSPACE:8,BCKSP:8,ALT:18,ALTR:17,ALTRIGHT:17,SPACE:32,WIN:91,MAC:91,FN:null,PG_UP:33,PG_DOWN:34,UP:38,DOWN:40,LEFT:37,RIGHT:39,ESC:27,DEL:46,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123},ASC:"asc",DESC:"desc",filter:{STARTS_WITH:2,ENDS_WITH:4,EXACT:8,CONTAINS:16,GREATER_THAN:32,GREATER_THAN_OR_EQUAL:64,LESS_THAN:128,LESS_THAN_OR_EQUAL:256,NOT_EQUAL:512,SELECT:"select",INPUT:"input"},aggregationTypes:{sum:2,count:4,avg:8,min:16,max:32},CURRENCY_SYMBOLS:["¤","؋","Ar","Ƀ","฿","B/.","Br","Bs.","Bs.F.","GH₵","¢","c","Ch.","₡","C$","D","ден","دج",".د.ب","د.ع","JD","د.ك","ل.د","дин","د.ت","د.م.","د.إ","Db","$","₫","Esc","€","ƒ","Ft","FBu","FCFA","CFA","Fr","FRw","G","gr","₲","h","₴","₭","Kč","kr","kn","MK","ZK","Kz","K","L","Le","лв","E","lp","M","KM","MT","₥","Nfk","₦","Nu.","UM","T$","MOP$","₱","Pt.","£","ج.م.","LL","LS","P","Q","q","R","R$","ر.ع.","ر.ق","ر.س","៛","RM","p","Rf.","₹","₨","SRe","Rp","₪","Ksh","Sh.So.","USh","S/","SDR","сом","৳\t","WS$","₮","VT","₩","¥","zł"],scrollDirection:{UP:"up",DOWN:"down",LEFT:"left",RIGHT:"right",NONE:"none"},dataChange:{ALL:"all",EDIT:"edit",ROW:"row",COLUMN:"column",OPTIONS:"options"},scrollbars:{NEVER:0,ALWAYS:1,WHEN_NEEDED:2}})}(),angular.module("ui.grid").directive("uiGridCell",["$compile","$parse","gridUtil","uiGridConstants",function(a,e,l,s){return{priority:0,scope:!1,require:"?^uiGrid",compile:function(){return{pre:function(t,r,e,i){if(i&&t.col.compiledElementFn)(0,t.col.compiledElementFn)(t,function(e,t){r.append(e)});else if(i&&!t.col.compiledElementFn)t.col.getCompiledElementFn().then(function(e){e(t,function(e,t){r.append(e)})}).catch(angular.noop);else{var n=t.col.cellTemplate.replace(s.MODEL_COL_FIELD,"row.entity."+l.preEval(t.col.field)).replace(s.COL_FIELD,"grid.getCellValue(row, col)"),o=a(n)(t);r.append(o)}},post:function(i,n){var o,a=i.col.getColClass(!1);function l(e){var t=n;o&&(t.removeClass(o),o=null),o=angular.isFunction(i.col.cellClass)?i.col.cellClass(i.grid,i.row,i.col,i.rowRenderIndex,i.colRenderIndex):i.col.cellClass,t.addClass(o)}n.addClass(a),i.col.cellClass&&l();var e=i.grid.registerDataChangeCallback(l,[s.dataChange.COLUMN,s.dataChange.EDIT]);var t=i.$watch("row",function(e,t){if(e!==t){(o||i.col.cellClass)&&l();var r=i.col.getColClass(!1);r!==a&&(n.removeClass(a),n.addClass(r),a=r)}});function r(){e(),t()}i.$on("$destroy",r),n.on("$destroy",r)}}}}}]),angular.module("ui.grid").service("uiGridColumnMenuService",["i18nService","uiGridConstants","gridUtil",function(e,r,g){var i={initialize:function(e,t){e.grid=t.grid,(t.columnMenuScope=e).menuShown=!1},setColMenuItemWatch:function(t){var e=t.$watch("col.menuItems",function(e){void 0!==e&&e&&angular.isArray(e)?(e.forEach(function(e){void 0!==e.context&&e.context||(e.context={}),e.context.col=t.col}),t.menuItems=t.defaultMenuItems.concat(e)):t.menuItems=t.defaultMenuItems});t.$on("$destroy",e)},sortable:function(e){return Boolean(e.grid.options.enableSorting&&void 0!==e.col&&e.col&&e.col.enableSorting)},isActiveSort:function(e,t){return Boolean(void 0!==e.col&&void 0!==e.col.sort&&void 0!==e.col.sort.direction&&e.col.sort.direction===t)},suppressRemoveSort:function(e){return Boolean(e.col&&e.col.suppressRemoveSort)},hideable:function(e){return!(void 0!==e.col&&e.col&&e.col.colDef&&!1===e.col.colDef.enableHiding)},getDefaultMenuItems:function(t){return[{title:function(){return e.getSafeText("sort.ascending")},icon:"ui-grid-icon-sort-alt-up",action:function(e){e.stopPropagation(),t.sortColumn(e,r.ASC)},shown:function(){return i.sortable(t)},active:function(){return i.isActiveSort(t,r.ASC)}},{title:function(){return e.getSafeText("sort.descending")},icon:"ui-grid-icon-sort-alt-down",action:function(e){e.stopPropagation(),t.sortColumn(e,r.DESC)},shown:function(){return i.sortable(t)},active:function(){return i.isActiveSort(t,r.DESC)}},{title:function(){return e.getSafeText("sort.remove")},icon:"ui-grid-icon-cancel",action:function(e){e.stopPropagation(),t.unsortColumn()},shown:function(){return i.sortable(t)&&void 0!==t.col&&void 0!==t.col.sort&&void 0!==t.col.sort.direction&&null!==t.col.sort.direction&&!i.suppressRemoveSort(t)}},{title:function(){return e.getSafeText("column.hide")},icon:"ui-grid-icon-cancel",shown:function(){return i.hideable(t)},action:function(e){e.stopPropagation(),t.hideColumn()}}]},getColumnElementPosition:function(e,t,r){var i={};return i.left=r[0].offsetLeft,i.top=r[0].offsetTop,i.parentLeft=r[0].offsetParent.offsetLeft,i.offset=0,t.grid.options.offsetLeft&&(i.offset=t.grid.options.offsetLeft),i.height=g.elementHeight(r,!0),i.width=g.elementWidth(r,!0),i},repositionMenu:function(e,t,r,i,n){var o=i[0].querySelectorAll(".ui-grid-menu"),a=g.closestElm(n,".ui-grid-render-container"),l=a.getBoundingClientRect().left-e.grid.element[0].getBoundingClientRect().left,s=a.querySelectorAll(".ui-grid-viewport")[0].scrollLeft,d=g.elementWidth(o,!0),u=t.lastMenuPaddingRight?t.lastMenuPaddingRight:e.lastMenuPaddingRight?e.lastMenuPaddingRight:10;0!==o.length&&0!==o[0].querySelectorAll(".ui-grid-menu-mid").length&&(u=parseInt(g.getStyles(angular.element(o)[0]).paddingRight,10),e.lastMenuPaddingRight=u,t.lastMenuPaddingRight=u);var c=r.left+l-s+r.parentLeft+r.width+u;c<r.offset+d&&(c=Math.max(r.left-s+r.parentLeft-u+d,r.offset+d)),i.css("left",c+"px"),i.css("top",r.top+r.height+"px")}};return i}]).directive("uiGridColumnMenu",["$timeout","gridUtil","uiGridConstants","uiGridColumnMenuService","$document",function(r,n,a,l,s){return{priority:0,scope:!0,require:"^uiGrid",templateUrl:"ui-grid/uiGridColumnMenu",replace:!0,link:function(o,i,e,t){l.initialize(o,t),o.defaultMenuItems=l.getDefaultMenuItems(o),o.menuItems=o.defaultMenuItems,l.setColMenuItemWatch(o),o.showMenu=function(e,t,r){o.col=e;var i=l.getColumnElementPosition(o,e,t);o.menuShown?(o.colElement=t,o.colElementPosition=i,o.hideThenShow=!0,o.$broadcast("hide-menu",{originalEvent:r})):(o.menuShown=!0,o.colElement=t,o.colElementPosition=i,o.$broadcast("show-menu",{originalEvent:r}))},o.hideMenu=function(e){o.menuShown=!1,e||o.$broadcast("hide-menu")},o.$on("menu-hidden",function(){var e=angular.element(i[0].querySelector(".ui-grid-menu-items"))[0];i[0].removeAttribute("style"),o.hideThenShow?(delete o.hideThenShow,o.$broadcast("show-menu"),o.menuShown=!0):(o.hideMenu(!0),o.col&&o.col.visible&&n.focus.bySelector(s,".ui-grid-header-cell."+o.col.getColClass()+" .ui-grid-column-menu-button",o.col.grid,!1).catch(angular.noop)),e&&(e.onkeydown=null,angular.forEach(e.children,function(e){e.onkeydown=null}))}),o.$on("menu-shown",function(){r(function(){l.repositionMenu(o,o.col,o.colElementPosition,i,o.colElement),o.menuItems.some(function(e){return e.shown()})&&n.focus.bySelector(s,".ui-grid-menu-items .ui-grid-menu-item:not(.ng-hide)",!0).catch(angular.noop),delete o.colElementPosition,delete o.columnElement,function(){var e,t=angular.element(i[0].querySelector(".ui-grid-menu-items"))[0],n=[];function r(e,t,r,i){e.keyCode===a.keymap.TAB&&(t?e.preventDefault():r&&(e.preventDefault(),n[i].focus()))}t&&(t.onkeydown=function(e){e.keyCode===a.keymap.ESC&&(e.preventDefault(),o.hideMenu())},e=t.querySelectorAll(".ui-grid-menu-item:not(.ng-hide)"),angular.forEach(e,function(e){null!==e.offsetParent&&this.push(e)},n),n.length&&(1===n.length?n[0].onkeydown=function(e){r(e,!0)}:(n[0].onkeydown=function(e){r(e,!1,e.shiftKey,n.length-1)},n[n.length-1].onkeydown=function(e){r(e,!1,!e.shiftKey,0)})))}()})}),o.sortColumn=function(e,t){e.stopPropagation(),o.grid.sortColumn(o.col,t,!0).then(function(){o.grid.refresh(),o.hideMenu()}).catch(angular.noop)},o.unsortColumn=function(){o.col.unsort(),o.grid.refresh(),o.hideMenu()},o.hideColumn=function(){o.col.colDef.visible=!1,o.col.visible=!1,o.grid.queueGridRefresh(),o.hideMenu(),o.grid.api.core.notifyDataChange(a.dataChange.COLUMN),o.grid.api.core.raise.columnVisibilityChanged(o.col),r(function(){var r,i,t=function(){return n.focus.byId("grid-menu",o.grid)};if(o.grid.columns.some(function(e,t){if(angular.equals(e,o.col))return r=t,!0}),o.grid.columns.some(function(e,t){if(!e.visible)return!1;if(t<r)i=e;else{if(r<t&&!i)return i=e,!0;if(r<t&&i)return!0}}),i){var e=i.getColClass();n.focus.bySelector(s,".ui-grid-header-cell."+e+" .ui-grid-header-cell-primary-focus",!0).then(angular.noop,function(e){if("canceled"!==e)return t()}).catch(angular.noop)}else t()})}},controller:["$scope",function(e){var t=this;e.$watch("menuItems",function(e){t.menuItems=e})}]}}]),function(){"use strict";angular.module("ui.grid").directive("uiGridFilter",["$compile","$templateCache","i18nService","gridUtil",function(n,e,t,i){return{compile:function(){return{pre:function(r,i){r.col.updateFilters=function(e){if(i.children().remove(),e){var t=r.col.filterHeaderTemplate;void 0===t&&""!==r.col.providedFilterHeaderTemplate?r.col.filterHeaderTemplatePromise&&r.col.filterHeaderTemplatePromise.then(function(){t=r.col.filterHeaderTemplate,i.append(n(t)(r))}):i.append(n(t)(r))}},r.$on("$destroy",function(){delete r.col.updateFilters})},post:function(e,r){e.aria=t.getSafeText("headerCell.aria"),e.removeFilter=function(e,t){e.term=null,i.focus.bySelector(r,".ui-grid-filter-input-"+t)}}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridFooterCell",["$timeout","gridUtil","uiGridConstants","$compile",function(e,t,s,i){return{priority:0,scope:{col:"=",row:"=",renderIndex:"="},replace:!0,require:"^uiGrid",compile:function(){return{pre:function(e,t){var r=e.col.footerCellTemplate;void 0===r&&""!==e.col.providedFooterCellTemplate?e.col.footerCellTemplatePromise&&e.col.footerCellTemplatePromise.then(function(){r=e.col.footerCellTemplate,t.append(i(r)(e))}):t.append(i(r)(e))},post:function(t,r,e,i){t.grid=i.grid;var n,o=t.col.getColClass(!1);r.addClass(o);var a=function(){var e=r;n&&(e.removeClass(n),n=null),n=angular.isFunction(t.col.footerCellClass)?t.col.footerCellClass(t.grid,t.row,t.col,t.rowRenderIndex,t.colRenderIndex):t.col.footerCellClass,e.addClass(n)};t.col.footerCellClass&&a(),t.col.updateAggregationValue();var l=t.grid.registerDataChangeCallback(a,[s.dataChange.COLUMN]);t.grid.api.core.on.rowsRendered(t,t.col.updateAggregationValue),t.grid.api.core.on.rowsRendered(t,a),t.$on("$destroy",l)}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridFooter",["$templateCache","$compile","uiGridConstants","gridUtil","$timeout",function(e,l,t,s,r){return{restrict:"EA",replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:!0,compile:function(e,t){return{pre:function(n,o,e,t){var r=t[0],a=t[1];n.grid=r.grid,n.colContainer=a.colContainer,a.footer=o;var i=n.grid.options.footerTemplate;s.getTemplate(i).then(function(e){var t=angular.element(e),r=l(t)(n);if(o.append(r),a){var i=o[0].getElementsByClassName("ui-grid-footer-viewport")[0];i&&(a.footerViewport=i)}}).catch(angular.noop)},post:function(e,t,r,i){var n=i[0],o=i[1];n.grid;s.disableAnimations(t);var a=(o.footer=t)[0].getElementsByClassName("ui-grid-footer-viewport")[0];a&&(o.footerViewport=a)}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridGridFooter",["$templateCache","$compile","uiGridConstants","gridUtil",function(e,o,t,a){return{restrict:"EA",replace:!0,require:"^uiGrid",scope:!0,compile:function(){return{pre:function(i,n,e,t){i.grid=t.grid;var r=i.grid.options.gridFooterTemplate;a.getTemplate(r).then(function(e){var t=angular.element(e),r=o(t)(i);n.append(r)}).catch(angular.noop)}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridHeaderCell",["$compile","$timeout","$window","$document","gridUtil","uiGridConstants","ScrollEvent","i18nService","$rootScope",function(i,f,e,m,t,h,r,v,C){return{priority:0,scope:{col:"=",row:"=",renderIndex:"="},require:["^uiGrid","^uiGridRenderContainer"],replace:!0,compile:function(){return{pre:function(e,t){var r=e.col.headerCellTemplate;void 0===r&&""!==e.col.providedHeaderCellTemplate?e.col.headerCellTemplatePromise&&e.col.headerCellTemplatePromise.then(function(){r=e.col.headerCellTemplate,t.append(i(r)(e))}):t.append(i(r)(e))},post:function(r,i,e,t){var n=t[0],o=t[1];r.i18n={headerCell:v.getSafeText("headerCell"),sort:v.getSafeText("sort")},r.isSortPriorityVisible=function(){return r.col&&r.col.sort&&angular.isNumber(r.col.sort.priority)&&r.grid.columns.some(function(e,t){return angular.isNumber(e.sort.priority)&&e!==r.col})},r.getSortDirectionAriaLabel=function(){var e=r.col,t=e.sort&&e.sort.direction===h.ASC?r.i18n.sort.ascending:e.sort&&e.sort.direction===h.DESC?r.i18n.sort.descending:r.i18n.sort.none;return r.isSortPriorityVisible()&&(t=t+". "+r.i18n.headerCell.priority+" "+(e.sort.priority+1)),t},r.grid=n.grid,r.renderContainer=n.grid.renderContainers[o.containerId];var a=r.col.getColClass(!1);i.addClass(a),r.menuShown=!1,r.asc=h.ASC,r.desc=h.DESC;var l,s,d=angular.element(i[0].querySelectorAll(".ui-grid-cell-contents")),u=[];r.downFn=function(e){e.stopPropagation(),void 0!==e.originalEvent&&void 0!==e.originalEvent&&(e=e.originalEvent),e.button&&0!==e.button||(s=e.pageX,r.mousedownStartTime=(new Date).getTime(),r.mousedownTimeout=f(function(){},500),r.mousedownTimeout.then(function(){r.colMenu&&n.columnMenuScope.showMenu(r.col,i,e)}).catch(angular.noop),n.fireEvent(h.events.COLUMN_HEADER_CLICK,{event:e,columnName:r.col.colDef.name}),r.offAllEvents(),"touchstart"===e.type?(m.on("touchend",r.upFn),m.on("touchmove",r.moveFn)):"mousedown"===e.type&&(m.on("mouseup",r.upFn),m.on("mousemove",r.moveFn)))},r.upFn=function(e){e.stopPropagation(),f.cancel(r.mousedownTimeout),r.offAllEvents(),r.onDownEvents(e.type),500<(new Date).getTime()-r.mousedownStartTime||r.sortable&&r.handleClick(e)},r.handleKeyDown=function(e){32===e.keyCode&&e.preventDefault()},r.moveFn=function(e){0!==e.pageX-s&&(f.cancel(r.mousedownTimeout),r.offAllEvents(),r.onDownEvents(e.type))},r.clickFn=function(e){e.stopPropagation(),d.off("click",r.clickFn)},r.offAllEvents=function(){d.off("touchstart",r.downFn),d.off("mousedown",r.downFn),m.off("touchend",r.upFn),m.off("mouseup",r.upFn),m.off("touchmove",r.moveFn),m.off("mousemove",r.moveFn),d.off("click",r.clickFn)},r.onDownEvents=function(e){switch(e){case"touchmove":case"touchend":d.on("click",r.clickFn),d.on("touchstart",r.downFn),f(function(){d.on("mousedown",r.downFn)},500);break;case"mousemove":case"mouseup":d.on("click",r.clickFn),d.on("mousedown",r.downFn),f(function(){d.on("touchstart",r.downFn)},500);break;default:d.on("click",r.clickFn),d.on("touchstart",r.downFn),d.on("mousedown",r.downFn)}};var c=function(e){e&&(void 0!==r.col.updateFilters&&r.col.updateFilters(r.col.filterable),r.col.filterable?(r.col.filters.forEach(function(e,t){u.push(r.$watch("col.filters["+t+"].term",function(e,t){e!==t&&(n.grid.api.core.raise.filterChanged(r.col),n.grid.api.core.notifyDataChange(h.dataChange.COLUMN),n.grid.queueGridRefresh())}))}),r.$on("$destroy",function(){u.forEach(function(e){e()})})):u.forEach(function(e){e()}))},g=function(){var e=i;l&&(e.removeClass(l),l=null),l=angular.isFunction(r.col.headerCellClass)?r.col.headerCellClass(r.grid,r.row,r.col,r.rowRenderIndex,r.colRenderIndex):r.col.headerCellClass,e.addClass(l),r.$applyAsync(function(){var e=r.grid.renderContainers.right&&r.grid.renderContainers.right.visibleColumnCache.length?r.grid.renderContainers.right:r.grid.renderContainers.body;r.isLastCol=n.grid.options&&n.grid.options.enableGridMenu&&r.col===e.visibleColumnCache[e.visibleColumnCache.length-1]}),r.sortable=Boolean(r.col.enableSorting);var t=r.col.filterable;r.col.filterable=Boolean(n.grid.options.enableFiltering&&r.col.enableFiltering),r.$applyAsync(function(){c(t!==r.col.filterable)}),r.colMenu=r.col.grid.options&&!1!==r.col.grid.options.enableColumnMenus&&r.col.colDef&&!1!==r.col.colDef.enableColumnMenu,r.offAllEvents(),(r.sortable||r.colMenu)&&(r.onDownEvents(),r.$on("$destroy",function(){r.offAllEvents()}))};g(),"columnMenu"===r.col.filterContainer&&r.col.filterable&&C.$on("menu-shown",function(){r.$applyAsync(function(){c(r.col.filterable)})});var p=r.grid.registerDataChangeCallback(g,[h.dataChange.COLUMN]);r.$on("$destroy",p),r.handleClick=function(e){var t=!1;e.shiftKey&&(t=!0),n.grid.sortColumn(r.col,t).then(function(){n.columnMenuScope&&n.columnMenuScope.hideMenu(),n.grid.refresh()}).catch(angular.noop)},r.headerCellArrowKeyDown=function(e){32!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),r.toggleMenu(e))},r.toggleMenu=function(e){e.stopPropagation(),n.columnMenuScope.menuShown&&n.columnMenuScope.col===r.col?n.columnMenuScope.hideMenu():n.columnMenuScope.showMenu(r.col,i)}}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridHeader",["$templateCache","$compile","uiGridConstants","gridUtil","$timeout","ScrollEvent",function(e,d,t,u,r,c){return{restrict:"EA",replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:!0,compile:function(){return{pre:function(n,o,e,t){var r,i=t[0],a=t[1];function l(){a.header=a.colContainer.header=o;var e=o[0].getElementsByClassName("ui-grid-header-canvas");0<e.length?a.headerCanvas=a.colContainer.headerCanvas=e[0]:a.headerCanvas=null}function s(){if(!i.grid.isScrollingHorizontally){var e=u.normalizeScrollLeft(a.headerViewport,i.grid),t=a.colContainer.scrollHorizontal(e),r=new c(i.grid,null,a.colContainer,c.Sources.ViewPortScroll);r.newScrollLeft=e,-1<t&&(r.x={percentage:t}),i.grid.scrollContainers(null,r)}}n.grid=i.grid,n.colContainer=a.colContainer,l(),r=n.grid.options.showHeader?n.grid.options.headerTemplate?n.grid.options.headerTemplate:"ui-grid/ui-grid-header":"ui-grid/ui-grid-no-header",u.getTemplate(r).then(function(e){var t=angular.element(e),r=d(t)(n);if(o.replaceWith(r),o=r,l(),a){var i=o[0].getElementsByClassName("ui-grid-header-viewport")[0];i&&(a.headerViewport=i,angular.element(i).on("scroll",s),n.$on("$destroy",function(){angular.element(i).off("scroll",s)}))}n.grid.queueRefresh()}).catch(angular.noop)},post:function(e,t,r,i){var n=i[0],o=i[1];n.grid;u.disableAnimations(t);var a=(o.header=t)[0].getElementsByClassName("ui-grid-header-viewport")[0];a&&(o.headerViewport=a),n&&n.grid.registerStyleComputation({priority:15,func:function(){var e=o.colContainer.visibleColumnCache,t="",r=0;return e.forEach(function(e){t+=e.getColClassDefinition(),r+=e.drawnWidth}),o.colContainer.canvasWidth=r,t}})}}}}}])}(),angular.module("ui.grid").service("uiGridGridMenuService",["gridUtil","i18nService","uiGridConstants",function(n,a,t){var l={initialize:function(e,t){(t.gridMenuScope=e).grid=t,e.registeredMenuItems=[],e.$on("$destroy",function(){e.grid&&e.grid.gridMenuScope&&(e.grid.gridMenuScope=null),e.grid&&(e.grid=null),e.registeredMenuItems&&(e.registeredMenuItems=null)}),e.registeredMenuItems=[],t.api.registerMethod("core","addToGridMenu",l.addToGridMenu),t.api.registerMethod("core","removeFromGridMenu",l.removeFromGridMenu)},addToGridMenu:function(e,t){angular.isArray(t)?e.gridMenuScope?(e.gridMenuScope.registeredMenuItems=e.gridMenuScope.registeredMenuItems?e.gridMenuScope.registeredMenuItems:[],e.gridMenuScope.registeredMenuItems=e.gridMenuScope.registeredMenuItems.concat(t)):n.logError("Asked to addToGridMenu, but gridMenuScope not present.  Timing issue?  Please log issue with ui-grid"):n.logError("addToGridMenu: menuItems must be an array, and is not, not adding any items")},removeFromGridMenu:function(e,r){var i=-1;e&&e.gridMenuScope&&e.gridMenuScope.registeredMenuItems.forEach(function(e,t){e.id===r&&(-1<i?n.logError("removeFromGridMenu: found multiple items with the same id, removing only the last"):i=t)}),-1<i&&e.gridMenuScope.registeredMenuItems.splice(i,1)},getMenuItems:function(t){var e=[];t.grid.options.gridMenuCustomItems&&(angular.isArray(t.grid.options.gridMenuCustomItems)?e=e.concat(t.grid.options.gridMenuCustomItems):n.logError("gridOptions.gridMenuCustomItems must be an array, and is not"));var r=[{title:a.getSafeText("gridMenu.clearAllFilters"),action:function(e){t.grid.clearAllFilters()},shown:function(){return t.grid.options.enableFiltering},order:100}];return e=(e=e.concat(r)).concat(t.registeredMenuItems),!1!==t.grid.options.gridMenuShowHideColumns&&(e=e.concat(l.showHideColumns(t))),e.sort(function(e,t){return e.order-t.order}),e},showHideColumns:function(i){var n=[];if(!i.grid.options.columnDefs||0===i.grid.options.columnDefs.length||0===i.grid.columns.length)return n;function o(e){return!0===(t=e).visible||void 0===t.visible?"ui-grid-icon-ok":"ui-grid-icon-cancel";var t}return n.push({title:a.getSafeText("gridMenu.columns"),order:300,templateUrl:"ui-grid/ui-grid-menu-header-item"}),i.grid.options.gridMenuTitleFilter=i.grid.options.gridMenuTitleFilter?i.grid.options.gridMenuTitleFilter:function(e){return e},i.grid.options.columnDefs.forEach(function(e,t){if(!1!==e.enableHiding){var r={icon:o(e),action:function(e){e.stopPropagation(),l.toggleColumnVisibility(this.context.gridCol),e.target&&e.target.firstChild&&("I"===angular.element(e.target)[0].nodeName?e.target.className=o(this.context.gridCol.colDef):e.target.firstChild.className=o(this.context.gridCol.colDef))},shown:function(){return!1!==this.context.gridCol.colDef.enableHiding},context:{gridCol:i.grid.getColumn(e.name||e.field)},leaveOpen:!0,order:301+t};l.setMenuItemTitle(r,e,i.grid),n.push(r)}}),n},setMenuItemTitle:function(t,e,r){var i=r.options.gridMenuTitleFilter(e.displayName||n.readableColumnName(e.name)||e.field);"string"==typeof i?t.title=i:i.then?(t.title="",i.then(function(e){t.title=e},function(e){t.title=e}).catch(angular.noop)):(n.logError("Expected gridMenuTitleFilter to return a string or a promise, it has returned neither, bad config"),t.title="badconfig")},toggleColumnVisibility:function(e){e.colDef.visible=!(!0===e.colDef.visible||void 0===e.colDef.visible),e.grid.refresh(),e.grid.api.core.notifyDataChange(t.dataChange.COLUMN),e.grid.api.core.raise.columnVisibilityChanged(e)}};return l}]).directive("uiGridMenuButton",["gridUtil","uiGridConstants","uiGridGridMenuService","i18nService",function(o,e,a,l){return{priority:0,scope:!0,require:["^uiGrid"],templateUrl:"ui-grid/ui-grid-menu-button",replace:!0,link:function(e,t,r,i){var n=i[0];e.i18n={aria:l.getSafeText("gridMenu.aria")},a.initialize(e,n.grid),e.shown=!1,e.toggleMenu=function(){e.shown?(e.$broadcast("hide-menu"),e.shown=!1):(e.menuItems=a.getMenuItems(e),e.$broadcast("show-menu"),e.shown=!0)},e.$on("menu-hidden",function(){e.shown=!1,o.focus.bySelector(t,".ui-grid-icon-container")})}}}]),angular.module("ui.grid").directive("uiGridMenu",["$compile","$timeout","$window","$document","gridUtil","uiGridConstants","i18nService",function(d,u,c,e,g,p,f){return{priority:0,scope:{menuItems:"=",autoHide:"=?",col:"=?"},require:"?^uiGrid",templateUrl:"ui-grid/uiGridMenu",replace:!1,link:function(i,o,e,r){if(i.dynamicStyles="",r&&r.grid&&r.grid.options&&r.grid.options.gridMenuTemplate){var t=r.grid.options.gridMenuTemplate;g.getTemplate(t).then(function(e){var t=angular.element(e),r=d(t)(i);o.replaceWith(r)}).catch(angular.noop)}var n=function(e){var t=e-r.grid.headerHeight-20;i.dynamicStyles=[".grid"+r.grid.id+" .ui-grid-menu-mid {","max-height: "+t+"px;","}"].join(" ")};r&&(n(r.grid.gridHeight),r.grid.api.core.on.gridDimensionChanged(i,function(e,t,r,i){n(r)})),i.i18n={close:f.getSafeText("columnMenu.close")},i.showMenu=function(e,t){i.shown?i.shownMid||(i.shownMid=!0,i.$emit("menu-shown")):(i.shown=!0,u(function(){i.shownMid=!0,i.$emit("menu-shown")}));var r="click";t&&t.originalEvent&&t.originalEvent.type&&"touchstart"===t.originalEvent.type&&(r=t.originalEvent.type),angular.element(document).off("click touchstart",a),o.off("keyup",l),o.off("keydown",s),u(function(){angular.element(document).on(r,a),o.on("keyup",l),o.on("keydown",s)})},i.hideMenu=function(e){i.shown&&(i.shownMid=!1,u(function(){i.shownMid||(i.shown=!1,i.$emit("menu-hidden"))},40)),angular.element(document).off("click touchstart",a),o.off("keyup",l),o.off("keydown",s)},i.$on("hide-menu",function(e,t){i.hideMenu(e,t)}),i.$on("show-menu",function(e,t){i.showMenu(e,t)});var a=function(e){if(i.shown){if(i.col&&"columnMenu"===i.col.filterContainer){var t=document.querySelector(".ui-grid-column-menu").querySelector("[ui-grid-filter]");if(t&&t.contains(e.target))return!1}i.$apply(function(){i.hideMenu()})}},l=function(e){27===e.keyCode&&i.hideMenu()},s=function(t){var e=function(e){return e.focus(),t.preventDefault(),!1};if(9===t.keyCode){var r,i,n=o[0].querySelectorAll("button:not(.ng-hide)");0<n.length&&(r=n[0],i=n[n.length-1],t.target!==i||t.shiftKey?t.target===r&&t.shiftKey&&e(i):e(r))}};void 0!==i.autoHide&&void 0!==i.autoHide||(i.autoHide=!0),i.autoHide&&angular.element(c).on("resize",a),i.$on("$destroy",function(){angular.element(c).off("resize",a),angular.element(document).off("click touchstart",a),o.off("keyup",l),o.off("keydown",s)}),r&&i.$on("$destroy",r.grid.api.core.on.scrollBegin(i,a)),i.$on("$destroy",i.$on(p.events.ITEM_DRAGGING,a))}}}]).directive("uiGridMenuItem",["gridUtil","$compile","i18nService",function(a,o,i){return{priority:0,scope:{name:"=",active:"=",action:"=",icon:"=",shown:"=",context:"=",templateUrl:"=",leaveOpen:"=",screenReaderOnly:"="},require:["?^uiGrid"],templateUrl:"ui-grid/uiGridMenuItem",replace:!1,compile:function(){return{pre:function(i,n){i.templateUrl&&a.getTemplate(i.templateUrl).then(function(e){var t=angular.element(e),r=o(t)(i);n.replaceWith(r)}).catch(angular.noop)},post:function(n,e,t,r){var o=r[0];void 0!==n.shown&&null!==n.shown||(n.shown=function(){return!0}),n.itemShown=function(){var e={};return n.context&&(e.context=n.context),void 0!==o&&o&&(e.grid=o.grid),n.shown.call(e)},n.itemAction=function(e,t){if(e.stopPropagation(),"function"==typeof n.action){var r={};if(n.context&&(r.context=n.context),void 0!==o&&o&&(r.grid=o.grid),n.action.call(r,e,t),n.leaveOpen){var i=e.target.parentElement;"I"===angular.element(e.target)[0].nodeName&&(i=i.parentElement),a.focus.bySelector(i,"button[type=button]",!0)}else n.$emit("hide-menu")}},n.label=function(){var e=n.name;return"function"==typeof n.name&&(e=n.name.call()),e},n.i18n=i.get()}}}}}]),function(){"use strict";var t=angular.module("ui.grid");angular.forEach([{tag:"Src",method:"attr"},{tag:"Text",method:"text"},{tag:"Href",method:"attr"},{tag:"Class",method:"addClass"},{tag:"Html",method:"html"},{tag:"Alt",method:"attr"},{tag:"Style",method:"css"},{tag:"Value",method:"attr"},{tag:"Id",method:"attr"},{tag:"Id",directiveName:"IdGrid",method:"attr",appendGridId:!0},{tag:"Title",method:"attr"},{tag:"Label",method:"attr",aria:!0},{tag:"Labelledby",method:"attr",aria:!0},{tag:"Labelledby",directiveName:"LabelledbyGrid",appendGridId:!0,method:"attr",aria:!0},{tag:"Describedby",method:"attr",aria:!0},{tag:"Describedby",directiveName:"DescribedbyGrid",appendGridId:!0,method:"attr",aria:!0}],function(d){var e="uiGridOneBind",u=(d.aria?e+"Aria":e)+(d.directiveName?d.directiveName:d.tag);t.directive(u,["gridUtil",function(s){return{restrict:"A",require:["?uiGrid","?^uiGrid"],link:function(n,o,e,a){var l=n.$watch(e[u],function(e){if(e){if(d.appendGridId){var t=null;angular.forEach(e.split(" "),function(e){t=(t?t+" ":"")+function(e){var t;if(n.grid)t=n.grid;else if(n.col&&n.col.grid)t=n.col.grid;else if(!a.some(function(e){if(e&&e.grid)return t=e.grid,!0}))throw s.logError("["+u+"] A valid grid could not be found to bind id. Are you using this directive within the correct scope? Trying to generate id: [gridID]-"+e),new Error("No valid grid could be found");t&&(new RegExp(t.id.toString()).test(e)||(e=t.id.toString()+"-"+e));return e}(e)}),e=t}switch(d.method){case"attr":d.aria?o[d.method]("aria-"+d.tag.toLowerCase(),e):o[d.method](d.tag.toLowerCase(),e);break;case"addClass":if(angular.isObject(e)&&!angular.isArray(e)){var r=[],i=!1;if(angular.forEach(e,function(e,t){null!=e&&(i=!0,e&&r.push(t))}),!i)return;e=r}if(!e)return;o.addClass(angular.isArray(e)?e.join(" "):e);break;default:o[d.method](e)}l()}},!0)}}}])})}(),function(){"use strict";var e=angular.module("ui.grid");e.directive("uiGridRenderContainer",["$timeout","$document","uiGridConstants","gridUtil","ScrollEvent",function(e,t,r,m,h){return{replace:!0,transclude:!0,templateUrl:"ui-grid/uiGridRenderContainer",require:["^uiGrid","uiGridRenderContainer"],scope:{containerId:"=",rowContainerName:"=",colContainerName:"=",bindScrollHorizontal:"=",bindScrollVertical:"=",enableVerticalScrollbar:"=",enableHorizontalScrollbar:"="},controller:"uiGridRenderContainer as RenderContainer",compile:function(){return{pre:function(e,t,r,i){var n,o,a=i[0],l=i[1],s=e.grid=a.grid;if(!e.rowContainerName)throw new Error("No row render container name specified");if(!e.colContainerName)throw new Error("No column render container name specified");if(!s.renderContainers[e.rowContainerName])throw new Error('Row render container "'+e.rowContainerName+'" is not registered.');if(!s.renderContainers[e.colContainerName])throw new Error('Column render container "'+e.colContainerName+'" is not registered.');n=e.rowContainer=s.renderContainers[e.rowContainerName],o=e.colContainer=s.renderContainers[e.colContainerName],l.containerId=e.containerId,l.rowContainer=n,l.colContainer=o},post:function(s,t,e,r){var d=r[0],a=r[1],u=d.grid,c=a.rowContainer,g=a.colContainer,l=null,p=null,f=u.renderContainers[s.containerId];t.addClass("ui-grid-render-container-"+s.containerId),m.on.mousewheel(t,function(e){var t=new h(u,c,g,h.Sources.RenderContainerMouseWheel);if(0!==e.deltaY){var r=-1*e.deltaY*e.deltaFactor;l=a.viewport[0].scrollTop,t.verticalScrollLength=c.getVerticalScrollLength();var i=(l+r)/t.verticalScrollLength;1<=i&&l<t.verticalScrollLength&&(a.viewport[0].scrollTop=t.verticalScrollLength),i<0?i=0:1<i&&(i=1),t.y={percentage:i,pixels:r}}if(0!==e.deltaX){var n=e.deltaX*e.deltaFactor;p=m.normalizeScrollLeft(a.viewport,u),t.horizontalScrollLength=g.getCanvasWidth()-g.getViewportWidth();var o=(p+n)/t.horizontalScrollLength;o<0?o=0:1<o&&(o=1),t.x={percentage:o,pixels:n}}0!==e.deltaY&&(t.atTop(l)||t.atBottom(l))||0!==e.deltaX&&(t.atLeft(p)||t.atRight(p))||(e.preventDefault(),e.stopPropagation(),t.fireThrottledScrollingEvent("",t))}),t.bind("$destroy",function(){t.unbind("keydown"),["touchstart","touchmove","touchend","keydown","wheel","mousewheel","DomMouseScroll","MozMousePixelScroll"].forEach(function(e){t.unbind(e)})}),d.grid.registerStyleComputation({priority:6,func:function(){var e,t,r="",i=g.canvasWidth,n=g.getViewportWidth(),o=c.getCanvasHeight(),a=c.getViewportHeight();if(g.needsHScrollbarPlaceholder()&&(a-=u.scrollbarHeight),e=t=g.getHeaderViewportWidth(),r+="\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-canvas { width: "+i+"px; height: "+o+"px; }",r+="\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-header-canvas { width: "+(i+u.scrollbarWidth)+"px; }",f.explicitHeaderCanvasHeight){var l=document.querySelector(".grid"+d.grid.id+" .ui-grid-render-container-body .ui-grid-header-canvas");l&&(f.explicitHeaderCanvasHeight=l.offsetHeight),r+="\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-header-canvas { height: "+f.explicitHeaderCanvasHeight+"px; }"}else r+="\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-header-canvas { height: inherit; }";return r+="\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-viewport { width: "+n+"px; height: "+a+"px; }",r+="\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-header-viewport { width: "+e+"px; }",r+="\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-footer-canvas { width: "+(i+u.scrollbarWidth)+"px; }",r+="\n .grid"+d.grid.id+" .ui-grid-render-container-"+s.containerId+" .ui-grid-footer-viewport { width: "+t+"px; }"}})}}}}}]),e.controller("uiGridRenderContainer",["$scope","gridUtil",function(e,t){}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridRow",function(){return{replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:{row:"=uiGridRow",rowRenderIndex:"="},compile:function(){return{pre:function(t,i,e,r){var n,o,a=r[0],l=r[1];function s(){t.row.getRowTemplateFn.then(function(e){var r=t.$new();e(r,function(e,t){n&&(n.remove(),o.$destroy()),i.empty().append(e),n=e,o=r})}).catch(angular.noop)}t.grid=a.grid,t.colContainer=l.colContainer,s(),t.$watch("row.getRowTemplateFn",function(e,t){e!==t&&s()})},post:function(e,t){e.row.element=t}}}}})}(),angular.module("ui.grid").directive("uiGridStyle",["gridUtil","$interpolate",function(e,i){return{link:function(e,t){var r=i(t.text(),!0);r&&e.$watch(r,function(e){t.text(e)})}}}]),function(){"use strict";angular.module("ui.grid").directive("uiGridViewport",["gridUtil","ScrollEvent",function(u,c){return{replace:!0,scope:{},controllerAs:"Viewport",templateUrl:"ui-grid/uiGridViewport",require:["^uiGrid","^uiGridRenderContainer"],link:function(o,a,e,t){var r=t[0],i=t[1],l=(o.containerCtrl=i).rowContainer,s=i.colContainer,d=r.grid;o.grid=r.grid,o.rowContainer=i.rowContainer,o.colContainer=i.colContainer,i.viewport=a,d&&d.options&&d.options.customScroller?d.options.customScroller(a,n):a.on("scroll",n);function n(){var e=a[0].scrollTop,t=u.normalizeScrollLeft(a,d),r=l.scrollVertical(e),i=s.scrollHorizontal(t),n=new c(d,l,s,c.Sources.ViewPortScroll);n.newScrollLeft=t,n.newScrollTop=e,-1<i&&(n.x={percentage:i}),-1<r&&(n.y={percentage:r}),d.scrollContainers(o.$parent.containerId,n)}o.$parent.bindScrollVertical&&d.addVerticalScrollSync(o.$parent.containerId,function(e){i.prevScrollArgs=e,a[0].scrollTop=e.getNewScrollTop(l,i.viewport)}),o.$parent.bindScrollHorizontal&&(d.addHorizontalScrollSync(o.$parent.containerId,function(e){var t=(i.prevScrollArgs=e).getNewScrollLeft(s,i.viewport);a[0].scrollLeft=u.denormalizeScrollLeft(i.viewport,t,d)}),d.addHorizontalScrollSync(o.$parent.containerId+"header",function(e){var t=e.getNewScrollLeft(s,i.viewport);i.headerViewport&&(i.headerViewport.scrollLeft=u.denormalizeScrollLeft(i.viewport,t,d))}),d.addHorizontalScrollSync(o.$parent.containerId+"footer",function(e){var t=e.getNewScrollLeft(s,i.viewport);i.footerViewport&&(i.footerViewport.scrollLeft=u.denormalizeScrollLeft(i.viewport,t,d))})),o.$on("$destroy",function(){a.off()})},controller:["$scope",function(n){this.rowStyle=function(){var e=n.rowContainer,t=n.colContainer,r={};if(0!==e.currentTopRow){var i="translateY("+e.currentTopRow*e.grid.options.rowHeight+"px)";r.transform=i,r["-webkit-transform"]=i,r["-ms-transform"]=i}return 0!==t.currentFirstColumn&&(t.grid.isRTL()?r["margin-right"]=t.columnOffset+"px":r["margin-left"]=t.columnOffset+"px"),r}}]}}])}(),angular.module("ui.grid").directive("uiGridVisible",function(){return function(e,t,r){e.$watch(r.uiGridVisible,function(e){t[e?"removeClass":"addClass"]("ui-grid-invisible")})}}),function(){"use strict";function e(g,p,f){return{templateUrl:"ui-grid/ui-grid",scope:{uiGrid:"="},replace:!0,transclude:!0,controller:"uiGridController",compile:function(){return{post:function(l,s,e,t){var d=t.grid;t.scrollbars=[],d.element=s;var r,i,n=100,o=20,a=0;function u(){d.gridWidth=l.gridWidth=p.elementWidth(s),d.canvasWidth=t.grid.gridWidth,d.gridHeight=l.gridHeight=p.elementHeight(s),d.gridHeight-d.scrollbarHeight<=d.options.rowHeight&&d.options.enableMinHeightCheck&&function(){var e=d.options.minRowsToShow*d.options.rowHeight,t=d.options.showHeader?d.options.headerRowHeight:0,r=d.calcFooterHeight(),i=0;d.options.enableHorizontalScrollbar===f.scrollbars.ALWAYS&&(i=p.getScrollbarWidth());var n=0;if(angular.forEach(d.options.columnDefs,function(e){e.hasOwnProperty("filter")?n<1&&(n=1):e.hasOwnProperty("filters")&&n<e.filters.length&&(n=e.filters.length)}),d.options.enableFiltering&&!n){var o=d.options.columnDefs.length&&d.options.columnDefs.every(function(e){return!1===e.enableFiltering});o||(n=1)}var a=t+e+r+i+n*t;s.css("height",a+"px"),d.gridHeight=l.gridHeight=p.elementHeight(s)}(),d.refreshCanvas(!0)}function c(){s.is(":visible")&&(d.gridWidth=l.gridWidth=p.elementWidth(s),d.gridHeight=l.gridHeight=p.elementHeight(s),d.refreshCanvas(!0))}angular.element(g).on("resize",c),s.on("$destroy",function(){angular.element(g).off("resize",c),r(),i()}),r=l.$watch(function(){return d.hasLeftContainer()},function(e,t){e!==t&&d.refreshCanvas(!0)}),i=l.$watch(function(){return d.hasRightContainer()},function(e,t){e!==t&&d.refreshCanvas(!0)}),u(),d.renderingComplete(),function e(){s[0].offsetWidth<=0&&a<o?(setTimeout(e,n),a++):l.$applyAsync(u)}()}}}}}angular.module("ui.grid").controller("uiGridController",["$scope","$element","$attrs","gridUtil","$q","uiGridConstants","gridClassFactory","$parse","$compile",function(i,e,n,t,o,a,r,l,s){var d,u=this,c=[];function g(e){return e?e.length:0}function p(e,t){e&&e!==t&&(u.grid.options.columnDefs=i.uiGrid.columnDefs,u.grid.callDataChangeCallbacks(a.dataChange.COLUMN,{orderByColumnDefs:!0,preCompileCellTemplates:!0}))}function f(e){var t=[];if(u.grid.options.fastWatch&&(e=angular.isString(i.uiGrid.data)?u.grid.appScope.$eval(i.uiGrid.data):i.uiGrid.data),d=e){var r=u.grid.columns.length>(u.grid.rowHeaderColumns?u.grid.rowHeaderColumns.length:0);!r&&!n.uiGridColumns&&0===u.grid.options.columnDefs.length&&0<e.length&&u.grid.buildColumnDefsFromData(e),!r&&(0<u.grid.options.columnDefs.length||0<e.length)&&t.push(u.grid.buildColumns().then(function(){u.grid.preCompileCellTemplates()}).catch(angular.noop)),o.all(t).then(function(){u.grid.modifyRows(d).then(function(){u.grid.redrawInPlace(!0),i.$evalAsync(function(){u.grid.refreshCanvas(!0),u.grid.callDataChangeCallbacks(a.dataChange.ROW)})}).catch(angular.noop)}).catch(angular.noop)}}u.grid=r.createGrid(i.uiGrid),u.grid.appScope=u.grid.appScope||i.$parent,e.addClass("grid"+u.grid.id),u.grid.rtl="rtl"===t.getStyles(e[0]).direction,i.grid=u.grid,n.uiGridColumns&&c.push(n.$observe("uiGridColumns",function(e){u.grid.options.columnDefs=angular.isString(e)?angular.fromJson(e):e,u.grid.buildColumns().then(function(){u.grid.preCompileCellTemplates(),u.grid.refreshCanvas(!0)}).catch(angular.noop)})),u.grid.options.fastWatch?(u.uiGrid=i.uiGrid,angular.isString(i.uiGrid.data)?(c.push(i.$parent.$watch(i.uiGrid.data,f)),c.push(i.$parent.$watch(function(){return u.grid.appScope[i.uiGrid.data]?u.grid.appScope[i.uiGrid.data].length:void 0},f))):(c.push(i.$parent.$watch(function(){return i.uiGrid.data},f)),c.push(i.$parent.$watch(function(){return g(i.uiGrid.data)},function(){f(i.uiGrid.data)}))),c.push(i.$parent.$watch(function(){return i.uiGrid.columnDefs},p)),c.push(i.$parent.$watch(function(){return g(i.uiGrid.columnDefs)},function(){p(i.uiGrid.columnDefs)}))):(angular.isString(i.uiGrid.data)?c.push(i.$parent.$watchCollection(i.uiGrid.data,f)):c.push(i.$parent.$watchCollection(function(){return i.uiGrid.data},f)),c.push(i.$parent.$watchCollection(function(){return i.uiGrid.columnDefs},p)));var m=i.$watch(function(){return u.grid.styleComputations},function(){u.grid.refreshCanvas(!0)});i.$on("$destroy",function(){c.forEach(function(e){e()}),m()}),u.fireEvent=function(e,t){t=t||{},angular.isUndefined(t.grid)&&(t.grid=u.grid),i.$broadcast(e,t)},u.innerCompile=function(e){s(e)(i)}}]),angular.module("ui.grid").directive("uiGrid",e),e.$inject=["$window","gridUtil","uiGridConstants"]}(),function(){"use strict";angular.module("ui.grid").directive("uiGridPinnedContainer",["gridUtil",function(e){return{restrict:"EA",replace:!0,template:'<div class="ui-grid-pinned-container"><div ui-grid-render-container container-id="side" row-container-name="\'body\'" col-container-name="side" bind-scroll-vertical="true" class="{{ side }} ui-grid-render-container-{{ side }}"></div></div>',scope:{side:"=uiGridPinnedContainer"},require:"^uiGrid",compile:function(){return{post:function(n,t,e,r){var o=r.grid,i=0;function a(){if("left"===n.side||"right"===n.side){for(var e=o.renderContainers[n.side].visibleColumnCache,t=0,r=0;r<e.length;r++){var i=e[r];t+=i.drawnWidth||i.width||0}return t}}t.addClass("ui-grid-pinned-container-"+n.side),"left"!==n.side&&"right"!==n.side||(o.renderContainers[n.side].getViewportWidth=function(){var t=0;this.visibleColumnCache.forEach(function(e){t+=e.drawnWidth});var e=this.getViewportAdjustment();return t+=e.width}),o.renderContainers.body.registerViewportAdjuster(function(e){return i=a(),e.width-=i,e.side=n.side,e}),o.registerStyleComputation({priority:15,func:function(){var e="";return"left"!==n.side&&"right"!==n.side||(i=a(),t.attr("style",null),e+=".grid"+o.id+" .ui-grid-pinned-container-"+n.side+", .grid"+o.id+" .ui-grid-pinned-container-"+n.side+" .ui-grid-render-container-"+n.side+" .ui-grid-viewport { width: "+i+"px; } "),e}})}}}}}])}(),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("en",{headerCell:{aria:{defaultFilterLabel:"Filter for column",removeFilter:"Remove Filter",columnMenuButtonLabel:"Column Menu",column:"Column"},priority:"Priority:",filterLabel:"Filter for column: "},aggregate:{label:"items"},groupPanel:{description:"Drag a column header here and drop it to group by that column."},search:{aria:{selected:"Row selected",notSelected:"Row not selected"},placeholder:"Search...",showingItems:"Showing Items:",selectedItems:"Selected Items:",totalItems:"Total Items:",size:"Page Size:",first:"First Page",next:"Next Page",previous:"Previous Page",last:"Last Page"},menu:{text:"Choose Columns:"},sort:{ascending:"Sort Ascending",descending:"Sort Descending",none:"Sort None",remove:"Remove Sort"},column:{hide:"Hide Column"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Pin Left",pinRight:"Pin Right",unpin:"Unpin"},columnMenu:{close:"Close"},gridMenu:{aria:{buttonLabel:"Grid Menu"},columns:"Columns:",importerTitle:"Import file",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf",exporterAllAsExcel:"Export all data as excel",exporterVisibleAsExcel:"Export visible data as excel",exporterSelectedAsExcel:"Export selected data as excel",clearAllFilters:"Clear all filters"},importer:{noHeaders:"Column names were unable to be derived, does the file have a header?",noObjects:"Objects were not able to be derived, was there data in the file other than headers?",invalidCsv:"File was unable to be processed, is it valid CSV?",invalidJson:"File was unable to be processed, is it valid Json?",jsonNotArray:"Imported json file must contain an array, aborting."},pagination:{aria:{pageToFirst:"Page to first",pageBack:"Page back",pageSelected:"Selected page",pageForward:"Page forward",pageToLast:"Page to last"},sizes:"items per page",totalItems:"items",through:"through",of:"of"},grouping:{group:"Group",ungroup:"Ungroup",aggregate_count:"Agg: Count",aggregate_sum:"Agg: Sum",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Avg",aggregate_remove:"Agg: Remove"},validate:{error:"Error:",minLength:"Value should be at least THRESHOLD characters long.",maxLength:"Value should be at most THRESHOLD characters long.",required:"A value is needed."}}),e}])}]),angular.module("ui.grid").factory("Grid",["$q","$compile","$parse","gridUtil","uiGridConstants","GridOptions","GridColumn","GridRow","GridApi","rowSorter","rowSearcher","GridRenderContainer","$timeout","ScrollEvent",function(S,r,o,m,s,d,u,c,g,p,t,f,i,x){var e=function(e){var r=this;if(void 0===e||void 0===e.id||!e.id)throw new Error("No ID provided. An ID must be given when creating a grid.");if(!/^[_a-zA-Z0-9-]+$/.test(e.id))throw new Error("Grid id '"+e.id+'" is invalid. It must follow CSS selector syntax rules.');function t(e){r.isScrollingVertically=!1,r.api.core.raise.scrollEnd(e),r.scrollDirection=s.scrollDirection.NONE}r.id=e.id,delete e.id,r.options=d.initialize(e),r.appScope=r.options.appScopeProvider,r.headerHeight=r.options.headerRowHeight,r.footerHeight=r.calcFooterHeight(),r.columnFooterHeight=r.calcColumnFooterHeight(),r.rtl=!1,r.gridHeight=0,r.gridWidth=0,r.columnBuilders=[],r.rowBuilders=[],r.rowsProcessors=[],r.columnsProcessors=[],r.styleComputations=[],r.viewportAdjusters=[],r.rowHeaderColumns=[],r.dataChangeCallbacks={},r.verticalScrollSyncCallBackFns={},r.horizontalScrollSyncCallBackFns={},r.renderContainers={},r.renderContainers.body=new f("body",r),r.cellValueGetterCache={},r.getRowTemplateFn=null,r.rows=[],r.columns=[],r.isScrollingVertically=!1,r.isScrollingHorizontally=!1,r.scrollDirection=s.scrollDirection.NONE,r.disableScrolling=!1;var i=m.debounce(t,r.options.scrollDebounce),n=m.debounce(t,0);function o(e){r.isScrollingHorizontally=!1,r.api.core.raise.scrollEnd(e),r.scrollDirection=s.scrollDirection.NONE}var a=m.debounce(o,r.options.scrollDebounce),l=m.debounce(o,0);r.flagScrollingVertically=function(e){r.isScrollingVertically||r.isScrollingHorizontally||r.api.core.raise.scrollBegin(e),r.isScrollingVertically=!0,0!==r.options.scrollDebounce&&e.withDelay?i(e):n(e)},r.flagScrollingHorizontally=function(e){r.isScrollingVertically||r.isScrollingHorizontally||r.api.core.raise.scrollBegin(e),r.isScrollingHorizontally=!0,0!==r.options.scrollDebounce&&e.withDelay?a(e):l(e)},r.scrollbarHeight=0,r.scrollbarWidth=0,r.options.enableHorizontalScrollbar!==s.scrollbars.NEVER&&(r.scrollbarHeight=m.getScrollbarWidth()),r.options.enableVerticalScrollbar!==s.scrollbars.NEVER&&(r.scrollbarWidth=m.getScrollbarWidth()),r.api=new g(r),r.api.registerMethod("core","refresh",this.refresh),r.api.registerMethod("core","queueGridRefresh",this.queueGridRefresh),r.api.registerMethod("core","refreshRows",this.refreshRows),r.api.registerMethod("core","queueRefresh",this.queueRefresh),r.api.registerMethod("core","handleWindowResize",this.handleWindowResize),r.api.registerMethod("core","addRowHeaderColumn",this.addRowHeaderColumn),r.api.registerMethod("core","scrollToIfNecessary",function(e,t){return r.scrollToIfNecessary(e,t)}),r.api.registerMethod("core","scrollTo",function(e,t){return r.scrollTo(e,t)}),r.api.registerMethod("core","registerRowsProcessor",this.registerRowsProcessor),r.api.registerMethod("core","registerColumnsProcessor",this.registerColumnsProcessor),r.api.registerMethod("core","sortHandleNulls",p.handleNulls),r.api.registerEvent("core","sortChanged"),r.api.registerEvent("core","columnVisibilityChanged"),r.api.registerMethod("core","notifyDataChange",this.notifyDataChange),r.api.registerMethod("core","clearAllFilters",this.clearAllFilters),r.registerDataChangeCallback(r.columnRefreshCallback,[s.dataChange.COLUMN]),r.registerDataChangeCallback(r.processRowsCallback,[s.dataChange.EDIT]),r.registerDataChangeCallback(r.updateFooterHeightCallback,[s.dataChange.OPTIONS]),r.registerStyleComputation({priority:10,func:r.getFooterStyles})};e.prototype.calcFooterHeight=function(){if(!this.hasFooter())return 0;var e=0;return this.options.showGridFooter&&(e+=this.options.gridFooterHeight),e+=this.calcColumnFooterHeight()},e.prototype.calcColumnFooterHeight=function(){var e=0;return this.options.showColumnFooter&&(e+=this.options.columnFooterHeight),e},e.prototype.getFooterStyles=function(){var e=".grid"+this.id+" .ui-grid-footer-aggregates-row { height: "+this.options.columnFooterHeight+"px; }";return e+=" .grid"+this.id+" .ui-grid-footer-info { height: "+this.options.gridFooterHeight+"px; }"},e.prototype.hasFooter=function(){return this.options.showGridFooter||this.options.showColumnFooter},e.prototype.isRTL=function(){return this.rtl},e.prototype.registerColumnBuilder=function(e){this.columnBuilders.push(e)},e.prototype.buildColumnDefsFromData=function(e){this.options.columnDefs=m.getColumnsFromData(e,this.options.excludeProperties)},e.prototype.registerRowBuilder=function(e){this.rowBuilders.push(e)},e.prototype.registerDataChangeCallback=function(e,t,r){var i=this,n=m.nextUid();return t||(t=[s.dataChange.ALL]),Array.isArray(t)||m.logError("Expected types to be an array or null in registerDataChangeCallback, value passed was: "+t),this.dataChangeCallbacks[n]={callback:e,types:t,_this:r},function(){delete i.dataChangeCallbacks[n]}},e.prototype.callDataChangeCallbacks=function(r,i){angular.forEach(this.dataChangeCallbacks,function(e,t){-1===e.types.indexOf(s.dataChange.ALL)&&-1===e.types.indexOf(r)&&r!==s.dataChange.ALL||(e._this?e.callback.apply(e._this,this,i):e.callback(this,i))},this)},e.prototype.notifyDataChange=function(e){var t=s.dataChange;e===t.ALL||e===t.COLUMN||e===t.EDIT||e===t.ROW||e===t.OPTIONS?this.callDataChangeCallbacks(e):m.logError("Notified of a data change, but the type was not recognised, so no action taken, type was: "+e)},e.prototype.columnRefreshCallback=function(e,t){e.buildColumns(t),e.queueGridRefresh()},e.prototype.processRowsCallback=function(e){e.queueGridRefresh()},e.prototype.updateFooterHeightCallback=function(e){e.footerHeight=e.calcFooterHeight(),e.columnFooterHeight=e.calcColumnFooterHeight()},e.prototype.getColumn=function(t){var e=this.columns.filter(function(e){return e.colDef.name===t});return 0<e.length?e[0]:null},e.prototype.getColDef=function(t){var e=this.options.columnDefs.filter(function(e){return e.name===t});return 0<e.length?e[0]:null},e.prototype.assignTypes=function(){var n=this;n.options.columnDefs.forEach(function(e,t){if(!e.type){var r=new u(e,t,n),i=0<n.rows.length?n.rows[0]:null;e.type=i?m.guessType(n.getCellValue(i,r)):"string"}})},e.prototype.isRowHeaderColumn=function(e){return-1!==this.rowHeaderColumns.indexOf(e)},e.prototype.addRowHeaderColumn=function(e,t,r){var i=this;void 0===t&&(t=0);var n=new u(e,m.nextUid(),i);n.isRowHeader=!0,i.isRTL()?(i.createRightContainer(),n.renderContainer="right"):(i.createLeftContainer(),n.renderContainer="left"),i.columnBuilders[0](e,n,i.options).then(function(){n.enableFiltering=!1,n.enableSorting=!1,n.enableHiding=!1,n.headerPriority=t,i.rowHeaderColumns.push(n),i.rowHeaderColumns=i.rowHeaderColumns.sort(function(e,t){return e.headerPriority-t.headerPriority}),r||i.buildColumns().then(function(){i.preCompileCellTemplates(),i.queueGridRefresh()}).catch(angular.noop)}).catch(angular.noop)},e.prototype.getOnlyDataColumns=function(){var t=this,r=[];return t.columns.forEach(function(e){-1===t.rowHeaderColumns.indexOf(e)&&r.push(e)}),r},e.prototype.buildColumns=function(e){var t={orderByColumnDefs:!1};angular.extend(t,e);var r,i=this,n=[],o=i.rowHeaderColumns.length;for(r=0;r<i.columns.length;r++)i.getColDef(i.columns[r].name)||(i.columns.splice(r,1),r--);for(var a=i.rowHeaderColumns.length-1;0<=a;a--)i.columns.unshift(i.rowHeaderColumns[a]);if(i.options.columnDefs.forEach(function(t,e){i.preprocessColDef(t);var r=i.getColumn(t.name);r?r.updateColumnDef(t,!1):(r=new u(t,m.nextUid(),i),i.columns.splice(e+o,0,r)),i.columnBuilders.forEach(function(e){n.push(e.call(i,t,r,i.options))})}),t.orderByColumnDefs){var l=i.columns.slice(0),s=Math.min(i.options.columnDefs.length,i.columns.length);for(r=0;r<s;r++)i.columns[r+o].name!==i.options.columnDefs[r].name?l[r+o]=i.getColumn(i.options.columnDefs[r].name):l[r+o]=i.columns[r+o];i.columns.length=0,Array.prototype.splice.apply(i.columns,[0,0].concat(l))}return S.all(n).then(function(){0<i.rows.length&&i.assignTypes(),t.preCompileCellTemplates&&i.preCompileCellTemplates()}).catch(angular.noop)},e.prototype.preCompileCellTemplate=function(e){var t=e.cellTemplate.replace(s.MODEL_COL_FIELD,this.getQualifiedColField(e));t=t.replace(s.COL_FIELD,"grid.getCellValue(row, col)"),e.compiledElementFn=r(t),e.compiledElementFnDefer&&e.compiledElementFnDefer.resolve(e.compiledElementFn)},e.prototype.preCompileCellTemplates=function(){var t=this;t.columns.forEach(function(e){e.cellTemplate?t.preCompileCellTemplate(e):e.cellTemplatePromise&&e.cellTemplatePromise.then(function(){t.preCompileCellTemplate(e)}).catch(angular.noop)})},e.prototype.getQualifiedColField=function(e){var t="row.entity";return e.field===s.ENTITY_BINDING?t:m.preEval(t+"."+e.field)},e.prototype.createLeftContainer=function(){this.hasLeftContainer()||(this.renderContainers.left=new f("left",this,{disableColumnOffset:!0}))},e.prototype.createRightContainer=function(){this.hasRightContainer()||(this.renderContainers.right=new f("right",this,{disableColumnOffset:!0}))},e.prototype.hasLeftContainer=function(){return void 0!==this.renderContainers.left},e.prototype.hasRightContainer=function(){return void 0!==this.renderContainers.right},e.prototype.preprocessColDef=function(e){if(!e.field&&!e.name)throw new Error("colDef.name or colDef.field property is required");if(void 0===e.name&&void 0!==e.field){for(var t=e.field,r=2;this.getColumn(t);)t=e.field+r.toString(),r++;e.name=t}},e.prototype.newInN=function(e,t,r,i){for(var n=[],o=0;o<t.length;o++){for(var a=i?t[o][i]:t[o],l=!1,s=0;s<e.length;s++){var d=r?e[s][r]:e[s];if(this.options.rowEquality(a,d)){l=!0;break}}l||n.push(a)}return n},e.prototype.getRow=function(t,e){var r=this,i=(e=void 0===e?r.rows:e).filter(function(e){return r.options.rowEquality(e.entity,t)});return 0<i.length?i[0]:null},e.prototype.modifyRows=function(e){var n=this,o=n.rows.slice(0),a=n.rowHashMap||n.createRowHashMap(),l=!0;n.rowHashMap=n.createRowHashMap(),n.rows.length=0,e.forEach(function(e,t){var r,i;(i=n.options.enableRowHashing?a.get(e):n.getRow(e,o))&&((r=i).entity=e),r||(r=n.processRowBuilders(new c(e,t,n))),n.rows.push(r),n.rowHashMap.put(e,r),r.isSelected||(l=!1)}),n.selection&&n.rows.length&&(n.selection.selectAll=l),n.assignTypes();var t=S.when(n.processRowsProcessors(n.rows)).then(function(e){return n.setVisibleRows(e)}).catch(angular.noop),r=S.when(n.processColumnsProcessors(n.columns)).then(function(e){return n.setVisibleColumns(e)}).catch(angular.noop);return S.all([t,r])},e.prototype.addRows=function(e){for(var t=this,r=t.rows.length,i=0;i<e.length;i++){var n=t.processRowBuilders(new c(e[i],i+r,t));if(t.options.enableRowHashing){var o=t.rowHashMap.get(n.entity);o&&(o.row=n)}t.rows.push(n)}},e.prototype.processRowBuilders=function(t){var r=this;return r.rowBuilders.forEach(function(e){e.call(r,t,r.options)}),t},e.prototype.registerStyleComputation=function(e){this.styleComputations.push(e)},e.prototype.registerRowsProcessor=function(e,t){if(!angular.isFunction(e))throw"Attempt to register non-function rows processor: "+e;this.rowsProcessors.push({processor:e,priority:t}),this.rowsProcessors.sort(function(e,t){return e.priority-t.priority})},e.prototype.removeRowsProcessor=function(r){var i=-1;this.rowsProcessors.forEach(function(e,t){e.processor===r&&(i=t)}),-1!==i&&this.rowsProcessors.splice(i,1)},e.prototype.processRowsProcessors=function(e){var n=this,t=e.slice(0);if(0===n.rowsProcessors.length)return S.when(t);var o=S.defer();return function t(r,e){var i=n.rowsProcessors[r].processor;return S.when(i.call(n,e,n.columns)).then(function(e){if(!e)throw"Processor at index "+r+" did not return a set of renderable rows";if(!angular.isArray(e))throw"Processor at index "+r+" did not return an array";if(++r<=n.rowsProcessors.length-1)return t(r,e);o.resolve(e)}).catch(function(e){throw e})}(0,t),o.promise},e.prototype.setVisibleRows=function(e){var t=this;for(var r in t.renderContainers){var i=t.renderContainers[r];i.canvasHeightShouldUpdate=!0,void 0===i.visibleRowCache?i.visibleRowCache=[]:i.visibleRowCache.length=0}for(var n=0;n<e.length;n++){var o=e[n],a=void 0!==o.renderContainer&&o.renderContainer?o.renderContainer:"body";o.visible&&t.renderContainers[a].visibleRowCache.push(o)}t.api.core.raise.rowsVisibleChanged(this.api),t.api.core.raise.rowsRendered(this.api)},e.prototype.registerColumnsProcessor=function(e,t){if(!angular.isFunction(e))throw"Attempt to register non-function rows processor: "+e;this.columnsProcessors.push({processor:e,priority:t}),this.columnsProcessors.sort(function(e,t){return e.priority-t.priority})},e.prototype.removeColumnsProcessor=function(e){var t=this.columnsProcessors.indexOf(e);void 0!==t&&void 0!==t&&this.columnsProcessors.splice(t,1)},e.prototype.processColumnsProcessors=function(e){var n=this,o=e.slice(0);if(0===n.columnsProcessors.length)return S.when(o);var a=S.defer();return function t(r,e){var i=n.columnsProcessors[r].processor;return S.when(i.call(n,e,n.rows)).then(function(e){if(!e)throw"Processor at index "+r+" did not return a set of renderable rows";if(!angular.isArray(e))throw"Processor at index "+r+" did not return an array";if(++r<=n.columnsProcessors.length-1)return t(r,o);a.resolve(o)}).catch(angular.noop)}(0,o),a.promise},e.prototype.setVisibleColumns=function(e){for(var t in this.renderContainers)this.renderContainers[t].visibleColumnCache.length=0;for(var r=0;r<e.length;r++){var i=e[r];i.visible&&(void 0!==i.renderContainer&&i.renderContainer?this.renderContainers[i.renderContainer].visibleColumnCache.push(i):this.renderContainers.body.visibleColumnCache.push(i))}},e.prototype.handleWindowResize=function(e){var t=this;return t.gridWidth=m.elementWidth(t.element),t.gridHeight=m.elementHeight(t.element),t.queueRefresh()},e.prototype.queueRefresh=function(){var e=this;return e.refreshCanceller&&i.cancel(e.refreshCanceller),e.refreshCanceller=i(function(){e.refreshCanvas(!0)}),e.refreshCanceller.then(function(){e.refreshCanceller=null}).catch(angular.noop),e.refreshCanceller},e.prototype.queueGridRefresh=function(){var e=this;return e.gridRefreshCanceller&&i.cancel(e.gridRefreshCanceller),e.gridRefreshCanceller=i(function(){e.refresh(!0)}),e.gridRefreshCanceller.then(function(){e.gridRefreshCanceller=null}).catch(angular.noop),e.gridRefreshCanceller},e.prototype.updateCanvasHeight=function(){for(var e in this.renderContainers)this.renderContainers.hasOwnProperty(e)&&(this.renderContainers[e].canvasHeightShouldUpdate=!0)},e.prototype.buildStyles=function(){var r=this;r.customStyles="",r.styleComputations.sort(function(e,t){return null===e.priority?1:null===t.priority?-1:null===e.priority&&null===t.priority?0:e.priority-t.priority}).forEach(function(e){var t=e.func.call(r);angular.isString(t)&&(r.customStyles+="\n"+t)})},e.prototype.minColumnsToRender=function(){var n=this,o=this.getViewportWidth(),a=0,l=0;return n.columns.forEach(function(e,t){if(l<o)l+=e.drawnWidth,a++;else{for(var r=0,i=t;t-a<=i;i--)r+=n.columns[i].drawnWidth;r<o&&a++}}),a},e.prototype.getBodyHeight=function(){return this.getViewportHeight()},e.prototype.getViewportHeight=function(){var e=this.gridHeight-this.headerHeight-this.footerHeight;return e+=this.getViewportAdjustment().height},e.prototype.getViewportWidth=function(){var e=this.gridWidth;return e+=this.getViewportAdjustment().width},e.prototype.getHeaderViewportWidth=function(){return this.getViewportWidth()},e.prototype.addVerticalScrollSync=function(e,t){this.verticalScrollSyncCallBackFns[e]=t},e.prototype.addHorizontalScrollSync=function(e,t){this.horizontalScrollSyncCallBackFns[e]=t},e.prototype.scrollContainers=function(e,t){if(t.y){var r=["body","left","right"];this.flagScrollingVertically(t),"body"===e?r=["left","right"]:"left"===e?r=["body","right"]:"right"===e&&(r=["body","left"]);for(var i=0;i<r.length;i++){var n=r[i];this.verticalScrollSyncCallBackFns[n]&&this.verticalScrollSyncCallBackFns[n](t)}}if(t.x){var o=["body","bodyheader","bodyfooter"];this.flagScrollingHorizontally(t),"body"===e&&(o=["bodyheader","bodyfooter"]);for(var a=0;a<o.length;a++){var l=o[a];this.horizontalScrollSyncCallBackFns[l]&&this.horizontalScrollSyncCallBackFns[l](t)}}},e.prototype.registerViewportAdjuster=function(e){this.viewportAdjusters.push(e)},e.prototype.removeViewportAdjuster=function(e){var t=this.viewportAdjusters.indexOf(e);void 0!==t&&void 0!==t&&this.viewportAdjusters.splice(t,1)},e.prototype.getViewportAdjustment=function(){var t={height:0,width:0};return this.viewportAdjusters.forEach(function(e){t=e.call(this,t)}),t},e.prototype.getVisibleRowCount=function(){return this.renderContainers.body.visibleRowCache.length},e.prototype.getVisibleRows=function(){return this.renderContainers.body.visibleRowCache},e.prototype.getVisibleColumnCount=function(){return this.renderContainers.body.visibleColumnCache.length},e.prototype.searchRows=function(e){return t.search(this,e,this.columns)},e.prototype.sortByColumn=function(e){return p.sort(this,e,this.columns)},e.prototype.getCellValue=function(e,t){return void 0!==e.entity["$$"+t.uid]?e.entity["$$"+t.uid].rendered:this.options.flatEntityAccess&&void 0!==t.field?e.entity[t.field]:(t.cellValueGetterCache||(t.cellValueGetterCache=o(e.getEntityQualifiedColField(t))),t.cellValueGetterCache(e))},e.prototype.getCellDisplayValue=function(e,t){if(!t.cellDisplayGetterCache){var r=t.cellFilter?" | "+t.cellFilter:"";if(void 0!==e.entity["$$"+t.uid])t.cellDisplayGetterCache=o(e.entity["$$"+t.uid].rendered+r);else if(this.options.flatEntityAccess&&void 0!==t.field){var i=t.field.replace(/(')|(\\)/g,"\\$&");t.cellDisplayGetterCache=o("entity['"+i+"']"+r)}else t.cellDisplayGetterCache=o(e.getEntityQualifiedColField(t)+r)}var n=angular.extend({},e,{col:t});return t.cellDisplayGetterCache(n)},e.prototype.getNextColumnSortPriority=function(){var t=0;return this.columns.forEach(function(e){e.sort&&void 0!==e.sort.priority&&e.sort.priority>=t&&(t=e.sort.priority+1)}),t},e.prototype.resetColumnSorting=function(t){this.columns.forEach(function(e){e===t||e.suppressRemoveSort||(e.sort={})})},e.prototype.getColumnSorting=function(){var t=[];return this.columns.slice(0).sort(p.prioritySort).forEach(function(e){e.sort&&void 0!==e.sort.direction&&e.sort.direction&&(e.sort.direction===s.ASC||e.sort.direction===s.DESC)&&t.push(e)}),t},e.prototype.sortColumn=function(e,t,r){var i=this,n=null;if(void 0===e||!e)throw new Error("No column parameter provided");if("boolean"==typeof t?r=t:n=t,r?void 0===e.sort.priority&&(e.sort.priority=i.getNextColumnSortPriority()):(i.resetColumnSorting(e),e.sort.priority=void 0,e.sort.priority=i.getNextColumnSortPriority()),n)e.sort.direction=n;else{var o=e.sortDirectionCycle.indexOf(e.sort&&e.sort.direction?e.sort.direction:null);o=(o+1)%e.sortDirectionCycle.length,e.colDef&&e.suppressRemoveSort&&!e.sortDirectionCycle[o]&&(o=(o+1)%e.sortDirectionCycle.length),e.sortDirectionCycle[o]?e.sort.direction=e.sortDirectionCycle[o]:a(e,i)}return i.api.core.raise.sortChanged(i,i.getColumnSorting()),S.when(e)};var a=function(t,e){e.columns.forEach(function(e){e.sort&&void 0!==e.sort.priority&&e.sort.priority>t.sort.priority&&(e.sort.priority-=1)}),t.sort={}};function l(e,t){return e||0<t?t:null}function n(e,t){var r=e/t;return r<=1?r:1}function E(e,t,r){if(n(e,t)!==r)return{percentage:n(e,t)}}function A(e,t,r){var i=e/t;if((i=1<i?1:i)!==r)return{percentage:i}}function h(){}return e.prototype.renderingComplete=function(){angular.isFunction(this.options.onRegisterApi)&&this.options.onRegisterApi(this.api),this.api.core.raise.renderingComplete(this.api)},e.prototype.createRowHashMap=function(){var e=new h;return e.grid=this,e},e.prototype.refresh=function(e){var t=this,r=t.processRowsProcessors(t.rows).then(function(e){t.setVisibleRows(e)}).catch(angular.noop),i=t.processColumnsProcessors(t.columns).then(function(e){t.setVisibleColumns(e)}).catch(angular.noop);return S.all([r,i]).then(function(){t.refreshCanvas(!0),t.redrawInPlace(e)}).catch(angular.noop)},e.prototype.refreshRows=function(){var t=this;return t.processRowsProcessors(t.rows).then(function(e){t.setVisibleRows(e),t.redrawInPlace(),t.refreshCanvas(!0)}).catch(angular.noop)},e.prototype.refreshCanvas=function(c){var g=this,p=S.defer(),f=[];for(var e in g.renderContainers)if(g.renderContainers.hasOwnProperty(e)){var t=g.renderContainers[e];if(null===t.canvasWidth||isNaN(t.canvasWidth))continue;(t.header||t.headerCanvas)&&(t.explicitHeaderHeight=t.explicitHeaderHeight||null,t.explicitHeaderCanvasHeight=t.explicitHeaderCanvasHeight||null,f.push(t))}return c&&g.buildStyles(),0<f.length?i(function(){var e,t,r=!1,i=0,n=0,o=function(e,t){return e!==t&&(r=!0),t};for(e=0;e<f.length;e++)if(null!==(t=f[e]).canvasWidth&&!isNaN(t.canvasWidth)){if(t.header){var a=t.headerHeight=o(t.headerHeight,m.outerElementHeight(t.header)),l=m.getBorderSize(t.header,"top"),s=m.getBorderSize(t.header,"bottom"),d=parseInt(a-l-s,10);d=d<0?0:d,t.innerHeaderHeight=d,!t.explicitHeaderHeight&&i<d&&(i=d)}if(t.headerCanvas){var u=t.headerCanvasHeight=o(t.headerCanvasHeight,parseInt(m.outerElementHeight(t.headerCanvas),10));!t.explicitHeaderCanvasHeight&&n<u&&(n=u)}}for(e=0;e<f.length;e++)t=f[e],0<i&&void 0!==t.headerHeight&&null!==t.headerHeight&&(t.explicitHeaderHeight||t.headerHeight<i)&&(t.explicitHeaderHeight=o(t.explicitHeaderHeight,i)),0<n&&void 0!==t.headerCanvasHeight&&null!==t.headerCanvasHeight&&(t.explicitHeaderCanvasHeight||t.headerCanvasHeight<n)&&(t.explicitHeaderCanvasHeight=o(t.explicitHeaderCanvasHeight,n));c&&r&&g.buildStyles(),p.resolve()}):i(function(){p.resolve()}),p.promise},e.prototype.redrawInPlace=function(e){for(var t in this.renderContainers){var r=this.renderContainers[t],i=l(e,r.prevScrollTop),n=l(e,r.prevScrollLeft),o=e||0<i?null:r.prevScrolltopPercentage,a=e||0<n?null:r.prevScrollleftPercentage;r.adjustRows(i,o),r.adjustColumns(n,a)}},e.prototype.hasLeftContainerColumns=function(){return this.hasLeftContainer()&&0<this.renderContainers.left.renderedColumns.length},e.prototype.hasRightContainerColumns=function(){return this.hasRightContainer()&&0<this.renderContainers.right.renderedColumns.length},e.prototype.scrollToIfNecessary=function(e,t){var r=this,i=new x(r,"uiGrid.scrollToIfNecessary"),n=r.renderContainers.body.visibleRowCache,o=r.renderContainers.body.visibleColumnCache,a=r.renderContainers.body.prevScrollTop+r.headerHeight;a=a<0?0:a;var l=r.renderContainers.body.prevScrollLeft,s=r.renderContainers.body.prevScrollTop+r.gridHeight-r.renderContainers.body.headerHeight-r.footerHeight-r.scrollbarHeight,d=r.renderContainers.body.prevScrollLeft+Math.ceil(r.renderContainers.body.getViewportWidth());if(null!==e){var u,c=n.indexOf(e),g=r.renderContainers.body.getCanvasHeight()-r.renderContainers.body.getViewportHeight(),p=c*r.options.rowHeight+r.headerHeight;(p=p<0?0:p)<Math.floor(a)?(u=r.renderContainers.body.prevScrollTop-(a-p),t&&t.colDef&&t.colDef.enableCellEditOnFocus&&(u=u-r.footerHeight-r.scrollbarHeight),i.y=E(u,g,r.renderContainers.body.prevScrolltopPercentage)):p>Math.ceil(s)&&(u=p-s+r.renderContainers.body.prevScrollTop,i.y=E(u,g,r.renderContainers.body.prevScrolltopPercentage))}if(null!==t){for(var f=o.indexOf(t),m=r.renderContainers.body.getCanvasWidth()-r.renderContainers.body.getViewportWidth(),h=0,v=0;v<f;v++)h+=o[v].drawnWidth;var C,w=(h=h<0?0:h)+t.drawnWidth;w=w<0?0:w,h<l?(C=r.renderContainers.body.prevScrollLeft-(l-h),i.x=A(C,m,r.renderContainers.body.prevScrollleftPercentage)):d<w&&(C=w-d+r.renderContainers.body.prevScrollLeft,i.x=A(C,m,r.renderContainers.body.prevScrollleftPercentage))}var b=S.defer();if(i.y||i.x){i.withDelay=!1,r.scrollContainers("",i);var y=r.api.core.on.scrollEnd(null,function(){b.resolve(i),y()})}else b.resolve();return b.promise},e.prototype.scrollTo=function(e,t){var r=null,i=null;return null!=e&&(r=this.getRow(e)),null!=t&&(i=this.getColumn(t.name?t.name:t.field)),this.scrollToIfNecessary(r,i)},e.prototype.clearAllFilters=function(e,t,r){if(void 0===e&&(e=!0),void 0===t&&(t=!1),void 0===r&&(r=!1),this.columns.forEach(function(e){e.filters.forEach(function(e){e.term=void 0,t&&(e.condition=void 0),r&&(e.flags=void 0)})}),e)return this.refreshRows()},h.prototype={put:function(e,t){this[this.grid.options.rowIdentity(e)]=t},get:function(e){return this[this.grid.options.rowIdentity(e)]},remove:function(e){var t=this[e=this.grid.options.rowIdentity(e)];return delete this[e],t}},e}]),angular.module("ui.grid").factory("GridApi",["$q","$rootScope","gridUtil","uiGridConstants","GridRow",function(e,t,d,r,i){var n=function(e){this.grid=e,this.listeners=[],this.registerEvent("core","renderingComplete"),this.registerEvent("core","filterChanged"),this.registerMethod("core","setRowInvisible",i.prototype.setRowInvisible),this.registerMethod("core","clearRowInvisible",i.prototype.clearRowInvisible),this.registerMethod("core","getVisibleRows",this.grid.getVisibleRows),this.registerEvent("core","rowsVisibleChanged"),this.registerEvent("core","rowsRendered"),this.registerEvent("core","scrollBegin"),this.registerEvent("core","scrollEnd"),this.registerEvent("core","canvasHeightChanged"),this.registerEvent("core","gridDimensionChanged")};function u(e,r,i,n){return t.$on(e,function(e){var t=Array.prototype.slice.call(arguments);t.splice(0,1),r.apply(n||i.api,t)})}return n.prototype.suppressEvents=function(e,t){var r=this,i=angular.isArray(e)?e:[e],n=r.listeners.filter(function(t){return i.some(function(e){return t.handler===e})});n.forEach(function(e){e.dereg()}),t(),n.forEach(function(e){e.dereg=u(e.eventId,e.handler,r.grid,e._this)})},n.prototype.registerEvent=function(o,a){var l=this;l[o]||(l[o]={});var e=l[o];e.on||(e.on={},e.raise={});var s=l.grid.id+o+a;e.raise[a]=function(){t.$emit.apply(t,[s].concat(Array.prototype.slice.call(arguments)))},e.on[a]=function(e,t,r){if(null===e||void 0!==e.$on){var i={handler:t,dereg:u(s,t,l.grid,r),eventId:s,scope:e,_this:r};l.listeners.push(i);var n=function(){i.dereg();var e=l.listeners.indexOf(i);l.listeners.splice(e,1)};return e&&e.$on("$destroy",function(){n()}),n}d.logError("asked to listen on "+o+".on."+a+" but scope wasn't passed in the input parameters.  It is legitimate to pass null, but you've passed something else, so you probably forgot to provide scope rather than did it deliberately, not registering")}},n.prototype.registerEventsFromObject=function(e){var r=this,i=[];angular.forEach(e,function(e,t){var r={name:t,events:[]};angular.forEach(e,function(e,t){r.events.push(t)}),i.push(r)}),i.forEach(function(t){t.events.forEach(function(e){r.registerEvent(t.name,e)})})},n.prototype.registerMethod=function(e,t,r,i){this[e]||(this[e]={}),this[e][t]=d.createBoundedWrapper(i||this.grid,r)},n.prototype.registerMethodsFromObject=function(e,r){var i=this,n=[];angular.forEach(e,function(e,t){var r={name:t,methods:[]};angular.forEach(e,function(e,t){r.methods.push({name:t,fn:e})}),n.push(r)}),n.forEach(function(t){t.methods.forEach(function(e){i.registerMethod(t.name,e.name,e.fn,r)})})},n}]),angular.module("ui.grid").factory("GridColumn",["gridUtil","uiGridConstants","i18nService",function(d,u,e){function t(e,t,r){var n=this;n.grid=r,n.uid=t,n.updateColumnDef(e,!0),n.aggregationValue=void 0,n.updateAggregationValue=function(){if(n.aggregationType){var t=0,e=n.grid.getVisibleRows(),r=function(){var i=[];return e.forEach(function(e){var t=n.grid.getCellValue(e,n),r=Number(t);isNaN(r)||i.push(r)}),i};angular.isFunction(n.aggregationType)?n.aggregationValue=n.aggregationType(e,n):n.aggregationType===u.aggregationTypes.count?n.aggregationValue=n.grid.getVisibleRowCount():n.aggregationType===u.aggregationTypes.sum?(r().forEach(function(e){t+=e}),n.aggregationValue=t):n.aggregationType===u.aggregationTypes.avg?(r().forEach(function(e){t+=e}),t/=r().length,n.aggregationValue=t):n.aggregationType===u.aggregationTypes.min?n.aggregationValue=Math.min.apply(null,r()):n.aggregationType===u.aggregationTypes.max?n.aggregationValue=Math.max.apply(null,r()):n.aggregationValue=" "}else n.aggregationValue=void 0},this.getAggregationValue=function(){return n.aggregationValue}}function c(e){return void 0===e.displayName?d.readableColumnName(e.name):e.displayName}return t.prototype.hideColumn=function(){this.colDef.visible=!1},t.prototype.setPropertyOrDefault=function(e,t,r){var i=this;void 0!==e[t]&&e[t]?i[t]=e[t]:void 0!==i[t]?i[t]=i[t]:i[t]=r||{}},t.prototype.updateColumnDef=function(i,e){var n=this;if(void 0===(n.colDef=i).name)throw new Error("colDef.name is required for column at index "+n.grid.options.columnDefs.indexOf(i));if(n.displayName=c(i),!angular.isNumber(n.width)||!n.hasCustomWidth||i.allowCustomWidthOverride){var t=i.width,r="Cannot parse column width '"+t+"' for column named '"+i.name+"'";if(n.hasCustomWidth=!1,angular.isString(t)||angular.isNumber(t))if(angular.isString(t))if(d.endsWith(t,"%")){var o=t.replace(/%/g,""),a=parseInt(o,10);if(isNaN(a))throw new Error(r);n.width=t}else if(t.match(/^(\d+)$/))n.width=parseInt(t.match(/^(\d+)$/)[1],10);else{if(!t.match(/^\*+$/))throw new Error(r);n.width=t}else n.width=t;else n.width="*"}function l(e){return angular.isString(e)||angular.isNumber(e)}["minWidth","maxWidth"].forEach(function(e){var t=i[e],r="Cannot parse column "+e+" '"+t+"' for column named '"+i.name+"'";if("minWidth"===e&&!l(t)&&angular.isDefined(n.grid.options.minimumColumnSize)&&(t=n.grid.options.minimumColumnSize),l(t))if(angular.isString(t)){if(!t.match(/^(\d+)$/))throw new Error(r);n[e]=parseInt(t.match(/^(\d+)$/)[1],10)}else n[e]=t;else n[e]="minWidth"===e?30:9e3}),n.field=void 0===i.field?i.name:i.field,"string"!=typeof n.field&&d.logError("Field is not a string, this is likely to break the code, Field is: "+n.field),n.name=i.name,n.displayName=c(i),n.aggregationType=angular.isDefined(i.aggregationType)?i.aggregationType:null,n.footerCellTemplate=angular.isDefined(i.footerCellTemplate)?i.footerCellTemplate:null,void 0===i.cellTooltip||!1===i.cellTooltip?n.cellTooltip=!1:!0===i.cellTooltip?n.cellTooltip=function(e,t){return n.grid.getCellValue(e,t)}:"function"==typeof i.cellTooltip?n.cellTooltip=i.cellTooltip:n.cellTooltip=function(e,t){return t.colDef.cellTooltip},void 0===i.headerTooltip||!1===i.headerTooltip?n.headerTooltip=!1:!0===i.headerTooltip?n.headerTooltip=function(e){return e.displayName}:"function"==typeof i.headerTooltip?n.headerTooltip=i.headerTooltip:n.headerTooltip=function(e){return e.colDef.headerTooltip},n.footerCellClass=i.footerCellClass,n.cellClass=i.cellClass,n.headerCellClass=i.headerCellClass,n.cellFilter=i.cellFilter?i.cellFilter:"",n.sortCellFiltered=!!i.sortCellFiltered,n.filterCellFiltered=!!i.filterCellFiltered,n.headerCellFilter=i.headerCellFilter?i.headerCellFilter:"",n.footerCellFilter=i.footerCellFilter?i.footerCellFilter:"",n.visible=d.isNullOrUndefined(i.visible)||i.visible,n.headerClass=i.headerClass,n.enableSorting=void 0!==i.enableSorting?i.enableSorting:n.grid.options.enableSorting,n.sortingAlgorithm=i.sortingAlgorithm,n.sortDirectionCycle=void 0!==i.sortDirectionCycle?i.sortDirectionCycle:[null,u.ASC,u.DESC],void 0===n.suppressRemoveSort&&(n.suppressRemoveSort=void 0!==i.suppressRemoveSort&&i.suppressRemoveSort),n.enableFiltering=void 0===i.enableFiltering||i.enableFiltering,n.filterContainer=void 0!==i.filterContainer?i.filterContainer:n.grid.options.filterContainer,n.setPropertyOrDefault(i,"menuItems",[]),e&&n.setPropertyOrDefault(i,"sort"),n.setPropertyOrDefault(i,"defaultSort");var s=[];i.filter?s.push(i.filter):i.filters?s=i.filters:s.push({}),e?(n.setPropertyOrDefault(i,"filter"),n.setPropertyOrDefault(i,"extraStyle"),n.setPropertyOrDefault(i,"filters",s)):n.filters.length===s.length&&n.filters.forEach(function(e,t){void 0!==s[t].placeholder&&(e.placeholder=s[t].placeholder),void 0!==s[t].ariaLabel&&(e.ariaLabel=s[t].ariaLabel),void 0!==s[t].flags&&(e.flags=s[t].flags),void 0!==s[t].type&&(e.type=s[t].type),void 0!==s[t].selectOptions&&(e.selectOptions=s[t].selectOptions)})},t.prototype.unsort=function(){var t=this.sort.priority;this.grid.columns.forEach(function(e){e.sort&&void 0!==e.sort.priority&&e.sort.priority>t&&(e.sort.priority-=1)}),this.sort={},this.grid.api.core.raise.sortChanged(this.grid,this.grid.getColumnSorting())},t.prototype.getColClass=function(e){var t=u.COL_CLASS_PREFIX+this.uid;return e?"."+t:t},t.prototype.isPinnedLeft=function(){return"left"===this.renderContainer},t.prototype.isPinnedRight=function(){return"right"===this.renderContainer},t.prototype.getColClassDefinition=function(){return" .grid"+this.grid.id+" "+this.getColClass(!0)+" { min-width: "+this.drawnWidth+"px; max-width: "+this.drawnWidth+"px; }"},t.prototype.getRenderContainer=function(){var e=this.renderContainer;return null!==e&&""!==e&&void 0!==e||(e="body"),this.grid.renderContainers[e]},t.prototype.showColumn=function(){this.colDef.visible=!0},t.prototype.getAggregationText=function(){if(this.colDef.aggregationHideLabel)return"";if(this.colDef.aggregationLabel)return this.colDef.aggregationLabel;switch(this.colDef.aggregationType){case u.aggregationTypes.count:return e.getSafeText("aggregation.count");case u.aggregationTypes.sum:return e.getSafeText("aggregation.sum");case u.aggregationTypes.avg:return e.getSafeText("aggregation.avg");case u.aggregationTypes.min:return e.getSafeText("aggregation.min");case u.aggregationTypes.max:return e.getSafeText("aggregation.max");default:return""}},t.prototype.getCellTemplate=function(){return this.cellTemplatePromise},t.prototype.getCompiledElementFn=function(){return this.compiledElementFnDefer.promise},t}]),angular.module("ui.grid").factory("GridOptions",["gridUtil","uiGridConstants",function(t,r){return{initialize:function(e){return e.onRegisterApi=e.onRegisterApi||angular.noop(),e.data=e.data||[],e.columnDefs=e.columnDefs||[],e.excludeProperties=e.excludeProperties||["$$hashKey"],e.enableRowHashing=!1!==e.enableRowHashing,e.rowIdentity=e.rowIdentity||function(e){return t.hashKey(e)},e.getRowIdentity=e.getRowIdentity||function(e){return e.$$hashKey},e.flatEntityAccess=!0===e.flatEntityAccess,e.showHeader=void 0===e.showHeader||e.showHeader,e.showHeader?e.headerRowHeight=void 0!==e.headerRowHeight?e.headerRowHeight:30:e.headerRowHeight=0,"string"==typeof e.rowHeight?e.rowHeight=parseInt(e.rowHeight)||30:e.rowHeight=e.rowHeight||30,e.minRowsToShow=void 0!==e.minRowsToShow?e.minRowsToShow:10,e.showGridFooter=!0===e.showGridFooter,e.showColumnFooter=!0===e.showColumnFooter,e.columnFooterHeight=void 0!==e.columnFooterHeight?e.columnFooterHeight:30,e.gridFooterHeight=void 0!==e.gridFooterHeight?e.gridFooterHeight:30,e.columnWidth=void 0!==e.columnWidth?e.columnWidth:50,e.maxVisibleColumnCount=void 0!==e.maxVisibleColumnCount?e.maxVisibleColumnCount:200,e.virtualizationThreshold=void 0!==e.virtualizationThreshold?e.virtualizationThreshold:20,e.columnVirtualizationThreshold=void 0!==e.columnVirtualizationThreshold?e.columnVirtualizationThreshold:10,e.excessRows=void 0!==e.excessRows?e.excessRows:4,e.scrollThreshold=void 0!==e.scrollThreshold?e.scrollThreshold:4,e.excessColumns=void 0!==e.excessColumns?e.excessColumns:4,e.aggregationCalcThrottle=void 0!==e.aggregationCalcThrottle?e.aggregationCalcThrottle:500,e.wheelScrollThrottle=void 0!==e.wheelScrollThrottle?e.wheelScrollThrottle:70,e.scrollDebounce=void 0!==e.scrollDebounce?e.scrollDebounce:300,e.enableSorting=!1!==e.enableSorting,e.enableFiltering=!0===e.enableFiltering,e.filterContainer=void 0!==e.filterContainer?e.filterContainer:"headerCell",e.enableColumnMenus=!1!==e.enableColumnMenus,e.enableVerticalScrollbar=void 0!==e.enableVerticalScrollbar?e.enableVerticalScrollbar:r.scrollbars.ALWAYS,e.enableHorizontalScrollbar=void 0!==e.enableHorizontalScrollbar?e.enableHorizontalScrollbar:r.scrollbars.ALWAYS,e.enableMinHeightCheck=!1!==e.enableMinHeightCheck,e.minimumColumnSize=void 0!==e.minimumColumnSize?e.minimumColumnSize:30,e.rowEquality=e.rowEquality||function(e,t){return e===t},e.headerTemplate=e.headerTemplate||null,e.footerTemplate=e.footerTemplate||"ui-grid/ui-grid-footer",e.gridFooterTemplate=e.gridFooterTemplate||"ui-grid/ui-grid-grid-footer",e.rowTemplate=e.rowTemplate||"ui-grid/ui-grid-row",e.gridMenuTemplate=e.gridMenuTemplate||"ui-grid/uiGridMenu",e.menuButtonTemplate=e.menuButtonTemplate||"ui-grid/ui-grid-menu-button",e.menuItemTemplate=e.menuItemTemplate||"ui-grid/uiGridMenuItem",e.appScopeProvider=e.appScopeProvider||null,e}}}]),angular.module("ui.grid").factory("GridRenderContainer",["gridUtil","uiGridConstants",function(b,n){function e(e,t,r){var i=this;i.name=e,i.grid=t,i.visibleRowCache=[],i.visibleColumnCache=[],i.renderedRows=[],i.renderedColumns=[],i.prevScrollTop=0,i.prevScrolltopPercentage=0,i.prevRowScrollIndex=0,i.prevScrollLeft=0,i.prevScrollleftPercentage=0,i.prevColumnScrollIndex=0,i.columnStyles="",i.viewportAdjusters=[],i.hasHScrollbar=!1,i.hasVScrollbar=!1,i.canvasHeightShouldUpdate=!0,i.$$canvasHeight=0,r&&angular.isObject(r)&&angular.extend(i,r),t.registerStyleComputation({priority:5,func:function(){return i.updateColumnWidths(),i.columnStyles}})}return e.prototype.reset=function(){this.visibleColumnCache.length=0,this.visibleRowCache.length=0,this.renderedRows.length=0,this.renderedColumns.length=0},e.prototype.containsColumn=function(e){return-1!==this.visibleColumnCache.indexOf(e)},e.prototype.minRowsToRender=function(){for(var e=0,t=0,r=this.getViewportHeight(),i=this.visibleRowCache.length-1;t<r&&0<=i;i--)t+=this.visibleRowCache[i].height,e++;return e},e.prototype.minColumnsToRender=function(){for(var e=this.getViewportWidth(),t=0,r=0,i=0;i<this.visibleColumnCache.length;i++){var n=this.visibleColumnCache[i];if(r<e)r+=n.drawnWidth?n.drawnWidth:0,t++;else{for(var o=0,a=i;i-t<=a;a--)o+=this.visibleColumnCache[a].drawnWidth?this.visibleColumnCache[a].drawnWidth:0;o<e&&t++}}return t},e.prototype.getVisibleRowCount=function(){return this.visibleRowCache.length},e.prototype.registerViewportAdjuster=function(e){this.viewportAdjusters.push(e)},e.prototype.removeViewportAdjuster=function(e){var t=this.viewportAdjusters.indexOf(e);-1<t&&this.viewportAdjusters.splice(t,1)},e.prototype.getViewportAdjustment=function(){var t={height:0,width:0};return this.viewportAdjusters.forEach(function(e){t=e.call(this,t)}),t},e.prototype.getMargin=function(r){var i=0;return this.viewportAdjusters.forEach(function(e){var t=e.call(this,{height:0,width:0});t.side&&t.side===r&&(i+=-1*t.width)}),i},e.prototype.getViewportHeight=function(){var e=this,t=e.headerHeight?e.headerHeight:e.grid.headerHeight,r=e.grid.gridHeight-t-e.grid.footerHeight;return r+=e.getViewportAdjustment().height},e.prototype.getViewportWidth=function(){var e=this.grid.gridWidth;return e+=this.getViewportAdjustment().width},e.prototype.getHeaderViewportWidth=function(){return this.getViewportWidth()},e.prototype.getCanvasHeight=function(){var t=this;if(!t.canvasHeightShouldUpdate)return t.$$canvasHeight;var e=t.$$canvasHeight;return t.$$canvasHeight=0,t.visibleRowCache.forEach(function(e){t.$$canvasHeight+=e.height}),t.canvasHeightShouldUpdate=!1,t.grid.api.core.raise.canvasHeightChanged(e,t.$$canvasHeight),t.$$canvasHeight},e.prototype.getVerticalScrollLength=function(){return this.getCanvasHeight()-this.getViewportHeight()+this.grid.scrollbarHeight!==0?this.getCanvasHeight()-this.getViewportHeight()+this.grid.scrollbarHeight:-1},e.prototype.getHorizontalScrollLength=function(){return this.getCanvasWidth()-this.getViewportWidth()+this.grid.scrollbarWidth!==0?this.getCanvasWidth()-this.getViewportWidth()+this.grid.scrollbarWidth:-1},e.prototype.getCanvasWidth=function(){return this.canvasWidth},e.prototype.setRenderedRows=function(e){this.renderedRows.length=e.length;for(var t=0;t<e.length;t++)this.renderedRows[t]=e[t]},e.prototype.setRenderedColumns=function(e){this.renderedColumns.length=e.length;for(var t=0;t<e.length;t++)this.renderedColumns[t]=e[t];this.updateColumnOffset()},e.prototype.updateColumnOffset=function(){for(var e=0,t=0;t<this.currentFirstColumn;t++)e+=this.visibleColumnCache[t].drawnWidth;this.columnOffset=e},e.prototype.scrollVertical=function(e){var t=-1;if(e!==this.prevScrollTop){var r=e-this.prevScrollTop;return 0<r&&(this.grid.scrollDirection=n.scrollDirection.DOWN),r<0&&(this.grid.scrollDirection=n.scrollDirection.UP),1<(t=e/this.getVerticalScrollLength())&&(t=1),t<0&&(t=0),this.adjustScrollVertical(e,t),t}},e.prototype.scrollHorizontal=function(e){var t=-1;if(e!==this.prevScrollLeft){var r=e-this.prevScrollLeft;0<r&&(this.grid.scrollDirection=n.scrollDirection.RIGHT),r<0&&(this.grid.scrollDirection=n.scrollDirection.LEFT);var i=this.getHorizontalScrollLength();return t=0!==i?e/i:0,this.adjustScrollHorizontal(e,t),t}},e.prototype.adjustScrollVertical=function(e,t,r){(this.prevScrollTop!==e||r)&&(void 0!==e&&null!=e||(e=(this.getCanvasHeight()-this.getViewportHeight())*t),this.adjustRows(e,t,!1),this.prevScrollTop=e,this.prevScrolltopPercentage=t,this.grid.queueRefresh())},e.prototype.adjustScrollHorizontal=function(e,t,r){(this.prevScrollLeft!==e||r)&&(void 0!==e&&null!=e||(e=(this.getCanvasWidth()-this.getViewportWidth())*t),this.adjustColumns(e,t),this.prevScrollLeft=e,this.prevScrollleftPercentage=t,this.grid.queueRefresh())},e.prototype.adjustRows=function(e,t,r){var i=this,n=i.minRowsToRender(),o=i.visibleRowCache,a=o.length-n;null==t&&e&&(t=e/i.getVerticalScrollLength());var l=Math.ceil(Math.min(a,a*t));a<l&&(l=a);var s=[];if(o.length>i.grid.options.virtualizationThreshold){if(null!=e){if(!i.grid.suppressParentScrollDown&&i.prevScrollTop<e&&l<i.prevRowScrollIndex+i.grid.options.scrollThreshold&&l<a)return;if(!i.grid.suppressParentScrollUp&&i.prevScrollTop>e&&l>i.prevRowScrollIndex-i.grid.options.scrollThreshold&&l<a)return}s=[Math.max(0,l-i.grid.options.excessRows),Math.min(o.length,l+n+i.grid.options.excessRows)]}else{var d=i.visibleRowCache.length;s=[0,Math.max(d,n+i.grid.options.excessRows)]}i.updateViewableRowRange(s),i.prevRowScrollIndex=l},e.prototype.adjustColumns=function(e,t){var r=this,i=r.minColumnsToRender(),n=r.visibleColumnCache,o=n.length-i;null==t&&e&&(t=e/r.getHorizontalScrollLength());var a=Math.ceil(Math.min(o,o*t));o<a&&(a=o);var l=[];if(n.length>r.grid.options.columnVirtualizationThreshold&&r.getCanvasWidth()>r.getViewportWidth())l=[Math.max(0,a-r.grid.options.excessColumns),Math.min(n.length,a+i+r.grid.options.excessColumns)];else{var s=r.visibleColumnCache.length;l=[0,Math.max(s,i+r.grid.options.excessColumns)]}r.updateViewableColumnRange(l),r.prevColumnScrollIndex=a},e.prototype.updateViewableRowRange=function(e){var t=this.visibleRowCache.slice(e[0],e[1]);this.currentTopRow=e[0],this.setRenderedRows(t)},e.prototype.updateViewableColumnRange=function(e){var t=this.visibleColumnCache.slice(e[0],e[1]);this.currentFirstColumn=e[0],this.setRenderedColumns(t)},e.prototype.headerCellWrapperStyle=function(){if(0===this.currentFirstColumn)return null;var e=this.columnOffset;return this.grid.isRTL()?{"margin-right":e+"px"}:{"margin-left":e+"px"}},e.prototype.updateColumnWidths=function(){var i=this,n=[],o=0,a=0,t="",l=!1,s=[],d=[],u=0,c=i.grid.getViewportWidth()-i.grid.scrollbarWidth,r=[];angular.forEach(i.grid.renderContainers,function(e){r=r.concat(e.visibleColumnCache)}),r.forEach(function(e){var t=0;if(e.visible)if(l&&(c+=i.grid.scrollbarWidth),!l&&e.colDef.pinnedRight&&(l=!0),angular.isNumber(e.width))t=parseInt(e.width,10),a+=t,e.drawnWidth=t,s.push(e);else if(b.endsWith(e.width,"%")){var r=parseInt(e.width.replace(/%/g,""),10);(t=parseInt(r/100*c))>e.maxWidth&&(t=e.maxWidth),t<e.minWidth&&(t=e.minWidth),a+=t,e.drawnWidth=t,u+=r,d.push(e)}else angular.isString(e.width)&&-1!==e.width.indexOf("*")&&(o+=e.width.length,n.push(e))});var e,g=c-a;if(0<n.length){var p=g/o;n.forEach(function(e){var t=parseInt(e.width.length*p,10);t>e.maxWidth&&(t=e.maxWidth),t<e.minWidth&&(t=e.minWidth),a+=t,e.drawnWidth=t})}if(0<n.length?e=n:0<d.length&&0===s.length&&100===u&&(e=d),!angular.isUndefined(e)){for(var f=function(e){e.drawnWidth<e.maxWidth&&0<m&&(e.drawnWidth++,a++,m--,h=!0)},m=c-a,h=!0;0<m&&h;)h=!1,e.forEach(f);var v=function(e){e.drawnWidth>e.minWidth&&0<C&&(e.drawnWidth--,a--,C--,h=!0)},C=a-c;for(h=!0;0<C&&h;)h=!1,e.forEach(v)}var w=0;i.visibleColumnCache.forEach(function(e){e.visible&&(w+=e.drawnWidth)}),r.forEach(function(e){t+=e.getColClassDefinition()}),i.canvasWidth=w,this.columnStyles=t},e.prototype.needsHScrollbarPlaceholder=function(){var e;return("left"===this.name||"right"===this.name&&!this.hasHScrollbar&&!this.grid.disableScrolling)&&(this.grid.options.enableHorizontalScrollbar===n.scrollbars.ALWAYS||(e=this.grid.element[0].querySelector(".ui-grid-render-container-body .ui-grid-viewport")).scrollWidth>e.offsetWidth)},e.prototype.getViewportStyle=function(){var e=this,t={},r={};return r[n.scrollbars.ALWAYS]="scroll",r[n.scrollbars.WHEN_NEEDED]="auto",e.hasHScrollbar=!1,e.hasVScrollbar=!1,e.grid.disableScrolling?(t["overflow-x"]="hidden",t["overflow-y"]="hidden"):("body"===e.name?(e.hasHScrollbar=e.grid.options.enableHorizontalScrollbar!==n.scrollbars.NEVER,e.grid.isRTL()?e.grid.hasLeftContainerColumns()||(e.hasVScrollbar=e.grid.options.enableVerticalScrollbar!==n.scrollbars.NEVER):e.grid.hasRightContainerColumns()||(e.hasVScrollbar=e.grid.options.enableVerticalScrollbar!==n.scrollbars.NEVER)):"left"===e.name?e.hasVScrollbar=!!e.grid.isRTL()&&e.grid.options.enableVerticalScrollbar!==n.scrollbars.NEVER:e.hasVScrollbar=!e.grid.isRTL()&&e.grid.options.enableVerticalScrollbar!==n.scrollbars.NEVER,t["overflow-x"]=e.hasHScrollbar?r[e.grid.options.enableHorizontalScrollbar]:"hidden",t["overflow-y"]=e.hasVScrollbar?r[e.grid.options.enableVerticalScrollbar]:"hidden"),t},e}]),angular.module("ui.grid").factory("GridRow",["gridUtil","uiGridConstants",function(i,t){function e(e,t,r){this.grid=r,this.entity=e,this.uid=i.nextUid(),this.visible=!0,this.isSelected=!1,this.$$height=r.options.rowHeight}return Object.defineProperty(e.prototype,"height",{get:function(){return this.$$height},set:function(e){e!==this.$$height&&(this.grid.updateCanvasHeight(),this.$$height=e)}}),e.prototype.getQualifiedColField=function(e){return"row."+this.getEntityQualifiedColField(e)},e.prototype.getEntityQualifiedColField=function(e){return e.field===t.ENTITY_BINDING?"entity":i.preEval("entity."+e.field)},e.prototype.setRowInvisible=function(e){e&&e.setThisRowInvisible&&e.setThisRowInvisible("user")},e.prototype.clearRowInvisible=function(e){e&&e.clearThisRowInvisible&&e.clearThisRowInvisible("user")},e.prototype.setThisRowInvisible=function(e,t){this.invisibleReason||(this.invisibleReason={}),this.invisibleReason[e]=!0,this.evaluateRowVisibility(t)},e.prototype.clearThisRowInvisible=function(e,t){void 0!==this.invisibleReason&&delete this.invisibleReason[e],this.evaluateRowVisibility(t)},e.prototype.evaluateRowVisibility=function(e){var r=!0;void 0!==this.invisibleReason&&angular.forEach(this.invisibleReason,function(e,t){e&&(r=!1)}),void 0!==this.visible&&this.visible===r||(this.visible=r,e||(this.grid.queueGridRefresh(),this.grid.api.core.raise.rowsVisibleChanged(this)))},e}]),function(){"use strict";angular.module("ui.grid").factory("GridRowColumn",["$parse","$filter",function(e,t){var r=function e(t,r){if(!(this instanceof e))throw"Using GridRowColumn as a function insead of as a constructor. Must be called with `new` keyword";this.row=t,this.col=r};return r.prototype.getIntersectionValueRaw=function(){return e(this.row.getEntityQualifiedColField(this.col))(this.row)},r}])}(),angular.module("ui.grid").factory("ScrollEvent",["gridUtil",function(a){function e(e,t,r,i){var n=this;if(!e)throw new Error("grid argument is required");n.grid=e,n.source=i,n.withDelay=!0,n.sourceRowContainer=t,n.sourceColContainer=r,n.newScrollLeft=null,n.newScrollTop=null,n.x=null,n.y=null,n.verticalScrollLength=-9999999,n.horizontalScrollLength=-999999,n.fireThrottledScrollingEvent=a.throttle(function(e){n.grid.scrollContainers(e,n)},n.grid.options.wheelScrollThrottle,{trailing:!0})}return e.prototype.getNewScrollLeft=function(e,t){var r=this;if(r.newScrollLeft)return r.newScrollLeft;var i,n=e.getCanvasWidth()-e.getViewportWidth(),o=a.normalizeScrollLeft(t,r.grid);if(void 0!==r.x.percentage&&void 0!==r.x.percentage)i=r.x.percentage;else{if(void 0===r.x.pixels||void 0===r.x.pixels)throw new Error("No percentage or pixel value provided for scroll event X axis");i=r.x.percentage=(o+r.x.pixels)/n}return Math.max(0,i*n)},e.prototype.getNewScrollTop=function(e,t){var r=this;if(r.newScrollTop)return r.newScrollTop;var i,n=e.getVerticalScrollLength(),o=t[0].scrollTop;if(void 0!==r.y.percentage&&void 0!==r.y.percentage)i=r.y.percentage;else{if(void 0===r.y.pixels||void 0===r.y.pixels)throw new Error("No percentage or pixel value provided for scroll event Y axis");i=r.y.percentage=(o+r.y.pixels)/n}return Math.max(0,i*n)},e.prototype.atTop=function(e){return this.y&&(0===this.y.percentage||this.verticalScrollLength<0)&&0===e},e.prototype.atBottom=function(e){return this.y&&(1===this.y.percentage||0===this.verticalScrollLength)&&0<e},e.prototype.atLeft=function(e){return this.x&&(0===this.x.percentage||this.horizontalScrollLength<0)&&0===e},e.prototype.atRight=function(e){return this.x&&(1===this.x.percentage||0===this.horizontalScrollLength)&&0<e},e.Sources={ViewPortScroll:"ViewPortScroll",RenderContainerMouseWheel:"RenderContainerMouseWheel",RenderContainerTouchMove:"RenderContainerTouchMove",Other:99},e}]),function(){"use strict";angular.module("ui.grid").service("gridClassFactory",["gridUtil","$q","$compile","$templateCache","uiGridConstants","Grid","GridColumn","GridRow",function(d,i,n,e,u,o,t,r){var a={createGrid:function(e){(e=void 0!==e?e:{}).id=d.newId();var t=new o(e);if(t.options.rowTemplate){var r=i.defer();t.getRowTemplateFn=r.promise,d.getTemplate(t.options.rowTemplate).then(function(e){var t=n(e);r.resolve(t)},function(){throw new Error("Couldn't fetch/use row template '"+t.options.rowTemplate+"'")}).catch(angular.noop)}return t.registerColumnBuilder(a.defaultColumnBuilder),t.registerRowBuilder(a.rowTemplateAssigner),t.registerRowsProcessor(function(e){return e.forEach(function(e){e.evaluateRowVisibility(!0)}),e},50),t.registerColumnsProcessor(function(e){return e.forEach(function(e){e.visible=!angular.isDefined(e.colDef.visible)||e.colDef.visible}),e},50),t.registerRowsProcessor(t.searchRows,100),t.options.externalSort&&angular.isFunction(t.options.externalSort)?t.registerRowsProcessor(t.options.externalSort,200):t.registerRowsProcessor(t.sortByColumn,200),t},defaultColumnBuilder:function(a,l,e){var s=[],t=function(r,e,t,i,n){a[r]?l[e]=a[r]:l[e]=t;var o=d.getTemplate(l[e]).then(function(e){angular.isFunction(e)&&(e=e());var t="cellTooltip"===n?"col.cellTooltip(row,col)":"col.headerTooltip(col)";n&&!1===l[n]?e=e.replace(u.TOOLTIP,""):n&&l[n]&&(e=e.replace(u.TOOLTIP,'title="{{'+t+' CUSTOM_FILTERS }}"')),l[r]=i?e.replace(u.CUSTOM_FILTERS,function(){return l[i]?"|"+l[i]:""}):e},function(){throw new Error("Couldn't fetch/use colDef."+r+" '"+a[r]+"'")}).catch(angular.noop);return s.push(o),o};return l.cellTemplatePromise=t("cellTemplate","providedCellTemplate","ui-grid/uiGridCell","cellFilter","cellTooltip"),l.headerCellTemplatePromise=t("headerCellTemplate","providedHeaderCellTemplate","ui-grid/uiGridHeaderCell","headerCellFilter","headerTooltip"),l.footerCellTemplatePromise=t("footerCellTemplate","providedFooterCellTemplate","ui-grid/uiGridFooterCell","footerCellFilter"),l.filterHeaderTemplatePromise=t("filterHeaderTemplate","providedFilterHeaderTemplate","ui-grid/ui-grid-filter"),l.compiledElementFnDefer=i.defer(),i.all(s)},rowTemplateAssigner:function(e){if(e.rowTemplate){var r=i.defer();e.getRowTemplateFn=r.promise,d.getTemplate(e.rowTemplate).then(function(e){var t=n(e);r.resolve(t)},function(){throw new Error("Couldn't fetch/use row template '"+e.rowTemplate+"'")})}else e.rowTemplate=this.options.rowTemplate,e.getRowTemplateFn=this.getRowTemplateFn;return e.getRowTemplateFn}};return a}])}(),angular.module("ui.grid").service("rowSearcher",["gridUtil","uiGridConstants",function(c,s){var n=s.filter.CONTAINS,g={getTerm:function(e){if(void 0===e.term)return e.term;var t=e.term;return"string"==typeof t&&(t=t.trim()),t},stripTerm:function(e){var t=g.getTerm(e);return"string"==typeof t?t.replace(/(^\*|\*$)/g,"").replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"):t},guessCondition:function(e){if(void 0===e.term||!e.term)return n;var t=g.getTerm(e);if(/\*/.test(t)){var r="";e.flags&&e.flags.caseSensitive||(r+="i");var i=t.replace(/(\\)?\*/g,function(e,t){return t?e:"[\\s\\S]*?"});return new RegExp("^"+i+"$",r)}return n},setupFilters:function(e){for(var t=[],r=e.length,i=0;i<r;i++){var n=e[i];if(n.noTerm||!c.isNullOrUndefined(n.term)){var o={},a="";n.flags&&n.flags.caseSensitive||(a+="i"),c.isNullOrUndefined(n.term)||(n.rawTerm?o.term=n.term:o.term=g.stripTerm(n)),o.noTerm=n.noTerm,n.condition?o.condition=n.condition:o.condition=g.guessCondition(n),o.flags=angular.extend({caseSensitive:!1,date:!1},n.flags),o.condition===s.filter.STARTS_WITH&&(o.startswithRE=new RegExp("^"+o.term,a)),o.condition===s.filter.ENDS_WITH&&(o.endswithRE=new RegExp(o.term+"$",a)),o.condition===s.filter.CONTAINS&&(o.containsRE=new RegExp(o.term,a)),o.condition===s.filter.EXACT&&(o.exactRE=new RegExp("^"+o.term+"$",a)),t.push(o)}}return t},runColumnFilter:function(e,t,r,i){var n,o=typeof i.condition,a=i.term;if(n=r.filterCellFiltered?e.getCellDisplayValue(t,r):e.getCellValue(t,r),i.condition instanceof RegExp)return i.condition.test(n);if("function"===o)return i.condition(a,n,t,r);if(i.startswithRE)return i.startswithRE.test(n);if(i.endswithRE)return i.endswithRE.test(n);if(i.containsRE)return i.containsRE.test(n);if(i.exactRE)return i.exactRE.test(n);if(i.condition===s.filter.NOT_EQUAL)return!new RegExp("^"+a+"$").exec(n);if("number"==typeof n&&"string"==typeof a){var l=parseFloat(a.replace(/\\\./,".").replace(/\\\-/,"-"));isNaN(l)||(a=l)}return!0===i.flags.date&&(n=new Date(n),a=new Date(a.replace(/\\/g,""))),i.condition===s.filter.GREATER_THAN?a<n:i.condition===s.filter.GREATER_THAN_OR_EQUAL?a<=n:i.condition===s.filter.LESS_THAN?n<a:i.condition!==s.filter.LESS_THAN_OR_EQUAL||n<=a},searchColumn:function(e,t,r,i){if(e.options.useExternalFiltering)return!0;for(var n=i.length,o=0;o<n;o++){var a=i[o];if((!c.isNullOrUndefined(a.term)&&""!==a.term||a.noTerm)&&!g.runColumnFilter(e,t,r,a))return!1}return!0},search:function(e,s,t){if(s){if(!e.options.enableFiltering)return s;for(var r=[],i=t.length,n=function(e){var t=!1;return e.forEach(function(e){(!c.isNullOrUndefined(e.term)&&""!==e.term||e.noTerm)&&(t=!0)}),t},o=0;o<i;o++){var a=t[o];void 0!==a.filters&&n(a.filters)&&r.push({col:a,filters:g.setupFilters(a.filters)})}if(0<r.length){for(var l=function(e,t){for(var r,i,n,o,a=s.length,l=0;l<a;l++)r=e,i=s[l],n=t.col,o=t.filters,i.visible&&!g.searchColumn(r,i,n,o)&&(i.visible=!1)},d=r.length,u=0;u<d;u++)l(e,r[u]);e.api.core.raise.rowsVisibleChanged&&e.api.core.raise.rowsVisibleChanged()}return s}}};return g}]),angular.module("ui.grid").service("rowSorter",["$parse","uiGridConstants",function(e,v){var t="("+v.CURRENCY_SYMBOLS.map(function(e){return"\\"+e}).join("|")+")?",C=(new RegExp("^[-+]?"+t+"[\\d,.]+"+t+"%?$"),{colSortFnCache:{}});return C.guessSortFn=function(e){switch(e){case"number":return C.sortNumber;case"numberStr":return C.sortNumberStr;case"boolean":return C.sortBool;case"string":return C.sortAlpha;case"date":return C.sortDate;case"object":return C.basicSort;default:throw new Error("No sorting function found for type: "+e)}},C.handleNulls=function(e,t){if(!e&&0!==e&&!1!==e||!t&&0!==t&&!1!==t){if(!e&&0!==e&&!1!==e&&!t&&0!==t&&!1!==t)return 0;if(!e&&0!==e&&!1!==e)return 1;if(!t&&0!==t&&!1!==t)return-1}return null},C.basicSort=function(e,t){var r=C.handleNulls(e,t);return null!==r?r:e===t?0:e<t?-1:1},C.sortNumber=function(e,t){var r=C.handleNulls(e,t);return null!==r?r:e-t},C.sortNumberStr=function(e,t){var r=C.handleNulls(e,t);if(null!==r)return r;var i,n,o=!1,a=!1;return i=parseFloat(e.replace(/[^0-9.-]/g,"")),isNaN(i)&&(o=!0),n=parseFloat(t.replace(/[^0-9.-]/g,"")),isNaN(n)&&(a=!0),o&&a?0:o?1:a?-1:i-n},C.sortAlpha=function(e,t){var r=C.handleNulls(e,t);if(null!==r)return r;var i=e.toString().toLowerCase(),n=t.toString().toLowerCase();return i===n?0:i.localeCompare(n)},C.sortDate=function(e,t){var r=C.handleNulls(e,t);if(null!==r)return r;e instanceof Date||(e=new Date(e)),t instanceof Date||(t=new Date(t));var i=e.getTime(),n=t.getTime();return i===n?0:i<n?-1:1},C.sortBool=function(e,t){var r=C.handleNulls(e,t);return null!==r?r:e&&t?0:e||t?e?1:-1:0},C.getSortFn=function(e,t,r){var i;return C.colSortFnCache[t.colDef.name]?i=C.colSortFnCache[t.colDef.name]:void 0!==t.sortingAlgorithm?(i=t.sortingAlgorithm,C.colSortFnCache[t.colDef.name]=t.sortingAlgorithm):t.sortCellFiltered&&t.cellFilter?(i=C.sortAlpha,C.colSortFnCache[t.colDef.name]=i):(i=C.guessSortFn(t.colDef.type))?C.colSortFnCache[t.colDef.name]=i:i=C.sortAlpha,i},C.prioritySort=function(e,t){return e.sort&&void 0!==e.sort.priority&&t.sort&&void 0!==t.sort.priority?e.sort.priority<t.sort.priority?-1:e.sort.priority===t.sort.priority?0:1:e.sort&&void 0!==e.sort.priority?-1:t.sort&&void 0!==t.sort.priority?1:0},C.sort=function(g,e,t){if(e){if(g.options.useExternalSorting)return e;var p,f,m=[],r=[];if(t.forEach(function(e){!e.sort||e.sort.ignoreSort||!e.sort.direction||e.sort.direction!==v.ASC&&e.sort.direction!==v.DESC?e.defaultSort&&e.defaultSort.direction&&(e.defaultSort.direction===v.ASC||e.defaultSort.direction===v.DESC)&&r.push({col:e,sort:e.defaultSort}):m.push({col:e,sort:e.sort})}),m=m.sort(C.prioritySort),r=r.sort(C.prioritySort),0===(m=m.concat(r)).length)return e;e.forEach(function(e,t){e.entity.$$uiGridIndex=t});var h=e.slice(0),i=e.sort(function(e,t){for(var r,i=0,n=0;0===i&&n<m.length;){p=m[n].col,f=m[n].sort.direction,r=C.getSortFn(g,p,h);var o=(a=g,l=e,s=t,c=u=void 0,c=(d=p).sortCellFiltered?(u=a.getCellDisplayValue(l,d),a.getCellDisplayValue(s,d)):(u=a.getCellValue(l,d),a.getCellValue(s,d)),[u,c]);i=r(o[0],o[1],e,t,f,p),n++}var a,l,s,d,u,c;return 0===i?e.entity.$$uiGridIndex-t.entity.$$uiGridIndex:f===v.ASC?i:0-i});return e.forEach(function(e,t){delete e.entity.$$uiGridIndex}),i}},C}]),function(){var C,e=angular.module("ui.grid");function w(e){var t=e;return void 0!==t.length&&t.length&&(t=e[0]),t.ownerDocument.defaultView.getComputedStyle(t,null)}"function"!=typeof Function.prototype.bind&&(C=function(){var i=Array.prototype.slice;return function(e){var t=this,r=i.call(arguments,1);return r.length?function(){return arguments.length?t.apply(e,r.concat(i.call(arguments))):t.apply(e,r)}:function(){return arguments.length?t.apply(e,arguments):t.call(e)}}});var l=new RegExp("^("+/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source+")(?!px)[a-z%]+$","i"),b=/^(block|none|table(?!-c[ea]).+)/,y={position:"absolute",visibility:"hidden",display:"block"};function S(e,t,r,i,n){for(var o=r===(i?"border":"content")?4:"width"===t?1:0,a=0,l=["Top","Right","Bottom","Left"];o<4;o+=2){var s=l[o];if("margin"===r){var d=parseFloat(n[r+s]);isNaN(d)||(a+=d)}if(i){if("content"===r){var u=parseFloat(n["padding"+s]);isNaN(u)||(a-=u)}if("margin"!==r){var c=parseFloat(n["border"+s+"Width"]);isNaN(c)||(a-=c)}}else{var g=parseFloat(n["padding"+s]);if(isNaN(g)||(a+=g),"padding"!==r){var p=parseFloat(n["border"+s+"Width"]);isNaN(p)||(a+=p)}}}return a}function x(e,t,r){var i,n=!0,o=w(e),a="border-box"===o.boxSizing;if(i<=0||null==i){if(((i=o[t])<0||null==i)&&(i=e.style[t]),l.test(i))return i;n=a&&!0,i=parseFloat(i)||0}return i+S(0,t,r||(a?"border":"content"),n,o)}var E=["0","0","0","0"],A="uiGrid-";e.service("gridUtil",["$log","$window","$document","$http","$templateCache","$timeout","$interval","$injector","$q","$interpolate","uiGridConstants",function(t,n,r,e,i,s,d,o,a,l,u){var c,g={augmentWidthOrHeight:S,getStyles:w,createBoundedWrapper:function(e,t){return function(){return t.apply(e,arguments)}},readableColumnName:function(e){return void 0===e||null==e?e:("string"!=typeof e&&(e=String(e)),e.replace(/_+/g," ").replace(/^[A-Z]+$/,function(e){return e.toLowerCase()}).replace(/([\w\u00C0-\u017F]+)/g,function(e){return e.charAt(0).toUpperCase()+e.slice(1)}).replace(/(\w+?(?=[A-Z]))/g,"$1 "))},getColumnsFromData:function(e,r){var i=[];if(!e||void 0===e[0]||void 0===e[0])return[];angular.isUndefined(r)&&(r=[]);var t=e[0];return angular.forEach(t,function(e,t){-1===r.indexOf(t)&&i.push({name:t})}),i},newId:(c=(new Date).getTime(),function(){return c+=1}),getTemplate:function(r){if(i.get(r))return g.postProcessTemplate(i.get(r));if(angular.isFunction(r.then))return r.then(g.postProcessTemplate).catch(angular.noop);try{if(0<angular.element(r).length)return a.when(r).then(g.postProcessTemplate).catch(angular.noop)}catch(e){}return e({method:"GET",url:r}).then(function(e){var t=e.data.trim();return i.put(r,t),t},function(e){throw new Error("Could not get template "+r+": "+e)}).then(g.postProcessTemplate).catch(angular.noop)},postProcessTemplate:function(e){var t=l.startSymbol(),r=l.endSymbol();return"{{"===t&&"}}"===r||(e=(e=e.replace(/\{\{/g,t)).replace(/\}\}/g,r)),a.when(e)},guessType:function(e){var t=typeof e;switch(t){case"number":case"boolean":case"string":return t;default:return angular.isDate(e)?"date":"object"}},elementWidth:function(e){},elementHeight:function(e){},getScrollbarWidth:function(){var e=document.createElement("div");e.style.visibility="hidden",e.style.width="100px",e.style.msOverflowStyle="scrollbar",document.body.appendChild(e);var t=e.offsetWidth;e.style.overflow="scroll";var r=document.createElement("div");r.style.width="100%",e.appendChild(r);var i=r.offsetWidth;return e.parentNode.removeChild(e),t-i},swap:function(e,t,r,i){var n,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];for(o in n=r.apply(e,i||[]),t)e.style[o]=a[o];return n},fakeElement:function(e,t,r,i){var n,o,a=angular.element(e).clone()[0];for(o in t)a.style[o]=t[o];return angular.element(document.body).append(a),n=r.call(a,a),angular.element(a).remove(),n},normalizeWheelEvent:function(e){var t,r,i,n,o,a=e||window.event,l=([].slice.call(arguments,1),0),s=0,d=0;return a.originalEvent&&(a=a.originalEvent),a.wheelDelta&&(l=a.wheelDelta),a.detail&&(l=-1*a.detail),d=l,void 0!==a.axis&&a.axis===a.HORIZONTAL_AXIS&&(d=0,s=-1*l),a.deltaY&&(l=d=-1*a.deltaY),a.deltaX&&(l=-1*(s=a.deltaX)),void 0!==a.wheelDeltaY&&(d=a.wheelDeltaY),void 0!==a.wheelDeltaX&&(s=a.wheelDeltaX),i=Math.abs(l),(!t||i<t)&&(t=i),n=Math.max(Math.abs(d),Math.abs(s)),(!r||n<r)&&(r=n),o=0<l?"floor":"ceil",{delta:l=Math[o](l/t),deltaX:s=Math[o](s/r),deltaY:d=Math[o](d/r)}},isTouchEnabled:function(){var e;return("ontouchstart"in n||n.DocumentTouch&&r instanceof DocumentTouch)&&(e=!0),e},isNullOrUndefined:function(e){return null==e},endsWith:function(e,t){return!(!e||!t||"string"!=typeof e)&&-1!==e.indexOf(t,e.length-t.length)},arrayContainsObjectWithProperty:function(e,t,r){var i=!1;return angular.forEach(e,function(e){e[t]===r&&(i=!0)}),i},numericAndNullSort:function(e,t){return null===e?1:null===t?-1:null===e&&null===t?0:e-t},disableAnimations:function(e){var t;try{t=o.get("$animate"),1<angular.version.major||1===angular.version.major&&4<=angular.version.minor?t.enabled(e,!1):t.enabled(!1,e)}catch(e){}},enableAnimations:function(e){var t;try{return t=o.get("$animate"),1<angular.version.major||1===angular.version.major&&4<=angular.version.minor?t.enabled(e,!0):t.enabled(!0,e),t}catch(e){}},nextUid:function(){for(var e,t=E.length;t;){if(57===(e=E[--t].charCodeAt(0)))return E[t]="A",A+E.join("");if(90!==e)return E[t]=String.fromCharCode(e+1),A+E.join("");E[t]="0"}return E.unshift("0"),A+E.join("")},hashKey:function(e){var t,r=typeof e;return"object"===r&&null!==e?"function"==typeof(t=e.$$hashKey)?t=e.$$hashKey():void 0!==e.$$hashKey&&e.$$hashKey?t=e.$$hashKey:void 0===t&&(t=e.$$hashKey=g.nextUid()):t=e,r+": "+t},resetUids:function(){E=["0","0","0"]},logError:function(e){u.LOG_ERROR_MESSAGES&&t.error(e)},logWarn:function(e){u.LOG_WARN_MESSAGES&&t.warn(e)},logDebug:function(){u.LOG_DEBUG_MESSAGES&&t.debug.apply(t,arguments)}};g.focus={queue:[],byId:function(r,i){this._purgeQueue();var e=s(function(){var e=(i&&i.id?i.id+"-":"")+r,t=n.document.getElementById(e);t?t.focus():g.logWarn("[focus.byId] Element id "+e+" was not found.")},0,!1);return this.queue.push(e),e},byElement:function(e){if(!angular.isElement(e))return g.logWarn("Trying to focus on an element that isn't an element."),a.reject("not-element");e=angular.element(e),this._purgeQueue();var t=s(function(){e&&e[0].focus()},0,!1);return this.queue.push(t),t},bySelector:function(t,r,e){var i=this;if(!angular.isElement(t))throw new Error("The parent element is not an element.");t=angular.element(t);var n=function(){var e=t[0].querySelector(r);return i.byElement(e)};if(this._purgeQueue(),e){var o=s(n,0,!1);return this.queue.push(o),o}return n()},_purgeQueue:function(){this.queue.forEach(function(e){s.cancel(e)}),this.queue=[]}},["width","height"].forEach(function(n){var r=n.charAt(0).toUpperCase()+n.substr(1);g["element"+r]=function(e,t){var r=e;if(r&&void 0!==r.length&&r.length&&(r=e[0]),r&&null!==r){var i=w(r);return 0===r.offsetWidth&&b.test(i.display)?g.swap(r,y,function(){return x(r,n,t)}):x(r,n,t)}return null},g["outerElement"+r]=function(e,t){return e?g["element"+r].call(this,e,t?"margin":"border"):null}}),g.closestElm=function(e,t){var r,i;for(void 0!==e.length&&e.length&&(e=e[0]),["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(e){return"function"==typeof document.body[e]&&(r=e,!0)});null!==e;){if(null!==(i=e.parentElement)&&i[r](t))return i;e=i}return null},g.type=function(e){return Function.prototype.toString.call(e.constructor).match(/function (.*?)\(/)[1]},g.getBorderSize=function(e,t){void 0!==e.length&&e.length&&(e=e[0]);var r=w(e);t=t?"border"+t.charAt(0).toUpperCase()+t.slice(1):"border",t+="Width";var i=parseInt(r[t],10);return isNaN(i)?0:i},g.detectBrowser=function(){var e=n.navigator.userAgent,t={chrome:/chrome/i,safari:/safari/i,firefox:/firefox/i,ie:/internet explorer|trident\//i};for(var r in t)if(t[r].test(e))return r;return"unknown"},g.rtlScrollType=function e(){if(e.type)return e.type;var t=angular.element('<div dir="rtl" style="font-size: 14px; width: 1px; height: 1px; position: absolute; top: -1000px; overflow: scroll">A</div>')[0],r="reverse";return document.body.appendChild(t),0<t.scrollLeft?r="default":(t.scrollLeft=1,0===t.scrollLeft&&(r="negative")),angular.element(t).remove(),e.type=r},g.normalizeScrollLeft=function(e,t){void 0!==e.length&&e.length&&(e=e[0]);var r=e.scrollLeft;if(t.isRTL())switch(g.rtlScrollType()){case"default":return e.scrollWidth-r-e.clientWidth;case"negative":return Math.abs(r);case"reverse":return r}return r},g.denormalizeScrollLeft=function(e,t,r){if(void 0!==e.length&&e.length&&(e=e[0]),r.isRTL())switch(g.rtlScrollType()){case"default":return e.scrollWidth-e.clientWidth-t;case"negative":return-1*t;case"reverse":return t}return t},g.preEval=function(e){var t=u.BRACKET_REGEXP.exec(e);if(t)return(t[1]?g.preEval(t[1]):t[1])+t[2]+(t[3]?g.preEval(t[3]):t[3]);var r=(e=e.replace(u.APOS_REGEXP,"\\'")).split(u.DOT_REGEXP),i=[r.shift()];return angular.forEach(r,function(e){i.push(e.replace(u.FUNC_REGEXP,"']$1"))}),i.join("['")},g.debounce=function(t,r,i){var n,o,a,l;function e(){a=this,o=arguments;var e=i&&!n;return n&&s.cancel(n),n=s(function(){n=null,i||(l=t.apply(a,o))},r,!1),e&&(l=t.apply(a,o)),l}return e.cancel=function(){s.cancel(n),n=null},e},g.throttle=function(t,r,i){i=i||{};var n,o,a=0,l=null;function s(e){a=+new Date,t.apply(n,o),d(function(){l=null},0,1,!1)}return function(){if(n=this,o=arguments,null===l){var e=+new Date-a;r<e?s():i.trailing&&(l=d(s,r-e,1,!1))}}},g.on={},g.off={},g._events={},g.addOff=function(i){g.off[i]=function(e,t){var r=g._events[i].indexOf(t);0<r&&g._events[i].removeAt(r)}};var p,f,m="onwheel"in document||9<=document.documentMode?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"];function h(e,t){var r,i=angular.element(this),n=0,o=0,a=0;if(t.originalEvent&&(t=t.originalEvent),"detail"in t&&(a=-1*t.detail),"wheelDelta"in t&&(a=t.wheelDelta),"wheelDeltaY"in t&&(a=t.wheelDeltaY),"wheelDeltaX"in t&&(o=-1*t.wheelDeltaX),"axis"in t&&t.axis===t.HORIZONTAL_AXIS&&(o=-1*a,a=0),n=0===a?o:a,"deltaY"in t&&(n=a=-1*t.deltaY),"deltaX"in t&&(o=t.deltaX,0===a&&(n=-1*o)),0!==a||0!==o){if(1===t.deltaMode){var l=i.data("mousewheel-line-height");n*=l,a*=l,o*=l}else if(2===t.deltaMode){var s=i.data("mousewheel-page-height");n*=s,a*=s,o*=s}var d;r=Math.max(Math.abs(a),Math.abs(o)),(!f||r<f)&&(d=f=r,"mousewheel"===t.type&&d%120==0&&(f/=40)),n=Math[1<=n?"floor":"ceil"](n/f),o=Math[1<=o?"floor":"ceil"](o/f),a=Math[1<=a?"floor":"ceil"](a/f);var u={originalEvent:t,deltaX:o,deltaY:a,deltaFactor:f,preventDefault:function(){t.preventDefault()},stopPropagation:function(){t.stopPropagation()}};p&&clearTimeout(p),p=setTimeout(v,200),e.call(i[0],u)}}function v(){f=null}return g.on.mousewheel=function(e,t){if(e&&t){var r,i,n=angular.element(e);n.data("mousewheel-line-height",(r=n,(i=(r=angular.element(r)[0]).parentElement)||(i=document.getElementsByTagName("body")[0]),parseInt(w(i).fontSize)||parseInt(w(r).fontSize)||16)),n.data("mousewheel-page-height",g.elementHeight(n)),n.data("mousewheel-callbacks")||n.data("mousewheel-callbacks",{});var o=n.data("mousewheel-callbacks");o[t]=(Function.prototype.bind||C).call(h,n[0],t);for(var a=m.length;a;)n.on(m[--a],o[t]);n.on("$destroy",function(){for(var e=m.length;e;)n.off(m[--e],o[t])})}},g.off.mousewheel=function(e,t){var r=angular.element(e),i=r.data("mousewheel-callbacks"),n=i[t];if(n)for(var o=m.length;o;)r.off(m[--o],n);delete i[t],0===Object.keys(i).length&&(r.removeData("mousewheel-line-height"),r.removeData("mousewheel-page-height"),r.removeData("mousewheel-callbacks"))},g}]),e.filter("px",function(){return function(e){return e.match(/^[\d\.]+$/)?e+"px":e}})}(),function(){var g=["uiT","uiTranslate"],t=angular.module("ui.grid.i18n");function r(u,c){return{restrict:"EA",compile:function(){return{pre:function(e,r,t){var i,n,o,a=g[0],l=g[1],s=t[a]||t[l]||r.html();function d(e){var t=u.getSafeText(e);r.html(t)}t.$$observers&&(o=t[a]?a:l,n=t.$observe(o,function(e){e&&d(e)})),i=e.$on(c.UPDATE_EVENT,function(){n?n(t[a]||t[l]):d(s)}),e.$on("$destroy",i),d(s)}}}}}function i(r){return function(e,t){return r.getSafeText(e,t)}}t.constant("i18nConstants",{MISSING:"[MISSING]",UPDATE_EVENT:"$uiI18n",LOCALE_DIRECTIVE_ALIAS:"uiI18n",DEFAULT_LANG:"en"}),t.service("i18nService",["$log","$parse","i18nConstants","$rootScope",function(e,a,l,t){var s={_langs:{},current:null,fallback:l.DEFAULT_LANG,get:function(e){var t=this,r=t.getFallbackLang();return e!==t.fallback?angular.extend({},t._langs[r],t._langs[e.toLowerCase()]):t._langs[e.toLowerCase()]},add:function(e,t){var r=e.toLowerCase();this._langs[r]||(this._langs[r]={}),angular.merge(this._langs[r],t)},getAllLangs:function(){var e=[];if(!this._langs)return e;for(var t in this._langs)e.push(t);return e},setCurrent:function(e){this.current=e.toLowerCase()},setFallback:function(e){this.fallback=e.toLowerCase()},getCurrentLang:function(){return this.current},getFallbackLang:function(){return this.fallback.toLowerCase()}},d={add:function(e,t){"object"==typeof e?angular.forEach(e,function(e){e&&s.add(e,t)}):s.add(e,t)},getAllLangs:function(){return s.getAllLangs()},get:function(e){var t=e||d.getCurrentLang();return s.get(t)},getSafeText:function(e,t){var r=t||d.getCurrentLang(),i=s.get(r),n=l.MISSING+e,o=a(e);return i&&o(i)||n},setCurrentLang:function(e){e&&(s.setCurrent(e),t.$broadcast(l.UPDATE_EVENT))},setFallbackLang:function(e){e&&s.setFallback(e)},getCurrentLang:function(){var e=s.getCurrentLang();return e||(e=l.DEFAULT_LANG,s.setCurrent(e)),e},getFallbackLang:function(){return s.getFallbackLang()}};return d}]),t.directive("uiI18n",["i18nService","i18nConstants",function(o,a){return{compile:function(){return{pre:function(e,t,r){var i=a.LOCALE_DIRECTIVE_ALIAS,n=e.$eval(r[i]);n?e.$watch(r[i],function(){o.setCurrentLang(n)}):r.$$observers&&r.$observe(i,function(){o.setCurrentLang(r[i]||a.DEFAULT_LANG)})}}}}}]),angular.forEach(g,function(e){t.directive(e,["i18nService","i18nConstants",r])}),angular.forEach(["t","uiTranslate"],function(e){t.filter(e,["i18nService",i])})}(),function(){"use strict";var e=angular.module("ui.grid.edit",["ui.grid"]);e.constant("uiGridEditConstants",{EDITABLE_CELL_TEMPLATE:/EDITABLE_CELL_TEMPLATE/g,EDITABLE_CELL_DIRECTIVE:/editable_cell_directive/g,events:{BEGIN_CELL_EDIT:"uiGridEventBeginCellEdit",END_CELL_EDIT:"uiGridEventEndCellEdit",CANCEL_CELL_EDIT:"uiGridEventCancelCellEdit"}}),e.service("uiGridEditService",["$q","uiGridConstants","gridUtil",function(n,t,o){var r={initializeGrid:function(e){r.defaultGridOptions(e.options),e.registerColumnBuilder(r.editColumnBuilder),e.edit={};e.api.registerEventsFromObject({edit:{afterCellEdit:function(e,t,r,i){},beginCellEdit:function(e,t,r){},cancelCellEdit:function(e,t){}}})},defaultGridOptions:function(e){e.cellEditableCondition=void 0===e.cellEditableCondition||e.cellEditableCondition,e.enableCellEditOnFocus=void 0!==e.enableCellEditOnFocus&&e.enableCellEditOnFocus},editColumnBuilder:function(t,r,e){var i=[];return t.enableCellEdit=void 0===t.enableCellEdit?void 0===e.enableCellEdit?"object"!==t.type:e.enableCellEdit:t.enableCellEdit,t.cellEditableCondition=void 0===t.cellEditableCondition?e.cellEditableCondition:t.cellEditableCondition,t.enableCellEdit&&(t.editableCellTemplate=t.editableCellTemplate||e.editableCellTemplate||"ui-grid/cellEditor",i.push(o.getTemplate(t.editableCellTemplate).then(function(e){r.editableCellTemplate=e},function(e){throw new Error("Couldn't fetch/use colDef.editableCellTemplate '"+t.editableCellTemplate+"'")}))),t.enableCellEditOnFocus=void 0===t.enableCellEditOnFocus?e.enableCellEditOnFocus:t.enableCellEditOnFocus,n.all(i)},isStartEditKey:function(e){return!(e.metaKey||e.keyCode===t.keymap.ESC||e.keyCode===t.keymap.SHIFT||e.keyCode===t.keymap.CTRL||e.keyCode===t.keymap.ALT||e.keyCode===t.keymap.WIN||e.keyCode===t.keymap.CAPSLOCK||e.keyCode===t.keymap.LEFT||e.keyCode===t.keymap.TAB&&e.shiftKey||e.keyCode===t.keymap.RIGHT||e.keyCode===t.keymap.TAB||e.keyCode===t.keymap.UP||e.keyCode===t.keymap.ENTER&&e.shiftKey||e.keyCode===t.keymap.DOWN||e.keyCode===t.keymap.ENTER)}};return r}]),e.directive("uiGridEdit",["gridUtil","uiGridEditService",function(e,n){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){n.initializeGrid(i.grid)},post:function(e,t,r,i){}}}}}]),e.directive("uiGridViewport",["uiGridEditConstants",function(o){return{replace:!0,priority:-99998,require:["^uiGrid","^uiGridRenderContainer"],scope:!1,compile:function(){return{post:function(e,t,r,i){var n=i[0];n.grid.api.edit&&n.grid.api.cellNav&&("body"===i[1].containerId&&(e.$on(o.events.CANCEL_CELL_EDIT,function(){n.focus()}),e.$on(o.events.END_CELL_EDIT,function(){n.focus()})))}}}}}]),e.directive("uiGridCell",["$compile","$injector","$timeout","uiGridConstants","uiGridEditConstants","gridUtil","$parse","uiGridEditService","$rootScope","$q",function(S,e,x,E,A,R,F,g,T,P){if(e.has("uiGridCellNavService"))e.get("uiGridCellNavService");return{priority:-100,restrict:"A",scope:!1,require:"?^uiGrid",link:function(p,f,e,i){var m,h,v,t,C,w=!1;if(p.col.colDef.enableCellEdit){var r=function(){},n=function(){},o=function(){p.col.colDef.enableCellEdit&&!1!==p.row.enableCellEdit?p.beginEditEventsWired||l():p.beginEditEventsWired&&b()};o();var a=p.$watch("row",function(e,t){e!==t&&o()});p.$on("$destroy",function(){a(),f.off()})}function l(){f.on("dblclick",c),f.on("touchstart",s),i&&i.grid.api.cellNav&&(n=i.grid.api.cellNav.on.viewPortKeyDown(p,function(e,t){null!==t&&(t.row!==p.row||t.col!==p.col||p.col.colDef.enableCellEditOnFocus||u(e))}),r=i.grid.api.cellNav.on.navigate(p,function(e,t,r){p.col.colDef.enableCellEditOnFocus&&(e.row!==p.row||e.col!==p.col||null!==r&&(!r||"click"!==r.type&&"keydown"!==r.type)||x(function(){c(r)}))})),p.beginEditEventsWired=!0}function s(e){void 0!==e.originalEvent&&void 0!==e.originalEvent&&(e=e.originalEvent),f.on("touchend",d),(t=x(function(){},500)).then(function(){setTimeout(c,0),f.off("touchend",d)})}function d(){x.cancel(t),f.off("touchend",d)}function b(){f.off("dblclick",c),f.off("keydown",u),f.off("touchstart",s),r(),n(),p.beginEditEventsWired=!1}function u(e){g.isStartEditKey(e)&&c(e)}function c(e){p.grid.api.core.scrollToIfNecessary(p.row,p.col).then(function(){!function(e){if(w)return;if(t=p.col,r=p.row,i=e,r.isSaving||(angular.isFunction(t.colDef.cellEditableCondition)?!t.colDef.cellEditableCondition(p,i):!t.colDef.cellEditableCondition))return;var t,r,i;var n=p.row.getQualifiedColField(p.col);p.col.colDef.editModelField&&(n=R.preEval("row.entity."+p.col.colDef.editModelField));v=F(n),h=v(p),m=(m=(m=p.col.editableCellTemplate).replace(E.MODEL_COL_FIELD,n)).replace(E.COL_FIELD,"grid.getCellValue(row, col)");var o=p.col.colDef.editDropdownFilter?"|"+p.col.colDef.editDropdownFilter:"";m=m.replace(E.CUSTOM_FILTERS,o);var a="text";switch(p.col.colDef.type){case"boolean":a="checkbox";break;case"number":a="number";break;case"date":a="date"}m=m.replace("INPUT_TYPE",a);var l=p.col.colDef.editDropdownOptionsFunction;if(l)P.when(l(p.row.entity,p.col.colDef)).then(function(e){p.editDropdownOptionsArray=e});else{var s=p.col.colDef.editDropdownRowEntityOptionsArrayPath;p.editDropdownOptionsArray=s?function(e,t){var r=(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split(".");for(;r.length;){var i=r.shift();if(!(i in e))return;e=e[i]}return e}(p.row.entity,s):p.col.colDef.editDropdownOptionsArray}p.editDropdownIdLabel=p.col.colDef.editDropdownIdLabel?p.col.colDef.editDropdownIdLabel:"id",p.editDropdownValueLabel=p.col.colDef.editDropdownValueLabel?p.col.colDef.editDropdownValueLabel:"value";var d=function(){w=!0,b();var e=angular.element(m);f.append(e),C=p.$new(),S(e)(C);var t=angular.element(f.children()[0]);t.addClass("ui-grid-cell-contents-hidden")};T.$$phase?d():p.$apply(d);var u=p.col.grid.api.core.on.scrollBegin(p,function(){p.grid.disableScrolling||(y(),p.grid.api.edit.raise.afterCellEdit(p.row.entity,p.col.colDef,v(p),h),u(),c(),g())}),c=p.$on(A.events.END_CELL_EDIT,function(){y(),p.grid.api.edit.raise.afterCellEdit(p.row.entity,p.col.colDef,v(p),h),c(),u(),g()}),g=p.$on(A.events.CANCEL_CELL_EDIT,function(){!function(){if(p.grid.disableScrolling=!1,!w)return;v.assign(p,h),p.$apply(),p.grid.api.edit.raise.cancelCellEdit(p.row.entity,p.col.colDef),y()}(),g(),u(),c()});p.$broadcast(A.events.BEGIN_CELL_EDIT,e),x(function(){p.grid.api.edit.raise.beginCellEdit(p.row.entity,p.col.colDef,e)})}(e)})}function y(){if(p.grid.disableScrolling=!1,w){i&&i.grid.api.cellNav&&i.focus();var e=angular.element(f.children()[0]);C.$destroy();for(var t=f.children(),r=1;r<t.length;r++)angular.element(t[r]).remove();e.removeClass("ui-grid-cell-contents-hidden"),w=!1,l(),p.grid.api.core.notifyDataChange(E.dataChange.EDIT)}}}}}]),e.directive("uiGridEditor",["gridUtil","uiGridConstants","uiGridEditConstants","$timeout","uiGridEditService",function(e,l,s,d,u){return{scope:!0,require:["?^uiGrid","?^uiGridRenderContainer","ngModel"],compile:function(){return{pre:function(e,t,r){},post:function(t,r,e,i){var n,o,a;i[0]&&(n=i[0]),i[1]&&(o=i[1]),i[2]&&(a=i[2]),t.$on(s.events.BEGIN_CELL_EDIT,function(){if(d(function(){if(r[0].focus(),!r[0].select||!t.col.colDef.enableCellEditOnFocus&&n&&n.grid.api.cellNav)try{r[0].setSelectionRange(r[0].value.length,r[0].value.length)}catch(e){}else r[0].select()}),n&&n.grid.api.cellNav)var i=n.grid.api.cellNav.on.viewPortKeyPress(t,function(e,t){if(u.isStartEditKey(e)){var r="number"==typeof e.which?e.which:e.keyCode;0<r&&(a.$setViewValue(String.fromCharCode(r),e),a.$render())}i()});r.on("mousedown",function(e){"checkbox"===r[0].type&&(r.off("blur",t.stopEdit),d(function(){r[0].focus(),r.on("blur",t.stopEdit)}))}),r.on("blur",t.stopEdit)}),t.deepEdit=!1,t.stopEdit=function(e){t.inputForm&&!t.inputForm.$valid?(e.stopPropagation(),t.$emit(s.events.CANCEL_CELL_EDIT)):t.$emit(s.events.END_CELL_EDIT),t.deepEdit=!1},r.on("click",function(e){"checkbox"!==r[0].type&&(t.deepEdit=!0,t.$applyAsync(function(){t.grid.disableScrolling=!0}))}),r.on("keydown",function(e){switch(e.keyCode){case l.keymap.ESC:e.stopPropagation(),t.$emit(s.events.CANCEL_CELL_EDIT)}if(!t.deepEdit||e.keyCode!==l.keymap.LEFT&&e.keyCode!==l.keymap.RIGHT&&e.keyCode!==l.keymap.UP&&e.keyCode!==l.keymap.DOWN)if(n&&n.grid.api.cellNav)e.uiGridTargetRenderContainerId=o.containerId,null!==n.cellNav.handleKeyDown(e)&&t.stopEdit(e);else switch(e.keyCode){case l.keymap.ENTER:case l.keymap.TAB:e.stopPropagation(),e.preventDefault(),t.stopEdit(e)}else e.stopPropagation();return!0}),t.$on("$destroy",function(){r.off()})}}}}}]),e.directive("uiGridEditor",["$filter",function(n){return{priority:-100,require:"?ngModel",link:function(e,t,r,i){2===angular.version.minor&&r.type&&"date"===r.type&&i&&(i.$formatters.push(function(e){return i.$setValidity(null,!e||!isNaN(e.getTime())),n("date")(e,"yyyy-MM-dd")}),i.$parsers.push(function(e){if(e&&0<e.length){var t=function(e){if(void 0===e||""===e)return null;var t=e.split("-");if(3!==t.length)return null;var r=parseInt(t[0],10),i=parseInt(t[1],10),n=parseInt(t[2],10);return i<1||r<1||n<1?null:new Date(r,i-1,n)}(e);return i.$setValidity(null,t&&!isNaN(t.getTime())),t}return i.$setValidity(null,!0),null}))}}}]),e.directive("uiGridEditDropdown",["uiGridConstants","uiGridEditConstants","$timeout",function(a,l,s){return{require:["?^uiGrid","?^uiGridRenderContainer"],scope:!0,compile:function(){return{pre:function(e,t,r){},post:function(t,e,r,i){var n=i[0],o=i[1];t.$on(l.events.BEGIN_CELL_EDIT,function(){s(function(){e[0].focus()}),e[0].style.width=e[0].parentElement.offsetWidth-1+"px",e.on("blur",function(e){t.stopEdit(e)})}),t.stopEdit=function(e){t.$emit(l.events.END_CELL_EDIT)},e.on("keydown",function(e){switch(e.keyCode){case a.keymap.ESC:e.stopPropagation(),t.$emit(l.events.CANCEL_CELL_EDIT)}if(n&&n.grid.api.cellNav)e.uiGridTargetRenderContainerId=o.containerId,null!==n.cellNav.handleKeyDown(e)&&t.stopEdit(e);else switch(e.keyCode){case a.keymap.ENTER:case a.keymap.TAB:e.stopPropagation(),e.preventDefault(),t.stopEdit(e)}return!0}),t.$on("$destroy",function(){e.off()})}}}}}]),e.directive("uiGridEditFileChooser",["gridUtil","uiGridConstants","uiGridEditConstants",function(o,e,a){return{scope:!0,require:["?^uiGrid","?^uiGridRenderContainer"],compile:function(){return{pre:function(e,t,r){},post:function(i,n){n[0].addEventListener("change",function e(t){var r=t.srcElement||t.target;r&&r.files&&0<r.files.length?("function"==typeof i.col.colDef.editFileChooserCallback?i.col.colDef.editFileChooserCallback(i.row,i.col,r.files):o.logError("You need to set colDef.editFileChooserCallback to use the file chooser"),r.form.reset(),i.$emit(a.events.END_CELL_EDIT)):i.$emit(a.events.CANCEL_CELL_EDIT),n[0].removeEventListener("change",e,!1)},!1),i.$on(a.events.BEGIN_CELL_EDIT,function(){n[0].focus(),n[0].select(),n.on("blur",function(){i.$emit(a.events.END_CELL_EDIT),n.off()})})}}}}}])}(),function(){"use strict";var e=angular.module("ui.grid.emptyBaseLayer",["ui.grid"]);e.service("uiGridBaseLayerService",["gridUtil","$compile",function(e,t){return{initializeGrid:function(e,t){!(e.baseLayer={emptyRows:[]})!==e.options.enableEmptyGridBaseLayer&&(e.options.enableEmptyGridBaseLayer=!t)},setNumberOfEmptyRows:function(e,t){var r=t.options.rowHeight,i=Math.ceil(e/r);if(0<i){t.baseLayer.emptyRows=[];for(var n=0;n<i;n++)t.baseLayer.emptyRows.push({})}}}}]),e.directive("uiGridEmptyBaseLayer",["gridUtil","uiGridBaseLayerService","$parse",function(e,a,o){return{require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){var n=!1===o(r.uiGridEmptyBaseLayer)(e);a.initializeGrid(i.grid,n)},post:function(e,t,r,i){if(i.grid.options.enableEmptyGridBaseLayer){var n=i.grid.renderContainers.body,o=n.getViewportHeight();i.grid.registerStyleComputation({func:function(){var e,t;return(e=n.getViewportHeight())!==o&&(o=e,1)&&a.setNumberOfEmptyRows(o,i.grid),t=o,".grid"+i.grid.id+" .ui-grid-render-container .ui-grid-empty-base-layer-container.ui-grid-canvas { height: "+t+"px; }"}})}}}}}}]),e.directive("uiGridViewport",["$compile","gridUtil","$templateCache",function(e,t,r){return{priority:-200,scope:!1,compile:function(e){var t=r.get("ui-grid/emptyBaseLayerContainer");return e.prepend(t),{pre:function(e,t,r,i){},post:function(e,t,r,i){}}}}}])}(),function(){"use strict";var e=angular.module("ui.grid.expandable",["ui.grid"]);e.service("uiGridExpandableService",["gridUtil",function(t){var n={initializeGrid:function(i){i.expandable={},i.expandable.expandedAll=!1,i.options.enableOnDblClickExpand=!1!==i.options.enableOnDblClickExpand,i.options.enableExpandable=!1!==i.options.enableExpandable,i.options.showExpandAllButton=!1!==i.options.showExpandAllButton,i.options.expandableRowHeight=i.options.expandableRowHeight||150,i.options.expandableRowHeaderWidth=i.options.expandableRowHeaderWidth||40,i.options.enableExpandable&&!i.options.expandableRowTemplate&&(t.logError("You have not set the expandableRowTemplate, disabling expandable module"),i.options.enableExpandable=!1);var e={events:{expandable:{rowExpandedBeforeStateChanged:function(e,t,r){},rowExpandedStateChanged:function(e,t,r){},rowExpandedRendered:function(e,t,r){}}},methods:{expandable:{toggleRowExpansion:function(e,t){var r=i.getRow(e);null!==r&&n.toggleRowExpansion(i,r,t)},expandAllRows:function(){n.expandAllRows(i)},collapseAllRows:function(){n.collapseAllRows(i)},toggleAllRows:function(){n.toggleAllRows(i)},expandRow:function(e){var t=i.getRow(e);null===t||t.isExpanded||n.toggleRowExpansion(i,t)},collapseRow:function(e){var t=i.getRow(e);null!==t&&t.isExpanded&&n.toggleRowExpansion(i,t)},getExpandedRows:function(){return n.getExpandedRows(i).map(function(e){return e.entity})}}}};i.api.registerEventsFromObject(e.events),i.api.registerMethodsFromObject(e.methods)},toggleRowExpansion:function(t,r,i){t.api.expandable.raise.rowExpandedBeforeStateChanged(r),r.isExpanded=!r.isExpanded,angular.isUndefined(r.expandedRowHeight)&&(r.expandedRowHeight=t.options.expandableRowHeight),r.isExpanded?(r.height=r.grid.options.rowHeight+r.expandedRowHeight,t.expandable.expandedAll=n.getExpandedRows(t).length===t.rows.length):(r.height=r.grid.options.rowHeight,t.expandable.expandedAll=!1),t.api.expandable.raise.rowExpandedStateChanged(r,i),function e(){r.expandedRendered?t.api.expandable.raise.rowExpandedRendered(r,i):window.setTimeout(e,100)}()},expandAllRows:function(t){t.renderContainers.body.visibleRowCache.forEach(function(e){e.isExpanded||e.entity.subGridOptions&&e.entity.subGridOptions.disableRowExpandable||n.toggleRowExpansion(t,e)}),t.expandable.expandedAll=!0,t.queueGridRefresh()},collapseAllRows:function(t){t.renderContainers.body.visibleRowCache.forEach(function(e){e.isExpanded&&n.toggleRowExpansion(t,e)}),t.expandable.expandedAll=!1,t.queueGridRefresh()},toggleAllRows:function(e){e.expandable.expandedAll?n.collapseAllRows(e):n.expandAllRows(e)},getExpandedRows:function(e){return e.rows.filter(function(e){return e.isExpanded})}};return n}]),e.directive("uiGridExpandable",["uiGridExpandableService","$templateCache",function(o,a){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){if(o.initializeGrid(i.grid),i.grid.options.enableExpandable&&!1!==i.grid.options.enableExpandableRowHeader){var n={name:"expandableButtons",displayName:"",exporterSuppressExport:!0,enableColumnResizing:!1,enableColumnMenu:!1,width:i.grid.options.expandableRowHeaderWidth||30};n.cellTemplate=a.get("ui-grid/expandableRowHeader"),n.headerCellTemplate=a.get("ui-grid/expandableTopRowHeader"),i.grid.addRowHeaderColumn(n,-90)}},post:function(e,t,r,i){}}}}}]),e.directive("uiGrid",function(){return{replace:!0,priority:599,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){i.grid.api.core.on.renderingComplete(e,function(){e.row&&e.row.grid&&e.row.grid.options&&e.row.grid.options.enableExpandable&&(i.grid.parentRow=e.row)})},post:function(e,t,r,i){}}}}}),e.directive("uiGridExpandableRow",["uiGridExpandableService","$compile","uiGridConstants","gridUtil",function(e,a,t,r){return{replace:!1,priority:0,scope:!1,compile:function(){return{pre:function(n,o){r.getTemplate(n.grid.options.expandableRowTemplate).then(function(e){if(n.grid.options.expandableRowScope){var t=n.grid.options.expandableRowScope;for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r])}var i=angular.element(e);i=a(i)(n),o.append(i),n.row.element=o,n.row.expandedRendered=!0})},post:function(e,t){e.row.element=t,e.$on("$destroy",function(){e.row.expandedRendered=!1})}}}}}]),e.directive("uiGridRow",function(){return{priority:-200,scope:!1,compile:function(){return{pre:function(t,e){t.grid.options.enableExpandable&&(t.expandableRow={},t.expandableRow.shouldRenderExpand=function(){return"body"===t.colContainer.name&&!1!==t.grid.options.enableExpandable&&t.row.isExpanded&&(!t.grid.isScrollingVertically||t.row.expandedRendered)},t.expandableRow.shouldRenderFiller=function(){return t.row.isExpanded&&("body"!==t.colContainer.name||t.grid.isScrollingVertically&&!t.row.expandedRendered)},t.grid.options.enableOnDblClickExpand&&e.on("dblclick",function(e){t.grid.api.expandable.toggleRowExpansion(t.row.entity,e)}))},post:function(e,t,r,i){}}}}}),e.directive("uiGridViewport",["$compile","gridUtil","$templateCache",function(e,t,n){return{priority:-200,scope:!1,compile:function(e){var t=angular.element(e.children().children()[0]),r=n.get("ui-grid/expandableScrollFiller"),i=n.get("ui-grid/expandableRow");return t.append(i),t.append(r),{pre:function(e,t,r,i){},post:function(e,t,r,i){}}}}}])}(),function(){"use strict";var e=angular.module("ui.grid.exporter",["ui.grid"]);e.constant("uiGridExporterConstants",{featureName:"exporter",rowHeaderColName:"treeBaseRowHeaderCol",selectionRowHeaderColName:"selectionRowHeaderCol",ALL:"all",VISIBLE:"visible",SELECTED:"selected",CSV_CONTENT:"CSV_CONTENT",BUTTON_LABEL:"BUTTON_LABEL",FILE_NAME:"FILE_NAME"}),e.service("uiGridExporterService",["$filter","$q","uiGridExporterConstants","gridUtil","$compile","$interval","i18nService",function(s,n,p,u,e,t,r){var i={delay:100,initializeGrid:function(r){r.exporter={},this.defaultGridOptions(r.options);var e={events:{exporter:{}},methods:{exporter:{csvExport:function(e,t){i.csvExport(r,e,t)},pdfExport:function(e,t){i.pdfExport(r,e,t)},excelExport:function(e,t){i.excelExport(r,e,t)}}}};r.api.registerEventsFromObject(e.events),r.api.registerMethodsFromObject(e.methods),r.api.core.addToGridMenu?i.addToMenu(r):t(function(){r.api.core.addToGridMenu&&i.addToMenu(r)},this.delay,1)},defaultGridOptions:function(e){e.exporterSuppressMenu=!0===e.exporterSuppressMenu,e.exporterMenuLabel=e.exporterMenuLabel?e.exporterMenuLabel:"Export",e.exporterSuppressColumns=e.exporterSuppressColumns?e.exporterSuppressColumns:[],e.exporterCsvColumnSeparator=e.exporterCsvColumnSeparator?e.exporterCsvColumnSeparator:",",e.exporterCsvFilename=e.exporterCsvFilename?e.exporterCsvFilename:"download.csv",e.exporterPdfFilename=e.exporterPdfFilename?e.exporterPdfFilename:"download.pdf",e.exporterExcelFilename=e.exporterExcelFilename?e.exporterExcelFilename:"download.xlsx",e.exporterExcelSheetName=e.exporterExcelSheetName?e.exporterExcelSheetName:"Sheet1",e.exporterOlderExcelCompatibility=!0===e.exporterOlderExcelCompatibility,e.exporterIsExcelCompatible=!0===e.exporterIsExcelCompatible,e.exporterMenuItemOrder=e.exporterMenuItemOrder?e.exporterMenuItemOrder:200,e.exporterPdfDefaultStyle=e.exporterPdfDefaultStyle?e.exporterPdfDefaultStyle:{fontSize:11},e.exporterPdfTableStyle=e.exporterPdfTableStyle?e.exporterPdfTableStyle:{margin:[0,5,0,15]},e.exporterPdfTableHeaderStyle=e.exporterPdfTableHeaderStyle?e.exporterPdfTableHeaderStyle:{bold:!0,fontSize:12,color:"black"},e.exporterPdfHeader=e.exporterPdfHeader?e.exporterPdfHeader:null,e.exporterPdfFooter=e.exporterPdfFooter?e.exporterPdfFooter:null,e.exporterPdfOrientation=e.exporterPdfOrientation?e.exporterPdfOrientation:"landscape",e.exporterPdfPageSize=e.exporterPdfPageSize?e.exporterPdfPageSize:"A4",e.exporterPdfMaxGridWidth=e.exporterPdfMaxGridWidth?e.exporterPdfMaxGridWidth:720,e.exporterMenuAllData=void 0===e.exporterMenuAllData||e.exporterMenuAllData,e.exporterMenuVisibleData=void 0===e.exporterMenuVisibleData||e.exporterMenuVisibleData,e.exporterMenuSelectedData=void 0===e.exporterMenuSelectedData||e.exporterMenuSelectedData,e.exporterMenuCsv=void 0===e.exporterMenuCsv||e.exporterMenuCsv,e.exporterMenuPdf=void 0===e.exporterMenuPdf||e.exporterMenuPdf,e.exporterMenuExcel=void 0===e.exporterMenuExcel||e.exporterMenuExcel,e.exporterPdfCustomFormatter=e.exporterPdfCustomFormatter&&"function"==typeof e.exporterPdfCustomFormatter?e.exporterPdfCustomFormatter:function(e){return e},e.exporterHeaderFilterUseName=!0===e.exporterHeaderFilterUseName,e.exporterFieldCallback=e.exporterFieldCallback?e.exporterFieldCallback:o,e.exporterFieldFormatCallback=e.exporterFieldFormatCallback?e.exporterFieldFormatCallback:function(e,t,r,i){return null},e.exporterExcelCustomFormatters=e.exporterExcelCustomFormatters?e.exporterExcelCustomFormatters:function(e,t,r){return r},e.exporterExcelHeader=e.exporterExcelHeader?e.exporterExcelHeader:function(e,t,r,i){return null},e.exporterColumnScaleFactor=e.exporterColumnScaleFactor?e.exporterColumnScaleFactor:3.5,e.exporterFieldApplyFilters=!0===e.exporterFieldApplyFilters,e.exporterAllDataFn=e.exporterAllDataFn?e.exporterAllDataFn:null,null===e.exporterAllDataFn&&e.exporterAllDataPromise&&(e.exporterAllDataFn=e.exporterAllDataPromise)},addToMenu:function(e){e.api.core.addToGridMenu(e,[{title:r.getSafeText("gridMenu.exporterAllAsCsv"),action:function(){e.api.exporter.csvExport(p.ALL,p.ALL)},shown:function(){return e.options.exporterMenuCsv&&e.options.exporterMenuAllData},order:e.options.exporterMenuItemOrder},{title:r.getSafeText("gridMenu.exporterVisibleAsCsv"),action:function(){e.api.exporter.csvExport(p.VISIBLE,p.VISIBLE)},shown:function(){return e.options.exporterMenuCsv&&e.options.exporterMenuVisibleData},order:e.options.exporterMenuItemOrder+1},{title:r.getSafeText("gridMenu.exporterSelectedAsCsv"),action:function(){e.api.exporter.csvExport(p.SELECTED,p.VISIBLE)},shown:function(){return e.options.exporterMenuCsv&&e.options.exporterMenuSelectedData&&e.api.selection&&0<e.api.selection.getSelectedRows().length},order:e.options.exporterMenuItemOrder+2},{title:r.getSafeText("gridMenu.exporterAllAsPdf"),action:function(){e.api.exporter.pdfExport(p.ALL,p.ALL)},shown:function(){return e.options.exporterMenuPdf&&e.options.exporterMenuAllData},order:e.options.exporterMenuItemOrder+3},{title:r.getSafeText("gridMenu.exporterVisibleAsPdf"),action:function(){e.api.exporter.pdfExport(p.VISIBLE,p.VISIBLE)},shown:function(){return e.options.exporterMenuPdf&&e.options.exporterMenuVisibleData},order:e.options.exporterMenuItemOrder+4},{title:r.getSafeText("gridMenu.exporterSelectedAsPdf"),action:function(){e.api.exporter.pdfExport(p.SELECTED,p.VISIBLE)},shown:function(){return e.options.exporterMenuPdf&&e.options.exporterMenuSelectedData&&e.api.selection&&0<e.api.selection.getSelectedRows().length},order:e.options.exporterMenuItemOrder+5},{title:r.getSafeText("gridMenu.exporterAllAsExcel"),action:function(){e.api.exporter.excelExport(p.ALL,p.ALL)},shown:function(){return e.options.exporterMenuExcel&&e.options.exporterMenuAllData},order:e.options.exporterMenuItemOrder+6},{title:r.getSafeText("gridMenu.exporterVisibleAsExcel"),action:function(){e.api.exporter.excelExport(p.VISIBLE,p.VISIBLE)},shown:function(){return e.options.exporterMenuExcel&&e.options.exporterMenuVisibleData},order:e.options.exporterMenuItemOrder+7},{title:r.getSafeText("gridMenu.exporterSelectedAsExcel"),action:function(){e.api.exporter.excelExport(p.SELECTED,p.VISIBLE)},shown:function(){return e.options.exporterMenuExcel&&e.options.exporterMenuSelectedData&&e.api.selection&&0<e.api.selection.getSelectedRows().length},order:e.options.exporterMenuItemOrder+8}])},csvExport:function(i,n,o){var a=this;this.loadAllDataIfNeeded(i,n,o).then(function(){var e=i.options.showHeader?a.getColumnHeaders(i,o):[],t=a.getData(i,n,o),r=a.formatAsCsv(e,t,i.options.exporterCsvColumnSeparator);a.downloadFile(i.options.exporterCsvFilename,r,i.options.exporterCsvColumnSeparator,i.options.exporterOlderExcelCompatibility,i.options.exporterIsExcelCompatible)})},loadAllDataIfNeeded:function(t,e,r){if(e===p.ALL&&t.rows.length!==t.options.totalItems&&t.options.exporterAllDataFn)return t.options.exporterAllDataFn().then(function(e){t.modifyRows(e)});var i=n.defer();return i.resolve(),i.promise},getColumnHeaders:function(r,e){var t,i=[];if(e===p.ALL)t=r.columns;else{var n=r.renderContainers.left?r.renderContainers.left.visibleColumnCache.filter(function(e){return e.visible}):[],o=r.renderContainers.body?r.renderContainers.body.visibleColumnCache.filter(function(e){return e.visible}):[],a=r.renderContainers.right?r.renderContainers.right.visibleColumnCache.filter(function(e){return e.visible}):[];t=n.concat(o,a)}return t.forEach(function(e){if(!0!==e.colDef.exporterSuppressExport&&"$$hashKey"!==e.field&&-1===r.options.exporterSuppressColumns.indexOf(e.name)){var t={name:e.field,displayName:function(e,t){if(e.options.exporterHeaderFilter)return e.options.exporterHeaderFilterUseName?e.options.exporterHeaderFilter(t.name):e.options.exporterHeaderFilter(t.displayName);return t.headerCellFilter?s(t.headerCellFilter)(t.displayName):t.displayName}(r,e),width:e.drawnWidth?e.drawnWidth:e.width,align:e.colDef.align?e.colDef.align:"number"===e.colDef.type?"right":"left"};i.push(t)}}),i},getRowsFromNode:function(e){for(var t=[],r=0;r<e.children.length;r++)if(e.children[r].children&&0===e.children[r].children.length)t.push(e.children[r]);else{var i=this.getRowsFromNode(e.children[r]);t=t.concat(i)}return t},getDataSorted:function(e){if(!e.treeBase||0===e.treeBase.numberLevels)return e.rows;for(var t=[],r=0;r<e.treeBase.tree.length;r++)for(var i=this.getRowsFromNode(e.treeBase.tree[r]),n=0;n<i.length;n++)t.push(i[n].row);return t},getData:function(a,e,l,s){var t,r,i=[];switch(e){case p.ALL:t=this.getDataSorted(a,e,l,s);break;case p.VISIBLE:t=a.getVisibleRows();break;case p.SELECTED:a.api.selection?t=a.api.selection.getSelectedGridRows():u.logError("selection feature must be enabled to allow selected rows to be exported")}if(l===p.ALL)r=a.columns;else{var n=a.renderContainers.left?a.renderContainers.left.visibleColumnCache.filter(function(e){return e.visible}):[],o=a.renderContainers.body?a.renderContainers.body.visibleColumnCache.filter(function(e){return e.visible}):[],d=a.renderContainers.right?a.renderContainers.right.visibleColumnCache.filter(function(e){return e.visible}):[];r=n.concat(o,d)}return t.forEach(function(n){if(!1!==n.exporterEnableExporting){var o=[];r.forEach(function(e){if((e.visible||l===p.ALL)&&!0!==e.colDef.exporterSuppressExport&&"$$hashKey"!==e.field&&-1===a.options.exporterSuppressColumns.indexOf(e.name)){var t=s?a.getCellDisplayValue(n,e):a.getCellValue(n,e),r={value:a.options.exporterFieldCallback(a,n,e,t)},i=a.options.exporterFieldFormatCallback(a,n,e,t);i&&Object.assign(r,i),e.colDef.exporterPdfAlign&&(r.alignment=e.colDef.exporterPdfAlign),o.push(r)}}),i.push(o)}}),i},formatAsCsv:function(e,t,r){var i=e.map(function(e){return{value:e.displayName}}),n=0<i.length?this.formatRowAsCsv(this,r)(i)+"\n":"";return n+=t.map(this.formatRowAsCsv(this,r)).join("\n")},formatRowAsCsv:function(t,r){return function(e){return e.map(t.formatFieldAsCsv).join(r)}},formatFieldAsCsv:function(e){return null==e.value?"":"number"==typeof e.value?e.value:"boolean"==typeof e.value?e.value?"TRUE":"FALSE":"string"==typeof e.value?'"'+e.value.replace(/"/g,'""')+'"':"object"!=typeof e.value||e.value instanceof Date?JSON.stringify(e.value):'"'+JSON.stringify(e.value).replace(/"/g,'""')+'"'},isIE:function(){var e=!1;return-1!==navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/)&&(e=!0),e},downloadFile:function(e,t,r,i,n){var o,a=document,l=a.createElement("a"),s="application/octet-stream;charset=utf-8",d=this.isIE();if(n&&(t="sep="+r+"\r\n"+t),navigator.msSaveBlob)return navigator.msSaveOrOpenBlob(new Blob([i?"\ufeff":"",t],{type:s}),e);if(d){var u=a.createElement("iframe");return document.body.appendChild(u),u.contentWindow.document.open("text/html","replace"),u.contentWindow.document.write(t),u.contentWindow.document.close(),u.contentWindow.focus(),u.contentWindow.document.execCommand("SaveAs",!0,e),document.body.removeChild(u),!0}if("download"in l){var c=new Blob([i?"\ufeff":"",t],{type:s});o=URL.createObjectURL(c),l.setAttribute("download",e)}else o="data: "+s+","+encodeURIComponent(t),l.setAttribute("target","_blank");l.href=o,l.setAttribute("style","display:none;"),a.body.appendChild(l),setTimeout(function(){if(l.click)l.click();else if(document.createEvent){var e=document.createEvent("MouseEvents");e.initEvent("click",!0,!0),l.dispatchEvent(e)}a.body.removeChild(l)},this.delay)},pdfExport:function(i,n,o){var a=this;this.loadAllDataIfNeeded(i,n,o).then(function(){var e=a.getColumnHeaders(i,o),t=a.getData(i,n,o),r=a.prepareAsPdf(i,e,t);a.isIE()||-1!==navigator.appVersion.indexOf("Edge")?a.downloadPDF(i.options.exporterPdfFilename,r):pdfMake.createPdf(r).open()})},downloadPDF:function(r,e){var i,n,o=document;o.createElement("a");i=this.isIE(),pdfMake.createPdf(e).getBuffer(function(e){if(n=new Blob([e]),navigator.msSaveBlob)return navigator.msSaveBlob(n,r);if(i){var t=o.createElement("iframe");return document.body.appendChild(t),t.contentWindow.document.open("text/html","replace"),t.contentWindow.document.write(n),t.contentWindow.document.close(),t.contentWindow.focus(),t.contentWindow.document.execCommand("SaveAs",!0,r),document.body.removeChild(t),!0}})},prepareAsPdf:function(e,t,r){var i=this.calculatePdfHeaderWidths(e,t),n=t.map(function(e){return{text:e.displayName,style:"tableHeader"}}),o=r.map(this.formatRowAsPdf(this)),a=[n].concat(o),l={pageOrientation:e.options.exporterPdfOrientation,pageSize:e.options.exporterPdfPageSize,content:[{style:"tableStyle",table:{headerRows:1,widths:i,body:a}}],styles:{tableStyle:e.options.exporterPdfTableStyle,tableHeader:e.options.exporterPdfTableHeaderStyle},defaultStyle:e.options.exporterPdfDefaultStyle};return e.options.exporterPdfLayout&&(l.layout=e.options.exporterPdfLayout),e.options.exporterPdfHeader&&(l.header=e.options.exporterPdfHeader),e.options.exporterPdfFooter&&(l.footer=e.options.exporterPdfFooter),e.options.exporterPdfCustomFormatter&&(l=e.options.exporterPdfCustomFormatter(l)),l},calculatePdfHeaderWidths:function(t,e){var r=0;e.forEach(function(e){"number"==typeof e.width&&(r+=e.width)});var i=0;e.forEach(function(e){if("*"===e.width&&(i+=100),"string"==typeof e.width&&e.width.match(/(\d)*%/)){var t=parseInt(e.width.match(/(\d)*%/)[0]);e.width=r*t/100,i+=e.width}});var n=r+i;return e.map(function(e){return"*"===e.width?e.width:e.width*t.options.exporterPdfMaxGridWidth/n})},formatRowAsPdf:function(t){return function(e){return e.map(t.formatFieldAsPdfString)}},formatFieldAsPdfString:function(e){var t;return t=null==e.value?"":"number"==typeof e.value?e.value.toString():"boolean"==typeof e.value?e.value?"TRUE":"FALSE":"string"==typeof e.value?e.value.replace(/"/g,'""'):e.value instanceof Date?JSON.stringify(e.value).replace(/^"/,"").replace(/"$/,""):"object"==typeof e.value?e.value:JSON.stringify(e.value).replace(/^"/,"").replace(/"$/,""),e.alignment&&"string"==typeof e.alignment&&(t={text:t,alignment:e.alignment}),t},formatAsExcel:function(e,t,r,i,n){for(var o=e.map(function(e){return{value:e.displayName}}),a=[],l=[],s=0;s<o.length;s++){var d="header";switch(e[s].align){case"center":d="headerCenter";break;case"right":d="headerRight"}var u=n.styles&&n.styles[d]?{style:n.styles[d].id}:null;l.push({value:o[s].value,metadata:u})}a.push(l);for(var c=t.map(this.formatRowAsExcel(this,r,i)),g=0;g<c.length;g++)a.push(c[g]);return a},formatRowAsExcel:function(n,o,a){return function(e){for(var t=[],r=0;r<e.length;r++){var i=n.formatFieldAsExcel(e[r],o,a);t.push({value:i,metadata:e[r].metadata})}return t}},formatFieldAsExcel:function(e,t,r,i){return null==e.value?"":"number"==typeof e.value?e.value:"boolean"==typeof e.value?e.value?"TRUE":"FALSE":"string"==typeof e.value?e.value.replace(/"/g,'""'):JSON.stringify(e.value)},prepareAsExcel:function(e,t,r){var i={styles:{}};if(e.options.exporterExcelCustomFormatters&&(i=e.options.exporterExcelCustomFormatters(e,t,i)),e.options.exporterExcelHeader)if(angular.isFunction(e.options.exporterExcelHeader))e.options.exporterExcelHeader(e,t,r,i);else{var n=e.options.exporterExcelHeader.text,o=e.options.exporterExcelHeader.style;r.data.push([{value:n,metadata:{style:i.styles[o].id}}])}return i},excelExport:function(d,u,c){var g=this;this.loadAllDataIfNeeded(d,u,c).then(function(){var e=d.options.showHeader?g.getColumnHeaders(d,c):[],t=new ExcelBuilder.Workbook,r=d.options.exporterExcelSheetName?d.options.exporterExcelSheetName:"Sheet1",i=new ExcelBuilder.Worksheet({name:r});t.addWorksheet(i);for(var n=g.prepareAsExcel(d,t,i),o=[],a=d.treeBase?d.treeBase.numberLevels:d.enableRowSelection?1:0;a<d.columns.length;a++)d.columns[a].field!==p.rowHeaderColName&&d.columns[a].field!==p.selectionRowHeaderColName&&o.push({width:d.columns[a].drawnWidth/d.options.exporterColumnScaleFactor});i.setColumns(o);var l=g.getData(d,u,c,d.options.exporterFieldApplyFilters),s=g.formatAsExcel(e,l,t,i,n);i.setData(i.data.concat(s)),ExcelBuilder.Builder.createFile(t,{type:"blob"}).then(function(e){g.downloadFile(d.options.exporterExcelFilename,e,d.options.exporterCsvColumnSeparator,d.options.exporterOlderExcelCompatibility)})})}};function o(e,t,r,i){var n,o,a,l;return r.cellFilter?(o=(n=r.cellFilter.replace(/[\'\"\s]/g,"").split(":"))[0]?n[0]:null,a=n[1]?n[1]:null,l=n[2]?n[2]:null,s(o)(i,a,l)):i}return i}]),e.directive("uiGridExporter",["uiGridExporterConstants","uiGridExporterService","gridUtil","$compile",function(e,n,t,r){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,link:function(e,t,r,i){n.initializeGrid(i.grid),i.grid.exporter.$scope=e}}}])}(),function(){"use strict";var e=angular.module("ui.grid.grouping",["ui.grid","ui.grid.treeBase"]);e.constant("uiGridGroupingConstants",{featureName:"grouping",rowHeaderColName:"treeBaseRowHeaderCol",EXPANDED:"expanded",COLLAPSED:"collapsed",aggregation:{COUNT:"count",SUM:"sum",MAX:"max",MIN:"min",AVG:"avg"}}),e.service("uiGridGroupingService",["$q","uiGridGroupingConstants","gridUtil","rowSorter","GridRow","gridClassFactory","i18nService","uiGridConstants","uiGridTreeBaseService",function(e,l,s,d,g,p,u,i,c){var f={initializeGrid:function(n,e){c.initializeGrid(n,e),n.grouping={},n.grouping.groupHeaderCache={},f.defaultGridOptions(n.options),n.registerRowsProcessor(f.groupRows,400),n.registerColumnBuilder(f.groupingColumnBuilder),n.registerColumnsProcessor(f.groupingColumnProcessor,400);var t={events:{grouping:{aggregationChanged:{},groupingChanged:{}}},methods:{grouping:{getGrouping:function(e){var t=f.getGrouping(n);return t.grouping.forEach(function(e){e.colName=e.col.name,delete e.col}),t.aggregations.forEach(function(e){e.colName=e.col.name,delete e.col}),t.aggregations=t.aggregations.filter(function(e){return!e.aggregation.source||"grouping"!==e.aggregation.source}),e&&(t.rowExpandedStates=f.getRowExpandedStates(n.grouping.groupingHeaderCache)),t},setGrouping:function(e){f.setGrouping(n,e)},groupColumn:function(e){var t=n.getColumn(e);f.groupColumn(n,t)},ungroupColumn:function(e){var t=n.getColumn(e);f.ungroupColumn(n,t)},clearGrouping:function(){f.clearGrouping(n)},aggregateColumn:function(e,t,r){var i=n.getColumn(e);f.aggregateColumn(n,i,t,r)}}}};n.api.registerEventsFromObject(t.events),n.api.registerMethodsFromObject(t.methods),n.api.core.on.sortChanged(e,f.tidyPriorities)},defaultGridOptions:function(e){e.enableGrouping=!1!==e.enableGrouping,e.groupingShowCounts=!1!==e.groupingShowCounts,e.groupingNullLabel=void 0===e.groupingNullLabel?"Null":e.groupingNullLabel,e.enableGroupHeaderSelection=!0===e.enableGroupHeaderSelection},groupingColumnBuilder:function(e,i,t){if(!1!==e.enableGrouping){void 0===i.grouping&&void 0!==e.grouping?(i.grouping=angular.copy(e.grouping),void 0!==i.grouping.groupPriority&&-1<i.grouping.groupPriority&&(i.treeAggregationFn=c.nativeAggregations()[l.aggregation.COUNT].aggregationFn,i.treeAggregationFinalizerFn=f.groupedFinalizerFn)):void 0===i.grouping&&(i.grouping={}),void 0!==i.grouping&&void 0!==i.grouping.groupPriority&&0<=i.grouping.groupPriority&&(i.suppressRemoveSort=!0);var r={name:"ui.grid.grouping.group",title:u.get().grouping.group,icon:"ui-grid-icon-indent-right",shown:function(){return void 0===this.context.col.grouping||void 0===this.context.col.grouping.groupPriority||this.context.col.grouping.groupPriority<0},action:function(){f.groupColumn(this.context.col.grid,this.context.col)}},n={name:"ui.grid.grouping.ungroup",title:u.get().grouping.ungroup,icon:"ui-grid-icon-indent-left",shown:function(){return void 0!==this.context.col.grouping&&void 0!==this.context.col.grouping.groupPriority&&0<=this.context.col.grouping.groupPriority},action:function(){f.ungroupColumn(this.context.col.grid,this.context.col)}},o={name:"ui.grid.grouping.aggregateRemove",title:u.get().grouping.aggregate_remove,shown:function(){return void 0!==this.context.col.treeAggregationFn},action:function(){f.aggregateColumn(this.context.col.grid,this.context.col,null)}},a=function(e,t){t=t||u.get().grouping["aggregate_"+e]||e;var r={name:"ui.grid.grouping.aggregate"+e,title:t,shown:function(){return void 0===this.context.col.treeAggregation||void 0===this.context.col.treeAggregation.type||this.context.col.treeAggregation.type!==e},action:function(){f.aggregateColumn(this.context.col.grid,this.context.col,e)}};s.arrayContainsObjectWithProperty(i.menuItems,"name","ui.grid.grouping.aggregate"+e)||i.menuItems.push(r)};!1!==i.colDef.groupingShowGroupingMenu&&(s.arrayContainsObjectWithProperty(i.menuItems,"name","ui.grid.grouping.group")||i.menuItems.push(r),s.arrayContainsObjectWithProperty(i.menuItems,"name","ui.grid.grouping.ungroup")||i.menuItems.push(n)),!1!==i.colDef.groupingShowAggregationMenu&&(angular.forEach(c.nativeAggregations(),function(e,t){a(t)}),angular.forEach(t.treeCustomAggregations,function(e,t){a(t,e.menuTitle)}),s.arrayContainsObjectWithProperty(i.menuItems,"name","ui.grid.grouping.aggregateRemove")||i.menuItems.push(o))}},groupingColumnProcessor:function(e,t){return e=f.moveGroupColumns(this,e,t)},groupedFinalizerFn:function(e){void 0!==e.groupVal?(e.rendered=e.groupVal,this.grid.options.groupingShowCounts&&"date"!==this.colDef.type&&"object"!==this.colDef.type&&(e.rendered+=" ("+e.value+")")):e.rendered=null},moveGroupColumns:function(e,t){return!1===e.options.moveGroupColumns||(t.forEach(function(e,t){e.groupingPosition=t}),t.sort(function(e,t){var r,i;return r=e.isRowHeader?e.headerPriority:void 0===e.grouping||void 0===e.grouping.groupPriority||e.grouping.groupPriority<0?null:e.grouping.groupPriority,i=t.isRowHeader?t.headerPriority:void 0===t.grouping||void 0===t.grouping.groupPriority||t.grouping.groupPriority<0?null:t.grouping.groupPriority,null!==r&&null===i?-1:null!==i&&null===r?1:null!==r&&null!==i?r-i:e.groupingPosition-t.groupingPosition}),t.forEach(function(e){delete e.groupingPosition})),t},groupColumn:function(e,t){void 0===t.grouping&&(t.grouping={});var r=f.getGrouping(e);t.grouping.groupPriority=r.grouping.length,t.previousSort=angular.copy(t.sort),t.sort?void 0!==t.sort.direction&&null!==t.sort.direction||(t.sort.direction=i.ASC):t.sort={direction:i.ASC},t.treeAggregation={type:l.aggregation.COUNT,source:"grouping"},t.colDef&&angular.isFunction(t.colDef.customTreeAggregationFn)?t.treeAggregationFn=t.colDef.customTreeAggregationFn:t.treeAggregationFn=c.nativeAggregations()[l.aggregation.COUNT].aggregationFn,t.treeAggregationFinalizerFn=f.groupedFinalizerFn,e.api.grouping.raise.groupingChanged(t),e.api.core.raise.sortChanged(e,e.getColumnSorting()),e.queueGridRefresh()},ungroupColumn:function(e,t){void 0!==t.grouping&&(delete t.grouping.groupPriority,delete t.treeAggregation,delete t.customTreeAggregationFinalizer,t.previousSort&&(t.sort=t.previousSort,delete t.previousSort),f.tidyPriorities(e),e.api.grouping.raise.groupingChanged(t),e.api.core.raise.sortChanged(e,e.getColumnSorting()),e.queueGridRefresh())},aggregateColumn:function(e,t,r){void 0!==t.grouping&&void 0!==t.grouping.groupPriority&&0<=t.grouping.groupPriority&&f.ungroupColumn(e,t);var i={};void 0!==e.options.treeCustomAggregations[r]?i=e.options.treeCustomAggregations[r]:void 0!==c.nativeAggregations()[r]&&(i=c.nativeAggregations()[r]),t.treeAggregation={type:r,label:u.get().aggregation[i.label]||i.label},t.treeAggregationFn=i.aggregationFn,t.treeAggregationFinalizerFn=i.finalizerFn,e.api.grouping.raise.aggregationChanged(t),e.queueGridRefresh()},setGrouping:function(r,e){void 0!==e&&(f.clearGrouping(r),e.grouping&&e.grouping.length&&0<e.grouping.length&&e.grouping.forEach(function(e){var t=r.getColumn(e.colName);t&&f.groupColumn(r,t)}),e.aggregations&&e.aggregations.length&&e.aggregations.forEach(function(e){var t=r.getColumn(e.colName);t&&f.aggregateColumn(r,t,e.aggregation.type)}),e.rowExpandedStates&&f.applyRowExpandedStates(r.grouping.groupingHeaderCache,e.rowExpandedStates))},clearGrouping:function(t){var e=f.getGrouping(t);0<e.grouping.length&&e.grouping.forEach(function(e){e.col||(e.col=t.getColumn(e.colName)),f.ungroupColumn(t,e.col)}),0<e.aggregations.length&&e.aggregations.forEach(function(e){e.col||(e.col=t.getColumn(e.colName)),f.aggregateColumn(t,e.col,null)})},tidyPriorities:function(e){void 0!==e&&void 0===e.grid||void 0===this.grid||(e=this.grid);var r=[],i=[];e.columns.forEach(function(e,t){void 0!==e.grouping&&void 0!==e.grouping.groupPriority&&0<=e.grouping.groupPriority?r.push(e):void 0!==e.sort&&void 0!==e.sort.priority&&0<=e.sort.priority&&i.push(e)}),r.sort(function(e,t){return e.grouping.groupPriority-t.grouping.groupPriority}),r.forEach(function(e,t){e.grouping.groupPriority=t,e.suppressRemoveSort=!0,void 0===e.sort&&(e.sort={}),e.sort.priority=t});var t=r.length;i.sort(function(e,t){return e.sort.priority-t.sort.priority}),i.forEach(function(e){e.sort.priority=t,e.suppressRemoveSort=e.colDef.suppressRemoveSort,t++})},groupRows:function(i){if(0===i.length)return i;var n=this;n.grouping.oldGroupingHeaderCache=n.grouping.groupingHeaderCache||{},n.grouping.groupingHeaderCache={};for(var o=f.initialiseProcessingState(n),e=function(e,t){var r=n.getCellValue(l,e.col);e.initialised&&0===d.getSortFn(n,e.col,i)(r,e.currentValue)||(f.insertGroupHeader(n,i,a,o,t),a++)},a=0;a<i.length;a++){var l=i[a];l.visible&&o.forEach(e)}return delete n.grouping.oldGroupingHeaderCache,i},initialiseProcessingState:function(e){var r=[];return f.getGrouping(e).grouping.forEach(function(e,t){r.push({fieldName:e.field,col:e.col,initialised:!1,currentValue:null,currentRow:null})}),r},getGrouping:function(e){var t=[],r=[];return e.columns.forEach(function(e){e.grouping&&void 0!==e.grouping.groupPriority&&0<=e.grouping.groupPriority&&t.push({field:e.field,col:e,groupPriority:e.grouping.groupPriority,grouping:e.grouping}),e.treeAggregation&&e.treeAggregation.type&&r.push({field:e.field,col:e,aggregation:e.treeAggregation})}),t.sort(function(e,t){return e.groupPriority-t.groupPriority}),t.forEach(function(e,t){e.grouping.groupPriority=t,e.groupPriority=t,delete e.grouping}),{grouping:t,aggregations:r}},insertGroupHeader:function(e,t,r,i,n){var o=i[n].col,a=e.getCellValue(t[r],o),l=a;function s(e){return angular.isObject(e)?JSON.stringify(e):e}null==a&&(l=e.options.groupingNullLabel);for(var d,u=e.grouping.oldGroupingHeaderCache,c=0;c<n;c++)u&&u[s(i[c].currentValue)]&&(u=u[s(i[c].currentValue)].children);for(u&&u[s(a)]?(d=u[s(a)].row).entity={}:(d=new g({},null,e),p.rowTemplateAssigner.call(e,d)),d.entity["$$"+i[n].col.uid]={groupVal:l},d.treeLevel=n,d.groupHeader=!0,d.internalRow=!0,d.enableCellEdit=!1,d.enableSelection=e.options.enableGroupHeaderSelection,i[n].initialised=!0,i[n].currentValue=a,i[n].currentRow=d,f.finaliseProcessingState(i,n+1),t.splice(r,0,d),u=e.grouping.groupingHeaderCache,c=0;c<n;c++)u=u[s(i[c].currentValue)].children;u[s(a)]={row:d,children:{}}},finaliseProcessingState:function(e,t){for(var r=t;r<e.length;r++)e[r].initialised=!1,e[r].currentRow=null,e[r].currentValue=null},getRowExpandedStates:function(e){if(void 0===e)return{};var r={};return angular.forEach(e,function(e,t){r[t]={state:e.row.treeNode.state},e.children?r[t].children=f.getRowExpandedStates(e.children):r[t].children={}}),r},applyRowExpandedStates:function(r,e){void 0!==e&&angular.forEach(e,function(e,t){r[t]&&(r[t].row.treeNode.state=e.state,e.children&&r[t].children&&f.applyRowExpandedStates(r[t].children,e.children))})}};return f}]),e.directive("uiGridGrouping",["uiGridGroupingConstants","uiGridGroupingService",function(e,n){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){!1!==i.grid.options.enableGrouping&&n.initializeGrid(i.grid,e)},post:function(e,t,r,i){}}}}}])}(),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("ar",{headerCell:{aria:{defaultFilterLabel:"التصفيه بالعمود",removeFilter:"محو التصفيه",columnMenuButtonLabel:"قاءمه الاعمده"},priority:"أولويه : ",filterLabel:"تصفيه بالاعمده :"},aggregate:{label:"العناصر"},groupPanel:{description:"اسحب رأس العمود هنا وأسقطه لإنشاء مجموعه"},search:{placeholder:"بحث  ...",showingItems:"العناصر الظاهره :",selectedItems:"العناصر المحدده :",totalItems:"عدد العناصر :",size:"حجم الصفحه :",first:"اول صفحه",next:"الصفحه التاليه",previous:"الصفحه الصابقه",last:"الصفحه الاخيره"},menu:{text:"اختيار العمود :"},sort:{ascending:"ترتيب تصاعدى",descending:"ترتيب تنازلى",none:"عدم التحديد",remove:"حذف الترتيب"},column:{hide:"إخفاء عمود"},aggregation:{count:"عدد الصفوف: ",sum:"جمع: ",avg:"المتوسط الحسابى: ",min:"الادنى: ",max:"الاقصى: "},pinning:{pinLeft:"تثبيت لليسار",pinRight:"تثبيت لليمين",unpin:"فك التثبيت"},columnMenu:{close:"غلق"},gridMenu:{aria:{buttonLabel:"قائمه الجدول"},columns:"الاعمده:",importerTitle:"إدخال ملف",exporterAllAsCsv:"إخراج كل البيانات ك(csv)",exporterVisibleAsCsv:"إخراج كل البيانات الواضحه ك (csv)",exporterSelectedAsCsv:"إخراج كل البيانات المحدده ك (csv)",exporterAllAsPdf:"إخراج كل البيانات ك(pdf)",exporterVisibleAsPdf:"إخراج كل البيانات الواضحه ك (pdf)",exporterSelectedAsPdf:"إخراج كل البيانات المحدده ك (pdf)",clearAllFilters:"محو كل الترشيح"},importer:{noHeaders:"اسماء هؤلاء الاعمده غير واضحه، هل يوجد رأس للملف؟",noObjects:"Objects were not able to be derived, was there data in the file other than headers?",invalidCsv:"الملف غير قادر على الاتمام ، هل ال (CSV) صحيح؟",invalidJson:"الملف غير قادر على الاتمام ، هل ال (JSON) صحيح؟",jsonNotArray:"Imported json file must contain an array, aborting."},pagination:{aria:{pageToFirst:"الصفحه الاولى",pageBack:"الصفه السابقه",pageSelected:"الصفحه المحدده",pageForward:"الصفحه التاليه",pageToLast:"الصفحه الاخيره"},sizes:"عدد العناصر فى الصفحه",totalItems:"عناصر",through:"إلى",of:"من"},grouping:{group:"جمع",ungroup:"فك الجمع",aggregate_count:"جمله : العدد",aggregate_sum:"جمله : الحاصل",aggregate_max:"جمله : الاقصى",aggregate_min:"جمله : الاقل",aggregate_avg:"جمله :المتوسط ",aggregate_remove:"جمله : حذف"},validate:{error:"خطأ :",minLength:"القيمه لابد ان لا تقل عن THRESHOLD حرف.",maxLength:"القيمه لابد ان لا تزيد عن THRESHOLD حرف.",required:"مطلوب قيمه"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("bg",{headerCell:{aria:{defaultFilterLabel:"Филттър за колоната",removeFilter:"Премахни филтър",columnMenuButtonLabel:"Меню на колоната"},priority:"Приоритет:",filterLabel:"Филтър за колоната: "},aggregate:{label:"обекти"},search:{placeholder:"Търсене...",showingItems:"Показани обекти:",selectedItems:"избрани обекти:",totalItems:"Общо:",size:"Размер на страницата:",first:"Първа страница",next:"Следваща страница",previous:"Предишна страница",last:"Последна страница"},menu:{text:"Избери колони:"},sort:{ascending:"Сортиране по възходящ ред",descending:"Сортиране по низходящ ред",none:"Без сортиране",remove:"Премахни сортирането"},column:{hide:"Скрий колоната"},aggregation:{count:"Общо редове: ",sum:"общо: ",avg:"средно: ",min:"най-малко: ",max:"най-много: "},pinning:{pinLeft:"Прикрепи вляво",pinRight:"Прикрепи вдясно",unpin:"Премахване"},columnMenu:{close:"Затвори"},gridMenu:{aria:{buttonLabel:"Меню на таблицата"},columns:"Колони:",importerTitle:"Импортиране на файл",exporterAllAsCsv:"Експортиране на данните като csv",exporterVisibleAsCsv:"Експортиране на видимите данни като csv",exporterSelectedAsCsv:"Експортиране на избраните данни като csv",exporterAllAsPdf:"Експортиране на данните като pdf",exporterVisibleAsPdf:"Експортиране на видимите данни като pdf",exporterSelectedAsPdf:"Експортиране на избраните данни като pdf",clearAllFilters:"Премахни всички филтри"},importer:{noHeaders:"Имената на колоните не успяха да бъдат извлечени, файлът има ли хедър?",noObjects:"Обектите не успяха да бъдат извлечени, файлът съдържа ли данни, различни от хедър?",invalidCsv:"Файлът не може да бъде обработеб, уверете се, че е валиден CSV файл",invalidJson:"Файлът не може да бъде обработеб, уверете се, че е валиден JSON файл",jsonNotArray:"Импортираният JSON файл трябва да съдържа масив, прекратяване."},pagination:{aria:{pageToFirst:"Към първа страница",pageBack:"Страница назад",pageSelected:"Избрана страница",pageForward:"Страница напред",pageToLast:"Към последна страница"},sizes:"обекта на страница",totalItems:"обекта",through:"до",of:"от"},grouping:{group:"Групиране",ungroup:"Премахване на групирането",aggregate_count:"Сбор: Брой",aggregate_sum:"Сбор: Сума",aggregate_max:"Сбор: Максимум",aggregate_min:"Сбор: Минимум",aggregate_avg:"Сбор: Средно",aggregate_remove:"Сбор: Премахване"},validate:{error:"Грешка:",minLength:"Стойността трябва да съдържа поне THRESHOLD символа.",maxLength:"Стойността не трябва да съдържа повече от THRESHOLD символа.",required:"Необходима е стойност."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){var t={aggregate:{label:"položky"},groupPanel:{description:"Přesuňte záhlaví zde pro vytvoření skupiny dle sloupce."},search:{placeholder:"Hledat...",showingItems:"Zobrazuji položky:",selectedItems:"Vybrané položky:",totalItems:"Celkem položek:",size:"Velikost strany:",first:"První strana",next:"Další strana",previous:"Předchozí strana",last:"Poslední strana"},menu:{text:"Vyberte sloupec:"},sort:{ascending:"Seřadit od A-Z",descending:"Seřadit od Z-A",remove:"Odebrat seřazení"},column:{hide:"Schovat sloupec"},aggregation:{count:"celkem řádků: ",sum:"celkem: ",avg:"avg: ",min:"min.: ",max:"max.: "},pinning:{pinLeft:"Zamknout vlevo",pinRight:"Zamknout vpravo",unpin:"Odemknout"},gridMenu:{columns:"Sloupce:",importerTitle:"Importovat soubor",exporterAllAsCsv:"Exportovat všechna data do csv",exporterVisibleAsCsv:"Exportovat viditelná data do csv",exporterSelectedAsCsv:"Exportovat vybraná data do csv",exporterAllAsPdf:"Exportovat všechna data do pdf",exporterVisibleAsPdf:"Exportovat viditelná data do pdf",exporterSelectedAsPdf:"Exportovat vybraná data do pdf",exporterAllAsExcel:"Exportovat všechna data do excel",exporterVisibleAsExcel:"Exportovat viditelná data do excel",exporterSelectedAsExcel:"Exportovat vybraná data do excel",clearAllFilters:"Odstranit všechny filtry"},importer:{noHeaders:"Názvy sloupců se nepodařilo získat, obsahuje soubor záhlaví?",noObjects:"Data se nepodařilo zpracovat, obsahuje soubor řádky mimo záhlaví?",invalidCsv:"Soubor nelze zpracovat, jedná se o CSV?",invalidJson:"Soubor nelze zpracovat, je to JSON?",jsonNotArray:"Soubor musí obsahovat json. Ukončuji.."},pagination:{sizes:"položek na stránku",totalItems:"položek"},grouping:{group:"Seskupit",ungroup:"Odebrat seskupení",aggregate_count:"Agregace: Count",aggregate_sum:"Agregace: Sum",aggregate_max:"Agregace: Max",aggregate_min:"Agregace: Min",aggregate_avg:"Agregace: Avg",aggregate_remove:"Agregace: Odebrat"}};return e.add("cs",t),e.add("cz",t),e.add("cs-cz",t),e.add("cs-CZ",t),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("da",{aggregate:{label:"artikler"},groupPanel:{description:"Grupér rækker udfra en kolonne ved at trække dens overskift hertil."},search:{placeholder:"Søg...",showingItems:"Viste rækker:",selectedItems:"Valgte rækker:",totalItems:"Rækker totalt:",size:"Side størrelse:",first:"Første side",next:"Næste side",previous:"Forrige side",last:"Sidste side"},menu:{text:"Vælg kolonner:"},sort:{ascending:"Sorter stigende",descending:"Sorter faldende",none:"Sorter ingen",remove:"Fjern sortering"},column:{hide:"Skjul kolonne"},aggregation:{count:"antal rækker: ",sum:"sum: ",avg:"gns: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Fastgør til venstre",pinRight:"Fastgør til højre",unpin:"Frigør"},gridMenu:{columns:"Kolonner:",importerTitle:"Importer fil",exporterAllAsCsv:"Eksporter alle data som csv",exporterVisibleAsCsv:"Eksporter synlige data som csv",exporterSelectedAsCsv:"Eksporter markerede data som csv",exporterAllAsPdf:"Eksporter alle data som pdf",exporterVisibleAsPdf:"Eksporter synlige data som pdf",exporterSelectedAsPdf:"Eksporter markerede data som pdf",exporterAllAsExcel:"Eksporter alle data som excel",exporterVisibleAsExcel:"Eksporter synlige data som excel",exporterSelectedAsExcel:"Eksporter markerede data som excel",clearAllFilters:"Clear all filters"},importer:{noHeaders:"Column names were unable to be derived, does the file have a header?",noObjects:"Objects were not able to be derived, was there data in the file other than headers?",invalidCsv:"File was unable to be processed, is it valid CSV?",invalidJson:"File was unable to be processed, is it valid Json?",jsonNotArray:"Imported json file must contain an array, aborting."},pagination:{aria:{pageToFirst:"Gå til første",pageBack:"Gå tilbage",pageSelected:"Valgte side",pageForward:"Gå frem",pageToLast:"Gå til sidste"},sizes:"genstande per side",totalItems:"genstande",through:"gennem",of:"af"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("de",{headerCell:{aria:{defaultFilterLabel:"Filter für Spalte",removeFilter:"Filter löschen",columnMenuButtonLabel:"Spaltenmenü",column:"Spalte"},priority:"Priorität:",filterLabel:"Filter für Spalte: "},aggregate:{label:"Eintrag"},groupPanel:{description:"Ziehen Sie eine Spaltenüberschrift hierhin, um nach dieser Spalte zu gruppieren."},search:{aria:{selected:"Zeile markiert",notSelected:"Zeile nicht markiert"},placeholder:"Suche...",showingItems:"Zeige Einträge:",selectedItems:"Ausgewählte Einträge:",totalItems:"Einträge gesamt:",size:"Einträge pro Seite:",first:"Erste Seite",next:"Nächste Seite",previous:"Vorherige Seite",last:"Letzte Seite"},menu:{text:"Spalten auswählen:"},sort:{ascending:"aufsteigend sortieren",descending:"absteigend sortieren",none:"keine Sortierung",remove:"Sortierung zurücksetzen"},column:{hide:"Spalte ausblenden"},aggregation:{count:"Zeilen insgesamt: ",sum:"gesamt: ",avg:"Durchschnitt: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Links anheften",pinRight:"Rechts anheften",unpin:"Lösen"},columnMenu:{close:"Schließen"},gridMenu:{aria:{buttonLabel:"Tabellenmenü"},columns:"Spalten:",importerTitle:"Datei importieren",exporterAllAsCsv:"Alle Daten als CSV exportieren",exporterVisibleAsCsv:"Sichtbare Daten als CSV exportieren",exporterSelectedAsCsv:"Markierte Daten als CSV exportieren",exporterAllAsPdf:"Alle Daten als PDF exportieren",exporterVisibleAsPdf:"Sichtbare Daten als PDF exportieren",exporterSelectedAsPdf:"Markierte Daten als PDF exportieren",exporterAllAsExcel:"Alle Daten als Excel exportieren",exporterVisibleAsExcel:"Sichtbare Daten als Excel exportieren",exporterSelectedAsExcel:"Markierte Daten als Excel exportieren",clearAllFilters:"Alle Filter zurücksetzen"},importer:{noHeaders:"Es konnten keine Spaltennamen ermittelt werden. Sind in der Datei Spaltendefinitionen enthalten?",noObjects:"Es konnten keine Zeileninformationen gelesen werden, Sind in der Datei außer den Spaltendefinitionen auch Daten enthalten?",invalidCsv:"Die Datei konnte nicht eingelesen werden, ist es eine gültige CSV-Datei?",invalidJson:"Die Datei konnte nicht eingelesen werden. Enthält sie gültiges JSON?",jsonNotArray:"Die importierte JSON-Datei muß ein Array enthalten. Breche Import ab."},pagination:{aria:{pageToFirst:"Zum Anfang",pageBack:"Seite zurück",pageSelected:"Ausgewählte Seite",pageForward:"Seite vor",pageToLast:"Zum Ende"},sizes:"Einträge pro Seite",totalItems:"Einträgen",through:"bis",of:"von"},grouping:{group:"Gruppieren",ungroup:"Gruppierung aufheben",aggregate_count:"Agg: Anzahl",aggregate_sum:"Agg: Summe",aggregate_max:"Agg: Maximum",aggregate_min:"Agg: Minimum",aggregate_avg:"Agg: Mittelwert",aggregate_remove:"Aggregation entfernen"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("es-ct",{headerCell:{aria:{defaultFilterLabel:"Filtre per columna",removeFilter:"Elimina el filtre",columnMenuButtonLabel:"Menú de Columna",column:"Columna"},priority:"Priority:",filterLabel:"Filtre per columna: "},aggregate:{label:"items"},groupPanel:{description:"Arrossegueu una capçalera de columna aquí i deixeu-lo anar per agrupar per aquesta columna."},search:{aria:{selected:"Fila seleccionada",notSelected:"Fila no seleccionada"},placeholder:"Cerca...",showingItems:"Ítems Mostrats:",selectedItems:"Ítems Seleccionats:",totalItems:"Ítems Totals:",size:"Mida de la pàgina:",first:"Primera Pàgina",next:"Propera Pàgina",previous:"Pàgina Anterior",last:"Última Pàgina"},menu:{text:"Triar Columnes:"},sort:{ascending:"Ordena Ascendent",descending:"Ordena Descendent",none:"Sense Ordre",remove:"Eliminar Ordre"},column:{hide:"Amaga la Columna"},aggregation:{count:"Files Totals: ",sum:"total: ",avg:"mitjà: ",min:"mín: ",max:"màx: "},pinning:{pinLeft:"Fixar a l'Esquerra",pinRight:"Fixar a la Dreta",unpin:"Treure Fixació"},columnMenu:{close:"Tanca"},gridMenu:{aria:{buttonLabel:"Menú de Quadrícula"},columns:"Columnes:",importerTitle:"Importa el fitxer",exporterAllAsCsv:"Exporta tot com CSV",exporterVisibleAsCsv:"Exporta les dades visibles com a CSV",exporterSelectedAsCsv:"Exporta les dades seleccionades com a CSV",exporterAllAsPdf:"Exporta tot com PDF",exporterVisibleAsPdf:"Exporta les dades visibles com a PDF",exporterSelectedAsPdf:"Exporta les dades seleccionades com a PDF",exporterAllAsExcel:"Exporta tot com Excel",exporterVisibleAsExcel:"Exporta les dades visibles com Excel",exporterSelectedAsExcel:"Exporta les dades seleccionades com Excel",clearAllFilters:"Netejar tots els filtres"},importer:{noHeaders:"No va ser possible derivar els noms de les columnes, té encapçalats l'arxiu?",noObjects:"No va ser possible obtenir registres, conté dades l'arxiu, a part de les capçaleres?",invalidCsv:"No va ser possible processar l'arxiu, ¿és un CSV vàlid?",invalidJson:"No va ser possible processar l'arxiu, ¿és un JSON vàlid?",jsonNotArray:"El fitxer json importat ha de contenir una matriu, avortant."},pagination:{aria:{pageToFirst:"Page to first",pageBack:"Page back",pageSelected:"Selected page",pageForward:"Page forward",pageToLast:"Page to last"},sizes:"ítems per pàgina",totalItems:"ítems",through:"a",of:"de"},grouping:{group:"Agrupar",ungroup:"Desagrupar",aggregate_count:"Agr: Compte",aggregate_sum:"Agr: Sum",aggregate_max:"Agr: Máx",aggregate_min:"Agr: Mín",aggregate_avg:"Agr: Mitjà",aggregate_remove:"Agr: Treure"},validate:{error:"Error:",minLength:"El valor ha de tenir almenys caràcters THRESHOLD.",maxLength:"El valor ha de tenir com a màxim caràcters THRESHOLD.",required:"Un valor és necessari."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("es",{aggregate:{label:"Artículos"},groupPanel:{description:"Arrastre un encabezado de columna aquí y suéltelo para agrupar por esa columna."},search:{placeholder:"Buscar...",showingItems:"Artículos Mostrados:",selectedItems:"Artículos Seleccionados:",totalItems:"Artículos Totales:",size:"Tamaño de Página:",first:"Primera Página",next:"Página Siguiente",previous:"Página Anterior",last:"Última Página"},menu:{text:"Elegir columnas:"},sort:{ascending:"Orden Ascendente",descending:"Orden Descendente",remove:"Sin Ordenar"},column:{hide:"Ocultar la columna"},aggregation:{count:"filas totales: ",sum:"total: ",avg:"media: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Fijar a la Izquierda",pinRight:"Fijar a la Derecha",unpin:"Quitar Fijación"},gridMenu:{columns:"Columnas:",importerTitle:"Importar archivo",exporterAllAsCsv:"Exportar todo como csv",exporterVisibleAsCsv:"Exportar vista como csv",exporterSelectedAsCsv:"Exportar selección como csv",exporterAllAsPdf:"Exportar todo como pdf",exporterVisibleAsPdf:"Exportar vista como pdf",exporterSelectedAsPdf:"Exportar selección como pdf",exporterAllAsExcel:"Exportar todo como excel",exporterVisibleAsExcel:"Exportar vista como excel",exporterSelectedAsExcel:"Exportar selección como excel",clearAllFilters:"Limpiar todos los filtros"},importer:{noHeaders:"No fue posible derivar los nombres de las columnas, ¿tiene encabezados el archivo?",noObjects:"No fue posible obtener registros, ¿contiene datos el archivo, aparte de los encabezados?",invalidCsv:"No fue posible procesar el archivo, ¿es un CSV válido?",invalidJson:"No fue posible procesar el archivo, ¿es un Json válido?",jsonNotArray:"El archivo json importado debe contener un array, abortando."},pagination:{aria:{pageToFirst:"Página para primero",pageBack:"Página atrás",pageSelected:"Página seleccionada",pageForward:"Avance de página",pageToLast:"Página para durar"},through:"mediante",sizes:"registros por página",totalItems:"registros",of:"de"},grouping:{group:"Agrupar",ungroup:"Desagrupar",aggregate_count:"Agr: Cont",aggregate_sum:"Agr: Sum",aggregate_max:"Agr: Máx",aggregate_min:"Agr: Min",aggregate_avg:"Agr: Prom",aggregate_remove:"Agr: Quitar"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("fa",{aggregate:{label:"قلم"},groupPanel:{description:"عنوان یک ستون را بگیر و به گروهی از آن ستون رها کن."},search:{placeholder:"جستجو...",showingItems:"نمایش اقلام:",selectedItems:"قلم‌های انتخاب شده:",totalItems:"مجموع اقلام:",size:"اندازه‌ی صفحه:",first:"اولین صفحه",next:"صفحه‌ی‌بعدی",previous:"صفحه‌ی‌ قبلی",last:"آخرین صفحه"},menu:{text:"ستون‌های انتخابی:"},sort:{ascending:"ترتیب صعودی",descending:"ترتیب نزولی",remove:"حذف مرتب کردن"},column:{hide:"پنهان‌کردن ستون"},aggregation:{count:"تعداد: ",sum:"مجموع: ",avg:"میانگین: ",min:"کمترین: ",max:"بیشترین: "},pinning:{pinLeft:"پین کردن سمت چپ",pinRight:"پین کردن سمت راست",unpin:"حذف پین"},gridMenu:{columns:"ستون‌ها:",importerTitle:"وارد کردن فایل",exporterAllAsCsv:"خروجی تمام داده‌ها در فایل csv",exporterVisibleAsCsv:"خروجی داده‌های قابل مشاهده در فایل csv",exporterSelectedAsCsv:"خروجی داده‌های انتخاب‌شده در فایل csv",exporterAllAsPdf:"خروجی تمام داده‌ها در فایل pdf",exporterVisibleAsPdf:"خروجی داده‌های قابل مشاهده در فایل pdf",exporterSelectedAsPdf:"خروجی داده‌های انتخاب‌شده در فایل pdf",clearAllFilters:"پاک کردن تمام فیلتر"},importer:{noHeaders:"نام ستون قابل استخراج نیست. آیا فایل عنوان دارد؟",noObjects:"اشیا قابل استخراج نیستند. آیا به جز عنوان‌ها در فایل داده وجود دارد؟",invalidCsv:"فایل قابل پردازش نیست. آیا فرمت  csv  معتبر است؟",invalidJson:"فایل قابل پردازش نیست. آیا فرمت json   معتبر است؟",jsonNotArray:"فایل json وارد شده باید حاوی آرایه باشد. عملیات ساقط شد."},pagination:{sizes:"اقلام در هر صفحه",totalItems:"اقلام",of:"از"},grouping:{group:"گروه‌بندی",ungroup:"حذف گروه‌بندی",aggregate_count:"Agg: تعداد",aggregate_sum:"Agg: جمع",aggregate_max:"Agg: بیشینه",aggregate_min:"Agg: کمینه",aggregate_avg:"Agg: میانگین",aggregate_remove:"Agg: حذف"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("fi",{aggregate:{label:"rivit"},groupPanel:{description:"Raahaa ja pudota otsikko tähän ryhmittääksesi sarakkeen mukaan."},search:{placeholder:"Hae...",showingItems:"Näytetään rivejä:",selectedItems:"Valitut rivit:",totalItems:"Rivejä yht.:",size:"Näytä:",first:"Ensimmäinen sivu",next:"Seuraava sivu",previous:"Edellinen sivu",last:"Viimeinen sivu"},menu:{text:"Valitse sarakkeet:"},sort:{ascending:"Järjestä nouseva",descending:"Järjestä laskeva",remove:"Poista järjestys"},column:{hide:"Piilota sarake"},aggregation:{count:"Rivejä yht.: ",sum:"Summa: ",avg:"K.a.: ",min:"Min: ",max:"Max: "},pinning:{pinLeft:"Lukitse vasemmalle",pinRight:"Lukitse oikealle",unpin:"Poista lukitus"},gridMenu:{columns:"Sarakkeet:",importerTitle:"Tuo tiedosto",exporterAllAsCsv:"Vie tiedot csv-muodossa",exporterVisibleAsCsv:"Vie näkyvä tieto csv-muodossa",exporterSelectedAsCsv:"Vie valittu tieto csv-muodossa",exporterAllAsPdf:"Vie tiedot pdf-muodossa",exporterVisibleAsPdf:"Vie näkyvä tieto pdf-muodossa",exporterSelectedAsPdf:"Vie valittu tieto pdf-muodossa",exporterAllAsExcel:"Vie tiedot excel-muodossa",exporterVisibleAsExcel:"Vie näkyvä tieto excel-muodossa",exporterSelectedAsExcel:"Vie valittu tieto excel-muodossa",clearAllFilters:"Puhdista kaikki suodattimet"},importer:{noHeaders:"Sarakkeen nimiä ei voitu päätellä, onko tiedostossa otsikkoriviä?",noObjects:"Tietoja ei voitu lukea, onko tiedostossa muuta kuin otsikkot?",invalidCsv:"Tiedostoa ei voitu käsitellä, oliko se CSV-muodossa?",invalidJson:"Tiedostoa ei voitu käsitellä, oliko se JSON-muodossa?",jsonNotArray:"Tiedosto ei sisältänyt taulukkoa, lopetetaan."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("fr",{headerCell:{aria:{defaultFilterLabel:"Filtre de la colonne",removeFilter:"Supprimer le filtre",columnMenuButtonLabel:"Menu de la colonne"},priority:"Priorité:",filterLabel:"Filtre de la colonne: "},aggregate:{label:"éléments"},groupPanel:{description:"Faites glisser une en-tête de colonne ici pour créer un groupe de colonnes."},search:{placeholder:"Recherche...",showingItems:"Affichage des éléments :",selectedItems:"Éléments sélectionnés :",totalItems:"Nombre total d'éléments:",size:"Taille de page:",first:"Première page",next:"Page Suivante",previous:"Page précédente",last:"Dernière page"},menu:{text:"Choisir des colonnes :"},sort:{ascending:"Trier par ordre croissant",descending:"Trier par ordre décroissant",none:"Aucun tri",remove:"Enlever le tri"},column:{hide:"Cacher la colonne"},aggregation:{count:"lignes totales: ",sum:"total: ",avg:"moy: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Épingler à gauche",pinRight:"Épingler à droite",unpin:"Détacher"},columnMenu:{close:"Fermer"},gridMenu:{aria:{buttonLabel:"Menu du tableau"},columns:"Colonnes:",importerTitle:"Importer un fichier",exporterAllAsCsv:"Exporter toutes les données en CSV",exporterVisibleAsCsv:"Exporter les données visibles en CSV",exporterSelectedAsCsv:"Exporter les données sélectionnées en CSV",exporterAllAsPdf:"Exporter toutes les données en PDF",exporterVisibleAsPdf:"Exporter les données visibles en PDF",exporterSelectedAsPdf:"Exporter les données sélectionnées en PDF",exporterAllAsExcel:"Exporter toutes les données en Excel",exporterVisibleAsExcel:"Exporter les données visibles en Excel",exporterSelectedAsExcel:"Exporter les données sélectionnées en Excel",clearAllFilters:"Nettoyez tous les filtres"},importer:{noHeaders:"Impossible de déterminer le nom des colonnes, le fichier possède-t-il une en-tête ?",noObjects:"Aucun objet trouvé, le fichier possède-t-il des données autres que l'en-tête ?",invalidCsv:"Le fichier n'a pas pu être traité, le CSV est-il valide ?",invalidJson:"Le fichier n'a pas pu être traité, le JSON est-il valide ?",jsonNotArray:"Le fichier JSON importé doit contenir un tableau, abandon."},pagination:{aria:{pageToFirst:"Aller à la première page",pageBack:"Page précédente",pageSelected:"Page sélectionnée",pageForward:"Page suivante",pageToLast:"Aller à la dernière page"},sizes:"éléments par page",totalItems:"éléments",through:"à",of:"sur"},grouping:{group:"Grouper",ungroup:"Dégrouper",aggregate_count:"Agg: Compter",aggregate_sum:"Agg: Somme",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Moy",aggregate_remove:"Agg: Retirer"},validate:{error:"Erreur:",minLength:"La valeur doit être supérieure ou égale à THRESHOLD caractères.",maxLength:"La valeur doit être inférieure ou égale à THRESHOLD caractères.",required:"Une valeur est nécéssaire."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("he",{aggregate:{label:"items"},groupPanel:{description:"גרור עמודה לכאן ושחרר בכדי לקבץ עמודה זו."},search:{placeholder:"חפש...",showingItems:"מציג:",selectedItems:'סה"כ נבחרו:',totalItems:'סה"כ רשומות:',size:"תוצאות בדף:",first:"דף ראשון",next:"דף הבא",previous:"דף קודם",last:"דף אחרון"},menu:{text:"בחר עמודות:"},sort:{ascending:"סדר עולה",descending:"סדר יורד",remove:"בטל"},column:{hide:"טור הסתר"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",importerTitle:"Import file",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf",exporterAllAsExcel:"Export all data as excel",exporterVisibleAsExcel:"Export visible data as excel",exporterSelectedAsExcel:"Export selected data as excel",clearAllFilters:"Clean all filters"},importer:{noHeaders:"Column names were unable to be derived, does the file have a header?",noObjects:"Objects were not able to be derived, was there data in the file other than headers?",invalidCsv:"File was unable to be processed, is it valid CSV?",invalidJson:"File was unable to be processed, is it valid Json?",jsonNotArray:"Imported json file must contain an array, aborting."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("hy",{aggregate:{label:"տվյալներ"},groupPanel:{description:"Ըստ սյան խմբավորելու համար քաշեք և գցեք վերնագիրն այստեղ։"},search:{placeholder:"Փնտրում...",showingItems:"Ցուցադրված տվյալներ՝",selectedItems:"Ընտրված:",totalItems:"Ընդամենը՝",size:"Տողերի քանակը էջում՝",first:"Առաջին էջ",next:"Հաջորդ էջ",previous:"Նախորդ էջ",last:"Վերջին էջ"},menu:{text:"Ընտրել սյուները:"},sort:{ascending:"Աճման կարգով",descending:"Նվազման կարգով",remove:"Հանել "},column:{hide:"Թաքցնել սյունը"},aggregation:{count:"ընդամենը տող՝ ",sum:"ընդամենը՝ ",avg:"միջին՝ ",min:"մին՝ ",max:"մաքս՝ "},pinning:{pinLeft:"Կպցնել ձախ կողմում",pinRight:"Կպցնել աջ կողմում",unpin:"Արձակել"},gridMenu:{columns:"Սյուներ:",importerTitle:"Ներմուծել ֆայլ",exporterAllAsCsv:"Արտահանել ամբողջը CSV",exporterVisibleAsCsv:"Արտահանել երևացող տվյալները CSV",exporterSelectedAsCsv:"Արտահանել ընտրված տվյալները CSV",exporterAllAsPdf:"Արտահանել PDF",exporterVisibleAsPdf:"Արտահանել երևացող տվյալները PDF",exporterSelectedAsPdf:"Արտահանել ընտրված տվյալները PDF",exporterAllAsExcel:"Արտահանել excel",exporterVisibleAsExcel:"Արտահանել երևացող տվյալները excel",exporterSelectedAsExcel:"Արտահանել ընտրված տվյալները excel",clearAllFilters:"Մաքրել բոլոր ֆիլտրերը"},importer:{noHeaders:"Հնարավոր չեղավ որոշել սյան վերնագրերը։ Արդյո՞ք ֆայլը ունի վերնագրեր։",noObjects:"Հնարավոր չեղավ կարդալ տվյալները։ Արդյո՞ք ֆայլում կան տվյալներ։",invalidCsv:"Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր CSV է։",invalidJson:"Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր Json է։",jsonNotArray:"Ներմուծված json ֆայլը պետք է պարունակի զանգված, կասեցվում է։"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("is",{headerCell:{aria:{defaultFilterLabel:"Sía fyrir dálk",removeFilter:"Fjarlægja síu",columnMenuButtonLabel:"Dálkavalmynd"},priority:"Forgangsröðun:",filterLabel:"Sía fyrir dálka: "},aggregate:{label:"hlutir"},groupPanel:{description:"Dragðu dálkhaus hingað til að flokka saman eftir þeim dálki."},search:{placeholder:"Leita...",showingItems:"Sýni hluti:",selectedItems:"Valdir hlutir:",totalItems:"Hlutir alls:",size:"Stærð síðu:",first:"Fyrsta síða",next:"Næsta síða",previous:"Fyrri síða",last:"Síðasta síða"},menu:{text:"Veldu dálka:"},sort:{ascending:"Raða hækkandi",descending:"Raða lækkandi",none:"Engin röðun",remove:"Fjarlægja röðun"},column:{hide:"Fela dálk"},aggregation:{count:"fjöldi raða: ",sum:"summa: ",avg:"meðaltal: ",min:"lágmark: ",max:"hámark: "},pinning:{pinLeft:"Festa til vinstri",pinRight:"Festa til hægri",unpin:"Losa"},columnMenu:{close:"Loka"},gridMenu:{aria:{buttonLabel:"Töflu valmynd"},columns:"Dálkar:",importerTitle:"Flytja inn skjal",exporterAllAsCsv:"Flytja út gögn sem csv",exporterVisibleAsCsv:"Flytja út sýnileg gögn sem csv",exporterSelectedAsCsv:"Flytja út valin gögn sem csv",exporterAllAsPdf:"Flytja út öll gögn sem pdf",exporterVisibleAsPdf:"Flytja út sýnileg gögn sem pdf",exporterSelectedAsPdf:"Flytja út valin gögn sem pdf",clearAllFilters:"Hreinsa allar síur"},importer:{noHeaders:"Ekki hægt að vinna dálkanöfn úr skjalinu, er skjalið örugglega með haus?",noObjects:"Ekki hægt að vinna hluti úr skjalinu, voru örugglega gögn í skjalinu önnur en hausinn?",invalidCsv:"Tókst ekki að vinna skjal, er það örggulega gilt CSV?",invalidJson:"Tókst ekki að vinna skjal, er það örugglega gilt Json?",jsonNotArray:"Innflutt json skjal verður að innihalda fylki, hætti við."},pagination:{aria:{pageToFirst:"Fletta að fyrstu",pageBack:"Fletta til baka",pageSelected:"Valin síða",pageForward:"Fletta áfram",pageToLast:"Fletta að síðustu"},sizes:"hlutir á síðu",totalItems:"hlutir",through:"gegnum",of:"af"},grouping:{group:"Flokka",ungroup:"Sundurliða",aggregate_count:"Fjöldi: ",aggregate_sum:"Summa: ",aggregate_max:"Hámark: ",aggregate_min:"Lágmark: ",aggregate_avg:"Meðaltal: ",aggregate_remove:"Fjarlægja: "},validate:{error:"Villa:",minLength:"Gildi ætti að vera a.m.k. THRESHOLD stafa langt.",maxLength:"Gildi ætti að vera í mesta lagi THRESHOLD stafa langt.",required:"Þarf að hafa gildi."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("it",{aggregate:{label:"elementi"},groupPanel:{description:"Trascina un'intestazione all'interno del gruppo della colonna."},search:{placeholder:"Ricerca...",showingItems:"Mostra:",selectedItems:"Selezionati:",totalItems:"Totali:",size:"Tot Pagine:",first:"Prima",next:"Prossima",previous:"Precedente",last:"Ultima"},menu:{text:"Scegli le colonne:"},sort:{ascending:"Asc.",descending:"Desc.",remove:"Annulla ordinamento"},column:{hide:"Nascondi"},aggregation:{count:"righe totali: ",sum:"tot: ",avg:"media: ",min:"minimo: ",max:"massimo: "},pinning:{pinLeft:"Blocca a sx",pinRight:"Blocca a dx",unpin:"Blocca in alto"},gridMenu:{columns:"Colonne:",importerTitle:"Importa",exporterAllAsCsv:"Esporta tutti i dati in CSV",exporterVisibleAsCsv:"Esporta i dati visibili in CSV",exporterSelectedAsCsv:"Esporta i dati selezionati in CSV",exporterAllAsPdf:"Esporta tutti i dati in PDF",exporterVisibleAsPdf:"Esporta i dati visibili in PDF",exporterSelectedAsPdf:"Esporta i dati selezionati in PDF",exporterAllAsExcel:"Esporta tutti i dati in excel",exporterVisibleAsExcel:"Esporta i dati visibili in excel",exporterSelectedAsExcel:"Esporta i dati selezionati in excel",clearAllFilters:"Pulire tutti i filtri"},importer:{noHeaders:"Impossibile reperire i nomi delle colonne, sicuro che siano indicati all'interno del file?",noObjects:"Impossibile reperire gli oggetti, sicuro che siano indicati all'interno del file?",invalidCsv:"Impossibile elaborare il file, sicuro che sia un CSV?",invalidJson:"Impossibile elaborare il file, sicuro che sia un JSON valido?",jsonNotArray:"Errore! Il file JSON da importare deve contenere un array."},pagination:{aria:{pageToFirst:"Prima",pageBack:"Indietro",pageSelected:"Pagina selezionata",pageForward:"Avanti",pageToLast:"Ultima"},sizes:"elementi per pagina",totalItems:"elementi",through:"a",of:"di"},grouping:{group:"Raggruppa",ungroup:"Separa",aggregate_count:"Agg: N. Elem.",aggregate_sum:"Agg: Somma",aggregate_max:"Agg: Massimo",aggregate_min:"Agg: Minimo",aggregate_avg:"Agg: Media",aggregate_remove:"Agg: Rimuovi"},validate:{error:"Errore:",minLength:"Lunghezza minima pari a THRESHOLD caratteri.",maxLength:"Lunghezza massima pari a THRESHOLD caratteri.",required:"Necessario inserire un valore."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("ja",{headerCell:{aria:{defaultFilterLabel:"列のフィルター",removeFilter:"フィルターの解除",columnMenuButtonLabel:"列のメニュー"},priority:"優先度:",filterLabel:"列フィルター: "},aggregate:{label:"項目"},groupPanel:{description:"ここに列ヘッダをドラッグアンドドロップして、その列でグループ化します。"},search:{placeholder:"検索...",showingItems:"表示中の項目:",selectedItems:"選択した項目:",totalItems:"項目の総数:",size:"ページサイズ:",first:"最初のページ",next:"次のページ",previous:"前のページ",last:"前のページ"},menu:{text:"列の選択:"},sort:{ascending:"昇順に並べ替え",descending:"降順に並べ替え",none:"並べ替え無し",remove:"並べ替えの解除"},column:{hide:"列の非表示"},aggregation:{count:"行数: ",sum:"合計: ",avg:"平均: ",min:"最小: ",max:"最大: "},pinning:{pinLeft:"左に固定",pinRight:"右に固定",unpin:"固定解除"},columnMenu:{close:"閉じる"},gridMenu:{aria:{buttonLabel:"グリッドメニュー"},columns:"列の表示/非表示:",importerTitle:"ファイルのインポート",exporterAllAsCsv:"すべてのデータをCSV形式でエクスポート",exporterVisibleAsCsv:"表示中のデータをCSV形式でエクスポート",exporterSelectedAsCsv:"選択したデータをCSV形式でエクスポート",exporterAllAsPdf:"すべてのデータをPDF形式でエクスポート",exporterVisibleAsPdf:"表示中のデータをPDF形式でエクスポート",exporterSelectedAsPdf:"選択したデータをPDF形式でエクスポート",clearAllFilters:"すべてのフィルタをクリア"},importer:{noHeaders:"列名を取得できません。ファイルにヘッダが含まれていることを確認してください。",noObjects:"オブジェクトを取得できません。ファイルにヘッダ以外のデータが含まれていることを確認してください。",invalidCsv:"ファイルを処理できません。ファイルが有効なCSV形式であることを確認してください。",invalidJson:"ファイルを処理できません。ファイルが有効なJSON形式であることを確認してください。",jsonNotArray:"インポートしたJSONファイルには配列が含まれている必要があります。処理を中止します。"},pagination:{aria:{pageToFirst:"最初のページ",pageBack:"前のページ",pageSelected:"現在のページ",pageForward:"次のページ",pageToLast:"最後のページ"},sizes:"件/ページ",totalItems:"件",through:"から",of:"件/全"},grouping:{group:"グループ化",ungroup:"グループ化の解除",aggregate_count:"集計表示: 行数",aggregate_sum:"集計表示: 合計",aggregate_max:"集計表示: 最大",aggregate_min:"集計表示: 最小",aggregate_avg:"集計表示: 平均",aggregate_remove:"集計表示: 解除"},validate:{error:"Error:",minLength:"THRESHOLD 文字以上で入力してください。",maxLength:"THRESHOLD 文字以下で入力してください。",required:"値が必要です。"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("ko",{aggregate:{label:"아이템"},groupPanel:{description:"컬럼으로 그룹핑하기 위해서는 컬럼 헤더를 끌어 떨어뜨려 주세요."},search:{placeholder:"검색...",showingItems:"항목 보여주기:",selectedItems:"선택 항목:",totalItems:"전체 항목:",size:"페이지 크기:",first:"첫번째 페이지",next:"다음 페이지",previous:"이전 페이지",last:"마지막 페이지"},menu:{text:"컬럼을 선택하세요:"},sort:{ascending:"오름차순 정렬",descending:"내림차순 정렬",remove:"소팅 제거"},column:{hide:"컬럼 제거"},aggregation:{count:"전체 갯수: ",sum:"전체: ",avg:"평균: ",min:"최소: ",max:"최대: "},pinning:{pinLeft:"왼쪽 핀",pinRight:"오른쪽 핀",unpin:"핀 제거"},gridMenu:{columns:"컬럼:",importerTitle:"파일 가져오기",exporterAllAsCsv:"csv로 모든 데이터 내보내기",exporterVisibleAsCsv:"csv로 보이는 데이터 내보내기",exporterSelectedAsCsv:"csv로 선택된 데이터 내보내기",exporterAllAsPdf:"pdf로 모든 데이터 내보내기",exporterVisibleAsPdf:"pdf로 보이는 데이터 내보내기",exporterSelectedAsPdf:"pdf로 선택 데이터 내보내기",clearAllFilters:"모든 필터를 청소"},importer:{noHeaders:"컬럼명이 지정되어 있지 않습니다. 파일에 헤더가 명시되어 있는지 확인해 주세요.",noObjects:"데이터가 지정되어 있지 않습니다. 데이터가 파일에 있는지 확인해 주세요.",invalidCsv:"파일을 처리할 수 없습니다. 올바른 csv인지 확인해 주세요.",invalidJson:"파일을 처리할 수 없습니다. 올바른 json인지 확인해 주세요.",jsonNotArray:"json 파일은 배열을 포함해야 합니다."},pagination:{sizes:"페이지당 항목",totalItems:"전체 항목"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("nl",{aggregate:{label:"items"},groupPanel:{description:"Sleep hier een kolomnaam heen om op te groeperen."},search:{placeholder:"Zoeken...",showingItems:"Getoonde items:",selectedItems:"Geselecteerde items:",totalItems:"Totaal aantal items:",size:"Items per pagina:",first:"Eerste pagina",next:"Volgende pagina",previous:"Vorige pagina",last:"Laatste pagina"},menu:{text:"Kies kolommen:"},sort:{ascending:"Sorteer oplopend",descending:"Sorteer aflopend",remove:"Verwijder sortering"},column:{hide:"Verberg kolom"},aggregation:{count:"Aantal rijen: ",sum:"Som: ",avg:"Gemiddelde: ",min:"Min: ",max:"Max: "},pinning:{pinLeft:"Zet links vast",pinRight:"Zet rechts vast",unpin:"Maak los"},gridMenu:{columns:"Kolommen:",importerTitle:"Importeer bestand",exporterAllAsCsv:"Exporteer alle data als csv",exporterVisibleAsCsv:"Exporteer zichtbare data als csv",exporterSelectedAsCsv:"Exporteer geselecteerde data als csv",exporterAllAsPdf:"Exporteer alle data als pdf",exporterVisibleAsPdf:"Exporteer zichtbare data als pdf",exporterSelectedAsPdf:"Exporteer geselecteerde data als pdf",exporterAllAsExcel:"Exporteer alle data als excel",exporterVisibleAsExcel:"Exporteer zichtbare data als excel",exporterSelectedAsExcel:"Exporteer alle data als excel",clearAllFilters:"Reinig alle filters"},importer:{noHeaders:"Kolomnamen kunnen niet worden afgeleid. Heeft het bestand een header?",noObjects:"Objecten kunnen niet worden afgeleid. Bevat het bestand data naast de headers?",invalidCsv:"Het bestand kan niet verwerkt worden. Is het een valide csv bestand?",invalidJson:"Het bestand kan niet verwerkt worden. Is het valide json?",jsonNotArray:"Het json bestand moet een array bevatten. De actie wordt geannuleerd."},pagination:{sizes:"items per pagina",totalItems:"items",of:"van de"},grouping:{group:"Groepeer",ungroup:"Groepering opheffen",aggregate_count:"Agg: Aantal",aggregate_sum:"Agg: Som",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Gem",aggregate_remove:"Agg: Verwijder"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("no",{headerCell:{aria:{defaultFilterLabel:"Filter for kolonne",removeFilter:"Fjern filter",columnMenuButtonLabel:"Kolonnemeny"},priority:"Prioritet:",filterLabel:"Filter for kolonne: "},aggregate:{label:"elementer"},groupPanel:{description:"Trekk en kolonneoverskrift hit og slipp den for å gruppere etter den kolonnen."},search:{placeholder:"Søk...",showingItems:"Viste elementer:",selectedItems:"Valgte elementer:",totalItems:"Antall elementer:",size:"Sidestørrelse:",first:"Første side",next:"Neste side",previous:"Forrige side",last:"Siste side"},menu:{text:"Velg kolonner:"},sort:{ascending:"Sortere stigende",descending:"Sortere fallende",none:"Ingen sortering",remove:"Fjern sortering"},column:{hide:"Skjul kolonne"},aggregation:{count:"antall rader: ",sum:"total: ",avg:"gjennomsnitt: ",min:"minimum: ",max:"maksimum: "},pinning:{pinLeft:"Fest til venstre",pinRight:"Fest til høyre",unpin:"Løsne"},columnMenu:{close:"Lukk"},gridMenu:{aria:{buttonLabel:"Grid Menu"},columns:"Kolonner:",importerTitle:"Importer fil",exporterAllAsCsv:"Eksporter alle data som csv",exporterVisibleAsCsv:"Eksporter synlige data som csv",exporterSelectedAsCsv:"Eksporter utvalgte data som csv",exporterAllAsPdf:"Eksporter alle data som pdf",exporterVisibleAsPdf:"Eksporter synlige data som pdf",exporterSelectedAsPdf:"Eksporter utvalgte data som pdf",exporterAllAsExcel:"Eksporter alle data som excel",exporterVisibleAsExcel:"Eksporter synlige data som excel",exporterSelectedAsExcel:"Eksporter utvalgte data som excel",clearAllFilters:"Clear all filters"},importer:{noHeaders:"Kolonnenavn kunne ikke avledes. Har filen en overskrift?",noObjects:"Objekter kunne ikke avledes. Er der andre data i filen enn overskriften?",invalidCsv:"Filen kunne ikke behandles. Er den gyldig CSV?",invalidJson:"Filen kunne ikke behandles. Er den gyldig JSON?",jsonNotArray:"Importert JSON-fil må inneholde en liste. Avbryter."},pagination:{aria:{pageToFirst:"Gå til første side",pageBack:"Gå til forrige side",pageSelected:"Valgte side",pageForward:"Gå til neste side",pageToLast:"Gå til siste side"},sizes:"elementer per side",totalItems:"elementer",through:"til",of:"av"},grouping:{group:"Gruppere",ungroup:"Fjerne gruppering",aggregate_count:"Agr: Antall",aggregate_sum:"Agr: Sum",aggregate_max:"Agr: Maksimum",aggregate_min:"Agr: Minimum",aggregate_avg:"Agr: Gjennomsnitt",aggregate_remove:"Agr: Fjern"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("pl",{headerCell:{aria:{defaultFilterLabel:"Filtr dla kolumny",removeFilter:"Usuń filtr",columnMenuButtonLabel:"Opcje kolumny",column:"Kolumna"},priority:"Priorytet:",filterLabel:"Filtr dla kolumny: "},aggregate:{label:"pozycji"},groupPanel:{description:"Przeciągnij nagłówek kolumny tutaj, aby pogrupować według niej."},search:{aria:{selected:"Wiersz zaznaczony",notSelected:"Wiersz niezaznaczony"},placeholder:"Szukaj...",showingItems:"Widoczne pozycje:",selectedItems:"Zaznaczone pozycje:",totalItems:"Wszystkich pozycji:",size:"Rozmiar strony:",first:"Pierwsza strona",next:"Następna strona",previous:"Poprzednia strona",last:"Ostatnia strona"},menu:{text:"Wybierz kolumny:"},sort:{ascending:"Sortuj rosnąco",descending:"Sortuj malejąco",none:"Brak sortowania",remove:"Wyłącz sortowanie"},column:{hide:"Ukryj kolumnę"},aggregation:{count:"Razem pozycji: ",sum:"Razem: ",avg:"Średnia: ",min:"Min: ",max:"Max: "},pinning:{pinLeft:"Przypnij do lewej",pinRight:"Przypnij do prawej",unpin:"Odepnij"},columnMenu:{close:"Zamknij"},gridMenu:{aria:{buttonLabel:"Opcje tabeli"},columns:"Kolumny:",importerTitle:"Importuj plik",exporterAllAsCsv:"Eksportuj wszystkie dane do csv",exporterVisibleAsCsv:"Eksportuj widoczne dane do csv",exporterSelectedAsCsv:"Eksportuj zaznaczone dane do csv",exporterAllAsPdf:"Eksportuj wszystkie dane do pdf",exporterVisibleAsPdf:"Eksportuj widoczne dane do pdf",exporterSelectedAsPdf:"Eksportuj zaznaczone dane do pdf",exporterAllAsExcel:"Eksportuj wszystkie dane do excel",exporterVisibleAsExcel:"Eksportuj widoczne dane do excel",exporterSelectedAsExcel:"Eksportuj zaznaczone dane do excel",clearAllFilters:"Wyczyść filtry"},importer:{noHeaders:"Nie udało się wczytać nazw kolumn. Czy plik posiada nagłówek?",noObjects:"Nie udalo się wczytać pozycji. Czy plik zawiera dane?",invalidCsv:"Nie udało się przetworzyć pliku. Czy to prawidłowy plik CSV?",invalidJson:"Nie udało się przetworzyć pliku. Czy to prawidłowy plik JSON?",jsonNotArray:"Importowany plik JSON musi zawierać tablicę. Importowanie przerwane."},pagination:{aria:{pageToFirst:"Pierwsza strona",pageBack:"Poprzednia strona",pageSelected:"Wybrana strona",pageForward:"Następna strona",pageToLast:"Ostatnia strona"},sizes:"pozycji na stronę",totalItems:"pozycji",through:"do",of:"z"},grouping:{group:"Grupuj",ungroup:"Rozgrupuj",aggregate_count:"Zbiorczo: Razem",aggregate_sum:"Zbiorczo: Suma",aggregate_max:"Zbiorczo: Max",aggregate_min:"Zbiorczo: Min",aggregate_avg:"Zbiorczo: Średnia",aggregate_remove:"Zbiorczo: Usuń"},validate:{error:"Błąd:",minLength:"Wartość powinna składać się z co najmniej THRESHOLD znaków.",maxLength:"Wartość powinna składać się z przynajmniej THRESHOLD znaków.",required:"Wartość jest wymagana."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("pt-br",{headerCell:{aria:{defaultFilterLabel:"Filtro por coluna",removeFilter:"Remover filtro",columnMenuButtonLabel:"Menu coluna",column:"Coluna"},priority:"Prioridade:",filterLabel:"Filtro por coluna: "},aggregate:{label:"itens"},groupPanel:{description:"Arraste e solte uma coluna aqui para agrupar por essa coluna"},search:{aria:{selected:"Linha selecionada",notSelected:"Linha não está selecionada"},placeholder:"Procurar...",showingItems:"Mostrando os Itens:",selectedItems:"Items Selecionados:",totalItems:"Total de Itens:",size:"Tamanho da Página:",first:"Primeira Página",next:"Próxima Página",previous:"Página Anterior",last:"Última Página"},menu:{text:"Selecione as colunas:"},sort:{ascending:"Ordenar Ascendente",descending:"Ordenar Descendente",none:"Nenhuma Ordem",remove:"Remover Ordenação"},column:{hide:"Esconder coluna"},aggregation:{count:"total de linhas: ",sum:"total: ",avg:"med: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Fixar Esquerda",pinRight:"Fixar Direita",unpin:"Desprender"},columnMenu:{close:"Fechar"},gridMenu:{aria:{buttonLabel:"Menu Grid"},columns:"Colunas:",importerTitle:"Importar arquivo",exporterAllAsCsv:"Exportar todos os dados como csv",exporterVisibleAsCsv:"Exportar dados visíveis como csv",exporterSelectedAsCsv:"Exportar dados selecionados como csv",exporterAllAsPdf:"Exportar todos os dados como pdf",exporterVisibleAsPdf:"Exportar dados visíveis como pdf",exporterSelectedAsPdf:"Exportar dados selecionados como pdf",exporterAllAsExcel:"Exportar todos os dados como excel",exporterVisibleAsExcel:"Exportar dados visíveis como excel",exporterSelectedAsExcel:"Exportar dados selecionados como excel",clearAllFilters:"Limpar todos os filtros"},importer:{noHeaders:"Nomes de colunas não puderam ser derivados. O arquivo tem um cabeçalho?",noObjects:"Objetos não puderam ser derivados. Havia dados no arquivo, além dos cabeçalhos?",invalidCsv:"Arquivo não pode ser processado. É um CSV válido?",invalidJson:"Arquivo não pode ser processado. É um Json válido?",jsonNotArray:"Arquivo json importado tem que conter um array. Abortando."},pagination:{aria:{pageToFirst:"Primeira página",pageBack:"Página anterior",pageSelected:"Página Selecionada",pageForward:"Proxima",pageToLast:"Anterior"},sizes:"itens por página",totalItems:"itens",through:"através dos",of:"de"},grouping:{group:"Agrupar",ungroup:"Desagrupar",aggregate_count:"Agr: Contar",aggregate_sum:"Agr: Soma",aggregate_max:"Agr: Max",aggregate_min:"Agr: Min",aggregate_avg:"Agr: Med",aggregate_remove:"Agr: Remover"},validate:{error:"Erro:",minLength:"O valor deve ter, no minimo, THRESHOLD caracteres.",maxLength:"O valor deve ter, no máximo, THRESHOLD caracteres.",required:"Um valor é necessário."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("pt",{headerCell:{aria:{defaultFilterLabel:"Filtro por coluna",removeFilter:"Remover filtro",columnMenuButtonLabel:"Menu coluna",column:"Coluna"},priority:"Prioridade:",filterLabel:"Filtro por coluna: "},aggregate:{label:"itens"},groupPanel:{description:"Arraste e solte uma coluna aqui para agrupar por essa coluna"},search:{aria:{selected:"Linha selecionada",notSelected:"Linha não está selecionada"},placeholder:"Procurar...",showingItems:"Mostrando os Itens:",selectedItems:"Itens Selecionados:",totalItems:"Total de Itens:",size:"Tamanho da Página:",first:"Primeira Página",next:"Próxima Página",previous:"Página Anterior",last:"Última Página"},menu:{text:"Selecione as colunas:"},sort:{ascending:"Ordenar Ascendente",descending:"Ordenar Descendente",none:"Nenhuma Ordem",remove:"Remover Ordenação"},column:{hide:"Esconder coluna"},aggregation:{count:"total de linhas: ",sum:"total: ",avg:"med: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Fixar Esquerda",pinRight:"Fixar Direita",unpin:"Desprender"},columnMenu:{close:"Fechar"},gridMenu:{aria:{buttonLabel:"Menu Grid"},columns:"Colunas:",importerTitle:"Importar ficheiro",exporterAllAsCsv:"Exportar todos os dados como csv",exporterVisibleAsCsv:"Exportar dados visíveis como csv",exporterSelectedAsCsv:"Exportar dados selecionados como csv",exporterAllAsPdf:"Exportar todos os dados como pdf",exporterVisibleAsPdf:"Exportar dados visíveis como pdf",exporterSelectedAsPdf:"Exportar dados selecionados como pdf",exporterAllAsExcel:"Exportar todos os dados como excel",exporterVisibleAsExcel:"Exportar dados visíveis como excel",exporterSelectedAsExcel:"Exportar dados selecionados como excel",clearAllFilters:"Limpar todos os filtros"},importer:{noHeaders:"Nomes de colunas não puderam ser derivados. O ficheiro tem um cabeçalho?",noObjects:"Objetos não puderam ser derivados. Havia dados no ficheiro, além dos cabeçalhos?",invalidCsv:"Ficheiro não pode ser processado. É um CSV válido?",invalidJson:"Ficheiro não pode ser processado. É um Json válido?",jsonNotArray:"Ficheiro json importado tem que conter um array. Interrompendo."},pagination:{aria:{pageToFirst:"Primeira página",pageBack:"Página anterior",pageSelected:"Página Selecionada",pageForward:"Próxima",pageToLast:"Anterior"},sizes:"itens por página",totalItems:"itens",through:"a",of:"de"},grouping:{group:"Agrupar",ungroup:"Desagrupar",aggregate_count:"Agr: Contar",aggregate_sum:"Agr: Soma",aggregate_max:"Agr: Max",aggregate_min:"Agr: Min",aggregate_avg:"Agr: Med",aggregate_remove:"Agr: Remover"},validate:{error:"Erro:",minLength:"O valor deve ter, no minimo, THRESHOLD caracteres.",maxLength:"O valor deve ter, no máximo, THRESHOLD caracteres.",required:"Um valor é necessário."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("ro",{headerCell:{aria:{defaultFilterLabel:"Filtru pentru coloana",removeFilter:"Sterge filtru",columnMenuButtonLabel:"Column Menu"},priority:"Prioritate:",filterLabel:"Filtru pentru coloana:"},aggregate:{label:"Elemente"},groupPanel:{description:"Trage un cap de coloana aici pentru a grupa elementele dupa coloana respectiva"},search:{placeholder:"Cauta...",showingItems:"Arata elementele:",selectedItems:"Elementele selectate:",totalItems:"Total elemente:",size:"Marime pagina:",first:"Prima pagina",next:"Pagina urmatoare",previous:"Pagina anterioara",last:"Ultima pagina"},menu:{text:"Alege coloane:"},sort:{ascending:"Ordoneaza crescator",descending:"Ordoneaza descrescator",none:"Fara ordonare",remove:"Sterge ordonarea"},column:{hide:"Ascunde coloana"},aggregation:{count:"total linii: ",sum:"total: ",avg:"medie: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Pin la stanga",pinRight:"Pin la dreapta",unpin:"Sterge pinul"},columnMenu:{close:"Inchide"},gridMenu:{aria:{buttonLabel:"Grid Menu"},columns:"Coloane:",importerTitle:"Incarca fisier",exporterAllAsCsv:"Exporta toate datele ca csv",exporterVisibleAsCsv:"Exporta datele vizibile ca csv",exporterSelectedAsCsv:"Exporta datele selectate ca csv",exporterAllAsPdf:"Exporta toate datele ca pdf",exporterVisibleAsPdf:"Exporta datele vizibile ca pdf",exporterSelectedAsPdf:"Exporta datele selectate ca csv pdf",clearAllFilters:"Sterge toate filtrele"},importer:{noHeaders:"Numele coloanelor nu a putut fi incarcat, acest fisier are un header?",noObjects:"Datele nu au putut fi incarcate, exista date in fisier in afara numelor de coloane?",invalidCsv:"Fisierul nu a putut fi procesat, ati incarcat un CSV valid ?",invalidJson:"Fisierul nu a putut fi procesat, ati incarcat un Json valid?",jsonNotArray:"Json-ul incarcat trebuie sa contina un array, inchidere."},pagination:{aria:{pageToFirst:"Prima pagina",pageBack:"O pagina inapoi",pageSelected:"Pagina selectata",pageForward:"O pagina inainte",pageToLast:"Ultima pagina"},sizes:"Elemente per pagina",totalItems:"elemente",through:"prin",of:"of"},grouping:{group:"Grupeaza",ungroup:"Opreste gruparea",aggregate_count:"Agg: Count",aggregate_sum:"Agg: Sum",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Avg",aggregate_remove:"Agg: Remove"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("rs-lat",{headerCell:{aria:{defaultFilterLabel:"Filter za kolonu",removeFilter:"Ukloni Filter",columnMenuButtonLabel:"Meni Kolone",column:"Kolona"},priority:"Prioritet:",filterLabel:"Filter za kolonu: "},aggregate:{label:"stavke"},groupPanel:{description:"Ovde prevuci zaglavlje kolone i spusti do grupe pored te kolone."},search:{aria:{selected:"Red odabran",notSelected:"Red nije odabran"},placeholder:"Pretraga...",showingItems:"Prikazane Stavke:",selectedItems:"Odabrane Stavke:",totalItems:"Ukupno Stavki:",size:"Veličina Stranice:",first:"Prva Stranica",next:"Sledeća Stranica",previous:"Prethodna Stranica",last:"Poslednja Stranica"},menu:{text:"Odaberite kolonu:"},sort:{ascending:"Sortiraj po rastućem redosledu",descending:"Sortiraj po opadajućem redosledu",none:"Bez Sortiranja",remove:"Ukloni Sortiranje"},column:{hide:"Sakrij Kolonu"},aggregation:{count:"ukupno redova: ",sum:"ukupno: ",avg:"prosecno: ",min:"minimum: ",max:"maksimum: "},pinning:{pinLeft:"Zakači Levo",pinRight:"Zakači Desno",unpin:"Otkači"},columnMenu:{close:"Zatvori"},gridMenu:{aria:{buttonLabel:"Rešetkasti Meni"},columns:"Kolone:",importerTitle:"Importuj fajl",exporterAllAsCsv:"Eksportuj sve podatke kao csv",exporterVisibleAsCsv:"Eksportuj vidljive podatke kao csv",exporterSelectedAsCsv:"Eksportuj obeležene podatke kao csv",exporterAllAsPdf:"Eksportuj sve podatke kao pdf",exporterVisibleAsPdf:"Eksportuj vidljive podake kao pdf",exporterSelectedAsPdf:"Eksportuj odabrane podatke kao pdf",exporterAllAsExcel:"Eksportuj sve podatke kao excel",exporterVisibleAsExcel:"Eksportuj vidljive podatke kao excel",exporterSelectedAsExcel:"Eksportuj odabrane podatke kao excel",clearAllFilters:"Obriši sve filtere"},importer:{noHeaders:"Kolone se nisu mogle podeliti, da li fajl poseduje heder?",noObjects:"Objecti nisu mogli biti podeljeni, da li je bilo i drugih podataka sem hedera?",invalidCsv:"Fajl nije bilo moguće procesirati, da li je ispravni CSV?",invalidJson:"Fajl nije bilo moguće procesirati, da li je ispravni JSON",jsonNotArray:"Importovani json fajl mora da sadrži niz, prekidam operaciju."},pagination:{aria:{pageToFirst:"Prva stranica",pageBack:"Stranica pre",pageSelected:"Odabrana stranica",pageForward:"Sledeća stranica",pageToLast:"Poslednja stranica"},sizes:"stavki po stranici",totalItems:"stavke",through:"kroz",of:"od"},grouping:{group:"Grupiši",ungroup:"Odrupiši",aggregate_count:"Agg: Broj",aggregate_sum:"Agg: Suma",aggregate_max:"Agg: Maksimum",aggregate_min:"Agg: Minimum",aggregate_avg:"Agg: Prosečna",aggregate_remove:"Agg: Ukloni"},validate:{error:"Greška:",minLength:"Vrednost bi trebala da bude duga bar THRESHOLD karaktera.",maxLength:"Vrednost bi trebalo da bude najviše duga THRESHOLD karaktera.",required:"Portreba je vrednost."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("ru",{headerCell:{aria:{defaultFilterLabel:"Фильтр столбца",removeFilter:"Удалить фильтр",columnMenuButtonLabel:"Меню столбца"},priority:"Приоритет:",filterLabel:"Фильтр столбца: "},aggregate:{label:"элементы"},groupPanel:{description:"Для группировки по столбцу перетащите сюда его название."},search:{placeholder:"Поиск...",showingItems:"Показать элементы:",selectedItems:"Выбранные элементы:",totalItems:"Всего элементов:",size:"Размер страницы:",first:"Первая страница",next:"Следующая страница",previous:"Предыдущая страница",last:"Последняя страница"},menu:{text:"Выбрать столбцы:"},sort:{ascending:"По возрастанию",descending:"По убыванию",none:"Без сортировки",remove:"Убрать сортировку"},column:{hide:"Спрятать столбец"},aggregation:{count:"всего строк: ",sum:"итого: ",avg:"среднее: ",min:"мин: ",max:"макс: "},pinning:{pinLeft:"Закрепить слева",pinRight:"Закрепить справа",unpin:"Открепить"},columnMenu:{close:"Закрыть"},gridMenu:{aria:{buttonLabel:"Меню"},columns:"Столбцы:",importerTitle:"Импортировать файл",exporterAllAsCsv:"Экспортировать всё в CSV",exporterVisibleAsCsv:"Экспортировать видимые данные в CSV",exporterSelectedAsCsv:"Экспортировать выбранные данные в CSV",exporterAllAsPdf:"Экспортировать всё в PDF",exporterVisibleAsPdf:"Экспортировать видимые данные в PDF",exporterSelectedAsPdf:"Экспортировать выбранные данные в PDF",exporterAllAsExcel:"Экспортировать всё в Excel",exporterVisibleAsExcel:"Экспортировать видимые данные в Excel",exporterSelectedAsExcel:"Экспортировать выбранные данные в Excel",clearAllFilters:"Очистить все фильтры"},importer:{noHeaders:"Не удалось получить названия столбцов, есть ли в файле заголовок?",noObjects:"Не удалось получить данные, есть ли в файле строки кроме заголовка?",invalidCsv:"Не удалось обработать файл, это правильный CSV-файл?",invalidJson:"Не удалось обработать файл, это правильный JSON?",jsonNotArray:"Импортируемый JSON-файл должен содержать массив, операция отменена."},pagination:{aria:{pageToFirst:"Первая страница",pageBack:"Предыдущая страница",pageSelected:"Выбранная страница",pageForward:"Следующая страница",pageToLast:"Последняя страница"},sizes:"строк на страницу",totalItems:"строк",through:"по",of:"из"},grouping:{group:"Группировать",ungroup:"Разгруппировать",aggregate_count:"Группировать: Count",aggregate_sum:"Для группы: Сумма",aggregate_max:"Для группы: Максимум",aggregate_min:"Для группы: Минимум",aggregate_avg:"Для группы: Среднее",aggregate_remove:"Для группы: Пусто"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("sk",{headerCell:{aria:{defaultFilterLabel:"Filter pre stĺpec",removeFilter:"Odstrániť filter",columnMenuButtonLabel:"Menu pre stĺpec",column:"Stĺpec"},priority:"Priorita:",filterLabel:"Filter pre stĺpec: "},aggregate:{label:"položky"},groupPanel:{description:"Pretiahni sem názov stĺpca pre zoskupenie podľa toho stĺpca."},search:{aria:{selected:"Označený riadok",notSelected:"Neoznačený riadok"},placeholder:"Hľadaj...",showingItems:"Zobrazujem položky:",selectedItems:"Vybraté položky:",totalItems:"Počet položiek:",size:"Počet:",first:"Prvá strana",next:"Ďalšia strana",previous:"Predchádzajúca strana",last:"Posledná strana"},menu:{text:"Vyberte stĺpce:"},sort:{ascending:"Zotriediť vzostupne",descending:"Zotriediť zostupne",none:"Nezotriediť",remove:"Vymazať triedenie"},column:{hide:"Skryť stĺpec"},aggregation:{count:"počet riadkov: ",sum:"spolu: ",avg:"avg: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Pripnúť vľavo",pinRight:"Pripnúť vpravo",unpin:"Odopnúť"},columnMenu:{close:"Zavrieť"},gridMenu:{aria:{buttonLabel:"Grid Menu"},columns:"Stĺpce:",importerTitle:"Importovať súbor",exporterAllAsCsv:"Exportovať všetky údaje ako CSV",exporterVisibleAsCsv:"Exportovť viditeľné údaje ako CSV",exporterSelectedAsCsv:"Exportovať označené údaje ako CSV",exporterAllAsPdf:"Exportovať všetky údaje ako pdf",exporterVisibleAsPdf:"Exportovať viditeľné údaje ako pdf",exporterSelectedAsPdf:"Exportovať označené údaje ako pdf",exporterAllAsExcel:"Exportovať všetky údaje ako excel",exporterVisibleAsExcel:"Exportovať viditeľné údaje ako excel",exporterSelectedAsExcel:"Exportovať označené údaje ako excel",clearAllFilters:"Zrušiť všetky filtre"},importer:{noHeaders:"Názvy stĺpcov sa nedali odvodiť, má súbor hlavičku?",noObjects:"Objekty nebolo možné odvodiť, existovali iné údaje v súbore ako hlavičky?",invalidCsv:"Súbor sa nepodarilo spracovať, je to platný súbor CSV?",invalidJson:"Súbor nebolo možné spracovať, je to platný súbor typu Json?",jsonNotArray:"Importovaný súbor json musí obsahovať pole, ukončujem."},pagination:{aria:{pageToFirst:"Strana na začiatok",pageBack:"Strana dozadu",pageSelected:"Označená strana",pageForward:"Strana dopredu",pageToLast:"Strana na koniec"},sizes:"položky na stranu",totalItems:"položky spolu",through:"do konca",of:"z"},grouping:{group:"Zoskupiť",ungroup:"Zrušiť zoskupenie",aggregate_count:"Agg: Počet",aggregate_sum:"Agg: Suma",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Avg",aggregate_remove:"Agg: Zrušiť"},validate:{error:"Chyba:",minLength:"Hodnota by mala mať aspoň THRESHOLD znakov dlhá.",maxLength:"Hodnota by mala byť maximálne THRESHOLD znakov dlhá.",required:"Vyžaduje sa hodnota."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("sv",{headerCell:{aria:{defaultFilterLabel:"Kolumnfilter",removeFilter:"Ta bort filter",columnMenuButtonLabel:"Kolumnmeny",column:"Kolumn"},priority:"Prioritet:",filterLabel:"Filter för kolumn: "},aggregate:{label:"Artiklar"},groupPanel:{description:"Dra en kolumnrubrik hit och släpp den för att gruppera efter den kolumnen."},search:{aria:{selected:"Rad är vald",notSelected:"Rad är inte vald"},placeholder:"Sök...",showingItems:"Visar artiklar:",selectedItems:"Valda artiklar:",totalItems:"Antal artiklar:",size:"Sidstorlek:",first:"Första sidan",next:"Nästa sida",previous:"Föregående sida",last:"Sista sidan"},menu:{text:"Välj kolumner:"},sort:{ascending:"Sortera stigande",descending:"Sortera fallande",none:"Ingen sortering",remove:"Inaktivera sortering"},column:{hide:"Göm kolumn"},aggregation:{count:"Antal rader: ",sum:"Summa: ",avg:"Genomsnitt: ",min:"Min: ",max:"Max: "},pinning:{pinLeft:"Fäst vänster",pinRight:"Fäst höger",unpin:"Lösgör"},columnMenu:{close:"Stäng"},gridMenu:{aria:{buttonLabel:"Meny"},columns:"Kolumner:",importerTitle:"Importera fil",exporterAllAsCsv:"Exportera all data som CSV",exporterVisibleAsCsv:"Exportera synlig data som CSV",exporterSelectedAsCsv:"Exportera markerad data som CSV",exporterAllAsPdf:"Exportera all data som PDF",exporterVisibleAsPdf:"Exportera synlig data som PDF",exporterSelectedAsPdf:"Exportera markerad data som PDF",exporterAllAsExcel:"Exportera all data till Excel",exporterVisibleAsExcel:"Exportera synlig data till Excel",exporterSelectedAsExcel:"Exportera markerad data till Excel",clearAllFilters:"Rengör alla filter"},importer:{noHeaders:"Kolumnnamn kunde inte härledas. Har filen ett sidhuvud?",noObjects:"Objekt kunde inte härledas. Har filen data undantaget sidhuvud?",invalidCsv:"Filen kunde inte behandlas, är den en giltig CSV?",invalidJson:"Filen kunde inte behandlas, är den en giltig JSON?",jsonNotArray:"Importerad JSON-fil måste innehålla ett fält. Import avbruten."},pagination:{aria:{pageToFirst:"Gå till första sidan",pageBack:"Gå en sida bakåt",pageSelected:"Vald sida",pageForward:"Gå en sida framåt",pageToLast:"Gå till sista sidan"},sizes:"Artiklar per sida",totalItems:"Artiklar",through:"genom",of:"av"},grouping:{group:"Gruppera",ungroup:"Dela upp",aggregate_count:"Agg: Antal",aggregate_sum:"Agg: Summa",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Genomsnitt",aggregate_remove:"Agg: Ta bort"},validate:{error:"Error:",minLength:"Värdet borde vara minst THRESHOLD tecken långt.",maxLength:"Värdet borde vara max THRESHOLD tecken långt.",required:"Ett värde krävs."}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("ta",{aggregate:{label:"உருப்படிகள்"},groupPanel:{description:"ஒரு பத்தியை குழுவாக அமைக்க அப்பத்தியின் தலைப்பை இங்கே  இழுத்து வரவும் "},search:{placeholder:"தேடல் ...",showingItems:"உருப்படிகளை காண்பித்தல்:",selectedItems:"தேர்ந்தெடுக்கப்பட்ட  உருப்படிகள்:",totalItems:"மொத்த உருப்படிகள்:",size:"பக்க அளவு: ",first:"முதல் பக்கம்",next:"அடுத்த பக்கம்",previous:"முந்தைய பக்கம் ",last:"இறுதி பக்கம்"},menu:{text:"பத்திகளை தேர்ந்தெடு:"},sort:{ascending:"மேலிருந்து கீழாக",descending:"கீழிருந்து மேலாக",remove:"வரிசையை நீக்கு"},column:{hide:"பத்தியை மறைத்து வை "},aggregation:{count:"மொத்த வரிகள்:",sum:"மொத்தம்: ",avg:"சராசரி: ",min:"குறைந்தபட்ச: ",max:"அதிகபட்ச: "},pinning:{pinLeft:"இடதுபுறமாக தைக்க ",pinRight:"வலதுபுறமாக தைக்க",unpin:"பிரி"},gridMenu:{columns:"பத்திகள்:",importerTitle:"கோப்பு : படித்தல்",exporterAllAsCsv:"எல்லா தரவுகளையும் கோப்பாக்கு: csv",exporterVisibleAsCsv:"இருக்கும் தரவுகளை கோப்பாக்கு: csv",exporterSelectedAsCsv:"தேர்ந்தெடுத்த தரவுகளை கோப்பாக்கு: csv",exporterAllAsPdf:"எல்லா தரவுகளையும் கோப்பாக்கு: pdf",exporterVisibleAsPdf:"இருக்கும் தரவுகளை கோப்பாக்கு: pdf",exporterSelectedAsPdf:"தேர்ந்தெடுத்த தரவுகளை கோப்பாக்கு: pdf",clearAllFilters:"Clear all filters"},importer:{noHeaders:"பத்தியின் தலைப்புகளை பெற இயலவில்லை, கோப்பிற்கு தலைப்பு உள்ளதா?",noObjects:"இலக்குகளை உருவாக்க முடியவில்லை, கோப்பில் தலைப்புகளை தவிர தரவு ஏதேனும் உள்ளதா? ",invalidCsv:"சரிவர நடைமுறை படுத்த இயலவில்லை, கோப்பு சரிதானா? - csv",invalidJson:"சரிவர நடைமுறை படுத்த இயலவில்லை, கோப்பு சரிதானா? - json",jsonNotArray:"படித்த கோப்பில் வரிசைகள் உள்ளது, நடைமுறை ரத்து செய் : json"},pagination:{sizes:"உருப்படிகள் / பக்கம்",totalItems:"உருப்படிகள் "},grouping:{group:"குழு",ungroup:"பிரி",aggregate_count:"மதிப்பீட்டு : எண்ணு",aggregate_sum:"மதிப்பீட்டு : கூட்டல்",aggregate_max:"மதிப்பீட்டு : அதிகபட்சம்",aggregate_min:"மதிப்பீட்டு : குறைந்தபட்சம்",aggregate_avg:"மதிப்பீட்டு : சராசரி",aggregate_remove:"மதிப்பீட்டு : நீக்கு"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("tr",{headerCell:{aria:{defaultFilterLabel:"Sütun için filtre",removeFilter:"Filtreyi Kaldır",columnMenuButtonLabel:"Sütun Menüsü"},priority:"Öncelik:",filterLabel:"Sütun için filtre: "},aggregate:{label:"kayıtlar"},groupPanel:{description:"Sütuna göre gruplamak için sütun başlığını buraya sürükleyin ve bırakın."},search:{placeholder:"Arama...",showingItems:"Gösterilen Kayıt:",selectedItems:"Seçili Kayıt:",totalItems:"Toplam Kayıt:",size:"Sayfa Boyutu:",first:"İlk Sayfa",next:"Sonraki Sayfa",previous:"Önceki Sayfa",last:"Son Sayfa"},menu:{text:"Sütunları Seç:"},sort:{ascending:"Artan Sırada Sırala",descending:"Azalan Sırada Sırala",none:"Sıralama Yapma",remove:"Sıralamayı Kaldır"},column:{hide:"Sütunu Gizle"},aggregation:{count:"toplam satır: ",sum:"toplam: ",avg:"ort: ",min:"min: ",max:"maks: "},pinning:{pinLeft:"Sola Sabitle",pinRight:"Sağa Sabitle",unpin:"Sabitlemeyi Kaldır"},columnMenu:{close:"Kapat"},gridMenu:{aria:{buttonLabel:"Tablo Menü"},columns:"Sütunlar:",importerTitle:"Dosya içeri aktar",exporterAllAsCsv:"Bütün veriyi CSV olarak dışarı aktar",exporterVisibleAsCsv:"Görünen veriyi CSV olarak dışarı aktar",exporterSelectedAsCsv:"Seçili veriyi CSV olarak dışarı aktar",exporterAllAsPdf:"Bütün veriyi PDF olarak dışarı aktar",exporterVisibleAsPdf:"Görünen veriyi PDF olarak dışarı aktar",exporterSelectedAsPdf:"Seçili veriyi PDF olarak dışarı aktar",clearAllFilters:"Bütün filtreleri kaldır"},importer:{noHeaders:"Sütun isimleri üretilemiyor, dosyanın bir başlığı var mı?",noObjects:"Nesneler üretilemiyor, dosyada başlıktan başka bir veri var mı?",invalidCsv:"Dosya işlenemedi, geçerli bir CSV dosyası mı?",invalidJson:"Dosya işlenemedi, geçerli bir Json dosyası mı?",jsonNotArray:"Alınan Json dosyasında bir dizi bulunmalıdır, işlem iptal ediliyor."},pagination:{aria:{pageToFirst:"İlk sayfaya",pageBack:"Geri git",pageSelected:"Seçili sayfa",pageForward:"İleri git",pageToLast:"Sona git"},sizes:"Sayfadaki nesne sayısı",totalItems:"kayıtlar",through:"",of:""},grouping:{group:"Grupla",ungroup:"Gruplama",aggregate_count:"Yekun: Sayı",aggregate_sum:"Yekun: Toplam",aggregate_max:"Yekun: Maks",aggregate_min:"Yekun: Min",aggregate_avg:"Yekun: Ort",aggregate_remove:"Yekun: Sil"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("ua",{headerCell:{aria:{defaultFilterLabel:"Фільтр стовпчика",removeFilter:"Видалити фільтр",columnMenuButtonLabel:"Меню ствпчика"},priority:"Пріоритет:",filterLabel:"Фільтр стовпчика: "},aggregate:{label:"елементи"},groupPanel:{description:"Для групування за стовпчиком перетягніть сюди його назву."},search:{placeholder:"Пошук...",showingItems:"Показати елементи:",selectedItems:"Обрані елементи:",totalItems:"Усього елементів:",size:"Розмір сторінки:",first:"Перша сторінка",next:"Наступна сторінка",previous:"Попередня сторінка",last:"Остання сторінка"},menu:{text:"Обрати ствпчики:"},sort:{ascending:"За зростанням",descending:"За спаданням",none:"Без сортування",remove:"Прибрати сортування"},column:{hide:"Приховати стовпчик"},aggregation:{count:"усього рядків: ",sum:"ітого: ",avg:"середнє: ",min:"мін: ",max:"макс: "},pinning:{pinLeft:"Закріпити ліворуч",pinRight:"Закріпити праворуч",unpin:"Відкріпити"},columnMenu:{close:"Закрити"},gridMenu:{aria:{buttonLabel:"Меню"},columns:"Стовпчики:",importerTitle:"Імпортувати файл",exporterAllAsCsv:"Експортувати все в CSV",exporterVisibleAsCsv:"Експортувати видимі дані в CSV",exporterSelectedAsCsv:"Експортувати обрані дані в CSV",exporterAllAsPdf:"Експортувати все в PDF",exporterVisibleAsPdf:"Експортувати видимі дані в PDF",exporterSelectedAsPdf:"Експортувати обрані дані в PDF",clearAllFilters:"Очистити всі фільтри"},importer:{noHeaders:"Не вдалося отримати назви стовпчиків, чи є в файлі заголовок?",noObjects:"Не вдалося отримати дані, чи є в файлі рядки окрім заголовка?",invalidCsv:"Не вдалося обробити файл, чи це коректний CSV-файл?",invalidJson:"Не вдалося обробити файл, чи це коректний JSON?",jsonNotArray:"JSON-файл що імпортується повинен містити масив, операцію скасовано."},pagination:{aria:{pageToFirst:"Перша сторінка",pageBack:"Попередня сторінка",pageSelected:"Обрана сторінка",pageForward:"Наступна сторінка",pageToLast:"Остання сторінка"},sizes:"рядків на сторінку",totalItems:"рядків",through:"по",of:"з"},grouping:{group:"Групувати",ungroup:"Розгрупувати",aggregate_count:"Групувати: Кількість",aggregate_sum:"Для групи: Сума",aggregate_max:"Для групи: Максимум",aggregate_min:"Для групи: Мінімум",aggregate_avg:"Для групи: Серднє",aggregate_remove:"Для групи: Пусто"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("zh-cn",{headerCell:{aria:{defaultFilterLabel:"列过滤器",removeFilter:"移除过滤器",columnMenuButtonLabel:"列菜单"},priority:"优先级:",filterLabel:"列过滤器: "},aggregate:{label:"行"},groupPanel:{description:"拖曳表头到此处进行分组"},search:{placeholder:"查找",showingItems:"已显示行数：",selectedItems:"已选择行数：",totalItems:"总行数：",size:"每页显示行数：",first:"首页",next:"下一页",previous:"上一页",last:"末页"},menu:{text:"选择列："},sort:{ascending:"升序",descending:"降序",none:"无序",remove:"取消排序"},column:{hide:"隐藏列"},aggregation:{count:"计数：",sum:"求和：",avg:"均值：",min:"最小值：",max:"最大值："},pinning:{pinLeft:"左侧固定",pinRight:"右侧固定",unpin:"取消固定"},columnMenu:{close:"关闭"},gridMenu:{aria:{buttonLabel:"表格菜单"},columns:"列：",importerTitle:"导入文件",exporterAllAsCsv:"导出全部数据到CSV",exporterVisibleAsCsv:"导出可见数据到CSV",exporterSelectedAsCsv:"导出已选数据到CSV",exporterAllAsPdf:"导出全部数据到PDF",exporterVisibleAsPdf:"导出可见数据到PDF",exporterSelectedAsPdf:"导出已选数据到PDF",clearAllFilters:"清除所有过滤器"},importer:{noHeaders:"无法获取列名，确定文件包含表头？",noObjects:"无法获取数据，确定文件包含数据？",invalidCsv:"无法处理文件，确定是合法的CSV文件？",invalidJson:"无法处理文件，确定是合法的JSON文件？",jsonNotArray:"导入的文件不是JSON数组！"},pagination:{aria:{pageToFirst:"第一页",pageBack:"上一页",pageSelected:"当前页",pageForward:"下一页",pageToLast:"最后一页"},sizes:"行每页",totalItems:"行",through:"至",of:"共"},grouping:{group:"分组",ungroup:"取消分组",aggregate_count:"合计: 计数",aggregate_sum:"合计: 求和",aggregate_max:"合计: 最大",aggregate_min:"合计: 最小",aggregate_avg:"合计: 平均",aggregate_remove:"合计: 移除"}}),e}])}]),angular.module("ui.grid").config(["$provide",function(e){e.decorator("i18nService",["$delegate",function(e){return e.add("zh-tw",{aggregate:{label:"行"},groupPanel:{description:"拖曳表頭到此處進行分組"},search:{placeholder:"查找",showingItems:"已顯示行數：",selectedItems:"已選擇行數：",totalItems:"總行數：",size:"每頁顯示行數：",first:"首頁",next:"下壹頁",previous:"上壹頁",last:"末頁"},menu:{text:"選擇列："},sort:{ascending:"升序",descending:"降序",remove:"取消排序"},column:{hide:"隱藏列"},aggregation:{count:"計數：",sum:"求和：",avg:"均值：",min:"最小值：",max:"最大值："},pinning:{pinLeft:"左側固定",pinRight:"右側固定",unpin:"取消固定"},gridMenu:{columns:"列：",importerTitle:"導入文件",exporterAllAsCsv:"導出全部數據到CSV",exporterVisibleAsCsv:"導出可見數據到CSV",exporterSelectedAsCsv:"導出已選數據到CSV",exporterAllAsPdf:"導出全部數據到PDF",exporterVisibleAsPdf:"導出可見數據到PDF",exporterSelectedAsPdf:"導出已選數據到PDF",clearAllFilters:"清除所有过滤器"},importer:{noHeaders:"無法獲取列名，確定文件包含表頭？",noObjects:"無法獲取數據，確定文件包含數據？",invalidCsv:"無法處理文件，確定是合法的CSV文件？",invalidJson:"無法處理文件，確定是合法的JSON文件？",jsonNotArray:"導入的文件不是JSON數組！"},pagination:{sizes:"行每頁",totalItems:"行"}}),e}])}]),function(){"use strict";var e=angular.module("ui.grid.importer",["ui.grid"]);e.constant("uiGridImporterConstants",{featureName:"importer"}),e.service("uiGridImporterService",["$q","uiGridConstants","uiGridImporterConstants","gridUtil","$compile","$interval","i18nService","$window",function(e,i,t,n,r,o,a,l){var s={initializeGrid:function(e,t){t.importer={$scope:e},this.defaultGridOptions(t.options);var r={events:{importer:{}},methods:{importer:{importFile:function(e){s.importThisFile(t,e)}}}};t.api.registerEventsFromObject(r.events),t.api.registerMethodsFromObject(r.methods),t.options.enableImporter&&t.options.importerShowMenu&&(t.api.core.addToGridMenu?s.addToMenu(t):o(function(){t.api.core.addToGridMenu&&s.addToMenu(t)},100,1))},defaultGridOptions:function(e){e.enableImporter||void 0===e.enableImporter?l.hasOwnProperty("File")&&l.hasOwnProperty("FileReader")&&l.hasOwnProperty("FileList")&&l.hasOwnProperty("Blob")?e.enableImporter=!0:(n.logError("The File APIs are not fully supported in this browser, grid importer cannot be used."),e.enableImporter=!1):e.enableImporter=!1,e.importerProcessHeaders=e.importerProcessHeaders||s.processHeaders,e.importerHeaderFilter=e.importerHeaderFilter||function(e){return e},e.importerErrorCallback&&"function"==typeof e.importerErrorCallback||delete e.importerErrorCallback,!0!==e.enableImporter||e.importerDataAddCallback||(n.logError("You have not set an importerDataAddCallback, importer is disabled"),e.enableImporter=!1),e.importerShowMenu=!1!==e.importerShowMenu,e.importerObjectCallback=e.importerObjectCallback||function(e,t){return t}},addToMenu:function(e){e.api.core.addToGridMenu(e,[{title:a.getSafeText("gridMenu.importerTitle"),order:150},{templateUrl:"ui-grid/importerMenuItemContainer",action:function(){this.grid.api.importer.importAFile(e)},order:151}])},importThisFile:function(e,t){if(t){var r=new FileReader;switch(t.type){case"application/json":r.onload=s.importJsonClosure(e);break;default:r.onload=s.importCsvClosure(e)}r.readAsText(t)}else n.logError("No file object provided to importThisFile, should be impossible, aborting")},importJsonClosure:function(n){return function(e){var t,r=[],i=s.parseJson(n,e);null!==i&&(i.forEach(function(e){t=s.newObject(n),angular.extend(t,e),t=n.options.importerObjectCallback(n,t),r.push(t)}),s.addObjects(n,r))}},parseJson:function(t,r){var e;try{e=JSON.parse(r.target.result)}catch(e){return void s.alertError(t,"importer.invalidJson","File could not be processed, is it valid json? Content was: ",r.target.result)}return Array.isArray(e)?e:(s.alertError(t,"importer.jsonNotarray","Import failed, file is not an array, file was: ",r.target.result),[])},importCsvClosure:function(i){return function(e){var t=s.parseCsv(e);if(!t||t.length<1)s.alertError(i,"importer.invalidCsv","File could not be processed, is it valid csv? Content was: ",e.target.result);else{var r=s.createCsvObjects(i,t);r&&0!==r.length?s.addObjects(i,r):s.alertError(i,"importer.noObjects","Objects were not able to be derived, content was: ",e.target.result)}}},parseCsv:function(e){var t=e.target.result;return CSV.parse(t)},createCsvObjects:function(t,e){var r=t.options.importerProcessHeaders(t,e.shift());if(!r||0===r.length)return s.alertError(t,"importer.noHeaders","Column names could not be derived, content was: ",e),[];var i,n=[];return e.forEach(function(e){i=s.newObject(t),null!==e&&e.forEach(function(e,t){null!==r[t]&&(i[r[t]]=e)}),i=t.options.importerObjectCallback(t,i),n.push(i)}),n},processHeaders:function(e,t){var r=[];if(e.options.columnDefs&&0!==e.options.columnDefs.length){var i=s.flattenColumnDefs(e,e.options.columnDefs);return t.forEach(function(e){i[e]?r.push(i[e]):i[e.toLowerCase()]?r.push(i[e.toLowerCase()]):r.push(null)}),r}return t.forEach(function(e){r.push(e.replace(/[^0-9a-zA-Z\-_]/g,"_"))}),r},flattenColumnDefs:function(t,e){var r={};return e.forEach(function(e){e.name&&(r[e.name]=e.field||e.name,r[e.name.toLowerCase()]=e.field||e.name),e.field&&(r[e.field]=e.field||e.name,r[e.field.toLowerCase()]=e.field||e.name),e.displayName&&(r[e.displayName]=e.field||e.name,r[e.displayName.toLowerCase()]=e.field||e.name),e.displayName&&t.options.importerHeaderFilter&&(r[t.options.importerHeaderFilter(e.displayName)]=e.field||e.name,r[t.options.importerHeaderFilter(e.displayName).toLowerCase()]=e.field||e.name)}),r},addObjects:function(e,t){if(e.api.rowEdit){var r=e.registerDataChangeCallback(function(){e.api.rowEdit.setRowsDirty(t),r()},[i.dataChange.ROW]);e.importer.$scope.$on("$destroy",r)}e.importer.$scope.$apply(e.options.importerDataAddCallback(e,t))},newObject:function(e){return void 0!==e.options&&void 0!==e.options.importerNewObject?new e.options.importerNewObject:{}},alertError:function(e,t,r,i){e.options.importerErrorCallback?e.options.importerErrorCallback(e,t,r,i):(l.alert(a.getSafeText(t)),n.logError(r+i))}};return s}]),e.directive("uiGridImporter",["uiGridImporterConstants","uiGridImporterService","gridUtil","$compile",function(e,n,t,r){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,link:function(e,t,r,i){n.initializeGrid(e,i.grid)}}}]),e.directive("uiGridImporterMenuItem",["uiGridImporterConstants","uiGridImporterService","gridUtil","$compile",function(e,a,l,t){return{replace:!0,priority:0,require:"?^uiGrid",scope:!1,templateUrl:"ui-grid/importerMenuItem",link:function(e,t,r,i){var n;var o=t[0].querySelectorAll(".ui-grid-importer-file-chooser");1!==o.length?l.logError("Found > 1 or < 1 file choosers within the menu item, error, cannot continue"):o[0].addEventListener("change",function(e){var t=e.srcElement||e.target;if(t&&t.files&&1===t.files.length){var r=t.files[0];void 0!==i&&i?(n=i.grid,a.importThisFile(n,r),t.form.reset()):l.logError("Could not import file because UI Grid was not found.")}},!1)}}}])}(),function(){"use strict";var e=angular.module("ui.grid.infiniteScroll",["ui.grid"]);e.service("uiGridInfiniteScrollService",["gridUtil","$compile","$rootScope","uiGridConstants","ScrollEvent","$q",function(e,t,l,s,a,r){var d={initializeGrid:function(r,e){if(d.defaultGridOptions(r.options),r.options.enableInfiniteScroll){r.infiniteScroll={dataLoading:!1},d.setScrollDirections(r,r.options.infiniteScrollUp,r.options.infiniteScrollDown),r.api.core.on.scrollEnd(e,d.handleScroll);var t={events:{infiniteScroll:{needLoadMoreData:function(e,t){},needLoadMoreDataTop:function(e,t){}}},methods:{infiniteScroll:{dataLoaded:function(e,t){return d.setScrollDirections(r,e,t),d.adjustScroll(r).then(function(){r.infiniteScroll.dataLoading=!1})},resetScroll:function(e,t){d.setScrollDirections(r,e,t),d.adjustInfiniteScrollPosition(r,0)},saveScrollPercentage:function(){r.infiniteScroll.prevScrollTop=r.renderContainers.body.prevScrollTop,r.infiniteScroll.previousVisibleRows=r.getVisibleRowCount()},dataRemovedTop:function(e,t){d.dataRemovedTop(r,e,t)},dataRemovedBottom:function(e,t){d.dataRemovedBottom(r,e,t)},setScrollDirections:function(e,t){d.setScrollDirections(r,e,t)}}}};r.api.registerEventsFromObject(t.events),r.api.registerMethodsFromObject(t.methods)}},defaultGridOptions:function(e){e.enableInfiniteScroll=!1!==e.enableInfiniteScroll,e.infiniteScrollRowsFromEnd=e.infiniteScrollRowsFromEnd||20,e.infiniteScrollUp=!0===e.infiniteScrollUp,e.infiniteScrollDown=!1!==e.infiniteScrollDown},setScrollDirections:function(e,t,r){e.infiniteScroll.scrollUp=!0===t,e.suppressParentScrollUp=!0===t,e.infiniteScroll.scrollDown=!1!==r,e.suppressParentScrollDown=!1!==r},handleScroll:function(e){if(!(e.grid.infiniteScroll&&e.grid.infiniteScroll.dataLoading||"ui.grid.adjustInfiniteScrollPosition"===e.source)&&e.y)if(0===e.y.percentage)e.grid.scrollDirection=s.scrollDirection.UP,d.loadData(e.grid);else if(1===e.y.percentage)e.grid.scrollDirection=s.scrollDirection.DOWN,d.loadData(e.grid);else{var t=e.grid.options.infiniteScrollRowsFromEnd/e.grid.renderContainers.body.visibleRowCache.length;e.grid.scrollDirection===s.scrollDirection.UP?e.y.percentage<=t&&d.loadData(e.grid):e.grid.scrollDirection===s.scrollDirection.DOWN&&1-e.y.percentage<=t&&d.loadData(e.grid)}},loadData:function(e){e.infiniteScroll.previousVisibleRows=e.renderContainers.body.visibleRowCache.length,e.infiniteScroll.direction=e.scrollDirection,delete e.infiniteScroll.prevScrollTop,e.scrollDirection===s.scrollDirection.UP&&e.infiniteScroll.scrollUp?(e.infiniteScroll.dataLoading=!0,e.api.infiniteScroll.raise.needLoadMoreDataTop()):e.scrollDirection===s.scrollDirection.DOWN&&e.infiniteScroll.scrollDown&&(e.infiniteScroll.dataLoading=!0,e.api.infiniteScroll.raise.needLoadMoreData())},adjustScroll:function(o){var a=r.defer();return l.$applyAsync(function(){var e,t,r,i;e=o.getViewportHeight()+o.headerHeight-o.renderContainers.body.headerHeight-o.scrollbarHeight,t=o.options.rowHeight,void 0===o.infiniteScroll.direction&&d.adjustInfiniteScrollPosition(o,0);var n=t*(r=o.getVisibleRowCount());o.infiniteScroll.scrollDown&&n<e&&o.api.infiniteScroll.raise.needLoadMoreData(),o.infiniteScroll.direction===s.scrollDirection.UP&&(i=(o.infiniteScroll.prevScrollTop||0)+(r-o.infiniteScroll.previousVisibleRows)*t,d.adjustInfiniteScrollPosition(o,i),l.$applyAsync(function(){a.resolve()})),o.infiniteScroll.direction===s.scrollDirection.DOWN&&(i=o.infiniteScroll.prevScrollTop||o.infiniteScroll.previousVisibleRows*t-e,d.adjustInfiniteScrollPosition(o,i),l.$applyAsync(function(){a.resolve()}))},0),a.promise},adjustInfiniteScrollPosition:function(e,t){var r=new a(e,null,null,"ui.grid.adjustInfiniteScrollPosition"),i=e.getVisibleRowCount(),n=e.getViewportHeight()+e.headerHeight-e.renderContainers.body.headerHeight-e.scrollbarHeight,o=i*e.options.rowHeight-n;0===t&&e.infiniteScroll.scrollUp?r.y={percentage:1/o}:r.y={percentage:t/o},e.scrollContainers("",r)},dataRemovedTop:function(e,t,r){var i,n,o,a;d.setScrollDirections(e,t,r),i=e.renderContainers.body.visibleRowCache.length,n=e.infiniteScroll.prevScrollTop,a=e.options.rowHeight,o=n-(e.infiniteScroll.previousVisibleRows-i)*a,d.adjustInfiniteScrollPosition(e,o)},dataRemovedBottom:function(e,t,r){var i;d.setScrollDirections(e,t,r),i=e.infiniteScroll.prevScrollTop,d.adjustInfiniteScrollPosition(e,i)}};return d}]),e.directive("uiGridInfiniteScroll",["uiGridInfiniteScrollService",function(n){return{priority:-200,scope:!1,require:"^uiGrid",compile:function(){return{pre:function(e,t,r,i){n.initializeGrid(i.grid,e)},post:function(e,t,r){}}}}}])}(),function(){"use strict";var e=angular.module("ui.grid.moveColumns",["ui.grid"]);e.service("uiGridMoveColumnService",["$q","$rootScope","$log","ScrollEvent","uiGridConstants","gridUtil",function(i,d,e,t,u,s){var c={initializeGrid:function(e){this.registerPublicApi(e),this.defaultGridOptions(e.options),e.moveColumns={orderCache:[]},e.registerColumnBuilder(this.movableColumnBuilder),e.registerDataChangeCallback(this.verifyColumnOrder,[u.dataChange.COLUMN])},registerPublicApi:function(a){var l=this,e={events:{colMovable:{columnPositionChanged:function(e,t,r){}}},methods:{colMovable:{moveColumn:function(e,t){var i=a.columns;if(angular.isNumber(e)&&angular.isNumber(t)){for(var r=0,n=0;n<i.length;n++)(angular.isDefined(i[n].colDef.visible)&&!1===i[n].colDef.visible||!0===i[n].isRowHeader)&&r++;if(e>=i.length-r||t>=i.length-r)s.logError("MoveColumn: Invalid values for originalPosition, finalPosition");else{var o=function(e){for(var t=e,r=0;r<=t;r++)angular.isDefined(i[r])&&(angular.isDefined(i[r].colDef.visible)&&!1===i[r].colDef.visible||!0===i[r].isRowHeader)&&t++;return t};l.redrawColumnAtPosition(a,o(e),o(t))}}else s.logError("MoveColumn: Please provide valid values for originalPosition and finalPosition")}}}};a.api.registerEventsFromObject(e.events),a.api.registerMethodsFromObject(e.methods)},defaultGridOptions:function(e){e.enableColumnMoving=!1!==e.enableColumnMoving},movableColumnBuilder:function(e,t,r){return e.enableColumnMoving=void 0===e.enableColumnMoving?r.enableColumnMoving:e.enableColumnMoving,i.all([])},updateColumnCache:function(e){e.moveColumns.orderCache=e.getOnlyDataColumns()},verifyColumnOrder:function(i){var n,o=i.rowHeaderColumns.length;angular.forEach(i.moveColumns.orderCache,function(e,t){if(-1!==(n=i.columns.indexOf(e))&&n-o!==t){var r=i.columns.splice(n,1)[0];i.columns.splice(t+o,0,r)}})},redrawColumnAtPosition:function(e,t,r){var i=e.columns;if(t!==r){for(var n=t<r?t+1:t-1,o=Math.min(n,r);o<=Math.max(n,r)&&!i[o].visible;o++);if(!(o>Math.max(n,r))){var a=i[t];if(a.colDef.enableColumnMoving){if(r<t)for(var l=t;r<l;l--)i[l]=i[l-1];else if(t<r)for(var s=t;s<r;s++)i[s]=i[s+1];i[r]=a,c.updateColumnCache(e),e.queueGridRefresh(),d.$applyAsync(function(){e.api.core.notifyDataChange(u.dataChange.COLUMN),e.api.colMovable.raise.columnPositionChanged(a.colDef,t,r)})}}}}};return c}]),e.directive("uiGridMoveColumns",["uiGridMoveColumnService",function(n){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){n.initializeGrid(i.grid)},post:function(e,t,r,i){}}}}}]),e.directive("uiGridHeaderCell",["$q","gridUtil","uiGridMoveColumnService","$document","$log","uiGridConstants","ScrollEvent",function(e,t,b,y,r,i,S){return{priority:-10,require:"^uiGrid",compile:function(){return{post:function(u,i,e,c){if(u.col.colDef.enableColumnMoving){var g,n,p,f,m,h,t=angular.element(i[0].querySelectorAll(".ui-grid-cell-contents")),d=!1,v=!1,r=function(e){g=u.grid.element[0].getBoundingClientRect().left,u.grid.hasLeftContainer()&&(g+=u.grid.renderContainers.left.header[0].getBoundingClientRect().width),n=e.pageX||(e.originalEvent?e.originalEvent.pageX:0),p=0,f=g+u.grid.getViewportWidth(),"mousedown"===e.type?(y.on("mousemove",o),y.on("mouseup",a)):"touchstart"===e.type&&(y.on("touchmove",o),y.on("touchend",a))},o=function(e){var t=e.pageX||(e.originalEvent?e.originalEvent.pageX:0),r=t-n;0!==r&&(document.onselectstart=function(){return!1},v=!0,d?d&&(s(r),n=t):l())},a=function(e){if(document.onselectstart=null,m&&(m.remove(),d=!1),w(),C(),v){for(var t,r=u.grid.columns,i=0,n=0;n<r.length&&r[n].colDef.name!==u.col.colDef.name;n++)i++;if(p<0){var o,a=0;if(u.grid.isRTL()){for(o=i+1;o<r.length;o++)if((angular.isUndefined(r[o].colDef.visible)||!0===r[o].colDef.visible)&&(a+=r[o].drawnWidth||r[o].width||r[o].colDef.width)>Math.abs(p)){b.redrawColumnAtPosition(u.grid,i,o-1);break}}else for(o=i-1;0<=o;o--)if((angular.isUndefined(r[o].colDef.visible)||!0===r[o].colDef.visible)&&(a+=r[o].drawnWidth||r[o].width||r[o].colDef.width)>Math.abs(p)){b.redrawColumnAtPosition(u.grid,i,o+1);break}a<Math.abs(p)&&(t=0,u.grid.isRTL()&&(t=r.length-1),b.redrawColumnAtPosition(u.grid,i,t))}else if(0<p){var l,s=0;if(u.grid.isRTL()){for(l=i-1;0<l;l--)if((angular.isUndefined(r[l].colDef.visible)||!0===r[l].colDef.visible)&&(s+=r[l].drawnWidth||r[l].width||r[l].colDef.width,p<s)){b.redrawColumnAtPosition(u.grid,i,l);break}}else for(l=i+1;l<r.length;l++)if((angular.isUndefined(r[l].colDef.visible)||!0===r[l].colDef.visible)&&(s+=r[l].drawnWidth||r[l].width||r[l].colDef.width,p<s)){b.redrawColumnAtPosition(u.grid,i,l-1);break}s<p&&(t=r.length-1,u.grid.isRTL()&&(t=0),b.redrawColumnAtPosition(u.grid,i,t))}}},C=function(){t.on("touchstart",r),t.on("mousedown",r)},w=function(){t.off("touchstart",r),t.off("mousedown",r),y.off("mousemove",o),y.off("touchmove",o),y.off("mouseup",a),y.off("touchend",a)};C();var l=function(){d=!0,m=i.clone(),i.parent().append(m),m.addClass("movingColumn");var e={};e.left=i[0].offsetLeft+"px";var t=u.grid.element[0].getBoundingClientRect().right,r=i[0].getBoundingClientRect().right;t<r&&(h=u.col.drawnWidth+(t-r),e.width=h+"px"),m.css(e)},s=function(e){for(var t=u.grid.columns,r=0,i=0;i<t.length;i++)(angular.isUndefined(t[i].colDef.visible)||!0===t[i].colDef.visible)&&(r+=t[i].drawnWidth||t[i].width||t[i].colDef.width);var n,o=m[0].getBoundingClientRect().left-1,a=m[0].getBoundingClientRect().right;if(n=(n=o-g+e)<f?n:f,(g<=o||0<e)&&(a<=f||e<0))m.css({visibility:"visible",left:m[0].offsetLeft+(n<f?e:f-o)+"px"});else if(r>Math.ceil(c.grid.gridWidth)){e*=8;var l=new S(u.col.grid,null,null,"uiGridHeaderCell.moveElement");l.x={pixels:e},l.grid.scrollContainers("",l)}for(var s=0,d=0;d<t.length;d++)if(angular.isUndefined(t[d].colDef.visible)||!0===t[d].colDef.visible){if(t[d].colDef.name===u.col.colDef.name)break;s+=t[d].drawnWidth||t[d].width||t[d].colDef.width}void 0===u.newScrollLeft?p+=e:p=u.newScrollLeft+n-s,h<u.col.drawnWidth&&(h+=Math.abs(e),m.css({width:h+"px"}))};u.$on("$destroy",w)}}}}}}])}(),function(){"use strict";var e=angular.module("ui.grid.pagination",["ng","ui.grid"]);e.service("uiGridPaginationService",["gridUtil",function(t){var e={initializeGrid:function(o){e.defaultGridOptions(o.options);var a={events:{pagination:{paginationChanged:function(e,t){}}},methods:{pagination:{getPage:function(){return o.options.enablePagination?o.options.paginationCurrentPage:null},getFirstRowIndex:function(){return o.options.useCustomPagination?o.options.paginationPageSizes.reduce(function(e,t,r){return r<o.options.paginationCurrentPage-1?e+t:e},0):(o.options.paginationCurrentPage-1)*o.options.paginationPageSize},getLastRowIndex:function(){return o.options.useCustomPagination?a.methods.pagination.getFirstRowIndex()+o.options.paginationPageSizes[o.options.paginationCurrentPage-1]-1:Math.min(o.options.paginationCurrentPage*o.options.paginationPageSize,o.options.totalItems)-1},getTotalPages:function(){return o.options.enablePagination?o.options.useCustomPagination?o.options.paginationPageSizes.length:0===o.options.totalItems?1:Math.ceil(o.options.totalItems/o.options.paginationPageSize):null},nextPage:function(){o.options.enablePagination&&(0<o.options.totalItems?o.options.paginationCurrentPage=Math.min(o.options.paginationCurrentPage+1,a.methods.pagination.getTotalPages()):o.options.paginationCurrentPage++)},previousPage:function(){o.options.enablePagination&&(o.options.paginationCurrentPage=Math.max(o.options.paginationCurrentPage-1,1))},seek:function(e){if(o.options.enablePagination){if(!angular.isNumber(e)||e<1)throw"Invalid page number: "+e;o.options.paginationCurrentPage=Math.min(e,a.methods.pagination.getTotalPages())}}}}};o.api.registerEventsFromObject(a.events),o.api.registerMethodsFromObject(a.methods);o.registerRowsProcessor(function(e){if(o.options.useExternalPagination||!o.options.enablePagination)return e;var t=parseInt(o.options.paginationPageSize,10),r=(parseInt(o.options.paginationCurrentPage,10),e.filter(function(e){return e.visible}));o.options.totalItems=r.length;var i=a.methods.pagination.getFirstRowIndex(),n=a.methods.pagination.getLastRowIndex();return i>r.length&&(i=((o.options.paginationCurrentPage=1)-1)*t),r.slice(i,n+1)},900)},defaultGridOptions:function(e){e.enablePagination=!1!==e.enablePagination,e.enablePaginationControls=!1!==e.enablePaginationControls,e.useExternalPagination=!0===e.useExternalPagination,e.useCustomPagination=!0===e.useCustomPagination,t.isNullOrUndefined(e.totalItems)&&(e.totalItems=0),t.isNullOrUndefined(e.paginationPageSizes)&&(e.paginationPageSizes=[250,500,1e3]),t.isNullOrUndefined(e.paginationPageSize)&&(0<e.paginationPageSizes.length?e.paginationPageSize=e.paginationPageSizes[0]:e.paginationPageSize=0),t.isNullOrUndefined(e.paginationCurrentPage)&&(e.paginationCurrentPage=1),t.isNullOrUndefined(e.paginationTemplate)&&(e.paginationTemplate="ui-grid/pagination")},onPaginationChanged:function(e,t,r){e.api.pagination.raise.paginationChanged(t,r),e.options.useExternalPagination||e.queueGridRefresh()}};return e}]),e.directive("uiGridPagination",["gridUtil","uiGridPaginationService",function(n,o){return{priority:-200,scope:!1,require:"uiGrid",link:{pre:function(e,r,t,i){o.initializeGrid(i.grid),n.getTemplate(i.grid.options.paginationTemplate).then(function(e){var t=angular.element(e);r.append(t),i.innerCompile(t)})}}}}]),e.directive("uiGridPager",["uiGridPaginationService","uiGridConstants","gridUtil","i18nService","i18nConstants",function(d,u,c,g,p){return{priority:-200,scope:!0,require:"^uiGrid",link:function(r,t,e,i){r.aria=g.getSafeText("pagination.aria");var n=function(){r.paginationApi=i.grid.api.pagination,r.sizesLabel=g.getSafeText("pagination.sizes"),r.totalItemsLabel=g.getSafeText("pagination.totalItems"),r.paginationOf=g.getSafeText("pagination.of"),r.paginationThrough=g.getSafeText("pagination.through")};n(),r.$on(p.UPDATE_EVENT,n);var o=i.grid.options;i.grid.renderContainers.body.registerViewportAdjuster(function(e){return o.enablePaginationControls&&(e.height=e.height-c.elementHeight(t,"padding")),e});var a=i.grid.registerDataChangeCallback(function(e){e.options.useExternalPagination||(e.options.totalItems=e.rows.length)},[u.dataChange.ROW]);r.$on("$destroy",a);var l=r.$watch("grid.options.paginationCurrentPage + grid.options.paginationPageSize",function(e,t){e!==t&&void 0!==t&&(!angular.isNumber(o.paginationCurrentPage)||o.paginationCurrentPage<1?o.paginationCurrentPage=1:0<o.totalItems&&o.paginationCurrentPage>r.paginationApi.getTotalPages()?o.paginationCurrentPage=r.paginationApi.getTotalPages():d.onPaginationChanged(r.grid,o.paginationCurrentPage,o.paginationPageSize))});r.$on("$destroy",function(){l()}),r.cantPageForward=function(){return r.paginationApi.getTotalPages()?r.cantPageToLast():o.data.length<1},r.cantPageToLast=function(){var e=r.paginationApi.getTotalPages();return!e||o.paginationCurrentPage>=e},r.cantPageBackward=function(){return o.paginationCurrentPage<=1};var s=function(e){e&&c.focus.bySelector(t,".ui-grid-pager-control-input")};r.pageFirstPageClick=function(){r.paginationApi.seek(1),s(r.cantPageBackward())},r.pagePreviousPageClick=function(){r.paginationApi.previousPage(),s(r.cantPageBackward())},r.pageNextPageClick=function(){r.paginationApi.nextPage(),s(r.cantPageForward())},r.pageLastPageClick=function(){r.paginationApi.seek(r.paginationApi.getTotalPages()),s(r.cantPageToLast())}}}}])}(),function(){"use strict";var e=angular.module("ui.grid.pinning",["ui.grid"]);e.constant("uiGridPinningConstants",{container:{LEFT:"left",RIGHT:"right",NONE:""}}),e.service("uiGridPinningService",["gridUtil","GridRenderContainer","i18nService","uiGridPinningConstants",function(a,e,l,s){var d={initializeGrid:function(r){d.defaultGridOptions(r.options),r.registerColumnBuilder(d.pinningColumnBuilder);var e={events:{pinning:{columnPinned:function(e,t){}}},methods:{pinning:{pinColumn:function(e,t){d.pinColumn(r,e,t)}}}};r.api.registerEventsFromObject(e.events),r.api.registerMethodsFromObject(e.methods)},defaultGridOptions:function(e){e.enablePinning=!1!==e.enablePinning,e.hidePinLeft=e.enablePinning&&e.hidePinLeft,e.hidePinRight=e.enablePinning&&e.hidePinRight},pinningColumnBuilder:function(e,t,r){if(e.enablePinning=void 0===e.enablePinning?r.enablePinning:e.enablePinning,e.hidePinLeft=void 0===e.hidePinLeft?r.hidePinLeft:e.hidePinLeft,e.hidePinRight=void 0===e.hidePinRight?r.hidePinRight:e.hidePinRight,e.pinnedLeft?(t.renderContainer="left",t.grid.createLeftContainer()):e.pinnedRight&&(t.renderContainer="right",t.grid.createRightContainer()),e.enablePinning){var i={name:"ui.grid.pinning.pinLeft",title:l.get().pinning.pinLeft,icon:"ui-grid-icon-left-open",shown:function(){return void 0===this.context.col.renderContainer||!this.context.col.renderContainer||"left"!==this.context.col.renderContainer},action:function(){d.pinColumn(this.context.col.grid,this.context.col,s.container.LEFT)}},n={name:"ui.grid.pinning.pinRight",title:l.get().pinning.pinRight,icon:"ui-grid-icon-right-open",shown:function(){return void 0===this.context.col.renderContainer||!this.context.col.renderContainer||"right"!==this.context.col.renderContainer},action:function(){d.pinColumn(this.context.col.grid,this.context.col,s.container.RIGHT)}},o={name:"ui.grid.pinning.unpin",title:l.get().pinning.unpin,icon:"ui-grid-icon-cancel",shown:function(){return void 0!==this.context.col.renderContainer&&null!==this.context.col.renderContainer&&"body"!==this.context.col.renderContainer},action:function(){d.pinColumn(this.context.col.grid,this.context.col,s.container.NONE)}};e.hidePinLeft||a.arrayContainsObjectWithProperty(t.menuItems,"name","ui.grid.pinning.pinLeft")||t.menuItems.push(i),e.hidePinRight||a.arrayContainsObjectWithProperty(t.menuItems,"name","ui.grid.pinning.pinRight")||t.menuItems.push(n),a.arrayContainsObjectWithProperty(t.menuItems,"name","ui.grid.pinning.unpin")||t.menuItems.push(o)}},pinColumn:function(e,t,r){r===s.container.NONE?(t.renderContainer=null,t.colDef.pinnedLeft=t.colDef.pinnedRight=!1):(t.renderContainer=r)===s.container.LEFT?e.createLeftContainer():r===s.container.RIGHT&&e.createRightContainer(),e.refresh().then(function(){e.api.pinning.raise.columnPinned(t.colDef,r)})}};return d}]),e.directive("uiGridPinning",["gridUtil","uiGridPinningService",function(e,n){return{require:"uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){n.initializeGrid(i.grid)},post:function(e,t,r,i){}}}}}])}(),function(){"use strict";var e=angular.module("ui.grid.resizeColumns",["ui.grid"]);e.service("uiGridResizeColumnsService",["gridUtil","$q","$rootScope",function(i,n,o){return{defaultGridOptions:function(e){e.enableColumnResizing=!1!==e.enableColumnResizing,!1===e.enableColumnResize&&(e.enableColumnResizing=!1)},colResizerColumnBuilder:function(e,t,r){return e.enableColumnResizing=void 0===e.enableColumnResizing?r.enableColumnResizing:e.enableColumnResizing,!1===e.enableColumnResize&&(e.enableColumnResizing=!1),n.all([])},registerPublicApi:function(e){e.api.registerEventsFromObject({colResizable:{columnSizeChanged:function(e,t){}}})},fireColumnSizeChanged:function(e,t,r){o.$applyAsync(function(){e.api.colResizable?e.api.colResizable.raise.columnSizeChanged(t,r):i.logError("The resizeable api is not registered, this may indicate that you've included the module but not added the 'ui-grid-resize-columns' directive to your grid definition.  Cannot raise any events.")})},findTargetCol:function(e,t,r){var i=e.getRenderContainer();if("left"!==t)return e;var n=i.visibleColumnCache.indexOf(e);return i.visibleColumnCache[n-1*r]}}}]),e.directive("uiGridResizeColumns",["gridUtil","uiGridResizeColumnsService",function(e,n){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){n.defaultGridOptions(i.grid.options),i.grid.registerColumnBuilder(n.colResizerColumnBuilder),n.registerPublicApi(i.grid)},post:function(e,t,r,i){}}}}}]),e.directive("uiGridHeaderCell",["gridUtil","$templateCache","$compile","$q","uiGridResizeColumnsService","uiGridConstants",function(e,o,u,t,c,g){return{priority:-10,require:"^uiGrid",compile:function(){return{post:function(a,l,e,t){var r=t.grid;if(r.options.enableColumnResizing){var s=o.get("ui-grid/columnResizer"),d=1;r.isRTL()&&(a.position="left",d=-1);var i=function(){for(var e=l[0].getElementsByClassName("ui-grid-column-resizer"),t=0;t<e.length;t++)angular.element(e[t]).remove();var r=c.findTargetCol(a.col,"left",d),i=a.col.getRenderContainer();if(r&&0!==i.visibleColumnCache.indexOf(a.col)&&!1!==r.colDef.enableColumnResizing){var n=angular.element(s).clone();n.attr("position","left"),l.prepend(n),u(n)(a)}if(!1!==a.col.colDef.enableColumnResizing){var o=angular.element(s).clone();o.attr("position","right"),l.append(o),u(o)(a)}};i();var n=r.registerDataChangeCallback(function(){a.$applyAsync(i)},[g.dataChange.COLUMN]);a.$on("$destroy",n)}}}}}}]),e.directive("uiGridColumnResizer",["$document","gridUtil","uiGridConstants","uiGridResizeColumnsService",function(h,v,C,w){var b=angular.element('<div class="ui-grid-resize-overlay"></div>');return{priority:0,scope:{col:"=",position:"@",renderIndex:"="},require:"?^uiGrid",link:function(l,s,e,d){var o=0,a=0,u=0,c=1;function g(e){d.grid.refreshCanvas(!0).then(function(){d.grid.queueGridRefresh()})}function p(e,t){var r=t;return e.minWidth&&r<e.minWidth?r=e.minWidth:e.maxWidth&&r>e.maxWidth&&(r=e.maxWidth),r}function r(e,t){e.originalEvent&&(e=e.originalEvent),e.preventDefault(),(a=(e.targetTouches?e.targetTouches[0]:e).clientX-u)<0?a=0:a>d.grid.gridWidth&&(a=d.grid.gridWidth);var r=w.findTargetCol(l.col,l.position,c);if(!1!==r.colDef.enableColumnResizing){d.grid.element.hasClass("column-resizing")||d.grid.element.addClass("column-resizing");var i=a-o,n=parseInt(r.drawnWidth+i*c,10);a+=(p(r,n)-n)*c,b.css({left:a+"px"}),d.fireEvent(C.events.ITEM_DRAGGING)}}function i(e){e.originalEvent&&(e=e.originalEvent),e.preventDefault(),d.grid.element.removeClass("column-resizing"),b.remove();var t=(a=(e.changedTouches?e.changedTouches[0]:e).clientX-u)-o;if(0===t)return m(),void f();var r=w.findTargetCol(l.col,l.position,c);if(!1!==r.colDef.enableColumnResizing){var i=parseInt(r.drawnWidth+t*c,10);r.width=p(r,i),r.hasCustomWidth=!0,g(),w.fireColumnSizeChanged(d.grid,r.colDef,t),m(),f()}}d.grid.isRTL()&&(l.position="left",c=-1),"left"===l.position?s.addClass("left"):"right"===l.position&&s.addClass("right");var n=function(e,t){e.originalEvent&&(e=e.originalEvent),e.stopPropagation(),u=d.grid.element[0].getBoundingClientRect().left,o=(e.targetTouches?e.targetTouches[0]:e).clientX-u,d.grid.element.append(b),b.css({left:o}),"touchstart"===e.type?(h.on("touchend",i),h.on("touchmove",r),s.off("mousedown",n)):(h.on("mouseup",i),h.on("mousemove",r),s.off("touchstart",n))},f=function(){s.on("mousedown",n),s.on("touchstart",n)},m=function(){h.off("mouseup",i),h.off("touchend",i),h.off("mousemove",r),h.off("touchmove",r),s.off("mousedown",n),s.off("touchstart",n)};f();var t=function(e,t){e.stopPropagation();var r=w.findTargetCol(l.col,l.position,c);if(!1!==r.colDef.enableColumnResizing){var n=0,i=v.closestElm(s,".ui-grid-render-container").querySelectorAll("."+C.COL_CLASS_PREFIX+r.uid+" .ui-grid-cell-contents");Array.prototype.forEach.call(i,function(e){var i;angular.element(e).parent().hasClass("ui-grid-header-cell")&&(i=angular.element(e).parent()[0].querySelectorAll(".ui-grid-column-menu-button")),v.fakeElement(e,{},function(e){var t=angular.element(e);t.attr("style","float: left");var r=v.elementWidth(t);i&&(r+=v.elementWidth(i));n<r&&(n=r)})});var o=p(r,n),a=o-r.drawnWidth;r.width=o,r.hasCustomWidth=!0,g(),w.fireColumnSizeChanged(d.grid,r.colDef,a)}};s.on("dblclick",t),s.on("$destroy",function(){s.off("dblclick",t),m()})}}}])}(),function(){"use strict";var e=angular.module("ui.grid.rowEdit",["ui.grid","ui.grid.edit","ui.grid.cellNav"]);e.constant("uiGridRowEditConstants",{}),e.service("uiGridRowEditService",["$interval","$q","uiGridConstants","uiGridRowEditConstants","gridUtil",function(i,e,t,r,a){var l={initializeGrid:function(t,r){r.rowEdit={};var e={events:{rowEdit:{saveRow:function(e){}}},methods:{rowEdit:{setSavePromise:function(e,t){l.setSavePromise(r,e,t)},getDirtyRows:function(){return r.rowEdit.dirtyRows?r.rowEdit.dirtyRows:[]},getErrorRows:function(){return r.rowEdit.errorRows?r.rowEdit.errorRows:[]},flushDirtyRows:function(){return l.flushDirtyRows(r)},setRowsDirty:function(e){l.setRowsDirty(r,e)},setRowsClean:function(e){l.setRowsClean(r,e)}}}};r.api.registerEventsFromObject(e.events),r.api.registerMethodsFromObject(e.methods),r.api.core.on.renderingComplete(t,function(e){r.api.edit.on.afterCellEdit(t,l.endEditCell),r.api.edit.on.beginCellEdit(t,l.beginEditCell),r.api.edit.on.cancelCellEdit(t,l.cancelEditCell),r.api.cellNav&&r.api.cellNav.on.navigate(t,l.navigate)})},defaultGridOptions:function(e){},saveRow:function(t,r){var i=this;return function(){if(r.isSaving=!0,r.rowEditSavePromise)return r.rowEditSavePromise;var e=t.api.rowEdit.raise.saveRow(r.entity);return r.rowEditSavePromise?r.rowEditSavePromise.then(i.processSuccessPromise(t,r),i.processErrorPromise(t,r)):a.logError("A promise was not returned when saveRow event was raised, either nobody is listening to event, or event handler did not return a promise"),e}},setSavePromise:function(e,t,r){e.getRow(t).rowEditSavePromise=r},processSuccessPromise:function(e,t){var r=this;return function(){delete t.isSaving,delete t.isDirty,delete t.isError,delete t.rowEditSaveTimer,delete t.rowEditSavePromise,r.removeRow(e.rowEdit.errorRows,t),r.removeRow(e.rowEdit.dirtyRows,t)}},processErrorPromise:function(e,t){return function(){delete t.isSaving,delete t.rowEditSaveTimer,delete t.rowEditSavePromise,t.isError=!0,e.rowEdit.errorRows||(e.rowEdit.errorRows=[]),l.isRowPresent(e.rowEdit.errorRows,t)||e.rowEdit.errorRows.push(t)}},removeRow:function(r,i){null!=r&&r.forEach(function(e,t){e.uid===i.uid&&r.splice(t,1)})},isRowPresent:function(e,r){var i=!1;return e.forEach(function(e,t){e.uid===r.uid&&(i=!0)}),i},flushDirtyRows:function(t){var r=[];return t.api.rowEdit.getDirtyRows().forEach(function(e){l.cancelTimer(t,e),l.saveRow(t,e)(),r.push(e.rowEditSavePromise)}),e.all(r)},endEditCell:function(e,t,r,i){var n=this.grid,o=n.getRow(e);o?(r!==i||o.isDirty)&&(n.rowEdit.dirtyRows||(n.rowEdit.dirtyRows=[]),o.isDirty||(o.isDirty=!0,n.rowEdit.dirtyRows.push(o)),delete o.isError,l.considerSetTimer(n,o)):a.logError("Unable to find rowEntity in grid data, dirty flag cannot be set")},beginEditCell:function(e,t){var r=this.grid,i=r.getRow(e);i?l.cancelTimer(r,i):a.logError("Unable to find rowEntity in grid data, timer cannot be cancelled")},cancelEditCell:function(e,t){var r=this.grid,i=r.getRow(e);i?l.considerSetTimer(r,i):a.logError("Unable to find rowEntity in grid data, timer cannot be set")},navigate:function(e,t){var r=this.grid;e.row.rowEditSaveTimer&&l.cancelTimer(r,e.row),t&&t.row&&t.row!==e.row&&l.considerSetTimer(r,t.row)},considerSetTimer:function(e,t){if(l.cancelTimer(e,t),t.isDirty&&!t.isSaving&&-1!==e.options.rowEditWaitInterval){var r=e.options.rowEditWaitInterval?e.options.rowEditWaitInterval:2e3;t.rowEditSaveTimer=i(l.saveRow(e,t),r,1)}},cancelTimer:function(e,t){t.rowEditSaveTimer&&!t.isSaving&&(i.cancel(t.rowEditSaveTimer),delete t.rowEditSaveTimer)},setRowsDirty:function(r,e){var i;e.forEach(function(e,t){(i=r.getRow(e))?(r.rowEdit.dirtyRows||(r.rowEdit.dirtyRows=[]),i.isDirty||(i.isDirty=!0,r.rowEdit.dirtyRows.push(i)),delete i.isError,l.considerSetTimer(r,i)):a.logError("requested row not found in rowEdit.setRowsDirty, row was: "+e)})},setRowsClean:function(r,e){var i;e.forEach(function(e,t){(i=r.getRow(e))?(delete i.isDirty,l.removeRow(r.rowEdit.dirtyRows,i),l.cancelTimer(r,i),delete i.isError,l.removeRow(r.rowEdit.errorRows,i)):a.logError("requested row not found in rowEdit.setRowsClean, row was: "+e)})}};return l}]),e.directive("uiGridRowEdit",["gridUtil","uiGridRowEditService","uiGridEditConstants",function(e,n,t){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){n.initializeGrid(e,i.grid)},post:function(e,t,r,i){}}}}}]),e.directive("uiGridViewport",["$compile","uiGridConstants","gridUtil","$parse",function(e,t,r,i){return{priority:-200,scope:!1,compile:function(e,t){var r=angular.element(e.children().children()[0]),i=r.attr("ng-class"),n="";return n=i?i.slice(0,-1)+", 'ui-grid-row-dirty': row.isDirty, 'ui-grid-row-saving': row.isSaving, 'ui-grid-row-error': row.isError}":"{'ui-grid-row-dirty': row.isDirty, 'ui-grid-row-saving': row.isSaving, 'ui-grid-row-error': row.isError}",r.attr("ng-class",n),{pre:function(e,t,r,i){},post:function(e,t,r,i){}}}}}])}(),function(){"use strict";var e=angular.module("ui.grid.saveState",["ui.grid","ui.grid.selection","ui.grid.cellNav","ui.grid.grouping","ui.grid.pinning","ui.grid.treeView"]);e.constant("uiGridSaveStateConstants",{featureName:"saveState"}),e.service("uiGridSaveStateService",function(){var l={initializeGrid:function(r){r.saveState={},this.defaultGridOptions(r.options);var e={events:{saveState:{}},methods:{saveState:{save:function(){return l.save(r)},restore:function(e,t){return l.restore(r,e,t)}}}};r.api.registerEventsFromObject(e.events),r.api.registerMethodsFromObject(e.methods)},defaultGridOptions:function(e){e.saveWidths=!1!==e.saveWidths,e.saveOrder=!1!==e.saveOrder,e.saveScroll=!0===e.saveScroll,e.saveFocus=!0!==e.saveScroll&&!1!==e.saveFocus,e.saveVisible=!1!==e.saveVisible,e.saveSort=!1!==e.saveSort,e.saveFilter=!1!==e.saveFilter,e.saveSelection=!1!==e.saveSelection,e.saveGrouping=!1!==e.saveGrouping,e.saveGroupingExpandedStates=!0===e.saveGroupingExpandedStates,e.savePinning=!1!==e.savePinning,e.saveTreeView=!1!==e.saveTreeView},save:function(e){var t={};return t.columns=l.saveColumns(e),t.scrollFocus=l.saveScrollFocus(e),t.selection=l.saveSelection(e),t.grouping=l.saveGrouping(e),t.treeView=l.saveTreeView(e),t.pagination=l.savePagination(e),t},restore:function(e,t,r){return r.columns&&l.restoreColumns(e,r.columns),r.scrollFocus&&l.restoreScrollFocus(e,t,r.scrollFocus),r.selection&&l.restoreSelection(e,r.selection),r.grouping&&l.restoreGrouping(e,r.grouping),r.treeView&&l.restoreTreeView(e,r.treeView),r.pagination&&l.restorePagination(e,r.pagination),e.refresh()},saveColumns:function(r){var i=[];return r.getOnlyDataColumns().forEach(function(e){var t={};t.name=e.name,r.options.saveVisible&&(t.visible=e.visible),r.options.saveWidths&&(t.width=e.width),r.options.saveSort&&(t.sort=angular.copy(e.sort)),r.options.saveFilter&&(t.filters=[],e.filters.forEach(function(e){var r={};angular.forEach(e,function(e,t){"condition"!==t&&"$$hashKey"!==t&&"placeholder"!==t&&(r[t]=e)}),t.filters.push(r)})),r.api.pinning&&r.options.savePinning&&(t.pinned=e.renderContainer?e.renderContainer:""),i.push(t)}),i},saveScrollFocus:function(e){if(!e.api.cellNav)return{};var t={};if(e.options.saveFocus){t.focus=!0;var r=e.api.cellNav.getFocusedCell();null!==r&&(null!==r.col&&(t.colName=r.col.colDef.name),null!==r.row&&(t.rowVal=l.getRowVal(e,r.row)))}return(e.options.saveScroll||e.options.saveFocus&&!t.colName&&!t.rowVal)&&(t.focus=!1,e.renderContainers.body.prevRowScrollIndex&&(t.rowVal=l.getRowVal(e,e.renderContainers.body.visibleRowCache[e.renderContainers.body.prevRowScrollIndex])),e.renderContainers.body.prevColScrollIndex&&(t.colName=e.renderContainers.body.visibleColumnCache[e.renderContainers.body.prevColScrollIndex].name)),t},saveSelection:function(t){return t.api.selection&&t.options.saveSelection?t.api.selection.getSelectedGridRows().map(function(e){return l.getRowVal(t,e)}):[]},saveGrouping:function(e){return e.api.grouping&&e.options.saveGrouping?e.api.grouping.getGrouping(e.options.saveGroupingExpandedStates):{}},savePagination:function(e){return e.api.pagination&&e.options.paginationPageSize?{paginationCurrentPage:e.options.paginationCurrentPage,paginationPageSize:e.options.paginationPageSize}:{}},saveTreeView:function(e){return e.api.treeView&&e.options.saveTreeView?e.api.treeView.getTreeView():{}},getRowVal:function(e,t){if(!t)return null;var r={};return e.options.saveRowIdentity?(r.identity=!0,r.row=e.options.saveRowIdentity(t.entity)):(r.identity=!1,r.row=e.renderContainers.body.visibleRowCache.indexOf(t)),r},restoreColumns:function(o,e){var a=!1;e.forEach(function(e,t){var r=o.getColumn(e.name);if(r&&!o.isRowHeaderColumn(r)){!o.options.saveVisible||r.visible===e.visible&&r.colDef.visible===e.visible||(r.visible=e.visible,r.colDef.visible=e.visible,o.api.core.raise.columnVisibilityChanged(r)),o.options.saveWidths&&r.width!==e.width&&(r.width=e.width,r.hasCustomWidth=!0),!o.options.saveSort||angular.equals(r.sort,e.sort)||void 0===r.sort&&angular.isEmpty(e.sort)||(r.sort=angular.copy(e.sort),a=!0),o.options.saveFilter&&!angular.equals(r.filters,e.filters)&&(e.filters.forEach(function(e,t){angular.extend(r.filters[t],e),void 0!==e.term&&null!==e.term||delete r.filters[t].term}),o.api.core.raise.filterChanged(r)),o.api.pinning&&o.options.savePinning&&r.renderContainer!==e.pinned&&o.api.pinning.pinColumn(r,e.pinned);var i=o.getOnlyDataColumns().indexOf(r);if(-1!==i&&o.options.saveOrder&&i!==t){var n=o.columns.splice(i+o.rowHeaderColumns.length,1)[0];o.columns.splice(t+o.rowHeaderColumns.length,0,n)}}}),a&&o.api.core.raise.sortChanged(o,o.getColumnSorting())},restoreScrollFocus:function(e,t,r){if(e.api.cellNav){var i,n;if(r.colName){var o=e.options.columnDefs.filter(function(e){return e.name===r.colName});0<o.length&&(i=o[0])}r.rowVal&&r.rowVal.row&&(n=r.rowVal.identity?l.findRowByIdentity(e,r.rowVal):e.renderContainers.body.visibleRowCache[r.rowVal.row]);var a=n&&n.entity?n.entity:null;(i||a)&&(r.focus?e.api.cellNav.scrollToFocus(a,i):e.scrollTo(a,i))}},restoreSelection:function(r,e){r.api.selection&&(r.api.selection.clearSelectedRows(),e.forEach(function(e){if(e.identity){var t=l.findRowByIdentity(r,e);t&&r.api.selection.selectRow(t.entity)}else r.api.selection.selectRowByVisibleIndex(e.row)}))},restoreGrouping:function(e,t){e.api.grouping&&null!=t&&!angular.equals(t,{})&&e.api.grouping.setGrouping(t)},restoreTreeView:function(e,t){e.api.treeView&&null!=t&&!angular.equals(t,{})&&e.api.treeView.setTreeView(t)},restorePagination:function(e,t){e.api.pagination&&e.options.paginationPageSize&&(e.options.paginationCurrentPage=t.paginationCurrentPage,e.options.paginationPageSize=t.paginationPageSize)},findRowByIdentity:function(t,r){if(!t.options.saveRowIdentity)return null;var e=t.rows.filter(function(e){return t.options.saveRowIdentity(e.entity)===r.row});return 0<e.length?e[0]:null}};return l}),e.directive("uiGridSaveState",["uiGridSaveStateConstants","uiGridSaveStateService","gridUtil","$compile",function(e,n,t,r){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,link:function(e,t,r,i){n.initializeGrid(i.grid)}}}])}(),function(){"use strict";var e=angular.module("ui.grid.selection",["ui.grid"]);e.constant("uiGridSelectionConstants",{featureName:"selection",selectionRowHeaderColName:"selectionRowHeaderCol"}),angular.module("ui.grid").config(["$provide",function(e){e.decorator("GridRow",["$delegate",function(e){return e.prototype.setSelected=function(e){e!==this.isSelected&&(this.isSelected=e,this.grid.selection.selectedCount+=e?1:-1)},e.prototype.setFocused=function(e){e!==this.isFocused&&(this.grid.selection.focusedRow&&(this.grid.selection.focusedRow.isFocused=!1),this.grid.selection.focusedRow=e?this:null,this.isFocused=e)},e}])}]),e.service("uiGridSelectionService",function(){var u={initializeGrid:function(i){i.selection={lastSelectedRow:null,focusedRow:null,selectAll:!1},i.selection.selectedCount=0,u.defaultGridOptions(i.options);var e={events:{selection:{rowFocusChanged:function(e,t,r){},rowSelectionChanged:function(e,t,r){},rowSelectionChangedBatch:function(e,t,r){}}},methods:{selection:{toggleRowSelection:function(e,t){var r=i.getRow(e);null!==r&&u.toggleRowSelection(i,r,t,i.options.multiSelect,i.options.noUnselect)},selectRow:function(e,t){var r=i.getRow(e);null===r||r.isSelected||u.toggleRowSelection(i,r,t,i.options.multiSelect,i.options.noUnselect)},selectRowByVisibleIndex:function(e,t){var r=i.renderContainers.body.visibleRowCache[e];null==r||r.isSelected||u.toggleRowSelection(i,r,t,i.options.multiSelect,i.options.noUnselect)},unSelectRow:function(e,t){var r=i.getRow(e);null!==r&&r.isSelected&&u.toggleRowSelection(i,r,t,i.options.multiSelect,i.options.noUnselect)},unSelectRowByVisibleIndex:function(e,t){var r=i.renderContainers.body.visibleRowCache[e];null!=r&&r.isSelected&&u.toggleRowSelection(i,r,t,i.options.multiSelect,i.options.noUnselect)},selectAllRows:function(t){if(!1!==i.options.multiSelect){var r=[];i.rows.forEach(function(e){e.isSelected||!1===e.enableSelection||!1===i.options.isRowSelectable(e)||(e.setSelected(!0),u.decideRaiseSelectionEvent(i,e,r,t))}),i.selection.selectAll=!0,u.decideRaiseSelectionBatchEvent(i,r,t)}},selectAllVisibleRows:function(t){if(!1!==i.options.multiSelect){var r=[];i.rows.forEach(function(e){e.visible?e.isSelected||!1===e.enableSelection||!1===i.options.isRowSelectable(e)||(e.setSelected(!0),u.decideRaiseSelectionEvent(i,e,r,t)):e.isSelected&&(e.setSelected(!1),u.decideRaiseSelectionEvent(i,e,r,t))}),i.selection.selectAll=!0,u.decideRaiseSelectionBatchEvent(i,r,t)}},clearSelectedRows:function(e){u.clearSelectedRows(i,e)},getSelectedRows:function(){return u.getSelectedRows(i).map(function(e){return e.entity}).filter(function(e){return e.hasOwnProperty("$$hashKey")||!angular.isObject(e)})},getSelectedGridRows:function(){return u.getSelectedRows(i)},getSelectedCount:function(){return i.selection.selectedCount},setMultiSelect:function(e){i.options.multiSelect=e},setModifierKeysToMultiSelect:function(e){i.options.modifierKeysToMultiSelect=e},getSelectAllState:function(){return i.selection.selectAll}}}};i.api.registerEventsFromObject(e.events),i.api.registerMethodsFromObject(e.methods)},defaultGridOptions:function(e){e.enableRowSelection=!1!==e.enableRowSelection,e.multiSelect=!1!==e.multiSelect,e.noUnselect=!0===e.noUnselect,e.modifierKeysToMultiSelect=!0===e.modifierKeysToMultiSelect,e.enableRowHeaderSelection=!1!==e.enableRowHeaderSelection,void 0===e.enableFullRowSelection&&(e.enableFullRowSelection=!e.enableRowHeaderSelection),e.enableFocusRowOnRowHeaderClick=!1!==e.enableFocusRowOnRowHeaderClick||!e.enableRowHeaderSelection,e.enableSelectRowOnFocus=!1!==e.enableSelectRowOnFocus,e.enableSelectAll=!1!==e.enableSelectAll,e.enableSelectionBatchEvent=!1!==e.enableSelectionBatchEvent,e.selectionRowHeaderWidth=angular.isDefined(e.selectionRowHeaderWidth)?e.selectionRowHeaderWidth:30,e.enableFooterTotalSelected=!1!==e.enableFooterTotalSelected,e.isRowSelectable=angular.isDefined(e.isRowSelectable)?e.isRowSelectable:angular.noop},toggleRowSelection:function(e,t,r,i,n){if(!1!==t.enableSelection){var o,a=t.isSelected;i||(a?1<(o=u.getSelectedRows(e)).length&&(a=!1,u.clearSelectedRows(e,r)):u.clearSelectedRows(e,r)),a&&n||(t.setSelected(!a),!0===t.isSelected&&(e.selection.lastSelectedRow=t),o=u.getSelectedRows(e),e.selection.selectAll=e.rows.length===o.length,e.api.selection.raise.rowSelectionChanged(t,r))}},shiftSelect:function(e,t,r,i){if(i){var n=0<u.getSelectedRows(e).length?e.renderContainers.body.visibleRowCache.indexOf(e.selection.lastSelectedRow):0,o=e.renderContainers.body.visibleRowCache.indexOf(t);if(o<n){var a=n;n=o,o=a}for(var l=[],s=n;s<=o;s++){var d=e.renderContainers.body.visibleRowCache[s];d&&(d.isSelected||!1===d.enableSelection||(d.setSelected(!0),e.selection.lastSelectedRow=d,u.decideRaiseSelectionEvent(e,d,l,r)))}u.decideRaiseSelectionBatchEvent(e,l,r)}},getSelectedRows:function(e){return e.rows.filter(function(e){return e.isSelected})},clearSelectedRows:function(t,r){var i=[];u.getSelectedRows(t).forEach(function(e){e.isSelected&&(e.setSelected(!1),u.decideRaiseSelectionEvent(t,e,i,r))}),t.selection.selectAll=!1,t.selection.selectedCount=0,u.decideRaiseSelectionBatchEvent(t,i,r)},decideRaiseSelectionEvent:function(e,t,r,i){e.options.enableSelectionBatchEvent?r.push(t):e.api.selection.raise.rowSelectionChanged(t,i)},decideRaiseSelectionBatchEvent:function(e,t,r){0<t.length&&e.api.selection.raise.rowSelectionChangedBatch(t,r)}};return u}),e.directive("uiGridSelection",["uiGridSelectionConstants","uiGridSelectionService","uiGridConstants",function(d,u,c){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){if(u.initializeGrid(i.grid),i.grid.options.enableRowHeaderSelection){var n={name:d.selectionRowHeaderColName,displayName:"",width:i.grid.options.selectionRowHeaderWidth,minWidth:10,cellTemplate:"ui-grid/selectionRowHeader",headerCellTemplate:"ui-grid/selectionHeaderCell",enableColumnResizing:!1,enableColumnMenu:!1,exporterSuppressExport:!0,allowCellFocus:!0};i.grid.addRowHeaderColumn(n,0)}var o=!1,a=function(e){return e.forEach(function(e){e.enableSelection=i.grid.options.isRowSelectable(e)}),e},l=function(){i.grid.options.isRowSelectable!==angular.noop&&!0!==o&&(i.grid.registerRowsProcessor(a,500),o=!0)};l();var s=i.grid.registerDataChangeCallback(l,[c.dataChange.OPTIONS]);e.$on("$destroy",s)},post:function(e,t,r,i){}}}}}]),e.directive("uiGridSelectionRowHeaderButtons",["$templateCache","uiGridSelectionService","gridUtil",function(e,a,l){return{replace:!0,restrict:"E",template:e.get("ui-grid/selectionRowHeaderButtons"),scope:!0,require:"^uiGrid",link:function(e,t,r,i){var n=i.grid;function o(e,t){if(t.stopPropagation(),t.shiftKey)a.shiftSelect(n,e,t,n.options.multiSelect);else if(t.ctrlKey||t.metaKey)a.toggleRowSelection(n,e,t,n.options.multiSelect,n.options.noUnselect);else if(e.groupHeader){a.toggleRowSelection(n,e,t,n.options.multiSelect,n.options.noUnselect);for(var r=0;r<e.treeNode.children.length;r++)a.toggleRowSelection(n,e.treeNode.children[r].row,t,n.options.multiSelect,n.options.noUnselect)}else a.toggleRowSelection(n,e,t,n.options.multiSelect&&!n.options.modifierKeysToMultiSelect,n.options.noUnselect);n.options.enableFocusRowOnRowHeaderClick&&e.setFocused(!e.isFocused)&&n.api.selection.raise.rowFocusChanged(e,t)}e.selectButtonClick=o,e.selectButtonKeyDown=function(e,t){32===t.keyCode&&(t.preventDefault(),o(e,t))},"ie"===l.detectBrowser()&&t.on("mousedown",function(e){(e.ctrlKey||e.shiftKey)&&(e.target.onselectstart=function(){return!1},window.setTimeout(function(){e.target.onselectstart=null},0))}),e.$on("$destroy",function(){t.off()})}}}]),e.directive("uiGridSelectionSelectAllButtons",["$templateCache","uiGridSelectionService",function(e,i){return{replace:!0,restrict:"E",template:e.get("ui-grid/selectionSelectAllButtons"),scope:!1,link:function(t){var r=t.col.grid;t.headerButtonKeyDown=function(e){32!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),t.headerButtonClick(e))},t.headerButtonClick=function(e){r.selection.selectAll?(i.clearSelectedRows(r,e),r.options.noUnselect&&r.api.selection.selectRowByVisibleIndex(0,e),r.selection.selectAll=!1):r.options.multiSelect&&(r.api.selection.selectAllVisibleRows(e),r.selection.selectAll=!0)}}}}]),e.directive("uiGridViewport",function(){return{priority:-200,scope:!1,compile:function(e){var t=angular.element(e[0].querySelector(".ui-grid-canvas:not(.ui-grid-empty-base-layer-container)").children[0]),r="'ui-grid-row-selected': row.isSelected, 'ui-grid-row-focused': row.isFocused}",i=t.attr("ng-class");return r=i?i.slice(0,-1)+","+r:"{"+r,t.attr("ng-class",r),{pre:function(e,t,r,i){},post:function(e,t,r,i){}}}}}),e.directive("uiGridCell",["uiGridConstants","uiGridSelectionService",function(c,g){return{priority:-200,restrict:"A",require:"?^uiGrid",scope:!1,link:function(r,a,e,t){var l=0,s={};t.grid.api.cellNav&&t.grid.api.cellNav.on.viewPortKeyDown(r,function(e,t){null!==t&&t.row===r.row&&t.col===r.col&&e.keyCode===c.keymap.SPACE&&"selectionRowHeaderCol"===r.col.colDef.name&&(e.preventDefault(),g.toggleRowSelection(r.grid,r.row,e,r.grid.options.multiSelect&&!r.grid.options.modifierKeysToMultiSelect,r.grid.options.noUnselect),r.$apply())});var d=function(e){"ui-grid-icon-minus-squared"!==e.target.className&&"ui-grid-icon-plus-squared"!==e.target.className&&(a.off("touchend",n),e.shiftKey?g.shiftSelect(r.grid,r.row,e,r.grid.options.multiSelect):e.ctrlKey||e.metaKey?g.toggleRowSelection(r.grid,r.row,e,r.grid.options.multiSelect,r.grid.options.noUnselect):r.grid.options.enableSelectRowOnFocus&&g.toggleRowSelection(r.grid,r.row,e,r.grid.options.multiSelect&&!r.grid.options.modifierKeysToMultiSelect,r.grid.options.noUnselect),r.row.setFocused(!r.row.isFocused),r.grid.api.selection.raise.rowFocusChanged(r.row,e),r.$apply(),window.setTimeout(function(){a.on("touchend",n)},300))},i=function(e){l=(new Date).getTime(),s=e.changedTouches[0],a.off("click",d)},n=function(e){var t=(new Date).getTime(),r=e.changedTouches[0],i=t-l,n=Math.abs(s.clientX-r.clientX),o=Math.abs(s.clientY-r.clientY);n<100&&o<100&&i<300&&d(e),window.setTimeout(function(){a.on("click",d)},300)};function o(){r.grid.options.enableRowSelection&&r.grid.options.enableFullRowSelection&&"selectionRowHeaderCol"!==r.col.colDef.name&&(a.addClass("ui-grid-disable-selection"),a.on("touchstart",i),a.on("touchend",n),a.on("click",d),r.registered=!0)}o();var u=r.grid.registerDataChangeCallback(function(){r.grid.options.enableRowSelection&&r.grid.options.enableFullRowSelection&&!r.registered?o():r.grid.options.enableRowSelection&&r.grid.options.enableFullRowSelection||!r.registered||r.registered&&(a.removeClass("ui-grid-disable-selection"),a.off("touchstart",i),a.off("touchend",n),a.off("click",d),r.registered=!1)},[c.dataChange.OPTIONS]);a.on("$destroy",u)}}}]),e.directive("uiGridGridFooter",["$compile","gridUtil",function(o,r){return{restrict:"EA",replace:!0,priority:-1e3,require:"^uiGrid",scope:!0,compile:function(){return{pre:function(i,n,e,t){t.grid.options.showGridFooter&&r.getTemplate("ui-grid/gridFooterSelectedItems").then(function(e){var t=angular.element(e),r=o(t)(i);angular.element(n[0].getElementsByClassName("ui-grid-grid-footer")[0]).append(r)})},post:function(e,t,r,i){}}}}}])}(),function(){"use strict";var e=angular.module("ui.grid.treeBase",["ui.grid"]);e.constant("uiGridTreeBaseConstants",{featureName:"treeBase",rowHeaderColName:"treeBaseRowHeaderCol",EXPANDED:"expanded",COLLAPSED:"collapsed",aggregation:{COUNT:"count",SUM:"sum",MAX:"max",MIN:"min",AVG:"avg"}}),e.service("uiGridTreeBaseService",["$q","uiGridTreeBaseConstants","gridUtil","GridRow","gridClassFactory","i18nService","uiGridConstants","rowSorter",function(e,a,t,r,i,n,o,l){var s={initializeGrid:function(r){r.treeBase={},r.treeBase.numberLevels=0,r.treeBase.expandAll=!1,r.treeBase.tree=[],s.defaultGridOptions(r.options),r.registerRowsProcessor(s.treeRows,410),r.registerColumnBuilder(s.treeBaseColumnBuilder),s.createRowHeader(r);var e={events:{treeBase:{rowExpanded:{},rowCollapsed:{}}},methods:{treeBase:{expandAllRows:function(){s.expandAllRows(r)},collapseAllRows:function(){s.collapseAllRows(r)},toggleRowTreeState:function(e){s.toggleRowTreeState(r,e)},expandRow:function(e,t){s.expandRow(r,e,t)},expandRowChildren:function(e){s.expandRowChildren(r,e)},collapseRow:function(e){s.collapseRow(r,e)},collapseRowChildren:function(e){s.collapseRowChildren(r,e)},getTreeExpandedState:function(){return{expandedState:s.getTreeState(r)}},setTreeState:function(e){s.setTreeState(r,e)},getRowChildren:function(e){return e.treeNode.children.map(function(e){return e.row})}}}};r.api.registerEventsFromObject(e.events),r.api.registerMethodsFromObject(e.methods)},defaultGridOptions:function(e){e.treeRowHeaderBaseWidth=e.treeRowHeaderBaseWidth||30,e.treeIndent=null!=e.treeIndent?e.treeIndent:10,e.showTreeRowHeader=!1!==e.showTreeRowHeader,e.showTreeExpandNoChildren=!1!==e.showTreeExpandNoChildren,e.treeRowHeaderAlwaysVisible=!1!==e.treeRowHeaderAlwaysVisible,e.treeCustomAggregations=e.treeCustomAggregations||{},e.enableExpandAll=!1!==e.enableExpandAll},treeBaseColumnBuilder:function(e,t,r){void 0!==e.customTreeAggregationFn&&(t.treeAggregationFn=e.customTreeAggregationFn),void 0!==e.treeAggregationType&&(t.treeAggregation={type:e.treeAggregationType},void 0!==r.treeCustomAggregations[e.treeAggregationType]?(t.treeAggregationFn=r.treeCustomAggregations[e.treeAggregationType].aggregationFn,t.treeAggregationFinalizerFn=r.treeCustomAggregations[e.treeAggregationType].finalizerFn,t.treeAggregation.label=r.treeCustomAggregations[e.treeAggregationType].label):void 0!==s.nativeAggregations()[e.treeAggregationType]&&(t.treeAggregationFn=s.nativeAggregations()[e.treeAggregationType].aggregationFn,t.treeAggregation.label=s.nativeAggregations()[e.treeAggregationType].label)),void 0!==e.treeAggregationLabel&&(void 0===t.treeAggregation&&(t.treeAggregation={}),t.treeAggregation.label=e.treeAggregationLabel),t.treeAggregationUpdateEntity=!1!==e.treeAggregationUpdateEntity,void 0===t.customTreeAggregationFinalizerFn&&(t.customTreeAggregationFinalizerFn=e.customTreeAggregationFinalizerFn)},createRowHeader:function(e){var t={name:a.rowHeaderColName,displayName:"",width:e.options.treeRowHeaderBaseWidth,minWidth:10,cellTemplate:"ui-grid/treeBaseRowHeader",headerCellTemplate:"ui-grid/treeBaseHeaderCell",enableColumnResizing:!1,enableColumnMenu:!1,exporterSuppressExport:!0,allowCellFocus:!0};t.visible=e.options.treeRowHeaderAlwaysVisible,e.addRowHeaderColumn(t,-100)},expandAllRows:function(t){t.treeBase.tree.forEach(function(e){s.setAllNodes(t,e,a.EXPANDED)}),t.treeBase.expandAll=!0,t.queueGridRefresh()},collapseAllRows:function(t){t.treeBase.tree.forEach(function(e){s.setAllNodes(t,e,a.COLLAPSED)}),t.treeBase.expandAll=!1,t.queueGridRefresh()},setAllNodes:function(t,e,r){void 0!==e.state&&e.state!==r&&((e.state=r)===a.EXPANDED?t.api.treeBase.raise.rowExpanded(e.row):t.api.treeBase.raise.rowCollapsed(e.row)),e.children&&e.children.forEach(function(e){s.setAllNodes(t,e,r)})},toggleRowTreeState:function(e,t){void 0===t.treeLevel||null===t.treeLevel||t.treeLevel<0||(t.treeNode.state===a.EXPANDED?s.collapseRow(e,t):s.expandRow(e,t,!1),e.queueGridRefresh())},expandRow:function(e,t,r){if(r){for(var i=[];t&&void 0!==t.treeLevel&&null!==t.treeLevel&&0<=t.treeLevel&&t.treeNode.state!==a.EXPANDED;)i.push(t),t=t.treeNode.parentRow;if(0<i.length){for(t=i.pop();t;)t.treeNode.state=a.EXPANDED,e.api.treeBase.raise.rowExpanded(t),t=i.pop();e.treeBase.expandAll=s.allExpanded(e.treeBase.tree),e.queueGridRefresh()}}else{if(void 0===t.treeLevel||null===t.treeLevel||t.treeLevel<0)return;t.treeNode.state!==a.EXPANDED&&(t.treeNode.state=a.EXPANDED,e.api.treeBase.raise.rowExpanded(t),e.treeBase.expandAll=s.allExpanded(e.treeBase.tree),e.queueGridRefresh())}},expandRowChildren:function(e,t){void 0===t.treeLevel||null===t.treeLevel||t.treeLevel<0||(s.setAllNodes(e,t.treeNode,a.EXPANDED),e.treeBase.expandAll=s.allExpanded(e.treeBase.tree),e.queueGridRefresh())},collapseRow:function(e,t){void 0===t.treeLevel||null===t.treeLevel||t.treeLevel<0||t.treeNode.state!==a.COLLAPSED&&(t.treeNode.state=a.COLLAPSED,e.treeBase.expandAll=!1,e.api.treeBase.raise.rowCollapsed(t),e.queueGridRefresh())},collapseRowChildren:function(e,t){void 0===t.treeLevel||null===t.treeLevel||t.treeLevel<0||(s.setAllNodes(e,t.treeNode,a.COLLAPSED),e.treeBase.expandAll=!1,e.queueGridRefresh())},allExpanded:function(e){var t=!0;return e.forEach(function(e){s.allExpandedInternal(e)||(t=!1)}),t},allExpandedInternal:function(e){if(e.children&&0<e.children.length){if(e.state===a.COLLAPSED)return!1;var t=!0;return e.children.forEach(function(e){s.allExpandedInternal(e)||(t=!1)}),t}return!0},treeRows:function(e){return 0===e.length?(s.updateRowHeaderWidth(this),e):(this.treeBase.tree=s.createTree(this,e),s.updateRowHeaderWidth(this),s.sortTree(this),s.fixFilter(this),s.renderTree(this.treeBase.tree))},updateRowHeaderWidth:function(e){var t=e.getColumn(a.rowHeaderColName),r=e.options.treeRowHeaderBaseWidth+e.options.treeIndent*Math.max(e.treeBase.numberLevels-1,0);t&&r!==t.width&&(t.width=r,e.queueRefresh());var i=!0;!1===e.options.showTreeRowHeader&&(i=!1),!1===e.options.treeRowHeaderAlwaysVisible&&e.treeBase.numberLevels<=0&&(i=!1),t&&t.visible!==i&&(t.visible=i,t.colDef.visible=i,e.queueGridRefresh())},renderTree:function(e){var t=[];return e.forEach(function(e){e.row.visible&&t.push(e.row),e.state===a.EXPANDED&&e.children&&0<e.children.length&&(t=t.concat(s.renderTree(e.children)))}),t},createTree:function(r,e){var i=-1,n=[];r.treeBase.tree=[],r.treeBase.numberLevels=0;var o=s.getAggregations(r);for(e.forEach(function(e){if(e.internalRow||e.treeLevel===e.entity.$$treeLevel||(e.treeLevel=e.entity.$$treeLevel),e.treeLevel<=i){for(;e.treeLevel<=i;){var t=n.pop();s.finaliseAggregations(t),i--}0<n.length?s.setCurrentState(n):a.EXPANDED}(void 0===e.treeLevel||null===e.treeLevel||e.treeLevel<0)&&e.visible&&s.aggregate(r,e,n),s.addOrUseNode(r,e,n,o),void 0!==e.treeLevel&&null!==e.treeLevel&&0<=e.treeLevel&&(n.push(e),i++,s.setCurrentState(n)),r.treeBase.numberLevels<e.treeLevel+1&&(r.treeBase.numberLevels=e.treeLevel+1)});0<n.length;){var t=n.pop();s.finaliseAggregations(t)}return r.treeBase.tree},addOrUseNode:function(e,t,r,i){var n=[];i.forEach(function(e){n.push(s.buildAggregationObject(e.col))});var o={state:a.COLLAPSED,row:t,parentRow:null,aggregations:n,children:[]};t.treeNode&&(o.state=t.treeNode.state),0<r.length&&(o.parentRow=r[r.length-1]),t.treeNode=o,0===r.length?e.treeBase.tree.push(o):r[r.length-1].treeNode.children.push(o)},setCurrentState:function(e){var t=a.EXPANDED;return e.forEach(function(e){e.treeNode.state===a.COLLAPSED&&(t=a.COLLAPSED)}),t},sortTree:function(e){e.columns.forEach(function(e){e.sort&&e.sort.ignoreSort&&delete e.sort.ignoreSort}),e.treeBase.tree=s.sortInternal(e,e.treeBase.tree)},sortInternal:function(t,e){var r=e.map(function(e){return e.row}),i=(r=l.sort(t,r,t.columns)).map(function(e){return e.treeNode});return i.forEach(function(e){e.state===a.EXPANDED&&e.children&&0<e.children.length&&(e.children=s.sortInternal(t,e.children))}),i},fixFilter:function(e){var t;e.treeBase.tree.forEach(function(e){e.children&&0<e.children.length&&(t=e.row.visible,s.fixFilterInternal(e.children,t))})},fixFilterInternal:function(e,t){return e.forEach(function(e){e.row.visible&&!t&&(s.setParentsVisible(e),t=!0),e.children&&0<e.children.length&&s.fixFilterInternal(e.children,t&&e.row.visible)&&(t=!0)}),t},setParentsVisible:function(e){for(;e.parentRow;)e.parentRow.visible=!0,e=e.parentRow.treeNode},buildAggregationObject:function(e){var t={col:e};return e.treeAggregation&&e.treeAggregation.type&&(t.type=e.treeAggregation.type),e.treeAggregation&&e.treeAggregation.label&&(t.label=e.treeAggregation.label),t},getAggregations:function(t){var r=[];return t.columns.forEach(function(e){void 0!==e.treeAggregationFn&&(r.push(s.buildAggregationObject(e)),t.options.showColumnFooter&&void 0===e.colDef.aggregationType&&e.treeAggregation&&(e.treeFooterAggregation=s.buildAggregationObject(e),e.aggregationType=s.treeFooterAggregationType))}),r},aggregate:function(n,o,e){0===e.length&&o.treeNode&&o.treeNode.aggregations&&o.treeNode.aggregations.forEach(function(e){if(void 0!==e.col.treeFooterAggregation){var t=n.getCellValue(o,e.col),r=Number(t);e.col.treeAggregationFn?e.col.treeAggregationFn(e.col.treeFooterAggregation,t,r,o):e.col.treeFooterAggregation.value=void 0}}),e.forEach(function(e,i){e.treeNode.aggregations&&e.treeNode.aggregations.forEach(function(e){var t=n.getCellValue(o,e.col),r=Number(t);e.col.treeAggregationFn(e,t,r,o),0===i&&void 0!==e.col.treeFooterAggregation&&(e.col.treeAggregationFn?e.col.treeAggregationFn(e.col.treeFooterAggregation,t,r,o):e.col.treeFooterAggregation.value=void 0)})})},nativeAggregations:function(){return{count:{label:n.get().aggregation.count,menuTitle:n.get().grouping.aggregate_count,aggregationFn:function(e,t,r){void 0===e.value?e.value=1:e.value++}},sum:{label:n.get().aggregation.sum,menuTitle:n.get().grouping.aggregate_sum,aggregationFn:function(e,t,r){isNaN(r)||(void 0===e.value?e.value=r:e.value+=r)}},min:{label:n.get().aggregation.min,menuTitle:n.get().grouping.aggregate_min,aggregationFn:function(e,t,r){void 0===e.value?e.value=t:null!=t&&(t<e.value||null===e.value)&&(e.value=t)}},max:{label:n.get().aggregation.max,menuTitle:n.get().grouping.aggregate_max,aggregationFn:function(e,t,r){void 0===e.value?e.value=t:null!=t&&(t>e.value||null===e.value)&&(e.value=t)}},avg:{label:n.get().aggregation.avg,menuTitle:n.get().grouping.aggregate_avg,aggregationFn:function(e,t,r){void 0===e.count?e.count=1:e.count++,isNaN(r)||(void 0===e.value||void 0===e.sum?(e.value=r,e.sum=r):(e.sum+=r,e.value=e.sum/e.count))}}}},finaliseAggregation:function(e,t){t.col.treeAggregationUpdateEntity&&void 0!==e&&void 0!==e.entity["$$"+t.col.uid]&&angular.extend(t,e.entity["$$"+t.col.uid]),"function"==typeof t.col.treeAggregationFinalizerFn&&t.col.treeAggregationFinalizerFn(t),"function"==typeof t.col.customTreeAggregationFinalizerFn&&t.col.customTreeAggregationFinalizerFn(t),void 0===t.rendered&&(t.rendered=t.label?t.label+t.value:t.value)},finaliseAggregations:function(e){null!=e&&void 0!==e.treeNode.aggregations&&e.treeNode.aggregations.forEach(function(r){if(s.finaliseAggregation(e,r),r.col.treeAggregationUpdateEntity){var i={};angular.forEach(r,function(e,t){r.hasOwnProperty(t)&&"col"!==t&&(i[t]=e)}),e.entity["$$"+r.col.uid]=i}})},treeFooterAggregationType:function(e,t){return s.finaliseAggregation(void 0,t.treeFooterAggregation),void 0===t.treeFooterAggregation.value||null===t.treeFooterAggregation.rendered?"":t.treeFooterAggregation.rendered}};return s}]),e.directive("uiGridTreeBaseRowHeaderButtons",["$templateCache","uiGridTreeBaseService",function(e,o){return{replace:!0,restrict:"E",template:e.get("ui-grid/treeBaseRowHeaderButtons"),scope:!0,require:"^uiGrid",link:function(e,t,r,i){var n=i.grid;e.treeButtonClass=function(e){if(n.options.showTreeExpandNoChildren&&-1<e.treeLevel||e.treeNode.children&&0<e.treeNode.children.length){if("expanded"===e.treeNode.state)return"ui-grid-icon-minus-squared";if("collapsed"===e.treeNode.state)return"ui-grid-icon-plus-squared"}},e.treeButtonClick=function(e,t){t.stopPropagation(),o.toggleRowTreeState(n,e,t)}}}}]),e.directive("uiGridTreeBaseExpandAllButtons",["$templateCache","uiGridTreeBaseService",function(e,i){return{replace:!0,restrict:"E",template:e.get("ui-grid/treeBaseExpandAllButtons"),scope:!1,link:function(e){var r=e.col.grid;e.headerButtonClass=function(){return 0<r.treeBase.numberLevels&&r.treeBase.expandAll?"ui-grid-icon-minus-squared":0<r.treeBase.numberLevels&&!r.treeBase.expandAll?"ui-grid-icon-plus-squared":void 0},e.headerButtonClick=function(e,t){r.treeBase.expandAll?i.collapseAllRows(r,t):i.expandAllRows(r,t)}}}}]),e.directive("uiGridViewport",function(){return{priority:-200,scope:!1,compile:function(e){var t=angular.element(e.children().children()[0]),r=t.attr("ng-class"),i="";return i=r?r.slice(0,-1)+",'ui-grid-tree-header-row': row.treeLevel > -1}":"{'ui-grid-tree-header-row': row.treeLevel > -1}",t.attr("ng-class",i),{pre:function(e,t,r,i){},post:function(e,t,r,i){}}}}})}(),function(){"use strict";var e=angular.module("ui.grid.treeView",["ui.grid","ui.grid.treeBase"]);e.constant("uiGridTreeViewConstants",{featureName:"treeView",rowHeaderColName:"treeBaseRowHeaderCol",EXPANDED:"expanded",COLLAPSED:"collapsed",aggregation:{COUNT:"count",SUM:"sum",MAX:"max",MIN:"min",AVG:"avg"}}),e.service("uiGridTreeViewService",["$q","uiGridTreeViewConstants","uiGridTreeBaseConstants","uiGridTreeBaseService","gridUtil","GridRow","gridClassFactory","i18nService","uiGridConstants",function(e,t,r,n,i,o,a,l,s){var d={initializeGrid:function(e,t){n.initializeGrid(e,t),e.treeView={},e.registerRowsProcessor(d.adjustSorting,60);var r={treeView:{}},i={treeView:{}};e.api.registerEventsFromObject(r),e.api.registerMethodsFromObject(i)},defaultGridOptions:function(e){e.enableTreeView=!1!==e.enableTreeView},adjustSorting:function(e){return this.columns.forEach(function(e){e.sort&&(e.sort.ignoreSort=!0)}),e}};return d}]),e.directive("uiGridTreeView",["uiGridTreeViewConstants","uiGridTreeViewService","$templateCache",function(e,n,t){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){!1!==i.grid.options.enableTreeView&&n.initializeGrid(i.grid,e)},post:function(e,t,r,i){}}}}}])}(),function(){"use strict";var e=angular.module("ui.grid.validate",["ui.grid"]);e.service("uiGridValidateService",["$sce","$q","$http","i18nService","uiGridConstants",function(n,u,e,o,t){var c={validatorFactories:{},setExternalFactoryFunction:function(e){c.externalFactoryFunction=e},clearExternalFactory:function(){delete c.externalFactoryFunction},getValidatorFromExternalFactory:function(e,t){return c.externalFactoryFunction(e,t).validatorFactory(t)},getMessageFromExternalFactory:function(e,t){return c.externalFactoryFunction(e,t).messageFunction(t)},setValidator:function(e,t,r){c.validatorFactories[e]={validatorFactory:t,messageFunction:r}},getValidator:function(e,t){if(c.externalFactoryFunction){var r=c.getValidatorFromExternalFactory(e,t);if(r)return r}if(!c.validatorFactories[e])throw"Invalid validator name: "+e;return c.validatorFactories[e].validatorFactory(t)},getMessage:function(e,t){if(c.externalFactoryFunction){var r=c.getMessageFromExternalFactory(e,t);if(r)return r}return c.validatorFactories[e].messageFunction(t)},isInvalid:function(e,t){return e["$$invalid"+t.name]},setInvalid:function(e,t){e["$$invalid"+t.name]=!0},setValid:function(e,t){delete e["$$invalid"+t.name]},setError:function(e,t,r){e["$$errors"+t.name]||(e["$$errors"+t.name]={}),e["$$errors"+t.name][r]=!0},clearError:function(e,t,r){e["$$errors"+t.name]&&r in e["$$errors"+t.name]&&delete e["$$errors"+t.name][r]},getErrorMessages:function(e,t){var r=[];return e["$$errors"+t.name]&&0!==Object.keys(e["$$errors"+t.name]).length&&Object.keys(e["$$errors"+t.name]).sort().forEach(function(e){r.push(c.getMessage(e,t.validators[e]))}),r},getFormattedErrors:function(e,t){var r="",i=c.getErrorMessages(e,t);if(i.length)return i.forEach(function(e){r+=e+"<br/>"}),n.trustAsHtml("<p><b>"+o.getSafeText("validate.error")+"</b></p>"+r)},getTitleFormattedErrors:function(e,t){var r="",i=c.getErrorMessages(e,t);if(i.length)return i.forEach(function(e){r+=e+"\n"}),n.trustAsHtml(o.getSafeText("validate.error")+"\n"+r)},runValidators:function(e,t,n,o,a){if(n!==o){if(void 0===t.name||!t.name)throw new Error("colDef.name is required to perform validation");c.setValid(e,t);var r=function(t,r,i){return function(e){e||(c.setInvalid(t,r),c.setError(t,r,i),a&&a.api.validate.raise.validationFailed(t,r,n,o))}},i=[];for(var l in t.validators){c.clearError(e,t,l);var s=c.getValidator(l,t.validators[l]),d=u.when(s(o,n,e,t)).then(r(e,t,l));i.push(d)}return u.all(i)}},createDefaultValidators:function(){c.setValidator("minLength",function(r){return function(e,t){return null==t||""===t||t.length>=r}},function(e){return o.getSafeText("validate.minLength").replace("THRESHOLD",e)}),c.setValidator("maxLength",function(r){return function(e,t){return null==t||""===t||t.length<=r}},function(e){return o.getSafeText("validate.maxLength").replace("THRESHOLD",e)}),c.setValidator("required",function(r){return function(e,t){return!r||!(null==t||""===t)}},function(){return o.getSafeText("validate.required")})},initializeGrid:function(e,n){n.validate={isInvalid:c.isInvalid,getErrorMessages:c.getErrorMessages,getFormattedErrors:c.getFormattedErrors,getTitleFormattedErrors:c.getTitleFormattedErrors,runValidators:c.runValidators};var t={events:{validate:{validationFailed:function(e,t,r,i){}}},methods:{validate:{isInvalid:function(e,t){return n.validate.isInvalid(e,t)},getErrorMessages:function(e,t){return n.validate.getErrorMessages(e,t)},getFormattedErrors:function(e,t){return n.validate.getFormattedErrors(e,t)},getTitleFormattedErrors:function(e,t){return n.validate.getTitleFormattedErrors(e,t)}}}};n.api.registerEventsFromObject(t.events),n.api.registerMethodsFromObject(t.methods),n.edit&&n.api.edit.on.afterCellEdit(e,function(e,t,r,i){n.validate.runValidators(e,t,r,i,n)}),c.createDefaultValidators()}};return c}]),e.directive("uiGridValidate",["gridUtil","uiGridValidateService",function(e,n){return{priority:0,replace:!0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,r,i){n.initializeGrid(e,i.grid)},post:function(e,t,r,i){}}}}}])}(),angular.module("ui.grid").run(["$templateCache",function(e){"use strict";e.put("ui-grid/ui-grid-filter",'<div class="ui-grid-filter-container" ng-style="col.extraStyle" ng-repeat="colFilter in col.filters" ng-class="{\'ui-grid-filter-cancel-button-hidden\' : colFilter.disableCancelFilterButton === true }"><div ng-if="colFilter.type !== \'select\'"><input type="text" class="ui-grid-filter-input ui-grid-filter-input-{{$index}}" ng-model="colFilter.term" ng-attr-placeholder="{{colFilter.placeholder || \'\'}}" aria-label="{{colFilter.ariaLabel || aria.defaultFilterLabel}}"><div role="button" class="ui-grid-filter-button" ng-click="removeFilter(colFilter, $index)" ng-if="!colFilter.disableCancelFilterButton" ng-disabled="colFilter.term === undefined || colFilter.term === null || colFilter.term === \'\'" ng-show="colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== \'\'"><i class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter">&nbsp;</i></div></div><div ng-if="colFilter.type === \'select\'"><select class="ui-grid-filter-select ui-grid-filter-input-{{$index}}" ng-model="colFilter.term" ng-show="colFilter.selectOptions.length > 0" ng-attr-placeholder="{{colFilter.placeholder || aria.defaultFilterLabel}}" aria-label="{{colFilter.ariaLabel || \'\'}}" ng-options="option.value as option.label for option in colFilter.selectOptions"><option value=""></option></select><div role="button" class="ui-grid-filter-button-select" ng-click="removeFilter(colFilter, $index)" ng-if="!colFilter.disableCancelFilterButton" ng-disabled="colFilter.term === undefined || colFilter.term === null || colFilter.term === \'\'" ng-show="colFilter.term !== undefined && colFilter.term != null"><i class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter">&nbsp;</i></div></div></div>'),e.put("ui-grid/ui-grid-footer",'<div class="ui-grid-footer-panel ui-grid-footer-aggregates-row">\x3c!-- tfooter --\x3e<div class="ui-grid-footer ui-grid-footer-viewport"><div class="ui-grid-footer-canvas"><div class="ui-grid-footer-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()"><div role="row" class="ui-grid-footer-cell-row"><div ui-grid-footer-cell role="gridcell" ng-repeat="col in colContainer.renderedColumns track by col.uid" col="col" render-index="$index" class="ui-grid-footer-cell ui-grid-clearfix"></div></div></div></div></div></div>'),e.put("ui-grid/ui-grid-grid-footer",'<div class="ui-grid-footer-info ui-grid-grid-footer"><span>{{\'search.totalItems\' | t}} {{grid.rows.length}}</span> <span ng-if="grid.renderContainers.body.visibleRowCache.length !== grid.rows.length" class="ngLabel">({{"search.showingItems" | t}} {{grid.renderContainers.body.visibleRowCache.length}})</span></div>'),e.put("ui-grid/ui-grid-header",'<div role="rowgroup" class="ui-grid-header">\x3c!-- theader --\x3e<div class="ui-grid-top-panel"><div class="ui-grid-header-viewport"><div class="ui-grid-header-canvas"><div class="ui-grid-header-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()"><div role="row" class="ui-grid-header-cell-row"><div class="ui-grid-header-cell ui-grid-clearfix" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell col="col" render-index="$index"></div></div></div></div></div></div></div>'),e.put("ui-grid/ui-grid-menu-button",'<div class="ui-grid-menu-button"><div role="button" ui-grid-one-bind-id-grid="\'grid-menu\'" class="ui-grid-icon-container" ng-click="toggleMenu()" aria-haspopup="true"><i class="ui-grid-icon-menu" ui-grid-one-bind-aria-label="i18n.aria.buttonLabel">&nbsp;</i></div><div ui-grid-menu menu-items="menuItems"></div></div>'),e.put("ui-grid/ui-grid-menu-header-item",'<li role="menuitem"><div class="ui-grid-menu-item" role="heading" aria-level="2" ng-show="itemShown()"><i aria-hidden="true">&nbsp; </i><span ng-bind="label()"></span></div></li>'),e.put("ui-grid/ui-grid-no-header",'<div class="ui-grid-top-panel"></div>'),e.put("ui-grid/ui-grid-row","<div ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.uid\" ui-grid-one-bind-id-grid=\"rowRenderIndex + '-' + col.uid + '-cell'\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" role=\"{{col.isRowHeader ? 'rowheader' : 'gridcell'}}\" ui-grid-cell></div>"),e.put("ui-grid/ui-grid",'<div ui-i18n="en" class="ui-grid">\x3c!-- TODO (c0bra): add "scoped" attr here, eventually? --\x3e<style ui-grid-style>.grid{{ grid.id }} {\n      /* Styles for the grid */\n    }\n\n    .grid{{ grid.id }} .ui-grid-row, .grid{{ grid.id }} .ui-grid-cell, .grid{{ grid.id }} .ui-grid-cell .ui-grid-vertical-bar {\n      height: {{ grid.options.rowHeight }}px;\n    }\n\n    .grid{{ grid.id }} .ui-grid-row:last-child .ui-grid-cell {\n      border-bottom-width: {{ (((grid.getVisibleRowCount() * grid.options.rowHeight) < grid.getViewportHeight()) && \'1\') || \'0\' }}px;\n    }\n\n    {{ grid.verticalScrollbarStyles }}\n    {{ grid.horizontalScrollbarStyles }}\n\n    /*\n    .ui-grid[dir=rtl] .ui-grid-viewport {\n      padding-left: {{ grid.verticalScrollbarWidth }}px;\n    }\n    */\n\n    {{ grid.customStyles }}</style><div class="ui-grid-contents-wrapper" role="grid"><div ui-grid-menu-button ng-if="grid.options.enableGridMenu"></div><div ng-if="grid.hasLeftContainer()" style="width: 0" ui-grid-pinned-container="\'left\'"></div><div ui-grid-render-container container-id="\'body\'" col-container-name="\'body\'" row-container-name="\'body\'" bind-scroll-horizontal="true" bind-scroll-vertical="true" enable-horizontal-scrollbar="grid.options.enableHorizontalScrollbar" enable-vertical-scrollbar="grid.options.enableVerticalScrollbar"></div><div ng-if="grid.hasRightContainer()" style="width: 0" ui-grid-pinned-container="\'right\'"></div><div ui-grid-grid-footer ng-if="grid.options.showGridFooter"></div><div ui-grid-column-menu ng-if="grid.options.enableColumnMenus"></div><div ng-transclude></div></div></div>'),e.put("ui-grid/uiGridCell",'<div class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>'),e.put("ui-grid/uiGridColumnMenu",'<div class="ui-grid-column-menu"><div ui-grid-menu menu-items="menuItems" col="col">\x3c!-- <div class="ui-grid-column-menu">\n    <div class="inner" ng-show="menuShown">\n      <ul>\n        <div ng-show="grid.options.enableSorting">\n          <li ng-click="sortColumn($event, asc)" ng-class="{ \'selected\' : col.sort.direction == asc }"><i class="ui-grid-icon-sort-alt-up"></i> Sort Ascending</li>\n          <li ng-click="sortColumn($event, desc)" ng-class="{ \'selected\' : col.sort.direction == desc }"><i class="ui-grid-icon-sort-alt-down"></i> Sort Descending</li>\n          <li ng-show="col.sort.direction" ng-click="unsortColumn()"><i class="ui-grid-icon-cancel"></i> Remove Sort</li>\n        </div>\n      </ul>\n    </div>\n  </div> --\x3e</div></div>'),e.put("ui-grid/uiGridFooterCell",'<div class="ui-grid-cell-contents" col-index="renderIndex"><div>{{ col.getAggregationText() + ( col.getAggregationValue() CUSTOM_FILTERS ) }}</div></div>'),e.put("ui-grid/uiGridHeaderCell",'<div role="columnheader" ng-class="{ \'sortable\': sortable, \'ui-grid-header-cell-last-col\': isLastCol }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="{{col.sort.direction == asc ? \'ascending\' : ( col.sort.direction == desc ? \'descending\' : (!col.sort.direction ? \'none\' : \'other\'))}}"><div role="button" tabindex="0" ng-keydown="handleKeyDown($event)" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex" title="TOOLTIP"><span class="ui-grid-header-cell-label" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'">{{ col.displayName CUSTOM_FILTERS }}</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="{{getSortDirectionAriaLabel()}}"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="{{isSortPriorityVisible() ? i18n.headerCell.priority + \' \' + ( col.sort.priority + 1 )  : null}}" aria-hidden="true"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number">{{col.sort.priority + 1}}</sub></span></div><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-keydown="headerCellArrowKeyDown($event)" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><div ui-grid-filter ng-if="col.filterContainer === \'headerCell\'"></div></div>'),e.put("ui-grid/uiGridMenu",'<div class="ui-grid-menu" ng-show="shown"><style ui-grid-style>{{dynamicStyles}}</style><div class="ui-grid-menu-mid" ng-show="shownMid"><div class="ui-grid-menu-inner" ng-if="shown"><ul role="menu" class="ui-grid-menu-items"><li ng-repeat="item in menuItems" role="menuitem" ui-grid-menu-item ui-grid-one-bind-id="\'menuitem-\'+$index" action="item.action" name="item.title" active="item.active" icon="item.icon" shown="item.shown" context="item.context" template-url="item.templateUrl" leave-open="item.leaveOpen" screen-reader-only="item.screenReaderOnly"></li><li ng-if="col.filterable && col.filterContainer === \'columnMenu\'"><div ui-grid-filter></div></li></ul></div></div></div>'),e.put("ui-grid/uiGridMenuItem",'<button type="button" class="ui-grid-menu-item" ng-click="itemAction($event, title)" ng-show="itemShown()" ng-class="{ \'ui-grid-menu-item-active\': active(), \'ui-grid-sr-only\': (!focus && screenReaderOnly) }" aria-pressed="{{active()}}" tabindex="0" ng-focus="focus=true" ng-blur="focus=false"><i ng-class="icon" aria-hidden="true">&nbsp; </i>{{ label() }}</button>'),e.put("ui-grid/uiGridRenderContainer","<div role=\"presentation\" ui-grid-one-bind-id-grid=\"containerId + '-grid-container'\" class=\"ui-grid-render-container\" ng-style=\"{ 'margin-left': colContainer.getMargin('left') + 'px', 'margin-right': colContainer.getMargin('right') + 'px' }\">\x3c!-- All of these dom elements are replaced in place --\x3e<div ui-grid-header></div><div ui-grid-viewport></div><div ng-if=\"colContainer.needsHScrollbarPlaceholder()\" class=\"ui-grid-scrollbar-placeholder\" ng-style=\"{height: colContainer.grid.scrollbarHeight + 'px'}\"></div><ui-grid-footer ng-if=\"grid.options.showColumnFooter\"></ui-grid-footer></div>"),e.put("ui-grid/uiGridViewport",'<div role="rowgroup" class="ui-grid-viewport" ng-style="colContainer.getViewportStyle()">\x3c!-- tbody --\x3e<div class="ui-grid-canvas"><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by $index" class="ui-grid-row" ng-style="Viewport.rowStyle(rowRenderIndex)"><div role="row" ui-grid-row="row" row-render-index="rowRenderIndex"></div></div></div></div>'),e.put("ui-grid/cellEditor",'<div><form name="inputForm"><input type="INPUT_TYPE" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD"></form></div>'),e.put("ui-grid/dropdownEditor",'<div><form name="inputForm"><select ng-class="\'colt\' + col.uid" ui-grid-edit-dropdown ng-model="MODEL_COL_FIELD" ng-options="field[editDropdownIdLabel] as field[editDropdownValueLabel] CUSTOM_FILTERS for field in editDropdownOptionsArray"></select></form></div>'),e.put("ui-grid/fileChooserEditor",'<div><form name="inputForm"><input ng-class="\'colt\' + col.uid" ui-grid-edit-file-chooser type="file" id="files" name="files[]" ng-model="MODEL_COL_FIELD"></form></div>'),e.put("ui-grid/emptyBaseLayerContainer",'<div class="ui-grid-empty-base-layer-container ui-grid-canvas"><div class="ui-grid-row" ng-repeat="(rowRenderIndex, row) in grid.baseLayer.emptyRows track by $index" ng-style="Viewport.rowStyle(rowRenderIndex)"><div><div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell {{ col.getColClass(false) }}"></div></div></div></div></div>'),e.put("ui-grid/expandableRow",'<div ui-grid-expandable-row ng-if="expandableRow.shouldRenderExpand()" class="expandableRow" style="float:left; margin-top: 1px; margin-bottom: 1px" ng-style="{width: (grid.renderContainers.body.getCanvasWidth()) + \'px\', height: row.expandedRowHeight + \'px\'}"></div>'),e.put("ui-grid/expandableRowHeader",'<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><i class="clickable" ng-if="!(row.groupHeader==true || row.entity.subGridOptions.disableRowExpandable)" ng-class="{ \'ui-grid-icon-plus-squared\' : !row.isExpanded, \'ui-grid-icon-minus-squared\' : row.isExpanded }" ng-click="grid.api.expandable.toggleRowExpansion(row.entity, $event)"></i></div></div>'),e.put("ui-grid/expandableScrollFiller","<div ng-if=\"expandableRow.shouldRenderFiller()\" ng-class=\"{scrollFiller: true, scrollFillerClass:(colContainer.name === 'body')}\" ng-style=\"{ width: (grid.getViewportWidth()) + 'px', height: row.expandedRowHeight + 2 + 'px', 'margin-left': grid.options.rowHeader.rowHeaderWidth + 'px' }\">&nbsp;</div>"),e.put("ui-grid/expandableTopRowHeader",'<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><span class="ui-grid-cell-empty" ng-if="!grid.options.showExpandAllButton"></span> <button type="button" class="ui-grid-icon-button clickable" ng-if="grid.options.showExpandAllButton" ng-class="{ \'ui-grid-icon-plus-squared\' : !grid.expandable.expandedAll, \'ui-grid-icon-minus-squared\' : grid.expandable.expandedAll }" ng-click="grid.api.expandable.toggleAllRows()"></button></div></div>'),e.put("ui-grid/csvLink",'<span class="ui-grid-exporter-csv-link-span"><a href="data:text/csv;charset=UTF-8,CSV_CONTENT" download="FILE_NAME">LINK_LABEL</a></span>'),e.put("ui-grid/importerMenuItem",'<li class="ui-grid-menu-item"><form><input class="ui-grid-importer-file-chooser" type="file" id="files" name="files[]"></form></li>'),e.put("ui-grid/importerMenuItemContainer","<div ui-grid-importer-menu-item></div>"),e.put("ui-grid/pagination",'<div class="ui-grid-pager-panel" ui-grid-pager ng-show="grid.options.enablePaginationControls"><div role="navigation" class="ui-grid-pager-container"><div class="ui-grid-pager-control"><button type="button" class="ui-grid-pager-first" ui-grid-one-bind-title="aria.pageToFirst" ui-grid-one-bind-aria-label="aria.pageToFirst" ng-click="pageFirstPageClick()" ng-disabled="cantPageBackward()"><div ng-class="grid.isRTL() ? \'last-triangle\' : \'first-triangle\'"><div ng-class="grid.isRTL() ? \'last-bar-rtl\' : \'first-bar\'"></div></div></button> <button type="button" class="ui-grid-pager-previous" ui-grid-one-bind-title="aria.pageBack" ui-grid-one-bind-aria-label="aria.pageBack" ng-click="pagePreviousPageClick()" ng-disabled="cantPageBackward()"><div ng-class="grid.isRTL() ? \'last-triangle prev-triangle\' : \'first-triangle prev-triangle\'"></div></button> <input type="number" ui-grid-one-bind-title="aria.pageSelected" ui-grid-one-bind-aria-label="aria.pageSelected" class="ui-grid-pager-control-input" ng-model="grid.options.paginationCurrentPage" min="1" max="{{ paginationApi.getTotalPages() }}" step="1" required> <span class="ui-grid-pager-max-pages-number" ng-show="paginationApi.getTotalPages() > 0"><abbr ui-grid-one-bind-title="paginationOf">/ </abbr>{{ paginationApi.getTotalPages() }} </span><button type="button" class="ui-grid-pager-next" ui-grid-one-bind-title="aria.pageForward" ui-grid-one-bind-aria-label="aria.pageForward" ng-click="pageNextPageClick()" ng-disabled="cantPageForward()"><div ng-class="grid.isRTL() ? \'first-triangle next-triangle\' : \'last-triangle next-triangle\'"></div></button> <button type="button" class="ui-grid-pager-last" ui-grid-one-bind-title="aria.pageToLast" ui-grid-one-bind-aria-label="aria.pageToLast" ng-click="pageLastPageClick()" ng-disabled="cantPageToLast()"><div ng-class="grid.isRTL() ? \'first-triangle\' : \'last-triangle\'"><div ng-class="grid.isRTL() ? \'first-bar-rtl\' : \'last-bar\'"></div></div></button></div><div class="ui-grid-pager-row-count-picker" ng-if="grid.options.paginationPageSizes.length > 1 && !grid.options.useCustomPagination"><select ui-grid-one-bind-aria-labelledby-grid="\'items-per-page-label\'" ng-model="grid.options.paginationPageSize" ng-options="o as o for o in grid.options.paginationPageSizes"></select><span ui-grid-one-bind-id-grid="\'items-per-page-label\'" class="ui-grid-pager-row-count-label">&nbsp;{{sizesLabel}}</span></div><span ng-if="grid.options.paginationPageSizes.length <= 1" class="ui-grid-pager-row-count-label">{{grid.options.paginationPageSize}}&nbsp;{{sizesLabel}}</span></div><div class="ui-grid-pager-count-container"><div class="ui-grid-pager-count"><span ng-show="grid.options.totalItems > 0">{{ 1 + paginationApi.getFirstRowIndex() }} <abbr ui-grid-one-bind-title="paginationThrough">- </abbr>{{ 1 + paginationApi.getLastRowIndex() }} {{paginationOf}} {{grid.options.totalItems}} {{totalItemsLabel}}</span></div></div></div>'),e.put("ui-grid/columnResizer",'<div ui-grid-column-resizer ng-if="grid.options.enableColumnResizing" class="ui-grid-column-resizer" col="col" position="right" render-index="renderIndex" unselectable="on"></div>'),e.put("ui-grid/gridFooterSelectedItems",'<span ng-if="grid.selection.selectedCount !== 0 && grid.options.enableFooterTotalSelected">({{"search.selectedItems" | t}} {{grid.selection.selectedCount}})</span>'),e.put("ui-grid/selectionHeaderCell",'<div>\x3c!-- <div class="ui-grid-vertical-bar">&nbsp;</div> --\x3e<div class="ui-grid-cell-contents" col-index="renderIndex"><ui-grid-selection-select-all-buttons ng-if="grid.options.enableSelectAll" role="checkbox" ng-model="grid.selection.selectAll"></ui-grid-selection-select-all-buttons></div></div>'),e.put("ui-grid/selectionRowHeader",'<div class="ui-grid-cell-contents ui-grid-disable-selection clickable"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div>'),e.put("ui-grid/selectionRowHeaderButtons",'<div class="ui-grid-selection-row-header-buttons ui-grid-icon-ok clickable" ng-class="{\'ui-grid-row-selected\': row.isSelected}" ng-click="selectButtonClick(row, $event)" ng-keydown="selectButtonKeyDown(row, $event)" role="checkbox" ng-model="row.isSelected">&nbsp;</div>'),e.put("ui-grid/selectionSelectAllButtons",'<div role="button" class="ui-grid-selection-row-header-buttons ui-grid-icon-ok" ng-class="{\'ui-grid-all-selected\': grid.selection.selectAll}" ng-click="headerButtonClick($event)" ng-keydown="headerButtonKeyDown($event)"></div>'),e.put("ui-grid/treeBaseExpandAllButtons",'<div class="ui-grid-tree-base-row-header-buttons" ng-class="headerButtonClass()" ng-click="headerButtonClick($event)"></div>'),e.put("ui-grid/treeBaseHeaderCell",'<div><div class="ui-grid-cell-contents" col-index="renderIndex"><ui-grid-tree-base-expand-all-buttons ng-if="grid.options.enableExpandAll"></ui-grid-tree-base-expand-all-buttons></div></div>'),e.put("ui-grid/treeBaseRowHeader",'<div class="ui-grid-cell-contents"><ui-grid-tree-base-row-header-buttons></ui-grid-tree-base-row-header-buttons></div>'),e.put("ui-grid/treeBaseRowHeaderButtons",'<div class="ui-grid-tree-base-row-header-buttons" ng-class="{\'ui-grid-tree-base-header\': row.treeLevel > -1 }" ng-click="treeButtonClick(row, $event)"><i ng-class="treeButtonClass(row)" ng-style="{\'padding-left\': grid.options.treeIndent * row.treeLevel + \'px\'}"></i> &nbsp;</div>'),e.put("ui-grid/cellTitleValidator",'<div class="ui-grid-cell-contents" ng-class="{invalid:grid.validate.isInvalid(row.entity,col.colDef)}" title="{{grid.validate.getTitleFormattedErrors(row.entity,col.colDef)}}">{{COL_FIELD CUSTOM_FILTERS}}</div>'),e.put("ui-grid/cellTooltipValidator",'<div class="ui-grid-cell-contents" ng-class="{invalid:grid.validate.isInvalid(row.entity,col.colDef)}" tooltip-html-unsafe="{{grid.validate.getFormattedErrors(row.entity,col.colDef)}}" tooltip-enable="grid.validate.isInvalid(row.entity,col.colDef)" tooltip-append-to-body="true" tooltip-placement="top" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>')}]);
/*!
 * ui-grid - v4.8.0 - 2019-05-02
 * Copyright (c) 2019 ; License: MIT 
 */


!function(){"use strict";var i=angular.module("ui.grid.pagination",["ng","ui.grid"]);i.service("uiGridPaginationService",["gridUtil",function(a){var i={initializeGrid:function(o){i.defaultGridOptions(o.options);var g={events:{pagination:{paginationChanged:function(i,a){}}},methods:{pagination:{getPage:function(){return o.options.enablePagination?o.options.paginationCurrentPage:null},getFirstRowIndex:function(){return o.options.useCustomPagination?o.options.paginationPageSizes.reduce(function(i,a,n){return n<o.options.paginationCurrentPage-1?i+a:i},0):(o.options.paginationCurrentPage-1)*o.options.paginationPageSize},getLastRowIndex:function(){return o.options.useCustomPagination?g.methods.pagination.getFirstRowIndex()+o.options.paginationPageSizes[o.options.paginationCurrentPage-1]-1:Math.min(o.options.paginationCurrentPage*o.options.paginationPageSize,o.options.totalItems)-1},getTotalPages:function(){return o.options.enablePagination?o.options.useCustomPagination?o.options.paginationPageSizes.length:0===o.options.totalItems?1:Math.ceil(o.options.totalItems/o.options.paginationPageSize):null},nextPage:function(){o.options.enablePagination&&(0<o.options.totalItems?o.options.paginationCurrentPage=Math.min(o.options.paginationCurrentPage+1,g.methods.pagination.getTotalPages()):o.options.paginationCurrentPage++)},previousPage:function(){o.options.enablePagination&&(o.options.paginationCurrentPage=Math.max(o.options.paginationCurrentPage-1,1))},seek:function(i){if(o.options.enablePagination){if(!angular.isNumber(i)||i<1)throw"Invalid page number: "+i;o.options.paginationCurrentPage=Math.min(i,g.methods.pagination.getTotalPages())}}}}};o.api.registerEventsFromObject(g.events),o.api.registerMethodsFromObject(g.methods);o.registerRowsProcessor(function(i){if(o.options.useExternalPagination||!o.options.enablePagination)return i;var a=parseInt(o.options.paginationPageSize,10),n=(parseInt(o.options.paginationCurrentPage,10),i.filter(function(i){return i.visible}));o.options.totalItems=n.length;var t=g.methods.pagination.getFirstRowIndex(),e=g.methods.pagination.getLastRowIndex();return t>n.length&&(t=((o.options.paginationCurrentPage=1)-1)*a),n.slice(t,e+1)},900)},defaultGridOptions:function(i){i.enablePagination=!1!==i.enablePagination,i.enablePaginationControls=!1!==i.enablePaginationControls,i.useExternalPagination=!0===i.useExternalPagination,i.useCustomPagination=!0===i.useCustomPagination,a.isNullOrUndefined(i.totalItems)&&(i.totalItems=0),a.isNullOrUndefined(i.paginationPageSizes)&&(i.paginationPageSizes=[250,500,1e3]),a.isNullOrUndefined(i.paginationPageSize)&&(0<i.paginationPageSizes.length?i.paginationPageSize=i.paginationPageSizes[0]:i.paginationPageSize=0),a.isNullOrUndefined(i.paginationCurrentPage)&&(i.paginationCurrentPage=1),a.isNullOrUndefined(i.paginationTemplate)&&(i.paginationTemplate="ui-grid/pagination")},onPaginationChanged:function(i,a,n){i.api.pagination.raise.paginationChanged(a,n),i.options.useExternalPagination||i.queueGridRefresh()}};return i}]),i.directive("uiGridPagination",["gridUtil","uiGridPaginationService",function(e,o){return{priority:-200,scope:!1,require:"uiGrid",link:{pre:function(i,n,a,t){o.initializeGrid(t.grid),e.getTemplate(t.grid.options.paginationTemplate).then(function(i){var a=angular.element(i);n.append(a),t.innerCompile(a)})}}}}]),i.directive("uiGridPager",["uiGridPaginationService","uiGridConstants","gridUtil","i18nService","i18nConstants",function(p,l,u,d,c){return{priority:-200,scope:!0,require:"^uiGrid",link:function(n,a,i,t){n.aria=d.getSafeText("pagination.aria");var e=function(){n.paginationApi=t.grid.api.pagination,n.sizesLabel=d.getSafeText("pagination.sizes"),n.totalItemsLabel=d.getSafeText("pagination.totalItems"),n.paginationOf=d.getSafeText("pagination.of"),n.paginationThrough=d.getSafeText("pagination.through")};e(),n.$on(c.UPDATE_EVENT,e);var o=t.grid.options;t.grid.renderContainers.body.registerViewportAdjuster(function(i){return o.enablePaginationControls&&(i.height=i.height-u.elementHeight(a,"padding")),i});var g=t.grid.registerDataChangeCallback(function(i){i.options.useExternalPagination||(i.options.totalItems=i.rows.length)},[l.dataChange.ROW]);n.$on("$destroy",g);var r=n.$watch("grid.options.paginationCurrentPage + grid.options.paginationPageSize",function(i,a){i!==a&&void 0!==a&&(!angular.isNumber(o.paginationCurrentPage)||o.paginationCurrentPage<1?o.paginationCurrentPage=1:0<o.totalItems&&o.paginationCurrentPage>n.paginationApi.getTotalPages()?o.paginationCurrentPage=n.paginationApi.getTotalPages():p.onPaginationChanged(n.grid,o.paginationCurrentPage,o.paginationPageSize))});n.$on("$destroy",function(){r()}),n.cantPageForward=function(){return n.paginationApi.getTotalPages()?n.cantPageToLast():o.data.length<1},n.cantPageToLast=function(){var i=n.paginationApi.getTotalPages();return!i||o.paginationCurrentPage>=i},n.cantPageBackward=function(){return o.paginationCurrentPage<=1};var s=function(i){i&&u.focus.bySelector(a,".ui-grid-pager-control-input")};n.pageFirstPageClick=function(){n.paginationApi.seek(1),s(n.cantPageBackward())},n.pagePreviousPageClick=function(){n.paginationApi.previousPage(),s(n.cantPageBackward())},n.pageNextPageClick=function(){n.paginationApi.nextPage(),s(n.cantPageForward())},n.pageLastPageClick=function(){n.paginationApi.seek(n.paginationApi.getTotalPages()),s(n.cantPageToLast())}}}}])}(),angular.module("ui.grid.pagination").run(["$templateCache",function(i){"use strict";i.put("ui-grid/pagination",'<div class="ui-grid-pager-panel" ui-grid-pager ng-show="grid.options.enablePaginationControls"><div role="navigation" class="ui-grid-pager-container"><div class="ui-grid-pager-control"><button type="button" class="ui-grid-pager-first" ui-grid-one-bind-title="aria.pageToFirst" ui-grid-one-bind-aria-label="aria.pageToFirst" ng-click="pageFirstPageClick()" ng-disabled="cantPageBackward()"><div ng-class="grid.isRTL() ? \'last-triangle\' : \'first-triangle\'"><div ng-class="grid.isRTL() ? \'last-bar-rtl\' : \'first-bar\'"></div></div></button> <button type="button" class="ui-grid-pager-previous" ui-grid-one-bind-title="aria.pageBack" ui-grid-one-bind-aria-label="aria.pageBack" ng-click="pagePreviousPageClick()" ng-disabled="cantPageBackward()"><div ng-class="grid.isRTL() ? \'last-triangle prev-triangle\' : \'first-triangle prev-triangle\'"></div></button> <input type="number" ui-grid-one-bind-title="aria.pageSelected" ui-grid-one-bind-aria-label="aria.pageSelected" class="ui-grid-pager-control-input" ng-model="grid.options.paginationCurrentPage" min="1" max="{{ paginationApi.getTotalPages() }}" step="1" required> <span class="ui-grid-pager-max-pages-number" ng-show="paginationApi.getTotalPages() > 0"><abbr ui-grid-one-bind-title="paginationOf">/ </abbr>{{ paginationApi.getTotalPages() }} </span><button type="button" class="ui-grid-pager-next" ui-grid-one-bind-title="aria.pageForward" ui-grid-one-bind-aria-label="aria.pageForward" ng-click="pageNextPageClick()" ng-disabled="cantPageForward()"><div ng-class="grid.isRTL() ? \'first-triangle next-triangle\' : \'last-triangle next-triangle\'"></div></button> <button type="button" class="ui-grid-pager-last" ui-grid-one-bind-title="aria.pageToLast" ui-grid-one-bind-aria-label="aria.pageToLast" ng-click="pageLastPageClick()" ng-disabled="cantPageToLast()"><div ng-class="grid.isRTL() ? \'first-triangle\' : \'last-triangle\'"><div ng-class="grid.isRTL() ? \'first-bar-rtl\' : \'last-bar\'"></div></div></button></div><div class="ui-grid-pager-row-count-picker" ng-if="grid.options.paginationPageSizes.length > 1 && !grid.options.useCustomPagination"><select ui-grid-one-bind-aria-labelledby-grid="\'items-per-page-label\'" ng-model="grid.options.paginationPageSize" ng-options="o as o for o in grid.options.paginationPageSizes"></select><span ui-grid-one-bind-id-grid="\'items-per-page-label\'" class="ui-grid-pager-row-count-label">&nbsp;{{sizesLabel}}</span></div><span ng-if="grid.options.paginationPageSizes.length <= 1" class="ui-grid-pager-row-count-label">{{grid.options.paginationPageSize}}&nbsp;{{sizesLabel}}</span></div><div class="ui-grid-pager-count-container"><div class="ui-grid-pager-count"><span ng-show="grid.options.totalItems > 0">{{ 1 + paginationApi.getFirstRowIndex() }} <abbr ui-grid-one-bind-title="paginationThrough">- </abbr>{{ 1 + paginationApi.getLastRowIndex() }} {{paginationOf}} {{grid.options.totalItems}} {{totalItemsLabel}}</span></div></div></div>')}]);
/*!
 * ui-grid - v4.8.0 - 2019-05-02
 * Copyright (c) 2019 ; License: MIT 
 */


!function(){"use strict";var e=angular.module("ui.grid.selection",["ui.grid"]);e.constant("uiGridSelectionConstants",{featureName:"selection",selectionRowHeaderColName:"selectionRowHeaderCol"}),angular.module("ui.grid").config(["$provide",function(e){e.decorator("GridRow",["$delegate",function(e){return e.prototype.setSelected=function(e){e!==this.isSelected&&(this.isSelected=e,this.grid.selection.selectedCount+=e?1:-1)},e.prototype.setFocused=function(e){e!==this.isFocused&&(this.grid.selection.focusedRow&&(this.grid.selection.focusedRow.isFocused=!1),this.grid.selection.focusedRow=e?this:null,this.isFocused=e)},e}])}]),e.service("uiGridSelectionService",function(){var a={initializeGrid:function(o){o.selection={lastSelectedRow:null,focusedRow:null,selectAll:!1},o.selection.selectedCount=0,a.defaultGridOptions(o.options);var e={events:{selection:{rowFocusChanged:function(e,t,i){},rowSelectionChanged:function(e,t,i){},rowSelectionChangedBatch:function(e,t,i){}}},methods:{selection:{toggleRowSelection:function(e,t){var i=o.getRow(e);null!==i&&a.toggleRowSelection(o,i,t,o.options.multiSelect,o.options.noUnselect)},selectRow:function(e,t){var i=o.getRow(e);null===i||i.isSelected||a.toggleRowSelection(o,i,t,o.options.multiSelect,o.options.noUnselect)},selectRowByVisibleIndex:function(e,t){var i=o.renderContainers.body.visibleRowCache[e];null==i||i.isSelected||a.toggleRowSelection(o,i,t,o.options.multiSelect,o.options.noUnselect)},unSelectRow:function(e,t){var i=o.getRow(e);null!==i&&i.isSelected&&a.toggleRowSelection(o,i,t,o.options.multiSelect,o.options.noUnselect)},unSelectRowByVisibleIndex:function(e,t){var i=o.renderContainers.body.visibleRowCache[e];null!=i&&i.isSelected&&a.toggleRowSelection(o,i,t,o.options.multiSelect,o.options.noUnselect)},selectAllRows:function(t){if(!1!==o.options.multiSelect){var i=[];o.rows.forEach(function(e){e.isSelected||!1===e.enableSelection||!1===o.options.isRowSelectable(e)||(e.setSelected(!0),a.decideRaiseSelectionEvent(o,e,i,t))}),o.selection.selectAll=!0,a.decideRaiseSelectionBatchEvent(o,i,t)}},selectAllVisibleRows:function(t){if(!1!==o.options.multiSelect){var i=[];o.rows.forEach(function(e){e.visible?e.isSelected||!1===e.enableSelection||!1===o.options.isRowSelectable(e)||(e.setSelected(!0),a.decideRaiseSelectionEvent(o,e,i,t)):e.isSelected&&(e.setSelected(!1),a.decideRaiseSelectionEvent(o,e,i,t))}),o.selection.selectAll=!0,a.decideRaiseSelectionBatchEvent(o,i,t)}},clearSelectedRows:function(e){a.clearSelectedRows(o,e)},getSelectedRows:function(){return a.getSelectedRows(o).map(function(e){return e.entity}).filter(function(e){return e.hasOwnProperty("$$hashKey")||!angular.isObject(e)})},getSelectedGridRows:function(){return a.getSelectedRows(o)},getSelectedCount:function(){return o.selection.selectedCount},setMultiSelect:function(e){o.options.multiSelect=e},setModifierKeysToMultiSelect:function(e){o.options.modifierKeysToMultiSelect=e},getSelectAllState:function(){return o.selection.selectAll}}}};o.api.registerEventsFromObject(e.events),o.api.registerMethodsFromObject(e.methods)},defaultGridOptions:function(e){e.enableRowSelection=!1!==e.enableRowSelection,e.multiSelect=!1!==e.multiSelect,e.noUnselect=!0===e.noUnselect,e.modifierKeysToMultiSelect=!0===e.modifierKeysToMultiSelect,e.enableRowHeaderSelection=!1!==e.enableRowHeaderSelection,void 0===e.enableFullRowSelection&&(e.enableFullRowSelection=!e.enableRowHeaderSelection),e.enableFocusRowOnRowHeaderClick=!1!==e.enableFocusRowOnRowHeaderClick||!e.enableRowHeaderSelection,e.enableSelectRowOnFocus=!1!==e.enableSelectRowOnFocus,e.enableSelectAll=!1!==e.enableSelectAll,e.enableSelectionBatchEvent=!1!==e.enableSelectionBatchEvent,e.selectionRowHeaderWidth=angular.isDefined(e.selectionRowHeaderWidth)?e.selectionRowHeaderWidth:30,e.enableFooterTotalSelected=!1!==e.enableFooterTotalSelected,e.isRowSelectable=angular.isDefined(e.isRowSelectable)?e.isRowSelectable:angular.noop},toggleRowSelection:function(e,t,i,o,n){if(!1!==t.enableSelection){var l,c=t.isSelected;o||(c?1<(l=a.getSelectedRows(e)).length&&(c=!1,a.clearSelectedRows(e,i)):a.clearSelectedRows(e,i)),c&&n||(t.setSelected(!c),!0===t.isSelected&&(e.selection.lastSelectedRow=t),l=a.getSelectedRows(e),e.selection.selectAll=e.rows.length===l.length,e.api.selection.raise.rowSelectionChanged(t,i))}},shiftSelect:function(e,t,i,o){if(o){var n=0<a.getSelectedRows(e).length?e.renderContainers.body.visibleRowCache.indexOf(e.selection.lastSelectedRow):0,l=e.renderContainers.body.visibleRowCache.indexOf(t);if(l<n){var c=n;n=l,l=c}for(var s=[],r=n;r<=l;r++){var d=e.renderContainers.body.visibleRowCache[r];d&&(d.isSelected||!1===d.enableSelection||(d.setSelected(!0),e.selection.lastSelectedRow=d,a.decideRaiseSelectionEvent(e,d,s,i)))}a.decideRaiseSelectionBatchEvent(e,s,i)}},getSelectedRows:function(e){return e.rows.filter(function(e){return e.isSelected})},clearSelectedRows:function(t,i){var o=[];a.getSelectedRows(t).forEach(function(e){e.isSelected&&(e.setSelected(!1),a.decideRaiseSelectionEvent(t,e,o,i))}),t.selection.selectAll=!1,t.selection.selectedCount=0,a.decideRaiseSelectionBatchEvent(t,o,i)},decideRaiseSelectionEvent:function(e,t,i,o){e.options.enableSelectionBatchEvent?i.push(t):e.api.selection.raise.rowSelectionChanged(t,o)},decideRaiseSelectionBatchEvent:function(e,t,i){0<t.length&&e.api.selection.raise.rowSelectionChangedBatch(t,i)}};return a}),e.directive("uiGridSelection",["uiGridSelectionConstants","uiGridSelectionService","uiGridConstants",function(d,a,u){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,t,i,o){if(a.initializeGrid(o.grid),o.grid.options.enableRowHeaderSelection){var n={name:d.selectionRowHeaderColName,displayName:"",width:o.grid.options.selectionRowHeaderWidth,minWidth:10,cellTemplate:"ui-grid/selectionRowHeader",headerCellTemplate:"ui-grid/selectionHeaderCell",enableColumnResizing:!1,enableColumnMenu:!1,exporterSuppressExport:!0,allowCellFocus:!0};o.grid.addRowHeaderColumn(n,0)}var l=!1,c=function(e){return e.forEach(function(e){e.enableSelection=o.grid.options.isRowSelectable(e)}),e},s=function(){o.grid.options.isRowSelectable!==angular.noop&&!0!==l&&(o.grid.registerRowsProcessor(c,500),l=!0)};s();var r=o.grid.registerDataChangeCallback(s,[u.dataChange.OPTIONS]);e.$on("$destroy",r)},post:function(e,t,i,o){}}}}}]),e.directive("uiGridSelectionRowHeaderButtons",["$templateCache","uiGridSelectionService","gridUtil",function(e,c,s){return{replace:!0,restrict:"E",template:e.get("ui-grid/selectionRowHeaderButtons"),scope:!0,require:"^uiGrid",link:function(e,t,i,o){var n=o.grid;function l(e,t){if(t.stopPropagation(),t.shiftKey)c.shiftSelect(n,e,t,n.options.multiSelect);else if(t.ctrlKey||t.metaKey)c.toggleRowSelection(n,e,t,n.options.multiSelect,n.options.noUnselect);else if(e.groupHeader){c.toggleRowSelection(n,e,t,n.options.multiSelect,n.options.noUnselect);for(var i=0;i<e.treeNode.children.length;i++)c.toggleRowSelection(n,e.treeNode.children[i].row,t,n.options.multiSelect,n.options.noUnselect)}else c.toggleRowSelection(n,e,t,n.options.multiSelect&&!n.options.modifierKeysToMultiSelect,n.options.noUnselect);n.options.enableFocusRowOnRowHeaderClick&&e.setFocused(!e.isFocused)&&n.api.selection.raise.rowFocusChanged(e,t)}e.selectButtonClick=l,e.selectButtonKeyDown=function(e,t){32===t.keyCode&&(t.preventDefault(),l(e,t))},"ie"===s.detectBrowser()&&t.on("mousedown",function(e){(e.ctrlKey||e.shiftKey)&&(e.target.onselectstart=function(){return!1},window.setTimeout(function(){e.target.onselectstart=null},0))}),e.$on("$destroy",function(){t.off()})}}}]),e.directive("uiGridSelectionSelectAllButtons",["$templateCache","uiGridSelectionService",function(e,o){return{replace:!0,restrict:"E",template:e.get("ui-grid/selectionSelectAllButtons"),scope:!1,link:function(t){var i=t.col.grid;t.headerButtonKeyDown=function(e){32!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),t.headerButtonClick(e))},t.headerButtonClick=function(e){i.selection.selectAll?(o.clearSelectedRows(i,e),i.options.noUnselect&&i.api.selection.selectRowByVisibleIndex(0,e),i.selection.selectAll=!1):i.options.multiSelect&&(i.api.selection.selectAllVisibleRows(e),i.selection.selectAll=!0)}}}}]),e.directive("uiGridViewport",function(){return{priority:-200,scope:!1,compile:function(e){var t=angular.element(e[0].querySelector(".ui-grid-canvas:not(.ui-grid-empty-base-layer-container)").children[0]),i="'ui-grid-row-selected': row.isSelected, 'ui-grid-row-focused': row.isFocused}",o=t.attr("ng-class");return i=o?o.slice(0,-1)+","+i:"{"+i,t.attr("ng-class",i),{pre:function(e,t,i,o){},post:function(e,t,i,o){}}}}}),e.directive("uiGridCell",["uiGridConstants","uiGridSelectionService",function(u,g){return{priority:-200,restrict:"A",require:"?^uiGrid",scope:!1,link:function(i,c,e,t){var s=0,r={};t.grid.api.cellNav&&t.grid.api.cellNav.on.viewPortKeyDown(i,function(e,t){null!==t&&t.row===i.row&&t.col===i.col&&e.keyCode===u.keymap.SPACE&&"selectionRowHeaderCol"===i.col.colDef.name&&(e.preventDefault(),g.toggleRowSelection(i.grid,i.row,e,i.grid.options.multiSelect&&!i.grid.options.modifierKeysToMultiSelect,i.grid.options.noUnselect),i.$apply())});var d=function(e){"ui-grid-icon-minus-squared"!==e.target.className&&"ui-grid-icon-plus-squared"!==e.target.className&&(c.off("touchend",n),e.shiftKey?g.shiftSelect(i.grid,i.row,e,i.grid.options.multiSelect):e.ctrlKey||e.metaKey?g.toggleRowSelection(i.grid,i.row,e,i.grid.options.multiSelect,i.grid.options.noUnselect):i.grid.options.enableSelectRowOnFocus&&g.toggleRowSelection(i.grid,i.row,e,i.grid.options.multiSelect&&!i.grid.options.modifierKeysToMultiSelect,i.grid.options.noUnselect),i.row.setFocused(!i.row.isFocused),i.grid.api.selection.raise.rowFocusChanged(i.row,e),i.$apply(),window.setTimeout(function(){c.on("touchend",n)},300))},o=function(e){s=(new Date).getTime(),r=e.changedTouches[0],c.off("click",d)},n=function(e){var t=(new Date).getTime(),i=e.changedTouches[0],o=t-s,n=Math.abs(r.clientX-i.clientX),l=Math.abs(r.clientY-i.clientY);n<100&&l<100&&o<300&&d(e),window.setTimeout(function(){c.on("click",d)},300)};function l(){i.grid.options.enableRowSelection&&i.grid.options.enableFullRowSelection&&"selectionRowHeaderCol"!==i.col.colDef.name&&(c.addClass("ui-grid-disable-selection"),c.on("touchstart",o),c.on("touchend",n),c.on("click",d),i.registered=!0)}l();var a=i.grid.registerDataChangeCallback(function(){i.grid.options.enableRowSelection&&i.grid.options.enableFullRowSelection&&!i.registered?l():i.grid.options.enableRowSelection&&i.grid.options.enableFullRowSelection||!i.registered||i.registered&&(c.removeClass("ui-grid-disable-selection"),c.off("touchstart",o),c.off("touchend",n),c.off("click",d),i.registered=!1)},[u.dataChange.OPTIONS]);c.on("$destroy",a)}}}]),e.directive("uiGridGridFooter",["$compile","gridUtil",function(l,i){return{restrict:"EA",replace:!0,priority:-1e3,require:"^uiGrid",scope:!0,compile:function(){return{pre:function(o,n,e,t){t.grid.options.showGridFooter&&i.getTemplate("ui-grid/gridFooterSelectedItems").then(function(e){var t=angular.element(e),i=l(t)(o);angular.element(n[0].getElementsByClassName("ui-grid-grid-footer")[0]).append(i)})},post:function(e,t,i,o){}}}}}])}(),angular.module("ui.grid.selection").run(["$templateCache",function(e){"use strict";e.put("ui-grid/gridFooterSelectedItems",'<span ng-if="grid.selection.selectedCount !== 0 && grid.options.enableFooterTotalSelected">({{"search.selectedItems" | t}} {{grid.selection.selectedCount}})</span>'),e.put("ui-grid/selectionHeaderCell",'<div>\x3c!-- <div class="ui-grid-vertical-bar">&nbsp;</div> --\x3e<div class="ui-grid-cell-contents" col-index="renderIndex"><ui-grid-selection-select-all-buttons ng-if="grid.options.enableSelectAll" role="checkbox" ng-model="grid.selection.selectAll"></ui-grid-selection-select-all-buttons></div></div>'),e.put("ui-grid/selectionRowHeader",'<div class="ui-grid-cell-contents ui-grid-disable-selection clickable"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div>'),e.put("ui-grid/selectionRowHeaderButtons",'<div class="ui-grid-selection-row-header-buttons ui-grid-icon-ok clickable" ng-class="{\'ui-grid-row-selected\': row.isSelected}" ng-click="selectButtonClick(row, $event)" ng-keydown="selectButtonKeyDown(row, $event)" role="checkbox" ng-model="row.isSelected">&nbsp;</div>'),e.put("ui-grid/selectionSelectAllButtons",'<div role="button" class="ui-grid-selection-row-header-buttons ui-grid-icon-ok" ng-class="{\'ui-grid-all-selected\': grid.selection.selectAll}" ng-click="headerButtonClick($event)" ng-keydown="headerButtonKeyDown($event)"></div>')}]);
/*!
 * ui-grid - v4.8.0 - 2019-05-02
 * Copyright (c) 2019 ; License: MIT 
 */


!function(){"use strict";var e=angular.module("ui.grid.treeBase",["ui.grid"]);e.constant("uiGridTreeBaseConstants",{featureName:"treeBase",rowHeaderColName:"treeBaseRowHeaderCol",EXPANDED:"expanded",COLLAPSED:"collapsed",aggregation:{COUNT:"count",SUM:"sum",MAX:"max",MIN:"min",AVG:"avg"}}),e.service("uiGridTreeBaseService",["$q","uiGridTreeBaseConstants","gridUtil","GridRow","gridClassFactory","i18nService","uiGridConstants","rowSorter",function(e,i,t,r,n,o,a,l){var g={initializeGrid:function(r){r.treeBase={},r.treeBase.numberLevels=0,r.treeBase.expandAll=!1,r.treeBase.tree=[],g.defaultGridOptions(r.options),r.registerRowsProcessor(g.treeRows,410),r.registerColumnBuilder(g.treeBaseColumnBuilder),g.createRowHeader(r);var e={events:{treeBase:{rowExpanded:{},rowCollapsed:{}}},methods:{treeBase:{expandAllRows:function(){g.expandAllRows(r)},collapseAllRows:function(){g.collapseAllRows(r)},toggleRowTreeState:function(e){g.toggleRowTreeState(r,e)},expandRow:function(e,t){g.expandRow(r,e,t)},expandRowChildren:function(e){g.expandRowChildren(r,e)},collapseRow:function(e){g.collapseRow(r,e)},collapseRowChildren:function(e){g.collapseRowChildren(r,e)},getTreeExpandedState:function(){return{expandedState:g.getTreeState(r)}},setTreeState:function(e){g.setTreeState(r,e)},getRowChildren:function(e){return e.treeNode.children.map(function(e){return e.row})}}}};r.api.registerEventsFromObject(e.events),r.api.registerMethodsFromObject(e.methods)},defaultGridOptions:function(e){e.treeRowHeaderBaseWidth=e.treeRowHeaderBaseWidth||30,e.treeIndent=null!=e.treeIndent?e.treeIndent:10,e.showTreeRowHeader=!1!==e.showTreeRowHeader,e.showTreeExpandNoChildren=!1!==e.showTreeExpandNoChildren,e.treeRowHeaderAlwaysVisible=!1!==e.treeRowHeaderAlwaysVisible,e.treeCustomAggregations=e.treeCustomAggregations||{},e.enableExpandAll=!1!==e.enableExpandAll},treeBaseColumnBuilder:function(e,t,r){void 0!==e.customTreeAggregationFn&&(t.treeAggregationFn=e.customTreeAggregationFn),void 0!==e.treeAggregationType&&(t.treeAggregation={type:e.treeAggregationType},void 0!==r.treeCustomAggregations[e.treeAggregationType]?(t.treeAggregationFn=r.treeCustomAggregations[e.treeAggregationType].aggregationFn,t.treeAggregationFinalizerFn=r.treeCustomAggregations[e.treeAggregationType].finalizerFn,t.treeAggregation.label=r.treeCustomAggregations[e.treeAggregationType].label):void 0!==g.nativeAggregations()[e.treeAggregationType]&&(t.treeAggregationFn=g.nativeAggregations()[e.treeAggregationType].aggregationFn,t.treeAggregation.label=g.nativeAggregations()[e.treeAggregationType].label)),void 0!==e.treeAggregationLabel&&(void 0===t.treeAggregation&&(t.treeAggregation={}),t.treeAggregation.label=e.treeAggregationLabel),t.treeAggregationUpdateEntity=!1!==e.treeAggregationUpdateEntity,void 0===t.customTreeAggregationFinalizerFn&&(t.customTreeAggregationFinalizerFn=e.customTreeAggregationFinalizerFn)},createRowHeader:function(e){var t={name:i.rowHeaderColName,displayName:"",width:e.options.treeRowHeaderBaseWidth,minWidth:10,cellTemplate:"ui-grid/treeBaseRowHeader",headerCellTemplate:"ui-grid/treeBaseHeaderCell",enableColumnResizing:!1,enableColumnMenu:!1,exporterSuppressExport:!0,allowCellFocus:!0};t.visible=e.options.treeRowHeaderAlwaysVisible,e.addRowHeaderColumn(t,-100)},expandAllRows:function(t){t.treeBase.tree.forEach(function(e){g.setAllNodes(t,e,i.EXPANDED)}),t.treeBase.expandAll=!0,t.queueGridRefresh()},collapseAllRows:function(t){t.treeBase.tree.forEach(function(e){g.setAllNodes(t,e,i.COLLAPSED)}),t.treeBase.expandAll=!1,t.queueGridRefresh()},setAllNodes:function(t,e,r){void 0!==e.state&&e.state!==r&&((e.state=r)===i.EXPANDED?t.api.treeBase.raise.rowExpanded(e.row):t.api.treeBase.raise.rowCollapsed(e.row)),e.children&&e.children.forEach(function(e){g.setAllNodes(t,e,r)})},toggleRowTreeState:function(e,t){void 0===t.treeLevel||null===t.treeLevel||t.treeLevel<0||(t.treeNode.state===i.EXPANDED?g.collapseRow(e,t):g.expandRow(e,t,!1),e.queueGridRefresh())},expandRow:function(e,t,r){if(r){for(var n=[];t&&void 0!==t.treeLevel&&null!==t.treeLevel&&0<=t.treeLevel&&t.treeNode.state!==i.EXPANDED;)n.push(t),t=t.treeNode.parentRow;if(0<n.length){for(t=n.pop();t;)t.treeNode.state=i.EXPANDED,e.api.treeBase.raise.rowExpanded(t),t=n.pop();e.treeBase.expandAll=g.allExpanded(e.treeBase.tree),e.queueGridRefresh()}}else{if(void 0===t.treeLevel||null===t.treeLevel||t.treeLevel<0)return;t.treeNode.state!==i.EXPANDED&&(t.treeNode.state=i.EXPANDED,e.api.treeBase.raise.rowExpanded(t),e.treeBase.expandAll=g.allExpanded(e.treeBase.tree),e.queueGridRefresh())}},expandRowChildren:function(e,t){void 0===t.treeLevel||null===t.treeLevel||t.treeLevel<0||(g.setAllNodes(e,t.treeNode,i.EXPANDED),e.treeBase.expandAll=g.allExpanded(e.treeBase.tree),e.queueGridRefresh())},collapseRow:function(e,t){void 0===t.treeLevel||null===t.treeLevel||t.treeLevel<0||t.treeNode.state!==i.COLLAPSED&&(t.treeNode.state=i.COLLAPSED,e.treeBase.expandAll=!1,e.api.treeBase.raise.rowCollapsed(t),e.queueGridRefresh())},collapseRowChildren:function(e,t){void 0===t.treeLevel||null===t.treeLevel||t.treeLevel<0||(g.setAllNodes(e,t.treeNode,i.COLLAPSED),e.treeBase.expandAll=!1,e.queueGridRefresh())},allExpanded:function(e){var t=!0;return e.forEach(function(e){g.allExpandedInternal(e)||(t=!1)}),t},allExpandedInternal:function(e){if(e.children&&0<e.children.length){if(e.state===i.COLLAPSED)return!1;var t=!0;return e.children.forEach(function(e){g.allExpandedInternal(e)||(t=!1)}),t}return!0},treeRows:function(e){var t=this;return 0===e.length?(g.updateRowHeaderWidth(t),e):(t.treeBase.tree=g.createTree(t,e),g.updateRowHeaderWidth(t),g.sortTree(t),g.fixFilter(t),g.renderTree(t.treeBase.tree))},updateRowHeaderWidth:function(e){var t=e.getColumn(i.rowHeaderColName),r=e.options.treeRowHeaderBaseWidth+e.options.treeIndent*Math.max(e.treeBase.numberLevels-1,0);t&&r!==t.width&&(t.width=r,e.queueRefresh());var n=!0;!1===e.options.showTreeRowHeader&&(n=!1),!1===e.options.treeRowHeaderAlwaysVisible&&e.treeBase.numberLevels<=0&&(n=!1),t&&t.visible!==n&&(t.visible=n,t.colDef.visible=n,e.queueGridRefresh())},renderTree:function(e){var t=[];return e.forEach(function(e){e.row.visible&&t.push(e.row),e.state===i.EXPANDED&&e.children&&0<e.children.length&&(t=t.concat(g.renderTree(e.children)))}),t},createTree:function(r,e){var n=-1,o=[];r.treeBase.tree=[],r.treeBase.numberLevels=0;var a=g.getAggregations(r);for(e.forEach(function(e){if(e.internalRow||e.treeLevel===e.entity.$$treeLevel||(e.treeLevel=e.entity.$$treeLevel),e.treeLevel<=n){for(;e.treeLevel<=n;){var t=o.pop();g.finaliseAggregations(t),n--}0<o.length?g.setCurrentState(o):i.EXPANDED}(void 0===e.treeLevel||null===e.treeLevel||e.treeLevel<0)&&e.visible&&g.aggregate(r,e,o),g.addOrUseNode(r,e,o,a),void 0!==e.treeLevel&&null!==e.treeLevel&&0<=e.treeLevel&&(o.push(e),n++,g.setCurrentState(o)),r.treeBase.numberLevels<e.treeLevel+1&&(r.treeBase.numberLevels=e.treeLevel+1)});0<o.length;){var t=o.pop();g.finaliseAggregations(t)}return r.treeBase.tree},addOrUseNode:function(e,t,r,n){var o=[];n.forEach(function(e){o.push(g.buildAggregationObject(e.col))});var a={state:i.COLLAPSED,row:t,parentRow:null,aggregations:o,children:[]};t.treeNode&&(a.state=t.treeNode.state),0<r.length&&(a.parentRow=r[r.length-1]),t.treeNode=a,0===r.length?e.treeBase.tree.push(a):r[r.length-1].treeNode.children.push(a)},setCurrentState:function(e){var t=i.EXPANDED;return e.forEach(function(e){e.treeNode.state===i.COLLAPSED&&(t=i.COLLAPSED)}),t},sortTree:function(e){e.columns.forEach(function(e){e.sort&&e.sort.ignoreSort&&delete e.sort.ignoreSort}),e.treeBase.tree=g.sortInternal(e,e.treeBase.tree)},sortInternal:function(t,e){var r=e.map(function(e){return e.row}),n=(r=l.sort(t,r,t.columns)).map(function(e){return e.treeNode});return n.forEach(function(e){e.state===i.EXPANDED&&e.children&&0<e.children.length&&(e.children=g.sortInternal(t,e.children))}),n},fixFilter:function(e){var t;e.treeBase.tree.forEach(function(e){e.children&&0<e.children.length&&(t=e.row.visible,g.fixFilterInternal(e.children,t))})},fixFilterInternal:function(e,t){return e.forEach(function(e){e.row.visible&&!t&&(g.setParentsVisible(e),t=!0),e.children&&0<e.children.length&&g.fixFilterInternal(e.children,t&&e.row.visible)&&(t=!0)}),t},setParentsVisible:function(e){for(;e.parentRow;)e.parentRow.visible=!0,e=e.parentRow.treeNode},buildAggregationObject:function(e){var t={col:e};return e.treeAggregation&&e.treeAggregation.type&&(t.type=e.treeAggregation.type),e.treeAggregation&&e.treeAggregation.label&&(t.label=e.treeAggregation.label),t},getAggregations:function(t){var r=[];return t.columns.forEach(function(e){void 0!==e.treeAggregationFn&&(r.push(g.buildAggregationObject(e)),t.options.showColumnFooter&&void 0===e.colDef.aggregationType&&e.treeAggregation&&(e.treeFooterAggregation=g.buildAggregationObject(e),e.aggregationType=g.treeFooterAggregationType))}),r},aggregate:function(o,a,e){0===e.length&&a.treeNode&&a.treeNode.aggregations&&a.treeNode.aggregations.forEach(function(e){if(void 0!==e.col.treeFooterAggregation){var t=o.getCellValue(a,e.col),r=Number(t);e.col.treeAggregationFn?e.col.treeAggregationFn(e.col.treeFooterAggregation,t,r,a):e.col.treeFooterAggregation.value=void 0}}),e.forEach(function(e,n){e.treeNode.aggregations&&e.treeNode.aggregations.forEach(function(e){var t=o.getCellValue(a,e.col),r=Number(t);e.col.treeAggregationFn(e,t,r,a),0===n&&void 0!==e.col.treeFooterAggregation&&(e.col.treeAggregationFn?e.col.treeAggregationFn(e.col.treeFooterAggregation,t,r,a):e.col.treeFooterAggregation.value=void 0)})})},nativeAggregations:function(){return{count:{label:o.get().aggregation.count,menuTitle:o.get().grouping.aggregate_count,aggregationFn:function(e,t,r){void 0===e.value?e.value=1:e.value++}},sum:{label:o.get().aggregation.sum,menuTitle:o.get().grouping.aggregate_sum,aggregationFn:function(e,t,r){isNaN(r)||(void 0===e.value?e.value=r:e.value+=r)}},min:{label:o.get().aggregation.min,menuTitle:o.get().grouping.aggregate_min,aggregationFn:function(e,t,r){void 0===e.value?e.value=t:null!=t&&(t<e.value||null===e.value)&&(e.value=t)}},max:{label:o.get().aggregation.max,menuTitle:o.get().grouping.aggregate_max,aggregationFn:function(e,t,r){void 0===e.value?e.value=t:null!=t&&(t>e.value||null===e.value)&&(e.value=t)}},avg:{label:o.get().aggregation.avg,menuTitle:o.get().grouping.aggregate_avg,aggregationFn:function(e,t,r){void 0===e.count?e.count=1:e.count++,isNaN(r)||(void 0===e.value||void 0===e.sum?(e.value=r,e.sum=r):(e.sum+=r,e.value=e.sum/e.count))}}}},finaliseAggregation:function(e,t){t.col.treeAggregationUpdateEntity&&void 0!==e&&void 0!==e.entity["$$"+t.col.uid]&&angular.extend(t,e.entity["$$"+t.col.uid]),"function"==typeof t.col.treeAggregationFinalizerFn&&t.col.treeAggregationFinalizerFn(t),"function"==typeof t.col.customTreeAggregationFinalizerFn&&t.col.customTreeAggregationFinalizerFn(t),void 0===t.rendered&&(t.rendered=t.label?t.label+t.value:t.value)},finaliseAggregations:function(e){null!=e&&void 0!==e.treeNode.aggregations&&e.treeNode.aggregations.forEach(function(r){if(g.finaliseAggregation(e,r),r.col.treeAggregationUpdateEntity){var n={};angular.forEach(r,function(e,t){r.hasOwnProperty(t)&&"col"!==t&&(n[t]=e)}),e.entity["$$"+r.col.uid]=n}})},treeFooterAggregationType:function(e,t){return g.finaliseAggregation(void 0,t.treeFooterAggregation),void 0===t.treeFooterAggregation.value||null===t.treeFooterAggregation.rendered?"":t.treeFooterAggregation.rendered}};return g}]),e.directive("uiGridTreeBaseRowHeaderButtons",["$templateCache","uiGridTreeBaseService",function(e,a){return{replace:!0,restrict:"E",template:e.get("ui-grid/treeBaseRowHeaderButtons"),scope:!0,require:"^uiGrid",link:function(e,t,r,n){var o=n.grid;e.treeButtonClass=function(e){if(o.options.showTreeExpandNoChildren&&-1<e.treeLevel||e.treeNode.children&&0<e.treeNode.children.length){if("expanded"===e.treeNode.state)return"ui-grid-icon-minus-squared";if("collapsed"===e.treeNode.state)return"ui-grid-icon-plus-squared"}},e.treeButtonClick=function(e,t){t.stopPropagation(),a.toggleRowTreeState(o,e,t)}}}}]),e.directive("uiGridTreeBaseExpandAllButtons",["$templateCache","uiGridTreeBaseService",function(e,n){return{replace:!0,restrict:"E",template:e.get("ui-grid/treeBaseExpandAllButtons"),scope:!1,link:function(e){var r=e.col.grid;e.headerButtonClass=function(){return 0<r.treeBase.numberLevels&&r.treeBase.expandAll?"ui-grid-icon-minus-squared":0<r.treeBase.numberLevels&&!r.treeBase.expandAll?"ui-grid-icon-plus-squared":void 0},e.headerButtonClick=function(e,t){r.treeBase.expandAll?n.collapseAllRows(r,t):n.expandAllRows(r,t)}}}}]),e.directive("uiGridViewport",function(){return{priority:-200,scope:!1,compile:function(e){var t=angular.element(e.children().children()[0]),r=t.attr("ng-class"),n="";return n=r?r.slice(0,-1)+",'ui-grid-tree-header-row': row.treeLevel > -1}":"{'ui-grid-tree-header-row': row.treeLevel > -1}",t.attr("ng-class",n),{pre:function(e,t,r,n){},post:function(e,t,r,n){}}}}})}(),angular.module("ui.grid.treeBase").run(["$templateCache",function(e){"use strict";e.put("ui-grid/treeBaseExpandAllButtons",'<div class="ui-grid-tree-base-row-header-buttons" ng-class="headerButtonClass()" ng-click="headerButtonClick($event)"></div>'),e.put("ui-grid/treeBaseHeaderCell",'<div><div class="ui-grid-cell-contents" col-index="renderIndex"><ui-grid-tree-base-expand-all-buttons ng-if="grid.options.enableExpandAll"></ui-grid-tree-base-expand-all-buttons></div></div>'),e.put("ui-grid/treeBaseRowHeader",'<div class="ui-grid-cell-contents"><ui-grid-tree-base-row-header-buttons></ui-grid-tree-base-row-header-buttons></div>'),e.put("ui-grid/treeBaseRowHeaderButtons",'<div class="ui-grid-tree-base-row-header-buttons" ng-class="{\'ui-grid-tree-base-header\': row.treeLevel > -1 }" ng-click="treeButtonClick(row, $event)"><i ng-class="treeButtonClass(row)" ng-style="{\'padding-left\': grid.options.treeIndent * row.treeLevel + \'px\'}"></i> &nbsp;</div>')}]);
/*!
 * ui-grid - v4.8.0 - 2019-05-02
 * Copyright (c) 2019 ; License: MIT 
 */


!function(){"use strict";var e=angular.module("ui.grid.treeView",["ui.grid","ui.grid.treeBase"]);e.constant("uiGridTreeViewConstants",{featureName:"treeView",rowHeaderColName:"treeBaseRowHeaderCol",EXPANDED:"expanded",COLLAPSED:"collapsed",aggregation:{COUNT:"count",SUM:"sum",MAX:"max",MIN:"min",AVG:"avg"}}),e.service("uiGridTreeViewService",["$q","uiGridTreeViewConstants","uiGridTreeBaseConstants","uiGridTreeBaseService","gridUtil","GridRow","gridClassFactory","i18nService","uiGridConstants",function(e,i,r,n,t,o,a,s,u){var d={initializeGrid:function(e,i){n.initializeGrid(e,i),e.treeView={},e.registerRowsProcessor(d.adjustSorting,60);var r={treeView:{}},t={treeView:{}};e.api.registerEventsFromObject(r),e.api.registerMethodsFromObject(t)},defaultGridOptions:function(e){e.enableTreeView=!1!==e.enableTreeView},adjustSorting:function(e){return this.columns.forEach(function(e){e.sort&&(e.sort.ignoreSort=!0)}),e}};return d}]),e.directive("uiGridTreeView",["uiGridTreeViewConstants","uiGridTreeViewService","$templateCache",function(e,n,i){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(e,i,r,t){!1!==t.grid.options.enableTreeView&&n.initializeGrid(t.grid,e)},post:function(e,i,r,t){}}}}}])}();
/*!
 * Viewer.js v1.5.0
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-11-23T05:10:26.193Z
 */
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):(t=t||self).Viewer=i()}(this,function(){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function e(i,t){var e=Object.keys(i);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(i);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable})),e.push.apply(e,n)}return e}function r(s){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?e(Object(o),!0).forEach(function(t){var i,e,n;i=s,n=o[e=t],e in i?Object.defineProperty(i,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):i[e]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(t){Object.defineProperty(s,t,Object.getOwnPropertyDescriptor(o,t))})}return s}var s={backdrop:!0,button:!0,navbar:!0,title:!0,toolbar:!0,className:"",container:"body",filter:null,fullscreen:!0,initialViewIndex:0,inline:!1,interval:5e3,keyboard:!0,loading:!0,loop:!0,minWidth:200,minHeight:100,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,slideOnTouch:!0,toggleOnDblclick:!0,tooltip:!0,transition:!0,zIndex:2015,zIndexInline:0,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null,zoom:null,zoomed:null},o="undefined"!=typeof window&&void 0!==window.document,a=o?window:{},h=o&&"ontouchstart"in a.document.documentElement,t=o&&"PointerEvent"in a,p="viewer",l="move",c="switch",u="zoom",f="".concat(p,"-active"),w="".concat(p,"-close"),b="".concat(p,"-fade"),y="".concat(p,"-fixed"),x="".concat(p,"-fullscreen"),d="".concat(p,"-fullscreen-exit"),k="".concat(p,"-hide"),m="".concat(p,"-hide-md-down"),g="".concat(p,"-hide-sm-down"),v="".concat(p,"-hide-xs-down"),z="".concat(p,"-in"),D="".concat(p,"-invisible"),T="".concat(p,"-loading"),E="".concat(p,"-move"),I="".concat(p,"-open"),O="".concat(p,"-show"),S="".concat(p,"-transition"),C="click",L="dblclick",N="dragstart",M="hidden",R="hide",Y="keydown",q="load",X=t?"pointerdown":h?"touchstart":"mousedown",F=t?"pointermove":h?"touchmove":"mousemove",W=t?"pointerup pointercancel":h?"touchend touchcancel":"mouseup",P="ready",A="resize",j="show",H="shown",V="transitionend",B="viewed",K="".concat(p,"Action"),U=/\s\s*/,Z=["zoom-in","zoom-out","one-to-one","reset","prev","play","next","rotate-left","rotate-right","flip-horizontal","flip-vertical"];function $(t){return"string"==typeof t}var _=Number.isNaN||a.isNaN;function G(t){return"number"==typeof t&&!_(t)}function J(t){return void 0===t}function Q(t){return"object"===i(t)&&null!==t}var tt=Object.prototype.hasOwnProperty;function it(t){if(!Q(t))return!1;try{var i=t.constructor,e=i.prototype;return i&&e&&tt.call(e,"isPrototypeOf")}catch(t){return!1}}function et(t){return"function"==typeof t}function nt(i,e){if(i&&et(e))if(Array.isArray(i)||G(i.length)){var t,n=i.length;for(t=0;t<n&&!1!==e.call(i,i[t],t,i);t+=1);}else Q(i)&&Object.keys(i).forEach(function(t){e.call(i,i[t],t,i)});return i}var st=Object.assign||function(e){for(var t=arguments.length,i=new Array(1<t?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];return Q(e)&&0<i.length&&i.forEach(function(i){Q(i)&&Object.keys(i).forEach(function(t){e[t]=i[t]})}),e},ot=/^(?:width|height|left|top|marginLeft|marginTop)$/;function at(t,i){var e=t.style;nt(i,function(t,i){ot.test(i)&&G(t)&&(t+="px"),e[i]=t})}function rt(t,i){return!(!t||!i)&&(t.classList?t.classList.contains(i):-1<t.className.indexOf(i))}function ht(t,i){if(t&&i)if(G(t.length))nt(t,function(t){ht(t,i)});else if(t.classList)t.classList.add(i);else{var e=t.className.trim();e?e.indexOf(i)<0&&(t.className="".concat(e," ").concat(i)):t.className=i}}function lt(t,i){t&&i&&(G(t.length)?nt(t,function(t){lt(t,i)}):t.classList?t.classList.remove(i):0<=t.className.indexOf(i)&&(t.className=t.className.replace(i,"")))}function ct(t,i,e){i&&(G(t.length)?nt(t,function(t){ct(t,i,e)}):e?ht(t,i):lt(t,i))}var ut=/([a-z\d])([A-Z])/g;function dt(t){return t.replace(ut,"$1-$2").toLowerCase()}function mt(t,i){return Q(t[i])?t[i]:t.dataset?t.dataset[i]:t.getAttribute("data-".concat(dt(i)))}function ft(t,i,e){Q(e)?t[i]=e:t.dataset?t.dataset[i]=e:t.setAttribute("data-".concat(dt(i)),e)}var gt=function(){var t=!1;if(o){var i=!1,e=function(){},n=Object.defineProperty({},"once",{get:function(){return t=!0,i},set:function(t){i=t}});a.addEventListener("test",e,n),a.removeEventListener("test",e,n)}return t}();function vt(e,t,n,i){var s=3<arguments.length&&void 0!==i?i:{},o=n;t.trim().split(U).forEach(function(t){if(!gt){var i=e.listeners;i&&i[t]&&i[t][n]&&(o=i[t][n],delete i[t][n],0===Object.keys(i[t]).length&&delete i[t],0===Object.keys(i).length&&delete e.listeners)}e.removeEventListener(t,o,s)})}function pt(o,t,a,i){var r=3<arguments.length&&void 0!==i?i:{},h=a;t.trim().split(U).forEach(function(n){if(r.once&&!gt){var t=o.listeners,s=void 0===t?{}:t;h=function(){delete s[n][a],o.removeEventListener(n,h,r);for(var t=arguments.length,i=new Array(t),e=0;e<t;e++)i[e]=arguments[e];a.apply(o,i)},s[n]||(s[n]={}),s[n][a]&&o.removeEventListener(n,s[n][a],r),s[n][a]=h,o.listeners=s}o.addEventListener(n,h,r)})}function wt(t,i,e){var n;return et(Event)&&et(CustomEvent)?n=new CustomEvent(i,{detail:e,bubbles:!0,cancelable:!0}):(n=document.createEvent("CustomEvent")).initCustomEvent(i,!0,!0,e),t.dispatchEvent(n)}function bt(t){var i=t.rotate,e=t.scaleX,n=t.scaleY,s=t.translateX,o=t.translateY,a=[];G(s)&&0!==s&&a.push("translateX(".concat(s,"px)")),G(o)&&0!==o&&a.push("translateY(".concat(o,"px)")),G(i)&&0!==i&&a.push("rotate(".concat(i,"deg)")),G(e)&&1!==e&&a.push("scaleX(".concat(e,")")),G(n)&&1!==n&&a.push("scaleY(".concat(n,")"));var r=a.length?a.join(" "):"none";return{WebkitTransform:r,msTransform:r,transform:r}}var yt=a.navigator&&/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(a.navigator.userAgent);function xt(t,i){var e=document.createElement("img");if(t.naturalWidth&&!yt)return i(t.naturalWidth,t.naturalHeight),e;var n=document.body||document.documentElement;return e.onload=function(){i(e.width,e.height),yt||n.removeChild(e)},e.src=t.src,yt||(e.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",n.appendChild(e)),e}function kt(t){switch(t){case 2:return v;case 3:return g;case 4:return m;default:return""}}function zt(t,i){var e=t.pageX,n=t.pageY,s={endX:e,endY:n};return i?s:r({timeStamp:Date.now(),startX:e,startY:n},s)}var Dt={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}},initViewer:function(){var t,i=this.options,e=this.parent;i.inline&&(t={width:Math.max(e.offsetWidth,i.minWidth),height:Math.max(e.offsetHeight,i.minHeight)},this.parentData=t),!this.fulled&&t||(t=this.containerData),this.viewerData=st({},t)},renderViewer:function(){this.options.inline&&!this.fulled&&at(this.viewer,this.viewerData)},initList:function(){var r=this,t=this.element,h=this.options,l=this.list,c=[];l.innerHTML="",nt(this.images,function(t,i){var e=t.src,n=t.alt||function(t){return $(t)?decodeURIComponent(t.replace(/^.*\//,"").replace(/[?&#].*$/,"")):""}(e),s=h.url;if($(s)?s=t.getAttribute(s):et(s)&&(s=s.call(r,t)),e||s){var o=document.createElement("li"),a=document.createElement("img");a.src=e||s,a.alt=n,a.setAttribute("data-index",i),a.setAttribute("data-original-url",s||e),a.setAttribute("data-viewer-action","view"),a.setAttribute("role","button"),o.appendChild(a),l.appendChild(o),c.push(o)}}),nt(this.items=c,function(i){var t=i.firstElementChild;ft(t,"filled",!0),h.loading&&ht(i,T),pt(t,q,function(t){h.loading&&lt(i,T),r.loadImage(t)},{once:!0})}),h.transition&&pt(t,B,function(){ht(l,S)},{once:!0})},renderList:function(t){var i=t||this.index,e=this.items[i].offsetWidth||30,n=e+1;at(this.list,st({width:n*this.length},bt({translateX:(this.viewerData.width-e)/2-n*i})))},resetList:function(){var t=this.list;t.innerHTML="",lt(t,S),at(t,bt({translateX:0}))},initImage:function(r){var t,h=this,l=this.options,i=this.image,e=this.viewerData,n=this.footer.offsetHeight,c=e.width,u=Math.max(e.height-n,n),d=this.imageData||{};this.imageInitializing={abort:function(){t.onload=null}},t=xt(i,function(t,i){var e=t/i,n=c,s=u;h.imageInitializing=!1,c<u*e?s=c/e:n=u*e;var o={naturalWidth:t,naturalHeight:i,aspectRatio:e,ratio:(n=Math.min(.9*n,t))/t,width:n,height:s=Math.min(.9*s,i),left:(c-n)/2,top:(u-s)/2},a=st({},o);l.rotatable&&(o.rotate=d.rotate||0,a.rotate=0),l.scalable&&(o.scaleX=d.scaleX||1,o.scaleY=d.scaleY||1,a.scaleX=1,a.scaleY=1),h.imageData=o,h.initialImageData=a,r&&r()})},renderImage:function(t){var i=this,e=this.image,n=this.imageData;if(at(e,st({width:n.width,height:n.height,marginLeft:n.left,marginTop:n.top},bt(n))),t)if((this.viewing||this.zooming)&&this.options.transition){var s=function(){i.imageRendering=!1,t()};this.imageRendering={abort:function(){vt(e,V,s)}},pt(e,V,s,{once:!0})}else t()},resetImage:function(){if(this.viewing||this.viewed){var t=this.image;this.viewing&&this.viewing.abort(),t.parentNode.removeChild(t),this.image=null}}},Tt={bind:function(){var t=this.options,i=this.viewer,e=this.canvas,n=this.element.ownerDocument;pt(i,C,this.onClick=this.click.bind(this)),pt(i,N,this.onDragStart=this.dragstart.bind(this)),pt(e,X,this.onPointerDown=this.pointerdown.bind(this)),pt(n,F,this.onPointerMove=this.pointermove.bind(this)),pt(n,W,this.onPointerUp=this.pointerup.bind(this)),pt(n,Y,this.onKeyDown=this.keydown.bind(this)),pt(window,A,this.onResize=this.resize.bind(this)),t.zoomable&&t.zoomOnWheel&&pt(i,"wheel",this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),t.toggleOnDblclick&&pt(e,L,this.onDblclick=this.dblclick.bind(this))},unbind:function(){var t=this.options,i=this.viewer,e=this.canvas,n=this.element.ownerDocument;vt(i,C,this.onClick),vt(i,N,this.onDragStart),vt(e,X,this.onPointerDown),vt(n,F,this.onPointerMove),vt(n,W,this.onPointerUp),vt(n,Y,this.onKeyDown),vt(window,A,this.onResize),t.zoomable&&t.zoomOnWheel&&vt(i,"wheel",this.onWheel,{passive:!1,capture:!0}),t.toggleOnDblclick&&vt(e,L,this.onDblclick)}},Et={click:function(t){var i=t.target,e=this.options,n=this.imageData,s=mt(i,K);switch(h&&t.isTrusted&&i===this.canvas&&clearTimeout(this.clickCanvasTimeout),s){case"mix":this.played?this.stop():e.inline?this.fulled?this.exit():this.full():this.hide();break;case"hide":this.hide();break;case"view":this.view(mt(i,"index"));break;case"zoom-in":this.zoom(.1,!0);break;case"zoom-out":this.zoom(-.1,!0);break;case"one-to-one":this.toggle();break;case"reset":this.reset();break;case"prev":this.prev(e.loop);break;case"play":this.play(e.fullscreen);break;case"next":this.next(e.loop);break;case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-horizontal":this.scaleX(-n.scaleX||-1);break;case"flip-vertical":this.scaleY(-n.scaleY||-1);break;default:this.played&&this.stop()}},dblclick:function(t){t.preventDefault(),this.viewed&&t.target===this.image&&(h&&t.isTrusted&&clearTimeout(this.doubleClickImageTimeout),this.toggle())},load:function(){var t=this;this.timeout&&(clearTimeout(this.timeout),this.timeout=!1);var i=this.element,e=this.options,n=this.image,s=this.index,o=this.viewerData;lt(n,D),e.loading&&lt(this.canvas,T),n.style.cssText="height:0;"+"margin-left:".concat(o.width/2,"px;")+"margin-top:".concat(o.height/2,"px;")+"max-width:none!important;position:absolute;width:0;",this.initImage(function(){ct(n,E,e.movable),ct(n,S,e.transition),t.renderImage(function(){t.viewed=!0,t.viewing=!1,et(e.viewed)&&pt(i,B,e.viewed,{once:!0}),wt(i,B,{originalImage:t.images[s],index:s,image:n})})})},loadImage:function(t){var o=t.target,i=o.parentNode,a=i.offsetWidth||30,r=i.offsetHeight||50,h=!!mt(o,"filled");xt(o,function(t,i){var e=t/i,n=a,s=r;a<r*e?h?n=r*e:s=a/e:h?s=a/e:n=r*e,at(o,st({width:n,height:s},bt({translateX:(a-n)/2,translateY:(r-s)/2})))})},keydown:function(t){var i=this.options;if(this.fulled&&i.keyboard)switch(t.keyCode||t.which||t.charCode){case 27:this.played?this.stop():i.inline?this.fulled&&this.exit():this.hide();break;case 32:this.played&&this.stop();break;case 37:this.prev(i.loop);break;case 38:t.preventDefault(),this.zoom(i.zoomRatio,!0);break;case 39:this.next(i.loop);break;case 40:t.preventDefault(),this.zoom(-i.zoomRatio,!0);break;case 48:case 49:t.ctrlKey&&(t.preventDefault(),this.toggle())}},dragstart:function(t){"img"===t.target.tagName.toLowerCase()&&t.preventDefault()},pointerdown:function(t){var i=this.options,e=this.pointers,n=t.buttons,s=t.button;if(!(!this.viewed||this.showing||this.viewing||this.hiding||("mousedown"===t.type||"pointerdown"===t.type&&"mouse"===t.pointerType)&&(G(n)&&1!==n||G(s)&&0!==s||t.ctrlKey))){t.preventDefault(),t.changedTouches?nt(t.changedTouches,function(t){e[t.identifier]=zt(t)}):e[t.pointerId||0]=zt(t);var o=!!i.movable&&l;i.zoomOnTouch&&i.zoomable&&1<Object.keys(e).length?o=u:i.slideOnTouch&&("touch"===t.pointerType||"touchstart"===t.type)&&this.isSwitchable()&&(o=c),!i.transition||o!==l&&o!==u||lt(this.image,S),this.action=o}},pointermove:function(t){var i=this.pointers,e=this.action;this.viewed&&e&&(t.preventDefault(),t.changedTouches?nt(t.changedTouches,function(t){st(i[t.identifier]||{},zt(t,!0))}):st(i[t.pointerId||0]||{},zt(t,!0)),this.change(t))},pointerup:function(t){var i,e=this,n=this.options,s=this.action,o=this.pointers;t.changedTouches?nt(t.changedTouches,function(t){i=o[t.identifier],delete o[t.identifier]}):(i=o[t.pointerId||0],delete o[t.pointerId||0]),s&&(t.preventDefault(),!n.transition||s!==l&&s!==u||ht(this.image,S),this.action=!1,h&&s!==u&&i&&Date.now()-i.timeStamp<500&&(clearTimeout(this.clickCanvasTimeout),clearTimeout(this.doubleClickImageTimeout),n.toggleOnDblclick&&this.viewed&&t.target===this.image?this.imageClicked?(this.imageClicked=!1,this.doubleClickImageTimeout=setTimeout(function(){wt(e.image,L)},50)):(this.imageClicked=!0,this.doubleClickImageTimeout=setTimeout(function(){e.imageClicked=!1},500)):(this.imageClicked=!1,n.backdrop&&"static"!==n.backdrop&&t.target===this.canvas&&(this.clickCanvasTimeout=setTimeout(function(){wt(e.canvas,C)},50)))))},resize:function(){var i=this;if(this.isShown&&!this.hiding&&(this.initContainer(),this.initViewer(),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){i.renderImage()}),this.played)){if(this.options.fullscreen&&this.fulled&&!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement))return void this.stop();nt(this.player.getElementsByTagName("img"),function(t){pt(t,q,i.loadImage.bind(i),{once:!0}),wt(t,q)})}},wheel:function(t){var i=this;if(this.viewed&&(t.preventDefault(),!this.wheeling)){this.wheeling=!0,setTimeout(function(){i.wheeling=!1},50);var e=Number(this.options.zoomRatio)||.1,n=1;t.deltaY?n=0<t.deltaY?1:-1:t.wheelDelta?n=-t.wheelDelta/120:t.detail&&(n=0<t.detail?1:-1),this.zoom(-n*e,!0,t)}}},It={show:function(t){var i=0<arguments.length&&void 0!==t&&t,e=this.element,n=this.options;if(n.inline||this.showing||this.isShown||this.showing)return this;if(!this.ready)return this.build(),this.ready&&this.show(i),this;if(et(n.show)&&pt(e,j,n.show,{once:!0}),!1===wt(e,j)||!this.ready)return this;this.hiding&&this.transitioning.abort(),this.showing=!0,this.open();var s=this.viewer;if(lt(s,k),n.transition&&!i){var o=this.shown.bind(this);this.transitioning={abort:function(){vt(s,V,o),lt(s,z)}},ht(s,S),s.initialOffsetWidth=s.offsetWidth,pt(s,V,o,{once:!0}),ht(s,z)}else ht(s,z),this.shown();return this},hide:function(){var t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],i=this.element,e=this.options;if(e.inline||this.hiding||!this.isShown&&!this.showing)return this;if(et(e.hide)&&pt(i,R,e.hide,{once:!0}),!1===wt(i,R))return this;this.showing&&this.transitioning.abort(),this.hiding=!0,this.played?this.stop():this.viewing&&this.viewing.abort();var n=this.viewer;if(e.transition&&!t){var s=this.hidden.bind(this),o=function(){setTimeout(function(){pt(n,V,s,{once:!0}),lt(n,z)},0)};this.transitioning={abort:function(){this.viewed?vt(this.image,V,o):vt(n,V,s)}},this.viewed&&rt(this.image,S)?(pt(this.image,V,o,{once:!0}),this.zoomTo(0,!1,!1,!0)):o()}else lt(n,z),this.hidden();return this},view:function(t){var e=this,i=0<arguments.length&&void 0!==t?t:this.options.initialViewIndex;if(i=Number(i)||0,this.hiding||this.played||i<0||i>=this.length||this.viewed&&i===this.index)return this;if(!this.isShown)return this.index=i,this.show();this.viewing&&this.viewing.abort();var n=this.element,s=this.options,o=this.title,a=this.canvas,r=this.items[i],h=r.querySelector("img"),l=mt(h,"originalUrl"),c=h.getAttribute("alt"),u=document.createElement("img");if(u.src=l,u.alt=c,et(s.view)&&pt(n,"view",s.view,{once:!0}),!1===wt(n,"view",{originalImage:this.images[i],index:i,image:u})||!this.isShown||this.hiding||this.played)return this;this.image=u,lt(this.items[this.index],f),ht(r,f),this.viewed=!1,this.index=i,this.imageData={},ht(u,D),s.loading&&ht(a,T),a.innerHTML="",a.appendChild(u),this.renderList(),o.innerHTML="";function d(){var t=e.imageData,i=Array.isArray(s.title)?s.title[1]:s.title;o.innerHTML=function(t){return $(t)?t.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):t}(et(i)?i.call(e,u,t):"".concat(c," (").concat(t.naturalWidth," × ").concat(t.naturalHeight,")"))}var m;return pt(n,B,d,{once:!0}),this.viewing={abort:function(){vt(n,B,d),u.complete?this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort():(u.src="",vt(u,q,m),this.timeout&&clearTimeout(this.timeout))}},u.complete?this.load():(pt(u,q,m=this.load.bind(this),{once:!0}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){lt(u,D),e.timeout=!1},1e3)),this},prev:function(t){var i=0<arguments.length&&void 0!==t&&t,e=this.index-1;return e<0&&(e=i?this.length-1:0),this.view(e),this},next:function(t){var i=0<arguments.length&&void 0!==t&&t,e=this.length-1,n=this.index+1;return e<n&&(n=i?0:e),this.view(n),this},move:function(t,i){var e=this.imageData;return this.moveTo(J(t)?t:e.left+Number(t),J(i)?i:e.top+Number(i)),this},moveTo:function(t,i){var e=1<arguments.length&&void 0!==i?i:t,n=this.imageData;if(t=Number(t),e=Number(e),this.viewed&&!this.played&&this.options.movable){var s=!1;G(t)&&(n.left=t,s=!0),G(e)&&(n.top=e,s=!0),s&&this.renderImage()}return this},zoom:function(t,i,e){var n=1<arguments.length&&void 0!==i&&i,s=2<arguments.length&&void 0!==e?e:null,o=this.imageData;return t=(t=Number(t))<0?1/(1-t):1+t,this.zoomTo(o.width*t/o.naturalWidth,n,s),this},zoomTo:function(t,i,e,n){var s=this,o=1<arguments.length&&void 0!==i&&i,a=2<arguments.length&&void 0!==e?e:null,r=3<arguments.length&&void 0!==n&&n,h=this.element,l=this.options,c=this.pointers,u=this.imageData,d=u.width,m=u.height,f=u.left,g=u.top,v=u.naturalWidth,p=u.naturalHeight;if(G(t=Math.max(0,t))&&this.viewed&&!this.played&&(r||l.zoomable)){if(!r){var w=Math.max(.01,l.minZoomRatio),b=Math.min(100,l.maxZoomRatio);t=Math.min(Math.max(t,w),b)}a&&.95<t&&t<1.05&&(t=1);var y=v*t,x=p*t,k=y-d,z=x-m,D=d/v;if(et(l.zoom)&&pt(h,"zoom",l.zoom,{once:!0}),!1===wt(h,"zoom",{ratio:t,oldRatio:D,originalEvent:a}))return this;if(this.zooming=!0,a){var T=function(t){var i=t.getBoundingClientRect();return{left:i.left+(window.pageXOffset-document.documentElement.clientLeft),top:i.top+(window.pageYOffset-document.documentElement.clientTop)}}(this.viewer),E=c&&Object.keys(c).length?function(t){var n=0,s=0,o=0;return nt(t,function(t){var i=t.startX,e=t.startY;n+=i,s+=e,o+=1}),{pageX:n/=o,pageY:s/=o}}(c):{pageX:a.pageX,pageY:a.pageY};u.left-=k*((E.pageX-T.left-f)/d),u.top-=z*((E.pageY-T.top-g)/m)}else u.left-=k/2,u.top-=z/2;u.width=y,u.height=x,u.ratio=t,this.renderImage(function(){s.zooming=!1,et(l.zoomed)&&pt(h,"zoomed",l.zoomed,{once:!0}),wt(h,"zoomed",{ratio:t,oldRatio:D,originalEvent:a})}),o&&this.tooltip()}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t)),this},rotateTo:function(t){var i=this.imageData;return G(t=Number(t))&&this.viewed&&!this.played&&this.options.rotatable&&(i.rotate=t,this.renderImage()),this},scaleX:function(t){return this.scale(t,this.imageData.scaleY),this},scaleY:function(t){return this.scale(this.imageData.scaleX,t),this},scale:function(t,i){var e=1<arguments.length&&void 0!==i?i:t,n=this.imageData;if(t=Number(t),e=Number(e),this.viewed&&!this.played&&this.options.scalable){var s=!1;G(t)&&(n.scaleX=t,s=!0),G(e)&&(n.scaleY=e,s=!0),s&&this.renderImage()}return this},play:function(){var i=this,t=0<arguments.length&&void 0!==arguments[0]&&arguments[0];if(!this.isShown||this.played)return this;var s=this.options,o=this.player,a=this.loadImage.bind(this),r=[],h=0,l=0;if(this.played=!0,this.onLoadWhenPlay=a,t&&this.requestFullscreen(),ht(o,O),nt(this.items,function(t,i){var e=t.querySelector("img"),n=document.createElement("img");n.src=mt(e,"originalUrl"),n.alt=e.getAttribute("alt"),h+=1,ht(n,b),ct(n,S,s.transition),rt(t,f)&&(ht(n,z),l=i),r.push(n),pt(n,q,a,{once:!0}),o.appendChild(n)}),G(s.interval)&&0<s.interval){var e=function t(){i.playing=setTimeout(function(){lt(r[l],z),ht(r[l=(l+=1)<h?l:0],z),t()},s.interval)};1<h&&e()}return this},stop:function(){var i=this;if(!this.played)return this;var t=this.player;return this.played=!1,clearTimeout(this.playing),nt(t.getElementsByTagName("img"),function(t){vt(t,q,i.onLoadWhenPlay)}),lt(t,O),t.innerHTML="",this.exitFullscreen(),this},full:function(){var t=this,i=this.options,e=this.viewer,n=this.image,s=this.list;return!this.isShown||this.played||this.fulled||!i.inline||(this.fulled=!0,this.open(),ht(this.button,d),i.transition&&(lt(s,S),this.viewed&&lt(n,S)),ht(e,y),e.setAttribute("style",""),at(e,{zIndex:i.zIndex}),this.initContainer(),this.viewerData=st({},this.containerData),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage(function(){i.transition&&setTimeout(function(){ht(n,S),ht(s,S)},0)})})),this},exit:function(){var t=this,i=this.options,e=this.viewer,n=this.image,s=this.list;return this.isShown&&!this.played&&this.fulled&&i.inline&&(this.fulled=!1,this.close(),lt(this.button,d),i.transition&&(lt(s,S),this.viewed&&lt(n,S)),lt(e,y),at(e,{zIndex:i.zIndexInline}),this.viewerData=st({},this.parentData),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage(function(){i.transition&&setTimeout(function(){ht(n,S),ht(s,S)},0)})})),this},tooltip:function(){var t=this,i=this.options,e=this.tooltipBox,n=this.imageData;return this.viewed&&!this.played&&i.tooltip&&(e.textContent="".concat(Math.round(100*n.ratio),"%"),this.tooltipping?clearTimeout(this.tooltipping):i.transition?(this.fading&&wt(e,V),ht(e,O),ht(e,b),ht(e,S),e.initialOffsetWidth=e.offsetWidth,ht(e,z)):ht(e,O),this.tooltipping=setTimeout(function(){i.transition?(pt(e,V,function(){lt(e,O),lt(e,b),lt(e,S),t.fading=!1},{once:!0}),lt(e,z),t.fading=!0):lt(e,O),t.tooltipping=!1},1e3)),this},toggle:function(){return 1===this.imageData.ratio?this.zoomTo(this.initialImageData.ratio,!0):this.zoomTo(1,!0),this},reset:function(){return this.viewed&&!this.played&&(this.imageData=st({},this.initialImageData),this.renderImage()),this},update:function(){var t=this.element,i=this.options,e=this.isImg;if(e&&!t.parentNode)return this.destroy();var s=[];if(nt(e?[t]:t.querySelectorAll("img"),function(t){i.filter?i.filter(t)&&s.push(t):s.push(t)}),!s.length)return this;if(this.images=s,this.length=s.length,this.ready){var o=[];if(nt(this.items,function(t,i){var e=t.querySelector("img"),n=s[i];n&&e?n.src!==e.src&&o.push(i):o.push(i)}),at(this.list,{width:"auto"}),this.initList(),this.isShown)if(this.length){if(this.viewed){var n=o.indexOf(this.index);0<=n?(this.viewed=!1,this.view(Math.max(this.index-(n+1),0))):ht(this.items[this.index],f)}}else this.image=null,this.viewed=!1,this.index=0,this.imageData={},this.canvas.innerHTML="",this.title.innerHTML=""}else this.build();return this},destroy:function(){var t=this.element,i=this.options;return t[p]&&(this.destroyed=!0,this.ready?(this.played&&this.stop(),i.inline?(this.fulled&&this.exit(),this.unbind()):this.isShown?(this.viewing&&(this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort()),this.hiding&&this.transitioning.abort(),this.hidden()):this.showing&&(this.transitioning.abort(),this.hidden()),this.ready=!1,this.viewer.parentNode.removeChild(this.viewer)):i.inline&&(this.delaying?this.delaying.abort():this.initializing&&this.initializing.abort()),i.inline||vt(t,C,this.onStart),t[p]=void 0),this}},Ot={open:function(){var t=this.body;ht(t,I),t.style.paddingRight="".concat(this.scrollbarWidth+(parseFloat(this.initialBodyPaddingRight)||0),"px")},close:function(){var t=this.body;lt(t,I),t.style.paddingRight=this.initialBodyPaddingRight},shown:function(){var t=this.element,i=this.options;this.fulled=!0,this.isShown=!0,this.render(),this.bind(),this.showing=!1,et(i.shown)&&pt(t,H,i.shown,{once:!0}),!1!==wt(t,H)&&this.ready&&this.isShown&&!this.hiding&&this.view(this.index)},hidden:function(){var t=this.element,i=this.options;this.fulled=!1,this.viewed=!1,this.isShown=!1,this.close(),this.unbind(),ht(this.viewer,k),this.resetList(),this.resetImage(),this.hiding=!1,this.destroyed||(et(i.hidden)&&pt(t,M,i.hidden,{once:!0}),wt(t,M))},requestFullscreen:function(){var t=this.element.ownerDocument;if(this.fulled&&!(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)){var i=t.documentElement;i.requestFullscreen?i.requestFullscreen():i.webkitRequestFullscreen?i.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):i.mozRequestFullScreen?i.mozRequestFullScreen():i.msRequestFullscreen&&i.msRequestFullscreen()}},exitFullscreen:function(){var t=this.element.ownerDocument;this.fulled&&(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)&&(t.exitFullscreen?t.exitFullscreen():t.webkitExitFullscreen?t.webkitExitFullscreen():t.mozCancelFullScreen?t.mozCancelFullScreen():t.msExitFullscreen&&t.msExitFullscreen())},change:function(t){var i=this.options,e=this.pointers,n=e[Object.keys(e)[0]],s=n.endX-n.startX,o=n.endY-n.startY;switch(this.action){case l:this.move(s,o);break;case u:this.zoom(function(t){var i=r({},t),h=[];return nt(t,function(r,t){delete i[t],nt(i,function(t){var i=Math.abs(r.startX-t.startX),e=Math.abs(r.startY-t.startY),n=Math.abs(r.endX-t.endX),s=Math.abs(r.endY-t.endY),o=Math.sqrt(i*i+e*e),a=(Math.sqrt(n*n+s*s)-o)/o;h.push(a)})}),h.sort(function(t,i){return Math.abs(t)<Math.abs(i)}),h[0]}(e),!1,t);break;case c:this.action="switched";var a=Math.abs(s);1<a&&a>Math.abs(o)&&(this.pointers={},1<s?this.prev(i.loop):s<-1&&this.next(i.loop))}nt(e,function(t){t.startX=t.endX,t.startY=t.endY})},isSwitchable:function(){var t=this.imageData,i=this.viewerData;return 1<this.length&&0<=t.left&&0<=t.top&&t.width<=i.width&&t.height<=i.height}},St=a.Viewer,Ct=function(){function e(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),!t||1!==t.nodeType)throw new Error("The first argument is required and must be an element.");this.element=t,this.options=st({},s,it(i)&&i),this.action=!1,this.fading=!1,this.fulled=!1,this.hiding=!1,this.imageClicked=!1,this.imageData={},this.index=this.options.initialViewIndex,this.isImg=!1,this.isShown=!1,this.length=0,this.played=!1,this.playing=!1,this.pointers={},this.ready=!1,this.showing=!1,this.timeout=!1,this.tooltipping=!1,this.viewed=!1,this.viewing=!1,this.wheeling=!1,this.zooming=!1,this.init()}return function(t,i,e){i&&n(t.prototype,i),e&&n(t,e)}(e,[{key:"init",value:function(){var e=this,t=this.element,n=this.options;if(!t[p]){t[p]=this;var i="img"===t.tagName.toLowerCase(),s=[];nt(i?[t]:t.querySelectorAll("img"),function(t){et(n.filter)?n.filter.call(e,t)&&s.push(t):s.push(t)}),this.isImg=i,this.length=s.length,this.images=s;var o=t.ownerDocument,a=o.body||o.documentElement;if(this.body=a,this.scrollbarWidth=window.innerWidth-o.documentElement.clientWidth,this.initialBodyPaddingRight=window.getComputedStyle(a).paddingRight,J(document.createElement(p).style.transition)&&(n.transition=!1),n.inline){var r=0,h=function(){var t;(r+=1)===e.length&&(e.initializing=!1,e.delaying={abort:function(){clearTimeout(t)}},t=setTimeout(function(){e.delaying=!1,e.build()},0))};this.initializing={abort:function(){nt(s,function(t){t.complete||vt(t,q,h)})}},nt(s,function(t){t.complete?h():pt(t,q,h,{once:!0})})}else pt(t,C,this.onStart=function(t){var i=t.target;"img"!==i.tagName.toLowerCase()||et(n.filter)&&!n.filter.call(e,i)||e.view(e.images.indexOf(i))})}}},{key:"build",value:function(){if(!this.ready){var t=this.element,h=this.options,i=t.parentNode,e=document.createElement("div");e.innerHTML='<div class="viewer-container" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list"></ul></div></div><div class="viewer-tooltip"></div><div role="button" class="viewer-button" data-viewer-action="mix"></div><div class="viewer-player"></div></div>';var n=e.querySelector(".".concat(p,"-container")),s=n.querySelector(".".concat(p,"-title")),o=n.querySelector(".".concat(p,"-toolbar")),a=n.querySelector(".".concat(p,"-navbar")),r=n.querySelector(".".concat(p,"-button")),l=n.querySelector(".".concat(p,"-canvas"));if(this.parent=i,this.viewer=n,this.title=s,this.toolbar=o,this.navbar=a,this.button=r,this.canvas=l,this.footer=n.querySelector(".".concat(p,"-footer")),this.tooltipBox=n.querySelector(".".concat(p,"-tooltip")),this.player=n.querySelector(".".concat(p,"-player")),this.list=n.querySelector(".".concat(p,"-list")),ht(s,h.title?kt(Array.isArray(h.title)?h.title[0]:h.title):k),ht(a,h.navbar?kt(h.navbar):k),ct(r,k,!h.button),h.backdrop&&(ht(n,"".concat(p,"-backdrop")),h.inline||"static"===h.backdrop||ft(l,K,"hide")),$(h.className)&&h.className&&h.className.split(U).forEach(function(t){ht(n,t)}),h.toolbar){var c=document.createElement("ul"),u=it(h.toolbar),d=Z.slice(0,3),m=Z.slice(7,9),f=Z.slice(9);u||ht(o,kt(h.toolbar)),nt(u?h.toolbar:Z,function(t,i){var e=u&&it(t),n=u?dt(i):t,s=e&&!J(t.show)?t.show:t;if(s&&(h.zoomable||-1===d.indexOf(n))&&(h.rotatable||-1===m.indexOf(n))&&(h.scalable||-1===f.indexOf(n))){var o=e&&!J(t.size)?t.size:t,a=e&&!J(t.click)?t.click:t,r=document.createElement("li");r.setAttribute("role","button"),ht(r,"".concat(p,"-").concat(n)),et(a)||ft(r,K,n),G(s)&&ht(r,kt(s)),-1!==["small","large"].indexOf(o)?ht(r,"".concat(p,"-").concat(o)):"play"===n&&ht(r,"".concat(p,"-large")),et(a)&&pt(r,C,a),c.appendChild(r)}}),o.appendChild(c)}else ht(o,k);if(!h.rotatable){var g=o.querySelectorAll('li[class*="rotate"]');ht(g,D),nt(g,function(t){o.appendChild(t)})}if(h.inline)ht(r,x),at(n,{zIndex:h.zIndexInline}),"static"===window.getComputedStyle(i).position&&at(i,{position:"relative"}),i.insertBefore(n,t.nextSibling);else{ht(r,w),ht(n,y),ht(n,b),ht(n,k),at(n,{zIndex:h.zIndex});var v=h.container;$(v)&&(v=t.ownerDocument.querySelector(v)),(v=v||this.body).appendChild(n)}h.inline&&(this.render(),this.bind(),this.isShown=!0),this.ready=!0,et(h.ready)&&pt(t,P,h.ready,{once:!0}),!1!==wt(t,P)?this.ready&&h.inline&&this.view(this.index):this.ready=!1}}}],[{key:"noConflict",value:function(){return window.Viewer=St,e}},{key:"setDefaults",value:function(t){st(s,it(t)&&t)}}]),e}();return st(Ct.prototype,Dt,Tt,Et,It,Ot),Ct});