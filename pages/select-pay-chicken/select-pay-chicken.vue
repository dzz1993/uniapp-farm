<template>
	<view>
		<view class='head-top-container'>
			<image class="head-top-img" v-if="headImgUrl" :src='headImgUrl'></image>
			<image class="head-top-img" v-else src='https://m.aoyifarm.com/Application/wx_img/center/grzx_default_user_icon.png'></image>
			<text class='top-name'>{{nickname}}</text>
			<text class='top-grade' v-if="is_landowner==0">普通用户</text>
			<text class='top-grade-dz' v-else>地主</text>
		</view>

		<view class='group-title'>
			<text class='title-text'>购买鸡组</text>
		</view>
		<view class='group-content-column'>
			<view class='group-content-row'>
				<text>鸡场名称</text>
				<text>{{chick_info.chick_greenhouse_name}}</text>
			</view>
		</view>
		<view class='group-content-column'>
			<view class='content-text'>
				{{chick_info.chick_intro}}
			</view>
		</view>

		<view class='group-content-column'>
			<view class='group-content-row'>
				<text>预计养殖周期</text>
				<text>{{chick_info.feed_months}}个月</text>
			</view>
		</view>

		<view class='group-content-column'>
			<view class='group-content-row'>
				<text>每组母鸡数量</text>
				<text>{{chick_info.chick_num_tc}}只</text>
			</view>
		</view>

		<view class='group-content-column'>
			<view class='group-content-row'>
				<text>预计开始派送时间</text>
				<text>{{chick_info.send_egg_date}}</text>
			</view>
		</view>

		<view class='group-content-column'>
			<view class='group-content-row'>
				<text>数量</text>
				<view class='nx'>
					<image class="box-img" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jian.png" @click="onJianClick"></image>
					<text class="box-num">{{current_pay_num}}组</text>
					<image class="box-img" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jia.png" @click="onJiaClick"></image>
				</view>
			</view>
		</view>

		<view class='group-content-column'>
			<view class='group-content-row'>
				<text>购鸡协议</text>
				<text class='ydxy' @click="onGoXieyiClick">请阅读并同意></text>
				<image class='box-img' @click="xieyiCheckboxChange" v-if="isXieyiCheck" src='http://res.aoyifarm.com/20180719/5b503e2fdf109.png'></image>
				<image class='box-img' @click="xieyiCheckboxChange" v-else src='http://res.aoyifarm.com/20180719/5b503e1233104.png'></image>
			</view>
		</view>

		<view class='group'>
			<view class='group-title'>
				<text class='title-text'>收货地址</text>
			</view>
			<view class='group-content-column'>
				<view class='group-content-row'>
					<image src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/position.png" class='big-img'></image>
					<view class='inner-column' @click='setAddress' v-if="address_id.length>0">
						<view class='inner-row'>
							<text>收货人：{{address_info.consignee}}</text>
							<text>电话：{{address_info.phone_mob}}</text>
						</view>
						<text>收货地址：{{address_info.region_name}}{{address_info.city}}{{address_info.address}}</text>
					</view>
					<view class='inner-column' @click='setAddress' v-else>
						<view class='inner-row'>
							<text>收货人：</text>
							<text></text>
						</view>
						<text>收货地址：</text>
					</view>
					<image class='goin-img' src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/goin.png"></image>
				</view>
			</view>
		</view>

		<view class='group'>
			<view class='group-title'>
				<text class='title-text'>优惠券与礼品卡</text>
			</view>
			<view class='group-content-column' @click="onCunponClick">
				<view class='group-content-row'>
					<text>优惠券</text>
					<view class="right">
						<text>{{coupon_info.name}}</text>
						<image class='goin-img' src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/goin.png"></image>
					</view>
				</view>
			</view>
			<view class='group-content-column' @click="goCardList">
				<view class='group-content-row'>
					<text>礼品卡</text>
					<view class="right-box">
						<view class="card-container">
							<view class="right-group-container" v-for="(item,index) in card_info" :key="index">
								<text>{{item.card_name}}</text>
							</view>
						</view>
						<image class='goin-img' src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/goin.png"></image>
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
					<text>鸡组价格</text>
					<text class='tips'>仅显示当前收货地区价格</text>
					<text>￥{{original_order_amount}}</text>
				</view>
			</view>
			<view class='group-content-column' v-if="reduce_money">
				<view class='group-content-row'>
					<text>优惠券</text>
					<text v-if="reduce_money>0">-￥{{reduce_money}}</text>
				</view>
			</view>
			<view class='group-content-column' v-if="card_info">
				<view class='group-content-row'>
					<text>礼品卡</text>
					<view class="right-box-a">
						<view class="right-group-container" v-for="(item,index) in card_info" :key="index">
							<text>-¥{{item.card_price}}</text>
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
				<view class='pintuan' catchtap='pinTuan' v-if="pintuan_enable==1">
					<text>拼团购买</text>
					<text>￥{{pintuan_price}}</text>
				</view>
				<view class='zhifu' @click="surePay">
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
				current_pay_num: 1, //买地数量
				disable_ticket: 0, //是否禁用优惠券 0不禁用 1禁用
				address_id: '', //用户地址id
				card_ids: '', //礼品卡id 用,号分隔
				ticket_id: '', //优惠券id
				chick_info: {},
				address_info: {},
				original_order_amount: 0, //套餐总金额
				reduce_money: 0, //券优惠金额
				pay_amount: 0, //实际支付金额
				isXieyiCheck: false, //是否勾选协议
				set_id: 0, //鸡套餐id

				card_info: [], //礼品卡列表
				coupon_info: {}, //优惠券信息

				headImgUrl: '',
				nickname: '',
				period_id: '',
				is_landowner: 0
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

			var period_id = options.period_id;
			this.period_id = period_id;

			if (parseFloat(this.globalData.user_info.is_landowner) == 1) {
				this.is_landowner = 1;
			} else {
				this.is_landowner = 0;
			}

			this.calc_maiji_order();
		},
		methods: {
			//获取套餐价格与介绍
			calc_maiji_order() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					period_id: this.period_id,
					num: this.current_pay_num,
					disable_ticket: this.disable_ticket,
				}
				if (this.address_id != '' && this.address_id != null) {
					param.address_id = this.address_id;
				}
				if (this.card_ids != '' && this.card_ids != null) {
					param.card_ids = this.card_ids;
				}
				if (this.ticket_id != '' && this.ticket_id != null) {
					param.ticket_id = this.ticket_id;
				}

				this.xm_config.calc_maiji_order(param)
					.then(function(res) {
						if (res.data.info != null) {

							that.chick_info = res.data.info;
							that.address_id = res.data.info.address_id;
							that.address_info = res.data.info.address_info;
							that.original_order_amount = res.data.info.original_order_amount;
							that.reduce_money = res.data.info.reduce_money;
							that.pay_amount = res.data.info.pay_amount;
							that.set_id = res.data.info.set_id;

							if (res.data.info.card_info != null) {
								that.card_info = res.data.info.card_info;
							} else {
								that.card_info = {};
							}
							if (res.data.info.coupon_info != null) {
								that.coupon_info = res.data.info.coupon_info;
							} else {
								that.coupon_info = {};
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onJianClick: function() {
				if (this.current_pay_num == 1) {
					uni.showToast({
						title: '购买数量不能小于1',
						icon: 'none'
					})
					return;
				}
				this.current_pay_num = --this.current_pay_num
				//计算价格
				this.calc_maiji_order();
			},

			onJiaClick: function() {

				this.current_pay_num = ++this.current_pay_num
				//计算价格
				this.calc_maiji_order();
			},

			//购鸡协议点击
			onGoXieyiClick: function() {
				uni.navigateTo({
					url: "../chicken_pro/chicken_pro"
				})
			},
			//同意协议点击
			xieyiCheckboxChange: function() {
				this.isXieyiCheck = !this.isXieyiCheck
			},


			//选择礼品卡列表
			goCardList: function() {
				//0菜地卡,1买鸡卡,2.菜园卡 ,3.菜地月卡, 4.菜园月卡
				uni.navigateTo({
					url: '../paycards/paycards?type=1' +
						'&num=' + this.current_pay_num +
						'&choose=' + this.card_ids +
						'&set_id=' + this.set_id
				})
			},


			//确认支付
			surePay: function() {

				//判断用地协议
				if (!this.isXieyiCheck) {
					uni.showToast({
						title: '请先勾选购鸡协议',
						icon: "none"
					})
					return;
				}

				//判断地址
				if (this.address_id == '' || this.address_id == null) {
					uni.showToast({
						title: '请选择收货地址',
						icon: "none"
					})
					return;
				}

				this.add_maiji_order();
			},


			//买地下单
			add_maiji_order: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					address_id: this.address_id,
					period_id: this.period_id,
					num: this.current_pay_num,
					disable_ticket: this.disable_ticket,
				}
				if (this.card_ids != '' && this.card_ids != null) {
					param.card_ids = this.card_ids;
				}
				if (this.ticket_id != '' && this.ticket_id != null) {
					param.ticket_id = this.ticket_id;
				}

				this.xm_config.add_maiji_order(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.order_id = res.data.info.order_id;
								if (res.data.info.is_pay == 1) {
									// 微信支付
									that.getWxParam();
								} else {
									uni.redirectTo({
										url: '../pay-chicken-success/pay-chicken-success?order_id=' + that.order_id,
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

				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: data.timeStamp + "",
					nonceStr: data.nonceStr,
					package: data.package,
					signType: 'MD5',
					paySign: data.sign,
					success: function(res) {
						uni.redirectTo({
							url: '../pay-chicken-success/pay-chicken-success?order_id=' + that.order_id,
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
							url: '../pay-chicken-success/pay-chicken-success?order_id=' + that.order_id,
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

			//跳转到设置地址
			setAddress: function() {
				uni.navigateTo({
					url: '../address/select-address-list/select-address-list',
				})
			},

			//设置地址id
			setAddressInfo: function(item) {
				if (item != null && item.id != null) {
					this.address_id = item.id;
				}
				this.calc_maiji_order();
			},

			//接收卡片数据
			setCardData: function(data1, data2) {
				if (data1 != null && data1.length != 0) {
					var card_ids = '';
					data1.forEach(v => {
						card_ids += v;
						card_ids += ',';
					})
					if (card_ids.length > 0) {
						card_ids = card_ids.substring(0, card_ids.length - 1)
					}
					this.card_ids = card_ids;
					//删除已选的优惠券, 并无法选择优惠券
					this.coupon_info = {};
					this.ticket_id = '';
				} else {
					delete this.card_ids;
				}
				if (data2 != null) {
					this.card_info = data2;
				}
				this.calc_maiji_order();
			},


			//选择优惠券
			onCunponClick: function() {
				uni.navigateTo({
					url: '../select-coupon-pay-field/select-coupon-pay-field?couponInfo=' +
						JSON.stringify(this.coupon_info) +
						"&goodTotalPrice=" + this.original_order_amount +
						'&coupon_type=3'
				})
			},

			//设置选中的优惠券
			setCunponData: function(couponInfo) {
				if (couponInfo == null) {
					this.coupon_info = {},
						this.disable_ticket = 1;
					delete this.ticket_id;
				} else {
					this.coupon_info = couponInfo;
					this.ticket_id = couponInfo.id;
					this.disable_ticket = 0;
				}
				this.calc_maiji_order();
			},


		}
	}
</script>

<style>
	.head-top-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx 40rpx;
		background: #f3f6fb;
	}

	.head-top-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 120rpx;
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

	.group-content-column {
		display: flex;
		flex-direction: row;
		padding: 16rpx 30rpx;
		background: #fff;
		justify-content: center;
		border-bottom: 1rpx solid #f2f5fa;
	}

	.group-content-row {
		display: flex;
		flex-direction: row;
		flex: 1;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #4c4c4c;
	}

	.content-text {
		font-size: 26rpx;
		color: #b2b2b2;
		display: flex;
		flex: 1;
	}

	.nx {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.box-img {
		width: 36rpx;
		height: 36rpx;
		margin: 10rpx;
	}

	.box-num {
		display: flex;
		width: 60rpx;
		justify-content: center;
	}

	.ydxy {
		text-decoration: none;
		color: #b2b2b2;
		font-size: 26rpx;
	}

	.group {
		display: flex;
		flex-direction: column;
	}

	.group-title {
		background-color: #f3f6fb;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		color: #b2b2b2;
		padding: 0 30rpx;
	}

	.big-img {
		width: 50rpx;
		height: 66rpx;
		margin-right: 20rpx;
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

	.goin-img {
		width: 15rpx;
		height: 28rpx;
		margin-left: 30rpx;
	}


	.right {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.right-box {
		display: flex;
		flex-direction: row;
		width: 500rpx;
		justify-content: flex-end;
		align-items: center;
	}

	.card-container {
		display: flex;
		flex-direction: column;
	}

	.right-group-container {
		display: flex;
		flex-direction: column;
	}


	.tips {
		color: #b2b2b2;
	}

	.right-box-a {
		display: flex;
		flex-direction: column;
		width: 500rpx;
		align-items: flex-end;
		justify-content: flex-end;

	}

	.right-group-container {
		display: flex;
		flex-direction: column;
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

	.pp-container {
		height: 250rpx;
		background: #f3f6fb;
	}
</style>
