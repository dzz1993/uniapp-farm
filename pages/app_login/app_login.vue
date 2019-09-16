<template>
	<view>
		<image class="top" src="https://m.aoyifarm.com/Application/wx_img/huo.png"></image>
		<view class="phone-login-container">
			<view class='input-view'>
				<input name="phone" class="input" maxlength="11" type="number" placeholder="手机号码" value="" @input="inputPhone" />
			</view>
			<view class='input-view'>
				<input name="code" class="input" maxlength="6" type="number" placeholder="验证码" value="" @input='inputCode' />
				<text class='huiBtn' @click='getCode'>{{getmsg}}</text>
			</view>
			<view class="btn-sure" @click='btn_sure'>立即登录</view>
		</view>
		<view class='bottom' @click="onGoXieyiClick">
			点击登录即表示已阅读并同意
			<text class='xieyi'>《奥一农场用地协议》</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				getmsg: "获取验证码",
				timer: 1
			}
		},
		methods: {
			inputPhone: function(e) {
				this.phone = e.detail.value
			},
			//获取验证码
			getCode() {
				var that = this;
				if (this.phone == null || this.phone == "") {
					uni.showToast({
						title: '请输入手机号',
						icon: "none"
					})
					return;
				}
				if (this.phone.indexOf("1") || this.phone.length != 11) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: "none"
					})
					return;
				}
				var code = this.utils.getCode(6);
				var param = {
					mobile_phone: this.phone,
					content: "验证码：" + code + "\n" + "  一一自己种，更放心！",
					code: code
				}
				if (this.timer == 1) {

					this.xm_config.getCodeSms(param)
						.then(function(res) {
							if (res.data.status == 1) {
								that.sendmessg();
								uni.showToast({
									title: '发送成功',
									icon: "none"
								})

							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						});
				}
			},

			btn_sure: function() {
				if (this.phone.indexOf("1") || this.phone.length != 11) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: "none"
					})
					return;
				}

				if (this.code.length != 6) {
					uni.showToast({
						title: '请输入6位数验证码',
						icon: "none"
					})
					return;
				}
				var param = {
					username: this.phone,
					v_code: this.code,
				}
				var that = this;
				this.xm_config.register(param)
					.then(function(res) {
						if (res.data.status == 1) {
							that.globalData.user_info = res.data.info.user_info;
							uni.setStorage({
								key: 'user_info',
								data: res.data.info.user_info,
								success: function() {
									console.log('success');
								}
							});
							uni.getStorage({
								key: 'user_info',
								success: function(res) {
									console.log(res.data);
								}
							});

							uni.reLaunch({
								url: "../home-market/home-market"
							}) 

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});

			},

			inputCode: function(e) {
				this.code = e.detail.value
			},

			/** 
			 * 获取短信验证码 
			 */
			sendmessg: function(e) {
				if (this.timer == 1) {
					this.timer = 0
					var that = this
					var time = 60
					var inter = setInterval(function() {
						that.getmsg = time + "s后重新发送"
						time--
						if (time < 0) {
							that.timer = 1
							clearInterval(inter)
							that.getmsg = "获取验证码"
						}
					}, 1000)
				}
			},

			onGoXieyiClick() {
				uni.navigateTo({
					url: '../web_page/web_page?web_url=' + this.xm_config.login_xieyi(),
				});
			}
		},



	}
</script>

<style lang="scss">
	.top {
		width: 100%;
		height: 320rpx;
	}

	.phone-login-container {
		margin-top: 40rpx;
		justify-content: center;

		.input-view {
			border-bottom: 1px solid #f8f8f8;
			font-size: 30rpx;
			padding: 0 20rpx;
			flex-direction: row;
			display: flex;
			align-items: center;

			.input {
				height: 80rpx;
				line-height: 80rpx;
				display: flex;
				flex: 1;
			}
		}

		.huiBtn {
			background-color: #f8f8f8;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			color: #777;
			padding: 0 20rpx;
			border-radius: 60rpx;
			font-size: 25rpx;
		}
	}

	.btn-sure {
		display: block;
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f66428;
		color: #fff;
		border: none;
		font-size: 30rpx;
		text-align: center;
		margin: 30rpx auto;
		border-radius: 8rpx;
	}

	.bottom {
		display: flex;
		flex-direction: row;
		color: #999;
		font-size: 25rpx;
		justify-content: center;
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 40rpx 0;

		.xieyi {
			color: #4242DE;
		}
	}
</style>
