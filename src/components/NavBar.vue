<template>
	<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="navbar-brand" @click="active = !active">
				<a
					role="button"
					class="navbar-burger"
					:class="{ 'is-active': active }"
					aria-label="menu"
					aria-expanded="false"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
		</nav>
		<div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': active }">
			<div class="navbar-end">
				<a class="navbar-item" @click="reset">
					Reset
				</a>
				<a class="navbar-item" href="https://github.com/zkl2333/start-pages">
					About
				</a>
				<div class="navbar-item">
					<div class="buttons">
						<a class="button is-light">
							登录
						</a>
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
		}
	}
};
</script>
