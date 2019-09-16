<template>
	<view class='rule-container'>
	  <view class="wxParse">
		<rich-text class="richText" :nodes="yqymgz"></rich-text>
	  </view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.get_activity_rule();
		},
		data() {
			return {
				yqymgz:''
			}
		},
		methods: {
			get_activity_rule: function(){
				var that=this;
				var param = {
				  user_id: this.globalData.user_info.userid,
				};
				this.xm_config.invite_friend(param).then(function(res){
					that.parseactivityrule(res);
				})
			},
			parseactivityrule: function(res){
				uni.hideLoading();
				if (res.data.status == 1) {
				  if (res.data.info != null && res.data.info.invite_friend_info) {
					//WxParse.wxParse('article', 'html', res.data.info.invite_friend_info.yqymgz, this, 0);
					this.yqymgz = res.data.info.invite_friend_info.yqymgz;
				  }
				} else {
				  uni.showToast({
					title: res.data.msg
				  })
				}
			}
		}
	}
</script>

<style>
.rule-container{
  padding: 0 30rpx;
}

page {
	background: #FFFFFF;
}
</style>
