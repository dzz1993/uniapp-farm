<template>
	<view class="page">
		<view class='member-info-container'>
			<view class="user-info">
				<image class="head-img" :src="headImgUrl"></image>
				<view class="user-info-mid">
					<text class="use-name">{{nickname}}</text>
					<text class="member-type" v-if="!end_time">普通用户</text>
					<text class="member-type" v-else>{{end_time}}到期</text>
				</view>
			</view>

			<view class="top-container" @click="onQuanyiClick">
				<view class="top-one">
					<image class="top-img" :src="quanyi_intro.member_price.img"></image>
					<text class="top-txt">{{quanyi_intro.member_price.title}}</text>
				</view>

				<view class="top-one">
					<image class="top-img" :src="quanyi_intro.freight.img"></image>
					<text class="top-txt">{{quanyi_intro.freight.title}}</text>
				</view>

				<view class="top-one">
					<image class="top-img" :src="quanyi_intro.ticket.img"></image>
					<text class="top-txt">{{quanyi_intro.ticket.title}}</text>
				</view>
			</view>
			<view class="shuoming-container" @click="onQuanyiClick">
				<text>权益说明></text>
			</view>
		</view>

		<view class="se-item-active" catchtap='onSelectTab'>
			<view class='wz-container'>
				<text class='ndhy'>年度会员</text>
			</view>
			<view>
				<text class='hyj-rmb'>¥</text>
				<text class='hyj-text'>99</text>
			</view>
		</view>
		<view class='zhipayItem' v-if="current_tab_index!=0">
			<view class='zf-left'>
				<image src="https://m.aoyifarm.com/Application/wx_img/pay/wx.png" class="zfic"></image>
				<text>微信支付</text>
			</view>
			<image class='box-img' v-if="isPayCheck" src="http://res.aoyifarm.com/20180719/5b503e2fdf109.png" @click="payCheckboxChange"></image>
			<image class='box-img' v-else src="http://res.aoyifarm.com/20180719/5b503e1233104.png" @click="payCheckboxChange"></image>
		</view>

		<text class='ljzf' @click="surePay">立即支付</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quanyi_intro: "",
				quanyi_description: "",
				isPayCheck: true,
				order_id: null,
				headImgUrl: '',
				nickname: '',
				end_time: ''
			}
		},

		onLoad(options) {

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

			var end_time = options.end_time;
			this.end_time = end_time;

			this.pay_member_info();
		},
		methods: {
			pay_member_info() {
				var param = {
					user_id: this.globalData.user_info.userid,
				}
				var that = this;
				this.xm_config.pay_member_info(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.quanyi_intro = res.data.info.quanyi_intro;
								that.quanyi_description = res.data.info.quanyi_description;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onQuanyiClick: function() {
				uni.navigateTo({
					url: '../leaguer-benefit-rule/leaguer-benefit-rule?quanyiDescription=' + JSON.stringify(this.quanyi_description)
				})
			},

			//支付方式点击
			payCheckboxChange: function() {
				this.isPayCheck = !this.isPayCheck
			},

			surePay: function() {
				if (!this.isPayCheck) {
					uni.showToast({
						title: '请选择微信支付',
						icon: "none"
					})
					return;

				}

				this.add_order();

			},

			add_order() {
				var param = {
					user_id: 17152,
					pay_class: "2"
				}
				var that = this;
				this.xm_config.add_hy_order(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.order_id != null) {
								that.order_id = res.data.info.order_id

								that.getWxParam();
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			getWxParam() {
				var param = {
					order_id: this.order_id
				}

				// #ifdef APP-PLUS
				param.payment_code = "weixinapp";
				// #endif

				// #ifdef MP-WEIXIN
				param.payment_code = "weixinxcx";
				// #endif
				var that = this;
				this.xm_config.weixinxcx_add_order(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.pay_info != null) {
								// #ifdef APP-PLUS
								that.weixinappPay(res.data.info.pay_info)
								// #endif

								// #ifdef MP-WEIXIN
								that.weixinxcxPay(res.data.info.pay_info)
								// #endif
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			weixinxcxPay: function(data) {
				var that = this

				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: data.timeStamp + "",
					nonceStr: data.nonceStr,
					package: data.package,
					signType: 'MD5',
					paySign: data.sign,
					success: function(res) {
						uni.showToast({
							icon: "none",
							title: '支付成功'
						})

						uni.redirectTo({
							url: '../leaguer-pay-success/leaguer-pay-success',
						})
					},
					fail: function(res) {
						console.log(res);
						uni.showToast({
							icon: "none",
							title: '支付失败'
						})


					}
				})
			},

			//微信APP支付
			weixinappPay: function(data) {
				var that = this

				uni.requestPayment({
					provider: "wxpay",
					orderInfo: JSON.stringify({
						appid: data.appid, //应用ID,
						noncestr: data.noncestr, //随机字符串,
						package: data.package, // 固定值，以微信支付文档为主  
						partnerid: data.partnerid, //商户号,
						prepayid: data.prepayid, //预支付交易会话ID,
						timestamp: data.timestamp + "", //时间戳,
						sign: data.sign //签名 // 根据签名算法生成签名  
					}),
					success: function(res) {
						console.log(res);
						uni.showToast({
							icon: "none",
							title: '支付成功'
						})

						uni.redirectTo({
							url: '../leaguer-pay-success/leaguer-pay-success',
						})
					},
					fail: function(res) {
						console.log(res);
						uni.showToast({
							icon: "none",
							title: '支付失败'
						})


					}
				})
			},
		}
	}
</script>

<style>
	.member-info-container {
		height: 412rpx;
		background: #fff;
		margin: 20rpx 20rpx 80rpx 20rpx;
		display: flex;
		flex-direction: column;
		border-radius: 25rpx;
	}

	.user-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.user-info-mid {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		margin-right: 170rpx;
	}

	.head-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 66rpx;
		margin: 50rpx 30rpx 30rpx 18rpx;
	}

	.member-type {
		font-size: 25rpx;
		color: #a3a3a3;
		margin-top: 9rpx;
	}

	.top-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.top-img {
		width: 88rpx;
		height: 88rpx;
	}

	.top-txt {
		color: #a6a6a6;
		font-size: 25rpx;
		margin-top: 10rpx;
	}

	.top-one {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	.top-two {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 70rpx;
	}

	.top-three {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*margin-right: 20rpx;*/
	}

	.shuoming-container {
		color: #a6a6a6;
		font-size: 25rpx;
		align-items: center;
		margin-top: 15rpx;
		display: flex;
		justify-content: center;
	}

	.se-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx;
		padding: 15rpx 40rpx;
		background: url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/wxz1.png');
		background-size: 100% 100%;
	}

	.se-item-active {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx;
		padding: 15rpx 40rpx;
		background: url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/szk1.png');
		background-size: 100% 100%;
	}

	.wz-container {
		display: flex;
		flex-direction: column;
	}

	.ndhy {
		color: #333;
		font-size: 28rpx;
	}

	.tq {
		color: #a3a3a3;
		font-size: 24rpx;
	}

	.hyj-text {
		color: #3ab187;
		font-size: 35rpx;
	}

	.hyj-rmb {
		color: #3ab187;
		font-size: 26rpx;
		margin-right: 8rpx;
	}

	.zhipayItem {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx 40rpx;
		align-items: center;
		border-bottom: 1rpx solid #eff2f4;
		margin: 130rpx 0;
	}

	.zf-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #4b4b4b;
		font-size: 29rpx;
	}

	.zfic {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}

	.jt {
		width: 15rpx;
		height: 30rpx;
		margin-left: 20rpx;
	}

	.box-img {
		width: 40rpx;
		height: 40rpx;
	}

	.ljzf {
		background: #66dda6;
		color: #fff;
		display: flex;
		margin: 80rpx 40rpx 0 40rpx;
		align-items: center;
		justify-content: center;
		height: 80rpx;
	}
</style>
