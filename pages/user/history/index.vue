<template>
	<view class="content">
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
				<block slot="backText">取消</block>
				<block slot="content">收益明细</block>
			</cu-custom>
		</view>
		<picker mode="multiSelector" @change="handleMultiPickerChange"
			:value="page_status.multiIndex" :range="page_status.multiArray">

			<view class="content-bar">
				<view class="content-bar-picker text-black">
					{{year}}年{{month}}月<image src="../../../static/img/down.png">
				</view>
			</view>
		</picker>
		<view class="content-list" v-if="page_data.history_list.length">
			<view class="cu-list menu-avatar">
				<view class="cu-item" style="padding: 45px 0px;" v-for="item in page_data.history_list">
					<view class="cu-avatar round lg bg-white"
						style="background-image:url(../../../static/img/withdraw.png); ">
					</view>
					<view class="content" style="margin-left: 10px;">
						<view class="" style="margin: 2px 0;">余额提现-到微信钱包</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{formatTime(item.update_time)}}
							</view>
						</view>
					</view>
					<view class="action" style="text-align: right; width: 200px; padding-right: 15px;">
						<view class="text-bold" style="font-size: 18px; margin-bottom: 2px; display: flex; align-items: center; justify-content: flex-end;" v-if="item.money"><text class="text-red text-sm" style="font-weight: normal; margin-right: 10px;">待审核</text>-{{item.money}}.00</view>
						<view class="text-gray text-sm">钱包余额 {{formatRest(item)}}</view>
					</view>
				</view>
			</view>
		</view>
		<empty text="没有该月的账单" v-else></empty>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	import Empty from '../../../components/empty.vue'
	
	export default {
		components:{
			Empty
		},
		data() {
			return {
				page_status: {
					multiIndex: [0, new Date().getMonth()],
					multiArray: [
						Array.from(Array( new Date().getFullYear() - 1970 + 1 )).map(( e, i ) => 1970 + i).reverse(),
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
					],
				},
				page_data: {
					history_list: []
				}
			};
		},
		watch: {},
		onShow() {
			this.fethcData()
		},
		computed: {
			year() {
				return this.page_status.multiArray[0][this.page_status.multiIndex[0]]
			},
			month() {
				return this.page_status.multiArray[1][this.page_status.multiIndex[1]]
			},
			start_time() {
				return new Date(`${this.year}-${this.month}-1`).valueOf()
			},
			end_time() {
				return new Date(`${this.year}-${this.month}-1`).valueOf() + (this.days * 86400000)
			},
			days() {
				let year = this.year
				switch (this.month) {
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						return 31
						break;
					case 2:
						if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
							return 29
						} else {
							return 28
						}
						break;
					case 4:
					case 6:
					case 9:
					case 11:
						return 30
						break;
				}
			}
		},
		methods: {
			formatRest(item) {
				if (!item.json) return '未知'
				return new Number(JSON.parse(item.json).rest || 0).toFixed(2)
			},
			formatTime(time) {
				let _l = new Date(time).toLocaleString().split('/')
				_l.shift()
				return _l.join('月').split(' ').join('日 ')
			},
			handleMultiPickerChange(e) {
				this.page_status.multiIndex = e.detail.value
				this.fethcData()
			},
			fethcData() {
				uni.request({
					url: 'https://www.imgker.com/yqb/history/get_user_history', //仅为示例，并非真实接口地址。
					data: {
						start_time: this.start_time,
						end_time: this.end_time
					},
					header: {},
					success: ({
						data
					}) => {
						this.page_data.history_list = data?.data
					}
				})
			},
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		.content-bar {
			padding: 15px 20px;

			.content-bar-picker {
				display: flex;
				align-items: center;
				font-size: 16px;
				opacity: .8;

				image {
					margin-left: 3px;
					height: 16px;
					width: 16px;
				}
			}
		}
	}
</style>
