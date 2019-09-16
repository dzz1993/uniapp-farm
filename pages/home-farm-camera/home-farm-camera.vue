<template>
	<view>

		<block v-for="(item,index) in videoList" :key="index">
			<view class='video-item'>
				<text class='title'>{{item.name}}</text>
				<view class='shipin'>
					<video :src="item.url" class="zhanwei"  autoplay="autoplay" objectFit="fill" catchtap='onVideoItemCilck'>
					</video>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoList:''
			}
		},
		
		onLoad: function(options) {
			var type = options.type;
			this.type = type;
			if (type == 1) {
				uni.setNavigationBarTitle({
					title: "大棚直播",
				})
			} else if (type == 2) {
				uni.setNavigationBarTitle({
					title: "鸡场直播",
				})
			}
			this.get_camera_list();
		},
		methods: {
			//获取摄像头列表
			get_camera_list: function() {
				var that = this;
				var param = {
					type: this.type
				}

				this.xm_config.get_camera_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.camera_list != null) {
								that.videoList = res.data.info.camera_list;
							}

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
	.video-item {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}
	
		.zhanwei {
		width: 750rpx;
		height: 340rpx;
		background: #000000;
	}

	.title {
		font-size: 28rpx;
	}

	.shipin {
		width: 100%;
		height: 340rpx;
	}

	.zhanwei {
		width: 100%;
		height: 340rpx;
	}
</style>
