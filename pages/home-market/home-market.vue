<template>
	<view class="page">
		<view class='top-title-container'>
			<view class='top-title'>
				<image :src='xm_page_img.drsd' class='jrcz-img'></image>
				<view class='top-weizhi' @click='onRegionClick'>
					<image :src='xm_page_img.dwdz' class='dingwei'></image>
					<text class='weizhi'>北京</text>
					<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/xjt.png' class='xjt'></image>
				</view>
			</view>
		</view>

		<swiper class="banner" indicator-dots="true" autoplay="true" interval="2000" duration="500" indicator-active-color="#80b477">

			<block v-for="(item,index) in carousel_list" :key="index">
				<swiper-item>
					<view @click="onSwiperClick(item)">
						<image :src="item.image" class="slide-image" />
					</view>
				</swiper-item>
			</block>
		</swiper>

		<view class="harvest-container" v-for="(item,index) in harvest_list" :key="index">
			<view class="harvest-item-container" style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/xcyello.png');background-size: 100% 100%;"
			 v-if="index%2==1" @click='onHarvestClick(item.id)'>
				<image class="harvest-icon" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jticon.png" v-if="item.set_id==1"></image>
				<image class="harvest-icon" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/bbfsicon.png" v-if="item.set_id==2"></image>
				<image class="harvest-icon" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/qjficon.png" v-if="item.set_id==3"></image>
				<text class="harvest-name">{{item.combin_fieldname}}</text>
				<text class="harvest-data">{{item.harvest_date}}收菜</text>
				<image class="harvest-tip-icon" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/qwxcicon.png">前往收菜 ></image>
			</view>
			<view class="harvest-item-container" style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/xcgreen.png');background-size: 100% 100%;"
			 v-if="index%2==0" @click='onHarvestClick(item.id)'>
				<image class="harvest-icon" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jticon.png" v-if="item.set_id==1"></image>
				<image class="harvest-icon" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/bbfsicon.png" v-if="item.set_id==2"></image>
				<image class="harvest-icon" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/qjficon.png" v-if="item.set_id==3"></image>
				<text class="harvest-name">{{item.combin_fieldname}}</text>
				<text class="harvest-data">{{item.harvest_date}}收菜</text>
				<image class="harvest-tip-icon" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/qwxcicon.png">前往收菜 ></image>
			</view>
		</view>

		<view class="status-box">
			<block v-for="(item,index) in categories" :key="index">
				<view class="tab-item" v-if="activeCategoryId == item.id" @click="tabClick(item)">
					<view class="status-label-s">
						{{item.name}}
					</view>
					<view class="active"></view>
				</view>

				<view class="tab-item" @click="tabClick(item)" v-else>
					<view class="status-label">
						{{item.name}}
					</view>
				</view>
			</block>
		</view>

		<view class="goods-container" v-if="activeCategoryId != 3">
			<view class="goods-box" v-for="(item,index) in goods_list" :key="index">
				<view @click="onGoodsItemClick(item)">
					<view class="img-box">
						<image :src="item.default_image" class="image" mode="aspectFill" lazy-load="true" />
					</view>
					<view class="goods-title">{{item.goods_name}}</view>
				</view>
				<view class='gwc-container' @click="onAddShopCarClick(item)">
					<view class="price-container">
						<view class="normal-price">
							<view class='gg-container'>
								<text class='good-dw'>规格: {{item.unit_name}}</text>
								<text class='gmrs'>{{item.sold_number}}人购买</text>
							</view>
							<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/add_car.png' class='gwc-img' v-if="item.is_gift_card != 1"></image>
						</view>
						<!-- 促销价 -->
						<view class="cx-price-container" v-if="item.is_now_promote == 1&&item.is_gift_card == 0">
							<text class='cx-y-good-price'>¥ {{item.price}} </text>
							<text class='cx-good-price'>¥ {{item.promote_price}}</text>
							<image class="member-img" src="http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cx_price.png"></image>
						</view>
						<!-- 会员价 -->
						<view class="member-price-container" v-if="item.is_now_promote == 0&&item.is_gift_card == 0">
							<text class='member-y-good-price'>¥ {{item.price}} </text>
							<block v-if="item.is_show_member_price==1">
								<text class='member-good-price'>¥ {{item.member_price}} </text>
								<image class="member-img" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/member-img.png"></image>
							</block>
						</view>

						<view class="member-price-container" v-if="item.is_gift_card == 1">
							<text class='member-y-good-price'>¥ {{item.price}} </text>
						</view>

					</view>
					<image src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/rexiao.png" class="statusimage1" v-if="item.is_hot==1 && item.is_new==0"></image>
					<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/xinpin.png' class="statusimage1" v-if="item.is_new==1 && item.is_hot==0"></image>
					<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/rexiao.png' class="statusimage1" v-if="item.is_hot==1 && item.is_new==1"></image>
					<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/xinpin.png' class="statusimage2" v-if="item.is_hot==1 && item.is_new==1"></image>
				</view>
			</view>
		</view>

		<!-- 农场列表 -->
		<view class="nc_container" v-else>
			<block v-for="(item,index) in farm_list" :key="index">
				<view class='farm-list-container'>
					<view class='farm-title-top'>
						<text class='farm-title'>{{item.store_name}}</text>
						<view style="background:url(http://res.aoyifarm.com/20180719/5b504fa8d1b97.png);background-size: 100% 100%;"
						 class="qw-img" @click="onNavMapClick(item)">
							前往
						</view>
					</view>
					<view class='farm-list-item'>
						<view class='farm-list-item-info farm-dr'>
							<text class='info-left'>占地面积</text>
							<text class='info-right'>{{item.area}}</text>
						</view>
						<view class='farm-list-item-info farm-dr'>
							<text class='info-left'>农场地址</text>
							<text class='info-right'>{{item.address}}</text>
						</view>
						<view class='farm-list-item-info' @click="onPhoneClick(item)">
							<text class='info-left'>联系农场</text>
							<text class='info-right'>{{item.tel}}</text>
							<image class='phone-img' src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/phone_img.png'></image>
						</view>
					</view>
				</view>
			</block>

			<view class='pl-container'>
				<view class='pl-top-title'>
					<text class='pl-title'>地主评价</text>
					<view>
						<block v-for="(item,index) in paixuTypeList" :key="index">
							<text class='pl-tab-select' v-if="active == item.num" @click="onPaiXuTypeClick(item)">{{item.name}}</text>
							<text class='pl-tab' @click="onPaiXuTypeClick(item)" v-else>{{item.name}}</text>
						</block>
					</view>
				</view>

				<view class='pl-hr'>
				</view>

				<block v-for="(item,index) in commentlist" :key="index">
					<view class='container-item'>
						<view class='container-top'>
							<image class="head-img" v-if="item.user_img!=null" :src='item.user_img'></image>
							<image class="head-img" v-else src='https://m.aoyifarm.com/Application/wx_img/center/grzx_default_user_icon.png'></image>
							<view class='container-name-time'>
								<text class='name-text'>{{item.nickname}}</text>
								<text class='time-text'>{{item.add_time}}</text>
							</view>
						</view>
						<text v-if="item.content" class='content-text'>{{item.content}}</text>
						<view v-if="item.headimgurl1||item.headimgurl2||item.headimgurl3" class='three-container'>
							<image class="img" v-if="item.headimgurl1!=null" :src="item.headimgurl1" mode="aspectFill" @click="onImgClick(item.headimgurl1,item)"></image>
							<image class="img" v-if="item.headimgurl2!=null" :src="item.headimgurl2" mode="aspectFill" @click="onImgClick(item.headimgurl2,item)"></image>
							<image class="img" v-if="item.headimgurl3!=null" :src="item.headimgurl3" mode="aspectFill" @click="onImgClick(item.headimgurl3,item)"></image>
						</view>

						<text v-if="item.reply_info" class='content-text-repaly'>农场回复：{{item.reply_info}}</text>
						<view class='hr'></view>
					</view>
				</block>
			</view>
		</view>


		<!--屏幕背景变暗的背景 -->
		<view class="commodity_screen" @click="hideModal" v-if="showModalStatus"></view>
		<!--弹出框 -->
		<view :animation="animationData" class="commodity_attr_box" v-if="showModalStatus">
			<view class='dialog-container'>
				<view class='close-container'>
					<image src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/gb.png' class='close-img-sp' @click="hideModal"></image>
				</view>
				<view class='dia-good-add-container'>
					<image :src='currentGoodInfo.default_image' class='dia-good-img'></image>
					<view class='good-price-name-container'>
						<text class='sp-goods-title'>{{currentGoodInfo.goods_name}}</text>

						<!-- 促销价 -->
						<view class='cx-sp-container' v-if="currentGoodInfo.is_now_promote == 1">
							<text class='cx-sp-y-good-price'>¥ {{currentGoodInfo.price}}</text>
							<view class='cx-sp-price-container'>
								<text class='cx-sp-price'>¥ {{currentGoodInfo.promote_price}} </text>
								<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/cx_price.png' class='hyj-img'></image>
							</view>
						</view>
						<!-- 会员价 -->
						<view class='hyj-sp-container' v-else>
							<text class='sp-good-price'>¥ {{currentGoodInfo.price}}</text>
							<view class='hyj-price-container'>
								<text class='yhj-price'>¥ {{currentGoodInfo.member_price}} </text>
								<image src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/member-img.png' class='hyj-img'></image>
							</view>
						</view>

						<view class='kc-container'>
							库存
							<text class='good-kc'>{{currentGoodInfo.goods_number}}</text> 份
						</view>
					</view>
				</view>

				<view class='sp-num-container'>
					<text>购买数量</text>
					<view class='goods-add-container'>
						<image class='jian-img' @click='onJianClick()' src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jian.png'></image>
						<text class='good-num'>{{shopNum}}</text>
						<image class='jia-img' @click='onJiaClick()' src='http://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/jia.png'></image>
					</view>
				</view>

				<view @click='addShopCarList' class='sp-sure'>确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xm_page_img: this.xm_page_img,
				carousel_list: [],
				goods_list: [],
				activeCategoryId: 0,
				page: 1,
				categories: [{
						name: '集市',
						id: 0
					},

					{
						name: '礼品卡',
						id: 1
					},

					{
						name: '促销',
						id: 2
					},

					{
						name: '农场动态',
						id: 3
					},
				],

				farm_list: [],
				paixuTypeList: [],
				active: null,
				commentlist: [],
				animation: '',
				animationData: '',
				showModalStatus: false,
				shopNum: 1,
				currentGoodInfo: '',
				harvest_list: [], //待收菜list

			}
		},
		onLoad() {
			var that = this;
			const value = uni.getStorageSync('user_info');
			if (value) {
				that.globalData.user_info = value;
			}

			this.activity_carousel_list();

			this.goods_list_easy();

			this.nongchang_trends();

			this.user_assess();

			this.get_new_user_red_list();
		},


		methods: {
			//获取轮播图列表
			activity_carousel_list() {
				var that = this;
				if (that.globalData.user_info.userid) {
					var param = {
						user_id: that.globalData.user_info.userid
					}
				}

				this.xm_config.activity_carousel_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							for (var idx in res.data.info.carousel_list) {
								//修改图片数据
								res.data.info.carousel_list[idx].image = that.utils.imageUrlUtils(res.data.info.carousel_list[idx].image);
							}
							that.carousel_list = res.data.info.carousel_list;

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//获取首页商品列表
			goods_list_easy() {
				var that = this;

				var param = {
					p: this.page,
					pagenum: 20,
				}
				if (that.globalData.user_info.userid) {
					param.user_id = that.globalData.user_info.userid
				}
				//礼品卡
				if (this.activeCategoryId == 1) {
					param.is_gift_card = 1
				}
				//促销
				if (this.activeCategoryId == 2) {
					param.goods_att = 4
				}

				this.xm_config.goods_list_easy(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								for (var idx in res.data.info) {
									//修改图片数据
									res.data.info[idx].default_image = that.utils.imageUrlUtils(res.data.info[idx].default_image);
								}
								if (that.page == 1) {
									that.goods_list = [];
								}
								that.goods_list = that.goods_list.concat(res.data.info)
							} else {
								if (that.page == 1) {
									that.goods_list = [];
								}
							}
						} else {
							if (that.page == 1) {
								that.goods_list = [];
							}
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}

					});
			},

			//农场列表
			nongchang_trends() {
				var that = this;
				this.xm_config.nongchang_trends()
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.list != null && res.data.info.list.length != 0) {
								that.farm_list = res.data.info.list
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}

					});
			},

			//获取类型
			user_assess() {
				var that = this;
				this.xm_config.user_assess()
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.filter_all_list != null && res.data.info.filter_all_list.length != 0) {
								that.paixuTypeList = res.data.info.filter_all_list;
								that.active = that.active != null ? that.active : res.data.info.filter_all_list[0].num;
								that.page = 1;
								that.get_commentlist_new_xg(that.page);
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			//获取评论列表
			get_commentlist_new_xg(page) {
				var that = this;
				var param = {
					filter_type: this.active,
					p: page,
					pagenum: 20
				}
				this.xm_config.get_commentlist_new_xg(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.list_comment != null && res.data.info.list_comment.length != 0) {
								for (var idx in res.data.info.list_comment) {
									//修改图片数据
									if (res.data.info.list_comment[idx].headimgurl1 != null && res.data.info.list_comment[idx].headimgurl1 != "") {
										res.data.info.list_comment[idx].headimgurl1 = that.utils.imageUrlUtils(res.data.info.list_comment[idx].headimgurl1);
									} else {
										res.data.info.list_comment[idx].headimgurl1 = null;
									}
									if (res.data.info.list_comment[idx].headimgurl2 != null && res.data.info.list_comment[idx].headimgurl2 != "") {
										res.data.info.list_comment[idx].headimgurl2 = that.utils.imageUrlUtils(res.data.info.list_comment[idx].headimgurl2);
									} else {
										res.data.info.list_comment[idx].headimgurl2 = null;
									}
									if (res.data.info.list_comment[idx].headimgurl3 != null && res.data.info.list_comment[idx].headimgurl3 != "") {
										res.data.info.list_comment[idx].headimgurl3 = that.utils.imageUrlUtils(res.data.info.list_comment[idx].headimgurl3);
									} else {
										res.data.info.list_comment[idx].headimgurl3 = null;
									}

									if (res.data.info.list_comment[idx].user_img != null && res.data.info.list_comment[idx].user_img != "") {
										res.data.info.list_comment[idx].user_img = that.utils.imageUrlUtils(res.data.info.list_comment[idx].user_img);
									} else {
										res.data.info.list_comment[idx].user_img = null;
									}
								}

								if (that.page == 1) {
									that.commentlist = [];
								}

								that.commentlist = that.commentlist.concat(res.data.info.list_comment)
							}

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},
			
			onSwiperClick:function(item){
				if(item.to_action == 0){
					uni.navigateTo({
						url: '../web_page/web_page?web_url=' + this.utils.imageUrlUtils(item.content_url),
					});
				}
				
				//选地
				if(item.to_action == 4){
					if (!this.globalData.user_info.userid) {
						uni.navigateTo({
							url: '../app_login/app_login',
						});
						return;
					}
					uni.navigateTo({
						url: '../select-pay-vegetable-field/select-pay-vegetable-field'
					});
				}
				//选鸡
				if(item.to_action == 6){
					if (!this.globalData.user_info.userid) {
						uni.navigateTo({
							url: '../app_login/app_login',
						});
						return;
					}
					uni.navigateTo({
						url: '../xuanji/xuanji',
					})
				}
				//邀请好友
				if(item.to_action == 16){
					if (!this.globalData.user_info.userid) {
						uni.navigateTo({
							url: '../app_login/app_login',
						});
						return;
					}
					uni.navigateTo({
						url: '../invite/inviteFriends/inviteFriends',
					})
				}
			},
			
			onGoodsItemClick(item) {
				if (this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../market-good-new-details/market-good-new-details?goods_id=' + item.goods_id
					});
				} else {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
				}



			},

			tabClick(item) {
				this.page = 1;
				this.activeCategoryId = item.id;
				this.goods_list_easy();
			},

			onPaiXuTypeClick: function(item) {
				var item = item;
				this.active = item.num
				this.page = 1;
				this.get_commentlist_new_xg(this.page);
			},

			onImgClick: function(img, item) {
				var item = item;
				var img = img;
				var imgList = [];
				if (item.headimgurl1 != null) {
					imgList.push(item.headimgurl1);
				}
				if (item.headimgurl2 != null) {
					imgList.push(item.headimgurl2);
				}
				if (item.headimgurl3 != null) {
					imgList.push(item.headimgurl3);
				}

				//图片预览
				uni.previewImage({
					current: img, // 当前显示图片的http链接
					urls: imgList // 需要预览的图片http链接列表
				})
			},

			//地图导航
			onNavMapClick: function(item) {
				var item = item;

				uni.openLocation({
					latitude: parseFloat(item.latitude),
					longitude: parseFloat(item.longitude),
					scale: 28,
					name: item.store_name,
					address: item.address,
				})
			},

			onPhoneClick: function(item) {
				var item = item;
				wx.makePhoneCall({
					phoneNumber: item.tel,
				})
			},
			onPullDownRefresh() {
				this.page = 1;
				this.goods_list_easy();
				this.get_new_user_red_list();
			},

			onReachBottom() {
				if (this.activeCategoryId != 3) {
					this.page++;
					this.goods_list_easy();
				} else {
					this.page++;
					this.get_commentlist_new_xg(this.page);
				}

			},

			onAddShopCarClick: function(item) {

				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}

				var goodinfo = item;
				if (goodinfo.is_gift_card == 1) {
					return;
				}
				this.shopNum = 1,
					this.currentGoodInfo = goodinfo
				this.showModal();
			},

			//显示对话框
			showModal: function() {
				uni.hideTabBar({
					animation: true
				})
				// 显示遮罩层
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: "linear",
					delay: 0
				})
				this.animation = animation
				animation.translateY(800).step()
				this.animationData = animation.export();
				this.showModalStatus = true;
				setTimeout(function() {
					animation.translateY(0).step()
					this.animationData = animation.export()
				}.bind(this), 200)
			},

			//隐藏对话框
			hideModal: function() {
				uni.showTabBar({
					animation: true
				})
				var that = this;
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: "linear",
					delay: 0
				})
				this.animation = animation
				animation.translateY(800).step()

				this.animationData = animation.export();

				setTimeout(function() {
					animation.translateY(0).step()
					that.animationData = animation.export(),
						that.showModalStatus = false
				}.bind(this), 200)
			},

			//加入购物车
			addShopCarList: function() {
				var that = this;
				var goodInfo = this.currentGoodInfo;
				var param = {
					user_id: this.globalData.user_info.userid,
					goods_id: goodInfo.goods_id,
					num: this.shopNum
				}
				this.xm_config.add_cart(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '加入菜篮成功',
							})
							that.hideModal();

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onJianClick: function() {
				if (this.shopNum == 1) {
					uni.showToast({
						title: '该商品不能减少了哦',
					})
					return;
				}
				this.shopNum = --this.shopNum
			},

			onJiaClick: function() {
				var shopNum = this.shopNum;
				shopNum++;
				if (shopNum > this.currentGoodInfo.goods_number) {
					uni.showToast({
						icon: "none",
						title: '当前商品库存不足'
					})
					return;
				}
				this.shopNum++;
			},

			get_new_user_red_list: function() {
				var that = this;
				if (!that.globalData.user_info.userid) {
					return;
				}

				var param = {
					user_id: that.globalData.user_info.userid
				}
				this.xm_config.new_user_red_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.red_list = res.data.info.red_list;
								that.harvest_list = res.data.info.harvest_list;
								console.log(that.red_list);
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
			 * 选菜按钮
			 */
			onHarvestClick: function(id) {
				var id = id;
				uni.navigateTo({
					url: '../select-harvest-vegetable/select-harvest-vegetable?harvest_id=' + id,
				})
			},
			
			onRegionClick: function() {
				uni.navigateTo({
					url: '../select-region/select-region/select-region'
				})
			},
		}
	}
</script>

<style lang="scss">
	/*使屏幕变暗 */

	.commodity_screen {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		opacity: 0.2;
		overflow: hidden;
		z-index: 1000;
		color: #fff;
	}

	.commodity_attr_box {
		height: 1000rpx;
		width: 100%;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 2000;
		background: #fff;
	}

	.dialog-container {
		display: flex;
		flex-direction: column;
	}

	.close-container {
		display: flex;
		justify-content: flex-end;
		padding: 20rpx 20rpx 0 20rpx;
	}

	.close-img-sp {
		width: 40rpx;
		height: 40rpx;
	}

	.dia-good-add-container {
		display: flex;
		flex-direction: row;
		padding: 30rpx;
	}

	.dia-good-img {
		width: 200rpx;
		height: 260rpx;
		border-radius: 15rpx;
	}

	.good-price-name-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 20rpx;
	}

	.sp-goods-title {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 32rpx;
		color: #000;
	}

	.cx-sp-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}


	.cx-sp-y-good-price {
		color: #afafaf;
		font-size: 35rpx;
		font-weight: bold;
		text-decoration: line-through;
	}

	.cx-sp-price-container {
		display: flex;
		flex-direction: row;
		margin-left: 50rpx;
		align-items: center;
	}

	.cx-sp-price {
		font-size: 40rpx;
		color: #f7391b;
		font-weight: bold;
	}

	.hyj-sp-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.sp-good-price {
		color: #000000;
		font-size: 35rpx;
		font-weight: bold;
	}

	.hyj-price-container {
		display: flex;
		flex-direction: row;
		margin-left: 50rpx;
		align-items: center;
	}

	.yhj-price {
		font-size: 40rpx;
		color: #71e09e;
		font-weight: bold;
	}

	.hyj-img {
		width: 76rpx;
		height: 25rpx;
	}

	.kc-container {
		color: #999;
		font-size: 30rpx;
	}


	.good-kc {
		color: #51d8a9;
	}

	.sp-num-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30rpx;
	}


	.goods-add-container {
		display: flex;
		flex-direction: row;
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

	.good-num {
		color: #333;
		font-size: 30rpx;
	}


	.sp-sure {
		background: #51d8a9;
		color: #fff;
		border-radius: 80rpx;
		align-items: center;
		justify-content: center;
		padding: 15rpx 0;
		display: flex;
		margin: 400rpx 30rpx 0rpx 30rpx;
	}

	.top-title-container {
		display: flex;
		flex-direction: row;
		height: 200rpx;
		padding-left: 40rpx;
		background: #85DFA3;


		.top-title {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 80rpx;

			.jrcz-img {
				width: 238rpx;
				height: 30rpx;
			}

			.top-weizhi {
				display: flex;
				flex-direction: row;
				color: #fff;
				height: 60rpx;
				align-items: center;
				margin-left: 50rpx;

				.dingwei {
					width: 20rpx;
					height: 26rpx;
				}

				.xjt {
					width: 20rpx;
					height: 12rpx;
				}

				.weizhi {
					margin-left: 10rpx;
					margin-right: 10rpx;
					font-size: 28rpx;
				}
			}
		}

	}

	.banner {
		width: 690rpx;
		height: 310rpx;
		padding: 0;
		overflow: hidden;
		box-shadow: 0rpx 10rpx 30rpx rgba(0, 0, 0, 0.18);
		margin: -110rpx 30rpx 20rpx 30rpx;
		border-radius: 12rpx;

		.slide-image {
			width: 100%;
			height: 310rpx;
			border-radius: 12rpx;
		}
	}

	.status-box {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.tab-item {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 88rpx;

			.status-label {
				width: 150rpx;
				text-align: center;
				font-size: 30rpx;
				color: #cfd6dd;
				box-sizing: border-box;
				position: relative;
				font-weight: bold;
			}

			.active {
				color: #38ad84;
				border-bottom: 5rpx solid #38ad84;
				font-weight: bold;
			}

			.status-label-s {
				width: 150rpx;
				text-align: center;
				font-size: 30rpx;
				color: #38ad84;
				box-sizing: border-box;
				position: relative;
				font-weight: bold;
			}
		}



	}

	.goods-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: content-box;
		padding: 10rpx 10rpx;
		background: #f3f6fb;

		.goods-box {
			width: 361.5rpx;
			background-color: #fff;
			overflow: hidden;
			margin-bottom: 18rpx;
			box-shadow: 0px 5px 15px -5px #ddd;
			border-radius: 5rpx;
			position: relative;

			.img-box {
				width: 361.5rpx;
				height: 483rpx;
				overflow: hidden;

				image {
					width: 361.5rpx;
					height: 483rpx;
					border-top-left-radius: 5rpx;
					border-top-right-radius: 5rpx;
				}
			}

			.goods-title {
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				font-size: 24rpx;
				color: #333;
				margin: 0 20rpx;
				padding-top: 20rpx;
				font-weight: bold;
			}

			.gwc-container {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding-bottom: 20rpx;
				margin: 0rpx 20rpx;

				.price-container {
					display: flex;
					flex-direction: column;
					flex: 1;

					.normal-price {
						display: flex;
						flex-direction: row;
						justify-content: space-between;


						.gg-container {
							display: flex;
							flex-direction: row;
							flex: 1;
							align-items: center;

							.good-dw {
								color: #afafaf;
								font-size: 20rpx;
							}

							.gmrs {
								margin-left: 10rpx;
								font-size: 20rpx;
								color: #afafaf;
							}
						}

						.gwc-img {
							width: 40rpx;
							height: 40rpx;
						}
					}

					.member-y-good-price {
						color: #000000;
						font-size: 29rpx;
					}

					.member-good-price {
						color: #71e09e;
						font-size: 30rpx;
						font-weight: bold;
						margin-left: 20rpx;
					}

					.member-img {
						width: 55rpx;
						height: 20rpx;
					}

					.cx-y-good-price {
						color: #afafaf;
						font-size: 29rpx;
						text-decoration: line-through;
					}

					.cx-good-price {
						color: #f7391b;
						font-size: 30rpx;
						font-weight: bold;
						margin-left: 20rpx;
					}


				}



			}
		}
	}

	.nc_container {
		background: #f3f6fb;
	}

	.farm-list-container {
		width: 690rpx;
		padding: 0;
		overflow: hidden;
		box-shadow: 0px 5px 20px -5px #ddd;
		background: #fff;
		margin: 20rpx 30rpx 20rpx 30rpx;
		border-radius: 15rpx;


		.farm-title-top {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			height: 95rpx;
			line-height: 95rpx;
			padding: 0 20rpx;
			align-items: center;
			border-bottom: 2rpx solid #f3f6fb;

			.farm-title {
				font-size: 32rpx;
				font-weight: bold;
			}

			.qw-img {
				width: 100rpx;
				height: 45rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 28rpx;
			}
		}

		.farm-list-item {
			display: flex;
			flex-direction: column;
			padding: 20rpx 0;

			.farm-list-item-info {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0 20rpx;

				.info-left {
					color: #333;
					font-size: 28rpx;
				}

				.info-right {
					color: #cfd6dd;
					font-size: 28rpx;
					margin-left: 30rpx;
				}

				.phone-img {
					width: 32rpx;
					height: 30rpx;
					margin-left: 30rpx;
				}
			}

			.farm-dr {
				margin-bottom: 10rpx;
			}
		}
	}

	/**********农场评论************/

	.pl-container {
		width: 690rpx;
		padding: 0;
		overflow: hidden;
		box-shadow: 0px 5px 20px -5px #ddd;
		background: #fff;
		margin: 20rpx 30rpx 20rpx 30rpx;
		border-radius: 15rpx;

		.pl-top-title {
			display: flex;
			flex-direction: row;
			padding: 20rpx;
			justify-content: space-between;

			.pl-title {
				color: #333;
				font-size: 32rpx;


			}

			.pl-tab-select {
				color: #fff;
				font-size: 26rpx;
				background: #cfd6dd;
				padding: 7rpx 20rpx;
				border-radius: 30rpx;
				margin-left: 20rpx;
				border: 1rpx solid #cfd6dd;
			}

			.pl-tab {
				color: #cfd6dd;
				font-size: 26rpx;
				background: #fff;
				padding: 7rpx 20rpx;
				border-radius: 30rpx;
				margin-left: 20rpx;
				border: 1rpx solid #cfd6dd;
			}
		}

		.pl-hr {
			width: 100%;
			background: #f3f6fb;
			height: 2rpx;
		}

		.container-item {
			display: flex;
			flex-direction: column;
			background: #fff;

			.container-top {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 20rpx;

				.head-img {
					width: 66rpx;
					height: 66rpx;
					border-radius: 66rpx;
					margin-right: 20rpx;

				}

				.container-name-time {
					display: flex;
					flex-direction: column;
					flex: 1;

					.name-text {
						color: #333;
						font-size: 30rpx;
					}

					.time-text {
						color: #cfd6dd;
						font-size: 26rpx;
						margin-top: 5rpx;
					}
				}
			}

			.content-text {
				font-size: 28rpx;
				padding: 0 20rpx;
				color: #333;
			}

			.three-container {
				display: flex;
				flex-direction: row;
				padding: 20rpx 20rpx 0 20rpx;
				flex-wrap: wrap;
				box-sizing: content-box;

				.img {
					width: 196rpx;
					height: 196rpx;
					margin-right: 10rpx;
					margin-left: 10rpx;
				}
			}

			.content-text-repaly {
				background: #f2f2f4;
				font-size: 28rpx;
				margin-top: 20rpx;
				padding: 15rpx;
				margin: 20rpx;
				color: #666;
			}

			.hr {
				width: 100%;
				background: #f3f6fb;
				height: 2rpx;
				margin-top: 20rpx;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}
		}
	}

	.harvest-container {
		display: flex;
		flex-direction: column;
		color: #FFF;

	}

	.harvest-item-container {
		display: flex;
		flex-direction: row;
		height: 60rpx;
		align-items: center;
		margin: 10rpx 30rpx 0rpx 30rpx;

	}

	.harvest-icon {
		height: 44rpx;
		width: 44rpx;
		margin: 7rpx 0rpx 9rpx 29rpx;
	}

	.harvest-name {
		margin-left: 20rpx;
		font-weight: bold;
		font-size: 30rpx;
		width: 200rpx;

	}

	.harvest-data {
		font-size: 24rpx;
		margin-left: 35rpx;
	}

	.harvest-tip-icon {
		width: 120rpx;
		height: 20rpx;
		margin-left: 36rpx;
	}

	.statusimage1 {
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		left: 20rpx;
		top: 0rpx;
		margin-right: 10rpx;
	}

	.statusimage2 {
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		left: 90rpx;
		top: 0rpx;
	}
</style>
