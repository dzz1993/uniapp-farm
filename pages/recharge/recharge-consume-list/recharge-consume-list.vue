<template>
	<view>
		<view class="page-container">
			<block v-for="(item,index) in list" :key="index">
				<view class="item-container">
					<view class="left-container">
						<view class="top-text-container">
							<text class="top-1">{{item.type_name}}</text>
							<text class="top-2" v-if='item.type == "market"'>{{item.money}}</text>
							<text class="top-2" v-else>+{{item.money}}</text>
						</view>
						<text class="bottom-text" v-if='item.type == "maicai"'>{{item.sell_time}}售出</text>
						<text class="bottom-text" v-if='item.type == "market"'>{{item.add_time}}购买</text>
						<text class="bottom-text" v-if='item.type == "deposit"'>{{item.add_time}}充值</text>
					</view>
					<text class="right-text" v-if='item.type == "maicai"'>详情></text>
				</view>
			</block>
			<view class='tiShi' v-if="!isShowNoList">
				<image class="noCard" src="https://m.aoyifarm.com/Application/wx_img/notfound.png"></image>
				<view>暂无明细</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				isShowNoList: true,
				list: ''
			}
		},
		
		onLoad() {
			this.getMyBalanceInfo();
		},
		
		methods: {
			getMyBalanceInfo: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					p: this.page,
					pagenum: 20,
				}

				this.xm_config.my_balance_info(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								if (res.data.info.money_list != null) {
									that.isShowNoList = res.data.info.money_list.length > 0 ? false : true;
									that.list = res.data.info.money_list;
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
		}
	}
</script>

<style>
	.item-container {
		display: flex;
		flex-direction: row;
		padding: 15rpx 25rpx 15rpx 25rpx;
		background: #ffffff;
		height: 125rpx;
		margin-bottom: 5rpx;
		justify-content: space-between;
		align-items: center;
	}

	.left-container {
		display: flex;
		flex-direction: column;
	}

	.top-text-container {
		display: flex;
		flex-direction: row;
		margin-bottom: 6rpx;
	}


	.top-1 .top-2 {
		font-size: 39rpx;
	}

	.top-1 {
		margin-right: 50rpx;
	}

	.bottom-text {
		color: #b5b5b5;
		font-size: 26rpx;
	}

	.right-text {
		font-size: 30rpx;
	}

	.tiShi {
		padding-top: 200rpx;
		width: 250rpx;
		height: 200rpx;
		margin: 0rpx auto;
		text-align: center;
		color: #999;
		font-weight: 300;
	}

	.noCard {
		width: 200rpx;
		height: 190rpx;
	}

	.hide {
		display: none;
	}
</style>
