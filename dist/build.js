/**
 * almond 0.2.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function(e,t){e.sb=e.sb||{},e.sb.d3=t()})(this,function(){var e,t,n;return function(r){function p(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)==="."&&t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function d(e,t){return function(){return s.apply(r,h.call(arguments,0).concat([e,t]))}}function v(e){return function(t){return p(t,e)}}function m(e){return function(t){a[e]=t}}function g(e){if(f.hasOwnProperty(e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!a.hasOwnProperty(e)&&!c.hasOwnProperty(e))throw new Error("No "+e);return a[e]}function y(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function b(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=[].slice;o=function(e,t){var n,r=y(e),i=r[0];return e=r[1],i&&(i=p(i,t),n=g(i)),i?n&&n.normalize?e=n.normalize(e,v(t)):e=p(e,t):(e=p(e,t),r=y(e),i=r[0],e=r[1],i&&(n=g(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return d(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:b(e)}}},i=function(e,t,n,i){var s,l,h,p,v,y=[],b;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")y[v]=u.require(e);else if(l==="exports")y[v]=u.exports(e),b=!0;else if(l==="module")s=y[v]=u.module(e);else if(a.hasOwnProperty(l)||f.hasOwnProperty(l)||c.hasOwnProperty(l))y[v]=g(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,d(i,!0),m(l),{}),y[v]=a[l]}}h=n.apply(a[e],y);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!b)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):g(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},15),s)},s.config=function(e){return l=e,s},n=function(e,t,n){t.splice||(n=t,t=[]),f[e]=[e,t,n]},n.amd={jQuery:!0}}(),n("almond",function(){}),n("d3binding/binding",[],function(){function e(e,t,n,r){return e.expand(function(i){i[r](t,function(i){var s=d3.select(this),o=n;if(typeof o=="function"){o=o(i);if(sb.base.observable.isObservable(o)){var u=o;sb.binding(u).onChange(u,function(){e.isTransition?t!==null?s.transition()[r](t,u()):s.transition()[r](u()):t!==null?s[r](t,u()):s[r](u())}).bind(),o=u()}}return o})}),e}function t(){var n=sb.util.expandable();return n.isTransition=!1,n.transition=function(){if(!n.isTransition&&n.expand){var e=t();return e.funcs=n.funcs,e.isTransition=!0,e}return n},["attr","style","classed"].forEach(function(t){n[t]=function(r,i){return e(n,r,i,t)}}),["text","html"].forEach(function(t){n[t]=function(r){return e(n,null,r,t)}}),n}return t}),n("d3binding/transform",[],function(e,t){function n(){var n=e.observable(""),r={binding:null,observable:e.observable("")},i={binding:null,observable:e.observable("")},s={binding:null,observable:e.observable("")},u={binding:null,observable:e.observable("")},a={binding:null,observable:e.observable("")},f={binding:null,observable:e.observable("")};return e.binding(n,r.observable,i.observable,s.observable,u.observable,a.observable,f.observable).compute(n,function(){var e=[];return r.observable()&&e.push(r.observable()),i.observable()&&e.push(i.observable()),s.observable()&&e.push(s.observable()),u.observable()&&e.push(u.observable()),a.observable()&&e.push(a.observable()),f.observable()&&e.push(f.observable()),e.join(" ")}).bind(),n.translate=function(i,s){return t(i)&&t(s)&&(r.observable("translate("+i()+","+s()+")"),r.binding=e.binding(r.observable,i,s).compute(r.observable,function(){return"translate("+i()+","+s()+")"}).bind()),n},n.scale=function(r,s){return t(r)&&t(s)&&(i.observable("scale("+r()+","+s()+")"),i.binding=e.binding(i.observable,r,s).compute(i.observable,function(){return"scale("+r()+","+s()+")"}).bind()),n},n.rotate=function(r,i,u){return t(r)&&(t(u)&&t(i)?(s.observable("rotate("+r()+","+i()+","+u()+")"),s.binding=e.binding(s.observable,r,i,u).compute(s.observable,function(){return"rotate("+r()+","+i()+","+u()+")"}).bind()):(s.observable("rotate("+r()+")"),s.binding=e.binding(s.observable,r).compute(s.observable,function(){return"rotate("+r()+")"}).bind())),n},n.skewX=function(r){return t(r)&&(u.observable("skewX("+r()+")"),u.binding=e.binding(u.observable,r).compute(u.observable,function(){return"skewX("+r()+")"}).bind()),n},n.skewY=function(r){return t(r)&&(a.observable("skewY("+r()+")"),a.binding=e.binding(a.observable,r).compute(a.observable,function(){return"skewY("+r()+")"}).bind()),n},n.matrix=function(r,i,s,u,a,l){return t(r)&&t(i)&&t(s)&&t(u)&&t(a)&&t(l)&&(f.observable("matrix("+r()+","+i()+","+s()+","+u()+","+a()+","+l()+")"),f.binding=e.binding(f.observable,r,i,s,u,a,l).compute(f.observable,function(){return"matrix("+r()+","+i()+","+s()+","+u()+","+a()+","+l()+")"}).bind()),n},n}return n}),n("d3binding/shape/Rect",["d3binding/transform"],function(e){function t(t,n,r,i){this.x=sb.observable(t),this.y=sb.observable(n),this.width=sb.observable(r),this.height=sb.observable(i),this.color=sb.observable("red"),this.angle=sb.observable(0),this.cx=sb.observable(this.width()/2),this.cy=sb.observable(this.height()/2),sb.binding(this.x,this.y,this.width,this.height,this.cx,this.cy).computed(this.cx,function(){return this.width()/2})._(this.cy,function(){return this.height()/2}),this.transform=e().translate(this.x,this.y).rotate(this.angle,this.cx,this.cy)}return t}),n("d3binding/shape/Circle",["d3binding/transform"],function(e){function t(t,n,r){this.cx=sb.observable(t),this.cy=sb.observable(n),this.r=sb.observable(r),this.transform=e()}return t}),n("d3binding/shape/main",["d3binding/shape/Rect","d3binding/shape/Circle"],function(e,t){return{Rect:e,Circle:t}}),n("d3binding/main",["d3binding/binding","d3binding/transform","d3binding/shape/main"],function(e,t,n){return{binding:e,transform:t,shape:n}}),t("d3binding/main")})