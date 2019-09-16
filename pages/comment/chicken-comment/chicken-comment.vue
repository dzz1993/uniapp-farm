<template>
	<view class="page">
		<view class='comment-top-container'>
			<view class='top-left'>
				<image class="mujiimg" src="/static/icon/egg.png"></image>
				<view class='top-center'>
					<text>{{eggInfo.send_time_text}}</text>
					<text>{{eggInfo.send_time}}</text>
				</view>
			</view>
			<text>{{eggInfo.egg_num_text}}</text>
		</view>

		<view class="done">
			订单已完成
		</view>

		<view class="fenJie">
			<text>需要您的评价</text>
		</view>

		<view>

			<view class="stars">
				<image class="star" @click="starClick(0)" :src="star[0]?'../../../static/icon/luobo.png':'../../../static/icon/no_luobo.png'"></image>
				<image class="star" @click="starClick(1)" :src="star[1]?'../../../static/icon/luobo.png':'../../../static/icon/no_luobo.png'"></image>
				<image class="star" @click="starClick(2)" :src="star[2]?'../../../static/icon/luobo.png':'../../../static/icon/no_luobo.png'"></image>
				<image class="star" @click="starClick(3)" :src="star[3]?'../../../static/icon/luobo.png':'../../../static/icon/no_luobo.png'"></image>
				<image class="star" @click="starClick(4)" :src="star[4]?'../../../static/icon/luobo.png':'../../../static/icon/no_luobo.png'"></image>
			</view>

			<textarea class="wenZi" placeholder="请输入评论" name="textarea" @input="getContent"></textarea>

			<view class="pics">
				<block v-for="(image,index) in imgurls" :key="index">
					<view class='picsGallary'>
						<image :src="image" :data-src="image" class="yiyou" @click="onImgClick"></image>
						<image src="https://m.viewcreator3d.cn/Application/wx_img/gb.png" class="delete" @click="deletePic"></image>
					</view>
				</block>

				<image src="https://m.viewcreator3d.cn/Application/wx_img/sc.png" class="upload" @click="xuanTu" v-if="!upHide"></image>
			</view>

			<button formType="submit" class="yellowBtn" @click="formSubmit">提交</button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				starLevel: 0,
				upHide: false,
				picLeft: 3,
				star: [false, false, false, false, false],
				imgurls: [],
				uploadImgUrls: [],
				eggInfo: '',
				content: ''
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var eggInfo = options.eggInfo;
			if (eggInfo) {
				eggInfo = JSON.parse(options.eggInfo);
				this.eggInfo = eggInfo;
			}
		},
		methods: {
			//星级点击
			starClick: function(index) {
				var num = index;
				var now = [];
				for (var i = 0; i <= num; i++) {
					now[i] = true;
				}
				var sl = parseFloat(num) + 1;
				this.starLevel = sl;
				this.star = now;
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
				var imgList = this.data.imgurls;
				uni.previewImage({
					current: img,
					urls: imgList
				})
			},

			//删除图片
			deletePic: function(event) {
				var ind = event.currentTarget.dataset.ind;
				this.imgurls.splice(ind, 1);
				this.uploadImgUrls.splice(ind, 1);
				var leftNum = 3 - this.imgurls.length;

				this.upHide = false;
				this.picLeft = leftNum;
				this.imgurls = this.imgurls;
			},

			getContent: function(e) {
				var content = e.detail.value;
				this.content = content;
			},

			//表单提交
			formSubmit: function(e) {

				//星级
				if (this.starLevel == 0) {
					uni.showToast({
						title: '请选择评价的星级',
						icon: "none"
					})
					return;
				}
				var starlevle = this.starLevel;

				//内容
				var content = this.content;
				var param = {
					user_id: this.globalData.user_info.userid,
					egg_log_id: this.eggInfo.id,
					comment_type: 1,
					starlevle: this.starLevel,
					is_anonymous: 0
				}

				if (this.uploadImgUrls[0]) {
					param.headimgurl1 = this.uploadImgUrls[0]
				}
				if (this.uploadImgUrls[1]) {
					param.headimgurl2 = this.uploadImgUrls[1]
				}
				if (this.uploadImgUrls[2]) {
					param.headimgurl3 = this.uploadImgUrls[2]
				}
				if (content) {
					param.content = content
				}
				this.xm_config.xcx_publish_chicken_comment(param)
					.then(function(res) {
						uni.hideLoading();
						if (res.data.status == 1) {
							uni.navigateBack({})
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
					});
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
						url: this.xm_config.xcx_picture_upload,
						filePath: filePath[idx],
						formData: that.utils.vc_encryp_param_fun(),
						name: name,
						success: function(res) {
							uni.hideLoading();
							var data = JSON.parse(res.data);
							// that.data.imgurls.push(filePath[i]);
							that.uploadImgUrls.push(data.info);
							that.imgurls = that.imgurls
							i++;
						}
					})
				}
			}
		}
	}
</script>

<style>
	.page{
		background: #ffffff;
	}
	.order {
		display: flex;
		border-bottom: 1rpx solid #efefef;
		padding: 20rpx 30rpx;
		height: 120rpx;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.xiang {
		width: 150rpx;
		height: 120rpx;
	}

	.xiang image {
		width: 120rpx;
		height: 120rpx;
	}

	.done {
		text-align: center;
		line-height:
	}

	.wen {
		width: 560rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #666;
		font-weight: 300;
		align-items: flex-end;
	}

	.yellow {
		color: #ff8b00;
	}

	.fenJie {
		width: 80%;
		height: 30rpx;
		margin: 50rpx auto;
		border-top: 1px solid #eee;
	}

	.fenJie text {
		display: block;
		width: 40%;
		height: 40rpx;
		line-height: 40rpx;
		margin-top: -15rpx;
		background-color: #fff;
		color: #aaa;
		font-weight: 300;
		font-size: 28rpx;
		text-align: center;
		margin: -20rpx auto 0;
	}

	.stars {
		width: 50%;
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
	}

	.star {
		width: 60rpx;
		height: 60rpx;
	}

	.wenZi {
		width: 76%;
		background-color: #fbfbfb;
		margin: 30rpx auto;
		border: 1px solid #ccc;
		padding: 15rpx 2%;
		font-size: 26rpx;
	}

	.pics {
		width: 80%;
		margin: 10rpx auto;
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

	.yellowBtn {
		display: block;
		background-color: #ff8b00;
		border: 1px solid #ff8b00;
		font-size: 32rpx;
		color: #fff;
		border-radius: 60rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		text-align: center;
		margin: 60rpx 80rpx;
		padding: 0;
		box-shadow: none;
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

	.item-center-default {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
	}

	.center-left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.mujiimg {
		width: 85rpx;
		height: 85rpx;
		margin-right: 15rpx;
	}

	.comment-top-container {
		display: flex;
		flex-direction: row;
		padding: 20rpx 30rpx;
		color: #9d9d9d;
		font-size: 28rpx;
		background: #fff;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.top-left {
		display: flex;
		flex-direction: row;
	}

	.top-center {
		display: flex;
		flex-direction: column;
	}
</style>
