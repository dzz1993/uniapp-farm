<template>
	<view class="page">
		<view class='content-input'>
			<textarea @input="bindTextAreaBlur" maxlength="100" placeholder="请留下您的宝贵意见或建议，我们会努力改进！（100个字以内）"></textarea>
		</view>
		<text class='submit-text' @click="submit">提交</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ""
			}
		},
		methods: {
			bindTextAreaBlur: function(e) {
				this.content = e.detail.value
			},

			//提交
			submit() {

				if (!this.content) {
					uni.showToast({
						title: "请输入反馈内容",
						icon: "none"
					})
					return;
				}

				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					content: this.content
				}
				this.xm_config.add_advice(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							uni.navigateBack({

							})

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

<style lang="scss">
	.content-input {
		height: 400rpx;
		background: #fff;
		white-space: normal;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 8rpx;
	}

	.submit-text {
		font-size: 32rpx;
		color: #fff;
		background: #4EDAA7;
		border-radius: 60rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		text-align: center;
		display: block;
		margin: 60rpx 100rpx 0rpx 100rpx;
	}
	.page{
		flex-direction: column;
		display: flex;
		background-color: #f3f6fb;
		position: absolute;
		width: 100%;
		/* #ifdef APP-PLUS */
		height: 100%;
		/* #endif */
	}
</style>
