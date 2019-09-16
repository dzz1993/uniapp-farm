var httpUtils = require('./common/httpUtils.js');

/**
 * 项目基本配置文件
 */
var xm_host = 'https://m.aoyifarm.com/'; //https://m.viewcreator3d.cn  https://m.aoyifarm.com/

var version_name = "1.0.3"

var version_code = "103"

var xm_wx_appid = "wx57b17440dfa77c27" //小程序的appid

var xcx_img_path = "https://aoyifarm.oss-cn-beijing.aliyuncs.com/icon/";

var xm_config = {

	xcx_img_path: xcx_img_path,
	xm_wx_appid: xm_wx_appid,
	xm_host: xm_host,

	/*************************H5页面固定地址开始*************************************/
	/*************************H5页面固定地址开始*************************************/
	//登录协议
	login_xieyi() {
		return xm_host + "/index.php/HmFarm/Farm/user_pro"
	},

	/*************************H5页面固定地址结束*************************************/


	//获取小程序用户信息
	get_userinfo_bycode(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/get_userinfo_bycode", param)
	},

	//获取验证码
	getCodeSms(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/sms", param)
	},

	//APP登录接口
	register(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/register", param)
	},


	//获取轮播图
	activity_carousel_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmActivity/activity_carousel_list", param)
	},

	//获取首页商品列表
	goods_list_easy(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/goods_list_easy", param)
	},


	//获取公告列表接口
	get_notice_info(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm4/get_notice_info", param)
	},

	//获取地主页面内容
	get_owner_content(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/index_new", param)
	},

	//获取公告详情页内容
	get_notice_detail(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm4/get_notice_detail", param)
	},

	//获取会员页详情
	pay_member_info(param) {
		return httpUtils.request(xm_host + "index.php/Api/PayMember/pay_member_info", param)
	},

	//获取商品详情
	goods_info_detail(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/goods_info", param)
	},

	//当前菜园收菜(已收菜)列表接口 (新）
	harvest_record_list_new(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/harvest_record_list_new", param)
	},

	//获取用户当前组已经收蛋记录
	get_have_egg_log_by_priodnumid(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm6/get_have_egg_log_by_priodnumid", param)
	},

	//获取当前用户全部已经收蛋记录
	get_have_egg_log(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm6/get_have_egg_log", param)
	},

	//获取农场列表
	nongchang_trends(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/nongchang_trends", param)
	},

	//排序类型
	user_assess(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm7/user_assess", param)
	},

	//获取评论列表
	get_commentlist_new_xg(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm7/filter_list", param)
	},

	//计算金额
	calc_order_amount(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/calc_order_amount", param)
	},

	//集市下单接口
	add_market_order(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/add_market_order", param)
	},

	//集市下单接口
	add_market_order(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/add_market_order", param)
	},

	//生成奥一卡订单
	weixinxcx_add_order(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/weixinxcx_add_order", param)
	},

	//客服与帮助接口
	get_help(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm7/get_help", param)
	},

	//反馈建议
	add_advice(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/add_advice", param)
	},

	//获取开票列表（新）
	get_order_isinvoice_new(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/get_order_isinvoice_new", param)
	},

	//获取开票历史(新)
	get_invoice_history_new(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/get_invoice_history_new", param)
	},

	//申请开发票接口
	add_invoice_new(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/add_invoice_new", param)
	},

	//我的优惠券接口（包含鸡蛋券加满减券)
	select_all_coupon(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm7/select_all_coupon", param)
	},

	//验证兑换码接口
	verify_my_code(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmActivity/verify_my_code", param)
	},

	//获取地址列表
	address_lists(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/address_lists", param)
	},

	//获取鸡场列表
	get_statistics_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm6/get_statistics_list", param)
	},

	//获取套餐价格与介绍
	get_landset_info(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/get_landset_info", param)
	},

	//计算订单金额
	calc_maidiset_order_amount(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/calc_maidiset_order_amount", param)
	},

	//计算养鸡订单金额
	calc_maiji_order(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/calc_maiji_order", param)
	},

	//获取购物车数据
	get_cart(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/get_cart", param)
	},

	//领取专属红包接口
	get_ticket(param) {
		return httpUtils.request(xm_host + "index.php/Api/PayMember/get_ticket", param)
	},

	//获取会员可领取专属红包列表
	member_ticket_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/PayMember/member_ticket_list", param)
	},

	//公告列表接口
	get_notice_info(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm4/get_notice_info", param)
	},

	//付费会员下单接口
	add_hy_order(param) {
		return httpUtils.request(xm_host + "index.php/Api/PayMember/add_order", param)
	},

	//获取优惠券列表
	select_market_coupon_bygoods(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmActivity/select_market_coupon_bygoods", param)
	},

	//购地下单
	add_maidi_order(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/add_maidi_order", param)
	},

	//支付成功信息接口
	get_pay_success_info(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/get_pay_success_info", param)
	},

	//新版买鸡下单
	add_maiji_order(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/add_maiji_order", param)
	},

	//买鸡订单支付成功详情
	buychicken_order_detail_new(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm6/buychicken_order_detail_new", param)
	},

	//获取礼品卡
	chicken_card_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/chicken_card_list", param)
	},

	//编辑购物车数量
	edit_cart(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/edit_cart", param)
	},

	//删除购物车数据
	delete_cart(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/delete_cart", param)
	},

	//加入购物车
	add_cart(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/add_cart", param)
	},

	//获取我的菜地列表
	my_vegtablefield_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/my_vegtablefield_list", param)
	},

	//获取收菜信息
	harvest_vegtable_info(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/harvest_vegtable_info", param)
	},

	//获取收菜列表
	harvest_vegtable_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/harvest_vegtable_list", param)
	},

	//我的鸡列表
	get_my_chicken_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm6/get_my_chicken_list", param)
	},

	//获取未来收蛋记录
	get_future_egg_log_by_priodnumid(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm6/get_future_egg_log_by_priodnumid", param)
	},

	//菜地地址列表
	address_lists_baoyou(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/address_lists_baoyou", param)
	},

	//修改鸡场地址
	update_chicken_address(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/update_chiken_address", param)
	},

	//更新送蛋地址
	update_chicken_send_address(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/update_chicken_send_address", param)
	},

	//修改菜园菜地地址
	update_field_address(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/update_field_address", param)
	},

	//修改送人地址
	update_send_address(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/update_send_address", param)
	},

	//地主:获取全部菜品
	get_all_vegetablew(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/get_all_vegetable", param)
	},

	//地主 >>获取不喜欢的蔬菜列表
	get_unlike_vegetable(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/get_unlike_vegetable", param)
	},

	//地主 >>设置不喜欢的蔬菜
	set_unlike_vegetable(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/set_unlike_vegetable", param)
	},

	//地主 >>清空不喜欢的蔬菜
	del_unlike_vegetable(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/del_unlike_vegetable", param)
	},

	//获取明日可收菜列表
	tomorrow_vegetable_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/tomorrow_vegetable_list", param)
	},

	//获取今日已选蔬菜列表
	get_today_vegetable(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/get_today_vegetable", param)
	},

	//添加菜地卡
	add_vegtable_card(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/add_vegtable_card", param)
	},

	//添加菜地月卡
	add_vegtable_month_card(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/add_vegtable_month_card", param)
	},

	//添加养鸡卡 
	add_chicken_card(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/add_chicken_card", param)
	},

	//订单详情 
	order_info(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/order_info", param)
	},

	//集市下单接口
	add_order(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/add_order", param)
	},

	//添加地址 
	add_user_address(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/add_user_address", param)
	},

	//编辑地址
	edit_user_address(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/edit_user_address", param)
	},

	//获取区域
	get_open_region_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/UserRegion/get_open_region_list", param)
	},

	//删除地址
	del_user_address(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/del_user_address", param)
	},

	//修改收菜日期
	update_send_date(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/update_send_date", param)
	},

	//修改收蛋日期
	update_chicken_send_date(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/update_chicken_send_date", param)
	},

	//订单记录
	get_order_history(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm2/get_order_history", param)
	},

	//获取我的余额
	get_my_balance(param) {
		return httpUtils.request(xm_host + "Api/UserMoney/get_my_balance", param)
	},

	//获取充值活动页面内容	
	deposit_activity(param) {
		return httpUtils.request(xm_host + "Api/UserMoney/deposit_activity", param)
	},

	//邀请好友	
	invite_friend(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmActivity/my_invite_friend", param)
	},

	//奖励记录	
	bonus_record_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmActivity/bonus_record_list", param)
	},

	//余额充值-下单
	deposit_add_order(param) {
		return httpUtils.request(xm_host + "Api/UserMoney/add_order", param)
	},

	//余额明细
	my_balance_info(param) {
		return httpUtils.request(xm_host + "Api/UserMoney/my_balance_info", param)
	},

	//获取直播列表
	get_camera_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/NongchangMarket/get_camera_list", param)
	},


	//删除选择今日蔬菜调取接口
	del_today_vegetable(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/del_today_vegetable", param)
	},

	//选择今日蔬菜调取接口
	choose_today_vegetable(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/choose_today_vegetable", param)
	},

	//确认选择蔬菜接口
	confirm_vegetable_choice(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/confirm_vegetable_choice", param)
	},

	//新人红包列表
	new_user_red_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmActivity/new_user_red_list", param)
	},

	//优惠券列表
	select_coupon_record(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmActivity/select_coupon_record", param)
	},

	//续费下单
	add_xufei_order(param) {
		return httpUtils.request(xm_host + "index.php/Api/Landowner/add_xufei_order", param)
	},

	//修改菜地名
	modify_user_nickname(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/modify_user_nickname", param)
	},

	modify_user_info: xm_host + "index.php/Api/Farm/modify_user_info", //修改用户信息


	//充值卡充值
	check_deposit_card(param) {
		return httpUtils.request(xm_host + "index.php/Api/UserMoney/check_deposit_card", param)
	},

	//获取送菜详情
	send_vegtable_detail(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmGarden/send_vegtable_detail", param)
	},

	//物流信息
	get_logistics(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/logistics", param)
	},


	//获取区域列表接口
	get_region_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/UserRegion/get_region_list", param)
	},

	//获取子区域列表接口
	get_sub_region_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/UserRegion/get_sub_region_list", param)
	},

	//设置用户区域
	set_user_region(param) {
		return httpUtils.request(xm_host + "index.php/Api/UserRegion/set_user_region", param)
	},

	//根据经纬度获取当前地区信息
	get_region(param) {
		return httpUtils.request(xm_host + "index.php/Api/UserRegion/get_region", param)
	},

	//根据经纬度获取当前地区信息
	get_region(param) {
		return httpUtils.request(xm_host + "index.php/Api/UserRegion/get_region", param)
	},

	//获取用户信息
	get_user_info(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm/get_user_info", param)
	},

	//获取当前赔付订单详情
	compensation_info(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmCompensation/compensation_info", param)
	},

	// 优鲜赔 >>售后申请列表
	get_apply_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmCompensation/get_apply_list", param)
	},

	// 优鲜赔 >>申请记录列表
	get_apply_compensation_list(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmCompensation/compensation_list", param)
	},

	//售后申请
	apply_compensation(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmCompensation/apply_compensation", param)
	},

	//优鲜赔 >>取消售后接口
	compensation_cancel(param) {
		return httpUtils.request(xm_host + "index.php/Api/FarmCompensation/compensation_cancel", param)
	},
	
	//收菜提交无图评价
	xcx_publish_comment(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm7/xcx_publish_comment", param)
	},
	
	//收蛋提交无图评价
	xcx_publish_chicken_comment(param) {
		return httpUtils.request(xm_host + "index.php/Api/Farm7/xcx_publish_chicken_comment", param)
	},
	
	
	 //上传图片
	 xcx_picture_upload: xm_host + "index.php/Api/Farm7/xcx_picture_upload", 
}

module.exports = xm_config;
