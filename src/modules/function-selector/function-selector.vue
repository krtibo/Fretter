<template>
	<div class="buttons has-addons">
		<button
			v-shortkey="['l']"
			class="button"
			:class="{ 'is-selected is-info': !isGameMode }"
			@shortkey="toggleLearnMode"
			@click="toggleLearnMode">
			🧠 Learn
		</button>

		<button
			v-shortkey="['p']"
			class="button"
			:class="{ 'is-selected is-info': isGameMode }"
			@shortkey="toggleGameMode"
			@click="toggleGameMode">
			🕹️ Practice
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	props: {
		isGameModeProp: { type: Boolean, default: false },
	},
	emits: ['selected'],
	setup(props, { emit }) {
		const isGameMode = ref(props.isGameModeProp);
		const toggleGameMode = () => {
			isGameMode.value = true;
			emit('selected', isGameMode.value);
			localStorage.isGameMode = isGameMode.value;
		};
		const toggleLearnMode = () => {
			isGameMode.value = false;
			emit('selected', isGameMode.value);
			localStorage.isGameMode = isGameMode.value;
		};
		return {
			isGameMode,
			toggleGameMode,
			toggleLearnMode,
		};
	},
});
</script>
<style>
	.buttons {
		margin: auto;
	}
</style>