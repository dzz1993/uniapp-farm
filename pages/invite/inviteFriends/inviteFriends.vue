<template>
	<view class="page">
		<view class="kaiTu">
		  <image :src="topPicUrl"></image>
		</view>
		<view class="huoTime">活动时间：{{startTime}} 至 {{endTime}}</view>

		<view class="di">
		  <view class="yao">
			<view>
			  本期已成功邀请人数:
			  <text>{{invite_num}}</text>人
			</view>
		  </view>
		  <text class="myRecord" @tap='myGiftList'>奖励记录</text>
		  <text class="rules" @tap="kaiguan">查看规则 ></text>
		  
		  <!-- #ifdef MP-WEIXIN -->
		  <button class='redBtn' open-type="share" :style="'background:url('+xcx_img_path+'greenbt.png); background-size: 100% 100%;'">立即送红包</button>
		  <!-- #endif -->
		  
		  <!-- #ifdef APP-PLUS -->
		  <button class='redBtn' :style="'background:url('+xcx_img_path+'greenbt.png); background-size: 100% 100%;'" @click="sendClick">立即送红包</button>
		  <!-- #endif -->
		  
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.xcx_img_path=this.xm_config.xcx_img_path;
			this.inviteFriend();
		},
		data() {
			return {
				xcx_img_path:'',
				startTime:'',
				endTime:'',
				invite_num:0,
				topPicUrl:'',
				shuang:'',
				yqymbt:'',
				shareTitle:'',
				shareImg:'',
				url:'',
				is_send:''
			}
		},
		methods: {
			inviteFriend: function(){
				var that = this;
				var param = {
				  user_id: this.globalData.user_info.userid,
				};
				this.xm_config.invite_friend(param).then(function(res){
					  uni.hideLoading();
					  that.parseInviteInfo(res);
				})
			},
			parseInviteInfo: function(res){
				if (res.data.status == 1) {
				  if (res.data.info != null && res.data.info.invite_friend_info != null){
					var tempInfo = res.data.info.invite_friend_info;
					this.topPicUrl = tempInfo.yqymbjtp;
					this.shuang = tempInfo.is_send;
					this.startTime = tempInfo.start_time;
					this.endTime = tempInfo.end_time;
					this.yqymbt = tempInfo.yqymbt;
					this.invite_num = tempInfo.succ_buy_people;
					this.shareTitle = tempInfo.share_end_title_xcx;
					this.shareImg = tempInfo.xcx_share_end_img;
					this.url = tempInfo.url;
					this.is_send = tempInfo.is_send;
				  }
				} else {
				  wx.showToast({
					title: res.data.msg,
					icon: "none"
				  })
				}
			},
			myGiftList: function(){
				uni.navigateTo({
					url:'../inviteList/inviteList'
				})
			},
			kaiguan: function(){
				uni.navigateTo({
					url:'../invite-rule/invite-rule'
				})
			},
			
			sendClick:function(){
				uni.showToast({
					title: '功能陆续开放中...',
					icon:"none"
				});
			}
			
		}
	}
</script>

<style>
	.page{
	  background-color: #fff;
	  margin-bottom: 20upx;
	}
	.kaiTu{
	  height:793upx;
	  position: relative;
	}

	.kaiTu image{
	  width:100%;
	  height:793upx;
	}
	.huoTime{
	  font-size: 25upx;
	  color:#333;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  margin-top: 70upx;
	  
	}

	.time-text{
	  font-size: 28upx;
	  color:#666;
	}


	.di{
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  margin-top: 20upx;
	}
	.hong{
	  font-size: 36upx;
	  color:#f66428;
	  margin-bottom: 20upx;
	}
	.yao{
	  font-size: 28upx;
	  color:#666;
	  margin-bottom: 20upx;
	  display: flex;
	  justify-content: center;
	}
	.myRecord{
	  color:#4EDAA7;
	  font-weight: 300;
	  border:1upx solid #4EDAA7;
	  font-size: 24upx;
	  padding: 3upx 10upx;
	  margin-bottom: 20upx;
	}
	.redBtn{
	  height:70upx;
	  line-height: 70upx;
	  background-color:#f66428;
	  color:#fff;
	  border:none;
	  width: 80%;
	  margin-top: 20upx;
	  font-size: 30upx;
	}
	.rules{
	  font-size: 28upx;
	  color:#333;
	}

	.shan{
	  position: fixed;
	  width:100%;
	  height:100%;
	  background-color: rgba(0,0,0,0.7);
	  top:0;
	  left:0;
	  z-index: 99;
	}

	.kuang{
	  background-color: #fff;
	  width:80%;
	  height:60%;
	  padding:30upx;
	  word-break: break-all;
	  margin:260upx auto 30upx;
	  border-radius: 20upx;
	  font-size: 28upx;
	  font-weight: 300;
	  color:#333;
	  overflow-y: auto;
	}

	.cha{
	  display: block;
	  margin:0 auto;
	  width:70upx;
	  height:70upx;
	}

	.hide{
	  display: none;
	}

	.hide-no{
	  visibility:hidden;
	}
	
	page {
		background: #FFFFFF;
	}
</style>
