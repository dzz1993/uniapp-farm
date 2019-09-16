<template>
	<view class='page'>
		<view class="status-box">
			<view @click="statusTap" class="status-label" v-for="(item,index) in statusType" :key="index" :data-index="index"
			 v-bind:class="{ active: index == currentType }">
				{{item}}
			</view>
		</view>
		<!-- 列表 -->
		<view class='container-list'>
			<block v-for="(item,index) in orderList" :key="index">
				<view class='order-item-container' v-if="currentType==0" @click='onItemClick' :data-item='item'>
					<view class='order-item' v-if="item.tag!='market'">
						<!-- 订单类型标记 maidi 买地 maika 买卡 macai 买菜  maiji 买鸡 maijika 买鸡卡 maicaiyuan 买菜园  maicaiyuanka 买菜园卡 caiditiyan 菜地体验 caiyuantiyan菜园体验 caiyuanxufei菜园续费 caidixufei 菜地续费 caidimonthxufei 菜地月卡续费 caiyuanmonthxufei 菜园月卡续费 huiyuan会员-->
						<image class="left-img" :src="item.img"></image>
						<view class='right-container'>
							<view class='title-price-container'>
								<text class='text-pay-title'>{{item.type}}</text>
								<text class='text-pay-price'>¥ {{item.order_amount}}</text>
							</view>
							<view class='title-price-container'>
								<text class='text-pay-time'>{{item.add_time}}</text>
							</view>
						</view>
					</view>
					<view v-if="item.tag=='market'">
						<block v-for="(item1,index1) in item.goods_list" :key="index1">
							<view class='order-item' :key="item1">
								<image class="left-img" :src="item1.goods_image" mode='aspectFill'></image>
								<view class='right-container'>
									<view class='title-price-container'>
										<text class='text-pay-title'>{{item1.goods_name}}</text>
										<text class='text-pay-price'>¥ {{item1.price}}</text>
									</view>
									<view class='title-price-container' v-if="item.tag=='market'">
										<text class='text-pay-time'>数量</text>
										<text class='text-pay-time'>x{{item1.quantity}}</text>
									</view>
								</view>
							</view>
						</block>
					</view>
					<view class='good-price-freight' v-if="item.tag=='market'">
						<text>共{{item.goods_count}}件商品 合计：</text>
						<text class='text-pay-price'>¥ {{item.order_amount}}</text>
						<text>(含运费¥{{item.yunfei}})</text>
					</view>
					<view class='item-footer' v-if="item.tag=='market'">
						<view class='send-statue' v-if="item.express_status==1">{{item.express_text}}</view>
						<view class='send-statue2' v-if="item.express_status!=1">{{item.express_text}}</view>
						<view class='item-footer-right' v-if="item.status=='2'||item.status=='3'||item.status=='5'">

							<view class='look-wl' @click='onWuLiuClick' :data-item='item' v-if='item.express_sn' style=''>查看物流</view>
							<view class='pingjia' @click='onPingjiaClick' :data-item='item' v-if='item.status == 3&&item.is_comment == 0'
							 style=''>评价</view>
							<view class='pingjia-yi' data-item='item' v-if='item.status == 3&&item.is_comment == 1' style=''>已评价</view>
						</view>
						<view class='item-footer-right' v-if="item.status=='1'">
							<view class='pingjia' :data-item='item' style=''>去支付</view>
						</view>
					</view>
					<view class='item-footer' v-if="item.tag!='market'">
						<view class='send-statue' v-if="item.express_status==1">{{item.express_text}}</view>
						<view class='send-statue2' v-if="item.express_status!=1">{{item.express_text}}</view>
						<view class='item-footer-right'>
							<view class='look-wl' @click='onXuanCaiClick' :data-item='item' v-if='item.status == 5 && item.tag == "dizhumaicai" && item.choose_enable == 1'
							 style=''>选菜</view>
							<view class='look-wl' @click='onXuanCaiClick' :data-item='item' v-if='item.status == 5 && item.tag == "dizhumaicai" && item.choose_enable == 0'
							 style=''>选菜</view>
							<view class='pingjia' :data-item='item' v-if='item.status == 1' style=''>去支付</view>
							<view class='pingjia' :data-item='item' v-if='item.status == 12' style=''>待退款</view>
							<view class='pingjia' :data-item='item' v-if='item.status == 13' style=''>已退款</view>
							<view class='pingjia' :data-item='item' v-if='item.status==5 || item.status==3 || item.status==2' style=''>已完成</view>
						</view>
					</view>
				</view>

				<view class='order-item-container' v-if="currentType==1" @click='onItemClick' :data-item='item'>
					<view class='order-item' v-if="item.tag!='market'">
						<image class="left-img" :src="item.img" mode='aspectFill'></image>
						<view class='right-container'>
							<view class='title-price-container'>
								<text class='text-pay-title'>{{item.type}}</text>
								<text class='text-pay-price'>¥ {{item.order_amount}}</text>
							</view>
							<view class='title-price-container' v-if="item.tag!='market'">
								<text class='text-pay-time'>{{item.add_time}}</text>
							</view>
							<view class='title-price-container' v-if="item.tag=='market'">
								<text class='text-pay-time'>数量</text>
								<text class='text-pay-time'>x1</text>
							</view>
						</view>
					</view>
					<view v-if="item.tag=='market'">
						<block v-for="(item1,index1) in item.goods_list" :key="index1">
							<view class='order-item' :key="item1">
								<image class="left-img" :src="item1.goods_image" mode='aspectFill'></image>
								<view class='right-container'>
									<view class='title-price-container'>
										<text class='text-pay-title'>{{item1.goods_name}}</text>
										<text class='text-pay-price'>¥ {{item1.price}}</text>
									</view>
									<view class='title-price-container' v-if="item.tag=='market'">
										<text class='text-pay-time'>数量</text>
										<text class='text-pay-time'>x{{item1.quantity}}</text>
									</view>
								</view>
							</view>
						</block>
					</view>
					<view class='good-price-freight' v-if="item.tag=='market'">
						<text>共{{item.goods_count}}件商品 合计：</text>
						<text class='text-pay-price'>¥ {{item.order_amount}}</text>
						<text>(含运费¥{{item.yunfei}})</text>
					</view>
					<view class='item-footer'>
						<view class='send-statue'>等待付款</view>
						<view class='item-footer-right'>
							<view class='pingjia' :data-item='item' style=''>去支付</view>
						</view>
					</view>
				</view>

				<view class='order-item-container' v-if="currentType==2" @click='onItemClick' :data-item='item'>
					<view v-if="item.tag=='market'">
						<block v-for="(item1,index1) in item.goods_list" :key="index1">
							<view class='order-item' :key="item1">
								<image class="left-img" :src="item1.goods_image" mode='aspectFill'></image>
								<view class='right-container'>
									<view class='title-price-container'>
										<text class='text-pay-title'>{{item1.goods_name}}</text>
										<text class='text-pay-price'>¥ {{item1.price}}</text>
									</view>
									<view class='title-price-container' v-if="item.tag=='market'">
										<text class='text-pay-time'>数量</text>
										<text class='text-pay-time'>x{{item1.quantity}}</text>
									</view>
								</view>
							</view>
						</block>
					</view>
					<view class='good-price-freight'>
						<text>共{{item.goods_count}}件商品 合计：</text>
						<text class='text-pay-price'>¥ {{item.order_amount}}</text>
						<text>(含运费¥{{item.yunfei}})</text>
					</view>
					<view class='item-footer' v-if="item.tag=='market' &&item.status!=1&&item.status!=12&&item.status!=13">
						<view class='send-statue' v-if="item.express_status==1">{{item.express_text}}</view>
						<view class='send-statue2' v-if="item.express_status!=1">{{item.express_text}}</view>
						<view class='item-footer-right'>
							<view class='look-wl' @click='onWuLiuClick' :data-item='item' v-if='item.express_sn' style=''>查看物流</view>
						</view>
					</view>
				</view>

				<view class='order-item-container' v-if="currentType==3" @click='onItemClick' :data-item='item'>
					<view v-if="item.tag=='market' &&item.status!=1&&item.status!=12&&item.status!=13">
						<block v-for="(item1,index1) in item.goods_list" :key="index1">
							<view class='order-item' :data-item='item1'>
								<image class="left-img" :src="item1.goods_image" mode='aspectFill'></image>
								<view class='right-container'>
									<view class='title-price-container'>
										<text class='text-pay-title'>{{item1.goods_name}}</text>
										<text class='text-pay-price'>¥ {{item1.price}}</text>
									</view>
									<view class='title-price-container'>
										<text class='text-pay-time'>数量</text>
										<text class='text-pay-time'>x{{item1.quantity}}</text>
									</view>
								</view>
							</view>
						</block>
					</view>
					<view class='good-price-freight' v-if="item.tag=='market'">
						<text>共{{item.goods_count}}件商品 合计：</text>
						<text class='text-pay-price'>¥ {{item.order_amount}}</text>
						<text>(含运费¥{{item.yunfei}})</text>
					</view>
					<view class='item-footer' v-if="item.tag=='market' &&item.status!=1&&item.status!=12&&item.status!=13">
						<view class='send-statue' v-if="item.express_status==1">{{item.express_text}}</view>
						<view class='send-statue2' v-if="item.express_status!=1">{{item.express_text}}</view>
						<view class='item-footer-right'>

							<view class='look-wl' @click='onWuLiuClick' :data-item='item' v-if='item.express_sn' style=''>查看物流</view>
							<view class='pingjia' @click='onPingjiaClick' :data-item='item' v-if='item.status == 3&&item.is_comment == 0'
							 style=''>评价</view>
							<view class='pingjia-yi' :data-item='item' v-if='item.status == 3&&item.is_comment == 1' style=''>已评价</view>
						</view>
					</view>
				</view>
			</block>
			<view class='no-order' v-bind:class="{ hide: !isShowNoList }">
				<image src="https://m.aoyifarm.com/Application/wx_img/center/no_pinglun.png " class="no-order-img "></image>
				<view class="text ">暂无记录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusType: ["全部", "待支付", "待收货", "待评价"],
				currentType: 0,
				orderList: [],
				page: 1,
				isShowNoList: 0
			}
		},
		onLoad(option) {
			this.currentType = option.currentType;
			this.getOrderListInfo();
		},
		methods: {
			statusTap: function(e) {
				var currT = e.currentTarget.dataset.index;
				this.currentType = currT;
				this.getOrderListInfo();
			},
			getOrderListInfo: function() {
				var currentType = this.currentType;
				var currentStatus = '0';
				if (currentType == 0) {
					currentStatus = '0';
				} else if (currentType == 1) {
					currentStatus = '1';
				} else if (currentType == 2) {
					currentStatus = '2';
				} else if (currentType == 3) {
					currentStatus = '4';
				}
				var param = {
					user_id: this.globalData.user_info.userid,
					status: parseInt(currentStatus),
					p: this.page,
					pagenum: 20
				};
				var that = this;
				this.xm_config.get_order_history(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null && res.data.info.list != null) {
								for (var i = 0; i < res.data.info.list.length; i++) {
									res.data.info.list[i].img = that.utils.imageUrlUtils(res.data.info.list[i].img);
									if (res.data.info.list[i].goods_list) {
										for (var j = 0; j < res.data.info.list[i].goods_list.length; j++) {
											res.data.info.list[i].goods_list[j].goods_image = that.utils.imageUrlUtils(res.data.info.list[i].goods_list[
												j].goods_image);
										}
									}
								}
								if (that.page == 1) {
									that.orderList = [];
									that.isShowNoList = res.data.info.list.length > 0 ? false : true;
								}
								that.orderList = that.orderList.concat(res.data.info.list);
							} else {
								if (that.data.page == 1) {
									that.isShowNoList = true;
									that.orderList = [];
								}
							}
						} else {
							uni.showToast({
								title: res.data.msg,
							})
							that.isShowNoList = true;
							that.orderList = [];
						}
					});
			},
		}
	}
</script>

<style>
	.status-box {
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
	}

	.status-box .status-label {
		width: 150upx;
		height: 100%;
		line-height: 88upx;
		text-align: center;
		font-size: 32upx;
		color: #333;
		box-sizing: border-box;
		position: relative;

	}

	.status-box .status-label.active {
		color: #49D8A4;
		border-bottom: 6upx solid #49D8A4;
	}

	.status-box .status-label .red-dot {
		width: 16upx;
		height: 16upx;
		position: absolute;
		left: 116upx;
		top: 23upx;
		background-color: #f43530;
		border-radius: 50%;
	}

	.container-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 110upx;
		background: #F3F6FB;
	}

	.left-img {
		width: 150upx;
		height: 150upx;
		margin-right: 15upx;
	}

	.order-item-container {
		display: flex;
		flex-direction: column;
		padding: 25upx 20upx 0upx 20upx;
		background: #fff;
		margin: 10upx 20upx 20upx 20upx;
		box-shadow: 0px 5px 20px -5px #ddd;
		border-radius: 15upx;
	}

	.order-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: 25upx;
		flex: 1;
	}

	.right-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.title-price-container {
		display: flex;
		flex-direction: row;
		padding: 0upx 10upx 10upx 10upx;
		justify-content: space-between;
		flex: 1;
	}

	.title-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.jine-container {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.hr {
		background: #f8f8f8;
		width: 100%;
		height: 1upx;
	}

	.text-pay-statue {
		color: #333;
		font-size: 30upx;
	}

	.text-pay-statue-wait {
		color: #FF7E00;
		font-size: 30upx;
	}

	.text-pay-price {
		font-size: 30upx;
		color: #f04423;
	}

	.text-pay-time {
		color: #888888;
		font-size: 28upx;
	}

	.text-pay-title {
		font-size: 32upx;
		color: #414244;
	}

	.no-order {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		text-align: center;
		margin-top: 300upx;
	}

	.no-order-img {
		width: 95px;
		height: 95px;
		margin-bottom: 31upx;
	}

	.no-order .text {
		font-size: 28upx;
		text-align: center
	}


	.hide {
		display: none;
	}


	.item-footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 28upx;
		border-top: 1upx solid #f8f8f8;
		align-items: center;
		padding: 15upx 0upx;
	}

	.item-footer2 {
		font-size: 28upx;
		border-top: 1upx solid #f8f8f8;
		padding: 15upx 0upx;
	}

	.good-price-freight {
		display: flex;
		flex-direction: row;
		font-size: 28upx;
		border-top: 1upx solid #f8f8f8;
		padding-top: 20upx;
		padding-bottom: 20upx;
		justify-content: flex-end;
	}

	.send-statue {
		color: #f04423;
		margin-left: 20upx;
	}

	.send-statue2 {
		color: #53daa7;
		margin-left: 20upx;
	}

	.send-statue3 {
		color: #414244;
		margin-left: 20upx;
	}

	.look-wl {
		color: #fff;
		font-size: 20upx;
		border-radius: 30upx;
		text-align: center;
		display: flex;
		align-items: center;
		height: 48upx;
		width: 130upx;
		justify-content: center;
	}

	.pingjia {
		color: #fff;
		font-size: 20upx;
		border-radius: 30upx;
		text-align: center;
		display: flex;
		align-items: center;
		height: 48upx;
		width: 130upx;
		justify-content: center;
		margin-left: 20upx;
		background-color: #d1d1d1;
	}

	.pingjia-yi {
		color: #fff;
		font-size: 20upx;
		border-radius: 30upx;
		text-align: center;
		display: flex;
		align-items: center;
		height: 48upx;
		width: 130upx;
		justify-content: center;
		margin-left: 20upx;
	}

	.item-footer-right {
		display: flex;
		flex-direction: row;
	}

	/***********标题栏********************/
	.top-visibility {
		visibility: hidden;
	}

	.navigator {
		height: 88upx;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		display: flex;
		flex-direction: row;
	}

	.leftButton {
		width: 100upx;
		height: 88upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.leftButton>image {
		width: 50upx;
		height: 50upx;
	}

	.title {
		height: 88upx;
		margin-right: 100upx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title>text {
		font-size: 16px;
		color: #FFF;
		font-weight: 500;
	}

	.gif-container {
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99;
		color: #999;
		font-size: 20upx;
		flex-direction: row;
	}

	.gyj-text {
		color: #999;
		font-size: 22upx;
		margin-bottom: 4upx;
		margin-top: 33upx;
	}

	.ctfw-right {
		display: flex;
		margin-left: 30upx;
		flex-direction: column;
	}

	.remind-img {
		width: 95upx;
		height: 95upx;
		margin-top: 25upx;
	}
</style>
