<template>
	<view>
		<view class="status-box">
			<view @click="statusTap(index)" class="status-label" v-for="(item,index) in statusType" :key="index" :class="{ active: index == currentType }">
				{{item}}
			</view>
		</view>

		<block v-if="currentType == 0">
			<view class="tiShi">
				<image class="noCard" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/nogroup.png"></image>
				<view>暂无进行中的团</view>
			</view>
		</block>
		<block v-else>
			<view class="tiShi">
				<image class="noCard" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/nogroup.png"></image>
				<view>暂无已结束的团</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusType: ["进行中", "已结束"],
				currentType: 0,
			}
		},
		methods: {
			statusTap: function(index) {
				var curType = index;
				this.currentType = curType
			},
		}
	}
</script>

<style>
	.status-box {
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
		font-size: 30rpx;
		color: #333;
		box-sizing: border-box;
		position: relative;
		font-weight: bold;
		display:flex;
		align-items: center;
		justify-content: center;
	}

	.status-box .status-label.active {
		color: #85cfa5;
		border-bottom: 6rpx solid #85cfa5;
		font-weight: bold;
		font-size: 30rpx;


	}

	.status-box .status-label .red-dot {
		width: 16rpx;
		height: 16rpx;
		position: absolute;
		left: 116rpx;
		top: 23rpx;
		background-color: #49d8a4;
		border-radius: 50%;
	}

	.item-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 30rpx 0;
	}

	.img-head {
		height: 90rpx;
		width: 90rpx;
		border-radius: 90rpx;
	}

	.img-comntainer {
		position: relative;
		width: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tip-bg {
		position: absolute;
		background: #5ddaa6;
		color: #fff;
		border-radius: 20rpx;
		font-size: 18rpx;
		width: 70rpx;
		padding: 5rpx;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sj-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		border-bottom: 1rpx solid #f4f4f4;
	}

	.item-list-container {
		display: flex;
		flex-direction: column;
		background: #fff;
		color: #333;
		font-size: 28rpx;
		padding-bottom: 20rpx;
		margin-bottom: 30rpx;

	}

	.crsm-comntainer {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
	}

	.btn-yq {
		background: #5ddaa6;
		width: 90%;
		margin: 0;
		padding: 0;
		color: #fff;
	}

	.btn-yq-gray {
		background: #5ddaa6;
		width: 90%;
		margin: 0;
		padding: 0;
		color: #fff;
		filter: grayscale(100%);
	}

	.rs-text {
		color: #EF3E1B;
		ont-size: 39rpx;
		margin-left: 5rpx;
		margin-right: 5rpx;

	}

	.r-text {
		margin-right: 15rpx;
	}

	.jxyq-container {
		display: flex;
		justify-content: center;
	}

	button::after {
		border: none;
	}


	.fq-text {
		font-size: 25rpx;
		color: #666666;

	}


	.tiShi {
		padding-top: 200rpx;
		width: 250rpx;
		height: 200rpx;
		margin: 0rpx auto;
		text-align: center;
		color: #999;
		font-weight: 300;
		margin-bottom: 40rpx;
	}

	.noCard {
		width: 200rpx;
		height: 190rpx;
	}

	.down-time-container {
		display: flex;
		flex-direction: row;
		font-size: 32rpx;
	}

	.time-bg {
		background: #323232;
		color: #fff;
		font-size: 28rpx;
		display: flex;
		padding: 0 8rpx;
		border-radius: 10rpx;
		align-items: center;
	}

	.jjs {
		margin-right: 20rpx;
	}

	.tian {
		margin: 0 7rpx;
	}


	/*使屏幕变暗 */

	.commodity_screen {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		opacity: 0.2;
		overflow: hidden;
		z-index: 1000;
		color: #fff;
	}

	/*对话框 */

	.commodity_attr_box {
		width: 100%;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2000;
		background: #fff;
	}

	.dialog-container {
		display: flex;
		flex-direction: column;
	}

	.wxzf {
		height: 60rpx;
		width: 60rpx;
	}

	.wxhy-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
		border-bottom: 1rpx solid #f4f4f4;
		font-size: 24rpx;
		color: #999;
	}

	.qxan {
		display: flex;
		padding: 20rpx;
		align-items: center;
		justify-content: center;
		color: #333;
		font-size: 30rpx;
	}

	.fxms {
		display: flex;
		padding: 20rpx;
		align-items: center;
		justify-content: center;
		color: #666;
		font-size: 28rpx;
	}


	.share-btn {
		display: flex;
		height: 100rpx;
		width: 100%;
		position: absolute;
		background: none;
		border: none;
		opacity: 0;
		margin: 0;
	}
</style>
