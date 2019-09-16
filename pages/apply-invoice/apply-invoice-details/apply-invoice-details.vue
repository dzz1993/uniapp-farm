<template>
	<view>
		<view class='qxzfp'>请选择发票类型</view>
		<view class='dzfp-bg'>
			电子发票
		</view>
		<view class='qxzfp'>发票详情</view>
		<view class='item-container'>
			<text class='tdlx'>抬头类型</text>
			<view class='xzqy'>
				<view class='qy-container' @click="onSelectClick(0)">
					<image class='box-img' v-if="active==0" src="http://res.aoyifarm.com/20180719/5b503e2fdf109.png"></image>
					<image class='box-img' v-else src="http://res.aoyifarm.com/20180719/5b503e1233104.png"></image>
					<text>企业</text>
				</view>

				<view class='qy-container mg' @click="onSelectClick(1)">
					<image class='box-img' v-if="active==1" src="http://res.aoyifarm.com/20180719/5b503e2fdf109.png"></image>
					<image class='box-img' v-else src="http://res.aoyifarm.com/20180719/5b503e1233104.png"></image>
					<text>个人</text>
				</view>
			</view>
		</view>
		<view class='item-container'>
			<text class='tdlx'>发票抬头</text>
			<view class='right-text'>
				<input placeholder="请输入发票抬头" class='input' placeholder-class="input" @input="getInvoiceName"></input>
			</view>
		</view>
		<view class='item-container' v-if="active==0">
			<text class='tdlx'>税号</text>
			<view class='right-text'>
				<input placeholder="请输入纳税人识别号" class='input' placeholder-class="input" @input="getInvoiceNum"></input>
			</view>
		</view>
		<view class='item-container'>
			<text class='tdlx'>发票内容</text>
			<view class='right-text'>
				* 蔬菜 *
			</view>
		</view>
		<view class='item-container'>
			<text class='tdlx'>发票金额</text>
			<view class='right-text-je'>
				¥ {{totalPrice}}
			</view>
		</view>

		<view class='qxzfp'>接收方式</view>

		<view class='item-container'>
			<text class='tdlx'>电子邮件</text>
			<view class='right-text'>
				<input placeholder="请输入电子邮箱" class='input' placeholder-class="input" @input="getInvoiceEmail"></input>
			</view>
		</view>

		<view class='tj' style="background:url('https://m.aoyifarm.com/Application/wx_img/btn_tj.png');background-size: 100% 100%;"
		 @click="onSubmitClick">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_ids: "",
				totalPrice: 0,
				active: 0,
				invoice_name: "",
				invoice_num: "",
				invoice_email: ""

			}
		},

		onLoad(options) {
			var order_ids = options.order_ids;
			var totalPrice = options.totalPrice;

			this.order_ids = order_ids;
			this.totalPrice = totalPrice;
		},
		methods: {
			onSelectClick: function(index) {
				var index = index;
				this.active = index
			},

			getInvoiceName: function(e) {
				this.invoice_name = e.detail.value
			},

			getInvoiceNum: function(e) {
				this.invoice_num = e.detail.value
			},

			getInvoiceEmail: function(e) {
				this.invoice_email = e.detail.value
			},

			onSubmitClick: function() {
				if (!this.invoice_name) {
					uni.showToast({
						title: '请输入发票抬头',
						icon: 'none'
					})
					return;
				}

				if (this.active == 0) {
					if (!this.invoice_num) {
						uni.showToast({
							title: '请输入纳税人识别号',
							icon: 'none'
						})
						return;
					}
				}

				if (!this.invoice_email) {
					uni.showToast({
						title: '请输入邮箱地址',
						icon: 'none'
					})
					return;
				}

				var param = {
					user_id: this.globalData.user_info.userid,
					order_ids: this.order_ids,
					invoice_type: this.active == 0 ? 2 : 1,
					company_head: this.invoice_name,
					email: this.invoice_email
				}

				if (this.active == 0) {
					param.invoice_number = this.invoice_num
				}

				this.xm_config.add_invoice_new(param)
					.then(function(res) {
						if (res.data.status == 1) {
							uni.redirectTo({
								url: '../apply-invoice-success/apply-invoice-success',
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}

					});
			}
		}
	}
</script>

<style>
	.qxzfp {
		background: #f2f5fa;
		padding: 20rpx 30rpx;
		color: #666;
		font-size: 28rpx;
	}

	.dzfp-bg {
		border: 2rpx solid #5ad8a9;
		height: 83rpx;
		width: 298rpx;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #5ad8a9;
		font-size: 30rpx;
		margin: 30rpx;
	}

	.item-container {
		display: flex;
		flex-direction: row;
		color: #333;
		font-size: 30rpx;
		padding: 20rpx 30rpx;
		border-bottom: 2rpx solid #f2f5fa;
	}

	.tdlx {
		width: 150rpx;
	}

	.right-text {
		color: #888;
		display: flex;
		/* align-items: center;
  justify-content: center; */
		flex: 1;
	}

	.box-img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.qy-container {
		display: flex;
		align-items: center;
		margin-left: 30rpx;
	}

	.xzqy {
		display: flex;
		flex-direction: row;
	}

	.mg {
		margin-left: 80rpx;
	}

	.right-text-je {
		color: #DA452D;
		display: flex;
		/* align-items: center;
  justify-content: center; */
		flex: 1;
	}

	.input {
		width: 450rpx;
		display: flex;
		/* align-items: center;
  justify-content: center;
  flex: 1; */
	}

	.tj {
		height: 70rpx;
		margin: 200rpx 30rpx 30rpx 30rpx;
		color: #ffffff;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		justify-content: center;
	}
</style>
