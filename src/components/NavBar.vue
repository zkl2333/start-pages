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
				<a class="navbar-item" href="https://github.com/zkl2333/start">github</a>
				<div class="navbar-item">
					<div class="buttons">
						<a class="button is-light">登录</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	data: function() {
		return {
			active: false
		};
	},
	methods: {
		reset: function() {
			this.$emit("reset");
			this.active = false;
		}
	}
};
</script>
