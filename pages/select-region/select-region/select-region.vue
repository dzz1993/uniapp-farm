<template>
	<view>
		<view class="page-container">
			<view class="top-1" @click="onRegionClick">
				<image class="img" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/location.png"></image>
				<text class="top-1-text-1">{{location}}</text>
				<text class="top-1-text-2">GPS定位</text>
			</view>
			<block v-if="isShowLastRegion">
				<view class="top-2">上次选择区域</view>
				<view class="top-3">{{last_region.region_name}}</view>
			</block>
			<text class="top-2">开放区域</text>
			<view class="city-container">
				<block v-for="(item,index) in region_list" :key="index">
					<view class="item-container">
						<text class="zimu">{{item.region_first_name}}</text>
						<block class="region-container" v-for="(item1,index1) in item.city_list" :key="index1">
							<text class="city" @click="onCityClick(item1)">{{item1.region_name}}</text>
						</block>
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
				isShowLastRegion: false,
				last_region: '',
				region_list: '',
				region_id: ''

			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function() {
			this.get_region_list();
			this.getLocationInfo();
		},
		methods: {
			get_region_list() {
				var that = this;
				if (that.globalData.user_info.userid) {
					var param = {
						user_id: that.globalData.user_info.userid
					}
				}

				this.xm_config.get_region_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (null != res.data.info.last_region) {
								that.isShowLastRegion = true;
								that.last_region = res.data.info.last_region;
							}
							if (null != res.data.info.region_list) {
								that.region_list = res.data.info.region_list;
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onRegionClick: function() {
				var that = this
				if (null != that.region_id) {
					var parm = {
						region_id: that.region_id,
						user_id: that.globalData.user_info.userid,
					}

					this.xm_config.set_user_region(param)
						.then(function(res) {
							if (res.data.status == 1) {
								uni.switchTab({
									url: '../../home-market/home-market',
								})

							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						});
				}


			},

			onCityClick: function(item) {
				console.log(item)
				if (null != item) {
					uni.navigateTo({
						url: "../select-region-city/select-region-city?city=" + JSON.stringify(item)
					})
				}
			},

			//获取位置授权
			getLocationInfo: function() {
				var that = this
				//获取用户位置信息
				uni.getLocation({
					success: function(res) {
						var param = {
							location: res.latitude + "," + res.longitude,
							user_id: that.globalData.user_info.userid,
						}

						that.xm_config.get_region(param)
							.then(function(res) {
								if (res.data.status == 1) {
									if (0 != res.data.info.posttime) {
										if (null != res.data.info.region_name) {
											that.region_id = res.data.info.region_id;
											that.location = res.data.info.region_name;
										} else {
											uni.showToast({
												title: "系统错误",
												icon: "none"
											})
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
				})


			},
		}
	}
</script>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
	}

	.top-1 {
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 30rpx;
		margin-top: 20rpx;
		background: #FFF;
		padding-left: 25rpx;
	}


	.img {
		height: 40rpx;
		width: 30rpx;
	}

	.top-1-text-1 {
		padding-left: 25rpx;
		color: #000;
	}

	.top-1-text-2 {
		margin-left: 40rpx;
		color: #808080;
	}

	.top-2 {
		display: flex;
		align-items: center;
		height: 60rpx;
		font-size: 24rpx;
		color: #808080;
		padding-left: 25rpx;
	}

	.top-3 {
		display: flex;
		align-items: center;
		height: 80rpx;
		background: #FFFFFF;
		font-size: 30rpx;
		padding-left: 25rpx;
	}

	.item-container {
		display: flex;
		flex-direction: column;
	}

	.zimu {
		display: flex;
		align-items: center;
		height: 40rpx;
		font-size: 30rpx;
		color: #808080;
		padding-left: 25rpx;
	}

	.region-container {
		display: flex;
		flex-direction: column;
	}

	.city {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 75rpx;
		font-size: 30rpx;
		color: #000;
		background: #FFFFFF;
		padding-left: 25rpx;
		margin-bottom: 3rpx;
	}


	.city-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		color: #808080;
	}
</style>
