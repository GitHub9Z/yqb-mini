<template>
	<view class="content">
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
				<block slot="backText">返回</block>
				<block slot="content">{{page_config.type_enum[page_status.type] || '发现'}}</block>
			</cu-custom>
			<view class="cu-bar bg-white search" style="width: 100vw;">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input v-model="page_status.key_word" :adjust-position="false" type="text" placeholder="请输入搜索关键词" confirm-type="search"></input>
				</view>
				<view class="action" @click="page_status.next_page = 0; handleSearchClick()">
					<!-- <text class="cuIcon-search"></text> -->
					<text>搜索</text>
				</view>
			</view>
		</view>

		<view class="content-main" :style="{ 'padding-top': `calc(${get_system_info.custom_bar}px + 130upx)` }">
			<template v-if="page_data.store_list.length > 0">
				<Merchant :store="store" v-for="(store, i) in page_data.store_list" :key="i"></Merchant>
				<view class="foot" v-if="page_status.no_more">
					<text>更多商家加入中，敬请期待 </text>
				</view>
			</template>
			<empty text="暂无符合条件的商家" v-else></empty>
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
	import Empty from '../../components/empty.vue'
	import Merchant from '../../components/merchant.vue'
	import testData from "@/common/testdata.js";

	export default {
		components: {
			Empty,
			Merchant
		},
		data() {
			return {
				page_config: {
					page_size: 5,
					type_enum: {
						1: '餐饮',
						2: '娱乐',
						3: '日用',
						4: '出行',
						5: '服装',
						6: '运动'
					}
				},
				page_status: {
					key_word: '',
					next_page: 0,
					no_more: false
				},
				page_data: {
					store_list: []
				}
			}
		},
		onLoad({
			type
		}) {
			this.page_status.type = type
		},
		onPullDownRefresh() {
			this.page_status.next_page = 0
			console.log('--------下拉刷新-------')
			uni.showNavigationBarLoading() //在标题栏中显示加载
			uni.stopPullDownRefresh()
			this.handleSearchClick()
		},
		onReachBottom() {
			console.log('--------上滑更多-------')
			uni.showNavigationBarLoading() //在标题栏中显示加载
			this.handleSearchClick()
		},
		onShow() {
			this.page_status.next_page = 0
			this.handleSearchClick()
		},
		onReady() {
			uni.hideLoading()
		},
		computed: {
			...mapGetters(['get_system_info', 'get_user_info']),
		},
		methods: {
			handleSearchClick() {
				if (this.page_status.next_page === 0) {
					this.page_data.store_list = []
				}
				uni.request({
					url: 'https://www.imgker.com/yqb/merchant/get_list', //仅为示例，并非真实接口地址。
					data: {
						keyword: this.page_status.key_word,
						type: this.page_status.type,
						pageNo: this.page_status.next_page,
						pageSize: this.page_config.page_size
					},
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: ({ data }) => {
						if (data.data.count === this.page_config.page_size) {
							this.page_status.next_page ++
						} else {
							this.page_status.no_more = true
						}
						this.page_data.store_list = [
							...this.page_data.store_list,
							...data.data.data.filter(_i => this.page_data.store_list.every(__i => __i.id !== _i.id))
						]
					}
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.content {
		.content-head {
			.content-head-console {
				display: flex;
				align-items: center;
				padding: 10px;
				background-color: white;
				font-size: 14px;
				color: #606266;
				border-top: 1px solid #ebebeb;
				text-align: center;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

				.content-head-console-sort {
					flex: 1;
					border-right: 1px solid #ebebeb;
				}

				.content-head-console-age {
					flex: 1;
					border-right: 1px solid #ebebeb;
				}

				.content-head-console-cond {
					flex: 1
				}
			}
		}

		.content-main {
			overflow: hidden;
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
	.foot {
		position: relative;
		display: flex;
		justify-content: center;
		margin-top: 36px;
		margin-bottom: 50px;
	
		text {
			font-size: 14px;
			position: relative;
			z-index: 2;
			height: 20px;
			line-height: 20px;
			color: #cccccc;
			padding: 0 12px;
		}
	}
	
	.foot::before {
		content: "";
		z-index: 1;
		display: block;
		position: absolute;
		top: 50%;
		height: 0;
		width: 100%;
		transform: scaleY(0.5);
		border-bottom: 1px solid #E4E7ED;
	}
	
</style>
