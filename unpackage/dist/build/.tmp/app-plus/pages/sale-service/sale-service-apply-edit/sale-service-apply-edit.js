(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sale-service/sale-service-apply-edit/sale-service-apply-edit"],{"27ef":function(i,a,t){"use strict";t.r(a);var n=t("3e49"),e=t("72cb");for(var o in e)"default"!==o&&function(i){t.d(a,i,function(){return e[i]})}(o);t("74ac");var l=t("2877"),s=Object(l["a"])(e["default"],n["a"],n["b"],!1,null,null,null);a["default"]=s.exports},"3e49":function(i,a,t){"use strict";var n=function(){var i=this,a=i.$createElement;i._self._c},e=[];t.d(a,"a",function(){return n}),t.d(a,"b",function(){return e})},"67bc":function(i,a,t){},"72cb":function(i,a,t){"use strict";t.r(a);var n=t("9480"),e=t.n(n);for(var o in n)"default"!==o&&function(i){t.d(a,i,function(){return n[i]})}(o);a["default"]=e.a},"74ac":function(i,a,t){"use strict";var n=t("67bc"),e=t.n(n);e.a},9480:function(i,a,t){"use strict";(function(i){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var t={data:function(){return{picLeft:3,imgurls:[],uploadImgUrls:[],content:"",itemData:"",sale_detail:{},upHide:!0}},onLoad:function(i){var a=this,t=i.itemData;if(t){t=JSON.parse(t);t.goods_image=a.utils.imageUrlUtils(t.goods_image),a.itemData=t}this.getSaleDetailInfo()},methods:{getSaleDetailInfo:function(){var a={id:this.itemData.id,user_id:this.globalData.user_info.userid},t=this;i.showLoading({title:"加载中..."}),this.xm_config.compensation_info(a).then(function(i){wx.hideLoading(),1==i.data.status?null!=i.data.info&&null!=i.data.info.info&&(i.data.info.info.apply_img1&&(t.uploadImgUrls.push(i.data.info.info.apply_img1),i.data.info.info.apply_img1=t.utils.imageUrlUtils(i.data.info.info.apply_img1),t.imgurls.push(i.data.info.info.apply_img1)),i.data.info.info.apply_img2&&(t.uploadImgUrls.push(i.data.info.info.apply_img2),i.data.info.info.apply_img2=t.utils.imageUrlUtils(i.data.info.info.apply_img2),t.imgurls.push(i.data.info.info.apply_img2)),i.data.info.info.apply_img3&&(t.uploadImgUrls.push(i.data.info.info.apply_img3),i.data.info.info.apply_img3=t.utils.imageUrlUtils(i.data.info.info.apply_img3),t.imgurls.push(i.data.info.info.apply_img3)),t.sale_detail=i.data.info.info,t.picLeft=3-t.imgurls.length,0==t.picLeft?t.upHide=!0:t.upHide=!1,t.content=t.sale_detail.apply_reason):wx.showToast({title:i.data.msg})})},xuanTu:function(){var a=this,t=this.picLeft,n="";i.chooseImage({count:t,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(i){var t=i.tempFilePaths;for(var e in t)a.imgurls.push(t[e]);var o=3-a.imgurls.length;n=0==o,a.upHide=n,a.picLeft=o,a.uploadImg(t)}})},onImgClick:function(i){var a=i.currentTarget.dataset.src,t=this.imgurls;wx.previewImage({current:a,urls:t})},deletePic:function(i){var a=this,t=i.currentTarget.dataset.ind;a.imgurls.splice(t,1),a.uploadImgUrls.splice(t,1);var n=3-a.imgurls.length;a.upHide=!1,a.picLeft=n,a.imgurls=this.imgurls},uploadImg:function(a){var t=this,n="";for(var e in a)0==e?n="headimgurl1":1==e?n="headimgurl2":3==e&&(n="headimgurl3"),i.showLoading({title:"加载中..."}),i.uploadFile({url:t.xm_config.xcx_picture_upload,filePath:a[e],formData:t.utils.vc_encryp_param_fun(),name:n,success:function(a){i.hideLoading();var n=JSON.parse(a.data);t.uploadImgUrls.push(n.info),t.imgurls=t.imgurls,0}})},getContent:function(i){var a=i.detail.value;this.content=a},submit:function(){if(this.content.trim())if(0!=this.imgurls.length){var a={id:this.itemData.id,apply_reason:this.content};this.uploadImgUrls[0]?a.apply_img1=this.uploadImgUrls[0]:a.apply_img1=1,this.uploadImgUrls[1]?a.apply_img2=this.uploadImgUrls[1]:a.apply_img2=1,this.uploadImgUrls[2]?a.apply_img3=this.uploadImgUrls[2]:a.apply_img3=1,i.showLoading({title:"加载中..."}),this.xm_config.apply_compensation(a).then(function(a){i.hideLoading(),1==a.data.status?null!=a.data.info&&(i.showToast({icon:"none",title:a.data.msg}),i.redirectTo({url:"../sale-service-apply-success/sale-service-apply-success?id="+a.data.info.id+"&com_time="+a.data.info.com_time})):i.showToast({icon:"none",title:a.data.msg})})}else i.showToast({icon:"none",title:"请上传相关图片"});else i.showToast({icon:"none",title:"请输入问题描述"})}}};a.default=t}).call(this,t("6e42")["default"])}},[["6434","common/runtime","common/vendor"]]]);