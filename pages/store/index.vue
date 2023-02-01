<template>
	<view class="content">
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
			</cu-custom>
		</view>
		<view class="header">
			<image class="header-bg bg-red"></image>
			<view class="header-top-Placeholder" ></view>
			<view class="container storeInfo" :style="{height: '100px', width: '90vw', boxShadow: ''}">
				<image class="storeAvatar hx-shadow" style="width: 80px;" src="https://img1.baidu.com/it/u=2220543861,3867330206&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375" mode="aspectFill"></image>
				<view class="text-bold text-xxl" style="margin-bottom: 7px;">
					肯德基 KFC
				</view>
				<view class="text-grey">
					店家说明,本店放心吃，地方名才店家说明,本店放心吃，才店家说明地方名本店放心吃，地方名才。
				</view>
				<!-- <view class="">
					后续再扩展优惠券，满减，折扣，活动等功能
				</view> -->
				<view class="shrink-box">
					<i class="hxicon" :class="showStoreBox ? 'icon-fold' : 'icon-unfold'" @click="showStoreBox = !showStoreBox"></i>
				</view>
			</view>
		</view>
		<view class="content-main VerticalBox" :style="{ 'padding-top': `0` }">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
				<view class="cu-item" :class="{ 'text-red': index==tabCur, 'cur': index==tabCur }"
				 v-for="(value, index) in page_data.bag_data" :key="index" @tap="TabSelect" :data-id="index">
					{{value.theme}}
				</view>
			</scroll-view>
			<scroll-view class="content-main-content VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 140upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="content-main-content-litem padding-top padding-lr" v-for="(list, index) in page_data.bag_data" :key="index"
				 :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-red"></text>{{list.theme}}</view>
					</view>
					<view class="content-main-content-right cu-list menu-avatar">
						<navigator class="content-main-content-right-item" v-for="item in list.coins"
						 hover-class='none' :url="`/pages/topromise/topromise?coin_id=${item.coin_id}`" navigateTo>
							<view class="content-main-content-right-item-info">
								<view class="text-black">{{item.coin_name}}</view>
								<view class="text-gray text-sm flex align-center">
										<view class='cu-tag bg-red sm' style="margin: 5px 5px 5px 0px; font-size: 10px;">{{item.type}}</view>
										<text class="cu-tag bg-gray sm">2915人已签约</text>
										
									</view>
							</view>
							<view class="content-main-content-right-item-action">
								<view class="content-main-content-right-item-action-num text-red text-bold">{{item.bonus}}</view>
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
					bag_data: [{
						"theme": "餐饮",
						"coins": [{
							"_id": "5f866cab48a88d438560b5e7",
							"coin_id": "1",
							"coin_name": "每月消费合约",
							"theme_id": "1",
							"coin_level": "3",
							"publish_sum": "肯德基 KFC",
							"instore_sum": "396",
							"inpool_sum": "78",
							"online_sum": "26",
							"offline_sum": "0",
							"create_time": "2020-10-14T03:12:43.175Z",
							"update_time": "2020-10-14T03:12:43.175Z",
							"__v": 0,
							"publish_price": "40",
							"lucky_sum": "111",
							"type": "消费满5次",
							"bonus": "5元/月"
						}, {
							"_id": "5f866fb1496c834422542e2b",
							"coin_id": "2",
							"coin_name": "每月堂食合约",
							"theme_id": "1",
							"coin_level": "5",
							"publish_sum": "塔斯汀中国汉堡",
							"instore_sum": "395",
							"inpool_sum": "77",
							"online_sum": "28",
							"offline_sum": "0",
							"create_time": "2020-10-14T03:25:37.489Z",
							"update_time": "2020-10-14T03:25:37.489Z",
							"__v": 0,
							"img_url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=479215651,3959279275&fm=26&gp=0.jpg",
							"publish_price": "30",
							"lucky_sum": "56",
							"type": "消费2000元",
							"bonus": "120元/月"
						}]
					}, {
						"theme": "娱乐",
						"coins": [{
							"_id": "5f866cab48a88d438560b5e7",
							"coin_id": "1",
							"coin_name": "每月消费合约",
							"theme_id": "1",
							"coin_level": "3",
							"publish_sum": "肯德基 KFC",
							"instore_sum": "396",
							"inpool_sum": "78",
							"online_sum": "26",
							"offline_sum": "0",
							"create_time": "2020-10-14T03:12:43.175Z",
							"update_time": "2020-10-14T03:12:43.175Z",
							"__v": 0,
							"publish_price": "40",
							"lucky_sum": "111",
							"type": "消费满5次",
							"bonus": "5元/月"
						}, {
							"_id": "5f866fb1496c834422542e2b",
							"coin_id": "2",
							"coin_name": "每月堂食合约",
							"theme_id": "1",
							"coin_level": "5",
							"publish_sum": "塔斯汀中国汉堡",
							"instore_sum": "395",
							"inpool_sum": "77",
							"online_sum": "28",
							"offline_sum": "0",
							"create_time": "2020-10-14T03:25:37.489Z",
							"update_time": "2020-10-14T03:25:37.489Z",
							"__v": 0,
							"img_url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=479215651,3959279275&fm=26&gp=0.jpg",
							"publish_price": "30",
							"lucky_sum": "56",
							"type": "消费2000元",
							"bonus": "120元/月"
						}]
					}, {
						"theme": "日用",
						"coins": [{
							"_id": "5f866cab48a88d438560b5e7",
							"coin_id": "1",
							"coin_name": "每月消费合约",
							"theme_id": "1",
							"coin_level": "3",
							"publish_sum": "肯德基 KFC",
							"instore_sum": "396",
							"inpool_sum": "78",
							"online_sum": "26",
							"offline_sum": "0",
							"create_time": "2020-10-14T03:12:43.175Z",
							"update_time": "2020-10-14T03:12:43.175Z",
							"__v": 0,
							"publish_price": "40",
							"lucky_sum": "111",
							"type": "消费满5次",
							"bonus": "5元/月"
						}, {
							"_id": "5f866fb1496c834422542e2b",
							"coin_id": "2",
							"coin_name": "每月堂食合约",
							"theme_id": "1",
							"coin_level": "5",
							"publish_sum": "塔斯汀中国汉堡",
							"instore_sum": "395",
							"inpool_sum": "77",
							"online_sum": "28",
							"offline_sum": "0",
							"create_time": "2020-10-14T03:25:37.489Z",
							"update_time": "2020-10-14T03:25:37.489Z",
							"__v": 0,
							"img_url": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=479215651,3959279275&fm=26&gp=0.jpg",
							"publish_price": "30",
							"lucky_sum": "56",
							"type": "消费满2000元",
							"bonus": "120元/月"
						}]
					}, {
						"theme": "出行",
						"coins": [{
							"_id": "5fbb6d611dde41c6be95da67",
							"coin_id": "7",
							"coin_name": "新裤子",
							"lucky_sum": "22",
							"img_url": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3589058581,3140230150&fm=15&gp=0.jpg",
							"theme_id": "3",
							"coin_level": "3",
							"publish_sum": "-1",
							"instore_sum": "0",
							"inpool_sum": "0",
							"online_sum": "0",
							"offline_sum": "0",
							"create_time": "2020-11-23T08:05:53.010Z",
							"update_time": "2020-11-23T08:05:53.010Z",
							"__v": 0,
							"type": "消费2000元"
						}]
					}, {
						"theme": "服装",
						"coins": [{
							"_id": "5fbb6d611dde41c6be95da67",
							"coin_id": "7",
							"coin_name": "新裤子",
							"lucky_sum": "22",
							"img_url": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3589058581,3140230150&fm=15&gp=0.jpg",
							"theme_id": "3",
							"coin_level": "3",
							"publish_sum": "-1",
							"instore_sum": "0",
							"inpool_sum": "0",
							"online_sum": "0",
							"offline_sum": "0",
							"create_time": "2020-11-23T08:05:53.010Z",
							"update_time": "2020-11-23T08:05:53.010Z",
							"__v": 0
						}]
					}, {
						"theme": "运动",
						"coins": [{
							"_id": "5fbb6d611dde41c6be95da67",
							"coin_id": "7",
							"coin_name": "新裤子",
							"lucky_sum": "22",
							"img_url": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3589058581,3140230150&fm=15&gp=0.jpg",
							"theme_id": "3",
							"coin_level": "3",
							"publish_sum": "-1",
							"instore_sum": "0",
							"inpool_sum": "0",
							"online_sum": "0",
							"offline_sum": "0",
							"create_time": "2020-11-23T08:05:53.010Z",
							"update_time": "2020-11-23T08:05:53.010Z",
							"__v": 0
						}]
					}],
					hold_data: []
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
			...mapGetters(['get_system_info', 'get_user_info'])
		},
		methods: {
			fetchData() {},
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

							.content-main-content-right-item-action-num {
							}
						}
					}
				}
			}
		}
	}
	
	.header{
		position: relative;
		min-height: 230px;
		&-bg{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 2;
			width: 100%;
			height: 142px;
		}
		&-bg-black{
			position: absolute;
			left: 0;
			top: 142px;
			bottom: 0;
			z-index: 1;
			background-color: #ffffff;
			width: 100%;
			transition: background-color 0.2s;
		}
		&-bg-gray{
			position: absolute;
			left: 0;
			top: 142px;
			bottom: -16px;
			z-index: 1;
			background-color: #afafaf;
			width: 100%;
			transition: background-color 0.2s;
		}
		&-top-Placeholder{
			height: 105px;
		}
		.storeInfo{
			position: relative;
			z-index: 2;
			background: #ffffff;
			height: 100px;
			border-radius: 6px;
			padding: 12px;
			margin-bottom: 4px;
			transition: all 0.2s;
			left: 5vw;
			.shrink-box{
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				text-align: center;
				font-size: 20px;
				color: #a2a8ab;
			}
			.storeAvatar{
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
	.hx-shadow{
		box-shadow: 0px 6upx 16upx rgba(173, 173, 173, 0.2);
	}
</style>
