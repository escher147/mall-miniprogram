// pages/home/home.js
import { getMultiData, getHomeGoods } from '../../service/homeReq.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		banners: [],
		recommends: [],
		titles: ['流行', '新款', '精选'],
		goods:{
			'pop': {page: 0, list: []},
			'new': {page: 0, list: []},
			'sell': {page: 0, list: []}
		},
		currentType: 'pop',
		isShowbt: false,
		isShowtc: false,
		tabTop: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 请求轮播图和推荐数据
		getMultiData().then(res => {
			// console.log(res);
			const data = res.data.data;
			const banners = data.banner.list;
			const recommends = data.recommend.list;
			this.setData({
				banners: banners,
				recommends: recommends
			})
		})
		// 请求商品数据
		this.getGoods('pop');
		this.getGoods('new');
		this.getGoods('sell');

		
	},
	// ----------------网络请求----------------
	getGoods(type) {
		const page = this.data.goods[type].page + 1;
		getHomeGoods(type, page).then(res => {
		// console.log(res);
		const list = res.data.data.list;
		const goods = this.data.goods;
		goods[type].list.push(...list)
		// goods[type].page += 1;

		// 注意用${type}拼接，直接用goods.type表示给goods添加一个叫type的key
		// const type_list = 'goods.${type}.list'
		this.setData({
			goods: goods
		})
	})
	},
	
	// ----------------事件监听----------------

	handleTabClick(event) {
		console.log(event);
		let index = event.detail.index;
		let currentType = '';
		switch(index) {
			case 0: 
				currentType = 'pop'
				break;
			case 1: 
			currentType = 'new'
				break;
			case 2: 
			currentType = 'sell'
				break;
			default: 
					break
		}
		this.setData({
			currentType: currentType
		})
		console.log(this.data.currentType);
		console.log(this.data.goods[this.data.currentType].list);
	},
	// 滚动到底部
	onReachBottom() {
		this.getGoods(this.data.currentType)
	},
	// 监听页面滚动
	onPageScroll(options) {
		// if (options.scrollTop > 1200) {
		// 	this.setData({
		// 		isShowbt: true
		// 	}) 
		// } else {
		// 	this.setData({
		// 		isShowbt: false
		// 	})
		// }
		// 防止过于频繁调用this.setData
		const flag = options.scrollTop >= 1200;
		const tc_flag = options.scrollTop >= this.data.tabTop;
		if (flag !== this.data.isShowbt) {
			this.setData({
				isShowbt: options.scrollTop >= 1200
			})
		}
		if (tc_flag !== this.data.isShowtc) {
			this.setData({
				isShowtc: options.scrollTop >= this.data.tabTop
			})
		}
	},
	// 获取tab-control的top值
	recImgLoad() {
		wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
			// console.log(rect);
			this.setData({
				tabTop: rect.top
			})
		}).exec()
	}
	
})