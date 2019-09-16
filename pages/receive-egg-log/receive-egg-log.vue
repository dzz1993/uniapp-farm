<template>
	<view>
		<view class="page" v-if="eggs_log.length>0">
			<view class="top-container">
				<view class='item-num'>
					<view>
						<text class='ji-num'>{{res_num}}</text>
						<text>次</text>
					</view>
					<text>剩余次数</text>
				</view>
				<view class='hr'></view>
				<view class='item-num'>
					<view>
						<text class='ji-num'>{{!res_egg_num?"0":res_egg_num}}</text>
						<text>枚</text>
					</view>
					<text>剩余数量</text>
				</view>
			</view>

			<block v-for="(item,index) in eggs_log" :key="index">
				<view class='songdan-item-container'>
					<view class='item-top'>
						<view>
							<text>{{item.send_time_text}}</text>
							<text class="send-tag" v-if="item.is_send == 1">送人</text>
						</view>
						<view class='item-top-right'>
							<text>{{item.send_time}}</text>
						</view>
					</view>
					<view class='item-center-default'>
						<view class='center-left'>
							<image class="mujiimg" src="/static/icon/egg.png"></image>
							<text>{{item.egg_num_text}}</text>
						</view>
						<view class='right-bottom'>
							<text class='text-btn-cancle' @click='onWuLiuClick(item)'>物流信息</text>
							<text class='text-btn-pj dr' v-if="item.is_comment == 0" @click='onGoCommentClick(item)'>评价</text>
							<text class='text-btn-wpj dr' v-else>已评价</text>
						</view>
					</view>
				</view>
			</block>
		</view>

		<view class="no-order" v-else>
			<image src="https://m.aoyifarm.com/Application/wx_img/ji/no.png" class="no-order-img"></image>
			<view class="text">小鸡正在飞速成长中，暂无收蛋记录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				res_num: 0,
				res_egg_num: 0,
				eggs_log: [],
				period_number_id:''

			}
		},
		onLoad(options) {
			var period_number_id = options.period_number_id;
			this.period_number_id = period_number_id;
		},
		
		onShow() {
			if (this.period_number_id) {
				this.get_have_egg_log_by_priodnumid(this.period_number_id);
			} else {
				this.get_have_egg_log();
			}
		},
		
		methods: {
			get_have_egg_log_by_priodnumid(period_number_id) {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					period_number_id: period_number_id
				}

				this.xm_config.get_have_egg_log_by_priodnumid(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.res_num = res.data.info.res_num;
								that.res_egg_num = !res.data.info.res_egg_num?0:res.data.info.res_egg_num;
								that.eggs_log = res.data.info.eggs_log;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			get_have_egg_log() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					p: 1,
					pagenum: 20,
				}

				this.xm_config.get_have_egg_log(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.res_num = res.data.info.res_num;
								that.res_egg_num = res.data.info.res_egg_num;
								that.eggs_log = res.data.info.eggs_log;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onWuLiuClick: function(item) {
				var item = item;
				if (item) {
					uni.navigateTo({
						url: '../logistics/logistics?&name=' + item.express_name + '&num=' + item.express_sn +
							'&name_text=' + item.express_name_text,
					})
				}
			},

			  onGoCommentClick: function (item) {
			    var item = item;
			    var eggInfo = JSON.stringify(item);
			    uni.navigateTo({
			      url: '../comment/chicken-comment/chicken-comment?eggInfo=' + eggInfo
			    })
			  },
			
		}
	}
</script>

<style>
	.page{
		background: #ffffff;
	}
	.no-order {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		text-align: center;
		margin-top: 300rpx;
	}

	.no-order-img {
		width: 95px;
		height: 95px;
		margin-bottom: 31rpx;
	}

	.no-order .text {
		font-size: 28rpx;
		text-align: center
	}


	.item-num {
		display: flex;
		flex-direction: column;
		color: #9d9d9d;
		font-size: 24rpx;
		flex: 1;
		align-items: center;
	}

	.ji-num {
		color: #333;
		font-size: 40rpx;
		font-weight: 550;
	}

	.top-container {
		display: flex;
		flex-direction: row;
		background: #fff;
		border-bottom: 15rpx solid #f8f8f8;
		border-top: 10rpx solid #f8f8f8;
		padding: 30rpx 0;
		align-items: center;
	}

	.hr {
		background: #efefef;
		height: 50rpx;
		width: 1rpx;
	}

	.item-center-default {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		height: 60rpx;
	}

	.item-bottom-default {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 20rpx;
	}

	.mujiimg {
		width: 85rpx;
		height: 85rpx;
		margin-right: 15rpx;
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

	.right-bottom {
		display: flex;
		flex-direction: row;
	}



	.dr {
		margin-left: 20rpx;
	}

	.songdan-item-container {
		display: flex;
		flex-direction: column;
		margin-bottom: 15rpx;
		padding: 20rpx;
		color: #9d9d9d;
		font-size: 28rpx;
		background: #fff;
	}

	.item-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.send-tag {
		color: #fff;
		background: #FFAB02;
		padding: 5rpx 10rpx;
		font-size: 18rpx;
		border-radius: 5rpx;
		margin-left: 10rpx;
	}

	.item-top-right {
		display: flex;
		flex-direction: row;
		align-items: center;
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

	.center-left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.text-btn-pj {
		color: #FFAB02;
		padding: 3rpx 0;
		font-size: 24rpx;
		width: 120rpx;
		text-align: center;
		border-radius: 5rpx;
		border: 1rpx solid #FFAB02;
	}

	.text-btn-wpj {
		color: #333;
		padding: 3rpx 0rpx;
		font-size: 24rpx;
		border-radius: 5rpx;
		width: 120rpx;
		text-align: center;
		border: 1rpx solid #333;
	}

	.text-btn-cancle {
		color: #333;
		padding: 3rpx 0rpx;
		font-size: 24rpx;
		border-radius: 5rpx;
		width: 130rpx;
		text-align: center;
		border: 1rpx solid #333;
	}

	.hide {
		display: none;
	}
</style>
