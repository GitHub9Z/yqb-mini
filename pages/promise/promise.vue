<template>
	<view class="content">
		<template v-if="page_data.promise_list.length">
		<view class="content-board bg-red">
			<view class="content-board-title">本月预计收益</view>
			<view class="content-board-main">{{page_data.promise_bonus}}</view>
			<navigator class="content-board-btn" url="/pages/user/wallet/index" navigateTo>我的钱包</navigator>
		</view>
		<view class="content-main VerticalBox" :style="{ 'padding-top': `15px` }">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
				<view class="cu-item" :class="{ 'text-red': index==tabCur, 'cur': (index==tabCur && promises.length > 1) }"
				 v-for="(group, index) in promises" :key="index" @tap="TabSelect" :data-id="index">
					{{group.type}}
				</view>
			</scroll-view>
			<scroll-view class="content-main-content VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 315px)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="content-main-content-litem padding-bottom padding-lr" v-for="(group, index) in promises" :key="index"
				 :id="'main-'+index">
				 
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-red"></text>{{group.type}}</view>
					</view>
					<view class="content-main-content-right cu-list menu-avatar">
						<navigator class="content-main-content-right-item" style="position: relative;"  v-for="promise in group.list"
						 hover-class='none' :url="`/pages/finishpromise/finishpromise?promise_id=${promise.id}`" navigateTo>
							<image src="../../static/img/finish.png" mode="aspectFit" style="position: absolute; height: 100%; width: 70%; right: 0; transform: rotateZ(30deg); filter:grayscale(100%); bottom: 0px; opacity: .2;" v-if="promise.status === 3">
							
							<view class="content-main-content-right-item-info">
								<view class="text-black">{{promise.protocal.title}}</view>
								<view class="text-gray text-sm flex align-center">
										<text class="cu-tag bg-gray sm" style="border: 1px solid #e54d42; border-top-left-radius: 3px; border-bottom-left-radius: 3px;">{{promise.merchant.title}}</text>
										<view class='cu-tag bg-red sm' style="border-top-right-radius: 3px; border-bottom-right-radius: 3px; margin: 5px 5px 5px 0px; font-size: 10px;">{{generate_task(promise.protocal)}}</view>
										
									</view>
							</view>
							<view class="content-main-content-right-item-action">
								<view class="content-main-content-right-item-action-num text-gray">{{promise.protocal.bonus}}/{{generate_date(promise.protocal)}}</view>
								<view class="text-grey text-xs" style="padding: 3px 0;">
									<text style="font-size: 12px;" class="lg text-red cuIcon-radioboxfill" v-for="i in Number(promise.rate)"></text>
									<text style="font-size: 12px; opacity: .5;" class="lg text-gray cuIcon-radioboxfill" v-for="i in (5 - Number(promise.rate))"></text>
								</view>
							</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
		</template>
		<empty text="暂未签订合约哦" v-else></empty>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import Empty from '../../components/empty.vue'
	export default {
		components: {
			Empty
		},
		data() {
		
			return {
				page_config: {
					type_enum: {
						1: '餐饮',
						2: '娱乐',
						3: '日用',
						4: '出行',
						5: '服装',
						6: '运动'
					}
				},
				page_data: {
					promise_list: [],
					promise_bonus: '0.00'
				},
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onShow() {
			this.fetchData()
		},
		onReady() {},
		computed: {
			...mapGetters(['get_system_info', 'get_user_info']),
			promises() {
				let pool = []
				this.page_data.promise_list?.forEach(_i => {
					_i.type = this.page_config.type_enum[_i.merchant.type]
					_i.rate = Math.round(5 * (_i.finish_num || 0) / _i.protocal.task_num)
					if (_i.rate > 5) _i.rate = 5
					let group = pool.find(__i => __i.type === _i.type)
					if (group) {
						group.list.push(_i)
					} else {
						pool.push({
							type: _i.type,
							list: [_i]
						})
					}
				})
				return pool
			}
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
			fetchData(merchant_id) {
				uni.request({
					url: 'https://www.imgker.com/yqb/promise/get_user_promises', //仅为示例，并非真实接口地址。
					data: {
					},
					header: {},
					success: ({
						data
					}) => {
						this.page_data.promise_list = data.data
					}
				})
				uni.request({
					url: 'https://www.imgker.com/yqb/promise/get_bonus', //仅为示例，并非真实接口地址。
					data: {
					},
					header: {},
					success: ({
						data
					}) => {
						this.page_data.promise_bonus = new Number(data.data).toFixed(2)
					}
				})
			},
			getOwnByCoinId(coin_id) {
				return this.page_data.hold_data.filter(_i => _i.coin_id === coin_id).length
			},
			TabSelect(e) {
				console.log('e.currentTarget.dataset.id:', e.currentTarget.dataset.id)
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	.locked {
		-webkit-filter: grayscale(60%);
		opacity: 0.5;
	}

	.content {
		.content-head {}
		.content-board {
			height: 300px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.content-board-title {
				margin-top: 30px;
				font-size: 12px;
			}
			.content-board-main {
				padding: 0;
				font-size: 42px;
				font-weight: 500;
			}
			.content-board-btn {
				margin-top: 10px;
				padding: 5px 15px;
				background-color: #fc5348;
				font-size: 14px;
				border-radius: 40px;
			}
		}
		.content-main {
			padding-top: 60px;
			overflow: hidden;

			.content-main-content {
				.content-main-content-right {
					.content-main-content-right-item {
						display: flex;
						align-items: center;
						background-color: white;
						padding: 5px 10px;
						border-bottom: 1px solid rgba(0, 0, 0, 0.05);

						.content-main-content-right-item-head {
							height: 40px;
							width: 40px;
							min-width: 40px;
							border-radius: 50%;
							background-size: 100%;
							border: 1px solid #DCDFE6;
						}

						.content-main-content-right-item-info {
							flex: 1;
							padding: 10px;
						}

						.content-main-content-right-item-action {
							display: flex;
							flex-direction: column;
							align-items: flex-end;

							.content-main-content-right-item-action-num {
							}
						}
					}
				}
			}
		}
	}


	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		line-height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
