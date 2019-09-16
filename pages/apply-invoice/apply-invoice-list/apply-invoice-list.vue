<template>
	<view>
		<view class="item-list-container">
			<block v-for="(item,outIndex) in apply_invoice_list" :key="outIndex">
				<view class="month-name">
					<text class="month-name-text">{{item.month}}</text>
				</view>
				<block v-for="(item,index) in item.lists" :key="index">
					<view class='item-container' @click="boxOnItemClick(outIndex,index)">
						<image class="box-img" v-if="item.active" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/duihao.png"></image>
						<image class="box-img" v-if="!item.active" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/check_no.png"></image>
						<view class="container-right">
							<view class='item-left'>
								<text class="pay-time">{{item.pay_time}}</text>
								<view class="goods-info" v-for="(item,index1) in item.goods_lists" :key="index1">
									<text class="goods-name">{{item.goods_name}}</text>
									<text class="good-num">x {{item.num}}</text>
								</view>
							</view>
							<text class="pay-money">￥{{item.pay_money}}</text>
						</view>


					</view>
				</block>
			</block>
		</view>

		<view v-if="isShowBottom" class="bottom-container">
			<view class='bottom-left'  @click="allBoxOnClick">
				<image class="box-img" v-if="allSelect" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/duihao.png"></image>
				<image class="box-img" v-if="!allSelect" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/check_no.png"></image>
				<text class='item-left'>全选</text>
			</view>
			<view class='bottom-right'>
				<text><text class="heji">合计:</text>￥{{totalPrice}}</text>
				<view class='btn-next' @click="onNextClick">下一步</view>
			</view>
		</view>

		<view class='tiShi' v-if="isShowNoList">
			<image class="noCard" src="https://m.aoyifarm.com/Application/wx_img/notfound.png"></image>
			<view>暂无发票</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				apply_invoice_list: [],
				isShowNoList: false,
				totalPrice: 0,
				isShowBottom: false,
				allSelect: false,

			}
		},

		onLoad() {
			this.get_order_isinvoice_new();
		},
		methods: {
			//获取首页商品列表
			get_order_isinvoice_new() {
				var that = this;
				var param = {
					buyer_id: this.globalData.user_info.userid,
					pagenum: 50,
				}
				this.xm_config.get_order_isinvoice_new(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								for (var idx in res.data.info) {
									for (var index in res.data.info[idx].lists) {
										res.data.info[idx].lists[index].active = false;
									}

								}
								that.apply_invoice_list = res.data.info;
								that.isShowNoList = res.data.info.length > 0 ? false : true;
								that.totalPrice = (that.totalPrice * 1).toFixed(2);
								that.isShowBottom = res.data.info.length > 0 ? true : false;

							} else {
								that.apply_invoice_list = [];
								that.isShowNoList = true;
								that.totalPrice = (that.totalPrice * 1).toFixed(2);
								that.isShowBottom = false;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}

					});
			},

			boxOnItemClick: function(outIndex, index) {
				var idx = outIndex;
				var index = index;
				this.apply_invoice_list[idx].lists[index].active = !this.apply_invoice_list[idx].lists[index].active;
				var allSelect = this.allSelectMon();



				//计算价格
				var totalPrice = 0;
				var select_invoice_list = [];
				for (var idx in this.apply_invoice_list) {
					for (var index in this.apply_invoice_list[idx].lists) {
						if (this.apply_invoice_list[idx].lists[index].active) {
							totalPrice += parseFloat(this.apply_invoice_list[idx].lists[index].pay_money);
							select_invoice_list.push(this.apply_invoice_list[idx].lists[index]);
						}
					}

				}

				this.apply_invoice_list = this.apply_invoice_list;
					this.allSelect = allSelect;
					this.totalPrice = (totalPrice * 1).toFixed(2);

			},

			allBoxOnClick: function() {
				//已经全选则取消全选
				var allSelect = this.allSelectMon()
				var totalPrice = 0;
				if (allSelect) {
					for (var idx in this.apply_invoice_list) {
						for (var index in this.apply_invoice_list[idx].lists) {
							this.apply_invoice_list[idx].lists[index].active = false;
						}
						totalPrice = 0;
					}
				} else {
					for (var idx in this.apply_invoice_list) {
						for (var index in this.apply_invoice_list[idx].lists) {
							this.apply_invoice_list[idx].lists[index].active = true;
							if (this.apply_invoice_list[idx].lists[index].active) {
								totalPrice += parseFloat(this.apply_invoice_list[idx].lists[index].pay_money);
							}
						}

					}
				}

				this.apply_invoice_list = this.apply_invoice_list;
					this.allSelect = !allSelect;
					this.totalPrice = (totalPrice * 1).toFixed(2);

			},

			onNextClick: function() {
				var ids = "";
				for (var idx in this.apply_invoice_list) {
					for (var index in this.apply_invoice_list[idx].lists) {
						if (this.apply_invoice_list[idx].lists[index].active) {
							ids += this.apply_invoice_list[idx].lists[index].order_id + ","
						}
					}

				}

				if (ids == "") {
					wx.showToast({
						title: '请选择发票',
						icon: "none"
					})
					return;
				}

				uni.navigateTo({
					url: '../apply-invoice-details/apply-invoice-details?order_ids=' + ids.substring(0, ids.length - 1) +
						"&totalPrice=" + this.totalPrice,
				})

			},


			//判断当前是否是全选状态
			allSelectMon: function() {
				var list = this.apply_invoice_list;
				var allSelect = false;
				for (var i = 0; i < list.length; i++) {
					for (var j = 0; j < list[i].lists.length; j++) {
						var curItem = list[i].lists[j];
						if (curItem.active) {
							allSelect = true;
						} else {
							allSelect = false;
							break;
						}
					}
				}
				return allSelect;
			},
		}
	}
</script>

<style>
	.box-img {
		width: 45rpx;
		height: 45rpx;
	}

	.item-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 12rpx;
		background: #fff;
		padding: 20rpx;
		font-size: 30rpx;
	}

	.item-left {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin-left: 20rpx;
		color: #9b9b9b;
		font-size: 25rpx;
	}

	.bottom-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 12rpx;
		background: #fff;
		height: 100rpx;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.bottom-container1 {
		display: flex;
		flex-direction: row;
		/* align-items: center; */
		margin-top: 12rpx;
		background: #fff;
		height: 168rpx;
		justify-content: space-between;
		position: fixed;
		bottom: 0rpx;
		left: 0;
		width: 100%;
	}

	.bottom-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 20rpx;
		height: 100rpx;
	}

	.bottom-right {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100rpx;
		line-height: 100rpx;
		color: #de7061;
	}

	.btn-next {
		background-color: #4EDAA7;
		color: #fff;
		height: 100rpx;
		display: flex;
		padding: 0 60rpx;
		align-items: center;
		margin-left: 20rpx;
		font-size: 30rpx;
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


	.month-name {
		font-size: 30rpx;
		height: 80rpx;
		background: #f2f5fa;
		display: flex;
		align-items: center;
	}

	.month-name-text {
		margin-left: 20rpx;
		color: #919296;
	}

	.pay-time {
		font-size: 25rpx;
		color: #979797;
	}

	.pay-money {
		font-size: 35rpx;
		color: #de7061;
	}

	.goods-info {
		font-size: 25rpx;
		display: flex;
		flex-direction: row;
		color: #808080;
	}

	.goods-name {
		width: 180rpx;
	}

	.container-right {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		flex: 1;
	}

	.heji {
		color: #676767;
	}

	.item-list-container {
		padding-bottom: 100rpx;
	}
</style>
