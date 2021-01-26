<template>
	<div class="home">
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
</template>

<script>
import links from '@/components/Links.vue';

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
	name: 'Home',
	components: { links },
	data() {
		return {
			nav: {},
			dropStyle: {
				'background-color': 'inherit',
				'background-origin': 'padding-box'
			}
		};
	},
	created() {
		this.nav = /* user.nav || */ nav;
	},
	computed: {
		user() {
			return this.$parent.user;
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
		reset() {
			this.nav = nav;
			this.closeModal();
		}
	}
};
</script>
<style lang="scss" scoped>
.heading {
	font-size: 16px;
}
.subtitle {
	font-size: 25px;
}
.child {
	margin: 0.5em 0.75em;
}
</style>
