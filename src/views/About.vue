<template>
	<div class="about">
		<section class="markdown-body" v-html="readme" />
		<p style="text-align: right; margin-top: 10px">
			在 <a href="https://github.com/zkl2333/start" target="_blank">GitHub</a> 找到我
		</p>
	</div>
</template>

<script>
import readme from '@/../README.md';
import marked from 'marked';

export default {
	data() {
		return {
			readme: marked(readme)
		};
	}
};
</script>

<style lang="scss" scoped>
.about::v-deep {
	.markdown-body {
		del {
			color: #999;
		}
		p {
			margin-top: 0;
			margin-bottom: 16px;
		}
		h1,
		h2,
		h3 {
			margin-top: 24px;
			margin-bottom: 16px;
			font-weight: 600;
			line-height: 1.25;
			&::before {
				content: '# ';
				color: #4a8576;
			}
		}
		h1 {
			font-size: 3em;
			padding: 0;
			margin-top: 0;
		}
		h2 {
			font-size: 2em;
		}
		h3 {
			font-size: 1.5em;
		}
	}
}
</style>
