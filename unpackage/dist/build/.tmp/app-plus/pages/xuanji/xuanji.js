(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/xuanji/xuanji"],{"0ade":function(t,n,i){"use strict";i.r(n);var e=i("e62e"),a=i("47fb");for(var c in a)"default"!==c&&function(t){i.d(n,t,function(){return a[t]})}(c);i("e1cc");var r=i("2877"),o=Object(r["a"])(a["default"],e["a"],e["b"],!1,null,null,null);n["default"]=o.exports},"47fb":function(t,n,i){"use strict";i.r(n);var e=i("6e2a"),a=i.n(e);for(var c in e)"default"!==c&&function(t){i.d(n,t,function(){return e[t]})}(c);n["default"]=a.a},"6e2a":function(t,n,i){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{chickInfo:{},shiPinSrc:"",chick_count:0,buyer_people_num:0,current_chickInfo:{},current_video_tab:0}},onLoad:function(){this.get_statistics_list()},methods:{get_statistics_list:function(){var n=this;this.xm_config.get_statistics_list().then(function(i){if(1==i.data.status){if(null!=i.data.info){var e="";for(var a in i.data.info.arr_list){var c=i.data.info.arr_list[a].chicken_house_status;if(2==c){e=i.data.info.arr_list[a].quan_video_url,n.current_chickInfo=i.data.info.arr_list[a];break}}n.shiPinSrc=e,n.chickInfo=i.data.info}}else t.showToast({title:i.data.msg,icon:"none"})})},jiPay:function(n,i){2==i&&t.navigateTo({url:"../select-pay-chicken/select-pay-chicken?period_id="+n})},onTabVideoClick:function(t){this.current_video_tab=t,this.shiPinSrc=0==t?this.current_chickInfo.quan_video_url:this.current_chickInfo.feeding_video_url}}};n.default=i}).call(this,i("6e42")["default"])},e1cc:function(t,n,i){"use strict";var e=i("fb96"),a=i.n(e);a.a},e62e:function(t,n,i){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},a=[];i.d(n,"a",function(){return e}),i.d(n,"b",function(){return a})},fb96:function(t,n,i){}},[["8b6e","common/runtime","common/vendor"]]]);