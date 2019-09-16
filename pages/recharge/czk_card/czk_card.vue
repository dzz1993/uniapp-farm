<template>
	<view class="page">
	  <view class='hr'></view>
	  <view class='item-container'>
		<image class="left-img" :src="xcx_img_path+'k2x.png'"></image>
		<text>卡号：</text>
		<input class="input" type="number" placeholder="请输入卡号" @input ="getCardNum"></input>
	  </view>
	  <view class='item-container'>
		<image class="left-img" :src="xcx_img_path+'mima.png'"></image>
		<text>密码：</text>
		<input class="input" type="number" placeholder="请输入密码"  password="true"  @input ="getCardPwd"></input>
	  </view>
	  <text class='add-text' @tap='onAddCardClick'>充值</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardNum:'',
				cardPwd:'',
				xcx_img_path:this.xm_config.xcx_img_path
			}
		},
		methods: {
			onAddCardClick:function(){
			//获取用户输入的密码
			if (this.cardNum == "" || this.cardNum == null) {
			  uni.showToast({
				title: '请输入充值卡号',
				icon: "none"
			  })
			  return;
			}
			if (this.cardPwd == "" || this.cardPwd == null) {
			  uni.showToast({
				title: '请输入充值卡密码',
				icon: "none"
			  })
			  return
			}
			this.check_deposit_card();
		  },
		  check_deposit_card: function(){
			  var that = this;
			  var param = {
				  user_id: this.globalData.user_info.userid,
				  card_num: this.cardNum,
				  card_passwd: this.cardPwd
			  }
			  this.xm_config.check_deposit_card(param).then(function(res){
				  uni.showLoading({
					  title: '加载中...',
				  })
				  that.parserInfoData(res);
			  })
		  },
		  parserInfoData: function(res){
			  if (res.data.status == 1) {
			  uni.showToast({
				title: '充值成功',
				icon: "none"
			  })
			  uni.navigateBack({})
			} else {
			  uni.showToast({
				title: res.data.msg,
				icon: "none"
			  })
			}
		  },
		  getCardNum: function(e){
			  this.cardNum = e.detail.value;
		  },
		  getCardPwd: function(e){
			  this.cardPwd = e.detail.value;
		  },
		  
		  
		}
	}
</script>

<style>
.page{
	background-color:#F8F8F8;
	font-size:32upx;
	line-height:1.6;
}
.item-container{
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 20upx;
  margin-bottom: 1upx;
  align-items: center;
}

.input{
  display: flex;
  flex: 1;
}

.hr {
  width: 100%;
  height: 20upx;
  background: #f8f8f8;
}

.left-img{
  width: 45upx;
  height: 35upx;
  margin-right: 20upx;
}

.add-text{  
  display: block;
  font-size: 32upx;
  color: #fff;
  background: #4EDAA7;
  border-radius: 60upx;
  padding-top: 15upx;
  padding-bottom: 15upx;
  text-align: center;
  margin: 50upx 120upx 0upx 120upx;
}              
</style>
