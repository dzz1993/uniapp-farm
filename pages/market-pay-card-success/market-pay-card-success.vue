<template>
	<view>
		<view class='pay-success'>
			<image class='img-success' src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/greenGou3.png'></image>
			<text class='pay-success-text'>支付成功</text>
			<view class='pay-text'>
				<view class='left-text'>
					<text class='dr-top'>支付方式：</text>
					<text class='dr-top'>支付金额：</text>
					<text class='dr-top'>优惠金额：</text>
				</view>
				<view class='right-text'>
					<text class='dr-top'>{{order_info.payment_name}}</text>
					<text class='dr-top'>¥ {{order_info.order_amount}}</text>
					<text class='dr-top'>¥ {{order_info.reduce_money}}</text>
				</view>
			</view>

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
		}
	}
</script>

<style>

</style>
