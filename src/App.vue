<template>
	<div id="app">
		<notification :notifications="notifications" @closeNotifications="closeNotifications" />
		<div class="modal" :class="{ 'is-active': activeModal }">
			<div class="modal-background"></div>
			<div class="modal-card">
				<div class="modal-content">
					<div class="card">
						<div class="card-content">
							<div class="content">
								<h1 class="title has-text-danger">危险操作</h1>
								<p class="is-size-4">你确定要重置当前用户所有数据吗？</p>
							</div>
						</div>
						<footer class="card-footer">
							<a href="#" class="card-footer-item has-text-danger" @click="reset"
								>重置</a
							>
							<a href="#" class="card-footer-item has-text-grey" @click="closeModal"
								>取消</a
							>
						</footer>
					</div>
				</div>
				<button
					@click="closeModal"
					class="modal-close is-large"
					aria-label="close"
				></button>
			</div>
		</div>
		<navbar @reset="activeModal = true" />
		<section class="section">
			<!-- <button  style="position: fixed;top:3em;right:7em"></button> -->
			<div class="container">
				<h1 class="title">Hello {{ user.name }}!</h1>
				<br />
				<p class="subtitle">
					资源导航
				</p>
				<div class="columns">
					<div v-for="group in nav" :key="group.name" class="column">
						<div
							class="menu"
							@drop.stop="drop($event, group)"
							@dragover="allowDrop"
							:style="dropStyle"
						>
							<h3 class="heading">{{ group.name }}</h3>
							<ul class="menu-list">
								<!-- 如果是列表 -->
								<template v-if="group.list">
									<links
										v-for="(link, index) in group.list"
										@dragstart="dragStart($event, group.list, index)"
										@dragEnd="dragEnd"
										@saveTitle="link.title = $event"
										:key="link.title"
										:link="link"
									/>
								</template>
								<!-- 如果有子节点 -->
								<template v-if="group.child">
									<li
										class="child drop"
										v-for="(child, key) in group.child"
										@drop.stop="drop($event, child)"
										:style="dropStyle"
										:key="key"
									>
										<p>{{ child.title }}</p>
										<ul class="menu-list">
											<links
												v-for="(link, index) in child.list"
												@dragstart="dragStart($event, child.list, index)"
												@dragEnd="dragEnd"
												@saveTitle="link.title = $event"
												:link="link"
												:key="index"
											/>
										</ul>
									</li>
								</template>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
let nav = {
	frontEnd: {
		name: "前端资源",
		list: [
			{
				title: "CodePen",
				url: "https://codepen.io/"
			}
		],
		child: {
			vue: {
				title: "Vue",
				list: [
					{ title: "Vue官网", url: "https://cn.vuejs.org/" },
					{ title: "Vue论坛", url: "https://forum.vuejs.org/" }
				]
			}
		}
	},
	design: {
		name: "设计资源",
		list: [
			{
				title: "dribbble",
				url: "https://dribbble.com/"
			},
			{
				title: "站酷",
				url: "https://www.zcool.com.cn/"
			}
		]
	},
	docs: {
		name: "文档资料",
		list: [
			{
				title: "MDN",
				url: "https://developer.mozilla.org/zh-CN/"
			},
			{
				title: "w3school",
				url: "https://www.w3school.com.cn/"
			}
		],
		child: {
			miniprogram: {
				title: "小程序",
				list: [
					{
						title: "小程序Api文档",
						url: "https://developers.weixin.qq.com/miniprogram/dev/api/"
					},
					{
						title: "vant-weapp组件库",
						url: "https://youzan.github.io/vant-weapp/"
					}
				]
			},
			vue: {
				title: "Vue",
				list: [{ title: "Vue Api 文档", url: "https://cn.vuejs.org/v2/api/" }]
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
			objectStore.transaction.oncomplete = function() {
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
			reject(event);
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
		throw new Error("空对象");
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
			reject(event);
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

import navbar from "./components/NavBar";
import links from "./components/Links";
import notification from "./components/Notification";

export default {
	name: "App",
	data: function() {
		return {
			nav: {},
			user: {},
			activeModal: false,
			notifications: [],
			dropStyle: {
				"background-color": "inherit",
				"background-origin": "padding-box"
			}
		};
	},
	components: {
		navbar,
		links,
		notification
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
			e.dataTransfer.setData("text/html", `<a href="${target.url}">${target.title}</a>`);
			e.dataTransfer.setData("text/uri-list", `#${target.title}\n${target.url}`);
			e.dataTransfer.setData("text/plain", target.url);
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
						url: a.href
					});
				}
			} else if (uriList || plain) {
				let url = e.dataTransfer.getData("URL");
				obj.list.push({
					title: url,
					url: url
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
		closeModal() {
			this.activeModal = false;
		},
		reset() {
			this.nav = nav;
		},
		notify(msg) {
			let length = this.notifications.push(msg);
			setTimeout(() => {
				this.closeNotifications(length - 1);
			}, 1000);
		},
		closeNotifications(index) {
			this.notifications.splice(index, 1);
		}
	},
	watch: {
		nav: {
			handler(nav) {
				putUser(this.db, { name: this.user.name, nav }, this.user.uid).then(() => {
					this.notify("已保存");
				});
				return nav;
			},
			deep: true
		}
	}
};
</script>

<style lang="scss">
#app {
	.heading {
		font-size: 16px;
	}
	.subtitle {
		font-size: 25px;
	}
	.child {
		margin: 0.5em 0.75em;
	}
	.modal-content {
		max-width: 500px;
	}
}
</style>
