<template>
	<view class="content">
		<!-- 		<cu-custom class="content-title" bgColor="text-white bg-blue" :isBack="true">
		</cu-custom> -->
		<view class="content-back bg-red">
			<image class="content-back-logo" src="/static/img/logo.jpg" mode="aspectFill"></image>
			
			<view class="content-back-divider"></view>
			<view class="content-back-title">易签多</view>
		</view>
		<view class="content-main">
			<view class="content-main-title">短信快捷登录</view>
			<view class="cu-form-group">
				<view class="title"><text class="lg text-gray cuIcon-mobilefill"></text></view>
				<input placeholder="手机号码" name="input" type="number" v-model="page_status.input_phone"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-red'>
						+86
					</view>
					<view class="cu-tag line-red">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="lg text-gray cuIcon-mail"></text></view>
				<input placeholder="验证码" name="input" type="number" v-model="page_status.input_sms"></input>
				<button class='cu-btn bg-red' v-if="page_status.left_time" disabled>{{page_status.left_time}}秒后重新发送</button>
				<button class='cu-btn bg-red' v-else :disabled="!isSmsAbled" @getuserinfo="hanldeSmsClick" open-type="getUserInfo">验证码</button>
			</view>
			<view class="content-main-btn"><button class="cu-btn bg-red margin-tb-sm lg round" style="width: 100%;" :disabled="!isLoginAbled"
				 @click="handleLoginClick">立即登录/注册</button></view>
			<view class="content-main-tip"><text class="lg text-gray cuIcon-questionfill" style="margin-right: 3px;"></text>登录之后签约立即享受每月1000+元现金的额外收入。</view>
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
				page_status: {
					input_phone: '',
					input_sms: '',
					left_time: 0
				}
			}
		},
		async onLoad() {
			if (uni.getStorageSync('token')) {
				uni.redirectTo({
					url: '/pages/search/search'
				})
			}
		},
		async onShow() {
			if (uni.getStorageSync('token')) {
				uni.redirectTo({
					url: '/pages/search/search'
				})
			}
		},
		computed: {
			...mapGetters(['get_user_info']),
			isLoginAbled() {
				return (/^1[3|5|7|8][0-9]\d{8}$/.test(this.page_status.input_phone)) && this.page_status.input_sms.length === 4
			},
			isSmsAbled() {
				return (/^1[3|5|7|8][0-9]\d{8}$/.test(this.page_status.input_phone)) && this.page_status.left_time === 0
			}
		},
		methods: {
			async hanldeSmsClick(e) {
				const userInfo = e.detail.userInfo
				uni.login({
					success: res => {
						var code = res.code;
						uni.request({
							url: 'http://localhost:824/yqb/user/SMS', //仅为示例，并非真实接口地址。
							data: {
								phone: this.page_status.input_phone,
								user_info: JSON.stringify(userInfo)
							},
							header: {
								'custom-header': 'hello' //自定义请求头信息
							},
							success: ({ data }) => {
								if (data.success) {
									this.page_status.left_time = 60
									let _int = setInterval(() => {
										this.page_status.left_time--
										if (this.page_status.left_time === 0) {
											clearInterval(_int)
										}
									}, 1000)
								} else {
									uni.showToast({
										title: data.message,
										duration: 2000
									})
								}
							}
						})

					},
				})
			},
			async handleLoginClick() {
				uni.clearStorageSync()
				uni.request({
					url: 'http://localhost:824/yqb/user/LOGIN', //仅为示例，并非真实接口地址。
					data: {
						phone: this.page_status.input_phone,
						sms: this.page_status.input_sms
					},
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: ({ data }) => {
						if (data.data) {
							uni.setStorageSync('token', data.data.token)
							uni.redirectTo({
								url: '/pages/index/index'
							})
						} else {
							uni.showToast({
								title: data.message,
								duration: 2000
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		height: 100vh;

		.content-back {
			height: 30vh;
			position: relative;

			.content-back-logo {
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
			
			.content-back-divider {
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
			
			.content-back-title {
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

			&::after {
				content: '';
				width: 140%;
				height: 100px;
				position: absolute;
				left: -20%;
				bottom: -100px;
				z-index: -1;
				border-radius: 0 0 50% 50%;
				background: inherit;
			}
		}


		.content-main {
			width: 90vw;
			position: fixed;
			top: 25vh;
			left: 0;
			right: 0;
			margin: auto;
			background-color: white;
			padding: 20px;
			border-radius: 5px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

			// display: flex;
			// flex-direction: column;
			// align-items: center;
			.content-main-title {
				padding: 0 10px;
				margin-bottom: 10px;
				color: #606266;
				font-size: 16px;
			}

			.content-main-btn {
				margin-top: 20px;
			}

			.content-main-tip {
				font-size: 12px;
				color: gray;
				position: absolute;
				bottom: -35px;
			}
		}
	}
</style>
