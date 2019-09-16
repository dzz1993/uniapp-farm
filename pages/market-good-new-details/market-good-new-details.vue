<template>
	<view class="page">
		<view class="swiper-top-container">
			<swiper class="banner" indicator-dots="true" autoplay="true" interval="2000" duration="400" indicator-active-color="#80b477"
			 @change="swiperChange(index)">
				<block v-for="(item,index) in goods_info.goods_img" :key="index">
					<swiper-item @click="onSwiperItemClick(index)">
						<view class='slide-holder'>
							<image :src="item.image_url" class="slide-image"></image>
						</view>
					</swiper-item>
				</block>
			</swiper>
			<text class='slide-text'>{{index}}/{{goods_info.goods_img.length}}</text>
		</view>

		<view class='good-price-name-container'>
			<view>
				<text class='goods_name'>{{goods_info.goods_name}}</text>
				<!-- <text class='note_name'> {{goods_info.note_name}}</text> -->
			</view>
			<view class='jgg-container'>
				<!-- 促销价 -->
				<view class='good-price-num-container' v-if="goods_info.is_now_promote == 1">
					<view class='cx-price-container'>
						<text class='cx-y-price'>¥ {{goods_info.price}} </text>
						<view class='cx-price-con'>
							<text class='cx-price'>¥ {{goods_info.promote_price}} </text>
							<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cx_price.png' class='hyj-img'></image>
						</view>
					</view>
				</view>

				<!-- <view class='jjs' v-if="goods_info.is_now_promote == 1">距结束{{timerInfo.day}}天{{timerInfo.hrStr}}时{{timerInfo.minStr}}分{{timerInfo.secStr}}秒</view> -->

				<!-- 会员价 -->
				<view class='good-hy-price-num-container' v-else>
					<view class='hy-jg-container'>
						<text class='hy-y-price'>¥ {{goods_info.price}} </text>
						<view class='hyj-price-container'>
							<text class='hyj-price'>¥ {{goods_info.im_member_price}} </text>
							<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/member-img.png' class='hyj-img'></image>
						</view>
					</view>
				</view>


			</view>
			<view class="kd-des-container">



				<view class='good-price-num-container1'>
					<text>{{goods_info.post_info}}</text>
					<text>当前区域：{{goods_info.region_name}}</text>
				</view>
				<view class='good-price-des'>
					<text>{{goods_info.Logistics_dist}}</text>
				</view>
				<view class='good-price-num-container2'>
					<text>快递费价格和送达时间以下单为准</text>
				</view>
			</view>


		</view>
		<view class='log-container' v-if="goods_info.is_gift_card == 0">
			<view class='shoucai-log-container'>
				<text class='shoucai-log-text'>产地</text>
				<text class='shoucai-log-text1'>{{goods_info.temp_city}}</text>
			</view>
			<view class='line'></view>
			<view class='shoucai-log-container'>
				<text class='shoucai-log-text'>规格</text>
				<text class='shoucai-log-text1'>{{goods_info.unit_name}}*1</text>
			</view>
			<view class='line'></view>
			<view class='shoucai-log-container'>
				<text class='shoucai-log-text'>月销</text>
				<text class='shoucai-log-text1'>{{goods_info.sold_number}}笔</text>
			</view>
			<view class='line'></view>
			<view class='shoucai-log-container'>
				<text class='shoucai-log-text'>储存方式</text>
				<text class='shoucai-log-text1'>{{goods_info.storage_method}}</text>
			</view>
		</view>
		<view class="good-details-contrains">
			<view class='good-details'>
				<text>商品详情</text>
			</view>
			<view class='good-detatils-img'>
				<block v-for="(item,index) in goods_info.description_imgs" :key="index">
					<image class='goods-img' :src='item' mode='widthFix'></image>
				</block>
			</view>
		</view>

		<view class="footer" v-if="goods_info.kucun!=0">

			<view class='contactFarm' @click='onBasketClick'>
				<image class='contactFarm-log-img' src="/static/icon/cl.png"></image>
				<text class='contactFarm-log-text'>菜篮</text>
				<view class="redPoint" v-if="count>0">
					{{count}}
				</view>

			</view>
			<view class='add-gouwuche'>
				<view class="colorjiaruBtn" @click='onJiaruGouwuche'>
					加入菜篮
				</view>
				<view class="colorBtn" @click="payEnd">
					立即购买
				</view>
			</view>
		</view>

		<view class="footer_ysq" v-if="goods_info.kucun==0">
			<view class='ysq-statue-footer'>
				<text>已售罄</text>
			</view>
		</view>

		<view class="footer_ysq" v-if="goods_info.kucun!=0&&goods_info.is_gift_card == 1">
			<view class="ysq-statue-footer" @click="payEnd" style="background:url('http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/ljgm.png');background-size: 100% 100%;">
				立即购买
			</view>
		</view>


		<!--屏幕背景变暗的背景 -->
		<view class="commodity_screen" @click="hideModal" v-if="showModalStatus"></view>
		<!--弹出框 -->
		<view :animation="animationData" class="commodity_attr_box" v-if="showModalStatus">
			<view class='dialog-container'>
				<view class='close-container'>
					<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/gb.png' class='close-img-sp' @click="hideModal"></image>
				</view>
				<view class='dia-good-add-container'>
					<image :src='goods_info.default_image' class='dia-good-img'></image>
					<view class='good-price-name-container'>
						<text class='sp-goods-title'>{{goods_info.goods_name}}</text>

						<!-- 促销价 -->
						<view class='cx-sp-container' v-if="goods_info.is_now_promote == 1">
							<text class='cx-sp-y-good-price'>¥ {{goods_info.price}}</text>
							<view class='cx-sp-price-container'>
								<text class='cx-sp-price'>¥ {{goods_info.promote_price}} </text>
								<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cx_price.png' class='hyj-img'></image>
							</view>
						</view>
						<!-- 会员价 -->
						<view class='hyj-sp-container' v-else>
							<text class='sp-good-price'>¥ {{goods_info.price}}</text>
							<view class='hyj-price-container'>
								<text class='yhj-price'>¥ {{goods_info.member_price}} </text>
								<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/member-img.png' class='hyj-img'></image>
							</view>
						</view>

						<view class='kc-container'>
							库存
							<text class='good-kc'>{{goods_info.goods_number}}</text> 份
						</view>
					</view>
				</view>

				<view class='sp-num-container'>
					<text>购买数量</text>
					<view class='goods-add-container'>
						<image class='jian-img' @click='onJianClick()' src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jian.png'></image>
						<text class='good-num'>{{shop_goods_num}}</text>
						<image class='jia-img' @click='onJiaClick()' src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jia.png'></image>
					</view>
				</view>

				<view @click='addShopCarList' class='sp-sure'>确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {},
				index: 1,
				goods_id: "",
				shop_goods_num: 1,

				animation: '',
				animationData: '',
				showModalStatus: false,
				shopNum: 1,
			}
		},
		onLoad(options) {
			this.goods_id = options.goods_id;
			this.goods_info_detail();
		},
		methods: {
			swiperChange(index) {
				if ((this.goods_info.goods_img.length) == index) {
					this.index = 1
				} else {
					this.index = index + 1;
				}

			},
			onSwiperItemClick(index) {
				uni.showToast({
					title: index + "",
					mask: false,
					duration: 1500
				});
			},
			goods_info_detail() {
				var param = {
					user_id: this.globalData.user_info.userid,
					goods_id: this.goods_id,
				}
				var that = this;
				this.xm_config.goods_info_detail(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.goods_info != null) {

								if (res.data.info.goods_info.goods_img != null && res.data.info.goods_info.goods_img.length > 0) {
									for (var i = 0; i < res.data.info.goods_info.goods_img.length; i++) {
										res.data.info.goods_info.goods_img[i].image_url = that.utils.imageUrlUtils(res.data.info.goods_info.goods_img[
											i].image_url);
									}
								}

								res.data.info.goods_info.default_image = that.utils.imageUrlUtils(res.data.info.goods_info.default_image);
								that.goods_info = res.data.info.goods_info;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			/**
			 * 菜篮点击
			 */
			onBasketClick: function() {
				uni.switchTab({
					url: '../home-shop-car/home-shop-car',
				});
			},

			onJiaruGouwuche: function() {
				console.log(this.goods_info)
				if (this.goods_info.kucun == 0) {
					uni.showToast({
						icon: "none",
						title: '当前库存不足'
					})
					return;
				}
				this.showModal();
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

			//加入购物车
			addShopCarList: function() {
				var that = this;
				var goodInfo = this.currentGoodInfo;
				var param = {
					user_id: this.globalData.user_info.userid,
					goods_id: this.goods_info.goods_id,
					num: this.shop_goods_num
				}
				this.xm_config.add_cart(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '加入菜篮成功',
							})
							that.hideModal();

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onJianClick: function() {


				if (this.shop_goods_num == 1) {
					uni.showToast({
						icon: "none",
						title: '数量不能少于1'
					})
					return;
				}

				this.shop_goods_num = --this.shop_goods_num;
			},

			onJiaClick: function() {
				if (this.goods_info == null) {
					uni.showToast({
						icon: "none",
						title: '数据加载失败'
					})
					return;
				}

				if (this.goods_info.kucun == 0) {
					uni.showToast({
						icon: "none",
						title: '当前商品库存不足'
					})
					return;
				}

				if (this.shop_goods_num == this.goods_info.kucun) {
					uni.showToast({
						icon: "none",
						title: '当前商品库存不足'
					})
					return;
				}

				this.shop_goods_num = ++this.shop_goods_num;
			},

			//确认支付
			payEnd() {
				var orderInfo = {
					goods_id: this.goods_info.goods_id,
					shop_goods_num: this.shop_goods_num,
					goods_name: this.goods_info.goods_name,
					kucun: this.goods_info.kucun,
					price: this.goods_info.price,
					member_price: this.goods_info.member_price,
					unit_name: this.goods_info.unit_name,
					pt_goods: this.goods_info.pt_goods,
					is_now_promote: this.goods_info.is_now_promote,
					promote_price: this.goods_info.promote_price,
				}
				
				if (this.goods_info.is_gift_card == 1){
      uni.navigateTo({
        url: '../market-card-pay/market-card-pay?orderInfo=' + JSON.stringify(orderInfo),
      })
    }else{
      uni.navigateTo({
        url: '../market-pay/market-pay?orderInfo=' + JSON.stringify(orderInfo),
      })
    }
			}
		}
	}
</script>

<style lang="scss">
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
		height: 1000rpx;
		width: 100%;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2000;
		background: #fff;
	}

	.dialog-container {
		display: flex;
		flex-direction: column;
	}

	.close-container {
		display: flex;
		justify-content: flex-end;
		padding: 20rpx 20rpx 0 20rpx;
	}

	.close-img-sp {
		width: 40rpx;
		height: 40rpx;
	}

	.dia-good-add-container {
		display: flex;
		flex-direction: row;
		padding: 30rpx;
	}

	.dia-good-img {
		width: 200rpx;
		height: 260rpx;
		border-radius: 15rpx;
	}

	.good-price-name-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 20rpx;
	}

	.sp-goods-title {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 32rpx;
		color: #000;
	}

	.cx-sp-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}


	.cx-sp-y-good-price {
		color: #afafaf;
		font-size: 35rpx;
		font-weight: bold;
		text-decoration: line-through;
	}

	.cx-sp-price-container {
		display: flex;
		flex-direction: row;
		margin-left: 50rpx;
		align-items: center;
	}

	.cx-sp-price {
		font-size: 40rpx;
		color: #f7391b;
		font-weight: bold;
	}

	.hyj-sp-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.sp-good-price {
		color: #000000;
		font-size: 35rpx;
		font-weight: bold;
	}

	.hyj-price-container {
		display: flex;
		flex-direction: row;
		margin-left: 50rpx;
		align-items: center;
	}

	.yhj-price {
		font-size: 40rpx;
		color: #71e09e;
		font-weight: bold;
	}

	.hyj-img {
		width: 76rpx;
		height: 25rpx;
	}

	.kc-container {
		color: #999;
		font-size: 30rpx;
	}


	.good-kc {
		color: #51d8a9;
	}

	.sp-num-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30rpx;
	}


	.goods-add-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.jian-img {
		width: 40rpx;
		height: 40rpx;
		padding: 0 20rpx;
	}

	.jia-img {
		width: 40rpx;
		height: 40rpx;
		padding-left: 20rpx;
	}

	.good-num {
		color: #333;
		font-size: 30rpx;
	}


	.sp-sure {
		background: #51d8a9;
		color: #fff;
		border-radius: 80rpx;
		align-items: center;
		justify-content: center;
		padding: 15rpx 0;
		display: flex;
		margin: 400rpx 30rpx 0rpx 30rpx;
	}

	.swiper-top-container {
		width: 100%;
		height: 960rpx;
		position: relative;

		.banner {
			width: 100%;
			height: 960rpx;

			.slide-holder {
				width: 100%;
				height: 960rpx;
				background: url(https://m.viewcreator3d.cn/Application/wx_img/holderPhoto.png) no-repeat center 205rpx;

				.slide-image {
					width: 100%;
					height: 960rpx;
				}
			}
		}

		.slide-text {
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			color: #fff;
			background: #333;
			border-radius: 50rpx;
			font-size: 20rpx;
			margin: 8rpx;
			padding: 4px 10px;
			justify-content: space-around;
			opacity: 0.6
		}
	}

	.good-price-name-container {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		background: #fff;
		box-shadow: 0px 5px 20px -5px #ddd;

		.goods_name {
			font-size: 32rpx;
		}

		.note_name {
			font-size: 28rpx;
		}

		.jgg-container {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.good-price-num-container {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-end;
				padding: 10rpx 0rpx;

				.cx-price-container {
					display: flex;
					flex-direction: row;

					.cx-y-price {
						font-size: 35rpx;
						color: #afafaf;
						font-weight: bold;
						text-decoration: line-through;
					}

					.cx-price-con {
						display: flex;
						flex-direction: row;
						margin-left: 50rpx;
						align-items: center;

						.cx-price {
							font-size: 40rpx;
							color: #f7391b;
							font-weight: bold;
						}

						.hyj-img {
							width: 76rpx;
							height: 25rpx;
						}
					}
				}

			}

			.good-hy-price-num-container {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-end;
				padding: 10rpx 0rpx;


				.hy-jg-container {
					display: flex;
					flex-direction: row;

					.hy-y-price {
						font-size: 35rpx;
						color: #000000;
						font-weight: bold;
					}

					.hyj-price-container {
						display: flex;
						flex-direction: row;
						margin-left: 50rpx;
						align-items: center;

						.hyj-price {
							font-size: 40rpx;
							color: #71e09e;
							font-weight: bold;
						}

						.hyj-img {
							width: 76rpx;
							height: 25rpx;
						}
					}
				}
			}


		}

		.kd-des-container {
			display: flex;
			flex-direction: column;

			.good-price-num-container1 {
				display: flex;
				flex-direction: row;
				border-top: 1rpx solid #f2f2f4;
				padding: 10rpx 0rpx;
				color: #b4bbc2;
				text-align: center;
				font-size: 28rpx;
				justify-content: space-between;
			}

			.good-price-des {
				display: flex;
				color: #f72d2d;
				font-size: 26rpx;
			}

			.good-price-num-container2 {
				display: flex;
				flex-direction: row;
				padding: 10rpx 0rpx;
				color: #b4bbc2;
				text-align: center;
				font-size: 28rpx;
				justify-content: space-between;
			}
		}




	}

	.log-container {
		display: flex;
		flex-direction: row;
		background: #fff;
		margin: 20rpx 20rpx 10rpx 20rpx;
		box-shadow: 0px 5px 20px -5px #ddd;
		border-radius: 15rpx;

		.shoucai-log-container {
			display: flex;
			flex-direction: column;
			flex: 1;
			align-items: center;
			padding: 15rpx;

			.shoucai-log-text {
				font-size: 32rpx;
				padding-bottom: 10rpx;
				font-weight: bold;
			}

			.shoucai-log-text1 {
				color: #b4bbc2;
				font-size: 32rpx;
			}
		}

		.line {
			width: 2rpx;
			background: #f4f4f4;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}
	}


	.good-details-contrains {
		display: flex;
		flex-direction: column;
		box-shadow: 0px 5px 20px -5px #ddd;
		border-radius: 15rpx;
		margin: 20rpx 20rpx 180rpx 20rpx;
		background: #fff;
		padding-bottom: 20rpx;

		.good-details {
			display: flex;
			justify-content: center;
			padding-top: 20rpx;
			border-bottom: 1rpx solid #f2f2f4;
			padding-bottom: 20rpx;
			padding-left: 20rpx;
		}

		.good-detatils-img {
			padding: 0 20rpx;
			background: #fff;

			.goods-img {
				width: 100%;
				padding: 0;
			}
		}
	}

	.footer_ysq {
		position: fixed;
		width: 100%;
		bottom: 0px;
		left: 0px;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		background: #dedede;
		justify-content: space-between;
		font-size: 30rpx;

		.ysq-statue-footer {
			color: #fff;
			font-size: 30rpx;
			align-items: center;
			justify-content: center;
			width: 100%;
			display: flex;
		}
	}

	.footer {
		position: fixed;
		width: 100%;
		bottom: 0rpx;
		left: 0px;
		height: rpx;
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		background: #fff;

		.contactFarm {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			flex: 1;
			height: 100rpx;
			position: relative;

			.contactFarm-log-img {
				width: 40rpx;
				height: 40rpx;
				color: #b4bbc2;
			}

			.contactFarm-log-text {
				font-size: 25rpx;
				font-weight: 300;
				text-align: center;
			}
		}

		.add-gouwuche {
			display: flex;
			flex-direction: row;

			.colorjiaruBtn {
				width: 200rpx;
				text-align: center;
				background-color: #aae4a0;
				color: #fff;
				display: flex;
				height: 100rpx;
				align-items: center;
				justify-content: center;
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
	}
</style>
