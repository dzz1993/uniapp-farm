<template>
	<view class="page">
		<view class='address-container' @click='onSelectAddressClick'>
			<image class="address-top-img" src='https://m.aoyifarm.com/Application/wx_img/center/zhy_shoucai_tiaowen.png'></image>
			<view class='address-details-container'>
				<image class='address-tip-img' src='https://m.aoyifarm.com/Application/wx_img/center/zhy_shoucai_dizhi.png'></image>
				<view class="address-receiver-container">
					<view class='address-re-phone-container'>
						<text class="address-text" v-if="address_info != ''">收货人：{{address_info.consignee}}</text>
						<text class="address-text" v-else>收货人：</text>
						<text class="address-text"></text> 
					</view>
					<text class="address-details-text" v-if="address_info != ''">收货地址：{{address_info.region_name}}{{address_info.city}}{{address_info.address}}</text>
					<text class="address-details-text" v-else>收货地址：</text>
				</view>
				<image class="jietou-img" src="https://m.aoyifarm.com/Application/wx_img/jian.png"></image>
			</view>
		</view>

		<view class="secTitle">已选择</view>

		<view class='good-item-container'>
			<view>
				<view class='good-name'>{{orderInfo.goods_name}}</view>
				<view class='good-price' v-if="is_paymember == 1">
					<text>¥ {{orderInfo.member_price}}/{{orderInfo.unit_name}}</text>
					<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/member-img.png' class='hyj-img' v-if="orderInfo.is_gift_card == 0"></image>
				</view>
				<view class='good-price' v-else>¥ {{orderInfo.price}}/{{orderInfo.unit_name}}</view>
			</view>
			<view class="suan">
				<view @click='onJianClick'>
					<image class="jian" src="https://m.aoyifarm.com/Application/wx_img/jianh.png"></image>
				</view>
				<view id="shu">{{shop_goods_num}}</view>
				<view @click='onJiaClick'>
					<image class="jia" src="https://m.aoyifarm.com/Application/wx_img/jiah.png"></image>
				</view>
			</view>
		</view>

		<view class='yhq-container' @click='onSelectCouponClick' hidden='true'>
			<view class='yhq-left'>
				<image class="ic" src="https://m.aoyifarm.com/Application/wx_img/pay/yhq.png"></image>
				<text>优惠券</text>
			</view>
			<view class='yhq-right'>
				<text>{{couponPriceText}}</text>
				<image class="jie" src="https://m.aoyifarm.com/Application/wx_img/jian.png"></image>
			</view>
		</view>

		<view class='footer-item-container'>
			<view class='footer-item'>
				<text>商品金额</text>
				<text class='right-data'>¥ {{goods_total_price}}</text>
			</view>

			<view class='footer-item' hidden='true'>
				<text>优惠券</text>
				<text class='right-data'>¥ {{couponPrice}}</text>
			</view>

			<view class='footer-item'>
				<text>运费</text>
				<text class='right-data'>包邮</text>
			</view>

			<view class='footer-item'>
				<text>实付款</text>
				<text class='right-data'>¥ {{goods_total_price}}</text>
			</view>
		</view>

		<view class="secTitle">选择支付方式：</view>
		<view class="zhifa">
			<view class="zuoc">
				<image src="https://m.aoyifarm.com/Application/wx_img/pay/wx.png" class="ic2"></image>
				微信支付
			</view>
			<image class='box-img' v-if="isCheck" src="http://res.aoyifarm.com/20180719/5b503e2fdf109.png" @click="checkboxChange"></image>
			<image class='box-img' v-else src="http://res.aoyifarm.com/20180719/5b503e1233104.png" @click="checkboxChange"></image>
		</view>

		<view class="footer">
			<view id="price" class="heBox">
				合计：
				<text>{{goods_total_price}}元</text>
			</view>
			<view class="colorBtn" @click='payEnd'>
				确认支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCheck: true,
				shop_goods_num: 1,
				id: '',
				address_info: '',
				order_id: '',

				couponInfo: {},
				couponPrice: 0.00,
				couponPriceText: '',
				goods_total_price: 0,

				postage: 0,
				baoyou_price: 0,
				freightList: [],

				orderInfo: '',
				is_paymember: 0

			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var orderInfo = options.orderInfo;
			if (orderInfo) {
				var orderInfo = JSON.parse(orderInfo)
				this.orderInfo = orderInfo;
				this.shop_goods_num = orderInfo.shop_goods_num;
				this.is_paymember = this.globalData.user_info.is_paymember;

				this.goods_total_price = this.countTotalPrice().toFixed(2);

			}
		},


		methods: {
			onJianClick: function() {
				if (this.orderInfo.shop_goods_num == 1) {
					uni.showToast({
						icon: "none",
						title: '数量不能少于1'
					})
					return;
				}

				this.shop_goods_num = --this.orderInfo.shop_goods_num;
				this.goods_total_price = this.countTotalPrice().toFixed(2)

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
				this.goods_total_price = this.countTotalPrice().toFixed(2)
			},

			payEnd: function() {


				this.id = this.address_info.id;
				if (this.id == "" || this.id == null) {
					uni.showToast({
						title: '请选择地址',
						icon: "none"
					})
					return;
				}

				if (!this.isCheck) {
					uni.showToast({
						title: '请选择支付方式',
						icon: "none"
					})
					return;
				}

				var param = {
					user_id: this.globalData.user_info.userid,
					goods_num: this.orderInfo.shop_goods_num,
					goods_id: this.orderInfo.goods_id,
					address_id: this.address_info.id,
				}
				var that = this;
				this.xm_config.add_order(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.order_id != null) {
								that.order_id = res.data.info.order_id;

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

			weixinPay: function(data) {
				var that = this
				uni.requestPayment({
					timeStamp: data.timeStamp + "",
					nonceStr: data.nonceStr,
					package: data.package,
					signType: 'MD5',
					paySign: data.sign,
					success: function(res) {
						uni.redirectTo({
							url: '../market-pay-card-success/market-pay-card-success?order_id=' + that.data.order_id,
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
						appid: data.appid,//应用ID,
						noncestr: data.noncestr,//随机字符串,
						package: data.package, // 固定值，以微信支付文档为主  
						partnerid: data.partnerid,//商户号,
						prepayid: data.prepayid,//预支付交易会话ID,
						timestamp: data.timestamp + "",//时间戳,
						sign: data.sign//签名 // 根据签名算法生成签名  
					}),
					success: function(res) {
						console.log(res);
						uni.showToast({
							icon: "none",
							title: '支付成功'
						})
			
						uni.redirectTo({
							url: '../market-pay-card-success/market-pay-card-success?order_id=' + that.data.order_id,
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

			checkboxChange: function() {

				this.isCheck = !this.isCheck

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
			},

			onSelectAddressClick: function() {
				wx.navigateTo({
					url: '../address/select-address-list/select-address-list',
				})

			},

			countTotalPrice: function() {
				var totalPrice = 0;
				if (this.globalData.user_info.is_paymember == 1) {
					totalPrice = this.orderInfo.member_price * this.orderInfo.shop_goods_num
				} else {
					totalPrice = this.orderInfo.price * this.orderInfo.shop_goods_num
				}
				return totalPrice;
			}

		}
	}
</script>

<style>
	.address-container {
		display: flex;
		flex-direction: column;
		background: #fff;
	}

	.address-top-img {
		height: 20rpx;
		width: 100%;
	}

	.address-details-container {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		justify-content: space-between;
		align-items: center;
	}

	.address-tip-img {
		width: 50rpx;
		height: 50rpx;
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
		color: #333;
		font-size: 28rpx;
		font-weight: 300;
	}

	.address-details-text {
		color: #333;
		font-size: 28rpx;
		font-weight: 300;
		margin-top: 15rpx;
	}

	.secTitle {
		padding: 20rpx;
		color: #666;
		font-size: 30rpx;
		font-weight: 300;
	}

	.good-item-container {
		background: #fff;
		padding: 15rpx 20rpx;
		border-bottom: 1rpx solid #f8f8f8;
		display: flex;
		justify-content: space-between;
	}

	.good-name {
		font-size: 28rpx;
		color: #333;
	}

	.good-price {
		font-size: 26rpx;
		color: #fb511e;
		margin-top: 8rpx;
	}

	.footer-item {
		color: #666;
		font-size: 25rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 8rpx;
	}

	.footer-item-container {
		padding: 10rpx 20rpx;
		background: #fff;
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
		flex: 1;
	}

	.zhifa:last-child {
		border: 0;
	}

	.zuoc {
		display: flex;
		color: #4b4b4b;
		line-height: 60rpx;
		flex-direction: row;
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
		line-height: 100rpx;
		display: flex;
		font-size: 30rpx;
	}

	.heBox {
		text-indent: 20rpx;
		background-color: #fff;
		color: #ff7100;
		display: flex;
		align-items: center;
		flex: 1;
	}

	.colorBtn {
		width: 200rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ff7100;
		color: #fff;
	}

	.right-data {
		color: #fb511e;
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
		color: #ff8700;
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
</style>
