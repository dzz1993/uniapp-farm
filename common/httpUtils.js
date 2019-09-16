import vc_encryp_param from './vc_encryp_param.js';

function request(url, params) {
	request(url, params, 'POST');
}

function request(url, params, method) {
	uni.showLoading({
		title: '加载中...',
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: vc_encryp_param.get_vc_String(params),
			success(res){
				uni.hideLoading();
				uni.stopPullDownRefresh();
				resolve(res);
			},
			fail() {
				uni.hideLoading();
				uni.stopPullDownRefresh();
				reject();
			},

		});
	})
}

module.exports = {
	request: request
}
