<template>
	<view class="page">
		<view class="page-container">
		  <image class="money-image" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/money.png"></image>
		  <text class="text-1">总资产</text>
		  <view class="balance-container">
			<text class="text-2">{{balance}}</text>
			<text class="text-3">元</text>
		  </view>

		  <view class="bottom-btn" style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/greenbtn.png');background-size: 100% 100%;" @click='onCzClick'>微信充值</view>
		  
		  <view class="bottom-btn" style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/greenbtn.png');background-size: 100% 100%;" @click='onCzkClick'>充值卡充值</view>
		  <text class="detail-btn" @click="onDetailClick">明细></text>
		  <text class="bottom-text" @click="onQuestionClick">常见问题</text> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance:0
			}
		},
		
		onShow() {
			this.getMyBanlance();
		},
		methods: {
			getMyBanlance: function(){
				var that = this;
				var param = {
				  user_id: this.globalData.user_info.userid,
				};
				this.xm_config.get_my_balance(param).then(function(res){
					  uni.hideLoading();
					  if(res.data.status == 1){
						if(res.data.info != null && res.data.info.balance != null){
						  that.balance = res.data.info.balance;
						}else {
						  that.balance = 0
						}
					  }else {
						uni.showToast({
						  title: res.data.msg,
						})
					  }
				})
			},
			onQuestionClick: function(){
				uni.navigateTo({
					url:"../recharge-question/recharge-question"
				})
			},
			onCzClick: function(){
				uni.navigateTo({
					url:"../recharge-pay/recharge-pay"
				})
			},
			onCzkClick:function(){
				uni.navigateTo({
					url:"../czk_card/czk_card"
				})
			},
			
			onDetailClick:function(){
				uni.navigateTo({
					url:"../recharge-consume-list/recharge-consume-list"
				})
			}
			
		}
	}
</script>

<style>
	.page-container{
	  display: flex;
	  flex-direction: column;
	  align-items:center;
	  flex: 1;
	}

	.text-1{
	  font-size: 30upx;
	  color: #333333;
	}

	.text-2{
	  font-size: 60upx;
	  color: #333333;
	}

	.text-3{
	  font-size: 36upx;
	  color: #333333;
	  margin-bottom:14upx;
	}


	.detail-btn{
	  font-size: 24upx;
	  color: #b2b2b2;
	  padding: 0 80upx 90upx 80upx;
	}

	.bottom-btn{
	  display:flex;
	  align-items: center;
	  width:620upx;
	  height:80upx;
	  color: #FFFFFF;
	  justify-content:center;
	  margin:20upx;
	}

	.money-image{
	  width:348upx;
	  height:380upx;
	  margin:70upx 0 50upx 0;
	}

	.balance-container{
	  display: flex;
	  flex-direction: row;
	  align-items:flex-end;
	  margin-bottom:30upx;
	}

	.bottom-text{
	  font-size: 25upx;
	  color: #4242DE;
	  /*margin-top: 60upx ;*/
	}
	page {
    background: #ffffff;
  }
</style>
