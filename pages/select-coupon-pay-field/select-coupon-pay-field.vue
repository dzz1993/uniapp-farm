<template>
	<view class="page-container">
		<view class='container-list'>
			<block v-for="(item,index) in couponlist" :key="index">
				<view v-if="goodTotalPrice>=item.content_money" class='coupon-item-container' @click='onSelectCouponClick(index)'>
					<image :src='[item.active?"http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cheeck_yes.png":"http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/check_no.png"]'
					 class='box-img'></image>
					<view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh1.png');background-size: 100% 100%;">
						<view class='coupon-item-left'>
							<view class='coupon-item-price-des'>
								<view>
									<text class='price'>{{item.reduce_money}}</text>
									<text class='price-danwei'>元</text>
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
					<image :src='[item.active?"http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cheeck_yes.png":"http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/check_no.png"]'
					 class='box-img'></image>
					<view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh.png');background-size: 100% 100%;">
						<view class='coupon-item-left'>
							<view class='coupon-item-price-des'>
								<view>
									<text class='price-no'>{{item.reduce_money}}</text>
									<text class='price-danwei-no'>元</text>
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

		<view class="pp-container"></view>
		<view class='use-text' >
			<text @click='onGoUseClick'>立即使用</text>
		</view>
		<view class='tiShi' v-if="isShowNoList">
			<image class="noCard" src="https://m.aoyifarm.com/Application/wx_img/notfound.png"></image>
			<view>无可用的优惠券</view>
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
				set_id: '',
				coupon_type: ''
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var couponInfo = options.couponInfo;
			var coupon_type = options.coupon_type;
			var set_id = options.set_id;
			this.coupon_type = coupon_type
			this.set_id = set_id
			this.goodTotalPrice = options.goodTotalPrice;
			if (couponInfo != null && couponInfo != "") {
				var couponInfo = JSON.parse(couponInfo)
				this.selectCouponInfo = couponInfo;
			}

			this.select_coupon_record();
		},
		methods: {
			//获取优惠券列表
			select_coupon_record: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					pagenum: 50,
					is_used: 0,
					type: 2,
					use_conditions: this.coupon_type,
				}
				if (this.set_id) {
					param.set_id = this.set_id;
				}
				this.xm_config.select_coupon_record(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.couponlist != null) {
								for (var idx in res.data.info.couponlist) {
									//处理数据
									res.data.info.couponlist[idx].content_money = parseFloat(res.data.info.couponlist[idx].content_money);
									if (that.selectCouponInfo.id == res.data.info.couponlist[idx].id) {
										res.data.info.couponlist[idx].active = true;
									} else {
										res.data.info.couponlist[idx].active = false;
									}
								}
								that.couponlist = res.data.info.couponlist;
								that.goodTotalPrice = that.goodTotalPrice;
								that.isShowNoList = res.data.info.couponlist.length > 0 ? false : true;
									that.isShowBtn = res.data.info.couponlist.length > 0 ? true : false
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
			onSelectCouponClick: function(index) {
				var index = index;
				if (index !== "" && index != null) {
					for (var idx in this.couponlist) {
						if (idx == index) {
							this.couponlist[parseInt(index)].active = !this.couponlist[parseInt(index)].active;
						} else {
							this.couponlist[parseInt(idx)].active = false;
						}
					}

					this.couponlist = this.couponlist;
					this.goodTotalPrice = this.goodTotalPrice
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
				prevPage.$vm.setCunponData(couponInfo);
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
		height: 100%;
		width: 100%;
	}

	.container-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 20rpx;
		margin-bottom: 140rpx;
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
	
		
	.use-background {
		width: 100%;
		height: 160rpx;
		background-color: #FFFFFF;
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

	.pp-container {
		height: 100rpx;
	}
</style>
