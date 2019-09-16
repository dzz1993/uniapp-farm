<template>
	<view>
		<view v-if="good_list.length>0">
			<view class="list-top">
				<view class='top-title'>
					<image v-if="type == 1" src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jrcz111.png' class='jrcz-img'></image>
					<image v-else src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/crcz111.png' class='jrcz-img'></image>
					<image class='delete-img' src="../../static/icon/delete_img.png" @click="onDeleteClick"></image>
				</view>
			</view>

			<view class="goodsList">
				<view class="a-gooods" v-for="(item,index) in good_list" :key="index">
					<view class="a-goods-conts" @touchstart="touchS" @touchmove="touchM" @touchend="touchE">
						<view class="goods-info">
							<image class='box-img' v-if="item.active" src="http://res.aoyifarm.com/20180719/5b503e2fdf109.png" @click="selectTap(index)"></image>
							<image class='box-img' v-else src="http://res.aoyifarm.com/20180719/5b503e1233104.png" @click="selectTap(index)"></image>
							<view class="img-box">
								<image class="no-goods-image" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/noGoods.png" v-if="item.goods_number == 0"
								 @click="selectTap(index)"></image>
								<image :src="item.goods_image" class="img" mode='aspectFill' @click="selectTap(index)" />
							</view>

							<view class='goods-info-right' @click="selectTap(index)">
								<text class='goods-title'>{{item.goods_name}}</text>
								<text class='goods-dw'>{{item.unit_name}}</text>

								<view class='price-add-container' @click="selectTap(index)">
									<view class='sp-price-container' v-if="item.is_now_promote == 1">
										<text class='cx-goods-price'>¥ {{item.promote_price}}</text>
										<view class='hyj-price-container'>
											<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cx_price.png' class='hyj-img'></image>
										</view>
									</view>
									<view v-else @click="selectTap(index)">
										<view class='sp-price-container' v-if="is_paymember == 1">
											<text class='goods-price'>¥ {{item.member_price}}</text>
											<view class='hyj-price-container' v-if="item.is_gift_card == 0">
												<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/member-img.png' class='hyj-img'></image>
											</view>
										</view>
										<text class='goods-price' v-else>¥ {{item.price}}</text>
									</view>
									<view class='goods-add-container'>
										<image class='jian-img' @click="onJianClick(index,item)" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jian.png'></image>
										<text class='good-num'>{{item.quantity}}</text>
										<image class='jia-img' @click="onJiaClick(index,item)" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jia.png'></image>
									</view>
								</view>
							</view>

						</view>

						<view class="delete-btn" catchtap="delItem">
							删除
						</view>
					</view>
				</view>
			</view>

			<view class="jiesuan-box">
				<view class="left-price">

					<view class="all-selected  active" v-if="allSelect" @click="bindAllSelect">全选</view>
					<view class="all-selected" v-else @click="bindAllSelect">全选</view>
					<view class="total" v-if="!noSelect">
						<text class='sj-text'>合计：</text> ¥ {{totalPrice}}
					</view>
				</view>
				<view class="to-pay-btn no-select" v-if="noSelect"  @click="toPayOrder">去结算</view>
				<view class="to-pay-btn" v-else  @click="toPayOrder">去结算</view>

			</view>
		</view>

		<view v-else>
			<view class="no-goods">
				<view class="title-box">
					菜篮空空如也～
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				good_list: [],
				delBtnWidth: 60,
				saveHidden: true,
				totalPrice: 0,
				allSelect: false,
				noSelect: true,
				delete_type: 0,
				startX: 0,
				is_paymember: 1,
				currentShopCarIndex: 0,
				shopCarType: 0
			}
		},

		onLoad() {
			
		},
		
		onShow() {
			this.get_cart();
		},
		methods: {
			get_cart() {
				var that = this;
				if (!that.globalData.user_info.userid) {
					return
				}
				
				var param = {
					user_id: this.globalData.user_info.userid,
				}

				this.xm_config.get_cart(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.list != null) {
								for (var idx in res.data.info.list) {
									//修改图片数据
									res.data.info.list[idx].goods_image = that.utils.imageUrlUtils(res.data.info.list[idx].goods_image);
								}
								that.good_list = res.data.info.list
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},
			
			onPullDownRefresh() {
				this.page = 1;
				this.get_cart();
			},

			selectTap: function(index) {
				console.log(this.good_list)
				var index = index;
				var list = this.good_list;
				if (index !== "" && index != null) {
					list[parseInt(index)].active = !list[parseInt(index)].active;
					this.setGoodsList(this.getSaveHide(), this.totalPriceF(), this.allSelectF(), this.noSelectF(), list);
				}
			},

			touchS: function(e) {

				if (e.touches.length == 1) {
					console.log(e.touches[0].clientX);
					this.startX = e.touches[0].clientX;
				}
			},
			touchM: function(e) {
				var index = e.currentTarget.dataset.index;

				if (e.touches.length == 1) {
					var moveX = e.touches[0].clientX;
					var disX = this.startX - moveX;
					var delBtnWidth = this.delBtnWidth;
					var left = "";
					if (disX == 0 || disX < 0) { //如果移动距离小于等于0，container位置不变
						left = "margin-left:0px";
					} else if (disX > 0) { //移动距离大于0，container left值等于手指移动距离
						left = "margin-left:-" + disX + "px";
						if (disX >= delBtnWidth) {
							left = "left:-" + delBtnWidth + "px";
						}
					}
					var list = this.good_list;
					if (index != "" && index != null) {
						list[parseInt(index)].left = left;
						this.setGoodsList(this.getSaveHide(), this.totalPriceF(), this.allSelectF(), this.noSelectF(), list);
					}
				}
			},

			touchE: function(e) {
				var index = e.currentTarget.dataset.index;
				if (e.changedTouches.length == 1) {
					var endX = e.changedTouches[0].clientX;
					var disX = this.startX - endX;
					var delBtnWidth = this.delBtnWidth;
					//如果距离小于删除按钮的1/2，不显示删除按钮
					var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
					var list = this.good_list;
					if (index !== "" && index != null) {
						list[parseInt(index)].left = left;
						this.setGoodsList(this.getSaveHide(), this.totalPriceF(), this.allSelectF(), this.noSelectF(), list);
					}
				}

			},

			onDeleteClick: function() {
				var that = this;

				var list = this.good_list;
				var list = list.filter(function(curGoods) {
					return curGoods.active;
				});

				if (list.length == 0) {
					uni.showToast({
						title: '请选择要删除的数据',
						icon: "none"
					})

					return;
				}
				uni.showModal({
					title: '温馨提示',
					content: '确定要删除吗？',
					success: function(res) {
						if (res.confirm) {
							that.delete_type = 2;
							that.deleteShopCarItem()
						}
					}
				})


			},

			deleteShopCarItem: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
				}
				if (this.delete_type == 1) {
					var list = this.good_list;
					param.rec_ids = list[parseFloat(this.delete_index)].rec_id
				} else if (this.delete_type == 2) {
					var rec_ids = "";
					var list = this.good_list;
					var list = list.filter(function(curGoods) {
						return curGoods.active;
					});
					for (var i = 0; i < list.length; i++) {
						rec_ids += list[i].rec_id + ","
					}
					param.rec_ids = rec_ids.substring(0, rec_ids.length);
				} else {
					return;
				}

				this.xm_config.delete_cart(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (that.delete_type == 1) {
								var list = that.good_list;
								list.splice(that.delete_index, 1);
								that.setGoodsList(that.getSaveHide(), that.totalPriceF(), that.allSelectF(), that.noSelectF(), list);
							} else if (that.delete_type == 2) {
								var list = that.good_list;
								list = list.filter(function(curGoods) {
									return !curGoods.active;
								});
								that.setGoodsList(that.getSaveHide(), that.totalPriceF(), that.allSelectF(), that.noSelectF(), list);
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});

				utils.request(xm_config.delete_cart, param, this.parseDelShopCarGoodsListData)
			},

			onJianClick: function(index, item) {
				var index = index;
				var item = item;
				this.currentShopCarIndex = index;
				this.shopCarType = 1;
				if (item.quantity == 1) {
					wx.showToast({
						title: '该商品不能减少了哦',
					})
					return;
				}

				this.edit_cart();
			},

			onJiaClick: function(index, item) {
				var index = index;
				this.currentShopCarIndex = index;
				this.shopCarType = 2;

				this.edit_cart();
			},

			//编辑购物车数量
			edit_cart: function() {
				var that = this;
				var index = this.currentShopCarIndex;
				var shopNum = this.good_list[index].quantity

				var param = {
					rec_id: this.good_list[index].rec_id,
				}

				//减少数量
				if (this.shopCarType == 1) {
					param.num = --shopNum;
				}

				//增加数量
				if (this.shopCarType == 2) {
					param.num = ++shopNum;
				}
				this.xm_config.edit_cart(param)
					.then(function(res) {
						if (res.data.status == 1) {
							//减少数量
							if (that.shopCarType == 1) {
								that.good_list[that.currentShopCarIndex].quantity--;
								that.setGoodsList(that.getSaveHide(), that.totalPriceF(), that.allSelectF(), that.noSelectF(), that.good_list);
							}

							//增加数量
							if (that.shopCarType == 2) {
								that.good_list[that.currentShopCarIndex].quantity++;
								that.setGoodsList(that.getSaveHide(), that.totalPriceF(), that.allSelectF(), that.noSelectF(), that.good_list);
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},


			//全选
			bindAllSelect: function() {
				var currentAllSelect = this.allSelect;
				var list = this.good_list;
				if (currentAllSelect) {
					for (var i = 0; i < list.length; i++) {
						var curItem = list[i];
						curItem.active = false;
					}
				} else {
					for (var i = 0; i < list.length; i++) {
						var curItem = list[i];
						if (curItem.goods_number == 0) {

							curItem.active = false;
						} else {
							curItem.active = true;
						}

					}
				}
				this.setGoodsList(this.getSaveHide(), this.totalPriceF(), !currentAllSelect, this.noSelectF(), list);
			},

			//设置数据
			setGoodsList: function(saveHidden, total, allSelect, noSelect, list) {

				this.saveHidden = saveHidden;
				this.good_list = list;
				this.totalPrice = parseFloat(total).toFixed(2);
				this.allSelect = allSelect;
				this.noSelect = noSelect;
			},

			getSaveHide: function() {
				var saveHidden = this.saveHidden;
				return saveHidden;
			},

			//计算价格
			totalPriceF: function() {
				var list = this.good_list;
				var total = 0;
				for (var i = 0; i < list.length; i++) {
					var curItem = list[i];
					if (curItem.active) {
						if (curItem.is_now_promote == 1) {
							total += parseFloat(curItem.promote_price) * curItem.quantity;
						} else if (this.is_paymember == 1) {
							total += parseFloat(curItem.member_price) * curItem.quantity;
						} else {
							total += parseFloat(curItem.price) * curItem.quantity;
						}

					}
				}
				total = parseFloat(total.toFixed(2)); //js浮点计算bug，取两位小数精度
				return total;
			},

			allSelectF: function() {
				var list = this.good_list;
				var allSelect = false;
				for (var i = 0; i < list.length; i++) {
					var curItem = list[i];
					if (curItem.active) {
						allSelect = true;
					} else {
						allSelect = false;
						break;
					}
				}
				return allSelect;
			},

			noSelectF: function() {
				var list = this.good_list;
				var noSelect = 0;
				for (var i = 0; i < list.length; i++) {
					var curItem = list[i];
					if (!curItem.active) {
						noSelect++;
					}
				}
				if (noSelect == list.length) {
					return true;
				} else {
					return false;
				}
			},

			toPayOrder: function() {
				var list = this.good_list;
				var select_goods_list = list.filter(function(curGoods) {
					return curGoods.active;
				});

				if (select_goods_list.length == 0) {
					wx.showToast({
						title: '请选择要结算的商品',
						icon: 'none'
					})
					return;
				}

				//如果有商品无库存，则提示：您选择的商品无库存
				for (var i = 0; i < select_goods_list.length; i++) {
					if (select_goods_list[i].goods_number == 0) {
						wx.showToast({
							title: '您选择的商品无库存',
							icon: 'none'
						})
						return;
					}
				}

				uni.navigateTo({
					url: '../market-shop-car-pay/market-shop-car-pay?select_goods_list=' + JSON.stringify(select_goods_list),
				});
			},
		}
	}
</script>

<style>
	.nav-container {
		display: flex;
		flex-direction: column;
	}

	.nav-title {
		display: flex;
		justify-content: center;
		height: 44px;
		align-items: center;
		color: #fff;
		font-size: 35rpx;
	}

	page {
		background: #f3f6fb;
	}

	.no-goods {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.title-box {
		width: 100%;
		padding-top: 330rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999;
		background: url(https://m.viewcreator3d.cn/Application/wx_img/icon-cart.png) no-repeat center 205rpx;
		background-size: 100rpx auto;
		margin-bottom: 50rpx;
	}

	.list-top {
		width: 100%;
		display: flex;
		flex-direction: row;
		height: 200rpx;
		background: #85DFA3;
	}

	.jrcz-img {
		width: 238rpx;
		height: 30rpx;
	}

	.list-top .label {
		color: #000;
	}

	.list-top .edit-btn {
		color: #999;
		height: 100%;
	}

	.jiesuan-box {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		align-items: center;
		border-bottom: 1px solid #eee;
		border-top: 1px solid #eee;
		background-color: #fff;
	}

	.jiesuan-box .to-pay-btn {
		width: 240rpx;
		text-align: center;
		line-height: 100rpx;
		background-color: #49d9a8;
		font-size: 32rpx;
		color: #fff;
	}

	.jiesuan-box .to-pay-btn.no-select {
		background-color: #ccc;
	}

	.jiesuan-box .left-price {
		display: flex;
		width: 510rpx;
		justify-content: space-between;
		line-height: 100rpx;
		padding: 0 30rpx 0 18rpx;
		font-size: 28rpx;
		box-sizing: border-box;
	}

	.qx-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 40rpx;
	}

	.jiesuan-box .all-selected {
		padding-left: 90rpx;
		color: #b4bbc2;
		background: url(http://res.aoyifarm.com/20180719/5b503e1233104.png) no-repeat 30rpx center;
		background-size: 40rpx auto;
	}

	.jiesuan-box .all-selected.active {
		background: url(http://res.aoyifarm.com/20180719/5b503e2fdf109.png) no-repeat 30rpx center;
		background-size: 40rpx auto;
	}

	.sj-text {
		color: #333;
		font-size: 30rpx;
		font-weight: normal;
	}

	.jiesuan-box .total {
		color: #e64340;
		font-size: 30rpx;
		font-weight: bold;
	}

	.delete-btn {
		width: 120rpx;
		background: #e64340;
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 25rpx;
	}

	.delete-img {
		width: 40rpx;
		height: 40rpx;
	}

	.top-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		height: 80rpx;
		padding: 0 40rpx;
	}

	/********************之前购物车样式列表************************/

	.goodsList {
		width: 100%;
		margin-top: -110rpx;
		padding-bottom: 150rpx;
	}

	.a-gooods {
		width: 100%;
		overflow: hidden;
	}

	.a-goods-conts {
		display: flex;
		justify-content: space-between;
		width: 870rpx;
		box-sizing: border-box;
		transition: margin-left 0.2s ease-in-out;
	}

	.goods-info {
		display: flex;
		box-sizing: border-box;
		width: 690rpx;
		padding: 20rpx;
		overflow: hidden;
		box-shadow: 0px 5px 20px -5px #ddd;
		background: #fff;
		align-items: center;
		margin: 0rpx 30rpx 30rpx 30rpx;
		border-radius: 15rpx;
	}

	.goods-info-right {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.goods-info .img-box {
		width: 160rpx;
		height: 160rpx;
		overflow: hidden;
		margin-right: 20rpx;
		background-color: #d8d8d8;
	}

	.goods-info .img-box .img {
		width: 160rpx;
		height: 160rpx;
	}

	.no-goods-image {
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		margin: 20rpx;
		opacity: 1;
	}

	.goods-title {
		color: #333;
		font-size: 32rpx;
	}

	.goods-dw {
		color: #b4bbc2;
		font-size: 30rpx;
		padding: 10rpx 0;
	}

	.goods-price {
		color: #71e09e;
		font-size: 30rpx;
		font-weight: bold;
	}

	.cx-goods-price {
		color: #f7391b;
		font-size: 30rpx;
		font-weight: bold;
	}

	.goods-add-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.good-num {
		color: #333;
		font-size: 30rpx;
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

	.price-add-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.box-img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	/***********标题栏********************/

	.top-visibility {
		visibility: hidden;
	}

	.navigator {
		height: 44px;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		display: flex;
		flex-direction: row;
	}

	.leftButton {
		width: 50px;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.leftButton>image {
		width: 25px;
		height: 25px;
	}

	.title {
		height: 44px;
		margin-right: 50px;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title>text {
		font-size: 16px;
		color: #fff;
		font-weight: 500;
	}

	.remind-img {
		width: 95rpx;
		height: 95rpx;
		margin-top: 25rpx;
	}

	.gif-container {
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		color: #999;
		font-size: 20rpx;
		flex-direction: row;
	}

	.gyj-text {
		color: #999;
		font-size: 22rpx;
		margin-bottom: 4rpx;
		margin-top: 33rpx;
	}

	.ctfw-right {
		display: flex;
		margin-left: 30rpx;
		flex-direction: column;
	}

	.hyj-img {
		width: 89rpx;
		height: 25rpx;
	}

	.jg-container {
		display: flex;
		flex-direction: row;
	}

	.hyj-price-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.sp-price-container {
		display: flex;
		flex-direction: row;
	}
</style>
