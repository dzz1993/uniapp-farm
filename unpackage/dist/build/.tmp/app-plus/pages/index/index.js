(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{3601:function(t,n,i){"use strict";i.r(n);var a=i("7624"),e=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(n,t,function(){return a[t]})}(o);n["default"]=e.a},"3f22":function(t,n,i){"use strict";var a=i("d967"),e=i.n(a);e.a},7624:function(t,n,i){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{carousel_list:[]}},onLoad:function(){this.activity_carousel_list()},methods:{activity_carousel_list:function(){var n=this,i={user_id:"17152"};this.xm_config.activity_carousel_list(i).then(function(i){if(1==i.data.status){for(var a in i.data.info.carousel_list)i.data.info.carousel_list[a].image=n.utils.imageUrlUtils(i.data.info.carousel_list[a].image);n.carousel_list=i.data.info.carousel_list}else t.showToast({title:i.data.msg,icon:"none"})})}}};n.default=i}).call(this,i("6e42")["default"])},d295:function(t,n,i){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},e=[];i.d(n,"a",function(){return a}),i.d(n,"b",function(){return e})},d967:function(t,n,i){},e217:function(t,n,i){"use strict";i.r(n);var a=i("d295"),e=i("3601");for(var o in e)"default"!==o&&function(t){i.d(n,t,function(){return e[t]})}(o);i("3f22");var u=i("2877"),s=Object(u["a"])(e["default"],a["a"],a["b"],!1,null,null,null);n["default"]=s.exports}},[["6db5","common/runtime","common/vendor"]]]);