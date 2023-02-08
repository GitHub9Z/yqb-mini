<template>
	<view>
		<view class="head-box bg-red">
			<view class="navbar" :style="'height: ' + statusBarHeight"></view>
			<view class="head-box-main">
				<image class="head-box-main-logo" src="/static/img/logo.jpg" mode="aspectFill"></image>
				<view class="head-box-main-divider"></view>
				<view class="head-box-main-title">易签多</view>
			</view>
		</view>
		<view class="search-box" :class="{'QZBG':GDHEAD}" :style="GDHEAD ? 'padding-right: ' + MPPR + 'px' : ''">
			<view class="navbar"></view>
			<view class="ctn">
				<view class="hx-search-box" @click="goSearch">
					<uni-icons type="search" size="22" color="#666666" />
					<text>输入搜索关键词</text>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="hot-box">
				<text class="item" v-for="(item,i) in hos_list" :key="i">{{item}}</text>
			</view>
		</view>
		<mescroll-body ref="mescrollRef" :down="downOption" @down="downCallback" @up="upCallback">

			<view class="container menu-box">
				<navigator class="item-box" v-for="(item,i) in menuList" :key="i" :url="`/pages/search/search?type=${item.type}`" navigateTo>
					<image :src="item.img" mode=""></image>
					<view class="tit">
						<text>{{item.tit}}</text>
					</view>
				</navigator>
			</view>
			<view class="bannerimg-box">
				<swiper circular duration="400" interval="10000" autoplay>
					<swiper-item class="swiper-item bannerImg" v-for="(item,index) in bannerData" :key="index">
						<!-- 图片尺寸为 750*250 -->
						<image :src="item.src" class="loaded" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>

			<view class="container margin-top sort-box">
				<view class="item-box" v-for="(item,i) in sortList" :key="i">
					<view class="tit" :class="{'active': sortIndex == i}">
						<text>{{item.tit}}</text>
					</view>
				</view>
			</view>
			<view class=" store-box" v-if="storeList">
				<Merchant :store="store" v-for="(store,i) in storeList" :key="i"></Merchant>
			</view>
		</mescroll-body>
		<view class="foot" v-if="showFoot">
			<text>更多商家加入中，敬请期待 </text>
		</view>
		<view class="footzw"></view>
	</view>
</template>

<script>
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import Merchant from "@/components/merchant.vue";

	//引入测试数据
	import testData from "@/common/testdata.js";
	const screenHeight = uni.getSystemInfoSync().screenHeight;
	//获取系统状态栏高度
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollBody,
			Merchant
		},
		onPageScroll(e) {
			let that = this;
			if (e.scrollTop > 10) {
				let view = uni.createSelectorQuery().select(".search-box");
				view.fields({
					rect: true
				}, res => {
					if (res.top == 0) {
						that.GDHEAD = 1;
					} else {
						that.GDHEAD = 0;
					}

				}).exec();
			}

		},
		data() {
			return {
				page_config: {
					page_size: 10
				},
				page_status: {
					// 当前加载到页码
					current: 0
				},
				statusBarHeight,
				MPPR: 0,
				GDHEAD: 0,
				//显示没有更多商户
				showFoot: 0,
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				menuList: [

					{
						img: '/static/img/index/餐饮.png',
						tit: '餐饮消费',
						type: 1
					},
					{
						img: '/static/img/index/娱乐.png',
						tit: '休闲玩乐',
						type: 2
					},
					{
						img: '/static/img/index/住宿.png',
						tit: '酒店住宿',
						type: 3
					},
					{
						img: '/static/img/index/出行.png',
						tit: '日常出行',
						type: 4
					},
					{
						img: '/static/img/index/服装.png',
						tit: '服装日用',
						type: 5
					},

				],
				sortIndex: 0,
				sortList: [{
					tit: '附近商户'
				}, {
					tit: '评分'
				}, {
					tit: '签约量'
				}, {
					tit: '收益'
				}],
				//filterTagList: [{tit:'支持预定'}, {tit:'销量'}, {tit:'速度'}, {tit:'配送费'}] 
				storeList: [],
				bannerData: [{
						page: '/pages/product/product?id=457',
						src: 'https://img0.baidu.com/it/u=3288149204,2595002920&fm=253&fmt=auto&app=138&f=JPEG?w=1134&h=332'
					},
					{
						page: '/pages/product/product?id=57',
						src: 'https://img.zcool.cn/community/015b316045ea1c11013ef90fe5987b.jpg@1280w_1l_2o_100sh.jpg'
					},
					{
						page: '/pages/product/product?id=95',
						src: 'https://img.zcool.cn/community/017d5b5b84a9b1a8012190f2ed83b4.jpg@1280w_1l_2o_100sh.jpg'
					},
					{
						page: '/pages/product/product?id=45',
						src: 'https://marketplace.canva.cn/EAD5sa8t-14/3/0/1600w/canva-%E8%A4%90%E7%BA%A2%E8%89%B2%E7%83%A7%E7%83%A4%E7%85%A7%E7%89%87%E9%A4%90%E9%A5%AE%E4%BF%83%E9%94%80%E4%B8%AD%E6%96%87%E7%94%B5%E5%95%86banner-J8rucfd0uKs.jpg'
					}
				],
				hos_list: [
					'中石油',
					'大米',
					'肯德基',
					'盒马生鲜',
					'库',
					'中石油',
					'大米',
					'肯德基',
					'盒马生鲜',
					'优衣库',
				]

			}
		},
		onLoad() {
			let that = this;
			// #ifdef MP
			//小程序下空出胶囊距离
			let m = uni.getMenuButtonBoundingClientRect();
			that.MPPR = m.width + 8

			// #endif
		},
		mounted() {
			let that = this;

		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				let that = this;
				//联网成功的回调,隐藏下拉刷新的状态
				that.mescroll.endSuccess();
				// setTimeout(()=>{
				// 	that.mescroll.endSuccess();
				// },1500)
				//联网失败的回调,隐藏下拉刷新的状态
				//this.mescroll.endErr();

			},
			// 触底
			async upCallback(page) {
				let that = this;
				//加载门店数据
				await uni.request({
					url: 'https://www.imgker.com/yqb/merchant/get_list', //仅为示例，并非真实接口地址。
					data: {
						current: this.page_status.current,
						page_size: this.page_config.page_size
					},
					header: {},
					success: ({ data }) => {
						that.storeList = data.data.data
						//无更多商家
						if (data.data.count < this.page_config.page_size) that.showFoot = true;
						//隐藏加载
						that.mescroll.endSuccess(10);
					}
				})
			},
			toStore(store, goodsID) {
				let store_id = store.store_id
				let parameter = `?sid=${store_id}`

				if (goodsID != null) {
					parameter += `&gid=${goodsID}`
				}
				uni.navigateTo({
					url: '/pages/store/index' + parameter
				})
			},
			//搜索
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.b-b {
		position: relative;
	}

	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid #E4E7ED;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	.container {
		margin: 0 15px;
	}

	.margin-top {
		margin-top: 12px;
	}

	.head-box {
		padding: 14px 0;
		/* #ifdef MP */
		padding-top: 2px;
		/* #endif */
		position: relative;
		z-index: 3;

		.navbar {
			position: sticky;
			top: 0;
			height: var(--status-bar-height);
		}

		.head-box-main {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			height: 32px;
			align-items: center;
			transform: scale(.7);

			.head-box-main-logo {
				position: absolute;
				left: 21%;
				top: 0;
				bottom: 0;
				margin: auto;
				//border: 1px solid white;
				// box-shadow: 0px 2px 12px 0px rgba(255, 255, 255, 1);
				height: 30px;
				width: 80px;
				background-size: 100% 100% !important;
				// border-radius: 50%;
			}

			.head-box-main-divider {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				//border: 1px solid white;
				// box-shadow: 0px 2px 12px 0px rgba(255, 255, 255, 1);
				height: 28px;
				width: 1px;
				background-color: white;
				background-size: 100% 100% !important;
				// border-radius: 50%;
			}

			.head-box-main-title {
				position: absolute;
				color: white;
				font-size: 20px;
				line-height: 28px;
				right: 22%;
				top: 0;
				bottom: 0;
				margin: auto;
				//border: 1px solid white;
				// box-shadow: 0px 2px 12px 0px rgba(255, 255, 255, 1);
				height: 28px;
				width: 80px;
				background-size: 100% 100% !important;
				// border-radius: 50%;
			}

		}

	}

	.search-box {
		position: sticky;
		top: 0;
		z-index: 2;
		background: #e54d42;
		padding-top: var(--status-bar-height);
		margin-top: calc(var(--status-bar-height) * -1);

		.ctn {
			border-top-left-radius: 30upx;
			border-top-right-radius: 30upx;
			background: #f8f8f8;
			padding: 15px 15px 12px;

			.hx-search-box {
				border-radius: 40px;
				padding: 0 15px;
				height: 34px;
				display: flex;
				align-items: center;
				line-height: 44rpx;
				background-color: #eeeeee;
				flex: 1;
				color: #888888;
				font-size: 14px;
			}
		}
	}

	.QZBG {
		background: #ffffff;
		box-shadow: 0 1px 6px #ccc;

		.navbar {
			height: var(--status-bar-height);
		}

		.ctn {
			background: #ffffff;
			/* #ifdef MP */
			padding-top: 0px;
			/* #endif */
		}
	}

	.hot-box {

		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		overflow: scroll;
		white-space: nowrap;

		.item {
			margin-right: 12px;
			background-color: #EEEEEE;
			color: #666666;
			font-size: 12px;
			border-radius: 20px;
			padding: 2px 6px;
			// margin-bottom: 8px;
		}

		.item:last-child {
			margin-right: 0;
		}
	}

	.bannerimg-box {
		border-bottom-left-radius: 10upx;
		border-bottom-right-radius: 10upx;
		padding: 24rpx;

		swiper {
			height: 233rpx;
			width: 699rpx;
		}

		.swiper-item {

			display: flex;
			justify-content: center;
			align-content: center;
			overflow: hidden;

			width: 100%;
			height: 100%;

			image {
				border-radius: 8px;
				width: 100%;
				// object-fit: cover;
			}
		}

	}

	.menu-box {

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 12px;
		border-radius: 8px;
		background: #ffffff;
		padding: 12px 8px;

		.item-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 40px;
				height: 40px;
			}

			.tit {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				margin-top: 6px;
				color: #333333;
				padding: 2px 0;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.active {
				color: #ffffff;
				background-color: #999999;
				border-radius: 60px;
			}
		}
	}

	.sort-box {
		display: flex;
		flex-direction: row;
		margin-top: 12px;

		.item-box {

			margin-right: 16px;

			.tit {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				color: #333333;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.active {
				//color: #111111;
				font-weight: bold;
			}
		}
	}

	.store-box {
		margin-top: 20px;
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
			background-color: #f8f8f8;
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

	.footzw {
		/* #ifdef H5*/
		height: 50px;
		/* #endif */
	}
</style>
