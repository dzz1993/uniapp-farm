<template>
	<view class="page">
		<view class='sec1'>
			<view class="shipin">
				<video :src="shiPinSrc" class="zhanwei" autoplay="true" objectFit="fill"></video>
			</view>

			<view class='tab-switch'>
				<text class="dap-selected" v-if="current_video_tab == 0" @click="onTabVideoClick(0)">大棚全景</text>
				<text class="dap" v-else @click="onTabVideoClick(0)">大棚全景</text>

				<text class="dap-selected" v-if="current_video_tab == 1" @click="onTabVideoClick(1)">生蛋区</text>
				<text class="dap" v-else @click="onTabVideoClick(1)">生蛋区</text>
			</view>

			<view class="jiInfo">
				<view class="erFen">{{chickInfo.chick_count}}只
					<text class="yellow">已售出</text>
				</view>
				<view class="erFen">{{chickInfo.buyer_people_num}}人
					<text class="yellow">已购买</text>
				</view>
			</view>
			<view class="secTitle">
				鸡场列表
				<view class="flag" bindtap="goJie">产品介绍</view>
			</view>
			<view class="jiList">

				<block v-for="(item,index) in chickInfo.arr_list" :key="index">
					<view class="jiChang" @click="jiPay(item.period_id,item.chicken_house_status)">
						<view class="tag">
							<block v-if="item.chicken_house_status == 1">
								<image src="https://m.aoyifarm.com/Application/wx_img/ji/z1.png"></image>
							</block>
							<block v-if="item.chicken_house_status == 2">
								<image src="https://m.aoyifarm.com/Application/wx_img/ji/z2.png"></image>
							</block>
							<block v-if="item.chicken_house_status == 3">
								<image src="https://m.aoyifarm.com/Application/wx_img/ji/z3.png"></image>
							</block>
							<block v-if="item.chicken_house_status == 4">
								<image src="https://m.aoyifarm.com/Application/wx_img/ji/z4.png"></image>
							</block>
							<block v-if="item.chicken_house_status == 5">
								<image src="https://m.aoyifarm.com/Application/wx_img/ji/z5.png"></image>
							</block>

						</view>
						<view class="ming">
							{{item.name}}
						</view>
						<view class="san">
							<view>
								<view class="huang">{{item.chick_num_tc}}</view>散养土鸡
							</view>
							<view>
								<view class="huang">{{item.eggs_num}}</view>土鸡蛋
							</view>
							<view>
								<view class="huang">{{item.period_date}}</view>预计养殖周期
							</view>
						</view>
						<view class="heng">
							<view class="price">¥ {{item.tc_price}} /组起</view>
							<!-- 1即将开售 2 热卖中 3已售罄  4 已结束 5 暂不可售 -->
							<text v-if="item.chicken_house_status == 2" class="text-yes">立即认养</text>
							<text v-else class="text-no">立即认养</text>
						</view>
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
				chickInfo: {},
				shiPinSrc: "",
				chick_count: 0,
				buyer_people_num: 0,
				current_chickInfo: {},
				current_video_tab: 0,
			}
		},

		onLoad() {
			this.get_statistics_list();
		},
		methods: {
			get_statistics_list() {
				var that = this;

				this.xm_config.get_statistics_list()
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								var shipin = '';
								for (var ind in res.data.info.arr_list) {
									var status = res.data.info.arr_list[ind].chicken_house_status;
									if (status == 2) {
										shipin = res.data.info.arr_list[ind].quan_video_url;
										that.current_chickInfo = res.data.info.arr_list[ind]
										break;
									}
								}
								that.shiPinSrc = shipin;
								that.chickInfo = res.data.info;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			jiPay: function(period_id, chicken_house_status) {
				if (chicken_house_status == 2) {
					uni.navigateTo({
						url: '../select-pay-chicken/select-pay-chicken?period_id=' + period_id,
					})
				}
			},

			onTabVideoClick: function(index) {
				this.current_video_tab = index;

				if (index == 0) {
					this.shiPinSrc = this.current_chickInfo.quan_video_url
				} else {
					this.shiPinSrc = this.current_chickInfo.feeding_video_url
				}

			},
			
		},

	}
</script>

<style>
	.shipin {
		width: 750rpx;
		height: 340rpx;
	}

	.zhanwei {
		width: 750rpx;
		height: 340rpx;
		background: #000;
	}

	.sec1 {
		position: relative;
	}

	.secTitle {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 30rpx;
		color: #333;
		margin-top: 30rpx;
		padding: 15rpx 20rpx;
		position: relative;
		font-weight: 300;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.flag {
		position: absolute;
		top: 15rpx;
		right: 0rpx;
		color: #ff7d0c;
		width: 140rpx;
		padding-left: 10rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 26rpx;
		font-weight: 300;
	}

	.jiInfo {
		height: 70rpx;
		padding: 15px 0;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 25rpx;
	}

	.erFen {
		position: relative;
		width: 50%;
		font-size: 40rpx;
		text-align: center;
		font-weight: 400;
		color: #333;
	}

	.erFen:first-child::before {
		content: '';
		position: absolute;
		top: 50%;
		margin-top: -30rpx;
		right: 0;
		width: 1rpx;
		height: 60rpx;
		background-color: #ddd;
	}

	.yellow {
		display: block;
		color: #333;
		font-size: 26rpx;
		font-weight: 300;
	}

	.jiChang {
		position: relative;
		padding: 15rpx 20rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
	}

	.tag {
		position: absolute;
		top: 0rpx;
		right: 0rpx;
	}

	.tag image {
		width: 120rpx;
		height: 120rpx;
	}

	.ming {
		font-size: 28rpx;
		color: #333;
	}

	.san {
		display: flex;
		padding: 15rpx 0;
		flex-direction: row;
		justify-content: space-around;
		text-align: center;
		font-size: 26rpx;
		font-weight: 300;
		color: #999;
	}

	.huang {
		font-size: 32rpx;
		font-weight: 400;
		color: #ff7d0c;
	}

	.heng {
		border-top: 1rpx solid #fdf8f3;
		display: flex;
		padding: 15rpx 0 0;
		justify-content: space-between;
	}

	.price {
		font-size: 28rpx;
		color: #333;
	}

	.heng button {
		padding: 0;
		margin: 0;
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 25rpx;
	}

	.text-no {
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 25rpx;
		color: #fff;
		text-align: center;
		background: #c9c9c9;
		border-radius: 10rpx;
	}

	.text-yes {
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 25rpx;
		color: #fff;
		text-align: center;
		background: #ff7e00;
		border-radius: 10rpx;
	}

	.footer {
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		font-size: 30rpx;
		position: fixed;
		width: 100%;
		bottom: 0rpx;
		left: 0rpx;
	}

	.heBox {
		width: 72%;
		text-indent: 20rpx;
		background-color: #fdf8f3;
	}

	.colorBtn {
		width: 28%;
		text-align: center;
		background-color: #ff7100;
		color: #fff;
	}

	/* ************修改部分************** */

	.caidi-name {
		color: #333;
		font-size: 30rpx;
		width: 14rpx;
		position: absolute;
	}

	.caiyuan-item-container {
		display: flex;
		width: 120rpx;
		height: 310rpx;
		align-items: center;
		justify-content: center;
	}

	/*  重写 checkbox 样式  */

	checkbox .wx-checkbox-input {
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		border: none;
		background: #ff7d0c;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 30rpx;
		color: #fff;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}

	.tab-switch {
		border-radius: 50rpx;
		display: flex;
		width: 250rpx;
		background: #fff;
		border: 1rpx solid #dedede;
		justify-content: space-between;
		height: 50rpx;
		margin-top: 10rpx;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
	}

	.dap-selected {
		color: #fff;
		background: #ffab02;
		border-radius: 50rpx;
		font-size: 26rpx;
		display: flex;
		width: 125rpx;
		align-items: center;
		text-align: center;
		justify-content: center;
	}

	.dap {
		color: #333;
		background: #fff;
		border-radius: 50rpx;
		font-size: 26rpx;
		display: flex;
		width: 125rpx;
		align-items: center;
		text-align: center;
		justify-content: center;
	}
</style>
