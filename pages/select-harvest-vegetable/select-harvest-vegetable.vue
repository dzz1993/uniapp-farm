<template>
	<view class="page">
		<view class='top-container'>
			<view class='top-text-container'>
				<text>已选蔬菜</text>
				<text class='zzl-text'>({{weight_info}})</text>
				<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/whwh_2x.png' class='tip-img' @click='onShuoMingClick'></image>
			</view>
			<view class='djxf-text' v-if="select_vegtable_list.length==0">点击下方选择</view>

			<view v-else>
				<view class='top-img-container'>
					<block v-for="(item,index) in select_vegtable_list" :key="index">
						<view class='top-item'>
							<image :src='item.big_pic' class='top-img' mode='aspectFill'></image>
							<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/deleteBtn.png' class='delete-img' @click='onDelClick(item)'
							 v-if="confirm_harvest == 0"></image>
							<text class='goods-name-text'>{{item.name}}</text>
						</view>
					</block>
				</view>
				<view class='footer-item'>
					<text>备注</text>
					<input class='right-data1' :placeholder="[confirm_harvest == 1?remark:'选填：通知农场您的喜好(最多40个字)']" @input="getInputContent"
					 maxlength='40' disabled="confirm_harvest == 1?true:false]"></input>
				</view>
			</view>
		</view>

		<view class="shan" v-if="show_dialog_tip" catchtouchmove="ture">
			<view class="kuang-tip">
				<view class='content-container-tip'>
					<view class='close-img-container-tip' @click='onCloseTipClick'>
						<image src='/static/icon/det.png' class='close-img'></image>
					</view>
					<text class='tip-tisi'>温馨提示</text>
					<text class='tip-content' v-if="confirm_harvest == 0">{{weight_tip}}!</text>
					<text class='tip-content' v-else>您已选择完蔬菜，农场会按照您的选择安排配送！</text>
					<text class='wzdl' style="background:url('http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/greenBtnbg.png');background-size: 100% 100%;"
					 @click='onCloseTipClick'>我知道了</text>
				</view>

			</view>
		</view>

		<view class="good-list-container" :class="[padding_top_hr == 180?'good-list-container-padding-top180':'',padding_top_hr == 235?'good-list-container-padding-top235':'' ,padding_top_hr == 390?'good-list-container-padding-top390':'']">
			<view class='mr-text'>
				<text class='mr-text-t' style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/greenBtnbg.png');background-size: 100% 100%;">明日可收品种</text>
			</view>
			<view>
				<block v-for="(item,index) in vegtable_list" :key="index">
					<view class="good-item-container" :class="{ isShadow: item.is_available == 0||confirm_harvest == 1 }" @click='onItemClick(item)'>
						<view class='good-item-left'>
							<image :src="item.vegetable_img" class="goods-img" mode='aspectFill' />
							<view class='good-price-name-container'>
								<text>{{item.vegetable_name}} {{item.send_weight_txt}}</text>
								<view class='num-container'>
									总共
									<text class='syfs-num'>{{item.all_number}}</text>份, 剩余
									<text class='syfs-num'>{{item.rest_number}}</text>份
								</view>
							</view>
						</view>
						<view class='goods-add-container'>
							<image class='jian-img' @click='onJianClick(item)' src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jian.png'
							 v-if="item.choose_number != 0"></image>
							<text class='good-num' v-if="item.choose_number != 0">{{item.choose_number}}</text>
							<image class='jia-img' @click='onJiaClick(item)' src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jia.png'></image>
						</view>
					</view>
				</block>
			</view>
		</view>

		<view class='footer-container' v-if="confirm_harvest==0">
			<view class='footer-js'>{{select_text}}</view>
			<view class='footer-no-sure' v-if="in_range == 0" @click='onNoSureClick'>确认选择</view>
			<view class='footer-sure' v-if="in_range == 1" @click='onSureClick'>确认选择</view>
		</view>

		<view class="shan" v-if="show_dialog" @click="kaiguan" catchtouchmove="ture">
			<view class="kuang">
				<view class='content-container'>
					<view class='close-img-container' @click='onCloseClick'>
						<image src='/static/icon/det.png' class='close-img'></image>
					</view>
					<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/sccg_2x.png' class='close-top-img'></image>
					<text>选菜成功</text>
					<text>再去看看其他蔬菜吧</text>
					<text class='back-js' @click='onBackMarketClick' style="background:url('http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/orangeBtnbg.png');background-size: 100% 100%;">逛逛集市</text>
				</view>

			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				show_dialog: false,
				show_dialog_tip: true,
				padding_top_hr: 180,
				confirm_harvest: 0,
				is_pay: 1,
				input_content: '',
				remark: "",

				select_vegtable_list: '',
				select_text: '',
				user_harvest_id: '',
				weight_info: '',
				vegtable_list: '',
				in_range: 0,
				weight_tip: ''

			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var harvest_id = options.harvest_id;
			var is_pay = options.is_pay;
			if (is_pay) {
				this.is_pay = is_pay;
			}
			this.user_harvest_id = harvest_id;
			this.tomorrow_vegetable_list();
			this.get_today_vegetable();
		},

		onShow: function() {
			if (this.is_pay == 0) {
				uni.showModal({
					title: "温馨提示",
					content: "请在购买后再选菜！",
					showCancel: false,
					confirmText: "我知道了"
				})
			}
		},

		methods: {

			onShuoMingClick: function() {
				uni.navigateTo({
					url: "../select-vegetable-tip/select-vegetable-tip"
				})
			},
			//获取明日可收菜列表
			tomorrow_vegetable_list: function() {

				var param = {
					user_harvest_id: this.user_harvest_id
				}
				var that = this;
				this.xm_config.tomorrow_vegetable_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.length != 0) {
								for (var i = 0; i < res.data.info.length; i++) {
									res.data.info[i].vegetable_img = that.utils.imageUrlUtils(res.data.info[i].vegetable_img);
								}
								that.vegtable_list = res.data.info;
								console.log(that.vegtable_list)
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//获取今日已选蔬菜列表
			get_today_vegetable: function() {

				var param = {
					user_harvest_id: this.user_harvest_id
				}
				var that = this;
				this.xm_config.get_today_vegetable(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.list != null) {
								for (var i = 0; i < res.data.info.list.length; i++) {
									res.data.info.list[i].big_pic = that.utils.imageUrlUtils(res.data.info.list[i].big_pic);
								}
								if (res.data.info.list.length == 0) {
									that.padding_top_hr = 180
								} else if (res.data.info.list.length <= 5) {
									that.padding_top_hr = 235
								} else if (res.data.info.list.length <= 15) {
									that.padding_top_hr = 390
								} else if (res.data.info.list.length <= 20) {
									that.padding_top_hr = 535
								}
								console.log(that.padding_top_hr)
								that.select_vegtable_list = res.data.info.list;
								that.select_text = res.data.info.prompt;
								that.confirm_harvest = res.data.info.confirm_harvest;
								that.in_range = res.data.info.in_range;
								that.weight_info = res.data.info.weight_info;
								that.weight_tip = res.data.info.weight_tip;
								that.remark = res.data.info.remark;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},


			onJianClick: function(item) {
				var item = item;
				if (item.is_available == 0 || this.confirm_harvest == 1) {
					return;
				}
				this.del_today_vegetable(item.farm_vegetable_id);
			},

			onJiaClick: function(item) {

				if (this.is_pay == 0) {
					wx.showToast({
						title: '请购买后再来选菜！',
						icon: 'none'
					})
					return;
				}

				var item = item;
				if (item.is_available == 0 || this.confirm_harvest == 1) {
					return;
				}
				this.add_choose_today_vegetable(item.farm_vegetable_id);

			},

			//选择今日蔬菜调取接口
			add_choose_today_vegetable: function(farm_vegetable_id) {
				var that = this;
				var param = {
					user_harvest_id: this.user_harvest_id,
					vegetable_id: farm_vegetable_id
				}
				this.xm_config.choose_today_vegetable(param)
					.then(function(res) {
						if (res.data.status == 1) {
							that.tomorrow_vegetable_list();
							that.get_today_vegetable();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},


			onItemClick: function(item) {
				var item = item;
				if (item.is_available == 0 || this.confirm_harvest == 1) {
					uni.showToast({
						title: '当前蔬菜不可选，请选择其他蔬菜',
						icon: 'none'
					})
					return;
				}
			},

			onDelClick: function(item) {
				var item = item;
				this.del_today_vegetable(item.vegetable_id);
			},

			//移除选择的菜
			del_today_vegetable: function(vegetable_id) {
				var that = this;
				var param = {
					user_harvest_id: this.user_harvest_id,
					vegetable_id: vegetable_id
				}
				this.xm_config.del_today_vegetable(param)
					.then(function(res) {
						if (res.data.status == 1) {
							that.tomorrow_vegetable_list();
							that.get_today_vegetable();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onCloseTipClick: function() {
				var show_dialog_tip = !this.show_dialog_tip;
				this.show_dialog_tip = show_dialog_tip

			},

			onBackMarketClick: function() {
				uni.switchTab({
					url: '../home-market/home-market',
				})
			},

			onCloseClick: function() {
				var show_dialog = !this.show_dialog;
				this.show_dialog = show_dialog


			},

			onSureClick: function() {
				this.confirm_vegetable_choice();
			},

			//确认选择蔬菜接口
			confirm_vegetable_choice: function() {

				var that = this;
				var param = {
					user_harvest_id: this.user_harvest_id,
				}

				//是否留言
				if (this.input_content) {
					param.info = this.data.input_content
				}
				this.xm_config.confirm_vegetable_choice(param)
					.then(function(res) {
						if (res.data.status == 1) {
							that.show_dialog = true

							// var pages = getCurrentPages();
							// var currPage = pages[pages.length - 1]; //当前页面
							// var prevPage = pages[pages.length - 2]; //上一个页面
							// prevPage.$vm.update_harvest_vegtable_list();
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

			onNoSureClick: function() {
				uni.showToast({
					title: '当前选菜重量不达标，请继续选择',
					icon: 'none'
				})
			},

			getInputContent: function(e) {
				this.input_content = e.detail.value
			},

		}
	}
</script>

<style>
	.tip-img {
		width: 32rpx;
		height: 32rpx;
		padding: 10rpx 10rpx 0 0;
	}

	page {
		background: #f3f6fb;
	}

	.top-container {
		background: #fff;
		position: fixed;
		z-index: 99;
		width: 100%;
		box-shadow: 0px 5px 20px -5px #ddd;
	}

	.top-img-item {
		width: 144rpx;
		height: 144rpx;
		position: relative;
		align-items: center;
		display: flex;
	}

	.goods-name-text {
		color: #333;
		font-size: 20rpx;
	}

	.top-text-container {
		display: flex;
		flex-direction: row;
		padding: 20rpx 30rpx 0 30rpx;
		color: #333;
		font-size: 32rpx;
		align-items: center;
	}

	.zzl-text {
		color: #999;
		font-size: 28rpx;
		margin: 0 10rpx;
	}

	.top-img-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0rpx 15rpx;
	}

	.top-img {
		width: 105rpx;
		height: 105rpx;
		background: #ddd;
	}

	.delete-img {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: -0rpx;
		top: -15rpx;
	}

	.goods-add-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.good-num {
		color: #333;
		font-size: 30rpx;
	}

	.djxf-text {
		color: #4cd9a8;
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}

	.top-item-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.jian-img {
		width: 40rpx;
		height: 40rpx;
		padding: 0 20rpx;
	}

	.jia-img {
		width: 40rpx;
		height: 40rpx;
		padding-left: 20rpx;
	}

	.goods-img {
		width: 160rpx;
		height: 160rpx;
		margin-right: 20rpx;
	}

	.mr-text {
		height: 130rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		margin-top: 80rpx;
	}

	.mr-text-t {
		width: 270rpx;
		height: 60rpx;
		color: #fff;
		line-height: 60rpx;
		text-align: center;
	}

	.good-item-container {
		display: flex;
		flex-direction: row;
		padding: 20rpx 30rpx;
		background: #fff;
		justify-content: space-between;
		border-bottom: 1rpx solid #e4e4e4;
	}

	.isShadow {
		opacity: 0.5;
		background: #eee;
	}

	.good-item-left {
		display: flex;
		flex-direction: row;
	}

	.good-price-name-container {
		display: flex;
		flex-direction: column;
		color: #333;
		font-size: 32rpx;
	}

	.good-list-container {
		display: flex;
		flex-direction: column;
		padding-bottom: 260rpx;
	}

	.good-list-container-padding-top180 {
		padding-top: 180rpx;
	}

	.good-list-container-padding-top235 {
		padding-top: 235rpx;
	}

	.good-list-container-padding-top390 {
		padding-top: 390rpx;
	}

	.good-list-container-padding-top535 {
		padding-top: 535rpx;
	}

	.footer-container {
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.footer-js {
		background: #fefada;
		height: 60rpx;
		color: #333;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		justify-content: center;
	}

	.footer-sure {
		background: #4cd9a8;
		height: 100rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.footer-no-sure {
		background: #ccc;
		height: 100rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shan {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		left: 0;
		z-index: 99;
	}

	.kuang {
		width: 68%;
		height: 70%;
		padding: 0 30rpx;
		margin: 220rpx auto 30rpx;
		background-size: 100% 100%;
		position: relative;
	}

	.close-img-container {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		width: 100%;
		padding: 20rpx 40rpx 20rpx 60rpx;
		margin-right: 60rpx;
	}

	.close-img-container-tip {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		width: 100%;
		padding: 20rpx 40rpx 0rpx 60rpx;
		margin-right: 60rpx;
	}

	.close-img {
		width: 40rpx;
		height: 40rpx;
		padding: 10rpx;
	}

	.content-container {
		display: flex;
		flex-direction: column;
		background: #fff;
		align-items: center;
		border-radius: 40rpx;
	}

	.close-top-img {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 20rpx;
	}

	.back-js {
		color: #fff;
		width: 375rpx;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		margin-top: 50rpx;
		margin-bottom: 50rpx;

	}

	.ggcd {
		color: #fff;
		width: 375rpx;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 50rpx;
	}

	.hide {
		display: none;
	}

	.kuang-tip {
		width: 80%;
		height: 70%;
		padding: 0 30rpx;
		margin: 350rpx auto 30rpx;
		background-size: 100% 100%;
		position: relative;
	}

	.content-container-tip {
		display: flex;
		flex-direction: column;
		background: #fff;
		align-items: center;
		border-radius: 30rpx;
	}

	.tip-tisi {
		color: #000;
		font-size: 32rpx;
		margin-top: -30rpx;
	}

	.tip-content {
		color: #555;
		padding: 20rpx 60rpx;
		font-size: 28rpx;
	}

	.wzdl {
		color: #fff;
		width: 250rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 35rpx;
	}

	.syfs-num {
		color: #58dbab;
	}

	.num-container {
		color: #999;
		font-size: 28rpx;
		margin-top: 10rpx;
	}

	.top-item {
		width: 144rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		margin-top: 20rpx;
	}

	.footer-item {
		color: #000;
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		border-top: 1rpx solid #f8f8f8;
	}

	.right-data1 {
		color: #666;
		/*display: flex;*/
		flex: 1;
		font-size: 26rpx;
		margin-left: 20rpx;
	}
</style>
