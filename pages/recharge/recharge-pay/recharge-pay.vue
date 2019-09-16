<template>
	<view class="page">
		<view class="page-container">
			<image class="top-img" :src="img"></image>
			<text class="text-1">储值金额</text>
		
			<view class="list-container">
				<block v-for="(item,index) in list" :key="index">
					<view class="block-contrainer">
						<view :class="[item.isSelect?'item-container-select':'item-container']" @click="onSelectClick(index)" :key="index">
							<text class="text-2">{{item.name}}</text>
							<text class="text-3" v-if="item.is_money_reward == 1">{{item.money_info}}</text>
							<text class="text-4" v-if="item.is_vip_reward == 1">{{item.vip_info}}</text>
						</view>
					</view>
				</block>
			</view>
		
			<view class="secTitle">支付方式</view>
			<view class="zhifa">
				<view class="zuoc">
					<image src="https://m.aoyifarm.com/Application/wx_img/pay/wx.png" class="ic2"></image>
					微信支付
				</view>
				<image class='box-img' :src="isCheck?'http://res.aoyifarm.com/20180719/5b503e2fdf109.png':'http://res.aoyifarm.com/20180719/5b503e1233104.png'"
				 @tap='checkboxChange'></image>
			</view>
		
			<view class="footer">
				<view id="price" class="heBox">
					共需支付
					<text class="total-price">{{total_price}}</text><text>元</text>
				</view>
				<view class="right-bottom" @click='payEnd'>
					<view class="colorBtn">
						立即支付
					</view>
		
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			var selectIndex = options.selectIndex;
			if (selectIndex) {
				this.selectIndex = selectIndex;
			}
			this.getDepositActivity();
		},
		data() {
			return {
				list: [], //充值数额列表(含多种充值数额)
				img: "", //活动背景图片
				isCheck: true, //是否选择微信支付
				selectIndex: 0, //选择item的下标
				total_price: 0, //合计多少钱
			}
		},
		methods: {
			getDepositActivity: function() {
				var that = this;
				this.xm_config.deposit_activity().then(function(res) {
					if (res.data.status == 1) {
						if (res.data.info != null && res.data.info.list != null) {
							res.data.info.img = res.data.info.img;
							//item选中状态
							if (res.data.info.list.length > 0) {
								that.total_price = res.data.info.list[0].amount;
								for (var i = 0; i < res.data.info.list.length; i++) {
									if (that.selectIndex == i) {
										res.data.info.list[i].isSelect = true;
										that.total_price = res.data.info.list[i].amount;
									} else {
										res.data.info.list[i].isSelect = false
									}
								}
							}
							that.img = res.data.info.img;
							that.list = res.data.info.list;

						}
					} else {
						uni.showToast({
							title: res.data.msg
						})
					}
				})
			},
			checkboxChange: function() {
				this.isCheck = !this.isCheck;
			},

			onSelectClick: function(index) {
				var index = index;
				var item = this.list[index];
				item.isSelect = !item.isSelect;
				var total_price = item.amount;
				if (index != this.selectIndex) {
					this.list[this.selectIndex].isSelect = false;
					this.total_price = total_price;
					this.selectIndex = index;
				}
			},

			payEnd: function() {
				var that = this;
				//check wechat pay selected
				if (!that.isCheck) {
					uni.showToast({
						title: "请选择微信支付！",
						icon:"none"
					})
					return;
				}

				var param = {
					user_id: this.globalData.user_info.userid,
					deposit_activity_id: that.list[that.selectIndex].id,
				}
				
				this.xm_config.deposit_add_order(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.getWxParam(res.data.info.order_id);
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
			getWxParam: function(order_id) {
				var that = this;
				var param = {
					order_id: order_id
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
							url: '../recharge-pay-success/recharge-pay-success',
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
							url: '../recharge-pay-success/recharge-pay-success',
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
	.page-container {
		display: flex;
		flex-direction: column;
		padding: 25rpx;
	}

	.top-img {
		margin-bottom: 25rpx;
		width: 700rpx;
		height: 180rpx;
	}

	.text-1 {
		font-size: 30rpx;
		color: #333;
	}

	.item-container-select {
		display: flex;
		flex-direction: column;
		width: 320rpx;
		height: 130rpx;
		justify-content: center;
		align-items: center;
		background: #CBF2DB;
		border: 3rpx solid #CBF2DB;
		border-radius: 25rpx;
	}

	.item-container {
		display: flex;
		flex-direction: column;
		width: 320rpx;
		height: 130rpx;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		border: 2rpx solid #CBF2DB;
		border-radius: 25rpx;
	}

	.text-2 {
		font-size: 30rpx;
		color: #333;
	}

	.text-3 {
		font-size: 24rpx;
		color: #e95d5d;
	}

	.text-4 {
		font-size: 19rpx;
		color: #e95d5d;
		margin-top: 4rpx;
	}

	.secTitle {
		padding: 20rpx;
		color: #333;
		font-size: 30rpx;
		font-weight: 300;
	}

	.zhifa {
		border-bottom: 1px solid #f8f8f8;
		background: #fff;
		display: flex;
		padding: 20rpx 20rpx 20rpx 30rpx;
		justify-content: space-between;
		font-size: 28rpx;
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

	.footer {
		position: fixed;
		width: 100%;
		bottom: 0px;
		left: 0px;
		height: 120rpx;
		line-height: 100rpx;
		display: flex;
		font-size: 30rpx;
		border-top: 2px solid #f8f8f8;
	}

	.heBox {
		width: 60%;
		text-indent: 20rpx;
		background-color: #fff;
		color: #333;
		font-size: 30rpx;
	}

	.list-container {
		padding-left: 20rpx;
	}

	.block-contrainer {
		display: inline-block;
		width: 50%;
		margin: 10rpx 0 10rpx 0;
	}


	.box-img {
		width: 40rpx;
		height: 40rpx;
	}

	.total-price {
		font-size: 38rpx;
		color: #e95d5d;
	}

	.right-bottom {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.colorBtn {
		width: 300rpx;
		height: 80rpx;
		background: #86e2ab;
		font-size: 30rpx;
		color: #FFFFFF;
		border-radius: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;

	}
	page {
		background: #ffffff;
	}
</style>
