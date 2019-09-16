<script>
	export default {

		onLaunch: function() {
			
			/* 获取用户信息 */
			var that = this;
			// try {
			// 	const value = uni.getStorageSync('user_info');
			// 	console.log(value);
			// 	if (value) {
			// 		that.globalData.user_info = value;
			// 	} else {
			// 		uni.navigateTo({
			// 			url: '/pages/app_login/app_login',
			// 		});
			// 	}
			// } catch (e) {
			// 	if (that.globalData.user_info == '') {
			// 		uni.navigateTo({
			// 			url: '/pages/app_login/app_login',
			// 		});
			// 	}
			// }
			const value = uni.getStorageSync('user_info');
			if (value) {
				that.globalData.user_info = value;
			}
			
		
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},

		methods: {
			get_xcx_userinfo() {
				var that = this;

				wx.login({
					success: function(data) {
						var param = {
							js_code: data.code,
							appid: that.xm_config.xm_wx_appid,
							app_type: 'xcx'
						}
						that.xm_config.get_userinfo_bycode(param)
							.then(function(res) {
								if (res.data.status == 1 && res.data.info != null) {
									if (res.data.info.user_info) {
										that.globalData.user_info = res.data.info.user_info;
									}

									if (res.data.info.wx_xcx_info) {
										that.globalData.wx_xcx_info = res.data.info.wx_xcx_info;
									}

								} else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}
							});
					}
				})

			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/common/uni.css");
</style>
