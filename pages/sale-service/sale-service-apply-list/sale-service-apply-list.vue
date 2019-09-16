<template>
	<view>
		<view class="status-box">
			<view @click="statusTap(index)" v-for="(item,index) in statusType" :key="index">
				<view class="status-label active" v-if="index==currentType">
					{{item}}
				</view>
				<view class="status-label" v-else>
					{{item}}
				</view>
			</view>
		</view>
		<!-- 售后申请 -->
		<view v-if="currentType == 0" class='hhh'>
			<block v-for="(item,index) in applyList" :key="index">
				<!-- 第一种情况 送蛋 -->
				<view class="songcai-item-container" v-if="item.apply_type == 1">
					<view class='item-top'>
						<text>{{item.head_info}}</text>
						<!-- <text>签收时间：{{item.finish_time}}</text> -->
					</view>
					<view class='item-center-default'>
						<image class="mujiimg" :src="item.goods_image" mode='aspectFill'></image>
						<view class="right-container">
							<view class="top-container">
								<view class="center-center">
									<text class='text-wpd'>{{item.goods_name}}</text>
								</view>
								<!-- 集市并且没有过期-->
								<text v-if="item.overdue == 0 && item.apply==0" class='text-btn-sale' @click='saleServiceApply(item,)'>申请售后</text>
								<text v-if="item.overdue == 0 && item.apply==1" class='text-btn-unsale'>已申请</text>
								<!--集市并且已经过期-->
								<text v-if="item.overdue == 1" class='text-btn-unsale' @click="saleServiceApply(item,)">申请售后</text>
							</view>
							<view class="bottom-container" v-if="item.overdue == 1">
								<view class="left-bottom" @click='powerDrawer'>
									<text>{{out_time_info}}</text>
									<image class="bottom-image-tishi" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/tishi.png"></image>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 第二种情况 送菜 -->
				<view class="songcai-item-container" v-if="item.apply_type == 2">
					<view class='item-top'>
						<text>{{item.head_info}}</text>
						<!-- <text>签收时间：{{item.finish_time}}</text> -->
					</view>
					<view class='item-center-default'>

						<image class="mujiimg" :src="item.goods_image" mode='aspectFill'></image>
						<view class="right-container">
							<view class="top-container">
								<view class="center-center">
									<text class='text-wpd'>{{item.goods_name}}</text>
								</view>
								<!-- 集市并且没有过期-->
								<text v-if="item.overdue == 0 && item.apply==0" class='text-btn-sale' @click='saleServiceApply(item)'>申请售后</text>
								<text v-if="item.overdue == 0 && item.apply==1" class='text-btn-unsale'>已申请</text>
								<!--集市并且已经过期-->
								<text v-if="item.overdue == 1" class='text-btn-unsale' @click="saleServiceApply(item,)">申请售后</text>
							</view>
							<view class="bottom-container" v-if="item.overdue == 1">
								<view class="left-bottom" @click='powerDrawer'>
									<text>{{out_time_info}}</text>
									<image class="bottom-image-tishi" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/tishi.png"></image>
								</view>
							</view>
						</view>

					</view>
				</view>

				<!-- 第三种情况 集市-->
				<view class="songcai-item-container" v-if="item.apply_type == 3">
					<view class='item-top'>
						<text>{{item.head_info}}</text>
						<!-- <text>签收时间：{{item.finish_time}}</text> -->
					</view>
					<block v-for="(itemSub,index) in item.order_goods" :key="index">
						<view class='item-center'>
							<view class='item-center-default'>

								<image class="mujiimg" :src="itemSub.goods_image" mode='aspectFill'></image>
								<view class="right-container">
									<view class="top-container">
										<view class="center-center">
											<text class='text-wpd'>{{itemSub.goods_name}}</text>
											<text class='text-wpd'>数量：{{itemSub.quantity}}</text>
										</view>
										<!-- 集市并且没有过期-->
										<text v-if="item.overdue == 0 && itemSub.apply==0" class='text-btn-sale' @click='saleServiceApply(item,itemSub)'
										 data-item_sub='itemSub'>申请售后</text>
										<text v-if="item.overdue == 0 && itemSub.apply==1" class='text-btn-unsale'>已申请</text>
										<!--集市并且已经过期-->
										<text v-if="item.overdue == 1" class='text-btn-unsale'>申请售后</text>
									</view>
									<view class="bottom-container" v-if="item.overdue == 1">
										<view class="left-bottom" @click='powerDrawer'>
											<text>{{out_time_info}}</text>
											<image class="bottom-image-tishi" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/tishi.png"></image>
										</view>
									</view>
								</view>

							</view>
						</view>
					</block>
				</view>
			</block>
			<view class='no-order' v-if="isShowApplyList?'hide':''">
				<image src="https://m.viewcreator3d.cn/Application/wx_img/center/no_pinglun.png" class="no-order-img"></image>
				<view class="text">暂无记录</view>
			</view>
		</view>

		<!-- 申请记录 -->
		<view v-if="currentType==1" class='hhh'>

			<block v-for="(item,index) in CompensationList" :key="index">

				<!-- 第一种情况 集市订单,待审核-->
				<view class="songcai-item-container" v-if="item.com_type == 3 && item.temp_status==1">
					<view @click='onGoDetailsClick(item)'>
						<view class='item-top'>
							<text>集市订单</text>
							<!-- <text>申请时间：{{item.add_time}}</text> -->
						</view>
						<view class='item-center-default'>
							<image class="mujiimg" :src="item.goods_image" mode='aspectFill'></image>
							<view class="center-center">
								<text class='text-wpd'>{{item.goods_name}}</text>
								<text class='text-wpd'>数量：{{item.quantity}}</text>
							</view>
						</view>
						<view class='item-middle-default'>

							<text class='item-middle-text'>{{item.check_status_text1}}</text>
							<view class='hr'></view>
							<text class='item-middle-des'>{{item.check_status_text2}}</text>
							<text class='greentext'>></text>
						</view>
					</view>
					<view class='item-bottom-default1'>
						<text class='text-btn-sale' @click='saleServiceUpdateApplyTap(item)'>修改申请</text>
						<text class='text-btn-sale' @click='saleServiceCancleApplyTap(item)'>取消申请</text>
					</view>
				</view>

				<!-- 第二种情况 集市订单,4审核通过用户未确认-->
				<view class="songcai-item-container" v-if="item.com_type == 3 && item.temp_status==4" @click='onGoDetailsClick(item)'>
					<view @click='onGoDetailsClick(item)'>
						<view class='item-top'>
							<text>集市订单</text>
							<!-- <text>申请时间：{{item.add_time}}</text> -->
						</view>
						<view class='item-center-default'>
							<image class="mujiimg" :src="item.goods_image" mode='aspectFill'></image>
							<view class="center-center">
								<text class='text-wpd'>{{item.goods_name}}</text>
								<text class='text-wpd'>数量：{{item.quantity}}</text>
							</view>
						</view>
						<view class='item-middle-default'>
							<text class='item-middle-text'>{{item.check_status_text1}}</text>
							<view class='hr'></view>
							<text class='item-middle-des'>{{item.check_status_text2}}</text>
							<text class='greentext'>></text>
						</view>
					</view>

					<view class='item-bottom-default2'>
						<text class='text-btn-sale' v-if="item.temp_status == 4" @click='saleServiceSureApplyTap(item)'>{{item.temp_text}}</text>
					</view>
				</view>

				<!-- 第三种情况 收蛋，收菜待审核状态-->
				<view class="songcai-item-container" v-if="item.com_type!=3 && item.temp_status==1">
					<view @click='onGoDetailsClick(item)'>
						<view class='item-top'>
							<text>{{item.head_info}}</text>
							<!-- <text>申请时间：{{item.add_time}}</text> -->
						</view>
						<view class='item-center-default'>
							<image class="mujiimg" :src="item.goods_image" mode='aspectFill'></image>
							<text class='text-wpd'>{{item.goods_name}}</text>
						</view>
						<view class='item-middle-default'>
							<text class='item-middle-text'>{{item.check_status_text1}}</text>
							<view class='hr'></view>
							<text class='item-middle-des'>{{item.check_status_text2}}</text>
							<text class='greentext'>></text>
						</view>
					</view>
					<view class='item-bottom-default1'>
						<text class='text-btn-sale' @click='saleServiceUpdateApplyTap(item)'>修改申请</text>
						<text class='text-btn-sale' @click='saleServiceCancleApplyTap(item)'>取消申请</text>
					</view>
				</view>

				<!-- 第四种情况 收蛋，收菜审核通过用户未确认状态-->
				<view class="songcai-item-container" v-if="item.com_type!=3 && item.temp_status==4" @click='onGoDetailsClick(item)'>
					<view @click='onGoDetailsClick(item)'>
						<view class='item-top'>
							<text>{{item.head_info}}</text>
						</view>
						<view class='item-center-default'>
							<image class="mujiimg" :src="item.goods_image" mode='aspectFill'></image>
							<text class='text-wpd'>{{item.goods_name}}</text>
						</view>
						<view class='item-middle-default'>
							<text class='item-middle-text'>{{item.check_status_text1}}</text>
							<view class='hr'></view>
							<text class='item-middle-des'>{{item.check_status_text2}}</text>
							<text class='greentext'>></text>
						</view>
					</view>
					
					<view class='item-bottom-default2'>
						<text class='text-btn-sale' v-if="item.temp_status == 4" @click='saleServiceSureApplyTap(item)'>{{item.temp_text}}</text>
					</view>
				</view>

				<!-- 第五种情况 收蛋，收菜，已取消，已完成-->
				<view class="songcai-item-container" v-if="item.com_type != 3 && item.temp_status!=1 && item.temp_status!=4" @click='onGoDetailsClick(item)'>
					<view class='item-top'>
						<text>{{item.head_info}}</text>
						<!-- <text>申请时间：{{item.add_time}}</text> -->
					</view>
					<view class='item-center-default1'>
						<image class="mujiimg" :src="item.goods_image" mode='aspectFill'></image>
						<text class='text-wpd'>{{item.goods_name}}</text>
						<!-- <text class='text-status' wx:if="{{item.temp_status == 2}}">{{item.temp_text}} ></text>
          <text class='text-status' wx:if="{{item.temp_status == 3}}">{{item.temp_text}} ></text> -->
					</view>
					<view class='item-bottom-default3'>
						<text>服务单号：{{item.id}}</text>
						<view class="right-button">
							<text class='text-btn-unsale' v-if="item.temp_status == 2">{{item.temp_text}}</text>
							<text class='text-btn-unsale' v-if="item.temp_status == 3">{{item.temp_text}}</text>
							<text class='text-btn-unsale' v-if="item.temp_status == 4">{{item.temp_text}}</text>
						</view>
					</view>
				</view>

				<!-- 第六种情况 集市，已取消，已完成-->
				<view class="songcai-item-container" v-if="item.com_type == 3 && item.temp_status!=1 && item.temp_status!=4" @click='onGoDetailsClick(item)'>
					<view class='item-top'>
						<text>{{item.head_info}}</text>
						<!-- <text>申请时间：{{item.add_time}}</text> -->
					</view>
					<view class='item-center-default1'>
						<image class="mujiimg" :src="item.goods_image" mode='aspectFill'></image>
						<view class="center-center">
							<text class='text-wpd'>{{item.goods_name}}</text>
							<text class='text-wpd'>数量：{{item.quantity}}</text>
						</view>
						<!-- <text class='text-status' wx:if="{{item.temp_status == 2}}">{{item.temp_text}} ></text>
          <text class='text-status' wx:if="{{item.temp_status == 3}}">{{item.temp_text}} ></text> -->
					</view>
					<view class='item-bottom-default3'>
						<view class="item-id">
							<text>服务单号：{{item.id}}</text>
						</view>
						<view class="right-button">
							<text class='text-btn-unsale' v-if="item.temp_status == 2">{{item.temp_text}}</text>
							<text class='text-btn-unsale' v-if="item.temp_status == 3">{{item.temp_text}}</text>
							<text class='text-btn-unsale' v-if="item.temp_status == 4">{{item.temp_text}}</text>
						</view>
					</view>
				</view>

			</block>
			<view class='no-order' v-if="isShowCompensationList?'hide':''">
				<image src="https://m.viewcreator3d.cn/Application/wx_img/center/no_pinglun.png" class="no-order-img"></image>
				<view class="text">暂无记录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusType: ["售后申请", "申请记录"],
				currentType: "0",
				applyList: [],
				out_time_tip: '',
				out_time_info: '',
				info_tip: '',
				CompensationList: [],
				showModalStatus: false,
				isShowApplyList: true,
				isShowCompensationList: true,
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.currentType = options.currentType;
			this.getApplyListInfo();
			this.getCompensationListInfo();
		},

		methods: {
			statusTap: function(index) {
				var curType = index;
				this.currentType = curType;
				if (this.currentType == 0) {
					this.getApplyListInfo();
				} else if (this.currentType == 1) {
					this.getCompensationListInfo();
				}

			},

			getApplyListInfo: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
				}

				this.xm_config.get_apply_list(param)
					.then(function(res) {
						wx.hideLoading();
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.list != null) {
								for (var ind in res.data.info.list) {
									res.data.info.list[ind].goods_image = that.utils.imageUrlUtils(res.data.info.list[ind].goods_image);
									if (res.data.info.list[ind].order_goods != null) {
										for (var j = 0; j < res.data.info.list[ind].order_goods.length; j++) {
											res.data.info.list[ind].order_goods[j].goods_image = utils.imageUrlUtils(res.data.info.list[ind].order_goods[
												j].goods_image);
										}
									}
								}
								that.applyList = res.data.info.list;
								that.out_time_tip = res.data.info.out_time_tip;
								that.out_time_info = res.data.info.out_time_info;
								that.info_tip = res.data.info.info_tip;
								that.isShowApplyList = res.data.info.list.length > 0 ? false : true;
								console.log(that.applyList);
							} else {
								that.isShowApplyList = true;
								that.list = [];
							}

						} else {
							uni.showToast({
								title: res.data.msg,
							})
							that.isShowApplyList = true;
							that.list = [];
						}
					});
			},

			getCompensationListInfo: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
				}
				this.xm_config.get_apply_compensation_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.list != null) {
								for (var i = 0; i < res.data.info.list.length; i++) {
									if (res.data.info.list[i].goods_image) {
										res.data.info.list[i].goods_image = that.utils.imageUrlUtils(res.data.info.list[i].goods_image);
									}
								}
								that.CompensationList = res.data.info.list;
								that.isShowCompensationList = that.CompensationList.length > 0 ? false : true;
								console.log(that.CompensationList);
							} else {
								that.isShowCompensationList = true;
								that.list = [];
							}

						} else {
							uni.showToast({
								title: res.data.msg,
							})

							that.isShowCompensationList = true;
							that.list = [];
						}
					});

			},


			// 申请售后点击事件
			saleServiceApply: function(item, item_sub) {
				var item = item;
				var itemData = {}
				if (item.apply_type == 3) {
					var itemSub = item_sub;
					itemData = {
						info_tip: this.info_tip,
						finish_time: item.finish_time,
						head_info: item.head_info,
						goods_image: itemSub.goods_image,
						goods_name: itemSub.goods_name,
						apply_type: item.apply_type,
						id: item.id,
						rec_id: itemSub.rec_id,
						quantity: itemSub.quantity,
						price: itemSub.price,
					}
				} else {
					itemData = {
						info_tip: this.info_tip,
						finish_time: item.finish_time,
						head_info: item.head_info,
						goods_image: item.goods_image,
						goods_name: item.goods_name,
						apply_type: item.apply_type,
						id: item.id,
						rec_id: item.rec_id,
						price: item.price,
					}
				}

				wx.navigateTo({
					url: '../sale-service-apply/sale-service-apply?itemData=' + JSON.stringify(itemData),
				})

			},

			// 修改申请点击事件
			saleServiceUpdateApplyTap: function(item) {
				var item = item;
				var itemData = {
					info_tip: item.info_tip,
					finish_time: item.finish_time,
					head_info: item.head_info,
					goods_image: item.goods_image,
					goods_name: item.goods_name,
					quantity: item.quantity,
					id: item.id,
					price: item.price,
					com_type: item.com_type
				}
				uni.navigateTo({
					url: '../sale-service-apply-edit/sale-service-apply-edit?itemData=' + JSON.stringify(itemData),
				})
			},

			// 取消申请点击事件
			saleServiceCancleApplyTap: function(item) {
				var item = item;
				uni.showModal({
					content: "确认要取消本次售后申请吗？",
					showCancel: true,
					title: "提示",
					complete: function(res) {
						if (res.confirm) {
							this.cancle_service_apply(item.id);
						}
					}
				})
			},

			cancle_service_apply: function(item_id) {
				var param = {
					id: item_id,
				}

				// uni.showLoading({
				// 	title: '加载中...',
				// })
				this.xm_config.compensation_cancel(param)
					.then(function(res) {
						//uni.hideLoading();
						if (res.data.status == 1) {
							uni.showToast({
								title: "取消成功",
								icon: "none"
							})
							this.getCompensationListInfo();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onGoDetailsClick: function(item) {
				var item = item;
				uni.navigateTo({
					url: '../sale-service-apply-details/sale-service-apply-details?id=' + item.id,
				})
			},

			updateDataList: function() {
				if (this.currentType == 0) {
					this.getApplyListInfo();
				} else if (this.currentType == 1) {
					this.getCompensationListInfo();
				}
			},


			powerDrawer: function() {
				uni.showModal({
					content: this.out_time_tip,
					showCancel: false,
				})
			},


			// 审核通过用户确认点击事件
			saleServiceSureApplyTap: function(item) {
				var item = item;
				var param = {
					id: item.id,
				}

				uni.showLoading({
					title: '加载中...',
				})

				this.xm_config.confirm_compensation(param)
					.then(function(res) {
						uni.hideLoading();
						if (res.data.status == 1) {
							uni.showToast({
								title: "确认成功",
								icon: "none"
							})
							this.getCompensationListInfo();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

		}
	}
</script>

<style>
	.status-box {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
	}

	.status-box .status-label {
		width: 150rpx;
		height: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #333;
		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.status-box .status-label.active {
		color: #49D8A4;
		border-bottom: 6rpx solid#49D8A4;
	}

	.status-box .status-label .red-dot {
		width: 16rpx;
		height: 16rpx;
		position: absolute;
		left: 116rpx;
		top: 23rpx;
		background-color: #f43530;
		border-radius: 50%;
	}

	/********************************************/

	.hhh {
		margin-top: 110rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.songcai-item-container {
		display: flex;
		flex-direction: column;
		/* border: 1rpx solid #e4e4e4; */
		/* margin: 25rpx; */
		padding: 0 20rpx 20rpx 20rpx;
		color: #9d9d9d;
		font-size: 28rpx;
		margin-bottom: 15rpx;
		background-color: #fff;
		border-radius: 15rpx;
	}

	.item-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1rpx solid #f4f4f4;
		font-size: 28rpx;
		padding: 20rpx 0rpx;
		color: #666;
	}

	.item-center-default {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-top: 20rpx;
		color: #666;
		font-size: 28rpx;
	}

	.item-center-default1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-top: 20rpx;
		color: #666;
		font-size: 28rpx;
		border-bottom: 1rpx solid #f4f4f4;
	}

	.mujiimg {
		width: 160rpx;
		height: 160rpx;
		margin-right: 15rpx;
	}

	.text-wpd {
		color: #666;
		font-size: 30rpx;
		flex: 1;
	}

	.text-status {
		color: #999;
		font-size: 28rpx;
	}

	.center-center {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.item-center {
		display: flex;
		flex-direction: column;
	}

	.item-bottom-default {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 28rpx;
		margin-top: 10rpx;
		align-items: center;
	}

	.item-bottom-default1 {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		font-size: 28rpx;
		padding: 10rpx 0rpx;
	}


	.item-bottom-default2 {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		font-size: 28rpx;
		padding-top: 10rpx;
	}

	.item-bottom-default3 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 28 rpx;
		padding-top: 10 rpx;
	}

	.right-bottom {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.left-bottom {
		display: flex;
		flex-direction: row;
		font-size: 20rpx;
		align-items: center;
		margin-top: 30rpx;
	}

	.bottom-image-tishi {
		margin-left: 3rpx;
		width: 25rpx;
		height: 25rpx;
	}

	.text-btn-sale {
		color: #49D8A4;
		width: 130rpx;
		text-align: center;
		border-radius: 10rpx;
		border: 1rpx solid #49D8A4;
		margin-left: 20rpx;
		font-size: 24rpx;
		padding: 5rpx 0;
	}

	.text-btn-unsale {
		color: #999;
		border-radius: 10rpx;
		width: 130rpx;
		text-align: center;
		border: 1rpx solid #999;
		right: 10rpx;
		left: 20rpx;
		opacity: 0.5;
		font-size: 24rpx;
		padding: 5rpx 0;

	}

	.item-middle-default {
		display: flex;
		flex-direction: row;
		background-color: #f3f6fb;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
		font-size: 26rpx;
	}

	.item-middle-image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.item-middle-text {
		padding-right: 20rpx;
		border-right: 1rpx solid #e4e4e4;
		text-align: center;
	}

	.item-middle-des {
		display: flex;
		flex: 1;
		margin: 0 20rpx;
	}

	.greentext {
		color: #49D8A4;
	}

	.hr {
		width: 1rpx;
	}

	/*mask*/
	.drawer_screen {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		background: #000;
		opacity: 0.5;
		overflow: hidden;
	}

	/*content*/
	.drawer_box {
		width: 610rpx;
		overflow: hidden;
		position: fixed;
		top: 60%;
		left: 0;
		z-index: 1001;
		background: #FAFAFA;
		margin: -150px 70rpx 0 70rpx;
		border-radius: 3px;
	}

	.drawer_title {
		font: 35rpx "microsoft yahei";
		padding: 20rpx 20rpx 0rpx 20rpx;
		text-align: center;
	}

	.drawer_content {
		overflow-y: scroll;
		/*超出父盒子高度可滚动*/
		padding: 40rpx 60rpx 40rpx 60rpx;
		color: #999;
		justify-content: center;
		display: flex;
		font-size: 29rpx;
	}

	.btn_ok {
		padding: 10px;
		font: 35rpx "microsoft yahei";
		text-align: center;
		border-top: 1px solid #E8E8EA;
		color: #49D8A4;
		flex: 1;
		display: flex;
		justify-content: center;
		border-right: 1px solid #E8E8EA;
		position: relative;
	}

	.btn_no {
		padding: 10px;
		font: 35rpx "microsoft yahei";
		text-align: center;
		border-top: 1px solid #E8E8EA;
		flex: 1;
		display: flex;
		justify-content: center;
		border-right: 1px solid #E8E8EA;
	}

	.dialog-footer {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.pos1 {
		position: absolute;
		left: 0rpx;
		z-index: 99;
		opacity: 0;
	}

	.pos2 {
		position: absolute;
		left: 50rpx;
		opacity: 0;
		z-index: 99;
	}

	.pos3 {
		position: absolute;
		left: 100rpx;
		opacity: 0;
		z-index: 99;
	}

	.pos4 {
		position: absolute;
		left: 150rpx;
		opacity: 0;
		z-index: 99;
	}

	.pos5 {
		position: absolute;
		left: 200rpx;
		opacity: 0;
		z-index: 99;
	}

	.pos6 {
		position: absolute;
		left: 250rpx;
		opacity: 0;
		z-index: 99;
	}

	.no-order {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		text-align: center;
		margin-top: 300rpx;
	}

	.no-order-img {
		width: 95px;
		height: 95px;
		margin-bottom: 31rpx;
	}

	.no-order .text {
		font-size: 28rpx;
		text-align: center
	}

	.hide {
		display: none;
	}

	.right-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.top-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 2rpx;
		justify-content: space-between;

	}

	.right-button {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding-top: 10rpx;
	}

	.item-id {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-top: 10rpx;
	}
</style>
