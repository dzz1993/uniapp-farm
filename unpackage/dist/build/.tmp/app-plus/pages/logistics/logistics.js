(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/logistics/logistics"],{"043b":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{traces:"",name:"",num:"",express_name_text:"",info:""}},onLoad:function(t){var n=t.name,e=t.num,a=t.name_text;a||(a="奥一农场"),"null"==e&&(e="暂无"),this.name=n,this.num=e,this.express_name_text=a,this.get_logistics(n,e)},methods:{get_logistics:function(n,e){var a=this;this.xm_config.get_logistics().then(function(n){if(1==n.data.status){if(null!=n.data.info&&null!=n.data.info.info&&0!=n.data.info.info.length)if(0!=n.data.info.info.Traces.length){var e=n.data.info.info.Traces.reverse();taht.traces=e}else a.info="--暂无物流信息--"}else t.showToast({title:n.data.msg,icon:"none"})})}}};n.default=e}).call(this,e("6e42")["default"])},"187b":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i})},"277a":function(t,n,e){},"3cf1":function(t,n,e){"use strict";var a=e("277a"),i=e.n(a);i.a},9549:function(t,n,e){"use strict";e.r(n);var a=e("043b"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=i.a},a72b:function(t,n,e){"use strict";e.r(n);var a=e("187b"),i=e("9549");for(var o in i)"default"!==o&&function(t){e.d(n,t,function(){return i[t]})}(o);e("3cf1");var s=e("2877"),u=Object(s["a"])(i["default"],a["a"],a["b"],!1,null,null,null);n["default"]=u.exports}},[["8ef7","common/runtime","common/vendor"]]]);