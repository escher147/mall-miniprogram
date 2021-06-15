import request from './network.js'
// 请求首页轮播图和推荐数据
const baseURL = 'http://123.207.32.32:8000'
export function getMultiData() {
	return request({
		url: baseURL + '/home/multidata',
		method: 'GET'
	})
}
// 请求商品数据
export function getHomeGoods(type, page) {
	return request({
		url: 'http://152.136.185.210:7878/api/m5/home/data',
		method: 'GET',
		data: {
			type,
			page
		}
	})
}