(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pay-chicken-success/pay-chicken-success"],{2922:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{pay_success_info:""}},onLoad:function(n){var e=n.order_id;this.buychicken_order_detail_new(e)},methods:{buychicken_order_detail_new:function(e){var t={order_id:e},a=this;this.xm_config.buychicken_order_detail_new(t).then(function(e){1==e.data.status?null!=e.data.info&&(a.pay_success_info=e.data.info):n.showToast({title:e.data.msg,icon:"none"})})},OnGoMarket:function(){n.switchTab({url:"../home-market/home-market"})},OnGoField:function(){n.navigateTo({url:"../myChicken/myChicken?id="+this.pay_success_info.period_number_id})}}};e.default=t}).call(this,t("6e42")["default"])},"53a6":function(n,e,t){"use strict";t.r(e);var a=t("2922"),i=t.n(a);for(var c in a)"default"!==c&&function(n){t.d(e,n,function(){return a[n]})}(c);e["default"]=i.a},"7bff":function(n,e,t){},"7fb0":function(n,e,t){"use strict";t.r(e);var a=t("edbd"),i=t("53a6");for(var c in i)"default"!==c&&function(n){t.d(e,n,function(){return i[n]})}(c);t("a704");var o=t("2877"),u=Object(o["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=u.exports},a704:function(n,e,t){"use strict";var a=t("7bff"),i=t.n(a);i.a},edbd:function(n,e,t){"use strict";var a=function(){var n=this,e=n.$createElement;n._self._c},i=[];t.d(e,"a",function(){return a}),t.d(e,"b",function(){return i})}},[["5920","common/runtime","common/vendor"]]]);