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
							<a href="#" class="card-footer-item has-text-danger" @click="/*reset*/"
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
		<navbar @reset="activeModal = true" :user="user"  />
		<section class="section container">
			<router-view />
		</section>
	</div>
</template>

<script>
import navbar from './components/NavBar.vue';
import notification from './components/Notification.vue';

export default {
	name: 'App',
	data() {
		return {
			user: {
				lsLogin: false
			},
			activeModal: false,
			notifications: []
		};
	},
	components: {
		navbar,
		notification
	},
	created() {
		const currentUser = this.$cloud.User.current();
		if (currentUser) {
			// 跳到首页
			this.user = currentUser;
			this.user.lsLogin = true;
		} else {
			// 显示注册或登录页面
			// this.$cloud.User.loginAnonymously().then(user => {
			// 	// user 是新的匿名用户
			// 	console.log('新建匿名用户');
			// 	this.user = user;
			// });
		}
	},
	methods: {
		closeModal() {
			this.activeModal = false;
		},
		login() {
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
	}
};
</script>

<style lang="scss" scoped>
.modal-content {
	max-width: 500px;
	padding: 10px;
}
.modal-card,
.modal-content {
	margin: 0 auto;
}
</style>
