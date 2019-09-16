<template>
	<view>
		<view class="heng">运单号：{{num}}</view>
<view class="titt">本数据由
  <text>{{express_name_text}}</text>提供
</view>
<view class="progress">
  <block v-for="(item,index) in traces" :key="index" >
    <view class="qu" :class="[index==0?'active':'']">
      <view class="station">{{item.AcceptStation}}</view>
      <view class="time">{{item.AcceptTime}}</view>
    </view>
  </block>
</view>
<view class="none">{{info}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				traces:'',
				name:'',
				num:'',
				express_name_text:'',
				info:''
			}
		},
		
		/**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var b= options.name;
    var c= options.num;
    var express_name_text = options.name_text;
    if (!express_name_text){
      express_name_text = "奥一农场"
    }

    if (c == "null") {
      c = "暂无"
    }
    this.name = b;
    this.num = c;
    this.express_name_text = express_name_text;
    this.get_logistics(b, c) 
  },
		methods: {
			//获取物流信息接口
  get_logistics(b,c) {
	
	var that = this;
	var param = {
		com:b,
		nu:c
	}
	this.xm_config.get_logistics()
		.then(function(res) {
			if (res.data.status == 1) {
				if (res.data.info != null && res.data.info.info != null && res.data.info.info.length != 0) {
        if (res.data.info.info.Traces.length!=0){
          var reverseTrace = res.data.info.info.Traces.reverse();
          taht.traces = reverseTrace;
        }else{
          that.info = '--暂无物流信息--'
        }
		}
        
	
			} else {
				uni.showToast({
					title: res.data.msg,
					icon: "none"
				})
			}
		});
  },
		}
	}
</script>

<style>
.heng{
  border-bottom:1px solid #efefef;
  padding:10rpx 20rpx;
  font-size: 30rpx;
  font-weight: 300;
}
.titt{
  padding:10rpx 20rpx;
  font-size: 28rpx;
  font-weight: 300;
}
.titt text{
  color:#85DFA3;
  margin:0 10rpx;
}
.progress{
  padding-left: 80rpx;
  font-size: 26rpx;
  font-weight: 300;
  color:#666;
}
.qu{
  border-left:1px solid #eee;
  padding:20rpx 35rpx;
  border-bottom:1px solid #efefef;
  position: relative;
}

.qu::before{
  position: absolute;
  top:50%;
  left:-12rpx;
  margin-top: -12rpx;
  content: "";
  width:24rpx;
  height:24rpx;
  border-radius: 12rpx;
  background-color:#eee;
}
.qu.active{
  color:#fc8b28;
  font-weight: 300;
}
.qu.active::before{
  width:20rpx;
  height:20rpx;
  background-color:#FF7101;
  box-shadow: 0 0 0rpx 6rpx #fcaa62;
}
.none{
  font-size: 26rpx;
  font-weight: 300;
  color:#666;
  text-align: center;
  margin-top: 40rpx;
}
</style>
