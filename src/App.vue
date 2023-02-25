<template>
	<div class="page container">
		<div class="hero">
			<img src="./assets/fretter_logo.svg" alt="Fretter logo">
			<div class="tag is-warning">pre-alpha</div>
		</div>
		<fret-board />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FretBoard } from '@/modules/fret-board/main';
export default defineComponent({
	components: { FretBoard },
});
</script>
<style>
	.hero {
		display: flex;
		flex-direction: column;
		gap: 16px;
		fill: black;
		width: 40%;
		margin: 32px auto 0 auto;
	}
	.tag {
		margin: auto;
	}
	@media screen and (max-width: 400px) {
		.hero {
			width: 40%;
			margin: 12px auto 0 auto;
		}
	}
</style>