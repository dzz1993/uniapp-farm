<template>
	<view class="page">
		<view class='page-top'>
			<view class='gg-container'>
				<view class='gg-left'>
					<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/lb.png' class='lb-img'></image>
					<text class='gg-text'>公告：</text>
				</view>

				<swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2000">
					<block v-for="(item,index) in notice_list" :key="index">
						<swiper-item @click="onItemClick(item)">
							<view class="swiper_item">{{item.title}}</view>
						</swiper-item>
					</block>
				</swiper>

				<text class="more" @click="onMoreClick">更多>></text>
			</view>
		</view>

		<view class='myfarm-container'>
			<view class='myfarm-title'>我的农场</view>
			<view class='pl-hr'></view>
			<!--无菜地鸡组-->
			<view class='no-farm-container' v-if="land_list.length == 0 && chick_list.length == 0">
				<text class='no-content'>{{owner_content.default_txt}}</text>
			</view>

			<!--有菜地鸡组-->
			<view class='img-container' v-else>
				<!--菜地-->
				<block v-for="(item,index) in land_list" :key="index">
					<!--家庭套餐-->
					<view class="img-item-container" @click="goCaidi(item)">
						<image class="tc-item-icon" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/xxk_jt.png"></image>
						<view class="mid-container">
							<text class="mid-1-text">{{item.name}}</text>
							<text class="mid-2-text">菜地到期时间:{{item.close_time}}</text>
						</view>
						<text class="mid-3-text">立即前往 ></text>
					</view>


				</block>

				<!--鸡组-->
				<block v-for="(item,index) in chick_list" :key="index">
					<view class="img-item-container" @click="goJiWo(item)">
						<image class="tc-item-icon" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/xxk_mj.png"></image>
						<view class="mid-container">
							<text class="mid-1-text">{{item.name}}</text>
							<text class="mid-2-text">鸡组到期时间:{{item.close_time}}</text>
						</view>
						<text class="mid-3-text">立即前往 ></text>
					</view>
				</block>
			</view>
		</view>

		<!--套餐介绍-->
		<view class="g-container">
			<view class="g-top" style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/k_gd_top.png');background-size: 100% 100%;">
				<text class="g-title">{{land_intro.title}}</text>
				<text class="g-title-right" @click="onVideoClick(1)">大棚直播></text>
			</view>
			<text class="g-detail">{{land_intro.content}}</text>
			<view class="g-line"></view>
			<block v-for="(item,index) in land_intro.set_list" :key="index">
				<view class="tc-item-container">
					<text class="tc-title">{{item.name}}</text>
					<text class="tc-detial">{{item.index}}</text>
				</view>
			</block>
		</view>

		<view class="g-container">
			<view class="g-top" style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/k_gj_top.png');background-size: 100% 100%;">
				<text class="g-title">{{chicken_intro.title}}</text>
				<text class="g-title-right" @click="onVideoClick(2)" data-type="2">鸡场直播></text>
			</view>
			<text class="g-detail">{{chicken_intro.content}}</text>
		</view>

		<!--下拉空白部分-->
		<view class='pp-container'></view>


		<!--选地选鸡-->
		<view class='footer-container'>
			<view class='xd-container' @click="xuanDi">
				<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/sc.png' class='xd-img'></image>
				<text>选地</text>
			</view>

			<view class='hr'></view>

			<view class='xd-container' @click="xuanJi">
				<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/mj.png' class='xd-img'></image>
				<text>选鸡</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				notice_list: [],
				owner_content: {},
				land_intro: {},
				chicken_intro: {},
				chick_list: [],
				land_list: []
			}
		},

		onLoad() {
			
			
		},
		
		onShow() {
			this.get_notice_info();
			this.get_owner_content();
		},
		
		
		methods: {
			//获取公告列表内容
			get_notice_info() {
				var that = this;
				var param = {
					pagenum: 2,
				}
				this.xm_config.get_notice_info(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.notice_list != null && res.data.info.notice_list.length != 0) {
								that.notice_list = res.data.info.notice_list
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}

					});
			},
			//获取地主页面内容
			get_owner_content() {
				var that = this;
				if (!that.globalData.user_info.userid) {
					return
				}
				var param = {
					user_id: this.globalData.user_info.userid
				}
				this.xm_config.get_owner_content(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.owner_content = res.data.info

								if (res.data.info.land_intro != null) {
									that.land_intro = res.data.info.land_intro
								}

								if (res.data.info.chicken_intro != null) {
									that.chicken_intro = res.data.info.chicken_intro
								}

								if (res.data.info.chick_list != null) {
									that.chick_list = res.data.info.chick_list
								}

								if (res.data.info.land_list != null) {
									that.land_list = res.data.info.land_list
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

			//我的地
			goCaidi(item) {

				uni.navigateTo({
					url: "../myfield/myfield?id=" + item.id
				})


			},
			//我的鸡
			goJiWo(item) {
				uni.navigateTo({
					url: "../myChicken/myChicken?id=" + item.period_number_id
				})

			},

			//更多公告的点击事件
			onItemClick(item) {
				var id = item.id;
				uni.navigateTo({
					url: '../notice/notice-details/notice-details?noticeId=' + id,
				});
			},

			xuanJi: function() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../xuanji/xuanji',
				})
			},

			xuanDi: function() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../select-pay-vegetable-field/select-pay-vegetable-field'
				});
			},

			onMoreClick: function() {
				uni.navigateTo({
					url: "../notice/more-notice/more-notice"
				})
			},

			onVideoClick(type) {
				var type = type;
				uni.navigateTo({
					url: "../home-farm-camera/home-farm-camera?type=" + type
				})
			},
			
			onPullDownRefresh() {
				this.get_notice_info();
				this.get_owner_content();
			},
		}
	}
</script>

<style lang="scss">
	.page-top {
		height: 200rpx;
		background: #85DFA3;

		.gg-container {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 20rpx;

			.gg-left {
				display: flex;
				flex-direction: row;
				align-items: center;

				.lb-img {
					width: 48rpx;
					height: 48rpx;
					margin-left: 20rpx;
					margin-right: 20rpx;
				}

				.gg-text {
					color: #fff;
					font-size: 28rpx;
				}
			}

			.swiper_container {
				display: flex;
				flex: 1;
				height: 80rpx;
				align-items: center;


				.swiper_item {
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					letter-spacing: 2px;
					color: #fff;
					align-items: center;
					height: 80rpx;
					line-height: 80rpx;
				}
			}

			.more {
				margin-left: 10rpx;
				color: #fff;
				font-size: 28rpx;
				white-space: nowrap;
			}
		}


	}

	.myfarm-container {
		width: 690rpx;
		overflow: hidden;
		box-shadow: 0px 5px 20px -5px #ddd;
		background: #fff;
		margin: -90rpx 30rpx 20rpx 30rpx;
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;

		.myfarm-title {
			color: #333;
			font-size: 32rpx;
			padding: 20rpx;
			font-weight: bold;
		}

		.pl-hr {
			width: 100%;
			background: #f3f6fb;
			height: 2rpx;
		}

		.no-farm-container {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			.no-content {
				padding: 60rpx;
				color: #b4bbc2;
				font-size: 30rpx;
			}
		}
	}

	.img-item-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
	}

	.img-item-container::after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 650rpx;
		height: 2rpx;
		background-color: #F2F2F2;
		margin-left: 20rpx;
	}

	.img-item-container:last-child::after {
		content: '';
	}

	.mid-container {
		display: flex;
		flex-direction: column;
		margin-left: 26rpx;
		margin-top: -15rpx;
		width: 400rpx;

	}


	.tc-item-icon {
		width: 75rpx;
		height: 79rpx;
		margin-left: 20rpx;
		margin-top: 22rpx;
		margin-bottom: 19rpx;

	}

	.mid-1-text {
		font-size: 30rpx;
		color: #4D4D4D;
		margin-top: 22rpx;
	}

	.mid-2-text {
		color: #B5BBC1;
		font-size: 26rpx;

	}

	.mid-3-text {
		color: #4D4D4D;
		font-size: 30rpx;
		margin-left: 5rpx;

	}

	.g-container {
		display: flex;
		flex-direction: column;
		margin: 0rpx 30rpx 20rpx 30rpx;
		background: #FFF;
		border-radius: 30rpx;

		.g-top {
			display: flex;
			justify-content: space-between;

			.g-title {
				margin: 23rpx 0rpx 20rpx 23rpx;
				color: #FFF;
				font-size: 30rpx;
			}

			.g-title-right {
				margin: 23rpx 23rpx 20rpx 0rpx;
				color: #FFF;
				font-size: 30rpx;
			}
		}

		.g-detail {
			margin: 20rpx;
			color: #B5BBC1;
		}

		.g-line {
			height: 2px;
			background: rgba(242, 242, 242, 1);
		}

		.tc-item-container {
			display: flex;
			flex-direction: column;
			padding-top: 20rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;

			.tc-title {
				color: #666666;
				font-size: 32rpx;

			}

			.tc-detial {
				color: #B5BBC1;

			}
		}
	}

	.pp-container {
		height: 200rpx;
	}

	.footer-container {
		height: 160rpx;
		width: 100%;
		background: #fff;
		display: flex;
		position: fixed;
		bottom: 0;
		z-index: 99;

		.xd-container {
			display: flex;
			flex-direction: row;
			align-items: center;
			flex: 1;
			color: #333;
			font-size: 30rpx;
			justify-content: center;

			.hr {
				width: 2rpx;
				height: 160rpx;
				background: #f3f6fb;
			}

			.xd-img {
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
			}

		}
	}
</style>
