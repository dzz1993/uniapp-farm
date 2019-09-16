<template>
	<view>
		<view class='cont-container'>
    <view class='container-list'>
      <block v-for="(item,index) in couponlist" :key="index">
        <view v-if="goodTotalPrice>=item.content_money" class='coupon-item-container' catchtap='onSelectCouponListClick' >
          <image v-if="item.active" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cheeck_yes.png' class='box-img'></image>
          <image v-else src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/check_no.png' class='box-img'></image>
          <view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh1.png');background-size: 100% 100%;">
            <view class='coupon-item-left'>
              <view class='coupon-item-price-des'>
                <view>
                  <text class='price'>{{item.reduce_money}}</text> 
                  <text v-if="item.type == 1" class='price-danwei'>枚</text> 
                  <text v-else class='price-danwei'>元</text>
                </view>
                <text class='coupon-youxiaoqi'>{{item.start_time}} - {{item.end_time}}</text>
                <text class='coupon-des'>{{item.description}}</text>
              </view>
            </view>
            <image src='../../static/icon/xiantiao.png' class='xiantiao-img'></image>
            <text  class='coupon-type'>{{item.type_name}}</text>
          </view>
        </view>

        <view v-else class='coupon-item-container' >
          <image v-if="item.active" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cheeck_yes.png' class='box-img'></image>
          <image v-else src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/check_no.png' class='box-img'></image>
          <view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh.png');background-size: 100% 100%;">
            <view class='coupon-item-left'>
              <view class='coupon-item-price-des'> 
                <view>
                  <text class='price-no'>{{item.reduce_money}}</text>
                  <text v-if="item.type == 1" class='price-danwei-no'>枚</text>
                  <text v-else class='price-danwei-no'>元</text>
                </view>
                <text class='coupon-youxiaoqi-no'>{{item.start_time}} - {{item.end_time}}</text>
                <text class='coupon-des-no'>{{item.description}}</text>
              </view>
            </view>
            <image src='../../static/icon/xiantiao.png' class='xiantiao-img'></image>
            <text  class='coupon-type'>{{item.type_name}}</text>
          </view>
        </view>
      </block>
    </view>

    <view class='container-list1'>
      <block v-for="(item,index) in freightlist" :key="index">
        <view  class='coupon-item-container' catchtap='onSelectFreightListClick'>
          <image v-if="item.active" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cheeck_yes.png' class='box-img'></image>
          <image v-else src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/check_no.png' class='box-img'></image>
          <view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh1.png');background-size: 100% 100%;">
            <view class='coupon-item-left'>
              <view class='coupon-item-price-des'>
                <view>
                  <text class='price'>{{item.reduce_money}}</text>
                  <text v-if="item.type == 1" class='price-danwei'>枚</text>
                  <text v-else class='price-danwei'>元</text>
                </view>
                <text class='coupon-youxiaoqi'>{{item.start_time}} - {{item.end_time}}</text>
                <text class='coupon-des'>{{item.description}}</text>
              </view>
            </view>
            <image src='/image/xiantiao.png' class='xiantiao-img'></image>
            <text  class='coupon-type'>{{item.type_name}}</text>
          </view>
        </view>

        
      </block>
    </view>

    <view v-if="isShowBtn" class='use-text'>
    	<text catchtap='onGoUseClick'>立即使用</text>
    </view>
    
    <view v-if="!isShowNoList" class='tiShi'>
    	<image class="noCard" src="https://m.aoyifarm.com/Application/wx_img/notfound.png"></image>
    	<view>无可用的优惠券</view>
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
			
		}
	}
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cont-container {
  padding-bottom: 140rpx;
}

.container-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20rpx;
}

.container-list1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20rpx;
}

.coupon-item-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20rpx;
  flex: 1;
  margin-left: 20rpx;
}

.coupon-item-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 20rpx 20rpx 20rpx;
}

.coupon-item-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-left: 10rpx;
}

.box-img {
  width: 45rpx;
  height: 45rpx;
}

.coupon-item-price-des {
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 70rpx;
  color: #ff7e00;
  font-weight: 500;
}

.price-no {
  font-size: 70rpx;
  color: #c2c2c2;
  font-weight: 500;
}

.price-danwei {
  font-size: 32rpx;
  color: #ff7e00;
  font-weight: 550;
}

.price-danwei-no {
  font-size: 32rpx;
  color: #c2c2c2;
  font-weight: 550;
}

.coupon-youxiaoqi {
  font-size: 22rpx;
  color: #666;
}

.coupon-youxiaoqi-no {
  font-size: 22rpx;
  color: #c2c2c2;
}

.coupon-des {
  font-size: 27rpx;
  color: #333;
}

.coupon-des-no {
  font-size: 27rpx;
  color: #c2c2c2;
}

.coupon-type {
  font-size: 35rpx;
  color: #ff7e00;
  margin-left: 30rpx;
  margin-right: 30rpx;
}

.coupon-type-no {
  font-size: 35rpx;
  color: #c2c2c2;
  margin-left: 30rpx;
  margin-right: 30rpx;
}

.xiantiao-img {
  width: 1px;
  height: 150rpx;
}

.use-text {
  position: fixed;
  bottom: 0rpx;
  left: 0rpx;
  width: 100%;
  height: 130rpx;
  background-color: #f8f8f8;
  display: none;
}

.use-text text {
  display: block;
  font-size: 32rpx;
  color: #fff;
  background: #ff7e00;
  border-radius: 60rpx;
  padding-top: 15rpx;
  padding-bottom: 15rpx;
  text-align: center;
  margin: 30rpx 80rpx 0rpx 80rpx;
}

.tiShi {
  padding-top: 200rpx;
  width: 250rpx;
  height: 200rpx;
  margin: 0rpx auto;
  text-align: center;
  color: #999;
  font-weight: 300;
}

.noCard {
  width: 200rpx;
  height: 190rpx;
}

.hide {
  display: none;
}

.show {
  display: block;
}

</style>
