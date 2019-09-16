<template>
	<view class="page-content">
		<view class='address-container' @click="onSelectAddressClick">
			<view class='address-details-container'>
				<image class='address-tip-img' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/shdzdwtc.png'></image>
				<view class="address-receiver-container">
					<view class='address-re-phone-container'>
						<text class="address-text">收货人：{{address_info.consignee}}</text>
						<text class="address-text">{{address_info.phone_mob}}</text>
					</view>
					<text class="address-details-text">收货地址：{{address_info.region_name}}{{address_info.city}}{{address_info.address}}</text>
				</view>
				<image class="jietou-img" src="https://m.aoyifarm.com/Application/wx_img/jian.png"></image>
			</view>
		</view>

		<view class="secTitle">商品</view>

		<view class='good-item-container'>
			<view>
				<view class='good-name'>{{orderInfo.goods_name}}</view>
				<view class="cx-good-price" v-if="orderInfo.is_now_promote == 1">
					<text>¥ {{order_goods_info.promote_price}}/{{orderInfo.unit_name}}</text>
					<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cx_price.png' class='hyj-img'></image>
				</view>
				<view v-else>
					<view class='good-price' v-if="is_paymember == 1">
						<text>¥ {{order_goods_info.member_price}}/{{orderInfo.unit_name}}</text>
						<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/member-img.png' class='hyj-img' v-if="orderInfo.is_gift_card == 0"></image>
					</view>
					<view class='good-price' v-else>¥ {{order_goods_info.price}}/{{orderInfo.unit_name}}</view>
				</view>
			</view>
			<view class="suan">
				<image class="jian" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jian.png" @click="onJianClick"></image>
				<view class="shu">{{shop_goods_num}}</view>
				<image class="jia" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jia.png" @click="onJiaClick"></image>
			</view>
		</view>

		<view class="secTitle">优惠券与余额</view>
		<view class='footer-item-container'>

			<view class='footer-item-top' @click="onSelectCouponClick">
				<text>优惠券立减</text>
				<text class='right-data' v-if="coupon_info">{{coupon_info.name}} ></text>
				<text class='right-data' v-else> ></text>
			</view>

			<view class='footer-item' @click='onSelectFreightCouponClick' v-if="count_order_info.original_yunfei > 0">
				<text>包邮券</text>
				<text class='right-data' v-if="freight_coupon_info">{{freight_coupon_info.name}} ></text>
				<text class='right-data' v-else> ></text>
			</view>


			<view class='footer-item'>
				<text>余额支付</text>
				<view class='right-data'>
					可用
					<text class='right-ye-data'>{{count_order_info.balance}}</text> 元
				</view>
				<image @click="onYeBoxClcik" class='box-switch-img' v-if="use_user_money == 1" src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/switch_true.png'></image>
				<image @click="onYeBoxClcik" class='box-switch-img' v-else src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/switch_false.png'></image>
			</view>
			<view class='footer-item'>
				<text>买家留言</text>
				<input class='right-data1' placeholder="选填：备注给商家的留言(最多40个字)" @input="getInputContent" maxlength='40'></input>
			</view>
		</view>
		<view class="secTitle">订单</view>
		<view class='footer-item-container'>
			<view class='footer-item-top'>
				<text>商品金额</text>
				<text class='right-data'>¥ {{count_order_info.goods_amount}}</text>
			</view>

			<view class='footer-item' v-if="count_order_info.is_shipping == 0">
				<text>运费</text>
				<text class='right-data'>(满{{count_order_info.baoyou_price}}包邮)¥ {{count_order_info.original_yunfei}}</text>
			</view>
			<view class='footer-item' v-else>
				<text>运费</text>
				<text class='right-data'>¥ {{count_order_info.original_yunfei}}</text>
			</view>

			<view class='footer-item' v-if="count_order_info.reduce_money>0">
				<text>优惠券</text>
				<text class='right-data'>- ¥ {{count_order_info.reduce_money}}</text>
			</view>

			<view class='footer-item' v-if="count_order_info.user_freight_amount>0">
				<text>包邮券</text>
				<text class='right-data'>- ¥ {{count_order_info.user_freight_amount}}</text>
			</view>

			<view class='footer-item' v-if="count_order_info.user_money_amount>0">
				<text>余额支付</text>
				<text class='right-data'>- ¥ {{count_order_info.user_money_amount}}</text>
			</view>

		</view>
		<view class="pp-container"></view>
		<view class="footer">
			<view class="hj">
				还需支付：
				<text class="heBox">{{count_order_info.pay_amount}}元</text>
			</view>

			<view class="colorBtn" @click="payEnd">
				确认支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo: '',
				use_user_money: 1, //是否使余额
				disable_ticket: 0, //是否禁止使用优惠券
				disable_freight: 0, //是否禁止使用包邮券
				coupon_info: '',
				freight_coupon_info: '',
				is_paymember: 1,
				shop_goods_num: 1,
				input_content: '',

				count_order_info: '',
				address_info: "",
				order_goods_info: "",
				order_id: '',
			}
		},
		onLoad(options) {
			var orderInfo = options.orderInfo;
			if (orderInfo) {
				var orderInfo = JSON.parse(orderInfo);

				this.orderInfo = orderInfo;
				this.shop_goods_num = orderInfo.shop_goods_num;
			}

			this.calc_order_amount();
		},
		methods: {
			calc_order_amount() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					goods_id: this.orderInfo.goods_id,
					goods_num: this.orderInfo.shop_goods_num
				}

				//余额是否使用
				if (this.use_user_money) {
					param.use_user_money = this.use_user_money
				}

				//优惠券是否使用
				if (this.disable_ticket == 1) {
					param.disable_ticket = this.disable_ticket
				} else if (this.coupon_info) {
					param.disable_ticket = 0
					param.ticket_id = this.coupon_info.id
				} else {
					param.disable_ticket = 0
				}
				//包邮券是否使用
				if (this.disable_freight == 1) {
					param.disable_freight = this.disable_freight
				} else if (this.freight_coupon_info) {
					param.disable_freight = 0
					param.user_freight_id = this.freight_coupon_info.id
				} else {
					param.disable_freight = 0
				}

				//地址对否使用
				if (this.address_info && this.address_info.id) {
					param.address_id = this.address_info.id
				}

				this.xm_config.calc_order_amount(param)
					.then(function(res) {
						if (res.data.status == 1) {
							that.count_order_info = res.data.info;
							that.address_info = res.data.info.address_info ? res.data.info.address_info : '';
							that.coupon_info = res.data.info.coupon_info ? res.data.info.coupon_info : '';
							that.freight_coupon_info = res.data.info.freight_coupon_info ? res.data.info.freight_coupon_info : '';
							that.order_goods_info = res.data.info.goods[0]

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			payEnd: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					goods_num: this.orderInfo.shop_goods_num,
					goods_id: this.orderInfo.goods_id,
					address_id: this.address_info.id,
				}

				//余额是否使用
				if (this.use_user_money) {
					param.use_user_money = this.use_user_money
				}

				//优惠券是否使用
				if (this.disable_ticket == 1) {
					param.disable_ticket = this.disable_ticket
				} else if (this.coupon_info) {
					param.disable_ticket = 0
					param.ticket_id = this.coupon_info.id
				} else {
					param.disable_ticket = 0
				}
				//包邮券是否使用
				if (this.disable_freight == 1) {
					param.disable_freight = this.disable_freight
				} else if (this.freight_coupon_info) {
					param.disable_freight = 0
					param.user_freight_id = this.freight_coupon_info.id
				} else {
					param.disable_freight = 0
				}

				//是否留言
				if (this.input_content) {
					param.remark = this.input_content
				}

				this.xm_config.add_market_order(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.order_id != null) {
								that.order_id = res.data.info.order_id;
								if (res.data.info.is_pay == 0) {
									uni.showToast({
										title: "使用余额支付成功",
										icon: "none"
									})

									uni.redirectTo({
										url: '../market-pay-success/market-pay-success?order_id=' + that.order_id,
									})
								} else {
									that.getWxParam();
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

			getInputContent: function(e) {
				this.input_content = e.detail.value
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

				uni.requestPayment({
					provider: "wxpay",
					timeStamp: data.timeStamp + "",
					nonceStr: data.nonceStr,
					package: data.package,
					signType: "MD5",
					paySign: data.sign,
					success: function(res) {
						console.log(res);
						uni.showToast({
							icon: "none",
							title: '支付成功'
						})

						uni.redirectTo({
							url: '../market-pay-success/market-pay-success?order_id=' + that.order_id,
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
							url: '../market-pay-success/market-pay-success?order_id=' + that.order_id,
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




			onJianClick: function() {
				if (this.orderInfo.shop_goods_num == 1) {
					uni.showToast({
						icon: "none",
						title: '数量不能少于1'
					})
					return;
				}

				this.shop_goods_num = --this.orderInfo.shop_goods_num;
				this.coupon_info = '';

				this.calc_order_amount();
			},

			onJiaClick: function() {
				if (this.orderInfo == null) {
					uni.showToast({
						icon: "none",
						title: '数据加载失败'
					})
					return;
				}

				if (this.orderInfo.shop_goods_num == this.orderInfo.kucun) {
					uni.showToast({
						icon: "none",
						title: '当前商品库存不足'
					})
					return;
				}

				this.shop_goods_num = ++this.orderInfo.shop_goods_num;
				this.coupon_info = '';

				this.calc_order_amount();
			},

			onSelectAddressClick: function() {

				uni.navigateTo({
					url: '../address/select-address-list/select-address-list?isCaidi=1',
				})
			},

			setAddressInfo: function(item) {
				var address_info = {
					id: item.id,
					region_id: item.region_id,
					city_id: item.city_id,
					region_name: item.region_name,
					city: item.city,
					consignee: item.consignee,
					address: item.address,
					phone_mob: item.phone_mob,
					default: item.default,
					auto_open: item.auto_open,
					is_beijing: item.is_beijing,
				}

				this.address_info = address_info;

				this.calc_order_amount();
			},

			//选择优惠券
			onSelectCouponClick: function() {
				var goodsInfo = {
					goods_id: this.orderInfo.goods_id,
					goods_num: this.orderInfo.shop_goods_num
				}
				uni.navigateTo({
					url: '../select-coupon/select-coupon?couponInfo=' + JSON.stringify(this.coupon_info) + '&goods_info=' +
						JSON.stringify(goodsInfo) +
						'&address_id=' + this.address_info.id,
				})
			},

			//选择包邮券
			onSelectFreightCouponClick: function() {
				uni.navigateTo({
					url: '../select-coupon-freight/select-coupon-freight?goodTotalPrice=' + parseFloat(this.count_order_info.goods_amount)
						.toFixed(2) + '&pt_goods=' + this.orderInfo.pt_goods + '&freightInfo=' + JSON.stringify(this.freight_coupon_info),
				})
			},

			//设置优惠券数据
			setCunponBackData: function(coupon_info) {

				//设置优惠券
				if (coupon_info) {
					this.coupon_info = coupon_info;
					this.disable_ticket = 0;
				} else {
					this.coupon_info = "";
					this.disable_ticket = 1;
				}

				this.calc_order_amount();

			},

			//设置包邮券数据
			setFreightBackData: function(freight_coupon_info) {
				//设置包邮券
				if (freight_coupon_info) {
					this.freight_coupon_info = freight_coupon_info;
					this.disable_freight = 0;
				} else {
					this.freight_coupon_info = '';
					this.disable_freight = 1;
				}

				this.calc_order_amount();
			},

			//是否使用可用余额
			onYeBoxClcik: function() {
				this.use_user_money = this.use_user_money == 1 ? 0 : 1

				this.calc_order_amount();
			},

		}
	}
</script>

<style lang="scss">
	.address-container {
		display: flex;
		flex-direction: column;
		background: #fff;
		margin: 20rpx 20rpx 0 20rpx;
		border-radius: 20rpx;
		color: #000;

		.address-details-container {
			display: flex;
			flex-direction: row;
			padding: 20rpx;
			justify-content: space-between;
			align-items: center;

			.address-tip-img {
				width: 50rpx;
				height: 66rpx;
				margin-right: 20rpx;
			}

			.address-receiver-container {
				display: flex;
				flex-direction: column;
				flex: 1;

				.address-re-phone-container {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.address-text {
						font-size: 28rpx;
					}
				}

				.address-details-text {
					font-size: 28rpx;
					margin-top: 15rpx;
				}
			}

			.jietou-img {
				width: 25rpx;
				height: 35rpx;
				margin-left: 20rpx;
			}
		}
	}

	.secTitle {
		color: #666;
		font-size: 30rpx;
		font-weight: 300;
		margin-left: 20rpx;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}

	.good-item-container {
		background: #fff;
		padding: 15rpx 20rpx;
		border-bottom: 1rpx solid #f8f8f8;
		display: flex;
		margin: 0 20rpx;
		justify-content: space-between;

		.good-name {
			font-size: 28rpx;
			color: #000;
		}

		.cx-good-price {
			font-size: 26rpx;
			color: #f7391b;
			margin-top: 8rpx;
		}

		.good-price {
			font-size: 26rpx;
			color: #67ddab;
			margin-top: 8rpx;
		}

		.suan {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row;

			.jia {
				width: 40rpx;
				height: 40rpx;
				padding-left: 20rpx;
			}

			.jian {
				width: 40rpx;
				height: 40rpx;
				padding: 0 20rpx;
			}

			.shu {
				color: #333;
				font-size: 30rpx;
			}
		}
	}

	.footer-item-container {
		padding: 10rpx 20rpx;
		background: #fff;
		margin: 0 20rpx;
		border-radius: 15rpx;

		.footer-item-top {
			color: #000;
			font-size: 28rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20rpx;
		}

		.footer-item {
			color: #000;
			font-size: 28rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20rpx;
			border-top: 1rpx solid #f8f8f8;

			.right-ye-data {
				color: #67ddab;
				font-size: 30rpx;
			}

			.box-switch-img {
				width: 66rpx;
				height: 33rpx;
			}

			.right-data1 {
				color: #666;
				/*display: flex;*/
				flex: 1;
				font-size: 26rpx;
				margin-left: 20rpx;
			}
		}
	}

	.bottom {
		margin-bottom: 150rpx;
	}

	.right-data {
		color: #000;
	}

	.footer {
		position: fixed;
		width: 100%;
		bottom: 0px;
		left: 0px;
		height: 100rpx;
		display: flex;
		font-size: 30rpx;
		z-index: 100;

		.hj {
			color: #000;
			display: flex;
			flex: 1;
			background-color: #fff;
			align-items: center;
			padding-left: 50rpx;

			.heBox {
				color: #67ddab;
				font-size: 35rpx;
			}
		}

		.colorBtn {
			width: 200rpx;
			text-align: center;
			background-color: #49d9a8;
			color: #fff;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

	}

	.hyj-img {
		width: 89rpx;
		height: 25rpx;
	}

	.pp-container {
		height: 200rpx;
	}

	.page-content {
		display: flex;
		flex-direction: column;
		padding-bottom: 200rpx;
		background-color: #f3f6fb;
	}
</style>
