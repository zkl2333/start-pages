let nav = {
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
};

async function initDB() {
	return await new Promise((resolve, reject) => {
		let request = window.indexedDB.open("StartPages", 1);
		let db;
		request.onerror = function(event) {
			console.log("Database error: " + event.target.errorCode);
			reject(new Error("数据库打开报错"));
		};
		request.onsuccess = function(event) {
			db = event.target.result;
			request = request.result;
			console.log("数据库打开成功");
			resolve(db);
		};
		request.onupgradeneeded = function(event) {
			console.log("数据库需要升级");
			db = event.target.result;
			let objectStore;
			// 创建仓库
			if (!db.objectStoreNames.contains("user")) {
				console.log("创建user仓库");
				objectStore = db.createObjectStore("user", { autoIncrement: true });
				objectStore.createIndex("name", "name", { unique: false });
				objectStore.createIndex("email", "email", { unique: true });
			}
			if (!db.objectStoreNames.contains("options")) {
				console.log("创建options仓库");
				objectStore = db.createObjectStore("options", { autoIncrement: true });
				objectStore.createIndex("name", "name", { unique: true });
				objectStore.createIndex("value", "value", { unique: true });
			}
			// 使用事务的 oncomplete 事件确保在插入数据前对象仓库已经创建完毕
			objectStore.transaction.oncomplete = function(event) {
				// 将数据保存到新创建的对象仓库
				addUser(db, { name: "Guest", nav });
				putOptions(db, { name: "activeUser", value: 1 });
				resolve(db);
			};
		};
	});
}
async function putOptions(DB, Options) {
	return await new Promise((resolve, reject) => {
		let transaction = DB.transaction(["options"], "readwrite");
		let optionsObjectStore = transaction.objectStore("options");
		let request = optionsObjectStore.put(Options);
		request.onsuccess = function(event) {
			resolve(event);
		};
		request.onerror = function(event) {
			reject(event);
		};
	});
}
async function getOptions(DB, OptionsName) {
	return await new Promise((resolve, reject) => {
		let transaction = DB.transaction(["options", "user"], "readonly");
		let optionsObjectStore = transaction.objectStore("options");
		let index = optionsObjectStore.index("name");
		let request = index.get(OptionsName);
		request.onsuccess = function(event) {
			console.log("读取options成功", event.target.result);
			resolve(event.target.result.value);
		};
		request.onerror = function(event) {
			console.log("读取options失败");
		};
	});
}
async function addUser(DB, userData) {
	return await new Promise((resolve, reject) => {
		let transaction = DB.transaction(["user"], "readwrite");
		let userObjectStore = transaction.objectStore("user");
		let request = userObjectStore.add(userData);
		request.onsuccess = function(event) {
			resolve(event);
		};
		request.onerror = function(event) {
			reject(event);
		};
	});
}
async function putUser(DB, userData, uid) {
	if (userData) {
		return await new Promise((resolve, reject) => {
			let transaction = DB.transaction(["user"], "readwrite");
			let userObjectStore = transaction.objectStore("user");
			let request = userObjectStore.put(userData, uid);
			request.onsuccess = function(event) {
				resolve(event);
			};
			request.onerror = function(event) {
				reject(event);
			};
		});
	} else {
		reject("空对象");
	}
}
async function getUserByKey(DB, key) {
	return await new Promise((resolve, reject) => {
		let transaction = DB.transaction(["user"], "readonly");
		let userObjectStore = transaction.objectStore("user");
		let request = userObjectStore.get(key);
		request.onsuccess = function(event) {
			console.log("读取用户成功", event.target.result);
			resolve(event.target.result);
		};
		request.onerror = function(event) {
			console.log("读取用户失败");
		};
	});
}
async function getUserByName(DB, name) {
	return await new Promise((resolve, reject) => {
		let transaction = DB.transaction(["user"], "readonly");
		let userObjectStore = transaction.objectStore("user");
		let index = userObjectStore.index("name");
		let request = index.get(name);
		request.onsuccess = function(event) {
			console.log("读取用户成功", event.target.result);
			resolve(event.target.result);
		};
		request.onerror = function(event) {
			console.log("读取用户失败");
		};
	});
}
async function getActiveUser(DB, name) {
	return await new Promise((resolve, reject) => {
		let transaction = DB.transaction(["user"], "readonly");
		let userObjectStore = transaction.objectStore("user");
		let index = userObjectStore.index("name");
		let request = index.get(name);
		request.onsuccess = function(event) {
			console.log("读取用户成功", event.target.result);
			resolve(event.target.result);
		};
		request.onerror = function(event) {
			console.log("读取用户失败");
		};
	});
}
const app = new Vue({
	el: "#app",
	data: {
		nav: {},
		user: {},
		dropStyle: {
			"background-color": "inherit",
			"background-origin": "padding-box"
		}
	},
	created: async function() {
		this.db = await initDB();
		let uid = await getOptions(this.db, "activeUser");
		let user = await getUserByKey(this.db, uid);
		this.nav = user.nav || nav;
		this.user = { name: user.name, uid };
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
			let uriList = e.dataTransfer.getData("text/uri-list");
			let plain = e.dataTransfer.getData("text/plain");
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
			} else if (uriList || plain) {
				let url = e.dataTransfer.getData("URL");
				obj.list.push({
					title: url,
					src: url
				});
			}
		},
		handleInput(e, list, index) {
			if (!this.isLocked || !this.innerText) {
				this.innerText = this.value;
			}
			let content = e.target.innerText;
			list[index].title = content;
		},
		clickRight(e) {
			e.currentTarget.contentEditable = "true";
			var range = window.getSelection(); //创建range
			range.selectAllChildren(e.currentTarget); //range 选择obj下所有子内容
			range.collapseToEnd(); //光标移至最后
			e.currentTarget.onblur = function(e) {
				e.currentTarget.contentEditable = "false";
			};
		},
		reset() {
			this.nav = nav;
		}
	},
	watch: {
		nav: {
			handler(nav) {
				putUser(this.db, { name: this.user.name, nav }, this.user.uid);
				return nav;
			},
			deep: true
		}
	}
});
