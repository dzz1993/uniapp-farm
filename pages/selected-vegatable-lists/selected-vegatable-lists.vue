<template>
	<view>
		<view class='page-header'>
			<view class='header-left'>
				<text>不喜欢的品种</text>
				<text class='header-left-text'>({{count}}种)</text>
			</view>
			<view class='header-right' @click='OnDeleteAllGoodsTap'>
				<image class='header-right-image' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/shanchu2x.png'></image>
				<text class='header-right-text'>清空</text>
			</view>
		</view>
		<view class='page-center'>
			<block v-for="(item,index) in goodsList" :key="index">
				<view class='center-contrainer'>
					<view class='center-image-text'>
						<image class='center-image-left' :src="item.big_pic"></image>
						<text>{{item.name}}</text>
					</view>
					<view class='center-image-text-right' @click='OnDeleteSingleGoodsTap(item)'>
						<image class='center-image-right' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/deleteBtn.png'></image>
					</view>
				</view>
			</block>
		</view>
		<view class='tiShi' v-if="isShowNoList">
			<image class="noCard" src="https://m.aoyifarm.com/Application/wx_img/notfound.png"></image>
			<view>暂无不喜欢的品种</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				isShowNoList: true,
				page: 1,
				count: 0,
				vegetable_id: ''
			}
		},

		onLoad: function(options) {
			var set_id = options.set_id;
			this.set_id = set_id;
			this.get_unlike_vegetable()
		},

		methods: {
			get_unlike_vegetable: function() {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					p: this.page,
					pagenum: 20,
					set_id: this.set_id,
				}
				this.xm_config.get_unlike_vegetable(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {

								for (var i = 0; i < res.data.info.list.length; i++) {
									res.data.info.list[i].big_pic = that.utils.imageUrlUtils(res.data.info.list[i].big_pic);
								}

								if (that.page == 1) {
									that.goodsList = [];
									that.isShowNoList = res.data.info.list.length > 0 ? false : true;
								}

								that.goodsList = that.goodsList.concat(res.data.info.list);
								that.count = res.data.info.count;
							} else {
								if (that.page == 1) {
									that.isShowNoList = true;
									that.goodsList = [];
								}
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})

							if (that.page == 1) {
								that.isShowNoList = true;
								that.goodsList = [];
							}

						}
					});
			},

			/**
			 * 删除单个商品的接口
			 */
			OnDeleteSingleGoodsTap: function(item) {
				this.vegetable_id = item.vegetable_id;
				var params = {
					user_id: this.globalData.user_info.userid,
					vegetable_id: item.vegetable_id,
					set_id: this.set_id,
				}
				var that = this;
				this.xm_config.del_unlike_vegetable(params)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '删除成功',
								icon: "none"
							})

							for (var i = 0; i < that.goodsList.length; i++) {
								var temp_vegetable_id = that.goodsList[i].vegetable_id;
								if (parseFloat(temp_vegetable_id) == parseFloat(that.vegetable_id)) {
									that.goodsList.splice(i, 1);
									that.goodsList = that.goodsList;
									that.count = that.goodsList.length;
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

			/**
			 * 删除所有商品的接口
			 */
			OnDeleteAllGoodsTap: function() {
				if (this.goodsList.length == 0) {
					uni.showToast({
						title: '暂无不喜欢的品种',
						icon: "none"
					})
					return;
				}
				var params = {
					user_id: this.globalData.user_info.userid,
					set_id: this.set_id
				}

				var that = this;
				this.xm_config.del_unlike_vegetable(params)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '删除成功',
								icon: "none"
							})
							that.get_unlike_vegetable();

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//触发加载更多事件
			onReachBottom: function() {
				this.page++;
				this.get_unlike_vegetable();
			},
		}
	}
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.page-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #fff;
		flex: 1;
		font-size: 32rpx;
		align-items: center;
		padding: 20rpx 20rpx 20rpx 20rpx;
		box-shadow: 0px 5px 20px -5px #ddd;
	}

	.header-left {
		display: flex;
		flex-direction: row;
	}

	.header-left-text {
		color: #85DFA3;
		padding-left: 20rpx;
	}

	.header-right {
		display: flex;
		flex-direction: row;
		padding-right: 10rpx;
	}

	.header-right-image {
		width: 40rpx;
		height: 40rpx;
	}

	.header-right-text {
		padding-left: 10rpx;
		color: #85DFA3;
	}

	.page-center {
		margin-top: 20rpx;
		background: #fff;
	}

	.center-contrainer {
		display: flex;
		flex-direction: row;
		padding: 20rpx 20rpx 20rpx 20rpx;
		flex: 1;
		justify-content: space-between;
		border-bottom: 2rpx solid #f2f2f4;
	}

	.center-image-text {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.center-image-left {
		margin-right: 20rpx;
		width: 100rpx;
		height: 100rpx;
	}

	.center-image-text-right {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 20rpx;
	}

	.center-image-right {
		width: 40rpx;
		height: 40rpx;
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
