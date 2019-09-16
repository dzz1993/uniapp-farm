<template>
	<view>
		<view class="page-container">
			<block v-for="(item,index) in quanyiDescription" :key="index">
				<view class="title">
					<image :src="item.img"></image>
					<text>{{item.title}}</text>
				</view>
				<text class="content">{{item.content}}</text>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quanyiDescription: {}
			}
		},

		onLoad(options) {
			if (options.quanyiDescription) {
				this.quanyiDescription = JSON.parse(options.quanyiDescription)
			}
		},
		methods: {

		}
	}
</script>

<style>
	.page-container {
		background: #f2f5fa;
		display: flex;
		flex-direction: column;
	}

	.title {
		display: flex;
		background: #f2f5fa;
		flex-direction: row;
		padding: 10rpx;
		color: #6b6c70;
		padding: 10rpx;
		font-size: 30rpx;
		align-items: center;


	}

	.title>image {
		width: 60rpx;
		height: 60rpx;
		margin-right: 30rpx;
		margin-left: 20rpx
	}

	.content {
		background: #ffffff;
		font-size: 25rpx;
		color: #a9a9a9;
		padding: 25rpx;

	}
</style>
