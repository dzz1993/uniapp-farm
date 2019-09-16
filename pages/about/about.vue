<template>
	<view>
		<view class='img-text-container'>
			<image class="logo-img" src='https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/logo_icon.png'></image>
			<text class='text-dr'>&nbsp;&nbsp;&nbsp;“奥一农场”APP于2017年1月1日正式上线，是国内首款支持用户线上完成选地、种菜、视频、收菜、派送等一体化服务的移动客户端，由奥一新源(838590)旗下北京奥一农业科技有限公司设计、开发、运营。</text>
			<text class='text-dr'>&nbsp;&nbsp;&nbsp;&nbsp;奥一农场为用户提供多达50种应季蔬菜，种子取自全球最好的品种，全部采用有机种植的方式，无农药、无化肥、无激素、无保鲜剂，从源头上解决了食品安全的问题。农场为每块菜地都安装了视频监控，种植过程完全透明化，用户通过手机APP即可随时随地看到蔬菜的生长情况。为了保证蔬菜的极致新鲜，农场收菜后极速送达，真正实现了从田间直接到餐桌。在奥一农场体验中心，阳光、沙发、咖啡、音乐、儿童乐园、自助鲜蔬将为用户带来极致的线下体验。</text>
			<text>&nbsp;&nbsp;&nbsp;&nbsp;奥一农场坚持“自己种，更放心！”的核心理念，致力于让人人吃上健康的食品，解决中国人的食品安全问题。</text>
		</view>

		<view class='hr20'></view>
		<view class='item-container'>
			<text>应用名称</text>
			<text>奥一农场</text>
		</view>
		<view class='hr'></view>
		<view class='item-container'>
			<text>当前版本</text>
			<text>v2.0</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.img-text-container {
		font-size: 28rpx;
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #ffffff;
		padding: 0 30rpx 20rpx 30rpx;
	}

	.logo-img { 
		width: 150rpx;
		height: 150rpx;
		margin: 30rpx;
	}
	.text-dr {
		margin-bottom: 30rpx;
	}

	.item-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #fff;
		padding: 20rpx 20rpx;
		align-items: center;
		color: #333;
		font-size: 30rpx;
		font-weight: 500;

	}

	.hr20 {
		width: 100%;
		height: 20rpx;
		background: #f8f8f8;
	}

	.hr {
		width: 100%;
		height: 1rpx;
		background: #f8f8f8;
	}
</style>
