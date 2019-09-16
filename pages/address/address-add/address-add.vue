<template>
	<view class="content-page page">
		<view class="row-wrap">
			<view class="label">联系人</view>
			<view class="label-right">
				<input class="input" type="text" placeholder="请输入姓名" @input="getPeopleName" :value="name" />
			</view>
		</view>

		<view class="row-wrap">
			<view class="label">手机号码</view>
			<view class="label-right">
				<input @input="getPeoplePhone" class="input" maxlength="11" type="number" placeholder="11位手机号码" :value="phone" />
			</view>
		</view>

		<view class="row-wrap" @click='showDistpicker'>
			<view class="label">选择地区</view>
			<view class="label-right">
				{{area_address}}
			</view>
		</view>

		<view class="distpicker" v-if="is_showDistpicker">
			<view class="distpicker-btn">
				<view class="distpicker-cancel-btn" @click="distpickerCancel">取消</view>
				<view class="distpicker-sure-btn" @click="distpickerSure">确定</view>
			</view>
			<picker-view :indicator-style="indicatorStyle" class="distpicker-content" :value="value" @change="bindChange">
				<!-- 省 -->
				<picker-view-column>
					<view v-for="(item,province) in provinceList" :key="province" class="area-item">{{item.province_name}}</view>
				</picker-view-column>
				<!-- 市 -->
				<picker-view-column>
					<view v-for="(item,city) in cityList" :key="city" class="area-item">{{item.city_name}}</view>
				</picker-view-column>

				<picker-view-column>
					<view v-for="(item,city) in areaList" :key="city" class="area-item">{{item.area_name}}</view>
				</picker-view-column>
			</picker-view>
		</view>


		<view class="row-wrap">
			<view class="label">详细地址</view>
			<view class="label-right">
				<input @input="getAddressDetail" class="input" type="text" placeholder="街道门牌信息" :value="addressDetails" />
			</view>
		</view>

		<view class="row-wrap-switch">
			<view class="label">设置默认地址</view>
			<view class="label-right">
				<image class='box-switch-img' v-if="is_default == 1" src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/switch_true.png'
				 @click='onYeBoxClcik'></image>

				<image class='box-switch-img' v-else src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/switch_false.png'
				 @click='onYeBoxClcik'></image>

			</view>

		</view>

		<button class="save-btn" @click="save">保存</button>
		<view class="mask" catchtap="distpickerCancel" v-if="is_showDistpicker"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				phone: '',
				addressDetails: '',
				address_info: '',
				is_default: 0,
				is_showDistpicker: false,
				provinceList: [],
				cityList: [],
				areaList: [],
				p: 0,
				c: 0,
				a: 0,
				area_address: '',
				cityid: '',
				region_id: '',
				county_id: '',
				id: ''


			}
		},

		onLoad(options) {
			this.getAreaInfo();
			var address_info = options.address;
			if (address_info != null && address_info != "") {
				var address_info = JSON.parse(address_info)
				this.address_info = address_info,
					this.area_address = address_info.region_name + address_info.city + (address_info.county_name ? address_info.county_name :
						'');
				this.cityid = address_info.city_id;
				this.region_id = address_info.region_id;
				this.county_id = address_info.county_id;
				this.name = address_info.consignee;
				this.addressDetails = address_info.address;
				this.phone = address_info.phone_mob;
				this.id = address_info.id;
				this.is_default = address_info.default;


				uni.setNavigationBarTitle({
					title: "编辑地址"
				})
			} else {
				uni.setNavigationBarTitle({
					title: "添加地址"
				})
			}
		},

		methods: {
			//获取收件人姓名
			getPeopleName: function(e) {
				this.name = e.detail.value
			},

			//获取收件人电话
			getPeoplePhone: function(e) {
				this.phone = e.detail.value
			},

			//获取收件人详细地址
			getAddressDetail: function(e) {
				this.addressDetails = e.detail.value
			},

			onYeBoxClcik: function() {
				this.is_default = this.is_default == 1 ? 0 : 1;

			},

			/**
			 * 获取地址的列表
			 */
			getAreaInfo: function() {
				var that = this;
				this.xm_config.get_open_region_list()
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.region_list != null) {
								that.areainfoData = res.data.info.region_list
								that.setProAreaData();
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			setProAreaData: function(p, c) {
				var p = this.p || 0 // provinceSelIndex
				var c = this.c || 0 // citySelIndex

				var areainfoData = this.areainfoData;
				var provinceList = [];
				var cityList = [];
				var areaList = [];
				for (var i = 0; i < areainfoData.length; i++) {

					var provinceInfo = {
						province_name: areainfoData[i].region_name,
						province_code: areainfoData[i].region_id
					}
					provinceList.push(provinceInfo);

				}

				for (var j = 0; j < areainfoData[p].city_list.length; j++) {
					var cityInfo = {
						city_name: areainfoData[p].city_list[j].region_name,
						city_code: areainfoData[p].city_list[j].region_id,
					}
					cityList.push(cityInfo);
				}

				for (var k = 0; k < areainfoData[p].city_list[c].area_list.length; k++) {
					var areaInfo = {
						area_name: areainfoData[p].city_list[c].area_list[k].region_name,
						area_code: areainfoData[p].city_list[c].area_list[k].region_id,
					}
					areaList.push(areaInfo);
				}


				this.provinceList = provinceList;
				this.cityList = cityList;
				this.areaList = areaList;
			},

			bindChange: function(e) {
				this.p = e.detail.value[0]
				this.c = e.detail.value[1]
				this.a = e.detail.value[2]
				this.setProAreaData(this.p, this.c)
			},

			showDistpicker: function() {
				this.is_showDistpicker = true;
			},
			distpickerCancel: function() {
				this.is_showDistpicker = !this.is_showDistpicker;
			},

			distpickerSure: function() {
				var area_address;
				var area_code;
				var p = this.p;
				var c = this.c;
				var a = this.a;
				if (this.areaList.length != 0) {
					area_address = this.provinceList[p].province_name + this.cityList[c].city_name + this.areaList[a]
						.area_name
					area_code = this.areaList[a].area_code
				} else {
					area_address = this.provinceList[p].province_name + this.cityList[c].city_name
					area_code = ''
				}


				this.area_address = area_address;
				this.cityid = this.cityList[c].city_code;
				this.region_id = this.provinceList[p].province_code;
				this.county_id = area_code
				this.distpickerCancel()
			},




			save: function() {
				if (this.name == "" || this.name == null) {
					uni.showToast({
						title: '请填写联系人姓名',
						icon: "none"
					})
					return;
				}

				if (this.phone == "" || this.phone == null) {
					uni.showToast({
						title: '请填写手机号码',
						icon: "none"
					})
					return
				}

				if (this.cityid == "" || this.region_id == "") {
					uni.showToast({
						title: '请选择地址',
						icon: "none"
					})
					return
				}

				if (this.addressDetails == "" || this.addressDetails == null) {
					uni.showToast({
						title: '请填写详细地址',
						icon: "none"
					})
					return
				}

				var that = this;
				if (this.id != "") {
					var editparam = {
						id: this.address_info.id,
						region_id: this.region_id,
						city_id: this.cityid,
						consignee: this.name,
						address: this.addressDetails,
						phone_mob: this.phone,
						default: this.is_default
					}

					if (this.county_id) {
						editparam.county_id = this.county_id
					}
					this.xm_config.edit_user_address(editparam)
						.then(function(res) {
							if (res.data.status == 1) {
								uni.showToast({
									title: '编辑成功',
									icon: "none"
								})
								var pages = getCurrentPages();
								var currPage = pages[pages.length - 1]; //当前页面
								var prevPage = pages[pages.length - 2]; //上一个页面
								prevPage.$vm.address_lists();
								uni.navigateBack({
								
								})
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						});
				} else {
					var addparam = {
						user_id: this.globalData.user_info.userid,
						region_id: this.region_id,
						city_id: this.cityid,
						consignee: this.name,
						address: this.addressDetails,
						phone_mob: this.phone,
						default: this.is_default
					}

					if (this.county_id) {
						addparam.county_id = this.county_id
					}
					this.xm_config.add_user_address(addparam)
						.then(function(res) {
							if (res.data.status == 1) {
								uni.showToast({
									title: '编辑成功',
									icon: "none"
								})
								var pages = getCurrentPages();
								var currPage = pages[pages.length - 1]; //当前页面
								var prevPage = pages[pages.length - 2]; //上一个页面
								prevPage.$vm.address_lists();
								uni.navigateBack({

								})
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						});

				}
			}

		}
	}
</script>

<style>
	.content-page{
		background: #ffffff;
		padding-bottom: 30rpx;
	}
	.row-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx 30rpx;
		border-bottom: 1rpx solid #eee;
	}

	.row-wrap-switch {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx 30rpx;
		border-bottom: 1rpx solid #eee;
		justify-content: space-between;
	}

	.label-right {
		padding-left: 30rpx;
	}

	.box-switch-img {
		width: 66rpx;
		height: 33rpx;
	}

	.indicatorStyle {
		height: 40px;
	}

	.save-btn {
		background-color: #85DFA3;
		color: #fff;
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		margin-top: 30rpx;
		border-radius: 6rpx;
		box-sizing: border-box;
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

	.mask {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 998;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .4);
	}
</style>
