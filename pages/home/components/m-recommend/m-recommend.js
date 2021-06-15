// pages/home/components/m-recommend/m-recommend.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		list: {
			type: Array,
			value: []
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		flag: true
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		recimgLoad() {
			if (this.data.flag) {
				// console.log('----');
				this.triggerEvent('recimgLoad')
				this.data.flag = false
			}
		}
	}
})
