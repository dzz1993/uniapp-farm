 <template>
	<view>

		<block v-if="member_info.is_member == 1">
			<!--会员信息栏-->
			<view class="member-info-container">
				<view class="user-info">
					<view class="right-container">
						<image class="head-img" v-if="headImgUrl" :src='headImgUrl'></image>
						<image class="head-img" v-else src='https://m.aoyifarm.com/Application/wx_img/center/grzx_default_user_icon.png'></image>
						<view class="user-info-mid">
							<text class="use-name">{{nickname}}</text>
							<text class="member-type">{{member_info.paymember_name}}</text>
						</view>
					</view>
					<view class="time-text" @click='onXuFeiClick'>
						<text class="time-text-1">立即续费></text>
						<text class="time-text-2">{{member_info.end_time}}到期</text>
					</view>
				</view>

				<view class="ticket-info-container">
					<view class="left-ticket">
						<text class="ticket-1-txt">本月可领优惠券</text>
						<view class="ticket-price-container">
							<text class="ticket-price">{{member_info.ticket_amount}}</text>
							<text class="ticket-price-danwei">元</text>
						</view>
						<text class="ticket-2-txt">每月{{member_info.ticket_max_amount}}元额度</text>
					</view>
					<view class="left-ticket">
						<text class="ticket-1-txt">可用免邮券</text>
						<view class="ticket-price-container">
							<text class="ticket-price">{{member_info.freight_num}}</text>
							<text class="ticket-price-danwei">张</text>
						</view>
						<view class="ticket-2-container">
							<text class="ticket-2-txt">每月{{member_info.freight_max}}张</text>
							<text class="ticket-3-txt">(每月{{member_info.end_day}}日失效)</text>
						</view>
					</view>
				</view>
			</view>
		</block>

		<block v-else>
			<view class='top-title-container'></view>
			<view class="banner">
				<!--皇冠-->
				<view class="banner-hg">
					<image class="hanner-hg-img" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/hy_hg.png"></image>
				</view>
				<!--开通会员 想专属特权-->
				<image class="banner-text" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/hy_text.png"></image>

				<!--三个图标-->
				<view class="top-container" @click="onShoumingClick(member_info)">
					<view class="top-one">
						<image class="top-img" :src="member_info.quanyi_intro.member_price.img"></image>
						<text class="top-txt">{{member_info.quanyi_intro.member_price.title}}</text>
					</view>
					<view class="top-two">
						<image class="top-img" :src="member_info.quanyi_intro.freight.img"></image>
						<text class="top-txt">{{member_info.quanyi_intro.freight.title}}</text>
					</view>
					<view class="top-three">
						<image class="top-img" :src="member_info.quanyi_intro.ticket.img"></image>
						<text class="top-txt">{{member_info.quanyi_intro.ticket.title}}</text>
					</view>
				</view>

				<view class="banner-btm">
					<view class="but-1" @click="onOpenHuiyuanClick" style="background:url('https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/but-img.png');background-size: 100% 100%;">
						<text class="but-1-txt">开通会员</text>
					</view>
					<image class="banner-dz" src="https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/hy_dz_img.png" catchtap="onLondlordClick"></image>
				</view>
			</view>

		</block>


		<!--优惠券栏 会员-->
		<block v-if="member_info.is_member == 1">
			<view class="top-line">
				<view class="black-line"></view>
				<text class="top-line-text">会员专属优惠券</text>
				<view class="black-line"></view>
			</view>

			<view class="ticket-container">

				<block v-for="(item,index) in couponlist" :key="index">
					<view class='coupon-item-container'>

						<view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh1.png');background-size: 100% 100%;">

							<view class='coupon-item-left'>
								<view class='coupon-item-price-des'>
									<view>
										<text class='price'>{{item.reduce_money}}</text>
										<text class='price-danwei'>元</text>

									</view>
									<text class='coupon-des'>{{item.description}}</text>
								</view>
							</view>

							<image src='../../static/icon/xiantiao.png' class='xiantiao-img'></image>
							<view v-if="item.available==1" class="ticket-lingqu" @click="onLingquClick(item)">
								<text class="lingqu">领取</text>
							</view>

							<view v-else class="ticket-lingqu-gray" @click="onLingquClick(item)">
								<text class="lingqu">领取</text>
							</view>

						</view>

					</view>
				</block>

			</view>
		</block>

		<!--优惠券栏 非会员-->
		<block v-else>
			<view class="top-line">
				<view class="black-line"></view>
				<text class="top-line-text">开通会员领优惠券</text>
				<view class="black-line"></view>
			</view>

			<view class="ticket-container">
				<block v-for="(item,index) in member_info.ticket_list" :key="index">
					<view class='coupon-item-container'>
						<view class='coupon-item-inner-container' style="background:url('https://m.aoyifarm.com/Application/wx_img/mjqh1.png');background-size: 100% 100%;">
							<view class='coupon-item-left'>
								<view class='coupon-item-price-des'>
									<view>
										<text class='price'>{{item.reduce_money}}</text>
										<text class='price-danwei'>元</text>

									</view>
									<text class='coupon-des'>{{item.description}}</text>
								</view>
							</view>

							<view class="ticket-lingqu" @click="onTicketLingquClick">
								<text class="lingqu">领取</text>
							</view>

						</view>

					</view>
				</block>

			</view>

		</block>
		<view class="top-line">
			<view class="black-line"></view>
			<text class="top-line-text">会员权益说明</text>
			<view class="black-line"></view>
		</view>

		<!--会员权益说明栏-->
		<view class="qysm-container">
			<block v-for="(item,index) in member_info.quanyi_description" :key="index">
				<view class="qysm-item">
					<image class="qysm-img" :src="item.img"></image>
					<view class="qysm-right">
						<text class="qysm-right-title">{{item.title}}</text>
						<text class="qysm-content">{{item.content}}</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				member_info: {},
				couponlist: [],
				headImgUrl: '',
				nickname: ''

			}
		},

		onShow() {
			var headImgUrl = null;
			var nickname = null;
			//头像
			if (this.globalData.user_info.headimgurl) {
				headImgUrl = this.utils.imageUrlUtils(this.globalData.user_info.headimgurl);
			}
			//昵称
			if (this.globalData.user_info.nickname) {
				nickname = this.globalData.user_info.nickname
			} else {
				nickname = this.globalData.user_info.xcx_nick_name
			}
			this.headImgUrl = headImgUrl;
			this.nickname = nickname;
			
			this.pay_member_info();
		},
		
		onLoad() {
			
			
		},
		

		methods: {
			pay_member_info() {
				
				if (!this.globalData.user_info.userid) {
					return;
				}
				
				var param = {
					user_id: this.globalData.user_info.userid
				}
				var that = this;
				this.xm_config.pay_member_info(param)
					.then(function(res) {
						if (res.data.status == 1) {
							that.member_info = res.data.info
							//获取会员优惠券列表
							if (res.data.info.is_member != null && res.data.info.is_member == 1) {
								that.member_ticket_list();
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},
			//获取会员可领取专属红包列表
			member_ticket_list() {
				var param = {
					user_id: this.globalData.user_info.userid
				}
				var that = this;
				this.xm_config.member_ticket_list(param)
					.then(function(res) {
						if (res.data.status == 1) {
							if (res.data.info != null) {
								that.couponlist = res.data.info;
							} else {
								that.couponlist = [];
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					});
			},

			onShoumingClick: function(member_info) {
				var memberInfo = member_info;
				uni.navigateTo({
					url: '../leaguer/leaguer-benefit-rule/leaguer-benefit-rule?quanyiDescription=' + JSON.stringify(memberInfo.quanyi_description),
				})
			},

			onOpenHuiyuanClick: function() {
				if (!this.globalData.user_info.userid) {
					uni.navigateTo({
						url: '../app_login/app_login',
					});
					return;
				}
				uni.navigateTo({
					url: '../leaguer/leaguer-pay/leaguer-pay',
				})

			},

			//会员领取优惠券
			onLingquClick: function(item) {
				
				var ticket_id = item.id;
				var param = {
					user_id: this.globalData.user_info.userid,
					ticket_id: ticket_id
				}
				var that = this;
				this.xm_config.get_ticket(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.showToast({
								title: '领取成功',
								duration: 1000,
								success: function() {
									setTimeout(function() {
										//刷新优惠券余额
										that.pay_member_info();
										//刷新优惠券列表
										that.member_ticket_list()
									}, 2000)

								}
							})
						} else {
							uni.showToast({
								title: "该券已超过本月领取上限",
								icon: "none",
								duration: 1000,
							})
							return;
						}
					});

			},
			//非会员领取优惠券
			onTicketLingquClick: function() {
				uni.showModal({
					title: '温馨提示',
					content: '该优惠券仅限会员领取，开通会员再来领取吧',
					confirmText: '立即开通',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../leaguer/leaguer-pay/leaguer-pay',
							})
						}
					}
				})
			},

			onXuFeiClick: function() {
				wx.navigateTo({
					url: '../leaguer/leaguer-pay/leaguer-pay?end_time=' + this.member_info.end_time,
				})
			},
			
			onPullDownRefresh() {
				this.pay_member_info();
			},
		},
	}
</script>

<style>
	.banner {
		display: flex;
		flex-direction: column;
		background: #fff;
		width: 690rpx;
		height: 392rpx;
		padding: 0;
		/*overflow: hidden;*/
		margin: -140rpx 30rpx 20rpx 30rpx;
		border-radius: 12rpx;
		align-items: center;
		position: relative;
	}

	.slide-image {
		width: 100%;
		height: 310rpx;
		border-radius: 12rpx;
	}

	.goods-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: content-box;
		padding: 10rpx 10rpx;
	}

	.goods-box {
		width: 361.5rpx;
		background-color: #fff;
		overflow: hidden;
		margin-bottom: 18rpx;
		box-shadow: 0px 5px 15px -5px #ddd;
		border-radius: 5rpx;
		position: relative;
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

	.goods-box .img-box {
		width: 361.5rpx;
		height: 483rpx;
		overflow: hidden;
	}

	.goods-box .img-box image {
		width: 361.5rpx;
		height: 483rpx;
		border-top-left-radius: 5rpx;
		border-top-right-radius: 5rpx;
	}

	.goods-box .goods-title {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 24rpx;
		color: #333;
		margin: 0 20rpx;
		padding-top: 20rpx;
		font-weight: bold;
	}

	.pj-container {
		display: flex;
		flex-direction: row;
		color: #afafaf;
		font-size: 22rpx;
		margin: 10rpx 20rpx;
	}

	.gmrs {
		margin-left: 10rpx;
		font-size: 20rpx;
		color: #afafaf;
	}

	.gwc-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 20rpx;
		margin: 0rpx 20rpx;
	}

	.good-price {
		color: #000;
		font-size: 26rpx;
		font-weight: bold;
	}

	.member-good-price {
		color: #71e09e;
		font-size: 30rpx;
		font-weight: bold;
		margin-left: 20rpx;
	}

	.sp-good-price {
		color: #ef3815;
		font-size: 35rpx;
		font-weight: bold;
	}

	.sp-goods-title {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 32rpx;
		color: #000;
	}

	.good-dw {
		color: #afafaf;
		font-size: 20rpx;
	}

	.member-good-dw {
		color: #afafaf;
		font-size: 22rpx;
	}

	.good-kc {
		color: #51d8a9;
	}

	.kc-container {
		color: #999;
		font-size: 30rpx;
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

	.sp-num-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30rpx;
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

	.gwc-img {
		width: 40rpx;
		height: 40rpx;
	}

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

	/*对话框 */

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

	.close-img-sp {
		width: 40rpx;
		height: 40rpx;
	}

	.close-container {
		display: flex;
		justify-content: flex-end;
		padding: 20rpx 20rpx 0 20rpx;
	}

	.good-img-container {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -20rpx;
	}

	.content-container {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.good-img {
		width: 400rpx;
		height: 460rpx;
		border-radius: 15rpx;
	}

	.good-img-bg {
		box-shadow: 0px 5px 20px -5px #ddd;
		height: 520rpx;
		width: 460rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 15rpx;
	}

	/***********农场列表***********/

	.farm-list-container {
		width: 690rpx;
		padding: 0;
		overflow: hidden;
		box-shadow: 0px 5px 20px -5px #ddd;
		background: #fff;
		margin: 20rpx 30rpx 20rpx 30rpx;
		border-radius: 15rpx;
	}

	.farm-title-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 95rpx;
		line-height: 95rpx;
		padding: 0 20rpx;
		align-items: center;
		border-bottom: 2rpx solid #f3f6fb;
	}

	.farm-title {
		font-size: 32rpx;
		font-weight: bold;
	}

	.farm-list-item {
		display: flex;
		flex-direction: column;
		padding: 20rpx 0;
	}

	.farm-list-item-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 20rpx;
	}

	.farm-dr {
		margin-bottom: 10rpx;
	}

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

	.qw-img {
		width: 100rpx;
		height: 45rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 28rpx;
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
	}

	.pl-top-title {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		justify-content: space-between;
	}

	.pl-hr {
		width: 100%;
		background: #f3f6fb;
		height: 2rpx;
	}

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

	.hr1 {
		background: #f2f2f4;
		width: 100%;
		height: 2rpx;
	}

	.hr {
		width: 100%;
		background: #f3f6fb;
		height: 2rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.paixu-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		padding-top: 25rpx;
		padding-bottom: 25rpx;
	}

	.tip-line {
		background: #ff8b00;
		width: 8rpx;
		height: 25rpx;
		border-radius: 4rpx;
		margin: 0 10rpx 0 20rpx;
	}

	.text-paixu,
	.text-shijian,
	.text-imgnum,
	.text-pinglun {
		font-size: 28rpx;
		margin-right: 30rpx;
		font-weight: 500;
	}

	.paixu-type {
		display: flex;
		flex: 1;
	}

	.paixu-active {
		color: #ff8b00;
	}

	.text-haoping {
		font-size: 28rpx;
		color: #ff8b00;
		margin-right: 20rpx;
		font-weight: 500;
	}

	.dr {
		height: 205rpx;
		background: #f2f2f4;
	}

	.container-item {
		display: flex;
		flex-direction: column;
		background: #fff;
	}

	.container-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx;
	}

	.head-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 66rpx;
		margin: 50rpx 30rpx 30rpx 18rpx;
	}

	.container-name-time {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.name-text {
		color: #333;
		font-size: 30rpx;
	}

	.time-text {
		display: flex;
		flex-direction: column;
		color: #cfd6dd;
		font-size: 26rpx;
		margin-top: 20rpx;
		margin-right: 60rpx;
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
	}

	.img {
		width: 196rpx;
		height: 196rpx;
		margin-right: 10rpx;
		margin-left: 10rpx;
	}

	.content-text-repaly {
		background: #f2f2f4;
		font-size: 28rpx;
		margin-top: 20rpx;
		padding: 15rpx;
		margin: 20rpx;
		color: #666;
	}

	.nav-container {
		display: flex;
		flex-direction: column;
	}

	.nav-title {
		display: flex;
		justify-content: center;
		height: 44px;
		align-items: center;
		color: #fff;
		font-size: 35rpx;
	}

	.top-title-container {
		display: flex;
		flex-direction: row;
		height: 200rpx;
		padding-left: 40rpx;
	}

	.zj-text {
		color: #666;
		font-size: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
	}

	.top-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 80rpx;
	}

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
	}

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

	.status-box {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.status-box .status-label {
		width: 150rpx;
		height: 100%;
		text-align: center;
		font-size: 30rpx;
		color: #cfd6dd;
		box-sizing: border-box;
		position: relative;
		font-weight: bold;
	}

	.status-box .status-label.active {
		color: #38ad84;
		border-bottom: 5rpx solid #38ad84;
		font-weight: bold;
	}

	.status-box .status-label .red-dot {
		width: 16rpx;
		height: 16rpx;
		position: absolute;
		left: 116rpx;
		top: 23rpx;
		background-color: #f43530;
		border-radius: 50%;
	}

	/*************红包弹窗*********************/

	.shan {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		top: 0;
		left: 0;
		z-index: 10000;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.kuang {
		display: flex;
		flex-direction: column;
	}

	.top-title-hb {
		display: flex;
		flex-direction: column;
		color: #fff;
		align-items: center;
		width: 550rpx;
		background: url('https://m.viewcreator3d.cn/Application/wx_img/red_bg2.png');
		background-size: 100% 100%;
		height: 190rpx;
	}

	.top-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 70rpx;
	}

	.coupon-list-container {
		display: flex;
		flex-direction: column;
		background: #ff2a39;
		padding: 0 15rpx;
		border-bottom-right-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
	}

	.height200 {
		height: 200rpx;
	}

	.height400 {
		height: 400rpx;
	}

	.height600 {
		height: 600rpx;
	}

	.coupon-item-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 20rpx 20rpx 20rpx;
		position: relative;
	}

	/*.coupon-item-inner-container {*/

	/*display: flex;*/

	/*flex-direction: row;*/

	/*padding: 15rpx 15rpx;*/

	/*justify-content: space-between;*/

	/*}*/

	.coupon-item-left {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		margin-left: 10rpx;
	}

	.coupon-item-price-des {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}

	.price {
		font-size: 60rpx;
		color: #ff7e00;
		font-weight: 500;
	}

	.price-danwei {
		font-size: 32rpx;
		color: #ff7e00;
		font-weight: 550;
	}

	.price-tab {
		margin-left: 40rpx;
		font-size: 36rpx;
		color: #feaa16;
		font-weight: 550;
	}

	.coupon-des {
		font-size: 27rpx;
		color: #333;
	}

	.xiantiao-img {
		width: 1px;
		height: 75rpx;
		margin-right: 13rpx;
	}

	.coupon-type {
		font-size: 35rpx;
		color: #ff7e00;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.close-img {
		width: 65rpx;
		height: 65rpx;
	}

	.close {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
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

	/***********标题栏********************/

	.top-visibility {
		visibility: hidden;
	}

	.navigator {
		height: 44px;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 999;
		display: flex;
		flex-direction: row;
	}

	.leftButton {
		width: 50px;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.leftButton>image {
		width: 25px;
		height: 25px;
	}

	.title {
		height: 44px;
		margin-right: 50px;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title>text {
		font-size: 16px;
		color: #fff;
		font-weight: 500;
	}

	.remind-img {
		width: 95rpx;
		height: 95rpx;
		margin-top: 25rpx;
	}

	.gif-container {
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		color: #999;
		font-size: 20rpx;
		flex-direction: row;
	}

	.gyj-text {
		color: #999;
		font-size: 22rpx;
		margin-bottom: 4rpx;
		margin-top: 33rpx;
	}

	.ctfw-right {
		display: flex;
		margin-left: 30rpx;
		flex-direction: column;
	}

	.red-img {
		width: 500rpx;
		height: 700rpx;
		border-radius: 20rpx;
	}

	.member-img {
		width: 55rpx;
		height: 20rpx;
	}

	.top-one {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 80rpx;
	}

	.top-two {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 80rpx;
	}

	.top-three {
		display: flex;
		flex-direction: column;
		align-items: center;
		/*margin-right: 20rpx;*/
	}

	.top-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 18rpx;
	}

	.top-img {
		width: 62rpx;
		height: 62rpx;
		margin-bottom: 10rpx;
	}

	.top-txt {
		color: #a6a6a6;
		font-size: 25rpx;
	}

	.shuoming-container {
		color: #a6a6a6;
		font-size: 25rpx;
		align-items: center;
		margin-top: 25rpx;
		margin-bottom: 15rpx;
	}

	.but-1 {
		width: 263rpx;
		height: 66rpx;
		margin: 15rpx 40rpx 20rpx 40rpx;
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 200rpx;
		margin-top: 38rpx;
	}

	.but-2 {
		width: 590rpx;
		height: 70rpx;
		margin: 10rpx 40rpx 10rpx 40rpx;
		border-radius: 28rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.but-1-txt {
		color: #fff;
		font-size: 30rpx;
	}

	.but-2-txt1 {
		color: #fff;
		font-size: 28rpx;
	}

	.but-2-txt2 {
		color: #fff;
		font-size: 18rpx;
		margin-top: -3rpx;
	}

	.top-line-img {
		width: 160rpx;
		height: 2rpx;
		margin-left: 60rpx;
		margin-right: 60rpx;
	}

	.top-line {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 15rpx;
		margin-bottom: 15rpx;
		justify-content: space-between;
		padding: 0rpx 70rpx;

	}

	.top-line-text {
		font-size: 27rpx;
		color: #333333;
	}

	.ticket-container {
		background: #fff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin: 20rpx 30rpx 20rpx 30rpx;
		border-radius: 12rpx;
		padding-top: 15rpx;
	}

	.coupon-item-inner-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx;
		flex: 1;
	}

	.coupon-item-price-des {
		display: flex;
		flex-direction: column;
	}

	/*.price-danwei {*/

	/*font-size: 32rpx;*/

	/*color: #ff7e00;*/

	/*font-weight: 550;*/

	/*}*/

	.coupon-youxiaoqi {
		font-size: 26rpx;
		color: #666;
	}

	.coupon-type {
		font-size: 35rpx;
		color: #ff7e00;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.ticket-lingqu {
		width: 90rpx;
		height: 40rpx;
		background: #f5ab16;
		text-align: center;
		border-radius: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.ticket-lingqu-gray {
		width: 90rpx;
		height: 40rpx;
		background: #888888;
		text-align: center;
		border-radius: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.lingqu {
		font-size: 26rpx;
		color: #fff;
	}

	.member-info-container {
		height: 337rpx;
		background: #fff;
		margin: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		border-radius: 25rpx;
	}

	.user-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 30rpx;
		padding-right: 30rpx;
		justify-content: space-between;
	}

	.user-info-mid {
		display: flex;
		flex-direction: column;
		margin-top: 50rpx;
	}

	.ticket-info-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 10rpx 50rpx 20rpx 50rpx;
	}

	.left-ticket {
		display: flex;
		flex-direction: column;
	}

	.right-ticket {
		display: flex;
		flex-direction: column;
	}

	.ticket-price-container {
		display: flex;
		flex-direction: row;
		color: #63daa4;
		align-items: flex-end;
	}

	.user-name {
		margin-top: 20rpx;
		font-size: 28rpx;
	}

	.member-type {
		font-size: 25rpx;
		color: #a3a3a3;
		margin-top: 9rpx;
	}

	.time-text-1 {
		font-size: 24rpx;
		color: #62d2ac;
	}

	.time-text-2 {
		font-size: 20rpx;
		color: #ababab;
	}

	.ticket-1-txt {
		font-size: 30rpx;
		color: #aaa;
	}

	.ticket-price {
		font-size: 35rpx;
	}

	.ticket-price-danwei {
		font-size: 20rpx;
		padding-bottom: 8rpx;
	}

	.ticket-2-txt {
		font-size: 25rpx;
		color: #cacaca;
	}

	.ticket-3-txt {
		font-size: 20rpx;
		color: #cacaca;
	}

	.but-lingqu {
		width: 90rpx;
		height: 40rpx;
		border: 4rpx solid #58d8a8;
		background: #fff;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10rpx;
	}

	.but-chakan {
		width: 90rpx;
		height: 40rpx;
		border: 4rpx solid #58d8a8;
		background: #fff;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10rpx;
	}

	.but-lingqu-txt {
		font-size: 22rpx;
		color: #0fdb48;
	}

	.hyj-img {
		width: 89rpx;
		height: 25rpx;
	}

	.jg-container {
		display: flex;
		flex-direction: row;
	}

	.hyj-price-container {
		display: flex;
		flex-direction: row;
		margin-left: 50rpx;
		align-items: center;
	}

	.hyj-sp-container {
		display: flex;
		flex-direction: row;
	}

	.yhj-price {
		font-size: 35rpx;
		color: #38ad84;
		font-weight: bold;
	}

	.right-container {
		display: flex;
		flex-direction: row;
		/*justify-content: space-between;*/
	}

	.price-b {
		font-size: 25rpx;
		color: #feaa16;
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

	.member-y-good-price {
		color: #000;
		font-size: 29rpx;
	}

	.gg-container {
		display: flex;
		flex-direction: row;
		flex: 1;
		align-items: center;
	}

	.price-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.normal-price {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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

	.ticket-2-container {
		display: flex;
		flex-direction: row;
		align-items: baseline;

	}





	.banner-hg {
		width: 113rpx;
		height: 113rpx;
		background: #FFFFFF;
		border-radius: 50%;
		margin-top: -50rpx;
		float: right;
		box-shadow: 0rpx 3rpx 35rpx 0rpx rgba(0, 0, 0, 0.15);
		align-items: center;
		justify-content: center;
		display: flex;

	}

	.hanner-hg-img {
		width: 80rpx;
		height: 80rpx;
	}

	.banner-text {
		width: 350rpx;
		height: 50rpx;
		margin-top: 5rpx;

	}

	.banner-dz {
		position: absolute;
		width: 190rpx;
		height: 209rpx;
		bottom: -45px;
		right: -30rpx;
		transform: rotate(-20deg);

	}

	.banner-btm {
		display: flex;
		flex-direction: row;
		overflow: hidden;
		height: 150rpx;
		position: relative;
		width: 690rpx;

	}


	.black-line {
		width: 160rpx;
		height: 3rpx;
		background: rgba(51, 51, 51, 1);
	}


	.qysm-container {
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 20rpx 30rpx 20rpx 30rpx;
		padding: 20rpx;

	}

	.qysm-item {
		display: flex;
		flex-direction: row;
		margin-top: 10rpx;

	}

	.qysm-right {
		display: flex;
		flex-direction: column;
		margin-left: 15rpx;
		padding-bottom: 10px;
		border-bottom: 1px solid #F2F2F2;
		width: 570rpx;
	}


	.qysm-img {
		width: 50rpx;
		height: 50rpx;
	}


	.qysm-right-title {
		color: #4D4D4D;
		font-size: 30rpx;
	}

	.qysm-content {
		color: #B3B3B3;
		font-size: 24rpx;

	}
</style>
