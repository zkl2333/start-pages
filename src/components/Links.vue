<template>
	<li
		draggable="true"
		@dragstart="$emit('dragstart', $event)"
		@dragEnd="$emit('dragEnd', $event)"
	>
		<a
			draggable="false"
			@click="openLink(link.url)"
			@blur="changeTitle"
			@contextmenu.prevent=""
			@click.right="clickRight"
		>
			<!-- <img :src="'https://api.byi.pw/favicon/?url=' + link.url" :alt="link.title" /> -->
			<span> {{ link.title }}</span>
			<button class="delete" @click.stop="removLink"></button>
		</a>
	</li>
</template>

<script>
export default {
	props: ["link"],
	data: function() {
		return {};
	},
	methods: {
		changeTitle(event) {
			let title = event.target.innerText || this.link.url;
			this.$emit("saveTitle", title);
		},
		clickRight(event) {
			event.currentTarget.contentEditable = "true";
			var range = window.getSelection(); //创建range
			range.selectAllChildren(event.currentTarget); //range 选择obj下所有子内容
			range.collapseToEnd(); //光标移至最后
			event.currentTarget.onblur = function(event) {
				event.currentTarget.contentEditable = "false";
			};
		},
		openLink(uel) {
			window.open(uel);
		},
		removLink(event) {
			this.$emit("removLink");
		}
	}
};
</script>
<style lang="scss">
li {
	> a {
		display: flex !important;
		align-items: center;
		position: relative;
		img {
			height: 1em;
			width: 1em;
			margin-right: 0.5em;
			display: inline-block;
		}
		span {
			display: inline-block;
		}
		.delete {
			align-self: flex-end;
			position: absolute;
			right: 0.75rem;
			display: none;
		}
		&:hover .delete {
			display: inline-block;
		}
	}
}
</style>
