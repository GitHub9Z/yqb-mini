<template>
	<view class="content">
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
			</cu-custom>
		</view>
		<view class="header" v-if="page_data.detail">
			<image class="header-bg bg-red"></image>
			<view class="header-top-Placeholder"></view>
			<view class="container storeInfo" :style="{height: '100px', width: '90vw', boxShadow: ''}">
				<image class="storeAvatar hx-shadow" style="width: 80px;"
					src="https://img1.baidu.com/it/u=2220543861,3867330206&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375"
					mode="aspectFill"></image>
				<view class="text-bold text-xxl" style="margin-bottom: 7px;">
					{{page_data.detail.title}}
				</view>
				<view class="text-grey" style="overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;">
					{{page_data.detail.hint}}
				</view>
				<!-- <view class="">
					后续再扩展优惠券，满减，折扣，活动等功能
				</view> -->
				<!-- 				<view class="shrink-box">
					<i class="hxicon" :class="showStoreBox ? 'icon-fold' : 'icon-unfold'" @click="showStoreBox = !showStoreBox"></i>
				</view> -->
			</view>
		</view>
		<view class="content-main VerticalBox" :style="{ 'padding-top': `0` }">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
				<view class="cu-item" style="display: flex; align-items: center; justify-content: center;">
					门店 <view class="cu-tag round bg-red sm" style="margin-left: 5px;">99+</view>
				</view>
				<view class="cu-item" :class="{ 'text-red': index==tabCur, 'cur': index==tabCur }"
					v-for="(group, index) in protocals" :key="index" @tap="TabSelect" :data-id="index">
					{{group.type}}
				</view>
			</scroll-view>
			<scroll-view class="content-main-content VerticalMain" scroll-y scroll-with-animation
				style="height:calc(100vh - 140upx)" :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="content-main-content-litem padding-bottom padding-lr" v-for="(group, index) in protocals"
					:key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-red"></text>{{group.type}}
						</view>
					</view>
					<view class="content-main-content-right cu-list menu-avatar">
						<navigator class="content-main-content-right-item" v-for="item in group.list" hover-class='none'
							:url="`/pages/topromise/topromise?protocal_id=${item.id}`" navigateTo>
							<view class="content-main-content-right-item-info">
								<view class="text-black">{{item.title}}</view>
								<view class="text-gray text-sm flex align-center">
									<view class='cu-tag bg-red sm' style="margin: 5px 5px 5px 0px; font-size: 10px;">
										{{generate_task(item)}}</view>
									<text class="cu-tag bg-gray sm">{{item.hot || 0}}人已签约</text>

								</view>
							</view>
							<view class="content-main-content-right-item-action">
								<view class="content-main-content-right-item-action-num text-red text-bold">
									{{item.bonus}}/{{generate_date(item)}}</view>
								<view class="cu-tag bg-yellow radius sm" style="padding: 3px 5px; margin: 3px 0;">
									立即签约
								</view>

							</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {

			return {
				page_data: {
					detail: null
				},
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad({
			merchant_id
		}) {
			this.fetchData(merchant_id)
		},
		onReady() {},
		computed: {
			...mapGetters(['get_system_info', 'get_user_info']),
			protocals() {
				let pool = []
				this.page_data.detail && this.page_data.detail.protocals?.forEach(_i => {
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
			async fetchData(merchant_id) {
				await uni.request({
					url: 'http://localhost:824/yqb/merchant/get_detail', //仅为示例，并非真实接口地址。
					data: {
						merchant_id
					},
					header: {},
					success: ({
						data
					}) => {
						this.page_data.detail = data.data
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
			height: 200px;
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

							.content-main-content-right-item-action-num {}
						}
					}
				}
			}
		}
	}

	.header {
		position: relative;
		min-height: 230px;

		&-bg {
			position: absolute;
			left: 0;
			top: 0;
			z-index: 2;
			width: 100%;
			height: 142px;
		}

		&-bg-black {
			position: absolute;
			left: 0;
			top: 142px;
			bottom: 0;
			z-index: 1;
			background-color: #ffffff;
			width: 100%;
			transition: background-color 0.2s;
		}

		&-bg-gray {
			position: absolute;
			left: 0;
			top: 142px;
			bottom: -16px;
			z-index: 1;
			background-color: #afafaf;
			width: 100%;
			transition: background-color 0.2s;
		}

		&-top-Placeholder {
			height: 105px;
		}

		.storeInfo {
			position: relative;
			z-index: 2;
			background: #ffffff;
			height: 100px;
			border-radius: 6px;
			padding: 12px;
			margin-bottom: 4px;
			transition: all 0.2s;
			left: 5vw;

			.shrink-box {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				text-align: center;
				font-size: 20px;
				color: #a2a8ab;
			}

			.storeAvatar {
				position: absolute;
				width: 50px;
				height: 50px;
				right: 16px;
				top: -25px;
				background: #ffffff;
				border-radius: 4px;

			}
		}
	}


	.fixed {
		position: fixed;
		z-index: 99;
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

	.hx-shadow {
		box-shadow: 0px 6upx 16upx rgba(173, 173, 173, 0.2);
	}
</style>
