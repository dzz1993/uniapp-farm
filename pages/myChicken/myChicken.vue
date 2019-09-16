<template>
	<view class="content-page">
		<view class="scroll">
			<scroll-view class="hengQu" scroll-x="true">
				<block v-for="(item,index) in my_chicken_list" :key="index">

					<view v-if="current_select_id==item.info_ment.period_number_id" class="jiQi active" @click='onTabSelect(index)'>
						<text>{{item.name}}</text>
					</view>

					<view v-else class="jiQi" @click='onTabSelect(index)'>
						<text>{{item.name}}</text>
					</view>
				</block>
			</scroll-view>
		</view>

		<view class="shipin">
			<video :src="video_url" class="zhanwei" autoplay="true" objectFit="fill"></video>
		</view>

		<view class='tab-switch'>
			<text :class="[current_video_tab == 0?'dap-selected':'dap']" @click='onTabVideoClick(0)'>大棚全景</text>
			<text :class="[current_video_tab == 1?'dap-selected':'dap']" @click='onTabVideoClick(1)'>生蛋区</text>
		</view>

		<view class='muji-container' @click='onEggLogClick'>
			<view class='left-muji-container'>
				<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/muji.png"></image>
				<view>
					<view>
						<text class='ji-num'>{{current_chicken_info.chick_num_tc}}</text>
						<text>只</text>
					</view>
					<text>第{{current_chicken_info.period_number_id}}组</text>
				</view>
			</view>
			<view class='hr'></view>
			<view class='left-muji-container'>
				<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/egg.png"></image>
				<view>
					<view>
						<text class='ji-num'>{{current_chicken_info.send_number}}</text>
						<text>次</text>
					</view>
					<text>已送蛋</text>
				</view>
				<text class='jiantou'>></text>
			</view>
		</view>

		<view class='page-address-container' @click='onChangeAddressClick'>
			<view class='xgdz-container'>
				<text>默认收蛋地址</text>
				<text class='xgdz-text'>修改地址 ></text>
			</view>

			<view class='address-container' catchtap='onSelectAddressClick'>
				<view class='gray-line'></view>
				<view class='address-details-container'>
					<view class="address-receiver-container">
						<view class='address-re-phone-container'>
							<text class="address-text">收货人：{{current_chicken_info.user_address_info.name}}</text>
							<text class="address-text">{{current_chicken_info.user_address_info.phone}}</text>
						</view>
						<text class="address-details-text">收货地址：{{current_chicken_info.user_address_info.address}}</text>
					</view>
					<image class="jietou-img"></image>
				</view>
			</view>
		</view>

		<view class='xgdz-container'>
			<text>未来收蛋详情</text>
		</view>

		<view class="wpd" v-if="is_send == 0">
			<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/egg_gray.png"></image>
			<text class='text-wpd'>尚未开始派蛋!</text>
		</view>

		<block v-for="(item,index) in eggs_log" :key="index">
			<!-- 未开始派送 未送人  -->
			<view class="songdan-item-container" v-if="item.status == 0&&item.is_send==0">
				<view class='item-top'>
					<view>
						<text>{{item.send_time_text}}</text>
						<text class='update-date' v-if="item.is_modiy_date==1">已改时间</text>
					</view>
					<view class='xia' @click='onSelectDateClick(item)'>
						<text>{{item.res_group_text}}</text>
						<text class='xiugai'>修改</text>
					</view>
				</view>
				<view class='item-center-default'>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/egg.png" v-if="item.send_chick==0"></image>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/muji.png" v-if="item.send_chick==1"></image>
					<text class='text-wpd'>送往默认收蛋地址</text>
				</view>
				<view class='item-bottom-default'>
					<text>{{item.egg_num_text}}</text>
					<view class='right-bottom'>
						<text class='text-btn' @click='onSendPeoClick(item)'>送人</text>
					</view>
				</view>
			</view>
			<!-- 未开始派送 已送人  -->
			<view class="songdan-item-container" v-if="item.status == 0&&item.is_send==1">
				<view class='item-top'>
					<view>
						<text>{{item.send_time_text}}</text>
						<text class='send-tag'>送人</text>
						<text class='update-date' v-if="item.is_modiy_date==1">已改时间</text>
					</view>
					<view class='xia' @click='onSelectDateClick(item)'>
						<text>{{item.res_group_text}}</text>
						<!-- <image class="xia-img" src='/image/xiajietou.png'></image> -->
						<text class='xiugai'>修改</text>
					</view>
				</view>
				<view class='item-center-default'>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/egg.png" v-if="item.send_chick==0"></image>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/muji.png" v-if="item.send_chick==1"></image>
					<view class='send-egg-address'>
						<view class='send-egg-address-top'>
							<text>收蛋人：{{item.receive_name}}</text>
							<text>{{item.receive_phone}}</text>
						</view>
						<view>收货地址：{{item.address}}</view>
					</view>
				</view>
				<view class='item-bottom-default'>
					<text>{{item.egg_num_text}}</text>
				</view>
			</view>

			<!-- 待派送 未送人  -->
			<view class="songdan-item-container" v-if="item.status == 1&&item.is_send==0">
				<view class='item-top'>
					<view>
						<text>{{item.send_time_text}}</text>
						<text class='update-date' v-="item.is_modiy_date==1">已改时间</text>
					</view>
					<view class='item-top-right'>
						<view class='dian-wait'></view>
						<text class='send-wait-statue'>正在收蛋</text>

					</view>
				</view>
				<view class='item-center-default'>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/egg.png" v-if="item.send_chick==0"></image>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/muji.png" v-if="item.send_chick==1"></image>
					<view class='send-egg-address'>
						<view class='send-egg-address-top'>
							<text>收蛋人：{{item.receive_name}}</text>
							<text>{{item.receive_phone}}</text>
						</view>
						<view>收货地址：{{item.address}}</view>
					</view>
				</view>
				<view class='item-bottom-default'>
					<text>{{item.egg_num_text}}</text>
					<view class='right-bottom' hidden='true'>
						<text class='text-btn-cancle dr' @click='onWuLiuClick(item)'>物流信息</text>
					</view>
				</view>
			</view>

			<!-- 待派送 已送人  -->
			<view class="songdan-item-container" v-if="item.status == 1&&item.is_send==1">
				<view class='item-top'>
					<view>
						<text>{{item.send_time_text}}</text>
						<text class='send-tag'>送人</text>
						<text class='update-date' v-if="item.is_modiy_date==1">已改时间</text>
					</view>
					<view class='item-top-right'>
						<view class='dian-wait'></view>
						<text class='send-wait-statue'>正在收蛋</text>

					</view>
				</view>
				<view class='item-center-default'>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/egg.png" v-if="item.send_chick==0"></image>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/muji.png" v-if="item.send_chick==1"></image>
					<view class='send-egg-address'>
						<view class='send-egg-address-top'>
							<text>收蛋人：{{item.receive_name}}</text>
							<text>{{item.receive_phone}}</text>
						</view>
						<view>收货地址：{{item.address}}</view>
					</view>
				</view>
				<view class='item-bottom-default'>
					<text>{{item.egg_num_text}}</text>
					<view class='right-bottom' hidden='true'>
						<text class='text-btn-cancle dr' @click='onWuLiuClick(item)'>物流信息</text>
					</view>
				</view>
			</view>

			<!-- 开始派送 未送人  -->
			<view class="songdan-item-container" v-if="item.status == 2&&item.is_send==0">
				<view class='item-top'>
					<view>
						<text>{{item.send_time_text}}</text>
						<text class='update-date' v-if="item.is_modiy_date==1">已改时间</text>
					</view>
					<view class='item-top-right'>
						<view class='dian-send'></view>
						<text class='send-statue'>派送中</text>
					</view>
				</view>
				<view class='item-center-default'>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/egg.png" v-if="item.send_chick==0"></image>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/muji.png" v-if="item.send_chick==1"></image>
					<view class='send-egg-address'>
						<view class='send-egg-address-top'>
							<text>收蛋人：{{item.receive_name}}</text>
							<text>{{item.receive_phone}}</text>
						</view>
						<view>收货地址：{{item.address}}</view>
					</view>
				</view>
				<view class='item-bottom-default'>
					<text>{{item.egg_num_text}}</text>
					<view class='right-bottom'>
						<text class='text-btn-cancle dr' @click='onWuLiuClick(item)'>物流信息</text>
					</view>
				</view>
			</view>
			<!-- 开始派送 已送人  -->
			<view class="songdan-item-container" v-if="item.status == 2&&item.is_send==1">
				<view class='item-top'>
					<view>
						<text>{{item.send_time_text}}</text>
						<text class='send-tag'>送人</text>
						<text class='update-date' v-if="item.is_modiy_date==1">已改时间</text>
					</view>
					<view class='item-top-right'>
						<view class='dian-send'></view>
						<text class='send-statue'>派送中</text>
					</view>
				</view>
				<view class='item-center-default'>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/egg.png" v-if="item.send_chick==0"></image>
					<image class="mujiimg" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/muji.png" v-if="item.send_chick==1"></image>
					<view class='send-egg-address'>
						<view class='send-egg-address-top'>
							<text>收蛋人：{{item.receive_name}}</text>
							<text>{{item.receive_phone}}</text>
						</view>
						<view>收货地址：{{item.address}}</view>
					</view>
				</view>
				<view class='item-bottom-default'>
					<text>{{item.egg_num_text}}</text>
					<view class='right-bottom'>
						<text class='text-btn-cancle dr' @click='onWuLiuClick(item)'>物流信息</text>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current_select_id: '',
				my_chicken_list: '',
				current_chicken_info: '',
				video_url: '',
				current_video_tab: 0,
				is_send: '',
				eggs_log: '',
				index: 0
			}
		},

		onLoad: function(options) {
			var id = options.id;
			if (id != null) {
				this.current_select_id = id
			}
			this.get_my_chicken_list();
		},

		methods: {
			
			onWuLiuClick: function(item) {
				if (item) {
					uni.navigateTo({
						url: '../logistics/logistics?&name=' + item.expresses_name + '&num=' + item.expresses_number +
							'&name_text=' + item.express_name_text,
					})
				}
			},

			onTabVideoClick: function(index) {
				var index = index;
				this.current_video_tab = index;
				if (!this.current_chicken_info.quan_video_url) {
					this.current_chicken_info.quan_video_url = "https://sssss"
				}

				if (!this.current_chicken_info.feeding_video_url) {
					this.current_chicken_info.feeding_video_url = "https://sssss"
				}
				if (index == 0) {
					this.video_url = this.current_chicken_info.quan_video_url
				} else {
					this.video_url = this.current_chicken_info.feeding_video_url
				}

			},

			onEggLogClick: function() {
				uni.navigateTo({
					url: '../receive-egg-log/receive-egg-log?period_number_id=' + this.current_select_id,
				})
			},

			//我的鸡详情
			get_my_chicken_list: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,

				}
				this.xm_config.get_my_chicken_list(param)
					.then(function(res) { 
						if (res.data.status == 1) {

							if (res.data.info != null && res.data.info.my_chicken_list != null && res.data.info.my_chicken_list.length !=
								0) {
								//判断是否传入id
								if (that.current_select_id == null || that.current_select_id == "") {
									if (!res.data.info.my_chicken_list[0].info_ment.quan_video_url) {
										res.data.info.my_chicken_list[0].info_ment.quan_video_url = "https://sssss"
									}
									that.my_chicken_list = res.data.info.my_chicken_list;
									that.current_chicken_info = res.data.info.my_chicken_list[0].info_ment;
									that.video_url = res.data.info.my_chicken_list[0].info_ment.quan_video_url;
									that.current_video_tab = 0;
								} else {
									for (var chicken_info of res.data.info.my_chicken_list) {
										if (chicken_info.info_ment.period_number_id == that.current_select_id) {
											if (!chicken_info.info_ment.quan_video_url) {
												chicken_info.info_ment.quan_video_url = "https://sssss"
											}

											that.my_chicken_list = res.data.info.my_chicken_list;
											that.current_chicken_info = chicken_info.info_ment;
											that.video_url = chicken_info.info_ment.quan_video_url;
											that.current_video_tab = 0;


											break;
										}
									}
								}


								that.get_future_egg_log_by_priodnumid();
							}


						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});

			},

			//获取未来收蛋记录
			get_future_egg_log_by_priodnumid: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					period_number_id: this.current_select_id
				}
				this.xm_config.get_future_egg_log_by_priodnumid(param)
					.then(function(res) {
						if (res.data.status == 1) {

							if (res.data.info != null) {
								that.is_send = res.data.info.is_send; //是否开始派单 1开始 0未开始 未开始显示尚未开始派蛋
								that.eggs_log = res.data.info.eggs_log
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onTabSelect: function(index) {
				this.index = index;
				if (!this.my_chicken_list[index].info_ment.quan_video_url) {
					this.my_chicken_list[index].info_ment.quan_video_url = "https://sssss"
				}
				this.current_chicken_info = this.my_chicken_list[index].info_ment;
				this.current_select_id = this.my_chicken_list[index].info_ment.period_number_id;
				this.video_url = this.my_chicken_list[index].info_ment.quan_video_url;
				this.current_video_tab = 0
				this.get_future_egg_log_by_priodnumid();
			},

			onChangeAddressClick: function() {
				uni.navigateTo({
					url: '../address/select-address-list-baoyou/select-address-list-baoyou?from_page=1&vegetablefield_id=0&from_page_function=1&address_type=0&period_number_id=' +
						this.current_select_id,
				})
			},

			onSendPeoClick: function(item) {
				//跳转的页面from_page  此页面地址功能 from_page_function
				//from_page 1表示我的鸡 from_page_function 1表示送人
				this.egg_log_id = item.id;
				uni.navigateTo({
					url: '../address/select-address-list-baoyou/select-address-list-baoyou?from_page=1&vegetablefield_id=0&from_page_function=2&address_type=0&period_number_id=' +
						this.current_select_id,
				})
			},

			onSelectDateClick: function(item) {
				var item = item;
				this.egg_log_id = item.id;
				var dex = item.res_group_text.substring(0, 10);
				var param = {
					start_time: item.res_group_text.substring(0, 10),
					close_time: item.close_time + "".substring(0, 10),
					text_dex: item.update_date_text
				}
				uni.navigateTo({
					url: '../select-calendar/select-calendar?param=' + JSON.stringify(param),
				})
			},

			setSendTime: function(item) {
				var item = item;
				var param = {
					egg_log_id: this.egg_log_id,
					date: item.re,
				}
				var that = this;
				this.xm_config.update_chicken_send_date(param)
					.then(function(res) {
						if (res.data.status == 1) {

							uni.showToast({
								title: "设置成功",
								icon: "none"
							})
							that.get_future_egg_log_by_priodnumid();
							uni.navigateBack({

							})

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			setAddressInfo: function(item) {
				//设置默认地址
				if (item.from_page == 1 && item.from_page_function == 1) {
					var index = this.index;
					var address_obj = {
						address: item.region_name + item.city + item.address,
						phone: item.phone_mob,
						name: item.consignee
					}
					console.log(this.my_chicken_list)
					this.my_chicken_list[index].info_ment.user_address_info = address_obj;

					this.my_chicken_list = this.my_chicken_list;
					this.current_chicken_info = this.my_chicken_list[index].info_ment;
					this.current_select_id = this.my_chicken_list[index].info_ment.period_number_id;

					this.update_chicken_address(item.id, this.current_select_id)
				} else if (item.from_page == 1 && item.from_page_function == 2) {
					this.update_chicken_send_address(item.id);
				}

			},

			//更新默认地址
			update_chicken_address: function(address_id, period_id) {
				var that = this;
				var param = {
					address_id: address_id,
					period_number_id: period_id,
				}
				this.xm_config.update_chicken_address(param)
					.then(function(res) {
						if (res.data.status == 1) {

							uni.showToast({
								title: "设置成功",
								icon: "none"
							})

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//更新送人地址
			update_chicken_send_address: function(address_id) {
				var that = this;
				var param = {
					address_id: address_id,
					egg_log_id: this.egg_log_id,
				}
				this.xm_config.update_chicken_send_address(param)
					.then(function(res) {
						if (res.data.status == 1) {

							uni.showToast({
								title: "成功送人",
								icon: "none"
							})
							that.get_future_egg_log_by_priodnumid();

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
	
	.content-page{
		background: #ffffff;
	}
	.scroll {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 70rpx;
		z-index: 100;
		background-color: #fff;
	}

	.hengQu {
		display: flex;
		height: 70rpx;
		white-space: nowrap;
	}

	.jiQi {
		display: inline-block;
		width: 180rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 28rpx;
		color: #333;
		font-weight: 300;
		text-align: center;
	}

	.active text {
		display: inline-block;
		padding: 0 10rpx;
		height: 58rpx;
		line-height: 58rpx;
		border-bottom: 4rpx solid #ff7d0c;
	}

	.shipin {
		width: 100%;
		height: 340rpx;
		margin-top: 70rpx;
	}

	.zhanwei {
		width: 750rpx;
		height: 340rpx;
		background: #000;
	}

	.mujiimg {
		width: 85rpx;
		height: 85rpx;
		margin-right: 15rpx;
	}

	.left-muji-container {
		display: flex;
		flex-direction: row;
		color: #9d9d9d;
		font-size: 24rpx;
		justify-content: center;
		flex: 1;
		align-items: center;
	}

	.gray-line {
		background: #EFDFC5;
		width: 100%;
		height: 10rpx;
	}

	.ji-num {
		color: #333;
		font-size: 35rpx;
		font-weight: 550;
		margin-right: 5rpx;
	}

	.muji-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx 0;
	}

	.hr {
		background: #efefef;
		height: 50rpx;
		width: 1rpx;
	}

	.item-num {
		display: flex;
		flex-direction: column;
		color: #9d9d9d;
		font-size: 24rpx;
		flex: 1;
		align-items: center;
	}

	.send-egg-container {
		display: flex;
		flex-direction: row;
		border-top: 1rpx solid #efefef;
		padding: 40rpx;
	}

	.center-container {
		display: flex;
		flex-direction: column;
		border-top: 15rpx solid #efefef;
	}

	.time {
		text-align: center;
		padding: 20rpx;
	}

	.page-address-container {
		display: flex;
		flex-direction: column;
		padding-bottom: 30rpx;

	}

	.address-container {
		display: flex;
		flex-direction: column;
		border: 1rpx solid #e4e4e4;
		margin: 0 20rpx;
	}

	.address-top-img {
		height: 20rpx;
		width: 100%;
	}

	.address-details-container {
		display: flex;
		flex-direction: row;
		padding: 30rpx 20rpx;
		justify-content: space-between;
		align-items: center;
	}

	.address-tip-img {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.jietou-img {
		width: 25rpx;
		height: 35rpx;
		margin-left: 20rpx;
	}

	.address-receiver-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.address-re-phone-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.address-text {
		color: #333;
		font-size: 28rpx;
	}

	.address-details-text {
		color: #333;
		font-size: 28rpx;
		margin-top: 15rpx;
	}

	.xgdz-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		border-top: 10rpx solid #efefef;
	}

	.xgdz-text {
		color: #9d9d9d;
		font-size: 28rpx;
	}

	.wpd {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 60rpx 0;
	}

	.text-wpd {
		margin-top: 20rpx;
		color: #333;
		font-size: 28rpx;
	}

	.songdan-item-container {
		display: flex;
		flex-direction: column;
		border: 1rpx solid #e4e4e4;
		margin: 25rpx;
		padding: 20rpx;
		color: #9d9d9d;
		font-size: 28rpx;
	}

	.item-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item-center-default {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #e4e4e4;
	}

	.item-bottom-default {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 20rpx;
	}

	.right-bottom {
		display: flex;
		flex-direction: row;
	}

	.text-btn {
		background: #C9AE81;
		color: #fff;
		padding: 3rpx 30rpx;
		font-size: 24rpx;
		border-radius: 5rpx;
	}

	.text-btn-gray {
		background: #999;
		color: #fff;
		padding: 3rpx 30rpx;
		font-size: 24rpx;
		border-radius: 5rpx;
	}

	.text-btn-cancle {
		color: #333;
		padding: 3rpx 30rpx;
		font-size: 24rpx;
		border-radius: 5rpx;
		border: 1rpx solid #333;
	}

	.dr {
		margin-left: 20rpx;
	}

	.send-tag {
		color: #fff;
		background: #FFAB02;
		padding: 5rpx 10rpx;
		font-size: 20rpx;
		border-radius: 5rpx;
		margin-left: 5rpx;
	}

	.update-date {
		color: #fff;
		background: #FFAB02;
		padding: 5rpx 10rpx;
		font-size: 20rpx;
		border-radius: 5rpx;
		margin-left: 5rpx;
	}

	.send-wait-statue {
		color: #FFAB02;
	}

	.dian-wait {
		background: #FFAB02;
		height: 10rpx;
		width: 10rpx;
		border-radius: 10rpx;
		margin-right: 10rpx;
	}

	.send-statue {
		color: #77B140;
	}

	.dian-send {
		background: #77B140;
		height: 10rpx;
		width: 10rpx;
		border-radius: 10rpx;
		margin-right: 10rpx;
	}

	.item-top-right {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.send-egg-address {
		display: flex;
		flex-direction: column;
		color: #333;
		flex: 1;
	}

	.send-egg-address-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

	}

	.hide {
		display: none;
	}

	.jiantou {
		margin-left: 20rpx;
	}

	.tab-switch {
		border-radius: 50rpx;
		display: flex;
		width: 250rpx;
		background: #fff;
		border: 1rpx solid #dedede;
		justify-content: space-between;
		height: 50rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
	}

	.dap-selected {
		color: #fff;
		background: #FFAB02;
		border-radius: 50rpx;
		font-size: 26rpx;
		display: flex;
		width: 125rpx;
		align-items: center;
		text-align: center;
		justify-content: center;
	}

	.dap {
		color: #333;
		background: #fff;
		border-radius: 50rpx;
		font-size: 26rpx;
		display: flex;
		width: 125rpx;
		align-items: center;
		text-align: center;
		justify-content: center;
	}


	.distpicker {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 500rpx;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		background-color: #fff;
	}

	.distpicker-btn {
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		width: 100%;
		padding: 0 40rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #fafafa;
		color: #586C94;

	}

	.distpicker-content {
		box-sizing: border-box;
		width: 100%;
		height: 350rpx;
		background-color: #fff;
	}

	.area-item {
		text-align: center;
	}

	.hidden {
		display: none;
	}

	.mask {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 998;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .4);
	}

	.time-des {
		color: #f00;
		font-size: 28rpx;
	}

	.xia {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.xia-img {
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}

	.xiugai {
		color: #ff7d0c;
		margin-left: 10rpx;
	}
</style>
