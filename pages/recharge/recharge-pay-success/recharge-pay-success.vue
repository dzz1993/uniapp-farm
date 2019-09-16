<template>
	<view>
		<view class="page-container">
			<view class="successImgContainer">
				<image class="successImg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/czSuccess.png"></image>
			</view>
			<text class="tips">
				快去集市买买买吧！
			</text>
			<view class="jishi" catchtap="onGoFinishClick">
				<text class="jishi-text">
					逛逛集市
				</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			onGoFinishClick: function() {
				uni.switchTab({
					url: '../../home-market/home-market',
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

}

.successImgContainer{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
}

.successImg{
  width: 100%;
}

.xuancai{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400rpx;
  height: 60rpx;
  border-radius:30rpx;
  border:4rpx solid #4dd9a8;
  margin-bottom:45rpx;


}


.tips{
  margin-bottom:40rpx;
  margin-top:-100rpx;
  font-size:28rpx;
  color: #7d7d7d;

}

.jishi{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400rpx;
  height: 60rpx;
  border-radius:30rpx;
  border:4rpx solid #f2a780;
}

.xuancai-text{
  color: #4dd9a8;
  font-size: 35rpx;
  margin-bottom:50rpx;

}

.jishi-text{
  color: #f2a780;
  font-size: 35rpx;
  margin-bottom:50rpx;

}



.pop-view {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 10000;
  display:flex;
  justify-content:center;
  align-items:center;
}

.pop-image{
  width: 750rpx;
  height: 750rpx;
}

.image-container{
  display: flex;
  flex-direction: column;
}


.close-btn{
  width:50rpx;
  height:50rpx;
  position:relative;
  top:67rpx;
  left:630rpx;


}

.img-btn{
  background:rgba(255,255,255,0);
  width:150rpx;
  height:140rpx;
  position:relative;
  top:-257rpx;
  opacity:0;

}


</style>
