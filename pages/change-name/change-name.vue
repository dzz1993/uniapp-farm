<template>
	<view class="page">
		<view class='item-container'>
			<text>菜地名</text>
			<input class="input" type="text" placeholder="请输入菜地名称" @input="getCaidiName"></input>
		</view>
		<view class='img-container'>
			<image class="def-img" src='http://res.aoyifarm.com/20180720/5b51823cecade.png'></image>
		</view>

		<text class="use-text" @click="onSaveClick">保存</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				caidiName: '',
			}
		},
		methods: {
			getCaidiName: function(e) {
				this.caidiName = e.detail.value
			},

			onSaveClick: function() {
				//获取用户输入的密码
				if (this.caidiName == "" || this.caidiName == null) {
					uni.showToast({
						title: '请输入菜地名称',
						icon: "none"
					})
					return;
				}

				this.modify_user_nickname();
			},

			//修改菜地名
			modify_user_nickname: function() {
				var that = this;
				var param = {
					userid: this.globalData.user_info.userid,
					nickname: this.caidiName
				}
				this.xm_config.modify_user_nickname(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '修改成功',
								icon: "none"
							})
							that.globalData.user_info.nickname = that.caidiName;
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

<style>
	.item-container {
		display: flex;
		flex-direction: row;
		background: #fff;
		margin-top: 20rpx;
		padding: 20rpx;
		color: #333;
		font-weight: 500;
	}

	.shuoming {
		color: #666;
		font-size: 28rpx;
		padding: 20rpx;
	}

	.input {
		font-size: 28rpx;
		margin-left: 20rpx;
		flex: 1;
		display: flex;
	}

	.use-text {
		display: block;
		font-size: 32rpx;
		color: #fff;
		background: #85DFA3;
		border-radius: 60rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		text-align: center;
		margin: 50rpx 120rpx 0rpx 120rpx;
	}

	.def-img {
		width: 300rpx;
		height: 260rpx;
	}

	.img-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.page{
		flex-direction: column;
		display: flex;
		background-color: #f3f6fb;
		width: 100%;
		/* #ifdef APP-PLUS */
		height: 100%;
		/* #endif */
	}
</style>
