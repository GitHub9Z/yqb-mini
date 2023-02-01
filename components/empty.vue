<template>
	<view class="content">
		<view class="content-main">
			<image src="/static/img/logo_round.jpg" mode="aspectFill"></image>
			{{text || '暂无数据哦'}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String
			}
		},
		data() {
			return {
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		padding: 120px 80px;
		.content-main {
			padding: 40px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			//background: white;
			//box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
			font-size: 16px;
			filter: grayscale(100%);
			opacity: 0.3;
			white-space:nowrap;
			image {
				height: 70px;
				width: 70px;
				border-radius: 50%;
				margin-bottom: 20px;
			}
		}
	}
</style>
