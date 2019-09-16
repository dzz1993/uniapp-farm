<template>
	<view>
		<view class="content-page">
			<view class='tip'>
				<text>
					&nbsp;&nbsp;&nbsp;农场每天预估次日采收蔬菜的品种和数量，中午12点公布，次日有配送的地主可选择品种，选择蔬菜的总重需在2500g-2750g之间（总重一达到2500g不能再选），农场根据您的选择安排配送。未选择的地主，农场会根据您的心愿菜单结合剩余的品种科学合理的搭配配送。</text>
			</view>
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
	.content-page {
		background: #ffffff;
		display: flex;
		flex-direction: column;

	}
	
	page{
		background: #ffffff;
	}


	.tip {
		color: #333;
		font-size: 28rpx;
		margin-top: 80rpx;
		padding: 0 30rpx;
		display: flex;
		flex: 1;
		background: #ffffff;
	}
</style>
