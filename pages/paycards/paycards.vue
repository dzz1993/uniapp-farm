<template>
	<view>

		<view class="pageTop">


			<view class="tiShi" v-if="isShowNoList">
				<image class="noCard" src="https://m.aoyifarm.com/Application/wx_img/notfound.png"></image>
				<view>无可用的礼品卡</view>
			</view>


			<block v-for="(item,index) in card_list" :key="index">
				<view class="cards" @click="chooseCard(index)">
					<view class="cardInfo">
						<image class="rad" v-if="item.active" src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cheeck_yes.png'></image>
						<image class="rad" v-else src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/check_no.png'></image>
						卡号：{{item.card_num}}
					</view>
					<view class="cardP">
						<image class="cardPic" :src="item.img"></image>
					</view>
				</view>
			</block>

		</view>
		<view class="bang" @click='bangKa'>绑定礼品卡</view>
		<view class="use" @click="goPay">{{btn_text}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keYong: false,
				cardactive: false,
				selectNum: 0,
				choosen: false,
				choosenId: [],
				card_type: "",
				isShowNoList: false,
				set_id: 0,
				btn_text: "不使用",
				card_list: ''
			}
		},

		onLoad(options) {
			//购买数量
			var shop_num = options.num;
			this.shopNum = shop_num;

			//选中卡片
			var choosen_id = options.choose;
			if (options.choose !== '' && options.choose != null && options.choose != "undefined") {
				var cid = options.choose.split(',');
				this.choosen = true;
				this.choosenId = cid;
				this.selectNum = cid.length;
			}
			//卡片类型
			var card_type = options.type;
			this.card_type = card_type;
			var set_id = options.set_id;
			if (set_id) {
				this.set_id = set_id
			}
		},

		onShow() {
			this.chicken_card_list(this.card_type);
		},

		methods: {

			bangKa: function() {
				uni.navigateTo({
					url: "../bind-gift-card/bind-gift-card?type=" + this.card_type + "&set_id=" + this.set_id,
				})
			},

			//数据接收函数
			chicken_card_list(cardtype) {
				var that = this;
				var param = {
					user_id: this.globalData.user_info.userid,
					type: cardtype,
				}

				if (this.set_id) {
					param.set_id = this.set_id
				}

				this.xm_config.chicken_card_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.cardlist != null && res.data.info.cardlist.length != 0) {
								//卡列表不为空
								for (var idx in res.data.info.cardlist) {
									//修改图片数据
									res.data.info.cardlist[idx].img = that.utils.imageUrlUtils(res.data.info.cardlist[idx].img);
									res.data.info.cardlist[idx].active = false;

									//获取选中的id并比较赋值
									var can = res.data.info.cardlist[idx];
									var zhong = res.data.info.cardlist[idx].id;

									if (that.choosen) {
										//如果有选中的卡,判断当前卡号是否在选中卡里面
										for (var j = 0, len = that.choosenId.length; j < len; j++) {
											if (that.choosenId[j] == zhong) {
												can.active = true;
											}
										}

									}
								}
								that.card_list = res.data.info.cardlist;
								that.isShowNoList = res.data.info.cardlist.length > 0 ? false : true;

								console.log(that.card_list)
								that.select_card_text();

							} else {
								//卡列表为空
								that.isShowNoList = true
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//选择卡数据
			chooseCard: function(index) {
				var idx = index;
				if (!this.card_list[idx].active) {
					//未选中
					if (this.selectNum < this.shopNum) {
						this.card_list[idx].active = !this.card_list[idx].active;
						this.selectNum += 1;

						this.card_list = this.card_list
						this.selectNum = this.selectNum
						this.select_card_text();

					} else {
						wx.showToast({
							title: '选卡数量大于购买商品数量',
							icon: 'none'
						})
						return;
					}
				} else {
					//取消选择
					this.card_list[idx].active = !this.card_list[idx].active;
					this.selectNum -= 1;
					this.card_list = this.card_list
					this.selectNum = this.selectNum
					this.select_card_text();
				}
			},

			select_card_text: function() {
				var packages = [];
				var choose = [];

				this.card_list.forEach(function(v, i) {
					if (v.active == true) {
						packages.push(v);
						var choosen = v.id;
						choose.push(choosen)
					}
				})

				if (packages.length != 0) {
					this.btn_text = "去使用"
				} else {
					this.btn_text = "不使用"
				}
			},

			//去支付
			goPay: function() {

				var packages = [];
				var choose = [];

				this.card_list.forEach(function(v, i) {
					if (v.active == true) {
						packages.push(v);
						var choosen = v.id;
						choose.push(choosen)
					}
				})

				//为上一个页面传递数据
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.setCardData(choose, packages);
				uni.navigateBack({})
			},
		}
	}
</script>

<style>
	.pageTop {
		padding-top: 10rpx;
	}

	.tiShi {
		padding-top: 200rpx;
		width: 250rpx;
		height: 200rpx;
		margin: 0rpx auto;
		text-align: center;
		color: #999;
		font-weight: 300;
		margin-bottom: 40rpx;
	}

	.noCard {
		width: 200rpx;
		height: 190rpx;
	}


	.cardInfo {
		padding: 5rpx 0;
		display: flex;
		align-items: center;
		color: #999;
		font-weight: 300;
	}

	.rad {
		width: 36rpx;
		height: 36rpx;
		margin-right: 16rpx;
	}

	/* .cards{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding:10rpx 20rpx 0;
  border-bottom:1px solid #eee;
  margin-bottom: 30rpx;
}
.cardP{
  padding:10rpx 0 0;
  height:180rpx;
  overflow: hidden;
  text-align: center;
}

.cardPic{
  width:610rpx;
  height:330rpx;
  border-radius: 26rpx; 
  box-shadow: 0rpx 4rpx 10rpx 3rpx #ccc; 
} */

	.cards {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid #f8f8f8;
	}

	.cardP {
		text-align: center;
		margin-top: 10rpx;
	}

	.cardPic {
		width: 660rpx;
		height: 380rpx;
		/* border-radius: 26rpx;  */
		/* box-shadow: 0rpx 4rpx 10rpx 3rpx #ccc;  */
	}

	.bang {
		margin: 60rpx auto 100rpx;
		border: 1px solid #f3b576;
		background-color: #f3b576;
		color: #fff;
		border-radius: 35rpx;
		height: 70rpx;
		line-height: 70rpx;
		width: 70%;
		text-align: center;
	}

	.use {
		position: fixed;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		left: 0;
		bottom: 0;
		text-align: center;
		background-color: #f18d33;
		color: #fff;
	}
</style>
