<template>
	<view class='con-container'>
		<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/succcess.png' class='img-suc'></image>
		<view class='tifh'>提交成功，注意查收</view>

		<!-- <view class='zdfh-container'>
			<view class='ms'>{{countDownNum}}s</view>
			<text>后自动返回</text>
		</view>
 -->
		<view class='jjfh' @click="onGoBackClick">
			<text>立即返回</text>
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
			onGoBackClick: function() {
				wx.navigateBack({

				})
			}
		}
	}
</script>

<style>
	.img-suc {
		width: 124rpx;
		height: 124rpx;
		margin-top: 100rpx;
	}

	.con-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.jjfh {
		display: flex;
		border: 2rpx solid #5ad8a9;
		width: 677rpx;
		height: 70rpx;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #5ad8a9;
		border-radius: 6rpx;

	}

	.tifh {
		color: #5ad8a9;
		font-size: 35rpx;
		margin-top: 50rpx;
	}

	.ms {
		border: 2rpx solid #999;
		height: 80rpx;
		width: 80rpx;
		border-radius: 80rpx;
		color: #999;
		align-items: center;
		display: flex;
		justify-content: center;
		font-size: 30rpx;
		margin-right: 30rpx;
	}

	.zdfh-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #999;
		margin-top: 100rpx;
		margin-bottom: 40rpx;
	}
</style>
