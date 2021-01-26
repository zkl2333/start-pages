<template>
	<nav class="navbar is-transparent is-fixed-top" role="navigation">
		<div class="navbar-brand" @click="active = !active">
			<a role="button" class="navbar-burger" :class="{ 'is-active': active }">
				<span></span>
				<span></span>
				<span></span>
			</a>
		</div>
		<div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': active }">
			<div class="navbar-end" @click="active = false">
				<a class="navbar-item" @click="reset">重置</a>
				<a class="navbar-item" target="_blank" href="https://github.com/zkl2333/start"
					>GitHub</a
				>
				<div class="navbar-item">
					<div class="buttons" v-if="isLogin">
						<a class="button is-light">{{ user.username }}</a>
					</div>
					<div class="buttons" v-else>
						<a class="button is-light">登录</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		isLogin: {
			type: Boolean,
			required: false
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
