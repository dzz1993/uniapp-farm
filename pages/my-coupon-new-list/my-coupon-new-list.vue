<template>
	<view class="page">
		<view class='page-container'>
			<view class="top-container-in">
				<view class='top-container'>
					<input class='input' type="text" placeholder="请输入兑换码" @input="inputCode"></input>
					<text class='change-num' @click='getCode'>兑换</text>
				</view>
				<view class="status-box">
					<view @click="statusTap(index)" v-for="(item,index) in statusType" :key="index">
						<view v-if="index == currentType" class="status-label active">
							{{item}}
						</view>
						<view v-else class="status-label">
							{{item}}
						</view>
					</view>
				</view>
			</view>

			<view class='container-list'>
				<block v-for="(item,index) in couponlist" :key="index">
					<view v-if="item.is_use == 0" class='coupon-item-container' catchtap='onSelectCouponClick'>
						<view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh1.png');background-size: 100% 100%;">
							<view class='coupon-item-left'>
								<view class='coupon-item-price-des'>
									<view>
										<text class='price'>{{item.reduce_money}}</text>
										<text class='price-danwei' v-if="item.type == 1">枚</text>
										<text class='price-danwei' v-if="item.type !=1">元</text>
									</view>
									<text class='coupon-youxiaoqi'>{{item.start_time}} - {{item.end_time}}</text>
									<text class='coupon-des'>{{item.description}}</text>
								</view>
							</view>
							<image src='../../static/icon/xiantiao.png' class='xiantiao-img'></image>
							<text class='coupon-type'>{{item.type_name}}</text>
						</view>

					</view>

					<view v-if="item.is_use == 1" class='coupon-item-container'>
						<view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh.png');background-size: 100% 100%;">
							<view class='coupon-item-left'>
								<view class='coupon-item-price-des'>
									<view>
										<text class='price-no'>{{item.reduce_money}}</text>
										<text class='price-danwei-no' v-if="item.type == 1">枚</text>
										<text class='price-danwei-no' v-if="item.type !=1 ">元</text>
									</view>
									<text class='coupon-youxiaoqi-no'>{{item.start_time}} - {{item.end_time}}</text>
									<text class='coupon-des-no'>{{item.description}}</text>
								</view>
							</view>
							<image src='../../static/icon/xiantiao.png' class='xiantiao-img'></image>
							<text class='coupon-type-no'>{{item.type_name}}</text>
						</view>
						<image class="statue-img" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/ysy2x.png"></image>
					</view>

					<view v-if="item.is_use == 2" class='coupon-item-container'>
						<view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh.png');background-size: 100% 100%;">
							<view class='coupon-item-left'>
								<view class='coupon-item-price-des'>
									<view>
										<text class='price-no'>{{item.reduce_money}}</text>
										<text class='price-danwei-no' v-if="item.type == 1">枚</text>
										<text class='price-danwei-no' v-if="item.type !=1">元</text>
									</view>
									<text class='coupon-youxiaoqi-no'>{{item.start_time}} - {{item.end_time}}</text>
									<text class='coupon-des-no'>{{item.description}}</text>
								</view>
							</view>
							<image src='../../static/icon/xiantiao.png' class='xiantiao-img'></image>
							<text class='coupon-type-no'>{{item.type_name}}</text>
						</view>
						<image class="statue-img" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/ygq2x.png"></image>
					</view>
				</block>
			</view>

			<view class='tiShi' v-if="isShowNoList">
				<image class="noCard" src="https://m.aoyifarm.com/Application/wx_img/notfound.png"></image>
				<view>暂无优惠券</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponlist: [],
				isShowNoList: true,
				currentType: 0,
				statusType: ["未使用", "已使用", "已过期"],
				code: ""
			}
		},

		onLoad() {
			this.select_all_coupon()
		},

		methods: {
			select_all_coupon() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					pagenum: 50,
					is_used: this.currentType,
				}

				this.xm_config.select_all_coupon(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.couponlist != null) {
								for (var idx in res.data.info.couponlist) {
									//处理数据
									res.data.info.couponlist[idx].content_money = parseFloat(res.data.info.couponlist[idx].content_money);
								}
								that.couponlist = res.data.info.couponlist;
								that.isShowNoList = res.data.info.couponlist.length > 0 ? false : true;

							} else {
								that.couponlist = [];
								that.isShowNoList = true;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							that.couponlist = [];
							that.isShowNoList = true;
						}
					});
			},


			statusTap: function(index) {
				var curType = index;
				this.currentType = curType;
				this.select_all_coupon()
			},

			// 请输入兑换码
			inputCode: function(e) {
				this.code = e.detail.value
			},


			getCode: function() {
				this.verify_my_code();
			},
			verify_my_code: function() {
				var that = this;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
				if (this.code == null || this.code == "") {
					uni.showToast({
						title: '请输入兑换码',
						icon: "none"
					})
					return;
				}

				var param = {
					code_str: this.code,
					user_id: this.globalData.user_info.userid,
				}
				this.xm_config.verify_my_code(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '兑换成功',
								// icon: "none"
							})
							that.currentType = 0;
							that.select_all_coupon();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});

			}
		}
	}
</script>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
	}

	.top-container-in {
		display: flex;
		flex-direction: column;
		position: fixed;
		z-index: 1000;
		width: 100%;
	}

	.top-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #fff;
		padding: 20rpx 20rpx;
		align-items: center;
		color: #333;
		font-size: 30rpx;
	}

	.input {
		display: flex;
		flex: 1;
		background: #fff;
		padding: 15rpx 20rpx;
		margin-top: 20rpx;
		font-size: 26rpx;
		margin-right: 30rpx;
		border: 1rpx solid #e4e4e4;
		border-radius: 35rpx;
	}

	.change-num {
		margin-top: 20rpx;
		background-color: #85DFA3;
		color: #fff;
		padding: 10rpx 40rpx;
		font-size: 30rpx;
		border-radius: 50rpx;
	}


	.status-box {
		/* width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100; */
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
	}

	.status-box .status-label {
		width: 150rpx;
		height: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #333;
		box-sizing: border-box;
		position: relative;
	}

	.status-box .status-label.active {
		color: #49D8A4;
		border-bottom: 6rpx solid #49D8A4;
	}

	.status-box .status-label .red-dot {
		width: 16rpx;
		height: 16rpx;
		position: absolute;
		left: 116rpx;
		top: 23rpx;
		background-color: #49D8A4;
		border-radius: 50%;
	}

	.container-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 270rpx;
	}

	.coupon-item-inner-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx;
		flex: 1;
	}

	.coupon-item-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 20rpx 20rpx 20rpx;
		position: relative;
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
		height: 100vh;
		;
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

	.statue-img {
		width: 180rpx;
		height: 180rpx;
		position: absolute;
		right: 0;
		top: 0;
		margin-right: 20rpx;
	}
</style>
