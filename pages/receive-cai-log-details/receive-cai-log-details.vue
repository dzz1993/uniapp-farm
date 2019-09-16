<template>
	<view>
		<view class='address-container' catchtap='onSelectAddressClick'>
			<image class="address-top-img" src='https://m.aoyifarm.com/Application/wx_img/center/zhy_shoucai_tiaowen.png'></image>
			<view class='address-details-container'>
				<image class='address-tip-img' src='https://m.aoyifarm.com/Application/wx_img/center/zhy_shoucai_dizhi.png'></image>
				<view class="address-receiver-container">
					<view class='address-re-phone-container'>
						<text class="address-text">收货人：{{send_detail_info.receive_name}}</text>
						<text class="address-text">{{send_detail_info.receive_phone}}</text>
					</view>
					<text class="address-details-text">收货地址：{{send_detail_info.address}}</text>
				</view>
				<image class="jietou-img" src="https://m.aoyifarm.com/Application/wx_img/jian.png" hidden='true'></image>
			</view>
		</view>

		<view class='item-container'>
			<view class='item-view'>
				<view class='item-left'>
					<image class="zx-img" :src="send_detail_info.pic"></image>
					<text>{{vegtablefield_show_name}} 第{{send_detail_info.harvest_count}}次收菜</text>
				</view>
				<text></text>
			</view>

			<view class='item-view'>
				<text>运单状态</text>
				<text v-if="send_detail_info.status == 0" class='wl-statue'>待派送</text>
				<text v-if="send_detail_info.status == 1" class='wl-statue'>派送中</text>
				<text v-if="send_detail_info.status == 2" class='wl-statue'>已完成</text>
			</view>

			<view class='item-view'>
				<text>物流单号：{{send_detail_info.expresses_number?send_detail_info.expresses_number:'暂无'}}</text>
				<text class='btn-style' @click="goLogistics(send_detail_info)">查看物流</text>
			</view>

			<view class='item-view'>
				<text>送菜时间</text>
				<text>{{send_detail_info.harvest_date}} {{send_detail_info.date_time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vegtablefield_show_name: '',
				send_detail_info:''
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var id = options.id;
			var vegtablefield_show_name = options.vegtablefield_show_name;
			this.vegtablefield_show_name = vegtablefield_show_name;
			this.harvest_record_details(id);
		},
		methods: {
			// 获取收菜详情
			harvest_record_details(id) {

				var that = this;
				var param = {
					harvest_id: id,
				}

				this.xm_config.send_vegtable_detail(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.detail_info != null) {

								if (res.data.info.detail_info.weight > 0) {
									res.data.info.detail_info.weight = parseFloat(res.data.info.detail_info.weight).toFixed(2) + "斤"
								} else {
									res.data.info.detail_info.weight = "待称重"
								}
								that.send_detail_info = res.data.info.detail_info;
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//页面点击效果
			goLogistics: function(item) {
				var item = item;
				uni.navigateTo({
					url: '../logistics/logistics?id=' + item.id + '&name=' + item.expresses_name + '&num=' + item.expresses_number +
						'&name_text=' + item.express_name_text,
				})

			},
		}
	}
</script>

<style>
	.address-container {
		display: flex;
		flex-direction: column;
		background: #fff;
	}

	.address-top-img {
		height: 20rpx;
		width: 100%;
	}

	.address-details-container {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		justify-content: space-between;
		align-items: center;
	}

	.address-tip-img {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.jietou-img {
		width: 25rpx;
		height: 35rpx;
		margin-left: 20rpx;
	}

	.address-receiver-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.address-re-phone-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.address-text {
		color: #333;
		font-size: 28rpx;
		font-weight: 300;
	}

	.address-details-text {
		color: #333;
		font-size: 28rpx;
		font-weight: 300;
		margin-top: 15rpx;
	}

	.item-view {
		color: #333;
		font-size: 28rpx;
		font-weight: 300;
		padding: 20rpx;
		border-top: 1px solid #f8f8f8;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.item-left {
		display: flex;
		align-items: center;
	}

	.item-container {
		background: #fff;
		margin-top: 15rpx;
	}

	.zx-img {
		width: 150rpx;
		height: 150rpx;
		margin-right: 20rpx;
	}

	.btn-style {
		font-size: 26rpx;
		background: #fff;
		padding: 3rpx 20rpx;
		border-radius: 30rpx;
		color: #85DFA3;
		border: 1.5rpx solid #85DFA3;
	}

	.wl-statue {
		font-size: 30rpx;
		color: #85DFA3;
	}
</style>
