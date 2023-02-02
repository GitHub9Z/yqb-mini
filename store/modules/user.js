
const randomString = (len) => {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var maxPos = $chars.length;
	var pwd = '';
	for (let i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

// const date = new Date();
// date.setHours(date.getHours() + 1);
// const policyText = {
// 	expiration: date.toISOString(), // 设置policy过期时间。
// 	conditions: [
// 		// 限制上传大小。
// 		["content-length-range", 0, 1024 * 1024 * 1024],
// 	],
// };

// async function getFormDataParams() {
// 	const credentials = (await uni.request_sync({
// 		url: 'https://www.imgker.com/venus/upload/getToken',
// 	})).data
// 	console.log(credentials)
// 	const policy = Base64.encode(JSON.stringify(policyText)) // policy必须为base64的string。
// 	const signature = computeSignature(credentials.AccessKeySecret, policy)
// 	const formData = {
// 		OSSAccessKeyId: credentials.AccessKeyId,
// 		signature,
// 		policy,
// 		'x-oss-security-token': credentials.SecurityToken
// 	}
// 	return formData
// }

const store = {
	state: {
		'user_info': {}
	},
	getters: {
		'get_user_info': state => {
			return state.user_info
		}
	},
	mutations: {
		'set_user_info': (state, user_info) => {
			state.user_info = user_info
			// let info = JSON.parse(user_info.user_info || '{}')
			// user_info.integrity = Math.floor(Object.keys(info).filter(_i => info[_i] && JSON.stringify(info[_i]) !== '[]').length * 100 / 11)
			// state.user_info = user_info
			// console.log(user_info)
			// if ((user_info.user_type === 0) && !user_info.invite_id) uni.navigateTo({
			// 	url: './invite'
			// })
		}
	},
	actions: {
		'GET_USER_INFO': async ({
			commit
		}) => {
			await uni.request({
				url: 'http://localhost:824/yqb/user/get_info', //仅为示例，并非真实接口地址。
				data: {},
				header: {
				},
				success: (res) => {
					commit('set_user_info', res.data.data)
				}
			})
		},
		'UPLOAD_FILE': async ({
			commit
		}, filePath) => {
			const host = 'https://venus-image.oss-cn-beijing.aliyuncs.com'
			let form = (await uni.request_sync({
				url: 'https://www.imgker.com/venus/upload/getPostObjectParams',
			})).data
			let name = new Date().valueOf() + randomString(16)
			await new Promise((resolve) => {
				wx.uploadFile({
					url: host, // 开发者服务器的URL。
					filePath: filePath,
					name: 'file', // 必须填file。
					formData: {
						key: name,
						...form
					},
					success: (res) => {
						if (res.statusCode === 204) {
							resolve()
						}
					},
					fail: err => {
						console.log(err);
					}
				});
			})
			return `https://venus-image.oss-cn-beijing.aliyuncs.com/${name}`
		}
	}
}
export default store
