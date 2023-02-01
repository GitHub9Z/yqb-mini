<template>
	<view>
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
				<block slot="backText">返回</block>
				<block slot="content">合约详情</block>
			</cu-custom>
		</view>
		<view class="cu-list menu sm-border padding">
			<navigator class="cu-item " url="../account_security/security" open-type="navigate">
				<view class="content">
					<text class="text-black">合约名称</text>
				</view>
				<view class="action">
					<text class="text-grey">每月堂食合约</text>
				</view>
			</navigator>
			<view class="cu-item">
				<view class="content">
					<text class="text-black">签约方</text>
				</view>
				<view class="action">
					<text class="text-grey">肯德基 KFC</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>合约简介</view>
					<view class="text-gray text-sm">小目标还没有实现小目标还没有实现小目标还没有实现小目标还没有实现小目标还没有实现！</view>
				</view>
			</view>

			<navigator class="cu-item margin-top " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">周期</text>
				</view>
				<view class="action">
					<text class="text-grey">12期</text>
				</view>
			</navigator>
			<navigator class="cu-item" url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">每期指标</text>
				</view>
				<view class="action">
					<text class="text-grey">消费4元 / 3周</text>
				</view>
			</navigator>
			<navigator class="cu-item " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">每期收益</text>
				</view>
				<view class="action">
					<text class="text-red text-bold">10.00 元</text>
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
				version: this.$conf.version
			}
		},
		onLoad() {
			var that = this;
		},
		mounted() {
			that = this;
		},
		methods: {
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
