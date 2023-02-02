<template>
	<view class="content">
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
				<block slot="backText">返回</block>
				<block slot="content">{{page_data.admin_info.user_name || '发现'}}</block>
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
					color_config: ['red', 'orange', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve', 'pink', 'brown',
						'grey', 'gray'
					],
				},
				page_status: {
					key_word: '',
					next_page: 0,
					stature_sort: true,
					age_sort: true
				},
				page_data: {
					store_list: [],
					user_list: [],
					admin_info: {},
					doing: 'list'
				}
			}
		},
		onLoad({
			invite_id
		}) {
			this.page_data.store_list = testData.storeList;
			console.log('尼玛', this.get_system_info)
		},
		onPullDownRefresh() {
			this.page_status.next_page = 0
			console.log('--------下拉刷新-------')
			uni.showNavigationBarLoading() //在标题栏中显示加载
			uni.stopPullDownRefresh()
			if (this.page_status.invite_id) this.fetchAdminInfo()
			this.handleSearchClick()
		},
		onReachBottom() {
			console.log('--------上滑更多-------')
			uni.showNavigationBarLoading() //在标题栏中显示加载
			this.handleSearchClick()
		},
		onShow() {
			if (this.page_status.doing === 'detail') {
				this.page_status.doing = 'list'
				return
			}
			this.page_status.next_page = 0
			if (this.page_status.invite_id) this.fetchAdminInfo()
			this.handleSearchClick()
		},
		onReady() {
			uni.hideLoading()
		},
		computed: {
			...mapGetters(['get_system_info', 'get_user_info', 'get_find_condition']),
			condition_num() {
				console.log('heihe', this.get_find_condition)
				let num = 0
				let _c = this.get_find_condition
				if (_c.genderIndex > 0) num++
				if (_c.educationIndex > 0) num++
				if (_c.marriageIndex > 0) num++
				if (_c.ageMultiIndex && (_c.ageMultiIndex[0] != 0 || _c.ageMultiIndex[1] != 0)) num++
				if (_c.statureMultiIndex && (_c.statureMultiIndex[0] != 0 || _c.statureMultiIndex[1] != 0)) num++
				if (_c.bornPool && _c.bornPool.length > 0) num++
				if (_c.livePool && _c.livePool.length > 0) num++
				return num
			}
		},
		methods: {
			fetchAdminInfo() {
				uni.request({
					url: 'https://www.imgker.com/venus/user/get_admin_info', //仅为示例，并非真实接口地址。
					data: {
						invite_id: this.page_status.invite_id
					},
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						this.page_data.admin_info = res.data
						this.$forceUpdate()
					}
				})
			},
			handleItemClick(user) {
				this.page_status.doing = 'detail'
				uni.navigateTo({
					url: `./detail?user_id=${user.user_id}`
				})
			},
			handleSearchClick() {
				if (this.page_status.next_page === 0) {
					this.page_data.user_list = []
				}
				uni.request({
					url: 'https://www.imgker.com/venus/user/find_users', //仅为示例，并非真实接口地址。
					data: {
						keyword: this.page_status.key_word,
						inviteId: this.page_status.invite_id || '',
						condition: JSON.stringify(this.get_find_condition),
						ageSort: this.page_status.age_sort,
						statureSort: this.page_status.stature_sort,
						pageNo: this.page_status.next_page,
						pageSize: this.page_config.page_size
					},
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: (res) => {
						if (res.data.length === this.page_config.page_size) {
							this.page_status.next_page++
						}
						this.page_data.user_list = [
							...this.page_data.user_list,
							...res.data.map(_i => {
								let user_id = _i.user_id
								let admin = _i.admin
								let avatar_url = _i.avatar_url
								let user_name = _i.user_name
								let hot = _i.hot
								let update_time = _i.update_time
								_i = JSON.parse(_i.user_info)
								_i.user_id = user_id
								_i.admin = admin
								_i.avatar_url = avatar_url
								_i.user_name = user_name
								_i.hot = hot
								_i.update_time = update_time
								let [b_province_index, b_city_index, b_area_index] = _i.bornMultiIndex || []
								let [l_province_index, l_city_index, l_area_index] = _i.liveMultiIndex || []
								_i.tag = [
									_i.gender ? ['男', '女'][_i.gender] : null,
									_i.date ? _i.date[2] + _i.date[3] + '年' : null,
									_i.bornMultiIndex ? `${areaJson[b_province_index].city[b_city_index].area[b_area_index]}` : null,
									_i.liveMultiIndex ? `${areaJson[l_province_index].city[l_city_index].area[l_area_index]}工作` : null,
									..._i.hobby
								].filter(_i => _i)
								return _i
							}).filter(_i => this.page_data.user_list.every(__i => __i.user_id !== _i.user_id))
						]
					}
				})
			},
			handleConditionClick() {
				uni.navigateTo({
					url: './findcond'
				})
			},
			handleStatureSortClick() {
				this.page_status.next_page = 0
				this.page_status.stature_sort = !this.page_status.stature_sort
				this.handleSearchClick()
			},
			handleAgeSortClick() {
				this.page_status.next_page = 0
				this.page_status.age_sort = !this.page_status.age_sort
				this.handleSearchClick()
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
</style>
