<template>
	<view class="page">
		<block v-for="(item,index) in notice_list" :key="index">
			<view class='notice-item' @click="onItemClick(item.id)">
				<view class='notice-title-container'>
					<text class='notice-title'>{{item.title}}</text>
					<text class='notice-time'>{{item.add_time}}</text>
				</view>
				<view class='hr'></view>
				<text class='notice-content'>{{item.content}}</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice_list: []
			}
		},
		onLoad() {
			this.get_notice_info();
		},
		methods: {
			get_notice_info() {
				var that = this;
				this.xm_config.get_notice_info()
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.notice_list != null && res.data.info.notice_list.length != 0) {
								for (var idx in res.data.info.notice_list) {
									//修改图片数据
									res.data.info.notice_list[idx].add_time = res.data.info.notice_list[idx].add_time.substring(0, 10)
									var title = res.data.info.notice_list[idx].title
									if (title.length >= 12) {
										res.data.info.notice_list[idx].title = title.substring(0, 12) + "...";
									}
								}
								that.notice_list = res.data.info.notice_list
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onItemClick: function(id) {
				uni.navigateTo({
					url: "../notice-details/notice-details?noticeId=" + id,
				})
			},
		}
	}
</script>

<style>
	.notice-title-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		background: #fff;
		border-radius: 8rpx;
		margin: 15rpx 20rpx 0rpx 20rpx;
	}

	.notice-title {
		font-size: 32rpx;
		color: red;
	}

	.notice-time {
		font-size: 25rpx;
		color: #666;
	}

	.hr {
		width: 100%;
		height: 1rpx;
		background: #f8f8f8;
		margin: 15rpx 0;
	}

	.notice-content {
		font-size: 28rpx;
		color: #666;
	}
</style>
