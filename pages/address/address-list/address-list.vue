<template>
	<view class="page">
		<!-- <view class="no-order">
			<image src="https://m.aoyifarm.com/Application/wx_img/center/no_pinglun.png" class="no-order-img"></image>
			<view class="text">暂无地址</view>
		</view> -->

		<view class='address-all'>
			<block v-for="(item,index) in available_list" :key="index">
				<view class='hr-dri'></view>
				<view class='address-item'>
					<view class='address-info-container'>
						<view class="address-info-per-phone">
							<text class="address-info-per">{{item.consignee}}</text>
							<text class="address-info-per">{{item.phone_mob}}</text>
						</view>
						<view class='moren-container'>
							<image class="mr-img" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/moren.png' v-if="item.default==1"></image>
							<text class="address-info-per">{{item.region_name}}{{item.city}}{{item.county_name?item.county_name:''}}{{item.address}}</text>
						</view>
					</view>
					<view class='hr'></view>
					<view class="address-set-container">
						<view class="edit-container" @click='onEditAddressClick(item)'>
							<image class="edit-img" src="https://m.aoyifarm.com/Application/wx_img/center/dizhiguanli_bianji.png"></image>
							<text class="address-info-per">编辑</text>
						</view>
						<view class="edit-container" @click='onDeleteAddressClick(item)'>
							<image class="edit-img" src="https://m.aoyifarm.com/Application/wx_img/center/shanchu.png"></image>
							<text class="address-info-per">删除</text>
						</view>
					</view>
				</view>
			</block>
			<!-- 超出范围地址列表 -->
			<view class='hr-line' v-if="unavailable_list.length>0">
				以下地址不在配送范围内
			</view>
			<block v-for="(item,index) in unavailable_list" :key="index">
				<view class='hr-dri'></view>
				<view class='address-item-no'>
					<view class='address-info-container'>
						<view class="address-info-per-phone">
							<text class="address-info-per">{{item.consignee}}</text>
							<text class="address-info-per">{{item.phone_mob}}</text>
						</view>
						<view class='moren-container'>
							<image class="mr-img" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/moren.png' v-if="item.default==1"></image>
							<text class="address-info-per">{{item.region_name}}{{item.city}}{{item.county_name?item.county_name:''}}{{item.address}}</text>
						</view>
					</view>
					<view class='hr'></view>
					<view class="address-set-container">
						<view class="edit-container" @click='onEditAddressClick(item)'>
							<image class="edit-img" src="https://m.aoyifarm.com/Application/wx_img/center/dizhiguanli_bianji.png"></image>
							<text class="address-info-per">编辑</text>
						</view>
						<view class="edit-container" @click='onDeleteAddressClick(item)'>
							<image class="edit-img" src="https://m.aoyifarm.com/Application/wx_img/center/shanchu.png"></image>
							<text class="address-info-per">删除</text>
						</view>
					</view>
				</view>
			</block>
			<view class='hr-line' v-if="update_list.length>0">
				以下地址需要更新
			</view>
			<!-- 需要更新地址列表 -->
			<block v-for="(item,index) in update_list" :key="index">
				<view class='hr-dri'></view>
				<view class='address-item-no'>
					<view class='address-info-container'>
						<view class="address-info-per-phone">
							<text class="address-info-per">{{item.consignee}}</text>
							<text class="address-info-per">{{item.phone_mob}}</text>
						</view>
						<view class='moren-container'>
							<image class="mr-img" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/moren.png' v-if="item.default==1"></image>
							<text class="address-info-per">{{item.region_name}}{{item.city}}{{item.county_name?item.county_name:''}}{{item.address}}</text>
						</view>
					</view>
					<view class='hr'></view>
					<view class="address-set-container">
						<view class="edit-container" @click='onEditAddressClick(item)'>
							<image class="edit-img" src="https://m.aoyifarm.com/Application/wx_img/center/dizhiguanli_bianji.png"></image>
							<text class="address-info-per">编辑</text>
						</view>
						<view class="edit-container" @click='onDeleteAddressClick(item)'>
							<image class="edit-img" src="https://m.aoyifarm.com/Application/wx_img/center/shanchu.png"></image>
							<text class="address-info-per">删除</text>
						</view>
					</view>
				</view>
			</block>
		</view>

		<view class="add-container" @click='onAddAddressClick'>
			<text class='add-text'>+ 添加新地址</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				available_list: [],
				unavailable_list: [],
				update_list: [],
				isShowNoList: true,
			}
		},

		onLoad() {
			this.address_lists();
		},
		methods: {
			address_lists() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					pagenum: 50
				}

				this.xm_config.address_lists(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								if (res.data.info.available_list != null) {
									that.available_list = res.data.info.available_list;
									that.isShowNoList = res.data.info.available_list.length > 0 ? false : true;
								}
								if (res.data.info.unavailable_list != null) {

									that.unavailable_list = res.data.info.unavailable_list;
									that.isShowNoList = res.data.info.unavailable_list.length > 0 ? false : true;
								}
								if (res.data.info.update_list != null) {
									that.update_list = res.data.info.update_list;
								}

								if (res.data.info.available_list != null && res.data.info.unavailable_list != null && res.data.info.update_list !=
									null) {
									that.isShowNoList = true;
								} else {
									that.isShowNoList = true;
								}
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
								this.isShowNoList = true;
							}


						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							this.isShowNoList = true;
						}
					});
			},

			onAddAddressClick: function() {
				uni.navigateTo({
					url: '../address-add/address-add',
				})
			},

			onEditAddressClick: function(item) {
				var address_info = item;
				uni.navigateTo({
					url: '../address-add/address-add?address=' + JSON.stringify(address_info),
				})
			},

			onDeleteAddressClick: function(item) {
				var address_info = item;
				var that = this
				uni.showModal({
					title: '删除地址',
					content: '确定删除吗？',
					showCancel: true,
					success: function(res) {
						if (res.confirm) {
							that.del_user_address(address_info.id);
						}
					}
				})

			},

			del_user_address: function(id) {
				var param = {
					id: id
				}
				var that = this;
				this.xm_config.del_user_address(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '删除成功',
								icon: "none"
							})
							that.address_lists();
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

<style lang="scss">
	.add-container {
		display: flex;
		width: 100%;
		height: 90rpx;
		background: #85DFA3;
		align-items: center;
		justify-content: center;
		align-self: flex-end;
		position: fixed;
		bottom: 0;

		.add-text {
			color: #fff;
			font-size: 32rpx;
		}
	}

	.no-order {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		text-align: center;
		margin-top: 300rpx;
		height: 100%;

		.no-order-img {
			width: 95px;
			height: 95px;
			margin-bottom: 31rpx;
		}

		.text {
			font-size: 28rpx;
			text-align: center;
		}
	}

	.address-all {
		margin-bottom: 150rpx;

		.hr-dri {
			width: 100%;
			height: 15rpx;
			background: #f8f8f8;


		}

		.address-item {
			display: flex;
			flex-direction: column;
			background: #fff;
			color: #000;
		}


		.address-info-container {
			display: flex;
			flex-direction: column;
			margin: 20rpx 20rpx 0rpx 20rpx;

		}

		.address-info-per-phone {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-bottom: 20rpx;
		}

		.address-info-per {
			font-size: 30rpx;
		}

		.moren-container {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.mr-img {
			width: 60rpx;
			height: 30rpx;
			margin-right: 20rpx;
		}

		.hr {
			width: 100%;
			height: 1rpx;
			background: #f8f8f8;
			margin-top: 20rpx;
		}

		.address-set-container {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			margin: 20rpx 20rpx 20rpx 20rpx;
		}

		.edit-container {
			display: flex;
			flex-direction: row;
		}

		.edit-img {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
			margin-left: 40rpx;
		}

		.hr-line {
			background: #fff;
			padding: 20rpx;
			color: #666;
			display: flex;
			font-size: 24rpx;
			margin: 15rpx 0 0 0;
		}

		.address-item-no {
			display: flex;
			flex-direction: column;
			background: #fff;
			color: #333;
			opacity: 0.6;
		}

	}
</style>
