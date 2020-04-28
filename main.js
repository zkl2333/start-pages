const app = new Vue({
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
		},
		dropStyle: {
			"background-color": "inherit",
			"background-origin": "padding-box"
		}
	},
	methods: {
		//可以放置
		allowDrop(e) {
			e.preventDefault();
			this.dropStyle = {
				"background-color": "#eee"
			};
		},
		//开始拖动
		dragStart(e, list, index) {
			let target = list[index];
			// this.dropStyle = {
			// 	"background-color": "#eee"
			// };
			e.dataTransfer.setData("text/html", `<a href="${target.src}">${target.title}</a>`);
			e.dataTransfer.setData("text/uri-list", `#${target.title}\n${target.src}`);
			e.dataTransfer.setData("text/plain", target.src);
			this.dragingCallBack = () => {
				list.splice(index, 1);
			};
		},
		dragEnd() {
			this.dropStyle = {
				"background-color": "inherit"
			};
			this.dragingCallBack = undefined;
		},
		//放置
		drop(e, obj) {
			this.allowDrop(e);
			this.dropStyle = { "background-color": "inherit" };
			let htmlStr = e.dataTransfer.getData("text/html");
			let cb = this.dragingCallBack;
			if (cb) {
				cb();
			}
			if (htmlStr) {
				let el = document.createElement("div");
				el.innerHTML = htmlStr;
				let a = el.getElementsByTagName("a")[0];
				if (a) {
					obj.list.push({
						title: a.innerText,
						src: a.href
					});
				}
			}
		}
	}
});
