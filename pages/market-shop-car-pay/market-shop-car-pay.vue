<template>
	<view>
		<view class='pp-container'>
			<view class='address-container' @click="onSelectAddressClick">
				<view class='address-details-container'>
					<image class='address-tip-img' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/shdzdwtc.png'></image>
					<view class="address-receiver-container" v-if="!address_info.consignee">
						<view class='address-re-phone-container'>
							<text class="address-text">收货人：</text>
							<text class="address-text"></text>
						</view>
						<text class="address-details-text">收货地址：</text>
					</view>
					<view class="address-receiver-container" v-else>
						<view class='address-re-phone-container'>
							<text class="address-text">收货人：{{!address_info.consignee?"":address_info.consignee}}</text>
							<text class="address-text">{{address_info.phone_mob}}</text>
						</view>
						<text class="address-details-text">收货地址：{{address_info.region_name}}{{address_info.city}}{{address_info.address}}</text>
					</view>
					<image class="jietou-img" src="https://m.aoyifarm.com/Application/wx_img/jian.png"></image>
				</view>
			</view>

			<view class="secTitle">商品</view>
			<block v-for="(item,index) in good_list" :key="index">
				<view class='good-item-container'>
					<view>
						<view class='good-name'>{{item.goods_name}}</view>
						<view class='cx-good-price' v-if="item.is_now_promote == 1">
							<text>¥ {{item.promote_price}}/{{item.unit_name}}</text>
							<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cx_price.png' class='hyj-img'></image>
						</view>
						<view wx:else>
							<view class='good-price' v-if="is_paymember == 1">
								<text>¥ {{item.member_price}}/{{item.unit_name}}</text>
								<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/member-img.png' class='hyj-img' v-if="item.is_gift_card == 0"></image>
							</view>
							<view class='good-price' v-else>¥ {{item.price}}/{{item.unit_name}}</view>
						</view>
					</view> 
					<view class="suan">
						<view catchtap='onJianClick' hidden='true'>
							<image class="jian" src="https://m.aoyifarm.com/Application/wx_img/jianh.png"></image>
						</view>
						<view id="shu">x{{item.quantity}}</view>
						<view catchtap='onJiaClick' hidden='true'>
							<image class="jia" src="https://m.aoyifarm.com/Application/wx_img/jiah.png"></image>
						</view>
					</view>
				</view>
			</block>
			<view class="secTitle">优惠券与余额</view>
			<view class='footer-item-container'>

				<view class='footer-item-top' @click="onSelectCouponClick">
					<text>优惠券立减</text>
					<text class='right-data' v-if="coupon_info">{{coupon_info.name}} ></text>
					<text class='right-data' v-else> ></text>
				</view>

				<view class='footer-item' catchtap='onSelectFreightCouponClick' v-if="count_order_info.original_yunfei > 0">
					<text>包邮券</text>
					<text class='right-data' v-if="freight_coupon_info">{{freight_coupon_info.name}} ></text>
					<text class='right-data' v-else> ></text>
				</view>

				<view class='footer-item'>
					<text>余额支付</text>
					<view class='right-data' v-if="!count_order_info.balance">		
					</view>
					<view class='right-data' v-else>
						可用
						<text class='right-ye-data'>{{count_order_info.balance}}</text> 元			
					</view>
					<image class='box-switch-img' v-if="use_user_money == 1" src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/switch_true.png'
					 @click="onYeBoxClcik"></image>
					<image class='box-switch-img' v-else src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/switch_false.png'
					 @click="onYeBoxClcik"></image>
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
					<text class='right-data' v-if="!count_order_info.goods_amount">¥ 0</text>
					<text class='right-data' v-else>¥ {{count_order_info.goods_amount}}</text>
				</view>

				<view class='footer-item' v-if="count_order_info.is_shipping == 0">
					<text>运费</text>
					<text class='right-data'>(满{{count_order_info.baoyou_price}}包邮)¥ {{count_order_info.original_yunfei}}</text>
				</view>
				<view class='footer-item' v-else>
					<text>运费</text>
					<text class='right-data' v-if="!count_order_info.original_yunfei">¥ 0</text>
					<text class='right-data' v-else>¥ {{count_order_info.original_yunfei}}</text>
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
			<view class="pp-container-hg"></view>
			<view class="footer">
				<view id="price" class="hj">
					还需支付：
					<text class="heBox" v-if="!count_order_info.pay_amount">¥ 0</text>
					<text class="heBox" v-else>¥ {{count_order_info.pay_amount}}</text>
				</view>
				<view class="colorBtn" @click="payEnd">
					确认支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop_goods_num: 1,
				order_id: '',
				goods_id_str: '',
				address_info: '',
				freight_coupon_info: '',
				coupon_info: '',
				input_content: '',
				is_paymember: 1,

				use_user_money: 1, //是否使余额
				disable_ticket: 0, //是否禁止使用优惠券
				disable_freight: 0, //是否禁止使用包邮券
				good_list: [], //处理member_price,为了更新价格
				new_good_list: [],
				count_order_info: {}
			}
		},

		onLoad(options) {
			var select_goods_list = options.select_goods_list;
			if (select_goods_list) {
				var select_goods_list = JSON.parse(select_goods_list)
				this.good_list = select_goods_list;
			}

			var goods_id_str = ''
			for (var idx in this.good_list) {
				goods_id_str += this.good_list[idx].zd_goods_id + ","
			}
			this.goods_id_str = goods_id_str.substring(0, goods_id_str.length - 1)

			this.calc_order_amount();
		},

		methods: {
			calc_order_amount() {
				var that = this;
				var rec_ids = ''
				for (var idx in this.good_list) {
					rec_ids += this.good_list[idx].rec_id + ","
				}
				this.rec_ids = rec_ids.substring(0, rec_ids.length - 1)

				var param = {
					user_id: this.globalData.user_info.userid,
					rec_ids: this.rec_ids,
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
							that.new_good_list = res.data.info.goods;

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onSelectCouponClick: function() {
				var rec_ids = ''
				for (var idx in this.good_list) {
					rec_ids += this.good_list[idx].rec_id + ","
				}
				this.rec_ids = rec_ids.substring(0, rec_ids.length - 1)
				uni.navigateTo({
					url: '../select-coupon/select-coupon?couponInfo=' + JSON.stringify(this.coupon_info) + '&rec_ids=' + this.rec_ids +
						'&address_id=' + this.address_info.id,
				})
			},

			//选择包邮券
			onSelectFreightCouponClick: function() {
				uni.navigateTo({
					url: '../select-coupon-freight/select-coupon?goodTotalPrice=' + parseFloat(this.count_order_info.goods_amount)
						.toFixed(2) + '&pt_goods=' + this.goods_id_str + '&freightInfo=' + JSON.stringify(this.freight_coupon_info),
				})
			},

			//设置优惠券数据
			setCunponBackData: function(coupon_info) {

				//设置优惠券
				if (coupon_info) {
					this.coupon_info = coupon_info;
					this.disable_ticket = 0
				} else {
					this.coupon_info = '';
					this.disable_ticket = 1;
				}

				this.calc_order_amount();

			},

			getInputContent: function(e) {
				this.input_content = e.detail.value
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

			onYeBoxClcik: function() {
				this.use_user_money = this.use_user_money == 1 ? 0 : 1

				this.calc_order_amount();
			},

			onSelectAddressClick: function() {
				uni.navigateTo({
					url: '../address/select-address-list/select-address-list',
				})
			},

			setAddressInfo: function(item) {
				this.address_info = {
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

				this.calc_order_amount();
			},

			payEnd: function() {

				var that = this;
				this.id = this.address_info.id;
				if (this.id == "" || this.id == null) {
					uni.showToast({
						title: '请选择地址',
						icon: "none"
					})
					return;
				}

				var goods_str = '';
				for (var idx in this.good_list) {
					goods_str += this.good_list[idx].rec_id + ","
				}

				var param = {
					user_id: this.globalData.user_info.userid,
					rec_ids: goods_str.substring(0, goods_str.length - 1),
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
					provider: 'wxpay',
					timeStamp: data.timeStamp + "",
					nonceStr: data.nonceStr,
					package: data.package,
					signType: 'MD5',
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


		}
	}
</script>

<style>
	.address-container {
		display: flex;
		flex-direction: column;
		background: #fff;
		margin: 20rpx 20rpx 0 20rpx;
		border-radius: 20rpx;
		color: #000;
	}

	.address-top-img {
		height: 20rpx;
		width: 100%;
	}

	.pp-container {
		display: flex;
		flex-direction: column;
		padding-bottom: 200rpx;
		background-color: #f3f6fb;
	}

	page {
		background: #F2F5FA;
	}

	.address-details-container {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		justify-content: space-between;
		align-items: center;
	}

	.footer-item-wx {
		color: #000;
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
	}



	.address-tip-img {
		width: 50rpx;
		height: 66rpx;
		margin-right: 20rpx;
	}

	.jietou-img {
		width: 25rpx;
		height: 35rpx;
		margin-left: 20rpx;
	}

	.address-receiver-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.address-re-phone-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.address-text {
		font-size: 28rpx;
	}

	.address-details-text {
		font-size: 28rpx;
		margin-top: 15rpx;
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
	}

	.good-name {
		font-size: 28rpx;
		color: #000;
	}

	.good-price {
		font-size: 26rpx;
		color: #67DDAB;
		margin-top: 8rpx;
	}

	.cx-good-price {
		font-size: 26rpx;
		color: #f7391b;
		margin-top: 8rpx;
	}

	.footer-item {
		color: #000;
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		border-top: 1rpx solid #f8f8f8;
	}

	.footer-item-top {
		color: #000;
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
	}

	.footer-item-container {
		padding: 10rpx 20rpx;
		background: #fff;
		margin: 0 20rpx;
		border-radius: 15rpx;
	}


	.zhifas {
		width: 100%;
		border-top: 1px solid #f8f8f8;
		overflow-x: hidden;
	}

	.zhifa {
		border-bottom: 1px solid #f8f8f8;
		background: #fff;
		display: flex;
		padding: 20rpx 20rpx 20rpx 30rpx;
		justify-content: space-between;
		font-size: 28rpx;
		margin-bottom: 150rpx;
	}

	.zhifa:last-child {
		border: 0;
	}

	.zuoc {
		display: flex;
		color: #4b4b4b;
		line-height: 60rpx;
	}

	.ic2 {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}

	/*  重写 checkbox 样式  */
	checkbox .wx-checkbox-input {
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		border: none;
		background: #ff7d0c;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 30rpx;
		color: #fff;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
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
	}

	.heBox {
		color: #67DDAB;
		font-size: 35rpx;
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

	.hj {
		color: #000;
		display: flex;
		flex: 1;
		background-color: #fff;
		align-items: center;
		padding-left: 50rpx;
	}

	.right-data {
		color: #000;
	}

	.suan {
		display: flex;
		align-items: center;
	}

	.jia {
		width: 50rpx;
		height: 50rpx;
	}

	.jian {
		width: 50rpx;
		height: 50rpx;
	}

	#shu {
		margin: 0 20rpx;
		color: #000;
		line-height: 42rpx;
		margin-bottom: 8rpx;
	}

	.ic {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.jie {
		width: 16rpx;
		height: 32rpx;
		margin-left: 20rpx;
	}

	.yhq-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		background: #fff;
		border-bottom: 1rpx solid #f4f4f4;
	}

	.yhq-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #333;
		font-size: 28rpx;
	}

	.yhq-right {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #333;
		font-size: 28rpx;
	}

	.hyj-img {
		width: 89rpx;
		height: 25rpx;
	}

	.box-img {
		width: 40rpx;
		height: 40rpx;
	}

	.box-switch-img {
		width: 66rpx;
		height: 33rpx;
	}

	.right-ye-data {
		color: #67DDAB;
		font-size: 30rpx;
	}

	.right-data1 {
		color: #666;
		/*display: flex;*/
		flex: 1;
		font-size: 26rpx;
		margin-left: 20rpx;
	}

	.pp-container-hg {
		height: 200rpx;
		background-color: #f3f6fb;
	}
</style>
