<script>
	import Vue from 'vue'
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			this.GET_SYSTEM_INFO()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapActions(['GET_SYSTEM_INFO'])
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	
	@import "/common/iconfont/iconfont.css";
	/* #ifndef APP-PLUS-NVUE */
	@import "/common/main.css";
	/* #endif */
	
	/* 骨架屏方案 */
	.Skeleton {
		background-color: #f3f3f3;
		padding: 20upx 0;
		border-radius: 6upx;
	}
</style>
