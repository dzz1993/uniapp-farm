<template>
	<view class="page">
		<view class="title">
			<text>注册手机</text>
			<text>领取时间</text>
			<text>我的奖品</text>
		</view>
		<view>
			<block v-for="(item,index) in bonusList" :key="index">
				<view class="gifts">
					<view class='item-dd'>{{item.username}}</view>
					<view class='item-dd'>{{item.used_time}}</view>
					<view class='item-dd'>{{item.name}}</view>
				</view>
			</block>
		</view>

		<view class="no-order" v-if="bonus">
			<image src="https://m.aoyifarm.com/Application/wx_img/center/no_pinglun.png" class="no-order-img"></image>
			<view class="text">暂无记录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bonusList: "",
				bonus:true
			}
		},

		onLoad(options) {
			var that = this;
			var param = {
				user_id: this.globalData.user_info.userid,
			};
			this.xm_config.bonus_record_list(param).then(function(res) {
				that.parseInviteList(res);
			})
		},

		methods: {
			parseInviteList: function(res) {
				if (res.data.status == 1) {
					if (res.data.info != null && res.data.info.bonus_list != null) {
						for (var idx in res.data.info.bonus_list) {
							res.data.info.bonus_list[idx].used_time = res.data.info.bonus_list[idx].used_time.substring(0, 10)
						}
						this.bonusList = res.data.info.bonus_list;
						this.bonus = false;
					} else {
						this.bonus = true
					}
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					})
					
					this.bonus = true
				}
			},


		}
	}
</script>

<style>
	.page {
		background-color: #f8f8f8;
	}

	.title {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #85DFA3;
		color: #333;
		display: flex;
		justify-content: space-around;
		height: 60upx;
		line-height: 60upx;
		font-size: 28upx;
	}

	.gifts {
		display: flex;
		font-size: 28upx;
		font-weight: 300;
		color: #333;
		line-height: 60upx;
		background: #fff;
		padding: 10upx 0;
		flex-direction: row;
		margin-top: 60upx;
		border-bottom: 1upx solid #e4e4e4;
	}

	.item-dd {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	.no-order {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		text-align: center;
		margin-top: 300upx;
	}

	.no-order-img {
		width: 95px;
		height: 95px;
		margin-bottom: 31upx;
	}

	.no-order .text {
		font-size: 28upx;
		text-align: center
	}
</style>
