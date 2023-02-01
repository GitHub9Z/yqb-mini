<template>  
    <view class="container">  
		<view class="user-section ">
			<image class="bg"></image>
			<view class="user-info-box">
				<view class="portrait-box" @click="userBash">
					<image class="portrait" :src="memberInfo.face || defaultFace"></image>
				</view>
				<view class="info-box" @click="userBash">
					<text class="username">{{memberInfo.nickname || '登录/注册'}}</text>
				</view>
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/img/user/vip-card-bg.png" mode=""></image>
				<view class="b-btn">
					立即开通
				</view>
				<view class="tit">
					<text class="hxicon-iLinkapp-"></text>
					DCloud会员
				</view>
				<text class="e-m">DCloud Union</text>
				<text class="e-b">开通会员开发无bug 一测就上线</text>
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/img/user/arc.png"></image>
			
			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">128.00</text>
					<text>余额</text>
				</view>
				<view class="tj-item" @click="navTo('/pages/user/coupon/coupon')">
					<text class="num">32.00</text>
					<text>月收益</text>
				</view>
				<view class="tj-item">
					<text class="num">820</text>
					<text>信用分</text>
				</view>
			</view> 
		</view>
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow">
				<button class="cu-btn content">
					<text class="cuIcon-qrcode text-gray"></text>
					<text class="text-grey">我的钱包</text>
				</button>
			</view>
			<view class="cu-item arrow">
				<view class="content" style="width: 100%;">
					<text class="cuIcon-card text-olive"></text>
					<text class="text-grey">我的合约</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<button class="cu-btn content" open-type="contact">
					<text class="cuIcon-questionfill text-yellow"></text>
					<text class="text-grey">密码设置</text>
				</button>
			</view>
			
			<view class="cu-item arrow margin-top">
				<view class="content">
					<text class="cuIcon-settingsfill text-grey"></text>
					<text class="text-grey">退出登录</text>
				</view>
			</view>
		</view>
    </view>  
</template>  
<script>  
	import hxNavbar from "@/components/hx-navbar/hx-navbar.vue"

	import listCell from '@/components/mix-list-cell';
    import {  
        mapState 
    } from 'vuex';
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell,
			hxNavbar
		},
		data(){
			return {
				pageTitle:"我的",
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				defaultFace: '/static/img/logo_round.jpg',
				userSettingUrl: '/pages/user/setting/setting',
				
				memberInfo: {
					face: '',
					nickname: "",
				}
			}
		},
		onLoad(){
			
			
		},
		onReady() {
			
		},
		onShow(){
			let member = this.userData.member;
			if(member){
				this.memberInfo = {
					face: member.facke, 
					nickname: member.nickname
				}
			}else{
				this.memberInfo = {
					face: '', 
					nickname: ''
				}
			}
			
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/user/setting/setting');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
        computed: {
			...mapState(['hasLogin','userData'])
		},
        methods: {
			//个人信息
			userBash(){
				if(this.userData){
					this.navTo('/pages/user/bash/bash')
					
				}else{
					uni.navigateTo({
					    url: '/pages/user/login/login'
					});
				}
			},
			
	
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			},
			
			
        }
    }  
</script>  
<style lang='scss'>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 520upx;
		padding: 100upx 30upx 0;
		position:relative;

		.bg{
			background: #e54d42;
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			
			
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			margin-left: 15px;
			width: 128upx;
			height: 128upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 4upx;
			color: white;
			margin-left: 40upx;
		}
	}

	.vip-card-box{
		
		display:none;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(to right, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(to right, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			[class*="hxicon-"]{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		[class*="hxicon-"]{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #ffd21c;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			[class*="hxicon-"]{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	
</style>