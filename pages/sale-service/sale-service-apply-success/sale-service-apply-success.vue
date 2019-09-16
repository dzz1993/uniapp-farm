<template>
	<view>
		<view class='top-success'>
		    <image class='img-success' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/greenGou3.png'></image>
		    <text class='pay-success-text'>售后服务单提交成功</text>
		    <text class='pay-success-time'>申请时间：{{com_time}}</text>
		    <text class='pay-success-id'>服务单号：{{id}}</text>
		  </view>
		
		  <view class='btn-container'>
		    <text class='look-detail' @click='onLookDetailsClick'>查看详情</text>
		    <text class='home' @click='onHomeClick'>返回首页</text>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				com_time:''
			}
		},
		
		  /**
		   * 生命周期函数--监听页面加载
		   */
		  onLoad: function (options) {
		    var id = options.id;
		    var com_time = options.com_time;
		    this.com_time = com_time;
		    this.id = id;
		  },
		
		methods: {
			onLookDetailsClick:function(){
			    uni.redirectTo({
			      url: '../sale-service-apply-details/sale-service-apply-details?id=' + this.id,
			    })
			  },
			
			  onHomeClick:function(){
			    uni.reLaunch({
			    	url: '/pages/home-market/home-market',
			    })
			  }
		}
	}
</script>

<style>
.img-success{
  width: 120rpx;
  height: 120rpx;
}

.pay-success-text{
  margin-top: 30rpx;
  color: #0FDB48;
  font-size: 35rpx;
}

.pay-success-time{
  color: #0FDB48;
  font-size: 30rpx;
}

.pay-success-id{
  color: #cfd8e1;
  font-size: 28rpx;
}

page{
  background: #fff;
}

.top-success{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80rpx;
  margin-bottom: 180rpx;
}

.btn-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.look-detail{
  background: #fff;
  color: #FF8800;
  text-align: center;
  padding: 10rpx 30rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
  border:  2rpx solid #FF8800;
}

.home{
  background: #fff;
  color: #FF8800;
  text-align: center;
  padding: 10rpx 30rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
  margin-left: 50rpx;
  border:  2rpx solid #FF8800;
}
</style>
