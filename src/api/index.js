import request from '@/api/axios'

export function login( username, password ) {
	const data = {
		username : username,
		password : password
	}
	return request({
		url: '/user/login',
		method: 'get',
		params : data
	})
}
// export function loginByUsername(username, password) {
// 	const data = {
// 		username,
// 		password
// 	}
// 	  return request({
// 		url: '/login/login',
// 		method: 'post',
// 		data
// 	  })
// }

// export function logout() {
//   return request({
// 	url: '/login/logout',
// 	method: 'post'
//   })
// }

// export function getUserInfo(token) {
//   return request({
// 	url: '/user/info',
// 	method: 'get',
// 	params: { token }
//   })
// }
