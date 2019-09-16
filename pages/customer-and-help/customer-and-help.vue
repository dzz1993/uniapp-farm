<template>
	<view class="content-page">
		<view class='top-text-img' @click="onFeedbackClick">
			<text class='top-text'>自助服务</text>
			<image class='top-img' src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/adviseIcon.png"></image>
			<text class='advice-text'>反馈意见</text>
		</view>

		<view class='helpList-contrains'>
			<view class='top-text-img'>
				<text>帮助中心</text>
			</view>
			<block v-for="(item,index) in helpList" :key="index">
				<view class='person-center-contrains' @click="onTitleTap(index)">
					<view class='person-title-image'>
						<text class='center-title'>{{item.title}}</text>
						<image src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jiantouUp.png" class='person-image' v-if="item.isShowView"
						 @click="onTitleTap(index)"></image>
						<image src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jiantouDown.png" class='person-image' v-if="!item.isShowView"
						 @click="onTitleTap(index)"></image>
					</view>
					<view v-if="item.isShowView">
						<text class="center-content">{{item.content}}</text>
						<view class='img-container'>
							<image v-if="item.img" :src='item.img' class='img-content' mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				helpList: [],
				work_time: ''
			}
		},

		onLoad() {
			this.get_help();
		},
		methods: {
			//客服与帮助接口
			get_help() {
				var that = this;
				this.xm_config.get_help()
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.list != null) {
								for (var i = 0; i < res.data.info.list.length; i++) {
									res.data.info.list[i].isShowView = false;
								}
								that.helpList = res.data.info.list;
								that.work_time = res.data.info.work_time;
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onTitleTap: function(index) {
				var that = this;
				var index = index;
				for (var i = 0; i < this.helpList.length; i++) {
					if (i == index) {
						this.helpList[index].isShowView = !this.helpList[index].isShowView;
					} else {
						this.helpList[i].isShowView = false;
					}
				}
				this.helpList = this.helpList;
			},

			onFeedbackClick: function() {
				uni.navigateTo({
					url: '../feedback-advice/feedback-advice',
				})
			},
		}
	}
</script>

<style lang="scss">
	
	.content-page{
		background: #ffffff;
	}
	.top-text-img {
		display: flex;
		flex-direction: column;
		font-size: 36rpx;
		padding: 20rpx 20rpx 20rpx 20rpx;
		font-weight: bold;

		.top-img {
			width: 80rpx;
			height: 80rpx;
			margin-left: 40rpx;
			padding-top: 20rpx;
		}

		.advice-text {
			font-size: 20rpx;
			color: #999;
			margin-left: 40rpx;
			padding-top: 20rpx;
		}
	}

	.helpList-contrains {
		display: flex;
		flex-direction: column;
		margin-bottom: 30%;

		.top-text-img {
			display: flex;
			flex-direction: column;
			font-size: 36rpx;
			padding: 20rpx 20rpx 20rpx 20rpx;
			font-weight: bold;
		}

		.person-center-contrains {
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
			margin-right: 20rpx;

			.person-title-image {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 1rpx solid #f2f2f4;
				padding-top: 20rpx;
				padding-bottom: 20rpx;

				.center-title {
					font-size: 30rpx;
					color: #333;


				}

				.person-image {
					width: 30rpx;
					height: 30rpx;
				}

				.center-content {
					font-size: 28rpx;
					color: #666;
					padding-top: 20rpx;
				}

				.img-container {
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 20rpx 0;
				}

			}
		}
	}
</style>
