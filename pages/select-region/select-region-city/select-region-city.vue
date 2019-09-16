<template>
	<view>
		<view class="page-container">
			<view class="city-container" v-for="(item,index) in sub_region_list" :key="index" @click="onCityClick(item)">
				<text class="city-name">{{item.region_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sub_region_list: ''
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var city = JSON.parse(options.city)
			if (null != options.city) {
				uni.setNavigationBarTitle({
					title:city.region_name,
				})
			}

			this.get_sub_region_list(city.region_id)

		},

		methods: {
			get_sub_region_list(region_id) {
				var that = this;
				if (that.globalData.user_info.userid) {
					var param = {
						region_id: region_id
					}
				}

				this.xm_config.get_sub_region_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							that.sub_region_list = res.data.info.sub_region_list

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onCityClick: function(item) {
				if (null != item.region_id) {
					var param = {
						region_id: item.region_id,
						user_id: this.globalData.user_info.userid,
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


		}
	}
</script>

<style>
	.page-container {
		background: #FFF;
		height: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.city-container {
		display: flex;
		align-items: center;
		margin: 0 25rpx 0 25rpx;
		height: 80rpx;
		font-size: 30rpx;
		color: #000;
		border-bottom: 1rpx solid #F2F5FA;
	}

	.city-name {
		margin-left: 5rpx;
	}
</style>
