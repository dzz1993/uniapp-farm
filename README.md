# uni-app奥一农场开发文档与说明

#### 介绍
uni-app奥一农场

#### 软件架构
使用uin-app框架实现App端和小程序端的混合开发


#### 代码仓库地址

1. svn地址：svn://gitee.com/firstnan/xcxaoyifarm
2. git地址：https://gitee.com/firstnan/xcxaoyifarm.git

#### 代码目录结构

通过沟通已经说明

#### 使用说明

1. 重点说一下网络请求
```JavaScript
    activity_carousel_list() {
				var that = this;
				var param = {
					user_id: "17152"
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
			}
```


