(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/fee-pay-vegetable-field/fee-pay-vegetable-field"],{"32ca":function(i,e,t){"use strict";var a=t("e640"),n=t.n(a);n.a},ab89:function(i,e,t){"use strict";(function(i,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{headImgUrl:"",nickname:"",isXieyiCheck:!1,current_tab_index:1,buy_mode:1,disable_ticket:0,coupon_info:{},card_info:[],original_order_amount:0,reduce_money:0,pay_amount:0,card_ids:"",ticket_id:"",set_id:""}},onLoad:function(e){var t=null,a=null;this.globalData.user_info.headimgurl&&(t=this.utils.imageUrlUtils(this.globalData.user_info.headimgurl)),a=this.globalData.user_info.nickname?this.globalData.user_info.nickname:this.globalData.user_info.xcx_nick_name,this.headImgUrl=t,this.nickname=a,this.vegetablefield_id=e.vegetablefield_id||"",null!=e.is_year_month?this.is_year_month=e.is_year_month:i.showToast({title:"套餐类型传入失败",icon:"none"}),null!=e.set_id?this.set_id=e.set_id:i.showToast({title:"套餐类型传入失败",icon:"none"}),this.calc_maidiset_order_amount()},methods:{calc_maidiset_order_amount:function(){var e=this,t={user_id:this.globalData.user_info.userid,type:2,disable_ticket:this.disable_ticket,buy_mode:1==this.current_tab_index?1:2,set_id:this.set_id,vegetablefield_id:this.vegetablefield_id};""!=this.card_ids&&null!=this.card_ids&&(t.card_ids=this.card_ids),""!=this.ticket_id&&null!=this.ticket_id&&(t.ticket_id=this.ticket_id),this.xm_config.calc_maidiset_order_amount(t).then(function(t){1==t.data.status?null!=t.data.info?(e.original_order_amount=t.data.info.original_order_amount,e.reduce_money=t.data.info.reduce_money,e.pay_amount=t.data.info.pay_amount,e.card_info=e.card_info,null!=t.data.info.coupon_info?e.coupon_info=t.data.info.coupon_info:e.coupon_info={}):i.showToast({title:"订单金额计算失败",icon:"none"}):i.showToast({title:t.data.msg,icon:"none"})})},onGoXieyiClick:function(){i.navigateTo({url:"../field_pro/field_pro"})},xieyiCheckboxChange:function(i){this.isXieyiCheck=!this.isXieyiCheck},surePay:function(){this.isXieyiCheck?this.add_xufei_order():i.showToast({title:"请先勾选用地协议",icon:"none"})},add_xufei_order:function(){var e=this,t={user_id:this.globalData.user_info.userid,vegetablefield_id:this.vegetablefield_id,disable_ticket:this.disable_ticket,buy_mode:this.buy_mode};""!=this.card_ids&&null!=this.card_ids&&(t.card_ids=this.card_ids),""!=this.ticket_id&&null!=this.ticket_id&&(t.ticket_id=this.ticket_id),this.xm_config.add_xufei_order(t).then(function(t){1==t.data.status?null!=t.data.info&&(e.order_id=t.data.info.order_id,1==t.data.info.is_pay?e.getWxParam():i.redirectTo({url:"../pay-field-success/pay-field-success?order_id="+e.order_id})):i.showToast({title:t.data.msg,icon:"none"})})},getWxParam:function(){var e=this,t={order_id:this.order_id,payment_code:"weixinapp"};this.xm_config.weixinxcx_add_order(t).then(function(t){1==t.data.status?null!=t.data.info&&null!=t.data.info.pay_info&&e.weixinappPay(t.data.info.pay_info):i.showToast({title:t.data.msg,icon:"none"})})},weixinxcxPay:function(e){var a=this;console.log(t(e," at pages\\fee-pay-vegetable-field\\fee-pay-vegetable-field.vue:328")),i.requestPayment({provider:"wxpay",timeStamp:e.timeStamp+"",nonceStr:e.nonceStr,package:e.package,signType:"MD5",paySign:e.sign,success:function(e){i.redirectTo({url:"../pay-field-success/pay-field-success?order_id="+a.order_id})},fail:function(e){console.log(t(e," at pages\\fee-pay-vegetable-field\\fee-pay-vegetable-field.vue:343")),i.showToast({icon:"none",title:"支付失败"})}})},weixinappPay:function(e){var a=this;i.requestPayment({provider:"wxpay",orderInfo:JSON.stringify({appid:e.appid,noncestr:e.noncestr,package:e.package,partnerid:e.partnerid,prepayid:e.prepayid,timestamp:e.timestamp+"",sign:e.sign}),success:function(e){console.log(t(e," at pages\\fee-pay-vegetable-field\\fee-pay-vegetable-field.vue:370")),i.showToast({icon:"none",title:"支付成功"}),i.redirectTo({url:"../pay-field-success/pay-field-success?order_id="+a.order_id})},fail:function(e){console.log(t(e," at pages\\fee-pay-vegetable-field\\fee-pay-vegetable-field.vue:381")),i.showToast({icon:"none",title:"支付失败"})}})},onCunponClick:function(){i.navigateTo({url:"../select-coupon-pay-field/select-coupon-pay-field?couponInfo="+JSON.stringify(this.coupon_info)+"&goodTotalPrice="+this.original_order_amount+"&coupon_type=1&set_id="+this.set_id})},setCunponData:function(i){null==i?(this.disable_ticket=1,this.coupon_info={},delete this.data.ticket_id):(this.coupon_info=i,this.ticket_id=i.id,this.disable_ticket=0),this.calc_maidiset_order_amount()},goCardList:function(){var e=0;0==this.current_tab_index&&(e=3),i.navigateTo({url:"../paycards/paycards?type="+e+"&set_id="+this.set_id+"&num=1&choose="+this.card_ids})},setCardData:function(i,e){null!=i&&0!=i.length?(this.card_ids=JSON.parse(i),this.coupon_info={},this.ticket_id=""):delete this.card_ids,null!=e&&(this.card_info=e),this.calc_maidiset_order_amount()}}};e.default=a}).call(this,t("6e42")["default"],t("0de9")["default"])},d228:function(i,e,t){"use strict";var a=function(){var i=this,e=i.$createElement;i._self._c},n=[];t.d(e,"a",function(){return a}),t.d(e,"b",function(){return n})},e640:function(i,e,t){},f11d:function(i,e,t){"use strict";t.r(e);var a=t("ab89"),n=t.n(a);for(var o in a)"default"!==o&&function(i){t.d(e,i,function(){return a[i]})}(o);e["default"]=n.a},f1f5:function(i,e,t){"use strict";t.r(e);var a=t("d228"),n=t("f11d");for(var o in n)"default"!==o&&function(i){t.d(e,i,function(){return n[i]})}(o);t("32ca");var s=t("2877"),d=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=d.exports}},[["fd44","common/runtime","common/vendor"]]]);