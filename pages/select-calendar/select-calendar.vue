<template>
	<view>
		<view class='top-des'>
			<view class='head-week'>
				<view class='head-week-item'>日</view>
				<view class='head-week-item'>一</view>
				<view class='head-week-item'>二</view>
				<view class='head-week-item'>三</view>
				<view class='head-week-item'>四</view>
				<view class='head-week-item'>五</view>
				<view class='head-week-item'>六</view>
			</view>

			<view class='send-time-des'>
				{{textDes}}
			</view>
		</view>
		<view class='month-container'>
			<view v-for="(item,index) in date" :key="index">
				<view class="monthhead">{{item[0].year}}年{{item[0].month}}月</view>
				<view class="daybox">
					<view class="day" v-if="weeks[index]>0"></view>
					<view class="day" v-if="weeks[index]>1"></view>
					<view class="day" v-if="weeks[index]>2"></view>
					<view class="day" v-if="weeks[index]>3"></view>
					<view class="day" v-if="weeks[index]>4"></view>
					<view class="day" v-if="weeks[index]>5"></view>
					<view class="day" v-for="(item1,index1) in item" :key="index1"  @click="selectday(index,index1,item)">

						<view class='bc'>
							<text :class="[item1.selected == 1 ? 'select':'']">{{item[index1].day}}</text>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textDes: '',
				start_time: '',
				close_time: '',
				date:'',
				weeks:''
				
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var param = options.param;
			if (param) {
				var param = JSON.parse(param);
				var textDes = param.text_dex;
				var start_time = param.start_time + ""
				var close_time = param.close_time + ""


				this.textDes = textDes;
				this.start_time = start_time;
				this.close_time = close_time;
			}
			this.setDateTimeData();
		},

		methods: {
			setDateTimeData: function() {

				let year = (this.start_time + "").substring(0, 4)
				let month = (this.start_time + "").substring(5, 7);
				let day = (this.start_time + "").substring(8, 10)

				year = parseFloat(year);
				month = parseFloat(month);
				day = parseFloat(day);

				var endYear = (this.close_time + "").substring(0, 4);
				var endMonth = (this.close_time + "").substring(5, 7);
				var endDay = (this.close_time + "").substring(8, 10);

				endYear = parseFloat(endYear);
				endMonth = parseFloat(endMonth);
				endDay = parseFloat(endDay);

				let dataAll = [] //总日历数据
				let dataAll2 = [] //总日历数据
				let dataMonth = [] //月日历数据
				let weeks = []

				var yearList = []; //展示年份
				for (var i = 0; i < (endYear - year) + 1; i++) {
					yearList.push(parseFloat(year) + i)
				}



				let leapYear = function(Year) { //判断是否闰年 
					if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
						return (true);
					} else {
						return (false);
					}
				}

				var monthList = []; //需要展示的月份
				for (let i = 0; i < yearList.length; i++) { //遍历年
					//当等于当前年时
					if (yearList.length == 1) {
						for (let j = month; j < endMonth + 1; j++) {
							monthList.push(j)
						}
					} else if (yearList[i] == year) {
						monthList = []
						for (let j = month; j < 13; j++) {
							monthList.push(j)
						}
					} else if (yearList[i] == endYear) {
						monthList = []
						for (let j = 1; j < endMonth + 1; j++) {
							monthList.push(j)
						}
					} else {
						monthList = []
						for (let j = 1; j < 13; j++) {
							monthList.push(j)
						}
					}
					let mList = monthList
					for (let m = 0; m < mList.length; m++) { //循环月份
						dataMonth = []
						let t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
						let t_days_thisYear = []
						if (yearList[i] == year) {
							for (let m = 0; m < mList.length; m++) {
								t_days_thisYear.push(t_days[mList[m] - 1])
							}
							t_days = t_days_thisYear
						} else {
							t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
						}
						for (let k = 0; k < t_days[m]; k++) { //循环每天
							let days = k + 1
							if (year == endYear && month == endMonth) {
								if (k + 1 >= day && k + 1 <= endDay) {
									var nowData = {
										year: yearList[i],
										month: mList[m],
										day: k + 1,
										date: yearList[i] + "" + mList[m] + days,
										selected: 0,
										re: yearList[i] + "-" + mList[m] + "-" + days,
									}
									dataMonth.push(nowData)
									if (k + 1 == day) {
										let date = new Date(yearList[i] + "/" + mList[m] + "/" + (k + 1))
										let weekss = date.getDay() //获取每个月第一天是周几
										weeks.push(weekss)
									}
								}

							} else if (yearList[i] == year && mList[m] == month) { //判断当年当月
								if (k + 1 >= day) {
									var nowData = {
										year: yearList[i],
										month: mList[m],
										day: k + 1,
										date: yearList[i] + "" + mList[m] + days,
										selected: 0,
										re: yearList[i] + "-" + mList[m] + "-" + days,
									}
									dataMonth.push(nowData)
									if (k + 1 == day) {
										let date = new Date(yearList[i] + "/" + mList[m] + "/" + (k + 1))
										let weekss = date.getDay() //获取每个月第一天是周几
										weeks.push(weekss)
									}
								}
							} else if (yearList[i] == endYear && mList[m] == endMonth) {
								if (k + 1 <= endDay) {
									var nowData = {
										year: yearList[i],
										month: mList[m],
										day: k + 1,
										date: yearList[i] + "" + mList[m] + days,
										selected: 0,
										re: yearList[i] + "-" + mList[m] + "-" + days,
									}
									dataMonth.push(nowData)
									if (k == 0) {
										let date = new Date(yearList[i] + "/" + mList[m] + "/" + k + 1)
										let weekss = date.getDay() //获取每个月第一天是周几
										weeks.push(weekss)
									}
								}

							} else { //其他情况
								var nowData = { //组装自己需要的数据
									year: yearList[i],
									month: mList[m],
									day: k + 1,
									date: yearList[i] + "" + mList[m] + days,
									selected: 0,
									re: yearList[i] + "-" + mList[m] + "-" + days,
								}
								dataMonth.push(nowData)
								if (k == 0) {
									let date = new Date(yearList[i] + "/" + mList[m] + "/" + k + 1)
									let weekss = date.getDay() //获取每个月第一天是周几
									weeks.push(weekss)
								}
							}
						}
						dataAll.push(dataMonth)
					}
				}

				for (let i = 0; i < dataAll.length; i++) {
					if (dataAll[i].length != 0) {
						dataAll2.push(dataAll[i]);
					}
				}
				if (dataAll2.length != 0) {
					dataAll2[0][0].selected = 1;
				} 

				this.date = dataAll2;
				this.weeks = weeks
				
				console.log(this.date);
			},

			selectday: function(index,index1,item) {
				var indexs = index1;
				var index = index;

				var item = item;
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				var item = this.date[index][indexs]

				var dec = item;

				var date = this.date;
				//刷新UI
				for (var i = 0; i < date.length; i++) {
					for (var j = 0; j < date[i].length; j++) {
						if (item.date == date[i][j].date) {
							date[i][j].selected = 1;
						} else {
							date[i][j].selected = 0;
						}
					}
				}

				this.date = date;

				uni.showModal({
					title: '温馨提示',
					content: "本次修改只影响当次收货时间，如需整体顺延请联系在线客服操作。是否确认修改？",
					showCancel: true,
					complete: function(res) {
						if (res.confirm) {
							prevPage.$vm.setSendTime(item);

						} else {

						}
					}
				})

			}
		}
	}
</script>

<style>
	.head-week {
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #fff;
		height: 70rpx;
		border-bottom: 1rpx solid #f8f8f8;

	}

	.head-week-item {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	.top-des {
		position: fixed;
		width: 100%;
		z-index: 99;
	}

	.send-time-des {
		color: #f00;
		font-size: 28rpx;
		height: 70rpx;
		background: #fff;
		line-height: 70rpx;
		padding: 0 20rpx;
		border-bottom: 1rpx solid #f8f8f8;
	}

	.monthhead {
		height: 88rpx;
		background-color: #f4f4f4;
		width: 100%;
		line-height: 88rpx;
		text-align: center;
	}

	.month-container {
		padding-top: 140rpx;
	}

	.daybox {
		background-color: white;
	}

	.day {
		color: #353535;
		font-size: 34rpx;
		flex: 1;
		width: 107rpx;
		height: 107rpx;
		line-height: 107rpx;
		text-align: center;
		display: inline-block;
		overflow: hidden;
	}

	.bc {
		background: #fff;
		border-radius: 10rpx;
		width: 107rpx;
		height: 107rpx;
		line-height: 107rpx;
		align-items: center;
		display: flex;
		text-align: center;
		justify-content: center;
	}

	.display {
		visibility: hidden;
	}

	.select {
		background: #f00;
		border-radius: 10rpx;
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		align-items: center;
		display: flex;
		text-align: center;
		justify-content: center;
		color: #fff;
	}
</style>
