<template>
	<navigator class="item-box" :url="`/pages/store/index`" navigateTo>
		<view class="container top-box">
			<view class="left">
				<image :src="store.avatar" mode="aspectFill"></image>
			</view>
			<view class="right">

				<text class="tit">{{store.name}}</text>
				<view class="row justify-content">
					<view class="row-left">
						<i class="hxicon-favorfill "></i>
						<text class="t1">{{store.mark}}</text>
						<text class="t2">1349人已签约</text>
					</view>
					<view class="row-right">
						<i class="hxicon-locationfill"></i>
						<text>{{store.distance}}</text>
					</view>
				</view>
				<view class="row">
					<text>最近门店 - {{store.community}}</text>
				</view>
			</view>
		</view>
			<view class="bottom-box-container">
				<view class="goods-box" v-for="(goods,j) in store.goods" :key="j">
					<view class="tit">
						{{goods.name}}
					</view>
					<view class="hint">
						消费{{goods.sum}}
					</view>
					<view class="price-box">
						<text class="txt1">￥</text>
						<text class="txt2">{{goods.bonus}}</text>
						<text class="txt3">/{{goods.type}}</text>
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
			return {}
		}
	}
</script>

<style lang="less" scoped>
	.item-box{
		display: flex;
		flex-direction: column;
		margin-bottom: 14px;
		padding-bottom: 18px;
		padding-top: 18px;
		padding-right: 15px;
		padding-left: 15px;
		background-color: #ffffff;
		.top-box{
			display: flex;
			flex-direction: row;
			.left{
				margin-right: 10px;
				
				
				image{
					width: 72px;
					height: 54px;
					border-radius: 6px;
				}
			}
			.right{
				flex: 1;
				.tit{
					font-size: 16px;
					font-weight: bold;
					color: #333333;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.justify-content{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
				}
				.row{
					font-size: 12px;
					color: #999999;
					margin-top: 4px;
					.row-left{
						display: flex;
						flex-direction: row;
						.t1,i{
							color: #ffca3e;
						}
						
					}
					.t2{
						margin-left: 12px;
					}
					.row-right{
						display: flex;
						flex-direction: row;
						i{
							margin-right: 4px;
						}
					}
					
				}
			}
		}
		.bottom-box{
			&-container{
				margin: 12px 0 0;
				padding-left: 82px;
				
				white-space: nowrap;
				.goods-box{
					width: 90%;
					margin-left: 12px;
					display: flex;
					align-items: flex-end;
					// display: inline-block;
					.img-box{
						position: relative;
						width: 80px;
						height: 60px;
						background-color: #f1f1f1;
						border-radius: 4px;
						image{
							width: 100%;
							height: 60px;
						}
						.tag{
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
					.tit{
						
						font-size: 14px;
						margin-top: 4px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.hint{
						flex: 1;
						margin-left: 5px;
						font-size: 12px;
						margin-top: 4px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						color: #9b9e9e;
					}
					.price-box{
						margin-top: 4px;
						.txt1{
							font-size: 10px;
							color: #FF5722;
						}
						.txt2{
							font-size: 16px;
							color: #FF5722;
						}
						.txt3{
							margin-left: 6px;
							font-size: 10px;
							color: #bbbbbb;
							// text-decoration: line-through;
						}
					}
				}
				.goods-box:last-child{
					margin-right: 12px;
				}
				
			}
			
		}
	}
	.item-box:last-child{
		border-bottom: 0;
	}
</style>
