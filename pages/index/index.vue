<template>
	<view class="content">
		<swiper indicator-dots="true" autoplay="true" interval="3000" duration="1000">
			<block v-for="(item,index) in carousel_list" :key="index">
				<swiper-item @click="onSwiperClick(item.id)">
					<image :src="item.image" class="slide-image" />
					<view class="item-title">{{item.title}}</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				carousel_list: []
			}
		},
		onLoad() {
			this.activity_carousel_list();
		},
		methods: {
			//获取轮播图列表
			activity_carousel_list() {
				var that = this;
				var param = {
					user_id: "17152"
				}
				this.xm_config.activity_carousel_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							for (var idx in res.data.info.carousel_list) {
								//修改图片数据
								res.data.info.carousel_list[idx].image = that.utils.imageUrlUtils(res.data.info.carousel_list[idx].image);
							}
							that.carousel_list = res.data.info.carousel_list;

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
</script>

<style lang="scss">
	swiper {
		width: 100%;
		height: 310rpx;

		.slide-image {
			width: 100%;
			height: 100%;
		}
	}
</style>
