<template>
	<navigator class="item-box" :url="`/pages/store/index?merchant_id=${store.id}`" navigateTo>
		<view class="container top-box">
			<view class="left">
				<image :src="store.header" mode="aspectFill"></image>
			</view>
			<view class="right">

				<text class="tit">{{store.title}}</text>
				<view class="row justify-content">
					<view class="row-left">
						<!-- <i class="hxicon-favorfill "></i> -->
						<text class="t1">{{store.score}}分</text>
						<text class="t2" v-if="store.hot">{{store.hot || 0}}人已签约</text>
					</view>
					<view class="row-right" v-if="store.shops.length">
						<i class="hxicon-locationfill"></i>
						<text>{{getDistance(store.shops[0])}}</text>
					</view>
				</view>
				<view class="row" v-if="store.shops.length">
					<text>最近门店 - {{store.shops[0].title}}</text>
				</view>
			</view>
		</view>
		<view class="bottom-box-container">
			<view class="goods-box" v-for="(protocal,j) in store.protocals" :key="j">
				<view class="tit">
					{{protocal.title}}
				</view>
				<view class="hint">
					{{generate_task(protocal)}}
				</view>
				<view class="price-box">
					<text class="txt1">￥</text>
					<text class="txt2">{{protocal.bonus}}</text>
					<text class="txt3">/{{generate_date(protocal)}}</text>
				</view>
			</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		props: {
			store: {
				type: Object
			}
		},
		data() {
			return {

			}
		},
		methods: {
			getDistance(shop) {
				function rad(d) {
				    return d * Math.PI / 180.0;
				}
				let lat1 = 39.908072 || 0;
				let lng1 = 116.407718 || 0;
				let lat2 = shop.latitude || 0;
				let lng2 = shop.longitude || 0;
				var radLat1 = rad(lat1);
				var radLat2 = rad(lat2);
				var a = radLat1 - radLat2;
				var b = rad(lng1) - rad(lng2);
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137; // EARTH_RADIUS;
				// 输出为公里
				s = Math.round(s * 10000) / 10000;

				var distance = s;
				var distance_str = "";

				if (parseInt(distance) >= 1) {
					// distance_str = distance.toFixed(1) + "km";
					distance_str = distance.toFixed(2) + "km";
				} else {
					// distance_str = distance * 1000 + "m";
					distance_str = (distance * 1000).toFixed(2) + "m";
				}
				return distance_str
			},
			generate_date({
				time
			}) {
				if (!(time % 365)) {
					return ((time / 365 === 1 ? '' : time / 365) + '年')
				}
				if (!(time % 30)) {
					return ((time / 30 === 1 ? '' : time / 30) + '月')
				}
				if (!(time % 7)) {
					return ((time / 7 === 1 ? '' : time / 7) + '周')
				}
				return (time === 1 ? '' : time) + '天'
			},
			generate_task(record) {

				const generate_time = (time) => {
					let res = ''
					// 转换为式分秒
					let h = time / 60 / 60 % 24
					if (h) {
						res += (h + '小时')
					}
					let m = time / 60 % 60
					if (m) {
						res += (m + '分钟')
					}
					let s = time % 60
					if (s) {
						res += (s + '秒')
					}
					// 作为返回值返回
					return res
				}
				switch (record.task_type) {
					case 1: {
						return `消费满${record.task_num}次`
						break
					}
					case 2: {
						return `消费满${record.task_num}元`
						break
					}
					case 3: {
						return `消费满${generate_time(record.task_num)}`
						break
					}
				}

			}
		}
	}
</script>

<style lang="less" scoped>
	.item-box {
		display: flex;
		flex-direction: column;
		margin-bottom: 14px;
		padding-bottom: 18px;
		padding-top: 18px;
		padding-right: 15px;
		padding-left: 15px;
		background-color: #ffffff;

		.top-box {
			display: flex;
			flex-direction: row;

			.left {
				margin-right: 10px;


				image {
					width: 72px;
					height: 54px;
					border-radius: 6px;
				}
			}

			.right {
				flex: 1;

				.tit {
					font-size: 16px;
					font-weight: bold;
					color: #333333;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.justify-content {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
				}

				.row {
					font-size: 12px;
					color: #999999;
					margin-top: 4px;

					.row-left {
						display: flex;
						flex-direction: row;
						align-items: center;
						.t1,
						i {
							color: #ffca3e;
						}

					}

					.t2 {
						margin-left: 12px;
					}

					.row-right {
						display: flex;
						flex-direction: row;

						i {
							margin-right: 4px;
						}
					}

				}
			}
		}

		.bottom-box {
			&-container {
				margin: 12px 0 0;
				padding-left: 82px;

				white-space: nowrap;

				.goods-box {
					width: 90%;
					margin-left: 12px;
					display: flex;
					align-items: flex-end;

					// display: inline-block;
					.img-box {
						position: relative;
						width: 80px;
						height: 60px;
						background-color: #f1f1f1;
						border-radius: 4px;

						image {
							width: 100%;
							height: 60px;
						}

						.tag {
							position: absolute;
							bottom: 0;
							left: 0;
							background-color: #FF5722;
							color: #ffffff;
							padding: 2px 4px;
							font-size: 12px;
							border-radius: 4px;
						}
					}

					.tit {

						font-size: 14px;
						margin-top: 4px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.hint {
						flex: 1;
						margin-left: 5px;
						font-size: 12px;
						margin-top: 4px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						color: #9b9e9e;
					}

					.price-box {
						margin-top: 4px;

						.txt1 {
							font-size: 10px;
							color: #FF5722;
						}

						.txt2 {
							font-size: 16px;
							color: #FF5722;
						}

						.txt3 {
							margin-left: 6px;
							font-size: 10px;
							color: #bbbbbb;
							// text-decoration: line-through;
						}
					}
				}

				.goods-box:last-child {
					margin-right: 12px;
				}

			}

		}
	}

	.item-box:last-child {
		border-bottom: 0;
	}
</style>
