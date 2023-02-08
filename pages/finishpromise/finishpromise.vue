<template>
	<view>
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
				<block slot="backText">返回</block>
				<block slot="content">本期合约</block>
				<block slot="right" v-if="page_data.detail && page_status.from === 'normal'"><navigator style="padding: 0 10px;" :url="`/pages/listpromise/listpromise?protocal_id=${page_data.detail.protocal.id}`" open-type="navigate">查看更多</navigator></block>
			</cu-custom>
		</view>
		<view class="cu-list menu sm-border padding" v-if="page_data.detail">
			
			<navigator class="cu-item " url="../account_security/security" open-type="navigate">
				<view class="content">
					<text class="text-black">合约名称</text>
				</view>
				<view class="action">
					<text class="text-grey">{{page_data.detail.protocal.title}}</text>
				</view>
			</navigator>
<!-- 			<navigator class="cu-item" url="../account_security/security" open-type="navigate">
				<view class="content">
					<text class="text-black">合约编号</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">{{page_data.detail.id}}</text>
				</view>
			</navigator> -->
			<view class="cu-item">
				<view class="content">
					<text class="text-black">状态</text>
				</view>
				<view class="action">
					<text class="cuIcon-title" :class="'text-' + page_config.status_enum[page_data.detail.status || 1].color"></text> <text class="text-grey">{{page_config.status_enum[page_data.detail.status || 1].label}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">签约方</text>
				</view>
				<view class="action">
					<text class="text-grey">{{page_data.detail.merchant.title}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>合约简介</view>
					<view class="text-gray text-sm">{{page_data.detail.protocal.hint}}</view>
				</view>
			</view>
			<navigator class="cu-item margin-top" url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">指标</text>
				</view>
				<view class="action">
					<text class="text-grey">{{generate_task(page_data.detail.protocal)}}</text>
				</view>
			</navigator>
			<navigator class="cu-item " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">收益</text>
				</view>
				<view class="action">
					<text class="cuIcon-title text-red"></text><text class="text-grey">{{page_data.detail.protocal.bonus}} 元</text>
				</view>
			</navigator>
			<navigator class="cu-item " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">截止时间</text>
				</view>
				<view class="action">
					<text class="text-grey">{{new Date(page_data.detail.end_time).toLocaleString()}}</text>
				</view>
			</navigator>

			<navigator class="cu-item " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">违约金</text>
				</view>
				<view class="action">
					<text class="text-grey">100信用分</text>
				</view>
			</navigator>

			<navigator class="cu-item margin-top " url="../../base/about" open-type="navigate" v-if="page_data.detail.status !== 3">
				<view class="content">
					<text class="text-black">进度</text>
				</view>
				<view class="action">
					<view class="cu-progress radius sm striped active" style="height: 15px; width: 50vw;">
						<view class="bg-red" :style="[{ width: `${100 * page_data.detail.finish_num / page_data.detail.protocal.task_num}%` }]">{{generateRate(page_data.detail)}}</view>
					</view>
				</view>
			</navigator>

			<!-- <view class="cu-item margin-top">
				<view class="content" style="text-align: center;">
					<text class="text-black">切换账号</text>
				</view>
			</view> -->
			<view class="cu-item margin-top" style="background-color: #e54d42;" v-if="page_data.detail.status === 3">
				<view class="content" style="text-align: center;">
					<text class="text-white">已完成<text class="cuIcon-check" style="margin-left: 6px"/></text>
				</view>
			</view>
			<view class="cu-item margin-top" style="background-color: #e54d42;" v-else @click="handleScan">
				<view class="content" style="text-align: center;">
					<text class="text-white">核销券码<text class="cuIcon-scan" style="margin-left: 6px"/></text>
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
					detail: null
				}
			}
		},
		onLoad({
			promise_id,
			from = 'normal'
		}) {
			this.page_status.from = from
			this.fetch_data(promise_id)
		},
		onShow() {
			if (this.page_data.detail) this.fetch_data(this.page_data.detail.id)
		},
		mounted() {
		},
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
						return `消费满${record.task_num}次`
						break
					}
					case 2: {
						return `消费满${record.task_num}元`
						break
					}
					case 3: {
						return `消费满${generate_time(record.task_num)}`
						break
					}
				}
			
			},
			async fetch_data(promise_id) {
				await uni.request({
					url: 'https://www.imgker.com/yqb/promise/get_detail', //仅为示例，并非真实接口地址。
					data: {
						promise_id
					},
					header: {},
					success: ({
						data
					}) => {
						this.page_data.detail = data.data
					}
				})
			},
			handleScan() {
				uni.navigateTo({
					url: `/pages/voucher/voucher?voucher_id=K4XTwnxCyxMtKKTJJ8YPjBswa56hTywH&protocal_id=${this.page_data.detail.protocal.id}`
				});
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
