import Vue from 'vue'
import App from './App'

import store from './store/index';
Vue.prototype.$store = store;

//配置
import config from './config.js'
Vue.prototype.$conf = config

import cuCustom from './colorui/components/cu-custom.vue'

Vue.component('cu-custom', cuCustom)

Vue.prototype.$msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

import api from './common/vmeitime-http/index.js'
Vue.prototype.$api = api

import appupgrade from './common/appupgrade.js'
Vue.prototype.$appUpgrade = appupgrade

Vue.config.productionTip = false

App.mpType = 'app'

let ori_request = uni.request
uni.request = (params) => {
	uni.showLoading({
		title: '加载中',
		mask: true
	})
	let ori_success = params.success
	params.success = (res) => {
		uni.hideLoading()
		if (res.statusCode === 403) {
			uni.clearStorageSync()
			uni.reLaunch({
				url: '/pages/user/login/login'
			})
		}
		if (!res.data.success) {
			uni.showToast({
				icon: 'error',
				title: res.data.message,
				duration: 2000
			});
		}
		ori_success(res)
	}
	let api_name = params.url.split('/')[params.url.split('/').length - 1]
	if (/^[A-Z]+$/.test(api_name)) {
		ori_request(params)
	} else {
		ori_request({
			...params,
			header: {
				authorization: uni.getStorageSync('token')
			}
		})
	}
}

const app = new Vue({
    ...App
})
app.$mount()