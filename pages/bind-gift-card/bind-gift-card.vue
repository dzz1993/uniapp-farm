<template>
	<view>
		<view class='hr'></view>
		<view class='item-container'>
			<image class="left-img" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/k2x.png'></image>
			<text>卡号：</text>
			<input class="input" type="number" placeholder="请输入卡号"  @input="getCardNum"></input>
		</view>
		<view class='item-container'>
			<image class="left-img" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/mima.png'></image>
			<text>密码：</text>
			<input class="input" type="number" placeholder="请输入密码" password="true"  @input="getCardPwd"></input>
		</view>
		<text class='add-text' @click='onAddCardClick'>添加</text>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				card_type: '',
				set_id:''
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			//卡片类型
			var card_type = options.type;
			this.card_type = card_type;
			this.set_id = options.set_id;
		},

		methods: {

			onAddCardClick: function() {
				//获取用户输入的密码
				if (this.cardNum == "" || this.cardNum == null) {
					uni.showToast({
						title: '请输入礼品卡卡号',
						icon: "none"
					})
					return;
				}
				if (this.cardPwd == "" || this.cardPwd == null) {
					uni.showToast({
						title: '请输入礼品卡密码',
						icon: "none"
					})
					return
				}
				//卡类型: 0菜地卡, 1买鸡卡, 2.菜园卡 , 3.菜地月卡, 4.菜园月卡
				if (this.card_type == 0) {
					this.add_vegtable_card();
				} else if (this.card_type == 1) {
					this.add_chicken_card();
				} else if (this.card_type == 3) {
					this.add_vegtable_month_card();
				}
			},

			//添加菜地卡
			add_vegtable_card: function() {
				var param = {
					user_id: this.globalData.user_info.userid,
					card_num: this.cardNum,
					card_passwd: this.cardPwd
				}
				var that = this;
				this.xm_config.add_vegtable_card(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '添加成功',
								icon: "none"
							})
							uni.navigateBack({

							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},
			//添加菜地卡月卡
			add_vegtable_month_card: function() {
				var param = {
					user_id: this.globalData.user_info.userid,
					card_num: this.cardNum,
					card_passwd: this.cardPwd
				}
				var that = this;
				this.xm_config.add_vegtable_month_card(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '添加成功',
								icon: "none"
							})
							uni.navigateBack({

							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//添加养鸡卡
			add_chicken_card: function() {
				var param = {
					user_id: this.globalData.user_info.userid,
					card_num: this.cardNum,
					card_passwd: this.cardPwd,
					set_id: this.set_id
				}
				this.xm_config.add_chicken_card(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '添加成功',
								icon: "none"
							})
							uni.navigateBack({

							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//获取输入的卡号
			getCardNum: function(e) {
				this.cardNum = e.detail.value
			},
			//获取输入的密码
			getCardPwd: function(e) {
				this.cardPwd = e.detail.value
			}
		}
	}
</script>

<style>
	.item-container {
		display: flex;
		flex-direction: row;
		background: #fff;
		padding: 20rpx;
		margin-bottom: 1rpx;
		align-items: center;
	}

	.input {
		display: flex;
		flex: 1;
	}

	.hr {
		width: 100%;
		height: 20rpx;
		background: #f8f8f8;
	}

	.left-img {
		width: 45rpx;
		height: 35rpx;
		margin-right: 20rpx;
	}

	.add-text {
		display: block;
		font-size: 32rpx;
		color: #fff;
		background: #FF7E00;
		border-radius: 60rpx;
		padding-top: 15rpx;
		padding-bottom: 15rpx;
		text-align: center;
		margin: 50rpx 120rpx 0rpx 120rpx;
	}
</style>
