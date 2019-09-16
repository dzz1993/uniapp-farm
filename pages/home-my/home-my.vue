<template>
	<view class="page">
		<view class='home-my-contraint'>
			<!-- 头像，昵称，级别部分 -->
			<view class='home-my-top'>
				<image class="home-my-top-img" v-if="headImgUrl" :src='headImgUrl'></image>
				<image class="home-my-top-img" v-else src='https://m.aoyifarm.com/Application/wx_img/center/grzx_default_user_icon.png'></image>
				<view class='home-my-top-name-grade'>
					<text class='home-my-top-name' v-if="nickname">{{nickname}}</text>
					<text class='home-my-top-name' v-else>匿名</text>
					<text class='home-my-top-grade1' v-if="is_landowner == 1">地主</text>
					<text class='home-my-top-grade' v-else>普通用户</text>
				</view>
			</view>

			<!-- 我的订单部分 -->
			<view class='my-order-contrains'>
				<view class='my-order-checkAll' @click='onMyOrderLogClick' :data-index="0">
					<text>我的订单</text>
					<text class='my-order-check-all'>查看全部 ></text>
				</view>

				<view class="log-container">
					<view class='shoucai-log-container' @click='onMyOrderLogClick' :data-index="1">
						<image class="shoucai-log-img" :src="xm_page_img.waitpay"></image>
						<text class="shoucai-log-text">待支付</text>
					</view>
					<view class='shoucai-log-container' @click='onMyOrderLogClick' :data-index="2">
						<image class="shoucai-log-img" :src="xm_page_img.waitgoods"></image>
						<text class="shoucai-log-text">待收货</text>
						<!-- <view class="redPoint" >
							5
						</view> -->
					</view>
					<view class='shoucai-log-container' @click='onMyOrderLogClick' :data-index="3">
						<image class="shoucai-log-img" :src="xm_page_img.waitComment"></image>
						<text class="shoucai-log-text">待评价</text>
					</view>

					<view class='shoucai-log-container' @click='onMySaleLogClick'>
						<image class="shoucai-log-img" :src="xm_page_img.yxp"></image>
						<text class="shoucai-log-text">申请赔付</text>
					</view>
					<view class='shoucai-log-container' @click='onMyGroupClick'>
						<image class="shoucai-log-img" :src="xm_page_img.mygroup"></image>
						<text class="shoucai-log-text">我的团</text>
					</view>

				</view>

			</view>

			<!-- 我的农场部分 -->
			<view class='my-order-contrains'>
				<view class='my-order-checkAll'>
					<text>我的农场</text>
				</view>
				<view class="log-container">
					<view class='shoucai-log-container' @click="onShouCaiLogClick">
						<image class="shoucai-log-img" :src="xm_page_img.fruitlist"></image>
						<text class="shoucai-log-text">收菜记录</text>
					</view>
					<view class='shoucai-log-container' @click="onShouEggLogClick">
						<image class="shoucai-log-img" :src="xm_page_img.egglist"></image>
						<text class="shoucai-log-text">收蛋记录</text>
					</view>

					<view class='shoucai-log-container' @click="onAddressClick">
						<image class="shoucai-log-img" :src="xm_page_img.adressManager"></image>
						<text class="shoucai-log-text">地址管理</text>
					</view>

					<view class='shoucai-log-container' @click='onMyWalletClick'>
						<image class="shoucai-log-img" :src="xm_page_img.maicai_log"></image>
						<text class="shoucai-log-text">我的余额</text>
					</view>
				</view>
			</view>

			<!-- 邀请有礼部分 -->
			<view class='my-invite-contrains' style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/inviteBgImage.png') no-repeat; background-size: 100%,100%;">
				<view class='my-order-checkAll' @tap='onInviteFriendsClick'>
					<text>邀请有礼</text>
					<text class='my-invite-text'>前往邀请 ></text>
				</view>
			</view>

			<view class='my-home-bottom'>
				<view class='my-home-bottom-name-img' @click="myCouponsTapClick">
					<view class='bottom-img-text'>
						<image class='my-home-bottom-img' :src="xm_page_img.mycoupons"></image>
						<text>我的优惠券</text>
					</view>
					<image src='../../static/icon/jiantou-icon-right.png' class='jiatou'></image>
				</view>
				<view class='my-home-bottom-name-img' @click="onHeadImgClick">
					<view class='bottom-img-text'>
						<image class='my-home-bottom-img' :src="xm_page_img.accountManager"></image>
						<text>账户设置</text>
					</view>
					<image src='../../static/icon/jiantou-icon-right.png' class='jiatou'></image>
				</view>
				<view class='my-home-bottom-name-img' @click="onInvoiceClick">
					<view class='bottom-img-text'>
						<image class='my-home-bottom-img' :src="xm_page_img.fapiao"></image>
						<text>发票</text>
					</view>
					<image src='../../static/icon/jiantou-icon-right.png' class='jiatou'></image>
				</view>

				<view class='my-home-bottom-name-img' @click="onCustomerAndHelpClick">
					<view class='bottom-img-text'>
						<image class='my-home-bottom-img' :src="xm_page_img.customerAndHelp"></image>
						<text>客服与帮助</text>
					</view>
					<image src='../../static/icon/jiantou-icon-right.png' class='jiatou'></image>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xm_page_img: this.xm_page_img,
				headImgUrl: '',
				nickname: '',
				is_landowner: 0
			}
		},
		onLoad() {
			this.get_user_info();

		},

		
		onShow() {
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


			if (parseFloat(this.globalData.user_info.is_landowner) == 1) {
				this.is_landowner = 1;
			} else {
				this.is_landowner = 0;
			}
		},


		methods: {
			//订单列表
			onMyOrderLogClick(e) {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				var index = e.currentTarget.dataset.index;
				uni.navigateTo({
					url: '../order/order-my-version-log/order-my-version-log?currentType=' + index
				});
			},

			onShouCaiLogClick() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../receive-cai-new-log/receive-cai-new-log'
				});
			},

			onShouEggLogClick() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../receive-egg-log/receive-egg-log'
				});
			},
			//客服与帮助
			onCustomerAndHelpClick() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../customer-and-help/customer-and-help'
				});
			},
			//账户设置
			onHeadImgClick() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../setting/setting'
				});
			},
			//发票
			onInvoiceClick() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../apply-invoice/apply-invoice/apply-invoice'
				});
			},

			// 我的优惠券
			myCouponsTapClick: function() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../my-coupon-new-list/my-coupon-new-list',
				})
			},

			// 地址管理
			onAddressClick: function() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../address/address-list/address-list',
				})
			},
			//我的余额
			onMyWalletClick: function() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../recharge/recharge-remain-sum/recharge-remain-sum',
				})
			},
			//邀请有礼
			onInviteFriendsClick: function() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../invite/inviteFriends/inviteFriends',
				})
			},

			//申请赔付
			onMySaleLogClick: function() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../sale-service/sale-service-apply-list/sale-service-apply-list',
				})
			},

			//我的团
			onMyGroupClick: function() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../group-shop/group-shop-my-list/group-shop-my-list',
				})
			},

			//获取用户信息
			get_user_info() {
				var that = this;
				if (!that.globalData.user_info.userid) {
					return
				}

				var param = {
					userid: this.globalData.user_info.userid,
				}

				this.xm_config.get_user_info(param)
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

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},
			
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function() {
			
				this.get_user_info();
			},
			
		}
	}
</script>

<style lang="scss">
	.home-my-contraint {
		display: flex;
		flex-direction: column;
		padding: 10rpx 10rpx 0rpx 0rpx;

		.home-my-top {
			display: flex;
			flex-direction: row;
			height: 160rpx;
			align-items: center;
			background: #fff;
			box-shadow: 0px 5px 20px -5px #ddd;


			.home-my-top-img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 120rpx;
				margin-top: 15rpx;
				margin-bottom: 15rpx;
				margin-left: 20rpx;
			}

			.home-my-top-name-grade {
				display: flex;
				flex-direction: row;
				margin-left: 20rpx;
				align-items: center;

				.home-my-top-name {
					font-size: 35rpx;
					line-height: 30rpx;
				}

			}

			.home-my-top-grade {
				margin-left: 20rpx;
				font-size: 22rpx;
				background: #cfd6dd;
				color: #fff;
				width: 100rpx;
				border-radius: 25rpx;
				text-align: center;
				padding: 8rpx;
			}
		}
	}

	.my-order-contrains {
		display: flex;
		flex-direction: column;
		margin: 20rpx 20rpx 10rpx 20rpx;
		background: #fff;
		box-shadow: 0px 5px 20px -5px #ddd;
		border-radius: 15rpx;

		.my-order-checkAll {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			height: 60rpx;
			align-items: center;
			font-size: 28rpx;
			padding: 20rpx;

			.my-order-check-all {
				color: #cfd6dd;
				font-size: 25rpx;
			}

		}

		.log-container {
			display: flex;
			flex-direction: row;
			border-top: 1rpx solid #f2f2f4;

			.shoucai-log-container {
				display: flex;
				flex-direction: column;
				flex: 1;
				align-items: center;
				margin-top: 20rpx;
				position: relative;
				padding-bottom: 20rpx;


				.shoucai-log-img {
					width: 60rpx;
					height: 60rpx;
				}

				.shoucai-log-text {
					color: #333;
					font-size: 20rpx;
					margin-top: 10rpx;
					padding-bottom: 10rpx;
					font-weight: 300;
				}

				.redPoint {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					right: 60rpx;
					top: -3rpx;
					background-color: red;
					border-radius: 50%;
					color: white;
					font-size: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.my-invite-contrains {
		display: flex;
		flex-direction: column;
		margin: 20rpx 20rpx 10rpx 20rpx;
		background: #fff;
		box-shadow: 0px 5px 20px -5px #ddd;
		border-radius: 15rpx;


		.my-order-checkAll {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			height: 60rpx;
			align-items: center;
			font-size: 28rpx;
			padding: 20rpx;

			.my-invite-text {
				color: #fff;
				font-size: 25rpx;
			}

		}
	}

	.my-home-bottom {
		display: flex;
		flex-direction: column;
		margin: 10rpx 20rpx 20rpx 20rpx;
		box-shadow: 0px 5px 20px -5px #ddd;
		border-radius: 15rpx;
		background: #fff;

		.my-home-bottom-name-img {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			border-bottom: 2rpx solid #f2f2f4;
			height: 60rpx;
			align-items: center;
			font-size: 28rpx;
			padding: 20rpx;



			.bottom-img-text {
				display: flex;
				flex-direction: row;
				align-items: center;

				.my-home-bottom-img {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}

			.jiatou {
				width: 30rpx;
				height: 30rpx;
			}
		}


	}

	.home-my-top-grade1 {
		margin-left: 20rpx;
		font-size: 22rpx;
		background: #85DFA3;
		color: #fff;
		width: 100rpx;
		text-align: center;
		border-radius: 25rpx;
		padding: 8rpx;
	}
</style>
