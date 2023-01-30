
import Vue from 'vue'
const store = {
    state: {
        'system_info': {}
    },
    getters: {
        'get_system_info': state => {
            return state.system_info
        }
    },
    mutations: {
        'set_system_info': (state, system_info) => {
            state.system_info = system_info
        }
    },
    actions: {
        'GET_SYSTEM_INFO': ({ commit }, phone) => {
			uni.getSystemInfo({
				success: function(e) {
					console.log('nmsl', e)
					// #ifndef MP
					let status_bar = e.statusBarHeight;
					let custom_bar;
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight || 0 + 50;
						custom_bar = Vue.prototype.CustomBar
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight || 0 + 45;
						custom_bar = Vue.prototype.CustomBar
					};
					// #endif

					// #ifdef MP-WEIXIN
					let status_bar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					let custom_bar = custom.bottom + custom.top - e.statusBarHeight;
					Vue.prototype.StatusBar = status_bar;
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom_bar;
					// #endif		

					// #ifdef MP-ALIPAY
					let status_bar = e.statusBarHeight || 0;
					let custom_bar = e.statusBarHeight || 0 + e.titleBarHeight || 0;
					Vue.prototype.StatusBar = status_bar;
					Vue.prototype.CustomBar = custom_bar;
					// #endif
					commit('set_system_info', { status_bar, custom_bar })
					console.log('nmbs', { status_bar, custom_bar })
				}
			})
        }
    }
}
export default store