<template>
	<view>
		<view class="page" v-if="record_lists.length>0">
			<view class='top-all'>
				<view class='ysc'>
					<view>
						<text class='num'>{{harvest_total}}</text>
						<text>次</text>
					</view>
					<text class='text1'>已收菜</text>
				</view>
				<view class='grayline'></view>
				<view class='ysc'>
					<view>
						<text class='num'>{{surplus_count}}</text>
						<text>次</text>
					</view>
					<text class='text1'>剩余</text>
				</view>
			</view>

			<block v-for="(item,index) in record_lists" :key="index">
				<view class='item-container'>
					<view class='date-title-container' @click="onItemClick(item)">
						<text class='text1'>{{item.harvest_date}} {{item.date_time}}</text>
					</view>
					<view class='hr'></view>
					<view class='cai-item-container' @click="onItemClick(item)">
						<image class="zx-img" :src="item.pic"></image>
						<view class='cai-item-center'>
							<view>
								<text class='text2'>{{item.vegtablefield_show_name}} 第</text>
								<text class='text-sc'>{{item.harvest_count}}</text>
								<text class='text2'>次收菜</text>
							</view>
							<text class='text-time'>{{item.vegetables}}</text>
						</view>
					</view>
					<view class='hr'></view>
					<view class='cai-item-bottom-container'>
						<text v-if="item.status == 0" class='wl-statue'>待派送</text>
						<text v-if="item.status == 1" class='wl-statue1'>派送中</text>
						<text v-if="item.status == 2" class='wl-statue1'>已完成</text>
						<view class='right-bottom'>
							<text class='btn-style wpj' @click="goLogistics(item)" style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/greenBtnbg.png');background-size: 100% 100%;">查看物流</text>
							<view v-if="item.status == 2&&item.is_comment==0" @click="goComment(item)" class='btn-style wpj' style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/orangeBtnbg.png');background-size: 100% 100%;">评价</view>
							<text v-if="item.status == 2&&item.is_comment==1" class='btn-style wpj' style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/grayBtnbg.png');background-size: 100% 100%;">已评价</text>
						</view>
					</view>
				</view>
			</block>
		</view>

		<view class="no-order" v-else>
			<image src="https://m.aoyifarm.com/Application/wx_img/center/no_pinglun.png" class="no-order-img"></image>
			<view class="text">暂无记录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				record_lists: [],
				harvest_total: 0,
				surplus_count: 0,
				vegetablefield_id:''
			}
		},
		onLoad(options) {
			var vegetablefield_id = options.vegetablefield_id
			this.vegetablefield_id = vegetablefield_id
			
		},
		
		onShow() {
			this.harvest_record_list_new();
		},
		
		methods: {
			harvest_record_list_new() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					p: 1,
					pagenum: 20,
				}
				
				if(this.vegetablefield_id){
					param.vegetablefield_id = this.vegetablefield_id
				}

				this.xm_config.harvest_record_list_new(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (that.page == 1) {
								that.record_lists = [];
							}

							that.record_lists = that.record_lists.concat(res.data.info.list);
							that.harvest_total = res.data.info.harvest_total;
							that.surplus_count = res.data.info.surplus_count;
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//查看物流
			goLogistics: function(item) {
				var item = item;
				wx.navigateTo({
					url: '../logistics/logistics?id=' + item.id + '&name=' + item.expresses_name + '&num=' + item.expresses_number +
						'&name_text=' + item.express_name_text,
				})
			},

			//去评论
			goComment: function(item) {
				var item = item;
				var can = JSON.stringify(item);
				uni.navigateTo({
					url:'../comment/comment/comment?can=' + can
				})
			},

			//查看收菜详情
			onItemClick: function(item) {
				var item = item;
				uni.navigateTo({
					url: '../receive-cai-log-details/receive-cai-log-details?id=' + item.id + "&vegtablefield_show_name=" + item.vegtablefield_show_name,
				})
			},
		}
	}
</script>

<style lang="scss">
	.top-all {
		background: #fff;
		display: flex;
		flex-direction: row;
		text-align: center;
		padding: 30rpx 40rpx;
		font-size: 26rpx;
		box-shadow: 0px 5px 20px -5px #ddd;

		.ysc {
			display: flex;
			flex-direction: column;
			flex: 1;
			align-items: center;
			color: #85DFA3;
			font-size: 26rpx;


		}

		.num {
			font-size: 40rpx;
			font-weight: 550;
		}

		.text1 {
			color: #888;
		}

		.grayline {
			width: 2rpx;
			background: #dedede;
			padding-top: 10rpx;
			padding-bottom: 10rpx;
		}
	}

	.item-container {
		display: flex;
		flex-direction: column;
		margin: 20rpx 20rpx 20rpx 20rpx;
		background: #fff;
		font-size: 32rpx;

		.date-title-container {
			padding: 20rpx 20rpx;

			.text1 {
				color: #888;
			}


		}

		.hr {
			background: #F2F2F2;
			width: 100%;
			height: 2rpx;
		}

		.cai-item-container {
			display: flex;
			flex-direction: row;
			align-items: center;

			.zx-img {
				width: 150rpx;
				height: 150rpx;
				margin: 20rpx 20rpx;
			}

			.cai-item-center {
				display: flex;
				flex-direction: column;
				flex: 1;

				.text2 {
					color: #333;
					font-size: 32rpx;
				}

				.text-sc {
					color: #85DFA3;
					font-size: 32rpx;
				}

				.text-time {
					color: #999;
					margin-top: 20rpx;
					font-size: 28rpx;
				}
			}
		}

		.cai-item-bottom-container {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20rpx 20rpx 20rpx 20rpx;

			.wl-statue {
				font-size: 26rpx;
				color: #f04423;
			}

			.wl-statue1 {
				color: #85DFA3;
				font-size: 26rpx;
			}

			.right-bottom {
				display: flex;
				flex-direction: row;

				.btn-style {
					font-size: 20rpx;
					width: 130rpx;
					height: 48rpx;
					align-items: center;
					text-align: center;
					justify-content: center;
					color: #fff;
					display: flex;
					border-radius: 30rpx;
				}

				.wpj {
					margin-left: 20rpx;
				}
			}
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

		.no-order-img {
			width: 95px;
			height: 95px;
			margin-bottom: 31rpx;
		}

		.text {
			font-size: 28rpx;
			text-align: center
		}
	}
</style>
