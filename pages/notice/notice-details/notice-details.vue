<template>
	<view>
		<view class='notice-item'>
			<view class='notice-title-container'>
				<text class='notice-title'>{{notice_info.title}}</text>
				<text class='notice-time'>{{notice_info.add_time}}</text>
			</view>
			<view class='hr'></view>
			<view>
				<rich-text class="richText" :nodes="notice_info.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice_info: {}
			}
		},

		onLoad(options) {
			var noticeId = options.noticeId
			this.get_notice_detail(noticeId)
		},
		methods: {
			//获取公告详情页内容
			get_notice_detail(noticeId) {
				var that = this;
				var param = {
					notice_id: noticeId
				}
				this.xm_config.get_notice_detail(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.notice_info != null) {
								//修改图片数据
								res.data.info.notice_info.add_time = res.data.info.notice_info.add_time.substring(0, 10)
							}

							that.notice_info = res.data.info.notice_info

						} else {
							wx.showToast({
								title: res.data.msg,
								icon:"none"
							})
						}
					});
			},
		}
	}
</script>

<style lang="scss">
	.notice-item {
		display: flex;
		flex-direction: column;
		padding: 30rpx;



		.notice-title-container {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.notice-title {
				font-size: 32rpx;
				color: red;
			}

			.notice-time {
				font-size: 25rpx;
				color: #666;
				white-space: nowrap;
				margin-left: 30rpx;
			}
		}

		.hr {
			width: 100%;
			height: 1rpx;
			background: #f8f8f8;
			margin: 15rpx 0;
		}
	}
</style>
