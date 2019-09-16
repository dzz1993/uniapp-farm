<template>
	<view>
		<web-view :src="web_url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				web_url:""
			}
		},
		
		onLoad(options) {
			this.web_url = options.web_url;
		},
		
		methods: {
			
		}
	}
</script>

<style>

</style>
