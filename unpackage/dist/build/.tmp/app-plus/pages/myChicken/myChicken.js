(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myChicken/myChicken"],{"0531":function(e,i,t){"use strict";var n=t("6d24"),_=t.n(n);_.a},3616:function(e,i,t){"use strict";var n=function(){var e=this,i=e.$createElement;e._self._c},_=[];t.d(i,"a",function(){return n}),t.d(i,"b",function(){return _})},"6d24":function(e,i,t){},"79f7":function(e,i,t){"use strict";(function(e,t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{current_select_id:"",my_chicken_list:"",current_chicken_info:"",video_url:"",current_video_tab:0,is_send:"",eggs_log:"",index:0}},onLoad:function(e){var i=e.id;null!=i&&(this.current_select_id=i),this.get_my_chicken_list()},methods:{onWuLiuClick:function(i){i&&e.navigateTo({url:"../logistics/logistics?&name="+i.expresses_name+"&num="+i.expresses_number+"&name_text="+i.express_name_text})},onTabVideoClick:function(e){e=e;this.current_video_tab=e,this.current_chicken_info.quan_video_url||(this.current_chicken_info.quan_video_url="https://sssss"),this.current_chicken_info.feeding_video_url||(this.current_chicken_info.feeding_video_url="https://sssss"),this.video_url=0==e?this.current_chicken_info.quan_video_url:this.current_chicken_info.feeding_video_url},onEggLogClick:function(){e.navigateTo({url:"../receive-egg-log/receive-egg-log?period_number_id="+this.current_select_id})},get_my_chicken_list:function(){var i=this,t={user_id:this.globalData.user_info.userid};this.xm_config.get_my_chicken_list(t).then(function(t){if(1==t.data.status){if(null!=t.data.info&&null!=t.data.info.my_chicken_list&&0!=t.data.info.my_chicken_list.length){if(null==i.current_select_id||""==i.current_select_id)t.data.info.my_chicken_list[0].info_ment.quan_video_url||(t.data.info.my_chicken_list[0].info_ment.quan_video_url="https://sssss"),i.my_chicken_list=t.data.info.my_chicken_list,i.current_chicken_info=t.data.info.my_chicken_list[0].info_ment,i.video_url=t.data.info.my_chicken_list[0].info_ment.quan_video_url,i.current_video_tab=0;else{var n=!0,_=!1,s=void 0;try{for(var o,c=t.data.info.my_chicken_list[Symbol.iterator]();!(n=(o=c.next()).done);n=!0){var r=o.value;if(r.info_ment.period_number_id==i.current_select_id){r.info_ment.quan_video_url||(r.info_ment.quan_video_url="https://sssss"),i.my_chicken_list=t.data.info.my_chicken_list,i.current_chicken_info=r.info_ment,i.video_url=r.info_ment.quan_video_url,i.current_video_tab=0;break}}}catch(a){_=!0,s=a}finally{try{n||null==c.return||c.return()}finally{if(_)throw s}}}i.get_future_egg_log_by_priodnumid()}}else e.showToast({title:t.data.msg,icon:"none"})})},get_future_egg_log_by_priodnumid:function(){var i=this,t={user_id:this.globalData.user_info.userid,period_number_id:this.current_select_id};this.xm_config.get_future_egg_log_by_priodnumid(t).then(function(t){1==t.data.status?null!=t.data.info&&(i.is_send=t.data.info.is_send,i.eggs_log=t.data.info.eggs_log):e.showToast({title:t.data.msg,icon:"none"})})},onTabSelect:function(e){this.index=e,this.my_chicken_list[e].info_ment.quan_video_url||(this.my_chicken_list[e].info_ment.quan_video_url="https://sssss"),this.current_chicken_info=this.my_chicken_list[e].info_ment,this.current_select_id=this.my_chicken_list[e].info_ment.period_number_id,this.video_url=this.my_chicken_list[e].info_ment.quan_video_url,this.current_video_tab=0,this.get_future_egg_log_by_priodnumid()},onChangeAddressClick:function(){e.navigateTo({url:"../address/select-address-list-baoyou/select-address-list-baoyou?from_page=1&vegetablefield_id=0&from_page_function=1&address_type=0&period_number_id="+this.current_select_id})},onSendPeoClick:function(i){this.egg_log_id=i.id,e.navigateTo({url:"../address/select-address-list-baoyou/select-address-list-baoyou?from_page=1&vegetablefield_id=0&from_page_function=2&address_type=0&period_number_id="+this.current_select_id})},onSelectDateClick:function(i){i=i;this.egg_log_id=i.id;i.res_group_text.substring(0,10);var t={start_time:i.res_group_text.substring(0,10),close_time:i.close_time+"".substring(0,10),text_dex:i.update_date_text};e.navigateTo({url:"../select-calendar/select-calendar?param="+JSON.stringify(t)})},setSendTime:function(i){i=i;var t={egg_log_id:this.egg_log_id,date:i.re},n=this;this.xm_config.update_chicken_send_date(t).then(function(i){1==i.data.status?(e.showToast({title:"设置成功",icon:"none"}),n.get_future_egg_log_by_priodnumid(),e.navigateBack({})):e.showToast({title:i.data.msg,icon:"none"})})},setAddressInfo:function(e){if(1==e.from_page&&1==e.from_page_function){var i=this.index,n={address:e.region_name+e.city+e.address,phone:e.phone_mob,name:e.consignee};console.log(t(this.my_chicken_list," at pages\\myChicken\\myChicken.vue:486")),this.my_chicken_list[i].info_ment.user_address_info=n,this.my_chicken_list=this.my_chicken_list,this.current_chicken_info=this.my_chicken_list[i].info_ment,this.current_select_id=this.my_chicken_list[i].info_ment.period_number_id,this.update_chicken_address(e.id,this.current_select_id)}else 1==e.from_page&&2==e.from_page_function&&this.update_chicken_send_address(e.id)},update_chicken_address:function(i,t){var n={address_id:i,period_number_id:t};this.xm_config.update_chicken_address(n).then(function(i){1==i.data.status?e.showToast({title:"设置成功",icon:"none"}):e.showToast({title:i.data.msg,icon:"none"})})},update_chicken_send_address:function(i){var t=this,n={address_id:i,egg_log_id:this.egg_log_id};this.xm_config.update_chicken_send_address(n).then(function(i){1==i.data.status?(e.showToast({title:"成功送人",icon:"none"}),t.get_future_egg_log_by_priodnumid()):e.showToast({title:i.data.msg,icon:"none"})})}}};i.default=n}).call(this,t("6e42")["default"],t("0de9")["default"])},bf79:function(e,i,t){"use strict";t.r(i);var n=t("79f7"),_=t.n(n);for(var s in n)"default"!==s&&function(e){t.d(i,e,function(){return n[e]})}(s);i["default"]=_.a},e593:function(e,i,t){"use strict";t.r(i);var n=t("3616"),_=t("bf79");for(var s in _)"default"!==s&&function(e){t.d(i,e,function(){return _[e]})}(s);t("0531");var o=t("2877"),c=Object(o["a"])(_["default"],n["a"],n["b"],!1,null,null,null);i["default"]=c.exports}},[["be2f","common/runtime","common/vendor"]]]);