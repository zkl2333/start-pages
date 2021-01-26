<template>
	<div class="notifications">
		<div
			v-for="(notification, index) in notifications"
			:key="index"
			class="notification is-primary"
		>
			<button class="delete" @click="close(index)"></button>
			{{ notification }}
		</div>
	</div>
</template>

<script>
export default {
	props: ['notifications'],
	created() {},
	methods: {
		close(index) {
			this.$emit('closeNotifications', index);
		}
	}
};
</script>

<style lang="scss">
.notifications {
	position: fixed;
	top: 5rem;
	right: 1rem;
	z-index: 10;
}
</style>
