<template>
	<view>
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
				<block slot="backText">返回</block>
				<block slot="content">核销券码</block>
			</cu-custom>
		</view>
		<view class="cu-list menu sm-border padding">
			<view class="cu-item" v-if="page_data.voucher">
				<view class="content">
					<text class="text-black">券码</text>
				</view>
				<view class="action">
					<text class="text-grey">{{page_data.voucher.id}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="page_data.protocal">
				<view class="content">
					<text class="text-black">合约名称</text>
				</view>
				<view class="action">
					<text class="text-grey">{{page_data.protocal.title}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="page_data.voucher">
				<view class="content">
					<text class="text-black">完成指标</text>
				</view>
				<text class="text-grey" v-if="page_data.protocal">{{generate_task({
					task_num: page_data.voucher.task_num[page_data.protocal.task_type],
					task_type: page_data.protocal.task_type
				})}}</text>

			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">核销门店</text>
				</view>
				<view class="action">
					<text class="text-grey"></text>
				</view>
			</view>
			<view class="cu-item margin-top" style="background-color: #e54d42;" @click="handleConfirm">
				<view class="content" style="text-align: center;">
					<text class="text-white">确认</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		data() {
			return {
				page_config: {
					status_enum: {
						1: {
							label: '未开始',
							color: 'grey'
						},
						2: {
							label: '进行中',
							color: 'blue'
						},
						3: {
							label: '已完成',
							color: 'green'
						},
						4: {
							label: '已违约',
							color: 'red'
						},
						5: {
							label: '已解约',
							color: 'black'
						}
					}
				},
				page_status: {
					from: 'normal'
				},
				page_data: {
					protocal: null,
					voucher: null
				}
			}
		},
		onLoad({
			protocal_id,
			voucher_id
		}) {
			this.fetch_data({
				protocal_id,
				voucher_id
			})
		},
		mounted() {},
		methods: {
			generateRate(promise) {
				if (promise.finish_num) {
					let rate = Math.round(100 * promise.finish_num / promise.protocal.task_num)
					if (rate >= 20) {
						return Math.round(100 * promise.finish_num / promise.protocal.task_num) + '%'
					} else {
						return ''
					}
				} else {
					return ''
				}
			},
			generate_date({
				time
			}) {
				if (!(time % 365)) {
					return ((time / 365 === 1 ? '' : time / 365) + '年')
				}
				if (!(time % 30)) {
					return ((time / 30 === 1 ? '' : time / 30) + '月')
				}
				if (!(time % 7)) {
					return ((time / 7 === 1 ? '' : time / 7) + '周')
				}
				return (time === 1 ? '' : time) + '天'
			},
			generate_task(record) {
				const generate_time = (time) => {
					let res = ''
					// 转换为式分秒
					let h = time / 60 / 60 % 24
					if (h) {
						res += (h + '小时')
					}
					let m = time / 60 % 60
					if (m) {
						res += (m + '分钟')
					}
					let s = time % 60
					if (s) {
						res += (s + '秒')
					}
					// 作为返回值返回
					return res
				}
				switch (record.task_type) {
					case 1: {
						return `${record.task_num}次`
						break
					}
					case 2: {
						return `${record.task_num}元`
						break
					}
					case 3: {
						return `${generate_time(record.task_num)}`
						break
					}
				}

			},
			async fetch_data({
				protocal_id,
				voucher_id
			}) {
				uni.request({
					url: 'https://www.imgker.com/yqb/voucher/get_detail', //仅为示例，并非真实接口地址。
					data: {
						voucher_id
					},
					header: {},
					success: ({
						data
					}) => {
						data.data.task_num = JSON.parse(data.data.task_num)
						this.page_data.voucher = data.data
					}
				})
				uni.request({
					url: 'https://www.imgker.com/yqb/protocal/get_detail', //仅为示例，并非真实接口地址。
					data: {
						protocal_id
					},
					header: {},
					success: ({
						data
					}) => {
						this.page_data.protocal = data.data
					}
				})
			},
			handleConfirm() {
				uni.request({
					url: 'https://www.imgker.com/yqb/voucher/use', //仅为示例，并非真实接口地址。
					data: {
						protocal_id: this.page_data.protocal.id,
						voucher_id: this.page_data.voucher.id
					},
					header: {},
					success: ({
						data
					}) => {
						if (data.success) {
							uni.navigateBack()
							setTimeout(() => {
								uni.showToast({
									title: '核销成功',
									duration: 2000
								});
							}, 100)
						}
					}
				})
			},
			back() {
				uni.redirectTo({
					url: '/pages/user/login/login'
				});
			}
		}
	}
</script>

<style>

</style>
