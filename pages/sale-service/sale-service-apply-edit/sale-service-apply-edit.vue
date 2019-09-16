<template>
	<view>
		<view class='container'>
			<view class='goods-info'>
				<view class='order-info'>
					<text>{{itemData.head_info}}</text>
				</view>

				<view class='item-center-default'>
					<image class="mujiimg" :src="itemData.goods_image" mode='aspectFill'></image>
					<view class='center-center'>
						<text class='text-wpd'>{{itemData.goods_name}}</text>
						<text class='text-wpd' v-if="itemData.quantity">数量：{{itemData.quantity}}</text>
					</view>
					<text class='price' v-if="itemData.com_type == 3">￥{{itemData.price}}</text>
				</view>

			</view>

			<view class='sq-container'>
				<text class='sq-title'>申请原因</text>
				<view class='wenZi'>
					<textarea placeholder="请在此处描述问题" name="textarea" bindinput='getContent' :value="sale_detail.apply_reason"></textarea>
				</view>
				<view class='pic-tishi'>最多上传3张图片</view>
				<view class="pics">
					<block v-for="(item,index) in imgurls" :key="index">
						<view class='picsGallary'>
							<image :src="item" class="yiyou" @click="onImgClick(item)" mode="aspectFill"></image>
							<image src="https://m.viewcreator3d.cn/Application/wx_img/gb.png" class="delete" @click='deletePic'></image>
						</view>
					</block>
					<image src="https://m.viewcreator3d.cn/Application/wx_img/sc.png" class="upload"  @click="xuanTu" v-if="!upHide" ></image>
				</view>
				<view class='button-container'>
					<button @click='submit' class="greenBtn">提交</button>
				</view>

			</view>

			<view class='top-shuoming'>
				<view class='shuoming'>
					<text class='title-shuoming'>说明</text>
					<text class='title-content'>{{itemData.info_tip}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picLeft: 3,
				imgurls: [],
				uploadImgUrls: [],
				content: '',
				itemData: '',
				sale_detail:{},
				upHide:true
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var that = this;
			var itemData = options.itemData;
			if (itemData) {
				var itemData = JSON.parse(itemData);
				itemData.goods_image = that.utils.imageUrlUtils(itemData.goods_image);
				that.itemData = itemData;
			}

			this.getSaleDetailInfo();
		},

		methods: {
			//获取售后详情
			getSaleDetailInfo: function() {
				var param = {
					id: this.itemData.id,
					user_id: this.globalData.user_info.userid,
				}
				var that = this;
				uni.showLoading({
					title: '加载中...',
				})
				this.xm_config.compensation_info(param)
				.then(function(res){
					wx.hideLoading();
					if (res.data.status == 1) {
						if (res.data.info != null && res.data.info.info != null) {
							if (res.data.info.info.apply_img1) {
								that.uploadImgUrls.push(res.data.info.info.apply_img1);
								res.data.info.info.apply_img1 = that.utils.imageUrlUtils(res.data.info.info.apply_img1);
								that.imgurls.push(res.data.info.info.apply_img1);
							}
					
							if (res.data.info.info.apply_img2) {
								that.uploadImgUrls.push(res.data.info.info.apply_img2);
								res.data.info.info.apply_img2 = that.utils.imageUrlUtils(res.data.info.info.apply_img2);
								that.imgurls.push(res.data.info.info.apply_img2);
							}
					
							if (res.data.info.info.apply_img3) {
								that.uploadImgUrls.push(res.data.info.info.apply_img3);
								res.data.info.info.apply_img3 = that.utils.imageUrlUtils(res.data.info.info.apply_img3);
								that.imgurls.push(res.data.info.info.apply_img3);
							}
							
							that.sale_detail = res.data.info.info;
	
							that.picLeft = 3 - that.imgurls.length;
							if (that.picLeft == 0) {
								that.upHide = true;
							} else {
								that.upHide = false;
							}
							that.content = that.sale_detail.apply_reason;
						}
					} else {
						wx.showToast({
							title: res.data.msg
						})
					}
				});	
			},
			//上传评论图片
			xuanTu: function() {
				var that = this;
				var max = this.picLeft;
				var upHide = "";
				uni.chooseImage({
					count: max,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						var tempFilePaths = res.tempFilePaths;
						for (var i in tempFilePaths) {
							that.imgurls.push(tempFilePaths[i]);
						}
						var leftNum = 3 - that.imgurls.length;
						if (leftNum == 0) {
							upHide = true;
						} else {
							upHide = false;
						}
						that.upHide = upHide;
						that.picLeft = leftNum;
						//上传图片
						that.uploadImg(tempFilePaths);
					}
				})
			},

			//上传图片预览
			onImgClick: function(event) {
				var img = event.currentTarget.dataset.src;
				var imgList = this.imgurls;
				wx.previewImage({
					current: img,
					urls: imgList
				})
			},

			//删除图片
			deletePic: function(event) {
				var that = this;
				var ind = event.currentTarget.dataset.ind;
				that.imgurls.splice(ind, 1);
				that.uploadImgUrls.splice(ind, 1);
				var leftNum = 3 - that.imgurls.length;
				that.upHide = false;
				that.picLeft = leftNum;
				that.imgurls = this.imgurls;
			},

			uploadImg: function(filePath) {
				// this.data.uploadImgUrls = []
				var that = this;
				var i = 0
				var upHide = "";
				var name = ""
				for (var idx in filePath) {
					if (idx == 0) {
						name = "headimgurl1";
					} else if (idx == 1) {
						name = "headimgurl2";
					} else if (idx == 3) {
						name = "headimgurl3";
					}
					uni.showLoading({
						title: '加载中...',
					})
					uni.uploadFile({
						url: that.xm_config.xcx_picture_upload,
						filePath: filePath[idx],
						formData: that.utils.vc_encryp_param_fun(),
						name: name,
						success: function(res) {
							uni.hideLoading();
							var data = JSON.parse(res.data);
							that.uploadImgUrls.push(data.info);
							that.imgurls =that.imgurls;
							i++;
						}
					})
				}
			},

			getContent: function(e) {
				var content = e.detail.value;
				this.content = content;
			},

			submit: function() {
				if (!this.content.trim()) {
					uni.showToast({
						icon: "none",
						title: '请输入问题描述',
					})

					return;
				}

				if (this.imgurls.length == 0) {
					uni.showToast({
						icon: "none",
						title: '请上传相关图片',
					})
					return;
				}

				var param = {
					id: this.itemData.id,
					apply_reason: this.content,
				}

				//图片参数
				if (this.uploadImgUrls[0]) {
					param.apply_img1 = this.uploadImgUrls[0]
				} else {
					param.apply_img1 = 1
				}
				if (this.uploadImgUrls[1]) {
					param.apply_img2 = this.uploadImgUrls[1]
				} else {
					param.apply_img2 = 1
				}
				if (this.uploadImgUrls[2]) {
					param.apply_img3 = this.uploadImgUrls[2]
				} else {
					param.apply_img3 = 1
				}
				
				uni.showLoading({
					title: '加载中...',
				})
				this.xm_config.apply_compensation(param)
				.then(function(res){
					uni.hideLoading();
					if (res.data.status == 1) {
						if (res.data.info != null) {
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
							uni.redirectTo({
								url: '../sale-service-apply-success/sale-service-apply-success?id=' + res.data.info.id + "&com_time=" + res.data
									.info.com_time,
							})
						}
					} else {
						uni.showToast({
							icon: "none",
							title: res.data.msg
						})
					}
				});
			},
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.top-shuoming {
		background: #fff;
		display: flex;
		margin: 10rpx 20rpx 20rpx 20rpx;
		padding: 20rpx 15rpx;
		border-radius: 10px;
	}

	.shuoming {
		border-style: dashed;
		border: 3rpx dashed #ccc;
		display: flex;
		flex-direction: column;
		margin: 5rpx 10rpx 5rpx 10rpx;
		padding: 15rpx 15rpx 15rpx 15rpx;
	}

	.title-shuoming {
		color: #333;
		font-size: 28rpx;
		display: flex;
		justify-content: center;
	}

	.title-content {
		color: #333;
		font-size: 24rpx;
		display: flex;
	}

	.order-info {
		background: #fff;
		color: #333;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx 20rpx;
		font-size: 28rpx;
		border-bottom: 1rpx solid #f4f4f4;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.item-center-default {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx 30rpx;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.mujiimg {
		width: 140rpx;
		height: 114rpx;
		margin-right: 15rpx;
	}

	.text-wpd {
		color: #333;
		font-size: 28rpx;
	}

	.goods-info {
		display: flex;
		flex-direction: column;
		background: #fff;
		margin: 20rpx 20rpx 10rpx 20rpx;
		border-radius: 10px;
	}

	.sq-container {
		background: #fff;
		display: flex;
		flex-direction: column;
		border-top: 15rpx solid #f4f4f4;
		border-radius: 15px;
		margin: 0rpx 20rpx 10rpx 20rpx;
	}

	.sq-title {
		padding: 20rpx 20rpx 20rpx 20rpx;
		color: #333;
		font-size: 28rpx;
	}

	.wenZi {
		background-color: #fbfbfb;
		border: 1px solid #eee;
		padding: 15rpx 2%;
		margin: 0 30rpx;
		font-size: 26rpx;
		color: #333;
	}

	.pics {
		margin: 0rpx 30rpx;
		display: flex;
	}

	.picsGallary {
		position: relative;
		margin-right: 30rpx;
	}

	.delete {
		position: absolute;
		top: -10rpx;
		right: -10rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.yiyou {
		width: 150rpx;
		height: 150rpx;
		border: 1rpx solid #ccc;
	}

	.upload {
		width: 150rpx;
		height: 150rpx;
	}

	.greenBtn {
		width: 300rpx;
		height: 60rpx;
		display: block;
		background-color: #85DFA3;
		color: #fff;
		padding-top: 2rpx;
		padding-bottom: 2rpx;
		font-size: 24rpx;
		border-radius: 60rpx;
		text-align: center;
		margin: 10rpx 0rpx 30rpx 0rpx;
	}

	.center-center {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.pic-tishi {
		color: #999;
		font-size: 24rpx;
		padding: 20rpx 30rpx;
	}


	.container {
		background: #f2f5fa;
	}

	.button-container {
		display: flex;
		justify-content: center;
	}

	.price {
		color: #fd1e0d;
	}
</style>
