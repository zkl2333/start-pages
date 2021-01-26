<template>
	<div class="header">
		<nav class="navbar is-transparent is-fixed-top" role="navigation">
			<div class="navbar-brand" @click="active = !active">
				<h1 class="title">Hello {{ user.lsLogin ? user.username : 'Guest' }}!</h1>
				<a role="button" class="navbar-burger" :class="{ 'is-active': active }">
					<span></span>
					<span></span>
					<span></span>
				</a>
			</div>
			<div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': active }">
				<div class="navbar-end" @click="active = false">
					<router-link exact-active-class="is-active" class="navbar-item" to="/"
						>Home</router-link
					>
					<!-- <a class="navbar-item" @click="reset">重置</a> -->
					<a class="navbar-item" target="_blank" href="https://github.com/zkl2333/start"
						>GitHub</a
					>
					<template v-if="user.lsLogin">
						<a class="navbar-item">{{ user.username }}</a>
					</template>
					<template v-else>
						<router-link exact-active-class="is-active" class="navbar-item" to="/login"
							>登录</router-link
						>
					</template>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			active: false
		};
	},
	methods: {
		reset() {
			this.$emit('reset');
			this.active = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.header {
	height: 52px;
	.navbar {
		box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
	}
	.title {
		margin: 0;
		line-height: 52px;
		margin-left: 20px;
	}
	.is-active {
		color: #3273dc;
	}
}
</style>
