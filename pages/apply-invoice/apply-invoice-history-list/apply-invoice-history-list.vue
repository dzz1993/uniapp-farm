<template>
	<view>
		<view class='item-list-container'>
			<block v-for="(item,index) in invoiceHistoryList" :key="index">
				<view class='item-container' @click="onItemClick(item)">
					<view class='item-left'>
						<text class="apply-date">{{item.apply_date}}</text>
						<text class="invoice-class">{{item.invoice_class}}</text>
					</view>
					<view class="item-right">
						<text class="order-status">{{item.status_name}}></text>
						<text class="order-total">￥{{item.order_total}}</text>
					</view>
				</view>
			</block>

			<view class='tiShi' v-if="!isShowNoList">
				<image class="noCard" src="https://m.aoyifarm.com/Application/wx_img/notfound.png"></image>
				<view>暂无发票</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invoiceHistoryList: [],
				isShowNoList: false
			}
		},

		onLoad() {
			this.get_invoice_history_new();
		},
		methods: {
			get_invoice_history_new() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					pagenum: 50,
				}
				this.xm_config.get_invoice_history_new(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								this.invoiceHistoryList = res.data.info;
								this.isShowNoList = res.data.info.length > 0 ? false : true;
							} else {
								this.isShowNoList = true;
								this.invoiceHistoryList = []
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})

							this.isShowNoList = true;
							this.invoiceHistoryList = []
						}

					});
			},

			onItemClick: function(e) {
				var item = e.currentTarget.dataset.item;
				if (item != null) {
					wx.navigateTo({
						url: "../apply-invoice-history-details/apply-invoice-history-details?id=" + item.id
					})
				}
			}
		}
	}
</script>

<style>
	.item-list-container {
		display: flex;
		flex-direction: column;
	}

	.item-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		background: #fff;
		font-size: 28rpx;
		font-weight: 500;
		color: #333;
		border-bottom: 5rpx solid #f2f5fa;
	}


	.item-left {
		display: flex;
		flex-direction: column;

	}

	.apply-date {
		color: #a1a1a1;
		font-size: 27rpx;
	}

	.invoice-class {
		margin-top: 10rpx;
		font-size: 27rpx;
		color: #6e6e6e;
	}

	.item-right {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.order-status {
		font-size: 27rpx;
		text-align: right;
		color: #8c8c8c;
	}

	.order-total {
		margin-top: 10rpx;
		color: #cb542c;
		font-size: 30rpx;
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
</style>
