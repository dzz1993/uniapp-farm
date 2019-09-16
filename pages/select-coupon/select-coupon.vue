<template>
	<view>
		<view class='cont-container'>
			<view class='container-list'>
				<block v-for="(item,index) in couponlist" :key="index">
					<view v-if="item.can_use == 1" class='coupon-item-container' @click='onSelectCouponListClick(index)'>
						<image v-if="item.active" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cheeck_yes.png' class='box-img'></image>
						<image v-else src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/check_no.png' class='box-img'></image>
						<view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh1.png');background-size: 100% 100%;">
							<view class='coupon-item-left'>
								<view class='coupon-item-price-des'>
									<view>
										<text class='price'>{{item.reduce_money}}</text>
										<text v-if="item.type == 1" class='price-danwei'>枚</text>
										<text v-else class='price-danwei'>元</text>
									</view>
									<text class='coupon-youxiaoqi'>{{item.start_time}} - {{item.end_time}}</text>
									<text class='coupon-des'>{{item.description}}</text>
								</view>
							</view>
							<image src='../../static/icon/xiantiao.png' class='xiantiao-img'></image>
							<text class='coupon-type'>{{item.type_name}}</text>
						</view>
					</view>

					<view v-else class='coupon-item-container'>
						<image v-if="item.active" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cheeck_yes.png' class='box-img'></image>
						<image v-else src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/check_no.png' class='box-img'></image>
						<view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh.png');background-size: 100% 100%;">
							<view class='coupon-item-left'>
								<view class='coupon-item-price-des'>
									<view>
										<text class='price-no'>{{item.reduce_money}}</text>
										<text v-if="item.type == 1" class='price-danwei-no'>枚</text>
										<text v-else class='price-danwei-no'>元</text>
									</view>
									<text class='coupon-youxiaoqi-no'>{{item.start_time}} - {{item.end_time}}</text>
									<text class='coupon-des-no'>{{item.description}}</text>
								</view>
							</view>
							<image src='../../static/icon/xiantiao.png' class='xiantiao-img'></image>
							<text class='coupon-type-no'>{{item.type_name}}</text>
						</view>
					</view>
				</block>
			</view>

			<view  class='use-text'>
				<text @click='onGoUseClick'>立即使用</text>
			</view>

			<view v-if="isShowNoList" class='tiShi'>
				<image class="noCard" src="https://m.aoyifarm.com/Application/wx_img/notfound.png"></image>
				<view>无可用的优惠券</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponlist: [],
				selectCouponInfo: {},
				goodTotalPrice: "",
				isShowNoList: true, //默认图不显示
				isShowBtn: false,
				couponType: "",

				pt_goods: '',
				goods_info: '',
				rec_ids: '',
				address_id: ""
			}
		},


		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var couponInfo = options.couponInfo;
			this.pt_goods = options.pt_goods
			this.goodTotalPrice = options.goodTotalPrice;

			var goods_info = options.goods_info;
			var rec_ids = options.rec_ids;
			var address_id = options.address_id;
			if (goods_info) {
				this.goods_info = JSON.parse(goods_info);
			} else if (rec_ids) {
				this.rec_ids = rec_ids
			}
			if (couponInfo != null && couponInfo != "" && couponInfo != "undefined") {
				var couponInfo = JSON.parse(couponInfo)
				this.selectCouponInfo = couponInfo;
			}
			this.address_id = address_id;

			this.select_market_coupon_bygoods();
		},

		methods: {
			//获取轮播图列表
			select_market_coupon_bygoods() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					pagenum: 50,
				}

				if (this.goods_info) {
					param.goods_id = this.goods_info.goods_id
					param.goods_num = this.goods_info.goods_num
				} else if (this.rec_ids) {
					param.rec_ids = this.rec_ids
				}
				param.address_id = this.address_id;

				this.xm_config.select_market_coupon_bygoods(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								for (var idx in res.data.info.coupon) {
									//处理数据
									res.data.info.coupon[idx].content_money = parseFloat(res.data.info.coupon[idx].content_money);
									if (res.data.info.coupon[idx].type == 1) {
										res.data.info.coupon[idx].reduce_money = parseFloat(res.data.info.coupon[idx].reduce_money).toFixed(0);
									} else {
										res.data.info.coupon[idx].reduce_money = parseFloat(res.data.info.coupon[idx].reduce_money).toFixed(2);
									}

									if (that.selectCouponInfo.id == res.data.info.coupon[idx].id) {
										res.data.info.coupon[idx].active = true;
									} else {
										res.data.info.coupon[idx].active = false;
									}

								}
								that.couponlist = res.data.info.coupon;
								that.goodTotalPrice = that.goodTotalPrice;
								that.isShowNoList = res.data.info.coupon.length > 0 ? false : true;
								that.isShowBtn = res.data.info.coupon.length > 0 ? true : false;
							} else {
								that.isShowNoList = true;
								that.isShowBtn = false;
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})

							that.isShowNoList = true;
							that.isShowBtn = false;
						}
					});
			},

			//选择优惠券
			onSelectCouponListClick: function(e) {
				var index = e.currentTarget.dataset.index;
				if (index !== "" && index != null) {

					for (var idx in this.couponlist) {
						if (parseInt(idx) == parseInt(index)) {
							this.couponlist[parseInt(index)].active = !this.couponlist[parseInt(index)].active;
						} else {
							this.couponlist[parseInt(idx)].active = false;
						}
					}
					this.couponlist = this.couponlist;
					this.goodTotalPrice = this.data.goodTotalPrice;
				}
			},
			//立即使用
			onGoUseClick: function() {
				var couponInfo;
				for (var idx in this.couponlist) {
					if (this.couponlist[idx].active) {
						couponInfo = this.couponlist[idx];
					}
				}

				//为上一个页面传递数据
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.setCunponBackData(couponInfo);
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.cont-container {
		padding-bottom: 140rpx;
	}

	.container-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 20rpx;
	}

	.container-list1 {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 20rpx;
	}

	.coupon-item-inner-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx;
		flex: 1;
		margin-left: 20rpx;
	}

	.coupon-item-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 20rpx 20rpx 20rpx;
	}

	.coupon-item-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		margin-left: 10rpx;
	}

	.box-img {
		width: 45rpx;
		height: 45rpx;
	}

	.coupon-item-price-des {
		display: flex;
		flex-direction: column;
	}

	.price {
		font-size: 70rpx;
		color: #ff7e00;
		font-weight: 500;
	}

	.price-no {
		font-size: 70rpx;
		color: #c2c2c2;
		font-weight: 500;
	}

	.price-danwei {
		font-size: 32rpx;
		color: #ff7e00;
		font-weight: 550;
	}

	.price-danwei-no {
		font-size: 32rpx;
		color: #c2c2c2;
		font-weight: 550;
	}

	.coupon-youxiaoqi {
		font-size: 22rpx;
		color: #666;
	}

	.coupon-youxiaoqi-no {
		font-size: 22rpx;
		color: #c2c2c2;
	}

	.coupon-des {
		font-size: 27rpx;
		color: #333;
	}

	.coupon-des-no {
		font-size: 27rpx;
		color: #c2c2c2;
	}

	.coupon-type {
		font-size: 35rpx;
		color: #ff7e00;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.coupon-type-no {
		font-size: 35rpx;
		color: #c2c2c2;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.xiantiao-img {
		width: 1px;
		height: 150rpx;
	}

	.use-text {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 130rpx;
		background-color: #f8f8f8;
	}

	.use-text text {
		display: block;
		font-size: 32rpx;
		color: #fff;
		background: #ff7e00;
		border-radius: 60rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		text-align: center;
		margin: 30rpx 80rpx 0rpx 80rpx;
	}

	.tiShi {
		padding-top: 200rpx;
		width: 250rpx;
		height: 200rpx;
		margin: 0rpx auto;
		text-align: center;
		color: #999;
		font-weight: 300;
	}

	.noCard {
		width: 200rpx;
		height: 190rpx;
	}

	.hide {
		display: none;
	}

	.show {
		display: block;
	}
</style>
