<template>
	<view class="content">
		<view class="content-head fixed">
			<cu-custom :isBack="true">
				<block slot="backText"></block>
				<block slot="content"></block>
				<block slot="right"><navigator style="padding: 0 10px;" url="/pages/user/history/index" open-type="navigate">收益明细</navigator></block>
			</cu-custom>
		</view>
		<view class="content-main">
			
			<view class="content-main-logo">
				<image src="../../../static/img/wallet.png">
			</view>
			<view class="content-main-title">
				我的余额
			</view>
			<view class="content-main-money">
				<text class="rmb">￥</text>{{get_user_info.wallet.toFixed(2)}}
			</view>
			<view class="content-main-ad">
				
			</view>
			<navigator style="display: flex; align-items: center; justify-content: center;" url="/pages/user/withdraw/index" navigateTo>
				<button class="content-main-button text-sm no-border bg-red" >
					提现
				</button>
			</navigator>
			<view class="content-main-qa">
				常见问题
			</view>
			<view class="content-main-about text-gray">
				本服务由易签多提供
			</view>
		</view>
	</view>
</template>

<script>
	import {
	    mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
			};
		},
		watch: {
		},
		onShow(){
			this.GET_USER_INFO()
		},
		computed: {
			...mapGetters(['get_user_info'])
		},
		methods: {
			...mapActions(['GET_USER_INFO'])
		},
		async onPullDownRefresh() {
			await this.GET_USER_INFO()
			uni.stopPullDownRefresh()
		}
	};
</script>

<style>
	page {
		background-color: #ededed;
	}
</style>

<style lang="less" scoped>
	
	.content {
		.content-main {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.content-main-logo {
				margin-top: 5vh;
				border-radius: 50%;
				background: white;
				height: 60px;
				width: 60px;
				image {
					height: 60px;
					width: 60px;
				}
			}
			.content-main-title {
				margin-top: 20px;
				font-size: 15px;
			}
			.content-main-money {
				margin-top: 10px;
				font-size: 35px;
				font-weight: 500;
				display: flex;
				align-items: flex-start;
				.rmb {
					font-weight: bold;
					font-size: 28px;
				}
			}
			.content-main-button {
				position: fixed;
				// opacity: .9;
				bottom: 20vh;
				padding: 3px 60px;
				font-size: 15px;
			}
			.content-main-qa {
				position: fixed;
				opacity: .9;
				bottom: 30px;
				padding: 3px 60px;
				font-size: 13px;
				font-weight: bold;
				color: #476582;
			}
			.content-main-about {
				position: fixed;
				bottom: 0;
				padding: 10px 60px;
				font-size: 12px;
			}
		}
	}
</style>
