<template>
	<view>
		<block v-if="list_type == 1">
			<view class="top-container">
				<view class="set-tab">
					<view v-if="current_tab_index == 1" class="tab-1-a" @click="onTaoCanTabClick(1)">家庭套餐/全家福套餐</view>
					<view v-else class="tab-1-b" @click="onTaoCanTabClick(1)">家庭套餐/全家福套餐</view>

					<view v-if="current_tab_index == 2" class="tab-2-a" @click="onTaoCanTabClick(2)">宝宝套餐</view>
					<view v-else class="tab-2-b" @click="onTaoCanTabClick(2)">宝宝套餐</view>
				</view>
			</view>
		</block>

		<view :class="[list_type == 1 ? 'section' : 'section1']">
			<view class='left-container'>
				<scroll-view class='left' scroll-y="true">
					<block v-for="(item,index) in types" :key="index">
						<view class='left-view' @click='leftTap(item,index)' v-if="current_class_id != item.class_id">
							<text>{{item.class_name}}</text>
							<!-- <image class="red-dot" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/redDot.png"></image> -->
						</view>
						<view class='left-view-active' @click='leftTap(item,index)' v-else>
							<text>{{item.class_name}}</text>
							<image class='left-view-image' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/greenjiantou.png'></image>
						</view>

					</block>
				</scroll-view>
				<view class='left-bottom-container' @click='OnDeleteSelectedVegatableTap'>
					<image class='left-bottom-image' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/shanchu3x.png'></image>
					<view class="redPoint" v-if="countInfo>0">
						{{countInfo}}
					</view>
				</view>
			</view>

			<scroll-view class='right' scroll-y="true">
				<view class='right-text-image'>
					<text>{{current_good_item.class_name}}</text>
				</view>
				<view class='goods-container'>
					<image class="no-new" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/noNew.png" v-if="current_good_item.len == 0 && current_good_item.class_name == '上新'"></image>
					<block v-for="(item,index) in current_good_item.list" :key="index">
						<view class='goods-box'>
							<view>
								<image :src="item.big_pic" class='img'></image>
							</view>
							<text class='text'>{{item.name}}</text>
							<image class='redCha' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/redCha3.png' @click='onDeleteClick'
							 :data-item="item"></image>
							<image class='xin' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/xinpin.png' v-if="item.is_new == 1"></image>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>

		<view class="tishi-bottom">
			<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/tishiIcon.png' class='bottom-img'></image>
			<text class='bottom-text'>选择您不喜欢的品种,农场不安排配送，其余农场依据您的种菜单科学合理搭配配送</text>
		</view>

		<!-- <view :animation="animationY" style="position:fixed;top:{{ballY}}px;" hidden="{{!showBall}}">
			<image :src='vegetable_img' class="ball" :animation="animationX" style="position:fixed;left:{{ballX}}px;"></image>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前类型
				types: [],
				current_class_index: 0,
				current_delete_click_event: {},
				countInfo: 0,
				preTime: 0,
				home_go: 0,
				set_id: "",
				list_type: "",
				current_tab_index: 1,
				current_good_item: '',
				current_class_id: '',
				vegetable_id: ''
			}
		},

		onLoad: function(options) {
			var home_go = options.home_go;
			this.home_go = home_go;
			var set_id = options.set_id;
			var list_type = options.list_type;

			this.list_type = list_type;
			this.current_tab_index = set_id == 3 ? 1 : 2,
				this.set_id = set_id;
		},

		onShow: function() {
			this.get_all_vegetablew();
			this.get_unlike_vegetable()
		},

		methods: {

			// 左侧分类按钮点击事件
			leftTap: function(item, index) {
				var index = index;
				var item = this.types[index]

				this.current_class_id = item.class_id;
				this.current_good_item = item;
				this.current_class_index = index;

			},

			//获取菜品
			get_all_vegetablew: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					set_id: this.set_id,
				}
				this.xm_config.get_all_vegetablew(param)
					.then(function(res) {
						if (res.data.status == 1) {

							if (res.data.info != null) {
								for (var i = 0; i < res.data.info.length; i++) {
									res.data.info[i].len = res.data.info[i].list.length;
									if (res.data.info[i].list) {
										for (var j = 0; j < res.data.info[i].list.length; j++) {
											res.data.info[i].list[j].big_pic = that.utils.imageUrlUtils(res.data.info[i].list[j].big_pic);
										}
									}
								}
								that.types = res.data.info;
								that.isShowNoList = res.data.info.length > 0 ? false : true;


								that.current_class_id = that.types[that.current_class_index].class_id;
								that.current_good_item = that.types[that.current_class_index];
							} else {
								that.isShowNoList = true;
								that.types = [];
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})

							that.isShowNoList = true;
							that.types = [];
						}
					});
			},

			//获取小红点数字
			get_unlike_vegetable: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					set_id: this.set_id,
				}
				this.xm_config.get_unlike_vegetable(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.countInfo = res.data.info.count;
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})

						}
					});
			},

			onDeleteClick: function(event) {
				var that = this;
				var timestamp = new Date().getTime();
				var tt = parseFloat(timestamp) - parseFloat(this.preTime);
				if (parseFloat(timestamp) - parseFloat(this.preTime) > 300) {
					this.preTime = new Date().getTime();
					var item = event.currentTarget.dataset.item;
					this.current_delete_click_event = event;
					this.vegetable_id = item.vegetable_id;
					this.vegetable_img = item.big_pic;

					var param = {
						user_id: this.globalData.user_info.userid,
						vegetable_id: item.vegetable_id,
					}

					this.xm_config.set_unlike_vegetable(param)
						.then(function(res) {
							if (res.data.status == 1) {
								if (res.data.info != null) {
									for (var i = 0; i < that.types.length; i++) {
										for (var j = 0; j < that.types[i].list.length; j++) {
											var temp_vegetable_id = that.types[i].list[j].vegetable_id;
											if (parseFloat(temp_vegetable_id) == parseFloat(that.vegetable_id)) {
												that.types[i].list.splice(j, 1);
											}
										}
									}

									that.current_good_item = that.types[that.current_class_index];
									that.countInfo = parseInt(that.countInfo) + 1;

									if (that.countInfo > 10) {
										wx.showModal({
											title: '温馨提示',
											content: '不喜欢的蔬菜太多，可能会造成收菜延期或重复放置喜欢的蔬菜！',
											showCancel: false,


										})

									}
								}

							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})

							}
						});
				}
			},

			// 删除已选择的蔬菜品种页面
			OnDeleteSelectedVegatableTap: function() {
				uni.navigateTo({
					url: '../selected-vegatable-lists/selected-vegatable-lists?set_id=' + this.set_id,
				})
			},
		}
	}
</script>

<style>
	.section {
		position: absolute;
		width: 100%;
		height: 87%;
		overflow: hidden;
	}

	.section1 {
		position: absolute;
		width: 100%;
		height: 93%;
		overflow: hidden;
	}

	.left-container {
		display: flex;
		flex-direction: column;
		position: absolute;
		left: 0;
		top: 0;
		width: 100px;
		height: 80%;
		background: #f3f6fb;
		text-align: center;
		font-size: 28rpx;
		color: #666;
		margin-top: 8rpx;
	}

	.left {
		height: 83%;
		width: 100px;
		position: relative;

	}

	.left-view-active {
		display: flex;
		flex-direction: row;
		height: 60rpx;
		background: #fff;
		color: #85dfa3;
		border: 1rpx solid #ddd;
		border-radius: 15rpx;
		margin: 20rpx 20rpx 20rpx 20rpx;
		justify-content: center;
		align-items: center;
		box-shadow: 0px 5px 20px -5px #ddd;
	}

	.left-view {
		display: flex;
		height: 60rpx;
		margin: 20rpx 20rpx 20rpx 20rpx;
		justify-content: center;
		align-items: center;
	}

	.left-view-image {
		margin-left: 10rpx;
		width: 20rpx;
		height: 30rpx;
	}

	.left-bottom-container {
		position: relative;
		width: 100px;
		height: 80rpx;
		align-items: center;
		margin-top: 80rpx;
		justify-content: center;
	}

	.left-bottom-image {
		width: 80rpx;
		height: 80rpx;
	}

	.redPoint {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 65rpx;
		top: -10rpx;
		background-color: red;
		text-align: center;
		border-radius: 50%;
		color: white;
		font-size: 20rpx;
		line-height: 40rpx;
	}

	.right {
		margin-left: 100px;
		height: 82%;
		overflow: hidden;
		width: auto;
		background: #fff;
		margin-bottom: 30rpx;
		border-bottom-left-radius: 15rpx;
		color: #666;
		box-shadow: 0px 5px 20px -5px #ddd;
		margin-top: 8rpx;
	}

	.right-text-image {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-bottom: 2rpx solid #f2f2f4;
		align-items: center;
		padding: 20rpx 0;
	}

	.right-image {
		width: 40rpx;
		height: 40rpx;
	}

	.right-text {
		font-size: 26rpx;
	}

	.goods-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: content-box;
		padding: 20rpx 60rpx;
		position: relative;
	}

	.goods-box {
		display: flex;
		flex-direction: column;
		width: 160rpx;
		background-color: #fff;
		overflow: hidden;
		margin-bottom: 30rpx;
		/* border-radius: 20rpx; */
		position: relative;
		align-items: center;
	}

	.goods-box .img {
		padding: 15rpx 15rpx 15rpx 15rpx;
		width: 140rpx;
		height: 140rpx;
		overflow: hidden;
	}

	.img-container {
		width: 140rpx;
		height: 140rpx;
	}

	.goods-box .text {
		margin-top: 10rpx;
		text-align: center;
		font-size: 28rpx;
	}

	.redCha {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		padding-left: 30rpx;
		padding-bottom: 30rpx;
		text-align: center;
		line-height: 40rpx;
	}

	.xin {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 0rpx;
		left: 0;
		text-align: center;
		line-height: 40rpx;
	}

	.tishi-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		margin: 20rpx 20rpx 10rpx 20rpx;
		/* text-align: center;
  align-items: center; */
		color: #666;
		padding-right: 20rpx;
	}

	.tishi-bottom_x {
		position: fixed;
		bottom: 20rpx;
		width: 100%;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		margin: 20rpx 20rpx 20rpx 20rpx;
		/* text-align: center;
  align-items: center; */
		color: #666;
		padding-right: 20rpx;
	}

	.tishi-bottom .bottom-img {
		width: 60rpx;
		height: 40rpx;
	}

	.tishi-bottom .bottom-text {
		margin-left: 10rpx;
		margin-right: 20rpx;
		font-size: 28rpx;
		padding-right: 20rpx;
	}

	.tishi-bottom_x .bottom-img {
		width: 60rpx;
		height: 40rpx;
	}

	.tishi-bottom_x .bottom-text {
		margin-left: 10rpx;
		margin-right: 20rpx;
		font-size: 28rpx;
		padding-right: 20rpx;
	}

	.ball {
		width: 140rpx;
		height: 140rpx;
	}

	.hide {
		display: none;
	}

	.red-dot {
		width: 15rpx;
		height: 15rpx;
		position: relative;
		right: 1rpx;
		top: -10rpx;
	}

	.no-new {
		display: inline-block;
		overflow: hidden;

	}

	.top-container {
		display: flex;
		height: 80rpx;
		width: 100%;
		align-items: center;
		justify-content: center;
	}

	.set-tab {
		display: flex;
		flex-direction: row;
	}

	.tab-1-a {
		display: flex;
		background: #51dea5;
		height: 60rpx;
		width: 400rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		border: 2rpx solid #51dea5;
		border-radius: 10rpx 0 0 10rpx;
		align-items: center;
		justify-content: center;
	}


	.tab-1-b {
		display: flex;
		height: 60rpx;
		width: 400rpx;
		font-size: 30rpx;
		color: #51dea5;
		border: 2rpx solid #51dea5;
		border-radius: 10rpx 0 0 10rpx;
		align-items: center;
		justify-content: center;
	}

	.tab-2-a {
		display: flex;
		height: 60rpx;
		width: 200rpx;
		background: #51dea5;
		color: #FFFFFF;
		font-size: 30rpx;
		border: 2rpx solid #51dea5;
		border-radius: 0 10rpx 10rpx 0;
		align-items: center;
		justify-content: center;
	}

	.tab-2-b {
		display: flex;
		height: 60rpx;
		width: 200rpx;
		color: #51dea5;
		font-size: 30rpx;
		border: 2rpx solid #51dea5;
		border-radius: 0 10rpx 10rpx 0;
		align-items: center;
		justify-content: center;
	}
</style>
