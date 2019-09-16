<template>
	<view>
		<view class='page-contrainer'>
			<view class="info-container">
				<view class="top-img" style="background:url('http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/zfcg_top.png');background-size: 100% 100%;">
					<text class="top-1-text">支付成功</text>
					<text class="top-2-text">{{pay_success_info.price}}</text>
				</view>
				<view class="inner-container">
					<view class="tab-container">
						<text class="left-text">套餐类型</text>
						<text class="right-text">{{pay_success_info.set_name}}</text>
					</view>
					<view class="line"></view>
					<view class="tab-container">
						<text class="left-text">配送基地</text>
						<text class="right-text">{{pay_success_info.store_name}}</text>
					</view>
					<view class="line"></view>
					<view class="tab-container">
						<text class="left-text">配送日期</text>
						<text class="right-text">{{pay_success_info.send_day}}</text>
					</view>
					<view class="line"></view>
					<view class="tab-container">
						<text class="left-text">配送次数</text>
						<text class="right-text">{{pay_success_info.send_times}}次</text>
					</view>
				</view>
			</view>
			<view class="btm-button-1" style="background:url('http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/zfcg_bt2.png');background-size: 100% 100%;"
			 @click='OnGoField'>查看菜地</view>
			<view class="btm-button-2" style="background:url('http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/zfcg_bt1.png');background-size: 100% 100%;"
			 @click='OnGoMarket'>逛逛集市</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pay_success_info: ""
			}
		},

		onLoad(options) {
			var order_id = options.order_id;
			this.get_pay_success_info(order_id);
		},
		methods: {
			get_pay_success_info(order_id) {
				var param = {
					order_id: order_id
				}
				var that = this;
				this.xm_config.get_pay_success_info(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.pay_success_info = res.data.info
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},


			OnGoMarket: function() {
				uni.switchTab({
					url: '../home-market/home-market',
				})
			},

			OnGoField: function() {
				uni.redirectTo({
					url: '../myfield/myfield?id=' + this.pay_success_info.field_id,
				})
			},
		}
	}
</script>

<style>
	.page-contrainer {
		display: flex;
		flex-direction: column;
		padding: 20rpx 20rpx;
	}

	.top-contrainer {
		display: flex;
		flex-direction: column;
		padding: 20rpx 20rpx;
		align-items: center;
	}

	.farm-name {
		font-size: 35rpx;
	}

	.field-price {
		font-size: xx-large;
		font-weight: bolder;
	}

	.hr {
		margin-top: 10rpx;
		width: 100%;
		height: 2rpx;
		background-color: #f2f2f4;
	}

	.center-contrainer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex: 1;
		padding: 20rpx 20rpx;
	}

	.jidi {
		font-weight: bolder;
	}

	.setAdress {
		margin-top: 20%;
		padding: 20rpx 20rpx;
		background: #8ee1a2;
		color: #fff;
		text-align: center;
	}

	.info-container {
		display: flex;
		flex-direction: column;
		width: 691rpx;
		height: 682rpx;
		margin-top: 20rpx;
		margin-left: 10rpx;

	}

	.top-img {
		display: flex;
		flex-direction: column;
		height: 281rpx;
		align-items: center;
		color: #FFFFFF;

	}

	.top-1-text {
		margin-top: 142rpx;
		font-size: 30rpx;
	}

	.top-2-text {
		font-size: 52rpx;
		font-weight: bold;
	}

	.tab-container {
		display: flex;
		flex-direction: row;
		height: 99rpx;
		align-items: center;
		justify-content: space-between;
		padding-left: 21rpx;
		padding-right: 28rpx;
		font-size: 30rpx;
		font-weight: 400;

	}

	.line {
		height: 2px;
		background: #F2F2F2;
		width: 640rpx;
		margin-left: 22rpx;
	}

	.btm-button-1 {
		width: 700rpx;
		height: 88rpx;
		margin-top: 36rpx;
		align-items: center;
		display: flex;
		justify-content: center;
		color: #FFFFFF;
		font-size: 36rpx;
		font-weight: bold;

	}

	.btm-button-2 {
		width: 700rpx;
		height: 88rpx;
		margin-top: 20rpx;
		align-items: center;
		display: flex;
		justify-content: center;
		color: #FFFFFF;
		font-size: 36rpx;
		font-weight: bold;

	}


	.inner-container {
		background-color: #FFFFFF;
	}
</style>
