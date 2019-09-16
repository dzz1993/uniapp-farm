import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

//引入全局项目配置文件
import xm_config from "xm_config.js";
Vue.prototype.xm_config = xm_config;

//引入全局utils文件
import utils from "./common/commonUtils.js";
Vue.prototype.utils = utils;

//引入图片资源目录
import xm_page_img from "./static/xm_page_img.js";
Vue.prototype.xm_page_img = xm_page_img;

//项目全局变量js文件(目前没有找到更好的兼容处理方式，暂时使用这种方式进行处理)
import globalData from "./xm_global_data.js";
Vue.prototype.globalData = globalData;

const app = new Vue({
    ...App
})
app.$mount()
