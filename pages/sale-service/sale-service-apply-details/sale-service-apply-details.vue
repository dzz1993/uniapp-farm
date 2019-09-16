<template>
	<view>
		<view class='top-statue'>
			<image class='detail-image' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/shenhe.png'></image>
			<text>服务单{{sale_detail.temp_text}}</text>
		</view>

		<view class='order-info'>
			<text>服务单号：{{sale_detail.id}}</text>
			<text>申请时间：{{sale_detail.add_time}}</text>
		</view>


		<view class='title-bar'>
			<text>申请原因</text>
		</view>

		<view class='title-container'>
			<view class='title-yy'>
				<text class='text-content'>{{sale_detail.apply_reason}}</text>
			</view>
		</view>

		<view class='img-container'>
			<block v-for="(item,index) in sale_detail.imgList" :key='index'>
				<image class="img" :src='item' mode="aspectFill" @click='onImgClick(item)'></image>
			</block>
		</view>

		<view class='order-result' v-if="sale_detail.temp_status==2 ||sale_detail.temp_status==3">
			<view class='title-bar'>
				<text>申请结果</text>
			</view>

			<view class='title-container'>
				<view class='title-yy'>
					<text class='text-content'>{{sale_detail.text_info}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				sale_detail: '',
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var id = options.id;
			this.id = id;
			this.getSaleDetailInfo();
		},
		
		methods:{
			//获取售后详情
			getSaleDetailInfo: function() {
				//var that = this;
				var param = {
					id: this.id,
					user_id: this.globalData.user_info.userid,
				}
				uni.showLoading({
					title:'加载中',
				})
				var that = this;
				this.xm_config.compensation_info(param)
					.then(function(res) {
						uni.hideLoading();
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.info != null) {
								var imgList = [];
								if (res.data.info.info.apply_img1) {
									res.data.info.info.apply_img1 = that.utils.imageUrlUtils(res.data.info.info.apply_img1);
									imgList.push(res.data.info.info.apply_img1);
								}
			
								if (res.data.info.info.apply_img2) {
									res.data.info.info.apply_img2 = that.utils.imageUrlUtils(res.data.info.info.apply_img2);
									imgList.push(res.data.info.info.apply_img2);
								}
			
								if (res.data.info.info.apply_img3) {
									res.data.info.info.apply_img3 = that.utils.imageUrlUtils(res.data.info.info.apply_img3);
									imgList.push(res.data.info.info.apply_img3);
								}
								res.data.info.info.imgList = imgList;
								that.sale_detail = res.data.info.info;
								console.log(that.sale_detail);
							}
						} else {
							uni.showToast({
								title: res.data.msg
							})
						}
					});
			},
			
			//图片预览
			onImgClick: function(item) {
				var img = item;
				var imgList = this.sale_detail.imgList;
				wx.previewImage({
					current: img,
					urls: imgList
				})
			},
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.top-statue {
		flex: true;
		flex-direction: row;
		background: #f2f5fa;
		color: #75da98;
		height: 112rpx;
		font-size: 34rpx;
		display: flex;
		align-items: center;
		padding-left: 15rpx;
	}

	.order-info {
		background: #fff;
		color: #333;
		font-size: 26rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		border-top: 1rpx solid #f4f4f4;
		border-bottom: 1rpx solid #f4f4f4;
	}

	.title-bar {
		background: #fff;
		color: #333;
		font-size: 26rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 15rpx 20rpx 15rpx 20rpx;
	}

	.title-yy {
		color: #a8acad;
		font-size: 26rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 15rpx 20rpx 15rpx 20rpx;
	}



	.img {
		width: 140rpx;
		height: 140rpx;
		margin-right: 10rpx;
		margin-left: 10rpx;
	}

	.sq-img {
		width: 100rpx;
		height: 100rpx;
		margin-bottom: 10rpx;
	}

	.pf-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.pf {
		display: flex;
		flex-direction: column;
		padding: 30rpx 0;
		border-bottom: 15rpx solid #f4f4f4;
	}

	.tj-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #333;
		font-size: 28rpx;
	}

	.line-hr {
		height: 2rpx;
		width: 200rpx;
		margin: 0 30rpx;
		background: #f4f4f4;
	}

	.text-shuoming {
		color: #333;
		font-size: 24rpx;
		align-items: flex-start;
		display: flex;
		padding: 0 30rpx;
		margin-top: 15rpx;
		justify-content: flex-start;
	}


	.detail-image {
		height: 65rpx;
		width: 59rpx;
		margin-right: 19rpx;
	}

	.title-container {
		height: 254rpx;
		margin: 0rpx 20rpx 15rpx 20rpx;
		background: #f2f5fa;
	}

	.img-container {
		display: flex;
		flex-direction: row;
		margin: 15rpx 10rpx 5rpx 10rpx;
	}
</style>
