<template>
	<view>
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
				<block slot="backText">返回</block>
				<block slot="content">合约详情</block>
			</cu-custom>
		</view>
		<view class="cu-list menu sm-border padding" v-if="page_data.detail">
			<navigator class="cu-item " url="../account_security/security" open-type="navigate">
				<view class="content">
					<text class="text-black">合约名称</text>
				</view>
				<view class="action">
					<text class="text-grey">{{page_data.detail.title}}</text>
				</view>
			</navigator>
			<view class="cu-item" v-if="page_data.detail.merchant_info">
				<view class="content">
					<text class="text-black">签约方</text>
				</view>
				<view class="action">
					<text class="text-grey">{{page_data.detail.merchant_info.title}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>合约简介</view>
					<view class="text-gray text-sm">{{page_data.detail.hint}}</view>
				</view>
			</view>

			<navigator class="cu-item margin-top " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">周期</text>
				</view>
				<view class="action">
					<text class="text-grey">{{page_data.detail.sum}}期</text>
				</view>
			</navigator>
			<navigator class="cu-item" url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">每期指标</text>
				</view>
				<view class="action">
					<text class="text-grey">{{generate_task(page_data.detail)}} / {{generate_date(page_data.detail)}}</text>
				</view>
			</navigator>
			<navigator class="cu-item " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">每期收益</text>
				</view>
				<view class="action">
					<text class="text-red text-bold">{{page_data.detail.bonus}} 元</text>
				</view>
			</navigator>

			<!-- <view class="cu-item margin-top">
				<view class="content" style="text-align: center;">
					<text class="text-black">切换账号</text>
				</view>
			</view> -->
			<view class="cu-item margin-top" style="background-color: #e54d42;" @click="logOut">
				<view class="content" style="text-align: center;">
					<text class="text-white">确认签约</text>
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
				page_data: {
					detail: null
				}
			}
		},
		onLoad({ protocal_id }) {
			this.fetch_data(protocal_id)
		},
		mounted() {
			that = this;
		},
		methods: {
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
			async fetch_data(protocal_id) {
				await uni.request({
					url: 'http://localhost:824/yqb/protocal/get_detail', //仅为示例，并非真实接口地址。
					data: {
						protocal_id
					},
					header: {},
					success: ({
						data
					}) => {
						this.page_data.detail = data.data
					}
				})
			},
			logOut() {
				that.$store.dispatch("logout");
				that.$api.user.logout();

				that.back();
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
