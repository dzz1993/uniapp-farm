<template>
	<view>
		<view class='head-top-container'>
			<image class="head-top-img" v-if='headImgUrl' :src='headImgUrl'></image>
			<image class="head-top-img" v-else src='https://m.aoyifarm.com/Application/wx_img/center/grzx_default_user_icon.png'></image>
			<text class='top-name'>{{nickname}}</text>
			<text class='top-grade-dz'>地主</text>
		</view>
		<view class='cont-container'>
			<view class='group'>
				<view class='group-title'>
					<text class='title-text'>续费套餐</text>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>套餐类型</text>
						<text v-if="set_id==1">家庭套餐</text>
						<text v-if="set_id==2">宝宝辅食套餐</text>
						<text v-if="set_id==3">全家福套餐</text>
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>购买时限</text>
						<view class='nx'>
							<view v-if="current_tab_index == 0&&set_id!=3 && is_year_month==1" class="select-tab-p" catchtap='onTabClick(0)'>1个月</view>

							<view v-if="current_tab_index == 1" class="select-tab-p" catchtap='onTabClick(1)'>1年</view>
						</view>
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>用地协议</text>
						<text class='ydxy' @click='onGoXieyiClick'>请阅读并同意></text>

						<image class='box-img' v-if="isXieyiCheck" src='http://res.aoyifarm.com/20180719/5b503e2fdf109.png' @click='xieyiCheckboxChange(index)'></image>

						<image class='box-img' v-else src='http://res.aoyifarm.com/20180719/5b503e1233104.png' @click='xieyiCheckboxChange(index)'></image>
					</view>
				</view>
			</view>

			<view class='group'>
				<view class='group-title'>
					<text class='title-text'>优惠券与礼品卡</text>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row' @click="onCunponClick">
						<text>优惠券</text>
						<view class="right">
							<text>{{coupon_info.name}}</text>
							<image class='goin-img' src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/goin.png"></image>
						</view>
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>礼品卡</text>
						<view class="right-box" @click="goCardList">
							<view class="right-group-container" v-for="(item,index) in card_info" :key="index">
								<text>{{item.card_name}}</text>
							</view>
							<image class='goin-img' src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/goin.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class='group'>
				<view class='group-title'>
					<text class='title-text'>订单</text>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>套餐金额</text>
						<text class='tips'>仅显示当前收货地区价格</text>
						<text>￥{{original_order_amount}}</text>
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>优惠券</text>
						<text>-￥{{reduce_money}}</text>
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>礼品卡</text>
						<view class="right-box">
							<view class="right-group-container" v-for="(item,index) in card_info" :key="index">
								<text>-¥{{item.card_price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pp-container"></view>
		</view>
		<view class="footer-row">
			<view class="footer-text">
				<text>还需支付 </text>
				<text>￥{{pay_amount}}</text>
			</view>
			<view class="footer-inner-row">
				<view class='zhifu' @click='surePay'>
					<text>确认支付</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headImgUrl: '',
				nickname: '',

				isXieyiCheck: false, //协议
				current_tab_index: 1, //购买时限  0：一个月  1：一年
				buy_mode: 1, //购买时限（调接口传参）
				disable_ticket: 0, //是否禁用优惠券 0不禁用 1禁用
				coupon_info: {}, //优惠券信息
				card_info: [], //礼品卡列表
				original_order_amount: 0, //套餐总金额
				reduce_money: 0, //券优惠金额
				pay_amount: 0, //实际支付金额
				card_ids: '', //礼品卡id 用,号分隔
				ticket_id: '', //优惠券id
				set_id: ''
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

			this.vegetablefield_id = options.vegetablefield_id || '';

			if (options.is_year_month != null) {
				this.is_year_month = options.is_year_month
			} else {
				uni.showToast({
					title: '套餐类型传入失败',
					icon: "none"
				})
			}
			if (options.set_id != null) {
				this.set_id = options.set_id;
			} else {
				uni.showToast({
					title: '套餐类型传入失败',
					icon: "none"
				})
			}


			this.calc_maidiset_order_amount();
		},
		methods: {
			//我的鸡详情
			calc_maidiset_order_amount: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					type: 2,
					disable_ticket: this.disable_ticket,
					buy_mode: this.current_tab_index == 1 ? 1 : 2,
					set_id: this.set_id,
					vegetablefield_id: this.vegetablefield_id,
				}

				if (this.card_ids != '' && this.card_ids != null) {
					param.card_ids = this.card_ids;
				}
				if (this.ticket_id != '' && this.ticket_id != null) {
					param.ticket_id = this.ticket_id;
				}
				this.xm_config.calc_maidiset_order_amount(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.original_order_amount = res.data.info.original_order_amount;
								that.reduce_money = res.data.info.reduce_money;
								that.pay_amount = res.data.info.pay_amount;
								that.card_info = that.card_info;
								if (res.data.info.coupon_info != null) {
									that.coupon_info = res.data.info.coupon_info;
								} else {
									that.coupon_info = {};
								}
							} else {
								uni.showToast({
									title: "订单金额计算失败",
									icon: "none"
								})
							}


						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//用地协议点击
			onGoXieyiClick: function() {
				uni.navigateTo({
					url: "../field_pro/field_pro"
				})
			},

			//同意协议点击
			xieyiCheckboxChange: function(e) {
				this.isXieyiCheck = !this.isXieyiCheck
			},

			surePay: function() {


				//判断用地协议
				if (!this.isXieyiCheck) {
					uni.showToast({
						title: '请先勾选用地协议',
						icon: "none"
					})
					return;
				}

				this.add_xufei_order();
			},

			//续费下单
			add_xufei_order: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					vegetablefield_id: this.vegetablefield_id,
					disable_ticket: this.disable_ticket,
					buy_mode: this.buy_mode,
				}
				if (this.card_ids != '' && this.card_ids != null) {
					param.card_ids = this.card_ids;
				}
				if (this.ticket_id != '' && this.ticket_id != null) {
					param.ticket_id = this.ticket_id;
				}

				this.xm_config.add_xufei_order(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.order_id = res.data.info.order_id;
								if (res.data.info.is_pay == 1) {
									// 微信支付
									that.getWxParam();
								} else {
									uni.redirectTo({
										url: '../pay-field-success/pay-field-success?order_id=' + that.order_id,
									})
								}
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//获取微信支付参数
			getWxParam: function() {
				var that = this;
				var param = {
					order_id: this.order_id
				}

				// #ifdef APP-PLUS
				param.payment_code = "weixinapp";
				// #endif

				// #ifdef MP-WEIXIN
				param.payment_code = "weixinxcx";
				// #endif

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
				console.log(data)
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: data.timeStamp + "",
					nonceStr: data.nonceStr,
					package: data.package,
					signType: 'MD5',
					paySign: data.sign,
					success: function(res) {
						uni.redirectTo({
							url: '../pay-field-success/pay-field-success?order_id=' + that.order_id,
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
							url: '../pay-field-success/pay-field-success?order_id=' + that.order_id,
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

			onCunponClick: function() {
				uni.navigateTo({
					url: '../select-coupon-pay-field/select-coupon-pay-field?couponInfo=' +
						JSON.stringify(this.coupon_info) +
						"&goodTotalPrice=" + this.original_order_amount +
						'&coupon_type=1' +
						'&set_id=' + this.set_id,
				})
			},

			//设置选中的优惠券
			setCunponData: function(couponInfo) {
				if (couponInfo == null) {
					this.disable_ticket = 1;
					this.coupon_info = {};
					delete this.data.ticket_id;
				} else {
					this.coupon_info = couponInfo;
					this.ticket_id = couponInfo.id;
					this.disable_ticket = 0;
				}
				this.calc_maidiset_order_amount();
			},

			//选择礼品卡列表
			goCardList: function() {
				//0菜地卡,1买鸡卡,2.菜园卡 ,3.菜地月卡, 4.菜园月卡
				var type = 0;
				if (this.current_tab_index == 0) {
					type = 3
				}
				uni.navigateTo({
					url: '../paycards/paycards?type=' + type +
						'&set_id=' + this.set_id +
						'&num=1' +
						'&choose=' + this.card_ids
				})
			},

			//接收卡片数据
			setCardData: function(data1, data2) {
				if (data1 != null && data1.length != 0) {
					this.card_ids = JSON.parse(data1);
					//删除已选的优惠券, 并无法选择优惠券
					this.coupon_info = {};
					this.ticket_id = '';
				} else {
					delete this.card_ids;
				}
				if (data2 != null) {
					this.card_info = data2;
				}
				this.calc_maidiset_order_amount();
			},
		}
	}
</script>

<style>
	.head-top-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 120rpx;
	}

	page {
		background: #fff;
		padding-bottom: 80rpx;
	}

	.group-title {
		background-color: #f3f6fb;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #b2b2b2;
		padding: 0 30rpx;
	}

	.group-content-column {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 16rpx 30rpx;
	}

	.group-content-column .group-content-row:nth-child(2) {
		margin-top: 16rpx;
	}

	.group-content-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 30rpx;
		color: #4c4c4c;
		align-items: center;
	}

	.nx {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.selected-tab {
		width: 165rpx;
		color: #fff;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		background: #8ee1a2;
		justify-content: center;
		padding: 7rpx 0rpx;
		position: relative;
		border: 1rpx solid #8ee1a2;
	}

	.default-tab {
		width: 165rpx;
		border: 1rpx solid #e9e6e6;
		color: #aaa;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 7rpx 0rpx;
		position: relative;
	}

	.content-text {
		padding: 16rpx 0rpx 0rpx 0rpx;
		font-size: 26rpx;
		color: #b2b2b2;
	}

	.group-content-column::after {
		content: "";
		position: absolute;
		bottom: 0;
		display: block;
		width: 750rpx;
		height: 2rpx;
		background-color: #f2f2f2;
		margin-left: -30rpx;
	}

	.jiahao {
		font-size: 30rpx;
		padding: 0 20rpx;
	}

	.jianhao {
		font-size: 30rpx;
		padding: 0 20rpx;
	}

	.select-tab-n {
		width: 120rpx;
		border: 1rpx solid #e9e6e6;
		color: #aaa;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 7rpx 0rpx;
		position: relative;
	}

	.select-tab-p {
		width: 120rpx;
		color: #fff;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		background: #8ee1a2;
		justify-content: center;
		padding: 7rpx 0rpx;
		position: relative;
		border: 1rpx solid #8ee1a2;
	}

	.ydxy {
		text-decoration: none;
		color: #b2b2b2;
		font-size: 26rpx;
	}

	.inner-column {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 26rpx;
	}

	.inner-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.right {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.box-img {
		width: 36rpx;
		height: 36rpx;
		margin: 10rpx;
	}

	.goin-img {
		width: 15rpx;
		height: 28rpx;
		margin-left: 30rpx;
	}

	.big-img {
		width: 50rpx;
		height: 66rpx;
		margin-right: 20rpx;
	}

	.footer-row {
		position: fixed;
		background-color: white;
		border-top: 1px solid #e9e6e6;
		width: 100%;
		bottom: 0rpx;
		left: 0px;
		height: 100rpx;
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.footer-text {
		display: flex;
		flex-direction: row;
		margin-left: 30rpx;
		align-items: baseline;
	}

	.footer-text text:nth-child(1) {
		font-size: 26rpx;
		color: #4c4c4c;
	}

	.footer-text text:nth-child(2) {
		font-size: 36rpx;
		color: #5cdba6;
	}

	.footer-inner-row {
		display: flex;
		flex-direction: row;
	}

	.pintuan {
		background: #ff6633;
		color: #fff;
		display: flex;
		width: 200rpx;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 100rpx;
	}

	.pintuan text {
		font-size: 26rpx;
	}

	.zhifu {
		background: #5cdba6;
		color: #fff;
		display: flex;
		width: 200rpx;
		align-items: center;
		justify-content: center;
		height: 100rpx;
	}

	.grey {
		background-color: #dedede;
	}

	.grey:first-child {
		border-right: 1px solid #fff;
	}

	.head-top-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx 40rpx;
		background: #f3f6fb;
	}

	.top-name {
		font-size: 35rpx;
		color: #000;
		margin-left: 40rpx;
	}

	.top-grade {
		margin-left: 20rpx;
		font-size: 20rpx;
		background: #cfd6dd;
		color: #fff;
		width: 120rpx;
		border-radius: 25rpx;
		text-align: center;
		padding: 5rpx;
	}

	.top-grade-dz {
		margin-left: 20rpx;
		font-size: 20rpx;
		background: #85DFA3;
		color: #fff;
		width: 120rpx;
		border-radius: 25rpx;
		text-align: center;
		padding: 5rpx;
	}

	.right-group-container {
		display: flex;
		flex-direction: column;
	}

	.right-box {
		display: flex;
		flex-direction: row;
		width: 500rpx;
		justify-content: flex-end;
		align-items: center;
	}

	.pp-container {
		height: 100rpx;
	}
</style>
