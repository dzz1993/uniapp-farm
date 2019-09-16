<template>
	<view>
		<view class="page-container">
			<text class="top-1">奥一农场</text>
			<text class="top-2">¥ {{order_info.order_amount}}</text>
			<!-- <text class='look-order' @click='onLookOrderClick'>查看订单</text> -->
			<text class='go-market' @click='onShopClick'>逛逛集市</text>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_id: '',
				order_info: '',
				goods_info: '',
				address_info: ''

			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var order_id = options.order_id
			this.order_id = order_id;
			this.getOrderDetailsInfo(order_id);

		},


		methods: {

			//获取订单详情
			getOrderDetailsInfo: function(order_id) {
				var that = this;
				var param = {
					order_id: order_id
				}
				this.xm_config.order_info(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.order_info = res.data.info.order;
								that.goods_info = res.data.info.goods;
								that.address_info = res.data.info.extm;

							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onShopClick: function(event) {
				uni.switchTab({
					url: '../home-market/home-market',
				})
			},

		}
	}
</script>

<style>
	.djs {
		color: #999;
		font-size: 25rpx;
		/*margin-top: 30rpx;*/
	}

	.page-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top-1 {
		font-size: 37rpx;
		margin-top: 50rpx;
	}

	.top-2 {
		font-size: 90rpx;
		margin-top: 30rpx;
		font-weight: bold;
		margin-bottom: 150rpx;

	}


	.look-order {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 400rpx;
		height: 66rpx;
		margin-bottom: 40rpx;
		border: 4rpx solid #4DD9A8;
		color: #4DD9A8;
		font-size: 30rpx;
		border-radius: 35rpx;

	}

	.go-market {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 400rpx;
		height: 66rpx;
		margin-bottom: 40rpx;
		border: 4rpx solid #F2A882;
		color: #F2A882;
		font-size: 30rpx;
		border-radius: 35rpx;

	}


	.pop-view {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		top: 0;
		left: 0;
		z-index: 10000;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pop-image {
		width: 606rpx;
		height: 490rpx;
		margin: 0 72rpx 0 72rpx;
	}

	.image-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}


	.close-btn {
		width: 60rpx;
		height: 60rpx;
		margin-top: -145rpx;


	}

	.img-btn {
		background: rgba(255, 255, 255, 0);
		width: 340rpx;
		height: 140rpx;
		position: relative;
		top: -157rpx;
		opacity: 0;

	}
</style>
