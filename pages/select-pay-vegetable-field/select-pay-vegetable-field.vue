<template>
	<view>
		<view class='head-top-container'>
			<image class="head-top-img" v-if="headImgUrl" :src='headImgUrl'></image>
			<image class="head-top-img" v-else src='https://m.aoyifarm.com/Application/wx_img/center/grzx_default_user_icon.png'></image>
			<text class='top-name'>{{nickname}}</text>
			<text class='top-grade' v-if="is_landowner==0">普通用户</text>
			<text class='top-grade-dz' v-else>地主</text>
		</view>
		<view class='cont-container'>
			<view class='group'>
				<view class='group-title'>
					<text class='title-text'>购地套餐</text>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>套餐类型</text>
						<view class='nx'>
							<view class="selected-tab" v-if="current_tab_tc_index==1" @click="onTaoCanTabClick(1)">家庭套餐</view>
							<view class="default-tab" v-else @click="onTaoCanTabClick(1)">家庭套餐</view>

							<view class="selected-tab" v-if="current_tab_tc_index==2" @click="onTaoCanTabClick(2)">宝宝辅食套餐</view>
							<view class="default-tab" v-else @click="onTaoCanTabClick(2)">宝宝辅食套餐</view>

							<view class="selected-tab" v-if="current_tab_tc_index==3" @click="onTaoCanTabClick(3)">全家福套餐</view>
							<view class="default-tab" v-else @click="onTaoCanTabClick(3)">全家福套餐</view>
						</view>
					</view>
					<view class='content-text'>
						{{landset_info}}
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>数量</text>
						<view class='nx'>
							<image class="box-img" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jian.png" @click="onJianClick"></image>
							<text class="box-num">{{current_pay_num}}</text>
							<image class="box-img" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jia.png" @click="onJiaClick"></image>
						</view>
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>购买时限</text>
						<view class='nx'>
							<view class="select-tab-p" @click="onTabClick(0)" catchtap='onTabClick' v-if="current_tab_index == 0">1个月</view>
							<view class="select-tab-n" @click="onTabClick(0)" v-else>1个月</view>

							<view class="select-tab-p" @click="onTabClick(1)" v-if="current_tab_index == 1">1年</view>
							<view class="select-tab-n" @click="onTabClick(1)" v-else>1年</view>
						</view>
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>配送次数</text>
						<text class='ydxy-noline'>单个套餐包含次数</text>
						<view class="right">
							<text class='week-day'>{{send_times}}次</text>
						</view>
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>用地协议</text>
						<text class='ydxy' @click="onGoXieyiClick">请阅读并同意></text>
						<image class='box-img' v-if="isXieyiCheck" src="http://res.aoyifarm.com/20180719/5b503e2fdf109.png" @click="xieyiCheckboxChange"></image>
						<image class='box-img' v-else src="http://res.aoyifarm.com/20180719/5b503e1233104.png" @click="xieyiCheckboxChange"></image>
					</view>
				</view>
			</view>
			<view class='group'>
				<view class='group-title'>
					<text class='title-text'>收菜地址</text>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<image src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/position.png" class='big-img'></image>
						<view class='inner-column' @click="setAddress" v-if='address_id.length>0'>
							<view class='inner-row'>
								<text>收货人：{{address_info.consignee}}</text>
								<text>电话：{{address_info.phone_mob}}</text>
							</view>
							<text>收货地址：{{address_info.region_name}}{{address_info.city}}{{address_info.address}}</text>
						</view>
						<view class='inner-column' @click="setAddress" v-else>
							<view class='inner-row'>
								<text>收货人：</text>
								<text></text>
							</view>
							<text>收货地址：</text>
						</view>
						<image class='goin-img' src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/goin.png"></image>
					</view>
				</view>
				<view class='group-content-column' @click="actionSheetTap">
					<view class='group-content-row'>
						<text>配送日期</text>
						<view class="right">
							<text class='week-day'>{{sendDay}}</text>
							<image class='goin-img' src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/goin.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view class='group'>
				<view class='group-title'>
					<text class='title-text'>优惠券与礼品卡（拼团不可用）</text>
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
				<view class='group-content-column'>
					<view class='group-content-row-a'>
						<text>礼品卡</text>
						<view class="right-box" @click="goCardList">
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
						<text>套餐金额</text>
						<text class='tips'>仅显示当前收货地区价格</text>
						<text>￥{{original_order_amount}}</text>
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row'>
						<text>优惠券</text>
						<text v-if="reduce_money>0">-￥{{reduce_money}}</text>
					</view>
				</view>
				<view class='group-content-column'>
					<view class='group-content-row-a'>
						<text>礼品卡</text>
						<view class="right-box-a">
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
				<view class='pintuan' catchtap='pinTuan' v-if="pintuan_enable==1">
					<text>拼团购买</text>
					<text>￥{{pintuan_price}}</text>
				</view>
				<view class='zhifu' @click="surePay">
					<text>确认支付</text>
				</view>
			</view>
		</view>

		<!--屏幕背景变暗的背景 -->
		<view class="commodity_screen" @click="hideModal" v-if="showModalStatus"></view>
		<!--弹出框 -->
		<view :animation="animationData" class="commodity_attr_box" v-if="showModalStatus">
			<block v-if="current_tab_tc_index==3">
				<block v-for="(item,index) in qjfList" :key="index">
					<text class="item-style" @click="bindSheetItem(index,item)">
						{{item}}
					</text>
				</block>
			</block>
			<block v-else>
				<block v-for="(item,index) in normalList" :key="index">
					<text class="item-style" @click="bindSheetItem(index,item)">
						{{item}}
					</text>
				</block>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current_tab_tc_index: 1, //套餐类型，默认第一个：家庭套餐
				is_landowner: 0, //是否地主：头部信息展示，默认普通用户
				current_pay_num: 1, //买地数量
				current_tab_index: 1, //购买时限  0：一个月  1：一年
				address_id: '', //用户地址id
				card_ids: '', //礼品卡id 用,号分隔
				ticket_id: '', //优惠券id
				disable_ticket: 0, //是否禁用优惠券 0不禁用 1禁用
				coupon_info: {}, //优惠券信息
				card_info: [], //礼品卡列表
				original_order_amount: 0, //套餐总金额
				reduce_money: 0, //券优惠金额
				pay_amount: 0, //实际支付金额
				pintuan_price: 0, //拼团支付价
				pintuan_enable: 0, //是否有拼团活动 0没有 1有
				isXieyiCheck: false, //是否勾选协议
				landset_info: "", //套餐价格与介绍
				address_info: {}, //地址信息
				buy_mode: 1, //购买时限（调接口传参）
				send_times: 0, //配送次数

				//地址状态
				index: "",
				//底部弹窗的data
				actionSheetHidden: true,
				normalList: ["每周一", "每周二", "每周三", "每周四", "每周五", "每周六"], //家庭套餐、宝宝套餐配送时间
				qjfList: ["每周一、每周三、每周五", "每周二、每周四、每周六"], //全家福套餐配送时间
				sendDay: "每周一", //显示的当前配送时间
				week_send_day: 1, //12套餐周几配送
				week_mode: 1, //全家福套餐 配送模式 0或不传为随机 1.一三五 2.二四六

				couponIsDisable: false, //是否可选优惠券

				headImgUrl: '',
				nickname: '',

				showModalStatus: false,
			}
		},

		onLoad() {
			this.get_landset_info();
			this.calc_maidiset_order_amount();

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
			//获取套餐价格与介绍
			get_landset_info() {
				var that = this;
				var param = {
					set_id: this.current_tab_tc_index,
				}

				this.xm_config.get_landset_info(param)
					.then(function(res) {
						if (res.data.status == 1) {
							that.landset_info = res.data.info.info;

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//计算订单金额
			calc_maidiset_order_amount() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					type: 1,
					disable_ticket: this.disable_ticket,
					buy_mode: this.current_tab_index == 1 ? 1 : 2,
					num: this.current_pay_num,
					set_id: this.current_tab_tc_index,
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

				this.xm_config.calc_maidiset_order_amount(param)
					.then(function(res) {
						if (res.data.status == 1) {

							if (res.data.info != null) {
								that.send_times = res.data.info.send_times;
								that.address_id = res.data.info.address_id;
								that.original_order_amount = res.data.info.original_order_amount;
								that.reduce_money = res.data.info.reduce_money;
								that.pay_amount = res.data.info.pay_amount;
								that.pintuan_price = res.data.info.pintuan_price;
								that.pintuan_enable = res.data.info.pintuan_enable;
								that.address_info = res.data.info.address_info;
								that.card_info = that.card_info;

								if (res.data.info.coupon_info != null) {
									that.coupon_info = res.data.info.coupon_info;
								} else {
									that.coupon_info = {};
								}
							}


						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})

							that.pay_amount = that.original_order_amount;
							that.couponIsDisable = false;
							that.card_info = {};
							that.reduce_money = 0;
							that.card_ids = '';
						}
					});
			},

			//切换套餐
			onTaoCanTabClick(index) {
				this.current_tab_tc_index = index;

				if (index == 1 || index == 2) {
					this.sendDay = this.normalList[0];
					this.week_send_day = 1;
				} else {
					this.sendDay = this.qjfList[0];
					this.week_mode = 1;
				}

				this.buy_mode = 1;
				this.card_info = [];
				this.card_ids = '';
				this.ticket_id = '';
				this.disable_ticket = 0;


				this.get_landset_info();
				this.calc_maidiset_order_amount();
			},

			//用地协议点击
			onGoXieyiClick: function() {
				uni.navigateTo({
					url: "../field_pro/field_pro"
				})
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
				this.calc_maidiset_order_amount();
			},

			onJiaClick: function() {

				this.current_pay_num = ++this.current_pay_num
				//计算价格
				this.calc_maidiset_order_amount();
			},

			//购买时限
			onTabClick: function(index) {
				var index = index;
				switch (index) {
					case 0:
						this.buy_mode = 2;
						this.current_tab_index = index;
						this.ticket_id = '';
						this.card_ids = '';
						this.card_info = [];
						this.coupon_info = {};
						break;
					case 1:
						this.buy_mode = 1;
						this.current_tab_index = index;
						this.ticket_id = '';
						this.card_ids = '';
						this.card_info = [];
						this.coupon_info = {};
						break;
				}
				this.calc_maidiset_order_amount();
			},

			bindSheetItem: function(index, item) {
				var item = item;
				var index = index;
				var set = this.current_tab_tc_index;
				switch (set) {
					case 1:
					case 2:
						this.sendDay = item;
						this.week_send_day = ++index;
						this.hideModal();
						break;
					case 3:
						this.sendDay = item;
						this.week_mode = ++index;
						this.hideModal();
						break;
				}
			},

			//同意协议点击
			xieyiCheckboxChange: function(e) {
				this.isXieyiCheck = !this.isXieyiCheck
			},

			//底部弹窗相关
			actionSheetTap: function(e) {
				this.showModal();
			},

			//选择优惠券
			onCunponClick: function() {
				uni.navigateTo({
					url: "../select-coupon-pay-field/select-coupon-pay-field?couponInfo=" +
						JSON.stringify(this.coupon_info) +
						"&goodTotalPrice=" + this.original_order_amount +
						'&coupon_type=1' +
						'&set_id=' + this.current_tab_tc_index,
				})
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
						'&set_id=' + this.current_tab_tc_index +
						'&num=' + this.current_pay_num +
						'&choose=' + this.card_ids
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
				this.calc_maidiset_order_amount();
			},

			//确认支付
			surePay: function() {

				//判断用地协议
				if (!this.isXieyiCheck) {
					uni.showToast({
						title: '请先勾选用地协议',
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

				this.add_maidi_order();
			},

			//买地下单
			add_maidi_order: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					address_id: this.address_id,
					set_id: this.current_tab_tc_index,
					disable_ticket: this.disable_ticket,
					buy_mode: this.buy_mode,
					num: this.current_pay_num,
					week_mode: this.week_mode,
					week_send_day: this.week_send_day,
				}
				if (this.card_ids != '' && this.card_ids != null) {
					param.card_ids = this.card_ids;
				}
				if (this.ticket_id != '' && this.ticket_id != null) {
					param.ticket_id = this.ticket_id;
				}

				this.xm_config.add_maidi_order(param)
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
				console.log("11111111111111111111111111111111111111111");
				console.log(this.order_id)

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

			//显示对话框
			showModal: function() {
				// 显示遮罩层
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: "linear",
					delay: 0
				})
				this.animation = animation
				animation.translateY(800).step()
				this.animationData = animation.export();
				this.showModalStatus = true;
				setTimeout(function() {
					animation.translateY(0).step()
					this.animationData = animation.export()
				}.bind(this), 200)
			},

			//隐藏对话框
			hideModal: function() {
				var that = this;
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: "linear",
					delay: 0
				})
				this.animation = animation
				animation.translateY(800).step()

				this.animationData = animation.export();

				setTimeout(function() {
					animation.translateY(0).step()
					that.animationData = animation.export(),
						that.showModalStatus = false
				}.bind(this), 200)
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
				this.calc_maidiset_order_amount();
			},

			//设置选中的优惠券
			setCunponData: function(couponInfo) {
				if (couponInfo == null) {
					this.coupon_info = {},
						delete this.ticket_id;
					this.disable_ticket = 1;
				} else {
					this.coupon_info = couponInfo;
					this.ticket_id = couponInfo.id;
					this.disable_ticket = 0;
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

	/*新的wxss写在这里*/
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

	.group-content-row-a {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 30rpx;
		color: #4c4c4c;
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





	/*结束*/




	.ljzf {
		background: #66dda6;
		color: #fff;
		display: flex;
		margin: 80rpx 40rpx 0 40rpx;
		align-items: center;
		justify-content: center;
		height: 80rpx;
	}


	.spm {
		color: #333;
		font-size: 28rpx;
	}

	.picker {
		color: #aaa;
		font-size: 28rpx;
	}

	.jc-container {
		color: #aaa;
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx;

	}

	.xq-jc-container {
		color: #aaa;
		font-size: 28rpx;
		display: flex;
		justify-content: flex-end;
	}

	.ysq {
		background: #c2c6c3;
		color: #fff;
		display: flex;
		margin: 80rpx 40rpx 0 40rpx;
		align-items: center;
		justify-content: center;
		height: 80rpx;
	}

	.sz-container {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		background: #fff;
		border-bottom: 1rpx solid #eff2f4;
		font-size: 32rpx;
		color: #000;
	}

	.mj-container {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		background: #fff;
		border-bottom: 1rpx solid #eff2f4;
		font-size: 32rpx;
		color: #000;
	}

	.sl-container {
		display: flex;
		flex-direction: column;
		padding: 20rpx 0rpx 10rpx 20rpx;
		background: #fff;
		border-bottom: 1rpx solid #eff2f4;
		font-size: 32rpx;
		color: #000;
	}

	.yhys {
		background: #e45904;
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
		color: #fff;
		font-size: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: -15rpx;
		top: -15rpx;
	}

	.lnyh {
		position: relative;
	}

	.sl-top-container {
		display: flex;
		justify-content: space-between;
		background: #fff;
		align-items: center;
	}

	.pscs {
		color: #aaa;
		font-size: 26rpx;
		margin-top: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slbg {
		background: #ebe8e8;
		padding: 5rpx 30rpx;
		font-size: 28rpx;
		color: #333;
	}

	.jian {
		padding: 5rpx 20rpx;
		font-size: 45rpx;
	}

	.jj-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.gmsx-container {
		display: flex;
		flex-direction: column;
		padding: 20rpx 20rpx 20rpx 20rpx;
		background: #fff;
		border-bottom: 1rpx solid #eff2f4;
		font-size: 32rpx;
		color: #000;
	}

	.gmsx {
		display: flex;
		justify-content: space-between;
	}


	.select-tab_tc-n {
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

	.select-tab_tc-p {
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

	.right-jt {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.jg-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
		background: #fff;
		padding: 40rpx;
		font-size: 30rpx;
		color: #000;
		border-bottom: 1rpx solid #eff2f4;
	}

	.spjg {
		margin-right: 20rpx;
		margin-top: 12rpx;
	}

	.yhq {
		margin-top: 12rpx;
	}

	.zhipayItem {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx 20rpx;
		align-items: center;
		border-bottom: 1rpx solid #eff2f4;
	}

	.ydxy-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
		color: #333;
		font-size: 28rpx;
	}

	.ydxy {
		margin-right: 20rpx;
		text-decoration: underline;
		text-underline-position: under;
	}


	.ydxy-noline {
		margin-right: 20rpx;
		text-decoration: none;
		color: #b2b2b2;
		font-size: 26rpx;
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

	.right-box-a {
		display: flex;
		flex-direction: column;
		width: 500rpx;
		align-items: flex-end;
		justify-content: flex-end;

	}

	.pp-container {
		height: 200rpx;
		background-color: #f3f6fb;

	}


	.card-container {
		display: flex;
		flex-direction: column;
	}

	.box-num {
		display: flex;
		width: 40rpx;
		justify-content: center;
	}

	.tips {
		color: #b2b2b2;
	}

	.item-style {
		display: flex;
		width: 100%;
		height: 80rpx;
		align-items: center;
		justify-content: center;
		border-bottom: 1rpx solid #eff2f4;
	}

	.commodity_screen {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		opacity: 0.2;
		overflow: hidden;
		z-index: 1000;
		color: #fff;
	}

	.commodity_attr_box {
		width: 100%;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2000;
		background: #fff;
	}
</style>
