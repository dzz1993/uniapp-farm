<template>
	<view>
		<view class="type-container">

			<scroll-view class="type-navbar" scroll-x="true">
				<view class="type-box" v-for="(item,index) in vegtablefieldList" :key="index">
					<view class="type-navbar-item type-item-on" v-if="vegetablefield_id == item.id" @click="tabClick(item)">
						<text>{{item.combin_fieldname}}</text>
					</view>

					<view v-else class="type-navbar-item" @click="tabClick(item)">
						<text>{{item.combin_fieldname}}</text>
					</view>
				</view>
			</scroll-view>
			<view @click="vegetableList" class="flag">种菜单</view>
		</view>

		<view class="shipin">
			<video :src="shiPinSrc" class="zhanwei" autoplay="true" objectFit="fill"></video>
		</view>


		<view class="tab">
			<image class="tabpic" src="https://m.aoyifarm.com/Application/wx_img/zhong.jpg"></image> 收菜
		</view>

		<view class="tabContent">
			<view class="sanLie">
				<view class="sanKuai" @click='onShouCaiLogClick'>
					<view>
						<text>{{harvest_vegtable_info_data.harvest_total}}</text>次</view>
					<view class="hui">已收菜</view>
					<view class="t-text">收菜记录 ></view>
				</view>
				<view class="sanKuai" @click='onFreeClick'>
					<view>
						<text>{{harvest_vegtable_info_data.surplus_count}}</text>次</view>
					<view class="hui">剩余</view>
					<view class="t-text">({{vegetablefield_info.close_time}}到期) 续费 ></view>
				</view>
			</view>
			<view class='secTitle'>
				<view>
					<image src="https://m.aoyifarm.com/Application/wx_img/mrdz.png" class="ic"></image>默认收菜地址
				</view>
				<view class="help"></view>
			</view>
			<view class="setAddress" @click='setAddress'>
				<view class="address">
					<view class="locleft">
						<view class="words">
							<view class="people">
								<text>收货人：{{harvest_vegtable_address.name}}</text>
								<text>{{harvest_vegtable_address.phone}}</text>
							</view>
							<view>
								收货地址：{{harvest_vegtable_address.address}}
							</view>
						</view>
					</view>
					<image src="https://m.aoyifarm.com/Application/wx_img/jian.png" class="lor"></image>
				</view>
			</view>
			<view class='secTitle'>
				<image src="https://m.aoyifarm.com/Application/wx_img/wlsc.png" class="icc"></image>
				未来收菜详情
			</view>
			<view class='send-cai'>
				<block v-for="(item,index) in harvest_list" :key="index">
					<!-- 未开始派送 未送人 未售出-->
					<view class="songcai-item-container" v-if="item.status1==0&&item.is_send==0&&item.sell_status!=3">
						<view class='item-top'>
							<view>
								<text>第{{item.harvest_count}}次送菜</text>
								<text class='update-date' v-if="item.is_modiy_date == 1">已改时间</text>
							</view>
							<view class="xia" @click='onSelectDateClick(item)'>
								<text>{{item.harvest_date}} {{item.date_time}}</text>
								<text class='xiugai'>修改</text>
							</view>
						</view>
						<view class='item-center-default'>
							<image class=" mujiimg " src="https://m.aoyifarm.com/Application/wx_img/logo.png "></image>
							<text class='text-wpd'>送往默认收菜地址</text>
						</view>
						<view class='item-bottom-default'>
							<text>{{item.egg_num_text}}</text>
							<view class='right-bottom'>
								<text v-if="item.sell_status == 2" class="text-btn-gray dr" @click='onSendPeopleClick(item)'>送人</text>

								<text v-else class="text-btn dr" @click='onSendPeopleClick(item)'>送人</text>

								<text v-if="item.confirm_harvest == 0&&item.is_allow_harvest == 0" class="text-btn-gray dr" @click='onSelectCaiClick(item)'>选菜</text>

								<text v-if="item.confirm_harvest == 0&&item.is_allow_harvest == 1" class="text-btn dr" @click='onSelectCaiClick(item)'>选菜</text>

								<text class='text-btn-gray dr' @click='onSelectCaiClick(item)' v-if="item.confirm_harvest == 1">已选</text>
							</view>
						</view>
					</view>

					<!-- 未开始派送 未送人 已售出-->
					<view class="songcai-item-container" v-if="item.status1==0&&item.is_send==0&&item.sell_status==3">
						<view class='item-top'>
							<view>
								<text>第{{item.harvest_count}}次送菜</text>
								<text class='update-date' v-if="item.is_modiy_date == 1">已改时间</text>
							</view>
							<view class="xia" @click='onSelectDateClick(item)'>
								<text>{{item.harvest_date}} {{item.date_time}}</text>
								<text class='xiugai'>修改</text>
							</view>
						</view>
						<view class='item-center-default'>
							<image class=" mujiimg " src="https://m.aoyifarm.com/Application/wx_img/logo.png "></image>
							<text class='text-wpd'>送往默认收菜地址</text>
						</view>
						<view class='item-bottom-default'>
							<text>{{item.egg_num_text}}</text>
							<view class='right-bottom'>
								<view v-if="item.sell_status != 3">
									<text v-if="item.confirm_harvest == 0&&item.is_allow_harvest == 0" class="text-btn-gray dr" @click='onSelectCaiClick(item)'>选菜</text>

									<text v-if="item.confirm_harvest == 0&&item.is_allow_harvest == 1" class="text-btn dr" @click='onSelectCaiClick(item)'>选菜</text>

									<text class='text-btn-gray dr' @click='onSelectCaiClick(item)' v-if="item.confirm_harvest == 1">已选</text>
								</view>
							</view>
						</view>
					</view>

					<!-- 未开始派送 已送人 -->
					<view class="songcai-item-container" v-if="item.status1==0&&item.is_send==1">
						<view class='item-top'>
							<view>
								<text>第{{item.harvest_count}}次送菜</text>
								<text class='send-tag'>送人</text>
								<text class='update-date' v-if="item.is_modiy_date == 1">已改时间</text>
							</view>
							<view class="xia" @click='onSelectDateClick(item)'>
								<text>{{item.harvest_date}} {{item.date_time}}</text>
								<text class='xiugai'>修改</text>
							</view>
						</view>
						<view class='item-center-default1'>
							<image class="mujiimg" src="https://m.aoyifarm.com/Application/wx_img/logo.png"></image>
							<view class='send-cai-address'>
								<view class='send-cai-address-top'>
									<text>收货人：{{item.receive_name}}</text>
									<text>{{item.receive_phone}}</text>
								</view>
								<view>收货地址：{{item.address}}</view>
							</view>
						</view>
						<view class='item-bottom-default'>
							<text>{{item.egg_num_text}}</text>
							<view class='right-bottom'>
								<text v-if="item.confirm_harvest == 0&&item.is_allow_harvest == 0" class="text-btn-gray dr" @click='onSelectCaiClick(item)'>选菜</text>

								<text v-if="item.confirm_harvest == 0&&item.is_allow_harvest == 1" class="text-btn dr" @click='onSelectCaiClick(item)'>选菜</text>

								<text class='text-btn-gray dr' @click='onSelectCaiClick(item)' v-if="item.confirm_harvest == 1">已选</text>
							</view>
						</view>
					</view>

					<!-- 派送中 未送人  -->
					<view class="songcai-item-container" v-if="item.status1==1&&item.is_send==0">
						<view class='item-top'>
							<view>
								<text>第{{item.harvest_count}}次送菜</text>
								<text class='update-date' v-if="item.is_modiy_date == 1">已改时间</text>
							</view>
							<view class='item-top-right'>
								<view class='dian-send'></view>
								<text class='send-statue'>派送中</text>
							</view>
						</view>
						<view class='item-center-default'>
							<image class="mujiimg " src="https://m.aoyifarm.com/Application/wx_img/logo.png "></image>
							<view class='send-cai-address'>
								<view class='send-cai-address-top'>
									<text>收货人：{{item.receive_name}}</text>
									<text>{{item.receive_phone}}</text>
								</view>
								<view>收货地址：{{item.address}}</view>
							</view>
						</view>
						<view class='item-bottom-default'>
							<text></text>
							<view class='right-bottom'>
								<text class='text-btn-cancle dr' @click='onWuLiuClick(item)'>物流信息</text>
							</view>
						</view>
					</view>
					<!-- 派送中 已送人 -->
					<view class="songcai-item-container" v-if="item.status1==1&&item.is_send==1">
						<view class='item-top'>
							<view>
								<text>第{{item.harvest_count}}次送菜</text>
								<text class='send-tag'>送人</text>
								<text class='update-date' v-if="item.is_modiy_date == 1">已改时间</text>
							</view>
							<!-- <text>{{item.harvest_date}} {{item.date_time}}</text> -->
							<view class='item-top-right'>
								<view class='dian-send'></view>
								<text class='send-statue'>派送中</text>
							</view>
						</view>
						<view class='item-center-default'>
							<image class="mujiimg" src="https://m.aoyifarm.com/Application/wx_img/logo.png"></image>
							<view class='send-cai-address'>
								<view class='send-cai-address-top'>
									<text>收货人：{{item.receive_name}}</text>
									<text>{{item.receive_phone}}</text>
								</view>
								<view>收货地址：{{item.address}}</view>
							</view>
						</view>
						<view class='item-bottom-default'>
							<text></text>
							<view class='right-bottom'>
								<text class='text-btn-cancle dr' @click='onWuLiuClick(item)'>物流信息</text>
							</view>
						</view>
					</view>

					<!-- 正在收菜 未送人  -->
					<view class="songcai-item-container" v-if="item.status1==3&&item.is_send==0">
						<view class='item-top'>
							<view>
								<text>第{{item.harvest_count}}次送菜</text>
								<text class='update-date' v-if="item.is_modiy_date == 1">已改时间</text>
							</view>
							<view class='item-top-right'>
								<view class='dian-wait'></view>
								<text class='send-wait-statue'>正在收菜</text>
							</view>
						</view>
						<view class='item-center-default1'>
							<image class="mujiimg " src="https://m.aoyifarm.com/Application/wx_img/logo.png "></image>
							<view class='send-cai-address'>
								<view class='send-cai-address-top'>
									<text>收货人：{{item.receive_name}}</text>
									<text>{{item.receive_phone}}</text>
								</view>
								<view>收货地址：{{item.address}}</view>
							</view>
						</view>
					</view>

					<!-- 正在收菜 已送人 -->
					<view class="songcai-item-container" v-if="item.status1==3&&item.is_send==1">
						<view class='item-top'>
							<view>
								<text>第{{item.harvest_count}}次送菜</text>
								<text class='send-tag'>送人</text>
								<text class='update-date' v-if="item.is_modiy_date == 1">已改时间</text>
							</view>
							<view class='item-top-right'>
								<view class='dian-wait'></view>
								<text class='send-wait-statue'>正在收菜</text>
							</view>
						</view>
						<view class='item-center-default1'>
							<image class="mujiimg" src="https://m.aoyifarm.com/Application/wx_img/logo.png"></image>
							<view class='send-cai-address'>
								<view class='send-cai-address-top'>
									<text>收货人：{{item.receive_name}}</text>
									<text>{{item.receive_phone}}</text>
								</view>
								<view>收货地址：{{item.address}}</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vegetablefield_id: '',
				vegtablefieldList: '',
				list_type: '',
				set_id: '',
				current_vegetablefield_info: '',
				shiPinSrc: '',
				vegetablefield_info: '',
				page: 1,
				harvest_tip: '',
				harvest_tip2: '',
				harvest_list: '',
				harvest_vegtable_address: '',
				harvest_vegtable_info_data: '',
				harvest_id: ''
			}
		},

		onLoad(options) {
			this.vegetablefield_id = options.id;
		},

		onShow: function(options) {
			this.my_vegtablefield_list();
		},
		methods: {

			//种菜按钮点击
			vegetableList: function() {
				wx.navigateTo({
					url: '../my-seed-menu/my-seed-menu?set_id=' + this.set_id + '&list_type=' + this.list_type,
				})
			},

			//续费点击事件
			onFreeClick: function() {
				uni.navigateTo({
					url: '../fee-pay-vegetable-field/fee-pay-vegetable-field?vegetablefield_id=' + this.vegetablefield_id +
						'&set_id=' + this.set_id +
						'&is_year_month=' + this.harvest_vegtable_info_data.is_year_month,
				})
			},

			onShouCaiLogClick: function() {
				uni.navigateTo({
					url: '../receive-cai-new-log/receive-cai-new-log?vegetablefield_id=' + this.vegetablefield_id,
				})
			},

			onSelectCaiClick: function(item) {

				if (item.is_allow_harvest == 0) {
					uni.showToast({
						title: this.harvest_tip,
						icon: "none"
					})
					return;
				}

				uni.navigateTo({
					url: '../select-harvest-vegetable/select-harvest-vegetable?harvest_id=' + item.id,
				})
			},

			onSendPeopleClick: function(item) {
				this.harvest_id = item.id;
				if (item.sell_status == 2) {
					uni.showToast({
						title: "正在出售，无法送人",
						icon: "none"
					})
					return
				}
				uni.navigateTo({
					url: '../address/select-address-list-baoyou/select-address-list-baoyou?address_type=1&period_number_id=0&harvest_id=' +
						this.harvest_id + '&vegetablefield_id=' + this.vegetablefield_id,
				})
			},

			onWuLiuClick: function(item) {
				if (item) {
					uni.navigateTo({
						url: '../logistics/logistics?&name=' + item.expresses_name + '&num=' + item.expresses_number +
							'&name_text=' + item.express_name_text,
					})
				}
			},

			//触发加载更多事件
			onReachBottom: function() {
				this.page++;
				this.harvest_vegtable_list(this.page);
			},


			tabClick: function(item) {
				var id = item.id;
				var set_id = item.set_id;
				var tv = item.greenhouse_camera_url;
				this.current_vegetablefield_info = item;
				this.vegetablefield_id = id;
				this.set_id = set_id;
				if (tv) {
					this.shiPinSrc = tv;
				} else {
					this.shiPinSrc = "https://"
				}
				this.harvest_vegtable_info();
			},



			//获取我的菜地
			my_vegtablefield_list() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					type: 0
				}
				this.xm_config.my_vegtablefield_list(param)
					.then(function(res) {
						if (res.data.status == 1) {

							if (res.data.info != null && res.data.info.list != null && res.data.info.list.length != 0) {
								//判断种菜单list_type,type=0为不显示套餐选项，type=1显示
								var a = 0;
								var b = 0;
								var list_type = 0;
								for (let i = 0; i < res.data.info.list.length; i++) {
									if (res.data.info.list[i].set_id == "1") {
										a = 1;
									}
									if (res.data.info.list[i].set_id == "2") {
										b = 1;
									}
								}
								if (a + b == 2) {
									list_type = 1;
								}

								//判断是否传入vegetablefield_id
								if (that.vegetablefield_id == null || that.vegetablefield_id == "") {
									that.vegtablefieldList = res.data.info.list;
									that.list_type = list_type;
									that.set_id = res.data.info.list[0].set_id;
									that.current_vegetablefield_info = res.data.info.list[0];
									that.shiPinSrc = res.data.info.list[0].greenhouse_camera_url;
									that.vegetablefield_id = res.data.info.list[0].id;
								} else {
									for (var veg_info of res.data.info.list) {
										if (veg_info.id == that.vegetablefield_id) {
											that.vegtablefieldList = res.data.info.list;
											that.list_type = list_type;
											that.set_id = veg_info.set_id;
											that.current_vegetablefield_info = veg_info;
											that.shiPinSrc = veg_info.greenhouse_camera_url;
											that.vegetablefield_id = veg_info.id;
											break;
										}
									}

								}
								that.harvest_vegtable_info();
							}


						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});


			},

			//获取收菜信息
			harvest_vegtable_info() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					vegetablefield_id: this.vegetablefield_id,
				}
				this.xm_config.harvest_vegtable_info(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								if (res.data.info.vegetablefield_info != null) {
									res.data.info.vegetablefield_info.close_time = res.data.info.vegetablefield_info.close_time.substring(0, 10); //到期时间
									that.current_vegetablefield_info.close_time = res.data.info.vegetablefield_info.close_time;
									that.vegetablefield_info = res.data.info.vegetablefield_info;

								}
								that.harvest_vegtable_info_data = res.data.info;
								that.harvest_vegtable_address = res.data.info.send_address;
								that.page = 1;
								that.harvest_vegtable_list(that.page);
							}


						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//获取收菜列表
			harvest_vegtable_list(page) {
				if (page == 1) {
					this.harvest_list = [];
				}
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					vegetablefield_id: this.vegetablefield_id,
					p: page,
					pagenum: 5
				}
				this.xm_config.harvest_vegtable_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.harvest_list != null) {

								that.harvest_tip = res.data.info.prompt2;
								that.harvest_tip2 = res.data.info.prompt;
								that.harvest_list = that.harvest_list.concat(res.data.info.harvest_list);
							} else {
								if (page == 1) {
									that.harvest_list = []
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

			onSelectDateClick: function(item) {
				var item = item;
				if (item.sell_status == 2 || item.sell_status == "2") {
					uni.showToast({
						title: '当前收菜正在出售中，不可修改日期',
						icon: 'none'
					})

					return;
				}

				if (item.sell_status == 3 || item.sell_status == "3") {
					uni.showToast({
						title: '该次蔬菜已售出，不可修改！',
						icon: 'none'
					})

					return;
				}

				var harvest_id = item.id;
				this.harvest_id = harvest_id;
				var param = {
					start_time: item.harvest_date + "".substring(0, 10),
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
					harvest_id: this.harvest_id,
					date: item.re,
				}
				var that = this;
				this.xm_config.update_send_date(param)
					.then(function(res) {
						if (res.data.status == 1) {

							uni.showToast({
								title: "设置成功",
								icon: "none"
							})
							that.page = 1;
							that.harvest_vegtable_list(that.page);
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

			setAddress: function() {
				uni.navigateTo({
					url: '../address/select-address-list-baoyou/select-address-list-baoyou?address_type=1&period_number_id=0&harvestInfo=' +
						JSON.stringify(this.harvest_list[0]) + '&vegetablefield_id=' + this.vegetablefield_id,
				})
			},

			setAddressInfo: function(item) {
				this.harvest_vegtable_address = {
					id: item.id,
					address: item.region_name + item.city + item.address,
					phone: item.phone_mob,
					name: item.consignee,
				}

				//更新默认地址
				this.update_field_address(item.id);

			},

			//更新默认地址
			update_field_address: function(address_id, period_id) {
				var that = this;
				var param = {
					address_id: address_id,
					vegetablefield_id: this.vegetablefield_id,
				}
				this.xm_config.update_field_address(param)
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

			setSendAddressInfo: function(item) {

				//更新送人地址
				this.update_send_address(item.id);
			},

			//更新送人地址
			update_send_address: function(address_id) {
				var that = this;
				var param = {
					address_id: address_id,
					harvest_id: this.harvest_id,
				}
				console.log(this.harvest_id)
				this.xm_config.update_send_address(param)
					.then(function(res) {
						if (res.data.status == 1) {

							uni.showToast({
								title: "送人修改成功",
								icon: "none"
							})
							that.page = 1;
							that.harvest_vegtable_list(that.page);

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			update_harvest_vegtable_list: function() {
				this.page = 1;
				this.harvest_vegtable_list(this.page);
			},

		},
	}
</script>

<style>
	.shipin {
		width: 750rpx;
		height: 340rpx;
		padding-top: 75rpx;
	}

	page {
		background: #fff;
	}

	.zhanwei {
		width: 750rpx;
		height: 340rpx;
		background: #000000;
	}

	.tab {
		display: flex;
		padding: 15rpx 20rpx;
		border-bottom: 1rpx solid #f8f8f8;
		background-color: #fff;
		align-items: center;
		font-size: 28rpx;
		position: relative;
	}

	.flag {
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-left: 1px dashed #e5e5e5;
		position: absolute;
		top: 10rpx;
		right: 0rpx;
		color: #666;
		text-align: center;
		font-size: 26rpx;
		font-weight: 300;
	}

	.tabpic {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}

	.sanLie {
		display: flex;
		background-color: #fff;
		justify-content: space-around;
		padding: 20rpx 0;
	}

	.sanKuai {
		text-align: center;
		font-size: 20rpx;
		width: 33%;
		color: #ff7200;
		font-weight: 300;
	}

	.sanKuai text {
		font-size: 40rpx;
		font-weight: 500;
		margin-right: 5rpx;
	}

	.hui {
		color: #999;
		margin-bottom: 5rpx;
		font-size: 23rpx;
	}

	.secTitle {
		background-color: #fff;
		font-size: 30rpx;
		padding: 15rpx 20rpx;
		color: #333;
		font-weight: 300;
		border-top: 15rpx solid #f8f8f8;
	}

	.ju {
		margin-top: 15rpx;
	}

	.icc {
		width: 29rpx;
		height: 29rpx;
		margin-right: 5rpx;
	}

	.ic {
		width: 24rpx;
		height: 29rpx;
		margin-right: 10rpx;
	}

	/* ------------------------------地址显示 */
	.setAddress {
		background-color: #fff;
	}

	.address {
		margin: 0 auto;
		width: 710rpx;
		padding: 20rpx 10rpx;
		background-size: auto 20rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1rpx solid #eee;
		border-width: 1rpx 0 1rpx 0;
	}

	.locleft {
		display: flex;
		min-width: 645rpx;
		padding-left: 25rpx;
		font-size: 28rpx;
	}

	.words {
		width: 100%;
		display: flex;
		flex-direction: column;
		color: #555;
		font-weight: 300;
	}

	.people {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10rpx;
	}

	.lo {
		width: 60rpx;
		height: 45rpx;
		margin: 0 12rpx;
	}

	.lor {
		width: 20rpx;
		height: 35rpx;
	}

	.pengInfo {
		height: 50rpx;
		padding: 5px 0;
		line-height: 50rpx;
		background-color: #e7dacc;
		display: flex;
		font-size: 25rpx;
	}

	.sanFen {
		border-right: 1px solid #c2b3a3;
		width: 33%;
		height: 50rpx;
		text-align: center;
		font-weight: 400;
		color: #8d7a66;
	}

	.yellow {
		color: #ff7100;
	}

	.xuandi {
		background-color: #f5eadd;
	}

	.shili {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 40rpx;
		padding: 15rpx 10%;
		font-size: 25rpx;
	}

	.four {
		height: 30rpx;
		display: flex;
	}

	.fang {
		width: 28rpx;
		height: 28rpx;
		margin: 0rpx 10rpx 0 0;
	}

	.yuanList {
		height: 470rpx;
		display: flex;
	}

	.danYuan {
		display: inline-block;
		width: 120rpx;
		height: 410rpx;
		margin-left: 20rpx;
	}

	.sxt {
		width: 100%;
		padding-top: 20rpx;
		height: 65rpx;
		text-align: center;
	}

	.dtv {
		width: 50rpx;
		height: 50rpx;
	}

	.kxy,
	.xzy,
	.bkxy,
	.yys {
		width: 120rpx;
		height: 310rpx;
		margin-bottom: 20rpx;
	}

	.kxy {
		background-image: url('https://m.aoyifarm.com/Application/wx_img/tv/ykx.png');
		background-size: 100% 100%;
	}

	.xzy {
		background-image: url('https://m.aoyifarm.com/Application/wx_img/tv/yxz.png');
		background-size: 100% 100%;
	}

	.bkxy {
		background-image: url('https://m.aoyifarm.com/Application/wx_img/tv/ybk.png');
		background-size: 100% 100%;
	}

	.yys {
		background-image: url('https://m.aoyifarm.com/Application/wx_img/tv/yys.png');
		background-size: 100% 100%;
	}

	.yuanBox {
		width: 120rpx;
		text-align: center;
	}

	.xuanYuan {
		width: 40rpx;
		height: 40rpx;
		border-radius: 20rpx;
		background: none;
	}

	.tiShi {
		height: 130rpx;
		background-color: #f5eadd;
		font-size: 25rpx;
		font-weight: 300;
	}

	.tiShi text {
		display: block;
		padding-left: 20rpx;
	}

	.footer {
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		font-size: 30rpx;
		position: fixed;
		width: 100%;
		bottom: 0rpx;
		left: 0rpx;
	}

	.heBox {
		width: 72%;
		text-indent: 20rpx;
		background-color: #fdf8f3;
	}

	.colorBtn {
		width: 28%;
		text-align: center;
		background-color: #ff7100;
		color: #fff;
	}

	/* ************修改部分************** */
	.caidi-name {
		color: #333;
		font-size: 30rpx;
		width: 14rpx;
		position: absolute;
	}

	.caiyuan-item-container {
		display: flex;
		width: 120rpx;
		height: 310rpx;
		align-items: center;
		justify-content: center;
	}

	.timeLine {
		background-color: #fff;
		padding: 10rpx 40rpx 20rpx;
		display: flex;
		flex-direction: column;
	}

	.timeBlock {
		border-left: 1px solid #eee;
		padding-left: 30rpx;
		position: relative;
	}

	.timeBlock:first-child {
		margin-top: 30rpx;
	}


	.timeBlock::after {
		content: '';
		position: absolute;
		width: 16rpx;
		height: 16rpx;
		background-color: #eee;
		border-radius: 50%;
		top: -8rpx;
		left: -8rpx;
	}

	.weiKai {
		padding-left: 120rpx;
		font-size: 28rpx;
		font-weight: 300;
		line-height: 50rpx;
		padding-bottom: 50rpx;
	}

	.logoTu {
		width: 100rpx;
		height: 100rpx;
		margin-left: 40rpx;
	}

	.date {
		color: #ff7100;
	}

	.shouCai {
		font-size: 28rpx;
		font-weight: 300;
		padding-bottom: 70rpx;
	}

	.shouData {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		margin-top: -20rpx;
	}

	.sp {
		color: #ff7100;
		margin: 0 4rpx;
	}

	.shouHui {
		display: flex;
		padding: 20rpx;
		justify-content: space-between;
		background-color: #f1f2f6;
		align-items: center;
		border-radius: 10rpx;
	}

	.song {
		flex-direction: column;
		align-items: flex-start;
	}

	.logoS {
		width: 80rpx;
		height: 80rpx;
		margin: 0 20rpx 0 0;
	}

	.caiZ {
		display: flex;
		align-items: center;
		font-size: 26rpx;
	}

	.cai-statue {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}

	.bei {
		background-color: #aaa;
		font-size: 25rpx;
		color: #fff;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border-radius: 5rpx;
		padding: 3rpx 10rpx;
	}

	.caiY {
		display: flex;
		height: 80rpx;
	}

	.caiD {
		margin-top: 10rpx;
		width: 90%;
		margin-left: 2%;
	}

	.caiD .words {
		font-size: 26rpx;
	}

	.sbtn {
		width: 90rpx;
		height: 50rpx;
		line-height: 50rpx;

		font-size: 25rpx;
		padding: 0;
		text-align: center;
		border-radius: 8rpx;
	}

	.cai {
		background-color: #ff7100;
		color: #fff;
		margin-right: 20rpx;
	}

	.disable {
		background-color: #aaa;
		color: #fff;
	}




	.more {
		min-height: 100rpx;
		border-left: 1px dashed #eee;
	}

	.timeBlock.more::after {
		content: '';
		position: absolute;
		width: 10rpx;
		height: 10rpx;
		border: 10rpx solid #ffd161;
		background-color: #fff;
		border-radius: 50%;
		top: -20rpx;
		left: -15rpx;
	}


	.type-container {
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 70rpx;
		background-color: #fff;
	}

	.type-navbar {
		width: 600rpx;
		white-space: nowrap;
		height: 70rpx;
		line-height: 70rpx;
		background-color: #fff;
		justify-content: space-around;
		display: flex;
		flex-direction: row;
	}

	.type-box {
		display: inline-block;
		width: 200rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 28rpx;
		color: #333;
		font-weight: 300;
		text-align: center;
	}

	.type-navbar-item text {
		display: inline-block;
		padding: 0 20rpx;
		height: 58rpx;
		line-height: 58rpx;
	}

	.type-item-on text {
		border-bottom: 4rpx solid #ff7d0c;
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
		margin-bottom: 10rpx;
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

	.hide {
		display: none;
	}


	.songcai-item-container {
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

	.item-center-default1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #e4e4e4;
	}

	.mujiimg {
		width: 85rpx;
		height: 85rpx;
		margin-right: 15rpx;
	}

	.text-wpd {
		margin-top: 20rpx;
		color: #333;
		font-size: 28rpx;
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

	vi {
		visibility: hidden;
	}

	.text-btn-gray {
		background: #999;
		color: #fff;
		padding: 3rpx 30rpx;
		font-size: 24rpx;
		border-radius: 5rpx;
	}

	.dr {
		margin-left: 20rpx;
	}

	.send-cai {
		background: #fff;
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

	.send-cai-address {
		display: flex;
		flex-direction: column;
		color: #333;
		flex: 1;
	}

	.send-cai-address-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

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

	.item-top-right {
		display: flex;
		flex-direction: row;
		align-items: center;
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

	.t-text {
		font-size: 20rpx;
	}
</style>
