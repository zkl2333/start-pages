<template>
	<li
		draggable="true"
		@dragstart="$emit('dragstart', $event)"
		@dragEnd="$emit('dragEnd', $event)"
	>
		<a
			draggable="false"
			:href="link.url"
			v-text="link.title"
			@blur="changeTitle"
			@contextmenu.prevent="false"
			@click.right="clickRight"
		></a>
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
		}
	}
};
</script>
