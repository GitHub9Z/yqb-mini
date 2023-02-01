<template>
	<view>
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
				<block slot="backText">返回</block>
				<block slot="content">本期合约</block>
				<block slot="right"><navigator style="padding: 0 10px;" url="/pages/listpromise/listpromise" open-type="navigate">查看更多</navigator></block>
			</cu-custom>
		</view>
		<view class="cu-list menu sm-border padding">
			<navigator class="cu-item " url="../account_security/security" open-type="navigate">
				<view class="content">
					<text class="text-black">合约编号</text>
				</view>
				<view class="action">
					<text class="text-grey">82392300002130323</text>
				</view>
			</navigator>
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
					<text class="text-black">状态</text>
				</view>
				<view class="action">
					<text class="cuIcon-title text-red"></text> <text class="text-grey">进行中</text>
				</view>
			</view>
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
			<navigator class="cu-item margin-top" url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">指标</text>
				</view>
				<view class="action">
					<text class="text-grey">消费满4元</text>
				</view>
			</navigator>
			<navigator class="cu-item " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">收益</text>
				</view>
				<view class="action">
					<text class="text-grey">10.00 元</text>
				</view>
			</navigator>
			<navigator class="cu-item " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">截止时间</text>
				</view>
				<view class="action">
					<text class="text-grey">2023-02-11 23:01</text>
				</view>
			</navigator>

			<navigator class="cu-item " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">违约金</text>
				</view>
				<view class="action">
					<text class="text-grey">100信用分</text>
				</view>
			</navigator>

			<navigator class="cu-item margin-top " url="../../base/about" open-type="navigate">
				<view class="content">
					<text class="text-black">进度</text>
				</view>
				<view class="action">
					<view class="cu-progress radius sm striped active" style="height: 15px; width: 50vw;">
						<view class="bg-red" :style="[{ width: '60%' }]">3元</view>
					</view>
				</view>
			</navigator>

			<!-- <view class="cu-item margin-top">
				<view class="content" style="text-align: center;">
					<text class="text-black">切换账号</text>
				</view>
			</view> -->
			<view class="cu-item margin-top" style="background-color: #e54d42;" @click="logOut">
				<view class="content" style="text-align: center;">
					<text class="text-white">取消合约</text>
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
