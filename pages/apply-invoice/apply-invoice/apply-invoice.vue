<template>
	<view class="page">
		<view class='item-container dr' @click="onApplyInvoiceClick">
			<text>申请开票</text>
			<image class="jiantou-img" src='https://m.aoyifarm.com/Application/wx_img/jian.png'></image>
		</view>
		<view class='hr'></view>
		<view class='item-container' @click="onInvoiceHistoryClick">
			<text>开票历史</text>
			<image class="jiantou-img" src='https://m.aoyifarm.com/Application/wx_img/jian.png'></image>
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
			onApplyInvoiceClick: function() {
				wx.navigateTo({
					url: "../apply-invoice-list/apply-invoice-list"
				})
			},

			onInvoiceHistoryClick: function() {
				wx.navigateTo({
					url: "../apply-invoice-history-list/apply-invoice-history-list"
				})
			},

		}
	}
</script>

<style>
	.jiantou-img {
		width: 16rpx;
		height: 32rpx;
	}

	.item-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #fff;
		padding: 20rpx 20rpx;
		align-items: center;
		color: #333;
		font-size: 30rpx;
	}

	.dr {
		margin-top: 20rpx;
	}

	.hr {
		width: 100%;
		height: 1rpx;
		background: #f8f8f8;
	}
</style>
