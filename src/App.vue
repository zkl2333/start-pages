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
		<navbar @reset="activeModal = true" :user="user" :isLogin="isLogin" />
		<section class="section">
			<div class="container">
				<h1 class="title">Hello {{ user.name }}!</h1>
				<br />
				<p class="subtitle">资源导航</p>
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
										@removLink="group.list.splice(index, 1)"
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
												@removLink="child.list.splice(index, 1)"
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
import navbar from './components/NavBar.vue';
import links from './components/Links.vue';
import notification from './components/Notification.vue';

const nav = {
	frontEnd: {
		name: '前端资源',
		list: [
			{
				title: 'CodePen',
				url: 'https://codepen.io/'
			}
		],
		child: {
			vue: {
				title: 'Vue',
				list: [
					{ title: 'Vue官网', url: 'https://cn.vuejs.org/' },
					{ title: 'Vue论坛', url: 'https://forum.vuejs.org/' }
				]
			}
		}
	},
	design: {
		name: '设计资源',
		list: [
			{
				title: 'dribbble',
				url: 'https://dribbble.com/'
			},
			{
				title: '站酷',
				url: 'https://www.zcool.com.cn/'
			}
		]
	},
	docs: {
		name: '文档资料',
		list: [
			{
				title: 'MDN',
				url: 'https://developer.mozilla.org/zh-CN/'
			},
			{
				title: 'w3school',
				url: 'https://www.w3school.com.cn/'
			}
		],
		child: {
			miniprogram: {
				title: '小程序',
				list: [
					{
						title: '小程序Api文档',
						url: 'https://developers.weixin.qq.com/miniprogram/dev/api/'
					},
					{
						title: 'vant-weapp组件库',
						url: 'https://youzan.github.io/vant-weapp/'
					}
				]
			},
			vue: {
				title: 'Vue',
				list: [{ title: 'Vue Api 文档', url: 'https://cn.vuejs.org/v2/api/' }]
			}
		}
	}
};

export default {
	name: 'App',
	data() {
		return {
			nav: {},
			user: {
				lsLogin: false
			},
			activeModal: false,
			notifications: [],
			dropStyle: {
				'background-color': 'inherit',
				'background-origin': 'padding-box'
			}
		};
	},
	components: {
		navbar,
		links,
		notification
	},
	computed: {
		isLogin() {
			return !this.user.isAnonymous();
		}
	},
	created() {
		const currentUser = this.$cloud.User.current();
		if (currentUser) {
			// 跳到首页
			this.user = currentUser;
			console.log('已获取用户');
		} else {
			this.user.lsLogin = false;
			// 显示注册或登录页面
			this.$cloud.User.loginAnonymously().then(user => {
				// user 是新的匿名用户
				console.log('新建匿名用户');
				this.user = user;
			});
		}
		this.nav = /* user.nav || */ nav;
	},
	methods: {
		// 可以放置
		allowDrop(e) {
			e.preventDefault();
			this.dropStyle = {
				'background-color': '#eee'
			};
		},
		// 开始拖动
		dragStart(e, list, index) {
			const target = list[index];
			e.dataTransfer.setData('text/html', `<a href="${target.url}">${target.title}</a>`);
			e.dataTransfer.setData('text/uri-list', `#${target.title}\n${target.url}`);
			e.dataTransfer.setData('text/plain', target.url);
			this.dragingCallBack = () => {
				list.splice(index, 1);
			};
			this.dragingCallBack.data = target;
		},
		dragEnd() {
			this.dropStyle = {
				'background-color': 'inherit'
			};
		},
		// 放置
		drop(e, obj) {
			this.allowDrop(e);
			this.dropStyle = { 'background-color': 'inherit' };
			const htmlStr = e.dataTransfer.getData('text/html');
			const uriList = e.dataTransfer.getData('text/uri-list');
			const plain = e.dataTransfer.getData('text/plain');
			const cb = this.dragingCallBack;
			if (cb) {
				obj.list.push(cb.data);
				cb();
				this.dragingCallBack = undefined;
			} else if (htmlStr && htmlStr !== '') {
				this.notify('html');
				const el = document.createElement('div');
				el.innerHTML = htmlStr;
				const a = el.getElementsByTagName('a')[0];
				if (a) {
					obj.list.push({
						title: a.innerText,
						url: a.href
					});
				}
			} else if (uriList || plain) {
				const url = e.dataTransfer.getData('URL');
				if (url !== '') {
					this.notify('url');
					obj.list.push({
						title: url,
						url
					});
				}
			}
		},
		handleInput(e, list, index) {
			if (!this.isLocked || !this.innerText) {
				this.innerText = this.value;
			}
			const content = e.target.innerText;
			list[index].title = content;
		},
		closeModal() {
			this.activeModal = false;
		},
		login() {
			this.closeModal();
		},
		reset() {
			this.nav = nav;
			this.closeModal();
		},
		notify(msg) {
			const length = this.notifications.push(msg);
			setTimeout(length => {
				this.closeNotifications(length - 1);
			}, 1000);
		},
		closeNotifications(index) {
			this.notifications.splice(index, 1);
		}
	},
	watch: {
		nav: {
			handler(nav, oldNav) {
				// if (JSON.stringify(oldNav) !== '{}') {
				// 	putUser(this.db, { name: this.user.name, nav }, this.user.uid).then(() => {
				// 		this.notify('已保存');
				// 	});
				// }
				return nav;
			},
			deep: true
		}
	}
};
</script>

<style lang="scss" scoped>
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
		padding: 10px;
	}
	.modal-card,
	.modal-content {
		margin: 0 auto;
	}
}
</style>
