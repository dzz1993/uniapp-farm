<template>
	<view class="page">
		<view class='item-container  dr' @click='onHeadImgClick'>
			<text>头像</text>
			<view class='right-container'>
				<image class="head-img" v-if="headImgUrl" :src='headImgUrl'></image>
				<image class="head-img" v-else src='https://m.aoyifarm.com/Application/wx_img/center/grzx_default_user_icon.png'></image>
				<image class="jiantou-img" src='https://m.aoyifarm.com/Application/wx_img/jian.png'></image>
			</view>
		</view>
		<view class='hr'></view>
		<view class='item-container' @click='onChangeNameClick'>
			<text>菜地名</text>
			<view class='right-container'>
				<text>{{nickname}}</text>
				<image class="jiantou-img" src='https://m.aoyifarm.com/Application/wx_img/jian.png'></image>
			</view>
		</view>
		<view class='hr'></view>
		<view class='item-container' catchtap='onChangePhoneClick'>
			<text>{{phone}}</text>
			<view class='right-container'>
				<!-- <text>更换</text>
				<image class="jiantou-img" src='https://m.aoyifarm.com/Application/wx_img/jian.png'></image> -->
			</view>
		</view>
		<view class='hr'></view>
		<view class='item-container' @click="onAboutClick">
			<text>关于</text>
			<image class="jiantou-img" src='https://m.aoyifarm.com/Application/wx_img/jian.png'></image>
		</view>

		<!-- #ifdef APP-PLUS -->
		<text class="use-text" @click="exit_login">退出登录</text>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<text class="use-text" @click="btn_sure">解除绑定</text>
		<!-- #endif -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				headImgUrl: '',
				nickname: '',
				phone: ''
			}
		},
		onLoad() {
			var headImgUrl = null;
			var nickname = null;
			//头像
			if (this.globalData.user_info.headimgurl) {
				headImgUrl = this.utils.imageUrlUtils(this.globalData.user_info.headimgurl);
			}
			//昵称
			if (this.globalData.user_info.nickname) {
				nickname = this.globalData.user_info.nickname
			} else {
				nickname = this.globalData.user_info.xcx_nick_name
			}
			this.headImgUrl = headImgUrl;
			this.nickname = nickname;

			if (this.globalData.user_info.username) {
				this.phone = this.replacePhone(this.globalData.user_info.username);
			}

		},
		methods: {
			onAboutClick() {
				uni.navigateTo({
					url: '../about/about',
				});
			},

			replacePhone: function(phone) {
				var phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
				return phone;
			},

			btn_sure: function() {
				var that = this;
				uni.showModal({
					title: '解除绑定',
					content: '确定要解除微信绑定吗？',
					showCancel: true,
					success: function(res) {
						if (res.confirm) {
							that.unbangding();
						}
					},
				})


			},

			unbangding: function() {
				var param = {
					user_id: this.globalData.user_info.userid
				}
				this.xm_config.get_unbundling(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '解绑成功',
								icon: "none"
							})
							uni.switchTab({
								url: '../home-market/home-market',
							});

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			exit_login: function() {
				uni.setStorageSync('user_info', {});
				uni.reLaunch({
					url: '../home-market/home-market',
				})
			},

			//修改昵称
			onChangeNameClick: function() {
				uni.navigateTo({
					url: "../change-name/change-name"
				})
			},

			onHeadImgClick: function() {
				var that = this;
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths
						wx.navigateTo({
							url: '../../upload/upload?src=' + tempFilePaths[0],
						})


						that.uploadImg(tempFilePaths[0]);
					}
				})
			},

			uploadImg: function(filePath) {
				var that = this
				uni.showLoading({
					title: '加载中...',
				})
				uni.uploadFile({
					url: that.xm_config.modify_user_info,
					filePath: filePath,
					formData: that.utils.vc_encryp_param_fun({
						userid: that.globalData.user_info.userid
					}),
					name: 'headimgurl',
					success: function(res) {
						var data = JSON.parse(res.data);
						if (data.status == 1) {
							uni.hideLoading();
							uni.showToast({
								title: '修改成功',
								icon: "none"
							})
							that.headImgUrl = that.utils.imageUrlUtils(data.info.picaddress.headimgurl)
							that.globalData.user_info.headimgurl = that.headImgUrl
						} else {
							uni.showToast({
								title: data.msg,
								icon: "none"
							})
						}
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	.item-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #fff;
		padding: 20rpx 20rpx;
		align-items: center;
		color: #333;
		font-size: 30rpx;
		font-weight: 500;
		border-bottom: 1rpx solid #f2f2f4;
		.right-container {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.head-img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
		}

		.jiantou-img {
			width: 16rpx;
			height: 32rpx;
			margin-left: 15rpx;
		}


	}

	.dr {
		margin-top: 20rpx;
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
		position: fixed;
		width: 80%;
		left: 10%;
		bottom: 100rpx;
	}
</style>
