var app = new Vue({
	el: "#app",
	data: {
		nav: {
			company: {
				name: "内部资源",
				list: [
					{
						title: "小程序原型图",
						src: "http://192.168.3.100:9001/"
					},
					{
						title: "小程序接口工具",
						src: "http://192.168.3.100:9003/"
					},
					{
						title: "禅道",
						src: "http://192.168.3.100:8088/zentao/"
					}
				]
			},
			frontEnd: {
				name: "前端资源",
				list: [
					{
						title: "CodePen",
						src: "https://codepen.io/"
					}
				],
				child: {
					vue: {
						title: "Vue",
						list: [
							{ title: "Vue官网", src: "https://cn.vuejs.org/" },
							{ title: "Vue论坛", src: "https://forum.vuejs.org/" }
						]
					}
				}
			},
			design: {
				name: "设计资源",
				list: [
					{
						title: "dribbble",
						src: "https://dribbble.com/"
					},
					{
						title: "站酷",
						src: "https://www.zcool.com.cn/"
					}
				]
			},
			docs: {
				name: "文档资料",
				list: [
					{
						title: "MDN",
						src: "https://developer.mozilla.org/zh-CN/"
					},
					{
						title: "w3school",
						src: "https://www.w3school.com.cn/"
					}
				],
				child: {
					miniprogram: {
						title: "小程序",
						list: [
							{
								title: "小程序Api文档",
								src: "https://developers.weixin.qq.com/miniprogram/dev/api/"
							},
							{
								title: "vant-weapp组件库",
								src: "https://youzan.github.io/vant-weapp/"
							}
						]
					},
					vue: {
						title: "Vue",
						list: [{ title: "Vue Api 文档", src: "https://cn.vuejs.org/v2/api/" }]
					}
				}
			}
		}
	}
});
