<template>
	<view>
		<view class="content-head fixed">
			<cu-custom :isBack="true" bgColor="bg-red text-white">
				<block slot="backText">返回</block>
				<block slot="content">合约列表</block>
			</cu-custom>
		</view>

		<view class="cu-timeline" v-for="group in page_data.group_list">
			<view class="cu-time" style="width: 180px;">{{group.name}} 共{{group.list.length}}期</view>

			<view :class="`cu-item text-${page_config.status_enum[promise.status].color}`"
				v-for="(promise, index) in group.list">
				<navigator class="content" style="display: flex; align-items: center; justify-content: space-between;"
					url="/pages/finishpromise/finishpromise" navigateTo>
					<view class="text-gray">
						第{{index + 1}}期
					</view>

					<view class="cu-capsule radius">
						<view :class="`cu-tag bg-${page_config.status_enum[promise.status].color}`">
							{{page_config.status_enum[promise.status].label}}</view>
						<view :class="`cu-tag line-${page_config.status_enum[promise.status].color}`">2022-07-17 22:32截止
						</view>
					</view>
				</navigator>

			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page_config: {
					status_enum: {
						1: {
							label: '未开始',
							color: 'grey'
						},
						2: {
							label: '进行中',
							color: 'blue'
						},
						3: {
							label: '已完成',
							color: 'green'
						},
						4: {
							label: '已违约',
							color: 'red'
						},
						5: {
							label: '已解约',
							color: 'black'
						}
					}
				},
				page_data: {
					// 1:未开始 2:进行中 3:已完成 4:已违约 5:已解约
					group_list: [{
						name: '2022-06-17 22:32',
						list: [{
							status: 1
						}, {
							status: 2
						}, {
							status: 3
						}, {
							status: 4
						}, {
							status: 5
						}]
					}, {
						name: '2022-06-17 22:32',
						list: [{
							status: 1
						}, {
							status: 2
						}, {
							status: 3
						}, {
							status: 4
						}, {
							status: 5
						}]
					}]
				}
			};
		}
	}
</script>

<style>

</style>
