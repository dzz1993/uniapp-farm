(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0f69":function(n,o,t){"use strict";t.r(o);var e=t("f65e"),a=t.n(e);for(var i in e)"default"!==i&&function(n){t.d(o,n,function(){return e[n]})}(i);o["default"]=a.a},"211c":function(n,o,t){},ece1:function(n,o,t){"use strict";var e=t("211c"),a=t.n(e);a.a},f65e:function(n,o,t){"use strict";(function(n,t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e={onLaunch:function(){var o=this,t=n.getStorageSync("user_info");t&&(o.globalData.user_info=t)},onShow:function(){console.log(t("App Show"," at App.vue:34"))},onHide:function(){console.log(t("App Hide"," at App.vue:37"))},methods:{get_xcx_userinfo:function(){var o=this;wx.login({success:function(t){var e={js_code:t.code,appid:o.xm_config.xm_wx_appid,app_type:"xcx"};o.xm_config.get_userinfo_bycode(e).then(function(t){1==t.data.status&&null!=t.data.info?(t.data.info.user_info&&(o.globalData.user_info=t.data.info.user_info),t.data.info.wx_xcx_info&&(o.globalData.wx_xcx_info=t.data.info.wx_xcx_info)):n.showToast({title:t.data.msg,icon:"none"})})}})}}};o.default=e}).call(this,t("6e42")["default"],t("0de9")["default"])},f814:function(n,o,t){"use strict";t.r(o);var e=t("0f69");for(var a in e)"default"!==a&&function(n){t.d(o,n,function(){return e[n]})}(a);t("ece1");var i,u,f=t("2877"),c=Object(f["a"])(e["default"],i,u,!1,null,null,null);o["default"]=c.exports}},[["5917","common/runtime","common/vendor"]]]);